const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "#Nachos11",
  database: "employee_db",
});




connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start()
});

// const ViewDept = () => {
//   console.log('Selecting all departments...\n');
//   connection.query('SELECT * FROM department', (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// };

// const updateDept = () => {
//   console.log('Updating department...\n');
//   const query = connection.query(
//     'UPDATE products SET ? WHERE id = :id AND department_name = :department_name;', (err, res) => {
//       if (err) throw err;
//       console.log(`${res.affectedRows} department updated!\n`);
// Call deleteProduct AFTER the UPDATE completes
// deleteProduct();
//   }
// );

// const createDept = () => {
//   console.log('Inserting a new department...\n');
//   const query = connection.query(
//     'SELECT * FROM department where id = :id AND department_name = :department_name;', (err, res) => {
//       if (err) throw err;
//       console.log(`${res.affectedRows} department inserted!\n`);
// Call updateDept AFTER the INSERT completes
//     updateDept();
//   }
// );

// function which prompts the user for what action they should take

const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Would you like to do?",
      choices: [
        "View departments",
        "View employees",
        "View roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee role",
        "EXIT",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View departments":
          viewDept();
          break;

        case "View employees":
          viewEmployee();
          break;

        case "View roles":
          viewRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Add department":
          addDept();
          break;

        case "Add role":
          addRole();
          break;

        case "Update employee role":
          updateEmployee();
          break;
    

        case "EXIT":
          connection.end();
          break;
      }
    });
    
  // logs the actual query being run
  // console.log(query.sql);
  // connection.end();

};

const viewDept = () => {
  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "What department would you like to search for?",
    })
    .then((answer) => {
      const query = "SELECT department_name FROM department WHERE ?";
      connection.query(query, { department_name: answer.departmentName },
        (err, res) => {
          if (err) throw err;
          res.forEach(({ department_name }) => {
            console.table('Department table is:'+ department_name)
            console.log(`You are now viewing the ${department_name} department`);
          });
          start();
        }
      );
    });
};

const viewEmployee = () => {
  inquirer
    .prompt({
      name: "lastName",
      type: "input",
      message:
        "What is the last name of the employee you would like to search for?",
    })
    .then((answer) => {
      const query = "SELECT last_name, first_name, role_id FROM employee WHERE ?";
      connection.query(query, { last_name: answer.lastName }, (err, res) => {
        if (err) throw err;
        res.forEach(({  last_name, first_name, role_id }) => {
          console.log(
            `You are now viewing the employee: ${first_name} ${last_name}. The employee role ID is: ${role_id}`);
        });
        start();
      });
    });
};

const viewRole = () => {
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: "What role title would like to search for?",
    })
    .then((answer) => {
      const query = "SELECT title, salary, department_id FROM role WHERE ?";
      connection.query(query, { title: answer.title }, (err, res) => {
        if (err) throw err;
        res.forEach(({ title, salary, department_id }) => {
          console.log(
            `You are now viewing the role: ${title}. The salary is: ${salary}. The department id is: ${department_id}`);
        });
        start();
      });
    });
};

