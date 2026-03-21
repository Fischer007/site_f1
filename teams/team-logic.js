document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selecionamos os contadores
    const counters = document.querySelectorAll('.counter');
    
    // 2. Função que faz o número subir
    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const increment = target / 50; // Velocidade da animação
        
        const updateCount = () => {
            const count = +el.innerText;
            if (count < target) {
                el.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                el.innerText = target;
            }
        };
        updateCount();
    };

    // 3. Observer para o contador só rodar quando o usuário chegar nas specs
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // Para de observar após animar uma vez
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});