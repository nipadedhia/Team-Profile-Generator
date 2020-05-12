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
	inquirer.prompt([
			{
                type: 'input',
                name: 'name',
				message: 'Enter employee name:'
				},
			{
                type: 'input',
                name: 'id',
				message: 'Enter employee ID:'
			},
			{
                type: 'input',
                name: 'email',
				message: 'Enter employee email:'
			},
			{
                type: 'list',
                name: 'role',
				message: 'Choose employee role:',
				choices: [ 'Intern','Engineer', 'Manager']
			}
        ])
        
        .then((response) => {
			if (response.role === 'Intern') {
				inquirer
					.prompt([
						{
							type: 'input',
							message: 'What school did they attend?',
							name: 'school'
						}
					])
					.then((internData) => {
						let intern = new Intern(
							response.name,
							response.id,
							response.email,
							internData.school
						);
						employeeArray.push(intern);
						});

        newEmployee();

        async function init() {
            try {
              const answers = await newEmployee();
          
              const empProfile = newEmployee(answers);
          
              await writeFileAsync("TeamProfile.html", empProfile);
          
              console.log("Successfully generated");
            } catch (err) {
              console.log(err);
            }
          }
          init();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
