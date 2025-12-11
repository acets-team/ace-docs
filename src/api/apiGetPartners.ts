import { loremWords } from '@ace/lorem'
import type { Partner } from '@src/lib/types'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'GET',
  path: '/api/partners',
})


export async function resolver(req: ApiInfo2Req<typeof info>) {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      const companies: Partner[] = []

      for (let i = 0; i < 18; i++) {
        companies.push({
          id: i + 1,
          company: `Company ${i + 1}`,
          description: loremWords(8),
        })
      }

      // return scope.success(companies)

      for (let i = companies.length - 1; i > 0; i--) { // shuffle companies (fisher yates)
        const j = Math.floor(Math.random() * (i + 1))
          ;[companies[i], companies[j]] = [companies[j], companies[i]]
      }

      // group companies into pairs
      const partners: Partner[][] = []

      for (let i = 0; i < companies.length; i += 2) {
        partners.push(companies.slice(i, i + 2))
      }

      return scope.success(partners)
    })
}


export default createApi('apiGetPartners', info, resolver)
