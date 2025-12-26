import { msSecond } from '@ace/ms'
import { onCleanup } from 'solid-js'
import type { ApiName2Stream } from '@ace/types'


export function Partners(props: { partners: ApiName2Stream<'apiGetPartners'> }) {
  const partnerFlipHoldTime = 30 * msSecond

  return <>
    <div class="partners-vertical">
      <div class="title">❤️ Partners</div>

      <div class="partners">
        <props.partners.ui for={(d, i) => <>
          <div ref={refPartner(i(), partnerFlipHoldTime)} class="partner" id={`c${i() + 1}`}>
            <div class="side front">
              <div class="logo">
                <img src="https://www.svgrepo.com/show/353564/cloudflare.svg" />
              </div>
              <div class="company">{d?.[0].company}</div>
              <div class="description">{d?.[0].description}</div>
            </div>

            <div class="side back">
              <div class="logo">
                <img src="https://www.svgrepo.com/show/353564/cloudflare.svg" />
              </div>
              <div class="company">{d?.[1].company}</div>
              <div class="description">{d?.[1].description}</div>
            </div>
          </div>
        </>} />
      </div>
    </div>
  </>
}



function refPartner<T extends HTMLDivElement>(i: number, partnerFlipHoldTime: number) {
  return (el: T | null) => {
    if (!el) return

    let flipped = false
    let resInterval: NodeJS.Timeout | undefined

    let resTimeout = setTimeout(() => {
      resInterval = setInterval(() => {
        if (!el) return
        flipped = !flipped;
        el.classList.toggle('flipped', flipped);
      }, partnerFlipHoldTime);
    }, i * 500)

    onCleanup(() => {
      clearTimeout(resTimeout)
      clearInterval(resInterval)
    })
  }
}
