const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '#Nachos11',
    database: 'employees_db',
});




// function which prompts the user for what action they should take

const start = () => {
    inquirer
      .prompt({
        name: 'addOrView',
        type: 'list',
        message: 'Would you like to [ADD] a department in departments or [VIEW] a employee in employees?',
        choices: ['ADD', 'VIEW', 'EXIT'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.addOrView === 'ADD') {
          ADD();
        } else if (answer.addOrView === 'VIEW') {
          VIEW();
        } else {
          connection.end();
        }
      });
  };

// function to handle posting new items up for auction
  const ADD = () => {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: 'id',
          type: 'input',
          message: 'What is the department id ?',
        },
        {
          name: 'name',
          type: 'input',
          message: 'What is the department name ?',
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
          'INSERT INTO department SET ?',
          // QUESTION: What does the || 0 do?
          {
            id_name: id.item,
            name: answer.name,
            // starting_bid: answer.startingBid || 0,
            // highest_bid: answer.startingBid || 0,
          },
          (err) => {
            if (err) throw err;
            console.log('Your auction was created successfully!');
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  };
  



  const updateEmployee = () => {
    // query the database for all items being auctioned
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: 'choice',
            type: 'rawlist',
            choices() {
              const choiceArray = [];
              results.forEach(({ id }) => {
                choiceArray.push(id);
              });
              return choiceArray;
            },
          },
          {
            name: 'update',
            type: 'input',
            message: 'What employee id would you like to update ?',
          },
        ])
        .then((answer) => {
          // get the information of the chosen item
          let chosenEmployee;
          results.forEach((employee) => {
            if (employee.id === answer.choice) {
              chosenEmployee = employee;
            }
          });
  
          // determine if bid was high enough
          if (chosenEmployee == !NULL)push(employee.id) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              'UPDATE employee SET ? WHERE ?',
              [
                {
                  chosenEmployee: employee.id,
                },
                {
                  id: chosenEmployee.id,
                },
              ],
              (error) => {
                if (error) throw err;
                console.log('Update successful!');
                start();
              }
            );
          } else {
            // bid wasn't high enough, so apologize and start over
            console.log('Update FAILED');
            start();
          }
        });
    });
  };





// const viewDB = () => {
//     console.log('viewing all data from DB...\n');
//     connection.query('SELECT * FROM employee_db', (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
// });
// };

