const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    console.log('signuphere');
    const { name,email, password } = req.body;
    try {
        
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'email already exists');
            return res.redirect('/signup');
        }
        if (!email.endsWith('@thapar.edu')) {
            req.flash('error', 'Please use an email ending with "@thapar.edu"');
            return res.redirect('/signup');
        }
        // Create a new user
        await User.create({ name, email, password });
        console.log('signup done',{ name, email, password })
        req.flash('success', 'Signup successful! You can now login.');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        req.flash('error', 'An error occurred. Please try again.');
        res.redirect('/signup');
    }
});

module.exports = router;
