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

    $('#search-box .typeahead').bind('typeahead:select', function(event, suggestion) {
        chosen_list.push(suggestion);
        $("#results").append("<button type=\"button\" class=\"btn btn-light result-btn\">" + suggestion.dname + "</button>");
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