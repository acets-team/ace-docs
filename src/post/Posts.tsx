import { A } from '@ace/a'


export function Posts() {
  return <>
    <div class="posts">
      <div class="title">✨ Introduction</div>
      <div class="links">
        <A path="/" $a={{ end: true }}>What is Ace?</A>
        <A path="/post/:slug" pathParams={{ slug: 'cli' }}>CLI</A>
        <A path="/post/:slug" pathParams={{ slug: 'ace-config' }}>Ace Config</A>
        <A path="/post/:slug" pathParams={{ slug: 'environment-information' }}>Environment Information</A>
        <a>Components</a>
        <A path="/post/:slug" pathParams={{ slug: 'ref' }}>Ref (Directives)</A>
        <A path="/post/:slug" pathParams={{ slug: 'atoms' }}>Atoms</A>
        <A path="/post/:slug" pathParams={{ slug: 'vscode-tips' }}>VsCode Tips</A>
        <A path="/post/:slug" pathParams={{ slug: 'error-dictionary' }}>Error Dictionary</A>
      </div>

      <div class="title">🔀 Routes</div>
      <div class="links">
        <A path="/post/:slug" pathParams={{ slug: 'create-api' }}>Create Api's</A>
        <A path="/post/:slug" pathParams={{ slug: 'call-api' }}>Call Api's</A>
        <A path="/post/:slug" pathParams={{ slug: 'b4' }}>B4 (Middleware)</A>
        <A path="/post/:slug" pathParams={{ slug: 'layouts' }}>Layouts</A>
        <A path="/post/:slug" pathParams={{ slug: 'routes' }}>Routes</A>
        <a>Breakpoints</a>
        <a>Anchor</a>
        <a>Redirects</a>
        <a>Open Graph Demo</a>
      </div>

      <div class="title">❤️ Engineer Favorites</div>
      <div class="links">
        <A path="/post/:slug" pathParams={{ slug: 'ace-live-server' }}>Real Time Data</A>
        <A path="/post/:slug" pathParams={{ slug: 'file-uploads' }}>File Uploads</A>
        <a>Markdown</a>
        <a>Database</a>
        <a>Email</a>
      </div>

      <div class="title">👮 Security</div>
      <div class="links">
        <a>Environment Variables</a>
        <a>JWT</a>
        <a>Hash</a>
        <a>Magic Link Demo</a>
      </div>

      <div class="title">⚙️ Utilities</div>
      <div class="links">
        <a>Types</a>
        <a>Enums</a>
        <a>Date Helpers</a>
      </div>

      <div class="title">🧩 UI</div>
      <div class="links">
        <a>Form Demo</a>
        <a>Toast Notification</a>
        <a>Loading Spinner</a>
        <a>Smooth For</a>
        <a>Pulse</a>
        <a>Slideshow</a>
        <a>SVG's</a>
        <a>Radio Cards</a>
        <a>Tabs</a>
        <a>AgGrid Demo</a>
        <a>Chart.js Demo</a>
        <a>Custom Fonts</a>
        <a>Tailwind</a>
      </div>

      <div class="title">📱 Application</div>
      <div class="links">
        <a>Progressive Web App</a>
        <a>Network Status</a>
        <a>Offline Support</a>
        <a>Fresh Local Environment</a>
      </div>

      <div class="title">🚀 Deploy</div>
      <div class="links">
        <a>Deploy</a>
        <a>Custom Domain</a>
        <a>Sub Domains</a>
        <a>Resolve www DNS</a>
        <a>Production Logs</a>
      </div>
    </div>
  </>
}
