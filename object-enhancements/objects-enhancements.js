// Shorthand Methods
// Old way :
// add : function(a,b) => {
//     return a + b;
// }

// but now:



const mathStuff = {
    pi : 3.14,
    add(...nums){
        return nums.reduce((acc,val)=>{
            return acc + val;
        })
    },
    sub(...nums){
        return nums.reduce((acc, val)=>{
            return acc - val;
        });
    },
    multiply(...nums){
        return nums.reduce((acc, val)=> {
            return acc * val;
        })
    },
    divide(...nums){
        return nums.reduce((acc, val )=> {
            return acc / val;
        });
    }
}

// new way to set keys dynamic :
const colors = {
    periwinkle : '9c88f',
    '9c88f' : 'periwinkle'
}

function makeColor(name, hex){
    return {
        [name] : hex,
        [hex] : name
    };
}

const m = {
    [1+2+3+4] : 'ten'
}