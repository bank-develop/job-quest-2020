// 2.Array shift: Write a function shift that shifts the elements of array to left or right by n elements in an infinite loop.The function receives 3 parameters, 1st is an array, 2nd is the direction ('left' or 'right'), 3rd is the number of elements which will be shifted.

const shift=(arr, direction, n)=> {
  direction = direction === 'left' ? 0 :1;
  var times = n > arr.length ? n % arr.length : n;
  return arr.concat(arr.splice(0, (direction > 0 ? arr.length - times : times)));
}
//please check answer below this console
console.log(shift(['john', 'jane', 'sarah', 'alex'], 'left', 2))
// console.log(shift([1, 2, 3, 4 ,5], 'right', 3));
