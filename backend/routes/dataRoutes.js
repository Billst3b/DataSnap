const express = require('express');
const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController');
const upload = require('../utils/multer');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(upload.single('file'), dataController.createDataSource)
  .get(dataController.getUserDataSources);

router
  .route('/:id')
  .get(dataController.getDataSource)
  .delete(dataController.deleteDataSource);

module.exports = router;