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
  start();
});



// function which prompts the user for what action they should take

const start = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
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

};

const viewDept = () => {
  console.log('Selecting all departments...\n');

  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "What department would you like to search for?",
    })
    .then((answer) => {
      const query = "SELECT * FROM department";
      connection.query(
        query,
       
        (err, res) => {
          if (err) throw err;
        
            console.table(res);
          console.log("Departments viewed!\n");
         
        start();
        }
      );
    });
};



const viewEmployee = () => {
  console.log('Selecting all employees...\n');
  inquirer
    .prompt({
      name: "lastName",
      type: "input",
      message:
        "What is the last name of the employee you would like to search for?",
    })
    .then((answer) => {
      const query = "SELECT * FROM employee";
      connection.query(query, (err, res) => {
        if (err) throw err;
        // res.forEach(({ lastName }) => {
      
          // console.table(
          //   `last_name: ${lastName} || first_name: ${firstName} || role_id: ${roleId}`);
          console.table(res);
          console.log("Employees viewed!\n");
        // });
   
        start();
      });
    });
};


const viewRole = () => {
  console.log('Selecting all roles...\n');
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: "What role title would like to search for?",
    })
    .then((answer) => {
      const query = "SELECT * FROM role";
      connection.query(query, { title: answer.title }, (err, res) => {
        if (err) throw err;
        // res.forEach(({ title, salary, department_id }) => {
          // console.log(
          //   `You are now viewing the role: ${title}. The salary is: ${salary}. The department id is: ${department_id}`
          console.table(res);
          console.log("Roles viewed!\n");
          
        // });
        start();
      });
    });
};


const addEmployee = () => {

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
      {
        name: "roleId",
        type: "input",
        message: "What is the employee role id (use a number)?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the employee manager id (use a number) ?",
      },
    ])
    .then((answer) => {
 
      connection.query(
        "INSERT INTO employee SET ?",

        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        (err) => {
          if (err) throw err;
          console.log("The employee was created successfully!");
        
          start();
        }
      );
    });
};

const addDept = () => {

  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the name of the department you would like to add ?",
      },
    ])
    .then((answer) => {
     
      connection.query(
        "INSERT INTO department SET ?",

        {
          department_name: answer.departmentName,
        },
        (err) => {
          if (err) throw err;
          console.log("The department was created successfully!");
         
          start();
        }
      );
    });
};

const addRole = () => {
  // prompt for info about the role
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
    ])
    .then((answer) => {
     
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
         
          start();
        }
      );
    });
};

const updateEmployee = () => {
  // query the database for all 
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    const choiceArray = [];
    results.forEach(({ id }) => {
      choiceArray.push(id);
    });
    inquirer
      .prompt([
        {
          name: "id",
          type: "rawlist",
          choices() {
            // const choiceArray = [];
            // results.forEach(({ id }) => {
            //   choiceArray.push(id);
            // });
            return choiceArray;
          },
          message: "What is the employee id ?",
          
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the updated last name ?",
        },
        {
          name: "firstName",
          type: "input",
          message: "What is the updated first name ?",
      
        },
      ])
      .then((answer) => {
      //  console.log(answer);
        let chosenEmployee = answer;
        results.forEach((result) => {
          // console.log(result);
  

      // console.log(chosenEmployee.id);
      // console.log(result.id);
        if (chosenEmployee.id  === result.id) {
          console.log("if statement reached");
       
          connection.query(
            "UPDATE employee SET first_name = ?, last_name = ? WHERE id = ?;",
            [
                          answer.lastName, answer.firstName,chosenEmployee.id
            
             
            ],
            (error, result) => {
              if (error) throw err;
              console.log(result);
              // start();
            }
          );
        } else {
          console.log("Update failed. Please try again...");
          
        }
      });
      start()
  }) 
  .catch(err =>{
    console.log(err);
  })
});
}