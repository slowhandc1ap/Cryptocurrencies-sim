// testUser.js
import User from './models/User.js';

async function test() {
  try {
   
    // 2. ดึง user ทั้งหมดมาเช็ค
    const users = User.getAll();
    console.log('All users:', users);

    // 3. หา user ตาม id
    const user = User.findById(users[0].id);
    if (user) {
      console.log('Found user by ID:', user.username);

      // 4. อัพเดตข้อมูล user
      user.email = 'korn.updated@example.com';
      user.update();
      console.log('Updated user email:', user.email);

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
