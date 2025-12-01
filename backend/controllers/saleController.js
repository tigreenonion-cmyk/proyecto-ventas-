const db = require('../models');
const Sale = db.Sale;
const SaleItem = db.SaleItem;
const Product = db.Product;
const InventoryMovement = db.InventoryMovement;

exports.createSale = async (req, res) => {
  const { items } = req.body; // items = [{productId, quantity}]
  if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Items vacíos' });

  // calcular total y validar stock
  let total = 0;
  for (const it of items) {
    const product = await Product.findByPk(it.productId);
    if (!product) return res.status(404).json({ error: `Producto ${it.productId} no encontrado` });
    if (product.stock < it.quantity) return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });
    total += parseFloat(product.price) * parseInt(it.quantity);
  }

  // crear venta
  const sale = await Sale.create({ user_id: req.user?.id || null, total });

  // crear items y descontar stock
  for (const it of items) {
    const product = await Product.findByPk(it.productId);
    await SaleItem.create({ sale_id: sale.id, product_id: product.id, quantity: it.quantity, price: product.price });
    // descontar stock
    product.stock -= it.quantity;
    await product.save();
    await InventoryMovement.create({ product_id: product.id, change: -it.quantity, reason: `Venta ${sale.id}` });
  }

  res.json({ saleId: sale.id, total });
};

exports.listSales = async (req, res) => {
  const sales = await Sale.findAll({ include: [{ model: SaleItem, include: [Product] }], order:[['created_at','DESC']]});
  res.json(sales);
};
