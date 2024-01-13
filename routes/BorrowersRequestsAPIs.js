const express = require('express');
const BookBorrowerController = require('../controllers/BookBorrowerController')
const router = express.Router();

router.get('/overdueBooks' , BookBorrowerController.getOverdueBooks)
router.get('/borrowerdbooks/:borrower_id' , BookBorrowerController.getBorroweredBooksByUserID)
router.put('/returnbook' , BookBorrowerController.returnBook)
router.post('/borrowBook', BookBorrowerController.create);

module.exports = router