import './NotFound.css'
import { A } from '@ace/a'
import { Tron } from '@ace/tron'
import { Lottie } from '@ace/lottie'
import { Title } from '@solidjs/meta'
import { Route404 } from '@ace/route404'


export default new Route404()
  .component((scope) => {
    return <>
      <Title>😅 404</Title>

      <main class="not-found">
        <Lottie src="/lottie/not-found.lottie" />
        <div class="message">We don't have a page called:</div>
        <div class="path">{scope.location.pathname}</div>

        <Tron $div={{ class: 'brand' }} color="var(--ace-primary)">
          <A path="/" $a={{class: 'brand'}}>🏡 Go Back Home</A>
        </Tron>
      </main>
    </>
  })
