### When any change is made to your Api, your `entire application` knows this immediately! ✅

<!--{
  "$component": "Lottie",
  "src": "/lottie/sun-breathe.lottie",
  "$div": { "class": "sun-breathe" },
  "$canvas": { "class": "good-rising" }
}-->

- `res()`
    - ☮️ `scope.[pathParams, searchParams, body]` -> type-safe
    - On error -> calls `scope.error()` automatically
    - To respond w/ a custom error just `return scope.error()` or `throw new Error('WTF', { cause: { lol: true } })` & your API Response will include the `message` & the `cause data`!
    - To do a type-safe redirect just `return scope.go()`
    - To send custom headers just `return scope.respond()`

- `status`
    - When defining `Enums` the `value` is optional
    - Example: `const status = new Enums(['guest', 'admin', { key: 'mod', value: 'Moderator' }])`
    - ❤️ & then we may typesafely do `status.has('maybe')` or `scope.keys.admin` or `scope.values.mod`!
