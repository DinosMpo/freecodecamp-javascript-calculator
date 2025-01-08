import './Calculator.css';
import { numbers, operators } from '../data';

export default function Calculator() {
    const numbersList = numbers.map((num, key) => {
        return <div id={num.name} className="number" key={key}>{num.text}</div>
    });

    const operatorsList = operators.map((operator, key) => {
        return <div id={operator.name} className="operator" key={key}>{operator.text}</div>
    });

    return (
        <div id="calculator">
            <div id="display"></div>
            <div id="container">
                <div id='wrapper'>
                    <div id="numbers-container">
                        {numbersList}
                        <div id="decimal">.</div>
                        <div id="equals">=</div>
                    </div>
                    <div id="operators-container">{operatorsList}</div>
                </div>
                <div id="clear">Clear</div>
            </div>
        </div>
    )
}