const { body } = require('express-validator');
const validationMiddelware = require('../middlewares/validationMiddleware')

 const createBookValidator = [
    body("title")
      .notEmpty()
      .withMessage("title can't be empty"),
    body("isbn")
      .notEmpty()
      .withMessage("isbn can't be empty")  
      .isLength(17)
      .withMessage("isbn has wrong value"),   
    body("author")
      .notEmpty()
      .withMessage("author can't be empty"),
    body("shelf_location")
      .notEmpty()
      .withMessage("shelf location can't be empty"),
    body("quantity")
      .notEmpty()
      .withMessage("quantity can't be empty")
      .isInt({gt: 0})
      .withMessage("quantity must be greater than 0"),
    validationMiddelware
  ];

 const updateBookValidator = [
    body("title")
        .notEmpty()
        .withMessage("title can't be empty"),
    body("isbn")
        .notEmpty()
        .withMessage("isbn can't be empty")
        .isLength(17)
        .withMessage("isbn has wrong value"),    
    body("author")
        .notEmpty()
        .withMessage("author can't be empty"),
    body("shelf_location")
        .notEmpty()
        .withMessage("shelf location can't be empty"),
    body("quantity")
        .notEmpty()
        .withMessage("quantity can't be empty")
        .isInt({gt: 0})
        .withMessage("quantity must be greater than 0"),
    validationMiddelware
  ];

 module.exports =  {
    createBookValidator,
    updateBookValidator
 } 