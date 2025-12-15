### Imagine having the `power`, `responsibility` & `opportunity` to `optimize each` Api, based on `your` business needs!

<!--{
  "$component": "Lottie",
  "src": "/lottie/flying.lottie",
  "$div": { "class": "flying" },
  "$canvas": { "class": "good-rising" }
}-->

- `Load`:
    - The `Load` class is optimal when Api data **must** be indexed by `search engines`
    - Syncs the `Api` Load w/ the `Page` Load
    - Search engine web crawlers will `always` see this data
- `Stream`:
    - The `Stream` class is optimal when fast `First Contentful Paint` scores from `Google Lighthouse` is the priority, b/c static content is rendered immediately
    - When the Api is `loading` BUT the rest of the page is `ready`:
        1. Response is provided w/ static content & `onLoad` components (default `onLoad` is a `css` spinner)
        1. [`Solid's <Suspense/>`](https://docs.solidjs.com/reference/components/suspense) creates childen **in memory**
        1. Api data is `Streamed` to the browser
        1. Solid adds children to the page w/ Api data `included`
