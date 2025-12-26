// @ts-check 

/** @type {import('@acets-team/ace').AceConfig} */
export const config = {
  sw: true,
  apiDir: 'src/api',
  appDir: 'src/app',
  origins: {
    prod: ['https://acets.org', 'https://www.acets.org'],
    local: ['http://localhost:3000', 'http://localhost:3001']
  },
  r2Origins: {
    local: 'http://localhost:8787'
  },
  plugins: {
    hljs: true,
    solid: true,
    turso: true,
    agGrid: true,
    lottie: true,
    valibot: true,
    chartjs: true,
    markdownIt: true,
  }
}
