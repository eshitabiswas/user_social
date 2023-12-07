const likeDislikeModel = require('../models/like_dislike');
const { Op } = require('sequelize');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const postLikeDislikeSchema = Joi.object({
    post_id: Joi.number().integer().required()
});

const contentLikeDislike = async (req, h) => {
    try {

        const validationResult = postLikeDislikeSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        const { post_id } = req.payload;
        const userId = req.user.id;

        const postLiked = await likeDislikeModel.findOne({
            where: {
                post_id,
                user_id: userId
            },
            raw: true
        });

        if (postLiked) {
            let likeUpdate = await likeDislikeModel.update(
                { isLike: postLiked.isLike ? 0 : 1 },
                {
                    where: {
                        id: postLiked.id,
                    },
                }
            );
            if (likeUpdate) {
                return h.response({ message: "Post has been liked successfully" }).code(200);
            } else {
                return h.response({ error: 'Post cannot be liked' }).code(400);
            }
        } else {

            const newLike = await likeDislikeModel.create({ post_id, isLike: 1, user_id: userId });

            if (newLike) {
                return h.response({ message: "Post has been liked successfully" }).code(200);
            } else {
                return h.response({ error: 'Post cannot be liked' }).code(400);
            }
        }

    } catch (error) {
        return h.response(error.message).code(500);
    }
};

module.exports = {
    contentLikeDislike
};
