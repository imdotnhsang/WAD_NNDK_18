module.exports = () => {
    const OTPCode = 100000 + new Date().getTime() % 900000;
    const OTP = {
        code: OTPCode,
        expiredAt: new Date().getTime() + 60000 * 5 // expire in 5m
    }

    return OTP;
}