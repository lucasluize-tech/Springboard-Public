// Maps and Sets Exercise

// Quick Question #1
// What does the following code return?

new Set([1,1,2,2,3,4])

// Awnser : Set [1,2,3,4]


// Quick Question #2
// What does the following code return?

[...new Set("referee")].join("")

// Awnser : ref


// Quick Questions #3
// What does the Map m look like after running the following code?

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

/* Awnser :

m = {
    [1,2,3]:true,
    [1,2,3]:false,
}

*/


// hasDuplicate
// Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

const hasDuplicate = (arr) => {
    const mySet = new Set(arr);
    return arr.length != mySet.size;
}

hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false


// vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

const vowelCount = (string) => {
    // make string into array
    const stripped = string.split('')
    const vowels = 'aeiou'
    // make new array with vowels only
    let stripVowels = stripped.filter((v)=>{
        return vowels.indexOf(v) != -1;
    });

    // create map to return
    let letterCount = new Map();

    // Loop through map , set vowels as keys , and begin count.
    stripVowels.forEach((val)=> {
        if (letterCount.has(val)){
            return letterCount.set(val, letterCount.get(val)+1);
        }
        return letterCount.set(val, 1);
    });
    return letterCount;
    
}

vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
vowelCount('Colt') // Map { 'o' => 1 }

