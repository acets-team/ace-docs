import { buildUrl } from './buildUrl'
import type { MapBuildUrlProps } from './types'


export const mapRoutes = {
  '/': {
    route: () => import("../../src/app/Home").then((m) => m.default),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [] }),
  },
  '*': {
    route: () => import("../../src/app/NotFound/NotFound").then((m) => m.default),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["*"]] }),
  },
  '/post/:slug': {
    route: () => import("../../src/app/Post").then((m) => m.default),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["post"],["slug","r"]] }),
  },
} as const
