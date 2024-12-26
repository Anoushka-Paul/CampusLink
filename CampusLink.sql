CREATE DATABASE college_community;

USE college_community;

-- Table for storing internships
CREATE TABLE internships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    posted_by INT,  -- User ID who posted the internship
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing events
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    description TEXT,
    location VARCHAR(255),
    created_by INT,  -- Admin user ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing users (students/admins)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

