export const treeGET = {
  "static": {
    "api": {
      "static": {
        "list": {
          "key": "apiGetList"
        },
        "partners": {
          "key": "apiGetPartners"
        },
        "post": {
          "param": {
            "name": "slug",
            "node": {
              "key": "apiGetPost"
            }
          }
        },
        "post-groups": {
          "key": "apiGetPostGroups"
        },
        "search": {
          "param": {
            "name": "query",
            "node": {
              "key": "apiSearch"
            }
          }
        }
      }
    }
  }
}
