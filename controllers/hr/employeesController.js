function employeesController(Employee) {
  function post(req, res) {
    const employee = new Employee(req.body);
    employee.save();
    return res.status(201).json(employee);
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
    });
  }

  return { post, get };
}

module.exports = employeesController;
