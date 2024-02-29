const bcrypt = require('bcrypt');
const { userCollection } = require('../utils/Database');
const fileUp = require('../utils/filup');
const userSchema = require('../Schemas/userSchema');

const createUser = async (req, res) => {
  try {
    const userRequired = new Set(['name', 'email', 'password', 'role']);
    const isValid = Object.keys(req.body).every((key) => userRequired.has(key));
    if (!isValid) return res.status(400).send({ reason: 'Bad Request' });
    const email = req.body.email;
    const userExists = await userSchema.findOne({ email });
    if (userExists) return res.status(409).send({ reason: 'User already exists' });
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = await fileUp(req.files.photo.path);
    req.body.photo = photo;
    req.body.password = hashedPassword;

    const result = await userSchema.create(req.body);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find({}, { password: 0 });
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
}

const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await userSchema.findOne({ email }, { password: 0 });
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
}

module.exports = { createUser, getUsers, getUserByEmail };
