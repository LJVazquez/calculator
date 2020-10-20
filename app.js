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

operandsDictionary = [{'SUM': '+'}, {'SUS': '-'}, {'PROD': '*'}, {'DIV': '/'}];

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

const operations = document.querySelectorAll('[data-op]')


const dotBtn = document.querySelector('[data-id = "dot"]');
const signBtn = document.querySelector('[data-id = "sign"]');

let isOperand = false;

let firstValue = [];
let secondValue = [];
let operandValue = '';
let result = '';

// Actualiza el display con los ultimos valores
function updateDisplay(){
    const display1 = $('[data-display="previous"]');
    const display2 = $('[data-display="current"]');
    display1.text(`${firstValue.join('')} ${operandValue} ${secondValue.join('')}`);
    display2.text(result);
}


// DEL
// si isOperand y no hay segundo valor, borrar el operando
// si no hay segundo valor, borrar con pop.() del primer valor
// else borrar del segundo valor

function deleteLast(){
    
    if (isOperand && secondValue.length === 0){

        isOperand = false;
        operandValue = '';
    
    } else if (secondValue.length === 0){

        firstValue.pop();

    } else {

        secondValue.pop();
    }

    updateDisplay()
}

// establece vacio en todas las variables
function allClear(){
    firstValue = [];
    secondValue = []; 
    operandValue = ''; 
    result = ''; 
    isOperand = false; 
    updateDisplay();
}

// BOTON .
// isThereAdot checkea si el parametro tiene un punto en algun lugar
// si isThereAdot = true, vuelve antes de poder pushear un nuevo punto.

function addDot(){
    function isThereAdot(num){
        for (let i = 0; i < num.length; i++){
            if (num[i] === '.') return true;
        }
    }

    if (!isOperand){
        if (isThereAdot(firstValue)) return;
        firstValue.push('.');
    }
    
    else {
        if (isThereAdot(secondValue)) return;
        secondValue.push('.');
    }
    updateDisplay();
}

// BOTON +/-
// si isOperand entonces estamos en el primer valor, else estamos en el segundo
// si isItNegative entonces el valor es negativo, entonces hay que shift el '-'
// si !isItNegative entonces el valor es positivo, por lo que hay que unshift un '-'

function changeSign(){

    function isItNegative(num){
        if (num[0] === '-') return true;
    }

    if (!isOperand){
        isItNegative(firstValue) ? firstValue.shift() : firstValue.unshift('-');
    }

    else {
        isItNegative(secondValue) ? secondValue.shift() : secondValue.unshift('-');
    }

    updateDisplay();
}

// BOTON RESULT
// si result no esta vacio quiere decir que ya hicimos una operacion, y si se vuelve
// a tocar el boton hay que cambiar el primer valor a su resultado y volver a
// realizar la operacion en operate() con el mismo segundo valor;
function getResult(){

    if (result !== ''){

        firstValue = String(result).split();
        operate(firstValue, operandValue, secondValue.join(''));
        updateDisplay();
    }
    operate(firstValue.join(''), operandValue, secondValue.join(''));
    updateDisplay();
}


// BOTONES DE NUMEROS
// si firstValue, secondValue y result no esta vacios quiere decir que se hizo 
// una cuenta asi que allClear y empezar una cuenta nueva
// si isOperand entonces push el numero a secondValue
// sino push el nro a firstValue

function addNumber(){
    
    $('[data-num]').each((index, element) =>{

        $(element).click(() =>{

            if(firstValue.length !== 0 && secondValue.length !== 0 && result !== ''){
                allClear();
                firstValue.push(element.dataset.num);
            }

            else if (isOperand) secondValue.push(element.dataset.num);

            else firstValue.push(element.dataset.num);
            
            updateDisplay();
        })
    })
}


// si isOperand y segundo valor no esta vacio quiere decir que se terminó de hacer
// una cuenta, asi que al clickear un operand establecer todo para hacer otra
// cuenta con el resultado como nuevo primer parametro
// si no establecer el operand y asignar isOperand para saber que pasamos al
// segundo valor al presionar algun numero

function addOperator(){

    $('[data-op]').each( (index, element) =>{

        $(element).click(() =>{

            if(isOperand && secondValue.length !== 0){
                operate(firstValue.join(''), operandValue, secondValue.join(''));
                firstValue = String(result).split();
                secondValue = [];
            }

            operandValue = element.dataset.op;
            isOperand = true;
            updateDisplay();
            result = '';
        })
    })
}

function startApp(){
    $('[data-id="del"]').click(deleteLast);
    $('[data-id="ac"]').click(allClear);
    $('[data-id="sign"]').click(changeSign);
    $('[data-id="dot"]').click(addDot);
    $('[data-id="result"]').click(getResult);
    addNumber();
    addOperator();
}

startApp();