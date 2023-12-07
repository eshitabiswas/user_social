const postModel = require('../models/post');
const { Op } = require('sequelize');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const postSaveSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});

const postAdd = async (req, h) => {
    try {
        const validationResult = postSaveSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }
        else {

            let userId = req.user.id;

            const { title, content } = req.payload;

            const post = await postModel.findOne({
                where: {
                    title,
                    user_id: userId
                },
                attributes: ['id'],
                raw: true
            });

            if (post) {
                return h.response({ error: 'This post already exists under this user' }).code(400);
            }

            const newPost = await postModel.create({ title, content, user_id: userId });

            if (newPost) {
                return h.response({ message: "Post has been added successfully" }).code(200);
            } else {
                return h.response({ error: 'Post cannot be added' }).code(400);
            }
        }

    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const allPostList = async (req, h) => {
    try {
        const contentList = await postModel.findAll({ order: [['title', 'ASC']] })
        if (contentList.length > 0) {
            return h.response(contentList).code(200);
        } else {
            return h.response({ error: 'Content list not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const allPostListByUser = async (req, h) => {
    try {
        let userId = req.user.id
        const contentList = await postModel.findAll({
            where: {
                user_id: userId,
            },
            order: [['title', 'ASC']]
        })
        if (contentList.length > 0) {
            return h.response(contentList).code(200);
        } else {
            return h.response({ error: 'Content list not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


const updatePost = async (req, h) => {
    try {
        let postIdToUpdate = parseInt(req.params.id)

        if (!postIdToUpdate) {
            return h.response({ error: 'Post id is required' }).code(201);
        }

        const updatedPost = await postModel.update(req.payload, {
            where: {
                id: postIdToUpdate,
            },
        })

        if (updatedPost) {
            return h.response({ message: "Post has been updated successfully" }).code(200);
        } else {
            return h.response({ error: 'Post can not updated' }).code(400);
        }

    } catch (error) {
        return h.response(error.message).code(500);
    }
};


const deletePost = async (req, h) => {
    try {
        const postIdToDelete = parseInt(req.params.id);

        if (!postIdToDelete) {
            return h.response({ error: 'Post id is required' }).code(201);
        }

        const deletePost = await postModel.destroy({
            where: {
                id: postIdToDelete
            }
        })
        return h.response({ message: "Post has been deleted successfully" }).code(200);
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


module.exports = {
    postAdd,
    allPostList,
    allPostListByUser,
    updatePost,
    deletePost
};
