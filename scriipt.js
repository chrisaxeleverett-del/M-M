// Game Setup
const emojis = ['❤️', '💍', '💌', '🌹', '❤️', '💍', '💌', '🌹'];
let shuffled = emojis.sort(() => Math.random() - 0.5);
const grid = document.getElementById('grid');
let selected = [];
let matches = 0;

shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.val = emoji;
    card.innerText = emoji;
    card.onclick = handleFlip;
    grid.appendChild(card);
});

function handleFlip() {
    if (selected.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        selected.push(this);
        if (selected.length === 2) setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (selected[0].dataset.val === selected[1].dataset.val) {
        matches += 2;
        if (matches === emojis.length) showPage('gateway-page');
    } else {
        selected.forEach(c => c.classList.remove('flipped'));
    }
    selected = [];
}

// Navigation Logic
function showPage(pageId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(pageId);
    target.classList.add('active');

    // Visual effect for photos on Vows page
    if(pageId === 'vows-page') {
        setTimeout(() => {
            document.querySelectorAll('.story-img').forEach(img => img.classList.add('visible'));
        }, 300);
    }
}