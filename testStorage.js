// testUser.js
import User from './models/User.js';

async function test() {
  try {
   
    // 2. ดึง user ทั้งหมดมาเช็ค
    const users = User.getAll();
   

    // 3. หา user ตาม id
    const user = User.findById(users[0].id);
    if (user) {

      // 4. อัพเดตข้อมูล user
      user.email = 'korn.updated@example.com';
      user.update();

      // 5. ลบ user ออกจาก DB
      user.delete();
      console.log('Deleted user:', user.username);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error during test:', error);
  }
}

test();
