import type { Config } from 'drizzle-kit'
import { env } from './.ace/fundamentals/env'

let dbCredentials

if (env === 'local') dbCredentials = { url: 'http://127.0.0.1:8080', }
else {
  if (!process.env.TURSO_DATABASE_URL) throw '!process.env.TURSO_DATABASE_URL'
  if (!process.env.TURSO_AUTH_TOKEN) throw '!process.env.TURSO_AUTH_TOKEN'

  dbCredentials = {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  }
}

export default {
  dbCredentials,
  out: './migrations',
  schema: './src/db/db.ts',
  dialect: env === 'local' ? 'sqlite' : 'turso',
} satisfies Config
