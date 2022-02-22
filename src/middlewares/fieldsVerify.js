module.exports = {



    // ====================== // Create. Field Validations // ======================

    createVerify: ((req, res, next) => {
        const { name, email, password } = req.body;

        // Name Validation

        if(!name) {
            return res.status(400).json({ error: "Preencha o campo name." });
        }

        if(name.length < 3) {
            return res.status(400).json({ error: "O campo name deve ter ao menos 3 caracteres." });
        }

        if(name.length > 50) {
            return res.status(400).json({ error: "O campo name deve ter no máximo 60 caracteres." });
        }

        if(!/^[a-zá-ú ]+$/i.test(name)){
            return res.status(400).json({ error: "O campo nome deve ter apenas letras." });
        }




        //Email Validation

        if(!email) {
            return res.status(400).json({ error: "Preencha o campo email." });
        }
        
        if(!/^[a-z-0-9-_]+@[a-z.]+$/i.test(email)) {
            return res.status(400).json({ error: "Informe um email válido." });
        }

        if(email.length > 60) {
            return res.status(400).json({ error: "O campo email deve ter no máximo 60 caracteres." });
        }





        //Password Validation

        if(req.method.toLowerCase() == "post") {

            if(!password){
                return res.status(400).json({ error:"Preecha o campo password." });
            }

            if(password.length > 60) {
                return res.status(400).json({ error: "O campo senha deve ter no máximo 60 caracteres." });
            }

            if(password.length < 8) {
                return res.status(400).json({ error: "O campo password deve ter ao menos 8 caracteres." });
            }
        }

       return next();

    }),



    // ====================== // Login. Field Validations // ======================
    
    loginVerify: ((req, res, next) => {
        const { email, password } = req.body;


        //Login validations

        if(!email || !password) {
            return res.status(400).json({ error: "Informe email e password." });
        }

        if(password.length > 60) {
            return res.status(400).json({ error: "O campo senha deve ter no máximo 60 caracteres." });
        }

        //Email validations

        if(!/^[a-z-0-9-_]+@[a-z.]+$/i.test(email)) {
            return res.status(400).json({ error: "Informe um email válido." });
        }

        return next();

    }),




    // ====================== // Post. update password // ======================

    changePassword: ((req, res, next) => {
        const {oldpassword, newpassword } = req.body;


        if(!newpassword || !oldpassword){
            return res.status(400).json({ error:"Preecha os campos oldpassword e newpassword." });
        }

        if(newpassword.length > 60 || oldpassword.length > 60) {
            return res.status(400).json({ error: "Os campos oldpassword e newpassword, deve ter no máximo 60 caracteres." });
        }

        if(newpassword.length < 8 || oldpassword.length < 8) {
            return res.status(400).json({ error: "Os campos oldpassword e newpassword, deve ter ao menos 8 caracteres." });
        }

        return next();
    }),





    // ====================== // Post. New post // ======================

    postVerify: ((req, res, next) => {
        const { title, description } = req.body;

        //Title validations
        if(!title) {
            return res.status(400).json({ error:"Preecha o campo title." });
        }

        if(title.length > 60){
            return res.status(400).json({ error: "O campo title deve ter no máximo 60 caracteres." });
        }


        //Description validations
        if(!description) {
            return res.status(400).json({ error:"Preecha o campo description." });
        }

        return next();

    }),




    // ====================== // Query // ======================

    queryVerify: ((req, res, next) => {
        const { order, limit, page } = req.query;
        
        // Default
        
        let showOrder = "asc";
        let showLimit = 10;
        let showPage = 1;

        if(order === "desc"){
            showOrder = "desc"
        }

        if(!isNaN(limit) && limit > 0){
            showLimit = limit;
        }

        if(!isNaN(page) && page > 0){
            showPage = page;
        }

        req.order = showOrder;
        req.limit = showLimit;
        req.page = showPage;

        return next();

    })
}