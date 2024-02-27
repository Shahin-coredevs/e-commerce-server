const bcrypt = require('bcrypt');
const { userCollection } = require('../utils/Database');
const fileUp = require('../utils/filup');

async function createUser(req, res) {
  const { name, email, password } = JSON.parse(req.body.data)
  try {
    const userExists = await userCollection.findOne({ email })
    if (userExists) return res.status(409).send('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = await fileUp(req.files.photo.path)
    const user = { name, email, photo, password: hashedPassword };
    const result = await userCollection.insertOne(user);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
}

async function getUsers(req, res) {
  try {
    const users = await userCollection.find({}, { projection: { password: 0 } }).toArray();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
}

async function getUserByEmail(req, res) {
  const email = req.params.email;
  try {
    const user = await userCollection.findOne({ email }, { projection: { password: 0 } });
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
}

module.exports = { createUser, getUsers, getUserByEmail };
