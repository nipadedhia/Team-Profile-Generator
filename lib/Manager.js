// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager {
  constructor(name, id, email, officeNumber) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.officeNumber = officeNumber;
    this.getName = () => this.name;
    this.getId = () => this.id;
    this.getEmail = () => this.email;
    this.getOfficeNumber = () => this.officeNumber;
    this.getRole = () => "Manager";
  }
}

module.exports = Manager;
