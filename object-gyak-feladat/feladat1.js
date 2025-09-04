import input from './input.js' 

class Student {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

let numberOfStudents =Math.abs(parseInt(await input("Kérem a tanulók számát: ")));
let students = [];
let name;
let email;
for(let i = 0; i < numberOfStudents; i++)
{
    name = await input("Kérem a tanuló nevét:  ");
    email = await input("Kérem a tanuló emailcímét: ");
    students.push(new Student(name, email));
}
console.log("Tanulók adatai:")
for(let i = 0; i <students.length; i++)
{
    console.log(`Név: ${students[i].name}, email címe: ${students[i].email}`);

}