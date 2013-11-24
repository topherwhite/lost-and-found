
var Model = global.Model;

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.create = function(req, res) {



  Model.Person.findOrCreate({
    email: req.body.email.toLowerCase()
  }).success(function(_Person){
    if (typeof req.body.phone !== "undefined") { _Person.phone = req.body.phone; _Person.save(); }
    _Person.addItem({
      type: req.body.type,
      title: req.body.title,
      imagelink: req.body.imagelink,
      description: req.body.description
    }).success(function(_Item){


      res.send(_Item);

    }).error(function(e){
      console.error(e); res.send({},500);
    });
  }).error(function(e){
    console.error(e); res.send({},500);
  });

};
