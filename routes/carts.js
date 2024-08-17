const express = require('express');
const router = express.Router();
const cartDao = require('../dao/cart.dao');

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  const result = await cartDao.create();
  res.status(201).json(result);
});

// Agregar producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const result = await cartDao.addProduct(cid, pid, quantity);

  if (result.status === 'success') {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Obtener todos los carritos
router.get('/', async (req, res) => {
  const result = await cartDao.findAll();
  res.status(200).json({ status: 'success', payload: result });
});

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const result = await cartDao.findById(cid);

  if (result) {
    res.status(200).json({ status: 'success', payload: result });
  } else {
    res.status(404).json({ status: 'error', message: 'Cart not found' });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const result = await cartDao.updateProductQuantity(cid, pid, quantity);

  if (result.status === 'success') {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  const result = await cartDao.removeProduct(cid, pid);

  if (result) {
    res.status(200).json({ status: 'success', message: 'Product removed from cart' });
  } else {
    res.status(404).json({ status: 'error', message: 'Cart not found' });
  }
});

// Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  const result = await cartDao.clear(cid);

  if (result) {
    res.status(200).json({ status: 'success', message: 'Cart cleared' });
  } else {
    res.status(404).json({ status: 'error', message: 'Cart not found' });
  }
});

module.exports = router;




