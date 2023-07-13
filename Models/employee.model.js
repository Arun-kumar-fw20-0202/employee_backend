const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    department: String,
    salary: String,
    date: String,
  },
  {
    versionKey: false,
  }
);

const EmployeeSchemaModel = mongoose.model("employee", EmployeeSchema);

module.exports = { EmployeeSchemaModel };
