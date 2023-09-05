const express = require('express');

const CategoryService = require('./../services/categoryService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/categorySchema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res) => {
	const categories = await service.find();
	res.json(categories);
});

router.get('/:name',
	validatorHandler(getCategorySchema, 'params'),
	async (req, res, next) => {
		try {
			const { name } = req.params;
			const category = await service.findOne(name);
			res.json(category);
		} catch (error) {
			next(error);
		}
	});

router.post('/',
	validatorHandler(createCategorySchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newCategory = await service.create(body);
			res.status(201).json(newCategory);
		} catch (error) {
			next(error);
		}
	});

router.patch('/:name',
	validatorHandler(getCategorySchema, 'params'),
	validatorHandler(updateCategorySchema, 'body'),
	async (req, res, next) => {
		try {
			const { name } = req.params;
			const body = req.body;
			const category = await service.update(name, body);
			res.json(category);
		} catch (error) {
			next(error);
		}
	});

router.delete('/:name',
	validatorHandler(getCategorySchema, 'params'),
	async (req, res, next) => {
		try {
			const { name } = req.params;
			const rta = await service.delete(name);
			res.json(rta);
		} catch (error) {
			next(error);
		}
	});

module.exports = router;