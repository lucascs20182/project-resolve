const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const alunos = await connection('alunos').select('*');
    
        return res.json(alunos);
    },

    async create(req, res) {
        //const data = req.body;

        //desestruturação pra pegar em variáveis separadas
        const { nome, email, whatsapp, curso, periodo } = req.body;

        //console.log(data);
        const id = crypto.randomBytes(4).toString('HEX');

        //precisa aguardar esse código finalizar (carregar na db) pra continuar
        await connection('alunos').insert({
            id, 
            nome,
            email,
            whatsapp,
            curso,
            periodo
        });

        return res.json({ id });
    }
}