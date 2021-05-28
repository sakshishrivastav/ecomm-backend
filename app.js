const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const routes = require('./routes');

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
	interval: '7d', // rotate daily
	path: path.join(__dirname, 'log'),
});
morgan.token('log_fromat', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" - :status - :response-time ms - size :res[content-length]');

const app = express();

app.get('/', (req, res) => {
	res.send({ message: 'HEALTH CHECK OK !' });
});
app.get('/favicon.ico', (req, res) => {
	res.status(204);
	res.end();
});

app.use(morgan('log_fromat', { stream: accessLogStream }));

// Enable CORS for client-side
const cors = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
	);
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};

app.use('/v1', cors, routes);

app.use('*', (req, res) => {
	res.status(500).send('Error');
});

module.exports = app;
