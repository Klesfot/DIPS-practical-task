from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from colorama import Fore
from colorama import Style
from pymongo import MongoClient

"""
    This is a model request to database for reference
    {"firstName": "Ivan", "lastName": "Ivanov", "fatherName": "Ivanovich", "dateOfBirth": "01.01.1970",
     "gender": "female", "passportSerialNumber": "123456789", "passportNumber": "123456789",
     "passportAuthority": "Some authority", "passportDateOfIssue": "01.01.1970", "passportId": "ABC123456789",
     "birthplace": "Moscow", "cityOfLiving": "Moscow", "address": "Moscow, Lenin prospekt 1, 1",
     "stationaryPhoneNumber": "1234567", "mobilePhoneNumber": "+7112223344", "email": "email@email.com",
     "registrationAddress": "Moscow, Lenin prospekt 1, 1", "martialStatus": "single", "citizenship": "RU",
     "disability": "none", "retired": false, "income": "1000"}
"""


binary = r'C:\Users\mukha\AppData\Local\Mozilla Firefox\firefox.exe'
options = Options()
options.binary = binary
capabilities = DesiredCapabilities().FIREFOX
capabilities["marionette"] = True

browser = webdriver.Firefox(options=options, capabilities=capabilities, executable_path='C:\\Python38\\geckodriver.exe')
browser.get("http://localhost:3000/create")

firstName = browser.find_element_by_name("first name")
lastName = browser.find_element_by_name("last name")
fatherName = browser.find_element_by_name("father name")
dateOfBirth = browser.find_element_by_name("date of birth")
passportSerialNumber = browser.find_element_by_name("passport serial number")
passportNumber = browser.find_element_by_name("passport number")
passportAuth = browser.find_element_by_name("passport authority")
passportDoi = browser.find_element_by_name("passport date of issue")
passportId = browser.find_element_by_name("passport id")
birthPlace = browser.find_element_by_name("birth place")
cityOfLiving = browser.find_element_by_name("city of living")
address = browser.find_element_by_name("address")
homePhone = browser.find_element_by_name("stationary phone number")
mobilePhone = browser.find_element_by_name("mobile phone number")
email = browser.find_element_by_name("email")
regAddress = browser.find_element_by_name("registration address")
martialStatus = browser.find_element_by_name("martial status")
citizenship = browser.find_element_by_name("citizenship")
disability = browser.find_element_by_name("disability")
retired = browser.find_element_by_name("retired")
income = browser.find_element_by_name("income")
submit = browser.find_element_by_name("submitBtn")

client = MongoClient("mongodb+srv://Klesfot:gIBy6uyu@cluster0-4oykx.mongodb.net/test?retryWrites=true&w=majority")
db = client['integration_tests']
collection = db['systemusers']


# checks for alert popup (condition: client-side verification failed)
def checkAlert() -> bool:
    try:
        WebDriverWait(browser, 3).until(ec.alert_is_present(), 'Timed out waiting for alert popup')

        alert = browser.switch_to.alert
        alert.accept()
        return True
    except TimeoutException:
        return False


# checks for toast message (condition: response from server contains validation error)
def checkToast():
    WebDriverWait(browser, 3)\
        .until(ec.presence_of_element_located((By.ID, "toast-container")), 'Timed out waiting for toast')


def printTestResults(num, result):
    if result:
        print(f'{Fore.GREEN}Test%d ' % num + f'{Fore.GREEN}passed{Style.RESET_ALL}')
    else:
        print(f'{Fore.RED}Test%d ' % num + f'{Fore.RED}failed{Style.RESET_ALL}')


def checkIfUserIsUniqueInDb() -> bool:
    users = 0
    for x in collection.find():
        users = users + 1

    if users == 1:
        return True
    else:
        return False


def checkIfDbIsEmpty() -> bool:
    users = 0
    for x in collection.find({"passportNumber": ""}):
        users = users + 1

    if users == 0:
        return True
    else:
        return False


def checkThatSingleUserWithConstraintInDb(constraint) -> bool:
    users = 0
    for x in collection.find(constraint):
        users = users + 1

    if users == 1:
        return True
    else:
        return False


def checkThatNoUsersWithConstraintInDb(constraint) -> bool:
    users = 0
    for x in collection.find(constraint):
        users = users + 1

    if users == 0:
        return True
    else:
        return False


def checkThatUserIsNotCreatedWithoutMandatoryField() -> bool:
    constraint = {"passportSerialNumber": "FY"}
    users = 0
    for x in collection.find(constraint):
        users = users + 1

    if users == 1:
        return True
    else:
        return False


def clearDb():
    collection.delete_many({"passport date of issue": "01.01.1970"})


def setDataValid():
    firstName.send_keys("Ivan")
    lastName.send_keys("Ivanov")
    fatherName.send_keys("Ivanovich")
    dateOfBirth.send_keys("01.01.1970")
    passportSerialNumber.send_keys("FY")
    passportNumber.send_keys("123456789")
    passportAuth.send_keys("Some authority")
    passportDoi.send_keys("01.01.1970")
    passportId.send_keys("ABC123456789")
    birthPlace.send_keys("Moscow")
    cityOfLiving.send_keys("Moscow")
    address.send_keys("Moscow, Lenin prospekt 1, 1")
    homePhone.send_keys("1234567")
    mobilePhone.send_keys("+7112223344")
    email.send_keys("email@email.com")
    regAddress.send_keys("Moscow, Lenin prospekt 1, 1")
    martialStatus.send_keys("single")
    citizenship.send_keys("RU")
    disability.send_keys("none")
    income.send_keys("1000")


def setSamePassport():
    firstName.send_keys("Vanya")
    lastName.send_keys("Vannikov")
    fatherName.send_keys("Vanykovich")
    dateOfBirth.send_keys("01.01.2000")
    passportSerialNumber.send_keys("FY")
    passportNumber.send_keys("123456789")
    passportAuth.send_keys("Some different authority")
    passportDoi.send_keys("01.01.2000")
    passportId.send_keys("ABC123456789")
    birthPlace.send_keys("Tashkent")
    cityOfLiving.send_keys("Tashkent")
    address.send_keys("Tashkent, Lenin prospekt 1, 1")
    homePhone.send_keys("7654321")
    mobilePhone.send_keys("+7223334455")
    email.send_keys("differentemail@email.com")
    regAddress.send_keys("Tashkent, Lenin prospekt 1, 1")
    martialStatus.send_keys("married")
    citizenship.send_keys("TS")
    disability.send_keys("some")
    income.send_keys("777")


def setNumericLastName():
    firstName.send_keys("Ivan")
    lastName.send_keys("1234")
    fatherName.send_keys("Ivanovich")
    dateOfBirth.send_keys("01.01.1970")
    passportSerialNumber.send_keys("FY")
    passportNumber.send_keys("123456789")
    passportAuth.send_keys("Some authority")
    passportDoi.send_keys("01.01.1970")
    passportId.send_keys("ABC123456789")
    birthPlace.send_keys("Moscow")
    cityOfLiving.send_keys("Moscow")
    address.send_keys("Moscow, Lenin prospekt 1, 1")
    homePhone.send_keys("1234567")
    mobilePhone.send_keys("+7112223344")
    email.send_keys("email@email.com")
    regAddress.send_keys("Moscow, Lenin prospekt 1, 1")
    martialStatus.send_keys("single")
    citizenship.send_keys("RU")
    disability.send_keys("none")
    income.send_keys("1000")


def setSpaceAsFirstName():
    firstName.send_keys(" ")
    lastName.send_keys("Ivanov")
    fatherName.send_keys("Ivanovich")
    dateOfBirth.send_keys("01.01.1970")
    passportSerialNumber.send_keys("FY")
    passportNumber.send_keys("123456789")
    passportAuth.send_keys("Some authority")
    passportDoi.send_keys("01.01.1970")
    passportId.send_keys("ABC123456789")
    birthPlace.send_keys("Moscow")
    cityOfLiving.send_keys("Moscow")
    address.send_keys("Moscow, Lenin prospekt 1, 1")
    homePhone.send_keys("1234567")
    mobilePhone.send_keys("+7112223344")
    email.send_keys("email@email.com")
    regAddress.send_keys("Moscow, Lenin prospekt 1, 1")
    martialStatus.send_keys("single")
    citizenship.send_keys("RU")
    disability.send_keys("none")
    income.send_keys("1000")


def setIncorrectBirthdate():
    firstName.send_keys("Ivan")
    lastName.send_keys("Ivanov")
    fatherName.send_keys("Ivanovich")
    dateOfBirth.send_keys("29 february 2015")
    passportSerialNumber.send_keys("FY")
    passportNumber.send_keys("123456789")
    passportAuth.send_keys("Some authority")
    passportDoi.send_keys("01.01.1970")
    passportId.send_keys("ABC123456789")
    birthPlace.send_keys("Moscow")
    cityOfLiving.send_keys("Moscow")
    address.send_keys("Moscow, Lenin prospekt 1, 1")
    homePhone.send_keys("1234567")
    mobilePhone.send_keys("+7112223344")
    email.send_keys("email@email.com")
    regAddress.send_keys("Moscow, Lenin prospekt 1, 1")
    martialStatus.send_keys("single")
    citizenship.send_keys("RU")
    disability.send_keys("none")
    income.send_keys("1000")


def setAllWithoutOneMandatoryField():
    firstName.send_keys("Ivan")
    lastName.send_keys("Ivanov")
    fatherName.send_keys("Ivanovich")
    dateOfBirth.send_keys("01.01.1970")
    passportSerialNumber.send_keys("FY")
    passportAuth.send_keys("Some authority")
    passportDoi.send_keys("01.01.1970")
    passportId.send_keys("ABC123456789")
    birthPlace.send_keys("Moscow")
    cityOfLiving.send_keys("Moscow")
    address.send_keys("Moscow, Lenin prospekt 1, 1")
    homePhone.send_keys("1234567")
    mobilePhone.send_keys("+7112223344")
    email.send_keys("email@email.com")
    regAddress.send_keys("Moscow, Lenin prospekt 1, 1")
    martialStatus.send_keys("single")
    citizenship.send_keys("RU")
    disability.send_keys("none")
    income.send_keys("1000")


def setOnlyMandatoryFields():
    firstName.send_keys("Ivan")
    lastName.send_keys("Ivanov")
    fatherName.send_keys("Ivanovich")
    dateOfBirth.send_keys("01.01.1970")
    passportSerialNumber.send_keys("FY")
    passportNumber.send_keys("123456789")
    passportAuth.send_keys("Some authority")
    passportId.send_keys("ABC123456789")
    passportDoi.send_keys("01.01.1970")
    birthPlace.send_keys("Moscow")
    cityOfLiving.send_keys("Moscow")
    address.send_keys("Moscow, Lenin prospekt 1, 1")
    email.send_keys("email@email.com")
    regAddress.send_keys("Moscow, Lenin prospekt 1, 1")
    martialStatus.send_keys("single")
    citizenship.send_keys("RU")


def clearFields():
    firstName.clear()
    lastName.clear()
    fatherName.clear()
    dateOfBirth.clear()
    passportSerialNumber.clear()
    passportNumber.clear()
    passportAuth.clear()
    passportDoi.clear()
    passportId.clear()
    birthPlace.clear()
    cityOfLiving.clear()
    address.clear()
    homePhone.clear()
    mobilePhone.clear()
    email.clear()
    regAddress.clear()
    martialStatus.clear()
    citizenship.clear()
    disability.clear()
    income.clear()


def teardown():
    clearFields()
    clearDb()


def runTests():
    runTest1()
    runTest2_3()
    runTest4()
    runTest5()
    runTest6()
    runTest7()
    runTest8()
    runTest9()


# Test case 1
#
# Conditions: all fields filled with valid data, cleared, then filled again with the same data
#
# Expected result: toast message from server, no more then one user in db
def runTest1():
    setDataValid()
    submit.click()
    WebDriverWait(browser, 2)
    clearFields()
    setDataValid()
    submit.click()
    checkToast()
    result = checkIfUserIsUniqueInDb()
    printTestResults(1, result)
    teardown()


# Test cases 2 & 3 (since checking passport id number too)
#
# Conditions: all fields filled with valid data, then cleared, then filled again with other user data with
# previous user's passportSerialNumber, passportNumber & passportId
#
# Expected result: toast message from server, no more then one user in db with same
# passportSerialNumber, passportNumber & passportId
def runTest2_3():
    setDataValid()
    submit.click()
    WebDriverWait(browser, 2)
    clearFields()
    setSamePassport()
    submit.click()
    checkToast()
    result = checkThatSingleUserWithConstraintInDb({
        "passportSerialNumber": "FY",
        "passportNumber": "123456789",
        "passportId": "ABC123456789"})
    printTestResults(23, result)
    teardown()


# Test case 4
#
# Conditions: all fields filled with valid data, except for last name which is numeric
#
# Expected result: toast message from server, no users in db with numeric last name
def runTest4():
    setNumericLastName()
    submit.click()
    WebDriverWait(browser, 2)
    checkToast()
    result = checkThatNoUsersWithConstraintInDb({"lastName": "1234"})
    printTestResults(4, result)
    teardown()


# Test case 5
#
# Conditions: all fields filled with valid data, except for first name which is a space
#
# Expected result: toast message from server, no users in db with space first name
def runTest5():
    setSpaceAsFirstName()
    submit.click()
    WebDriverWait(browser, 2)
    checkToast()
    result = checkThatNoUsersWithConstraintInDb({"firstName": " "})
    printTestResults(5, result)
    teardown()


# Test case 6
#
# Conditions: all fields filled with valid data, except for birth date which is not in correct format
#
# Expected result: toast message from server, no users in db with incorrect formatted date
def runTest6():
    setIncorrectBirthdate()
    submit.click()
    WebDriverWait(browser, 2)
    checkToast()
    result = checkThatNoUsersWithConstraintInDb({"birthDate": "29 february 2015"})
    printTestResults(6, result)
    teardown()


# Test case 7
#
# Conditions: all fields filled with valid data, except for one mandatory field which is empty
#
# Expected result: toast message from server, no users in db
def runTest7():
    setAllWithoutOneMandatoryField()
    submit.click()
    WebDriverWait(browser, 2)
    checkToast()
    result = checkIfDbIsEmpty()
    printTestResults(7, result)
    clearFields()


# Test case 8
#
# Conditions: all mandatory fields filled
#
# Expected result: a user is created in db with only mandatory fields
def runTest8():
    WebDriverWait(browser, 5)
    setOnlyMandatoryFields()
    submit.click()
    WebDriverWait(browser, 5)
    result = checkIfUserIsUniqueInDb()
    printTestResults(8, result)
    teardown()


runTests()
clearDb()
