google.charts.load('current', {'packages':['bar']});
google.charts.load("current", {packages:["corechart"]});

function S(id){
    //to get element by id
    return document.getElementById(id)
}

function postQueryExec(URL_query_text, exec_function, verbose=false) {
    $.ajax({
        type: "POST",
        url: "/database",
        data: {input : URL_query_text},
        success: function(results){
            //google.charts.setOnLoadCallback(exec_function)
            if(verbose) console.log(results);
            exec_function(results);
        },
        async: true 
    });
}

//function to query and obtain results based on selection
function show_results(text){
    postQueryExec(text, drawChartBar);
    drawChartDonut();
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

var default_options = {
    chart: {
      title: 'Statistics Visualization',
      subtitle: 'Visulalising data',
    },
    bars: 'vertical' // Required for Material Bar Charts.
  }
//function to draw the graph -> bar
function drawChartBar(results, elementID='barchart_material', options=default_options) 
{
    var data = google.visualization.arrayToDataTable(jsonToGraphData(results));
    var chart = new google.charts.Bar(document.getElementById(elementID));
    chart.draw(data, google.charts.Bar.convertOptions(options));

    // var chart = new google.visualization.BarChart(document.getElementById(elementID));
    // chart.draw(data, options);
}

//function to draw the graph -> donut
function drawChartDonut() {

    var data = google.visualization.arrayToDataTable([
        ['Illetracy', 'Percentage'],
        ['Work',     77],
        ['Literate', 20]
    ]);

    var options = {
        pieHole: 0.5,
        colors: ['red','grey'],
        //enableInteractivity: false,
        legend: {
            position: "none"	
        },
        pieSliceText: "none",
        tooltip: {
            trigger: "none"
        }
      //pieSliceBorderColor: 'light-grey',
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }


google.charts.load("current", {
    "packages":["map"],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    "mapsApiKey": "AIzaSyBKh3pMeObhgM8VwHKtfF9rYTl9qi12gvA"
});

//google.charts.setOnLoadCallback(drawMap);
function drawMap() {
    var data = google.visualization.arrayToDataTable([
        ['Location'], ['Mumbai, India']
    ]);

    var map = new google.visualization.Map(document.getElementById('map_div'));
    map.draw(data, {
        mapType: 'normal',
        streetViewControl: false,
        disableDefaultUI: true,
        showTooltip: false,
        showInfoWindow: true,
        zoomLevel: 6
    });
}