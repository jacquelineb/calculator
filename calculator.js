const expression = {
  num1: '',
  num2: '',
  operator: '',
  evaluate: function() {
    return operate(this.operator, Number(this.num1), Number(this.num2)).toString();
  },
};

// MAKE SURE TO LIMIT THE AMOUNT OF TEXT YOU CAN PUT INTO THE DISPLAY (MAYBE 9 CHARACTERS WIDE?)
let currNum = '';
const expressionDisplay = document.querySelector('#expression');
const resultDisplay = document.querySelector('#result');
const clearBtn = document.querySelector('#clr');
const deleteBtn = document.querySelector('#del');
const numpadBtns = document.querySelectorAll('.numpad');
const operatorBtns = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');

clearBtn.addEventListener('click', clearData);
deleteBtn.addEventListener('click', deleteRecentInput);
equalsBtn.addEventListener('click', evaluateExpression);


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

function deleteRecentInput() {
  if (resultDisplay.textContent !== '') {
    resultDisplay.textContent = '';
  }

  if (expression.num2.length) {
    expression.num2 = expression.num2.slice(0,-1);
    currNum = expression.num2;
  }
  else if (expression.operator.length) {
    expression.operator = '';
    currNum = expression.num1;
  }
  else if (expression.num1.length) {
    expression.num1 = expression.num1.slice(0,-1);
    currNum = expression.num1;
  }
  updateDisplay();

}

function clearData() {
  currNum = expression.num1 = expression.num2 = expression.operator = '';
  expressionDisplay.textContent = resultDisplay.textContent = '';
}

function evaluateExpression() {
  if (isValidNum(expression.num1) && isValidNum(expression.num2) && expression.operator !== '') {
    resultDisplay.textContent = expression.evaluate();
    if (isValidNum(resultDisplay.textContent) && resultDisplay.textContent.length > 10) {
      resultDisplay.textContent = parseFloat(resultDisplay.textContent).toPrecision(10);
    }

    currNum = expression.num1 = expression.num2 = expression.operator = '';
  }
}

numpadBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const btnValue = button.getAttribute('value');
    if (btnValue === '-' && currNum !== ''
      || btnValue === '.' && currNum.includes('.')) {
      return;
    }

    if (currNum.length < 17) {
      currNum += btnValue;
    }
    if (expression.operator === '') {
      expression.num1 = currNum;
    } else {
      expression.num2 = currNum;
    }
    updateDisplay();
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    if (isValidNum(resultDisplay.textContent)) {
      currNum = resultDisplay.textContent;
    }

    if (isValidNum(currNum)) {
      const operator = button.getAttribute('value');
      if (expression.operator === '') {
        expression.num1 = currNum;
        expression.operator = operator;
      } else {
        expression.num2 = currNum;
        expression.num1 = expression.evaluate();
        expression.operator = operator;
        expression.num2 = '';
      }
      currNum = ''
    }
    updateDisplay();
  });
});

function isValidNum(string) {
  return (string !== '' && !isNaN(string));
}

function updateDisplay() {
  console.log(`${expression.num1} ${expression.operator} ${expression.num2}`);
  expressionDisplay.textContent = `${expression.num1} ${expression.operator} ${expression.num2}`;
  resultDisplay.textContent = '';
}
