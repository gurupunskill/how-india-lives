$(document).ready(function() {});

google.charts.load('current', {'packages':['bar']});

function S(id){

    //to get element by id
    return document.getElementById(id)
}

//function to query and obtain results basedon selection
function show_results(text){

    $.ajax({

        type: "POST",
        url: "/queryServer",
        data: {input : text},
        success: function(results){

            console.log(results);
            drawChart(results);
        },
        async: false 
    });
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

/* set of functions for the selection menu */

var closeIcon =   document.querySelectorAll('svg.close'),
    $container = $('.container'),
    $list = $container.find('ul'),
    $links = $container.find('a'),
    $text = $container.find('span');

// When the '+' icon is clicked...
$(closeIcon).on('click', function() {
    // Add class to rotate icon to an 'x'
    $(this).toggleClass('active');
    // Toggle the list
    $list.toggle();
});

$(closeIcon).hover(function() {
    $container.addClass('hover');
  }, function() {
    $container.removeClass('hover');
  });
  
$links.on('click', function() {
    
    $links.removeClass('active');
    
    $(this).addClass('active');
    $text.text($(this).text()).addClass('fade');
    setTimeout(function(){
      $text.removeClass('fade');
    }, 800);
    $list.toggle();
    $(closeIcon).toggleClass('active');

    show_results(S("option1").innerHTML);
  });

  /* end of functions for selection menu */