import './app.css'
import './post/post.css'
import './search/Search.css'
import '@ace/base.styles.css'
import '@ace/tron.styles.css'
import '@ace/tabs.styles.css'
import '@ace/modal.styles.css'
import '@ace/toast.styles.css'
import '@ace/pulse.styles.css'
import '@ace/loading.styles.css'
import '@ace/tooltip.styles.css'
import '@ace/dropdown.styles.css'
import { BaseApp } from '@ace/baseApp'
import { StoreProvider } from '@src/store/store'


export default function App() {
  return <>
    <StoreProvider>
      <BaseApp />
    </StoreProvider>
  </>
}
