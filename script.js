// --- Inicjalizacja HUD-a i zakładek ---
const startButton = document.getElementById("start-button");
const mainContent = document.getElementById("main-content");
const hud = document.getElementById("hud");
const animatedTextContainer = document.getElementById("animated-text-container");
const musicPlayer = document.getElementById("background-music");

startButton.addEventListener("click", () => {
    // Ukrywanie głównej zawartości i wyświetlanie HUD-a
    mainContent.style.display = "none";
    hud.style.display = "flex";

    // Animacja pojawiania się HUD-a
    hud.classList.add("fade-in");

    // Wyświetlanie animowanego napisu
    animatedTextContainer.style.display = "block";

    // Odtwarzanie muzyki
    startMusic();

    // Pokazanie pierwszej zakładki
    changeTabWithAnimation('main');
});

// --- Funkcje zakładek ---
function changeTabWithAnimation(tabId) {
    const currentTab = document.querySelector('.tab-pane.active');
    const nextTab = document.getElementById(tabId);

    if (currentTab === nextTab) return;

    // Animacja wyjścia dla obecnej zakładki
    currentTab.classList.add('slide-out');
    currentTab.addEventListener('animationend', function onSlideOut() {
        currentTab.classList.remove('active', 'slide-out');
        currentTab.removeEventListener('animationend', onSlideOut);

        // Animacja wejścia dla nowej zakładki
        nextTab.classList.add('active', 'slide-in');
        nextTab.addEventListener('animationend', function onSlideIn() {
            nextTab.classList.remove('slide-in');
            nextTab.removeEventListener('animationend', onSlideIn);
        });
    });
}

// --- Funkcje ładowania obrazu ---
function loadImage(event, containerId) {
    const file = event.target.files[0];
    if (!file) return;

    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.alt = "Podgląd zdjęcia";
        imgElement.classList.add("image-preview");
        container.appendChild(imgElement);
    };
    reader.readAsDataURL(file);
}

// --- Funkcje muzyki ---
function startMusic() {
    const musicUrl = 'audio/muzyka.mp3';
    musicPlayer.src = musicUrl;
    musicPlayer.play();

    // Ukrycie kontrolek muzyki
    document.getElementById("music-controls").style.display = "none";
}

document.getElementById("volume").addEventListener("input", function() {
    musicPlayer.volume = this.value;
});

// --- Dodatkowe animacje ---
hud.addEventListener('animationend', () => {
    hud.classList.remove('fade-in');
});

startButton.addEventListener("mouseover", () => {
    startButton.classList.add("pulse");
});

startButton.addEventListener("mouseout", () => {
    startButton.classList.remove("pulse");
});