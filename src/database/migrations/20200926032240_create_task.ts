
import * as Knex from 'knex';


/**
 *
 * @param {Knex} knex The knex Object
 * @return {Promise<void>} A generic void Promise
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task',
      function(table: Knex.CreateTableBuilder) {
        table.string('id', 11).primary().notNullable();
        table.string('name', 50).notNullable();
        table.enum('status', ['checked', 'not_checked']).notNullable();
        table.string('time_slice').notNullable();
        table.integer('weight').notNullable();
        // create a helper message to compute the weigth quality of the task
        table.string('group_id', 11).notNullable();
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
  return knex.schema.dropTable('task');
};
