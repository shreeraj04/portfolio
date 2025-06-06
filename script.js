// Smooth Scroll
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Dark/Light Mode Toggle
const toggleTheme = document.getElementById('toggle-theme');
const body = document.body;
const icon = toggleTheme.querySelector('i');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

toggleTheme.addEventListener('click', () => {
  body.classList.toggle('light');
  if (body.classList.contains('light')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

// Scroll Animations
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => observer.observe(section));

// EmailJS Contact Form Integration
// You must sign up at https://www.emailjs.com/ and get your userID, serviceID, and templateID
// Replace the placeholders below with your actual EmailJS values
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = 'Sending...';

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;

    // Map recipient to email address
    const to_email = recipient === 'business' ? 'shreerajbhat.business@gmail.com' : 'shreerajbhat@gmail.com';

    // EmailJS integration
    // You must include EmailJS SDK in your HTML for this to work:
    // <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
    if (window.emailjs) {
      emailjs.init('YOUR_EMAILJS_USER_ID'); // <-- Replace with your EmailJS user ID
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        to_email: to_email,
        subject: subject,
        message: message
      })
      .then(function() {
        status.textContent = 'Message sent successfully!';
        contactForm.reset();
      }, function(error) {
        status.textContent = 'Failed to send message. Please try again later.';
      });
    } else {
      status.textContent = 'Email service not available.';
    }
  });
}