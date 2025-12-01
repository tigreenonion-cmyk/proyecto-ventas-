module.exports = (sequelize, DataTypes) => {
  const InventoryMovement = sequelize.define('InventoryMovement', {
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    change: { type: DataTypes.INTEGER, allowNull: false },
    reason: { type: DataTypes.STRING }
  }, {
    tableName: 'inventory_movements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return InventoryMovement;
};
