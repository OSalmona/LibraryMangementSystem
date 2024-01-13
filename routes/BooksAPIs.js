const express = require('express');
const bookController = require('../controllers/BookController')
const validator = require('../handlers/BookValidationHandler')

const router = express.Router();

router.get('/books', bookController.getAll);
router.get('/books/id/:id', bookController.getByID);
router.get('/books/isbn/:isbn', bookController.getByISBN);
router.get('/books/search', bookController.search);
router.post('/books',validator.createBookValidator ,bookController.create);
router.put('/books/:id' ,validator.updateBookValidator,bookController.update);
router.delete('/books/id/:id', bookController.destroyByID);
router.delete('/books/isbn/:isbn', bookController.destroyByISBN);

module.exports = router