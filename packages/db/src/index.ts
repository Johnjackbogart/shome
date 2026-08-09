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
export type Feed = typeof schema.feeds.$inferSelect;
export type Profile = typeof schema.profiles.$inferSelect;
