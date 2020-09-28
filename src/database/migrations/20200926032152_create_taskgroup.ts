import * as Knex from 'knex';


/**
 *
 * @param {Knex} knex The knex Object
 * @return {Promise<void>} A generic void Promise
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task_group',
      function(table: Knex.CreateTableBuilder) {
        table.string('id', 11).primary().notNullable();
        table.string('name', 50).notNullable();
        table.string('owner_id', 11).notNullable();
        table.string('duration').notNullable();
        table.string('start').notNullable();
        table.string('end').notNullable();
        table.float('status').notNullable();
        // write a helper message to compute this
        table.foreign('owner_id')
            .references('id')
            .inTable('users');
        table.timestamps(true, true);
      });
};

/**
 *
 * @param {Knex} knex The knex Object
 * @return {Promise<void>} A generic void Promise
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('task_group');
};

