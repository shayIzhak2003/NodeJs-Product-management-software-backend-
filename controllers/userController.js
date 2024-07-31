const fs = require('fs');
const jwt = require('jsonwebtoken');

const readJSONFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const loginUser = (req, res) => {
  const users = readJSONFile('users.json');
  const { username, password } = req.body;
 

  const user = users.find(user => user.username === username && user.password === password);

 
  if (user) {
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
 
};

module.exports = { loginUser };
