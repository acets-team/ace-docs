import { atoms, AtomsContext } from './atoms'
import { createAtomsProvider } from '@ace/createAtomsProvider'


export const AtomsProvider = createAtomsProvider({
  atoms,
  AtomsContext,
})
