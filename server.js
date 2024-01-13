const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require("./routes/BooksAPIs.js");
const borrowerRoutes = require("./routes/BorrowersAPIs.js");
const bookBorrowerRoutes = require("./routes/BorrowersRequestsAPIs.js")
const reportsRoutes = require("./routes/ReportsAPIs.js")


const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use("/lms", booksRoutes);
app.use("/lms", borrowerRoutes);
app.use("/lms", bookBorrowerRoutes);
app.use("/lms/reports", reportsRoutes);

app.listen(3000 , ()=>{
    console.log('Server Started Running on http://localhost:3000/lms')
})
