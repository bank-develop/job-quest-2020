// 1. Fibonacci Sequence: Write a function fib that return the value of n-th order of fibonacci sequence.In mathematics, the Fibonacci numbers are the numbers in the following integer sequence, called the Fibonacci sequence, and characterized by the fact that every number after the first two is the sum of the two preceding ones:

function fib(num)
    {  
        if(num==1 || num ==2){
            return 1;
        }
        return fib(num - 1) + fib(num - 2);
    }
//please check answer below this console
console.log(fib(1))
// console.log(fib(3))
// console.log(fib(12))
