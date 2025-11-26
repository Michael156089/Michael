/* Script Windows 7 Portfolio */

// --- Variables Globales ---
let currentPassword = "";
let zIndexCounter = 100;

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
    generatePassword();
    updateClock();
    setInterval(updateClock, 1000); // Mise à jour de l'horloge chaque seconde

    // Gestionnaire pour la touche Entrée sur l'écran de connexion
    document.getElementById('password-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkLogin();
        }
    });

    document.getElementById('login-btn').addEventListener('click', checkLogin);
});

// --- Système de Connexion ---
function generatePassword() {
    // Génère un mot de passe aléatoire à 4 chiffres
    currentPassword = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('generated-pass').textContent = currentPassword;
    console.log("Mot de passe généré : " + currentPassword);
}

function checkLogin() {
    const input = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('error-msg');

    if (input === currentPassword) {
        // Connexion réussie
        document.getElementById('login-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('desktop').classList.remove('hidden');
            // Jouer un son de démarrage si possible (optionnel)
            // let audio = new Audio('startup.mp3'); audio.play();
        }, 500);
    } else {
        // Erreur
        errorMsg.style.display = 'block';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

// --- Gestion des Fenêtres ---
function openWindow(appId) {
    const win = document.getElementById('window-' + appId);
    if (win) {
        win.classList.remove('hidden');
        bringToFront(win);

        // Fermer le menu démarrer si ouvert
        document.getElementById('start-menu').classList.add('hidden');
    }
}

function closeWindow(appId) {
    const win = document.getElementById('window-' + appId);
    if (win) {
        win.classList.add('hidden');
    }
}

function minimizeWindow(appId) {
    // Pour l'instant, on cache juste la fenêtre, on pourrait ajouter une animation vers la barre des tâches
    closeWindow(appId);
}

function bringToFront(element) {
    zIndexCounter++;
    element.style.zIndex = zIndexCounter;
}

// --- Drag and Drop des Fenêtres ---
function dragElement(elmnt, event) {
    bringToFront(elmnt); // Mettre au premier plan au clic

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // Obtenir la position de la souris au démarrage
    pos3 = event.clientX;
    pos4 = event.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // Calculer la nouvelle position du curseur
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Définir la nouvelle position de l'élément
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Arrêter le déplacement quand le bouton de la souris est relâché
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// --- Barre des Tâches et Menu Démarrer ---
function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.classList.toggle('hidden');
}

// Fermer le menu démarrer si on clique ailleurs sur le bureau
document.getElementById('desktop').addEventListener('click', function (e) {
    const menu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.start-button');

    if (!menu.classList.contains('hidden') &&
        !menu.contains(e.target) &&
        !startBtn.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

// --- Horloge ---
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    timeElement.textContent = `${hours}:${minutes}`;
    dateElement.textContent = `${day}/${month}/${year}`;
}

// --- Navigation Explorateur de Projets ---
function switchProjectView(viewId) {
    // 1. Mettre à jour la classe 'active' dans la sidebar
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    document.getElementById('nav-' + viewId).classList.add('active');

    // 2. Cacher toutes les vues
    document.getElementById('view-projects').classList.add('hidden');
    document.getElementById('view-favorites').classList.add('hidden');
    document.getElementById('view-desktop').classList.add('hidden');

    // 3. Afficher la vue demandée
    document.getElementById('view-' + viewId).classList.remove('hidden');
}
