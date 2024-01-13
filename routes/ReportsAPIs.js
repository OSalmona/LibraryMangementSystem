const express = require('express');
const BookBorrowerController = require('../controllers/BookBorrowerController')
const router = express.Router();

router.get('/Requests' , BookBorrowerController.getRequestsByDate)
router.get('/overdueLastMonth' , BookBorrowerController.getRequestsLastMonth)

module.exports = router