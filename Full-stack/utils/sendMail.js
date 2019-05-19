const nodemailer = require('nodemailer');
const config = require('config');

const autoUser = config.autoUser;
const autoPass = config.autoPass;

const sendActivationEmail = (email, authUrl) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: autoUser,
            pass: autoPass
        }
    });

    const html = `${authUrl}`;

    const mailOptions = {
        from: autoUser,
        to: email,
        subject: "The Big Wind activation email", // Subject line
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

const sendForgotPasswordEmail = (email, authCode) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: autoUser,
            pass: autoPass
        }
    });

    const html = `${authCode}`;

    const mailOptions = {
        from: autoUser,
        to: email,
        subject: "The Big Wind activation email", // Subject line
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
};

module.exports = {
    sendActivationEmail,
    sendForgotPasswordEmail
}

// module.exports = (email, url) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: 'smtp.gmail.com',
//         auth: {
//             user: autoUser,
//             pass: autoPass
//         }
//     });

//     const html = `${url}`;

//     const mailOptions = {
//         from: autoUser,
//         to: email,
//         subject: "The Big Wind activation email", // Subject line
//         html
//     };

//     transporter
//         .sendMail(mailOptions, (err, info) => {
//             if (err) {
//                 console.log('err: ', err);
//             } else {
//                 console.log('info: ', info);
//             }
//         });

//     // console.log("Message sent: %s", info.messageId);
//     // // Preview only available when sending through an Ethereal account
//     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// };