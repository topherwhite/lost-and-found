
exports.sendMail = function(subject, html) {
	var nodemailer = require("nodemailer");
	
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: process.env.SMTP_SERVICE,
	    auth: {
	        user: process.env.SMTP_USERNAME,
	        pass: process.env.SMTP_PASSWORD
	    }
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: process.env.SMTP_USERNAME, // sender address
	    to: process.env.SMTP_DEFAULT_RECEIVER, // list of receivers
	    subject: subject, // Subject line
	    //text: "Hello world ✔", // plaintext body
	    html: html // html body
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    smtpTransport.close(); // shut down the connection pool, no more messages
	});
};