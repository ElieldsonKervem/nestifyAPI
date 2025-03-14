import Knex from 'knex'
import { env } from '../env/envConfig.ts'

export const config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },

  useNullAsDefault: true, // Recomenda-se para SQLite
}

export const knex = Knex(config)
