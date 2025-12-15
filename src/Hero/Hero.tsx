import './Hero.css'
import { Tab } from '@ace/tabs'
import { Tron } from '@ace/tron'
import { Enums } from '@ace/enums'
import { Lottie } from '@ace/lottie'
import { Browser } from '@src/lib/Browser'
import { AceMarkdown } from '@ace/aceMarkdown'
import mdHeroApi from '@src/md/mdHeroApi.md?raw'
import { container } from '@mdit/plugin-container'
import mdHeroLive from '@src/md/mdHeroLive.md?raw'
import mdHeroForm from '@src/md/mdHeroForm.md?raw'
import mdHeroPost from '@src/md/mdHeroPost.md?raw'
import mdHeroAtoms from '@src/md/mdHeroAtoms.md?raw'
import { registerHljs } from '@src/init/registerHljs'
import mdHeroBrowser from '@src/md/mdHeroBrowser.md?raw'
import { hljsMarkdownItOptions } from '@ace/hljsMarkdownItOptions'
import { onMount, onCleanup, createSignal, type Accessor } from 'solid-js'



const heroMap: Record<string, HeroValue> = {
  'Post.tsx': [`Be Empowered!`, mdHeroPost],
  'apiGetPartners.ts': ['Ease Your Mind!', mdHeroApi],
  'atoms.ts': ['Be Persistent!', mdHeroAtoms],
  'Chat.tsx': ['Why Try?... Be!', mdHeroForm],
  'Live.tsx': ['Be Optimal!', mdHeroLive],
}



export function Hero() {
  animateBrowserTabs()
  const h1Util = animateH1()

  const className = () => {
    return h1Util.tabLabel()?.split('.')[0] ?? ''
  }

  return <>
    <section class="hero">
      <div class={`hero-support ${className()}`}>
        <h1 ref={h1Util.element} class="no-opacity" innerHTML={h1Util.heroTitle()} />

        <AceMarkdown
          components={[Lottie]}
          content={h1Util.heroDescription()}
          configPlugins={(md) => {
            md.use(container, { name: 'table-atoms' })
            md.use(container, { name: 'table-scroll' })
          }} />

        <div class="buttons">
          <Tron $div={{class: 'brand'}}>
            <a class="brand" href="#create-an-ace-app">Create an Ace App</a>
          </Tron>

          <Tron $div={{ class: 'brand default' }}>
            <a class="brand default" href="#">Join our Community</a>
          </Tron>
        </div>
      </div>

      <Browser
        content={mdHeroBrowser}
        registerHljs={registerHljs}
        setCurrentTab={h1Util.onSetBrowserTab}
        markdownItOptions={{ highlight: hljsMarkdownItOptions }} />
    </section>
  </>
}



function animateH1(): AnimateH1 {
  const typeSpeed = 111 // smaller = faster

  const [tabLabel, setTabLabel] = createSignal<string>()
  const [heroTitle, setHeroTitle] = createSignal<string>(heroMap['Post.tsx'][0])
  const [heroDescription, setHeroDescription] = createSignal<string>(heroMap['Post.tsx'][1])

  let typewritterAbort: AbortController | undefined
  onCleanup(() => typewritterAbort?.abort())

  const response: AnimateH1 = {
    element: undefined,
    tabLabel,
    heroTitle,
    heroDescription,
    async onSetBrowserTab (tab: Tab) {
      const heroMapValue = heroMap[tab.label as keyof typeof heroMap]
      if (!heroMapValue) return

      // cancel potentially ongoing typing animation
      typewritterAbort?.abort()
      typewritterAbort = new AbortController()

      const signal = typewritterAbort.signal

      setHeroTitle('')
      setTabLabel(tab.label)
      setHeroDescription(heroMapValue[1])

      response.element?.classList.remove('no-opacity')

      for (const char of heroMapValue[0]) {
        await typewritter(typeSpeed, signal)
        setHeroTitle(v => v + char)
      }
    }
  }

  return response
}



function typewritter(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    const onAbort = () => {
      clearTimeout(id)
      signal.removeEventListener('abort', onAbort)
      reject(new DOMException('Aborted', 'AbortError'))
    }

    signal.addEventListener('abort', onAbort)
  })
}



function animateBrowserTabs() {
  onMount(() => {
    const tab1 = document.querySelector<HTMLDivElement>('.hero #tab-browser-1')
    const tab2 = document.querySelector<HTMLDivElement>('.hero #tab-browser-2')
    const tab3 = document.querySelector<HTMLDivElement>('.hero #tab-browser-3')
    const tab4 = document.querySelector<HTMLDivElement>('.hero #tab-browser-4')

    if (!tab1) throw new Error('!tab1')
    if (!tab2) throw new Error('!tab2')
    if (!tab3) throw new Error('!tab3')
    if (!tab4) throw new Error('!tab4')

    const css = new Enums(['aware', 'awareSpeed'])

    const timer1 = setTimeout(() => {
      tab1.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, 2100)

    const timer2 = setTimeout(() => {
      tab2.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, 2600)

    const timer3 = setTimeout(() => {
      tab3.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, 3100)

    const timer4 = setTimeout(() => {
      tab4.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, 3600)

    const timer5 = setTimeout(() => {
      tab1.classList.remove(css.keys.aware)
      tab2.classList.remove(css.keys.aware)
      tab3.classList.remove(css.keys.aware)
      tab4.classList.remove(css.keys.aware)
    }, 5400)

    const timer6 = setTimeout(() => {
      tab1.classList.remove(css.keys.awareSpeed)
      tab2.classList.remove(css.keys.awareSpeed)
      tab3.classList.remove(css.keys.awareSpeed)
      tab4.classList.remove(css.keys.awareSpeed)
    }, 7500)

    onCleanup(() => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
    })
  })
}


/** `[h1, description]` */
type HeroValue = [string, string]


type AnimateH1 = {
  element: HTMLHeadingElement | undefined,
  onSetBrowserTab: (tab: Tab) => void,
  tabLabel: Accessor<undefined | string>,
  heroTitle: Accessor<string>,
  heroDescription: Accessor<string>
}
