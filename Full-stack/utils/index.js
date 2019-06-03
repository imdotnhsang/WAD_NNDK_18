const createOTP = require('./createOTP');
const pickUser = require('./pickUser');
const sendOTPCode = require('./sendOTPCode');
const validateOTP = require('./validateOTP');
const getCategoryList = require('./getCategoryList');

module.exports = {
    createOTP, pickUser, sendOTPCode, validateOTP, getCategoryList
}