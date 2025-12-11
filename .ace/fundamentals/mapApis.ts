import { buildUrl } from './buildUrl'
import type { MapBuildUrlProps } from './types'


export const mapApis = {
  'apiGetPartners': {
    api: () => import("../../src/api/apiGetPartners").then((m) => m.default),
    info: () => import("../../src/api/apiGetPartners").then((m) => m.info),
    resolver: () => import("../../src/api/apiGetPartners").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["partners"]] }),
  },
  'apiGetPost': {
    api: () => import("../../src/api/apiGetPost").then((m) => m.default),
    info: () => import("../../src/api/apiGetPost").then((m) => m.info),
    resolver: () => import("../../src/api/apiGetPost").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["post"],["slug","r"]] }),
  },
  'apiSearch': {
    api: () => import("../../src/api/apiSearch").then((m) => m.default),
    info: () => import("../../src/api/apiSearch").then((m) => m.info),
    resolver: () => import("../../src/api/apiSearch").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["search"],["query","r"]] }),
  },
} as const
