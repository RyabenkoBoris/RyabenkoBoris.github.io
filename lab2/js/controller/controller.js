import View from '../view/view.js'
import Calculator from '../model/model.js'

export default class Controller{
    constructor(){
        this.view = new View();
        this.calculator = new Calculator();
        this.keys = document.querySelector('.calculator-keys');
        this.buttonCheck();
    }
    buttonCheck(){
        this.keys.addEventListener('click', (event) => {
            const {target} = event;
            if(!target.matches('button')){
                return;
            }
            switch(target.value){
                case 'all-clear':
                    this.calculator.resetCalculator();
                    this.view.printDisplay(null);
                    return;
                case 'delete':
                    this.view.printDisplay(this.calculator.delete());
                    return;
                case '=':
                    this.view.printDisplay(this.calculator.equal());
                    return;
                case '%':
                    this.view.printDisplay(this.calculator.percent());
                    return;
                case 'sqrt':
                    this.view.printDisplay(this.calculator.squareRoot());
                    return;
                case '+':
                    this.view.printDisplay(this.calculator.operator(target.value));
                    return;
                case '-':
                    this.view.printDisplay(this.calculator.operator(target.value));
                    return;
                case '*':
                    this.view.printDisplay(this.calculator.operator(target.value));
                    return;
                case '/':
                    this.view.printDisplay(this.calculator.operator(target.value));
                    return;
                case '.':
                    this.view.printDisplay(this.calculator.dot());
                    return;
                default:
                    this.view.printDisplay(this.calculator.number(target.value));
            }
        });
    }
}