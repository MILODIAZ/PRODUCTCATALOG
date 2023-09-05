const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductsService {

	constructor() {
		this.products = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.products.push({
				id: faker.string.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.url(),
				available: faker.datatype.boolean(),
				description: faker.commerce.productDescription(),
				stock: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
				isBlock: faker.datatype.boolean(),
				categories: [faker.commerce.productAdjective()]
			})
		}
	}

	async create(data) {
		const newProduct = {
			id: faker.string.uuid(),
			...data
		}
		this.products.push(newProduct);
		return newProduct;
	}

	async find() {
		const rta = await models.Product.findAll();
		return rta;
	}

	async findOne(id) {
		const product = this.products.find(item => item.id === id);
		if (!product) {
			throw boom.notFound('Product not found');
		} else if (product.isBlock) {
			throw boom.conflict('Product is block');
		}
		return product;
	}

	async update(id, changes) {
		const index = this.products.findIndex(item => item.id === id);
		if (index === -1) {
			throw boom.notFound('Product not found');
		}
		const product = this.products[index];
		this.products[index] = {
			...product,
			...changes
		};
		return this.products[index];
	}

	async delete(id) {
		const index = this.products.findIndex(item => item.id === id);
		if (index === -1) {
			throw boom.notFound('Product not found');
		}
		this.products.splice(index, 1);
		return { id };
	}

}

module.exports = ProductsService;