const express = require("express");
const app = express();
const fs = require("fs");

app.get("/students", (req, res) => {
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  res.send(students);
});

app.get("/students/:id", (req, res) => {
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  res.send(students[req.params.id]);
});

app.post("/students", function (req, res) {
  let date = new Date();
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  var student = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    group: req.query.group,
    createdAt: date.toLocaleString(),
    updatedAt: date.toLocaleString()
  };
  let idq = students[students.length - 1].id + 1;
  students.push(Object.assign({ id: idq }, student));
  fs.writeFileSync("students.json", JSON.stringify(students));
});

app.put("/students/:id", function (req, res) {
  let date = new Date();
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  const ids = students.findIndex(
    (student) => student.id === Number(req.params.id)
  );
  students[ids].firstName = req.query.firstName;
  students[ids].updatedAt = date.toLocaleString();
  fs.writeFileSync("students.json", JSON.stringify(students));
});

app.delete("/students/:id", function (req, res) {
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  const ids = students.findIndex(
    (student) => student.id === Number(req.params.id)
  );
  students.splice(ids, 1);
  fs.writeFileSync("students.json", JSON.stringify(students));
});

app.get("/", (req, res) => {
  res.send("base page");
});

app.listen(8080);
