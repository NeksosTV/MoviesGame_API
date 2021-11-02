const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./connection/dbConnect');
const dbConfig = require('./connection/dbConfig');

const cors = require('cors');




const app = express();
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//Enable cors
app.use(cors());
app.use(express.json());
const routes = require('./routes/routes')(app);


const server = app.listen(port,
    () => {
        console.log('le serveur écoute les requetes de port %s',port);
        dbConnect(dbConfig.pivdatabase);
        dbConnect(dbConfig.Webdatabase);
    });