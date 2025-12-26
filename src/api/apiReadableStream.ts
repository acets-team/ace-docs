import { bytesMB } from '@ace/bytes'
import { picklist, vNum, vParser, vString } from '@ace/vParser'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'POST',
  readableStream: true,
  path: '/api/readable-stream/:key',
  parser: vParser.api({
    pathParams: { key: vString() },
    headers: {
      'content-type': picklist(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
      'content-length': vNum({ range: { min: 1, max: 3 * bytesMB }, errorMessage: 'Please provide an image that is less then 3MB' }),
    }
  })
})


export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      if (!process.env.ACE_R2_SECRET) throw new Error('!process.env.ACE_R2_SECRET')

      const response = await scope.r2.put({
        data: { key: scope.pathParams.key, file: scope.readableStream },
        requestInit: {
          headers: {
            ...scope.requestHeaders,
            'ACE_R2_SECRET': process.env.ACE_R2_SECRET
          }
        }
      })

      const {data, error} = await response.json()

      if (error) return scope.error(error) 
      else return scope.success(data)
    })
}


export default createApi('apiReadableStream', info, resolver)
