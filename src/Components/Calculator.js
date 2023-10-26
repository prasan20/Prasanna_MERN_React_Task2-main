import React, { Component } from 'react';
import './task2.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      prevValue: null,
      waitingForOperand: false,
      expression: '',
      showResult: false,
    };
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand, expression, showResult } = this.state;

    if (showResult) {
      this.setState({
        displayValue: String(digit),
        showResult: false,
        expression: String(digit),
      });
    } else if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
        expression: expression + String(digit),
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
        expression: expression + String(digit),
      });
    }
  }

  inputDecimal() {
    const { displayValue, waitingForOperand, expression } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false,
        expression: expression + '0.',
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        expression: expression + '.',
      });
    }
  }

  clearDisplay() {
    this.setState({
      displayValue: '0',
      operator: null,
      prevValue: null,
      waitingForOperand: false,
      expression: '',
      showResult: false,
    });
  }

  setOperator(nextOperator) {
    const { displayValue, operator, prevValue, expression, showResult } = this.state;

    if (showResult) {
      this.setState({
        operator: nextOperator,
        expression: displayValue + ' ' + nextOperator + ' ',
        showResult: false,
      });
    } else if (prevValue !== null && operator !== null) {
      this.performOperation();
      this.setState({
        operator: nextOperator,
        expression: displayValue + ' ' + nextOperator + ' ',
      });
    } else {
      this.setState({
        prevValue: displayValue,
        operator: nextOperator,
        expression: expression + ' ' + nextOperator + ' ',
      });
    }

    this.setState({
      displayValue: '0',
      waitingForOperand: true,
    });
  }

  performOperation() {
    const { displayValue, operator, prevValue, expression, showResult } = this.state;
    const currentValue = parseFloat(displayValue);
    const prevNumber = parseFloat(prevValue);
  
    let result = 0;
  
    switch (operator) {
      case '+':
        result = prevNumber + currentValue;
        break;
      case '-':
        result = prevNumber - currentValue;
        break;
      case '*':
        result = prevNumber * currentValue;
        break;
      case '/':
        result = prevNumber / currentValue;
        break;
      default:
        result = currentValue;
        break;
    }
  
    this.setState({
      displayValue: String(result),
      operator: null,
      prevValue: null,
      waitingForOperand: true,
      showResult: true, // Show the result only here
      expression: expression + ' = ' + String(result),
    });
  }
  

  render() {
    const { displayValue, expression } = this.state;

    return (
        
      <div className="calculator">
        <div className="display">
          
          <div className="value">{displayValue}</div>
        </div>
        <div className="buttons">
          <button onClick={() => this.clearDisplay()} className="btn btn-clear">
            C
          </button>
          <button onClick={() => this.inputDigit(7)} className="btn">
            7
          </button>
          <button onClick={() => this.inputDigit(8)} className="btn">
            8
          </button>
          <button onClick={() => this.inputDigit(9)} className="btn">
            9
          </button>
          <button onClick={() => this.setOperator('+')} className="btn btn-operator">
            +
          </button>
          <button onClick={() => this.inputDigit(4)} className="btn">
            4
          </button>
          <button onClick={() => this.inputDigit(5)} className="btn">
            5
          </button>
          <button onClick={() => this.inputDigit(6)} className="btn">
            6
          </button>
          <button onClick={() => this.setOperator('-')} className="btn btn-operator">
            -
          </button>
          <button onClick={() => this.inputDigit(1)} className="btn">
            1
          </button>
          <button onClick={() => this.inputDigit(2)} className="btn">
            2
          </button>
          <button onClick={() => this.inputDigit(3)} className="btn">
            3
          </button>
          <button onClick={() => this.setOperator('*')} className="btn btn-operator">
            *
          </button>
          <button onClick={() => this.inputDigit(0)} className="btn">
            0
          </button>
          <button onClick={() => this.inputDecimal()} className="btn">
            .
          </button>
          <button onClick={() => this.performOperation()} className="btn btn-operator">
            =
          </button>
          <button onClick={() => this.setOperator('/')} className="btn btn-operator">
            /
          </button>
        </div>
      </div>    
    );
  }
}

export default Calculator;
