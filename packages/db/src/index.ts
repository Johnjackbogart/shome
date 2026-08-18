export {
  createDatabase,
  type DatabaseHandle,
  type Db,
  type OpenDatabaseOptions,
  openDatabase,
} from "./client";
export * from "./schema";

import type * as schema from "./schema";

export type User = typeof schema.user.$inferSelect;
export type Connection = typeof schema.connections.$inferSelect;
export type Source = typeof schema.sources.$inferSelect;
export type Subscription = typeof schema.subscriptions.$inferSelect;
export type Item = typeof schema.items.$inferSelect;
export type Post = typeof schema.posts.$inferSelect;
export type PostMedia = typeof schema.postMedia.$inferSelect;
export type MediaUpload = typeof schema.mediaUploads.$inferSelect;
export type Feed = typeof schema.feeds.$inferSelect;
export type Profile = typeof schema.profiles.$inferSelect;
export type Follow = typeof schema.follows.$inferSelect;
export type Product = typeof schema.products.$inferSelect;
export type InterestSignup = typeof schema.interestSignups.$inferSelect;
