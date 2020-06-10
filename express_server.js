const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// import controller functions
const { authenticateUser, generateRandomString, emailLookUp, urlsForUser } = require('./controllers/controllers');

// import data
const { urlDatabase, users } = require('./db/seedDB');

// Config template
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* HOMEPAGE */
app.get('/', (req, res) => {
  res.render('urls_index!');
});

/* GET login form */
app.get('/login', (req, res) => {
  res.render('login', { user: users[req.cookies.user_id] });
})

/* POST LOGIN */
app.post('/login', (req, res) => {

  const { password, email } = req.body;
  const foundUser = emailLookUp(email);
  const hasAuthenticated = authenticateUser(foundUser, password);

  // user does not exist OR password is incorrect
  if (!foundUser || !hasAuthenticated) {
    res.status(403).send('ERROR 403: Invalid user.');
  }
  const cookieExpOption = {
    expires: new Date(Date.now() + 8 * 3600000)
  }
  // set cookie
  res.cookie('user_id', foundUser.id, cookieExpOption);
  res.redirect('/urls');
})

/* POST LOGOUT */
app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/urls');
})

/* GET register form */
app.get('/register', (req, res) => {
  res.render('register', { user: users[req.cookies.user_id] });
})

/* POST REGISTER */
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || emailLookUp(email)) {
    res.status(400).send('Error 400');
  }

  let id = uuidv4();

  users[id] = {
    id,
    email,
    password
  }
  // set cookie
  const option = {
    expires: new Date(Date.now() + 8 * 3600000)
  }
  res.cookie('user_id', id, option);
  res.redirect('/urls');
})


/* GET user's URLS */
app.get('/urls', (req, res) => {
  const userId = req.cookies.user_id;
  if (userId) {
    const userURLS = urlsForUser(userId);
    const templateVars = { urls: userURLS, user: users[userId] };
    res.render('urls_index', templateVars);
  }
  res.status(401).render('page401', { user: null });
});

/* POST(CREATE) new URL */
app.post('/urls', (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = { longURL, userID: req.cookies.user_id };

  res.redirect(`/urls/${shortURL}`);
});

/* GET URL creating form */
app.get('/urls/new', (req, res) => {
  if (req.cookies.user_id) {
    res.render('urls_new', { user: users[req.cookies.user_id] });
  }
  res.redirect('/login');
});

/* GET single URL by shortURL */
app.get('/urls/:shortURL', (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL].longURL,
    user: users[req.cookies.user_id]
  };
  if (templateVars.longURL) {
    res.render('urls_show', templateVars);
  } else {
    res.send('Error 404. Page not found.');
  }
});

/* GET shortURL and REDIRECT  */
app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  if (!urlDatabase[req.params.shortURL]) {
    res.redirect(longURL);
  }
  res.status(404).send('Error 404. Page not found.');
});

/* UPDATE(POST) URL */
app.post('/urls/:shortURL', (req, res) => {
  const longURL = req.body.longURL;
  urlDatabase[req.params.shortURL] = longURL;
  res.redirect(`/urls/${req.params.shortURL}`);
})

/* DELETE(POST) url */
app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
})

app.get('/page401', (req, res) => {
  res.render('page401', { user: null })
})

app.get('*', (req, res) => {
  res.send('Error 404. Page not found.');
});

app.listen(PORT, () => {
  console.log(`tinyapp app listening on port ${PORT}!`);
});