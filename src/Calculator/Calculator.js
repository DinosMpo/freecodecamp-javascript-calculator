import { useState } from 'react';
import './Calculator.css';
import { numbers, operators } from '../data';

export default function Calculator() {
    const [value, setValue] = useState('0');
    // const [output, setOutput] = useState("");

    // const activeNumber = 0;

    const test = () => {
        console.log('sdsdsds');
    }

    const clickButton = (val) => {
        if (value === "0") {
            // let removeZero = value.replace('0', '');
            setValue(prev => prev.replace('0', '') + val);
        }else{
            setValue(prev => prev + val);
        }
    }

    const numbersList = numbers.map((num, key) => {
        return <div id={num.name} className="number" key={key} onClick={() => { clickButton(num.text) }}>{num.text}</div>
    });

    const operatorsList = operators.map((operator, key) => {
        return <div id={operator.name} className="operator" key={key} onClick={() => { clickButton(operator.text) }}>{operator.text}</div>
    });

    const clear = () => {
        setValue('0');
    }

    const calculate = (val) => {
        let removeSpaces = val.replace(' ', '');
        let stringToArray = [...removeSpaces];
        let newArray = [];
        let number = '';

        for (let i = 0; i < stringToArray.length; i++) {
            if ((stringToArray[i] >= 0 && stringToArray[i] <= 9) || stringToArray[i] === ',' || stringToArray[i] === '.') {
                number += stringToArray[i];
            } else if (stringToArray[i] === '+' || stringToArray[i] === '-' || stringToArray[i] === '/' || stringToArray[i] === '*') {
                newArray.push(number);
                number = '';
                newArray.push(stringToArray[i]);
            }

            if (stringToArray.length - 1 === i) {
                newArray.push(number);
            }
        }

        let b = null;
        let operator = '';
        let result = 0;
        for (let i = 0; i < newArray.length; i++) {
            if (result === 0 && Number(newArray[i])) {
                result = Number(newArray[i]);
            } else if (b === null && Number(newArray[i])) {
                b = Number(newArray[i]);
                if (operator === '+') {
                    result += b;
                    b = null;
                    operator = '';
                } else if (operator === '-') {
                    result -= b;
                    b = null;
                    operator = '';
                } else if (operator === '/') {
                    result /= b;
                    b = null;
                    operator = '';
                    console.log('eeee');
                } else if (operator === '*') {
                    result *= b;
                    b = null;
                    operator = '';
                }
                // console.log(result);
            } else if (operator === '') {
                operator = newArray[i];
            }
        }
        setValue(result.toString());
    }

    return (
        <div id="calculator">
            <div id="display-container">
                <div id="display">
                    {value}
                </div>
                <input id="input" type="text" value={value} onChange={(e) => {
                    if (value === "0") {
                        let removeZero = e.target.value.replace('0', '');
                        e.target.value = removeZero;
                    }
                    setValue(e.target.value);
                }} />
            </div>
            <div id="container">
                <div id='wrapper'>
                    <div id="numbers-container">
                        {numbersList}
                        <div id="decimal">.</div>
                        <div id="equals" onClick={() => calculate(value)}>=</div>
                    </div>
                    <div id="operators-container">{operatorsList}</div>
                </div>
                <div id="clear" onClick={() => clear()}>Clear</div>
            </div>
        </div>
    )
}