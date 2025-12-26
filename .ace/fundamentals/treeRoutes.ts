export const treeRoutes = {
  "key": "/",
  "static": {
    "*": {
      "key": "*"
    },
    "partners": {
      "key": "/partners"
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
