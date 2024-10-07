-- Create the database
CREATE DATABASE job_board_db;
-- Use the database
USE job_board_db;

-- Create the companies table
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    industry VARCHAR(100),
    location VARCHAR(100),
    website VARCHAR(255),
    contact_email VARCHAR(100)
);

-- Create the advertisements table
CREATE TABLE advertisements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    location VARCHAR(100),
    salary DECIMAL(10, 2),
	contact_email VARCHAR(100),
    company_id INT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Create the people table
CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    zipcode INT,
    role ENUM('recruiter', 'applicant')
);

-- Create the applications table
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    advertisement_id INT,
    applicant_id INT,
    recruiter_id INT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'accepted', 'rejected', 'withdrawn'),
    last_email_sent_at TIMESTAMP,
    FOREIGN KEY (advertisement_id) REFERENCES advertisements(id),
    FOREIGN KEY (applicant_id) REFERENCES people(id),
    FOREIGN KEY (recruiter_id) REFERENCES people(id)
);
