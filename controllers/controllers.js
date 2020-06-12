// get bcrypt package
const bcrypt = require('bcrypt');

// import data
const { urlDatabase, users } = require('../db/seedDB');

// check if password inputted in login form is correct
function authenticateUser({ password }, inputPassword) {
  return bcrypt.compareSync(inputPassword, password);
}

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

// check DB if user exists
function getUserByEmail(inputEmail) {
  for (let [id, userInfo] of Object.entries(users)) {
    if (inputEmail === userInfo.email) {
      return userInfo;
    }
  }
  return undefined;
}

// get user's urls with user id
function urlsForUser(id) {
  const urls = {};
  for (let [shortURL, url] of Object.entries(urlDatabase)) {
    if (url.userID === id) {
      urls[shortURL] = url;
    }
  }

  return urls;
}

// A very bad method to generate visitorId, but it works for a tiny app
function generateVisitorId() {
  return Math.floor(Math.random() * (100000 - 4)) + 4;
}

module.exports = {
  authenticateUser,
  generateRandomString,
  getUserByEmail,
  urlsForUser,
  generateVisitorId
};
