// OO Challenge //

// Part One //

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  honk() {
    return "Beep";
  }
  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}

let firstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
firstVehicle.honk();
firstVechicle.toString();

// Part Two //

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

// Part three //

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }
  revEngine() {
    return "VROMM!!!";
  }
}

firstMoto = new Motorcycle("Honda", "Nighthawk", 2000);
firstMoto.honk();
firstMoto.revEngine();
firstMoto.numWheels;

// Part Four //

class Garage {
  constructor(capacity) {
    this.vehicles = [];
    this.capacity = capacity;
  }
  add(vehicle) {
    if (vehicle.honk != "Beep") {
      return "Only vehicles are allowed in here!";
    }
    this.vehicles.push(vehicle);
    return "Vehicle added!";
  }
}

let garage = new Garage(2);
garage.vehicles;
garage.add(new Car("Hyundai", "Elantra", 2015));
garage.vehicles;
garage.add("Taco");
garage.add(new Motorcycle("Honda", "Nighthawk", 2000));
garage.vehicles;
garage.add(new Motorcycle("Honda", "Nighthawk", 2001));
