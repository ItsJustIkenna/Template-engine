const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];
const managerQuestions = [
  {
    type: "input",
    message: "what is your manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "what is your manager's id?",
    name: "id",
  },
  {
    type: "input",
    message: "what is your manager's email?",
    name: "email",
  },
  {
    type: "input",
    message: "what is your manager's office number?",
    name: "officeNumber",
  },
];

const engineerQuestions = [
  {
    type: "input",
    message: "what is your engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "what is your engineer's id?",
    name: "id",
  },
  {
    type: "input",
    message: "what is your engineer's email?",
    name: "email",
  },
  {
    type: "input",
    message: "what is your engineer's github?",
    name: "github",
  },
];

const internQuestions = [
  {
    type: "input",
    message: "what is your intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "what is your intern's id?",
    name: "id",
  },
  {
    type: "input",
    message: "what is your intern's email?",
    name: "email",
  },
  {
    type: "input",
    message: "what is your intern's school?",
    name: "school",
  },
];

function addManager() {
  inquirer.prompt(managerQuestions).then((response) => {
    const manager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );

    employees.push(manager);
    createTeam();
  });
}

function addEngineer() {
  inquirer.prompt(engineerQuestions).then((response) => {
    const engineer = new Engineer(
      response.name,
      response.id,
      response.email,
      response.github
    );

    employees.push(engineer);
  });
}

function addIntern() {
  inquirer.prompt(internQuestions).then((response) => {
    const intern = new Intern(
      response.name,
      response.id,
      response.email,
      response.school
    );

    employees.push(intern);
  });
}

function createTeam() {
  console.log("Would you like to add another team member?");
  inquirer
    .prompt({
      type: "list",
      message: "what is your manager's name?",
      name: "name",
      choices: ["Engineer", "Intern", "No"],
    })
    .then((response) => {
      switch (response) {
        case "Engineer":
          addEngineer();
          break;

        case "Intern":
          addIntern();
          break;

        default:
          console.log("Here is your team");
        //   createTeam();
      }
    });
}
addManager();
// addTeamMember();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
