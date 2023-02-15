const express = require('express');
const { port } = require('./config');

const cookieParser = require('cookie-parser');
const app = express();
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');

const session = require('express-session');
const cors = require('cors');
require('./db/mongoose');
const initAuthentication = require('./authenitcation');

const oneDay = 1000 * 60 * 60 * 24;
const path = require('path');

app.use(cookieParser());
app.use(
    session({
        //secret: process.env.SESSION_SECRET,
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: oneDay, secure: false },
    })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
initAuthentication(app);
app.use('/', apiRouter);

app.listen(port, () => {
    console.log('Listen on port ' + port);
});
