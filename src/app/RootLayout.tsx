import { Show } from 'solid-js'
import { Load } from '@ace/load'
import { Nav } from '@src/Nav/Nav'
import { Stream } from '@ace/stream'
import { Hero } from '@src/Hero/Hero'
import { Posts } from '@src/post/Posts'
import { Footer } from '@src/Footer/Footer'
import { Search } from '@src/Search/Search'
import { useAtoms } from '@src/store/atoms'
import { RootLayout } from '@ace/rootLayout'
import { Partners } from '@src/post/Partners'
import { OnThisPage } from '@src/post/OnThisPage'
import { Collaborate } from '@src/post/Collaborate'
import apiGetPartners from '@src/api/apiGetPartners'
import apiGetPostGroups from '@src/api/apiGetPostGroups'


export default new RootLayout((scope) => {
  const baseAtoms = useAtoms()

  const partners = new Stream({
    fn: apiGetPartners,
    queryKey: 'apiGetPartners',
    atom: [baseAtoms, 'apiGetPartners']
  })

  const postGroups = new Load({
    fn: apiGetPostGroups,
    queryKey: 'apiGetPostGroups',
    atom: [baseAtoms, 'apiGetPostGroups']
  })

  return <>
    <Nav />

    <Show when={scope.Location().pathname === '/'}>
      <Hero />
    </Show>

    <div class="post">
      <aside classList={{ visible: baseAtoms.store.isSidenavVisible }}>
        <Posts postGroups={postGroups} />
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
