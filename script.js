var root = document.documentElement;
var isOriginal = true;
var result = document.querySelector(".final-result");
var operation = document.querySelector(".operation");
var inputs = document.querySelectorAll(".buttons input");
var operator = "";
var firstNumber = "";
var secondNumber = "";
var finalResult = 0;
var operatorClicked = false;
var firstNumberClicked = false;
var secondNumberClicked = false;

function mode() {
    if (isOriginal) {
        root.style.setProperty("--BG", "#293443");
        root.style.setProperty("--operation_color", "#fff");
        root.style.setProperty("--num_color", "#fff");
        document.body.style.backgroundColor = "#fff";
    } else {
        root.style.setProperty("--BG", "#fff");
        root.style.setProperty("--operation_color", "#000");
        root.style.setProperty("--num_color", "#151617");
        document.body.style.backgroundColor = "#31373e";
    }
    isOriginal = !isOriginal;
}

inputs.forEach((input) => {
    input.addEventListener("click", check);
});

function check() {
    if (!isNaN(parseFloat(this.value)) || this.value === ".") {
        if (!operatorClicked) {
            if (this.value === "." && firstNumber.includes(".")) {
                return; // Prevent adding a second dot to firstNumber
            }
            firstNumber += this.value;
            firstNumberClicked = true;
            print();
        } else {
            if (this.value === "." && secondNumber.includes(".")) {
                return; // Prevent adding a second dot to secondNumber
            }
            secondNumber += this.value;
            secondNumberClicked = true;
            print();
            print_result();
        }
    } else if (this.value === "<") {
        backspace();
    } else if (this.value === "C") {
        clear();
    } else if (firstNumberClicked && !operatorClicked) {
        if (["+", "-", "/", "x", "%"].includes(this.value)) {
            operator = this.value;
            operatorClicked = true;
            print();
        }
    } else if (this.value === "=" && secondNumberClicked) {
        print_result();
        equal_clear();
    }
}

function print() {
    operation.innerHTML = `${firstNumber}  <span style="color:orange;">${operator}</span>  ${secondNumber}`;
}
function print_result() {
    if (operator === "+") {
        finalResult = parseFloat(firstNumber) + parseFloat(secondNumber);
    } else if (operator === "-") {
        finalResult = parseFloat(firstNumber) - parseFloat(secondNumber);
    } else if (operator === "/") {
        finalResult = parseFloat(firstNumber) / parseFloat(secondNumber);
    } else if (operator === "x") {
        finalResult = parseFloat(firstNumber) * parseFloat(secondNumber);
    } else if (operator === "%") {
        finalResult = parseFloat(firstNumber) % parseFloat(secondNumber);
    }
    let final = String(finalResult);
    result.innerHTML = final.length < 9 ? final : finalResult.toPrecision(6);
}
function backspace() {
    if (secondNumberClicked) {
        secondNumber = secondNumber.slice(0, -1);
        if (secondNumber.length === 0) secondNumberClicked = false;
        print();
        print_result();
    } else if (operatorClicked) {
        operator = "";
        operatorClicked = false;
        print();
    } else if (firstNumberClicked) {
        firstNumber = firstNumber.slice(0, -1);
        if (firstNumber.length === 0) firstNumberClicked = false;
        print();
    }
}
function equal_clear() {
    firstNumber = result.innerHTML;
    secondNumber = "";
    operator = "";
    finalResult = 0;
    operatorClicked = false;
    secondNumberClicked = false;
    print();
}
function clear() {
    operator = "";
    firstNumber = "";
    secondNumber = "";
    finalResult = 0;
    operatorClicked = false;
    firstNumberClicked = false;
    secondNumberClicked = false;
    result.innerHTML = "0";
    operation.innerHTML = "";
}
