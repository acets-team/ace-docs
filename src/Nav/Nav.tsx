import './Nav.css'
import { A } from '@ace/a'
import { Tron } from '@ace/tron'
import { onClean } from '@ace/onClean'
import { showModal } from '@ace/modal'
import { debounce } from '@ace/debounce'
import { refTooltip } from '@ace/tooltip'
import { onMount, type JSX } from 'solid-js'
import type { BaseStore } from '@src/store/atoms'
import { svg_npm, svg_search, svg_github, svg_twitter, svg_youtube, svg_command, svg_discord, svg_menu } from '@src/lib/svgs'


export function Nav(props: { baseStore: BaseStore }) {
  let navRef: undefined | HTMLElement

  const {set} = props.baseStore

  onMount(() => {
    bindScrollListener(navRef)
  })

  return <>
    <nav ref={navRef}>
      <div class="nav-inner">
        <div class="spoof"></div>
        <div class="logo-menu-toggle">
          <Tron borderRadius="50%" $div={{ class: 'menu-toggle' }}>
            <button class="tron-center" onClick={() => set('isSidenavVisible', v => !v)}>{svg_menu()}</button>
          </Tron>
          <A path="/" $a={{ class: 'logo', end: true, onClick: onLogoClick }}>
            <img src="/logo.webp" />
          </A>
        </div>

        <div class="icons-search">
          <div class="search">
            <div class="lens">{svg_search()}</div>
            <div class="placeholder">Search...</div>

            <Tron borderRadius="2.1rem" zIndex="var(--z-nav-content)">
              <button onClick={() => showModal('search')} class="input" type="button" />
            </Tron>

            <div class="hot">
              <div class="command">{svg_command()}</div>
              <div class="k">K</div>
            </div>
          </div>

          <Icon label="Discord" href="https://www.npmjs.com/package/@acets-team/ace" color="#495bfd">{svg_discord()}</Icon>
          <Icon label="Twitter" href="https://www.npmjs.com/package/@acets-team/ace" color="#06b8ec">{svg_twitter()}</Icon>
          <Icon label="YouTube" href="https://www.npmjs.com/package/@acets-team/ace" color="#ff0034">{svg_youtube()}</Icon>
          <Icon label="GitHub" href="https://www.npmjs.com/package/@acets-team/ace" color="gold">{svg_github()}</Icon>
          <Icon label="NPM" href="https://www.npmjs.com/package/@acets-team/ace" color="#cc3838">{svg_npm()}</Icon>
        </div>
      </div>
    </nav>
  </>
}



function Icon(props: { label: string, children: JSX.Element, href: string, color: string}) {
  const tooltip = refTooltip(() => ({
    position: 'bottomCenter',
    content: props.label,
    $div: { class: 'nav-tooltip' },
  }))

  return <>
    <Tron color={props.color} borderRadius="50%" $div={{class: 'icon'}}>
      <a ref={tooltip} href={props.href} class="no-underline tron-center" target="_blank">
        {props.children}
      </a>
    </Tron>
  </>
}



function bindScrollListener (navRef?: HTMLElement) {
  if (!navRef) throw new Error('!navRef')

  const threshold = 72
  const debounceDelay = 60
  const className = 'lower'

  const checkScrollPosition = () => {
    if (window.scrollY > threshold) navRef.classList.add(className) // below threshold -> add class
    else navRef.classList.remove(className) // above threshold -> remove class
  }

  checkScrollPosition() // initial check when the page loads

  const debouncedCheck = debounce(checkScrollPosition, debounceDelay) // limit how often it runs, on each call delay resets

  window.addEventListener('scroll', debouncedCheck, { passive: true }) // { passive: true } is a performance hint to the browser, saying the handler won't call preventDefault()

  onClean(() => {
    window.removeEventListener('scroll', debouncedCheck)
  })
}



function onLogoClick() {
  if (window.location.pathname === '/' && !window.location.hash) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
