/**
 * Firebase Functions - MoMo Webhook Handler
 * Handles incoming payment notifications from MoMo
 */

const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
const crypto = require('crypto');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

/**
 * Generate HMAC SHA256 signature
 */
function generateSignature(params, secretKey) {
    const sortedKeys = Object.keys(params).sort();
    const signatureString = sortedKeys
        .map(key => `${key}=${params[key]}`)
        .join('&');

    return crypto
        .createHmac('sha256', secretKey)
        .update(signatureString)
        .digest('hex');
}

/**
 * Verify MoMo webhook signature
 */
function verifyMoMoSignature(data, secretKey) {
    const receivedSignature = data.signature;
    const dataToVerify = { ...data };
    delete dataToVerify.signature;

    const expectedSignature = generateSignature(dataToVerify, secretKey);
    return receivedSignature === expectedSignature;
}

/**
 * MoMo Webhook Handler
 * Receives payment notifications from MoMo and creates transactions
 */
exports.momoWebhook = functions.https.onRequest(async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const webhookData = req.body;
        console.log('MoMo Webhook received:', JSON.stringify(webhookData, null, 2));

        // Get secret key from environment
        const secretKey = functions.config().momo?.secret_key;
        if (!secretKey) {
            console.error('MoMo secret key not configured');
            return res.status(500).json({ error: 'Configuration error' });
        }

        // Verify signature
        if (!verifyMoMoSignature(webhookData, secretKey)) {
            console.error('Invalid signature');
            return res.status(401).json({ error: 'Invalid signature' });
        }

        // Extract payment data
        const {
            orderId,
            requestId,
            amount,
            orderInfo,
            transId,
            errorCode,
            localMessage,
            payType,
            extraData
        } = webhookData;

        // Check if transaction already processed (idempotency)
        const existingWebhook = await db
            .collection('momoWebhooks')
            .doc(requestId)
            .get();

        if (existingWebhook.exists) {
            console.log('Webhook already processed:', requestId);
            return res.status(200).json({ message: 'Already processed' });
        }

        // Save webhook data
        await db.collection('momoWebhooks').doc(requestId).set({
            ...webhookData,
            receivedAt: admin.firestore.FieldValue.serverTimestamp(),
            processed: false
        });

        // Only process successful payments
        if (errorCode === 0) {
            // Parse orderId to extract member info
            // Format: MEMBER_ID_TIMESTAMP or custom format
            let memberId = null;
            let category = 'fund'; // default

            // Try to decode extraData if present
            if (extraData) {
                try {
                    const decoded = JSON.parse(Buffer.from(extraData, 'base64').toString());
                    memberId = decoded.memberId;
                    category = decoded.category || 'fund';
                } catch (e) {
                    console.log('Could not decode extraData:', e);
                }
            }

            // If no extraData, try to parse from orderId
            if (!memberId && orderId.includes('_')) {
                const parts = orderId.split('_');
                memberId = parts[0];
            }

            // Create transaction in Firebase
            const transactionData = {
                type: 'income',
                category: category,
                amount: parseInt(amount),
                description: orderInfo || 'Thanh toán MoMo',
                date: new Date().toISOString().split('T')[0],
                memberId: memberId,
                momoTransId: transId,
                momoOrderId: orderId,
                momoRequestId: requestId,
                payType: payType,
                source: 'momo_auto',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            // Add to transactions collection
            const transactionRef = await db.collection('transactions').add(transactionData);

            // Update webhook as processed
            await db.collection('momoWebhooks').doc(requestId).update({
                processed: true,
                transactionId: transactionRef.id,
                processedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            console.log('Transaction created:', transactionRef.id);

            // Send success response to MoMo
            return res.status(200).json({
                message: 'Success',
                transactionId: transactionRef.id
            });
        } else {
            // Payment failed or pending
            console.log('Payment not successful:', errorCode, localMessage);

            // Still mark as processed
            await db.collection('momoWebhooks').doc(requestId).update({
                processed: true,
                status: 'failed',
                processedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            return res.status(200).json({ message: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Webhook processing error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * CORS-enabled function for frontend to create payment
 */
exports.createMoMoPayment = functions.https.onCall(async (data, context) => {
    const crypto = require('crypto');

    try {
        const { orderId, amount, memberName, memberId, category } = data;

        // Get MoMo config
        const config = functions.config().momo;
        if (!config) {
            throw new functions.https.HttpsError('failed-precondition', 'MoMo not configured');
        }

        const partnerCode = config.partner_code;
        const accessKey = config.access_key;
        const secretKey = config.secret_key;
        const endpoint = config.endpoint || 'https://test-payment.momo.vn';

        const requestId = `${orderId}_${Date.now()}`;
        const orderInfo = `${memberName} - Đóng quỹ`;
        const returnUrl = `${data.returnUrl || 'https://your-app.com'}/finance`;
        const notifyUrl = `${functions.config().app?.url || 'https://your-app.com'}/momoWebhook`;

        // Encode extra data
        const extraData = Buffer.from(JSON.stringify({ memberId, category })).toString('base64');

        const params = {
            partnerCode,
            accessKey,
            requestId,
            amount: amount.toString(),
            orderId,
            orderInfo,
            returnUrl,
            notifyUrl,
            requestType: 'qrCode',
            extraData
        };

        // Generate signature
        const sortedKeys = Object.keys(params).sort();
        const signatureString = sortedKeys.map(key => `${key}=${params[key]}`).join('&');
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(signatureString)
            .digest('hex');

        params.signature = signature;

        // Call MoMo API
        const fetch = require('node-fetch');
        const response = await fetch(`${endpoint}/gw_payment/transactionProcessor`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        const result = await response.json();

        if (result.errorCode === 0) {
            return {
                success: true,
                qrCodeUrl: result.qrCodeUrl,
                deepLink: result.deeplink,
                payUrl: result.payUrl
            };
        } else {
            throw new functions.https.HttpsError('internal', result.localMessage);
        }
    } catch (error) {
        console.error('Create payment error:', error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});

/**
 * Send FCM Push Notification when a new match is created
 */
exports.notifyNewMatch = functions.firestore
    .document('teams/primary/matches/{matchId}')
    .onCreate(async (snap, context) => {
        const matchData = snap.data();
        
        try {
            // Get all FCM tokens from Firestore
            const tokensSnap = await db.collection('teams').doc('primary').collection('fcmTokens').get();
            const tokens = [];
            tokensSnap.forEach(doc => {
                if (doc.data().token) tokens.push(doc.data().token);
            });

            if (tokens.length === 0) {
                console.log('No FCM tokens found.');
                return null;
            }

            const typeLabel = matchData.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối';
            const dateFormatted = new Date(matchData.date).toLocaleDateString('vi-VN');

            // Construct notification payload
            const message = {
                notification: {
                    title: '⚽ Trận đấu mới đã được lên lịch!',
                    body: `${typeLabel} vs ${matchData.opponent || 'Nội bộ'} vào lúc ${matchData.startTime || 'chưa rõ'} ngày ${dateFormatted}. Vào app điểm danh ngay!`,
                },
                webpush: {
                    notification: { icon: '/favicon.png' }
                },
                tokens: tokens
            };

            // Send messages
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log(`Successfully sent: ${response.successCount}/${tokens.length}`);

            // Cleanup invalid tokens
            const cleanupPromises = [];
            response.responses.forEach((result, index) => {
                if (!result.success) {
                    const code = result.error?.code;
                    console.error('Failure sending to', tokens[index], result.error);
                    if (code === 'messaging/invalid-registration-token' ||
                        code === 'messaging/registration-token-not-registered') {
                        cleanupPromises.push(
                            db.collection('teams').doc('primary').collection('fcmTokens').doc(tokens[index]).delete()
                        );
                    }
                }
            });
            await Promise.all(cleanupPromises);

            return null;
        } catch (error) {
            console.error('Error sending push notification:', error);
            return null;
        }
    });

/**
 * HTTP endpoint để test push notification thủ công
 * Gọi: GET/POST https://<region>-<project>.cloudfunctions.net/sendTestNotification
 */
exports.sendTestNotification = functions.https.onRequest(async (req, res) => {
    // Cho phép CORS từ localhost và production
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).send('');
    }

    try {
        const tokensSnap = await db.collection('teams').doc('primary').collection('fcmTokens').get();
        const tokens = [];
        tokensSnap.forEach(doc => {
            if (doc.data().token) tokens.push(doc.data().token);
        });

        if (tokens.length === 0) {
            return res.status(200).json({ success: false, message: 'Không tìm thấy FCM token nào. Hãy mở app và cho phép thông báo trước.' });
        }

        const message = {
            notification: {
                title: '🧪 Test Notification từ Tinh Hoa FC',
                body: `PWA của anh đang hoạt động bình thường! Đã tìm thấy ${tokens.length} thiết bị.`,
            },
            webpush: {
                notification: { icon: '/favicon.png' }
            },
            tokens: tokens
        };

        const response = await admin.messaging().sendEachForMulticast(message);

        // Cleanup invalid tokens
        const cleanupPromises = [];
        response.responses.forEach((result, index) => {
            if (!result.success) {
                const code = result.error?.code;
                if (code === 'messaging/invalid-registration-token' || code === 'messaging/registration-token-not-registered') {
                    cleanupPromises.push(
                        db.collection('teams').doc('primary').collection('fcmTokens').doc(tokens[index]).delete()
                    );
                }
            }
        });
        await Promise.all(cleanupPromises);

        return res.status(200).json({
            success: true,
            message: `Đã gửi thông báo đến ${response.successCount}/${tokens.length} thiết bị.`,
            successCount: response.successCount,
            failureCount: response.failureCount,
            tokenCount: tokens.length
        });
    } catch (error) {
        console.error('sendTestNotification error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * Scheduled Function: Check upcoming matches and send reminders
 * Runs every 15 minutes, checks for matches starting within 1h or 30m
 * Uses notified1h / notified30m flags for idempotency
 */
exports.checkUpcomingMatches = functions.pubsub
    .schedule('every 15 minutes')
    .timeZone('Asia/Ho_Chi_Minh')
    .onRun(async (context) => {
        try {
            const now = new Date();
            console.log(`⏰ Checking upcoming matches at ${now.toISOString()}`);

            // Get all matches from primary team
            const matchesSnap = await db
                .collection('teams').doc('primary')
                .collection('matches').get();

            if (matchesSnap.empty) {
                console.log('No matches found.');
                return null;
            }

            // Get settings for webhook URL
            const rootSnap = await db.collection('teams').doc('primary').get();
            const settings = rootSnap.exists ? (rootSnap.data().settings || {}) : {};
            const webhookUrl = settings.messengerWebhookUrl;

            // Get all FCM tokens
            const tokensSnap = await db.collection('teams').doc('primary').collection('fcmTokens').get();
            const tokens = [];
            tokensSnap.forEach(doc => {
                if (doc.data().token) tokens.push(doc.data().token);
            });

            for (const doc of matchesSnap.docs) {
                const match = doc.data();

                // Skip matches without date or startTime
                if (!match.date || !match.startTime) continue;

                // Parse match datetime in Vietnam timezone
                const [hours, minutes] = match.startTime.split(':').map(Number);
                const matchDate = new Date(match.date + 'T00:00:00+07:00');
                matchDate.setHours(hours, minutes, 0, 0);

                const diffMs = matchDate.getTime() - now.getTime();
                const diffMinutes = diffMs / (1000 * 60);

                // Skip past matches or matches too far in the future
                if (diffMinutes < 0 || diffMinutes > 75) continue;

                const typeLabel = match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối';
                const dateFormatted = matchDate.toLocaleDateString('vi-VN');

                // Check 1-hour reminder (45-75 minutes before)
                if (diffMinutes <= 75 && diffMinutes > 45 && !match.notified1h) {
                    console.log(`📢 Sending 1h reminder for match ${doc.id}`);

                    // Send FCM
                    if (tokens.length > 0) {
                        const fcmMessage = {
                            notification: {
                                title: '⏰ Còn 1 giờ nữa!',
                                body: `${typeLabel} vs ${match.opponent || 'Nội bộ'} lúc ${match.startTime} ngày ${dateFormatted}. Chuẩn bị lên đường!`,
                            },
                            webpush: { notification: { icon: '/favicon.png' } },
                            tokens: tokens
                        };
                        const resp = await admin.messaging().sendEachForMulticast(fcmMessage);
                        console.log(`  FCM 1h: ${resp.successCount}/${tokens.length} sent`);
                    }

                    // Send Messenger Webhook
                    if (webhookUrl) {
                        const msg = `⏰ **NHẮC NHỞ TRẬN ĐẤU — CÒN 1 GIỜ** ⏰\n\n🏟️ **${typeLabel}** vs ${match.opponent || 'Nội bộ'}\n📅 Ngày: ${dateFormatted}\n⏰ Giờ: ${match.startTime}\n📍 Địa điểm: ${match.location || 'Chưa rõ'}\n\n🔥 Anh em chuẩn bị lên đường nhé!`;
                        try {
                            const fetch = require('node-fetch');
                            await fetch(webhookUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ message: msg, type: 'reminder_1h', matchId: doc.id })
                            });
                        } catch (e) {
                            console.error('Webhook 1h reminder failed:', e);
                        }
                    }

                    // Mark as notified (idempotency)
                    await doc.ref.update({ notified1h: true, _updatedAt: Date.now() });
                }

                // Check 30-minute reminder (15-45 minutes before)
                if (diffMinutes <= 45 && diffMinutes > 15 && !match.notified30m) {
                    console.log(`📢 Sending 30m reminder for match ${doc.id}`);

                    // Get RSVP summary for notification
                    const rsvp = match.rsvp || [];
                    const confirmedCount = rsvp.filter(r => r.status === 'confirmed').length;

                    // Send FCM
                    if (tokens.length > 0) {
                        const fcmMessage = {
                            notification: {
                                title: '🔥 Còn 30 phút nữa!',
                                body: `${typeLabel} vs ${match.opponent || 'Nội bộ'} sắp bắt đầu! ${confirmedCount > 0 ? `(${confirmedCount} người đã xác nhận)` : ''} Vào app điểm danh ngay!`,
                            },
                            webpush: { notification: { icon: '/favicon.png' } },
                            tokens: tokens
                        };
                        const resp = await admin.messaging().sendEachForMulticast(fcmMessage);
                        console.log(`  FCM 30m: ${resp.successCount}/${tokens.length} sent`);
                    }

                    // Send Messenger Webhook
                    if (webhookUrl) {
                        const declinedCount = rsvp.filter(r => r.status === 'declined').length;
                        const msg = `🔥 **SẮP ĐẾN GIỜ — CÒN 30 PHÚT** 🔥\n\n🏟️ **${typeLabel}** vs ${match.opponent || 'Nội bộ'}\n⏰ Giờ: ${match.startTime}\n📍 ${match.location || 'Chưa rõ'}\n\n📊 Xác nhận: ✅ ${confirmedCount} | ❌ ${declinedCount}\n\n⚡ Lên sân thôi anh em!`;
                        try {
                            const fetch = require('node-fetch');
                            await fetch(webhookUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ message: msg, type: 'reminder_30m', matchId: doc.id })
                            });
                        } catch (e) {
                            console.error('Webhook 30m reminder failed:', e);
                        }
                    }

                    // Mark as notified (idempotency)
                    await doc.ref.update({ notified30m: true, _updatedAt: Date.now() });
                }
            }

            return null;
        } catch (error) {
            console.error('checkUpcomingMatches error:', error);
            return null;
        }
    });

/**
 * Cloud Function: Notify admin when member RSVPs to a match
 * Triggers on match document update and checks for RSVP changes
 */
exports.notifyMatchRsvp = functions.firestore
    .document('teams/primary/matches/{matchId}')
    .onUpdate(async (change, context) => {
        const before = change.before.data();
        const after = change.after.data();

        // Compare RSVP arrays — only trigger if rsvp array has changed
        const beforeRsvp = before.rsvp || [];
        const afterRsvp = after.rsvp || [];

        if (JSON.stringify(beforeRsvp) === JSON.stringify(afterRsvp)) {
            return null; // No RSVP changes
        }

        // Find the new/changed RSVP entries
        const newEntries = afterRsvp.filter(ar => {
            const matching = beforeRsvp.find(br =>
                String(br.memberId) === String(ar.memberId) && br.status === ar.status
            );
            return !matching; // Entry that didn't exist or changed status
        });

        if (newEntries.length === 0) return null;

        try {
            // Get FCM tokens
            const tokensSnap = await db.collection('teams').doc('primary').collection('fcmTokens').get();
            const tokens = [];
            tokensSnap.forEach(doc => {
                if (doc.data().token) tokens.push(doc.data().token);
            });

            if (tokens.length === 0) return null;

            // Get member names
            const membersSnap = await db.collection('teams').doc('primary').collection('members').get();
            const membersMap = {};
            membersSnap.forEach(doc => {
                const m = doc.data();
                membersMap[String(m.id)] = m.name;
            });

            for (const entry of newEntries) {
                const memberName = membersMap[String(entry.memberId)] || 'Thành viên';
                const statusText = entry.status === 'confirmed' ? 'xác nhận tham gia ✅' : 'không tham gia ❌';

                const typeLabel = after.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối';
                const dateFormatted = new Date(after.date).toLocaleDateString('vi-VN');
                const confirmedCount = afterRsvp.filter(r => r.status === 'confirmed').length;

                const message = {
                    notification: {
                        title: `📋 ${memberName} đã ${statusText}`,
                        body: `${typeLabel} vs ${after.opponent || 'Nội bộ'} ngày ${dateFormatted}. Tổng xác nhận: ${confirmedCount} người`,
                    },
                    webpush: { notification: { icon: '/favicon.png' } },
                    tokens: tokens
                };

                const resp = await admin.messaging().sendEachForMulticast(message);
                console.log(`RSVP notification: ${resp.successCount}/${tokens.length} sent for ${memberName}`);
            }

            return null;
        } catch (error) {
            console.error('notifyMatchRsvp error:', error);
            return null;
        }
    });
