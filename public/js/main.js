
var LF = {};

LF.submitClaim = function() {

  var sendObj = {};

  sendObj.email = $("input#email").val();
  sendObj.phone = $("input#phone").val();
  sendObj.type = $(".nav-tabs .active a").html();
  sendObj.time = $("input#time-date").val()+" "+$("input#time-time").val()+":00";
  sendObj.location = $("input#location").val();
  sendObj.short_description = $("input#short_description").val();
  sendObj.long_description = $("input#long_description").val();
  sendObj.item_type = "glasses";

  $.ajax({ type:"POST", dataType:"json", url:"/item", data: sendObj,
    success: function() {
      window.location("/item/"+sendObj.item_type);
    }
  });

}


$(document).ready(function() {



  $('#claims').dataTable();
  $('#claims').show();

  $('.nav a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

});


