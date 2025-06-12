import User from '../models/User.js';

export async function getAllUsers() {
  return User.getAll();
}

export async function addUser(userData) {
  const user = new User(userData);
  User.add(user);
}
export async function deleteUser(user_id) {
  return User.delete();
}
