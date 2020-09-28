import * as Knex from 'knex';

/**
 *
 * @param {Knex} knex The knex Object
 * @return {Promise<void>} A generic void Promise
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Gtask_group',
      function(table: Knex.CreateTableBuilder) {
        table.string('id', 11).primary().notNullable();
        table.string('owner_id', 11).notNullable();
        table.string('group_id', 11).notNullable();
        table.foreign('owner_id')
            .references('id')
            .inTable('users');
        table.foreign('group_id')
            .references('id')
            .inTable('task_group');
        table.timestamps(true, true);
      });
};

/**
 *
 * @param {Knex} knex The knex Object
 * @return {Promise<void>} A generic void Promise
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Gtask_group');
};

