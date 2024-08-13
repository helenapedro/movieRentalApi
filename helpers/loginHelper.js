const bcrypt = require('bcrypt');
const genToken = require('../helpers/genToken');
const { responseHelpers, handleServerError } = require('../helpers/responseHelper');

async function loginHelper(req, res, model, role) {
    const { email, password } = req.body;

    try {
        const data = await model.findOne({ where: { email } });
        if (!data) return responseHelpers(res, 400, { message: 'Invalid email or password.' });

        const validPassword = await bcrypt.compare(password, data.password);
        if (!validPassword) return responseHelpers(res, 400, { message: 'Invalid email or password.' });

        const token = genToken(data, role);
        res.send({ token });
    } catch (error) {
        console.error(`Error during ${role} login:`, error);
        return handleServerError(res, error);
    }
}

module.exports = loginHelper;
