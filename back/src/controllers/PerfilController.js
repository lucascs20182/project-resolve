const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const aluno_id = req.headers.authorization;
        
        const desafios = await connection('desafios')
        .where('aluno_id', aluno_id)
        .select('*');
    
        return res.json(desafios);
    }
}