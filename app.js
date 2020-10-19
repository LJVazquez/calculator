// basic functions
function add(a, b){
    return +a + +b;
}

function substract(a, b){
    return +a - +b;
}

function multiply(a, b){
    return +a * 1000 * +b * 1000 / 1000000; // POR LOS PROBLEMAS DE JS CON FLOATS
}

function divide(a, b){
    return +a * 1000 / +b * 1000 / 1000000; // POR LOS PROBLEMAS DE JS CON FLOATS
}

function operate(numA, operand, numB){
    if(operand === '+'){
        result = add(numA, numB).toString();
    }
    if(operand === '-'){
        result = substract(numA, numB).toString();
    }
    if(operand === '*'){
        result = multiply(numA, numB).toString();
    }
    if(operand === '/'){
        result = divide(numA, numB).toString();
    }
}

const numbers = document.querySelectorAll('[data-num]');
const operations = document.querySelectorAll('[data-op]')
const displayPrevious = document.getElementById('display-previous');
const displayCurrent = document.getElementById('display-current');
const resultBtn = document.querySelector('[data-result]');
const acBtn = document.getElementById('ac');
const delBtn = document.getElementById('del');
const dotBtn = document.getElementById('dot');
const signBtn = document.getElementById('sign');

let isOperand = false;

let firstValue = [];
let secondValue = [];
let operandValue = '';
let result = '';


function updatePreviousDisplay(){
    displayPrevious.innerText = 
    `${firstValue.join('')} ${operandValue} ${secondValue.join('')}`;
    displayCurrent.innerText = result;
}

numbers.forEach((element) => {

    element.addEventListener('click',() =>{

        if (isOperand === false  && result === ''){
            
            firstValue.push(element.dataset.num);
            updatePreviousDisplay();

        } else if (isOperand === true  && result === ''){
            secondValue.push(element.dataset.num);
            updatePreviousDisplay();

        } else {
            secondValue.push(element.dataset.num);
            updatePreviousDisplay();
        }
    })
})

operations.forEach((element) =>{

    element.addEventListener('click', () => {


        if(isOperand && secondValue.length !== 0){
            operate(firstValue.join(''), operandValue, secondValue.join(''));
            firstValue = String(result).split();
            secondValue = [];
            operandValue = element.dataset.op;
            updatePreviousDisplay();
        }

        operandValue = element.dataset.op;
        isOperand = true;
        updatePreviousDisplay();
    })
})

acBtn.addEventListener('click', () =>{
    firstValue = [];
    secondValue = []; 
    operandValue = ''; 
    result = ''; 
    isOperand = false; 
    updatePreviousDisplay();
})


delBtn.addEventListener('click', ()=>{

    if (secondValue.length === 0 && isOperand === true){

        isOperand = false;
        operandValue = '';
        updatePreviousDisplay();
    
    } else if (secondValue.length === 0){

        firstValue.pop();
        updatePreviousDisplay()

    } else {

        secondValue.pop();
        updatePreviousDisplay()
    }
})


resultBtn.addEventListener('click', () => {

    if (result !== ''){

        firstValue = String(result).split();
        operate(firstValue, operandValue, secondValue.join(''));
        updatePreviousDisplay();


    }


    operate(firstValue.join(''), operandValue, secondValue.join(''));
    updatePreviousDisplay();


})


// checkea en cada caracter de la string de displayCurrent por '.'
// si lo encuentra retorna, de no encontrarlo lo agrega a displayCurrent.innerText;
dotBtn.addEventListener('click', () =>{

    if (isOperand === false){
        for (let i = 0; i < firstValue.length; i++){

            if (firstValue[i] === '.'){
    
                return;
            } 
    
        } firstValue.push('.');
    }
    
    else {
        for (let i = 0; i < secondValue.length; i++){

            if (secondValue[i] === '.'){
    
                return;
            } 
    
        } secondValue.push('.');
    }

    updatePreviousDisplay();
})

signBtn.addEventListener('click', () =>{

    if (isOperand === false && firstValue[0] === '-'){
        firstValue.shift();
    }

    else if (isOperand === false){
        firstValue.unshift('-');
    }

    else if (isOperand === true && secondValue[0] === '-'){
        secondValue.shift();
    }

    else{
        secondValue.unshift('-')
    }

    updatePreviousDisplay();
})
