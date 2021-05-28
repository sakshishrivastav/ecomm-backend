const router = require('express').Router();
const User = require('../models/Users');

const checkAuthenticated = require('../middlewares/checkAuthenticated');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', checkAuthenticated, isAdmin, async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).send({ users });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const {
			email, password, firstname, lastname,
		} = req.body;
		const user = new User({
			email, password, firstname, lastname,
		});
		await user.save();
		const token = await user.generateAuthToken();
		return res.status(201).send({ user, token });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

router.delete('/:id', checkAuthenticated, isAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const users = await User.findByIdAndRemove(id);
		return res.status(200).send({ users });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

router.get('/profile', checkAuthenticated, async (req, res) => res.status(200).send(req.user));

router.patch('/profile', checkAuthenticated, async (req, res) => {
	res.send('Update user', req.body);
});

module.exports = router;
