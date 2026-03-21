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


    // --- EFEITO PARALLAX NO CARRO ---
    const carImage = document.querySelector('.main-car-img');

    // Verificamos se a imagem do carro existe na página antes de rodar
    if (carImage) {
        document.addEventListener('mousemove', (e) => {
            // 1. Pegamos a posição do mouse na tela
            const { clientX, clientY } = e;

            // 2. Calculamos o centro da tela
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // 3. Calculamos o quanto o mouse se afastou do centro (-1 a 1)
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            // 4. Definimos a intensidade da inclinação (ex: 15 graus)
            const rotateX = moveY * -15; 
            const rotateY = moveX * 15;

            // 5. Aplicamos a transformação no CSS da imagem
            carImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            // Adicionamos uma sombra que se move para o lado oposto (mais realismo)
            carImage.style.filter = `drop-shadow(${moveX * -30}px ${moveY * -30}px 50px rgba(0,0,0,0.5))`;
    });
}

});