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
  subrequirement VARCHAR(255),
  status BOOLEAN,
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified_by INT,
  modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO requirement (estimation_id, requirement, status, created_by)
VALUES
(1, 'User Login System', TRUE, 101),
(2, 'Dashboard Overview', TRUE, 102),
(3, 'Reporting Module', FALSE, 103),
(4, 'Notification System', TRUE, 104);

INSERT INTO sub_requirement (requirement_id, subrequirement, status, created_by)
VALUES
(1, 'Login via email/password', TRUE, 101),
(1, 'Forgot password functionality', TRUE, 101),
(2, 'Show user stats', TRUE, 102),
(2, 'Display recent activities', FALSE, 102),
(3, 'Generate monthly reports', TRUE, 103),
(4, 'Send email notifications', TRUE, 104),
(4, 'Push notifications on mobile', FALSE, 104);

select * from sub_requirement;



