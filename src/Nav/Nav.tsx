import './Nav.css'
import { A } from '@ace/a'
import { Tron } from '@ace/tron'
import { Async } from '@ace/async'
import { themes } from '@src/lib/vars'
import { onClean } from '@ace/onClean'
import { showModal } from '@ace/modal'
import { debounce } from '@ace/debounce'
import type { Theme } from '@src/lib/types'
import { useAtoms } from '@src/store/atoms'
import { showErrorToast } from '@ace/toast'
import apiSetTheme from '@src/api/apiSetTheme'
import type { BaseAtoms } from '@src/store/atoms'
import { isClickOutsideAll } from '@ace/isClickOutsideAll'
import { createSignal, For, type JSX } from 'solid-js'
import { refDropdown, type DropdownContent } from '@ace/dropdown'
import { svg_npm, svg_search, svg_github, svg_twitter, svg_youtube, svg_command, svg_discord, svg_menu, svg_vertical_dots, svg_sun, svg_moon } from '@src/lib/svgs'



export function Nav() {
  const baseAtoms = useAtoms()

  const [isDropdownVisible, setIsDropdownVisible] = createSignal<boolean>()

  const dropdown = refDropdown(() => ({
    setIsDropdownVisible,
    $div: { class: 'nav-dropdown' },
    content: createDropdownContent(baseAtoms)
  }))

  const refSidenavButton = (button: HTMLButtonElement) => {
    if (button instanceof HTMLButtonElement) {
      const cleanIsClickOutsideAll = isClickOutsideAll({
        aimElements: [button],
        fn: () => baseAtoms.set('isSidenavVisible', false)
      })

      onClean(() => {
        cleanIsClickOutsideAll()
      })
    }
  }

  const refNav = (nav: HTMLElement) => {
    if (nav instanceof HTMLElement && nav.tagName === 'NAV') {
      const threshold = 72
      const debounceDelay = 60
      const className = 'lower'

      const checkScrollPosition = () => {
        if (window.scrollY > threshold) nav.classList.add(className) // below threshold -> add class
        else nav.classList.remove(className) // above threshold -> remove class
      }

      checkScrollPosition() // initial check when the page loads

      const debouncedCheck = debounce(checkScrollPosition, debounceDelay) // limit how often it runs, on each call delay resets

      window.addEventListener('scroll', debouncedCheck, { passive: true }) // { passive: true } is a performance hint to the browser, saying the handler won't call preventDefault()

      onClean(() => {
        window.removeEventListener('scroll', debouncedCheck)
      })
    }
  }

  return <>
    <nav ref={refNav}>
      <div class="nav-inner">
        <div class="bg"></div>

        <div class="left">
          <Tron borderRadius="50%" $div={{ class: 'menu-toggle' }}>
            <button ref={refSidenavButton} class="ace-tron__center" onClick={() => baseAtoms.set('isSidenavVisible', v => !v)}>{svg_menu()}</button>
          </Tron>
          <A path="/" $a={{ class: 'logo', end: true, onClick: onLogoClick }}>
            <img src="/logo.webp" />
          </A>
        </div>

        <div class="right">
          <div class="search">
            <div class="lens">{svg_search()}</div>
            <div class="placeholder">Search</div>

            <Tron zIndex="calc(var(--ace-z-nav) + 1)">
              <button onClick={() => showModal('search')} class="input" type="button" />
            </Tron>

            <div class="hot">
              <div class="command">{svg_command()}</div>
              <div class="k">K</div>
            </div>
          </div>

          <Tron status={isDropdownVisible() ? 'infinite' : 'hover'} borderRadius="50%" $div={{ class: 'icon' }}>
            <div ref={dropdown} class="ace-tron__center">{svg_vertical_dots()}</div>
          </Tron>
        </div>
      </div>
    </nav>
  </>
}



function createDropdownContent(baseAtoms: BaseAtoms): DropdownContent {

  return ({ setIsVisible }) => {
    return <>
      <div class="ace-dropdown__title">🎯 On This Page</div>
      <For each={baseAtoms.store.headings}>{
        (heading) => <a class="ace-dropdown__item plain" href={`#${heading.slug}`} onClick={() => setIsVisible(false)}>{heading.label}</a>
      }</For>


      <div class="ace-dropdown__divider"></div>


      <div class="ace-dropdown__title">🤝 Socials</div>
      <SocialLink label="NPM" svg={svg_npm} />
      <SocialLink label="GitHub" svg={svg_github} />
      <SocialLink label="Discord" svg={svg_discord} />
      <SocialLink label="Twitter" svg={svg_twitter} />
      <SocialLink label="YouTube" svg={svg_youtube} />


      <div class="ace-dropdown__divider"></div>


      <div class="ace-dropdown__title">🎨 Theme</div>
      <ThemeButton theme={themes.keys.dark} label="Dark Mode" svg={svg_moon} />
      <ThemeButton theme={themes.keys.light} label="Light Mode" svg={svg_sun} />
    </>
  }
}



function SocialLink(props: { label: string, svg: () => JSX.Element }) {
  return <>
    <a href="" class="ace-dropdown__item plain" target="_blank">
      <span>{props.label}</span>
      {props.svg()}
    </a>
  </>
}



function ThemeButton(props: { theme: Theme, label: string, svg: () => JSX.Element }) {
  const useApiSetTheme = new Async(apiSetTheme)

  const onClick = async () => {
    const res = await useApiSetTheme.run({ pathParams: { theme: props.theme }})

    if (res.error?.message) showErrorToast(res.error.message)
    else document.documentElement.setAttribute('data-theme', props.theme)
  }

  return <>
    <button onClick={onClick} class="ace-dropdown__item" type="button">
      <span>{props.label}</span>
      {props.svg()}
    </button>
  </>
}



function onLogoClick() {
  if (window.location.pathname === '/' && !window.location.hash) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
