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
let clearDisplay = false;
const result = document.querySelector('#main-display');
const expressionDisplay = document.querySelector('#mini-display');
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
    return 'ERROR: DIVIDE BY ZERO';
  }
  return dividend / divisor;
}

function deleteRecentInput() {
  if (result.textContent !== '') {
    result.textContent = '';
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
  updateExpressionDisplay();

}

function clearData() {
  currNum = expression.num1 = expression.num2 = expression.operator = '';
  expressionDisplay.textContent = result.textContent = '';
}

function evaluateExpression() {
  if (!isNaN(expression.num1) && !isNaN(expression.num2) && expression.operator !== '') {
    result.textContent = expression.evaluate();
    currNum = expression.num1 = expression.num2 = expression.operator = '';

    //expression.num1 = expression.num2 = expression.operator = '';
    //currNum = result.textContent;
  }
}

numpadBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const btnValue = button.getAttribute('value');
    if (btnValue === '-' && currNum !== ''
      || btnValue === '.' && currNum.includes('.')) {
      return;
    }

    if (result.textContent !== '') {
      currNum = result.textContent = '';
    }

    currNum += btnValue;
    //expressionDisplay.textContent += btnValue;
    if (expression.operator === '') {
      expression.num1 = currNum;
    } else {
      expression.num2 = currNum;
    }
    updateExpressionDisplay();

  });
});

operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.getAttribute('value');
    // Make sure to do something about the DIVIDE BY ZERO ERROR result

    if (result.textContent !== '' && !isNaN(result.textContent)) {
      currNum = result.textContent;
      result.textContent = '';
    }

    if (currNum !== '' && !isNaN(currNum)) {
      if (expression.operator === '') {
        expression.num1 = currNum;
        expression.operator = operator;
      }
      else {
        expression.num2 = currNum;
        expression.num1 = expression.evaluate();
        expression.operator = operator;
        expression.num2 = '';
      }
      currNum = ''
      updateExpressionDisplay();
    }

  });
});


function updateExpressionDisplay() {
  console.log(`${expression.num1} ${expression.operator} ${expression.num2}`);
  expressionDisplay.textContent = `${expression.num1} ${expression.operator} ${expression.num2}`;
}
