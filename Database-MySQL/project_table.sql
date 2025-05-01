
USE project_estimation;

CREATE TABLE project (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_name VARCHAR(255),
  client_name VARCHAR(255),
  manager_name VARCHAR(255),
  status INT,
  project_type INT NULL
);

INSERT INTO project
(project_name, client_name, manager_name, status, project_type)
VALUES
('Similrz', 'Fabien', 'Gidhin Shaji', 1, 1), 
('SANMINA', 'Micheal', 'Suresh Venkatraman', 1, 1), 
('Hilton', 'John', 'Gidhin Shaji', 1, 1), 
('Complete Solar', 'Daniel', 'Gidhin Shaji', 1, 1), 
('KUBA', 'Jack', 'Gidhin Shaji', 1, 1); 

SELECT * FROM project;






