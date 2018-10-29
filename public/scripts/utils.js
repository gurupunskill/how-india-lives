google.charts.load('current', {'packages':['bar']});
google.charts.load('current', {
    'packages':['geochart'],
    'mapsApiKey': "AIzaSyBKh3pMeObhgM8VwHKtfF9rYTl9qi12gvA"
  });

//google.charts.load("current", {packages:["corechart"]});

function S(id){
    //to get element by id
    return document.getElementById(id)
}

function postQueryExec(URL_query_text, exec_function, URL_secondary_string = "", verbose=false) {
    $.ajax({
        type: "POST",
        url: "/database",
        data: {input : URL_query_text, table : URL_secondary_string},
        success: function(results){
            //google.charts.setOnLoadCallback(exec_function)
            if(verbose) console.log(results);
            exec_function(results);
        },
        async: true 
    });
}

//function to query and obtain results based on selection
function show_results_1(text,id){
    postQueryExec(text, drawChartBarBest,"DESC");
    postQueryExec(text, drawChartBarWorst,"ASC");
    postQueryExec(id,drawRegionsMap,"pca");
}

//function to get data for geochart from button on click
function mapShowPop(clicked_id){
    postQueryExec(clicked_id,drawRegionsMap,"pca");
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

//function to draw the graph -> bar best
function drawChartBarBest(results) {

    var data = google.visualization.arrayToDataTable(jsonToGraphData(results));

    var options = {
      chart: {
        title: 'Statistics Visualization',
        subtitle: 'Visulalising data of the highest 5 states',
      },
      bars: 'vertical' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('barchart_material_best'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
    /*
    var parsed_district_name = results[0]['Name'].replace(/ /g, "%20");
    parsed_district_name = parsed_district_name.replace(/&/g, "and");
    var static_map_query = "https://maps.googleapis.com/maps/api/staticmap?center='" + parsed_district_name + "',India&zoom=10&size=342x200&key=AIzaSyBKh3pMeObhgM8VwHKtfF9rYTl9qi12gvA";
  
    S("bestPic").src = static_map_query;*/
}

//function to draw the graph -> bar worst
function drawChartBarWorst(results) {

    var data = google.visualization.arrayToDataTable(jsonToGraphData(results));

    var options = {
      chart: {
        subtitle: 'Visulalising data of the lowest 5 states',
      },
      bars: 'vertical' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('barchart_material_worst'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
    /*
    var parsed_district_name = results[0]['Name'].replace(/ /g, "%20");
    parsed_district_name = parsed_district_name.replace(/&/g, "and");
    var static_map_query = "https://maps.googleapis.com/maps/api/staticmap?center='" + parsed_district_name + "',India&zoom=10&size=342x200&key=AIzaSyBKh3pMeObhgM8VwHKtfF9rYTl9qi12gvA";
  
    S("worstPic").src = static_map_query;*/
}

//function to draw the geochart of India
function drawRegionsMap(results) {

    var data = google.visualization.arrayToDataTable(jsonToGraphData(results));

    var options = {
        region: 'IN',
        domain:'IN',
        displayMode: 'regions',
        colorAxis: {colors: ['#daedf4', '#52aacc', '#2b7590']},
        resolution: 'provinces',
        /*backgroundColor: '#81d4fa',*/
        /*datalessRegionColor: '#81d4fa',*/
        defaultColor: '#f5f5f5',
        width: '50vw', 
        height: '55vh'
      };

    var chart = new google.visualization.GeoChart(document.getElementById('map_div'));
    chart.draw(data, options);
  }


/*
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
*/

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