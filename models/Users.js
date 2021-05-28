/* eslint-disable func-names */
const mongoose = require('mongoose');
const yup = require('yup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sometoken';

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: (v) => yup.string().min(3).validate(v),
			message: (props) => props.message,
		},
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: (v) => yup.string().min(3).validate(v),
			message: (props) => props.message,
		},
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
		required: true,
		validate: {
			validator: (v) => yup.string().email().validate(v),
			message: (props) => props.message,
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		trim: true,
	},
	roles: {
		type: [String],
		required: true,
		enum: ['user', 'admin'],
		default: 'user',
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.statics.findByCredentials = async function (email, password) {
	const User = this;
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Unable to login');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Unable to login');
	}
	return user;
};

userSchema.methods.generateAuthToken = async function (role = 'user') {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString(), role }, JWT_SECRET);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

// no async
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.tokens;
	delete userObject.password;
	delete userObject.__v;
	delete userObject._id;
	return userObject;
};

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
