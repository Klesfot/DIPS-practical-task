import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom';
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

export const CreatePage = () => {
    const message = useMessage();
    const {request, error, clearError} = useHttp();
    const history = useHistory();
    useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('female');
    const [passportSerialNumber, setPassportSerialNumber] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [passportAuthority, setPassportAuthority] = useState('');
    const [passportDateOfIssue, setPassportDateOfIssue] = useState('');
    const [passportId, setPassportId] = useState('');
    const [birthplace, setBirthplace] = useState('');
    const [cityOfLiving, setCityOfLiving] = useState('');
    const [address, setAddress] = useState('');
    const [stationaryPhoneNumber, setStationaryPhoneNumber] = useState('');
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [registrationAddress, setRegistrationAddress] = useState('');
    const [martialStatus, setMartialStatus] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [disability, setDisability] = useState('');
    const [retired, setRetired] = useState(false);
    const [income, setIncome] = useState('');

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    function validateFieldNotEmpty(field) {
        if (field == "") {
            alert(`${field.name} is required`);
            return false;
        }
    }

    const handleValidation = () => {
        const fields = [
            firstName,
            lastName,
            fatherName,
            dateOfBirth,
            gender,
            passportSerialNumber,
            passportNumber,
            passportAuthority,
            passportDateOfIssue,
            passportId,
            birthplace,
            cityOfLiving,
            address,
            email,
            registrationAddress,
            martialStatus,
            citizenship,
            retired
        ]

        fields.forEach(elem => validateFieldNotEmpty(elem));
        return true;
    }

    const pressHandler = async () => {
            try {
                handleValidation();
                const data = await request('api/users/add', 'POST', {
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
                    income: income
                });
                message(data.message);
                history.push(`/list`);
            } catch (e) {
            }
    }

    return (
        <div className="row">
            <div className=".col.s8.offset-s2" style={{paddingTop: '2rem'}}>

                <div className="input-field">
                    <input
                        name="first name"
                        placeholder="first name"
                        id="firstName"
                        type="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="last name"
                        placeholder="last name"
                        id="lastName"
                        type="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="father name"
                        placeholder="father name"
                        id="fatherName"
                        type="fatherName"
                        value={fatherName}
                        onChange={e => setFatherName(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="date of birth"
                        placeholder="DD.MM.YYYY"
                        id="dateOfBirth"
                        type="dateOfBirth"
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <form action="#">
                        <p>
                            <label>
                                <input
                                    name="group1"
                                    type="radio"
                                    id="gender"
                                    value="female"
                                    onClick={e => setGender(e.target.value)}/>
                                <span>Female</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input
                                    name="group1"
                                    type="radio"
                                    id="gender"
                                    value="male"
                                    onClick={e => setGender(e.target.value)}/>
                                <span>Male</span>
                            </label>
                        </p>
                    </form>
                </div>

                <div className="input-field">
                    <input
                        name="passport serial number"
                        placeholder="passport serial number"
                        id="passportSerialNumber"
                        type="passportSerialNumber"
                        value={passportSerialNumber}
                        onChange={e => setPassportSerialNumber(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="passport number"
                        placeholder="passport number"
                        id="passportNumber"
                        type="passportNumber"
                        value={passportNumber}
                        onChange={e => setPassportNumber(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="passport authority"
                        placeholder="passport authority"
                        id="passportAuthority"
                        type="passportAuthority"
                        value={passportAuthority}
                        onChange={e => setPassportAuthority(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="passport date of issue"
                        placeholder="DD-MM-YYYY"
                        id="passportDateOfIssue"
                        type="passportDateOfIssue"
                        value={passportDateOfIssue}
                        onChange={e => setPassportDateOfIssue(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="passport id"
                        placeholder="passport id"
                        id="passportId"
                        type="passportId"
                        value={passportId}
                        onChange={e => setPassportId(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="birth place"
                        placeholder="birth place"
                        id="birthplace"
                        type="birthplace"
                        value={birthplace}
                        onChange={e => setBirthplace(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="city of living"
                        placeholder="city of living"
                        id="cityOfLiving"
                        type="cityOfLiving"
                        value={cityOfLiving}
                        onChange={e => setCityOfLiving(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="address"
                        placeholder="address"
                        id="address"
                        type="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="stationary phone number"
                        placeholder="1234567"
                        id="stationaryPhoneNumber"
                        type="stationaryPhoneNumber"
                        value={stationaryPhoneNumber}
                        onChange={e => setStationaryPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="mobile phone number"
                        placeholder="+375111234567"
                        id="mobilePhoneNumber"
                        type="mobilePhoneNumber"
                        value={mobilePhoneNumber}
                        onChange={e => setMobilePhoneNumber(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="email"
                        placeholder="email@example.com"
                        id="email"
                        type=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="registration address"
                        placeholder="registration address"
                        id="registrationAddress"
                        type="registrationAddress"
                        value={registrationAddress}
                        onChange={e => setRegistrationAddress(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="martial status"
                        placeholder="martial status"
                        id="martialStatus"
                        type="martialStatus"
                        value={martialStatus}
                        onChange={e => setMartialStatus(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="citizenship"
                        placeholder="citizenship"
                        id="citizenship"
                        type="citizenship"
                        value={citizenship}
                        onChange={e => setCitizenship(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        name="disability"
                        placeholder="disability"
                        id="disability"
                        type="disability"
                        value={disability}
                        onChange={e => setDisability(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <p>
                        <label>
                            <input
                                name="retired"
                                placeholder="retired"
                                id="retired"
                                type="checkbox"
                                value={retired}
                                onChange={e => setRetired(e.target.value)}/>
                            <span>Retarded</span>
                        </label>
                    </p>
                </div>

                <div className="input-field">
                    <input
                        name="income"
                        placeholder="income"
                        id="income"
                        type="income"
                        value={income}
                        onChange={e => setIncome(e.target.value)}
                    />
                </div>

                <button
                    className="btn grey lighten-1"
                    onClick={pressHandler}
                >
                    Submit
                </button>

            </div>
        </div>
    )
}