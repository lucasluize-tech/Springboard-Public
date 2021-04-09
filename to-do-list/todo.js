const form = document.querySelector('#form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

// retrieve from localStorage
// const saved = JSON.parse(localStorage.getItem("todos"));
// for (let i = 0; i < saved.length; i++) {
//   let li = document.createElement("li");
//   li.innerText = savedTodos[i].todo;
//   li.complete = savedTodos[i].complete; 
//   if (li.complete) {
//     li.style.textDecoration = "line-through";
//   }
//   ul.append(li);

form.addEventListener("submit", function(e){
    e.preventDefault();
    const li = document.createElement("li");
    const removeButton = document.createElement("input");
    const doneButton = document.createElement("input");

    li.innerHTML = input.value;
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "Clear")
    doneButton.setAttribute("type", "checkbox");
    
    if (input.value.replace(/ /g,'') ===""){
        return
    }
    
    ul.append(li);
    li.append(doneButton);
    li.append(removeButton);
    input.value = "";

    removeButton.addEventListener("click", function(e){
        e.target.parentElement.remove()
        localStorage.remove(e.target.parentElement)
    })
    
    doneButton.addEventListener("click", function(e){
        if (e.target.checked){
            e.target.parentElement.classList = "done";
        }else {
            e.target.parentElement.classList = "";
        }
    })

})

// I don't think this is the optimal solution but the app works.
// local Storage solution....
// if x = []
// const ul = document.querySelector('ul');
// for (li of ul.children){
//     x.push({todo: li.innerText, complete: li.children[0].checked})
// }
// localStorage.setItem("todos", JSON.stringify(x));