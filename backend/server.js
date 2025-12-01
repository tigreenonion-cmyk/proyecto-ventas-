require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await db.sequelize.sync({ alter: false }); // cambiar a { force: true } si quieres recrear tablas
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();
