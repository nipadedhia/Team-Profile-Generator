// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.github = github;
    this.getName = () => this.name;
    this.getId = () => this.id;
    this.getEmail = () => this.email;
    this.getGithub = () => this.github;
    this.getRole = () => "Engineer";
  }
}

module.exports = Engineer;
