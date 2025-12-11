## What is Ace?
- ❤️ **`Optimal`** code for Web Developers!
- All our code is **`free`**, [MIT Licensed](https://github.com/orgs/acets-team/repositories) & grouped into **plugins**!
- To use a plugin, just set it to **true** in your [ace.config.js](/docs/ace-config)! 🙏



## [Plugins](#ace-plugins)
  1. [Solid](https://docs.solidjs.com/): Provides top shelf `SSR`, dev friendly `HMR` & optimal `DOM` updates w/ `signals`
  1. [Drizzle](https://orm.drizzle.team/): Typesafe `DB` updates w/ a beautiful `UI` for updating data
  1. [Turso](https://turso.tech/): Create lightweight `SQL` databases, that scale to `millions` of instances
  1. [Cloudflare](https://www.cloudflare.com/): Eliminate `Serverless` cold starts & enjoy remarkable Hibernating `Websockets`
  1. [AgGrid](https://www.ag-grid.com/): Solid Components w/in `scrollable, filterable & sortable` tables
  1. [Valibot](https://valibot.dev/guides/comparison/): Zod features in a `modular` library, so smaller `bundle` then Zod
  1. [Markdown-It](https://markdown-it.github.io/markdown-it/): `SEO` Friendly and/or `Dynamically` Generated `Markdown` to `HTML`
  1. [Highlight.js](https://github.com/highlightjs/highlight.js): Highlight code in `Markdown` w/ `100's` of supported `languages`
  1. [Lottie](https://lottiefiles.com/featured-free-animations): Create, browse and download lovely `lightweight` animations
  1. [Charts.js](https://www.chartjs.org/): Evergreen library w/ `Line, Bar, Donut, Area, Polar & Radar` support
  1. [Brevo](https://www.brevo.com/): Let's us send 300 `Campaign` and/or `API` emails a day for free



## Our Mission Statement
🌎 Unite industry leaders, to provide optimal web fundamentals, in a performant, type-safe and beautifully documented library! 🙏



## Create an Ace App
- Bash:
    ```bash
    npx create-ace-app@latest
    ```
- 🚨 When opening `Create Ace App` **locally** for the first time after an `npm run dev`, it will take 5-10 seconds to load 😡 b/c Vite is altering code to optimize [`HMR`](https://vite.dev/guide/features#hot-module-replacement) (so subsequent loads are instant 🤓)
- This slow initial load is **no factor** in production & to prove this, here's [Create Ace App In Production](https://create-ace-app.jquery-ssr.workers.dev)! 🚀 Deployed to Cloudflare Workers via `git push`, deploy directions [here](#deploy)!
    ![Create Ace App in Production](https://i.imgur.com/UcfHhXh.jpeg)
- Desktop App install is now ready! (works on `localhost` too btw!)
    ![Create Desktop Application](https://i.imgur.com/iN3ywWW.png)
- Any cookie you want can be shared between your site & app, phone install's work too and when you do a `git push` to deploy your site, all your app's update automatically! ❤️





## Why Was Ace Created?
Thanks to failure, I am very sensitive to performance. In college I stumbled upon a plugin that could turn a Wordpress site into a Social Network! I thought this was remarkable, so I created a Facebook event entitled `Runner's Social Network` and said in 2 weeks, I will drop the link to Instride! 2 weeks later over 2,000 people were attending this event!

Aloha, my name is Christopher Carrington, thanks for being here btw!

So I post the link in the event and minutes later Instride is `unusable`. Too much load for shared hosting.

So now I'm on the phone with GoDaddy learning about `virtual private servers`, and how it'll take 1-2 days to migrate the `files`, `database` & `DNS`. So I take the site down, over 2 days upgrade to an over `$100` a month server, notify customers we're back and never eclipse `30%` of this new server b/c I bought too much and the traffic was never the same as day 1.

Burned & learned but this was 15 years ago, lets fast forward to today. I'm unemployed and I say okay, time to learn what people want. So after 6 years of `AnguarJS`, `Vue` & `Svelte` I decide to learn` Next.JS`. Long story short (too late) I love their functional components but I wanted more from a performance perspective. Component rerunning on every state update is not my jam.

So I decide to not just learn for a job but to learn what aligns with what I care about, so I start learning Solid & I fall in love w/ it! From a performance & simplicity perspective, Solid is top shelf! But then I start workin on a couple different projects (site for Mom & a site for my friend) and I want to share code between them so I create a folder called `fundamentals` to share functions, classes & types between these projects. This is how `Ace` began & each one of our fundamentals aligns w/ 3 pillars. `Performance`, `Simplicity` & `Cost`!

1. `Performance:`
    - @ build time:
        - Like `Hono`, we generate a `tree` to all api routes, to allow API resolution to be type-safe & fast!
        - We generate the `segments` to each route & api url, so we may all create url's as fast as possible!
    - We align w/ `Cloudflare`, the performance masters, b/c I love their: 
        - [Optimal isolates](https://developers.cloudflare.com/workers/reference/how-workers-works/) that remove virtual machine cold starts
        - Brilliant [hibernating websockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets) that when idle, remain open & cost nothing
        - & [generous pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/) that allows 100,000 request per day for free!
    - Because we are built w/ Solid, we have access to all Solid features, including their fantastic `createSignal()`!
1. `Simplicity:`
    - When we change anything we want to know how this updates things everywhere! To accomplish this Ace has first class typescript support & ensure all is `type-safe` but Typescript does not check every file on every save so technically there can be bugs in files on a save that we don't know about. So we've got `npm run typesafe` for this, which does a full project scan and then the compiler throws any errors in the VsCode `Problems` tab! Typescript does scan quite a bit on save but just to be sure, we've got backup!
    - Imagine using a new code base and every function is not only type-safe but includes `JSDoc` comments that explain the what & they why of everything! This is our standard!
    - If you'd to create love `one` code base that works as an `ios` app, `android` app, `desktop` app & `website` then Ace is perfect for you! `Push notifications` on lock screens work for all devices, any cookie you want can be shared between em all & on `git push` updates flow to all automatically! With Ace, this complexity, is simple!
    - Cloudflare has revolutionized `real-time` data w/ their hibernating websockets & w/ Ace flowing database updates to customers w/ no browser refresh required is beautifully simple!
    - Dates can be tricky, ms's here, seconds there, and it's lovely to have a suite of date helpers to ease the process of working w/ dates!
    - Aria compliant components is tricky all our components are! Toasts, modals & much more, all included!
1. `Cost:`
    - Cloudflare is best in class, we've already gone over that but so is Turso! 500 million monthly reads for free is too much for me to comprehend, but the perfect amount for me to appreciate and we will continue to have first class support for their lovely offering! 

I can keep going but you get the point! When we add a plugin to Ace it's becuase that company embodies these pillars & I **`promise`** to continue evolving Ace, to grow w/ industries leaders, showcase their lovely products & provide optimal web fundamentals!
