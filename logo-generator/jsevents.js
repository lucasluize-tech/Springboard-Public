const form = document.querySelector('#logoform');
const nameInput = document.querySelector('input[name="brandname"]');
const colorInput = document.querySelector('input[name="brandcolor"]');
const sizeInput = document.querySelector('input[name="brandsize"]');
const results = document.querySelector("#results");
const clearBtn = document.querySelector("#clear");


form.addEventListener('submit', function(e){
    e.preventDefault();
    const newLogo = makeLogo(nameInput.value, colorInput.value, sizeInput.value);
    results.append(newLogo);
    // nameInput.value = "";
    
})

function makeLogo(text, color, size){
    const logo = document.createElement('h2');
    logo.innerText = text;
    logo.style.color = color;
    logo.style.fontSize = `${size}px`;
    return logo;
}
