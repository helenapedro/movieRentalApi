// check if email already exists in users or employees table
const { user, employee } = require('../models');

async function emailExists(model, email) {
     const existingUser = await model.findOne({ where: { email } });
     return !!existingUser; 
}

// check if email already exists in users table
async function userEmailExists(email) {
    return emailExists(user, email);
}

// check if email already exists in employees table
async function employeeEmailExists(email) {
    return emailExists(employee, email);
}
module.exports= {
     emailExists,
     userEmailExists,
     employeeEmailExists
}