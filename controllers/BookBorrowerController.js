const { Op , QueryTypes, DATE } = require("sequelize");
const models = require('../models');
const requestHandler = require('../handlers/RequestHandler');
var XLSX = require("xlsx");

const Borrower = models.Borrower
const Book = models.Book
const BookBorrower = models.BookBorrower;

const getBorroweredBooksByUserID = async (req, res) => {
    try {  
          const borrowerBooksIds =  await BookBorrower.findAll({
            attributes: ['book_id'],
            where: { borrower_id: req.params.borrower_id  ,is_returned: false }
            });
   
           const booksIds = borrowerBooksIds.map((data) => {
                return data.book_id
            })

            const books = await Book.findAll({
                where: {id: { [Op.in]: booksIds}   }
            });
          return requestHandler.sendSuccess(res, 'current borrower books fetched successfuly')({ books });
         
         
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
      
};
const getOverdueBooks = async (req, res) => {
    try {
        const overdueBooks =  await BookBorrower.findAll({
            attributes: ['book_id'],
            where: { to_date: { [Op.lte]: Date.now()}, is_returned: false }
        });
        const booksIds = overdueBooks.map((book) => {
            return book.book_id
        })
        const books = await Book.findAll({
            where: {id: {[Op.in] : booksIds}}
        });

        return requestHandler.sendSuccess(res, 'overdue books fetched successfuly')({ books });
   
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
      
};
const returnBook = async (req, res) => {
    console.log(req.body.borrower_id)
    try {
        await BookBorrower.update({ 
            is_returned: true ,
            return_date: Date.now()
        } , {
            where: {
                borrower_id: req.body.borrower_id, 
                book_id: req.body.book_id , 
            }
        });
        return requestHandler.sendSuccess(res, 'borrower return the book successfully')({  });
    
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const create = async (req, res) => {
    try {                
        await BookBorrower.create({ 
        borrower_id: req.body.borrower_id, 
        book_id: req.body.book_id , 
        from_date: req.body.from_date ,
        to_date: req.body.to_date
        });
            
        const result = await Borrower.findOne({where: { id: req.body.borrower_id,  }
                , include: { model: Book , where: {id:req.body.book_id , } } });

        return requestHandler.sendSuccess(res, 'borrower checkout the book successfuly')({ result });
         
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
};
const getRequestsByDate = async (req, res) => {
    try {  
        const requests =  await BookBorrower.findAndCountAll({
            include: [Book , Borrower],
            where: { from_date: {[Op.gte] : req.query.from},to_date: {[Op.lte] : req.query.to} }
        });
        
        // console.log(requests.rows);
        const heading = [['id' ,'book_id' , 'book_name', 'borrower_id', 'borrower_name' , 'from_date' , 'to_date' , 'retuerned_date']]
        const workbook = XLSX.utils.book_new()
        const data = requests.rows.map(element => {
            console.log(element.dataValues.Book.dataValues.id)
            return {
                id : element.dataValues.id,
                book_id : element.dataValues.Book.dataValues.id,
                book_name : element.dataValues.Book.dataValues.title,
                borrower_id : element.dataValues.Borrower.dataValues.id,
                borrower_name : element.dataValues.Borrower.dataValues.name,
                from_date :element.dataValues.from_date ,
                to_date : element.dataValues.to_date,
                retuerned_date : element.dataValues.retuerned_date
            }
        });
        // console.log(data)
        const worksheet = XLSX.utils.json_to_sheet(data)

        XLSX.utils.sheet_add_aoa(worksheet , heading)
        XLSX.utils.book_append_sheet(workbook , worksheet , 'requests')
        const buffer = XLSX.write(workbook , {bookType:'xlsx' , type : 'buffer'})

        res.attachment('data.xlsx')
        return res.send(buffer)
        // return requestHandler.sendSuccess(res, 'current borrower books fetched successfuly')({ requests });
         
         
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
      
};
const getRequestsLastMonth = async (req, res) => {
    try {  
        const requests =  await BookBorrower.findAndCountAll({
            include: [Book , Borrower],
            where: { to_date: {[Op.gte] : Date.now()-30} , is_returned: {[Op.eq] : false} }
        });
        
        // console.log(requests.rows);
        const heading = [['borrower_id' , 'borrower_name' ,'book_id' , 'book_name','from_date' , 'to_date']]
        const workbook = XLSX.utils.book_new()
        const data = requests.rows.map(element => {
            console.log(element.dataValues.Book.dataValues.id)
            return {
                borrower_id : element.dataValues.Borrower.dataValues.id,
                borrower_name : element.dataValues.Borrower.dataValues.name,
                book_id : element.dataValues.Book.dataValues.id,
                book_name : element.dataValues.Book.dataValues.title,
                from_date :element.dataValues.from_date ,
                to_date : element.dataValues.to_date
            }
        });
        // console.log(data)
        const worksheet = XLSX.utils.json_to_sheet(data)

        XLSX.utils.sheet_add_aoa(worksheet , heading)
        XLSX.utils.book_append_sheet(workbook , worksheet , 'requests')
        const buffer = XLSX.write(workbook , {bookType:'xlsx' , type : 'buffer'})

        res.attachment('data.xlsx')
        return res.send(buffer)
        // return requestHandler.sendSuccess(res, 'current borrower books fetched successfuly')({ requests });
         
         
    } catch (error) {
        return requestHandler.sendError(req, res, error);
    }
      
};
module.exports = { 
    getOverdueBooks,
    getBorroweredBooksByUserID,
    returnBook,
    create,
    getRequestsByDate,
    getRequestsLastMonth
 }

