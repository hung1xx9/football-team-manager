# MoMo Integration - Quick Reference

## API Endpoints & Methods

### MoMo Service (`src/utils/momoService.js`)

```javascript
import { momoService } from '@/utils/momoService';

// Create QR payment
const payment = await momoService.createPaymentQR({
    orderId: 'MEMBER_ID_TIMESTAMP',
    amount: 100000,
    description: 'Member - Payment',
    memberName: 'Nguyen Van A'
});

// Check transaction status  
const status = await momoService.checkTransactionStatus(orderId);

// Generate personal link (fallback)
const link = momoService.generatePersonalQRLink({
    phone: '0901234567',
    amount: 100000,
    note: 'Payment note'
});
```

### useMoMo Composable (`src/composables/useMoMo.js`)

```javascript
import { useMoMo } from '@/composables/useMoMo';

const {
    isBusinessAPIConfigured,  // true if Business API is set up
    isPersonalConfigured,      // true if personal phone is set
    createPayment,             // Smart router - chooses best method
    checkPaymentStatus,        // Check payment status
    manuallyConfirmPayment,    // Manually confirm payment
    isLoading,
    error,
    currentPayment
} = useMoMo();

// Create payment (auto chooses method)
const payment = await createPayment({
    memberId: 'member_123',
    memberName: 'Nguyen Van A',
    amount: 100000,
    category: 'fund' // or 'fine'
});
```

## Webhook Handler

**Endpoint**: `/momoWebhook` (Firebase Function)

**Triggered when**: MoMo payment is successful

**Action**: Automatically creates transaction in Firestore

**Security**: Verifies signature using HMAC SHA256

## Configuration Keys

### Client (.env)
```
VITE_MOMO_PARTNER_CODE
VITE_MOMO_ACCESS_KEY
VITE_MOMO_SECRET_KEY
VITE_MOMO_ENDPOINT
VITE_APP_URL
```

### Firebase Functions
```bash
firebase functions:config:set momo.partner_code="XXX"
firebase functions:config:set momo.access_key="XXX"
firebase functions:config:set momo.secret_key="XXX"
firebase functions:config:set momo.endpoint="https://test-payment.momo.vn"
firebase functions:config:set app.url="https://your-domain.com"
```

## Transaction Data Structure

### Auto (from webhook)
```javascript
{
    type: 'income',
    category: 'fund' | 'fine',
    amount: 100000,
    description: 'Payment description',
    date: '2026-01-15',
    memberId: 'member_123',
    momoTransId: 'MOMO_TRANS_ID',
    momoOrderId: 'ORDER_ID',
    momoRequestId: 'REQUEST_ID',
    source: 'momo_auto',
    createdAt: Timestamp
}
```

### Manual
```javascript
{
    type: 'income',
    category: 'fund' | 'fine',
    amount: 100000,
    description: 'Member - Payment (MoMo)',
    date: '2026-01-15',
    memberId: 'member_123',
    source: 'momo_manual',
    createdAt: Timestamp
}
```

## Common Issues

| Issue | Solution |
|-------|----------|
| No webhook received | Check Firebase Functions deployment & logs |
| Signature error | Verify secret key matches MoMo portal |
| CORS error | Use Firebase Functions, not client-side |
| Duplicate webhooks | Already handled - checks requestId |

## Testing

### Test Credentials
Use MoMo test environment credentials from Developer Portal

### Local Testing
1. Use `firebase emulators:start` for functions
2. Use ngrok to expose local webhook: `ngrok http 5001`
3. Configure ngrok URL as webhook in MoMo portal

### Production Checklist
- [ ] Switch to production endpoint
- [ ] Update webhook URL to production function
- [ ] Test small amount first
- [ ] Monitor logs for 24h

## Support Links

- API Docs: https://developers.momo.vn/v3/docs/payment/api/wallet/onetime
- SDK Examples: https://github.com/momo-wallet/payment
- Business Portal: https://business.momo.vn/
