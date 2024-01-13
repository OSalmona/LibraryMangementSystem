const express = require('express');
const borrowerController = require("../controllers/BorrowerController")
const router = express.Router();
const validator = require("../handlers/BorrowerValidationHandler")

router.get('/borrowers', borrowerController.getAll);
router.get('/borrowers/id/:id', borrowerController.findByID);
router.get('/borrowers/ssn/:ssn', borrowerController.findBySSN);
router.post('/borrower',validator.createBorrowerValidator , borrowerController.create);
router.put('/borrower/:id', validator.updateBorrowerValidator ,borrowerController.update);
router.delete('/borrowers/id/:id', borrowerController.findByID);
router.delete('/borrowers/ssn/:ssn', borrowerController.findBySSN);


module.exports = router