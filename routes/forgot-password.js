const express = require('express');
const User = require('../models/user'); // Assuming you have a User model
const router = express.Router();

router.get('/', (req, res) => {
    res.render('forgot-password');
});

router.post('/', async (req, res)  => {
    const { email,new_password } = req.body;
    // Find the user in the database
    const user = User.findOne({ email }) 
    {
       
        if (!user) {
            // User not found
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findOneAndUpdate(
            { email },
            { password: new_password },
        );
        res.json({ message: 'Password reset instructions sent successfully' });
    }
});

module.exports = router;
