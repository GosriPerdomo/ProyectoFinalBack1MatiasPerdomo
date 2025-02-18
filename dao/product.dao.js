const Product = require('../models/product');

const create = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const findAll = async ({ limit, page, sort, query }) => {
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { price: sort === 'desc' ? -1 : 1 }
  };

  const queryObj = query ? { category: query } : {};
  
  const result = await Product.paginate(queryObj, options);

  return {
    status: 'success',
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
    nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
  };
};

const findById = async (id) => {
  return await Product.findById(id);
};

const deleteProduct = async (id) => {
  const result = await Product.findByIdAndDelete(id);
  return result !== null;
};

module.exports = {
  create,
  findAll,
  findById,
  deleteProduct
};




