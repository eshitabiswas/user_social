const userController = require('../controllers/user.controller');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/api/user/signup',
        handler: userController.userRegistration,
        config: {
            description: 'SignUp a User',
            tags: ['api', 'user-signup'],
            validate: {
                payload: Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            },
        },
    },
    {
        method: 'POST',
        path: '/api/user/login',
        handler: userController.userLogin,
        config: {
            description: 'Login a User',
            tags: ['api', 'user-login'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        },
    },
];

module.exports = routes;

