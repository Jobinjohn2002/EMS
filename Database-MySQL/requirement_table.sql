USE project_estimation;

CREATE TABLE requirement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estimation_id INT,
  requirement VARCHAR(255),
  status BOOLEAN,
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified_by INT,
  modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sub_requirement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  requirement_id INT,
  sub_requirement VARCHAR(255),
  status BOOLEAN,
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified_by INT,
  modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
