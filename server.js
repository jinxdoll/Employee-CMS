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

// function to handle posting new items up for auction
const addEmployee = () => {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee first name ?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee last name ?",
      },
      // {
      //   name: "roleId",
      //   type: "input",
      //   message: "What is the employee role id (must be a number)?",
      // },    
      {
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",

        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,         
        },
        (err) => {
          if (err) throw err;
          const employeeData = res.map(({ id, name }) => ({
            value: id, name: `${id} ${name}`
          }));
          console.log("The employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
};

const addDept = () => {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the name of the department you would like to add ?",
      },
      {
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",

        {
          department_name: answer.departmentName,
        },
        (err) => {
          if (err) throw err;
          console.log("The department was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
};

const addRole = () => {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the employee job title you would like to add ?",
      },
      {
        name: "salary",
        type: "input",
        message: "What would you like the starting salary to be ?",
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the department id ? ",
      },
      {
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",

        {
          title: answer.title,
          salary: answer.salary || 0,
          department_id: answer.departmentId,
        },
        (err) => {
          if (err) throw err;
          console.log("The department was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
};

const updateEmployee = () => {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices() {
            const choiceArray = [];
            results.forEach(({ id }) => {
              choiceArray.push(id);
            });
            return choiceArray;
          },
          message: "What is the employee id ?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the update last name ?",
        },
        {
          name: "firstName",
          type: "input",
          message: "What is the updated first name ?",
          validate(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
      ])
      .then((answer) => {
        // get the information of the chosen item
        let chosenEmployee;
        results.forEach((id) => {
          if (lastName.last_name && firstName.first_name === answer.choice) {
            chosenEmployee = id;
          }
        });

        // determine if bid was high enough
        if (chosenEmployee.id == !NULL) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                last_name: answer.lastName,
                first_name: answer.firstName,
              },
              {
                id: chosenEmployee.id,
              },
            ],
            (error) => {
              if (error) throw err;
              console.log("Update successful!");
              start();
            }
          );
        } else {
          console.log("Update failed. Please try again...");
          start();
        }
      });
  });
};

// const viewDB = () => {
//   console.log("viewing all data from DB...\n");
//   connection.query("SELECT * FROM employee_db", (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// };