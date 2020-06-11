const express = require('express');
const cookieSession = require('cookie-session');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 8080;

// import controller functions, secret file
const { authenticateUser, generateRandomString, getUserByEmail, urlsForUser } = require('./controllers/controllers');
const { saltRound, secretKey1, secretKey2 } = require('./secret/secret');

// import data
const { urlDatabase, users } = require('./db/seedDB');

// Config template
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: [secretKey1, secretKey2],
}))

/* HOMEPAGE */
app.get('/', (req, res) => {
  const templateVars = { urls: urlDatabase, user: users[req.session.user_id], users };
  res.render('homepage', templateVars);
});

/* GET login form */
app.get('/login', (req, res) => {
  res.render('login', { user: users[req.session.user_id] });
})

/* POST LOGIN */
app.post('/login', (req, res) => {

  const { password, email } = req.body;
  const foundUser = getUserByEmail(email);
  const hasAuthenticated = authenticateUser(foundUser, password);

  // user does not exist OR password is incorrect
  if (!foundUser || !hasAuthenticated) {
    res.status(403).send('ERROR 403: Invalid user.');
    return;
  }

  // set session
  req.session.user_id = foundUser.id;
  res.redirect('/urls');

})

/* POST LOGOUT */
app.post('/logout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/');
})

/* GET register form */
app.get('/register', (req, res) => {
  res.render('register', { user: users[req.session.user_id] });
})

/* POST REGISTER */
app.post('/register', (req, res) => {
  let { email, password } = req.body;

  if (!email || !password || getUserByEmail(email)) {
    res.status(400).send('Error 400');
    return;
  }

  const id = uuidv4();

  password = bcrypt.hashSync(password, saltRound);

  users[id] = {
    id,
    email,
    password
  }

  // set session
  req.session.user_id = id;
  res.redirect('/urls');

})


/* GET user's URLS */
app.get('/urls', (req, res) => {
  const userId = req.session.user_id;
  if (userId) {
    const userURLS = urlsForUser(userId);
    const templateVars = { urls: userURLS, user: users[userId] };
    res.render('urls_index', templateVars);
    return;
  }
  res.status(401).render('page401', { user: null });

});

/* POST(CREATE) new URL */
app.post('/urls', (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = { longURL, dateCreated: new Date().toDateString(), numVisit: 0, userID: req.session.user_id };

  res.redirect(`/urls/${shortURL}`);
});

/* GET urlDatabase json */
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

/* GET users json */
app.get("/users.json", (req, res) => {
  res.json(users);
});

/* GET URL creating form */
app.get('/urls/new', (req, res) => {
  if (req.session.user_id) {
    res.render('urls_new', { user: users[req.session.user_id] });
    return;
  }
  res.redirect('/login');

});

/* GET single URL by shortURL */
app.get('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const userId = req.session.user_id;

  // if no shortURL
  if (!urlDatabase[shortURL]) {
    res.status(404).render('page404', { user: users[req.session.user_id] });
  }

  if (userId === urlDatabase[shortURL].userID) {
    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[shortURL].longURL,
      user: users[req.session.user_id]
    };
    res.render('urls_show', templateVars);
    return;
  }

  res.status(403).render('page403', { user: users[userId] });
});

/* UPDATE(POST) URL */
app.post('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const userId = req.session.user_id;

  if (userId === urlDatabase[shortURL].userID) {
    const longURL = req.body.longURL;
    urlDatabase[shortURL].longURL = longURL;
    res.redirect(`/urls/${shortURL}`);
    return;
  }
  res.status(403).send('[Error 403] Sorry! You do not have permission to update the URL.');
})

/* GET shortURL and REDIRECT  */
app.get('/u/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  if (!urlDatabase[shortURL]) {
    urlDatabase[shortURL].numVisit++;
    res.redirect(longURL);
    return;
  }
  res.status(404).render('page404', { user: users[req.session.user_id] });
});

/* DELETE(POST) url */
app.post('/urls/:shortURL/delete', (req, res) => {
  const shortURL = req.params.shortURL;
  const userId = req.session.user_id;

  if (userId === urlDatabase[shortURL].userID) {
    delete urlDatabase[req.params.shortURL];
    res.redirect('/urls');
    return;
  }
  res.status(403).send('[Error 403] Sorry! You do not have permission to delete the URL.');
})

app.get('*', (req, res) => {
  res.render('page404', { user: users[req.session.user_id] });
});

app.listen(PORT, () => {
  console.log(`tinyapp app listening on port ${PORT}!`);
});