import { For, Show } from 'solid-js'
import { Loading } from '@ace/loading'
import { BaseAtoms } from '@src/store/atoms'


export function OnThisPage(props: { baseAtoms: BaseAtoms }) {
  const {store} = props.baseAtoms

  return <>
    <div class="on-this-page">
      <div class="title">🎯 On this page</div>

      <Show when={store.headings.length} fallback={<Loading />}>
        <div class="links">

          <For each={store.headings}>{
            (h) => <a href={`#${h.slug}`} class="underline">{h.label}</a>
          }</For>
        </div>
      </Show>
    </div>
  </>
}
