const phrases = [
    "Desde que llegaste, todo es más bonito. 💜",
    "Eres mi razón para sonreír cada día.",
    "Tus ojos… mi lugar favorito.",
    "Si pudiera pedir un deseo, sería pasar mi vida contigo.",
    "No imagino mi mundo sin ti, Karen Rubit.",
    "¿Quieres ser mi novia?"
];

const phraseBox = document.getElementById("phrase-box");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

let index = 0;

function typeWriterEffect(text, i, callback) {
    if (i < text.length) {
        phraseBox.innerHTML = text.substring(0, i + 1);
        setTimeout(() => typeWriterEffect(text, i + 1, callback), 50);
    } else {
        if (callback) callback();
    }
}

function showPhrases() {
    if (index < phrases.length - 1) {
        typeWriterEffect(phrases[index], 0, () => {
            setTimeout(() => {
                index++;
                showPhrases();
            }, 2000);
        });
    } else {
        typeWriterEffect(phrases[index], 0, () => {
            buttons.classList.remove("hidden");
        });
    }
}

showPhrases();

noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
    noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
});

yesBtn.addEventListener("click", () => {
    phraseBox.innerHTML = "💖 Eres el amor de mi vida 💖";
    buttons.classList.add("hidden");
});
