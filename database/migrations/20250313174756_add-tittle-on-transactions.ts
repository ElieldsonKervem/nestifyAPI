import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.string('title')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('title')
}
