import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alex Morgan", birthday: "1990-01-15", salary: 60000 },
    { name: "Jordan Lee", birthday: "1988-03-22", salary: 65000 },
    { name: "Taylor Smith", birthday: "1995-07-10", salary: 55000 },
    { name: "Casey Brown", birthday: "1992-11-05", salary: 58000 },
    { name: "Riley Davis", birthday: "1985-09-18", salary: 72000 },
    { name: "Morgan Wilson", birthday: "1993-04-30", salary: 62000 },
    { name: "Jamie Martinez", birthday: "1991-06-12", salary: 67000 },
    { name: "Avery Anderson", birthday: "1997-02-25", salary: 52000 },
    { name: "Quinn Thomas", birthday: "1989-08-08", salary: 70000 },
    { name: "Cameron Garcia", birthday: "1994-12-03", salary: 59000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}
