const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

// /api/auth/register
router.post(
    '/register',
    [
        check('login', 'Field login failed validation. Login must be shorter then 8 symbols').isLength({max: 8}),
        check('password', 'Field password failed validation. Password must be longer then 4 symbols').isLength({min: 4})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Server validation of login/password failed while attempting registration'
            })
        }

        const {login, password} = req.body;
        const candidate = await User.findOne({login});

        if (candidate){
            return res.status(400).json({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 4);
        const user = new User({login, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'User creation successful'})
    } catch (e) {
        res.status(500).json({message: 'Registration failed, please try again'});
    }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('login', 'Valid login goes here').exists(),
        check('password', 'Valid password goes here').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Server validation of login/password failed while attempting login'
            })
        }

        const {login, password} = req.body;

        const user = await User.findOne({login});
        if (!user){
            return res.status(400).json({message: 'User not found'})
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if(!passwordsMatch){
            res.status(400).json({message: 'Incorrect password'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1d'}
        )
        res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({message: 'Registration failed, please try again'});
    }
});

module.exports = router;