
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { Op } = require('sequelize');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const SECRET = "@eshitabiswas#0722"

const userRegistrationSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const userRegistration = async (req, h) => {
    try {
        let validationResult = userRegistrationSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        let { first_name, last_name, email, password } = req.payload;
        let userobj = await userModel.findOne({
            where: {
                email
            },
            attributes: ['id'],
            raw: true
        });

        if (userobj) {
            return h.response({ error: 'User already exists' }).code(400);
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let newUser = await userModel.create({ first_name, last_name, email, password: hashedPassword });

        if (newUser) {
            return h.response({ message: 'User has been added successfully' }).code(200);
        } else {
            return h.response({ error: 'User cannot be added' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const userLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const userLogin = async (req, h) => {
    try {
        const validationResult = userLoginSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        const { password, email } = req.payload;
        const userobj = await userModel.findOne({
            where: {
                email
            },
        });

        if (userobj) {
            let userPassword = userobj.password
            let isPasswordValid = await bcrypt.compare(password, userPassword);
            if (isPasswordValid) {

                const token = jwt.sign({ email: userobj.email, id: userobj.id }, SECRET, {
                    expiresIn: "1d"
                })

                const responseData = {
                    message: 'User has been logged in successfully',
                    data: {
                        token,
                        userobj
                    }
                };

                return h.response(responseData).code(200);
            } else {
                return h.response({ error: 'Invalid Password' }).code(400);
            }
        }
        else {
            return h.response({ error: 'User not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

module.exports = {
    userRegistration,
    userLogin
};
