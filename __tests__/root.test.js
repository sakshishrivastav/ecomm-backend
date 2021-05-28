/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
	await mongoose.connect(
		process.env.MONGO_URL,
		{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
		(err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		},
	);
	console.log('MongoDB Connected ! ');
});

afterAll(async () => {
	await mongoose.connection.close();
	console.log('MongoDB Connection closed !');
});

describe('Test the root path', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(200);
	});
});
