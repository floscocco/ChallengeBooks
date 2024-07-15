const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');


app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});

const homeRoutes= require('./routes/home.routes');
app.use('/', homeRoutes);

const productRoutes = require('./routes/products.routes');
app.use('/books', productRoutes);

const userRoutes = require('./routes/users.routes');
app.use('/users', userRoutes);