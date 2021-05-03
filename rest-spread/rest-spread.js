function sum(){
    // make arguments into an array
    const args = Array.from(arguments);
    return args.reduce((sum, val)=>(sum+val))
}

const max = function(){
    const args = Array.from(arguments);
    args.reduce((max, currVal)=>{
        return currVal > max ? currVal : max;
    });
};

//easy way to use the arguments is creating a new array throug rest ...
const sumAll = (...nums) => {
    if (!nums.length) return undefined;
    return nums.reduce((sum, val)=> sum + val);
}

// parameters first, second and then rest

const makeFamily = (FirstParent, SecondParent, ...kids) => {
    return {
        parents : [FirstParent, SecondParent],
        children : kids.length ? kids : 0
    };
}

const filterByType = (type, ...values) => {
    values.filter((v)=> typeof v === type);
}

const n = [4,6,22,612,6,512,62,621]
// spread the n array into single values , and pass it as parameters
Math.max(...n);

// So rest transforms parameters (values ) into Array
// and
// spread , transforms arrays into parameters ( values )

k