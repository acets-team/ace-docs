import { A } from '@ace/a'
import { refs } from '@ace/refs'
import { Async } from '@ace/async'
import { For, Show } from 'solid-js'
import markdownit from 'markdown-it'
import { Loading } from '@ace/loading'
import { onClean } from '@ace/onClean'
import { debounce } from '@ace/debounce'
import apiSearch from '@src/api/apiSearch'
import { showErrorToast } from '@ace/toast'
import { feComponent } from '@ace/feComponent'
import type { BaseAtoms } from '@src/store/atoms'
import { createOnNavigationKeyDown } from '@ace/createOnNavigationKeyDown'
import { hideModal, onShowModal, Modal, onHideModal, showModal } from '@ace/modal'
import { svg_keyborad_return, svg_keyborad_up, svg_keyborad_down, svg_keyborad_escape, svg_search, svg_x } from '@src/lib/svgs'


export const Search = feComponent((props: { baseAtoms: BaseAtoms }) => {
  const search = new Async(apiSearch)
  
  let inputRef: undefined | HTMLInputElement

  let resultsRef: undefined | HTMLDivElement

  let results: undefined | NodeListOf<HTMLAnchorElement>

  document.addEventListener('keydown', onToggleKeydown)


  const onNavigationKeyDown = createOnNavigationKeyDown({
    elements: () => results, 
    onEscape: () => hideModal('search')
  })


  onClean(() => {
    document.removeEventListener('keydown', onToggleKeydown)
    document.removeEventListener('keydown', onNavigationKeyDown)
  })


  onHideModal('search', () => {
    document.removeEventListener('keydown', onNavigationKeyDown)
  })


  onShowModal('search', () => {
    setResults()
    inputRef?.focus()
    inputRef?.select()
    document.addEventListener('keydown', onNavigationKeyDown)
  })


  function setResults() {
    if (resultsRef) {
      results = resultsRef.querySelectorAll('a')
    }
  }


  function onReset() {
    props.baseAtoms.set('searchQuery', '')

    if (inputRef) {
      inputRef.focus()
      inputRef.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }


  const onSearch = debounce(async (query: string) => {
    if (!query) props.baseAtoms.set('searchResults', [])
    else {
      const res = await search.run({ pathParams: { query } })

      if (res.error?.message) showErrorToast(res.error.message)
      else if (res.data) {
        for (const d of res.data) {
          d.preview = md2Preview(d.preview)
        }

        props.baseAtoms.set('searchResults', res.data)

        setResults()
      }
    }
  }, 180)



  function onToggleKeydown(event: KeyboardEvent) {
    const kIsDown = event.key === 'k' || event.key === 'K'

    const cmdKIsDown = event.metaKey && kIsDown // macOS
    const ctrlKIsDown = event.ctrlKey && kIsDown // windows / linux

    if (ctrlKIsDown || cmdKIsDown) {
      event.preventDefault() // prevent the browser's default action

      showModal('search')
    }
  }

  return <>
    <Modal id="search">
      <div class="input">
        <input
          onInput={(e) => onSearch(e.currentTarget.value)}
          ref={refs(el => inputRef = el, props.baseAtoms.refBind('searchQuery'))}
          placeholder="Search..." type="text" name="search" autocomplete="off" />

        <div class="lens" aria-hidden="true">{svg_search()}</div>

        <Show when={props.baseAtoms.store.searchQuery}>
          <button onClick={onReset} type="button" aria-label="Clear Search Query">{svg_x()}</button>
        </Show>
      </div>

      <Show when={props.baseAtoms.store.searchResults?.length}>
        <div class="results" ref={resultsRef} role="status" aria-live="polite">
          <For each={props.baseAtoms.store.searchResults}>{
            (d) => <>
              <A path="/post/:slug" pathParams={{slug: d.slug}} $a={{class: 'result', onClick: () => hideModal('search')}}>
                <div class="title">{d.title}</div>
                <div class="preview" innerHTML={d.preview} />
              </A>
            </>
          }</For>
        </div>
      </Show>

      <Show when={props.baseAtoms.store.searchQuery && !props.baseAtoms.store.searchResults?.length && search.status() === 'success'}>
        <div class="no-results" role="status" aria-live="polite">No results found. Try a different search term please.</div>
      </Show>

      <div class="search-footer">

        <Show when={search.status() !== 'loading'} fallback={<Loading type="two" color="var(--ace-primary)" twoColor="white" />}>
          <div class="keys">
            <div class="key">{svg_keyborad_return()}</div>
            <div class="label">to select</div>

            <div class="key">{svg_keyborad_up()}</div>
            <div class="key">{svg_keyborad_down()}</div>
            <div class="label">to navigate</div>

            <div class="key">{svg_keyborad_escape()}</div>
            <div class="label">to close</div>
          </div>
        </Show>
      </div>
    </Modal>
  </>
})


function md2Preview(markdown: string) {
  return (new markdownit({ html: true })).render(markdown)
    .replace(/<!--[\s\S]*?-->/g, '') // remove HTML comments
    .replace(/&lt;(\/?mark)&gt;/gi, '<$1>') // &lt;mark&gt; inside <code> is converted back to <mark>
    .replace(/\n+/g, ' ') // replace line breaks with space
    .replace(/<(?!\/?mark\b)[^>]+>/gi, '') // remove all HTML tags except <mark>
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .trim()
}
