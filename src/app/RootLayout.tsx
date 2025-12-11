import { Nav } from '@src/Nav/Nav'
import { Layout } from '@ace/layout'
import { Stream } from '@ace/stream'
import { Hero } from '@src/Hero/Hero'
import { Posts } from '@src/post/Posts'
import { Footer } from '@src/Footer/Footer'
import { Search } from '@src/search/Search'
import { useStore } from '@src/store/store'
import { createEffect, Show } from 'solid-js'
import { useIsRouting } from '@solidjs/router'
import { OnThisPage } from '@src/post/OnThisPage'
import { Collaborate } from '@src/post/Collaborate'
import apiGetPartners from '@src/api/apiGetPartners'
import { PartnersVertical } from '@src/post/PartnersVertical'


export default new Layout()
  .component((scope) => {
    const baseStore = useStore()

    const partners = new Stream({
      fn: apiGetPartners,
      queryKey: 'partners',
      store: [baseStore, 'partners']
    })

    createEffect(() => { // on route change => hide sidenav
      if (useIsRouting()()) baseStore.set('isSidenavVisible', false)
    })

    return <>
      <Nav baseStore={baseStore} />

      <Show when={scope.Location().pathname === '/'}>
        <Hero />
      </Show>

      <div class="post">
        <aside class="left" classList={{ visible: baseStore.store.isSidenavVisible }}>
          <OnThisPage baseStore={baseStore} />
          <Posts />
          <Collaborate />
          <PartnersVertical partners={partners} />
        </aside>
  
        <main>
          {scope.children}
        </main>

        <aside class="right">
          <OnThisPage baseStore={baseStore} />
          <Collaborate />
          <PartnersVertical partners={partners} />
        </aside>
      </div>

      <Footer />

      <Search baseStore={baseStore} />
    </>
  })
