const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Sale = require('./sale')(sequelize, DataTypes);
db.SaleItem = require('./saleItem')(sequelize, DataTypes);
db.InventoryMovement = require('./inventory')(sequelize, DataTypes);

// Relaciones
db.User.hasMany(db.Sale, { foreignKey: 'user_id' });
db.Sale.belongsTo(db.User, { foreignKey: 'user_id' });

db.Sale.hasMany(db.SaleItem, { foreignKey: 'sale_id' });
db.SaleItem.belongsTo(db.Sale, { foreignKey: 'sale_id' });

db.Product.hasMany(db.SaleItem, { foreignKey: 'product_id' });
db.SaleItem.belongsTo(db.Product, { foreignKey: 'product_id' });

db.Product.hasMany(db.InventoryMovement, { foreignKey: 'product_id' });
db.InventoryMovement.belongsTo(db.Product, { foreignKey: 'product_id' });

module.exports = db;
