
//3.Second max: Write a function secondMax that receive an array of number. The function will return the second maximum value of the array. If there is no second max, return max instead. If an array is empty, throw and error.

const secondMax=(arr)=> {
  //case 1 has a 1 value in array
  if(arr.length === 1){
    return arr[0]
  }
  //case 2 have many data in array
  if(arr.length && arr.length >1 ){
    let max = -Infinity, result = -Infinity;
    for (const value of arr) {
      const nr = Number(value)
      if (nr > max) {
        [result, max] = [max, nr] // save previous max
      } 
      if (nr < max && nr > result) {
        result = nr; // new second biggest
      }
      if(result == -Infinity){
        result = nr
      }
    }
    return result;
  }
  //case 3 empty data in arr
  else{
    return 'Error!'
  }
}
//please check answer below this console
console.log(secondMax ([2,3,4,5,]));
// console.log(secondMax ([9, 2, 21, 21]));
// console.log(secondMax ([4, 4, 4, 4]));
// console.log(secondMax ([4123]));
// console.log(secondMax ([]));
