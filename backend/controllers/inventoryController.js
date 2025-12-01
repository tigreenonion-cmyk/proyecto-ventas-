const db = require('../models');
const InventoryMovement = db.InventoryMovement;

exports.listMovements = async (req, res) => {
  const movements = await InventoryMovement.findAll({ order: [['created_at','DESC']] });
  res.json(movements);
