const express = require('express')
const path = require('path')
const mysql = require('mysql')
const PORT = process.env.PORT || 5000

var pool = mysql.createPool({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PWD,
    database : process.env.DATABASE_DB
});

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req,res) => res.render('pages/index'))
app.get('/state', function(req, res){
    pool.query('SELECT * FROM State', function(err, result, fields){
        if(err) throw err;
        var results = { 'results': (result) ? result.rows : null};
        res.render('pages/state', results);
    });
});
app.get('/statistics', (req, res) => res.render('pages/statistics'))


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))