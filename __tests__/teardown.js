/* eslint-disable no-console */
module.exports = async () => {
	await global.__MONGOD__.stop();
	if (!global.__MONGOD__.getInstanceInfo()) console.log('MongoDB Shutdown Complete');
	console.log('Tear Down Complete');
};
