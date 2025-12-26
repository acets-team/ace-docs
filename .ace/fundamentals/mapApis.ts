import { buildUrl } from './buildUrl'
import type { MapBuildUrlProps } from './types'


export const mapApis = {
  'apiFormData': {
    api: () => import("../../src/api/apiFormData").then((m) => m.default),
    info: () => import("../../src/api/apiFormData").then((m) => m.info),
    resolver: () => import("../../src/api/apiFormData").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["form-data"]] }),
  },
  'apiGetList': {
    api: () => import("../../src/api/apiGetList").then((m) => m.default),
    info: () => import("../../src/api/apiGetList").then((m) => m.info),
    resolver: () => import("../../src/api/apiGetList").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["list"]] }),
  },
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
  'apiReadableStream': {
    api: () => import("../../src/api/apiReadableStream").then((m) => m.default),
    info: () => import("../../src/api/apiReadableStream").then((m) => m.info),
    resolver: () => import("../../src/api/apiReadableStream").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["readable-stream"],["key","r"]] }),
  },
  'apiRemoveImg': {
    api: () => import("../../src/api/apiRemoveImg").then((m) => m.default),
    info: () => import("../../src/api/apiRemoveImg").then((m) => m.info),
    resolver: () => import("../../src/api/apiRemoveImg").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["remove-img"],["key","r"]] }),
  },
  'apiSearch': {
    api: () => import("../../src/api/apiSearch").then((m) => m.default),
    info: () => import("../../src/api/apiSearch").then((m) => m.info),
    resolver: () => import("../../src/api/apiSearch").then((m) => m.resolver),
    buildUrl: (props?: MapBuildUrlProps) => buildUrl({ ...props, segments: [["api"],["search"],["query","r"]] }),
  },
} as const
