// Importar estilos
import './styles/main.css';

// Ejecutar código cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM completamente cargado');

  // Elementos del DOM
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');

  // Efecto de scroll para el header
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Toggle para menú móvil
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (mobileToggle) mobileToggle.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');

      // Quitar clase activa de todos los enlaces
      navLinks.forEach(item => item.classList.remove('active'));

      // Añadir clase activa al enlace clickeado
      link.classList.add('active');
    });
  });

  // Actualizar enlace activo al hacer scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(function(section) {
      const sectionEl = section as HTMLElement;
      const sectionTop = sectionEl.offsetTop - 100;
      const sectionHeight = sectionEl.offsetHeight;
      const id = section.getAttribute('id');

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Revelar animaciones al hacer scroll
  function revealOnScroll() {
    const revealCards = document.querySelectorAll('.reveal-card');

    revealCards.forEach(function(card) {
      const cardTop = card.getBoundingClientRect().top;
      const triggerBottom = window.innerHeight * 0.8;

      if (cardTop < triggerBottom) {
        card.classList.add('show');
      }
    });
  }

  // Efecto de escritura en terminal
  function simulateTerminalTyping() {
    const terminalCommands = document.querySelectorAll('.terminal-body .command');
    if (terminalCommands.length === 0) return;

    const typingSpeed = 80; // milisegundos por caracter
    let currentCommandIndex = 0;

    function typeCommand(command: HTMLElement, text: string, index = 0) {
      if (index < text.length) {
        command.textContent += text[index];
        setTimeout(function() {
          typeCommand(command, text, index + 1);
        }, typingSpeed);
      } else {
        currentCommandIndex++;
        if (currentCommandIndex < terminalCommands.length) {
          setTimeout(function() {
            const nextCommand = terminalCommands[currentCommandIndex] as HTMLElement;
            if (nextCommand) {
              const nextText = nextCommand.textContent || '';
              nextCommand.textContent = '';
              typeCommand(nextCommand, nextText);
            }
          }, 500);
        }
      }
    }

    const firstCommand = terminalCommands[0] as HTMLElement;
    if (firstCommand) {
      const firstText = firstCommand.textContent || '';
      firstCommand.textContent = '';
      typeCommand(firstCommand, firstText);
    }
  }

  // Iniciar efecto de escritura en terminal
  simulateTerminalTyping();

  // Escuchar eventos de scroll
  window.addEventListener('scroll', function() {
    updateActiveLink();
    revealOnScroll();
  });

  // Llamada inicial para mostrar elementos visibles
  revealOnScroll();
});
