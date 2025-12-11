import { Atom } from '@ace/atom'
import { AceMarkdownHeading } from '@ace/aceMarkdown'
import type { BaseStoreCtx, ApiName2Either } from '@ace/types'


export const atoms = {
  searchQuery: new Atom<string>({ save: 'idb', init: '' }),
  isSidenavVisible: new Atom<boolean>({ save: 'm', init: false }),
  headings: new Atom<AceMarkdownHeading[]>({ save: 'm', is: 'json', init: [] }),
  whatIsAce: new Atom<ApiName2Either<'apiGetPost'>>({ save: 'idb', is: 'json' }),
  partners: new Atom<ApiName2Either<'apiGetPartners'>>({ save: 'idb', is: 'json' }),
  searchResults: new Atom<ApiName2Either<'apiSearch'>['data']>({ save: 'idb', is: 'json' }),
}


export type BaseStore = BaseStoreCtx<typeof atoms>
