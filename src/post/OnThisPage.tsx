import { For, Show } from 'solid-js'
import { Loading } from '@ace/loading'
import { BaseStore } from '@src/store/atoms'


export function OnThisPage(props: { baseStore: BaseStore }) {
  const {store} = props.baseStore

  return <>
    <div class="on-this-page">
      <div class="title">📌 On this page</div>

      <Show when={store.headings.length} fallback={<Loading />}>
        <div class="links">

          <For each={store.headings}>{
            (h) => <a href={`#${h.slug}`}>{h.label}</a>
          }</For>
        </div>
      </Show>
    </div>
  </>
}
