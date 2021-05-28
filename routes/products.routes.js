const router = require('express').Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => {
	try {
		const product = new Product(req.body);
		await product.save();
		return res.status(201).send({ product });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});
router.get('/', async (req, res) => {
	try {
		const limit = req.query.limit || 0;
		const skip = req.query.skip || 0;
		const products = await Product.find()
			.limit(parseInt(limit, 10))
			.skip(parseInt(skip, 10));
		return res.status(201).send({ products });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

module.exports = router;
