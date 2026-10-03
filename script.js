/**
 * Mehfil-e-Chai - Custom Javascript
 * Handles scroll effects, mobile menu behavior, form validation & animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Transition
  const navbar = document.querySelector('.custom-navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger on load in case page is refreshed while scrolled down

  // 2. Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
  const menuCollapse = document.getElementById('navbarNav');
  if (menuCollapse) {
    // We use Bootstrap's Collapse instance if available
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // 3. Viewport Scroll Reveal (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once visible, stop observing to keep active state
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Offset slightly to feel more natural
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 4. Contact / Reservation Form Mock Submission
  const contactForm = document.getElementById('mehfilContactForm');
  const contactSuccessModal = document.getElementById('contactSuccessModal');

  if (contactForm && contactSuccessModal) {
    const bsModal = new bootstrap.Modal(contactSuccessModal);

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple form validation
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      // If valid, simulate a loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Brewing message...`;

      setTimeout(() => {
        // Success: Reset form and show premium success modal
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Reset validation and fields
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        
        // Show success modal
        bsModal.show();
      }, 1500);
    });
  }
});
