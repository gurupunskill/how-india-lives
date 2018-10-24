const express = require('express');
const path = require('path');
const mysql = require('mysql');
const PORT = process.env.PORT || 5000;
const fs = require('fs');

var pool = mysql.createPool({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b0f693560edb2c',
    password : '4e033ea0',
    database : 'heroku_7d8b3caef3dcfea'
});


var app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req,res) => res.render('pages/search'))
app.get('/statistics', (req, res) => res.render('pages/statistics'))
app.get('/ref', (req,res) => res.render('pages/deprecated/dep_search'))

app.get('/dump', function(req,res){
    pool.query('select d.name dname, s.name sname, d.district did, State sid from pca_total d, State s where d.State = s.SID', function(err, results, fields){
        if(err) throw err;
        data = JSON.stringify(results, null, 2);
        res.send(results);
        fs.writeFile('public/data/district-list.json', data, (err) => {  
            if (err) throw err;
            console.log('Data written to file');
        });
    });
});

app.get('/population', function(req,res){

    var query = "SELECT District , TOT_P FROM pca_total LIMIT 10";
    pool.query(query,function(err,results,fields){

        if(err) throw err;
        res.send(results);
        console.log('Population data sent');
    });
});


/*
app.get('/data', function(req, res){
    data = require('./public/data/district-list.json')
    res.send(data)
});
*/
/*
app.get('/state', function(req, res){
    pool.query('SELECT * FROM State', function(err, results, fields){
        if(err) throw err;
        res.render('pages/state', {result: results});
    });
});
*/


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))