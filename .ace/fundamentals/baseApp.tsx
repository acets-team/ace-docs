import RootLayout from "../../src/app/RootLayout"
import { Router } from '@solidjs/router'
import { MetaProvider } from '@solidjs/meta'
import { FileRoutes } from '@solidjs/start/router'
import { ScopeComponentContextProvider } from '@ace/scopeComponent'


export function BaseApp() {
  return <>
    <ScopeComponentContextProvider>
      <MetaProvider>
        <Router root={RootLayout.layout}>
          <FileRoutes />
        </Router>
      </MetaProvider>
    </ScopeComponentContextProvider>
  </>
}
