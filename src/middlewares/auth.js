const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.json");



module.exports = {


    // ====================== // Verify Token // ======================

    authRequired: ((req, res, next) => {
        const rawToken = req.headers.authorization;

        if(!rawToken) {
            return res.status(401).json({ error: "Token não informado." });
        }

        const parts = rawToken.split(' ');

        if(!parts.length == 2) {
            return res.status(401).json({ error: "O formato do token é inválido." });
        }

        const [schema, token] = parts;


        // Auth schema
        
        if(!/^Bearer$/i.test(schema)) {
            return res.status(401).json({ error: "Informe um schema válido." });
        }

        //Verify

        jwt.verify(token, secret, (err, user) => {
            if(err){
                return res.status(401).json({ error: "Token inválido." });
            }
            
            req.userId = user.userId
            next();
            
        });

    })

}