const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer();
const image = Joi.string().uri();
const description = Joi.string().max(200);
const available = Joi.boolean();
const stock = Joi.number().integer();
const isBlock = Joi.boolean();
const categories = Joi.array().items(Joi.string().max(50));

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	image: image,
	description: description,
	available: available,
	stock: stock,
	isBlock: isBlock,
	categories: categories
});

const updateProductSchema = Joi.object({
	name: name,
	price: price,
	image: image,
	description: description,
	stock: stock,
	isBlock: isBlock,
	categories: categories
});

const getProductSchema = Joi.object({
	id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };