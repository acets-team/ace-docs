import { db } from '@src/db/db'
import { sql } from 'drizzle-orm'
import { vParser, vString } from '@ace/vParser'
import type { SearchResult } from '@src/lib/types'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'GET',
  path: '/api/search/:query',
  parser: vParser.api({
    pathParams: {
      query: vString()
    }
  })
})

export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      const query = decodeURIComponent(scope.pathParams.query).replace(/[^a-zA-Z0-9]/g, " ")

      const results = await db.run(sql`
        SELECT 
          p.id,
          p.slug,
          p.title,
          snippet(posts_fts, -1, '<mark>', '</mark>', ' … ', 30) AS preview,
          bm25(posts_fts, 50, 1) as bm25
        FROM posts p
        JOIN posts_fts ON posts_fts.rowid = p.id
        WHERE posts_fts MATCH ${query}
        ORDER BY bm25
        LIMIT 9;
      `)

      return scope.success(results.rows as unknown as SearchResult[])
    })
}


export default createApi('apiSearch', info, resolver)
