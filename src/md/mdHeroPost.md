<!--{
  "$component": "Lottie",
  "src": "/lottie/flying.lottie",
  "$div": { "class": "flying" }
}-->

- Most frameworks force us into a corner. We either build a `Content Site` that struggles with complex state, or a `Dynamic App` that is not optimized for search engines
- Ace provides the best of both worlds, b/c our `Load` and `Stream` classes may `coexist` on the same route
- With the `Load` class, Api data is delivered `with` the initial page `load`, so this data is **`always`** indexed by search engines
- With the `Stream` class, Api data does not hold up the initial page `load` b/c Api data is streamed into components after the page shell renders which provides the `app-like` snappiness customers love
