function operate(a, operand, b){
    if (operand === '/' && b === '0'){
        $('#calc').slideToggle(2000)
        return '🔥🔥🔥' ;
    }

    if(operand === '+'){
        return (+a + +b).toString();
    }
    if(operand === '-'){
        return (+a - +b).toString();
    }
    if(operand === '*'){
        return (+a * 1000 * +b * 1000 / 1000000).toString();
    }
    if(operand === '/'){
        return (+a * 1000 / +b * 1000 / 1000000).toString();
    }
}

const values = {
    'first': [],
    'second': [],
    'operand': '',
    'result': '',
    'isOperand': false
}

// Actualiza el display con los ultimos valores
function updateDisplay(){
    const displayPrevious = $('[data-display="previous"]');
    const displayCurrent = $('[data-display="current"]');
    displayPrevious.text(`${values.first.join('')} ${values.operand} ${values.second.join('')}`);
    displayCurrent.text(values.result);
}

// DEL
// si values.isOperand y no hay segundo valor, borrar el operando
// si no hay segundo valor, borrar con pop.() del primer valor
// else borrar del segundo valor

function deleteLast(){
    
    if (values.isOperand && values.second.length === 0){

        values.isOperand = false;
        values.operand = '';
    } 
    
    else if (values.second.length === 0) values.first.pop();
    else values.second.pop();
    updateDisplay()
}

// establece vacio en todas las variables
function allClear(){
    values.first = [];
    values.second = []; 
    values.operand = ''; 
    values.result = ''; 
    values.isOperand = false; 
    updateDisplay();
}

// checkea si ya hay un punto en el primer o segundo array dependiendo de si
// values.isOperand
function isThereAdot(){
    
    if (!values.isOperand){
        for (let i = 0; i < values.first.length; i++){
            if (values.first[i] === '.') return true;
        }
    }
    else {
        for (let i = 0; i < values.second.length; i++){
            if (values.second[i] === '.') return true;
        }
    }
}

// BOTON .
// isThereAdot checkea si el parametro tiene un punto en algun lugar
// si isThereAdot = true, vuelve antes de poder pushear un nuevo punto.

function addDot(){
    if (!values.isOperand){
        if (isThereAdot()) return;
        values.first.push('.');
    }
    
    else {
        if (isThereAdot()) return;
        values.second.push('.');
    }
    updateDisplay();
}

// BOTON +/-
// si values.isOperand entonces estamos en el primer valor, else estamos en el segundo
// si isItNegative entonces el valor es negativo, entonces hay que shift el '-'
// si !isItNegative entonces el valor es positivo, por lo que hay que unshift un '-'

function changeSign(){

    function isItNegative(num){
        if (num[0] === '-') return true;
    }

    if (!values.isOperand){
        isItNegative(values.first) ? values.first.shift() : values.first.unshift('-');
    }

    else {
        isItNegative(values.second) ? values.second.shift() : values.second.unshift('-');
    }

    updateDisplay();
}

// BOTON RESULT
// si values.result no esta vacio quiere decir que ya hicimos una operacion, y si se vuelve
// a tocar el boton hay que cambiar el primer valor a su values.resultado y volver a
// realizar la operacion en operate() con el mismo segundo valor;
function getResult(){

    if(values.first === "") return;
    if (values.result !== ''){

        values.first = String(values.result).split();
        values.result = operate(values.first, values.operand, values.second.join(''));
        updateDisplay();
    }
    values.result = operate(values.first.join(''), values.operand, values.second.join(''));
    updateDisplay();
}


// BOTONES DE NUMEROS
// si values.first, values.second y values.result no esta vacios quiere decir que se hizo 
// una cuenta asi que allClear y empezar una cuenta nueva
// si values.isOperand entonces push el numero a values.second
// sino push el nro a values.first

function addNumber(num){

            if(values.first.length !== 0 && values.second.length !== 0 && values.result !== ''){
                allClear();
                values.first.push(num);
            }

            else if (values.isOperand) values.second.push(num);
            else values.first.push(num);
            updateDisplay();

}

// si values.isOperand y segundo valor no esta vacio quiere decir que se terminó de hacer
// una cuenta, asi que al clickear un operand establecer todo para hacer otra
// cuenta con el values.resultado como nuevo primer parametro
// si no establecer el operand y asignar values.isOperand para saber que pasamos al
// segundo valor al presionar algun numero

function addOperator(key){

            if(values.isOperand && values.second.length !== 0){
                values.result = operate(values.first.join(''), values.operand, values.second.join(''));
                values.first = String(values.result).split();
                values.second = [];
            }

            values.operand = key;
            values.isOperand = true;
            updateDisplay();
            values.result = '';
}

function isFire(){
    return document.getElementById('display-current').innerText === '🔥' ? true : false;
}


// asigna las funciones a las teclas
function keyboardInputs(){
    $('html').keyup(function (e) {
        //--------------numeros-------------//
        const regexpDigits = /(\d|[.])/

        if (e.key === '.') {
            if (isThereAdot()) return;
        }
        if (regexpDigits.test(e.key)) addNumber(e.key)

        //--------------operandos-------------//
        const regexpOperands = /([+]|[-]|[*]|[/])/;
        if (regexpOperands.test(e.key)) addOperator(e.key);

        //-------------resto de comandos------//
        if (e.key === 'Enter') getResult();
        if (e.key === 'Backspace') deleteLast();
        if (e.key === 'Escape') allClear();
    });
}


// asigna las funciones a los botones
function clickInputs(){
    // numeros click
    $('[data-num]').each(function(index, element){
        $(element).click(()=>{
            addNumber(element.dataset.num);
        })
    })

    // teclado click
    $('[data-op]').each(function(index, element){
        $(element).click(()=>{
            addOperator(element.dataset.op);
        })
    })

    $('[data-id="del"]').click(deleteLast);
    $('[data-id="ac"]').click(allClear);
    $('[data-id="sign"]').click(changeSign);
    $('[data-id="dot"]').click(addDot);
    $('[data-id="result"]').click(getResult);
}

clickInputs();
keyboardInputs();