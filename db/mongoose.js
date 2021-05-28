const mongoose = require('mongoose');

const mongoDbURI = 'mongodb+srv://sakshishrivastav:zqwjNRjLBQn@g6U@cluster0.w46xk.mongodb.net/ecommerce_App?authSource=admin&replicaSet=atlas-14vqgs-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};
mongoose.connect(mongoDbURI, options);

mongoose.connection.on('connected', () => {
	console.log('Mongoose default connection');
});

mongoose.connection.on('error', (err) => {
	console.log(`Mongoose default connection has occured ${err} error`);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose default connection is disconnected due to application termination');
		process.exit(0);
	});
});
