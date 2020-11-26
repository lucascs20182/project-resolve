exports.up = function(knex) {
    return knex.schema.createTable('desafios', function(table) {
        table.increments();

        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.string('prazo');

        table.string('aluno_id').notNullable();
        
        table.foreign('aluno_id').references('id').inTable('alunos');
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('desafios');
};
