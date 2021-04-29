// Refactor this Function to ES2015

// function double(arr) {
//     return arr.map(function(val) {
//       return val * 2;
//     });
//   }

const double = (arr) => (
    arr.map((val) => val*2)
);


// Replace ALL functions with arrow functions:

// function squareAndFindEvens(numbers){
//   var squares = numbers.map(function(num){
//     return num ** 2;
//   });
//   var evens = squares.filter(function(square){
//     return square % 2 === 0;
//   });
//   return evens;
// }


  const squareAndFindEvens = (numbers) =>{
      let squares = numbers.map((num)=>num**2)
      let evens = squares.filter((sqr)=> sqr % 2 === 0)
      return evens;
  }

  