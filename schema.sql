DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
  id INT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT,
  title VARCHAR(100),
  salary DECIMAL,
  department_id INT
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT NULL,
   PRIMARY KEY (id)
);

-- INSERT INTO employee (first_name, lastName) values ('Mariah', 'Carey');
-- SELECT * FROM employee;


-- INSERT INTO department (id, name) values ('1234', 'Music');
-- SELECT * FROM department;


-- INSERT INTO role (id, title, salary, department_id) values ('1','singer','987654');

-- SELECT * FROM role;

