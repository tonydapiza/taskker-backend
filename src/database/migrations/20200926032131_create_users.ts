import * as Knex from 'knex';


/**
 *
 * @param {Knex} knex The knex Object
 * @return {Promise<void>} A generic void Promise
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users',
      function(table: Knex.CreateTableBuilder) {
        table.string('id', 30).primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('contact', 30).notNullable();
        table.string('password').notNullable();
        table.string('photo_url').notNullable();
        table.timestamps(true, true);
      });
};


/**
 *
 * @param {Knex} knex The knex Object
 * @return {Promise<void>} A generic void Promise
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
};
