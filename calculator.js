const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator .button');

let previousValue = null;
let operator = null;
let waitingForSecondValue = false;
let justCalculated = false;
let currentValue = '0';
let displayValue = '0';
let scientificMode = false;

function updateDisplay() {
    display.textContent = displayValue;
}

function resetCalculator() {
    previousValue = null;
    operator = null;
    waitingForSecondValue = false;
    justCalculated = false;
    currentValue = '0';
    displayValue = '0';
}

const scientificToggleButton = document.querySelector('.button--scient-toggle');

function toggleScientificPanel() {
    scientificMode = !scientificMode;
    document.querySelector('.calculator').classList.toggle('expanded', scientificMode);
    if (scientificToggleButton) {
        const arrowElement = scientificToggleButton.querySelector('.scient-arrow');
        if (arrowElement) {
            arrowElement.textContent = scientificMode ? '→' : '←';
        }
    }
}

function inputDigit(digit) {
    if (waitingForSecondValue || justCalculated) {
        if (justCalculated && operator === null) {
            previousValue = null;
        }
        currentValue = digit;
        waitingForSecondValue = false;
        justCalculated = false;
        if (operator) {
            displayValue = `${previousValue}${operator}${digit}`;
        } else {
            displayValue = digit;
        }
    } else {
        currentValue = currentValue === '0' ? digit : currentValue + digit;
        displayValue = currentValue;
    }
}

function inputDecimal(dot) {
    if (waitingForSecondValue || justCalculated) {
        currentValue = '0.';
        displayValue = operator ? `${previousValue}${operator}${currentValue}` : currentValue;
        waitingForSecondValue = false;
        justCalculated = false;
        return;
    }
    if (!currentValue.includes(dot)) {
        currentValue += dot;
        displayValue = currentValue;
    }
}

function toggleSign() {
    if (currentValue === '0') return;
    currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue;
}

function performCalculation(op, first, second) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '×' || op === '*') return first * second;
    if (op === '÷' || op === '/') return second === 0 ? 'Errore' : first / second;
    if (op === '^') return Math.pow(first, second);
    return second;
}

function handleScientificOperation(action) {
    const inputValue = parseFloat(currentValue);
    if (Number.isNaN(inputValue)) return;

    let result = inputValue;
    switch (action) {
        case 'sin':
            result = Math.sin((inputValue * Math.PI) / 180);
            break;
        case 'cos':
            result = Math.cos((inputValue * Math.PI) / 180);
            break;
        case 'tan':
            result = Math.tan((inputValue * Math.PI) / 180);
            break;
        case 'log':
            result = inputValue <= 0 ? 'Errore' : Math.log10(inputValue);
            break;
        case '%':
            result = inputValue / 100;
            break;
        case '√':
        case '√x':
            result = inputValue < 0 ? 'Errore' : Math.sqrt(inputValue);
            break;
        case '∛x':
            result = Math.sign(inputValue) * Math.cbrt(Math.abs(inputValue));
            break;
        case 'x²':
            result = Math.pow(inputValue, 2);
            break;
        case 'x³':
            result = Math.pow(inputValue, 3);
            break;
        default:
            return;
    }

    currentValue = String(result);
    displayValue = currentValue;
    previousValue = result === 'Errore' ? null : result;
    operator = null;
    waitingForSecondValue = false;
    justCalculated = true;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentValue);

    if (operator && operator === '^' && waitingForSecondValue) {
        operator = nextOperator;
        displayValue = `${previousValue}${operator}`;
        return;
    }

    if (previousValue === null || justCalculated) {
        previousValue = inputValue;
    } else if (operator) {
        const result = performCalculation(operator, previousValue, inputValue);
        currentValue = String(result);
        previousValue = result === 'Errore' ? null : result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
    justCalculated = false;
    displayValue = `${previousValue}${operator}`;
}

function handleEquals() {
    if (!operator || waitingForSecondValue) {
        return;
    }

    const inputValue = parseFloat(currentValue);
    const result = performCalculation(operator, previousValue, inputValue);
    currentValue = String(result);
    previousValue = result === 'Errore' ? null : result;
    operator = null;
    waitingForSecondValue = false;
    justCalculated = true;
    displayValue = currentValue;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.replace(/\s+/g, '').trim();

        if (button.classList.contains('button--scient-toggle') || buttonText.startsWith('scient.')) {
            toggleScientificPanel();
        } else if (buttonText === 'xʸ') {
            handleOperator('^');
        } else if (buttonText === 'x²' || buttonText === 'x2') {
            handleScientificOperation('x²');
        } else if (button.classList.contains('button--scientific')) {
            handleScientificOperation(buttonText);
        } else if (button.classList.contains('button--operator')) {
            handleOperator(buttonText);
        } else if (button.classList.contains('button--function')) {
            if (buttonText === 'C') {
                resetCalculator();
            } else if (buttonText === '±') {
                toggleSign();
            } else if (buttonText === '%') {
                handleScientificOperation('%');
            }
        } else if (buttonText === '=') {
            handleEquals();
        } else if (buttonText === '.') {
            inputDecimal('.');
        } else {
            inputDigit(buttonText);
        }

        updateDisplay();
    });
});

updateDisplay();
