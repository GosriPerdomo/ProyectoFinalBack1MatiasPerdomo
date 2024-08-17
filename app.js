const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./db/db');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/carts');

const app = express();
app.use(express.json());

//configurar Handlebars
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: false
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});







