const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]","|",":",";","<",">",".","?","/"];
const pswBoxEls = document.querySelectorAll(".psw-box");
const generateBtn = document.querySelector("button");
const sliderEl = document.querySelector(".length-slider");
const sliderLabelEl = document.querySelector(".slider-label");
let pswLength = 12;

function getRandomPsw() {
    let password = "";
    for (let i = 0; i < pswLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
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

function createClipboardIcon() {
    const clipboardIcon = document.createElement("i");
    clipboardIcon.classList.add("fa-regular", "fa-copy");
    return clipboardIcon;
}
function resetClipboardIcon(utilBtnEl) {
    utilBtnEl.innerHTML = "";
    utilBtnEl.appendChild(createClipboardIcon());
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

function getPswLength() {
    pswLength = sliderEl.value;
    sliderLabelEl.textContent = sliderEl.value;
}

//Event listeners
//Add click event listener to generate button
generateBtn.addEventListener("click", generatePasswords);
//Add click event listener to each password box for copying password
pswBoxEls.forEach(pswBoxEl => {
    pswBoxEl.addEventListener("click", copyToClipboard);
});

sliderEl.addEventListener("input", getPswLength);