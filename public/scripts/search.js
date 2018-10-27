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
        var attributes_to_display = [
            'State', 'TOT_P', 'TOT_M', 'TOT_F'
        ];
        var district_card = "<div class=\"card\" style=\"width: 18rem;\">";
        district_card += "<div class=\"card-header\">";
        district_card += district_data[0].Name;
        district_card += "</div>"
        district_card += "<ul class=\"list-group list-group-flush\">"

        for (i = 0; i < attributes_to_display.length; i++)
            district_card += ("<li class=\"list-group-item\">" + attributes_to_display[i] + " " + district_data[0][attributes_to_display[i]] + "</li>");
        
        district_data += "</ul>"
        district_data += "</div>"
        $("#results").append(district_card);
    } 

    $('#search-box .typeahead').bind('typeahead:select', function(event, suggestion) {
        chosen_list.push(suggestion);
        //$("#results").append("<button type=\"button\" class=\"btn btn-light result-btn\">" + suggestion.dname + "</button>");
        postQueryExec(suggestion.did, make_card, true);
        
        console.log(chosen_list);
    })
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