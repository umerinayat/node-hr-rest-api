const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use([bodyParser.urlencoded({ extended: true }), bodyParser.json()]);

const url = process.env.DB_URL || 'mongodb://localhost:27017/hr_db';
mongoose.connect(url);

const Employee = require('./models/hr/employeeModel');
const employeeRouter = require('./routes/api/hr/employeeRouter')(Employee);

app.use('/api', employeeRouter);

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Server listening on port: ${port}`));

app.get('/', (req, res) => {
  res.send('HR Rest API');
});
