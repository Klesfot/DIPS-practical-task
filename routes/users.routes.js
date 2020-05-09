const {Router} = require('express');
const SystemUser = require('../models/SystemUser');
const {check, validationResult} = require('express-validator')
const router = Router();
const config = require('config');

// /api/users/add
router.post(
    '/add',
    [
        check('firstName', 'firstName').exists(),
        check('lastName', 'lastName').exists(),
        check('fatherName', 'fatherName').exists(),
        check('dateOfBirth', 'dateOfBirth').exists(),
        check('gender', 'gender').exists(),
        check('passportSerialNumber', 'passportSerialNumber').exists(),
        check('passportNumber', 'passportNumber').exists(),
        check('passportAuthority', 'passportAuthority').exists(),
        check('passportDateOfIssue', 'passportDateOfIssue').exists(),
        check('passportId', 'passportId').exists(),
        check('birthplace', 'birthplace').exists(),
        check('cityOfLiving', 'cityOfLiving').exists(),
        check('address', 'address').exists(),
        check('email', 'email').normalizeEmail().isEmail(),
        check('email', 'email').exists(),
        check('registrationAddress', 'registrationAddress').exists(),
        check('martialStatus', 'martialStatus').exists(),
        check('citizenship', 'citizenship').exists(),
        check('retired', 'retired').exists(),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Server validation of fields failed while attempting user creation'
            })
        }

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const fatherName = req.body.fatherName;
        const dateOfBirth = req.body.dateOfBirth;
        const gender = req.body.gender;
        const passportSerialNumber = req.body.passportSerialNumber;
        const passportNumber = req.body.passportNumber;
        const passportAuthority = req.body.passportAuthority;
        const passportDateOfIssue = req.body.passportDateOfIssue;
        const passportId = req.body.passportId;
        const birthplace = req.body.birthplace;
        const cityOfLiving = req.body.cityOfLiving;
        const address = req.body.address;
        const stationaryPhoneNumber = req.body.stationaryPhoneNumber;
        const mobilePhoneNumber = req.body.mobilePhoneNumber;
        const email = req.body.email;
        const registrationAddress = req.body.registrationAddress;
        const martialStatus = req.body.martialStatus;
        const citizenship = req.body.citizenship;
        const disability = req.body.disability;
        const retired = req.body.retired;
        const income = req.body.income;

    const actualUser = await SystemUser.findOne({email});

    if (actualUser) {
        return res.json({ user: actualUser });
    }

    const user = new SystemUser({
        firstName: firstName,
        lastName: lastName,
        fatherName: fatherName,
        dateOfBirth: dateOfBirth,
        gender: gender,
        passportSerialNumber: passportSerialNumber,
        passportNumber: passportNumber,
        passportAuthority: passportAuthority,
        passportDateOfIssue: passportDateOfIssue,
        passportId: passportId,
        birthplace: birthplace,
        cityOfLiving: cityOfLiving,
        address: address,
        stationaryPhoneNumber: stationaryPhoneNumber,
        mobilePhoneNumber: mobilePhoneNumber,
        email: email,
        registrationAddress: registrationAddress,
        martialStatus: martialStatus,
        citizenship: citizenship,
        disability: disability,
        retired: retired,
        income: income});

    await user.save();

    res.status(201).json({ user });

    } catch (e) {
        res.status(500).json({message: 'Adding user failed, please try again'});
    }
});

// /api/users/delete
router.delete('/delete', async (req, res) => {
    try {
        const { email } = req.body;
        const userExists = await SystemUser.findOne({email}).isEmail();

        if (!userExists) {
            return res.status(404).json({message: `User with email ${email} not found`})
        }

        SystemUser.deleteOne({email: email}, function(err, obj) {
            if (err) throw err;
            console.log(`A document with email ${email} deleted`);
        })

        return res.status(201);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

// /api/users/
router.get('/', async (req, res) => {
    try {

        const users = await SystemUser.find(); //selector?
        res.json(users);

    } catch (e) {
        res.status(500).json({message: 'Getting user list failed, please try again'});
    }
});

// /api/users/:id
router.get('/:id', async (req, res) => {
    try {

        const user = await SystemUser.findById(req.params.id);
        res.json(user);

    } catch (e) {
        res.status(500).json({message: 'Getting user failed, please try again'});
    }
});

module.exports = router;