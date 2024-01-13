const { Op , QueryTypes } = require("sequelize");
const models = require('../models');
const requestHandler = require('../handlers/RequestHandler');

const Borrower = models.Borrower;

const getAll = async (req, res) => {
    try {
        const borrowers = await Borrower.findAll();
        return requestHandler.sendSuccess(res, 'borrowers fetched successfully')({ borrowers });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const findByID = async (req, res) => {
    try {
        const borrower = await Borrower.findOne({ where: { id: req.params.id } });
        return requestHandler.sendSuccess(res, 'borrower fetched successfully')({ borrower });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const findBySSN = async (req, res) => {
    try {
        const borrower = await Borrower.findOne({ where: { ssn : req.params.ssn } });
        return requestHandler.sendSuccess(res, 'borrower fetched successfully')({ borrower });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const create = async (req, res) => {
    try {
        const borrower = await Borrower.create({ 
            SSN : req.body.ssn,
            name: req.body.name, 
            email: req.body.email, 
            registered_date: Date.now() 
        });
        return requestHandler.sendSuccess(res, 'borrower created successfully')({ borrower });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const update = async (req, res) => {
    try {
        const borrower = await Borrower.update({  
            SSN : req.body.ssn,
            name: req.body.name, 
            email: req.body.email,},
            {where: {id: req.params.id}
        }) ;
        return requestHandler.sendSuccess(res, 'borrower updated successfuly')({ });
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const destroyByID = async (req, res) => {
    try {
        const borrower = await Borrower.destroy({ where: { id: req.params.id } });
        return requestHandler.sendSuccess(res, 'borrower deleted successfuly')({  });            
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const destroyBySSN = async (req, res) => {
    try {
        const borrower = await Borrower.destroy({ where: { SSN: req.params.ssn } });
        return requestHandler.sendSuccess(res, 'borrower deleted successfuly')({  });            
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
module.exports = { 
    getAll,
    findByID,
    findBySSN,
    create,
    update,
    destroyByID,
    destroyBySSN
 }
