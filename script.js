document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const testimonials = document.querySelectorAll('.testimonial-item');
  let currentSlide = 0;

  if (testimonials.length) {
    const showSlide = (index) => {
      testimonials.forEach((item, i) => item.classList.toggle('active', i === index));
      currentSlide = index;
    };

    setInterval(() => {
      showSlide((currentSlide + 1) % testimonials.length);
    }, 5000);
  }

  const filterButtons = document.querySelectorAll('.filter-pill');
  const menuCards = document.querySelectorAll('[data-category]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.filter;
      menuCards.forEach((card) => {
        const show = category === 'all' || card.dataset.category === category;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');

  document.querySelectorAll('.gallery-trigger').forEach((img) => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
  }

  const cart = [];
  const cartCount = document.querySelector('#cart-count');
  const cartList = document.querySelector('#cart-list');
  const cartTotal = document.querySelector('#cart-total');

  const updateCart = () => {
    if (!cartList || !cartCount || !cartTotal) return;

    cartList.innerHTML = '';
    let total = 0;
    let itemCount = 0;
    cart.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `<span>${item.name} x${item.qty}</span><span>$${item.price * item.qty}</span>`;
      cartList.appendChild(el);
      total += item.price * item.qty;
      itemCount += item.qty;
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = `$${total}`;
  };

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);
      const existing = cart.find((item) => item.name === name);
      if (existing) existing.qty += 1; else cart.push({ name, price, qty: 1 });
      updateCart();
    });
  });

  const backTop = document.querySelector('.back-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300 && backTop) {
      backTop.style.display = 'grid';
    } else if (backTop) {
      backTop.style.display = 'none';
    }
  });

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const reservationForm = document.querySelector('#reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const confirmation = document.querySelector('#reservation-confirmation');
      if (confirmation) {
        confirmation.textContent = 'Reservation request received. Our concierge will confirm your table shortly.';
      }
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const note = document.querySelector('#contact-confirmation');
      if (note) {
        note.textContent = 'Thank you for reaching out. We will respond within one business day.';
      }
    });
  }

  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = newsletterForm.querySelector('input');
      if (email) {
        email.value = '';
        alert('Thank you for subscribing to the Aurelia newsletter.');
      }
    });
  }
});
