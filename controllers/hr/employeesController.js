const bcrypt = require('bcryptjs');
const validateEmployeeInputs = require('../../validations/hr/employee');

function employeesController(User, Employee) {
  function post(req, res) {
    const {errors, isValid} = validateEmployeeInputs(req.body);
    // Validation check
     if (!isValid) {
      return res.status(400).json(errors);
    }

    // create new user
    const [email, isAdmin, avatar] = [req.body.personal_info.email, false, 'https://via.placeholder.com/150'];
    const registerdUser = null;
    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.send(err);
      }

      if (user) {
        errors.personal_info.email = 'Email already exists';
        return res.status(400).json(
          errors,
        );
      }
      // Register new user
      const newUser = new User({
        email,
        password: "emp_secret",
        avatar,
        isAdmin,
      });

      bcrypt.genSalt(10, (err, salt) => {
        // eslint-disable-next-line consistent-return
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.send(err.message);
          }
          newUser.password = hash;
          newUser.save((err, regUser) => {
            if (err) {
              return res.send(err);
            }
           
          });
        });
      });

      // create employee
      const employee = new Employee(req.body);
      employee.User = newUser._id;
      employee.save();
      return res.status(201).json(employee);
    });

    
  }

  function get(req, res) {
    // const { query } = req;
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    Employee.find(query, (err, employees) => {
      if (err) {
        return res.send(err);
      }
      return res.json(employees);
    })
      .populate('User', '_id email avatar date')
      .populate('company_detail.Department')
      .populate('company_detail.Branch')
      .populate('company_detail.Designation');
  }

  return { post, get };
}

module.exports = employeesController;
