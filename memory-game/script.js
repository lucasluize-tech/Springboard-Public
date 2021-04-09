const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  counter = 0
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", counter);
    counter++;

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  console.log("game started")
}
// create an array to store selected cards
let chosenCards = [];
let rightGuess = 0;
let count = 0;
let noClick = false;
const score = document.querySelector('#score');
// matching two cards logic
function match(){
  const cards = document.querySelectorAll("div");
  const firstCard = chosenCards[0];
  const secondCard = chosenCards[1];
  
  if (firstCard.id !== secondCard.id && firstCard.className === secondCard.className){
    count ++;
    score.innerText = count;
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    rightGuess ++
  } else {
    firstCard.style.backgroundColor="white";
    secondCard.style.backgroundColor="white";
  //   count --;
  //   score.innerText = count;
    
  }

  
  chosenCards = [];
  noClick = false;

  if (rightGuess ===5){
    alert("You won!");
    }
  } 
// TODO: Implement this function!
function handleCardClick(event) {
  if (noClick) return;
  let card = event.target
  // change the background when clicked
  card.style.backgroundColor = card.classList
  // append to array when selected
  chosenCards.push(card);
  console.log(chosenCards);

  // logic for 2 cards selected
  if (chosenCards.length === 2){
    setTimeout(match, 1000)
    noClick = true;
  }

  // how to prevent clicking on same card twice? ask victor!
  
  //options :
  // store lowest-score in local Storage
  // maybe allow any number of cards to appear
  // instead of hard-coding colors, try random colors or pics.
}
function resetBoard(){
  const cards = document.querySelectorAll("div");
  for (card of cards){
    card.style.backgroundColor = "white";
    count = 0;
    rightGuess = 0;
    score.innerText ="";
    console.log("board reseted!")
  }
}
// button to start the game
const startGame = document.querySelector('#start');
// button to reset the game
const resetGame = document.querySelector('#reset');

startGame.addEventListener("click", function(e){
  e.preventDefault();
  createDivsForColors(shuffledColors);
})

resetGame.addEventListener("click", resetBoard)

