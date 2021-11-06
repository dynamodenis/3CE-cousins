// Copyright year
(() => {
  const copyrightYearEl = document.querySelector('.footer__copyright--year');
  copyrightYearEl.textContent = new Date().getFullYear();
})();

// Smooth scrolling
(() => {
  const headerEl = document.querySelector('.header');
  const allLinks = document.querySelectorAll('a:link');
  allLinks.forEach((link) =>
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');

      // Scroll back to top
      if (href === '#')
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

      // Scroll to other links
      if (href != '#' && href.startsWith('#')) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Close mobile navigation
      if (link.classList.contains('main-nav__link')) {
        headerEl.classList.toggle('nav-open');
      }
    })
  );
})();

// Navigation
(() => {
  const headerEl = document.querySelector('.header');
  const btnNavEl = document.querySelector('.btn--mobile-nav');
  btnNavEl.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open');
  });
})();

// Flexing gap property flexbox
(() => {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  if (!isSupported) document.body.classList.add('no-flexbox-gap');
})();

// Send email
document.querySelector('.cta__form').addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = document.querySelector('.btn--form');
  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email-address');
  const messageInput = document.getElementById('message');
  submitBtn.textContent = 'Sending message ...';

  let data = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  const showMessage = (data) => {
    const notification = document.querySelector('.notification');

    const time = 3000;
    if (data.status === 'success') {
      notification.textContent = data.message;
      notification.classList.add('notification--success');
      setTimeout(() => {
        notification.classList.remove('notification--success');
      }, time);
    } else {
      notification.textContent = data.message;
      notification.classList.add('notification--error');
      setTimeout(() => {
        notification.classList.remove('notification--error');
      }, time);
    }

    // Clear input
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    submitBtn.textContent = 'Send message';
  };

  axios
    .post('/send-message', data)
    .then(function (response) {
      const data = response.data;
      showMessage(data);
    })
    .catch(function (error) {
      showMessage(error);
      console.log(error);
    });
});
