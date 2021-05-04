const teaOrder = {
  variety: "oolong",
  teaName: "winter sprout",
  origin: "taiwan",
  price: 12.99,
  hasCaffeine: true,
  quantity: 3,
};

const { price, quantity, teaName } = teaOrder;
console.log(price);
console.log(quantity);
console.log(teaName);

// using spreadRest , rest has to be the last parameter!

const { ...orders } = teaOrder;
console.log(orders);

const { brewTemp = 175 } = teaOrder; // set a 175 default if does not exist, if exists uses the original value.

const { teaName: tea } = teaOrder; // this will re-name the key.

function checkout(tea) {
  const { quantity = 1, price } = tea; // 1 default or Original
  return quantity * price;
}

// Same concept can be applied to Arrays []
const students = [
  { name: "Drake", gpa: "4.6" },
  { name: "Jack", gpa: "4.4" },
  { name: "Tung", gpa: "4.3" },
  { name: "Ant", gpa: "4.2" },
  { name: "Leila", gpa: "4.1" },
];

const [topStudents, secondBest, ...otherStudents] = students;
console.log(topStudents, secondBest, otherStudents);

const [first, ...losers] = students;
console.log(first, losers);

// Lets extract the key/value into variables in function

const getTotal = ({ quantity, price }) => {
  return quantity * price;
};

getTotal(teaOrder); //38.97

// Same goes to an Array..([...vals]){ return vals.map((v)=> v* 2)}

// nested Objects can be destructed as ;

const {
  parentKey: { childKey: newVariableName },
} = object;

// if inside an array :

const {
  pKey: [{ cKey }],
} = obj;

// parentKey (pKey) , this variable is not being created!

/* swapping variables */
let a = value1;
let b = value2;
let temp = a;
a = b;
b = temp;

// OR

let both = ([a, b][(b, a)] = both);

// OR BEST

[b, a] = [a, b];
