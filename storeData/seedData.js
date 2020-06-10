// const urlDatabase = {
//     b2xVn2: 'http://www.youtube.com',
//     '9sm5xK': 'http://www.google.com',
// };

const urlDatabase = {
    b2xVn2: { longURL: 'http://www.youtube.com', userID: 'jdoe' },
    '9sm5xK': { longURL: 'http://www.google.com', userID: 'mdoe' },
};

const users = {
    "jdoe": {
        id: "jdoe",
        email: "jdoe@gmail.com",
        password: "jdoe123"
    },
    "mdoe": {
        id: "mdoe",
        email: "mdoe@gmail.com",
        password: "mdoe123"
    },
}

module.exports = {
    urlDatabase,
    users
}