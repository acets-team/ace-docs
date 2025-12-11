### We ❤️ `real-time` data (`no` browser refresh `required`)!  Imagine 🤔 supporting `3,000` concurrent connections, broadcasting `10 events/sec` & the monthly bill is `$9`!


::: table-scroll
| Amount | Description |
|--------|-------------|
| `3,000` | Concurrent Connections |
| `10` | Events per Second |
| `30` | Days in Month |
| `86,400` | Seconds in Day |
| `864,000` | Events per Day = Seconds in Day * Events per Second |
| `$5` | [Paid Plan Cost](https://developers.cloudflare.com/durable-objects/platform/pricing): B/c over 100,000 requests per day |
| `25,920,000` | Events per Month = Events per Day * Days in Month |
| `20` | Daily WS Reconnects |
| `1,800,000` | WS Connects per Month = Concurrent Connections * Daily WS Reconnects * Days in Month |
| `27,720,000` | Requests per Month = Events per Month + WS Connects per Month |
| `10` | [Processing time per request (ms)](/docs/ace-live-server) |
| `277,200,000` | Monthly processing time (ms) = Requests per Month * Processing time per request (ms) |
| `277,200` | Monthly processing time (seconds) = Monthly processing time (ms) / 1,000 |
| `0.128` | Memory allocated in GB |
| `35,482` | Total GB/Second per Month |
| `$0` | GB/Second Cost (free tier allows 400,000) |
| `27.72` | Total Requests per Month (millions) |
| `26.72` | Paid Requests per Month (millions) ([first million is free](https://developers.cloudflare.com/durable-objects/platform/pricing)) = Total Requests per Month (millions) - 1 |
| `$0.15` | [Cost per million requests](https://developers.cloudflare.com/durable-objects/platform/pricing) |
| `$4.01` | Requests Cost per month = Paid Requests per Month (millions) * Cost per million requests |
| `$9.01` | Total Cost per Month |
:::


<!-- 
- You have only one Durable Object (LIVE_DURABLE_OBJECT.getByName('global'))
- That means all subscribers connect to the same DO instance
- In Cloudflare’s example 4, the 10 ms processing is applied per WebSocket per DO
- So for your one DO, If you have 10,000 subscribers connected to that single DO, and a broadcast event comes in, for 10,000 WS → 10,000 sends
- the docs assume a typical 10 ms per message per WS for cost estimation


### Process per Request
| Operation                       | Estimated time                          |
| ------------------------------- | --------------------------------------- |
| Parse JSON                      | ~0.5 ms                                 |
| Build string                    | ~0.5 ms                                 |
| getWebSockets()                 | ~0.05 ms                                |
| Broadcasting to 100–500 sockets | ~1–5 ms                                 |
| Total                           | **2–6 ms typical**, **10ms worst-case** |

-->
