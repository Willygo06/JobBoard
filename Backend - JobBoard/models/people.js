var mysql = require("mysql");
const peopleSchema = mysql.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,
  address: String,
  zipcode: Number,
  role: String,
});
const people = mysql.model("peoples", peopleSchema);
module.export = people;
