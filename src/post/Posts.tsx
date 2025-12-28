import { A } from '@ace/a'
import { For } from 'solid-js'
import { ApiName2Load } from '@ace/types'


export function Posts(props: { postGroups: ApiName2Load<'apiGetPostGroups'> }) {
  return <>
    <div class="posts">
      <props.postGroups.ui for={d => <>
          <div class="title">{d?.title}</div>

          <div class="links">
            <For each={d?.posts}>{
              (post) => {
                return post.id === 1
                  ? <A path="/" $a={{ end: true, class: 'underline' }}>{post.title}</A>
                  : <A path={"/post/:slug"} pathParams={{ slug: post.slug }} $a={{ class: 'underline' }}>{post.title}</A>
              }
            }</For>
          </div>
      </>}/>
    </div>
  </>
}
