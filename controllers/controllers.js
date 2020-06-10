function generateRandomString() {
    const numbers = '1234567890';
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphaNumeric = numbers.concat(alphabets);

    let randStr = '';

    for (let i = 0; i < 6; i++) {
        const randNum = Math.floor(Math.random() * alphaNumeric.length);
        randStr += alphaNumeric[randNum];
    }
    return randStr;
}

function emailLookUp(inputEmail) {
    for (let [id, userInfo] of Object.entries(users)) {
        if (inputEmail === userInfo.email) {
            return userInfo;
        }
    }
}

function authenticateUser({ password }, inputPassword) {
    return (inputPassword === password);
}

module.exports = {
    generateRandomString,
    emailLookUp,
    authenticateUser
}