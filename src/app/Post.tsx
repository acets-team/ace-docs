import { Load } from '@ace/load'
import { Route } from '@ace/route'
import { vParser } from '@ace/vParser'
import { vString } from '@ace/vString'
import { useStore } from '@src/store/store'
import apiGetPost from '@src/api/apiGetPost'
import RootLayout from '@src/app/RootLayout'
import { AceMarkdown } from '@ace/aceMarkdown'
import { registerHljs } from '@src/init/registerHljs'
import { hljsMarkdownItOptions } from '@ace/hljsMarkdownItOptions'


export default new Route('/post/:slug')
  .layouts([RootLayout])
  .parser(vParser.route({
    pathParams: { slug: vString() }
  }))
  .component((scope) => {
    const {set} = useStore()

    const post = new Load({
      fn: apiGetPost,
      queryKey: 'apiGetPost',
      req: () => ({ pathParams: scope.PathParams() }),
    })

    return <>
      <post.ui suspense={d => <>
        <AceMarkdown
          content={d?.content}
          registerHljs={registerHljs}
          setHeadings={(v) => set('headings', v)}
          markdownItOptions={ { highlight: hljsMarkdownItOptions }} />
      </>} />
    </>
  })
