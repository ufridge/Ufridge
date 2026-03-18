function toggleFridge(img) {
  const currentFile = img.src.split("/").pop();
  if (currentFile === img.dataset.closed) {
    img.src = "images/" + img.dataset.open;
  } else {
    img.src = "images/" + img.dataset.closed;
  }
}

// Order Form Logic
const orderForm = document.getElementById('orderForm') || document.getElementById('order-form');
const successMessage = document.getElementById('order-success');


if (orderForm) {
  orderForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // 0. Check legal checkbox
    const legalCheckbox = document.getElementById('legal-checkbox');
    const legalWarning = document.getElementById('legal-warning');
    if (legalCheckbox && !legalCheckbox.checked) {
      if (legalWarning) legalWarning.style.display = 'block';
      legalCheckbox.focus();
      return;
    }
    if (legalWarning) legalWarning.style.display = 'none';

    // 1. Validate required fields
    if (!orderForm.checkValidity()) {
      alert('請填寫所有必填欄位');
      orderForm.reportValidity();
      return;
    }

    // 2. Prevent duplicate submissions
    const submitBtn =
      orderForm.querySelector('.submit-btn') ||
      orderForm.querySelector('button[type="submit"]');

    const originalText = submitBtn ? submitBtn.textContent : '立即預約';

    if (submitBtn) {
      submitBtn.textContent = '送出中...';
      submitBtn.disabled = true;
    }

    // 3. Extract form data
    const formData = new FormData(orderForm);
    const payload = {
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      line: formData.get('line-id') || '',
      model: formData.get('fridge-model') || '',
      duration: formData.get('rental-duration') || '',
      dorm: formData.get('dormitory') || '',
      room: formData.get('room-number') || '',
      payment: formData.get('payment-method') || '',
      notes: formData.get('notes') || ''
    };

    console.log('Submitting payload:', payload);

    const GOOGLE_SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbyimD2sUx2zb32-94QuI2Yo52jgFME64YsaLNj-h_LeUP50kmuJQdJOFrk5Q-Q-xwDsHQ/exec';

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const resultText = await response.text();
      console.log('Raw response:', resultText);

      let result;
      try {
        result = JSON.parse(resultText);
      } catch (parseError) {
        throw new Error('後端回傳不是合法 JSON：' + resultText);
      }

      console.log('Parsed response:', result);

      if (result.result !== 'success') {
        throw new Error(result.message || '後端未成功寫入資料');
      }

      // 4. Show success message only when backend really succeeds
      orderForm.style.display = 'none';

      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        alert('預約成功！我們已收到你的租賃需求。');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('提交失敗：' + error.message);
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  });
}