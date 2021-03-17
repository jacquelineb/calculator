const expression = {
  num1: '',
  num2: '',
  operator: '',
  evaluate: function() {
    return operate(this.operator, Number(this.num1), Number(this.num2)).toString();
  },
};

const numpadBtns = document.querySelectorAll('.numpad');
const operatorBtns = document.querySelectorAll('.operator');
const expressionDisplay = document.querySelector('#expression');
const resultDisplay = document.querySelector('#result');
const clearBtn = document.querySelector('#clr');
const deleteBtn = document.querySelector('#del');
const equalsBtn = document.querySelector('.equals');

numpadBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const numpadChar = button.getAttribute('value');
    let currOperandInput = (expression.operator === '') ? expression.num1 : expression.num2;
    if (numpadChar === '-' && currOperandInput !== ''
      || numpadChar === '.' && currOperandInput.includes('.')
      || currOperandInput.length >= 17) {
      return;
    }
    (expression.operator === '') ? expression.num1 += numpadChar : expression.num2 += numpadChar;
    updateDisplay();
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.getAttribute('value');
    if (isValidNum(resultDisplay.textContent)) {
      expression.num1 = resultDisplay.textContent;
    }
    if (expression.operator === '' && isValidNum(expression.num1)) {
      expression.operator = operator;
    } else if (isValidNum(expression.num2)) {
      expression.num1 = expression.evaluate();
      expression.operator = operator;
      expression.num2 = '';
    }

    updateDisplay();
  });
});

clearBtn.addEventListener('click', () => {
  clearData();
  updateDisplay();
});

deleteBtn.addEventListener('click', () => {
  deleteRecentInput();
  updateDisplay();
});

equalsBtn.addEventListener('click', evaluateExpression);

function updateDisplay() {
  console.log(`${expression.num1} ${expression.operator} ${expression.num2}`);
  expressionDisplay.textContent = `${expression.num1} ${expression.operator} ${expression.num2}`;
  resultDisplay.textContent = '';
}

function clearData() {
  expression.num1 = expression.num2 = expression.operator = '';
}

function deleteRecentInput() {
  if (resultDisplay.textContent !== '') {
    resultDisplay.textContent = '';
  }
  if (expression.num2.length) {
    expression.num2 = expression.num2.slice(0,-1);
  } else if (expression.operator.length) {
    expression.operator = '';
  } else if (expression.num1.length) {
    expression.num1 = expression.num1.slice(0,-1);
  }
}

function evaluateExpression() {
  if (isValidNum(expression.num1) && isValidNum(expression.num2) && expression.operator !== '') {
    resultDisplay.textContent = expression.evaluate();
    if (isValidNum(resultDisplay.textContent) && resultDisplay.textContent.length > 10) {
      resultDisplay.textContent = Number(resultDisplay.textContent).toPrecision(10);
    }
    expression.num1 = expression.num2 = expression.operator = '';
  }
}


function isValidNum(string) {
  return (string !== '' && !isNaN(string));
}

function operate(operator, num1, num2) {
  console.log(`in operate(). num1: ${num1}, num2: ${num2}`);
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '–') {
    return subtract(num1, num2);
  } else if (operator === '×') {
    return multiply(num1, num2);
  } else if (operator === '÷'){
    return divide(num1, num2);
  } else {
    return null;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(dividend, divisor) {
  if (divisor === 0) {
    return 'UNDEFINED';
  }
  return dividend / divisor;
}
