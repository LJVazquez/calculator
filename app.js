// basic functions
function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(numA, operand, numB){
    if(operand === '+'){
        return add(numA, numB);
    }
    if(operand === '-'){
        return substract(numA, numB);
    }
    if(operand === '*'){
        return multiply(numA, numB);
    }
    if(operand === '/'){
        return divide(numA, numB);
    }
}

const numbers = document.querySelectorAll('[data-num]');
const operations = document.querySelectorAll('[data-op]')
const displayPrevious = document.getElementById('display-previous');
const displayCurrent = document.getElementById('display-current');
const resultBtn = document.querySelector('[data-result]');

let firstValue = '';
let secondValue = '';
let operand = '';
let result = '';


function firstNumber(){
    numbers.forEach((element) => {

        element.addEventListener('click',() =>{
            displayCurrent.innerText += element.dataset.num
            console.log(firstValue)
        })
    })
}


function setOperand(){
    operations.forEach((element) => {

        element.addEventListener('click',() => {
            firstValue = displayCurrent.innerText;
            console.log(firstValue)
            operand = element.dataset.op;
            displayPrevious.innerText = displayCurrent.innerText + operand;
            displayCurrent.innerText = '';
            console.log(operand);
        })
    })
}

function secondNumber(){
    resultBtn.addEventListener('click', () =>{
        secondValue = displayCurrent.innerText;
        displayPrevious.innerText += secondValue;
        result = operate(firstValue, operand, secondValue);
        displayCurrent.innerText = result;
        console.log(secondValue)
    })
}



firstNumber();
setOperand();
secondNumber();