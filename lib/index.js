const promptUser = () =>
  inquirer.prompt([
    {
        type: 'list',
        name: 'employeeType',
        message: `Which employee would you like to add?`,
        choices: ["Manager", "Engineer", "Intern"]
      },
    {
      type: 'input',
      name: 'managerName',
      message: `What is your manager's name?`,
    },
    {
      type: 'input',
      name: 'managerId',
      message: `What is your manager's ID?`,
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: `What is your manager's email?`,
    },
    {
      type: 'input',
      name: 'managerOffice',
      message: `What is your manager's office number?`,
    }
  ]);