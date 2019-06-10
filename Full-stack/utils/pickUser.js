const _ = require('lodash');

module.exports = (user, userType) => {
    const result = _.pick(user, ['_id', 'username', 'email', 'avatar', 'birthday', 'fullname', 'confirmed', 'userType', 'gender', 'expiredAt']);
    
    console.log(result);
    switch (userType) {
        // case 'subscriber':
        //     result.expiredAt = user.expiredAt;
        //     break;
        case 'writer':
            result.pseudonym = user.pseudonym;
            break;
        case 'editor':
            result.categoriesManagement = user.categoriesManagement;
            break;
        case 'administrator':
            result.expiredAt = user.expiredAt;
            break;
        default:
            break;
    }
    
    return result;
}