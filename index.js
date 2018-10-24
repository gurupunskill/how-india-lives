const express = require('express')
const path = require('path')
//const mysql = require('mysql')
const PORT = process.env.PORT || 5000

/*
var pool = mysql.createPool({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b0f693560edb2c',
    password : '4e033ea0',
    database : 'heroku_7d8b3caef3dcfea'
});
*/

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req,res) => res.render('pages/search'))
//app.get('/statistics', (req, res) => res.render('pages/statistics'))
//app.get('/search', (req, res) => res.render('pages/search'))
//app.get('/state', (req, res) => res.render('pages/state'))

/*
app.get('/state', function(req, res){
    pool.query('SELECT * FROM State', function(err, results, fields){
        if(err) throw err;
        res.render('pages/state', {result: results});
    });
});
*/


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))