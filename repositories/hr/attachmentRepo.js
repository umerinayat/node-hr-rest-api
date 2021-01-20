const multer = require('multer');
const attachments = require('../../config/storage').attachments;
const path = require('path');

function attachmentRepo(Attachment) {
  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|doc|pdf/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }

  const attachmentsUpload = multer({
    storage: attachments,
    //limits: {
    //fields: 5,
    //fieldNameSize: 50, // TODO: Check if this size is enough
    //fieldSize: 20000, //TODO: Check if this size is enough
    // TODO: Change this line after compression
    //fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
    //},
    fileFilter: function (_req, file, cb) {
      checkFileType(file, cb);
    },
  });

  // Save attachment in db
  // callback( err, isAlreadyExists, newAttachment )
  function create(data, callback) {
    const { req } = data;
    const file_name = req.body;
    
    // check if Attachment is already there
    // Attachment.findOne({ file_name }, (err, attachment) => {
    //   if (err) {
    //     return callback(err, false, null);
    //   }
    //   if (attachment) {
    //     return callback(null, true, null);
    //   }

      // upload attachment
      const upload = attachmentsUpload.fields([{name: 'attachments', maxCount: 5}]);
      upload(req, null, (err) => {
        console.log(req.files['attachments'])
        if (err) {
          console.log(err.message);
          return callback(err, false, null);
        }
        const atts = [];
        req.files['attachments'].forEach(function(file) {
          const newAttachment = new Attachment({
            file_name: file.filename,
            file_path: file.path,
            file_url: 'url/uploads/employees/attachments/' + file.filename,
          });
          atts.push(newAttachment);
          newAttachment.save(function (err) {
            if (err) {
              return callback(err, false, null);
            }
            console.log(newAttachment);
          });
        });
        return callback(null, false, atts);
        
        
      });
    //});
  }

  // get all attachments
  // callback( err, attachments )
  function find(query = {}, callback) {
    Attachment.find(query, (err, attachments) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, attachments);
    });
  }

  // get attachment by id
  // callback( err, attachment )
  function findById(id, callback) {
    Attachment.findById(id, (err, attachment) => {
      if (err) {
        return callback(err, null);
      }
      if (attachment) {
        return callback(null, attachment);
      }
      return callback(null, null);
    });
  }

  // update attachment
  // callback( err, isAlreadyExists, attachment )
  function update(id, data, callback) {
    const { body, attachment } = data;
    const { file_name, file_path, file_url } = body;

    Attachment.findOne({ file_name }, (err, a) => {
      if (err) {
        return callback(err, false, null);
      }
      if (a && id !== a.id) {
        return callback(null, true, null);
      }

      attachment.file_name = file_name;
      attachment.file_path = file_path;
      attachment.file_url = file_url;

      attachment.save((err) => {
        if (err) {
          return callback(err, false, null);
        }
        return callback(err, false, attachment);
      });
    });
  }

  return { create, find, findById, update };
}

module.exports = attachmentRepo;
