const numbers = [2,13,3,7,17,5,11,19,9];
const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob'];
const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry'];

function sortByLength(stringArray)
{
    return stringArray.sort((a,b) => a.length - b.length)
}
function sortByLengthAsc(stringArray)
{
    
    return stringArray.sort((a, b) =>{
  return a.length - b.length || a.localeCompare(b)
})
}

function sortFrom15(numbers)
{
  return numbers.sort((a,b) => 
    Math.abs(a -15) - Math.abs(b - 15)
  )
}

function addAsterisk(strings){
  return strings.map(item => `*${item}*`)
}

function between5And15(numbers) 
{
  return numbers.filter(item => item >= 5 && item <= 15)
}

function isAllOdd(numbers)
{
 return numbers.every(item => item %2 == 1)
}

function hasEven(numbers)
{
   return numbers.some(item => item %2 == 0)
}
function sigma(numbers) 
{
return numbers.reduce((total = 1, item) => total* item)
}
console.log(sortByLength(names))
console.log(sortByLengthAsc(names))
console.log(sortFrom15(numbers))
console.log(addAsterisk(names))
console.log(between5And15(numbers))
console.log(isAllOdd(numbers))
console.log(hasEven(numbers))
console.log(sigma(numbers))
