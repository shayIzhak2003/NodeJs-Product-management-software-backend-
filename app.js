const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logRequest = require('./middlewares/requestLogger'); // Adjust the path as needed
const productRoutes = require('./routes/productRoutes'); // Adjust the path as needed
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(cors()); // Add this line
app.use(bodyParser.json());
app.use(logRequest);

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
