### When any change is made to your Api, your `entire application` knows this immediately! ✅

<!--{
  "$component": "Lottie",
  "src": "/lottie/sun-breathe.lottie",
  "$div": { "class": "sun-breathe" },
  "$canvas": { "class": "good-rising" }
}-->

- `ApiInfo`
    - The industry standard is `opaque` RPC `server functions` that require framework lock-in 🤬
    - ❤️ With Ace, you can `curl` your Api from `bash` 🥹 b/c the `path` defined @ `ApiInfo`, is your actual Api path 
    - & w/ `no OR any library`, define parsing validators once and `re-use` the validators on the `FE` (frontend)

- `res()`
    - `scope.[pathParams, searchParams, body]` -> type-safe
    - On error -> calls `scope.error()` automatically
    - To respond w/ a custom error, `return scope.error()` or `throw new Error('WTF', { cause: { lol: true } })` & your API Response will include the `message` & `cause`!
    - 🤓 `return scope.go()` to do a type-safe redirect 
    - `return scope.respond()` to send custom headers
<!-- 
- `status`
    - When defining `Enums` the `value` is optional
    - Example: `const status = new Enums(['guest', 'admin', { key: 'mod', value: 'Moderator' }])`
    - ❤️ & then we may typesafely do `status.has('maybe')` or `scope.keys.admin` or `scope.values.mod`! -->
