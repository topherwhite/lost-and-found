
var Model = global.Model;
var Mail = global.Mail;

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.add = function(req, res){
  var fields = [];
  fields = consolidateFields(Model.Person,"person",fields);
  fields = consolidateFields(Model.Claim,"claim",fields);
  fields = consolidateFields(Model.Item,"item",fields);

  res.render("create", { "fields": fields });
  console.log(fields);
};

function consolidateFields(ModelType,ModelName,fieldArray) {
  var j = fieldArray.length;
  for (i in ModelType.rawAttributes) {
    if ((i != "id")&&(i != "updated_at")&&(i != "created_at")) {
      fieldArray[j] = ModelType.rawAttributes[i];
      fieldArray[j].id = i;
      fieldArray[j].model = ModelName;
      fieldArray[j].msg = (typeof fieldArray[j].promptUserInputMsg == undefined) ? i : fieldArray[j].promptUserInputMsg;
      j++;
    }
  }
  return fieldArray;
}

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
            type: req.body.item_type,
            short_description: req.body.short_description,
            long_description: req.body.long_description
          }).success(function(_Item){
            _Claim.addItem(_Item).success(function(_Item){

              res.send({
                item: _Item, claim: _Claim, person: _Person
              });

							//sendmail
							res.render('mail_newclaim', { person:_Person, claim:_Claim, item:_Item}, function(err, html) {
								console.log(err);    
								console.log(html);
									Mail.sendMail("New claim", html);
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
