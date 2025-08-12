let currentScreen = 'welcomeScreen';
let storyIndex = 0;
let noDodgeCount = 0;

// Navegación entre pantallas
function nextScreen(screenId) {
    document.getElementById(currentScreen).classList.remove('active');
    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
        currentScreen = screenId;
        
        if (screenId === 'questionScreen') {
            startHeartRain();
            // Agregar efecto de escritura a la pregunta principal
            setTimeout(() => {
                const questionElement = document.getElementById('mainQuestion');
                const originalText = questionElement.innerHTML;
                questionElement.innerHTML = '';
                questionElement.style.borderRight = '3px solid #ff1744';
                questionElement.style.animation = 'blink 1s infinite';
                
                let i = 0;
                const typeEffect = setInterval(() => {
                    if (i < originalText.length) {
                        questionElement.innerHTML = originalText.slice(0, i + 1);
                        i++;
                    } else {
                        clearInterval(typeEffect);
                        questionElement.style.borderRight = 'none';
                        questionElement.style.animation = 'glow-text 2s infinite alternate, bounce 3s infinite';
                    }
                }, 100);
            }, 1000);
        } else if (currentScreen === 'celebrationScreen') {
            startCelebrationEffects();
        }
    }, 500);
}

// Historia interactiva
function showStoryTexts() {
    const stories = ['story1', 'story2', 'story3'];
    
    if (storyIndex < stories.length) {
        document.getElementById(stories[storyIndex]).classList.add('show');
        storyIndex++;
        
        if (storyIndex >= stories.length) {
            setTimeout(() => {
                document.querySelector('#questionBtn').style.display = 'inline-block';
                document.querySelector('#storyScreen .next-btn').style.display = 'none';
            }, 1000);
        }
    }
}

// Mostrar viñeta de comentario al pasar el cursor
function showNoComment(btn) {
    // Solo mostrar la viñeta una vez
    if (btn.querySelector('.comment-bubble') || btn.classList.contains('btn-no-hiding')) {
        return;
    }
    
    // Crear viñeta de comentario
    const bubble = document.createElement('div');
    bubble.className = 'comment-bubble';
    bubble.innerHTML = 'Vaya... te dejo solo con SÍ entonces 😏💕';
    
    // Posicionar la viñeta relativa al botón
    btn.style.position = 'relative';
    btn.appendChild(bubble);
    
    // Después de 2.5 segundos, quitar la viñeta y empezar a ocultar el botón
    setTimeout(() => {
        bubble.style.animation = 'bubbleDisappear 0.5s ease-out forwards';
        
        setTimeout(() => {
            bubble.remove();
            
            // Empezar animación lenta de desaparición del botón "No"
            btn.classList.add('btn-no-hiding');
            
            // Después de que termine la animación, ocultar completamente
            setTimeout(() => {
                btn.style.display = 'none';
                
                // Hacer el botón "Sí" más prominente
                const yesBtn = document.querySelector('.btn-yes');
                yesBtn.style.transform = 'scale(1.1)';
                yesBtn.style.animation = 'pulse 1s infinite, rainbow 2s infinite, glow 1.5s infinite alternate';
                yesBtn.innerHTML = '¡ES TU ÚNICA OPCIÓN! 💕✨';
                
                // Centrar el botón "Sí"
                const buttonsContainer = document.querySelector('.answer-buttons');
                buttonsContainer.style.justifyContent = 'center';
                
            }, 2000); // Tiempo de la animación fadeOutSlow
        }, 500); // Tiempo de bubbleDisappear
    }, 2500); // Tiempo que permanece visible la viñeta
}

// Prevenir click en el botón "No" después de que aparezca la viñeta
function preventNo() {
    // No hacer nada, solo evitar que se ejecute cualquier acción
    return false;
}

// Mostrar celebración
function showCelebration() {
    // Crear explosión de corazones inmediata
    createHeartExplosion();
    
    // Efecto de zoom en la pregunta
    const mainQuestion = document.getElementById('mainQuestion');
    mainQuestion.style.transform = 'scale(1.2)';
    mainQuestion.style.color = '#00ff41';
    mainQuestion.innerHTML = '¡DIJISTE QUE SÍ! 🎉💕';
    
    // Cambiar a pantalla de celebración
    setTimeout(() => {
        nextScreen('celebrationScreen');
    }, 2000);
}

// Efectos de celebración
function startCelebrationEffects() {
    // Confetti continuo
    setInterval(createConfetti, 200);
    
    // Cambiar colores de fondo
    let colorIndex = 0;
    const colors = [
        'linear-gradient(135deg, #ff1744 0%, #e91e63 50%, #9c27b0 100%)',
        'linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #673ab7 100%)',
        'linear-gradient(135deg, #9c27b0 0%, #673ab7 50%, #3f51b5 100%)',
        'linear-gradient(135deg, #ff1744 0%, #ff5722 50%, #e91e63 100%)'
    ];
    
    setInterval(() => {
        document.querySelector('.celebration-screen').style.background = colors[colorIndex % colors.length];
        colorIndex++;
    }, 2000);
}

// Efectos visuales
function createSparkles(event) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = event.clientX + (Math.random() - 0.5) * 100 + 'px';
        sparkle.style.top = event.clientY + (Math.random() - 0.5) * 100 + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💕', '💖', '💝', '💗'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = Math.random() * 3 + 1 + 'rem';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `float-heart ${Math.random() * 3 + 2}s ease-out forwards`;
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 50);
    }
}

function createBrokenHearts() {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💔';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = '2rem';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'float-heart 3s ease-out forwards';
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

function createConfetti() {
    const colors = ['#ff1744', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'];
    const confetti = document.createElement('div');
    
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = '999';
    confetti.style.pointerEvents = 'none';
    confetti.style.animation = 'float-heart 4s linear forwards';
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
}

function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['❤️', '💕', '💖'][Math.floor(Math.random() * 3)];
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        
        document.getElementById('floatingHearts').appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

// Reiniciar experiencia
function restartExperience() {
    // Reset variables
    storyIndex = 0;
    noDodgeCount = 0;
    
    // Reset elementos
    document.querySelectorAll('.story-text').forEach(text => text.classList.remove('show'));
    document.getElementById('questionBtn').style.display = 'none';
    document.querySelector('#storyScreen .next-btn').style.display = 'inline-block';
    
    const noBtn = document.getElementById('noBtn');
    noBtn.textContent = 'No... 💔';
    noBtn.style.transform = 'none';
    noBtn.style.pointerEvents = 'auto';
    noBtn.style.opacity = '1';
    
    // Reset pregunta principal
    const mainQuestion = document.getElementById('mainQuestion');
    mainQuestion.innerHTML = '¿Quieres ser mi novia? 💖';
    mainQuestion.style.transform = 'scale(1)';
    mainQuestion.style.color = '#ffffff';
    
    // Reset botón "Sí"
    const yesBtn = document.querySelector('.btn-yes');
    yesBtn.innerHTML = '¡SÍ, QUIERO! 💕';
    yesBtn.style.transform = 'scale(1)';
    yesBtn.style.animation = 'pulse 2s infinite, rainbow 3s infinite';
    
    // Reset contenedor de botones
    const buttonsContainer = document.querySelector('.answer-buttons');
    buttonsContainer.style.justifyContent = 'center';
    
    // Mostrar y resetear botón "No"
    noBtn.style.display = 'inline-block';
    noBtn.classList.remove('btn-no-hiding');
    
    // Limpiar efectos
    document.getElementById('floatingHearts').innerHTML = '';
    
    // Volver al inicio
    nextScreen('welcomeScreen');
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas de fondo
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
        particle.style.background = ['#ff1744', '#e91e63', '#9c27b0'][Math.floor(Math.random() * 3)];
        particle.style.animation = `float-heart ${Math.random() * 4 + 3}s linear forwards`;
        
        document.getElementById('particles').appendChild(particle);
        
        setTimeout(() => particle.remove(), 7000);
    }, 800);
});

// Efectos de sonido simulados con vibraciones (si está disponible)
function vibrate(pattern) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

// Agregar vibración a interacciones importantes
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('start-btn') || 
        e.target.classList.contains('btn-yes') || 
        e.target.classList.contains('next-btn')) {
        vibrate([100, 50, 100]);
    }
});

// Efecto cursor personalizado
document.addEventListener('mousemove', function(e) {
    // Crear trail de corazones pequeños en el cursor ocasionalmente
    if (Math.random() < 0.1) {
        const miniHeart = document.createElement('div');
        miniHeart.innerHTML = '💕';
        miniHeart.style.position = 'fixed';
        miniHeart.style.left = e.clientX + 'px';
        miniHeart.style.top = e.clientY + 'px';
        miniHeart.style.fontSize = '0.8rem';
        miniHeart.style.pointerEvents = 'none';
        miniHeart.style.zIndex = '999';
        miniHeart.style.animation = 'fadeInUp 1s ease-out forwards';
        
        document.body.appendChild(miniHeart);
        setTimeout(() => miniHeart.remove(), 1000);
    }
});

// Mensajes de motivación si tarda mucho en una pantalla
let screenTimer;

function resetScreenTimer() {
    clearTimeout(screenTimer);
    screenTimer = setTimeout(() => {
        if (currentScreen === 'welcomeScreen') {
            showMotivationalMessage("¡Karen te está esperando! 💕 Haz clic para continuar");
        } else if (currentScreen === 'storyScreen') {
            showMotivationalMessage("¡Sigue leyendo esta hermosa historia! 📖");
        } else if (currentScreen === 'questionScreen') {
            showMotivationalMessage("¡Es el momento de la verdad! 💖");
        }
    }, 30000); // 30 segundos
}

function showMotivationalMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = message;
    msgDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 23, 68, 0.9);
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1.1rem;
        z-index: 9999;
        animation: fadeInUp 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        msgDiv.style.animation = 'fadeInUp 0.5s ease-out reverse';
        setTimeout(() => msgDiv.remove(), 500);
    }, 4000);
}

// Inicializar timer
resetScreenTimer();

// Reset timer en cada cambio de pantalla
const originalNextScreen = nextScreen;
nextScreen = function(screenId) {
    resetScreenTimer();
    return originalNextScreen(screenId);
};
