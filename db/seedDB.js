const urlDatabase = {
    b2xVn2: { longURL: 'http://www.youtube.com', userID: 'jdoe' },
    b3xVn3: { longURL: 'https://www.lighthouselabs.ca', userID: 'jdoe' },
    b4xVn4: { longURL: 'https://getbootstrap.com', userID: 'jdoe' },
    '9sm5xK': { longURL: 'http://www.google.com', userID: 'adoe' },
    '9sm5Aa': { longURL: 'https://www.netflix.com', userID: 'adoe' },
};

const users = {
    "jdoe": {
        id: "jdoe",
        email: "jdoe@gmail.com",
        password: "$2b$10$AawHzMEEsondM9PS8jfvWeJjR2TylgH0jvw3mcy7fndvzpY8BvCOi"
    },
    "adoe": {
        id: 'adoe',
        email: 'adoe@gmail.com',
        password: '$2b$10$QHrHn1LtMAcOkY5H05HkZ.pOT6hy56vlBh1HyszZBscCMSGBymZjS'
    },
    "cbing": {
        id: 'cbing',
        email: 'cbing@gmail.com',
        password: '$2b$10$L0dQRJf0pwM9k0A9wD0TyOEvODw5jdS/TywD.THTBskiuRM8xYgP2'
    }
}

module.exports = {
    urlDatabase,
    users
}