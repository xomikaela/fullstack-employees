import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();
export default router;

function requireEmployeeFields(req, res, next) {
  if (!req.body) {
    return res.status(400).send("Request body is required.");
  }

  const { name, birthday, salary } = req.body;

  if (name == null || birthday == null || salary == null) {
    return res.status(400).send("Name, birthday, and salary are required.");
  }

  next();
}

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", requireEmployeeFields, async (req, res) => {
  const { name, birthday, salary } = req.body;
  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

router.param("id", (req, res, next, id) => {
  const employeeId = Number(id);

  if (!Number.isInteger(employeeId)) {
    return res.status(400).send("Employee ID must be an integer.");
  }

  req.employeeId = employeeId;
  next();
});

router.get("/:id", async (req, res) => {
  const employee = await getEmployee(req.employeeId);

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const employee = await deleteEmployee(req.employeeId);

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.sendStatus(204);
});

router.put("/:id", requireEmployeeFields, async (req, res) => {
  const { name, birthday, salary } = req.body;

  const employee = await updateEmployee({
    id: req.employeeId,
    name,
    birthday,
    salary,
  });

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.status(200).send(employee);
});
