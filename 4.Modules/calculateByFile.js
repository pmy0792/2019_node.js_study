const calc=require('./opr');
const add=calc.add;
const subtract=calc.subtract;
const multiply=calc.multiply;
const divide=calc.divide;

const fs=require('fs');
let input="";
fs.readFile('input.txt',(err,data)=>{
    if (err)
        throw err;
    
    const input=data.toString();

    const split_input=input.split(',');

const fir =parseFloat((split_input)[0]);
const oper =(split_input)[1];
const sec =parseFloat((split_input)[2]);

console.log(fir);
let result;

if (oper == '+')
    result = add(fir,sec);
if (oper == '-')
    result = subtract(fir,sec);
if (oper == '*')
    result = multiply(fir,sec);
if (oper == '/')
    result = divide(fir,sec);


const content = result;
fs.writeFile('output.txt',content,(err)=>{
    if (err)
        throw err;
});
});