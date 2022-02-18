//4. FizzBuzz...But: You may heard FizzBuzz task. Here we have the same rule. You will write a function fizzBuzz that receive a single parameter it will return the value base on these rule.

const fizzBuzz =(number)=>{
    switch (0) {
        case number % 15 && number >0 :  message = 'FizzBuzz'; break;
        case number % 3 &&number >0 : message = 'Fizz' ; break;
        case number % 5&& number >0 : message = 'Buzz'; break;
        default  : message = `Number ${number} is not Fizz,Buzz,FizzBuzz `; break;
    }

     return message
}
//please check answer below this console
console.log(fizzBuzz(21));
// console.log(fizzBuzz(25));
// console.log(fizzBuzz(45));