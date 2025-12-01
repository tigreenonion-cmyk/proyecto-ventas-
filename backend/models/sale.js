module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    total: { type: DataTypes.DECIMAL(12,2), allowNull: false }
  }, {
    tableName: 'sales',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Sale;
};
