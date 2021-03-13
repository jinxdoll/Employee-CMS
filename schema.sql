DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);
CREATE TABLE role(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  salary DECIMAL,
  department_id int
);
CREATE TABLE employee(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id int,
  manager_id int NULL
);
-- INSERT INTO employee (first_name, lastName) values ('Mariah', 'Carey');
SELECT * FROM employee;
-- INSERT INTO department (id, name) values ('1234', 'Music');
SELECT * FROM department;
-- INSERT INTO role (id, title, salary, department_id) values ('1','singer','987654');
SELECT * FROM role;
