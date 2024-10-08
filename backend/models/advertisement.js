var mysql = require("mysql");
const advertisementSchema = mysql.Schema({
  title: String,
  description: String,
  location: String,
  salary: Number,
  contact_email: String,
});
const advertisement = mysql.model("peoples", advertisementSchema);
module.export = advertisement;
