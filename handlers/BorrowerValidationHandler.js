const { body , param} = require('express-validator');
const validationMiddelware = require('../middlewares/validationMiddleware')
const models = require('../models')


const createBorrowerValidator = [
  body("name")
      .notEmpty()
      .withMessage("name can't be empty"),
  body("ssn")
      .notEmpty()
      .withMessage("ssn can't be empty")
      .isInt()
      .withMessage("ssn should be a number"),
  body("email")
    .isEmail()
    .withMessage("email not valid"),
  validationMiddelware
];

const updateBorrowerValidator = [
 body("name")
   .notEmpty()
   .withMessage("name can't be empty"),
 body("ssn")
   .notEmpty()
   .withMessage("ssn can't be empty")
   .isInt()
   .withMessage("ssn should be a number"),
 body("email")
   .isEmail()
   .withMessage("email not valid"),
  validationMiddelware
];



 module.exports =  {
  createBorrowerValidator,
  updateBorrowerValidator
 } 