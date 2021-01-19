const express = require('express');
const attachmentsController = require('../../../controllers/hr/attachmentsController');
const attachmentRepoFunc = require('../../../repositories/hr/attachmentRepo');


function routes(Attachment) {
  const attachmentRouter = express.Router();
  const attachmentRepo = attachmentRepoFunc(Attachment);
  const controller = attachmentsController(Attachment, attachmentRepo);

  attachmentRouter.route('/attachments').post(controller.post).get(controller.get);

  // middleware
  attachmentRouter.use('/attachments/:id', (req, res, next) => {
    attachmentRepo.findById(req.params.id, function(err, attachment) {
      if (err) {
        return res.send(err);
      }
      if (attachment) {
          req.attachment = attachment;
          return next();
      }
      return res.sendStatus(404);
    });
  });

  attachmentRouter
    .route('/attachments/:id')
    .get(controller.show)
    .put(controller.put)
    .delete(controller.remove);

  return attachmentRouter;
}

module.exports = routes;
