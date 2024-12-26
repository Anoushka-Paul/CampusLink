const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// MySQL Database Setup
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'arpitha',
  password: 'redhat',
  database: 'internships'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Middleware
app.use(cors());
app.use(express.json());

// Function to sort data
const sortData = (data, sortField, sortOrder) => {
  return data.sort((a, b) => {
    if (a[sortField] > b[sortField]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    if (a[sortField] < b[sortField]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    return 0;
  });
};

// Route to get internship details with search and sort functionality
app.get('/api/internships', (req, res) => {
  const { semester, internship_company, stipend_amount, sort_field, sort_order } = req.query;

  let query = 'SELECT * FROM InternDetails WHERE 1=1';
  
  if (semester) {
    query += ` AND Semester LIKE '%${semester}%'`;
  }
  if (internship_company) {
    query += ` AND Internship_Company LIKE '%${internship_company}%'`;
  }
  if (stipend_amount) {
    query += ` AND Stipend_Amount LIKE '%${stipend_amount}%'`;
  }

  // Apply sorting if the sort field is provided
  if (sort_field) {
    query += ` ORDER BY ${sort_field} ${sort_order || 'ASC'}`;
  }

  db.query(query, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(result);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});