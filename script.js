// Configuration
const VALENTINE_NAME = "Nishaaa";

// DOM Elements
const questionCard = document.getElementById('question-card');
const successCard = document.getElementById('success-card');
const questionText = document.getElementById('valentine-question');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const backBtn = document.getElementById('back-btn');

// Set Dynamic Name
questionText.innerText = `${VALENTINE_NAME} will you be my valentine??? 🥺`;

// Initial positioning of the No button
const resetNoButton = () => {
    noBtn.style.transition = 'none';
    noBtn.style.position = 'absolute';
    noBtn.style.left = '70%';
    noBtn.style.top = '50%';
    noBtn.style.transform = 'translateY(-50%)';
};

// "No" Button Interaction Logic
const moveNoButton = () => {
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Enable transition for smooth movement
    noBtn.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1.2)';

    // Padding from edges
    const padding = 20;

    // Calculate maximum available space inside the card
    const maxX = cardRect.width - btnRect.width - padding;
    const maxY = cardRect.height - btnRect.height - padding;

    // Generate random position within boundaries
    let randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    let randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    // Final safety check for boundaries
    randomX = Math.max(padding, Math.min(randomX, maxX));
    randomY = Math.max(padding, Math.min(randomY, maxY));

    // Apply new position relative to the container
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = 'none';
};

// Events for "No" button escaping
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// "Yes" Button Logic
yesBtn.addEventListener('click', () => {
    questionCard.classList.add('slide-out');

    setTimeout(() => {
        questionCard.classList.add('hidden');
        questionCard.classList.remove('slide-out');

        successCard.classList.remove('hidden');
        successCard.classList.add('fade-in');
    }, 500);
});

// "Back" Button Logic
backBtn.addEventListener('click', () => {
    successCard.classList.remove('fade-in');
    successCard.classList.add('hidden');

    questionCard.classList.remove('hidden');
    questionCard.classList.add('fade-in');

    // Reset No button position
    resetNoButton();
});

// Proximity tracking for the "No" button
document.addEventListener('mousemove', (e) => {
    if (questionCard.classList.contains('hidden')) return;

    const noBtnRect = noBtn.getBoundingClientRect();
    const noBtnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const noBtnCenterY = noBtnRect.top + noBtnRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - noBtnCenterX, 2) +
        Math.pow(e.clientY - noBtnCenterY, 2)
    );

    // If mouse gets within 100px, flee!
    if (distance < 100) {
        moveNoButton();
    }
});

// Initialize
resetNoButton();
