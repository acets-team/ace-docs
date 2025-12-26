import { Load } from '@ace/load'
import { Route } from '@ace/route'
import { Lottie } from '@ace/lottie'
import { buildOrigin } from '@ace/env'
import { useAtoms } from '@src/store/atoms'
import { Title, Meta } from '@solidjs/meta'
import apiGetPost from '@src/api/apiGetPost'
import { AceMarkdown } from '@ace/aceMarkdown'
import { container } from '@mdit/plugin-container'
import { registerHljs } from '@src/init/registerHljs'
import { hljsMarkdownItOptions } from '@ace/hljsMarkdownItOptions'


export default new Route('/')
  .component(() => {
    const baseAtoms = useAtoms()

    const post = new Load({
      fn: apiGetPost,
      queryKey: 'apiGetPost',
      atom: [baseAtoms, 'whatIsAce'],
      req: () => ({ pathParams: { slug: 'what-is-ace' } }),
      
    })

    return <>
      <Title>🏡 Home · Ace Docs!</Title>
      <Meta property="og:title" content="🏡 Home · Ace Docs!" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={buildOrigin} />
      <Meta property="og:image" content={buildOrigin + '/og/home.webp'} />
      <Meta property="og:description" content="❤️ The purpose of Create Ace App is to showcase lovely features available w/ Ace & simply replicated via npx create-ace-app@latest ✅" />

      <post.ui suspense={d => <>
        <AceMarkdown
          components={[Lottie]}
          content={d?.content}
          registerHljs={registerHljs}
          setHeadings={(v) => baseAtoms.set('headings', v)}
          markdownItOptions={{ highlight: hljsMarkdownItOptions }}
          configPlugins={(md) => {
            md.use(container, { name: 'table-pricing' })
          }} />
      </>} />
    </>
  })
