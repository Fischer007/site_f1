// 1. Espera o HTML carregar totalmente antes de rodar o código
document.addEventListener('DOMContentLoaded', () => {

    // Selecionamos todos os cards de equipes
    const cards = document.querySelectorAll('.team-card');

    // 2. Função para observar quando o card aparece na tela (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o card estiver visível na tela...
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 }); // Começa a animação quando 10% do card aparece

    // 3. Aplicamos o estado inicial e o observador em cada card
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "all 0.8s ease-out";
        observer.observe(card);
    });

});