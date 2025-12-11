import { A } from '@ace/a'


export function Posts() {
  return <>
    <div class="title">✨ Introduction</div>
    <div class="links">
      <A path="/" $a={{ end: true }}>What is Ace?</A>
      <A path="/post/:slug" pathParams={{ slug: 'cli' }}>CLI</A>
      <A path="/post/:slug" pathParams={{ slug: 'ace-config' }}>Ace Config</A>
      <a>Environment Information</a>
      <a>Atoms</a>
      <a>Ref (Directives)</a>
      <a>Error Dictionary</a>
      <a>VSCode Tips</a>
    </div>

    <div class="title">🟢 Real Time Data</div>
    <div class="links">
      <a>Ace Live Server</a>
    </div>

    <div class="title">🔀 Routes</div>
    <div class="links">
      <a>Create Api's</a>
      <a>Call Api's</a>
      <a>B4 (Middleware)</a>
      <a>Layouts</a>
      <a>Routes</a>
      <a>Breakpoints</a>
      <a>Anchor</a>
      <a>Redirects</a>
      <a>Open Graph Demo</a>
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
      <a>Enums</a>
      <a>Date Helpers</a>
    </div>

    <div class="title">🧩 UI</div>
    <div class="links">
      <a>Bind DOM Elements</a>
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

    <div class="title">💾 Database</div>
    <div class="links">
      <a>Turso Demo</a>
    </div>

    <div class="title">📝 Markdown</div>
    <div class="links">
      <a>Markdown</a>
      <a>Code Highlighting</a>
    </div>

    <div class="title">🚀 Deploy</div>
    <div class="links">
      <a>Deploy</a>
      <a>Custom Domain</a>
      <a>Sub Domains</a>
      <a>Resolve www DNS</a>
      <a>Production Logs</a>
    </div>

    <div class="title"> 💌 Email</div>
    <div class="links">
      <a>Send Brevo Emails</a>
      <a>Email Forwarding</a>
    </div>
  </>
}
