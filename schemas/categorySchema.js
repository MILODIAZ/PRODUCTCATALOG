const Joi = require('joi');

const name = Joi.string().max(50);
const isBlock = Joi.boolean();
const products = Joi.array().items(Joi.string().uuid());


const createCategorySchema = Joi.object({
	name: name.required(),
	isBlock: isBlock,
	products: products

});

const updateCategorySchema = Joi.object({
	name: name,
	isBlock: isBlock,
	products: products

});

const getCategorySchema = Joi.object({
	name: name.required()
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };