const img = document.querySelector('.url');
const topText = document.querySelector('.top')
const bottomText = document.querySelector('.bottom')
const form = document.querySelector("form")
const results = document.querySelector('.result');

const remove = document.createElement('button')
remove.innerHTML = "delete"
remove.setAttribute('value', "delete")
remove.addEventListener('click', function(e){
    e.target.parentElement.remove()
})

let idcount = 0;

function makeMeme (img,top,bottom){
    const wrapper = document.createElement('div')
    wrapper.setAttribute("class", "wrapper");
    wrapper.setAttribute("id", idcount)
    const urlimage = document.createElement('img')
    urlimage.setAttribute("src", img);
    const ttop = document.createElement('div')
    ttop.setAttribute("class", "resulttop")
    ttop.innerText = top;
    const tbot = document.createElement('div')
    tbot.setAttribute("class", "resultbottom")
    tbot.innerText = bottom; 

    results.append(wrapper)
    wrapper.append(urlimage)
    wrapper.append(ttop)
    wrapper.append(tbot)
    wrapper.append(remove)
    idcount++;

    urlimage.addEventListener('dblclick', function(e){
        e.target.parentElement.remove()
    })
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    makeMeme(img.value, topText.value, bottomText.value);
    img.value = "";
    topText.value = "";
    bottomText.value= "";
    

})
