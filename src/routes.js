const express = require('express');

const postController = require('./controllers/postController');
const userController = require('./controllers/userController');
const { authRequired } = require('./middlewares/auth');

const {
    createVerify,
    loginVerify,
    queryVerify,
    postVerify,
    changePassword

} = require('./middlewares/fieldsVerify');



const router = express.Router();


// ====================== // User routes // ======================


//POST Register user
router.post("/register", createVerify, userController.register);

//POST Login user
router.post("/login", loginVerify, userController.login);



    // User profile (auth) //

//GET Find user
router.get("/profile", authRequired, userController.profile);

//PUT Update user 
router.put("/profile/change", authRequired, createVerify, userController.update);

//PUT Update password
router.put("/profile/change/password", authRequired, changePassword, userController.updatePassword);

//DELETE Delete user
router.delete("/profile", authRequired, userController.deleteUser);



    // Public routes(auth) //


//GET Find all
router.get("/user/list", authRequired, queryVerify, userController.showUsers);

//Find user
router.get("/user/:id", authRequired, userController.findUser);



// ====================== // Post routes // ======================


//POST create post
router.post("/profile/post", authRequired, postVerify, postController.create);

//UPDATE update post
router.put("/profile/post/:id", authRequired, postVerify, postController.update);

//DELETE delete post
router.delete("/profile/post/:id", authRequired, postController.deletePost);



module.exports = router;