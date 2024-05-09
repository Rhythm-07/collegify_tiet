// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const User = require('./models/user'); 
// const Placement = require('./models/placement'); 
const Professor=require('./models/professor');
const StudyMaterial=require('./models/study-material');
const Hostel=require('./models/hostel');
const Society = require('./models/society');


const app = express();
app.use(flash());


// MongoDB setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


// Routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const forgotPasswordRouter = require('./routes/forgot-password');
const Placement = require('./models/placement');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/forgot-password', forgotPasswordRouter);

// Route protection middleware

function isLoggedIn(req, res, next) {
    if (req.session && req.session.userId) {
        // User is authenticated
        return next();
    } else {
        // User is not authenticated, redirect to login page or handle as needed
        res.redirect('/login');
    }
}

app.get('/placement', isLoggedIn,  async(req, res) => {
    try {
        const placement = await Placement.find({});
        res.render('placement', { placement });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/professors', isLoggedIn, async (req, res) => {
    try {
        const professors = await Professor.find({});
        res.render('professors', { professors });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
    // res.render('professors');
});

app.get('/study-material', isLoggedIn, (req, res) => {
    res.render('study-material');
});
app.post('/study-material', isLoggedIn,async (req, res) => {
    const { year, branch } = req.body;
    try {
        const studyMaterial = await StudyMaterial.find({ year, branch });
        const studyMaterialLinks = studyMaterial.map(material => {
            const fileName = material.file_name;
            return {
                fileName,
                url: `/study-material/${fileName}`
            };
        });
        
        res.json(studyMaterialLinks); // Send the study material links as JSON response
    } catch (error) {
        console.error('Error fetching study material:', error);
        res.status(500).send('Server Error');
    }
});

app.get('/society-events',isLoggedIn, async(req, res) => {
    try {
        const societies = await Society.find({});
        res.render('society-events', { societies });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/college-map', isLoggedIn,(req, res) => {
    res.render('college-map');
});

app.get('/hostel-details', isLoggedIn,async (req, res) => {
    try {
        const hostels = await Hostel.find({});
        res.render('hostel-details', { hostels });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
