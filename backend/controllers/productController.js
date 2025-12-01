const db = require('../models');
const Product = db.Product;
const InventoryMovement = db.InventoryMovement;

exports.list = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.create = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const p = await Product.create({ name, description, price, stock });
  if (stock && stock !== 0) {
    await InventoryMovement.create({ product_id: p.id, change: stock, reason: 'Inicial' });
  }
  res.json(p);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const p = await Product.findByPk(id);
  if (!p) return res.status(404).json({ error: 'Producto no encontrado' });

  // si cambió stock, registrar movimiento
  if (typeof stock === 'number' && stock !== p.stock) {
    const change = stock - p.stock;
    await InventoryMovement.create({ product_id: p.id, change, reason: 'Ajuste' });
    p.stock = stock;
  }

  p.name = name ?? p.name;
  p.description = description ?? p.description;
  p.price = price ?? p.price;
  await p.save();
  res.json(p);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.json({ success: true });
};
