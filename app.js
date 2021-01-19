const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const app = express();
app.use([cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json()]);

const url = process.env.DB_URL || 'mongodb://localhost:27017/hr_db';
mongoose.connect(url);

const User = require('./models/User');
const userRouter = require('./routes/api/users/userRouter')(User);

//  ----------------- HR --------------------

// Emoloyees
const Employee = require('./models/hr/employeeModel');
const employeeRouter = require('./routes/api/hr/employeeRouter')(User, Employee);

// Departments
const Department = require('./models/hr/departmentModel');
const departmentRouter = require('./routes/api/hr/departmentRouter')(
  Department
);

// Branches
const Branch = require('./models/hr/Branch');
const branchRouter = require('./routes/api/hr/branchRouter')(Branch);

// Designations
const Designation = require('./models/hr/designationModel');
const designationRouter = require('./routes/api/hr/designationRouter')(
  Designation
);


// Attachments
const Attachment = require('./models/hr/attachment');
const attachmentRouter = require('./routes/api/hr/attachmentRouter')(
  Attachment
);

// --------------------- Assets ----------------------
const Asset = require('./models/assets/Asset');
const assetsRouter = require('./routes/api/assets/assetRouter')(Asset);

app.use(passport.initialize());

// Password Config
require('./config/passport')(passport);

// Protected Routes
app.use(
  '/api',
  userRouter,
 // passport.authenticate('jwt', { session: false }),
  employeeRouter,
  departmentRouter,
  designationRouter,
  branchRouter,
  assetsRouter,
  attachmentRouter,
);

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Server listening on port: ${port}`));

app.get('/', (req, res) => {
  res.send('HR Rest API');
});
