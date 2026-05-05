window.onload = function () {
    let firstValue = '';
    let secondValue = '';
    let selectedOperation = null;
    let calculationResult = '';

    let monthlyRates = [];

    const resultScreen = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
    const themeToggleButton = document.getElementById('theme-toggle');

    function showValue(value) {
        resultScreen.innerHTML = value === '' ? '0' : value;
    }

    function appendDigit(value) {
        if (!selectedOperation) {
            if (value !== '.' || !firstValue.includes('.')) {
                firstValue += value;
            }
            showValue(firstValue);
        } else {
            if (value !== '.' || !secondValue.includes('.')) {
                secondValue += value;
            }
            showValue(secondValue);
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function () {
            appendDigit(button.innerHTML.trim());
        };
    });

    document.getElementById('btn_op_plus').onclick = function () {
        if (firstValue === '') return;
        selectedOperation = '+';
    };

    document.getElementById('btn_op_minus').onclick = function () {
        if (firstValue === '') return;
        selectedOperation = '-';
    };

    document.getElementById('btn_op_mult').onclick = function () {
        if (firstValue === '') return;
        selectedOperation = 'x';
    };

    document.getElementById('btn_op_div').onclick = function () {
        if (firstValue === '') return;
        selectedOperation = '/';
    };

    document.getElementById('btn_op_percent').onclick = function () {
        if (selectedOperation && secondValue !== '') {
            secondValue = ((+secondValue) / 100).toString();
            showValue(secondValue);
            return;
        }

        if (firstValue !== '') {
            firstValue = ((+firstValue) / 100).toString();
            showValue(firstValue);
        }
    };

    document.getElementById('btn_op_rate').onclick = function () {
        let currentMonthHours = '';

        if (selectedOperation && secondValue !== '') {
            currentMonthHours = secondValue;
            const monthRate = (+currentMonthHours) / 75;
            monthlyRates.push(monthRate);

            secondValue = '';
            showValue(monthRate.toFixed(2));
            return;
        }

        if (!selectedOperation && firstValue !== '') {
            currentMonthHours = firstValue;
            const monthRate = (+currentMonthHours) / 75;
            monthlyRates.push(monthRate);

            firstValue = '';
            showValue(monthRate.toFixed(2));
        }
    };

    document.getElementById('btn_op_equal').onclick = function () {
        // 1. Сначала обычные вычисления
        if (selectedOperation && firstValue !== '' && secondValue !== '') {
            switch (selectedOperation) {
                case '+':
                    calculationResult = (+firstValue) + (+secondValue);
                    break;
                case '-':
                    calculationResult = (+firstValue) - (+secondValue);
                    break;
                case 'x':
                    calculationResult = (+firstValue) * (+secondValue);
                    break;
                case '/':
                    calculationResult = (+firstValue) / (+secondValue);
                    break;
                default:
                    return;
            }

            firstValue = calculationResult.toString();
            secondValue = '';
            selectedOperation = null;
            showValue(firstValue);
            return;
        }

        // 2. Если обычного выражения нет, но есть месяцы через СТВ — считаем среднюю ставку
        if (monthlyRates.length > 0) {
            let sum = 0;

            for (let i = 0; i < monthlyRates.length; i++) {
                sum += monthlyRates[i];
            }

            const averageRate = sum / monthlyRates.length;

            firstValue = averageRate.toFixed(2);
            secondValue = '';
            selectedOperation = null;
            monthlyRates = [];

            showValue(firstValue);
        }
    };

    document.getElementById('btn_op_clear').onclick = function () {
        firstValue = '';
        secondValue = '';
        selectedOperation = null;
        calculationResult = '';
        monthlyRates = [];
        showValue('0');
    };

    if (themeToggleButton) {
        themeToggleButton.onclick = function () {
            document.body.classList.toggle('dark-theme');
        };
    }
};