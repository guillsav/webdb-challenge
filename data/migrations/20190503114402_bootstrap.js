exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable();

      tbl.text('description', 255).notNullable();

      tbl.boolean('completed').defaultTo(false);
    })
    .createTable('actions', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable();

      tbl.text('description', 255).notNullable();

      tbl.text('notes');
      tbl.boolean('completed').defaultTo(false);

      tbl
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions').dropTableIfExists('projects');
};
