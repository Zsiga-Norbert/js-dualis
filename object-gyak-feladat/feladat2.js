import input from './input.js' 

const timetable = {
    hetfo : [],
    kedd : [],
    szerda : [],
    csutortok : [],
    pentek : []
};

let numberOfClasses;
let classes = [];
for (let key in timetable) {
    numberOfClasses = Math.abs(parseInt(await input(`Kérem a ${key}i órák számát: `)));
    for(let i = 0; i < numberOfClasses; i++)
    {
        timetable[key].push(await input(`Kérem a ${i+1}. órát: `));
    }
}

for (let key in timetable) {
   console.log(`${key}i órák:`);
   classes = timetable[key];
    for(let i = 0; i < timetable[key].length; i++)
    {
        console.log(`${i+1}. : ${classes[i]}`);
    }
    console.log("");
}