const express = require('express');
const { port } = require('./config');
const app = express();
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/mongoose');
const initAuthentication = require('./authenitcation');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', apiRouter);
initAuthentication(app);
app.listen(port, () => {
    console.log('Listen on port ' + port);
});
