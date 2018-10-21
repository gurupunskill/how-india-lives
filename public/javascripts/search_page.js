$(document).ready(function() {});

function S(id){

    //to get element by id
    return document.getElementById(id)
}

//sql access, modules to be initiated
const mysql = require('mysql')
var pool = mysql.createPool({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b0f693560edb2c',
    password : '4e033ea0',
    database : 'heroku_7d8b3caef3dcfea'
});

var entered_text = "";                  //variable that holds the text in the search bar
var results = [];                       //variable to hold the tuples
var n = localStorage.getItem("n");      //variable to hold the number of states/districts, value obtained from local storage

//event handler for the search button
function search_click(){

    //get the text
    entered_text = S("search_box").value;

    //check if the entered text is present in the database
    pool.query('SELECT * FROM State', function(err,results,fields){
        
        if(err) throw err;

        else if(results.length > 0){

            //state has been found

            //first increment n and store back
           /* n = n + 1;
            localStorage.setItem("n", );*/

        }
        
    });

}