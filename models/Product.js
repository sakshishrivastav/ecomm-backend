const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	brand: {
		type: String,
		required: true,
		trim: true,
	},
	images: {
		type: [String],
		required: true,
	},
	primary_image: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	size: {
		type: [String],
		required: true,
	},
	colors: {
		type: [String],
	},
	outOfStock: {
		type: Boolean,
		required: true,
	},
	onsale: {
		type: Boolean,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	categories: {
		type: String,
		required: true,
	},
	labels: {
		type: [String],
	},
	tags: {
		type: [String],
	},
	keywords: {
		type: [String],
		required: true,
	},
	price: {
		usd: {
			type: Number,
			required: true,
		},
		inr: {
			type: Number,
			required: true,
		},
		adjustment: {
			type: {
				type: String,
				required: true,
			},
			value: {
				type: Number,
				required: true,
			},
		},
		min_base: {
			usd: {
				type: Number,
				required: true,
			},
			inr: {
				type: Number,
				required: true,
			},
		},
	},
});

const Products = mongoose.model('Products', productSchema);
module.exports = Products;
