const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080;

// Config
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const urlDatabase = {
  b2xVn2: 'http://www.youtube.com',
  '9sm5xK': 'http://www.google.com',
};

/* HOMEPAGE */
app.get('/', (req, res) => {
  res.send('Hello!');
});

/* LOGIN */
app.post('/login', (req, res) => {
  const option = {
    expires: new Date(Date.now() + 8 * 3600000)
  }
  // set cookie
  res.cookie('username', req.body.username, option);
  res.redirect('/urls');
})

/* LOGOUT */
app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/urls');
})

/* GET all URLS */
app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase, username: req.cookies.username };
  // let templateVars = { urls: urlDatabase };
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
  res.render('urls_new');
});

/* GET single URL by shortURL */
app.get('/urls/:shortURL', (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
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
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  const alphaNumeric = numbers.concat(alphabets);

  let randStr = '';

  for (let i = 0; i < 6; i++) {
    let randNum = Math.floor(Math.random() * alphaNumeric.length);
    randStr += alphaNumeric[randNum];
  }
  return randStr;
}
