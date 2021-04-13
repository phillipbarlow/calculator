
/*----- Variables -----*/
//undefined variables
let number1 = "", number2 = "", operator = "", blnEquals = false;

/*----- selecting elements -----*/
let arrNumbers = document.querySelectorAll(".number");
// console.log(arrNumbers)
let objMaths = document.querySelector(".maths")

let objPreview = document.querySelector(".preview");
    // console.log(objPreview)
let objprevious = document.querySelector(".previous");
// console.log(objprevious)
let objClear = document.querySelector(".clear");
// console.log(objClear)
let arrOperators = document.querySelectorAll(".operator");

let objEquals = document.querySelector(".equals");

let objError = document.querySelector(".error");
// console.log(objError)
let objDecimal = document.querySelector(".decimal");

objClear.addEventListener("click", clear);
//grabs clear button with clear call back

objEquals.addEventListener("click", equals);
//grabs equal button with equals call back
objDecimal.addEventListener("click", preview);
console.log(objDecimal)
/*----- EventListener -----*/
//number loop which adds objNumber.addEventListener("click", preview) with each iteration
for(let i =0; i < arrNumbers.length; i++){
    // console.log(arrNumbers[i])
    objNumber = arrNumbers[i];
    objNumber.addEventListener("click", preview)
}
//operator loop which adds objOperator.addEventListener("click", preview) with each iteration
for(let i =0; i < arrOperators.length; i++){
    // console.log(arrOperators[i])
    objOperator = arrOperators[i];
    objOperator.addEventListener("click", preview)
}

/*----- callback Functions -----*/
//preview call back invoked by objNumber + objOperator;
function preview(event){
    console.log(blnEquals);
    // currentItem = the button txt
    currentItem = event.target.innerHTML;
    // console.log(currentItem)
    // datatype either equals 'operator or 'number'
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
    // console.log(dataType)
    //if dataType equals 'operator
    if(dataType == 'operator'){
        if(blnEquals){
            blnEquals = false;
        }
        if(number2){
            number1 = calculator(number1, number2, operator);
            number2 = "";
            objprevious.value = objPreview.value;
            objMaths.value ="";
        }
        //true when number1 has value
        if(number1){
            operator = currentItem;
            strMessage = number1 + ' ' + currentItem;
        } else {
            objError.innerHTML = 'You cannot set an operator without a number being set';
        }
        //if dataType equals number;
    }else{
        //true when operator has value
        if(blnEquals){
            number1 = '';
            blnEquals = false;
        }
        if(operator){
            if(number2){
                if(currentItem == '.'){
                    if(!hasDecimal(number1)){
                        number2 += currentItem;
                    }
                } else {
                    number2 += currentItem;
                }
            } else {
                if(currentItem == '.'){
                    number2 = '0.';
                } else {
                    number2 = currentItem;
                }
            }
            strMessage = number1 + ' ' + operator + ' ' + number2;
            var sum = calculator(number1,number2,operator);
            objMaths.value = sum;
        } else {
            if(number1){
                if(currentItem == '.'){
                    if(!hasDecimal(number1)){
                        number1 += currentItem;
                    }
                } else {
                    number1 += currentItem;
                }
            } else {
                if(currentItem == '.'){
                    number1 = '0.';
                } else {
                    number1 = currentItem;
                }
            }
            strMessage = number1;
        }
    }
    //gives value of strMessage to objPreview
    objPreview.value = strMessage;
}
//onces clear is pressed resets all values 
function clear(event){
    number1="";
    number2 ="";
    operator ="";
    objPreview.value="";
    objMaths.value ="";
    objprevious.value="";
    objError.innerHTML ="";
}
//equals buttons callback, with the validation callback stored in sum
function equals(){
    let sum = calculator(number1, number2, operator);
    if(sum){
        //appends value of sum to objMaths to show result;
        objMaths.value ="";
        objprevious.value = objPreview.value;
        objMaths.value= sum;
        blnEquals = true;
        number1 = sum;
        number2 = '';
        operator = '';
    }
}
function hasDecimal(number){
    if(number.indexOf('.') !== -1){
        objError.innerHTML = 'You can only have one decimal place per number';
        return true;
    }
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
        objError.innerHTML = 'Number 1 must be a number';
        return;
    }
       // if the operator does not equal + - * / %
       if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
        //end the function here and pass the message below.
        objError.innerHTML = 'must be an arithmatic operator';
        return;
    }
    //if number 2 is not a number
    if(!isValidNumber(number2)){
        //end the function here and pass the message below.
        objError.innerHTML = 'Number 2 must be a number';
        return
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
