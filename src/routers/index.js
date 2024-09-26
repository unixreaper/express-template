// routers/index.js
const express = require('express');
const router = express.Router();

// Import other routers
const exampleRouter = require('./routerExample'); // Example router 

router.get('/', (req, res) => {
    res.status(200).send('API version 1 is ready');
});

// Use other routers
router.use('/example', exampleRouter);

module.exports = router;
