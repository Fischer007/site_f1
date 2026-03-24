document.addEventListener('DOMContentLoaded', () => {
    // INTRO Animation
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        // Pequeno delay para garantir que o usuário veja a animação
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2500);
    })



    const sections = document.querySelectorAll('.full-page');
    const observerOptions = {
        threshold: 0.5 // Ativa quando 50% da seção estiver na tela
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Muda a cor de fundo
                const newColor = entry.target.getAttribute('data-color') || '#1a1a1a';
                document.body.style.backgroundColor = newColor;

                // 2. Adiciona a classe 'active' para disparar a subida do conteúdo
                entry.target.classList.add('active');
            } else {
                // Opcional: Remove a classe ao sair para animar de novo quando voltar
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });



    // ---MENU Cellphone Function---
    const menu = document.querySelector('#mobile-menu');
    const navList = document.querySelector('.nav-list');
    const closeMenu = document.querySelector('#close-menu');
    const body = document.body;

    const toggleMenu = () => {
        menu.classList.toggle('is-active');
        navList.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navList.classList.contains('active')) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed'; // Prevent background scroll on iOS
            body.style.width = '100%';
        } else {
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    };

    menu.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    navList.addEventListener('click', (e) => {
        if (e.target === navList) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Quando o menu abre, animamos os itens individualmente
    menu.addEventListener('click', () => {
        const navItems = document.querySelectorAll('.nav-list li');
        
        navItems.forEach((item, index) => {
            if (navList.classList.contains('active')) {
                // Cria um atraso cascata: o primeiro entra, depois o segundo...
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                item.style.animation = '';
            }
        });
    });

    // Smooth scroll for mobile tips link
    const mobileTipsLink = document.querySelector('a[href="#mobile-tips"]');
    if (mobileTipsLink) {
        mobileTipsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('mobile-tips');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Improve scroll performance on mobile
    let scrollTimeout;
    const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Any scroll-based logic can go here
        }, 100);
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

});