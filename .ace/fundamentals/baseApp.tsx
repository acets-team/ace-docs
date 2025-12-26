import RootLayout from "../../src/app/RootLayout"
import { Router } from '@solidjs/router'
import { MetaProvider } from '@solidjs/meta'
import { FileRoutes } from '@solidjs/start/router'
import { ScopeComponentProvider } from '@ace/scopeComponentProvider'


export function BaseApp() {
  return <>
    <ScopeComponentProvider>
      <MetaProvider>
        <Router root={RootLayout.layout}>
          <FileRoutes />
        </Router>
      </MetaProvider>
    </ScopeComponentProvider>
  </>
}
