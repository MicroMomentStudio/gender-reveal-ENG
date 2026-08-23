// --- HELPER FUNCTION TO SWITCH STAGES ---
function switchStages(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(currentId).classList.add('hidden');

    const nextStage = document.getElementById(nextId);
    nextStage.classList.remove('hidden');
    nextStage.classList.add('active');
}

// --- GAME 1: FIND THE BOTTLE ---
function firstGameWin(element) {
    element.textContent = "🍼";
    document.getElementById('msg1').textContent = "كفو! لقيتوا المرضعة الصح! 🎉";
    
    setTimeout(() => {
        switchStages('game1-stage', 'game2-stage');
    }, 1000);
}

function checkFirstGame(element, isCorrect) {
    if (typeof isCorrect === 'function') {
        isCorrect(element);
    } else {
        element.textContent = "💔";
        element.style.pointerEvents = 'none';
        document.getElementById('msg1').textContent = "أوبس، مب هذي! حاولوا في صندوق ثاني 🤭";
    }
}

// --- GAME 2: HATCH THE EGG ---
let eggStep = 0;
const eggStages = ['🥚', '🐣', '🐤', '💥', '👼'];
const eggMessages = [
    "البيضة تحركت شوي! اضغطوا مرة ثانية...",
    "طلع راس الكتكوت الصغنون! اضغطوا بعد...",
    "يا الله، وايد قريب تتفقس!",
    "بووووم! الكائن اللطيف طلع!",
    "يا حليله البيبي!"
];

function hatchEgg() {
    eggStep++;
    const eggEmoji = document.getElementById('egg-emoji');
    const msg2 = document.getElementById('msg2');
    const eggBtn = document.getElementById('egg-btn');

    if (eggStep < eggStages.length) {
        eggEmoji.textContent = eggStages[eggStep];
        msg2.textContent = eggMessages[eggStep];
    }

    if (eggStep === eggStages.length - 1) {
        eggBtn.textContent = "للنهاية الكبرى ✨";
    }

    if (eggStep >= eggStages.length) {
        setTimeout(() => {
            switchStages('game2-stage', 'game3-stage');
        }, 600);
    }
}

// --- GAME 3: PINK OR BLUE CHOICE ---
function makeChoice(choice) {
    const feedback = document.getElementById('choice-feedback');

    if (choice === 'pink') {
        feedback.textContent = "❌ غلط! مب وردي، جربوا اللون الثاني 🤭";
        feedback.style.color = "#d32f2f";
    } else {
        feedback.textContent = "✅ صح 100%! إحساسكم في مكانه 🎉";
        feedback.style.color = "#388e3c";

        triggerConfetti();

        setTimeout(() => {
            switchStages('game3-stage', 'result-stage');
        }, 1500);
    }
}

// --- CONFETTI EFFECT ---
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2196f3', '#64b5f6', '#bbdefb', '#ffffff']
    });
}
