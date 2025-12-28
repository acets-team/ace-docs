import { eq, asc } from 'drizzle-orm'
import type { PostGroup } from '@src/lib/types'
import { db, postGroups, posts } from '@src/db/db'
import { createApi, ApiInfo, ApiResolver, ApiInfo2Req } from '@ace/api'


export const info = new ApiInfo({
  method: 'GET',
  path: '/api/post-groups',
})


export const resolver = async (req: ApiInfo2Req<typeof info>) => {
  'use server'

  return new ApiResolver(req)
    .res(async (scope) => {
      const rows = await db // get flat list of groups + posts
        .select({
          groupId: postGroups.id,
          groupTitle: postGroups.title,
          groupOrder: postGroups.displayOrder,
          postId: posts.id,
          postTitle: posts.title,
          postSlug: posts.slug,
          postOrder: posts.displayOrder,
        })
        .from(postGroups)
        .leftJoin(posts, eq(posts.groupId, postGroups.id))
        .orderBy(asc(postGroups.displayOrder), asc(posts.displayOrder))

      const groupMap = new Map<number, PostGroup>() // use map for O(1) group lookups

      for (const row of rows) { // populate map
        if (row.postId && row.postTitle && row.postSlug && row.postOrder) {
          const group = groupMap.get(row.groupId)

          const post = {
            id: row.postId,
            title: row.postTitle,
            slug: row.postSlug,
            order: row.postOrder,
          }

          if (group) group.posts.push(post) 
          else {
            groupMap.set(row.groupId, {
              id: row.groupId,
              title: row.groupTitle,
              order: row.groupOrder,
              posts: [post],
            })
          }
        }
      }

      return scope.success(Array.from(groupMap.values())) // map to array
    })
}


export default createApi('apiGetPostGroups', info, resolver)
