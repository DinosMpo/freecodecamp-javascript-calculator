import { useState } from 'react';
import './Calculator.css';
import { numbers, operators } from '../data';

export default function Calculator() {
    const [value, setValue] = useState(0);
    const [output, setOutput] = useState("");

    // const activeNumber = 0;

    const numbersList = numbers.map((num, key) => {
        return <div id={num.name} className="number" key={key}>{num.text}</div>
    });

    const operatorsList = operators.map((operator, key) => {
        return <div id={operator.name} className="operator" key={key}>{operator.text}</div>
    });

    const clear = () => {
        setValue(0);
        setOutput("");
    }

    return (
        <div id="calculator">
            <div id="display">
                <div id="output">
                    <div className="value">{value}</div>
                </div>
                <input id="input" type="text" value={value} onChange={(e) => {
                    if(value === 0) {
                        let removeZero = e.target.value.replace(0, ''); 
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
                        <div id="equals">=</div>
                    </div>
                    <div id="operators-container">{operatorsList}</div>
                </div>
                <div id="clear" onClick={() => clear()}>Clear</div>
            </div>
        </div>
    )
}