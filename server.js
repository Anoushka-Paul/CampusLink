const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = 5000;

// MySQL Database Setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'arpitha',
  password: 'redhat',
  database: 'internships',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder

// Route to get internship details with search and sort functionality
app.get('/api/internships', (req, res) => {
  const { semester, internship_company, stipend_amount, sort_field, sort_order } = req.query;

  let query = 'SELECT * FROM InternDetails WHERE 1=1';
  const queryParams = [];

  if (semester) {
    query += ' AND Semester LIKE ?';
    queryParams.push(`%${semester}%`);
  }
  if (internship_company) {
    query += ' AND Internship_Company LIKE ?';
    queryParams.push(`%${internship_company}%`);
  }
  if (stipend_amount) {
    query += ' AND Stipend_Amount LIKE ?';
    queryParams.push(`%${stipend_amount}%`);
  }

  if (sort_field) {
    query += ` ORDER BY ${mysql.escapeId(sort_field)} ${sort_order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
  }

  db.query(query, queryParams, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(result);
  });
});

// Fallback route for non-API requests to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'FirstPage.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
