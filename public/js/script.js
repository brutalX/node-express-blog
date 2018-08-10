$(document).ready(function(){
  $('.btnDel').click(function(e){
   var target = $(e.target);
   const id = target.attr('data-id');
   var ask = confirm('Are you sure to delete this?');
    if(ask){
      $.ajax({
        type:'DELETE', 
        url: '/article/'+id,
        success: function(response){
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  });
});

     

