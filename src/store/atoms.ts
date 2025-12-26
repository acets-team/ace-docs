import { Atom } from '@ace/atom'
import { createAtoms } from '@ace/createAtoms'
import { AceMarkdownHeading } from '@ace/aceMarkdown'
import type { InferAtoms, ApiName2Either } from '@ace/types'


export const { atoms, useAtoms, AtomsContext } = createAtoms({
  searchQuery: new Atom({ save: 'idb', init: '' }),
  isSidenavVisible: new Atom({ save: 'm', init: false }),
  headings: new Atom<AceMarkdownHeading[]>({ save: 'm', is: 'json', init: [] }),
  whatIsAce: new Atom<ApiName2Either<'apiGetPost'>>({ save: 'idb', is: 'json' }),
  partners: new Atom<ApiName2Either<'apiGetPartners'>>({ save: 'idb', is: 'json' }),
  searchResults: new Atom<ApiName2Either<'apiSearch'>['data']>({ save: 'idb', is: 'json' }),
})


export type BaseAtoms = InferAtoms<typeof atoms>
