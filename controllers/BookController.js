const { Op , QueryTypes } = require("sequelize");
const models = require('../models');
const requestHandler = require('../handlers/RequestHandler');

const Book = models.Book;

const getAll = async (req, res) => {
    try {
        const books = await Book.findAll();
        return requestHandler.sendSuccess(res, 'books fetched successfully')({ books });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const getByID = async (req, res) => {
    try {
        const book = await Book.findOne({ where: { id: req.params.id } });
        return requestHandler.sendSuccess(res, 'book fetched successfully')({ book });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const getByISBN = async (req, res) => {
    try {
        const book = await Book.findOne({ where: { isbn : req.params.isbn } });
        return requestHandler.sendSuccess(res, 'book fetched successfully')({ book });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const search = async (req, res) => {
    try {
         const t = req.query.t;
         const a = req.query.a;
         const i = req.query.i;
         const books = await Book.findAndCountAll({
            where: {
                [Op.and]: [
                 {[Op.or] : [{title: { [Op.like]:'%'+t+'%'}},{"":{[Op.eq] :t}}]},
                 {[Op.or] : [{author: { [Op.like]:'%'+a+'%'}},{"":{[Op.eq] :a}}]},
                 {[Op.or] : [{isbn: { [Op.like]:'%'+i+'%'}},{"":{[Op.eq] :i}}]},
                ]
              }
          });
        const result = books.rows
        return requestHandler.sendSuccess(res, `you have ${books.count} search results`)({ result });

    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const create = async (req, res) => {
    try {
        const book = await Book.create({ 
            title: req.body.title, 
            author: req.body.author, 
            isbn: req.body.isbn, 
            quantity: req.body.quantity, 
            shelf_location: req.body.shelf_location, 
          });

        return requestHandler.sendSuccess(res, 'book inserted successfully')({ book });

    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const update = async (req, res) => {
    try {

        const book = await Book.update({  
            title: req.body.title, 
            author: req.body.author, 
            isbn: req.body.isbn, 
            quantity: req.body.quantity, 
            shelf_location: req.body.shelf_location, }, {
            where: {
            id: req.params.id
            }
        }) ;
    
        return requestHandler.sendSuccess(res, 'book updated successfuly')({  });

    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const destroyByID = async (req, res) => {
    try {
        const book = await Book.destroy({ where: { id: req.params.id } });
        return requestHandler.sendSuccess(res, 'book deleted successfuly')({  });            
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const destroyByISBN = async (req, res) => {
    try {
        const book = await Book.destroy({ where: { isbn: req.params.isbn } });
        return requestHandler.sendSuccess(res, 'book deleted successfuly')({  });            
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};

module.exports = { 
    getAll ,
    getByID ,
    getByISBN ,
    search,
    create ,
    update ,
    destroyByID,
    destroyByISBN
 }

