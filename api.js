const path = require('path');
const Products = require('./products');
const autoCatch = require('./lib/auto-catch');

// Serve index.html
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

// List products with pagination
async function listProducts(req, res) {
  const { offset = 0, limit = 25 } = req.query;

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit)
  });

  res.json(products);
}

// Get a single product
async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);

  if (!product) return next();  // triggers 404 middleware

  res.json(product);
}

// Create a product (fake)
async function createProduct(req, res) {
  console.log('request body:', req.body);
  res.status(201).json(req.body);
}

// Delete a product (fake)
async function deleteProduct(req, res) {
  const { id } = req.params;

  const result = await Products.deleteProduct(id);

  res.status(result.status).json({ message: result.message });
}

// Update a product (fake)
async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;

  const result = await Products.updateProduct(id, data);

  res.status(result.status).json(result);
}

// Export handlers wrapped in autoCatch
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
});
