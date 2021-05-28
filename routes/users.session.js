const router = require('express').Router();
const User = require('../models/Users');

const checkAuthenticated = require('../middlewares/checkAuthenticated');

router.post('/', async (req, res) => {
	const { email, password, role } = req.body;
	const user = await User.findByCredentials(email, password);
	const access = user.roles.includes(role) ? role : undefined;
	const token = await user.generateAuthToken(access);
	res.status(201).send({ user, token });
});

router.delete('/', checkAuthenticated, async (req, res) => {
	res.send('Destroy session');
});

module.exports = router;
