import '@ace/base.styles.css' // 🚨 Must be the first CSS import in app.tsx

import './app.css'
import './post/post.css'
import './Search/Search.css'
import '@ace/tron.styles.css'
import '@ace/tabs.styles.css'
import '@ace/modal.styles.css'
import '@ace/toast.styles.css'
import '@ace/pulse.styles.css'
import '@ace/loading.styles.css'
import '@ace/tooltip.styles.css'
import '@ace/dropdown.styles.css'
import { BaseApp } from '@ace/baseApp'
import { AtomsProvider } from '@src/store/AtomsProvider'


export default function App() {
  return <>
    <AtomsProvider>
      <BaseApp />
    </AtomsProvider>
  </>
}
