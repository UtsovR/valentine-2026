// Configuration
const VALENTINE_NAME = "Nishaaa";

console.log("Valentine script initialized 💖");

document.addEventListener('DOMContentLoaded', () => {
    const questionCard = document.getElementById('question-card');
    const successCard = document.getElementById('success-card');
    const questionText = document.getElementById('valentine-question');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const backBtn = document.getElementById('back-btn');
    const card = document.querySelector('.card');

    if (!questionCard || !successCard || !yesBtn || !noBtn || !card) {
        console.error("Missing essential DOM elements!");
        return;
    }

    if (questionText) {
        questionText.innerText = `${VALENTINE_NAME} will you be my valentine??? 🥺`;
    }

    // Physics State
    let btnX = 0;
    let btnY = 0;
    let velX = 0;
    let velY = 0;
    const friction = 0.94;
    const repulsionStrength = 0.8;
    const detectionRadius = 180;

    // Cache button dimensions to avoid layout thrashing
    let btnWidth = 0;
    let btnHeight = 0;

    // Pointer tracking
    let pointerX = -1000;
    let pointerY = -1000;

    // Initialize position relative to viewport
    const initNoButton = () => {
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        btnWidth = btnRect.width;
        btnHeight = btnRect.height;

        // Start position: relative to the card's position in viewport
        btnX = cardRect.left + cardRect.width * 0.75;
        btnY = cardRect.top + cardRect.height * 0.65;

        noBtn.style.transform = 'translate(-50%, -50%)';
        updateUI();
    };

    const updateUI = () => {
        noBtn.style.left = `${btnX}px`;
        noBtn.style.top = `${btnY}px`;
    };

    const animate = () => {
        // Only run physics if question card is visible
        if (questionCard.classList.contains('hidden')) {
            requestAnimationFrame(animate);
            return;
        }

        // Center point of button
        const centerX = btnX;
        const centerY = btnY;

        // Vector from pointer to button center
        const dx = centerX - pointerX;
        const dy = centerY - pointerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < detectionRadius && distance > 0) {
            // Stronger repulsion as target gets closer
            const force = (detectionRadius - distance) / detectionRadius;
            const angle = Math.atan2(dy, dx);

            velX += Math.cos(angle) * force * repulsionStrength * 15;
            velY += Math.sin(angle) * force * repulsionStrength * 15;
        }

        // Natural drag/friction
        velX *= friction;
        velY *= friction;

        // Update position
        btnX += velX;
        btnY += velY;

        // Viewport Boundary Clamping
        const margin = 20;
        const minX = btnWidth / 2 + margin;
        const maxX = window.innerWidth - btnWidth / 2 - margin;
        const minY = btnHeight / 2 + margin;
        const maxY = window.innerHeight - btnHeight / 2 - margin;

        if (btnX < minX) {
            btnX = minX;
            velX *= -0.5; // Bounce off left/right
        } else if (btnX > maxX) {
            btnX = maxX;
            velX *= -0.5;
        }

        if (btnY < minY) {
            btnY = minY;
            velY *= -0.5; // Bounce off top/bottom
        } else if (btnY > maxY) {
            btnY = maxY;
            velY *= -0.5;
        }

        updateUI();
        requestAnimationFrame(animate);
    };

    // Unified Pointer Tracking
    window.addEventListener('pointermove', (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
    });

    // Yes Button Logic
    yesBtn.addEventListener('click', () => {
        console.log("Yes clicked!");
        questionCard.classList.add('slide-out');
        setTimeout(() => {
            questionCard.classList.add('hidden');
            questionCard.classList.remove('slide-out');
            successCard.classList.remove('hidden');
            successCard.classList.add('fade-in');
        }, 500);
    });

    // Back Button Logic
    backBtn.addEventListener('click', () => {
        successCard.classList.remove('fade-in');
        successCard.classList.add('hidden');
        questionCard.classList.remove('hidden');
        questionCard.classList.add('fade-in');

        // Reset state
        velX = 0;
        velY = 0;
        initNoButton();
    });

    // Start
    initNoButton();
    requestAnimationFrame(animate);

    // Initial positioning fix for responsive resize
    window.addEventListener('resize', () => {
        if (!questionCard.classList.contains('hidden')) {
            initNoButton();
        }
    });
});
