import type { themes } from './vars'
import type { InferEnums } from '@ace/enums'


export type Partner = { id: number, company: string, description: string }

export type SearchResult = {
  id: number
  title: string
  preview: string
  bm25: number
  slug: string
}

export type Theme = InferEnums<typeof themes>
