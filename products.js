const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

/**
 * List all products
 * Supports: limit, offset
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25 } = options
  const data = await fs.readFile(productsFile)

  return JSON.parse(data).slice(offset, offset + limit)
}

/**
 * Get a single product by ID
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile))

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }

  return null
}

/**
 * "Delete" a product (fake delete)
 * Just logs and returns a 202 response
 */
async function deleteProduct(id) {
  console.log(`Product ${id} deleted`)
  
  return {
    status: 202,
    message: `Product ${id} deleted`
  }
}

/**
 * "Update" a product (fake update)
 * Logs and returns a 200 response
 */
async function updateProduct(id, data) {
  console.log(`Product ${id} updated with:`, data)

  return {
    status: 200,
    message: `Product ${id} updated`,
    data
  }
}

module.exports = {
  list,
  get,
  deleteProduct,
  updateProduct
}
