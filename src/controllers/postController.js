const Post = require('../models/post');
const User = require('../models/user');

const connection = require("../database/connection");

module.exports = {



    // ====================== // Create post // ======================
    
    create: async (req, res) => {
        const id = req.userId;

        const { title, description } = req.body;

        if(!await User.findByPk(id)){
            return res.status(401).json({ error: "Usuário inválido." });
        }

        //Transaction Begin
        const transaction = await connection.transaction();

        try{
            const post = await Post.create({ title, description, userId: id }, { transaction });

            await transaction.commit();

            return res.status(201).json(post);

        }catch(e) {

            //Transaction Rollback
            await transaction.rollback();

            return res.status(500).json({ error: "Ocorreu um erro interno. O registro não foi efetuado. Tente novamente mais tarde." });
        }
    },




    // ====================== // Update post // ======================

    update: async (req, res) => {
        const userId = req.userId;
        const postId = req.params.id;

        const { title, description } = req.body;

        //Transaction Begin
        const transaction = await connection.transaction();

        try{
            const post = await Post.findOne({ where: { id: postId, userId } });

            if(!post) {
                return res.status(404).json({ error: "Nenhum post foi encontrado." });
            }

            await post.update({ title, description, userId }, { transaction });
            
            return res.status(200).json(post);

        }catch(e) {

            //Transaction Rollback;
            await transaction.rollback();

            return res.status(500).json({ error: "Ocorreu um erro interno. Nennhum dado foi alterado. Tente novamente mais tarde." });
        }
    },



    // ====================== // Delete post // ======================

    deletePost: async (req, res) => {
        const userId = req.userId;
        const postId = req.params.id;

        //Transaction Begin
        const transaction = await connection.transaction();

        try{
            const post = await Post.findOne({ where: { id: postId, userId } });

            if(!post) {
                return res.status(404).json({ error: "Nenhum post foi encontrado." });
            }

            await post.destroy({ transaction });

            return res.status(204).json({});

        }catch(e){

            //Transaction Rollback
            await transaction.rollback();

            return res.status(500).json({ error: "Ocorreu um erro interno. Nennhum dado foi alterado. Tente novamente mais tarde." });;
        }
    }
}