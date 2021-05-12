const color = "teal";
const obj = {};
// creates color key
obj.color = "#9cd3a5";
// evaluates de color variable and set to key.
obj[color] = "#9cd3a5";
obj[1 + (5 * 2) / 5] = "operation result is the key";

// interating through key and values and do something.
// we have Object.keys() , .values() , .entries()

for (let [k, v] of Object.entries(obj)) {
  console.log(k, v);
}

// Remeber : all object keys are Strings!!!

// When a function is inside an object is called a Method.

const add = (x, y) => x + y;
const mult = (x, y) => x * y;
const sqrd = (x) => x * x;
const pwr = (x, y) => x ** y;

const myMath = { add, mult, square, power };
// calling method of myMath obj
myMath.pwr(2, 8);

/*---- OOP ------*/

function Triangle(a, b) {
  this.a = a;
  this.b = b;
  this.getArea = function () {
    return (this.a * this.b) / 2;
  };
  this.getHyptenuse = function () {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  };
}

const myTriangle = new Triangle(3, 4);

// THIS IS A WAY TO SEPARATE DATA FROM METHODS

function Triangle(a, b) {
  this.a = a;
  this.b = b;

  Triangle.prototype.getArea = function () {
    return (this.a * this.b) / 2;
  };
  Triangle.prototype.getHyptenuse = function () {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  };
}

// Getting started with Classes. ( blueprints of Objects)

// ALWAYS use Capital letter for Classes.

class Triangle {
  constructor(a, b, c) {
    // a constructor initiates with the class.
    for (let side of [a, b, c]) {
      if (!Number.isFinite(side) || side <= 0) {
        throw new Error("Positive numbers only");
      }
    }
    this.a = a;
    this.b = b;
    this.c = c;
  }
  greet() {
    console.log("hello from triangle");
  }
  display() {
    console.log(`Triangle with sides ${this.a} and ${this.b}`);
  }
  getArea() {
    const { a, b, c } = this; // destructuring
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
  isBig() {
    return this.getArea() > 50; // return boolean
  }
}

const firstTri = new Triangle(3, 4, 5);
firstTri.getArea();
firstTri.isBig();

// Inheritance and Super

class RightTriangle extends Triangle {
  constructor(a, b, c) {
    if (a * a + b * b === c * c) {
      throw new Error("Not a valid right Triangle");
    }
    super(a, b, c); // calls the constructor of the Triangle, so we dont have to write the constructor again.

    this.hypotenuse = c; // adding to this class, super needs to be called first.

    // if we change an existing method (display()) , it uses the method closest to the class.
  }
  display() {
    return "Right " + super.display();
  }
}
