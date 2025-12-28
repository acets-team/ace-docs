import { themes } from '@src/lib/vars'
import { vEnums, vParser } from '@ace/vParser'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'PUT',
  path: '/api/theme/:theme',
  parser: vParser.api({
    pathParams: { theme: vEnums(themes) }
  })
})

export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      scope.setCookie('theme', scope.pathParams.theme)
      return scope.success()
    })
}

export default createApi('apiSetTheme', info, resolver)
