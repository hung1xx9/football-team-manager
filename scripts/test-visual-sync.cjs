const { chromium } = require('playwright');

(async () => {
  // Chạy UI có giao diện, tốc độ siêu chậm lại để xem
  const browser = await chromium.launch({ 
    headless: false, 
    slowMo: 600, // Làm chậm mỗi thao tác cực rõ ràng
    args: ['--start-maximized'] 
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  try {
    console.log('🔗 Đang mở giao diện hệ thống...');
    await page.goto('http://localhost:5173');

    // Bypass Auth
    await page.evaluate(() => {
        localStorage.setItem('user_role', 'admin');
        const sessionExpiry = new Date().getTime() + (6 * 60 * 60 * 1000);
        localStorage.setItem('session_expiry', sessionExpiry.toString());
    });

    console.log('👤 Đang di chuyển sang màn hình Thành Viên...');
    await page.goto('http://localhost:5173/members');
    await page.waitForSelector('button:has-text("Thêm Thành Viên")', { timeout: 10000 });
    
    console.log('➕ Đang tự động tạo [Thành viên vãng lai - Đá theo trận]...');
    await page.click('button:has-text("Thêm Thành Viên")');
    await page.fill('input[placeholder="Nhập tên..."]', 'TEST THEO TRẬN (Tự Động)');
    await page.waitForTimeout(1000);

    // CLICK BASE SELECT
    console.log('👉 Đang đổi hình thức sang đá theo trận...');
    // Click vào Dropdown (nếu là BaseSelect)
    await page.evaluate(() => {
        const triggers = Array.from(document.querySelectorAll('.base-select-trigger'));
        // Tìm cái có chữ liên quan đến Đóng
        for(let trigger of triggers) {
             trigger.click();
        }
    });

    await page.waitForTimeout(1000);

    await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.combobox-item'));
        const target = items.find(i => i.textContent.includes('Đóng theo trận'));
        if (target) target.click();
    });

    await page.waitForTimeout(1000);
    // Nhập số tiền
    await page.fill('input[type="number"]:visible', '175000');
    await page.click('button:has-text("Lưu")');
    await page.waitForTimeout(2000);

    console.log('⚽ Tự động tạo trận đấu... ');
    await page.goto('http://localhost:5173/matches');
    await page.waitForSelector('button:has-text("Thêm Trận Đấu")', { timeout: 10000 });
    await page.click('button:has-text("Thêm Trận Đấu")');
    await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input'));
        const input = inputs.find(i => i.placeholder === 'Tên đội đối thủ');
        if (input) { input.value = 'FC TEST (AUTO)'; input.dispatchEvent(new Event('input')) }
    });
    await page.click('button:has-text("Lưu")');
    await page.waitForTimeout(2000);

    console.log('✅ Tự động điểm danh có mặt cho thành viên... ');
    await page.evaluate(() => {
       const members = JSON.parse(localStorage.getItem('members') || '[]');
       const syncMem = members.find(m => m.name === 'TEST THEO TRẬN (Tự Động)');
       const matches = JSON.parse(localStorage.getItem('matches') || '[]');
       const syncMatch = matches.find(m => m.opponent === 'FC TEST (AUTO)');
       
       if (syncMem && syncMatch) {
          syncMatch.attendance = [{ memberId: syncMem.id, status: 'present' }];
          localStorage.setItem('matches', JSON.stringify(matches));
       }
    });
    await page.reload();
    await page.waitForTimeout(3000);

    console.log('💰 Vào mục Tài Chính để THU TIỀN...');
    await page.goto('http://localhost:5173/finance');
    
    // Vào Tab "Theo Trận"
    await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('button'));
        const tab = tabs.find(b => b.textContent.includes('Theo Trận'));
        if (tab) tab.click();
    });
    await page.waitForTimeout(3000);
    
    // Mở Modal của trận
    await page.evaluate(() => {
        const rows = document.querySelectorAll('data-table tr, tr');
        let clicked = false;
        for (let row of rows) {
             if (row.textContent.includes('FC TEST (AUTO)')) { row.click(); clicked = true; break; }
        }
        if(!clicked && rows.length > 2) {
             rows[2].click();
        }
    });
    await page.waitForTimeout(3000);

    console.log('👉 Tiến hành click "Thu"...');

    await page.evaluate(() => {
        const modal = document.querySelector('.modal');
        if (modal) {
           const btns = Array.from(modal.querySelectorAll('button'));
           const thuBtn = btns.find(b => b.textContent.includes('Thu'));
           if (thuBtn) thuBtn.click();
        }
    });
    await page.waitForTimeout(2000);

    // Xác nhận BẰNG NÚT ĐỒNG Ý THEO ĐÚNG APPCONFIRM.VUE
    await page.evaluate(() => {
         const btnConfirm = Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('đồng ý') || b.textContent.toLowerCase().includes('xác nhận'));
         if(btnConfirm) btnConfirm.click();
    });
    await page.waitForTimeout(3000);

    // Đóng Modal trận đấu
    await page.evaluate(() => {
       const closes = Array.from(document.querySelectorAll('.modal-close, button'));
       const close = closes.find(b => b.textContent === '×' || b.textContent === 'Đóng');
       if (close) close.click();
    });
    await page.waitForTimeout(2000);

    console.log('👀 Di chuyển sang "Tổng Quan" để xem kết quả Sync...');
    await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('button'));
        const tab = tabs.find(b => b.textContent.includes('Tổng Quan'));
        if (tab) tab.click();
    });
    await page.waitForTimeout(6000);

    console.log('👀 Di chuyển sang "Lịch Sử Giao Dịch" để xem dòng lệnh mới...');
    await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('button'));
        const tab = tabs.find(b => b.textContent.includes('Lịch Sử Giao Dịch'));
        if (tab) tab.click();
    });
    await page.waitForTimeout(6000);

    console.log('🧹 Đang xoá phần tử Test...');
    
    await page.goto('http://localhost:5173/matches');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
        const matches = Array.from(document.querySelectorAll('.match-info-main'));
        for (let match of matches) {
            if (match.innerHTML.includes('FC TEST (AUTO)')) {
                const card = match.closest('.match-card');
                const btn = Array.from(card.querySelectorAll('button')).find(b => b.textContent.includes('Xóa'));
                if (btn) btn.click();
            }
        }
    });
    await page.waitForTimeout(1500);
    await page.evaluate(() => {
         const btn = document.querySelector('.swal2-confirm') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('đồng ý') || b.textContent.toLowerCase().includes('xác nhận') || b.textContent.toLowerCase().includes('ok'));
         if(btn) btn.click();
    });

    await page.goto('http://localhost:5173/members');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
        const row = Array.from(document.querySelectorAll('tr')).find(r => r.textContent.includes('TEST THEO TRẬN (Tự Động)'));
        if (row) {
            const btn = row.querySelector('button[title="Xóa"]');
            if (btn) btn.click();
        }
    });
    await page.waitForTimeout(1500);
    await page.evaluate(() => {
         const btn = document.querySelector('.swal2-confirm') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('đồng ý') || b.textContent.toLowerCase().includes('xác nhận') || b.textContent.toLowerCase().includes('ok'));
         if(btn) btn.click();
    });
    await page.waitForTimeout(3000);

    console.log('🎉 Đã chạy xong và dọn dẹp sạch sẽ!');

  } catch (error) {
    console.error('Lỗi khi chạy Auto Test:', error);
  } finally {
    await browser.close();
  }
})();
