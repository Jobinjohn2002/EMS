USE project_estimation;

CREATE TABLE estimation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project INT,
  date DATE,
  status INT,
  description TEXT,
  approved_by VARCHAR(255),
  prepared_by INT NOT NULL,
  version_no VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  modified_by INT
);

ALTER TABLE estimation
ADD COLUMN project INT;

INSERT INTO estimation
(project, date, status, description, approved_by, prepared_by, version_no, created_at, modified_at, modified_by)
VALUES
(1, '2023-05-15', 1, 'Initial project estimation for client website redesign', 'John Smith', 1, 1.0, NOW(), NOW(), 101),
(2, '2023-06-20', 2, 'Revised estimation after client requirements changed', 'Sarah Johnson', 1, 1.1, NOW(), NOW(), 102),
(3, '2023-07-10', 3, 'Final approved estimation for mobile app development', 'Michael Chen', 1, 2.0, NOW(), NOW(), 101),
(4, '2023-08-05', 1, 'Preliminary estimation for e-commerce platform', 'Emily Wilson', 1, 0.9, NOW(), NOW(), 104),
(5, '2023-09-12', 4, 'Estimation for annual maintenance contract', 'David Kim', 1, 3.0, NOW(), NOW(), 103);


SELECT * FROM estimation;


