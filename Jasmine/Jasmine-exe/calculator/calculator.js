window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector("#calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      console.log(e)
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.querySelector("#loan-amount").value),
    years: +(document.querySelector("#loan-years").value),
    rate: +(document.querySelector("#loan-rate").value),
  }
}

// Get the inputs from the DOM.
const inputAmount = document.querySelector("#loan-amount")
const inputYears = document.querySelector("#loan-years")
const inputRate = document.querySelector("#loan-rate")
const monthlyPay = document.querySelector('#monthly-payment')

// Put some default values in the inputs
inputAmount.value = 100000
let principal = inputAmount.value
inputYears.value = 30
let term = inputYears.value
inputRate.value = 5
let rate = inputRate.value
let monthly = ""


// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let p = principal
  let i = (rate/100) / 12
  let n = term * 12

  monthly = (p*i)/(1- Math.pow((1+i),-n))
  // reset inputs
  p = 0
  i = 0
  n = 0
  monthly = monthly.toFixed(2)

  return monthlyPay.innerHTML = monthly
} 

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentUIValues()
  principal = currentValues.amount
  term = currentValues.years
  rate = currentValues.rate
  setupIntialValues()
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let p = values.amount
  let n = values.years *12
  let i = (values.rate/100) / 12

  let monthly = (p*i)/(1- Math.pow((1+i),-n))
  return monthly.toFixed(2)
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(m) {
  monthly = m
  return monthly
}
