const nodemailer = require('nodemailer');
const config = require('config');

const autoUser = config.autoUser;
const autoPass = config.autoPass;

const sendOTPCode = (email, OTPCode, typeEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: autoUser,
            pass: autoPass
        }
    });

    let html, subject;

    switch (typeEmail) {
        case 'activation':
            subject = "The Big Wind activation account email";
            html = `${OTPCode} is your The Big Wind account activation code.`
            break;
        case 'fogotten':
            subject = "The Big Wind forgotten account email";
            html = `${OTPCode} is your The Big Wind forgotten password code.`
            break;
        default:
            break;
    }

    const mailOptions = {
        from: autoUser,
        to: email,
        subject, 
        html
    };

    transporter
        .sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('err: ', err);
            } else {
                console.log('info: ', info);
            }
        });
} 

module.exports = sendOTPCode