document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.full-page');
    const body = document.body;

    const colorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se a seção tiver um data-color, usa ele. Se não (Intro), volta pro cinza.
                const newColor = entry.target.getAttribute('data-color') || '#1a1a1a';
                body.style.backgroundColor = newColor;
            }
        });
    }, { threshold: 0.4 }); // Ativa quando 40% da tela estiver à amostra;

    sections.forEach(section => {
        colorObserver.observe(section);
    });
});