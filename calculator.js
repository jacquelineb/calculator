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

function operate(operator, num1, num2) {
  console.log(`in operate(). num1: ${num1}, num2: ${num2}`);
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === '×') {
    return multiply(num1, num2);
  } else if (operator === '÷'){
    return divide(num1, num2);
  } else {
    return null;
  }
}


const expression = {
  num1: null,
  num2: null,
  operator: null,
  evaluate: function() {
    return operate(this.operator, Number(this.num1), Number(this.num2));
  },
};

const clearBtn = document.querySelector('#clr');
clearBtn.addEventListener('click', () => {
  expression.num1 = expression.num2 = expression.operator = null;
  display.textContent = '';
});

// MAKE SURE TO LIMIT THE AMOUNT OF TEXT YOU CAN PUT INTO THE DISPLAY (MAYBE 9 CHARACTERS WIDE?)
let clearDisplay = false;
const display = document.querySelector('#display > p');

const numpadBtns = document.querySelectorAll('.numpad');
numpadBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const btnValue = button.getAttribute('value');
    if (clearDisplay) {
      display.textContent = '';
      clearDisplay = false;
    }

    if (btnValue === '-' && display.textContent !== ''
      || btnValue === '.' && display.textContent.includes('.')) {
      console.log('cant do that');
      return;
    }

    display.textContent += btnValue;
  });
});

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', () => {
  if (display.textContent !== '' && !isNaN(display.textContent) && expression.num1 !== null && expression.operator !== null) {
    expression.num2 = display.textContent;
    display.textContent = expression.evaluate().toString();
    expression.num1 = expression.num2 = expression.operator = null;
    clearDisplay = true;
  }
});

const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.getAttribute('value');
    if (display.textContent !== '' && !isNaN(display.textContent)) {
      console.log('valid display, do something');
      if (expression.operator) {
        expression.num2 = display.textContent;
        display.textContent = expression.evaluate().toString();
      }

      expression.num1 = display.textContent; // do something about the divide by zero result?. test input 2/0+1. the result is NaN. is this acceptable?
      expression.operator = operator;
      clearDisplay = true;
    }
  });
});