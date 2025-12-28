<!--{
  "name": "browser",
  "variant": "tron",
  "$tabs": ["Post.tsx", "apiGetPartners.ts", "atoms.ts", "Chat.tsx", "Live.tsx"]
}-->



```ts
export default new Route('/post/:slug') // ❤️ Solid!
  .parser(vParser.route({
    pathParams: { slug: vString() } // ❤️ Valibot!
  }))
  .component((scope) => {
    const post = new Load({
      fn: apiGetPost,
      queryKey: 'apiGetPost',
      req: () => ({ pathParams: scope.PathParams() }), // ❤️ Type-Safe!
    })

    const partners = new Stream({
      fn: apiGetPartners,
      queryKey: 'apiGetPartners'
    })

    return <>
      {/* ❤️ Load.req ensures post.ui updates as path params update! */}
      <post.ui suspense={d => <>
        <Title>📝 Post · {d?.title}</Title> 
        <AceMarkdown content={d?.content} />
      </>} />

      <partners.ui
        onLoad={() => <Pulse />}
        for={d => <Partner data={d} />} />
    </>
  })
```
<!--{ "$tabContentEnd": true }-->



```ts
export const info = new ApiInfo({
  method: 'POST',
  path: '/api/partners/:status',
  parser: vParser.api({ // 🔮 valibot validations!
    body: { aware: vBool() },
    pathParams: { status: vEnums(status) },
    searchParams: { limit: optional(vNum()), offset: optional(vNum()) },
  })
})

export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server' // ❤️ This fn & it's imports WON'T enter the FE build

  return new ApiResolver(req)
    .b4([sessionB4, adminB4]) // 🔐 middleware runs before res()
    .res(async (scope) => {
      // 🍪 scope.[readCookie & clearCookie] available too
      scope.setCookie('aloha', '360', { maxAge: secWeek })

      // 🤓 locals set w/in b4 functions -> type-safe
      const session = scope.event.locals.session 

      // 🔮 drizzle + turso -> type-safe, performant queries
      const partners = await db.select().from(partners)
        .where(partners.status.eq(scope.pathParams.status))
        .limit(scope.searchParams.limit ?? 150)
        .offset(scope.searchParams.offset ?? 0)

      // 🙌 types flow to FE components
      return scope.success({ aware: scope.body.aware, session, partners })
    })
}

export default createApi('apiGetPartners', info, resolver)
```
<!--{ "$tabContentEnd": true }-->



```ts
import { Atom } from '@ace/atom'
import { createAtoms } from '@ace/createAtoms'
import { AceMarkdownHeading } from '@ace/aceMarkdown'
import type { InferAtoms, ApiName2Either } from '@ace/types'


// these are the atoms that power this site! 🤔
// from page to page & through refresh the searchQuery & searchResults
// persist. this loveliness is happening b/c they are Atoms! 
export const { atoms, useAtoms, AtomsContext } = createAtoms({
  searchQuery: new Atom({ save: 'idb', is: 'string', init: '' }),
  isSidenavVisible: new Atom({ save: 'm', is: 'boolean', init: false }),
  headings: new Atom<AceMarkdownHeading[]>({ save: 'm', is: 'json', init: [] }),

  // ApiName2Either is type-safe! 👷‍♀️ { data?: T, error?: AceResError }
  // It knows your current api's, so 'apiGetPartners' is type-safe!
  // & it knows this Api's response type, so this Atom is now type-safe too!
  partners: new Atom<ApiName2Either<'apiGetPartners'>>({ save: 'idb', is: 'json' }),
  searchResults: new Atom<ApiName2Either<'apiSearch'>['data']>({ save: 'idb', is: 'json' }),
})


export type BaseAtoms = InferAtoms<typeof atoms>
```
<!--{ "$tabContentEnd": true }-->



```ts
export default new Route('/chat')
  .layout(ChatLayout)
  .component(() => {
    const save = new Async(apiSaveChatMessage) // { run, status }
    const { sync, store, refBind } = useStore() // ⚛️ Atom helpers! 

    const onSubmit = createOnSubmit(async ({ event }) => {
      // info.parser is defined in our Api file once & reused here
      // IF chatMessage does not pass Api validations, no Request is made
      // <Messages /> ensures chatMessage 🚨 errors are visible by input
      const body = vParser.body(info.parser, { chatMessage: store.chatMessage })

      // not called till FE validations above pass b/c vParser.body throws when invalid
      const res = await save.run({ body })

      if (res.error?.message) showErrorToast(res.error.message)
      else if (res.data) {
        event.target.reset() // reset form
        sync('chatMessages', mergeArrays(store.chatMessages, res.data))
      }
    })

    return <>
      <For each={store.chatMessages}>{
        (m) => <div class={`message ` + m.userType}>{m.message}</div>
      }</For>

      <form onSubmit={onSubmit} ref={refFormReset()}>
        <input ref={refBind('chatMessage')} name="chatMessage" placeholder="Send a message..." autocomplete="off" type="text" />
        <Messages name="chatMessage" />
        <Submit hook={save} label="Send chat message" />
      </form>
    </>
  })
```
<!--{ "$tabContentEnd": true }-->



```ts
// Typical Solutions
// Standard Websockets: Pay when idle ❌ 
// Polling (request every x seconds): Not real time ❌ 


// 🎉 Cloudflare + Ace provides real-time + free when idle 
// npx create-ace-live-server@latest 👩‍💻


// BE: Broadcast to thousands of concurrent connections
const res = await scope.liveEvent({
  // events are grouped into streams
  // streams can be a string or a tuple
  stream: ['chatRoom', id],
  data: { aloha: true },
})


// FE: Real-time data w/ no browser refresh required
onMount(() => {
  const { ws, error } = scope.liveSubscribe({ stream: ['chatRoom', id] })

  if (error?.message) showErrorToast(error.message)
  else if (ws) {
    ws.addEventListener('message', event => {
      console.log(event.data) // ✅ real-time data received!
    })

    onCleanup(() => scope.liveUnsubscribe(ws))
  }
})
```
<!--{ "$tabContentEnd": true }-->
