$(document).on('ready', function() {
    console.log("Is this working");
});

function testing() {

    var pool = mysql.createPool({
        host     : 'us-cdbr-iron-east-01.cleardb.net',
        user     : 'b0f693560edb2c',
        password : '4e033ea0',
        database : 'heroku_7d8b3caef3dcfea'
    });

    pool.query('SELECT * FROM State', function(err, results, fields){
        if(err) throw err;
        //res.render('pages/state', {result: results});
        console.log(results);
    });
}