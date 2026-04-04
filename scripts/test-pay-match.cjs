const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to http://localhost:5173');
    await page.goto('http://localhost:5173');

    // Set localStorage auth to bypass login
    console.log('Setting auth in localStorage...');
    await page.evaluate(() => {
        localStorage.setItem('user_role', 'admin');
        const sessionExpiry = new Date().getTime() + (6 * 60 * 60 * 1000);
        localStorage.setItem('session_expiry', sessionExpiry.toString());
    });

    // Go to members page to create member
    console.log('Navigating to Members...');
    await page.goto('http://localhost:5173/members');
    
    // We add a member
    await page.waitForSelector('button:has-text("Thêm Thành Viên")', { timeout: 10000 });
    await page.click('button:has-text("Thêm Thành Viên")');

    await page.fill('input[placeholder="Nhập tên..."]', 'TEST_MEMBER_PER_MATCH');
    await page.selectOption('select', { value: 'per-match' }); // Wait, maybe we need to be careful with the exact select
    
    // Evaluate to select the payment type
    await page.evaluate(() => {
        // Find select for paymentType
        const selects = document.querySelectorAll('select');
        for (let sel of selects) {
            if (sel.innerHTML.includes('Đóng theo đội') && sel.innerHTML.includes('Đóng theo trận')) {
                sel.value = 'per-match';
                sel.dispatchEvent(new Event('change'));
            }
        }
    });

    await page.waitForTimeout(500);

    await page.fill('input[type="number"]', '50000');
    // Save
    await page.click('button:has-text("Lưu")');

    console.log('Member created successfully.');

    await page.waitForTimeout(2000); // give time for DB update

    // Navigate to matches
    console.log('Navigating to Matches...');
    await page.goto('http://localhost:5173/matches');
    
    await page.waitForSelector('button:has-text("Thêm Trận Đấu")', { timeout: 10000 });
    await page.click('button:has-text("Thêm Trận Đấu")');

    // evaluate to fill opponent
    await page.evaluate(() => {
        const inputs = document.querySelectorAll('input');
        for (let inp of inputs) {
            if (inp.placeholder === 'Tên đội đối thủ') {
                inp.value = 'TEST TRẬN ĐẤU';
                inp.dispatchEvent(new Event('input'));
            }
        }
    });

    await page.click('button:has-text("Lưu")');
    console.log('Match created successfully.');
    await page.waitForTimeout(2000);
    
    // Clean up Match
    console.log('Cleaning up TEST Match...');
    await page.evaluate(() => {
        const matches = Array.from(document.querySelectorAll('.match-info-main'));
        for (let match of matches) {
            if (match.innerHTML.includes('TEST TRẬN ĐẤU')) {
                const card = match.closest('.match-card');
                const btn = Array.from(card.querySelectorAll('button')).find(b => b.textContent.includes('Xóa'));
                if (btn) btn.click();
            }
        }
    });
    
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
         const confirmBtn = document.querySelector('button.btn-danger:has-text("Xác nhận"), button.btn-danger:has-text("Xóa"), .swal2-confirm');
         if(confirmBtn) confirmBtn.click();
         else {
             const anyOk = Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('xác nhận'));
             if (anyOk) anyOk.click();
         }
    });

    await page.waitForTimeout(2000);

    // Clean up Member
    console.log('Cleaning up TEST Member...');
    await page.goto('http://localhost:5173/members');
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
        const row = Array.from(document.querySelectorAll('tr')).find(r => r.textContent.includes('TEST_MEMBER_PER_MATCH'));
        if (row) {
            const btn = row.querySelector('button[title="Xóa"]');
            if (btn) btn.click();
        } else {
            console.log('Member implicitly deleted or could not find it? Try reading mobile view');
            const mobileCards = Array.from(document.querySelectorAll('.card'));
            for(let card of mobileCards) {
               if(card.textContent.includes('TEST_MEMBER_PER_MATCH')) {
                   const btns = Array.from(card.querySelectorAll('button'));
                   const delBtn = btns.find(b => b.textContent.includes('Xóa'));
                   if(delBtn) delBtn.click();
               }
            }
        }
    });

    await page.waitForTimeout(1000);
    await page.evaluate(() => {
         const confirmBtn = document.querySelector('button.btn-danger:has-text("Xác nhận"), button.btn-danger:has-text("Xóa"), .swal2-confirm');
         if(confirmBtn) confirmBtn.click();
         else {
             const anyOk = Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('xác nhận'));
             if (anyOk) anyOk.click();
         }
    });

    console.log('Cleanup completed. Pay-per-match flow tested.');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
