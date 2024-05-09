const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.body);
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            req.flash('error', 'Invalid email or password');
            console.log('Invalid email or password');
            return res.redirect('/login');
        }
        if (user.password !== password) {
            req.flash('error', 'Invalid email or password');
            console.log('Invalid email or password');
            return res.redirect('/login');
        }
        req.session.userId = user.name;
        req.flash('success', 'Login successful');
        console.log('Login Successful');
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.flash('error', 'An error occurred. Please try again.');
        res.redirect('/login');
    }
});

module.exports = router;
