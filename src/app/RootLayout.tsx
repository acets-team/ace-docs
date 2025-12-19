import { Show } from 'solid-js'
import { Nav } from '@src/Nav/Nav'
import { Stream } from '@ace/stream'
import { Hero } from '@src/Hero/Hero'
import { Posts } from '@src/post/Posts'
import { Footer } from '@src/Footer/Footer'
import { Search } from '@src/search/Search'
import { useStore } from '@src/store/store'
import { RootLayout } from '@ace/rootLayout'
import { OnThisPage } from '@src/post/OnThisPage'
import { Collaborate } from '@src/post/Collaborate'
import apiGetPartners from '@src/api/apiGetPartners'
import { PartnersVertical } from '@src/post/PartnersVertical'


export default new RootLayout((scope) => {
  const baseStore = useStore()

  const partners = new Stream({
    fn: apiGetPartners,
    queryKey: 'partners',
    store: [baseStore, 'partners']
  })

  return <>
    <Nav />

    <Show when={scope.Location().pathname === '/'}>
      <Hero />
    </Show>

    <div class="post">
      <aside classList={{ visible: baseStore.store.isSidenavVisible }}>
        <Posts />
        <OnThisPage baseStore={baseStore} />

        <section class="unity">
          <Collaborate />
          <PartnersVertical partners={partners} />
        </section>
      </aside>

      <main>{scope.childrenRootLayout}</main>
    </div>

    <Footer />

    <Search baseStore={baseStore} />
  </>
})
