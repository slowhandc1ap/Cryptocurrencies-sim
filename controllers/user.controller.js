import User from '../models/User.js';
import db from '../config/storage.js';

// GET /users
export async function getAllUsers(req, res) {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to get users' });
  }
}

// POST /users
export async function addUserController(req, res) {
  try {
    const userData = req.body;
    const user = new User(userData);
    const result = await User.add(user);
    delete result.password;
    res.status(201).json({ message: 'User added successfully', result: result });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to add user' });
  }
}

// GET /:user_id
export async function getUserByIdController(req, res) {
  try {
    const user = await User.findById(req.params.user_id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to get user' });
  }
}
//Patt /:user_id
export async function updateUserById(req,res) {
  try {
    const user = req.body
    const userId = req.params.user_id

    const updateUser = {
      id: userId,
      ...user
    };

    const result = await User.update(updateUser)

    if (result.changes === 0){
      return res.status(404).json({message : "User not found or not changes made"})
    }
    res.status(200).json({message: 'User update successfully', user: updateUser})

  } catch (error) {
    
  }
}

// DELETE /:user_id
export async function deleteUserController(req, res) {
  try {
    const user_id = req.params.user_id;

    const userStmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = userStmt.get(user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.delete(user_id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete user' });
  }
}
