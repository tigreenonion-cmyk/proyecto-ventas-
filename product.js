module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Product;
};
