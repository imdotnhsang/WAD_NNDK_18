const createOTP = require('./OTP/createOTP');
const pickUser = require('./pickUser');
const sendOTPCode = require('./OTP/sendOTPCode');
const validateOTP = require('./OTP/validateOTP');

const getCategoryList = require('./getData/getCategoryList');
const getTagList = require('./getData/getTagList');
const countArticles = require('./getData/countArticles');

module.exports = {
    createOTP,
    pickUser,
    sendOTPCode,
    validateOTP,
    getCategoryList,
    getTagList,
    countArticles,
}