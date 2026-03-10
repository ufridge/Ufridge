function toggleFridge(img) {
  const currentFile = img.src.split("/").pop();
  if (currentFile === img.dataset.closed) {
    img.src = "images/" + img.dataset.open;
  } else {
    img.src = "images/" + img.dataset.closed;
  }
}
// 📝 Order Form Logic
const orderForm = document.getElementById('orderForm') || document.getElementById('order-form');
const successMessage = document.getElementById('order-success');

if (orderForm) {
  orderForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // 6. Validate required fields before sending
    if (!orderForm.checkValidity()) {
      alert('請填寫所有必填欄位');
      // Let the browser show the native tooltips as well by re-reporting validity
      orderForm.reportValidity();
      return;
    }

    // 2. Prevent duplicate submissions
    const submitBtn = orderForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送出中...';
    submitBtn.disabled = true;

    // Extract form data
    const formData = new FormData(orderForm);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      line: formData.get('line-id'),
      model: formData.get('fridge-model'),
      duration: formData.get('rental-duration'),
      dorm: formData.get('dormitory'),
      room: formData.get('room-number'),
      payment: formData.get('payment-method'),
      notes: formData.get('notes') || ''
    };

    // 1. Improve form submission logic (fetch, POST, app/json)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx7ozYYmWwm0VA7ZVwIolNl6v9SCjEVxxn6fVOECmgfIGipJKEpW87TU9ChJ4xtsFRiWA/exec';

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });

      // Assume success due to no-cors opaque response
      // 3. Show a success message after submission
      orderForm.style.display = 'none';
      successMessage.style.display = 'block';
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
      // 4. Handle errors
      console.error('Error submitting form:', error);
      alert('提交失敗，請重新嘗試或稍後再試。');
    } finally {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
