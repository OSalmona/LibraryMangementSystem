const mysql = require('mysql2');
const site_properties = require('./site_propertirs')

const db = mysql.createConnection({
    host : site_properties.host,
    port: site_properties.port,
    user : site_properties.user ,
    password : site_properties.password,
    database : site_properties.database
})
db.connect((error)=>{ 
    if(error){
        return console.log('unable to connect to database lms')
    }
    console.log('database connected successfully')
});
module.exports = db