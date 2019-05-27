const _ = require('lodash');

module.exports = (user, userType) => {
    const result = _.pick(user, ['_id', 'username', 'email', 'birthday', 'fullname', 'confirmed', 'userType', 'gender']);
    
    console.log(result);
    switch (userType) {
        case 'subscriber':
            result.expiredAt = user.expiredAt;
            break;
        case 'writer':
            result.pseudonym = user.pseudonym;
            break;
        case 'editor':
            result.categoriesManagement = user.categoriesManagement;
            break;
        case 'administrator':
            break;
        default:
            break;
    }
    
    return result;
}