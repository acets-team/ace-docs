// @ts-check

import { swAddOffLineSupport } from './.ace/swAddOffLineSupport.js'

const packageDotJsonVersion = '0.0.1'

swAddOffLineSupport({
  installUrls: ['/'],
  cacheName: `offline-cache-v-${packageDotJsonVersion}`,
})
