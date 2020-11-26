exports.up = function(knex) {
    return knex.schema.createTable('alunos', function(table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('curso').notNullable();
        table.string('periodo', 2).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('alunos');
};
