var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config()

class EmailSender { 
	constructor() {
		this.user = "speaklearnyemail@gmail.com"
		this.pass = process.env.EMAIL_PASSWORD
	}

	createTransport() {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			       user: this.user,
			       pass: this.pass
			   }
		});


		return transporter
	}


	sendEmail(email, name, code) {
		const transporter = this.createTransport()
		
		const mailOptions = {
		  from: this.user, 
		  to: email, 
		  subject: code + ' - your verification code.', 
		  html: '<div style="font-size:15px; font-weight:200; margin-left: 0; font-family:sans-serif">' + "Hey, " + name  + '</div><div style="font-size:25px; font-weight:200; margin-left: 0; font-family:sans-serif; margin-top: 2rem;">' + "This is your's verification code - " + code + '</div><div style="font-size:13px; font-weight:200; margin-left: 0; font-family:sans-serif; margin-top: 2.5rem;">sincerely,</div><div style="font-size:13px; font-weight:200; margin-left: 0; font-family:sans-serif">SpeakLearny</div>'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    return error
		  } else {
		    return ('Email sent: ' + info.response);
		  }
		});  
	}
}



module.exports = EmailSender