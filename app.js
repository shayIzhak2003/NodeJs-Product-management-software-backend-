const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module
const logRequest = require('./middlewares/requestLogger'); // Adjust the path as needed
const productRoutes = require('./routes/productRoutes'); // Adjust the path as needed
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(logRequest);

// Serve the users.json file
const usersJson = path.join(__dirname, 'users.json'); 

app.get('/api/users/file', (req, res) => {
  res.sendFile(usersJson);
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
