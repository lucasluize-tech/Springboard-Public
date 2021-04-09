const imageSelector = document.querySelector('.url');
const topTextSelector = document.querySelector('.top')
const bottomTextSelector = document.querySelector('.bottom')
const formSelector = document.querySelector("form")
const resultSelector = document.querySelector('.result');

// create a button element for deletion
const remove = document.createElement('button')
remove.innerHTML = "delete"
remove.setAttribute('value', "delete")
remove.addEventListener('click', function(e){
    this.parentElement.remove()
})

// how we create a Meme
function makeMeme (img,top,bottom){
    const wrapper = document.createElement('div')
    wrapper.setAttribute("class", "wrapper");

    const urlImage = document.createElement('img')
    urlImage.setAttribute("src", img);

    const textTop = document.createElement('div')
    textTop.setAttribute("class", "resulttop")
    textTop.innerText = top;

    const textBottom = document.createElement('div')
    textBottom.setAttribute("class", "resultbottom")
    textBottom.innerText = bottom; 

    resultSelector.append(wrapper)
    wrapper.append(urlImage)
    wrapper.append(textTop)
    wrapper.append(textBottom)
    wrapper.append(remove)
    urlImage.addEventListener('dblclick', function(e){
        console.log(this)
        this.parentElement.remove()
    })
}

// what happen when the user submits the inputs
formSelector.addEventListener("submit", function(e){
    this.preventDefault();
    makeMeme(imageSelector.value, topTextSelector.value, bottomTextSelector.value);
    imageSelector.value = "";
    topTextSelector.value = "";
    bottomTextSelector.value= "";
    
})


// More comments would help (done)
// jsdoc
// variables names in camelcase , and qualify the variables.(done)