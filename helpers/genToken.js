const jwt = require('jsonwebtoken');
const config = require('config');

function genToken(entity, type) {
    if (!config.has('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }

    let token;

    if (type === 'employee') {
        token = jwt.sign(
            { eid: entity.eid, email: entity.email, isAdmin: entity.isAdmin }, 
            config.get('jwtPrivateKey'), 
            { expiresIn: '1h' }
        );
    } else if (type === 'user') {
        token = jwt.sign(
            { uid: entity.uid, email: entity.email }, 
            config.get('jwtPrivateKey'), 
            { expiresIn: '1h' }
        );
    } else {
        throw new Error('Invalid entity type.');
    }

    return token;
}


module.exports = genToken;
