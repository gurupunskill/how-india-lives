google.charts.load('current', {'packages':['bar']});

function S(id){
    //to get element by id
    return document.getElementById(id)
}

//function to query and return results based on selection
function postQueryRet(URL_query_text, verbose=false) {
    $.ajax({
        type: "POST",
        url: "/queryServer",
        data: {input : URL_query_text},
        success: function(results){
            if(verbose) console.log(results);
            return results;
        },
        async: false 
    });
}

function postQueryExec(URL_query_text, exec_function, verbose=false) {
    $.ajax({
        type: "POST",
        url: "/queryServer",
        data: {input : URL_query_text},
        success: function(results){
            if(verbose) console.log(results);
            exec_function(results);
        },
        async: false 
    });
}

//function to query and obtain results based on selection
function show_results(text){
    postQueryExec(text, drawChart);
}

//function to obtain keys in from JSON object
function getKeys(results){
    var arr = [];
    var x;
    for(x in results[0])
        arr.push(x);
    return arr;
}

//Parsing function -> converts json object to array object
function jsonToGraphData(results){

    var graphData = [];
    var i;
    var j;
    var arr = [];

    //get the column names
    graphData.push(getKeys(results));
    
    for(i=0;i<results.length;++i){
        for(j in results[i]){
            arr.push(results[i][j]);
        }
        graphData.push(arr);
        arr = [];
    }
    
    return graphData;
}

//function to draw the graph
function drawChart(results) {

    var data = google.visualization.arrayToDataTable(jsonToGraphData(results));

    var options = {
      chart: {
        title: 'Statistics Visualization',
        subtitle: 'Visulalising data',
      },
      bars: 'vertical' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('barchart_material'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}
