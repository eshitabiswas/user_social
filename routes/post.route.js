const postController = require('../controllers/post.controller');
const Joi = require('joi');
const middleware = require('../middlewear/middlewear')

const routes = [
    {
        method: 'POST',
        path: '/api/post/add',
        options: {
            pre: [
                { method: middleware.tokenMiddleware }
            ],
            handler: postController.postAdd,
        }

    },
    {
        method: 'GET',
        path: '/api/post/list',
        options: {
            pre: [
                { method: middleware.tokenMiddleware }
            ],
            handler: postController.allPostList,
        }

    },
    {
        method: 'GET',
        path: '/api/post/list/by-user',
        options: {
            pre: [
                { method: middleware.tokenMiddleware }
            ],
            handler: postController.allPostListByUser,
        }

    },
    {
        method: 'PUT',
        path: '/api/post/update',
        options: {
            pre: [
                { method: middleware.tokenMiddleware }
            ],
            handler: postController.updatePost,
        }

    },
    {
        method: 'DELETE',
        path: '/api/post/delete',
        options: {
            pre: [
                { method: middleware.tokenMiddleware }
            ],
            handler: postController.deletePost,
        }

    },
];

module.exports = routes;

