const express = require("express");
const employee = express.Router();
employee.use(express.json());
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { EmployeeSchemaModel } = require("../Models/employee.model");

// employee.use(auth);

// Get posts
employee.get("/", async (req, res) => {
  let { role, language, limit, page, sort } = req.query;
  let Query = {};
  if (role) {
    Query.role = role;
  }
  if (language) {
    Query.language = language;
  }
  let sortBy = {};
  if (sort) {
    if (sort == "asc") {
      sortBy.postedAt = 1;
    } else if (sort == "desc") {
      sortBy.postedAt = -1;
    } else {
      sortBy = {};
    }
  }

  try {
    const emp = await EmployeeSchemaModel.find(Query)
      .sort(sortBy)
      .skip(limit * (page - 1))
      .limit(limit);

    res.status(200).send(emp);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err.message });
  }
});

// Get Perticular emp
employee.get("/:empId", async (req, res) => {
  const { empId } = req.params;
  let data = await EmployeeSchemaModel.find({ _id: empId });
  res.status(200).send(data);
});

// Add Post
employee.post("/", async (req, res) => {
  const payload = req.body;
  // console.log(payload);
  try {
    const post = await EmployeeSchemaModel(payload);
    res.status(200).send({ msg: "Post has been added" });
    await post.save();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Delete Post
employee.delete("/:empId", async (req, res) => {
  let { empId } = req.params;
  console.log(empId);
  try {
    await EmployeeSchemaModel.findByIdAndDelete({ _id: empId });
    res.status(200).send({ msg: "Post has been Deleted", id: empId });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Update Post
employee.patch("/:empId", async (req, res) => {
  let { empId } = req.params;
  let payload = req.body;
  try {
    await EmployeeSchemaModel.findByIdAndUpdate({ _id: empId }, payload);
    res.status(200).send({ msg: "Post has been Updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = {
  employee,
};
