import { env } from '@ace/env'
import { relations, sql } from 'drizzle-orm'
import { tursoConnect } from '@ace/tursoConnect'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'


export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  displayOrder: integer('displayOrder').notNull(),
  content: text('content').notNull(),
  groupId: integer('groupId').references(() => postGroups.id).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull().default(sql`(unixepoch() * 1000)`),
})


export const postGroups = sqliteTable('postGroups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  displayOrder: integer('displayOrder').notNull(),
})


export const postsRelations = relations(posts, ({ one }) => ({
  group: one(postGroups, {
    fields: [posts.groupId],
    references: [postGroups.id],
  })
}))


export const postGroupsRelations = relations(postGroups, ({ many }) => ({
  posts: many(posts)
}))


export const { db, client } = tursoConnect({
  local: env === 'local' ? 'http://127.0.0.1:8080' : null,
  drizzleConfig: {
    schema: {
      posts,
      postGroups,
    }
  }
})
