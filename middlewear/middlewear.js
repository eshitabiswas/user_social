const Hapi = require('@hapi/hapi');
const jwt = require('jsonwebtoken');

const tokenMiddleware = (req, h) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
           return h.response({ error: 'Missing token' }).code(400).takeover();
        }
        else {
            const decoded = jwt.verify(token, '@eshitabiswas#0722');
            req.user = decoded
            return req;
        }
    } catch (error) {
        return h.response(error.message).code(500).takeover();
    }
};

module.exports = {
    tokenMiddleware
};