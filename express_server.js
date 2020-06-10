const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// import data
const { urlDatabase, users } = require('./storeData/seedData');

// Config
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* HOMEPAGE */
app.get('/', (req, res) => {
  res.send('Hello!');
});

/* GET login form */
app.get('/login', (req, res) => {
  res.render('login', { user: users[req.cookies.user_id] });
})

/* POST LOGIN */
app.post('/login', (req, res) => {
  let foundUser = emailLookUp(req.body.email, req.body.password);

  if (foundUser) {
    const option = {
      expires: new Date(Date.now() + 8 * 3600000)
    }
    // set cookie
    res.cookie('user_id', foundUser.id, option);
    res.redirect('/urls');
  } else {
    res.send('no user found');
  }
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
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || emailLookUp(email, password)) {
    console.log('shouls not see this');
    console.log(`${foundUser}`);
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


/* GET all URLS */
app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase, user: users[req.cookies.user_id] };
  res.render('urls_index', templateVars);
});

/* POST(CREATE) new URL */
app.post('/urls', (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;

  res.redirect(`/urls/${shortURL}`);
});

/* GET URL creating form */
app.get('/urls/new', (req, res) => {
  res.render('urls_new', { user: users[req.cookies.user_id] });
});

/* GET single URL by shortURL */
app.get('/urls/:shortURL', (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
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
  const longURL = urlDatabase[req.params.shortURL];
  if (urlDatabase[req.params.shortURL]) {
    res.redirect(longURL);

  } else {
    res.send('Error 404. Page not found.');
  }
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

app.get('*', (req, res) => {
  res.send('Error 404. Page not found.');
});

app.listen(PORT, () => {
  console.log(`tinyapp app listening on port ${PORT}!`);
});

function generateRandomString() {
  const numbers = '1234567890';
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphaNumeric = numbers.concat(alphabets);

  let randStr = '';

  for (let i = 0; i < 6; i++) {
    let randNum = Math.floor(Math.random() * alphaNumeric.length);
    randStr += alphaNumeric[randNum];
  }
  return randStr;
}

function emailLookUp(inputEmail, inputPassword) {
  let foundUser;

  for (let [id, userInfo] of Object.entries(users)) {
    if (inputEmail === userInfo.email) {
      foundUser = userInfo;
      break;
    }
  }
  return foundUser;
}