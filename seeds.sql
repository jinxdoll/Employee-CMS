INSERT INTO department (department_name)
VALUES ('Singing');
INSERT INTO department (department_name)
VALUES ('Acting');

INSERT INTO role (title, salary, department_id)
VALUES ('Singer', '1234.00', 500);
INSERT INTO role (title, salary, department_id)
VALUES ('Actor', '789.00', 4001);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mariah', 'Carey', '9999', 123);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Patrick', 'Schwayze', '3333', 456);




SELECT e.id, e.first_name, e.last_name, d.department_name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC;



SELECT  r.id, r.title, r.salary, d.department_name as Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;



SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee


