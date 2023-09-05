const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomeErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = 3001;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://192.168.1.132:5173'];
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('CORS not allowed'));
		}
	}
}
app.use(cors(options));

app.get('/', (req, res) => {
	res.send('Server para Catálogo de Productos');
});

app.get('/new-endpoint', (req, res) => {
	res.send('new-endpoint');
});

routerApi(app);

app.use(logErrors);
app.use(boomeErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
	console.log('Dev! (delete this consoleLog in production)');
});