// basic functions
function add(a, b){
    return +a + +b;
}

function substract(a, b){
    return +a - +b;
}

function multiply(a, b){
    return +a * +b;
}

function divide(a, b){
    return +a / +b;
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
const acBtn = document.getElementById('ac');
const delBtn = document.getElementById('del');
const dotBtn = document.getElementById('dot');
const signBtn = document.getElementById('sign');

let firstValue = '';
let secondValue = '';
let operand = '';
let result = '';

// suma el nro del data.num al displayCurrent;
function firstNumber(){

    numbers.forEach((element) => {

        element.addEventListener('click',() =>{
            
            if (firstValue !== '' && secondValue !== '' && result !== ''){
                displayCurrent.innerText = '';
            }

            displayCurrent.innerText += element.dataset.num
        })
    })
}

// guarda el valor de displayCurrent en firstValue, setea el valor de data.op en
// operand.
// le da el valor de displayCurrent mas el operando a display previous y setea 
// displayCurrent a '';
function setOperand(){
    operations.forEach((element) => {

        element.addEventListener('click',() => {

            if (firstValue !== '' && secondValue !== '' && result !== ''){
                displayCurrent.innerText = '';
            }
            
            if (firstValue === ''){
                firstValue = displayCurrent.innerText;
                operand = element.dataset.op;
                displayPrevious.innerText = `${firstValue} ${operand} ${secondValue}`;
                displayCurrent.innerText = '';
            }

            else if (result !== ''){ // quiere decir que ya operamos antes

                firstValue = result;
                secondValue = displayCurrent.innerText;
                operand = element.dataset.op;
                result = operate(firstValue, operand, secondValue);
                displayPrevious.innerText = `${firstValue} ${operand} ${secondValue}`;
                displayCurrent.innerText = result;

                
            } else{
                secondValue = displayCurrent.innerText;
                displayPrevious.innerText = `${firstValue} ${operand} ${secondValue}`;
                operand = element.dataset.op;
                result = operate(firstValue, operand, secondValue);
                displayCurrent.innerText = result;
            }


            console.log(`primer valor: ${firstValue}`)
            console.log(`operando: ${operand}`)
            console.log(`segundo valor: ${secondValue}`)
            console.log(`resultado: ${result}`)

        })
    })
}


// al presionar = guarda el valor de displayCurrent.innerText en secondValue
// ejecuta operate con los valores guardados hasta el momento y los guarda en 
// result. Muestra el resultado en displayCurrent;
function getResult(){

    resultBtn.addEventListener('click', () =>{
        
        if (firstValue === ''){

            firstValue = displayCurrent.innerText;
            displayPrevious.innerText = `${firstValue} ${operand} ${secondValue}`;
            displayCurrent.innerText = '0';

        } else if (firstValue == '0' && displayCurrent.innerText == '0'){

            return;

        } else {
        
            secondValue = displayCurrent.innerText;
            displayPrevious.innerText = displayPrevious.innerText = `${firstValue} ${operand} ${secondValue}`;
            result = operate(firstValue, operand, secondValue);
            displayCurrent.innerText = result;
        }

        console.log(`primer valor: ${firstValue}`)
        console.log(`operando: ${operand}`)
        console.log(`segundo valor: ${secondValue}`)
        console.log(`resultado: ${result}`)
        
    })
}

// setea todos los valores a '';
acBtn.addEventListener('click', () =>{
    displayCurrent.innerText = '';
    displayPrevious.innerText = '';
    firstValue = '';
    secondValue = '';
    result = '';
})

// usa slice para eliminar el ultimo caracter de la string en displayCurrent
delBtn.addEventListener('click', ()=>{
    displayCurrent.innerText = displayCurrent.innerText.slice(0, -1);
})

// checkea en cada caracter de la string de displayCurrent por '.'
// si lo encuentra retorna, de no encontrarlo lo agrega a displayCurrent.innerText;
dotBtn.addEventListener('click', () =>{
    for (let i = 0; i < displayCurrent.innerText.length; i++){
        if (displayCurrent.innerText[i] === '.'){
            return;
        } 
    } displayCurrent.innerText += '.';
})

signBtn.addEventListener('click', () =>{
    displayCurrent.innerText = displayCurrent.innerText * -1;
})

firstNumber();
setOperand();
getResult();