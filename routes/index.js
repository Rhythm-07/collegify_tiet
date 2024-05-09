// routes/index.js
const express = require('express');
const router = express.Router();

// GET /index - Serve the index page
router.get('/', (req, res) => {
    if (req.session && req.session.userId) {
        res.render('index', { name: req.session.userId});
    } else {
        res.render('index', { name: null });
    }
});

module.exports = router;
