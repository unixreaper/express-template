const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const permission = require('../middleware/permissionMiddleware')

const { exampleTest, examplePermission } = require('../controllers/example/exampleController');
router.get('/test', authMiddleware, exampleTest)
router.get('/test-with-permission', authMiddleware, permission(['admin', 'superAdmin']), examplePermission)



module.exports = router;
