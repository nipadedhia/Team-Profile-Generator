const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Each employee type (manager, engineer, or intern) has slightly different information; prompting different questions via inquirer depending on employee type.

let employeeArray = [];

function newEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Select employee role:",
        choices: ["Intern", "Engineer", "Manager"],
      },
      {
        type: "input",
        name: "name",
        message: "Enter employee name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter employee ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter employee email:",
      },
    ])

    // If selects intern then prompt Intern related Qs
    .then((response) => {
      if (response.role === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What school did they attend?",
              name: "school",
            },
          ])
          .then((internData) => {
            let intern = new Intern(
              response.name,
              response.id,
              response.email,
              internData.school,
            );
            employeeArray.push(intern);
            addEmployee();
          });

        // If selects Engineer then prompt Engineer related Qs
      } else if (response.role === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "github",
              message: "Enter Github Username:",
            },
          ])
          .then((engineerData) => {
            let engineer = new Engineer(
              response.name,
              response.id,
              response.email,
              engineerData.github,
            );
            employeeArray.push(engineer);
            addEmployee();
          });

        // If selects Manager then prompt Manager related Qs
      } else if (response.role === "Manager") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "What is Office Number?",
            },
          ])
          .then((managerData) => {
            let manager = new Manager(
              response.name,
              response.id,
              response.email,
              managerData.officeNumber,
            );
            employeeArray.push(manager);
            addEmployee();
          });
      }
    });
}

// Calling newEmployee function
newEmployee();

// Define Add Employee function
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "add",
        message: "Would you like to add another Employee?",
      },
    ])
    .then((response) => {
      if (response.add === true) {
        newEmployee();
      } else {
        generateHTML();
      }
    });
}

// ref: Codota.com & with the help of Lawrence Williams
function generateHTML() {
  // Check if OUTPUT directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    // Make OUTPUT directory if does not exists
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFile(outputPath, render(employeeArray), function (err) {
    if (err) {
      throw err;
    }
  });
}
