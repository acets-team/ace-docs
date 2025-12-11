export const treeRoutes = {
  "key": "/",
  "static": {
    "*": {
      "key": "*"
    },
    "post": {
      "param": {
        "name": "slug",
        "node": {
          "key": "/post/:slug"
        }
      }
    }
  }
}
