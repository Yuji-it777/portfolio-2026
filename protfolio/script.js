const cursor = document.querySelector('.custom-cursor');
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .stat, .social-btn, .service-card, .testimonial-card, .case-study');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

hoverTargets.forEach(target => {
  target.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  target.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

const heroName = document.getElementById('hero-name');
const nameText = heroName.textContent;
heroName.textContent = '';

nameText.split('').forEach((char, index) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.className = char === ' ' ? 'space' : 'letter';
  span.style.transitionDelay = `${index * 0.05}s`;
  heroName.appendChild(span);
});

window.addEventListener('load', () => {
  document.querySelectorAll('.hero-name .letter').forEach(letter => {
    setTimeout(() => letter.classList.add('visible'), 500);
  });
});

const roleElement = document.getElementById('hero-role');
const roleText = 'Developer & Graphic Designer crafting creative digital experiences';
let roleIndex = 0;

function typeRole() {
  if (roleIndex < roleText.length) {
    roleElement.textContent += roleText.charAt(roleIndex);
    roleIndex++;
    setTimeout(typeRole, 50);
  }
}

setTimeout(typeRole, 500 + nameText.replace(/ /g, '').length * 50 + 500);

const heroContent = document.querySelector('.hero-content');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroContent.style.transform = `translate(${x}px, ${y}px)`;
});

const contactForm = document.querySelector('.contact-form');
const formFeedback = document.createElement('div');
formFeedback.className = 'form-feedback';
contactForm.appendChild(formFeedback);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const submitBtn = contactForm.querySelector('.btn');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(() => {
    formFeedback.textContent = "Thanks! I'll get back to you soon.";
    formFeedback.className = 'form-feedback success';
    contactForm.reset();
  }).catch(() => {
    formFeedback.textContent = 'Oops! Something went wrong. Please try again.';
    formFeedback.className = 'form-feedback error';
  }).finally(() => {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  });
});

document.querySelectorAll('.rail-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const scrollElements = document.querySelectorAll('.section, .service-card, .testimonial-card, .skill-card, .project-card, .case-study, .stat');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const progress = entry.target.querySelector('.skill-progress');
      if (progress) {
        const targetWidth = progress.getAttribute('data-width');
        progress.style.width = targetWidth;
      }
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

scrollElements.forEach(el => scrollObserver.observe(el));
