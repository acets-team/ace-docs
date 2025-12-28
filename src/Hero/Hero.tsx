import './Hero.css'
import { Tab } from '@ace/tabs'
import { Tron } from '@ace/tron'
import { msSecond } from '@ace/ms'
import { Enums } from '@ace/enums'
import { Lottie } from '@ace/lottie'
import { onClean } from '@ace/onClean'
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
  'Post.tsx': ['<span class="pop">Optimal</span> Code for Web <span class="pop">Developers</span>', mdHeroPost],
  // 'Post.tsx': [`Is Your Framework Supporting Offline, SEO Markdown & Api Streaming This Easilly, Affordably & Type Safely?`, mdHeroPost],
  'apiGetPartners.ts': ['Ease Your Mind!', mdHeroApi],
  'atoms.ts': ['Be Persistent!', mdHeroAtoms],
  'Chat.tsx': ['Why Try?... Be!', mdHeroForm],
  'Live.tsx': ['Be Optimal!', mdHeroLive],
}



export function Hero() {
  animateBrowserTabs()
  const h1Util = setHero()

  const className = () => {
    return h1Util.tabLabel()?.split('.')[0] ?? ''
  }

  return <>
    <div class="hero">

      <section class="code-support">
        <div class={`support ${className()}`}>
          <div class="ticker">
            <div ref={refTicker()} class="text"></div>
          </div>

          <h1 ref={h1Util.element} innerHTML={h1Util.heroTitle()} />

          <AceMarkdown
            components={[Lottie]}
            content={h1Util.heroDescription()}
            configPlugins={(md) => {
              md.use(container, { name: 'table-atoms' })
              md.use(container, { name: 'table-scroll' })
            }} />

          <div class="buttons">
            <Tron $div={{ class: 'brand' }} color="var(--ace-primary)">
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

      <h2 class="carousel-heading">Ready to <span class="pop">Develop</span> with the <span class="pop">Best</span>?</h2>

      <div ref={refCarousel()} class="carousel">
        <div class="track">
          <CarouselPlugins />
          <CarouselPlugins />
        </div>
      </div>
    </div>
  </>
}



function refTicker() {
  return (el: HTMLDivElement) => {
    if (el instanceof HTMLDivElement) {
      let index = 0
      const swapInterval = 6 * msSecond

      el.innerText = pricingData[index]
      el.classList.add('centered')
      index = 1

      const intervalId = setInterval(updateTicker, swapInterval)

      function updateTicker() {
        // start exit animation
        el.classList.remove('centered')
        el.classList.add('above')

        setTimeout(() => {
          el.innerText = pricingData[index] // change content

          el.classList.remove('above') // no longer exiting

          el.classList.add('centered') // start entering w/ new content

          index = (index + 1) % pricingData.length // increment index
        }, 690) // match the CSS transition duration
      }

      onClean(() => {
        clearInterval(intervalId)
      })
    }
  }
}



const pricingData = [
  '💜 500 Million SQL Reads a Month for FREE!',
  '💜 10 Million File Reads a Month for FREE!',
  '💜 100,000 Serverless Requests a Day for FREE!',
  '💜 Per Developer Cost is Absolutely FREE!',
]



function CarouselPlugins() {
  return <>
    <CarouselPluin name="Markdown-It" src="markdownIt.svg" href="https://markdown-it.github.io/markdown-it/" />
    <CarouselPluin name="Highlight.js" src="hljs.webp" href="https://github.com/highlightjs/highlight.js" />
    <CarouselPluin name="Solid" src="solid.webp" href="https://docs.solidjs.com/" />
    <CarouselPluin name="Valibot" src="valibot.webp" href="https://valibot.dev/guides/comparison/" />
    <CarouselPluin name="Chart.js" src="chartjs.svg" href="https://www.chartjs.org/" />
    <CarouselPluin name="Drizzle" src="drizzle.webp" href="https://orm.drizzle.team/" />
    <CarouselPluin name="Turso" src="turso.svg" href="https://turso.tech/" />
    <CarouselPluin name="Lottie" src="lottie.webp" href="https://lottiefiles.com/featured-free-animations" />
    <CarouselPluin name="Cloudflare" src="cloudflare.svg" href="https://www.cloudflare.com/" />
    <CarouselPluin name="AgGrid" src="agGrid.webp" href="https://www.ag-grid.com/" />
    <CarouselPluin name="Brevo" src="brevo.webp" href="https://www.brevo.com/" />
  </>
}



function CarouselPluin(props: {href: string, src: string, name: string}) {
  return <>
    <a href={props.href} target="_blank" rel="noopener noreferrer"
      class="plugin plain track__plugin">
      <img src={`/plugins/${props.src}`} class="logo" alt={`${props.name} Logo`} />
      <span class="name">{props.name}</span>
    </a>
  </>
}



function refCarousel() {
  return (wrapper: HTMLDivElement) => {
    if (wrapper instanceof HTMLDivElement) {
      const track = wrapper.firstChild
      if (!(track instanceof HTMLDivElement)) throw new Error('!(track instanceof HTMLDivElement)')

      let requestAnimationFrameId: undefined | number

      const speed = 0.81 // the number of pixels the carousel will move in a single frame

      let currentX = 0
      let isPaused = false

      wrapper.addEventListener('mouseenter', pause)
      wrapper.addEventListener('mouseleave', resume)

      const readyTimer = setTimeout(animate, 1.8 * msSecond) // start after 3 seconds to allow lottie to load

      onClean(() => {
        wrapper.removeEventListener('mouseenter', pause)
        wrapper.removeEventListener('mouseleave', resume)
        if (readyTimer) clearTimeout(readyTimer)
        if (requestAnimationFrameId !== undefined) cancelAnimationFrame(requestAnimationFrameId)
      })

      function pause() {
        isPaused = true
      }

      function resume() {
        isPaused = false
      }

      function animate() {
        if (!isPaused && track instanceof HTMLDivElement) {
          currentX -= speed // moving the track to the left

          // Math.abs(currentX): As the carousel moves to the left, currentX becomes more negative. Math.abs turns that it a positive number so we can easily compare it to the width
          // track.scrollWidth / 2: This calculates where the first set of plugins ends and the second set begins (b/c there are 2 sets of plugins in the track)
          // we reset when one-third has scrolled past
          if (Math.abs(currentX) >= track.scrollWidth / 2) {
            currentX = 0
          }

          track.style.transform = `translateX(${currentX}px)` // setting the new track position
        }

        requestAnimationFrameId = requestAnimationFrame(animate) // call animate before the next repaint, raf syncs w/ hardware so if they have a 60Hz monitor, it runs 60 times a second & if they have a 144Hz monitor, it runs 144 times a second
      }
    }
  }
}



function setHero(): SetHeroResponse {
  const [tabLabel, setTabLabel] = createSignal<string>()
  const [heroTitle, setHeroTitle] = createSignal<string>(heroMap['Post.tsx'][0])
  const [heroDescription, setHeroDescription] = createSignal<string>(heroMap['Post.tsx'][1])

  const response: SetHeroResponse = {
    element: undefined,
    tabLabel,
    heroTitle,
    heroDescription,
    async onSetBrowserTab (tab: Tab) {
      const heroMapValue = heroMap[tab.label as keyof typeof heroMap]
      if (!heroMapValue) return

      setTabLabel(tab.label)
      setHeroTitle(heroMapValue[0])
      setHeroDescription(heroMapValue[1])
    }
  }

  return response
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

    const initialDelay = 3600
    const css = new Enums(['aware', 'awareSpeed'])

    const timer1 = setTimeout(() => {
      tab1.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, initialDelay)

    const timer2 = setTimeout(() => {
      tab2.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, initialDelay + 500)

    const timer3 = setTimeout(() => {
      tab3.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, initialDelay + 1000)

    const timer4 = setTimeout(() => {
      tab4.classList.add(css.keys.aware, css.keys.awareSpeed)
    }, initialDelay + 1500)

    const timer5 = setTimeout(() => {
      tab1.classList.remove(css.keys.aware)
      tab2.classList.remove(css.keys.aware)
      tab3.classList.remove(css.keys.aware)
      tab4.classList.remove(css.keys.aware)
    }, initialDelay + 3000)

    const timer6 = setTimeout(() => {
      tab1.classList.remove(css.keys.awareSpeed)
      tab2.classList.remove(css.keys.awareSpeed)
      tab3.classList.remove(css.keys.awareSpeed)
      tab4.classList.remove(css.keys.awareSpeed)
    }, initialDelay + 4500)

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


type SetHeroResponse = {
  element: HTMLHeadingElement | undefined,
  onSetBrowserTab: (tab: Tab) => void,
  tabLabel: Accessor<undefined | string>,
  heroTitle: Accessor<string>,
  heroDescription: Accessor<string>
}
