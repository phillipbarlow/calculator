// const numbers = document.querySelectorAll('.number');
// const operators = document.querySelectorAll('.operator');
// const perform = document.querySelectorAll('.perform');

// numbers.forEach(x=>{
//     x.addEventListener('click', (event)=>{
//         // example = event.target.innerHTML;
//         console.log(event.target.innerHTML);
//     })
// })
// operators.forEach(x=>{
//     x.addEventListener('click', (event)=>{
//         // example = event.target.innerHTML;
//         console.log(event.target.innerHTML);
//     })
// })
// perform.forEach(x=>{
//     x.addEventListener('click', (event)=>{
//         // example = event.target.innerHTML;
//         console.log(event.target.innerHTML);
//     })
// })

/*----- Variables -----*/
let number1 ="";
let number2 = "";
let operator="";
/*----- selecting elements -----*/
let arrNumbers = document.querySelectorAll(".number");
// console.log(arrNumbers)
let objMaths = document.querySelector(".maths")

let objPreview = document.querySelector(".preview");
    // console.log(objPreview)
let objClear = document.querySelector(".clear");
// console.log(objClear)
let arrOperators = document.querySelectorAll(".operator");

let objEquals = document.querySelector(".equals");
/*----- EventListener -----*/
//number loop
for(let i =0; i < arrNumbers.length; i++){
    // console.log(arrNumbers[i])
    objNumber = arrNumbers[i];
    objNumber.addEventListener("click", preview)
}
//operator loop
for(let i =0; i < arrOperators.length; i++){
    // console.log(arrOperators[i])
    objOperator = arrOperators[i];
    objOperator.addEventListener("click", preview)
}
objClear.addEventListener("click", clear);
objEquals.addEventListener("click", equals);
/*----- Functions -----*/
function preview(event){
    // console.log(event.target.innerHTML)
    currentItem = event.target.innerHTML;
    // console.log(currentItem)
    let dataType;
    switch(currentItem){
        case '*':
        case '/':
        case '-':
        case '+':
            dataType ='operator';
        break;
        default:
            dataType = 'number'
        break;
    }
    console.log(dataType)
    if(dataType == 'operator'){
        if(number1){
            operator = currentItem;
            strMessage = number1 + ' ' + currentItem;
        } else {
            console.log('You cannot set an operator without a number being set');
        }
    } else {
        if(operator){
            if(number2){
                number2 += currentItem;
            } else {
                number2 = currentItem;
            }
            strMessage = number1 + ' ' + operator + ' ' + number2;
        } else {
            if(number1){
                number1 += currentItem;
            } else {
                number1 = currentItem;
            }
            strMessage = number1;
        }
    }
    objPreview.value = strMessage;
}
function clear(event){
    number1="";
    number2 ="";
    operator ="";
    objPreview.value="";
    objMaths.value ="";
}

function equals(){
    let sum = calculator(number1, number2, operator);
    objMaths.value= sum;
}

//Adding a validation function for the numbers
function isValidNumber(number){
    //We are using a double negative as inNaN returns false on valid numbers
    return !isNaN(number);
}
function calculator(number1,number2,operator){
    //if number1 is not a number
    if(!isValidNumber(number1)){
        //end the function here and pass the message below.
        return 'Argument 1 must be a number';
    }
    //if number 2 is not a number
    if(!isValidNumber(number2)){
        //end the function here and pass the message below.
        return 'Argument 2 must be a number';
    }
    // if the operator does not equal + - * / %
    if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
        //end the function here and pass the message below.
        return 'Argument 3 must be an arithmatic operator';
    }
    //all fo the validation has passed so we need to do maths
    var sum;
    //based on the operator passed in argument 3 we will do a different sum
    switch(operator){
        case '+':
            sum = parseFloat(number1) + parseFloat(number2);
        break;
        case '-':
            sum = number1 - number2;
        break;
        case '*':
            sum = number1 * number2;
        break;
        case '/':
            sum = number1 / number2;
        break;
        case '%':
            sum = number1 % number2;
        break;
    }
    //return the value of the sum
    return sum;
}
