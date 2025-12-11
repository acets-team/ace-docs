import { db } from '@src/db/db'
import { vParser, vString } from '@ace/vParser'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'GET',
  path: '/api/post/:slug',
  parser: vParser.api({
    pathParams: {
      slug: vString()
    }
  })
})

export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      const post = await db.query.posts.findFirst({ where: (r, { eq }) => eq(r.slug, req.pathParams.slug) })
      if(!post) throw new Error('Please include a valid slug', { cause: { slug: req.pathParams.slug } })
      return scope.success(post)
    })
}


export default createApi('apiGetPost', info, resolver)
