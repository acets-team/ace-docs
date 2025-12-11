### Thankfully Ace is powered by [Solid](https://docs.solidjs.com/reference/basic-reactivity/create-signal), so the optimal `createSignal()` is always available to us! 🔮

Atoms are `app-wide` available `signals`, that include a `save` prop, which sets the Atom's save location to `memory`, `session storage`, `local storage` or `index db`! 💾

| Feature                    | m     | ss     | ls     | idb   |
| ---------------------------| ------| ------ | -------| ------|
| Available in Any Component | ✅    | ✅      | ✅     | ✅    |
| Persist on Refresh         | ❌    | ✅      | ✅     | ✅    |
| Persist on Tab Close       | ❌    | ❌      | ✅     | ✅    |
| Persist if Offline         | ❌    | ❌      | ✅     | ✅    |
| Share Across Tabs          | ❌    | ❌      | ✅     | ✅    |
| Supports Async             | ❌    | ❌      | ❌     | ✅    |
| Size Limit                 | v8Max | 5–10MB | 5–10MB | 100MB |
