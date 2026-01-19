const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]","|",":",";","<",">",".","?","/"];
//const pswOneEl = document.querySelector(".psw-box:first-child .psw-text");
//const pswTwoEl = document.querySelector(".psw-box:last-child .psw-text");
const pswBoxEls = document.querySelectorAll(".psw-box");
const generateBtn = document.querySelector("button");
const pswLength = 15;
let password = "";

function getRandomPsw() {
    for (let i = 0; i < pswLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function generatePasswords() {
    pswBoxEls.forEach((pswBoxEl,index) => {
        password = "";
        pswBoxEl.innerHTML = "";
        const pswTextEl = document.createElement("span");
        const className = index === 0 ? "first" : "second";
        pswTextEl.classList.add(className, "psw-text");
        pswBoxEl.appendChild(pswTextEl);
        pswTextEl.textContent = getRandomPsw();
        pswBoxEl.innerHTML += `<i class="fa-regular fa-copy"></i>`
    });
}

generateBtn.addEventListener("click", generatePasswords);