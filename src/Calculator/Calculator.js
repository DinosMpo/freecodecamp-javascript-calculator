import { useState } from 'react';
import './Calculator.css';
import { numbers, operators } from '../data';

export default function Calculator() {
    const [value, setValue] = useState('0');
    const [formula, setFormula] = useState('');
    const [output, setOutput] = useState('0');

    const addNumber = (val) => {
        if (value === "0") {
            setValue(val);
            setOutput(val);
        } else if (/[\+\-\/\*]/.test(value)) {
            setFormula(output + val);
            setOutput(prev => prev + val);
            setValue(val);
        } else {
            // setFormula(output + val);
            setValue(prev => prev + val);
            setOutput(prev => prev + val);
        }
    }

    const numbersList = numbers.map((num, key) => {
        return <div id={num.name} className="number" key={key} onClick={() => { addNumber(num.text) }}>{num.text}</div>
    });

    const operatorsList = operators.map((operator, key) => {
        return <div id={operator.name} className="operator" key={key} onClick={() => { addOperator(operator.text) }}>{operator.text}</div>
    });

    const clear = () => {
        setValue('0');
        setOutput('0');
        setFormula('');
    }

    const addDecimal = () => {
        if (!/\./.test(value)) {
            setValue(prev => prev + '.');
            setOutput(prev => prev + '.');
        }
    }

    const addOperator = (operator) => {
        if (!/\w[+-/*]/.test(output)) {
            setFormula(prev => prev + value);
            setOutput(value + operator);
            setValue(operator);
        } else {
            if (output[output.length - 1] == '+') {
                if (operator == '-') {
                    setValue(operator);
                    setOutput(prev => prev + '-');
                } else if (operator == '/') {
                    setValue('/');
                    setOutput(output + '/');
                } else if (operator == '*') {
                    setValue('*');
                    setOutput(output + '*');
                }
            } else if (output[output.length - 1] == '-') {
                if (operator == '+') {
                    setValue(operator);
                    setOutput(output + '+');
                } else if (operator == '/') {
                    setValue(operator);
                    setOutput(output + '/');
                } else if (operator == '*') {
                    setValue(operator);
                    setOutput(output + '*');
                }
            } else if (output[output.length - 1] == '/') {
                if (operator == '+') {
                    setValue(operator);
                    setOutput(output + '+');
                } else if (operator == '-') {
                    setValue(operator);
                    setOutput(prev => prev + '-');
                } else if (operator == '*') {
                    setValue(operator);
                    setOutput(output + '*');
                }
            } else if (output[output.length - 1] == '*') {
                if (operator == '+') {
                    setValue(operator);
                    setOutput(output + '+');
                } else if (operator == '-') {
                    setValue(operator);
                    setOutput(prev => prev + '-');
                } else if (operator == '/') {
                    setValue(operator);
                    setOutput(output + '/');
                }
            } else {
                setValue(operator);
                setOutput(output + operator);
            }
        }
    }

    const equal = () => {
        if (output) {
            // let result = `${output} = ${eval(formula)}`;
            setOutput(eval(formula));
            // setFormula();
            setValue(eval(formula));
        }
    }

    const calculate = () => {
        //make the formula an array with each number and operator
        let form = [...output];
        let number = '';
        let newForm = [];
        for (let i = 0; i < form.length; i++) {
            console.log('form', form);
            if (form[i] >= 0 || form[i] <= 9 || form[i] == '.') {
                // newForm.push(form[i]);
                number += form[i];
            } else if (form[i] == '+' || form[i] == '-' || form[i] == '/' || form[i] == '*') {
                newForm.push(number);
                number = '';
                newForm.push(form[i]);
            }
            
            if(i == form.length-1) {
                newForm.push(number);
            }
        }

        let result = '';
        let b = '';
        let operator = '';
        let secondOperator = '';
        for (let i = 0; i < newForm.length; i++) {
            console.log(newForm);
            if (Number(newForm[i])) {
                if (result == '') {
                    result = parseFloat(newForm[i]);
                } else if (b == '') {
                    b = parseFloat(newForm[i]);
                    //edw thn praksh
                    if (operator == '+') {
                        result = result + b;
                        b = '';
                        operator = '';
                    } else if (operator == '-') {
                        result = result - b;
                        b = '';
                        operator = '';
                    } else if (operator == '/') {
                        result = result / b;
                        b = '';
                        operator = '';
                    } else if (operator == '*') {
                        result = result * b;
                        b = '';
                        operator = '';
                    }
                }
            } else {
                console.log('aaaaa');
                operator = newForm[i];
            }
            // console.log('a ', result);
            // console.log('b ', b);
            // console.log('operator ', operator);

            // if (newForm[i] != '+' || newForm[i] != '-' || newForm[i] != '/' || newForm[i] != '*') {
            //     if (result == '') {
            //         result = parseFloat(newForm[i]);
            //     } else if (b == '') {
            //         b = parseFloat(newForm[i]);
            //         //edw thn praksh
            //         if (operator == '+') {
            //             result = result + b;
            //             console.log(result);
            //             console.log(b);
            //         } else if (operator == '-') {
            //             result = result - b;
            //         } else if (operator == '/') {
            //             result = result / b;
            //         } else if (operator == '*') {
            //             result = result * b;
            //         }
            //     }
            // } else if (newForm[i] == '+' || newForm[i] == '-' || newForm[i] == '/' || newForm[i] == '*') {
            //     console.log('aaaaa');
            //     operator = newForm[i];
            // }
        }
        // setOutput(formula + '=' + result);
        setOutput(result);
        setFormula('');
        setValue(result);
    }

    // const calculate = (val) => {
    //     let removeSpaces = val.replace(' ', '');
    //     let stringToArray = [...removeSpaces];
    //     let newArray = [];
    //     let number = '';

    //     for (let i = 0; i < stringToArray.length; i++) {
    //         if ((stringToArray[i] >= 0 && stringToArray[i] <= 9) || stringToArray[i] === ',' || stringToArray[i] === '.') {
    //             number += stringToArray[i];
    //         } else if (stringToArray[i] === '+' || stringToArray[i] === '-' || stringToArray[i] === '/' || stringToArray[i] === '*') {
    //             newArray.push(number);
    //             number = '';
    //             newArray.push(stringToArray[i]);
    //         }

    //         if (stringToArray.length - 1 === i) {
    //             newArray.push(number);
    //         }
    //     }

    //     let b = null;
    //     let operator = '';
    //     let result = 0;
    //     for (let i = 0; i < newArray.length; i++) {
    //         if (result === 0 && Number(newArray[i])) {
    //             result = Number(newArray[i]);
    //         } else if (b === null && Number(newArray[i])) {
    //             b = Number(newArray[i]);
    //             if (operator === '+') {
    //                 result += b;
    //                 b = null;
    //                 operator = '';
    //             } else if (operator === '-') {
    //                 result -= b;
    //                 b = null;
    //                 operator = '';
    //             } else if (operator === '/') {
    //                 result /= b;
    //                 b = null;
    //                 operator = '';
    //                 console.log('eeee');
    //             } else if (operator === '*') {
    //                 result *= b;
    //                 b = null;
    //                 operator = '';
    //             }
    //             // console.log(result);
    //         } else if (operator === '') {
    //             operator = newArray[i];
    //         }
    //     }
    //     setValue(result.toString());
    // }

    return (
        <div id="calculator">
            <div id="display-container">
                <div id="display">
                    {output}
                </div>
                <div id='input'>
                    {value}
                </div>
                {/* <input id="input" type="text" value={value} onChange={(e) => {
                    if (value === "0") {
                        let removeZero = e.target.value.replace('0', '');
                        e.target.value = removeZero;
                    }
                    setValue(e.target.value);
                }} /> */}
            </div>
            <div id="container">
                <div id='wrapper'>
                    <div id="numbers-container">
                        {numbersList}
                        <div id="decimal" onClick={() => addDecimal()}>.</div>
                        <div id="equals" onClick={() => calculate(formula)}>=</div>
                    </div>
                    <div id="operators-container">{operatorsList}</div>
                </div>
                <div id="clear" onClick={() => clear()}>Clear</div>
            </div>
        </div>
    )
}