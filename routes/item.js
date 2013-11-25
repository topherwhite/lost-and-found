
var Model = global.Model;
var Mail = global.Mail;

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.add = function(req, res){
  var fields = [], j = 0;
  for (i in Model.Person.rawAttributes) {
    if ((i != "id")&&(i != "updated_at")&&(i != "created_at")) {
      fields[j] = Model.Person.rawAttributes[i];
      fields[j].attribute_name = i;
      j++;
    }
    res.render("create", { this_version: "asdfasdf" } );
  }
  res.end();
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
        Model.Item.create({
            type: req.body.item_type
          }).success(function(_Item){
            _Claim.addItem(_Item).success(function(_Item){

              res.send({
                item: _Item, claim: _Claim, person: _Person
              });

							//sendmail
							res.render('mail_newclaim', {title: ''}, function(err, html) {
							    console.log("A new claim has been created");
									Mail.sendMail("A new claim has been created", html);
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
  }).error(function(e){
    console.error(e); res.send({},500);
  });

};
