const body = document.querySelector('body');

body.style.backgroundColor = "Black";

function getRandomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}

// const colorChange = setInterval(function (){
//     h1.style.color = getRandomRgb();
// }, 500);

const allDiv = document.querySelectorAll("div");

for(let h1 of allDiv) {
    setInterval(function(){
        h1.style.color = getRandomRgb();
    }, 500)
}

