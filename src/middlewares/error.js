module.exports = {

    //Json parse error
    jsonError: ((err, req, res, next) => {
        
        if(err.name === "SyntaxError" && err.type === "entity.parse.failed"){
            return res.status(400).json({ error: "Erro no corpo da requisição." });
        }
        
        return next(err);
    })


}