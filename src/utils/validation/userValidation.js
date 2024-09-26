// utils/validation/studentValidation.js
const Joi = require('joi'); // ไลบรารี่ที่ใช้ validation เรียกมาใช้มันชื่อ joi.js กูเกิ้ลได้

// เอาไว้ยืนยัน validation เช่น ข้อมูลต้องไหลมาแบบนี้นะ เพื่อความปลอดภัยชั้นสองไรงี้
// มันจะถูกเรียกใช้ในโค้ดที่ผมเขียนตอน user โยนข้อมูลสมัครมา ก่อนจะ insert ข้อมูลเข้า database มันจะไหลไปเช็คตรงนี้ก่อน
// ว่าเอ่อ ข้อมูลเนี่ย มันปลอดภัย มันตามที่เราอยากให้เป็นไหมก่อนเราปล่อยมันให้ไหลเข้า database อ่า <3 เพราะเราก็ไม่อยากให้อะไรมั่วซั่วไหลมาใช่ม๊ะคนเก่ง เช่น username ยาวเกิน 50 ตัวอักษร

// เบอร์โทรศัพท์ต้องมี 10 หลักนะ
// หรือเมลต้องเป็นของโดเมน @gmail @hotmain @yahoo ไรงี้ จะเป็น @protonmail หรือ @tempmail อะไรไม่ได้
// .required() แปลว่าต้องมี .length(10) คือความยาวต้อง 10 ตัวเท่านั้น .allow(null, '') หมายถึง อนุญาตแค่ส่งมาว่า null หรือค่าเปล่า '' นั่นเอง .boolean หมายถึงรับแค่ (true & false)
// .array() แปลว่า ค่าต้องเป็นแบบ ['hello', 'hi'] ส่วน .string() คือ string ส่วน .number() คือ ตัวเลขเช่น 1-10
// .min(5) คือขั้นต่ำเลข 5 .max(99) คือขั้นสูงเลข 99 เก็ทมะคือ between 5 and 99 อะ??

const forbiddenUsernames = ['root', 'admin', 'staff'];


const userValidationSchema = Joi.object({
  profile_image: Joi.string().uri().allow(null, ''), // รูปโปรไฟล์ โดยปกติระบบจาก ./models/Teachers.js หรือ /Student.js มันจะให้ภาพ default profile อยู่ละถ้าสมัคร
  roles: Joi.array().items(Joi.string()).allow(null), // บทบาท เช่น ['president', 'student'] ประธานนักเรียน & นักเรียน หรือ ['teacher', 'admin'] เอาไว้ใช้จัดการในระบบ
  f_name: Joi.string().allow(null, ''), // ชื่อนำหน้า
  m_name: Joi.string().allow(null, ''), // ชื่อกลาง
  l_name: Joi.string().allow(null, ''), //สกุล
  birthday: Joi.date().allow(null), // วันเดือนปีเกิด .date()
  uname: Joi.string().max(50).required()
  .custom((value, helpers) => {
      if (forbiddenUsernames.includes(value.toLowerCase())) {
        return helpers.error('any.invalid');
      }
      return value;
  }, 'Forbidden usernames')
  .messages({
      'any.invalid': 'This username is not allowed. Please choose another username.'
  }),
  password: Joi.string().min(6).required(),  // รหัสยาวขั้นต่ำ 6 ตัวนะจ๊ะ
  email: Joi.string().email().pattern(/@(hotmail\.com|gmail\.com|yahoo\.com)$/).allow(null, ''), // ไม่ส่งก็ได้
  line: Joi.string().max(20).allow(null, ''), // ไลน์ไอดี ไม่ต้องส่งมาก็ได้
  phone: Joi.string().pattern(/^0\d{9}$/).required(),  // เบอร์โทรมี 10 หลัก เป็ฯตัวเลขล้วน 0-9 แต่ต้องเริ่มด้วย 0 เช่น 0820611067
  department: Joi.string().valid('science', 'computer', 'math').allow(null, ''),  // แผนก science, math หรือ computer ได้เท่านั้น หรือค่าว่างเปล่าก็ได้ ไม่มีแผนก
  school: Joi.string().allow(null, ''), // ชื่อโรงเรียนที่เรียน แต่สามารถว่างเปล่าได้
  school_year: Joi.string().allow(null, ''), // ปีที่เรียน เช่น ม3 แต่สามารถว่างเปล่าได้อีกที
  parent_contact: Joi.object({
    father: Joi.object({
      name: Joi.string().allow(null, ''), // ชื่อพ่อชื่อแม่ว่างเปล่าได้ แต่ต้องเป็นตัวหนังสือ
      phone_number: Joi.string().length(10).allow(null, '')  // เบอร์พ่อเบอร์แม่ ว่างเปล่าได้ และ ไม่จำเป็นต้องเริ่มด้วย 0 แต่ต้องมี 10 หลัก * ขี้เกียจเขียนเช็ค *
    }),
    mother: Joi.object({
      name: Joi.string().allow(null, ''), // ชื่อพ่อชื่อแม่ว่างเปล่าได้ แต่ต้องเป็นตัวหนังสือ
      phone_number: Joi.string().length(10).allow(null, '')  // เบอร์พ่อเบอร์แม่ ว่างเปล่าได้ และ ไม่จำเป็นต้องเริ่มด้วย 0 แต่ต้องมี 10 หลัก * ขี้เกียจเขียนเช็ค *
    })
  }).allow(null),
  home_address: Joi.string().allow(null, '') // ที่อยู่บ้าน ปกติมากับตอนสมัครคือค่าเปล่า
});

module.exports = userValidationSchema;
