function calculateTaxes(income){
 if (!Number.isFinite(income)){
     throw new Error('INVALID INCOME');
 }
 
 if (income>30000){
     return income * 0.25;
 }else {
     return income * 0.15;
 }
 
}

function removeDuplicates(value){
    const arr = [...new Set(value)]
    if (typeof value === 'string') return arr.join('')
    return arr;
}

function remove(arr, val){
    return arr.filter((el)=>{
        return el !== val
    })
}

let usernames =[];
let input = document.querySelector('.input');

function submitUser(){
    usernames.push(input.value)
}
