import 'dotenv/config'
import { z } from 'zod'

const schemaEnv = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3131),
})

export const env = schemaEnv.parse(process.env)
