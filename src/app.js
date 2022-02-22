const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const cors = require('cors');

const { jsonError } = require('./middlewares/error');
const corsConfig = require('./config/cors.json');


const app = express();

// ====================== // Middlewares // ======================

app.use(cors(corsConfig)); // * Cors *

app.use(express.json());
app.use(morgan("dev")); // * Morgan Logs*

app.use(jsonError);

app.use(routes);


module.exports = app;