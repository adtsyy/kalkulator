document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent;

            if (buttonText === 'AC') {
                // Reset calculator
                currentInput = '';
                previousInput = '';
                operator = '';
                display.value = '';
            } else if (buttonText === '=') {
                // Perform calculation
                if (previousInput !== '' && currentInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.value = currentInput;
                    previousInput = '';
                    operator = '';
                    resultDisplayed = true;
                }
            } else if (buttonText === '%') {
                // Jika ada angka sebelumnya dan operator
                if (previousInput !== '' && operator !== '' && currentInput !== '') {
                    currentInput = ((parseFloat(previousInput) * parseFloat(currentInput)) / 100).toString();
                    display.value = previousInput + " " + operator + " " + currentInput;
                } 
                // Jika hanya ada angka sekarang, langsung ubah ke persen (50% → 0.5)
                else if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    display.value = currentInput;
                }
            } else if (buttonText === '+/-') {
                // Handle plus/minus toggle
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    display.value = currentInput;
                }
            } else if (this.classList.contains('operator')) {
                // Store the operator and first input
                if (previousInput === '') {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = buttonText;
                } else if (currentInput !== '') {
                    previousInput = calculate(previousInput, currentInput, operator);
                    operator = buttonText;
                    display.value = previousInput;
                    currentInput = '';
                }
            } else {
                // For digits and dot
                if (resultDisplayed) {
                    currentInput = buttonText;  // Start new input after result
                    resultDisplayed = false;
                } else {
                    currentInput += buttonText;  // Append number/operator to current input
                }
                display.value = previousInput + " " + operator + " " + currentInput;  // Display full expression
            }
        });
    });

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        if (operator === '+') {
            return (num1 + num2).toString();
        } else if (operator === '-') {
            return (num1 - num2).toString();
        } else if (operator === '*') {
            return (num1 * num2).toString();
        } else if (operator === '/') {
            return (num2 !== 0) ? (num1 / num2).toString() : "Error";
        }
        return num2.toString();
    }
});
