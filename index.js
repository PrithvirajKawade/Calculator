// initialize all the display values
let currentNum = "";
let previousNum = "";
let operator = "";

// select previous and current display num
const currentDisplayNum = document.querySelector(".current-operand");
const previousDisplayNum = document.querySelector(".previous-operand");

// adding keyboard functionality
window.addEventListener('keydown', handleKeyPress)

// calculate when both displays are not empty
const equal = document.querySelector("#calculate");
equal.addEventListener('click', () => {
  if (currentNum !== "" && previousNum !== "") {
    calculate();
  }
})

const decimal = document.querySelector(".decimal");
decimal.addEventListener('click', () => {
  addDecimal();
})

//select and declare and the numbers, operators and functions seperately
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

// clear everything in the display
const clear = document.querySelector("#span-two");
clear.addEventListener('click', clearCalculator)

//clear only one number
const deletePrevious = document.querySelector(".backspace")
deletePrevious.addEventListener('click', handleDelete)

//add event listeners to the number buttons
numberButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    //e.target.textcontent will return the text of 
    // the target button which is the number
    handleNumber(e.target.textContent)
  })
});

operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent)
  })
})

function addDecimal() {
  if (!currentNum.includes('.')) {
    currentNum += '.'
    currentDisplayNum.textContent = currentNum;
  }
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNum.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNum.textContent = '0';
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNum.textContent = previousNum;
  }
}

//update display and handle it after clicking on operator
function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === "") {
    operatorCheck(op);
  } else {
    calculate();
    operator = op
    currentDisplayNum.textContent = "0"
    previousDisplayNum.textContent = previousNum + " " + operator
  }
}

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = ""
    currentDisplayNum.textContent = currentNum;
  }
  currentNum += number;
  currentDisplayNum.textContent = currentNum;
}

function operatorCheck(text) {
  //when clicked on operator add it to previousDisplay and update currentDisplay
  operator = text;
  previousDisplayNum.textContent = previousNum + " " + operator;
  currentDisplayNum.textContent = "0";
  currentNum = "";
}


function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum += currentNum;
  }
  else if (operator === "-") {
    previousNum -= currentNum;
  }
  else if (operator === "*") {
    previousNum *= currentNum;
  }
  else if (operator === "/") {
    if (currentNum <= 0) {
      previousNum = "Error"
      displayResults()
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum)
  previousNum = previousNum.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000
}

function displayResults() {
  currentDisplayNum.textContent = previousNum;
  previousDisplayNum.textContent = "";
  operator = "";
  currentNum = "";
}

function clearCalculator() {
  previousNum = '';
  currentNum = '';
  operator = '';
  currentDisplayNum.textContent = '0';
  previousDisplayNum.textContent = '';
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key)
  }
  if (e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    calculate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator(e.key)
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

