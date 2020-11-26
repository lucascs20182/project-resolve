const express = require('express');

const AlunoController = require('./controllers/AlunoController');
const DesafioController = require('./controllers/DesafioController');
const PerfilController = require('./controllers/PerfilController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//mostra a intenção ao acessar a rota
routes.post('/sessions', SessionController.create); //post não vai criar exatamente nada dentro do bd, 

routes.get('/alunos',  AlunoController.index);
routes.post('/alunos', AlunoController.create);

routes.get('/perfil',  PerfilController.index);

routes.get('/desafios', DesafioController.index);
routes.post('/desafios', DesafioController.create);
routes.delete('/desafios/:id', DesafioController.delete);

module.exports = routes;