const express = require('express');
const queryController = require('../controllers/queryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(queryController.generateQuery)
  .get(queryController.getUserQueries);

router.route('/:id').get(queryController.getQuery);

module.exports = router;