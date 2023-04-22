export default class Calculator{
    #firstOperand;
    #secondOperand;
    #operand;
    #equal;
    #dotFlag;
    #percentFirst;
    #percentSecond;
    #equation;
    constructor(){
        this.calculation = {
            '/': () => Math.round(this.#firstOperand / this.#secondOperand*Math.pow(10,5))/Math.pow(10,5),
            '*': () => Math.round(this.#firstOperand * this.#secondOperand*Math.pow(10,5))/Math.pow(10,5),
            '-': () => Math.round(this.sub()*Math.pow(10,5))/Math.pow(10,5),
            '+': () => Math.round(this.sum()*Math.pow(10,5))/Math.pow(10,5),
        }
    }
    number(value){
        if(this.#operand === undefined){
            if(this.#equal === true){
                this.#operand = undefined;
                this.#equal = false;
                this.#firstOperand = value;
                return this.#equation = this.#firstOperand;
            }
            if (this.#firstOperand === undefined ){
                this.#firstOperand = value;
                this.#equation = this.#firstOperand;
            }
            else{
                if(this.#percentFirst === true){
                    this.#operand = '*';
                    this.#secondOperand = value;
                    return this.#equation = this.#firstOperand + this.#operand + this.#secondOperand; 
                }
                this.#firstOperand += value;
                this.#equation = this.#firstOperand;
            } 
            return this.#equation;
        }
        else{
            if (this.#secondOperand === undefined){
                this.#dotFlag = false;
                this.#secondOperand = value;
                this.#firstOperand = String(parseFloat(this.#firstOperand));
                this.#equation = this.#firstOperand + this.#operand + this.#secondOperand;
            }
            else{
                this.#secondOperand += value;
                this.#equation = this.#firstOperand + this.#operand + this.#secondOperand;
            } 
            return this.#equation;
        }
        
    }
    resetCalculator(){
        this.#firstOperand = undefined;
        this.#secondOperand = undefined;
        this.#operand = undefined;
        this.#equation = undefined;
        this.#equal = false;
        this.#dotFlag = false;
        this.#percentFirst = false;
        this.#percentSecond = false;
    }
    operator(op){
        if(this.#firstOperand === undefined) return null;
        else if(this.#secondOperand !== undefined){
            this.#firstOperand = String(this.calculation[this.#operand]());
            this.#secondOperand = undefined;
            this.#equation = this.#firstOperand + op;
            this.#operand = op;
            return this.#equation;
        }
        else{
            if(this.#operand === undefined) this.#equation += op;
            else{
                this.#equation = this.#equation.slice(0, -1);
                this.#equation += op;
            }
            this.#dotFlag = true;
            this.#operand = op;
            return this.#equation;
        }
    }
    delete(){
        if(this.#equation === undefined) return null;
        if(this.#secondOperand !== undefined){
            if(this.#equation.slice(-1)=='%'){
                this.percent();
                return this.#equation;
            }
            if (this.#equation.slice(-2)=='.0'){
                this.#equation = this.#equation.slice(0, -1);
                this.#dotFlag = false;
            }
            else if(this.#firstOperand.slice(-1) == '.') this.#dotFlag = false;
            this.#secondOperand = this.#secondOperand.slice(0, -1);
            if(this.#secondOperand.length == 0) this.#secondOperand = undefined;
        }
        else if(this.#operand !== undefined){
            this.#operand = undefined;
        }
        else{
            if(this.#equation.slice(-1)=='%'){
                this.percent();
                return this.#equation;
            }
            if (this.#equation.slice(-2)=='.0'){
                this.#equation = this.#equation.slice(0, -1);
                this.#dotFlag = false;
            }
            else if(this.#firstOperand.slice(-1) == '.') this.#dotFlag = false;
            this.#firstOperand = this.#firstOperand.slice(0, -1);
            if(this.#firstOperand.length == 0){
                this.resetCalculator();
                return null;
            }
        }
        this.#equation = this.#equation.slice(0, -1);
        return this.#equation;
    }
    equal(){
        if(this.#firstOperand === undefined) return null;
        else if(this.#secondOperand === undefined) {
            if(this.#operand) this.#equation = this.#equation.slice(0,-1);
            this.#operand = undefined;
            return this.#equation;
        }
        else{
            this.#firstOperand = String(this.calculation[this.#operand]());
            this.#dotFlag = this.#firstOperand.includes('.') ? true: false;
            this.#secondOperand = undefined;
            this.#operand = undefined;
            this.#equal = true;
            return this.#equation = this.#firstOperand;
        }
    }
    sum(){
        if(this.#percentSecond === true){
            this.#secondOperand *= this.#firstOperand;
            this.#percentSecond = false;
        }
        return parseFloat(this.#firstOperand) + parseFloat(this.#secondOperand)
    }
    sub(){
        if(this.#percentSecond === true){
            this.#secondOperand *= this.#firstOperand;
            this.#percentSecond = false;
        }
        return this.#firstOperand - this.#secondOperand
    }
    percent(){
        if(this.#secondOperand !== undefined){
            if(this.#percentSecond){
                this.#secondOperand = String(this.#secondOperand * 100);
                this.#percentSecond = false;
                return this.#equation = this.#equation.slice(0, -1);
            }
            else{
                this.#secondOperand = String(this.#secondOperand * 0.01);
                this.#percentSecond = true;
                return this.#equation += '%';
            }
        }
        else if(this.#operand !== undefined){
            return this.#equation;
        }
        else if(this.#firstOperand !== undefined){
            if(this.#equation.indexOf('%') != -1){
                this.#firstOperand = String(this.#firstOperand * 100);
                this.#percentFirst = false;
                return this.#equation = this.#equation.slice(0, -1);
            }
            else{
                this.#firstOperand = String(this.#firstOperand * 0.01);
                this.#percentFirst = true
                return this.#equation += '%';
            }
        }
        else return null;
    }
    squareRoot(){
        if(this.#secondOperand !== undefined){
            this.#equation = this.#equation.slice(0, -this.#secondOperand.length);
            this.#secondOperand = String(Math.round(Math.sqrt(this.#secondOperand)*Math.pow(10,10))/Math.pow(10,10));
            return this.#equation += this.#secondOperand;
        }
        else if(this.#firstOperand !== undefined){
            this.#firstOperand = String(Math.round(Math.sqrt(this.#firstOperand)*Math.pow(10,10))/Math.pow(10,10));
            return this.#equation = this.#firstOperand;
        }
        else return null;
    }
    dot(){
        if(this.#dotFlag === true) return this.#equation;
        if(this.#secondOperand !== undefined){
            this.#dotFlag = true;
            if(this.#percentSecond) this.percent();
            this.#secondOperand += '.';
            return this.#equation += '.0';
        }
        else if(this.#firstOperand !== undefined){
            this.#dotFlag = true;
            this.#equal = false;
            this.#operand = undefined;
            if(this.#percentFirst) this.percent();
            this.#firstOperand += '.';
            return this.#equation += '.0';
        }
        else return null;
    }
}
