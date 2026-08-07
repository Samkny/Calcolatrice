previousValue = None
operator = None
waitingForSecondValue = False
justCalculated = False
currentValue = '0'

def inputDigit(digit):
    global currentValue, waitingForSecondValue, justCalculated
    if waitingForSecondValue or justCalculated:
        currentValue = digit
        waitingForSecondValue = False
        justCalculated = False
    else:
        currentValue = digit if currentValue == '0' else currentValue + digit


def performCalculation(op, first, second):
    if op == '+':
        return first + second
    if op == '-':
        return first - second
    if op == '×' or op == '*':
        return first * second
    if op == '÷' or op == '/':
        return 'Errore' if second == 0 else first / second
    return second


def handleOperator(nextOperator):
    global previousValue, operator, waitingForSecondValue, justCalculated, currentValue
    inputValue = float(currentValue)
    if operator and waitingForSecondValue:
        operator = nextOperator
        return
    if previousValue is None:
        previousValue = inputValue
    elif operator:
        result = performCalculation(operator, previousValue, inputValue)
        currentValue = str(result)
        previousValue = None if result == 'Errore' else result
    waitingForSecondValue = True
    operator = nextOperator
    justCalculated = False


def handleEquals():
    global previousValue, operator, waitingForSecondValue, justCalculated, currentValue
    if not operator or waitingForSecondValue:
        return
    inputValue = float(currentValue)
    result = performCalculation(operator, previousValue, inputValue)
    currentValue = str(result)
    previousValue = None if result == 'Errore' else result
    operator = None
    waitingForSecondValue = False
    justCalculated = True


def reset():
    global previousValue, operator, waitingForSecondValue, justCalculated, currentValue
    previousValue = None
    operator = None
    waitingForSecondValue = False
    justCalculated = False
    currentValue = '0'


def press(text):
    global currentValue, waitingForSecondValue, justCalculated
    if text == 'C':
        reset()
    elif text == '±':
        if currentValue != '0':
            currentValue = currentValue[1:] if currentValue.startswith('-') else '-' + currentValue
    elif text == '%':
        currentValue = str(float(currentValue) / 100)
    elif text == '.':
        if waitingForSecondValue or justCalculated:
            currentValue = '0.'
            waitingForSecondValue = False
            justCalculated = False
        elif '.' not in currentValue:
            currentValue += '.'
    elif text == '=':
        handleEquals()
    elif text in ['+','-','×','÷']:
        handleOperator(text)
    else:
        inputDigit(text)


for seq in [['6','-','2','='], ['9','-','3','='], ['9','-','3','+','1','=']]:
    reset()
    for key in seq:
        press(key)
    print(seq, '=>', currentValue, 'previousValue=', previousValue, 'operator=', operator, 'waiting=', waitingForSecondValue, 'justCalculated=', justCalculated)
