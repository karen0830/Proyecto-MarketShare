import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
let products = JSON.parse(localStorage.getItem("Products"));
if (products) {
	products.forEach(element => {
		mockApi.components.examples.ecommerce_products.value.push(element)
	});
}
let productsDB = mockApi.components.examples.ecommerce_products.value;
let ordersDB = mockApi.components.examples.ecommerce_orders.value;
// let products = JSON.parse(localStorage.getItem("Products")) || [];
// if (products.length > 0) {
// 	products.forEach(element => {
// 		productsDB.push(
// 			{
// 				"id": element.id,
// 				"name": element.name,
// 				"handle": "",
// 				"description": "Duis anim est non exercitation consequat. Ullamco ut ipsum dolore est elit est ea elit ad fugiat exercitation. Adipisicing eu ad sit culpa sint. Minim irure Lorem eiusmod minim nisi sit est consectetur.",
// 				"categories": [],
// 				"featuredImageId": "2",
// 				"images": [
// 					{
// 						"id": "0",
// 						"url": element.img,
// 						"type": "image"
// 					}
// 				],
// 				"priceTaxExcl": element.price,
// 				"priceTaxIncl": element.price,
// 				"taxRate": 10,
// 				"comparedPrice": 29.9,
// 				"quantity": 92,
// 				"sku": "A445BV",
// 				"width": "22cm",
// 				"height": "24cm",
// 				"depth": "15cm",
// 				"weight": "3kg",
// 				"extraShippingFee": 3,
// 				"active": true
// 			},
// 		)
// 		return [200, productsDB];
// 	});
// }
export const eCommerceApiMocks = (mock) => {
	mock.onGet('/ecommerce/products').reply(() => {
		return [200, productsDB];
	});
	mock.onPost('/ecommerce/products').reply(({ data }) => {
		const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
		productsDB.unshift(newProduct);
		return [200, newProduct];
	});
	mock.onDelete('/ecommerce/products').reply(({ data }) => {
		const ids = JSON.parse(data);
		productsDB = productsDB.filter((item) => !ids.includes(item.id));
		return [200, productsDB];
	});
	mock.onGet('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params;
		console.log("kjfdg", productsDB);

		let productFound = null;

		productsDB.forEach(product => {
			if (product.id == id) {
				console.log("existe");
				productFound = product;
			}
		});

		if (productFound) {
			console.log("p", productFound);
			return [200, productFound];
		}

		return [404, 'Requested product does not exist.'];
	});

	mock.onPut('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params;
		const newData = JSON.parse(config.data);
		let updatedProduct = null;
		productsDB.forEach((product, index) => {
			if (product.id == id) {
				productsDB[index] = { ...product, ...newData };
				updatedProduct = productsDB[index];
			}
		});
		return updatedProduct ? [200, updatedProduct] : [404, 'Product not found'];
	});
	
	mock.onDelete('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params;
		let deletedProductId = null;
		productsDB.forEach((product, index) => {
			if (product.id == id) {
				productsDB.splice(index, 1);
				deletedProductId = id;
			}
		});
		return deletedProductId ? [200, deletedProductId] : [404, 'Product not found'];
	});
	
	mock.onGet('/ecommerce/orders').reply(() => {
		return [200, ordersDB];
	});
	mock.onPost('/ecommerce/orders').reply((config) => {
		const newOrder = { id: FuseUtils.generateGUID(), ...JSON.parse(config.data) };
		ordersDB.push(newOrder);
		return [200, newOrder];
	});
	mock.onDelete('/ecommerce/orders').reply((config) => {
		const ids = JSON.parse(config.data);
		ordersDB = ordersDB.filter((item) => !ids.includes(item.id));
		return [200, ordersDB];
	});
	mock.onGet('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params;
		const order = _.find(ordersDB, { id });

		if (order) {
			return [200, order];
		}

		return [404, 'Requested order do not exist.'];
	});
	mock.onPut('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params;
		_.assign(_.find(ordersDB, { id }), JSON.parse(config.data));
		return [200, _.find(ordersDB, { id })];
	});
	mock.onDelete('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params;
		_.remove(ordersDB, { id });
		return [200, id];
	});
};
