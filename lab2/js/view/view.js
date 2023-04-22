export default class View{
    constructor(){
        this.display = document.querySelector('.calculator-screen');
    }
    printDisplay(value){
        this.display.value = value;
    }
}