
var Model = global.Model;

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.create = function(req, res) {


  Model.Person.findOrCreate({
    email: req.body.email.toLowerCase()
  }).success(function(_Person){
    if (typeof req.body.phone !== "undefined") { _Person.phone = req.body.phone; _Person.save(); }
    Model.Claim.findOrCreate({
      type: req.body.type,
      location: req.body.location,
      time: new Date(req.body.time)
    }).success(function(_Claim){
      _Person.addClaim(_Claim).success(function(_Claim){
        Model.Item.findOrCreate({
            type: req.body.item_type
          }).success(function(_Item){
            _Claim.addItem(_Item).success(function(_Item){
              res.send(_Item);
            }).error(function(e){
            console.error(e); res.send({},500);
          }); 
        }).error(function(e){
          console.error(e); res.send({},500);
        }); 
      }).error(function(e){
        console.error(e); res.send({},500);
      });   
    }).error(function(e){
      console.error(e); res.send({},500);
    });
  }).error(function(e){
    console.error(e); res.send({},500);
  });

};
