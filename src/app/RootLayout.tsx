import { Show } from 'solid-js'
import { Nav } from '@src/Nav/Nav'
import { Stream } from '@ace/stream'
import { Hero } from '@src/Hero/Hero'
import { Posts } from '@src/post/Posts'
import { Footer } from '@src/Footer/Footer'
import { Search } from '@src/_Search/Search'
import { useAtoms } from '@src/store/atoms'
import { RootLayout } from '@ace/rootLayout'
import { Partners } from '@src/post/Partners'
import { OnThisPage } from '@src/post/OnThisPage'
import { Collaborate } from '@src/post/Collaborate'
import apiGetPartners from '@src/api/apiGetPartners'


export default new RootLayout((scope) => {
  const baseAtoms = useAtoms()

  const partners = new Stream({
    fn: apiGetPartners,
    queryKey: 'partners',
    atom: [baseAtoms, 'partners']
  })

  return <>
    <Nav />

    <Show when={scope.Location().pathname === '/'}>
      <Hero />
    </Show>

    <div class="post">
      <aside classList={{ visible: baseAtoms.store.isSidenavVisible }}>
        <Posts />
        <OnThisPage baseAtoms={baseAtoms} />

        <section class="unity">
          <Collaborate />
          <Partners partners={partners} />
        </section>
      </aside>

      <main>{scope.childrenRootLayout}</main>
    </div>

    <Footer />

    <Search baseAtoms={baseAtoms} />
  </>
})
