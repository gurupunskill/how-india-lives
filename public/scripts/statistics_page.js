$(document).ready(function() {});

function S(id){

    //to get element by id
    return document.getElementById(id)
}

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
    closeIcon.toggleClass('active');
  });