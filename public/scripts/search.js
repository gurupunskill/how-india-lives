$(document).ready(function(){

    var chosen_list = [];

    var districts = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('dname'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url:'/data/district-list.json'
        }
        //local: states
    });
    
    $('#search-box .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'districts',
        displayKey: 'dname',
        source: districts,

        templates: {
            suggestion: Handlebars.compile('<div><strong>{{dname}}</strong>, {{sname}}</div>')
        }
    });

    function make_card(district_data) {
        /*var attributes_to_display = [
            'State', 'TOT_P', 'TOT_M', 'TOT_F'
        ];
        var district_card = "<div class=\"card\" style=\"width: 18rem;\">";
        district_card += "<div class=\"card-header\">";
        district_card += district_data[0].Name;
        district_card += "</div>"
        district_card += "<ul class=\"list-group list-group-flush\">"

        for (i = 0; i < attributes_to_display.length; i++)
            district_card += ("<li class=\"list-group-item\">" + attributes_to_display[i] + " " + district_data[0][attributes_to_display[i]] + "</li>");
        
        district_card += "</ul>"
        district_card += "</div>"
        console.log(district_card);*/
        
        var parsed_district_name = district_data[0]['Name'].replace(/ /g, "%20")
        parsed_district_name = parsed_district_name.replace(/&/g, "and")

        var static_map_query = "https://maps.googleapis.com/maps/api/staticmap?center='" + parsed_district_name + "',India&zoom=10&size=342x200&key=AIzaSyBKh3pMeObhgM8VwHKtfF9rYTl9qi12gvA"
        var graph_id = district_data[0]['District'] + "-pop-graph";
        
        console.log(graph_id);
        var sexratio = (district_data[0]['TOT_M']/district_data[0]['TOT_F'])*100;
        var disp_sexrat = sexratio;
        if(sexratio > 100) {
            disp_sexrat = 100;
        }

        var district_card = 
        `
            <!-- <div class="col-md-auto"> -->
            <div class="card result-card">
            <!-- <div class="card-header">${district_data[0]['Name']}</div> -->
            <div class="card-body">
                <p class="card-title result-title">${district_data[0]['Name']}</p>
                <hr class="dark-hr">
                <!-- <div id="map_div" class="result-map"></div> -->
                <img class="result-map" src=${static_map_query} />
          
                <!-- <hr> -->
                <div id=${graph_id} class="result-pop-graph"></div>
          
                <div class="container">
                    <div class="row">
                    <div class="col-sm">
                        <div class="c100 bluw center p${disp_sexrat} small">
                        <span>${sexratio}</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                        </div>
                        <p class="result-text">Sex Ratio</p> 
                    </div>
                    <div class="col-sm">
                        <div class="c100 red center p47 small">
                        <span>47%</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                        </div>
                        <p class="result-text">Literacy Rate</p>
                    </div>
                    <div class="col-sm">
                        <div class="c100 yellow center p47 small">
                        <span>47%</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                        </div>
                        <p class="result-text">Sex Ratio</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- </div> -->
        `;

        var district_pop_data = [
            {
                '': district_data[0]['Name'],
                'Total': district_data[0]['TOT_P'],
                'Male': district_data[0]['TOT_M'],
                'Female': district_data[0]['TOT_F']
            }
        ]
        $("#results").append(district_card);
        //postQueryExec(, function(){make_pop_graph(district_pop_data, )}, verbose=true);
        make_pop_graph(district_pop_data, graph_id);
    } 

    function make_pop_graph(district_pop_data, elementId) {
        var options = {
            chart: {
                title: 'Population'
            },
            bars: 'vertical'
            /*legend: {position: 'bottom'},
            axisTitlePosition: 'none',
            vAxis: {
                textPosition: 'none'
            }*/
        };
        google.charts.setOnLoadCallback(function(){drawChartBar(district_pop_data, elementId, options)});
    }

    $('#search-box .typeahead').bind('typeahead:select', function(event, suggestion) {
        chosen_list.push(suggestion);
        //$("#results").append("<button type=\"button\" class=\"btn btn-light result-btn\">" + suggestion.dname + "</button>");
        postQueryExec(suggestion.did, make_card, true);
        
        console.log(chosen_list);
    })

    
    
    
    // drawMap();
});
/*

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

*/