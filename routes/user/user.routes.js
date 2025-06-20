import express from 'express';
import {
  getAllUsers,
  addUserController,
  getUserByIdController,
  deleteUserController,
  updateUserById,
  
} from '../../controllers/user/user.controller.js';
import validateRegister from '../../middleware/user.middleware.js';

const router = express.Router();

router.get('/', getAllUsers);
// Route POST /users เพิ่ม user (ตรวจสอบข้อมูลก่อน)
router.post('/', validateRegister, addUserController);
// update User
router.put('/:user_id', updateUserById)
router.get('/:user_id', getUserByIdController);
router.delete('/:user_id', deleteUserController);

export default router;
