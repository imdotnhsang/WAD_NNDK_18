const mongoose = require('mongoose');
const User = mongoose.model('User');

const validateOTP = (OTPCode, email, actionType) => {
    const errors = {};

    User.findOne({email})
        .then(user => {
            if (!user) {
                errors.email = 'Email does not exist.'
                return {
                    isInvalid: Object.keys(errors).length,
                    errors
                }
            }

            const OTP = user.OTP;

            if (OTP.code !== OTPCode) {
                errors.OTPcode = 'OTP code is invalid.'
                return {
                    isInvalid: Object.keys(errors).length,
                    errors
                }
            }

            if (OTP.expiredAt < new Date().getTime()) {
                errors.expiredAt = 'OTP code has expired.'
                return {
                    isInvalid: Object.keys(errors).length,
                    errors
                }
            }

            switch (actionType) {
                case 'activation':
                    if (user.confirmed) {
                        errors.confirmed = 'Account already activation.'
                        return {
                            isInvalid: Object.keys(errors).length,
                            errors
                        }
                    }    

                    user.confirmed = true;

                    break;
            
                default:
                    break;
            }

            return {
                isInvalid: false,
                user
            }
        })
}

module.exports = validateOTP;