const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

const render = require("./lib/htmlRenderer");

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


const employeeList = [];
let HTML = "";

const engineerPrompt = [
    {
        type: "input",
        name: "name",
        message: "What is your Engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your Engineer's ID number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your Engineer's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is your Engineer's GitHub?"
    }
]

const managerPrompt = [
    {
        type: "input",
        name: "name",
        message: "What is your Manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your Manager's ID number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your Manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your Manager's office number?"
    }
]


const internPrompt = [
    {
        type: "input",
        name: "name",
        message: "What is your Intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your Intern's ID number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your Intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "What is your Intern's school?"
    }
]
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const addMore = () => {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add another?",
            name: "addMore"
        }
    ]).then(select => {

        if (select.addMore === true) {
            console.log("Sure thing!");
            employeeChoice();
        } else {
            HTML += render(employeeList);
            fs.writeFile(outputPath, HTML, err => console.log(err))
            console.log("You're all done!");
            return;
        }
    })
}


const employeeChoice = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "What type of employee would you like to add?",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then(select => {
        if (select.type === "Manager") {
            promptManager();
        } else if (select.type === "Engineer") {
            promptEngineer();
        } else {
            promptIntern();
        }

        function promptManager()  {
            inquirer.prompt(managerPrompt)
                .then(select => {

                    const employee = new Manager(select.name, select.id, select.email, select.officeNumber);
                    employeeList.push(employee);
                    addMore();
                })
                .catch(err => console.log(err));
        }

        function promptEngineer()  {
            inquirer.prompt(engineerPrompt)
                .then(select => {

                    const employee = new Engineer(select.name, select.id, select.email, select.github);
                    employeeList.push(employee);
                    addMore();
                })
                .catch(err => console.log(err));
        }

        function promptIntern()  {
            inquirer.prompt(internPrompt)
                .then(select => {

                    const employee = new Intern(select.name, select.id, select.email, select.school);
                    employeeList.push(employee);
                    addMore();
                })
                .catch(err => console.log(err));
        }

    })


}



employeeChoice();


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
