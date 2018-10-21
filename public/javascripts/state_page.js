$(document).ready(function() {});

function S(id){

    //to get element by id
    return document.getElementById(id)
}


var n = localStorage.getItem("n");          //variable to hold the number of states/districts, value obtained from local storage
var i;                                      //loop variable
var state_dis = [];                         //variable to hold the states/districts chosen by user through the search bar or map

for(i=0 ; i<n ; ++i){

    //to obtain the state/district names stored in local storage
    state_dis[i] = localStorage.getItem("local_state_dis"+i.toString());
}

if(n == 0){

    //No states chosen
    S("para_chosen_list").innerHTML = "No State/District chosen";
}




