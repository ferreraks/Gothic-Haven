// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Animação de fade-in para elementos
  const fadeElems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElems.forEach(elem => observer.observe(elem));

  // Animação de flutuação para elementos específicos
  const floatElems = document.querySelectorAll('.float');
  floatElems.forEach(elem => {
    elem.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
  });

  // Funcionalidade de menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Fechar menu ao clicar em um link (para mobile)
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('show');
      }
    });
  });

  // Mudança de estilo do header ao rolar
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Funcionalidade de modal
  const modals = document.querySelectorAll('.modal');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modalCloses = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector(trigger.dataset.modal);
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Fechar modal ao clicar fora dele
  window.addEventListener('click', (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

  // Animação de digitação para títulos
  const typingElems = document.querySelectorAll('.typing');
  typingElems.forEach(elem => {
    const text = elem.textContent;
    elem.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        elem.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  });

  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Ajuste o valor para modificar a velocidade
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Lazy loading para imagens
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        lazyLoadObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => lazyLoadObserver.observe(img));

  // Animação de contagem para números
  const countElems = document.querySelectorAll('.count-up');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const countElem = entry.target;
        const target = parseInt(countElem.dataset.target);
        let count = 0;
        const updateCount = () => {
          const increment = target / 200;
          if (count < target) {
            count += increment;
            countElem.innerText = Math.ceil(count);
            setTimeout(updateCount, 10);
          } else {
            countElem.innerText = target;
          }
        };
        updateCount();
        countObserver.unobserve(countElem);
      }
    });
  });

  countElems.forEach(elem => countObserver.observe(elem));
});

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})