const express = require('express');
const cors = require('cors');
const routes = require('./routes'); //usar o ./ para mostrar ao node que é arquivo, não pacote (como express)

const app = express();

app.use(cors()); //adicionar origin: 'http://meuapp.com' pra permitir só tal page acessar back-end
app.use(express.json());
app.use(routes);

app.listen(3333);