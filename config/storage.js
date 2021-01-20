const multer = require('multer');
const path = require('path');

module.exports = {
  // image upload
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    onError : function(err, next) {
      console.log('error', err);
      next(err);
    },
    filename: (req, file, cb) => {
      // path.parse(filename).name; //=> "hello"
      // path.parse(filename).ext; //=> ".html"
      // path.parse(filename).basename; //=> "hello.html"
  
      console.log(file);
      var filetype = '';
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      
      cb(null, path.parse(file.originalname).name.toLowerCase().replace(' ', '-') +'-' + Date.now() + '.' + filetype);
    },
  }),
  // attachments
  attachments: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/employees/attachments');
    },
    onError : function(err, next) {
      console.log('error', err);
      next(err);
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
       // application/pdf
      if (file.mimetype === 'application/pdf') {
        filetype = 'pdf';
      }
      // application/msword
      if (file.mimetype === 'application/msword') {
        filetype = 'doc';
      }
      cb(null, path.parse(file.originalname).name.toLowerCase().replace(' ', '-') +'-' + Date.now() + '.' + filetype);
    },
  })
};


