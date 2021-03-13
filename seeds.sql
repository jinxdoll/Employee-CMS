INSERT INTO department (department_name)
VALUES ('Singing');
INSERT INTO department (department_name)
VALUES ('Acting');

INSERT INTO role (title, salary, department_id)
VALUES ('Singer', '123456', 500);
INSERT INTO role (title, salary, department_id)
VALUES ('Actor', '78910', 4001);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mariah', 'Carey', '9999', 123);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Patrick', 'Schwayze', '3333', 456);


SELECT * FROM employee;
-- INSERT INTO department (id, name) values ('1234', 'Music');
SELECT * FROM department;
-- INSERT INTO role (id, title, salary, department_id) values ('1','singer','987654');
SELECT * FROM role;