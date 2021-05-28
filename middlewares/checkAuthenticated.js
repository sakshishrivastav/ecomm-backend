const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const JWT_SECRET = 'sometoken';

const checkAuthenticated = async (req, res, next) => {
	try {
		const token = req.query.token ? req.query.token : req.header('Authorization').replace('Bearer ', '');
		const decode = jwt.verify(token, JWT_SECRET);
		const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
		if (!user) {
			throw new Error('User Not Found');
		}
		user.role = decode.role;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate' });
	}
};
module.exports = checkAuthenticated;
