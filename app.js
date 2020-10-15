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

function operate(numA, operator, numB){
    if(operator === '+'){
        return add(numA, numB);
    }
    if(operator === '-'){
        return substract(numA, numB);
    }
    if(operator === '*'){
        return multiply(numA, numB);
    }
    if(operator === '/'){
        return divide(numA, numB);
    }
}

const numbers = document.querySelectorAll('[data-num]');
const displayPrevious = document.getElementById('display-previous');
const displayCurrent = document.getElementById('display-current');


function updateValue(){
    let currentValue = '';

    numbers.forEach((element) => {

        element.addEventListener('click',() =>{

            currentValue += element.dataset.num;
            displayCurrent.innerText = currentValue;
        })
    })
}

updateValue()