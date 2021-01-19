
function attachmentRepo(Attachment) {

  // Save attachment in db
  // callback( err, isAlreadyExists, newAttachment )
  function create(data, callback) {

    const { file_name } = data;
    // check if Attachment is already there
    Attachment.findOne({file_name}, (err, attachment) => {
        if(err) {
            return callback(err, false, null);
        }
        if (attachment) {
            return callback(null, true, null);
        }
        const newAttachment = new Attachment(data);
        newAttachment.save(function(err) {
            if(err) {
                return callback(err, false, null);
            }
            return callback(null, false, newAttachment);
        });
    });
  }

  // get all attachments
  // callback( err, attachments )
  function find(query={}, callback) {
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
    const { body, attachment,  } = data;
    const { file_name, file_path, file_url } = body;

    Attachment.findOne({file_name}, (err, a) => {
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
