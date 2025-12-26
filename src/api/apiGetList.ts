import type { R2ResList, R2ResEither } from '@ace/vanilla'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'
import { optional, vNum, vParser, vString, vSearchParamsArray } from '@ace/vParser'


export const info = new ApiInfo({
  method: 'GET',
  path: '/api/list',
  parser: vParser.api({
    searchParams: {
      prefix: optional(vString()),
      cursor: optional(vString()),
      delimiter: optional(vString()),
      startAfter: optional(vString()),
      limit: optional(vNum({ allowNegative: false })),
      include: optional(vSearchParamsArray(['httpMetadata', 'customMetadata']))
    }
  })
})

export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      if (!process.env.ACE_R2_SECRET) throw new Error('!process.env.ACE_R2_SECRET')

      const response = await scope.r2.list({
        options: scope.searchParams,
        requestInit: {
          headers: { 'ACE_R2_SECRET': process.env.ACE_R2_SECRET }
        }
      })

      const { data, error } = await response.json() as R2ResEither

      if (error) return scope.error(error) 
      else return scope.success(data as R2ResList)
    })
}

export default createApi('apiGetList', info, resolver)
