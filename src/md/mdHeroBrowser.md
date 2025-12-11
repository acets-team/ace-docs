<!--{
  "name": "browser",
  "variant": "tron",
  "$Tron": {"borderRadius": "9rem"},
  "$tabs": ["Post.tsx", "apiGetPartners.ts", "atoms.ts", "Chat.tsx", "Live.tsx"]
}-->



```ts
export default new Route('/post/:slug')
  .layouts([RootLayout])
  .parser(vParser.route({ // 🔮 valibot validations!
    pathParams: { slug: vString() }
  }))
  .component((scope) => {
    const baseStore = useStore()

    const partners = new Stream({ // ✨ Stream for instant static content
      fn: apiGetPartners,
      queryKey: 'apiGetPartners' // Solid query cache 🔮
      store: [baseStore, 'apiGetPartners'] // 💾 instant data on refresh and offline support thanks to auto onChange saves to the apiGetPartners Atom which persists to indexdb (configurable @ atoms.ts)
    })

    const post = new Load({ // 📝 Load for optimal SEO
      fn: apiGetPost,
      queryKey: 'apiGetPost',
      runOnWindowToggle: true, // 🔁 re-run options available @ Stream too
      runOnNetworkToggle: true,
      req: () => ({ pathParams: scope.PathParams() }), // ❤️ This type-safe req() function let's us navigate from one post to the next & update <post.ui /> automatically!
    })

    return <>
      {/* 🚀 Page Title AND Markdown -> Search Engine Optimized */}
      <post.ui onLoad={() => <Pulse />} suspense={d => <>
        <Title>📝 Post · {d?.title}</Title> 
        <AceMarkdown content={d?.content} />
      </>} />

      {/* Automatically placed into Solid's Suspense 👻 */}
      <partners.ui for={d => <h1>{d?.company}</h1>} />
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
import type { ChatMessage } from '@src/lib/types'
import type { BaseStoreCtx, ApiName2Either } from '@ace/types'


export const atoms = {
  // ApiName2Either is type-safe! 👷‍♀️ { data?: T, error?: AceResError }
  // It knows your current api's, so 'apiGetTransactions' is type-safe!
  // & it knows this Api's response type so this Atom is now type-safe too!
  transactions: new Atom<ApiName2Either<'apiGetTransactions'>>({ save: 'idb', is: 'json' }),

  finances: new Atom<ApiName2Either<'apiGetFinances'>>({ save: 'idb', is: 'json' }), // ⚛️ the is prop heps us determine how to serialize and deserialize from the save location. Providing custom onSerialize & onDeserialize to Atom is available

  count: new Atom({ save: 'idb', is: 'number', init: 0 }), 

  chatMessage: new Atom({ save: 'idb', is: 'string', init: '' }), 

  chatMessages: new Atom<ChatMessage[]>({ save: 'idb', is: 'json', init: [] }),
}


// Atoms are placed into a Solid Store 🔮 and this is its type
export type BaseStore = BaseStoreCtx<typeof atoms>
```
<!--{ "$tabContentEnd": true }-->



```ts
export default new Route('/chat')
  .layouts([RootLayout])
  .component(() => {
    const save = new Async(apiSaveChatMessage) // { run, status }
    const { sync, store, refBind } = useStore() // ⚛️ Atom helpers! 

    const onSubmit = createOnSubmit(async ({ event }) => {
      // IF chatMessage does not pass Api parser THEN no Request is made
      // <Messages /> ensures chatMessage 🚨 errors are visible by input
      const body = vParser.body(info.parser, { chatMessage: store.chatMessage })

      // not called till FE validation above passes (does not throw)!
      const res = await save.run({ body })

      if (res.error?.message) showErrorToast(res.error.message)
      else if (res.data) {
        event.currentTarget.reset() // reset form
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
        <Submit fetch={save} label="Send chat message" />
      </form>
    </>
  })
```
<!--{ "$tabContentEnd": true }-->



```ts
// Typical Solutions
// Long polling: Not real time ❌ 
// Standard Websockets: Pay when idle ❌ 


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
