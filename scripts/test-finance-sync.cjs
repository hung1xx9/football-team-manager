const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('[1/8] Bắt đầu truy cập hệ thống...');
    await page.goto('http://localhost:5173');

    await page.evaluate(() => {
        localStorage.setItem('user_role', 'admin');
        const sessionExpiry = new Date().getTime() + (6 * 60 * 60 * 1000);
        localStorage.setItem('session_expiry', sessionExpiry.toString());
    });

    console.log('[2/8] Tạo thẻ thành viên vãng lai...');
    await page.goto('http://localhost:5173/members');
    await page.waitForSelector('button:has-text("Thêm Thành Viên")', { timeout: 10000 });
    
    await page.click('button:has-text("Thêm Thành Viên")');
    await page.fill('input[placeholder="Nhập tên..."]', 'SYNC_MEMBER');
    await page.evaluate(() => {
        const selects = document.querySelectorAll('select');
        for (let sel of selects) {
            if (sel.innerHTML.includes('Đóng theo trận')) {
                sel.value = 'per-match';
                sel.dispatchEvent(new Event('change'));
            }
        }
    });
    await page.waitForTimeout(500);
    await page.fill('input[type="number"]:visible', '150000');
    await page.click('button:has-text("Lưu")');
    await page.waitForTimeout(1000);

    console.log('[3/8] Lấy thông tin Tài chính hiện tại (Before)...');
    await page.goto('http://localhost:5173/finance');
    await page.waitForSelector('.stat-value', { timeout: 10000 });
    const initialIncomeStr = await page.evaluate(() => {
        const els = document.querySelectorAll('.stat-value');
        return els[0] ? els[0].textContent.trim() : '';
    });
    console.log(`    -> Tổng Thu (Trước khi thu tiền): ${initialIncomeStr}`);

    console.log('[4/8] Tạo trận đấu và điểm danh thành viên...');
    await page.goto('http://localhost:5173/matches');
    await page.waitForSelector('button:has-text("Thêm Trận Đấu")', { timeout: 10000 });
    await page.click('button:has-text("Thêm Trận Đấu")');
    await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input'));
        const input = inputs.find(i => i.placeholder === 'Tên đội đối thủ');
        if (input) { input.value = 'SYNC_MATCH_OPPONENT'; input.dispatchEvent(new Event('input')) }
    });
    await page.click('button:has-text("Lưu")');
    await page.waitForTimeout(1000);

    // Điểm danh
    await page.evaluate(() => {
       const members = JSON.parse(localStorage.getItem('members') || '[]');
       const syncMem = members.find(m => m.name === 'SYNC_MEMBER');
       const matches = JSON.parse(localStorage.getItem('matches') || '[]');
       const syncMatch = matches.find(m => m.opponent === 'SYNC_MATCH_OPPONENT');
       
       if (syncMem && syncMatch) {
          syncMatch.attendance = [{ memberId: syncMem.id, status: 'present' }];
          localStorage.setItem('matches', JSON.stringify(matches));
       }
    });
    
    await page.reload();
    await page.waitForTimeout(1000);

    console.log('[5/8] Vào Tab "Theo Trận" và tiến hành THU TIỀN...');
    await page.goto('http://localhost:5173/finance');
    
    await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('button'));
        const tab = tabs.find(b => b.textContent.includes('Theo Trận'));
        if (tab) tab.click();
    });
    
    await page.waitForTimeout(1000);
    
    // Check initial match total collected
    const matchMatchInfoBefore = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr');
        if (rows.length > 2) {
             return rows[1].textContent;
        }
        return '';
    });
    console.log(`    -> Trạng thái trận (Trước khi thu): ${matchMatchInfoBefore.replace(/\n\s*/g, ' ').trim()}`);

    // Select Match Details
    await page.evaluate(() => {
        const rows = document.querySelectorAll('tr');
        if (rows.length > 2) {
             rows[1].click();
        }
    });

    await page.waitForTimeout(1000);

    // Click Thu
    await page.evaluate(() => {
        const modal = document.querySelector('.modal');
        if (modal) {
           const btns = Array.from(modal.querySelectorAll('button'));
           const thuBtn = btns.find(b => b.textContent.includes('Thu'));
           if (thuBtn) thuBtn.click();
        }
    });

    await page.waitForTimeout(500);

    // Confirm
    await page.evaluate(() => {
         const confirmBtn = document.querySelector('.swal2-confirm') || 
                            Array.from(document.querySelectorAll('.btn, button')).find(b => b.textContent && b.textContent.toLowerCase().includes('xác nhận'));
         if(confirmBtn) confirmBtn.click();
    });

    await page.waitForTimeout(1000);

    // Verify Match Modal reflects 'Đã thu'
    const modalMatchStatus = await page.evaluate(() => {
        const modal = document.querySelector('.modal');
        if (modal) {
            const rows = Array.from(modal.querySelectorAll('tr'));
            const syncRow = rows.find(r => r.textContent.includes('SYNC_MEMBER'));
            return syncRow ? syncRow.textContent.replace(/\n\s*/g, ' ').trim() : '';
        }
        return '';
    });
    console.log(`    -> Tab Theo Trận (Trong Modal sau khi thu): ${modalMatchStatus}`);

    await page.evaluate(() => {
       const closes = Array.from(document.querySelectorAll('.modal-close, button'));
       const close = closes.find(b => b.textContent === '×' || b.textContent === 'Đóng');
       if (close) close.click();
    });

    await page.waitForTimeout(500);

    console.log('[6/8] Kiểm tra Tab "Tổng Quan" (After)...');
    await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('button'));
        const tab = tabs.find(b => b.textContent.includes('Tổng Quan'));
        if (tab) tab.click();
    });
    await page.waitForTimeout(1000);

    const newIncomeStr = await page.evaluate(() => {
        const els = document.querySelectorAll('.stat-value');
        return els[0] ? els[0].textContent.trim() : '';
    });
    console.log(`    -> Tổng Thu (Sau khi thu tiền): ${newIncomeStr} (Sync thành công!)`);

    console.log('[7/8] Kiểm tra "Lịch Sử Giao Dịch"...');
    await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('button'));
        const tab = tabs.find(b => b.textContent.includes('Lịch Sử Giao Dịch'));
        if (tab) tab.click();
    });
    await page.waitForTimeout(1000);

    const txContent = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr');
        for (let r of rows) {
             if (r.textContent.includes('SYNC_MEMBER') && (r.textContent.includes('150.000') || r.textContent.includes('150,000'))) {
                return r.textContent.replace(/\n\s*/g, ' ').trim();
             }
        }
        return '';
    });

    console.log(`    -> Tìm thấy Giao dịch: ${txContent ? txContent : 'KHÔNG TÌM THẤY!'}`);

    console.log('[8/8] Dọn dẹp dữ liệu Test...');
    await page.goto('http://localhost:5173/matches');
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        const matches = Array.from(document.querySelectorAll('.match-info-main'));
        for (let match of matches) {
            if (match.innerHTML.includes('SYNC_MATCH_OPPONENT')) {
                const card = match.closest('.match-card');
                const btn = Array.from(card.querySelectorAll('button')).find(b => b.textContent.includes('Xóa'));
                if (btn) btn.click();
            }
        }
    });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
         const btn = document.querySelector('.swal2-confirm') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('xác nhận') || b.textContent.toLowerCase().includes('ok'));
         if(btn) btn.click();
    });

    await page.goto('http://localhost:5173/members');
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        const row = Array.from(document.querySelectorAll('tr')).find(r => r.textContent.includes('SYNC_MEMBER'));
        if (row) {
            const btn = row.querySelector('button[title="Xóa"]');
            if (btn) btn.click();
        } else {
            const mobileCards = Array.from(document.querySelectorAll('.card'));
            for(let card of mobileCards) {
               if(card.textContent.includes('SYNC_MEMBER')) {
                   const btns = Array.from(card.querySelectorAll('button'));
                   const delBtn = btns.find(b => b.textContent.includes('Xóa'));
                   if(delBtn) delBtn.click();
               }
            }
        }
    });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
         const btn = document.querySelector('.swal2-confirm') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('xác nhận') || b.textContent.toLowerCase().includes('ok'));
         if(btn) btn.click();
    });

    console.log('✅ Hoàn tất toàn bộ Test!');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
