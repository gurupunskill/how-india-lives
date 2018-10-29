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
        
        var parsed_district_name = district_data[0]['Name'].replace(/ /g, "%20")
        parsed_district_name = parsed_district_name.replace(/&/g, "and")

        var w  = $(window).width() * 0.178;
        w = Math.round(w);
        var h = $(window).height() * 0.231;
        h = Math.round(h);

        var static_map_query = "https://maps.googleapis.com/maps/api/staticmap?center='" + parsed_district_name + "',India&zoom=10&size=" + w + "x" + h + "&key=AIzaSyBKh3pMeObhgM8VwHKtfF9rYTl9qi12gvA"
        var pop_graph_id = district_data[0]['District'] + "-pop-graph";
        var lit_graph_id = district_data[0]['District'] + "-lit-graph";

        console.log(pop_graph_id);
        var sexratio = (district_data[0]['TOT_M']/district_data[0]['TOT_F']);
        var dispsexratio = 1/sexratio;

        sexratio*=100;
        dispsexratio*=100;
        sexratio = Math.round(sexratio);
        dispsexratio = Math.round(dispsexratio);

        if(dispsexratio > 100) dispsexratio = 100;

        var literacy_rate = (district_data[0]['P_LIT']/district_data[0]['TOT_P'])*100;
        literacy_rate = Math.round(literacy_rate);

        var work_pop = (district_data[0]['TOT_WORK_P']/district_data[0]['TOT_P'])*100;
        work_pop = Math.round(work_pop);


        var district_card = 
        `
            <!-- <div class="col-md-auto"> -->
            <div class="card result-card open-result-card">
            <!-- <div class="card-header">${district_data[0]['Name']}</div> -->
            <div class="card-body">
                <span class="pull-right clickable close-icon" data-effect="fadeOut"><i class="fa fa-times"></i></span>
                
                <p class="card-title result-title">${district_data[0]['Name']}</p>
                <hr class="dark-hr">
                <!-- <div id="map_div" class="result-map"></div> -->
                <img class="result-map" src=${static_map_query} />
          
                <!-- <hr> -->
                <div id=${pop_graph_id} class="result-pop-graph"></div>
                <div class="container">
                    <div class="row">
                    <div class="col-sm">
                        <div class="c100 center p${dispsexratio} small">
                        <span>${sexratio}</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                        </div>
                    <p class="result-text-title">Sex Ratio</p> 
                    </div>
                    <div class="col-sm">
                        <div class="c100 red center p${literacy_rate} small">
                        <span>${literacy_rate}%</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                        </div>
                        <p class="result-text-title">Literacy Rate</p>
                    </div>
                    <div class="col-sm">
                        <div class="c100 yellow center p${work_pop} small">
                        <span>${work_pop}%</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                        </div>
                        <p class="result-text-title">Working Pop</p>
                    </div>
                    </div>
                </div>
                <div id=${lit_graph_id} class="result-pop-graph"></div>
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

        var district_lit_data = [
            {
                '': district_data[0]['Name'],
                'Total': district_data[0]['P_LIT'],
                'Male': district_data[0]['M_LIT'],
                'Female': district_data[0]['F_LIT']
            }
        ]
        $("#results").append(district_card);
        //postQueryExec(, function(){make_pop_graph(district_pop_data, )}, verbose=true);
        make_graph(district_pop_data, 'Population', pop_graph_id);
        make_graph(district_lit_data, 'Literate Persons', lit_graph_id);

    } 

    function make_graph(data, title, elementId) {
        var options = {
            chart: {
                title: title
            },
            bars: 'vertical'
            /*legend: {position: 'bottom'},
            axisTitlePosition: 'none',
            vAxis: {
                textPosition: 'none'
            }*/
        };
        google.charts.setOnLoadCallback(function(){drawChartBar(data, elementId, options)});
    }

    $('#search-box .typeahead').bind('typeahead:select', function(event, suggestion) {
        if(!chosen_list.includes(suggestion.dname)) {
            chosen_list.push(suggestion.dname);
            postQueryExec(suggestion.did, make_card, true);
            console.log(chosen_list);
        }
        else {
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    })

    $('#results').on('click', '.close-icon', function() {
        console.log("click");
        $(this).closest('.card').removeClass('open-result-card');
        $(this).closest('.card').removeClass('result-card:hover');
        $(this).closest('.card').addClass('close-result-card');

        $(this).closest('.close-result-card').on('transitionend',
        function() {
            chosen_list.splice( chosen_list.indexOf($(this).closest('.card-title').text()) , 1)
            $(this).closest('.card').remove();
        })
    });
    
    
    $('.dropdown-item').on('click', function() {
        var query = $(this).text();
        var id = $(this).attr('id');
        console.log(query);
        document.getElementById('chart-title').innerHTML = query;
        document.getElementById('map-title').innerHTML = query + " Heatmap";
        show_results_1(query,id);
    })

});

/*window.onscroll = function() {    // Get the navbar
    var b = document.getElementById("search-box");
    var sticky = b.offsetTop;
    if (window.pageYOffset >= sticky) {
        b.classList.add("sticky")
    } 
    else {
        b.classList.remove("sticky");
    }
}*/