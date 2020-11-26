const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query; //se ele não existir, por padrão =1

        const [count] = await connection('desafios').count();

        //console.log(count);
        
        const desafios = await connection('desafios')
            .join('alunos', 'alunos.id', '=', 'desafios.aluno_id')
            .limit(5)
            .offset((page-1) * 5) //na page 1 na verdade precisa pular 0
            .select(['desafios.*', 'alunos.nome', 'alunos.email', 
                'alunos.whatsapp', 'alunos.curso', 'alunos.periodo']);

        res.header('X-Total-Count', count['count(*)']);
    
        return res.json(desafios);
    },

    async create(req, res) {
        const { titulo, descricao, prazo } = req.body;
        const aluno_id = req.headers.authorization;

        const [id] = await connection('desafios').insert({
            titulo,
            descricao,
            prazo,
            aluno_id
        })

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const aluno_id = req.headers.authorization;

        const desafio = await connection('desafios')
            .where('id', id)
            .select('aluno_id')
            .first();

        if (desafio.aluno_id !== aluno_id) {
            return res.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('desafios').where('id', id).delete();

        return res.status(204).send(); //código do no content
    }
}