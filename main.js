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
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('show');
    });
  }

  // Fechar menu ao clicar em um link (para mobile)
  const navLinks = document.querySelectorAll('nav ul li a');  // Declaração única

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('nav ul');
        const menuToggle = document.querySelector('.menu-toggle');
        navMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
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
        openModal(modal);
      }
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Fechar modal ao clicar fora dele
  window.addEventListener('click', (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  function openModal(modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  }

  function closeModal(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Fechando modal com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal.show');
      if (openModal) {
        closeModal(openModal);
      }
    }
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

  // Efeito de parallax no hero
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        if ('scrollBehavior' in document.documentElement.style) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
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
        img.classList.remove('lazy-load');
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

  // Ajuste de altura para telas móveis
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setVH();
  window.addEventListener('resize', setVH);

  // Validação de formulários
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        // Aqui você pode adicionar a lógica para enviar o formulário
        console.log('Formulário válido, enviando...');
        // Exemplo de feedback visual
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Enviado!';
        submitButton.disabled = true;
        setTimeout(() => {
          submitButton.textContent = 'Enviar';
          submitButton.disabled = false;
        }, 3000);
      } else {
        form.reportValidity();
      }
    });
  });


  // Implementar um simples sistema de tema claro/escuro
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isDark = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      themeToggle.textContent = isDark ? '🌙' : '☀️';
    });

    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeToggle.textContent = '🌙';
    }
  }

  // Adicionar funcionalidade de busca simples
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const allElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
      const matchingElements = Array.from(allElements).filter(el => 
        el.textContent.toLowerCase().includes(searchTerm)
      );

      searchResults.innerHTML = '';
      matchingElements.forEach(el => {
        const resultItem = document.createElement('li');
        resultItem.textContent = el.textContent.substring(0, 50) + '...';
        searchResults.appendChild(resultItem);
      });

      searchResults.style.display = searchTerm ? 'block' : 'none';
    });
  }
});

  // Adiciona um evento de clique para links de navegação suave
  navLinks.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
          e.preventDefault();
          const targetId = e.target.getAttribute('href').slice(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
          }
      }
  });

  

// Função para carregar imagens de forma lazy
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
          }
      });
  }, options);

  images.forEach(img => imageObserver.observe(img));
}

// Chama a função de lazy loading quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', lazyLoadImages);


// Evitar a redeclaração de navLinks, utilizando a já declarada
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('navLinks');

  if (navMenu) {
    navMenu.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
});

 // Adicionar funcionalidade de exibir informações do livro ao clicar em "Saiba Mais"

const buttonsSaibaMais = document.querySelectorAll('.btn-saiba-mais');
const modalLivro = document.getElementById('modal-livro');
const modalTitulo = document.getElementById('modal-titulo');
const modalAutor = document.getElementById('modal-autor');
const modalDescricao = document.getElementById('modal-descricao');

buttonsSaibaMais.forEach(button => {
  button.addEventListener('click', (e) => {
    const livroId = parseInt(button.dataset.livroId);
    const livro = livros.find(l => l.id === livroId);

    if (livro) {
      modalTitulo.textContent = livro.titulo;
      modalAutor.textContent = livro.autor;
      modalDescricao.textContent = livro.descricao;
      openModal(modalLivro);
    }
  });
});

const monumentModal = document.querySelectorAll('modal');
const monumentModalTriggers = document.querySelectorAll('.modal-trigger')\

monumentModalTriggers