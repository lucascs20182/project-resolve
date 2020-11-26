const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const aluno = await connection('alunos').
            where('id', id)
            .select('nome')
            .first();

        if(!aluno) {
            return res.status(400).json({ error: 'No aluno found with this ID' });
        }

        return res.json(aluno);
    }
}