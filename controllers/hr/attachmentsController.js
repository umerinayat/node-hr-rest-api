const validateAttachmentInputs = require('../../validations/hr/attachment');

function attachmentsController(Attachment, attachmentRepo) {

  function post(req, res) {
     const {errors, isValid} = validateAttachmentInputs(req.body);
    // // Validation check
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    attachmentRepo.create(req.body, function(err, isAlreadyExists, newAttachment) {
      if(err) {
        return res.send(err);
      }

      if (isAlreadyExists) {
        errors.name = 'Attachment name already exists';
        return res.status(400).json(
          errors,
        );
      }
      if (newAttachment) {
        return res.status(201).json(newAttachment);
      } 
    });
  }

  function get(req, res) {
    const { query } = req.body;
    attachmentRepo.find(query, function(err, attachments) {
      if (err) {
        return res.send(err);
      }
      return res.json(attachments);
    });
  }

  function show(req, res) {
    return res.json(req.attachment);
  }

  function put(req, res) {
    const {errors, isValid} = validateAttachmentInputs(req.body);
    // // Validation check
    //  if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    attachmentRepo.update(req.params.id, {'body': req.body, 'attachment': req.attachment}, function(err, isAlreadyExists, attachment) {

      if (err) {
        return res.send(err);
      }

      if (isAlreadyExists) {
        errors.name = 'Attachment name already exists';
        return res.status(400).json(
          errors,
        );
      }

      if (attachment) {
        return res.json(attachment);
      }

    });
    
  }

 
  function remove(req, res) {
    req.attachment.remove((err) => {
      if (err) {
        return req.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return { post, show, get, put, remove };
}

module.exports = attachmentsController;
