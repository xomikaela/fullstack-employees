import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const sql = `
    INSERT INTO employees (name, birthday, salary)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const {
    rows: [employee],
  } = await db.query(sql, [name, birthday, salary]);

  return employee;
}

/** @returns all employees */
export async function getEmployees() {
  const sql = `
    SELECT *
    FROM employees
    ORDER BY id;
  `;

  const { rows: employees } = await db.query(sql);
  return employees;
}

/** @returns the employee with the given id, or undefined */
export async function getEmployee(id) {
  const sql = `
    SELECT *
    FROM employees
    WHERE id = $1;
  `;

  const {
    rows: [employee],
  } = await db.query(sql, [id]);

  return employee;
}

/** @returns the updated employee, or undefined */
export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `
    UPDATE employees
    SET name = $1,
        birthday = $2,
        salary = $3
    WHERE id = $4
    RETURNING *;
  `;

  const {
    rows: [employee],
  } = await db.query(sql, [name, birthday, salary, id]);

  return employee;
}

/** @returns the deleted employee, or undefined */
export async function deleteEmployee(id) {
  const sql = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
  `;

  const {
    rows: [employee],
  } = await db.query(sql, [id]);

  return employee;
}
