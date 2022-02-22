const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/user');
const Post = require('../models/post');
const jwt = require("jsonwebtoken");

const connection = require("../database/connection");
const { secret, tokenExpires } = require("../config/auth.json");




// ====================== // Json Web Token sign // ======================

const genJwt = (userId, tokenSecret) => {

    const authToken = jwt.sign({ userId }, tokenSecret, {
        expiresIn: tokenExpires
    });

    return authToken;

}




module.exports = {



    // ====================== // User register (public) // ======================

    register: async (req, res) => {
        const { name, email, password } = req.body;
        
        //Transaction Begin
        const transaction = await connection.transaction();

        try{

            if(await User.findOne({ where: { email } })){
                return res.status(400).json({ error: "Email não disponível." });
            }

            const hash = await bcrypt.hash(password, 10);

            const user = await User.create({name, email, password: hash}, { transaction });

            await transaction.commit();

            return res.status(201).json({ token: genJwt(user.id, secret) });

        }catch(e) {

            //Transaction Rollback
            await transaction.rollback();

            return res.status(500).json({ error: "Ocorreu um erro interno. O registro não foi efetuado. Tente novamente mais tarde." });
        }
    },





    // ====================== // User login (public) // ======================

    login: async (req, res) => {
        const { email, password } = req.body;
        
        try{
            const user = await User.findOne({ where: { email } });

            if(!user){
                return res.status(400).json({ error: "Email ou senha inválidos." });
            }

            const isValid = await bcrypt.compare(password, user.password);

            if(!isValid) {
                return res.status(400).json({ error: "Email ou senha inválidos." });
            }

            return  res.status(200).json({ token: genJwt(user.id, secret) });
            
        }catch(e) {
            return res.status(500).json({ error: "Ocorreu um erro interno. Tente novamente mais tarde." });
        }
    },





    // ====================== // Find all (public / users) // ======================

    showUsers: async (req, res) => {
        const userId = req.userId;

        let order = req.order;
        
        let page = parseInt(req.page);
        let limit = parseInt(req.limit);

        try{
            if(!await User.findByPk(userId)) {
                return res.status(401).json({ error: "Usuário inválido." });
            }

            const users = await User.findAll({
                include: Post,
                attributes: {
                    exclude: ['password']
                },
                order: [["createdAt", order]],
                limit,
                offset: limit * page - limit
            });

            if(!users.length > 0) {
                return res.status(204).json({ message: "Nenhum usuário foi cadastrado." });
            }

            return res.status(200).json(users);

        }catch(e) {
            return res.status(500).json({ error: "Ocorreu um erro interno. Tente novamente mais tarde." });
        }
    },





    // ====================== // Find user (profile)// ======================

    profile: async (req, res) => {
        const id = req.userId;

        try{
            const user = await User.findByPk(id, { attributes: { exclude: ['password'] }, include: Post });

            if(!user) {
                return res.status(404).json({ error: "Nenhum usuário foi encontrado." });
            }
            
            return res.status(200).json(user);

        }catch(e) {
            return res.status(500).json({ error: "Ocorreu um erro interno. Tente novamente mais tarde." });
        }
    },


    


    // ====================== // Find user (profile) // ======================

    findUser: async (req, res) => {
        const userId = req.userId;
        const id = req.params.id;

        try{

            if(!await User.findByPk(userId)) {
                return res.status(401).json({ error: "Usuário inválido." });
            }

            const user = await User.findByPk(id, { include: Post});

            if(!user) {
                return res.status(404).json({ error: "Nenhum usuário foi encontrado." });
            }
            
            return res.status(200).json(user);

        }catch(e) {
            return res.status(500).json({ error: "Ocorreu um erro interno. Tente novamente mais tarde." });
        }
    },
    
    
    
    
    // ====================== // Update user (profile) // ======================

    update: async (req, res) => {
        const id = req.userId;

        const { name, email, password } = req.body;

        //Transaction Begin
        const transaction = await connection.transaction();

        try {
            const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

            if(!user) {
                return res.status(404).json({ error: "Nenhum usuário foi encontrado." });
            }

            await user.update({ name, email, password }, { transaction });

            await transaction.commit();

            return res.status(200).json(user);

        }catch(e) {

            //Transaction Rollback
            await transaction.rollback();

            return res.status(500).json({ error: "Ocorreu um erro interno. Nennhum dado foi alterado. Tente novamente mais tarde." });
        }
    },





    // ====================== // Password update (profile) // ======================

    updatePassword: async (req, res) => {
        const id = req.userId;
        const {oldpassword, newpassword } = req.body;

        //Transaction Begin
        const transaction = await connection.transaction();

        try{
            const user = await User.findByPk(id);

            if(!user){
                return res.status(404).json({ error: "Nenhum usuário foi encontrado." });
            }

            const isEquals = await bcrypt.compare(oldpassword, user.password);

            if(!isEquals) {
                return res.status(400).json({ error: "Password (oldpassword) incorreto." })
            }

            hashPassword = await bcrypt.hash(newpassword, 10);

            user.update({ password: hashPassword }, { transaction });

            await transaction.commit();

            return res.status(200).json({ message: "Password alterado com successo." });

        }catch (e){

            //Transaction Rollback
            await transaction.rollback();

            return res.status(500).json({ error: "Ocorreu um erro interno. Nennhum dado foi alterado. Tente novamente mais tarde." });
        }

    },




    // ====================== // Delete user (profile)// ======================

    deleteUser: async (req, res) => {
        const id = req.userId;


        //Transaction Begin
        const transaction = await connection.transaction();

        try{
            const user = await User.findByPk(id);

            if(!user) {
                return res.status(404).json({ error: "Nenhum usuário foi encontrado." });   
            }
            
            await user.destroy({ transaction });

            await transaction.commit();

            return res.status(204).json({});

        }catch(e) {

            //Transaction Rollback
            await transaction.rollback();

            return res.status(500).json({ error: "Ocorreu um erro interno. Nennhum dado foi alterado. Tente novamente mais tarde." });
        }
    }
}