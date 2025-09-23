document.addEventListener('DOMContentLoaded', () => {
  console.log('[contactForms] init');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function attachValidation(formId, msgId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const msg = document.getElementById(msgId);
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String((data.get('name') || '')).trim();
      const email = String((data.get('email') || '')).trim();
      const message = String((data.get('message') || '')).trim();

      if (name.length < 2) {
        msg.textContent = 'Please enter your name (min 2 characters).';
        return;
      }
      if (!emailRegex.test(email)) {
        msg.textContent = 'Please provide a valid email address.';
        return;
      }
      if (formId === 'contactPageForm' && message.length < 5) {
        msg.textContent = 'Please enter a longer message.';
        return;
      }

      msg.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        const json = await res.json();

        if (json && json.success) {
          msg.textContent = "Thanks! We'll get back to you.";
          form.reset();
        } else {
          msg.textContent = 'Submission failed. Please try again later.';
        }
      } catch (err) {
        msg.textContent = 'Network error. Please try again later.';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Підключаємо обидві форми
  attachValidation('footerContact', 'footerContactMsg');
  attachValidation('contactPageForm', 'contactPageMsg');
});
