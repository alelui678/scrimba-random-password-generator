
const lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = "0123456789".split("");
const symbols = "~`!@#$%^&*()_-+={}[]|:;<>.?/".split("");
const allCharacters = [...lowerCase, ...upperCase, ...numbers, ...symbols];

const pswBoxEls = document.querySelectorAll(".psw-box");
const generateBtn = document.querySelector("button");
const sliderEl = document.querySelector(".length-slider");
const sliderLabelEl = document.querySelector(".slider-label");
let pswLength = 12;

function getRandomPsw() {
    let passwordArray = [];

    // --- PUNTO 2: INSERIMENTO FORZATO (Le Garanzie) ---
    // Peschiamo un carattere per tipo per essere sicuri che ci siano tutti
    passwordArray.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
    passwordArray.push(numbers[Math.floor(Math.random() * numbers.length)]);
    passwordArray.push(symbols[Math.floor(Math.random() * symbols.length)]);

    // --- RIEMPIMENTO ---
    // Abbiamo già 3 caratteri. Riempiamo i restanti (length - 3) con caratteri totalmente casuali
    for (let i = passwordArray.length; i < pswLength; i++) {
        const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        passwordArray.push(randomChar);
    }

    // --- PUNTO 3: SHUFFLE (Rimescolamento Fisher-Yates) ---
    // Senza questo, le password inizierebbero sempre con: Maiuscola, Numero, Simbolo
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Scambio di posto (Sintassi Destructuring)
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join("");
}

function generatePasswords() {
    pswBoxEls.forEach(pswBoxEl => {
        //Clear previous content
        pswBoxEl.innerHTML = "";
        //Create and append password text
        const pswTextEl = document.createElement("span");
        pswTextEl.classList.add("psw-text");
        pswBoxEl.appendChild(pswTextEl);
        pswTextEl.textContent = getRandomPsw();
        //Create and append clipboard icon
        const utilBtnEl = document.createElement("span");
        utilBtnEl.classList.add("util-btn");
        utilBtnEl.appendChild(createClipboardIcon());
        pswBoxEl.appendChild(utilBtnEl);
    });
}

function copyToClipboard(event) {
    //Check if the clicked element is the clipboard icon
    if (event.target.classList.contains("fa-copy")) {
        //Get the password text
        const pswText = event.currentTarget.querySelector(".psw-text").textContent;
        const utilBtnEl = event.currentTarget.querySelector(".util-btn");
        //Copy password to clipboard
        navigator.clipboard.writeText(pswText);
        event.target.innerHTML = "";
        utilBtnEl.textContent = "copied!";
        utilBtnEl.setAttribute("data-copied", "true");
        //Reset the icon after 3 seconds
        setTimeout(() => {resetClipboardIcon(utilBtnEl);}, 3000);
    }
}

function createClipboardIcon() {
    const clipboardIcon = document.createElement("i");
    clipboardIcon.classList.add("fa-regular", "fa-copy");
    return clipboardIcon;
}
function resetClipboardIcon(utilBtnEl) {
    utilBtnEl.innerHTML = "";
    utilBtnEl.appendChild(createClipboardIcon());
}

function getPswLength() {
    pswLength = sliderEl.value;
    sliderLabelEl.textContent = sliderEl.value;
}
//EVENT LISTENERS
//Add click event listener to generate button
generateBtn.addEventListener("click", generatePasswords);
//Add click event listener to each password box for copying password
pswBoxEls.forEach(pswBoxEl => {
    pswBoxEl.addEventListener("click", copyToClipboard);
});
//Add input event listener to slider to update password length
sliderEl.addEventListener("input", getPswLength);