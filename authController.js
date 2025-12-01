const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const secret = process.env.JWT_SECRET || 'un_secret_super_seguro';

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.create({ username, password, role });
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id','username','role'] });
  res.json(user);
};
