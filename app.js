const input = document.querySelector('.displayResult');
const calcOps = document.querySelector('.displayCalcs');
const btns = document.querySelectorAll('button');
let curValue;
let operatorUsed;
let numbers = [];
let newCalcs = [];
let opClicked = false;
let displayArray;

btns.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.classList.contains('num')) {
            input.value += button.innerHTML;
            opClicked = false;
        }
        
        if(button.innerHTML == 'C'){
            input.value = "";
            numbers = [];
        }

        if(button.classList.contains('operator')){
            operatorUsed = button.innerHTML;
            curValue = input.value;
            if(!opClicked){
            numbers.push(curValue);
            numbers.push(operatorUsed);
            console.log(numbers);
            input.value = "";
            }
            opClicked = true;
            displayArray = numbers.join("")
            calcOps.value = displayArray.toString();
        }

        if(button.classList.contains('equal')){
            curValue = input.value;
            numbers.push(curValue);
            calculateResult();
            displayResult();
            numbers = [];
        }
       
    })
})

// Operation functions

let add = (num1,num2) => {  // toNUmber!!
    return parseInt(num1) + parseInt(num2);
}
let subtract = (num1,num2) => {
    return num1 - num2;
}
let multiply = (num1,num2) => {
    return num1 * num2;
}
let divide = (num1,num2) => {
    return num1 / num2;
}

// Operate result
let operate = (op,num1,num2) => {
    switch(op){
      case '*':
        return multiply(num1,num2);
        break;

      case '/':
        return divide(num1,num2);
        break;

      case '-':
          return subtract(num1,num2);
          break;

      case '+':
          return add(num1,num2);
          break;
    
      default:
          return 'No operation';
    }
}

// Do the calculations in array

let calculateResult = () => {
    console.log(numbers);
    for(let i = 0; i<numbers.length; i++){
        if(numbers[i] == '/'){
            let division = divide(numbers[i-1], numbers[i+1]);
            numbers[i+1] = division;
            numbers.splice(i-1,2);
            i = -1;
        }

        if(numbers[i] == '*'){
            let multiplication = multiply(numbers[i-1], numbers[i+1]);
            numbers[i+1] = multiplication;
            numbers.splice(i-1,2);
            i = -1;
        }
    }

    for(let i = 0; i<numbers.length; i++){
        if(numbers[i] == '+'){
            let adder = add(numbers[i-1], numbers[i+1]);
            numbers[i+1] = adder;
            numbers.splice(i-1,2);
            i = -1;
        }

        if(numbers[i] == '-'){
            let subtractor = subtract(numbers[i-1], numbers[i+1]);
            numbers[i+1] = subtractor;
            numbers.splice(i-1,2);
            i = -1;
        }
    }
    console.log(numbers);
    return numbers;
}

// Voilla

let displayResult = () => {
    calcOps.value = calculateResult();
}