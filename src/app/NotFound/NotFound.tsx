import './NotFound.css'
import { A } from '@ace/a'
import { Lottie } from '@ace/lottie'
import { Title } from '@solidjs/meta'
import { Route404 } from '@ace/route404'
import RootLayout from '@src/app/RootLayout'


export default new Route404()
  .layouts([RootLayout])
  .component((scope) => {
    return <>
      <Title>😅 404</Title>

      <main class="not-found">
        <Lottie src="/lottie/not-found.lottie" />
        <div class="message">We don't have a page called:</div>
        <div class="path">{scope.location.pathname}</div>
        <A path="/" $a={{class: 'brand'}}>🏡 Go Back Home</A>
      </main>
    </>
  })
