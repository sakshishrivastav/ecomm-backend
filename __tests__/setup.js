/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoMemoryServer } = require('mongodb-memory-server-global');

module.exports = async () => {
	const mongod = new MongoMemoryServer({
		instance: {
			dbName: 'jest',
		},
		autoStart: false,
	});
	process.env.MONGO_URL = await mongod.getUri();
	global.__MONGOD__ = mongod;
	console.log('Jest Global Setup Complete !');
};
