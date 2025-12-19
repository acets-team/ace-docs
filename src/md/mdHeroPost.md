### Imagine having the `power`, `responsibility` & `opportunity` to `optimize each` Api, based on `your` business needs!

<!--{
  "$component": "Lottie",
  "src": "/lottie/flying.lottie",
  "$div": { "class": "flying" }
}-->

- `Stream`:
    - The `Stream` class renders `static` content `immediately` & then Api data is `streamed` into the page
    <!-- - `Google Lighthouse` provides high `First Contentful Paint` scores w/ this architecture -->
    <!-- - & then Api data is `streamed` in -->
    <!-- - The `Stream` class provides optimal `First Contentful Paint` scores from `Google Lighthouse`, b/c `static` content is rendered `immediately` & then Api data is `streamed` in -->
- `Load`:
    - The `Load` class is optimal when Api data **must** be indexed by `search engines` by syncing the `Api` Load w/ the `Page` Load
    <!-- - Syncs the `Api` Load w/ the `Page` Load
    - Search engine web crawlers will `always` see this data -->
    <!-- - The `Stream` class is optimal when fast `First Contentful Paint` scores from `Google Lighthouse` is the priority, b/c static content is rendered immediately -->
- `Empowered`:
    - Mix `Load` & `Stream` Api calls on the same page
    - ❤️ When `pathParams` update (when we navigate from one post to the next) `apiGetPost` is called w/ updated pathParams, `<post.ui />` is updated & `apiGetPartners` **DOES NOT** get called again
    - The `d` @ `<post.ui />` & `<partners.ui />`, is our `type-safe` Api data!
    <!-- - Api data is shown `immediately` on refresh 
    - Navigation is **smooth** by calling Api's in `Layout's once` & then `sharing` this data in routes -->
    <!-- - When the Api is `loading` BUT the rest of the page is `ready`:
        1. Response is provided w/ static content & `onLoad` components (default `onLoad` is a `css` spinner)
        1. [`Solid's <Suspense/>`](https://docs.solidjs.com/reference/components/suspense) creates childen **in memory**
        1. Api data is `Streamed` to the browser
        1. Solid adds children to the page w/ Api data `included` -->
