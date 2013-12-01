
var LF = {};

LF.submitClaim = function() {

  var sendObj = {};

  sendObj.claimType = $("input[name=claimType]:checked").val()
  
  var sendObjAuthor = {};  
  sendObjAuthor.name = $("input#personName").val();
  sendObjAuthor.email = $("input#personEmail").val();
  sendObjAuthor.phone = $("input#personPhone").val();
  sendObj.author = sendObjAuthor;

  var sendObjItem = {};
  sendObjItem.itemType = $("#itemType option:selected").text(); // to replace..
  sendObjItem.name = $("input#itemName").val();;
  sendObjItem.description = $("textarea#itemDescription").val();;
  sendObjItem.serialNumber = $("input#itemSerialNumber").val();;
  sendObj.item = sendObjItem;

  sendObj.time = $("input#eventDate").val()+" "+$("input#eventTime").val()+":00";
  sendObj.location = $("input#eventLocation").val();

  $.ajax({ type:"POST", dataType:"json", url:"/claims", data: sendObj,
    success: function(data) {
      window.location = "/claims";
    }
  });
}

function updateClaimStatus(claimId, resolved) {
  $.ajax({ type:"POST", dataType:"json", url:"/claims/status", data: {claimId:claimId, resolved:resolved},
    success: function(data) {
      location.reload();
    }
  });  
}

function deleteClaim(claimId) {
  if (confirm("Are you sure?")) {
    $.ajax({ type:"POST", dataType:"json", url:"/claims/" + claimId + "/delete",
    success: function(data) {
      location.href = '/claims';
    }
  });  
  }
  return false;
}

$(document).ready(function() {
  // $('#claims').dataTable();
  // $('#claims').show();
});


