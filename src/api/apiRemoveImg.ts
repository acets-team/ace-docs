import { vParser, vString } from '@ace/vParser'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'POST',
  path: '/api/remove-img/:key',
  parser: vParser.api({
    pathParams: { key: vString() }
  })
})

export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      if (!process.env.ACE_R2_SECRET) throw new Error('!process.env.ACE_R2_SECRET')

      const response = await scope.r2.delete({
        key: scope.pathParams.key,
        requestInit: {
          headers: { 'ACE_R2_SECRET': process.env.ACE_R2_SECRET }
        }
      })

      const {data, error} = await response.json()

      if (error) return scope.error(error) 
      else return scope.success(data)
    })
}

export default createApi('apiRemoveImg', info, resolver)
