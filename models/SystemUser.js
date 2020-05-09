const {Schema, model} = require('mongoose');

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    fatherName: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    gender: {type: String, required: true},
    passportSerialNumber: {type: String, required: true},
    passportNumber: {type: String, required: true},
    passportAuthority: {type: String, required: true},
    passportDateOfIssue: {type: String, required: true},
    passportId: {type: String, required: true},
    birthplace: {type: String, required: true},
    cityOfLiving: {type: String, required: true},
    address: {type: String, required: true},
    stationaryPhoneNumber: {type: String, required: true},
    mobilePhoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    registrationAddress: {type: String, required: true},
    martialStatus: {type: String, required: true},
    citizenship: {type: String, required: true},
    disability: {type: String, required: true},
    retired: {type: Boolean, required: true},
    income: {type: String, required: true},
})

module.exports = model('SystemUser', schema);