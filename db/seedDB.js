const urlDatabase = {
  b2xVn2: {
    longURL: 'http://www.youtube.com',
    dateCreated: new Date(2020, 5, 25, 9, 0, 30).toDateString(),
    numVisit: 5,
    visitors: [1, 2, 3],
    logs: [{ visitorId: 1, time: new Date(2020, 5, 25, 10, 33, 30) },
    { visitorId: 1, time: new Date(2020, 5, 25, 11, 33, 30) },
    { visitorId: 2, time: new Date(2020, 5, 25, 12, 21, 44) },
    { visitorId: 1, time: new Date(2020, 5, 25, 13, 15, 55) },
    { visitorId: 3, time: new Date(2020, 5, 25, 14, 45, 22) }],
    userID: 'jdoe',
  },
  b3xVn3: {
    longURL: 'https://www.lighthouselabs.ca',
    dateCreated: new Date(2020, 5, 29, 9, 0, 0).toDateString(),
    numVisit: 2,
    visitors: [2, 3],
    logs: [
      { visitorId: 2, time: new Date(2020, 5, 29, 12, 20, 40) },
      { visitorId: 3, time: new Date(2020, 5, 30, 14, 45, 11) }],
    userID: 'jdoe',
  },
  b4xVn4: {
    longURL: 'https://getbootstrap.com',
    dateCreated: new Date(2020, 6, 2, 13, 20, 30).toDateString(),
    numVisit: 1,
    visitors: [2],
    logs: [
      { visitorId: 2, time: new Date(2020, 6, 2, 15, 10, 17) }],
    userID: 'jdoe',
  },
  '9sm5xK': {
    longURL: 'http://www.google.com',
    dateCreated: new Date(2020, 6, 5, 8, 0, 10).toDateString(),
    numVisit: 3,
    visitors: [1, 2, 3],
    logs: [{ visitorId: 3, time: new Date(2020, 6, 5, 9, 30, 15) },
    { visitorId: 1, time: new Date(2020, 6, 7, 17, 50, 10) },
    { visitorId: 2, time: new Date(2020, 6, 8, 22, 21, 44) }],
    userID: 'adoe',
  },
  '9sm5Aa': {
    longURL: 'https://www.netflix.com',
    dateCreated: new Date(2020, 6, 6, 11, 0, 0).toDateString(),
    numVisit: 0,
    visitors: [],
    logs: [],
    userID: 'adoe',
  },
};

const users = {
  jdoe: {
    id: 'jdoe',
    email: 'jdoe@gmail.com',
    password: '$2b$10$AawHzMEEsondM9PS8jfvWeJjR2TylgH0jvw3mcy7fndvzpY8BvCOi',
  },
  adoe: {
    id: 'adoe',
    email: 'adoe@gmail.com',
    password: '$2b$10$QHrHn1LtMAcOkY5H05HkZ.pOT6hy56vlBh1HyszZBscCMSGBymZjS',
  },
  cbing: {
    id: 'cbing',
    email: 'cbing@gmail.com',
    password: '$2b$10$L0dQRJf0pwM9k0A9wD0TyOEvODw5jdS/TywD.THTBskiuRM8xYgP2',
  },
};

module.exports = {
  urlDatabase,
  users,
};
