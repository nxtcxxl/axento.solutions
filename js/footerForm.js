document.addEventListener('DOMContentLoaded', () => {
  console.log('[footerForm] init');
  const form = document.getElementById('footerContact');
  if (!form) return;

  const msg = document.getElementById('footerContactMsg');
  const submitBtn = form.querySelector('button[type="submit"]');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String((data.get('name') || '')).trim();
    const email = String((data.get('email') || '')).trim();

    // Жорстка валідація
    if (name.length < 2) {
      msg.textContent = 'Please enter your name (min 2 characters).';
      return;
    }
    if (!emailRegex.test(email)) {
      msg.textContent = 'Please provide a valid email address.';
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
});
