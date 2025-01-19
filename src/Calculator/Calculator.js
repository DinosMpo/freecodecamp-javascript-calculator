import { useState } from 'react';
import './Calculator.css';
import { numbers, operators } from '../data';

export default function Calculator() {
    const [value, setValue] = useState('0');
    const [output, setOutput] = useState('0');

    const numbersList = numbers.map((num, key) => <div id={num.name} className="number" key={key} onClick={() => { addNumber(num.text) }}>{num.text}</div>);

    const operatorsList = operators.map((operator, key) => <div id={operator.name} className="operator" key={key} onClick={() => { addOperator(operator.text) }}>{operator.text}</div>);

    const clear = () => {
        setValue('0');
        setOutput('0');
    }

    const addDecimal = () => {
        if (!/\./.test(value)) {
            setValue(prev => prev + '.');
            setOutput(prev => prev + '.');
        }
    }

    const addNumber = (val) => {
        if (value === "0") {
            setOutput(val);
            setValue(val);
        } else if (/[\+\-\/\*]/.test(value)) {
            setOutput(prev => prev + val);
            setValue(val);
        } else {
            setOutput(prev => prev + val);
            setValue(prev => prev + val);
        }
    }

    const addOperator = (operator) => {
        if (/[+*/-]/.test(value) && operator !== '-') {
            if (/[+/*-]/.test(output[output.length - 1]) && /[+/*-]/.test(output[output.length - 2])) {
                let newOutput = output.slice(0, -2);
                newOutput += operator;
                setOutput(newOutput);
                setValue(operator);
            } else if (/[+/*-]/.test(output[output.length - 1])) {
                let newOutput = output.slice(0, -1);
                newOutput += operator;
                setOutput(newOutput);
                setValue(operator);
            }
        } else if (value === '0') {
            setOutput(operator);
            setValue(operator);
        } else {
            if (output[output.length - 1] === '+') {
                if (operator === '-') {
                    setValue(operator);
                    setOutput(prev => prev + '-');
                } else if (operator === '/') {
                    setValue('/');
                    setOutput(output + '/');
                } else if (operator === '*') {
                    setValue('*');
                    setOutput(output + '*');
                }
            } else if (output[output.length - 1] === '-') {
                if (operator === '+') {
                    setValue(operator);
                    setOutput(output + '+');
                } else if (operator === '/') {
                    setValue(operator);
                    setOutput(output + '/');
                } else if (operator === '*') {
                    setValue(operator);
                    setOutput(output + '*');
                }
            } else if (output[output.length - 1] === '/') {
                if (operator === '+') {
                    setValue(operator);
                    setOutput(output + '+');
                } else if (operator === '-') {
                    setValue(operator);
                    setOutput(prev => prev + '-');
                } else if (operator === '*') {
                    setValue(operator);
                    setOutput(output + '*');
                }
            } else if (output[output.length - 1] === '*') {
                if (operator === '+') {
                    setValue(operator);
                    setOutput(output + '+');
                } else if (operator === '-') {
                    setValue(operator);
                    setOutput(prev => prev + '-');
                } else if (operator === '/') {
                    setValue(operator);
                    setOutput(output + '/');
                }
            } else {
                setValue(prev => prev + operator);
                setOutput(output + operator);
            }
        }
    }

    const calculate = () => {
        let form = [...output];
        let newForm = [];
        let number = '';
        let firstOperator = '';
        let secOperator = '';
        for (let i = 0; i < form.length; i++) {
            if ((number === '' && form[i] === '-' && firstOperator === '') || form[i] >= 0 || form[i] <= 9 || form[i] === '.') {
                number += form[i];
                if (i === form.length - 1) {
                    newForm.push(number);
                }
            } else if (/[+/*-]/.test(form[i]) && firstOperator === '') {
                newForm.push(number);
                number = '';
                firstOperator = form[i];
                newForm.push(firstOperator);
            } else if (firstOperator !== '') {
                if (form[i] === '-') {
                    secOperator = form[i];
                    number += secOperator;
                    firstOperator = '';
                    secOperator = '';
                }else {
                    newForm.push(number);
                    number = '';
                    newForm.push(form[i]);
                    firstOperator = '';
                    secOperator = '';
                }
            }
        }

        let result = '';
        let b = '';
        let operator = '';
        for (let i = 0; i < newForm.length; i++) {
            if (Number(newForm[i])) {
                if (result === '') {
                    result = parseFloat(newForm[i]);
                } else if (b === '') {
                    b = parseFloat(newForm[i]);
                    if (operator === '+') {
                        result = result + b;
                        b = '';
                        operator = '';
                    } else if (operator === '-') {
                        result = result - b;
                        b = '';
                        operator = '';
                    } else if (operator === '/') {
                        result = result / b;
                        b = '';
                        operator = '';
                    } else if (operator === '*') {
                        result = result * b;
                        b = '';
                        operator = '';
                    }
                }
            } else {
                operator = newForm[i];
            }
        }
        setOutput(result);
        setValue(result);
    }

    return (
        <div id="calculator">
            <div id="display-container">
                <div id="display">
                    {output}
                </div>
                <div id='input'>
                    {value}
                </div>
            </div>
            <div id="container">
                <div id='wrapper'>
                    <div id="numbers-container">
                        {numbersList}
                        <div id="decimal" onClick={() => addDecimal()}>.</div>
                        <div id="equals" onClick={() => calculate(output)}>=</div>
                    </div>
                    <div id="operators-container">{operatorsList}</div>
                </div>
                <div id="clear" onClick={() => clear()}>Clear</div>
            </div>
        </div>
    )
}