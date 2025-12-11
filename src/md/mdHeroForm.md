### 🙏 No `try/catch` required, no `Api Network` calls till `FE` validations pass & `errors` by the invalid `input`! ❤️

<!--{
  "$component": "Lottie",
  "src": "/lottie/lady-meditate.lottie",
  "$div": { "class": "lady-meditate" },
  "$canvas": { "class": "good-rising" }
}-->

- `Async`:
    - Accepts an `Api` fn & lets us call it with the type-safe `run()`
- `createOnSubmit()`:
    - On error, 🚨 automatically aligns errors via `input name`, `parser name` & `<Messages /> name`
- `vParser.body()`:
    - Get's body validations from `ApiInfo` > `parser`
    - Gives us autocomplete hints when creating `request`
    - Throws if `request` is invalid, so no `BE` call till `FE` passes
- `sync()`
    - Calls [Solid's reconcile()](https://docs.solidjs.com/reference/store-utilities/reconcile) for efficient granular updates! 🔮
- `refBind()`
    - Gives us `2-way` data binding between a `store` & a `form item`!
- `refFormReset()`
    - When `event.currentTarget.reset()` is called, ensures `<Messages />` reset!
