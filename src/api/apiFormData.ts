import { bytesMB } from '@ace/bytes'
import { vParser, vString, vImg } from '@ace/vParser'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'POST',
  path: '/api/form-data',
  parser: vParser.api({
    formData: {
      key: vString(),
      img: vImg({
        maxSize: 3 * bytesMB,
        allowedExtensions: ['svg', 'png', 'jpg', 'webp'],
      }),
    }
  })
})


export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .b4([sessionB4, adminB4])
    .res(async (scope) => {
      return scope.success(scope.event.locals.session)
    })
}


export default createApi('apiFormData', info, resolver)


import type { B4 } from '@ace/types'


export const sessionB4: B4<{ session: Session }> = async (scope) => {
  scope.event.locals.session = {
    isAdmin: true
  }
}

export const adminB4: B4<{ session: Session }> = async (scope) => {
  if (!scope.event.locals.session.isAdmin) throw new Error('Unauthorized') // ❌ same as return scope.error()
}

type Session = {
  isAdmin: boolean
}
