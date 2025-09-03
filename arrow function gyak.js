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

console.log(sortByLength(names))
console.log(sortByLengthAsc(names))
