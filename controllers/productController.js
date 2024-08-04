const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



const readJSONFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const ensureArchiveDirectory = () => {
  const archiveDir = path.join(__dirname, 'archive');
  const archiveFile = path.join(archiveDir, 'archive.json');
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir);
  }
  if (!fs.existsSync(archiveFile)) {
    writeJSONFile(archiveFile, []);
  }
};

const addProduct = (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const products = readJSONFile('products.json');
  const newProduct = { id: uuidv4(), ...req.body, createdAt: new Date(), updatedAt: new Date() };

  products.push(newProduct);
  writeJSONFile('products.json', products);
  res.status(201).json(newProduct);
};

const getProduct = (req, res) => {
  const products = readJSONFile('products.json');
  if (req.params.id) {
    const product = products.find(p => p.id === req.params.id);
    return res.json(product || { message: 'Product not found' });
  }
  res.json(products);
};

const updateProduct = (req, res) => {
  const products = readJSONFile('products.json');
  const index = products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body, updatedAt: new Date() };
    writeJSONFile('products.json', products);
    return res.json(products[index]);
  }
  res.status(404).json({ message: 'Product not found' });
};

const deleteProduct = (req, res) => {
  const products = readJSONFile('products.json');
  const index = products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    const [deletedProduct] = products.splice(index, 1);
    ensureArchiveDirectory();
    const archive = readJSONFile('archive/archive.json');
    archive.push(deletedProduct);
    writeJSONFile('archive/archive.json', archive);
    writeJSONFile('products.json', products);
    return res.json({ message: 'Product deleted and archived' });
  }
  res.status(404).json({ message: 'Product not found' });
};

module.exports = { addProduct, getProduct, updateProduct, deleteProduct };
