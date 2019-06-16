const createOTP = require('./OTP/createOTP');
const pickUser = require('./pickUser');
const sendOTPCode = require('./OTP/sendOTPCode');
const validateOTP = require('./OTP/validateOTP');

const getCategoryList = require('./getData/getCategoryList');
const getTagList = require('./getData/getTagList');
const countArticlesCategory = require('./getData/countArticlesCategory');
const countArticlesPreCategory = require('./getData/countArticlesPreCategory');
const countArticlesTag = require('./getData/countArticlesTag');
const countArticlesPreTag = require('./getData/countArticlesPreTag');

module.exports = {
    createOTP,
    pickUser,
    sendOTPCode,
    validateOTP,
    getCategoryList,
    getTagList,
    countArticlesCategory,
    countArticlesPreCategory,
    countArticlesTag,
    countArticlesPreTag
}