const likeController = require('../controllers/like_dislike.controller');
const Joi = require('joi');
const middleware = require('../middlewear/middlewear')


const routes = [
    {
        method: 'POST',
        path: '/api/user/post/like-dislike',
        options: {
            pre: [
                { method: middleware.tokenMiddleware }
            ],
            handler: likeController.contentLikeDislike
        }
    },
    // {
    //     method: 'POST',
    //     path: '/api/user/login',
    //     handler: postController.userLogin,
    //     config: {
    //         description: 'Login a User',
    //         tags: ['api', 'user-login'],
    //         validate: {
    //             payload: Joi.object({
    //                 email: Joi.string().required(),
    //                 password: Joi.string().required()
    //             })
    //         }
    //     },
    // },
];

module.exports = routes;

