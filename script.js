document.addEventListener('DOMContentLoaded', () => {
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


});