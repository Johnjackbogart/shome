module.exports = [
"[externals]/@electric-sql/pglite [external] (@electric-sql/pglite, esm_import, [project]/node_modules/@electric-sql/pglite)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
var mod = await __turbopack_context__.y("@electric-sql/pglite-7966c14983af6418");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
var mod = await __turbopack_context__.y("pg-587764f78a6c7a9c");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/apps/web/node_modules/@better-auth/drizzle-adapter/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drizzleAdapter",
    ()=>drizzleAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$factory$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/factory.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/functions/aggregate.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/query-builders.ts
/**
* Case-insensitive LIKE/ILIKE for pattern matching.
* Uses ILIKE on PostgreSQL, LOWER()+LIKE on MySQL/SQLite.
*/ function insensitiveIlike(column, pattern, provider) {
    return provider === "pg" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ilike"])(column, pattern) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${column}) LIKE LOWER(${pattern})`;
}
/**
* Case-insensitive IN for string arrays.
*/ function insensitiveInArray(column, values) {
    if (values.length === 0) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`false`;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${column}) IN (${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(values.map((v)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${v})`), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)})`;
}
/**
* Case-insensitive NOT IN for string arrays.
*/ function insensitiveNotInArray(column, values) {
    if (values.length === 0) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`true`;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${column}) NOT IN (${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(values.map((v)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${v})`), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)})`;
}
/**
* Case-insensitive equality for strings.
*/ function insensitiveEq(column, value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${column}) = LOWER(${value})`;
}
/**
* Case-insensitive inequality for strings.
*/ function insensitiveNe(column, value) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${column}) <> LOWER(${value})`;
}
//#endregion
//#region src/drizzle-adapter.ts
/**
* Derive the number of affected rows from a Drizzle write result.
*
* Drizzle returns the raw per-driver result for a non-returning write, so the
* count lives under a different field per driver: node-postgres / neon expose
* `rowCount`, postgres-js / bun-sql carry `count` on an Array subclass, mysql2
* reports `affectedRows` (in a result-header array), planetscale and other
* serverless drivers use `rowsAffected`, better-sqlite3 uses `changes`, and
* Cloudflare D1 nests the count under `meta.changes`. This normalizes them so
* write methods that depend on affected rows honor the adapter contract instead
* of leaking the raw driver result.
*/ function getAffectedRowCount(result, operation, context) {
    let count = 0;
    if (result && typeof result === "object" && "rowCount" in result) count = result.rowCount;
    else if (result && typeof result === "object" && typeof result.count === "number") count = result.count;
    else if (Array.isArray(result)) count = result.length > 0 && hasDriverRowCount(result[0]) ? readDriverRowCount(result[0]) : result.length;
    else if (hasDriverRowCount(result)) count = readDriverRowCount(result);
    if (typeof count !== "number") {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error(`[Drizzle Adapter] The result of the ${operation} operation is not a number. This is likely a bug in the adapter. Please report this issue to the Better Auth team.`, {
            result,
            ...context
        });
        return 0;
    }
    return count;
}
function readDriverRowCount(result) {
    if (!result || typeof result !== "object") return void 0;
    if ("affectedRows" in result) return result.affectedRows;
    if ("rowsAffected" in result) return result.rowsAffected;
    if ("changes" in result) return result.changes;
    if ("meta" in result) {
        const meta = result.meta;
        if (meta && typeof meta === "object" && "changes" in meta) return meta.changes;
    }
}
function hasDriverRowCount(result) {
    return readDriverRowCount(result) !== void 0;
}
const drizzleAdapter = (db, config)=>{
    let lazyOptions = null;
    let mysqlNoIdWarned = false;
    const createCustomAdapter = (db, inTransaction = false)=>({ getFieldName, getDefaultFieldName, getDefaultModelName, options, schema: baSchema })=>{
            if (config.provider === "mysql" && options.advanced?.database?.generateId === false && !mysqlNoIdWarned) {
                mysqlNoIdWarned = true;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].warn("[Drizzle Adapter] MySQL does not support INSERT...RETURNING. With generateId set to false, the adapter uses best-effort fallback strategies (unique columns, full-field match) to retrieve inserted rows. For reliable behavior, use Better Auth's default ID generation, a custom generateId function, or generateId: \"serial\" for auto-increment.");
            }
            function getSchema(model) {
                const schema = config.schema || db._.fullSchema;
                if (!schema) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object.");
                const schemaModel = schema[model];
                if (!schemaModel) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`);
                return schemaModel;
            }
            const withReturning = async (model, builder, data, where)=>{
                if (config.provider !== "mysql") return (await builder.returning())[0];
                await builder.execute();
                const schemaModel = getSchema(model);
                const builderVal = builder.config?.values;
                if (where?.length) {
                    const clause = convertWhereClause(where.map((w)=>{
                        if (data[w.field] !== void 0) return {
                            ...w,
                            value: data[w.field]
                        };
                        return w;
                    }), model);
                    return (await db.select().from(schemaModel).where(...clause))[0];
                }
                const fetchInserted = async (tx)=>{
                    const builderId = builderVal?.[0]?.id?.value;
                    if (builderId) return (await tx.select().from(schemaModel).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel.id, builderId)).limit(1).execute())[0] ?? null;
                    if (data.id) return (await tx.select().from(schemaModel).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel.id, data.id)).limit(1).execute())[0] ?? null;
                    if (options.advanced?.database?.generateId === "serial" && schemaModel.id) {
                        const lastId = (await tx.select({
                            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LAST_INSERT_ID()`
                        }).from(schemaModel).limit(1).execute())[0]?.id;
                        if (lastId) return (await tx.select().from(schemaModel).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel.id, lastId)).limit(1).execute())[0] ?? null;
                    }
                    const modelSchema = baSchema[getDefaultModelName(model)]?.fields;
                    if (modelSchema) for (const [fieldKey, fieldAttr] of Object.entries(modelSchema)){
                        if (!fieldAttr.unique) continue;
                        const dbFieldName = getFieldName({
                            model,
                            field: fieldKey
                        });
                        const val = data[dbFieldName];
                        if (val === void 0 || val === null) continue;
                        if (!schemaModel[dbFieldName]) continue;
                        const res = await tx.select().from(schemaModel).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel[dbFieldName], val)).limit(1).execute();
                        if (res[0]) return res[0];
                    }
                    const conditions = [];
                    for (const [key, val] of Object.entries(data)){
                        if (val === void 0 || !schemaModel[key]) continue;
                        conditions.push(val === null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNull"])(schemaModel[key]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel[key], val));
                    }
                    if (conditions.length > 0) {
                        const combined = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])(...conditions);
                        if (combined) {
                            const res = await tx.select().from(schemaModel).where(combined).limit(2).execute();
                            if (res.length === 1) return res[0];
                        }
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].warn(`[Drizzle Adapter] Unable to safely identify the inserted "${model}" row on MySQL. Enable Better Auth ID generation or use generateId: "serial" for reliable behavior.`);
                    return null;
                };
                return inTransaction ? fetchInserted(db) : db.transaction(fetchInserted);
            };
            function convertWhereClause(where, model) {
                const schemaModel = getSchema(model);
                if (!where) return [];
                if (where.length === 1) {
                    const w = where[0];
                    if (!w) return [];
                    const field = getFieldName({
                        model,
                        field: w.field
                    });
                    if (!schemaModel[field]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
                    const isInsensitive = (w.mode ?? "sensitive") === "insensitive" && (typeof w.value === "string" || Array.isArray(w.value) && w.value.every((v)=>typeof v === "string"));
                    if (w.operator === "in") {
                        if (!Array.isArray(w.value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The value for the field "${w.field}" must be an array when using the "in" operator.`);
                        if (isInsensitive) return [
                            insensitiveInArray(schemaModel[field], w.value)
                        ];
                        return [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inArray"])(schemaModel[field], w.value)
                        ];
                    }
                    if (w.operator === "not_in") {
                        if (!Array.isArray(w.value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
                        if (isInsensitive) return [
                            insensitiveNotInArray(schemaModel[field], w.value)
                        ];
                        return [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notInArray"])(schemaModel[field], w.value)
                        ];
                    }
                    if (w.operator === "contains") {
                        if (isInsensitive && typeof w.value === "string") return [
                            insensitiveIlike(schemaModel[field], `%${w.value}%`, config.provider)
                        ];
                        return [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `%${w.value}%`)
                        ];
                    }
                    if (w.operator === "starts_with") {
                        if (isInsensitive && typeof w.value === "string") return [
                            insensitiveIlike(schemaModel[field], `${w.value}%`, config.provider)
                        ];
                        return [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `${w.value}%`)
                        ];
                    }
                    if (w.operator === "ends_with") {
                        if (isInsensitive && typeof w.value === "string") return [
                            insensitiveIlike(schemaModel[field], `%${w.value}`, config.provider)
                        ];
                        return [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `%${w.value}`)
                        ];
                    }
                    if (w.operator === "lt") return [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lt"])(schemaModel[field], w.value)
                    ];
                    if (w.operator === "lte") return [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lte"])(schemaModel[field], w.value)
                    ];
                    if (w.operator === "ne") {
                        if (w.value === null) return [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNotNull"])(schemaModel[field])
                        ];
                        if (isInsensitive && typeof w.value === "string") return [
                            insensitiveNe(schemaModel[field], w.value)
                        ];
                        return [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ne"])(schemaModel[field], w.value)
                        ];
                    }
                    if (w.operator === "gt") return [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gt"])(schemaModel[field], w.value)
                    ];
                    if (w.operator === "gte") return [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gte"])(schemaModel[field], w.value)
                    ];
                    if (w.value === null) return [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNull"])(schemaModel[field])
                    ];
                    if (isInsensitive && typeof w.value === "string") return [
                        insensitiveEq(schemaModel[field], w.value)
                    ];
                    return [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel[field], w.value)
                    ];
                }
                const andGroup = where.filter((w)=>w.connector === "AND" || !w.connector);
                const orGroup = where.filter((w)=>w.connector === "OR");
                const andClause = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])(...andGroup.map((w)=>{
                    const field = getFieldName({
                        model,
                        field: w.field
                    });
                    const isInsensitive = (w.mode ?? "sensitive") === "insensitive" && (typeof w.value === "string" || Array.isArray(w.value) && w.value.every((v)=>typeof v === "string"));
                    if (w.operator === "in") {
                        if (!Array.isArray(w.value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The value for the field "${w.field}" must be an array when using the "in" operator.`);
                        if (isInsensitive) return insensitiveInArray(schemaModel[field], w.value);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inArray"])(schemaModel[field], w.value);
                    }
                    if (w.operator === "not_in") {
                        if (!Array.isArray(w.value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
                        if (isInsensitive) return insensitiveNotInArray(schemaModel[field], w.value);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notInArray"])(schemaModel[field], w.value);
                    }
                    if (w.operator === "contains") {
                        if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}%`, config.provider);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `%${w.value}%`);
                    }
                    if (w.operator === "starts_with") {
                        if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `${w.value}%`, config.provider);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `${w.value}%`);
                    }
                    if (w.operator === "ends_with") {
                        if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}`, config.provider);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `%${w.value}`);
                    }
                    if (w.operator === "lt") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lt"])(schemaModel[field], w.value);
                    if (w.operator === "lte") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lte"])(schemaModel[field], w.value);
                    if (w.operator === "gt") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gt"])(schemaModel[field], w.value);
                    if (w.operator === "gte") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gte"])(schemaModel[field], w.value);
                    if (w.operator === "ne") {
                        if (w.value === null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNotNull"])(schemaModel[field]);
                        if (isInsensitive && typeof w.value === "string") return insensitiveNe(schemaModel[field], w.value);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ne"])(schemaModel[field], w.value);
                    }
                    if (w.value === null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNull"])(schemaModel[field]);
                    if (isInsensitive && typeof w.value === "string") return insensitiveEq(schemaModel[field], w.value);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel[field], w.value);
                }));
                const orClause = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["or"])(...orGroup.map((w)=>{
                    const field = getFieldName({
                        model,
                        field: w.field
                    });
                    if (!schemaModel[field]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
                    const isInsensitive = (w.mode ?? "sensitive") === "insensitive" && (typeof w.value === "string" || Array.isArray(w.value) && w.value.every((v)=>typeof v === "string"));
                    if (w.operator === "in") {
                        if (!Array.isArray(w.value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The value for the field "${w.field}" must be an array when using the "in" operator.`);
                        if (isInsensitive) return insensitiveInArray(schemaModel[field], w.value);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inArray"])(schemaModel[field], w.value);
                    }
                    if (w.operator === "not_in") {
                        if (!Array.isArray(w.value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
                        if (isInsensitive) return insensitiveNotInArray(schemaModel[field], w.value);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notInArray"])(schemaModel[field], w.value);
                    }
                    if (w.operator === "contains") {
                        if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}%`, config.provider);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `%${w.value}%`);
                    }
                    if (w.operator === "starts_with") {
                        if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `${w.value}%`, config.provider);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `${w.value}%`);
                    }
                    if (w.operator === "ends_with") {
                        if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}`, config.provider);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["like"])(schemaModel[field], `%${w.value}`);
                    }
                    if (w.operator === "lt") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lt"])(schemaModel[field], w.value);
                    if (w.operator === "lte") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lte"])(schemaModel[field], w.value);
                    if (w.operator === "gt") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gt"])(schemaModel[field], w.value);
                    if (w.operator === "gte") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gte"])(schemaModel[field], w.value);
                    if (w.operator === "ne") {
                        if (w.value === null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNotNull"])(schemaModel[field]);
                        if (isInsensitive && typeof w.value === "string") return insensitiveNe(schemaModel[field], w.value);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ne"])(schemaModel[field], w.value);
                    }
                    if (w.value === null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNull"])(schemaModel[field]);
                    if (isInsensitive && typeof w.value === "string") return insensitiveEq(schemaModel[field], w.value);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(schemaModel[field], w.value);
                }));
                if (andGroup.length && orGroup.length) return [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])(andClause, orClause)
                ];
                if (andGroup.length) return [
                    andClause
                ];
                if (orGroup.length) return [
                    orClause
                ];
                return [];
            }
            function checkMissingFields(schema, model, values) {
                if (!schema) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("Drizzle adapter failed to initialize. Drizzle Schema not found. Please provide a schema object in the adapter options object.");
                for(const key in values){
                    let fieldName;
                    try {
                        fieldName = getFieldName({
                            model,
                            field: key
                        });
                    } catch  {
                        fieldName = key;
                    }
                    if (!schema[fieldName]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The field "${key}" does not exist in the "${model}" Drizzle schema. Please update your drizzle schema or re-generate using "npx auth@latest generate".`);
                }
            }
            /**
		* Resolve the db.query key for a model.
		*
		* When `usePlural` is false (default), Better Auth uses singular model
		* names like "user", but Drizzle's db.query is keyed by the schema
		* export names (often plural like "users"). This function:
		*
		* 1. Tries the model name directly (works when schema keys match)
		* 2. If usePlural is set, tries appending "s"
		* 3. Falls back to scanning config.schema to find which db.query key
		*    corresponds to the same table object
		*/ function getQueryModel(model) {
                if (db.query[model]) return model;
                if (config.usePlural) {
                    const plural = `${model}s`;
                    if (db.query[plural]) return plural;
                }
                if (config.schema) {
                    const targetTable = config.schema[model];
                    if (targetTable) {
                        const fullSchema = db._.fullSchema;
                        if (fullSchema) {
                            for (const key of Object.keys(db.query))if (fullSchema[key] === targetTable) return key;
                        }
                    }
                }
                return null;
            }
            return {
                async create ({ model, data: values }) {
                    const schemaModel = getSchema(model);
                    checkMissingFields(schemaModel, model, values);
                    const builder = db.insert(schemaModel).values(values);
                    return await withReturning(model, builder, values);
                },
                async findOne ({ model, where, select, join }) {
                    const schemaModel = getSchema(model);
                    const clause = convertWhereClause(where, model);
                    if (options.experimental?.joins) {
                        const queryModel = getQueryModel(model);
                        if (!db.query || !queryModel) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx auth@latest generate".`);
                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].info("Falling back to regular query");
                        } else {
                            let includes;
                            const pluralJoinResults = [];
                            if (join) {
                                includes = {};
                                const joinEntries = Object.entries(join);
                                for (const [model, joinAttr] of joinEntries){
                                    const limit = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
                                    const isUnique = joinAttr.relation === "one-to-one";
                                    const pluralSuffix = isUnique || config.usePlural ? "" : "s";
                                    includes[`${model}${pluralSuffix}`] = isUnique ? true : {
                                        limit
                                    };
                                    if (!isUnique) pluralJoinResults.push(`${model}${pluralSuffix}`);
                                }
                            }
                            const res = await db.query[queryModel].findFirst({
                                where: clause[0],
                                columns: select?.length && select.length > 0 ? select.reduce((acc, field)=>{
                                    acc[getFieldName({
                                        model,
                                        field
                                    })] = true;
                                    return acc;
                                }, {}) : void 0,
                                with: includes
                            });
                            if (res) for (const pluralJoinResult of pluralJoinResults){
                                const singularKey = !config.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
                                res[singularKey] = res[pluralJoinResult];
                                if (pluralJoinResult !== singularKey) delete res[pluralJoinResult];
                            }
                            return res;
                        }
                    }
                    const res = await db.select(select?.length && select.length > 0 ? select.reduce((acc, field)=>{
                        const fieldName = getFieldName({
                            model,
                            field
                        });
                        return {
                            ...acc,
                            [fieldName]: schemaModel[fieldName]
                        };
                    }, {}) : void 0).from(schemaModel).where(...clause);
                    if (!res.length) return null;
                    return res[0];
                },
                async findMany ({ model, where, sortBy, limit, select, offset, join }) {
                    const schemaModel = getSchema(model);
                    const clause = where ? convertWhereClause(where, model) : [];
                    const sortFn = sortBy?.direction === "desc" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["desc"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asc"];
                    if (options.experimental?.joins) {
                        const queryModel = getQueryModel(model);
                        if (!queryModel) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx auth@latest generate".`);
                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].info("Falling back to regular query");
                        } else {
                            let includes;
                            const pluralJoinResults = [];
                            if (join) {
                                includes = {};
                                const joinEntries = Object.entries(join);
                                for (const [model, joinAttr] of joinEntries){
                                    const isUnique = joinAttr.relation === "one-to-one";
                                    const limit = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
                                    const pluralSuffix = isUnique || config.usePlural ? "" : "s";
                                    includes[`${model}${pluralSuffix}`] = isUnique ? true : {
                                        limit
                                    };
                                    if (!isUnique) pluralJoinResults.push(`${model}${pluralSuffix}`);
                                }
                            }
                            let orderBy = void 0;
                            if (sortBy?.field) orderBy = [
                                sortFn(schemaModel[getFieldName({
                                    model,
                                    field: sortBy?.field
                                })])
                            ];
                            const res = await db.query[queryModel].findMany({
                                where: clause[0],
                                with: includes,
                                columns: select?.length && select.length > 0 ? select.reduce((acc, field)=>{
                                    acc[getFieldName({
                                        model,
                                        field
                                    })] = true;
                                    return acc;
                                }, {}) : void 0,
                                limit: limit ?? 100,
                                offset: offset ?? 0,
                                orderBy
                            });
                            if (res) for (const item of res)for (const pluralJoinResult of pluralJoinResults){
                                const singularKey = !config.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
                                if (singularKey === pluralJoinResult) continue;
                                item[singularKey] = item[pluralJoinResult];
                                delete item[pluralJoinResult];
                            }
                            return res;
                        }
                    }
                    let builder = db.select(select?.length && select.length > 0 ? select.reduce((acc, field)=>{
                        const fieldName = getFieldName({
                            model,
                            field
                        });
                        return {
                            ...acc,
                            [fieldName]: schemaModel[fieldName]
                        };
                    }, {}) : void 0).from(schemaModel);
                    const effectiveLimit = limit;
                    const effectiveOffset = offset;
                    if (typeof effectiveLimit !== "undefined") builder = builder.limit(effectiveLimit);
                    if (typeof effectiveOffset !== "undefined") builder = builder.offset(effectiveOffset);
                    if (sortBy?.field) builder = builder.orderBy(sortFn(schemaModel[getFieldName({
                        model,
                        field: sortBy?.field
                    })]));
                    return await builder.where(...clause);
                },
                async count ({ model, where }) {
                    const schemaModel = getSchema(model);
                    const clause = where ? convertWhereClause(where, model) : [];
                    return (await db.select({
                        count: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$functions$2f$aggregate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["count"])()
                    }).from(schemaModel).where(...clause))[0].count;
                },
                async update ({ model, where, update: values }) {
                    const schemaModel = getSchema(model);
                    const clause = convertWhereClause(where, model);
                    const builder = db.update(schemaModel).set(values).where(...clause);
                    return await withReturning(model, builder, values, where);
                },
                async updateMany ({ model, where, update: values }) {
                    const schemaModel = getSchema(model);
                    const clause = convertWhereClause(where, model);
                    return getAffectedRowCount(await db.update(schemaModel).set(values).where(...clause), "updateMany", {
                        model,
                        where
                    });
                },
                async delete ({ model, where }) {
                    const schemaModel = getSchema(model);
                    const clause = convertWhereClause(where, model);
                    return await db.delete(schemaModel).where(...clause);
                },
                async deleteMany ({ model, where }) {
                    const schemaModel = getSchema(model);
                    const clause = convertWhereClause(where, model);
                    return getAffectedRowCount(await db.delete(schemaModel).where(...clause), "deleteMany", {
                        model,
                        where
                    });
                },
                async consumeOne ({ model, where }) {
                    const schemaModel = getSchema(model);
                    const clause = convertWhereClause(where, model);
                    const idField = getFieldName({
                        model,
                        field: "id"
                    });
                    const idColumn = schemaModel[idField];
                    if (config.provider === "mysql") {
                        const claimFromTransaction = async (tx)=>{
                            const target = (await tx.select().from(schemaModel).where(...clause).for("update").limit(1))[0];
                            if (!target) return null;
                            const targetId = target[idField] ?? target.id;
                            if (targetId === void 0 || targetId === null || !idColumn) return null;
                            return getAffectedRowCount(await tx.delete(schemaModel).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(idColumn, targetId)).execute(), "consumeOne", {
                                model,
                                where
                            }) > 0 ? target : null;
                        };
                        return inTransaction ? claimFromTransaction(db) : db.transaction(claimFromTransaction);
                    }
                    if (!idColumn) return null;
                    const targetIds = db.select({
                        id: idColumn
                    }).from(schemaModel).where(...clause).limit(1);
                    return (await db.delete(schemaModel).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inArray"])(idColumn, targetIds)).returning())[0] ?? null;
                },
                async incrementOne ({ model, where, increment, set }) {
                    const schemaModel = getSchema(model);
                    const clause = convertWhereClause(where, model);
                    const idField = getFieldName({
                        model,
                        field: "id"
                    });
                    const idColumn = schemaModel[idField];
                    const assignments = {};
                    for (const [field, delta] of Object.entries(increment)){
                        const columnName = getFieldName({
                            model,
                            field
                        });
                        const column = schemaModel[columnName];
                        if (!column) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The field "${field}" does not exist in the schema for the model "${model}". Please update your schema.`);
                        assignments[columnName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${column} + ${delta}`;
                    }
                    if (set) for (const [field, value] of Object.entries(set)){
                        const columnName = getFieldName({
                            model,
                            field
                        });
                        if (!schemaModel[columnName]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The field "${field}" does not exist in the schema for the model "${model}". Please update your schema.`);
                        assignments[columnName] = value;
                    }
                    if (config.provider === "mysql") {
                        const mutateInTransaction = async (tx)=>{
                            const target = (await tx.select().from(schemaModel).where(...clause).for("update").limit(1))[0];
                            if (!target) return null;
                            const targetId = target[idField] ?? target.id;
                            if (targetId === void 0 || targetId === null || !idColumn) return null;
                            await tx.update(schemaModel).set(assignments).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(idColumn, targetId)).execute();
                            return (await tx.select().from(schemaModel).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])(idColumn, targetId)).limit(1).execute())[0] ?? null;
                        };
                        return inTransaction ? mutateInTransaction(db) : db.transaction(mutateInTransaction);
                    }
                    if (!idColumn) return null;
                    const targetIds = db.select({
                        id: idColumn
                    }).from(schemaModel).where(...clause).limit(1);
                    return (await db.update(schemaModel).set(assignments).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["inArray"])(idColumn, targetIds)).returning())[0] ?? null;
                },
                options: config
            };
        };
    let adapterOptions = null;
    adapterOptions = {
        config: {
            adapterId: "drizzle",
            adapterName: "Drizzle Adapter",
            usePlural: config.usePlural ?? false,
            debugLogs: config.debugLogs ?? false,
            supportsUUIDs: config.provider === "pg" ? true : false,
            supportsJSON: config.provider === "pg" ? true : false,
            supportsArrays: config.provider === "pg" ? true : false,
            customTransformOutput: ({ data, fieldAttributes })=>{
                if (fieldAttributes.type === "date") {
                    if (data === null || data === void 0) return data;
                    return new Date(data);
                }
                return data;
            },
            transaction: config.transaction ?? false ? (cb)=>db.transaction((tx)=>{
                    return cb((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$factory$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAdapterFactory"])({
                        config: {
                            ...adapterOptions.config,
                            transaction: false
                        },
                        adapter: createCustomAdapter(tx, true)
                    })(lazyOptions));
                }) : false
        },
        adapter: createCustomAdapter(db)
    };
    const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$factory$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAdapterFactory"])(adapterOptions);
    return (options)=>{
        lazyOptions = options;
        return adapter(options);
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/kysely-adapter/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createKyselyAdapter",
    ()=>createKyselyAdapter,
    "getKyselyDatabaseType",
    ()=>getKyselyDatabaseType,
    "kyselyAdapter",
    ()=>kyselyAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$kysely$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/kysely.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$mssql$2f$mssql$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/dialect/mssql/mssql-dialect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$mysql$2f$mysql$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/dialect/mysql/mysql-dialect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/dialect/postgres/postgres-dialect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$sqlite$2f$sqlite$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/dialect/sqlite/sqlite-dialect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/raw-builder/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$factory$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/factory.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$string$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/string.mjs [app-rsc] (ecmascript)");
;
;
;
;
//#region src/dialect.ts
function getKyselyDatabaseType(db) {
    if (!db) return null;
    if ("dialect" in db) return getKyselyDatabaseType(db.dialect);
    if ("createDriver" in db) {
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$sqlite$2f$sqlite$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SqliteDialect"]) return "sqlite";
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$mysql$2f$mysql$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MysqlDialect"]) return "mysql";
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PostgresDialect"]) return "postgres";
        if (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$mssql$2f$mssql$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MssqlDialect"]) return "mssql";
    }
    if ("aggregate" in db) return "sqlite";
    if ("getConnection" in db) return "mysql";
    if ("connect" in db) return "postgres";
    if ("fileControl" in db) return "sqlite";
    if ("open" in db && "close" in db && "prepare" in db) return "sqlite";
    if ("batch" in db && "exec" in db && "prepare" in db) return "sqlite";
    return null;
}
const createKyselyAdapter = async (config)=>{
    const db = config.database;
    if (!db) return {
        kysely: null,
        databaseType: null,
        transaction: void 0
    };
    if ("db" in db) return {
        kysely: db.db,
        databaseType: db.type,
        transaction: db.transaction
    };
    if ("dialect" in db) return {
        kysely: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$kysely$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Kysely"]({
            dialect: db.dialect
        }),
        databaseType: db.type,
        transaction: db.transaction
    };
    let dialect = void 0;
    const databaseType = getKyselyDatabaseType(db);
    if ("createDriver" in db) dialect = db;
    if ("aggregate" in db && !("createSession" in db)) dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$sqlite$2f$sqlite$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SqliteDialect"]({
        database: db
    });
    if ("getConnection" in db) dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$mysql$2f$mysql$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MysqlDialect"](db);
    if ("connect" in db) dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PostgresDialect"]({
        pool: db
    });
    if ("fileControl" in db) {
        const { BunSqliteDialect } = await __turbopack_context__.A("[project]/apps/web/node_modules/@better-auth/kysely-adapter/dist/bun-sqlite-dialect-DTyyejk1.mjs [app-rsc] (ecmascript, async loader)");
        dialect = new BunSqliteDialect({
            database: db
        });
    }
    if ("createSession" in db) {
        let DatabaseSync = void 0;
        try {
            const nodeSqlite = "node:sqlite";
            ({ DatabaseSync } = await import(/* @vite-ignore */ /* webpackIgnore: true */ nodeSqlite));
        } catch (error) {
            if (error !== null && typeof error === "object" && "code" in error && error.code !== "ERR_UNKNOWN_BUILTIN_MODULE") throw error;
        }
        if (DatabaseSync && db instanceof DatabaseSync) {
            const { NodeSqliteDialect } = await __turbopack_context__.A("[project]/apps/web/node_modules/@better-auth/kysely-adapter/dist/node-sqlite-dialect.mjs [app-rsc] (ecmascript, async loader)");
            dialect = new NodeSqliteDialect({
                database: db
            });
        }
    }
    if ("batch" in db && "exec" in db && "prepare" in db) {
        const { D1SqliteDialect } = await __turbopack_context__.A("[project]/apps/web/node_modules/@better-auth/kysely-adapter/dist/d1-sqlite-dialect-CDCl_qH4.mjs [app-rsc] (ecmascript, async loader)");
        dialect = new D1SqliteDialect({
            database: db
        });
    }
    return {
        kysely: dialect ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$kysely$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Kysely"]({
            dialect
        }) : null,
        databaseType,
        transaction: void 0
    };
};
//#endregion
//#region src/query-builders.ts
/**
* Case-insensitive ILIKE/LIKE for pattern matching.
* Uses ILIKE on PostgreSQL, LOWER()+LIKE on MySQL/SQLite/MSSQL.
*/ function insensitiveIlike(columnRef, pattern, dbType) {
    return dbType === "postgres" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(columnRef)} ILIKE ${pattern}` : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(columnRef)}) LIKE LOWER(${pattern})`;
}
/**
* Case-insensitive IN for string arrays.
* Returns { lhs, values } for use with eb(lhs, "in", values).
*/ function insensitiveIn(columnRef, values) {
    return {
        lhs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(columnRef)})`,
        values: values.map((v)=>v.toLowerCase())
    };
}
/**
* Case-insensitive NOT IN for string arrays.
*/ function insensitiveNotIn(columnRef, values) {
    return {
        lhs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(columnRef)})`,
        values: values.map((v)=>v.toLowerCase())
    };
}
/**
* Case-insensitive equality for strings.
* Returns { lhs, value } for use with eb(lhs, "=", value).
*/ function insensitiveEq(columnRef, value) {
    return {
        lhs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(columnRef)})`,
        value: value.toLowerCase()
    };
}
/**
* Case-insensitive inequality for strings.
*/ function insensitiveNe(columnRef, value) {
    return {
        lhs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`LOWER(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(columnRef)})`,
        value: value.toLowerCase()
    };
}
//#endregion
//#region src/kysely-adapter.ts
const kyselyAdapter = (db, config)=>{
    let lazyOptions = null;
    let mysqlNoIdWarned = false;
    const createCustomAdapter = (db, inTransaction = false)=>{
        return ({ getFieldName, schema, getDefaultFieldName, getDefaultModelName, getFieldAttributes, getModelName, options })=>{
            if (config?.type === "mysql" && options.advanced?.database?.generateId === false && !mysqlNoIdWarned) {
                mysqlNoIdWarned = true;
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].warn("[Kysely Adapter] MySQL does not support INSERT...RETURNING. With generateId set to false, the adapter uses best-effort fallback strategies (unique columns, full-field match) to retrieve inserted rows. For reliable behavior, use Better Auth's default ID generation, a custom generateId function, or generateId: \"serial\" for auto-increment.");
            }
            const selectAllJoins = (join)=>{
                const allSelects = [];
                const allSelectsStr = [];
                if (join) for (const [joinModel, _] of Object.entries(join)){
                    const fields = schema[getDefaultModelName(joinModel)]?.fields;
                    const [_joinModelSchema, joinModelName] = joinModel.includes(".") ? joinModel.split(".") : [
                        void 0,
                        joinModel
                    ];
                    if (!fields) continue;
                    fields.id = {
                        type: "string"
                    };
                    for (const [field, fieldAttr] of Object.entries(fields)){
                        allSelects.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(`join_${joinModelName}`)}.${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(fieldAttr.fieldName || field)} as ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(`_joined_${joinModelName}_${fieldAttr.fieldName || field}`)}`);
                        allSelectsStr.push({
                            joinModel,
                            joinModelRef: joinModelName,
                            fieldName: fieldAttr.fieldName || field
                        });
                    }
                }
                return {
                    allSelectsStr,
                    allSelects
                };
            };
            const withReturning = async (values, builder, model, where)=>{
                if (config?.type === "mysql") {
                    if (where.length > 0) {
                        const updateResult = await builder.executeTakeFirst();
                        if (!updateResult || Number(updateResult.numUpdatedRows ?? 0) === 0) return null;
                        const idEqualityWhere = where.find((w)=>w.field === "id" && (w.operator === void 0 || w.operator === "eq") && w.connector !== "OR" && w.value !== void 0 && w.value !== null);
                        let reselectField;
                        let reselectValue;
                        if (values.id !== void 0 && values.id !== null) {
                            reselectField = "id";
                            reselectValue = values.id;
                        } else if (idEqualityWhere) {
                            reselectField = "id";
                            reselectValue = idEqualityWhere.value;
                        } else if (where[0]?.field) {
                            reselectField = where[0].field;
                            reselectValue = values[reselectField] !== void 0 ? values[reselectField] : where[0].value;
                        } else return null;
                        return await db.selectFrom(model).selectAll().where(getFieldName({
                            model,
                            field: reselectField
                        }), reselectValue === null ? "is" : "=", reselectValue).limit(1).executeTakeFirst();
                    }
                    await builder.execute();
                    const fetchInserted = async (trx)=>{
                        if (values.id) return await trx.selectFrom(model).selectAll().where(getFieldName({
                            model,
                            field: "id"
                        }), "=", values.id).limit(1).executeTakeFirst();
                        if (options.advanced?.database?.generateId === "serial") {
                            const lastId = (await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`SELECT LAST_INSERT_ID() as id`.execute(trx)).rows[0]?.id;
                            if (lastId) return await trx.selectFrom(model).selectAll().where(getFieldName({
                                model,
                                field: "id"
                            }), "=", lastId).limit(1).executeTakeFirst();
                        }
                        const modelSchema = schema[getDefaultModelName(model)]?.fields;
                        if (modelSchema) for (const [fieldKey, fieldAttr] of Object.entries(modelSchema)){
                            if (!fieldAttr.unique) continue;
                            const dbFieldName = getFieldName({
                                model,
                                field: fieldKey
                            });
                            const val = values[dbFieldName];
                            if (val === void 0 || val === null) continue;
                            const row = await trx.selectFrom(model).selectAll().where(dbFieldName, "=", val).limit(1).executeTakeFirst();
                            if (row) return row;
                        }
                        let query = trx.selectFrom(model).selectAll();
                        let hasConditions = false;
                        for (const [key, val] of Object.entries(values)){
                            if (val === void 0) continue;
                            query = query.where(key, val === null ? "is" : "=", val);
                            hasConditions = true;
                        }
                        if (hasConditions) {
                            const rows = await query.limit(2).execute();
                            if (rows.length === 1) return rows[0];
                        }
                        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].warn(`[Kysely Adapter] Unable to safely identify the inserted "${model}" row on MySQL. Enable Better Auth ID generation or use generateId: "serial" for reliable behavior.`);
                        return null;
                    };
                    return inTransaction ? fetchInserted(db) : db.transaction().execute(fetchInserted);
                }
                if (config?.type === "mssql") return await builder.outputAll("inserted").executeTakeFirst();
                return await builder.returningAll().executeTakeFirst();
            };
            function convertWhereClause(model, w) {
                if (!w) return {
                    and: null,
                    or: null
                };
                const conditions = {
                    and: [],
                    or: []
                };
                w.forEach((condition)=>{
                    const { field: _field, value: _value, operator = "eq", connector = "AND", mode = "sensitive" } = condition;
                    const value = _value;
                    const field = getFieldName({
                        model,
                        field: _field
                    });
                    const isInsensitive = mode === "insensitive" && (typeof value === "string" || Array.isArray(value) && value.every((v)=>typeof v === "string"));
                    const expr = (eb)=>{
                        const f = `${model}.${field}`;
                        if (operator.toLowerCase() === "in") {
                            if (isInsensitive) {
                                const { lhs, values } = insensitiveIn(f, Array.isArray(value) ? value : [
                                    value
                                ]);
                                return eb(lhs, "in", values);
                            }
                            return eb(f, "in", Array.isArray(value) ? value : [
                                value
                            ]);
                        }
                        if (operator.toLowerCase() === "not_in") {
                            if (isInsensitive) {
                                const { lhs, values } = insensitiveNotIn(f, Array.isArray(value) ? value : [
                                    value
                                ]);
                                return eb(lhs, "not in", values);
                            }
                            return eb(f, "not in", Array.isArray(value) ? value : [
                                value
                            ]);
                        }
                        if (operator === "contains") {
                            if (isInsensitive && typeof value === "string") return insensitiveIlike(f, `%${value}%`, config?.type);
                            return eb(f, "like", `%${value}%`);
                        }
                        if (operator === "starts_with") {
                            if (isInsensitive && typeof value === "string") return insensitiveIlike(f, `${value}%`, config?.type);
                            return eb(f, "like", `${value}%`);
                        }
                        if (operator === "ends_with") {
                            if (isInsensitive && typeof value === "string") return insensitiveIlike(f, `%${value}`, config?.type);
                            return eb(f, "like", `%${value}`);
                        }
                        if (operator === "eq") {
                            if (value === null) return eb(f, "is", null);
                            if (isInsensitive && typeof value === "string") {
                                const { lhs, value: v } = insensitiveEq(f, value);
                                return eb(lhs, "=", v);
                            }
                            return eb(f, "=", value);
                        }
                        if (operator === "ne") {
                            if (value === null) return eb(f, "is not", null);
                            if (isInsensitive && typeof value === "string") {
                                const { lhs, value: v } = insensitiveNe(f, value);
                                return eb(lhs, "<>", v);
                            }
                            return eb(f, "<>", value);
                        }
                        if (operator === "gt") return eb(f, ">", value);
                        if (operator === "gte") return eb(f, ">=", value);
                        if (operator === "lt") return eb(f, "<", value);
                        if (operator === "lte") return eb(f, "<=", value);
                        return eb(f, operator, value);
                    };
                    if (connector === "OR") conditions.or.push(expr);
                    else conditions.and.push(expr);
                });
                return {
                    and: conditions.and.length ? conditions.and : null,
                    or: conditions.or.length ? conditions.or : null
                };
            }
            function processJoinedResults(rows, joinConfig, allSelectsStr) {
                if (!joinConfig || !rows.length) return rows;
                const groupedByMainId = /* @__PURE__ */ new Map();
                for (const currentRow of rows){
                    const mainModelFields = {};
                    const joinedModelFields = {};
                    for (const [joinModel] of Object.entries(joinConfig))joinedModelFields[getModelName(joinModel)] = {};
                    for (const [key, value] of Object.entries(currentRow)){
                        const keyStr = String(key);
                        let assigned = false;
                        for (const { joinModel, fieldName, joinModelRef } of allSelectsStr)if (keyStr === `_joined_${joinModelRef}_${fieldName}` || keyStr === `_Joined${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$string$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["capitalizeFirstLetter"])(joinModelRef)}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$string$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["capitalizeFirstLetter"])(fieldName)}`) {
                            joinedModelFields[getModelName(joinModel)][getFieldName({
                                model: joinModel,
                                field: fieldName
                            })] = value;
                            assigned = true;
                            break;
                        }
                        if (!assigned) mainModelFields[key] = value;
                    }
                    const mainId = mainModelFields.id;
                    if (!mainId) continue;
                    if (!groupedByMainId.has(mainId)) {
                        const entry = {
                            ...mainModelFields
                        };
                        for (const [joinModel, joinAttr] of Object.entries(joinConfig))entry[getModelName(joinModel)] = joinAttr.relation === "one-to-one" ? null : [];
                        groupedByMainId.set(mainId, entry);
                    }
                    const entry = groupedByMainId.get(mainId);
                    for (const [joinModel, joinAttr] of Object.entries(joinConfig)){
                        const isUnique = joinAttr.relation === "one-to-one";
                        const limit = joinAttr.limit ?? 100;
                        const joinedObj = joinedModelFields[getModelName(joinModel)];
                        const hasData = joinedObj && Object.keys(joinedObj).length > 0 && Object.values(joinedObj).some((value)=>value !== null && value !== void 0);
                        if (isUnique) entry[getModelName(joinModel)] = hasData ? joinedObj : null;
                        else {
                            const joinModelName = getModelName(joinModel);
                            if (Array.isArray(entry[joinModelName]) && hasData) {
                                if (entry[joinModelName].length >= limit) continue;
                                const idFieldName = getFieldName({
                                    model: joinModel,
                                    field: "id"
                                });
                                const joinedId = joinedObj[idFieldName];
                                if (joinedId) {
                                    if (!entry[joinModelName].some((item)=>item[idFieldName] === joinedId) && entry[joinModelName].length < limit) entry[joinModelName].push(joinedObj);
                                } else if (entry[joinModelName].length < limit) entry[joinModelName].push(joinedObj);
                            }
                        }
                    }
                }
                const result = Array.from(groupedByMainId.values());
                for (const entry of result)for (const [joinModel, joinAttr] of Object.entries(joinConfig))if (joinAttr.relation !== "one-to-one") {
                    const joinModelName = getModelName(joinModel);
                    if (Array.isArray(entry[joinModelName])) {
                        const limit = joinAttr.limit ?? 100;
                        if (entry[joinModelName].length > limit) entry[joinModelName] = entry[joinModelName].slice(0, limit);
                    }
                }
                return result;
            }
            return {
                async create ({ data, model }) {
                    const builder = db.insertInto(model).values(data);
                    return await withReturning(data, builder, model, []);
                },
                async findOne ({ model, where, select, join }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db.selectFrom((eb)=>{
                        let b = eb.selectFrom(model);
                        if (and) b = b.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                        if (or) b = b.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                        if (select?.length && select.length > 0) b = b.select(select.map((field)=>getFieldName({
                                model,
                                field
                            })));
                        else b = b.selectAll();
                        return b.as("primary");
                    }).selectAll("primary");
                    if (join) for (const [joinModel, joinAttr] of Object.entries(join)){
                        const [_joinModelSchema, joinModelName] = joinModel.includes(".") ? joinModel.split(".") : [
                            void 0,
                            joinModel
                        ];
                        query = query.leftJoin(`${joinModel} as join_${joinModelName}`, (join)=>join.onRef(`join_${joinModelName}.${joinAttr.on.to}`, "=", `primary.${joinAttr.on.from}`));
                    }
                    const { allSelectsStr, allSelects } = selectAllJoins(join);
                    query = query.select(allSelects);
                    const res = await query.execute();
                    if (!res || !Array.isArray(res) || res.length === 0) return null;
                    const row = res[0];
                    if (join) return processJoinedResults(res, join, allSelectsStr)[0];
                    return row;
                },
                async findMany ({ model, where, limit, select, offset, sortBy, join }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db.selectFrom((eb)=>{
                        let b = eb.selectFrom(model);
                        if (config?.type === "mssql") {
                            if (offset !== void 0) {
                                if (!sortBy) b = b.orderBy(getFieldName({
                                    model,
                                    field: "id"
                                }));
                                b = b.offset(offset).fetch(limit || 100);
                            } else if (limit !== void 0) b = b.top(limit);
                        } else {
                            if (limit !== void 0) b = b.limit(limit);
                            if (offset !== void 0) b = b.offset(offset);
                        }
                        if (sortBy?.field) b = b.orderBy(`${getFieldName({
                            model,
                            field: sortBy.field
                        })}`, sortBy.direction);
                        if (and) b = b.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                        if (or) b = b.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                        if (select?.length && select.length > 0) b = b.select(select.map((field)=>getFieldName({
                                model,
                                field
                            })));
                        else b = b.selectAll();
                        return b.as("primary");
                    }).selectAll("primary");
                    if (join) for (const [joinModel, joinAttr] of Object.entries(join)){
                        const [_joinModelSchema, joinModelName] = joinModel.includes(".") ? joinModel.split(".") : [
                            void 0,
                            joinModel
                        ];
                        query = query.leftJoin(`${joinModel} as join_${joinModelName}`, (join)=>join.onRef(`join_${joinModelName}.${joinAttr.on.to}`, "=", `primary.${joinAttr.on.from}`));
                    }
                    const { allSelectsStr, allSelects } = selectAllJoins(join);
                    query = query.select(allSelects);
                    if (sortBy?.field) query = query.orderBy(`${getFieldName({
                        model,
                        field: sortBy.field
                    })}`, sortBy.direction);
                    const res = await query.execute();
                    if (!res) return [];
                    if (join) return processJoinedResults(res, join, allSelectsStr);
                    return res;
                },
                async update ({ model, where, update: values }) {
                    if (where.length === 0) return null;
                    const { and, or } = convertWhereClause(model, where);
                    let query = db.updateTable(model).set(values);
                    if (and) query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    if (or) query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    return await withReturning(values, query, model, where);
                },
                async updateMany ({ model, where, update: values }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db.updateTable(model).set(values);
                    if (and) query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    if (or) query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    const res = (await query.executeTakeFirst()).numUpdatedRows;
                    return res > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Number(res);
                },
                async count ({ model, where }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db.selectFrom(model).select(db.fn.count("id").as("count"));
                    if (and) query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    if (or) query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    const res = await query.execute();
                    if (typeof res[0].count === "number") return res[0].count;
                    if (typeof res[0].count === "bigint") return Number(res[0].count);
                    return parseInt(res[0].count);
                },
                async delete ({ model, where }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db.deleteFrom(model);
                    if (and) query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    if (or) query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    await query.execute();
                },
                async deleteMany ({ model, where }) {
                    const { and, or } = convertWhereClause(model, where);
                    let query = db.deleteFrom(model);
                    if (and) query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                    if (or) query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                    const res = (await query.executeTakeFirst()).numDeletedRows;
                    return res > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Number(res);
                },
                async consumeOne ({ model, where }) {
                    const { and, or } = convertWhereClause(model, where);
                    const applyWhere = (query)=>{
                        if (and) query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                        if (or) query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                        return query;
                    };
                    const idField = getFieldName({
                        model,
                        field: "id"
                    });
                    const deleteSelectedRow = async (db, row)=>{
                        const targetId = row[idField] ?? row.id;
                        if (targetId === void 0 || targetId === null) return null;
                        const query = db.deleteFrom(model).where(`${model}.${idField}`, "=", targetId);
                        if (config?.type === "mysql") {
                            const result = await query.executeTakeFirst();
                            return Number(result.numDeletedRows) > 0 ? row : null;
                        }
                        if (config?.type === "mssql") return await query.outputAll("deleted").executeTakeFirst() ?? null;
                        return await query.returningAll().executeTakeFirst() ?? null;
                    };
                    const deleteWithReturning = async (query)=>{
                        if (config?.type === "mssql") return await query.outputAll("deleted").executeTakeFirst() ?? null;
                        return await query.returningAll().executeTakeFirst() ?? null;
                    };
                    if (config?.type === "mysql") {
                        const claimFromTransaction = async (trx)=>{
                            const row = await applyWhere(trx.selectFrom(model).selectAll().forUpdate()).limit(1).executeTakeFirst();
                            if (!row) return null;
                            return deleteSelectedRow(trx, row);
                        };
                        return inTransaction ? claimFromTransaction(db) : db.transaction().execute(claimFromTransaction);
                    }
                    const selectIds = applyWhere(db.selectFrom(model).select(`${model}.${idField}`));
                    const targetIds = config?.type === "mssql" ? selectIds.top(1) : selectIds.limit(1);
                    return deleteWithReturning(db.deleteFrom(model).where(`${model}.${idField}`, "in", targetIds));
                },
                async incrementOne ({ model, where, increment, set }) {
                    const { and, or } = convertWhereClause(model, where);
                    const applyWhere = (query)=>{
                        if (and) query = query.where((eb)=>eb.and(and.map((expr)=>expr(eb))));
                        if (or) query = query.where((eb)=>eb.or(or.map((expr)=>expr(eb))));
                        return query;
                    };
                    const assignments = {
                        ...set ?? {}
                    };
                    for (const [field, delta] of Object.entries(increment))assignments[field] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].ref(field)} + ${delta}`;
                    const idField = getFieldName({
                        model,
                        field: "id"
                    });
                    if (config?.type === "mysql") {
                        const incrementInTransaction = async (trx)=>{
                            const target = await applyWhere(trx.selectFrom(model).select(`${model}.${idField}`).forUpdate()).limit(1).executeTakeFirst();
                            if (!target) return null;
                            const targetId = target[idField] ?? target.id;
                            if (targetId === void 0 || targetId === null) return null;
                            const updated = await applyWhere(trx.updateTable(model).set(assignments)).where(`${model}.${idField}`, "=", targetId).executeTakeFirst();
                            if (Number(updated.numUpdatedRows) === 0) return null;
                            return await trx.selectFrom(model).selectAll().where(`${model}.${idField}`, "=", targetId).limit(1).executeTakeFirst() ?? null;
                        };
                        return inTransaction ? incrementInTransaction(db) : db.transaction().execute(incrementInTransaction);
                    }
                    const selectIds = applyWhere(db.selectFrom(model).select(`${model}.${idField}`));
                    const targetIds = config?.type === "mssql" ? selectIds.top(1) : selectIds.limit(1);
                    const updateQuery = db.updateTable(model).set(assignments).where(`${model}.${idField}`, "in", targetIds);
                    if (config?.type === "mssql") return await updateQuery.outputAll("inserted").executeTakeFirst() ?? null;
                    return await updateQuery.returningAll().executeTakeFirst() ?? null;
                },
                options: config
            };
        };
    };
    let adapterOptions = null;
    adapterOptions = {
        config: {
            adapterId: "kysely",
            adapterName: "Kysely Adapter",
            usePlural: config?.usePlural,
            debugLogs: config?.debugLogs,
            supportsBooleans: config?.type === "sqlite" || config?.type === "mssql" || config?.type === "mysql" || !config?.type ? false : true,
            supportsDates: config?.type === "sqlite" || config?.type === "mssql" || !config?.type ? false : true,
            supportsJSON: config?.type === "postgres" ? true : false,
            supportsArrays: false,
            supportsUUIDs: config?.type === "postgres" ? true : false,
            transaction: config?.transaction ? (cb)=>db.transaction().execute((trx)=>{
                    return cb((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$factory$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAdapterFactory"])({
                        config: {
                            ...adapterOptions.config,
                            transaction: false
                        },
                        adapter: createCustomAdapter(trx, true)
                    })(lazyOptions));
                }) : false
        },
        adapter: createCustomAdapter(db)
    };
    const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$factory$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAdapterFactory"])(adapterOptions);
    return (options)=>{
        lazyOptions = options;
        return adapter(options);
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/telemetry/dist/node.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTelemetry",
    ()=>createTelemetry,
    "getTelemetryAuthConfig",
    ()=>getTelemetryAuthConfig
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/env-impl.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
//#region src/detectors/detect-auth-config.ts
async function getTelemetryAuthConfig(options, context) {
    return {
        database: context?.database,
        adapter: context?.adapter,
        emailVerification: {
            sendVerificationEmail: !!options.emailVerification?.sendVerificationEmail,
            sendOnSignUp: !!options.emailVerification?.sendOnSignUp,
            sendOnSignIn: !!options.emailVerification?.sendOnSignIn,
            autoSignInAfterVerification: !!options.emailVerification?.autoSignInAfterVerification,
            expiresIn: options.emailVerification?.expiresIn,
            beforeEmailVerification: !!options.emailVerification?.beforeEmailVerification,
            afterEmailVerification: !!options.emailVerification?.afterEmailVerification
        },
        emailAndPassword: {
            enabled: !!options.emailAndPassword?.enabled,
            disableSignUp: !!options.emailAndPassword?.disableSignUp,
            requireEmailVerification: !!options.emailAndPassword?.requireEmailVerification,
            maxPasswordLength: options.emailAndPassword?.maxPasswordLength,
            minPasswordLength: options.emailAndPassword?.minPasswordLength,
            sendResetPassword: !!options.emailAndPassword?.sendResetPassword,
            resetPasswordTokenExpiresIn: options.emailAndPassword?.resetPasswordTokenExpiresIn,
            onPasswordReset: !!options.emailAndPassword?.onPasswordReset,
            password: {
                hash: !!options.emailAndPassword?.password?.hash,
                verify: !!options.emailAndPassword?.password?.verify
            },
            autoSignIn: !!options.emailAndPassword?.autoSignIn,
            revokeSessionsOnPasswordReset: !!options.emailAndPassword?.revokeSessionsOnPasswordReset
        },
        socialProviders: await Promise.all(Object.keys(options.socialProviders || {}).map(async (key)=>{
            const p = options.socialProviders?.[key];
            if (!p) return {};
            const provider = typeof p === "function" ? await p() : p;
            return {
                id: key,
                mapProfileToUser: !!provider.mapProfileToUser,
                disableDefaultScope: !!provider.disableDefaultScope,
                disableIdTokenSignIn: !!provider.disableIdTokenSignIn,
                disableImplicitSignUp: provider.disableImplicitSignUp,
                disableSignUp: provider.disableSignUp,
                getUserInfo: !!provider.getUserInfo,
                overrideUserInfoOnSignIn: !!provider.overrideUserInfoOnSignIn,
                prompt: provider.prompt,
                verifyIdToken: !!provider.verifyIdToken,
                scope: provider.scope,
                refreshAccessToken: !!provider.refreshAccessToken
            };
        })),
        plugins: options.plugins?.map((p)=>p.id.toString()),
        user: {
            modelName: options.user?.modelName,
            fields: options.user?.fields,
            additionalFields: options.user?.additionalFields,
            changeEmail: {
                enabled: options.user?.changeEmail?.enabled,
                sendChangeEmailConfirmation: !!options.user?.changeEmail?.sendChangeEmailConfirmation
            }
        },
        verification: {
            modelName: options.verification?.modelName,
            disableCleanup: options.verification?.disableCleanup,
            fields: options.verification?.fields
        },
        session: {
            modelName: options.session?.modelName,
            additionalFields: options.session?.additionalFields,
            cookieCache: {
                enabled: options.session?.cookieCache?.enabled,
                maxAge: options.session?.cookieCache?.maxAge,
                strategy: options.session?.cookieCache?.strategy
            },
            disableSessionRefresh: options.session?.disableSessionRefresh,
            expiresIn: options.session?.expiresIn,
            fields: options.session?.fields,
            freshAge: options.session?.freshAge,
            preserveSessionInDatabase: options.session?.preserveSessionInDatabase,
            storeSessionInDatabase: options.session?.storeSessionInDatabase,
            updateAge: options.session?.updateAge
        },
        account: {
            modelName: options.account?.modelName,
            fields: options.account?.fields,
            encryptOAuthTokens: options.account?.encryptOAuthTokens,
            updateAccountOnSignIn: options.account?.updateAccountOnSignIn,
            accountLinking: {
                enabled: options.account?.accountLinking?.enabled,
                trustedProviders: options.account?.accountLinking?.trustedProviders,
                updateUserInfoOnLink: options.account?.accountLinking?.updateUserInfoOnLink,
                allowUnlinkingAll: options.account?.accountLinking?.allowUnlinkingAll
            }
        },
        hooks: {
            after: !!options.hooks?.after,
            before: !!options.hooks?.before
        },
        secondaryStorage: !!options.secondaryStorage,
        advanced: {
            cookiePrefix: !!options.advanced?.cookiePrefix,
            cookies: !!options.advanced?.cookies,
            crossSubDomainCookies: {
                domain: !!options.advanced?.crossSubDomainCookies?.domain,
                enabled: options.advanced?.crossSubDomainCookies?.enabled,
                additionalCookies: options.advanced?.crossSubDomainCookies?.additionalCookies
            },
            database: {
                generateId: options.advanced?.database?.generateId,
                defaultFindManyLimit: options.advanced?.database?.defaultFindManyLimit
            },
            useSecureCookies: options.advanced?.useSecureCookies,
            ipAddress: {
                disableIpTracking: options.advanced?.ipAddress?.disableIpTracking,
                ipAddressHeaders: options.advanced?.ipAddress?.ipAddressHeaders
            },
            disableCSRFCheck: options.advanced?.disableCSRFCheck,
            cookieAttributes: {
                expires: options.advanced?.defaultCookieAttributes?.expires,
                secure: options.advanced?.defaultCookieAttributes?.secure,
                sameSite: options.advanced?.defaultCookieAttributes?.sameSite,
                domain: !!options.advanced?.defaultCookieAttributes?.domain,
                path: options.advanced?.defaultCookieAttributes?.path,
                httpOnly: options.advanced?.defaultCookieAttributes?.httpOnly
            }
        },
        trustedOrigins: options.trustedOrigins?.length,
        rateLimit: {
            storage: options.rateLimit?.storage,
            modelName: options.rateLimit?.modelName,
            window: options.rateLimit?.window,
            customStorage: !!options.rateLimit?.customStorage,
            enabled: options.rateLimit?.enabled,
            max: options.rateLimit?.max
        },
        onAPIError: {
            errorURL: options.onAPIError?.errorURL,
            onError: !!options.onAPIError?.onError,
            throw: options.onAPIError?.throw
        },
        logger: {
            disabled: options.logger?.disabled,
            level: options.logger?.level,
            log: !!options.logger?.log
        },
        databaseHooks: {
            user: {
                create: {
                    after: !!options.databaseHooks?.user?.create?.after,
                    before: !!options.databaseHooks?.user?.create?.before
                },
                update: {
                    after: !!options.databaseHooks?.user?.update?.after,
                    before: !!options.databaseHooks?.user?.update?.before
                }
            },
            session: {
                create: {
                    after: !!options.databaseHooks?.session?.create?.after,
                    before: !!options.databaseHooks?.session?.create?.before
                },
                update: {
                    after: !!options.databaseHooks?.session?.update?.after,
                    before: !!options.databaseHooks?.session?.update?.before
                }
            },
            account: {
                create: {
                    after: !!options.databaseHooks?.account?.create?.after,
                    before: !!options.databaseHooks?.account?.create?.before
                },
                update: {
                    after: !!options.databaseHooks?.account?.update?.after,
                    before: !!options.databaseHooks?.account?.update?.before
                }
            },
            verification: {
                create: {
                    after: !!options.databaseHooks?.verification?.create?.after,
                    before: !!options.databaseHooks?.verification?.create?.before
                },
                update: {
                    after: !!options.databaseHooks?.verification?.update?.after,
                    before: !!options.databaseHooks?.verification?.update?.before
                }
            }
        }
    };
}
//#endregion
//#region src/detectors/detect-project-info.ts
function detectPackageManager() {
    const userAgent = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"].npm_config_user_agent;
    if (!userAgent) return;
    const pmSpec = userAgent.split(" ")[0];
    const separatorPos = pmSpec.lastIndexOf("/");
    const name = pmSpec.substring(0, separatorPos);
    return {
        name: name === "npminstall" ? "cnpm" : name,
        version: pmSpec.substring(separatorPos + 1)
    };
}
//#endregion
//#region src/detectors/detect-system-info.ts
function isCI() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"].CI !== "false" && ("BUILD_ID" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "BUILD_NUMBER" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "CI" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "CI_APP_ID" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "CI_BUILD_ID" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "CI_BUILD_NUMBER" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "CI_NAME" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "CONTINUOUS_INTEGRATION" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] || "RUN_ID" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"]);
}
//#endregion
//#region src/detectors/detect-runtime.ts
function detectRuntime() {
    if (typeof Deno !== "undefined") return {
        name: "deno",
        version: Deno?.version?.deno ?? null
    };
    if (typeof Bun !== "undefined") return {
        name: "bun",
        version: Bun?.version ?? null
    };
    if (typeof process !== "undefined" && process?.versions?.node) return {
        name: "node",
        version: process.versions.node ?? null
    };
    return {
        name: "edge",
        version: null
    };
}
function detectEnvironment() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("NODE_ENV") === "production" ? "production" : isCI() ? "ci" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTest"])() ? "test" : "development";
}
//#endregion
//#region src/utils/hash.ts
async function hashToBase64(data) {
    const buffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(data);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(buffer);
}
//#endregion
//#region src/utils/id.ts
const generateId = (size)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRandomStringGenerator"])("a-z", "A-Z", "0-9")(size || 32);
};
//#endregion
//#region src/node.ts
let packageJSONCache;
async function readRootPackageJson() {
    if (packageJSONCache) return packageJSONCache;
    try {
        const cwd = process.cwd();
        if (!cwd) return void 0;
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(cwd, "package.json"), "utf-8");
        packageJSONCache = JSON.parse(raw);
        return packageJSONCache;
    } catch  {}
}
async function getPackageVersion(pkg) {
    if (packageJSONCache) return packageJSONCache.dependencies?.[pkg] || packageJSONCache.devDependencies?.[pkg] || packageJSONCache.peerDependencies?.[pkg];
    try {
        const cwd = process.cwd();
        if (!cwd) throw new Error("no-cwd");
        const pkgJsonPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(cwd, "node_modules", pkg, "package.json");
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(pkgJsonPath, "utf-8");
        return JSON.parse(raw).version || await getVersionFromLocalPackageJson(pkg) || void 0;
    } catch  {}
    return getVersionFromLocalPackageJson(pkg);
}
async function getVersionFromLocalPackageJson(pkg) {
    const json = await readRootPackageJson();
    if (!json) return void 0;
    return ({
        ...json.dependencies,
        ...json.devDependencies,
        ...json.peerDependencies
    })[pkg];
}
async function getNameFromLocalPackageJson() {
    return (await readRootPackageJson())?.name;
}
async function detectSystemInfo() {
    try {
        const cpus = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].cpus();
        return {
            deploymentVendor: getVendor(),
            systemPlatform: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].platform(),
            systemRelease: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].release(),
            systemArchitecture: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].arch(),
            cpuCount: cpus.length,
            cpuModel: cpus.length ? cpus[0].model : null,
            cpuSpeed: cpus.length ? cpus[0].speed : null,
            memory: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].totalmem(),
            isWSL: await isWsl(),
            isDocker: await isDocker(),
            isTTY: process.stdout ? process.stdout.isTTY : null
        };
    } catch  {
        return {
            systemPlatform: null,
            systemRelease: null,
            systemArchitecture: null,
            cpuCount: null,
            cpuModel: null,
            cpuSpeed: null,
            memory: null,
            isWSL: null,
            isDocker: null,
            isTTY: null
        };
    }
}
function getVendor() {
    const env = process.env;
    const hasAny = (...keys)=>keys.some((k)=>Boolean(env[k]));
    if (hasAny("CF_PAGES", "CF_PAGES_URL", "CF_ACCOUNT_ID") || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") return "cloudflare";
    if (hasAny("VERCEL", "VERCEL_URL", "VERCEL_ENV")) return "vercel";
    if (hasAny("NETLIFY", "NETLIFY_URL")) return "netlify";
    if (hasAny("RENDER", "RENDER_URL", "RENDER_INTERNAL_HOSTNAME", "RENDER_SERVICE_ID")) return "render";
    if (hasAny("AWS_LAMBDA_FUNCTION_NAME", "AWS_EXECUTION_ENV", "LAMBDA_TASK_ROOT")) return "aws";
    if (hasAny("GOOGLE_CLOUD_FUNCTION_NAME", "GOOGLE_CLOUD_PROJECT", "GCP_PROJECT", "K_SERVICE")) return "gcp";
    if (hasAny("AZURE_FUNCTION_NAME", "FUNCTIONS_WORKER_RUNTIME", "WEBSITE_INSTANCE_ID", "WEBSITE_SITE_NAME")) return "azure";
    if (hasAny("DENO_DEPLOYMENT_ID", "DENO_REGION")) return "deno-deploy";
    if (hasAny("FLY_APP_NAME", "FLY_REGION", "FLY_ALLOC_ID")) return "fly-io";
    if (hasAny("RAILWAY_STATIC_URL", "RAILWAY_ENVIRONMENT_NAME")) return "railway";
    if (hasAny("DYNO", "HEROKU_APP_NAME")) return "heroku";
    if (hasAny("DO_DEPLOYMENT_ID", "DO_APP_NAME", "DIGITALOCEAN")) return "digitalocean";
    if (hasAny("KOYEB", "KOYEB_DEPLOYMENT_ID", "KOYEB_APP_NAME")) return "koyeb";
    return null;
}
let isDockerCached;
async function hasDockerEnv() {
    try {
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].statSync("/.dockerenv");
        return true;
    } catch  {
        return false;
    }
}
async function hasDockerCGroup() {
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync("/proc/self/cgroup", "utf8").includes("docker");
    } catch  {
        return false;
    }
}
async function isDocker() {
    if (isDockerCached === void 0) isDockerCached = await hasDockerEnv() || await hasDockerCGroup();
    return isDockerCached;
}
let isInsideContainerCached;
const hasContainerEnv = async ()=>{
    try {
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].statSync("/run/.containerenv");
        return true;
    } catch  {
        return false;
    }
};
async function isInsideContainer() {
    if (isInsideContainerCached === void 0) isInsideContainerCached = await hasContainerEnv() || await isDocker();
    return isInsideContainerCached;
}
async function isWsl() {
    try {
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
    } catch  {
        return false;
    }
}
let projectIdCached = null;
async function getProjectId(baseUrl) {
    if (projectIdCached) return projectIdCached;
    const projectName = await getNameFromLocalPackageJson();
    if (projectName) {
        projectIdCached = await hashToBase64(baseUrl ? baseUrl + projectName : projectName);
        return projectIdCached;
    }
    if (baseUrl) {
        projectIdCached = await hashToBase64(baseUrl);
        return projectIdCached;
    }
    projectIdCached = generateId(32);
    return projectIdCached;
}
async function detectDatabaseNode() {
    for (const [pkg, name] of Object.entries({
        pg: "postgresql",
        mysql: "mysql",
        mariadb: "mariadb",
        sqlite3: "sqlite",
        "better-sqlite3": "sqlite",
        "@prisma/client": "prisma",
        mongoose: "mongodb",
        mongodb: "mongodb",
        "drizzle-orm": "drizzle"
    })){
        const version = await getPackageVersion(pkg);
        if (version) return {
            name,
            version
        };
    }
}
async function detectFrameworkNode() {
    for (const [pkg, name] of Object.entries({
        next: "next",
        nuxt: "nuxt",
        "react-router": "react-router",
        astro: "astro",
        "@sveltejs/kit": "sveltekit",
        "solid-start": "solid-start",
        "tanstack-start": "tanstack-start",
        hono: "hono",
        express: "express",
        elysia: "elysia",
        expo: "expo"
    })){
        const version = await getPackageVersion(pkg);
        if (version) return {
            name,
            version
        };
    }
}
const noop = async function noop() {};
async function createTelemetry(options, context) {
    const debugEnabled = options.telemetry?.debug || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBooleanEnvVar"])("BETTER_AUTH_TELEMETRY_DEBUG", false);
    const telemetryEndpoint = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ENV"].BETTER_AUTH_TELEMETRY_ENDPOINT;
    if (!telemetryEndpoint && !context?.customTrack) return {
        publish: noop
    };
    const track = async (event)=>{
        if (context?.customTrack) await context.customTrack(event).catch(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error);
        else if (telemetryEndpoint) if (debugEnabled) __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].info("telemetry event", JSON.stringify(event, null, 2));
        else await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(telemetryEndpoint, {
            method: "POST",
            body: event
        }).catch(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error);
    };
    const isEnabled = async ()=>{
        const telemetryEnabled = options.telemetry?.enabled !== void 0 ? options.telemetry.enabled : false;
        return ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBooleanEnvVar"])("BETTER_AUTH_TELEMETRY", false) || telemetryEnabled) && (context?.skipTestCheck || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTest"])());
    };
    const enabled = await isEnabled();
    let anonymousId;
    if (enabled) {
        anonymousId = await getProjectId(typeof options.baseURL === "string" ? options.baseURL : void 0);
        track({
            type: "init",
            payload: {
                config: await getTelemetryAuthConfig(options, context),
                runtime: detectRuntime(),
                database: await detectDatabaseNode(),
                framework: await detectFrameworkNode(),
                environment: detectEnvironment(),
                systemInfo: await detectSystemInfo(),
                packageManager: detectPackageManager()
            },
            anonymousId
        });
    }
    return {
        publish: async (event)=>{
            if (!enabled) return;
            if (!anonymousId) anonymousId = await getProjectId(typeof options.baseURL === "string" ? options.baseURL : void 0);
            await track({
                type: event.type,
                payload: event.payload,
                anonymousId
            });
        }
    };
}
;
}),
"[project]/apps/web/node_modules/better-call/dist/context.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createInternalContext",
    ()=>createInternalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$validator$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/validator.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$crypto$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/crypto.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$cookies$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/cookies.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
//#region src/context.ts
const createInternalContext = async (context, { options, path })=>{
    const headers = new Headers();
    let responseStatus = void 0;
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$validator$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runValidation"])(options, context);
    if (error) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ValidationError"](error.message, error.issues);
    const requestHeaders = "headers" in context ? context.headers instanceof Headers ? context.headers : new Headers(context.headers) : "request" in context && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isRequest"])(context.request) ? context.request.headers : null;
    const requestCookies = requestHeaders?.get("cookie");
    const parsedCookies = requestCookies ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$cookies$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCookies"])(requestCookies) : void 0;
    const internalContext = {
        ...context,
        body: data.body,
        query: data.query,
        path: context.path || path || "virtual:",
        context: "context" in context && context.context ? context.context : {},
        returned: void 0,
        headers: context?.headers,
        request: context?.request,
        params: "params" in context ? context.params : void 0,
        method: context.method ?? (Array.isArray(options.method) ? options.method[0] : options.method === "*" ? "GET" : options.method),
        setHeader: (key, value)=>{
            headers.set(key, value);
        },
        getHeader: (key)=>{
            if (!requestHeaders) return null;
            return requestHeaders.get(key);
        },
        getCookie: (key, prefix)=>{
            const finalKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$cookies$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieKey"])(key, prefix);
            if (!finalKey) return null;
            return parsedCookies?.get(finalKey) || null;
        },
        getSignedCookie: async (key, secret, prefix)=>{
            const finalKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$cookies$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieKey"])(key, prefix);
            if (!finalKey) return null;
            const value = parsedCookies?.get(finalKey);
            if (!value) return null;
            const signatureStartPos = value.lastIndexOf(".");
            if (signatureStartPos < 1) return null;
            const signedValue = value.substring(0, signatureStartPos);
            const signature = value.substring(signatureStartPos + 1);
            if (signature.length !== 44 || !signature.endsWith("=")) return null;
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$crypto$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifySignature"])(signature, signedValue, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$crypto$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCryptoKey"])(secret)) ? signedValue : false;
        },
        setCookie: (key, value, options)=>{
            const cookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$cookies$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeCookie"])(key, value, options);
            headers.append("set-cookie", cookie);
            return cookie;
        },
        setSignedCookie: async (key, value, secret, options)=>{
            const cookie = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$cookies$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeSignedCookie"])(key, value, secret, options);
            headers.append("set-cookie", cookie);
            return cookie;
        },
        redirect: (url)=>{
            headers.set("location", url);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"]("FOUND", void 0, headers);
        },
        error: (status, body, headers)=>{
            return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](status, body, headers);
        },
        setStatus: (status)=>{
            responseStatus = status;
        },
        json: (json, routerResponse)=>{
            if (!context.asResponse) return json;
            return {
                body: routerResponse?.body || json,
                routerResponse,
                _flag: "json"
            };
        },
        responseHeaders: headers,
        get responseStatus () {
            return responseStatus;
        }
    };
    for (const middleware of options.use || []){
        const response = await middleware({
            ...internalContext,
            returnHeaders: true,
            asResponse: false
        });
        if (response.response) Object.assign(internalContext.context, response.response);
        /**
		* Apply headers from the middleware to the endpoint headers
		*/ if (response.headers) response.headers.forEach((value, key)=>{
            internalContext.responseHeaders.set(key, value);
        });
    }
    return internalContext;
};
;
}),
"[project]/apps/web/node_modules/better-call/dist/cookies.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCookieKey",
    ()=>getCookieKey,
    "parseCookies",
    ()=>parseCookies,
    "serializeCookie",
    ()=>serializeCookie,
    "serializeSignedCookie",
    ()=>serializeSignedCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$crypto$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/crypto.mjs [app-rsc] (ecmascript)");
;
;
//#region src/cookies.ts
const getCookieKey = (key, prefix)=>{
    let finalKey = key;
    if (prefix) if (prefix === "secure") finalKey = "__Secure-" + key;
    else if (prefix === "host") finalKey = "__Host-" + key;
    else return;
    return finalKey;
};
/**
* Parse an HTTP Cookie header string and returning an object of all cookie
* name-value pairs.
*
* Inspired by https://github.com/unjs/cookie-es/blob/main/src/cookie/parse.ts
*
* @param str the string representing a `Cookie` header value
*/ function parseCookies(str) {
    if (typeof str !== "string") throw new TypeError("argument str must be a string");
    const cookies = /* @__PURE__ */ new Map();
    let index = 0;
    while(index < str.length){
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) break;
        let endIdx = str.indexOf(";", index);
        if (endIdx === -1) endIdx = str.length;
        else if (endIdx < eqIdx) {
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const key = str.slice(index, eqIdx).trim();
        if (!cookies.has(key)) {
            let val = str.slice(eqIdx + 1, endIdx).trim();
            if (val.codePointAt(0) === 34) val = val.slice(1, -1);
            cookies.set(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tryDecode"])(val));
        }
        index = endIdx + 1;
    }
    return cookies;
}
const _serialize = (key, value, opt = {})=>{
    let cookie;
    if (opt?.prefix === "secure") cookie = `${`__Secure-${key}`}=${value}`;
    else if (opt?.prefix === "host") cookie = `${`__Host-${key}`}=${value}`;
    else cookie = `${key}=${value}`;
    if (key.startsWith("__Secure-") && !opt.secure) opt.secure = true;
    if (key.startsWith("__Host-")) {
        if (!opt.secure) opt.secure = true;
        if (opt.path !== "/") opt.path = "/";
        if (opt.domain) opt.domain = void 0;
    }
    if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
        if (opt.maxAge > 3456e4) throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
        cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
    }
    if (opt.domain && opt.prefix !== "host") cookie += `; Domain=${opt.domain}`;
    if (opt.path) cookie += `; Path=${opt.path}`;
    if (opt.expires) {
        if (opt.expires.getTime() - Date.now() > 3456e7) throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
        cookie += `; Expires=${opt.expires.toUTCString()}`;
    }
    if (opt.httpOnly) cookie += "; HttpOnly";
    if (opt.secure) cookie += "; Secure";
    if (opt.sameSite) cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
    if (opt.partitioned) {
        if (!opt.secure) opt.secure = true;
        cookie += "; Partitioned";
    }
    return cookie;
};
const serializeCookie = (key, value, opt)=>{
    value = encodeURIComponent(value);
    return _serialize(key, value, opt);
};
const serializeSignedCookie = async (key, value, secret, opt)=>{
    value = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$crypto$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signCookieValue"])(value, secret);
    return _serialize(key, value, opt);
};
;
}),
"[project]/apps/web/node_modules/better-call/dist/crypto.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCryptoKey",
    ()=>getCryptoKey,
    "signCookieValue",
    ()=>signCookieValue,
    "verifySignature",
    ()=>verifySignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-rsc] (ecmascript)");
;
//#region src/crypto.ts
const algorithm = {
    name: "HMAC",
    hash: "SHA-256"
};
const getCryptoKey = async (secret)=>{
    const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWebcryptoSubtle"])().importKey("raw", secretBuf, algorithm, false, [
        "sign",
        "verify"
    ]);
};
const verifySignature = async (base64Signature, value, secret)=>{
    try {
        const signatureBinStr = atob(base64Signature);
        const signature = new Uint8Array(signatureBinStr.length);
        for(let i = 0, len = signatureBinStr.length; i < len; i++)signature[i] = signatureBinStr.charCodeAt(i);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWebcryptoSubtle"])().verify(algorithm, secret, signature, new TextEncoder().encode(value));
    } catch (e) {
        return false;
    }
};
const makeSignature = async (value, secret)=>{
    const key = await getCryptoKey(secret);
    const signature = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWebcryptoSubtle"])().sign(algorithm.name, key, new TextEncoder().encode(value));
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
};
const signCookieValue = async (value, secret)=>{
    const signature = await makeSignature(value, secret);
    value = `${value}.${signature}`;
    value = encodeURIComponent(value);
    return value;
};
;
}),
"[project]/apps/web/node_modules/better-call/dist/endpoint.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createEndpoint",
    ()=>createEndpoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$to$2d$response$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/to-response.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$context$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/context.mjs [app-rsc] (ecmascript)");
;
;
;
;
//#region src/endpoint.ts
function createEndpoint(pathOrOptions, handlerOrOptions, handlerOrNever) {
    const path = typeof pathOrOptions === "string" ? pathOrOptions : void 0;
    const options = typeof handlerOrOptions === "object" ? handlerOrOptions : pathOrOptions;
    const handler = typeof handlerOrOptions === "function" ? handlerOrOptions : handlerOrNever;
    if ((options.method === "GET" || options.method === "HEAD") && options.body) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BetterCallError"]("Body is not allowed with GET or HEAD methods");
    if (path && /\/{2,}/.test(path)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BetterCallError"]("Path cannot contain consecutive slashes");
    const internalHandler = async (...inputCtx)=>{
        const context = inputCtx[0] || {};
        const { data: internalContext, error: validationError } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tryCatch"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$context$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createInternalContext"])(context, {
            options,
            path
        }));
        if (validationError) {
            if (!(validationError instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ValidationError"])) throw validationError;
            if (options.onValidationError) await options.onValidationError({
                message: validationError.message,
                issues: validationError.issues
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](400, {
                message: validationError.message,
                code: "VALIDATION_ERROR"
            });
        }
        const response = await handler(internalContext).catch(async (e)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAPIError"])(e)) {
                const onAPIError = options.onAPIError;
                if (onAPIError) await onAPIError(e);
                if (context.asResponse) return e;
            }
            throw e;
        });
        const headers = internalContext.responseHeaders;
        const status = internalContext.responseStatus;
        return context.asResponse ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$to$2d$response$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toResponse"])(response, {
            headers,
            status
        }) : context.returnHeaders ? context.returnStatus ? {
            headers,
            response,
            status
        } : {
            headers,
            response
        } : context.returnStatus ? {
            response,
            status
        } : response;
    };
    internalHandler.options = options;
    internalHandler.path = path;
    return internalHandler;
}
createEndpoint.create = (opts)=>{
    return (path, options, handler)=>{
        return createEndpoint(path, {
            ...options,
            use: [
                ...options?.use || [],
                ...opts?.use || []
            ]
        }, handler);
    };
};
;
}),
"[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIError",
    ()=>APIError,
    "BetterCallError",
    ()=>BetterCallError,
    "ValidationError",
    ()=>ValidationError,
    "hideInternalStackFrames",
    ()=>hideInternalStackFrames,
    "kAPIErrorHeaderSymbol",
    ()=>kAPIErrorHeaderSymbol,
    "makeErrorForHideStackFrame",
    ()=>makeErrorForHideStackFrame,
    "statusCodes",
    ()=>statusCodes
]);
//#region src/error.ts
function isErrorStackTraceLimitWritable() {
    const desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
    if (desc === void 0) return Object.isExtensible(Error);
    return Object.prototype.hasOwnProperty.call(desc, "writable") ? desc.writable : desc.set !== void 0;
}
/**
* Hide internal stack frames from the error stack trace.
*/ function hideInternalStackFrames(stack) {
    const lines = stack.split("\n    at ");
    if (lines.length <= 1) return stack;
    lines.splice(1, 1);
    return lines.join("\n    at ");
}
/**
* Creates a custom error class that hides stack frames.
*/ function makeErrorForHideStackFrame(Base, clazz) {
    class HideStackFramesError extends Base {
        #hiddenStack;
        constructor(...args){
            if (isErrorStackTraceLimitWritable()) {
                const limit = Error.stackTraceLimit;
                Error.stackTraceLimit = 0;
                super(...args);
                Error.stackTraceLimit = limit;
            } else super(...args);
            const stack = /* @__PURE__ */ new Error().stack;
            if (stack) this.#hiddenStack = hideInternalStackFrames(stack.replace(/^Error/, this.name));
        }
        get errorStack() {
            return this.#hiddenStack;
        }
    }
    Object.defineProperty(HideStackFramesError.prototype, "constructor", {
        get () {
            return clazz;
        },
        enumerable: false,
        configurable: true
    });
    return HideStackFramesError;
}
const statusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    "I'M_A_TEAPOT": 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511
};
var InternalAPIError = class extends Error {
    constructor(status = "INTERNAL_SERVER_ERROR", body = void 0, headers = {}, statusCode = typeof status === "number" ? status : statusCodes[status]){
        super(body?.message, body?.cause ? {
            cause: body.cause
        } : void 0);
        this.status = status;
        this.body = body;
        this.headers = headers;
        this.statusCode = statusCode;
        this.name = "APIError";
        this.status = status;
        this.headers = headers;
        this.statusCode = statusCode;
        this.body = body;
    }
};
var ValidationError = class extends InternalAPIError {
    constructor(message, issues){
        super(400, {
            message,
            code: "VALIDATION_ERROR"
        });
        this.message = message;
        this.issues = issues;
        this.issues = issues;
    }
};
var BetterCallError = class extends Error {
    constructor(message){
        super(message);
        this.name = "BetterCallError";
    }
};
const kAPIErrorHeaderSymbol = Symbol.for("better-call:api-error-headers");
const APIError = makeErrorForHideStackFrame(InternalAPIError, Error);
;
}),
"[project]/apps/web/node_modules/better-call/dist/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$to$2d$response$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/to-response.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$cookies$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/cookies.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$context$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/context.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$endpoint$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/endpoint.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/middleware.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$openapi$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/openapi.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$router$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/router.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/apps/web/node_modules/better-call/dist/middleware.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMiddleware",
    ()=>createMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$context$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/context.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$endpoint$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/endpoint.mjs [app-rsc] (ecmascript)");
;
;
;
;
//#region src/middleware.ts
function createMiddleware(optionsOrHandler, handler) {
    const internalHandler = async (inputCtx)=>{
        const context = inputCtx;
        const _handler = typeof optionsOrHandler === "function" ? optionsOrHandler : handler;
        const internalContext = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$context$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createInternalContext"])(context, {
            options: typeof optionsOrHandler === "function" ? {} : optionsOrHandler,
            path: "/"
        });
        if (!_handler) throw new Error("handler must be defined");
        try {
            const response = await _handler(internalContext);
            const headers = internalContext.responseHeaders;
            return context.returnHeaders ? {
                headers,
                response
            } : response;
        } catch (e) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAPIError"])(e)) Object.defineProperty(e, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["kAPIErrorHeaderSymbol"], {
                enumerable: false,
                configurable: true,
                get () {
                    return internalContext.responseHeaders;
                }
            });
            throw e;
        }
    };
    internalHandler.options = typeof optionsOrHandler === "function" ? {} : optionsOrHandler;
    return internalHandler;
}
createMiddleware.create = (opts)=>{
    function fn(optionsOrHandler, handler) {
        if (typeof optionsOrHandler === "function") return createMiddleware({
            use: opts?.use
        }, optionsOrHandler);
        if (!handler) throw new Error("Middleware handler is required");
        return createMiddleware({
            ...optionsOrHandler,
            method: "*",
            use: [
                ...opts?.use || [],
                ...optionsOrHandler.use || []
            ]
        }, handler);
    }
    return fn;
};
;
}),
"[project]/apps/web/node_modules/better-call/dist/openapi.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generator",
    ()=>generator,
    "getHTML",
    ()=>getHTML
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/zod/v4/classic/schemas.js [app-rsc] (ecmascript)");
;
//#region src/openapi.ts
const paths = {};
function getTypeFromZodType(zodType) {
    switch(zodType.constructor.name){
        case "ZodString":
            return "string";
        case "ZodNumber":
            return "number";
        case "ZodBoolean":
            return "boolean";
        case "ZodObject":
            return "object";
        case "ZodArray":
            return "array";
        default:
            return "string";
    }
}
function getParameters(options) {
    const parameters = [];
    if (options.metadata?.openapi?.parameters) {
        parameters.push(...options.metadata.openapi.parameters);
        return parameters;
    }
    if (options.query instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodObject"]) Object.entries(options.query.shape).forEach(([key, value])=>{
        if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodObject"]) parameters.push({
            name: key,
            in: "query",
            schema: {
                type: getTypeFromZodType(value),
                ..."minLength" in value && value.minLength ? {
                    minLength: value.minLength
                } : {},
                description: value.description
            }
        });
    });
    return parameters;
}
function getRequestBody(options) {
    if (options.metadata?.openapi?.requestBody) return options.metadata.openapi.requestBody;
    if (!options.body) return void 0;
    if (options.body instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodObject"] || options.body instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodOptional"]) {
        const shape = options.body.shape;
        if (!shape) return void 0;
        const properties = {};
        const required = [];
        Object.entries(shape).forEach(([key, value])=>{
            if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodObject"]) {
                properties[key] = {
                    type: getTypeFromZodType(value),
                    description: value.description
                };
                if (!(value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodOptional"])) required.push(key);
            }
        });
        return {
            required: options.body instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodOptional"] ? false : options.body ? true : false,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties,
                        required
                    }
                }
            }
        };
    }
}
function getResponse(responses) {
    return {
        "400": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        },
                        required: [
                            "message"
                        ]
                    }
                }
            },
            description: "Bad Request. Usually due to missing parameters, or invalid parameters."
        },
        "401": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        },
                        required: [
                            "message"
                        ]
                    }
                }
            },
            description: "Unauthorized. Due to missing or invalid authentication."
        },
        "403": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Forbidden. You do not have permission to access this resource or to perform this action."
        },
        "404": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Not Found. The requested resource was not found."
        },
        "429": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Too Many Requests. You have exceeded the rate limit. Try again later."
        },
        "500": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Internal Server Error. This is a problem with the server that you cannot fix."
        },
        ...responses
    };
}
async function generator(endpoints, config) {
    const components = {
        schemas: {}
    };
    Object.entries(endpoints).forEach(([_, value])=>{
        const options = value.options;
        if (!value.path || options.metadata?.SERVER_ONLY) return;
        if (options.method === "GET") paths[value.path] = {
            get: {
                tags: [
                    "Default",
                    ...options.metadata?.openapi?.tags || []
                ],
                description: options.metadata?.openapi?.description,
                operationId: options.metadata?.openapi?.operationId,
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: getParameters(options),
                responses: getResponse(options.metadata?.openapi?.responses)
            }
        };
        if (options.method === "POST") {
            const body = getRequestBody(options);
            paths[value.path] = {
                post: {
                    tags: [
                        "Default",
                        ...options.metadata?.openapi?.tags || []
                    ],
                    description: options.metadata?.openapi?.description,
                    operationId: options.metadata?.openapi?.operationId,
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: getParameters(options),
                    ...body ? {
                        requestBody: body
                    } : {
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {}
                                    }
                                }
                            }
                        }
                    },
                    responses: getResponse(options.metadata?.openapi?.responses)
                }
            };
        }
    });
    return {
        openapi: "3.1.1",
        info: {
            title: "Better Auth",
            description: "API Reference for your Better Auth Instance",
            version: "1.1.0"
        },
        components,
        security: [
            {
                apiKeyCookie: []
            }
        ],
        servers: [
            {
                url: config?.url
            }
        ],
        tags: [
            {
                name: "Default",
                description: "Default endpoints that are included with Better Auth by default. These endpoints are not part of any plugin."
            }
        ],
        paths
    };
}
const getHTML = (apiReference, config)=>`<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json">
    ${JSON.stringify(apiReference)}
    <\/script>
	 <script>
      var configuration = {
	  	favicon: ${config?.logo ? `data:image/svg+xml;utf8,${encodeURIComponent(config.logo)}` : void 0} ,
	   	theme: ${config?.theme || "saturn"},
        metaData: {
			title: ${config?.title || "Open API Reference"},
			description: ${config?.description || "Better Call Open API"},
		}
      }
      document.getElementById('api-reference').dataset.configuration =
        JSON.stringify(configuration)
    <\/script>
	  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"><\/script>
  </body>
</html>`;
;
}),
"[project]/apps/web/node_modules/better-call/dist/router.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRouter",
    ()=>createRouter$1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$to$2d$response$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/to-response.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$endpoint$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/endpoint.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$openapi$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/openapi.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rou3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/rou3/dist/index.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
//#region src/router.ts
const createRouter$1 = (endpoints, config)=>{
    if (!config?.openapi?.disabled) {
        const openapi = {
            path: "/api/reference",
            ...config?.openapi
        };
        endpoints["openapi"] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$endpoint$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEndpoint"])(openapi.path, {
            method: "GET"
        }, async (c)=>{
            const schema = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$openapi$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generator"])(endpoints);
            return new Response((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$openapi$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHTML"])(schema, openapi.scalar), {
                headers: {
                    "Content-Type": "text/html"
                }
            });
        });
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rou3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRouter"])();
    const middlewareRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rou3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRouter"])();
    for (const endpoint of Object.values(endpoints)){
        if (!endpoint.options || !endpoint.path) continue;
        if (endpoint.options?.metadata?.SERVER_ONLY) continue;
        const methods = Array.isArray(endpoint.options?.method) ? endpoint.options.method : [
            endpoint.options?.method
        ];
        for (const method of methods)(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rou3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRoute"])(router, method, endpoint.path, endpoint);
    }
    if (config?.routerMiddleware?.length) for (const { path, middleware } of config.routerMiddleware)(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rou3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRoute"])(middlewareRouter, "*", path, middleware);
    const basePath = config?.basePath && config.basePath !== "/" ? config.basePath.replace(/\/+$/, "") : "";
    const processRequest = async (request)=>{
        const url = new URL(request.url);
        const pathname = url.pathname;
        let path;
        if (basePath) {
            if (!pathname.startsWith(`${basePath}/`)) return new Response(null, {
                status: 404,
                statusText: "Not Found"
            });
            path = pathname.slice(basePath.length);
        } else path = pathname;
        if (path.length === 0 || /\/{2,}/.test(path)) return new Response(null, {
            status: 404,
            statusText: "Not Found"
        });
        const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rou3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findRoute"])(router, request.method, path);
        if (path.endsWith("/") !== route?.data?.path?.endsWith("/") && !config?.skipTrailingSlashes) return new Response(null, {
            status: 404,
            statusText: "Not Found"
        });
        if (!route?.data) return new Response(null, {
            status: 404,
            statusText: "Not Found"
        });
        const query = {};
        url.searchParams.forEach((value, key)=>{
            if (key in query) if (Array.isArray(query[key])) query[key].push(value);
            else query[key] = [
                query[key],
                value
            ];
            else query[key] = value;
        });
        const handler = route.data;
        try {
            const allowedMediaTypes = handler.options.metadata?.allowedMediaTypes || config?.allowedMediaTypes;
            const context = {
                path,
                method: request.method,
                headers: request.headers,
                params: route.params ? JSON.parse(JSON.stringify(route.params)) : {},
                request,
                body: handler.options.disableBody ? void 0 : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBody"])(handler.options.cloneRequest ? request.clone() : request, allowedMediaTypes),
                query,
                _flag: "router",
                asResponse: true,
                context: config?.routerContext
            };
            const middlewareRoutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rou3$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findAllRoutes"])(middlewareRouter, "*", path);
            if (middlewareRoutes?.length) for (const { data: middleware, params } of middlewareRoutes){
                const res = await middleware({
                    ...context,
                    params,
                    asResponse: false
                });
                if (res instanceof Response) return res;
            }
            return await handler(context);
        } catch (error) {
            if (config?.onError) try {
                const errorResponse = await config.onError(error, request);
                if (errorResponse instanceof Response) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$to$2d$response$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toResponse"])(errorResponse);
            } catch (error) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAPIError"])(error)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$to$2d$response$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toResponse"])(error);
                throw error;
            }
            if (config?.throwError) throw error;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAPIError"])(error)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$to$2d$response$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toResponse"])(error);
            console.error(`# SERVER_ERROR: `, error);
            return new Response(null, {
                status: 500,
                statusText: "Internal Server Error"
            });
        }
    };
    return {
        handler: async (request)=>{
            const onReq = await config?.onRequest?.(request);
            if (onReq instanceof Response) return onReq;
            const req = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isRequest"])(onReq) ? onReq : request;
            const res = await processRequest(req);
            const onRes = await config?.onResponse?.(res, req);
            if (onRes instanceof Response) return onRes;
            return res;
        },
        endpoints
    };
};
;
}),
"[project]/apps/web/node_modules/better-call/dist/to-response.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toResponse",
    ()=>toResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/utils.mjs [app-rsc] (ecmascript)");
;
;
//#region src/to-response.ts
function isJSONSerializable(value) {
    if (value === void 0) return false;
    const t = typeof value;
    if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
    if (t !== "object") return false;
    if (Array.isArray(value)) return true;
    if (value.buffer) return false;
    return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function safeStringify(obj) {
    const parents = /* @__PURE__ */ new WeakMap();
    const ids = /* @__PURE__ */ new WeakMap();
    let id = 0;
    const isAncestor = (value, holder)=>{
        let curr = holder;
        while(curr){
            if (curr === value) return true;
            curr = parents.get(curr);
        }
        return false;
    };
    return JSON.stringify(obj, function(_key, value) {
        if (typeof value === "bigint") return value.toString();
        if (typeof value === "object" && value !== null) {
            if (isAncestor(value, this)) return `[Circular ref-${ids.get(value)}]`;
            parents.set(value, this);
            if (!ids.has(value)) ids.set(value, id++);
        }
        return value;
    });
}
function isJSONResponse(value) {
    if (!value || typeof value !== "object") return false;
    return "_flag" in value && value._flag === "json";
}
/**
* Headers that MUST be stripped when building an HTTP response from
* arbitrary header input. These are request-only, hop-by-hop, or
* transport-managed headers that cause protocol violations when present
* on responses (e.g. Content-Length mismatch → net::ERR_CONTENT_LENGTH_MISMATCH).
*
* Sources:
*   - RFC 9110 §10.1   (Request Context Fields)
*   - RFC 9110 §7.6.1  (Connection / hop-by-hop)
*   - RFC 9110 §11.6-7 (Authentication credentials)
*   - RFC 9110 §12.5   (Content negotiation)
*   - RFC 9110 §13.1   (Conditional request headers)
*   - RFC 9110 §14.2   (Range requests)
*   - RFC 6265 §5.4    (Cookie)
*   - RFC 6454         (Origin)
*/ const REQUEST_ONLY_HEADERS = new Set([
    "host",
    "user-agent",
    "referer",
    "from",
    "expect",
    "authorization",
    "proxy-authorization",
    "cookie",
    "origin",
    "accept-charset",
    "accept-encoding",
    "accept-language",
    "if-match",
    "if-none-match",
    "if-modified-since",
    "if-unmodified-since",
    "if-range",
    "range",
    "max-forwards",
    "connection",
    "keep-alive",
    "transfer-encoding",
    "te",
    "upgrade",
    "trailer",
    "proxy-connection",
    "content-length"
]);
function stripRequestOnlyHeaders(headers) {
    for (const name of REQUEST_ONLY_HEADERS)headers.delete(name);
}
/**
* Copy headers from `source` into `target`. `Set-Cookie` is appended (one
* header per cookie) because RFC 9110 §5.3 notes it cannot be combined
* into a single comma-separated value; other headers are set (replace).
*/ function copyHeaders(target, source) {
    if (!source) return;
    for (const [key, value] of new Headers(source).entries())if (key.toLowerCase() === "set-cookie") target.append(key, value);
    else target.set(key, value);
}
function toResponse(data, init) {
    if (data instanceof Response) {
        if (init?.headers) {
            const safeHeaders = new Headers(init.headers);
            stripRequestOnlyHeaders(safeHeaders);
            copyHeaders(data.headers, safeHeaders);
        }
        return data;
    }
    if (isJSONResponse(data)) {
        const body = data.body;
        const routerResponse = data.routerResponse;
        if (routerResponse instanceof Response) return routerResponse;
        const headers = new Headers();
        copyHeaders(headers, routerResponse?.headers);
        copyHeaders(headers, data.headers);
        if (init?.headers) {
            const safeHeaders = new Headers(init.headers);
            stripRequestOnlyHeaders(safeHeaders);
            copyHeaders(headers, safeHeaders);
        }
        headers.set("Content-Type", "application/json");
        return new Response(JSON.stringify(body), {
            ...routerResponse,
            headers,
            status: data.status ?? init?.status ?? routerResponse?.status,
            statusText: init?.statusText ?? routerResponse?.statusText
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAPIError"])(data)) return toResponse(data.body, {
        status: init?.status ?? data.statusCode,
        statusText: data.status.toString(),
        headers: init?.headers || data.headers
    });
    let body = data;
    const headers = new Headers(init?.headers);
    stripRequestOnlyHeaders(headers);
    if (!data) {
        if (data === null) body = JSON.stringify(null);
        headers.set("content-type", "application/json");
    } else if (typeof data === "string") {
        body = data;
        headers.set("Content-Type", "text/plain");
    } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        body = data;
        headers.set("Content-Type", "application/octet-stream");
    } else if (data instanceof Blob) {
        body = data;
        headers.set("Content-Type", data.type || "application/octet-stream");
    } else if (data instanceof FormData) body = data;
    else if (data instanceof URLSearchParams) {
        body = data;
        headers.set("Content-Type", "application/x-www-form-urlencoded");
    } else if (data instanceof ReadableStream) {
        body = data;
        headers.set("Content-Type", "application/octet-stream");
    } else if (isJSONSerializable(data)) {
        body = safeStringify(data);
        headers.set("Content-Type", "application/json");
    }
    return new Response(body, {
        ...init,
        headers
    });
}
;
}),
"[project]/apps/web/node_modules/better-call/dist/utils.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBody",
    ()=>getBody,
    "isAPIError",
    ()=>isAPIError,
    "isRequest",
    ()=>isRequest,
    "tryCatch",
    ()=>tryCatch,
    "tryDecode",
    ()=>tryDecode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
;
//#region src/utils.ts
const jsonContentTypeRegex = /^application\/([a-z0-9.+-]*\+)?json/i;
async function getBody(request, allowedMediaTypes) {
    const contentType = request.headers.get("content-type") || "";
    const normalizedContentType = contentType.toLowerCase();
    if (!request.body) return;
    if (allowedMediaTypes && allowedMediaTypes.length > 0) {
        if (!allowedMediaTypes.some((allowed)=>{
            const normalizedContentTypeBase = normalizedContentType.split(";")[0].trim();
            const normalizedAllowed = allowed.toLowerCase().trim();
            return normalizedContentTypeBase === normalizedAllowed || normalizedContentTypeBase.includes(normalizedAllowed);
        })) {
            if (!normalizedContentType) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](415, {
                message: `Content-Type is required. Allowed types: ${allowedMediaTypes.join(", ")}`,
                code: "UNSUPPORTED_MEDIA_TYPE"
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](415, {
                message: `Content-Type "${contentType}" is not allowed. Allowed types: ${allowedMediaTypes.join(", ")}`,
                code: "UNSUPPORTED_MEDIA_TYPE"
            });
        }
    }
    if (jsonContentTypeRegex.test(normalizedContentType)) try {
        return await request.json();
    } catch (e) {
        if (e instanceof SyntaxError) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](400, {
            message: "Invalid JSON in request body",
            code: "BAD_REQUEST"
        });
        throw e;
    }
    if (normalizedContentType.includes("application/x-www-form-urlencoded")) {
        const formData = await request.formData();
        const result = {};
        formData.forEach((value, key)=>{
            result[key] = value.toString();
        });
        return result;
    }
    if (normalizedContentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        const result = {};
        formData.forEach((value, key)=>{
            result[key] = value;
        });
        return result;
    }
    if (normalizedContentType.includes("text/plain")) return await request.text();
    if (normalizedContentType.includes("application/octet-stream")) return await request.arrayBuffer();
    if (normalizedContentType.includes("application/pdf") || normalizedContentType.includes("image/") || normalizedContentType.includes("video/")) return await request.blob();
    if (normalizedContentType.includes("application/stream") || request.body instanceof ReadableStream) return request.body;
    return await request.text();
}
function isAPIError(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"] || error?.name === "APIError";
}
function tryDecode(str) {
    try {
        return str.includes("%") ? decodeURIComponent(str) : str;
    } catch  {
        return str;
    }
}
async function tryCatch(promise) {
    try {
        return {
            data: await promise,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error
        };
    }
}
/**
* Check if an object is a `Request`
* - `instanceof`: works for native Request instances
* - `toString`: handles where instanceof check fails but the object is still a valid Request
*/ function isRequest(obj) {
    return obj instanceof Request || Object.prototype.toString.call(obj) === "[object Request]";
}
;
}),
"[project]/apps/web/node_modules/better-call/dist/validator.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runValidation",
    ()=>runValidation
]);
//#region src/validator.ts
/**
* Runs validation on body and query
* @returns error and data object
*/ async function runValidation(options, context = {}) {
    let request = {
        body: context.body,
        query: context.query
    };
    if (options.body) {
        const result = await options.body["~standard"].validate(context.body);
        if (result.issues) return {
            data: null,
            error: fromError(result.issues, "body")
        };
        request.body = result.value;
    }
    if (options.query) {
        const result = await options.query["~standard"].validate(context.query);
        if (result.issues) return {
            data: null,
            error: fromError(result.issues, "query")
        };
        request.query = result.value;
    }
    if (options.requireHeaders && !context.headers) return {
        data: null,
        error: {
            message: "Headers is required",
            issues: []
        }
    };
    if (options.requireRequest && !context.request) return {
        data: null,
        error: {
            message: "Request is required",
            issues: []
        }
    };
    return {
        data: request,
        error: null
    };
}
function fromError(error, validating) {
    return {
        message: error.map((e)=>{
            return `[${e.path?.length ? `${validating}.` + e.path.map((x)=>typeof x === "object" ? x.key : x).join(".") : validating}] ${e.message}`;
        }).join("; "),
        issues: error
    };
}
;
}),
"[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64",
    ()=>base64,
    "base64Url",
    ()=>base64Url
]);
function getAlphabet(urlSafe) {
    return urlSafe ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
}
function base64Encode(data, alphabet, padding) {
    let result = "";
    let buffer = 0;
    let shift = 0;
    for (const byte of data){
        buffer = buffer << 8 | byte;
        shift += 8;
        while(shift >= 6){
            shift -= 6;
            result += alphabet[buffer >> shift & 63];
        }
    }
    if (shift > 0) {
        result += alphabet[buffer << 6 - shift & 63];
    }
    if (padding) {
        const padCount = (4 - result.length % 4) % 4;
        result += "=".repeat(padCount);
    }
    return result;
}
function base64Decode(data, alphabet) {
    const decodeMap = /* @__PURE__ */ new Map();
    for(let i = 0; i < alphabet.length; i++){
        decodeMap.set(alphabet[i], i);
    }
    const result = [];
    let buffer = 0;
    let bitsCollected = 0;
    for (const char of data){
        if (char === "=") break;
        const value = decodeMap.get(char);
        if (value === void 0) {
            throw new Error(`Invalid Base64 character: ${char}`);
        }
        buffer = buffer << 6 | value;
        bitsCollected += 6;
        if (bitsCollected >= 8) {
            bitsCollected -= 8;
            result.push(buffer >> bitsCollected & 255);
        }
    }
    return Uint8Array.from(result);
}
const base64 = {
    encode (data, options = {}) {
        const alphabet = getAlphabet(false);
        const buffer = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
        return base64Encode(buffer, alphabet, options.padding ?? true);
    },
    decode (data) {
        if (typeof data !== "string") {
            data = new TextDecoder().decode(data);
        }
        const urlSafe = data.includes("-") || data.includes("_");
        const alphabet = getAlphabet(urlSafe);
        return base64Decode(data, alphabet);
    }
};
const base64Url = {
    encode (data, options = {}) {
        const alphabet = getAlphabet(true);
        const buffer = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
        return base64Encode(buffer, alphabet, options.padding ?? true);
    },
    decode (data) {
        const urlSafe = data.includes("-") || data.includes("_");
        const alphabet = getAlphabet(urlSafe);
        return base64Decode(data, alphabet);
    }
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "binary",
    ()=>binary
]);
const decoders = /* @__PURE__ */ new Map();
const encoder = new TextEncoder();
const binary = {
    decode: (data, encoding = "utf-8")=>{
        if (!decoders.has(encoding)) {
            decoders.set(encoding, new TextDecoder(encoding));
        }
        const decoder = decoders.get(encoding);
        return decoder.decode(data);
    },
    encode: encoder.encode
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createHash",
    ()=>createHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-rsc] (ecmascript)");
;
;
function createHash(algorithm, encoding) {
    return {
        digest: async (input)=>{
            const encoder = new TextEncoder();
            const data = typeof input === "string" ? encoder.encode(input) : input;
            const hashBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWebcryptoSubtle"])().digest(algorithm, data);
            if (encoding === "hex") {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map((b)=>b.toString(16).padStart(2, "0")).join("");
                return hashHex;
            }
            if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
                if (encoding.includes("url")) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64Url"].encode(hashBuffer, {
                        padding: encoding !== "base64urlnopad"
                    });
                }
                const hashBase64 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(hashBuffer);
                return hashBase64;
            }
            return hashBuffer;
        }
    };
}
;
}),
"[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hex",
    ()=>hex
]);
const hexadecimal = "0123456789abcdef";
const hex = {
    encode: (data)=>{
        if (typeof data === "string") {
            data = new TextEncoder().encode(data);
        }
        if (data.byteLength === 0) {
            return "";
        }
        const buffer = new Uint8Array(data);
        let result = "";
        for (const byte of buffer){
            result += byte.toString(16).padStart(2, "0");
        }
        return result;
    },
    decode: (data)=>{
        if (!data) {
            return "";
        }
        if (typeof data === "string") {
            if (data.length % 2 !== 0) {
                throw new Error("Invalid hexadecimal string");
            }
            if (!new RegExp(`^[${hexadecimal}]+$`).test(data)) {
                throw new Error("Invalid hexadecimal string");
            }
            const result = new Uint8Array(data.length / 2);
            for(let i = 0; i < data.length; i += 2){
                result[i / 2] = parseInt(data.slice(i, i + 2), 16);
            }
            return new TextDecoder().decode(result);
        }
        return new TextDecoder().decode(data);
    }
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createHMAC",
    ()=>createHMAC
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-rsc] (ecmascript)");
;
;
;
const createHMAC = (algorithm = "SHA-256", encoding = "none")=>{
    const hmac = {
        importKey: async (key, keyUsage)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWebcryptoSubtle"])().importKey("raw", typeof key === "string" ? new TextEncoder().encode(key) : key, {
                name: "HMAC",
                hash: {
                    name: algorithm
                }
            }, false, [
                keyUsage
            ]);
        },
        sign: async (hmacKey, data)=>{
            if (typeof hmacKey === "string") {
                hmacKey = await hmac.importKey(hmacKey, "sign");
            }
            const signature = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWebcryptoSubtle"])().sign("HMAC", hmacKey, typeof data === "string" ? new TextEncoder().encode(data) : data);
            if (encoding === "hex") {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hex"].encode(signature);
            }
            if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64Url"].encode(signature, {
                    padding: encoding !== "base64urlnopad"
                });
            }
            return signature;
        },
        verify: async (hmacKey, data, signature)=>{
            if (typeof hmacKey === "string") {
                hmacKey = await hmac.importKey(hmacKey, "verify");
            }
            if (encoding === "hex") {
                signature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hex"].decode(signature);
            }
            if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
                signature = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].decode(signature);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWebcryptoSubtle"])().verify("HMAC", hmacKey, typeof signature === "string" ? new TextEncoder().encode(signature) : signature, typeof data === "string" ? new TextEncoder().encode(data) : data);
        }
    };
    return hmac;
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWebcryptoSubtle",
    ()=>getWebcryptoSubtle
]);
function getWebcryptoSubtle() {
    const cr = typeof globalThis !== "undefined" && globalThis.crypto;
    if (cr && typeof cr.subtle === "object" && cr.subtle != null) return cr.subtle;
    throw new Error("crypto.subtle must be defined");
}
;
}),
"[project]/node_modules/@better-auth/utils/dist/password.node.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
const config = {
    N: 16384,
    r: 16,
    p: 1,
    dkLen: 64
};
function generateKey(password, salt) {
    return new Promise((resolve, reject)=>{
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["scrypt"])(password.normalize("NFKC"), salt, config.dkLen, {
            N: config.N,
            r: config.r,
            p: config.p,
            maxmem: 128 * config.N * config.r * 2
        }, (err, key)=>{
            if (err) reject(err);
            else resolve(key);
        });
    });
}
async function hashPassword(password) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(16).toString("hex");
    const key = await generateKey(password, salt);
    return `${salt}:${key.toString("hex")}`;
}
async function verifyPassword(hash, password) {
    const [salt, key] = hash.split(":");
    if (!salt || !key) {
        throw new Error("Invalid password hash");
    }
    const targetKey = await generateKey(password, salt);
    return targetKey.toString("hex") === key;
}
;
}),
"[project]/node_modules/@better-auth/utils/dist/random.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRandomStringGenerator",
    ()=>createRandomStringGenerator
]);
function expandAlphabet(alphabet) {
    switch(alphabet){
        case "a-z":
            return "abcdefghijklmnopqrstuvwxyz";
        case "A-Z":
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        case "0-9":
            return "0123456789";
        case "-_":
            return "-_";
        default:
            throw new Error(`Unsupported alphabet: ${alphabet}`);
    }
}
function createRandomStringGenerator(...baseAlphabets) {
    const baseCharSet = baseAlphabets.map(expandAlphabet).join("");
    if (baseCharSet.length === 0) {
        throw new Error("No valid characters provided for random string generation.");
    }
    const baseCharSetLength = baseCharSet.length;
    return (length, ...alphabets)=>{
        if (length <= 0) {
            throw new Error("Length must be a positive integer.");
        }
        let charSet = baseCharSet;
        let charSetLength = baseCharSetLength;
        if (alphabets.length > 0) {
            charSet = alphabets.map(expandAlphabet).join("");
            charSetLength = charSet.length;
        }
        const maxValid = Math.floor(256 / charSetLength) * charSetLength;
        const buf = new Uint8Array(length * 2);
        const bufLength = buf.length;
        let result = "";
        let bufIndex = bufLength;
        let rand;
        while(result.length < length){
            if (bufIndex >= bufLength) {
                crypto.getRandomValues(buf);
                bufIndex = 0;
            }
            rand = buf[bufIndex++];
            if (rand < maxValid) {
                result += charSet[rand % charSetLength];
            }
        }
        return result;
    };
}
;
}),
"[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BetterFetchError",
    ()=>BetterFetchError,
    "ValidationError",
    ()=>ValidationError,
    "applySchemaPlugin",
    ()=>applySchemaPlugin,
    "betterFetch",
    ()=>betterFetch,
    "bodyParser",
    ()=>bodyParser,
    "createFetch",
    ()=>createFetch,
    "createRetryStrategy",
    ()=>createRetryStrategy,
    "createSchema",
    ()=>createSchema,
    "detectContentType",
    ()=>detectContentType,
    "detectResponseType",
    ()=>detectResponseType,
    "getBody",
    ()=>getBody,
    "getFetch",
    ()=>getFetch,
    "getHeaders",
    ()=>getHeaders,
    "getMethod",
    ()=>getMethod,
    "getTimeout",
    ()=>getTimeout,
    "getURL",
    ()=>getURL,
    "initializePlugins",
    ()=>initializePlugins,
    "isFunction",
    ()=>isFunction,
    "isJSONParsable",
    ()=>isJSONParsable,
    "isJSONSerializable",
    ()=>isJSONSerializable,
    "isPayloadMethod",
    ()=>isPayloadMethod,
    "isRouteMethod",
    ()=>isRouteMethod,
    "jsonParse",
    ()=>jsonParse,
    "mergeHeaders",
    ()=>mergeHeaders,
    "methods",
    ()=>methods,
    "parseStandardSchema",
    ()=>parseStandardSchema
]);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
// src/error.ts
var BetterFetchError = class extends Error {
    constructor(status, statusText, error){
        super(statusText || status.toString(), {
            cause: error
        });
        this.status = status;
        this.statusText = statusText;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
};
// src/plugins.ts
var initializePlugins = async (url, options)=>{
    var _a, _b, _c, _d, _e, _f;
    let opts = options || {};
    const hooks = {
        onRequest: [
            options == null ? void 0 : options.onRequest
        ],
        onResponse: [
            options == null ? void 0 : options.onResponse
        ],
        onSuccess: [
            options == null ? void 0 : options.onSuccess
        ],
        onError: [
            options == null ? void 0 : options.onError
        ],
        onRetry: [
            options == null ? void 0 : options.onRetry
        ]
    };
    if (!options || !(options == null ? void 0 : options.plugins)) {
        return {
            url,
            options: opts,
            hooks
        };
    }
    for (const plugin of (options == null ? void 0 : options.plugins) || []){
        if (plugin.init) {
            const pluginRes = await ((_a = plugin.init) == null ? void 0 : _a.call(plugin, url.toString(), options));
            opts = pluginRes.options || opts;
            url = pluginRes.url;
        }
        hooks.onRequest.push((_b = plugin.hooks) == null ? void 0 : _b.onRequest);
        hooks.onResponse.push((_c = plugin.hooks) == null ? void 0 : _c.onResponse);
        hooks.onSuccess.push((_d = plugin.hooks) == null ? void 0 : _d.onSuccess);
        hooks.onError.push((_e = plugin.hooks) == null ? void 0 : _e.onError);
        hooks.onRetry.push((_f = plugin.hooks) == null ? void 0 : _f.onRetry);
    }
    return {
        url,
        options: opts,
        hooks
    };
};
// src/retry.ts
var LinearRetryStrategy = class {
    constructor(options){
        this.options = options;
    }
    shouldAttemptRetry(attempt, response) {
        if (this.options.shouldRetry) {
            return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
        }
        return Promise.resolve(attempt < this.options.attempts);
    }
    getDelay() {
        return this.options.delay;
    }
};
var ExponentialRetryStrategy = class {
    constructor(options){
        this.options = options;
    }
    shouldAttemptRetry(attempt, response) {
        if (this.options.shouldRetry) {
            return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
        }
        return Promise.resolve(attempt < this.options.attempts);
    }
    getDelay(attempt) {
        const delay = Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** attempt);
        return delay;
    }
};
function createRetryStrategy(options) {
    if (typeof options === "number") {
        return new LinearRetryStrategy({
            type: "linear",
            attempts: options,
            delay: 1e3
        });
    }
    switch(options.type){
        case "linear":
            return new LinearRetryStrategy(options);
        case "exponential":
            return new ExponentialRetryStrategy(options);
        default:
            throw new Error("Invalid retry strategy");
    }
}
// src/auth.ts
var getAuthHeader = async (options)=>{
    const headers = {};
    const getValue = async (value)=>typeof value === "function" ? await value() : value;
    if (options == null ? void 0 : options.auth) {
        if (options.auth.type === "Bearer") {
            const token = await getValue(options.auth.token);
            if (!token) {
                return headers;
            }
            headers["authorization"] = `Bearer ${token}`;
        } else if (options.auth.type === "Basic") {
            const [username, password] = await Promise.all([
                getValue(options.auth.username),
                getValue(options.auth.password)
            ]);
            if (!username || !password) {
                return headers;
            }
            headers["authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
        } else if (options.auth.type === "Custom") {
            const [prefix, value] = await Promise.all([
                getValue(options.auth.prefix),
                getValue(options.auth.value)
            ]);
            if (!value) {
                return headers;
            }
            headers["authorization"] = `${prefix != null ? prefix : ""} ${value}`;
        }
    }
    return headers;
};
// src/utils.ts
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(request) {
    const _contentType = request.headers.get("content-type");
    const textTypes = /* @__PURE__ */ new Set([
        "image/svg",
        "application/xml",
        "application/xhtml",
        "application/html"
    ]);
    if (!_contentType) {
        return "json";
    }
    const contentType = _contentType.split(";").shift() || "";
    if (JSON_RE.test(contentType)) {
        return "json";
    }
    if (textTypes.has(contentType) || contentType.startsWith("text/")) {
        return "text";
    }
    return "blob";
}
function isJSONParsable(value) {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
}
function isJSONSerializable(value) {
    if (value === void 0) {
        return false;
    }
    const t = typeof value;
    if (t === "string" || t === "number" || t === "boolean" || t === null) {
        return true;
    }
    if (t !== "object") {
        return false;
    }
    if (Array.isArray(value)) {
        return true;
    }
    if (value.buffer) {
        return false;
    }
    return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function jsonParse(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        return text;
    }
}
function isFunction(value) {
    return typeof value === "function";
}
function getFetch(options) {
    if (options == null ? void 0 : options.customFetchImpl) {
        return options.customFetchImpl;
    }
    if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) {
        return globalThis.fetch;
    }
    if (("TURBOPACK compile-time value", "undefined") !== "undefined" && isFunction(window.fetch)) //TURBOPACK unreachable
    ;
    throw new Error("No fetch implementation found");
}
function isPayloadMethod(method) {
    if (!method) {
        return false;
    }
    const payloadMethod = [
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];
    return payloadMethod.includes(method.toUpperCase());
}
function isRouteMethod(method) {
    const routeMethod = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];
    if (!method) {
        return false;
    }
    return routeMethod.includes(method.toUpperCase());
}
function mergeHeaders(...sources) {
    const merged = {};
    for (const source of sources){
        if (!source) {
            continue;
        }
        if (source instanceof Headers) {
            source.forEach((value, key)=>{
                merged[key] = value;
            });
        } else {
            const entries = Array.isArray(source) ? source : Object.entries(source);
            for (const [key, value] of entries){
                if (value !== null && value !== void 0) {
                    merged[key] = value;
                }
            }
        }
    }
    return merged;
}
async function getHeaders(opts) {
    const headers = new Headers(mergeHeaders(opts == null ? void 0 : opts.headers, await getAuthHeader(opts)));
    if (!headers.has("content-type")) {
        const contentType = detectContentType(opts == null ? void 0 : opts.body);
        if (contentType) {
            headers.set("content-type", contentType);
        }
    }
    return headers;
}
function getURL(url, options) {
    if (url.startsWith("@")) {
        const m = url.toString().split("@")[1].split("/")[0];
        if (methods.includes(m)) {
            url = url.replace(`@${m}/`, "/");
        }
    }
    let _url;
    try {
        if (url.startsWith("http")) {
            _url = url;
        } else {
            let baseURL = options == null ? void 0 : options.baseURL;
            if (baseURL && !(baseURL == null ? void 0 : baseURL.endsWith("/"))) {
                baseURL = baseURL + "/";
            }
            if (url.startsWith("/")) {
                _url = new URL(url.substring(1), baseURL);
            } else {
                _url = new URL(url, options == null ? void 0 : options.baseURL);
            }
        }
    } catch (e) {
        if (e instanceof TypeError) {
            if (!(options == null ? void 0 : options.baseURL)) {
                throw TypeError(`Invalid URL ${url}. Are you passing in a relative url but not setting the baseURL?`);
            }
            throw TypeError(`Invalid URL ${url}. Please validate that you are passing the correct input.`);
        }
        throw e;
    }
    if (options == null ? void 0 : options.params) {
        if (Array.isArray(options == null ? void 0 : options.params)) {
            const params = (options == null ? void 0 : options.params) ? Array.isArray(options.params) ? `/${options.params.join("/")}` : `/${Object.values(options.params).join("/")}` : "";
            _url = _url.toString().split("/:")[0];
            _url = `${_url.toString()}${params}`;
        } else {
            for (const [key, value] of Object.entries(options == null ? void 0 : options.params)){
                _url = _url.toString().replace(`:${key}`, String(value));
            }
        }
    }
    const __url = new URL(_url);
    const queryParams = options == null ? void 0 : options.query;
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)){
            __url.searchParams.append(key, String(value));
        }
    }
    return __url;
}
function detectContentType(body) {
    if (isJSONSerializable(body)) {
        return "application/json";
    }
    return null;
}
function getMediaType(headers) {
    const contentType = headers.get("content-type");
    return contentType ? contentType.split(";")[0].trim().toLowerCase() : null;
}
function getBody(options, headers) {
    const { body } = options;
    if (!body) {
        return null;
    }
    if (!isJSONSerializable(body)) {
        return body;
    }
    if (typeof body === "string") {
        return body;
    }
    if (getMediaType(headers) === "application/x-www-form-urlencoded") {
        return new URLSearchParams(body).toString();
    }
    return JSON.stringify(body);
}
function getMethod(url, options) {
    var _a;
    if (options == null ? void 0 : options.method) {
        return options.method.toUpperCase();
    }
    if (url.startsWith("@")) {
        const pMethod = (_a = url.split("@")[1]) == null ? void 0 : _a.split("/")[0];
        if (!methods.includes(pMethod)) {
            return (options == null ? void 0 : options.body) ? "POST" : "GET";
        }
        return pMethod.toUpperCase();
    }
    return (options == null ? void 0 : options.body) ? "POST" : "GET";
}
function getTimeout(options, controller) {
    let abortTimeout;
    if (!(options == null ? void 0 : options.signal) && (options == null ? void 0 : options.timeout)) {
        abortTimeout = setTimeout(()=>controller == null ? void 0 : controller.abort(), options == null ? void 0 : options.timeout);
    }
    return {
        abortTimeout,
        clearTimeout: ()=>{
            if (abortTimeout) {
                clearTimeout(abortTimeout);
            }
        }
    };
}
function bodyParser(data, responseType) {
    if (responseType === "json") {
        return JSON.parse(data);
    }
    return data;
}
var ValidationError = class _ValidationError extends Error {
    constructor(issues, message){
        super(message || JSON.stringify(issues, null, 2));
        this.issues = issues;
        Object.setPrototypeOf(this, _ValidationError.prototype);
    }
};
async function parseStandardSchema(schema, input) {
    const result = await schema["~standard"].validate(input);
    if (result.issues) {
        throw new ValidationError(result.issues);
    }
    return result.value;
}
// src/create-fetch/schema.ts
var methods = [
    "get",
    "post",
    "put",
    "patch",
    "delete"
];
var createSchema = (schema, config)=>{
    return {
        schema,
        config
    };
};
// src/create-fetch/index.ts
var applySchemaPlugin = (config)=>({
        id: "apply-schema",
        name: "Apply Schema",
        version: "1.0.0",
        async init (url, options) {
            var _a, _b, _c, _d;
            const schema = ((_b = (_a = config.plugins) == null ? void 0 : _a.find((plugin)=>{
                var _a2;
                return ((_a2 = plugin.schema) == null ? void 0 : _a2.config) ? url.startsWith(plugin.schema.config.baseURL || "") || url.startsWith(plugin.schema.config.prefix || "") : false;
            })) == null ? void 0 : _b.schema) || config.schema;
            if (schema) {
                let urlKey = url;
                if ((_c = schema.config) == null ? void 0 : _c.prefix) {
                    if (urlKey.startsWith(schema.config.prefix)) {
                        urlKey = urlKey.replace(schema.config.prefix, "");
                        if (schema.config.baseURL) {
                            url = url.replace(schema.config.prefix, schema.config.baseURL);
                        }
                    }
                }
                if ((_d = schema.config) == null ? void 0 : _d.baseURL) {
                    if (urlKey.startsWith(schema.config.baseURL)) {
                        urlKey = urlKey.replace(schema.config.baseURL, "");
                    }
                }
                if (urlKey.startsWith("/") && urlKey.charAt(1) === "@") {
                    urlKey = urlKey.substring(1);
                }
                const keySchema = schema.schema[urlKey];
                if (keySchema) {
                    let validatedHeaders = options == null ? void 0 : options.headers;
                    if (keySchema.headers && !(options == null ? void 0 : options.disableValidation)) {
                        const normalizedHeaders = {};
                        if (options == null ? void 0 : options.headers) {
                            if (options.headers instanceof Headers) {
                                options.headers.forEach((value, key)=>{
                                    normalizedHeaders[key.toLowerCase()] = value;
                                });
                            } else if (typeof options.headers === "object") {
                                for (const [key, value] of Object.entries(options.headers)){
                                    if (value !== null && value !== void 0) {
                                        normalizedHeaders[key.toLowerCase()] = value;
                                    }
                                }
                            }
                        }
                        const validated = await parseStandardSchema(keySchema.headers, normalizedHeaders);
                        const finalHeaders = {};
                        for (const [key, value] of Object.entries(validated)){
                            finalHeaders[key.toLowerCase()] = value;
                        }
                        validatedHeaders = finalHeaders;
                    }
                    let opts = __spreadProps(__spreadValues({}, options), {
                        method: keySchema.method,
                        output: keySchema.output,
                        headers: validatedHeaders
                    });
                    if (!(options == null ? void 0 : options.disableValidation)) {
                        opts = __spreadProps(__spreadValues({}, opts), {
                            body: keySchema.input ? await parseStandardSchema(keySchema.input, options == null ? void 0 : options.body) : options == null ? void 0 : options.body,
                            params: keySchema.params ? await parseStandardSchema(keySchema.params, options == null ? void 0 : options.params) : options == null ? void 0 : options.params,
                            query: keySchema.query ? await parseStandardSchema(keySchema.query, options == null ? void 0 : options.query) : options == null ? void 0 : options.query
                        });
                    }
                    return {
                        url,
                        options: opts
                    };
                }
            }
            return {
                url,
                options
            };
        }
    });
var createFetch = (config)=>{
    async function $fetch(url, options) {
        const opts = __spreadProps(__spreadValues(__spreadValues({}, config), options), {
            headers: mergeHeaders(config == null ? void 0 : config.headers, options == null ? void 0 : options.headers),
            plugins: [
                ...(config == null ? void 0 : config.plugins) || [],
                applySchemaPlugin(config || {}),
                ...(options == null ? void 0 : options.plugins) || []
            ]
        });
        if (config == null ? void 0 : config.catchAllError) {
            try {
                return await betterFetch(url, opts);
            } catch (error) {
                return {
                    data: null,
                    error: {
                        status: 500,
                        statusText: "Fetch Error",
                        message: "Fetch related error. Captured by catchAllError option. See error property for more details.",
                        error
                    }
                };
            }
        }
        return await betterFetch(url, opts);
    }
    return $fetch;
};
// src/url.ts
var isReservedPathSegment = (value)=>value === "." || value === "..";
function encodePathSegment(segment, pathParams) {
    let pathSegment = segment;
    for (const [key, value] of pathParams){
        pathSegment = pathSegment.replace(key, value);
    }
    if (isReservedPathSegment(pathSegment)) {
        throw new TypeError("Path parameters cannot be reserved path segments");
    }
    return encodeURIComponent(pathSegment);
}
function getURL2(url, option) {
    const { baseURL, params, query } = option || {
        query: {},
        params: {},
        baseURL: ""
    };
    let basePath = url.startsWith("http") ? url.split("/").slice(0, 3).join("/") : baseURL || "";
    if (url.startsWith("@")) {
        const m = url.toString().split("@")[1].split("/")[0];
        if (methods.includes(m)) {
            url = url.replace(`@${m}/`, "/");
        }
    }
    if (!basePath.endsWith("/")) basePath += "/";
    let [path, urlQuery] = url.replace(basePath, "").split("?");
    const queryParams = new URLSearchParams(urlQuery);
    for (const [key, value] of Object.entries(query || {})){
        if (value == null) continue;
        let serializedValue;
        if (typeof value === "string") {
            serializedValue = value;
        } else if (Array.isArray(value)) {
            for (const val of value){
                queryParams.append(key, val);
            }
            continue;
        } else {
            serializedValue = JSON.stringify(value);
        }
        queryParams.set(key, serializedValue);
    }
    const pathParams = /* @__PURE__ */ new Map();
    if (params) {
        if (Array.isArray(params)) {
            const paramPaths = path.split("/").filter((p)=>p.startsWith(":"));
            for (const [index, key] of paramPaths.entries()){
                const value = params[index];
                pathParams.set(key, String(value));
            }
        } else {
            for (const [key, value] of Object.entries(params)){
                pathParams.set(`:${key}`, String(value));
            }
        }
    }
    path = path.split("/").map((segment)=>encodePathSegment(segment, pathParams)).join("/");
    path = path.replace(/^\/+/, "");
    let queryParamString = queryParams.toString();
    queryParamString = queryParamString.length > 0 ? `?${queryParamString}`.replace(/\+/g, "%20") : "";
    if (!basePath.startsWith("http")) {
        return `${basePath}${path}${queryParamString}`;
    }
    const _url = new URL(`${path}${queryParamString}`, basePath);
    return _url;
}
// src/fetch.ts
var betterFetch = async (url, options)=>{
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { hooks, url: __url, options: opts } = await initializePlugins(url, options);
    const fetch = getFetch(opts);
    const controller = new AbortController();
    const signal = (_a = opts.signal) != null ? _a : controller.signal;
    const _url = getURL2(__url, opts);
    const headers = await getHeaders(opts);
    const body = getBody(opts, headers);
    const method = getMethod(__url, opts);
    const context = __spreadProps(__spreadValues({}, opts), {
        url: _url,
        headers,
        body,
        method,
        signal
    });
    for (const onRequest of hooks.onRequest){
        if (onRequest) {
            const res = await onRequest(context);
            if (typeof res === "object" && res !== null) {
                Object.assign(context, res);
            }
        }
    }
    if ("pipeTo" in context && typeof context.pipeTo === "function" || typeof ((_b = options == null ? void 0 : options.body) == null ? void 0 : _b.pipe) === "function") {
        if (!("duplex" in context)) {
            context.duplex = "half";
        }
    }
    const { clearTimeout: clearTimeout2 } = getTimeout(opts, controller);
    let response = await fetch(context.url, context);
    clearTimeout2();
    const responseContext = {
        response,
        request: context
    };
    for (const onResponse of hooks.onResponse){
        if (onResponse) {
            const r = await onResponse(__spreadProps(__spreadValues({}, responseContext), {
                response: ((_c = options == null ? void 0 : options.hookOptions) == null ? void 0 : _c.cloneResponse) ? response.clone() : response
            }));
            if (r instanceof Response) {
                response = r;
            } else if (typeof r === "object" && r !== null) {
                response = r.response;
            }
        }
    }
    if (response.ok) {
        const hasBody = context.method !== "HEAD";
        if (!hasBody) {
            return {
                data: "",
                error: null
            };
        }
        const responseType = detectResponseType(response);
        const successContext = {
            data: null,
            response,
            request: context
        };
        if (responseType === "json" || responseType === "text") {
            const text = await response.text();
            const parser2 = (_d = context.jsonParser) != null ? _d : jsonParse;
            successContext.data = await parser2(text);
        } else {
            successContext.data = await response[responseType]();
        }
        if (context == null ? void 0 : context.output) {
            if (context.output && !context.disableValidation) {
                successContext.data = await parseStandardSchema(context.output, successContext.data);
            }
        }
        for (const onSuccess of hooks.onSuccess){
            if (onSuccess) {
                await onSuccess(__spreadProps(__spreadValues({}, successContext), {
                    response: ((_e = options == null ? void 0 : options.hookOptions) == null ? void 0 : _e.cloneResponse) ? response.clone() : response
                }));
            }
        }
        if (options == null ? void 0 : options.throw) {
            return successContext.data;
        }
        return {
            data: successContext.data,
            error: null
        };
    }
    const parser = (_f = options == null ? void 0 : options.jsonParser) != null ? _f : jsonParse;
    const responseText = await response.text();
    const isJSONResponse = isJSONParsable(responseText);
    const errorObject = isJSONResponse ? await parser(responseText) : null;
    const errorContext = {
        response,
        responseText,
        request: context,
        error: __spreadProps(__spreadValues({}, errorObject), {
            status: response.status,
            statusText: response.statusText
        })
    };
    for (const onError of hooks.onError){
        if (onError) {
            await onError(__spreadProps(__spreadValues({}, errorContext), {
                response: ((_g = options == null ? void 0 : options.hookOptions) == null ? void 0 : _g.cloneResponse) ? response.clone() : response
            }));
        }
    }
    if (options == null ? void 0 : options.retry) {
        const retryStrategy = createRetryStrategy(options.retry);
        const _retryAttempt = (_h = options.retryAttempt) != null ? _h : 0;
        if (await retryStrategy.shouldAttemptRetry(_retryAttempt, response)) {
            for (const onRetry of hooks.onRetry){
                if (onRetry) {
                    await onRetry(responseContext);
                }
            }
            const delay = retryStrategy.getDelay(_retryAttempt);
            await new Promise((resolve)=>setTimeout(resolve, delay));
            return await betterFetch(url, __spreadProps(__spreadValues({}, options), {
                retryAttempt: _retryAttempt + 1
            }));
        }
    }
    if (options == null ? void 0 : options.throw) {
        throw new BetterFetchError(response.status, response.statusText, isJSONResponse ? errorObject : responseText);
    }
    return {
        data: null,
        error: __spreadProps(__spreadValues({}, errorObject), {
            status: response.status,
            statusText: response.statusText
        })
    };
};
;
}),
"[project]/node_modules/@noble/ciphers/_arx.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_XorStreamPRG",
    ()=>_XorStreamPRG,
    "createCipher",
    ()=>createCipher,
    "createPRG",
    ()=>createPRG,
    "rotl",
    ()=>rotl
]);
/**
 * Basic utils for ARX (add-rotate-xor) salsa and chacha ciphers.

RFC8439 requires multi-step cipher stream, where
authKey starts with counter: 0, actual msg with counter: 1.

For this, we need a way to re-use nonce / counter:

    const counter = new Uint8Array(4);
    chacha(..., counter, ...); // counter is now 1
    chacha(..., counter, ...); // counter is now 2

This is complicated:

- 32-bit counters are enough, no need for 64-bit: max ArrayBuffer size in JS is 4GB
- Original papers don't allow mutating counters
- Counter overflow is undefined [^1]
- Idea A: allow providing (nonce | counter) instead of just nonce, re-use it
- Caveat: Cannot be re-used through all cases:
- * chacha has (counter | nonce)
- * xchacha has (nonce16 | counter | nonce16)
- Idea B: separate nonce / counter and provide separate API for counter re-use
- Caveat: there are different counter sizes depending on an algorithm.
- salsa & chacha also differ in structures of key & sigma:
  salsa20:      s[0] | k(4) | s[1] | nonce(2) | cnt(2) | s[2] | k(4) | s[3]
  chacha:       s(4) | k(8) | cnt(1) | nonce(3)
  chacha20orig: s(4) | k(8) | cnt(2) | nonce(2)
- Idea C: helper method such as `setSalsaState(key, nonce, sigma, data)`
- Caveat: we can't re-use counter array

xchacha uses the subkey and remaining 8 byte nonce with ChaCha20 as normal
(prefixed by 4 NUL bytes, since RFC8439 specifies a 12-byte nonce).
Counter overflow is undefined; see {@link https://mailarchive.ietf.org/arch/msg/cfrg/gsOnTJzcbgG6OqD8Sc0GO5aR_tU/ | the CFRG thread}.
Current noble policy is strict non-wrap for the shared 32-bit counter path:
exported ARX ciphers reject initial `0xffffffff` and stop before any implicit
wrap back to zero.
See {@link https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha#appendix-A.2 | the XChaCha appendix} for the extended-nonce construction.

 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/utils.js [app-rsc] (ecmascript)");
;
// Replaces `TextEncoder` for ASCII literals, which is enough for sigma constants.
// Non-ASCII input would not match UTF-8 `TextEncoder` output.
const encodeStr = (str)=>Uint8Array.from(str.split(''), (c)=>c.charCodeAt(0));
// Raw `createCipher(...)` exports consume these native-endian `u32(...)` views directly.
// Public `wrapCipher(...)` APIs reject non-little-endian platforms before reaching this path.
// RFC 8439 §2.3 / RFC 7539 §2.3 only define the 256-bit-key constants; this 16-byte sigma is
// kept for legacy allowShortKeys Salsa/ChaCha variants.
const sigma16_32 = /* @__PURE__ */ (()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(encodeStr('expand 16-byte k'))))();
// RFC 8439 §2.3 / RFC 7539 §2.3 define words 0-3 as
// `0x61707865 0x3320646e 0x79622d32 0x6b206574`, i.e. `expand 32-byte k`.
const sigma32_32 = /* @__PURE__ */ (()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(encodeStr('expand 32-byte k'))))();
function rotl(a, b) {
    return a << b | a >>> 32 - b;
}
// Salsa and Chacha block length is always 512-bit
const BLOCK_LEN = 64;
// RFC 8439 §2.2 / RFC 7539 §2.2: the ChaCha state has 16 32-bit words.
const BLOCK_LEN32 = 16;
// Counter policy for the shared public `counter` argument:
// - RFC/IETF ChaCha20 uses a 32-bit counter.
// - OpenSSL/Node `chacha20` instead treat the full 16-byte IV as a 128-bit
//   counter state and carry into the next word.
// - Raw `chacha20orig`, `salsa20`, `xsalsa20`, and `xchacha20` use 64-bit counters in libsodium
//   and libtomcrypt, while some libs (for example libtomcrypt's RFC/IETF path) reject the max
//   boundary instead of carrying.
// - AEAD wrappers diverge too: libsodium `xchacha20poly1305` uses the IETF payload counter from
//   block 1, while `secretstream_xchacha20poly1305` is a different protocol with rekey/reset.
// Noble intentionally throws instead of silently picking one wrap model for users. In the default
// path, even a 32-bit boundary would take 2^32 blocks * 64 bytes = 256 GiB, which is practically
// unreachable for normal JS callers; advanced users who pass `counter` explicitly can implement
// whatever wider carry / wrap policy they need on top.
const MAX_COUNTER = /* @__PURE__ */ (()=>2 ** 32 - 1)();
const U32_EMPTY = /* @__PURE__ */ Uint32Array.of();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
    const len = data.length;
    const block = new Uint8Array(BLOCK_LEN);
    const b32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(block);
    // Make sure that buffers aligned to 4 bytes
    const isAligned = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLE"] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAligned32"])(data) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAligned32"])(output);
    const d32 = isAligned ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(data) : U32_EMPTY;
    const o32 = isAligned ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(output) : U32_EMPTY;
    // RFC 8439 §2.4.1 / RFC 7539 §2.4.1 allow XORing one keystream block at a time and
    // truncating the final partial block instead of materializing the whole keystream.
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLE"]) {
        for(let pos = 0; pos < len; counter++){
            core(sigma, key, nonce, b32, counter, rounds);
            // RFC 8439 §2.4 / RFC 7539 §2.4 serialize keystream words in little-endian order.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])(b32);
            if (counter >= MAX_COUNTER) throw new Error('arx: counter overflow');
            const take = Math.min(BLOCK_LEN, len - pos);
            for(let j = 0, posj; j < take; j++){
                posj = pos + j;
                output[posj] = data[posj] ^ block[j];
            }
            pos += take;
        }
        return;
    }
    for(let pos = 0; pos < len; counter++){
        core(sigma, key, nonce, b32, counter, rounds);
        // See MAX_COUNTER policy note above: never silently wrap the shared public counter.
        if (counter >= MAX_COUNTER) throw new Error('arx: counter overflow');
        const take = Math.min(BLOCK_LEN, len - pos);
        // aligned to 4 bytes
        if (isAligned && take === BLOCK_LEN) {
            const pos32 = pos / 4;
            if (pos % 4 !== 0) throw new Error('arx: invalid block position');
            for(let j = 0, posj; j < BLOCK_LEN32; j++){
                posj = pos32 + j;
                o32[posj] = d32[posj] ^ b32[j];
            }
            pos += BLOCK_LEN;
            continue;
        }
        for(let j = 0, posj; j < take; j++){
            posj = pos + j;
            output[posj] = data[posj] ^ block[j];
        }
        pos += take;
    }
}
function createCipher(core, opts) {
    const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkOpts"])({
        allowShortKeys: false,
        counterLength: 8,
        counterRight: false,
        rounds: 20
    }, opts);
    if (typeof core !== 'function') throw new Error('core must be a function');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["anumber"])(counterLength);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["anumber"])(rounds);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abool"])(counterRight);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abool"])(allowShortKeys);
    return (key, nonce, data, output, counter = 0)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(key, undefined, 'key');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(nonce, undefined, 'nonce');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(data, undefined, 'data');
        const len = data.length;
        // Raw XorStream APIs return ciphertext/plaintext bytes directly, so caller-provided outputs
        // must match the logical result length exactly instead of returning an oversized workspace.
        output = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOutput"])(len, output, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["anumber"])(counter);
        // See MAX_COUNTER policy note above: reject advanced explicit-counter requests before any wrap.
        if (counter < 0 || counter >= MAX_COUNTER) throw new Error('arx: counter overflow');
        const toClean = [];
        // Key & sigma
        // key=16 -> sigma16, k=key|key
        // key=32 -> sigma32, k=key
        let l = key.length;
        let k;
        let sigma;
        if (l === 32) {
            // Copy caller keys too: big-endian normalization, extended-nonce subkey derivation, and
            // final clean(...) all mutate or wipe the temporary buffer in place.
            toClean.push(k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copyBytes"])(key));
            sigma = sigma32_32;
        } else if (l === 16 && allowShortKeys) {
            k = new Uint8Array(32);
            k.set(key);
            k.set(key, 16);
            sigma = sigma16_32;
            toClean.push(k);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(key, 32, 'arx key');
            throw new Error('invalid key size');
        // throw new Error(`"arx key" expected Uint8Array of length 32, got length=${l}`);
        }
        // Nonce
        // salsa20:      8   (8-byte counter)
        // chacha20orig: 8   (8-byte counter)
        // chacha20:     12  (4-byte counter)
        // xsalsa20:     24  (16 -> hsalsa,  8 -> old nonce)
        // xchacha20:    24  (16 -> hchacha, 8 -> old nonce)
        // Copy before taking u32(...) views on misaligned inputs, and on big-endian so later
        // swap32IfBE(...) never mutates caller nonce bytes in place.
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLE"] || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAligned32"])(nonce)) toClean.push(nonce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copyBytes"])(nonce));
        let k32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(k);
        // hsalsa & hchacha: handle extended nonce
        if (extendNonceFn) {
            if (nonce.length !== 24) throw new Error(`arx: extended nonce must be 24 bytes`);
            const n16 = nonce.subarray(0, 16);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLE"]) extendNonceFn(sigma, k32, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(n16), k32);
            else {
                const sigmaRaw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])(Uint32Array.from(sigma));
                extendNonceFn(sigmaRaw, k32, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(n16), k32);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(sigmaRaw);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])(k32);
            }
            nonce = nonce.subarray(16);
        } else if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLE"]) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])(k32);
        // Handle nonce counter
        const nonceNcLen = 16 - counterLength;
        if (nonceNcLen !== nonce.length) throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
        // Normalize 64-bit-nonce layouts to the 12-byte core input: ChaCha/XChaCha prefix 4 zero
        // counter bytes, while Salsa/XSalsa append them after the nonce words.
        if (nonceNcLen !== 12) {
            const nc = new Uint8Array(12);
            nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
            nonce = nc;
            toClean.push(nonce);
        }
        const n32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u32"])(nonce));
        // Ensure temporary key/nonce copies are wiped even if the remaining
        // runtime guard in runCipher(...) throws on counter overflow.
        try {
            runCipher(core, sigma, k32, n32, data, output, counter, rounds);
            return output;
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(...toClean);
        }
    };
}
class _XorStreamPRG {
    blockLen;
    keyLen;
    nonceLen;
    state;
    buf;
    key;
    nonce;
    pos;
    ctr;
    cipher;
    constructor(cipher, blockLen, keyLen, nonceLen, seed){
        this.cipher = cipher;
        this.blockLen = blockLen;
        this.keyLen = keyLen;
        this.nonceLen = nonceLen;
        this.state = new Uint8Array(this.keyLen + this.nonceLen);
        this.reseed(seed);
        this.ctr = 0;
        this.pos = this.blockLen;
        this.buf = new Uint8Array(this.blockLen);
        // Keep a single key||nonce backing buffer so reseed/addEntropy/clean update the live cipher
        // inputs in place through these subarray views.
        this.key = this.state.subarray(0, this.keyLen);
        this.nonce = this.state.subarray(this.keyLen);
    }
    reseed(seed) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(seed);
        if (!seed || seed.length === 0) throw new Error('entropy required');
        // Mix variable-length entropy cyclically across the whole key||nonce state, then restart the
        // keystream so buffered leftovers from the previous state are never reused.
        for(let i = 0; i < seed.length; i++)this.state[i % this.state.length] ^= seed[i];
        this.ctr = 0;
        this.pos = this.blockLen;
    }
    addEntropy(seed) {
        // Reject empty entropy before re-keying, otherwise a throwing call would still advance state.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(seed);
        if (seed.length === 0) throw new Error('entropy required');
        // Re-key from the current stream first, then mix external entropy into the fresh key||nonce
        // state through reseed() so stale buffered bytes are discarded.
        this.state.set(this.randomBytes(this.state.length));
        this.reseed(seed);
    }
    randomBytes(len) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["anumber"])(len);
        if (len === 0) return new Uint8Array(0);
        const avail = this.pos < this.blockLen ? this.blockLen - this.pos : 0;
        const blocks = Math.ceil(Math.max(0, len - avail) / this.blockLen);
        // Preflight overflow so failed reads don't partially consume keystream
        // and leave the PRG repeating blocks.
        if (blocks > 0 && this.ctr > MAX_COUNTER - blocks) throw new Error('arx: counter overflow');
        const out = new Uint8Array(len);
        let outPos = 0;
        // `out` starts zero-filled, and `buf.fill(0)` below does the same for leftovers: XOR-stream
        // ciphers then emit raw keystream bytes directly into those buffers.
        // Serve buffered leftovers first so split reads stay identical to one larger read.
        if (this.pos < this.blockLen) {
            const take = Math.min(len, this.blockLen - this.pos);
            out.set(this.buf.subarray(this.pos, this.pos + take), 0);
            this.pos += take;
            outPos += take;
            if (outPos === len) return out; // fast path
        }
        // Full blocks directly to out
        const full = Math.floor((len - outPos) / this.blockLen);
        if (full > 0) {
            const blockBytes = full * this.blockLen;
            const b = out.subarray(outPos, outPos + blockBytes);
            this.cipher(this.key, this.nonce, b, b, this.ctr);
            this.ctr += full;
            outPos += blockBytes;
        }
        // Save leftovers
        const left = len - outPos;
        if (left > 0) {
            this.buf.fill(0);
            // NOTE: cipher will handle overflow
            this.cipher(this.key, this.nonce, this.buf, this.buf, this.ctr++);
            out.set(this.buf.subarray(0, left), outPos);
            this.pos = left;
        }
        return out;
    }
    // Clone seeds the new instance from this stream, so the source PRG advances too.
    clone() {
        return new _XorStreamPRG(this.cipher, this.blockLen, this.keyLen, this.nonceLen, this.randomBytes(this.state.length));
    }
    // Zeroes the current state and leftover buffer, but does not make the instance unusable:
    // Later reads first drain zeros from the cleared buffer and then continue
    // from zero key||nonce state.
    clean() {
        this.pos = 0;
        this.ctr = 0;
        this.buf.fill(0);
        this.state.fill(0);
    }
}
const createPRG = (cipher, blockLen, keyLen, nonceLen)=>{
    return (seed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["randomBytes"])(32))=>new _XorStreamPRG(cipher, blockLen, keyLen, nonceLen, seed);
};
}),
"[project]/node_modules/@noble/ciphers/_poly1305.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Poly1305",
    ()=>Poly1305,
    "poly1305",
    ()=>poly1305
]);
/**
 * Poly1305 ({@link https://cr.yp.to/mac/poly1305-20050329.pdf | PDF},
 * {@link https://en.wikipedia.org/wiki/Poly1305 | wiki})
 * is a fast and parallel secret-key message-authentication code suitable for
 * a wide variety of applications. It was standardized in
 * {@link https://www.rfc-editor.org/rfc/rfc8439 | RFC 8439} and is now used in TLS 1.3.
 *
 * Polynomial MACs are not perfect for every situation:
 * they lack Random Key Robustness: the MAC can be forged, and can't be used in PAKE schemes.
 * See {@link https://keymaterial.net/2020/09/07/invisible-salamanders-in-aes-gcm-siv/ | the invisible salamanders attack writeup}.
 * To combat invisible salamanders, `hash(key)` can be included in ciphertext,
 * however, this would violate ciphertext indistinguishability:
 * an attacker would know which key was used - so `HKDF(key, i)`
 * could be used instead.
 *
 * Check out the {@link https://cr.yp.to/mac.html | original website}.
 * Based on public-domain {@link https://github.com/floodyberry/poly1305-donna | poly1305-donna}.
 * @module
 */ // prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/utils.js [app-rsc] (ecmascript)");
;
// Little-endian 2-byte load used by the Poly1305 limb decomposition.
function u8to16(a, i) {
    return a[i++] & 0xff | (a[i++] & 0xff) << 8;
}
function bytesToNumberLE(bytes) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hexToNumber"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["bytesToHex"])(Uint8Array.from(bytes).reverse()));
}
/** Small version of `poly1305` without loop unrolling. Unused, provided for auditability. */ function poly1305_small(msg, key) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(msg);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(key, 32, 'key');
    const POW_2_130_5 = BigInt(2) ** BigInt(130) - BigInt(5); // 2^130-5
    const POW_2_128_1 = BigInt(2) ** BigInt(128) - BigInt(1); // 2^128-1
    const CLAMP_R = BigInt('0x0ffffffc0ffffffc0ffffffc0fffffff');
    const r = bytesToNumberLE(key.subarray(0, 16)) & CLAMP_R;
    const s = bytesToNumberLE(key.subarray(16));
    // Process by 16 byte chunks
    let acc = BigInt(0);
    for(let i = 0; i < msg.length; i += 16){
        const m = msg.subarray(i, i + 16);
        // RFC 8439 §2.5.1 / RFC 7539 §2.5.1 append [0x01] to each chunk before multiplying by r.
        const n = bytesToNumberLE(m) | BigInt(1) << BigInt(8 * m.length);
        acc = (acc + n) * r % POW_2_130_5;
    }
    const res = acc + s & POW_2_128_1;
    // RFC 8439 §2.5 / RFC 7539 §2.5 serialize the low 128 bits in little-endian order.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["numberToBytesBE"])(res, 16).reverse(); // LE
}
// Can be used to replace `computeTag` in chacha.ts. Unused, provided for auditability.
// @ts-expect-error
function poly1305_computeTag_small(authKey, // AEAD trailer must already be the 16-byte length block:
// 8-byte little-endian AAD length || 8-byte little-endian ciphertext length.
lengths, ciphertext, AAD) {
    // RFC 8439 §2.8.1 / RFC 7539 §2.8.1 MAC input is
    // AAD || pad16(AAD) || ciphertext || pad16(ciphertext) || lengths.
    const res = [];
    const updatePadded2 = (msg)=>{
        res.push(msg);
        const leftover = msg.length % 16;
        // RFC 8439 §2.8.1 / RFC 7539 §2.8.1: pad16(x) is empty for aligned
        // inputs, else 16-(len%16) zero bytes.
        if (leftover) res.push(new Uint8Array(16).slice(leftover));
    };
    if (AAD) updatePadded2(AAD);
    updatePadded2(ciphertext);
    res.push(lengths);
    return poly1305_small((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["concatBytes"])(...res), authKey);
}
class Poly1305 {
    blockLen = 16;
    outputLen = 16;
    buffer = new Uint8Array(16);
    r = new Uint16Array(10);
    h = new Uint16Array(10);
    pad = new Uint16Array(8);
    pos = 0;
    finished = false;
    destroyed = false;
    // Can be speed-up using BigUint64Array, at the cost of complexity
    constructor(key){
        key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copyBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(key, 32, 'key'));
        const t0 = u8to16(key, 0);
        const t1 = u8to16(key, 2);
        const t2 = u8to16(key, 4);
        const t3 = u8to16(key, 6);
        const t4 = u8to16(key, 8);
        const t5 = u8to16(key, 10);
        const t6 = u8to16(key, 12);
        const t7 = u8to16(key, 14);
        // RFC 8439 §2.5.1 / RFC 7539 §2.5.1 clamp r before multiplication.
        // These masks unpack that clamped value into 13-bit limbs, while pad
        // keeps the raw s half for finalize().
        // {@link https://github.com/floodyberry/poly1305-donna/blob/e6ad6e091d30d7f4ec2d4f978be1fcfcbce72781/poly1305-donna-16.h#L47 | poly1305-donna reference}
        this.r[0] = t0 & 0x1fff;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
        this.r[5] = t4 >>> 1 & 0x1ffe;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
        this.r[9] = t7 >>> 5 & 0x007f;
        for(let i = 0; i < 8; i++)this.pad[i] = u8to16(key, 16 + 2 * i);
    }
    process(data, offset, isLast = false) {
        // RFC 8439 §2.5 / §2.5.1 and RFC 7539 §2.5 / §2.5.1 add an extra high
        // bit to every full 16-byte block. The final partial block gets its
        // explicit `1` byte during digestInto(), so `hibit` stays zero there.
        const hibit = isLast ? 0 : 1 << 11;
        const { h, r } = this;
        const r0 = r[0];
        const r1 = r[1];
        const r2 = r[2];
        const r3 = r[3];
        const r4 = r[4];
        const r5 = r[5];
        const r6 = r[6];
        const r7 = r[7];
        const r8 = r[8];
        const r9 = r[9];
        const t0 = u8to16(data, offset + 0);
        const t1 = u8to16(data, offset + 2);
        const t2 = u8to16(data, offset + 4);
        const t3 = u8to16(data, offset + 6);
        const t4 = u8to16(data, offset + 8);
        const t5 = u8to16(data, offset + 10);
        const t6 = u8to16(data, offset + 12);
        const t7 = u8to16(data, offset + 14);
        let h0 = h[0] + (t0 & 0x1fff);
        let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 0x1fff);
        let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 0x1fff);
        let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 0x1fff);
        let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 0x1fff);
        let h5 = h[5] + (t4 >>> 1 & 0x1fff);
        let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 0x1fff);
        let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 0x1fff);
        let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 0x1fff);
        let h9 = h[9] + (t7 >>> 5 | hibit);
        let c = 0;
        let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
        c = d0 >>> 13;
        d0 &= 0x1fff;
        d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
        c += d0 >>> 13;
        d0 &= 0x1fff;
        let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
        c = d1 >>> 13;
        d1 &= 0x1fff;
        d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
        c += d1 >>> 13;
        d1 &= 0x1fff;
        let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
        c = d2 >>> 13;
        d2 &= 0x1fff;
        d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
        c += d2 >>> 13;
        d2 &= 0x1fff;
        let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
        c = d3 >>> 13;
        d3 &= 0x1fff;
        d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
        c += d3 >>> 13;
        d3 &= 0x1fff;
        let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
        c = d4 >>> 13;
        d4 &= 0x1fff;
        d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
        c += d4 >>> 13;
        d4 &= 0x1fff;
        let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
        c = d5 >>> 13;
        d5 &= 0x1fff;
        d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
        c += d5 >>> 13;
        d5 &= 0x1fff;
        let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
        c = d6 >>> 13;
        d6 &= 0x1fff;
        d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
        c += d6 >>> 13;
        d6 &= 0x1fff;
        let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
        c = d7 >>> 13;
        d7 &= 0x1fff;
        d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
        c += d7 >>> 13;
        d7 &= 0x1fff;
        let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
        c = d8 >>> 13;
        d8 &= 0x1fff;
        d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
        c += d8 >>> 13;
        d8 &= 0x1fff;
        let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
        c = d9 >>> 13;
        d9 &= 0x1fff;
        d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
        c += d9 >>> 13;
        d9 &= 0x1fff;
        c = (c << 2) + c | 0;
        c = c + d0 | 0;
        d0 = c & 0x1fff;
        c = c >>> 13;
        d1 += c;
        h[0] = d0;
        h[1] = d1;
        h[2] = d2;
        h[3] = d3;
        h[4] = d4;
        h[5] = d5;
        h[6] = d6;
        h[7] = d7;
        h[8] = d8;
        h[9] = d9;
    }
    finalize() {
        const { h, pad } = this;
        const g = new Uint16Array(10);
        let c = h[1] >>> 13;
        h[1] &= 0x1fff;
        for(let i = 2; i < 10; i++){
            h[i] += c;
            c = h[i] >>> 13;
            h[i] &= 0x1fff;
        }
        h[0] += c * 5;
        c = h[0] >>> 13;
        h[0] &= 0x1fff;
        h[1] += c;
        c = h[1] >>> 13;
        h[1] &= 0x1fff;
        h[2] += c;
        // RFC 8439 §2.5 / RFC 7539 §2.5 reduce modulo 2^130-5 before repacking
        // to 16-bit words and adding the raw s half.
        g[0] = h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 0x1fff;
        for(let i = 1; i < 10; i++){
            g[i] = h[i] + c;
            c = g[i] >>> 13;
            g[i] &= 0x1fff;
        }
        g[9] -= 1 << 13;
        let mask = (c ^ 1) - 1;
        for(let i = 0; i < 10; i++)g[i] &= mask;
        mask = ~mask;
        for(let i = 0; i < 10; i++)h[i] = h[i] & mask | g[i];
        h[0] = (h[0] | h[1] << 13) & 0xffff;
        h[1] = (h[1] >>> 3 | h[2] << 10) & 0xffff;
        h[2] = (h[2] >>> 6 | h[3] << 7) & 0xffff;
        h[3] = (h[3] >>> 9 | h[4] << 4) & 0xffff;
        h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 0xffff;
        h[5] = (h[6] >>> 2 | h[7] << 11) & 0xffff;
        h[6] = (h[7] >>> 5 | h[8] << 8) & 0xffff;
        h[7] = (h[8] >>> 8 | h[9] << 5) & 0xffff;
        let f = h[0] + pad[0];
        h[0] = f & 0xffff;
        for(let i = 1; i < 8; i++){
            f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
            h[i] = f & 0xffff;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(g);
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(data);
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copyBytes"])(data);
        const { buffer, blockLen } = this;
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input
            if (take === blockLen) {
                for(; blockLen <= len - pos; pos += blockLen)this.process(data, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(buffer, 0, false);
                this.pos = 0;
            }
        }
        return this;
    }
    destroy() {
        // `aexists(this)` guards update/digest paths, so destroy must mark the instance unusable too.
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(this.h, this.r, this.buffer, this.pad);
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        this.finished = true;
        const { buffer, h } = this;
        let { pos } = this;
        if (pos) {
            // RFC 8439 §2.5 / RFC 7539 §2.5: the final short block appends a
            // single `0x01` byte and zero-fills the remaining bytes before the
            // last multiplication step.
            buffer[pos++] = 1;
            for(; pos < 16; pos++)buffer[pos] = 0;
            this.process(buffer, 0, true);
        }
        this.finalize();
        let opos = 0;
        for(let i = 0; i < 8; i++){
            out[opos++] = h[i] >>> 0;
            out[opos++] = h[i] >>> 8;
        }
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        // Copy out before destroy() zeroes the internal buffer.
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
}
const poly1305 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wrapMacConstructor"])(32, (key)=>new Poly1305(key));
}),
"[project]/node_modules/@noble/ciphers/chacha.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__TESTS",
    ()=>__TESTS,
    "_poly1305_aead",
    ()=>_poly1305_aead,
    "chacha12",
    ()=>chacha12,
    "chacha20",
    ()=>chacha20,
    "chacha20orig",
    ()=>chacha20orig,
    "chacha20poly1305",
    ()=>chacha20poly1305,
    "chacha8",
    ()=>chacha8,
    "hchacha",
    ()=>hchacha,
    "rngChacha20",
    ()=>rngChacha20,
    "rngChacha8",
    ()=>rngChacha8,
    "xchacha20",
    ()=>xchacha20,
    "xchacha20poly1305",
    ()=>xchacha20poly1305
]);
/**
 * ChaCha stream cipher, released
 * in 2008. Developed after Salsa20, ChaCha aims to increase diffusion per round.
 * It was standardized in
 * {@link https://www.rfc-editor.org/rfc/rfc8439 | RFC 8439} and
 * is now used in TLS 1.3.
 *
 * {@link https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha | XChaCha20}
 * extended-nonce variant is also provided. Similar to XSalsa, it's safe to use with
 * randomly-generated nonces.
 *
 * Check out
 * {@link http://cr.yp.to/chacha/chacha-20080128.pdf | PDF},
 * {@link https://en.wikipedia.org/wiki/Salsa20 | wiki}, and
 * {@link https://cr.yp.to/chacha.html | website}.
 *
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/_arx.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_poly1305$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/_poly1305.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/utils.js [app-rsc] (ecmascript)");
;
;
;
/**
 * ChaCha core function. It is implemented twice:
 * 1. Simple loop (chachaCore_small, hchacha_small)
 * 2. Unrolled loop (chachaCore, hchacha) - 4x faster, but larger & harder to read
 * The specific implementation is selected in `createCipher` below.
 */ /** RFC 8439 §2.1 quarter round on words a, b, c, d. */ // prettier-ignore
function chachaQR(x, a, b, c, d) {
    x[a] = x[a] + x[b] | 0;
    x[d] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x[d] ^ x[a], 16);
    x[c] = x[c] + x[d] | 0;
    x[b] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x[b] ^ x[c], 12);
    x[a] = x[a] + x[b] | 0;
    x[d] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x[d] ^ x[a], 8);
    x[c] = x[c] + x[d] | 0;
    x[b] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x[b] ^ x[c], 7);
}
/** Repeated ChaCha double rounds; callers are expected to pass an even round count. */ function chachaRound(x, rounds = 20) {
    for(let r = 0; r < rounds; r += 2){
        // RFC 8439 §2.3 / §2.3.1 inner_block: four column rounds, then four diagonal rounds.
        chachaQR(x, 0, 4, 8, 12);
        chachaQR(x, 1, 5, 9, 13);
        chachaQR(x, 2, 6, 10, 14);
        chachaQR(x, 3, 7, 11, 15);
        chachaQR(x, 0, 5, 10, 15);
        chachaQR(x, 1, 6, 11, 12);
        chachaQR(x, 2, 7, 8, 13);
        chachaQR(x, 3, 4, 9, 14);
    }
}
// Shared scratch for the auditability-only helper below; only the test-only
// __TESTS.chachaCore_small hook reaches it, so production exports stay reentrant.
const ctmp = /* @__PURE__ */ new Uint32Array(16);
/** Small version of chacha without loop unrolling. Unused, provided for auditability. */ // prettier-ignore
function chacha(s, k, i, out, isHChacha = true, rounds = 20) {
    // `i` is either `[counter, nonce0, nonce1, nonce2]` for the ChaCha block
    // function or the full 128-bit nonce prefix for the HChaCha subkey path.
    // Create initial array using common pattern
    const y = Uint32Array.from([
        s[0],
        s[1],
        s[2],
        s[3],
        k[0],
        k[1],
        k[2],
        k[3],
        k[4],
        k[5],
        k[6],
        k[7],
        i[0],
        i[1],
        i[2],
        i[3]
    ]);
    const x = ctmp;
    x.set(y);
    chachaRound(x, rounds);
    // HChaCha writes words 0..3 and 12..15 after the rounds; the ChaCha
    // block path adds the original state word-by-word.
    if (isHChacha) {
        const xindexes = [
            0,
            1,
            2,
            3,
            12,
            13,
            14,
            15
        ];
        for(let i = 0; i < 8; i++)out[i] = x[xindexes[i]];
    } else {
        for(let i = 0; i < 16; i++)out[i] = y[i] + x[i] | 0;
    }
}
/** Identical to `chachaCore`. Reached only through the test-only `__TESTS` export. */ // @ts-ignore
const chachaCore_small = (s, k, n, out, cnt, rounds)=>// Keep the reference wrapper on the same [counter, nonce0, nonce1, nonce2] layout as chacha().
    chacha(s, k, Uint32Array.from([
        cnt,
        n[0],
        n[1],
        n[2]
    ]), out, false, rounds);
/** Identical to `hchacha`. Unused. */ // @ts-ignore
const hchacha_small = chacha;
/** RFC 8439 §2.3 block core for `state = constants | key | counter | nonce`. */ // prettier-ignore
function chachaCore(s, k, n, out, cnt, rounds = 20) {
    let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2]; // Counter  Nonce   Nonce   Nonce
    // Save state to temporary variables
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for(let r = 0; r < rounds; r += 2){
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 7);
    }
    // RFC 8439 §2.3 / §2.3.1: add the original state words back in state order.
    let oi = 0;
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
}
function hchacha(s, k, i, out) {
    let x00 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(s[0]), x01 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(s[1]), x02 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(s[2]), x03 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(s[3]), x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[0]), x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[1]), x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[2]), x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[3]), x08 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[4]), x09 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[5]), x10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[6]), x11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(k[7]), x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(i[0]), x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(i[1]), x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(i[2]), x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap8IfBE"])(i[3]);
    for(let r = 0; r < 20; r += 2){
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 7);
    }
    // HChaCha derives the subkey from state words 0..3 and 12..15 after 20 rounds.
    let oi = 0;
    out[oi++] = x00;
    out[oi++] = x01;
    out[oi++] = x02;
    out[oi++] = x03;
    out[oi++] = x12;
    out[oi++] = x13;
    out[oi++] = x14;
    out[oi++] = x15;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["swap32IfBE"])(out);
}
const chacha20orig = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 8,
    allowShortKeys: true
});
const chacha20 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 4,
    allowShortKeys: false
});
const xchacha20 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 8,
    extendNonceFn: hchacha,
    allowShortKeys: false
});
const chacha8 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 8
});
const chacha12 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 12
});
const __TESTS = /* @__PURE__ */ Object.freeze({
    chachaCore_small,
    chachaCore
});
// RFC 8439 §2.8.1 pad16(x): shared zero block for AAD/ciphertext padding.
const ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
// RFC 8439 §2.8 / §2.8.1: aligned inputs add nothing, otherwise append 16-(len%16) zero bytes.
const updatePadded = (h, msg)=>{
    h.update(msg);
    const leftover = msg.length % 16;
    if (leftover) h.update(ZEROS16.subarray(leftover));
};
// RFC 8439 §2.6.1 poly1305_key_gen returns `block[0..31]`, so AEAD key
// generation only needs 32 zero bytes.
const ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, ciphertext, AAD) {
    if (AAD !== undefined) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(AAD, undefined, 'AAD');
    // RFC 8439 §2.6 / §2.8: derive the Poly1305 one-time key from counter 0,
    // then MAC AAD || pad16(AAD) || ciphertext || pad16(ciphertext) || len(AAD) || len(ciphertext).
    const authKey = fn(key, nonce, ZEROS32);
    const lengths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["u64Lengths"])(ciphertext.length, AAD ? AAD.length : 0, true);
    // Methods below can be replaced with
    // return poly1305_computeTag_small(authKey, lengths, ciphertext, AAD)
    const h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_poly1305$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["poly1305"].create(authKey);
    if (AAD) updatePadded(h, AAD);
    updatePadded(h, ciphertext);
    h.update(lengths);
    const res = h.digest();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(authKey, lengths);
    return res;
}
const _poly1305_aead = (xorStream)=>(key, nonce, AAD)=>{
        // This borrows caller key/nonce/AAD buffers by reference; mutating them after construction
        // changes future encrypt/decrypt results.
        const tagLength = 16;
        return {
            encrypt (plaintext, output) {
                const plength = plaintext.length;
                output = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOutput"])(plength + tagLength, output, false);
                output.set(plaintext);
                const oPlain = output.subarray(0, -tagLength);
                // RFC 8439 §2.8: payload encryption starts at counter 1 because counter 0 produced the OTK.
                xorStream(key, nonce, oPlain, oPlain, 1);
                const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
                output.set(tag, plength); // append tag
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(tag);
                return output;
            },
            decrypt (ciphertext, output) {
                output = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOutput"])(ciphertext.length - tagLength, output, false);
                const data = ciphertext.subarray(0, -tagLength);
                const passedTag = ciphertext.subarray(-tagLength);
                const tag = computeTag(xorStream, key, nonce, data, AAD);
                // RFC 8439 §2.8 / §4: authenticate ciphertext before decrypting it, and compare tags with
                // the constant-time equalBytes() helper rather than decrypting speculative plaintext first.
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["equalBytes"])(passedTag, tag)) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(tag);
                    throw new Error('invalid tag');
                }
                output.set(ciphertext.subarray(0, -tagLength));
                // Actual decryption
                xorStream(key, nonce, output, output, 1); // start stream with i=1
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(tag);
                return output;
            }
        };
    };
const chacha20poly1305 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wrapCipher"])({
    blockSize: 64,
    nonceLength: 12,
    tagLength: 16
}, /* @__PURE__ */ _poly1305_aead(chacha20));
const xchacha20poly1305 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wrapCipher"])({
    blockSize: 64,
    nonceLength: 24,
    tagLength: 16
}, /* @__PURE__ */ _poly1305_aead(xchacha20));
const rngChacha20 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPRG"])(chacha20orig, 64, 32, 8);
const rngChacha8 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$_arx$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPRG"])(chacha8, 64, 32, 12);
}),
"[project]/node_modules/@noble/ciphers/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */ /*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */ /**
 * Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
 * @param a - Value to inspect.
 * @returns `true` when the value is a Uint8Array view, including Node's `Buffer`.
 * @example
 * Guards a value before treating it as raw key material.
 *
 * ```ts
 * isBytes(new Uint8Array());
 * ```
 */ __turbopack_context__.s([
    "abool",
    ()=>abool,
    "abytes",
    ()=>abytes,
    "aexists",
    ()=>aexists,
    "anumber",
    ()=>anumber,
    "aoutput",
    ()=>aoutput,
    "byteSwap",
    ()=>byteSwap,
    "byteSwap32",
    ()=>byteSwap32,
    "bytesToHex",
    ()=>bytesToHex,
    "bytesToNumberBE",
    ()=>bytesToNumberBE,
    "bytesToUtf8",
    ()=>bytesToUtf8,
    "checkOpts",
    ()=>checkOpts,
    "clean",
    ()=>clean,
    "complexOverlapBytes",
    ()=>complexOverlapBytes,
    "concatBytes",
    ()=>concatBytes,
    "copyBytes",
    ()=>copyBytes,
    "createView",
    ()=>createView,
    "equalBytes",
    ()=>equalBytes,
    "getOutput",
    ()=>getOutput,
    "hexToBytes",
    ()=>hexToBytes,
    "hexToNumber",
    ()=>hexToNumber,
    "isAligned32",
    ()=>isAligned32,
    "isBytes",
    ()=>isBytes,
    "isLE",
    ()=>isLE,
    "managedNonce",
    ()=>managedNonce,
    "numberToBytesBE",
    ()=>numberToBytesBE,
    "overlapBytes",
    ()=>overlapBytes,
    "randomBytes",
    ()=>randomBytes,
    "swap32IfBE",
    ()=>swap32IfBE,
    "swap8IfBE",
    ()=>swap8IfBE,
    "u32",
    ()=>u32,
    "u64Lengths",
    ()=>u64Lengths,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes,
    "wrapCipher",
    ()=>wrapCipher,
    "wrapMacConstructor",
    ()=>wrapMacConstructor
]);
function isBytes(a) {
    // Plain `instanceof Uint8Array` is too strict for some Buffer / proxy /
    // cross-realm cases. The fallback still requires a real ArrayBuffer view
    // so plain JSON-deserialized `{ constructor: ... }`
    // spoofing is rejected, and `BYTES_PER_ELEMENT === 1` keeps the fallback on byte-oriented views.
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array' && 'BYTES_PER_ELEMENT' in a && a.BYTES_PER_ELEMENT === 1;
}
function abool(b) {
    if (typeof b !== 'boolean') throw new TypeError(`boolean expected, not ${b}`);
}
function anumber(n) {
    if (typeof n !== 'number') throw new TypeError('number expected, got ' + typeof n);
    if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('positive integer expected, got ' + n);
}
function abytes(value, length, title = '') {
    const bytes = isBytes(value);
    const len = value?.length;
    const needsLen = length !== undefined;
    if (!bytes || needsLen && len !== length) {
        const prefix = title && `"${title}" `;
        const ofLen = needsLen ? ` of length ${length}` : '';
        const got = bytes ? `length=${len}` : `type=${typeof value}`;
        const message = prefix + 'expected Uint8Array' + ofLen + ', got ' + got;
        if (!bytes) throw new TypeError(message);
        throw new RangeError(message);
    }
    return value;
}
function aexists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
function aoutput(out, instance, onlyAligned = false) {
    abytes(out, undefined, 'output');
    const min = instance.outputLen;
    if (out.length < min) {
        throw new RangeError('digestInto() expects output buffer of length at least ' + min);
    }
    if (onlyAligned && !isAligned32(out)) throw new Error('invalid output, must be aligned');
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
const byteSwap = (word)=>word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
const swap8IfBE = isLE ? (n)=>n : (n)=>byteSwap(n) >>> 0;
const byteSwap32 = (arr)=>{
    for(let i = 0; i < arr.length; i++)arr[i] = byteSwap(arr[i]);
    return arr;
};
const swap32IfBE = isLE ? (u)=>u : byteSwap32;
// Built-in hex conversion:
// {@link https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex | caniuse entry}
const hasHexBuiltin = /* @__PURE__ */ (()=>// @ts-ignore
    typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    abytes(bytes);
    // @ts-ignore
    if (hasHexBuiltin) return bytes.toHex();
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new TypeError('hex string expected, got ' + typeof hex);
    if (hasHexBuiltin) {
        try {
            return Uint8Array.fromHex(hex);
        } catch (error) {
            if (error instanceof SyntaxError) throw new RangeError(error.message);
            throw error;
        }
    }
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new RangeError('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new RangeError('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
function hexToNumber(hex) {
    if (typeof hex !== 'string') throw new TypeError('hex string expected, got ' + typeof hex);
    return BigInt(hex === '' ? '0' : '0x' + hex); // Big Endian
}
function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex(bytes));
}
function numberToBytesBE(n, len) {
    // Reject coercible non-numeric inputs before string/hex conversion changes behavior.
    if (typeof n === 'number') anumber(n);
    else if (typeof n !== 'bigint') throw new TypeError(`number or bigint expected, got ${typeof n}`);
    anumber(len);
    return hexToBytes(n.toString(16).padStart(len * 2, '0'));
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new TypeError('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // {@link https://bugzil.la/1681809 | Firefox bug 1681809}
}
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}
function overlapBytes(a, b) {
    // Zero-length views cannot overwrite anything, even if their offset sits inside another range.
    if (!a.byteLength || !b.byteLength) return false;
    return a.buffer === b.buffer && // best we can do, may fail with an obscure Proxy
    a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
    b.byteOffset < a.byteOffset + a.byteLength // b starts before a end
    ;
}
function complexOverlapBytes(input, output) {
    // This is very cursed. It works somehow, but I'm completely unsure,
    // reasoning about overlapping aligned windows is very hard.
    if (overlapBytes(input, output) && input.byteOffset < output.byteOffset) throw new Error('complex overlap of input and output is not supported');
}
function concatBytes(...arrays) {
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
function checkOpts(defaults, opts) {
    if (opts == null || typeof opts !== 'object') throw new Error('options must be defined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function equalBytes(a, b) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for(let i = 0; i < a.length; i++)diff |= a[i] ^ b[i];
    return diff === 0;
}
function wrapMacConstructor(keyLen, macCons, fromMsg) {
    const mac = macCons;
    const getArgs = fromMsg || (()=>[]);
    const macC = (msg, key)=>mac(key, ...getArgs(msg)).update(msg).digest();
    const tmp = mac(new Uint8Array(keyLen), ...getArgs(new Uint8Array(0)));
    macC.outputLen = tmp.outputLen;
    macC.blockLen = tmp.blockLen;
    macC.create = (key, ...args)=>mac(key, ...args);
    return macC;
}
const wrapCipher = (params, constructor)=>{
    function wrappedCipher(key, ...args) {
        // Validate key
        abytes(key, undefined, 'key');
        // Validate nonce if nonceLength is present
        if (params.nonceLength !== undefined) {
            const nonce = args[0];
            abytes(nonce, params.varSizeNonce ? undefined : params.nonceLength, 'nonce');
        }
        // Validate AAD if tagLength present
        const tagl = params.tagLength;
        if (tagl && args[1] !== undefined) abytes(args[1], undefined, 'AAD');
        const cipher = constructor(key, ...args);
        const checkOutput = (fnLength, output)=>{
            if (output !== undefined) {
                if (fnLength !== 2) throw new Error('cipher output not supported');
                abytes(output, undefined, 'output');
            }
        };
        // Create wrapped cipher with validation and single-use encryption
        let called = false;
        const wrCipher = {
            encrypt (data, output) {
                if (called) throw new Error('cannot encrypt() twice with same key + nonce');
                called = true;
                abytes(data);
                checkOutput(cipher.encrypt.length, output);
                return cipher.encrypt(data, output);
            },
            decrypt (data, output) {
                abytes(data);
                if (tagl && data.length < tagl) throw new Error('"ciphertext" expected length bigger than tagLength=' + tagl);
                checkOutput(cipher.decrypt.length, output);
                return cipher.decrypt(data, output);
            }
        };
        return wrCipher;
    }
    Object.assign(wrappedCipher, params);
    return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
    if (out === undefined) return new Uint8Array(expectedLength);
    // Keep Buffer/cross-realm Uint8Array support here instead of trusting a shape-compatible object.
    abytes(out, undefined, 'output');
    if (out.length !== expectedLength) throw new Error('"output" expected Uint8Array of length ' + expectedLength + ', got: ' + out.length);
    if (onlyAligned && !isAligned32(out)) throw new Error('invalid output, must be aligned');
    return out;
}
function u64Lengths(dataLength, aadLength, isLE) {
    // Reject coercible non-number lengths like '10' and true before BigInt(...) accepts them.
    anumber(dataLength);
    anumber(aadLength);
    abool(isLE);
    const num = new Uint8Array(16);
    const view = createView(num);
    view.setBigUint64(0, BigInt(aadLength), isLE);
    view.setBigUint64(8, BigInt(dataLength), isLE);
    return num;
}
function isAligned32(bytes) {
    return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
    // `Uint8Array.from(...)` would also accept arrays / other typed arrays. Keep this helper strict
    // because callers use it at byte-validation boundaries before mutating the detached copy.
    return Uint8Array.from(abytes(bytes));
}
function randomBytes(bytesLength = 32) {
    // Validate upfront so fractional / coercible lengths do not silently
    // truncate through Uint8Array().
    anumber(bytesLength);
    const cr = typeof globalThis === 'object' ? globalThis.crypto : null;
    if (typeof cr?.getRandomValues !== 'function') throw new Error('crypto.getRandomValues must be defined');
    return cr.getRandomValues(new Uint8Array(bytesLength));
}
function managedNonce(fn, randomBytes_ = randomBytes) {
    const { nonceLength } = fn;
    anumber(nonceLength);
    const addNonce = (nonce, ciphertext, plaintext)=>{
        const out = concatBytes(nonce, ciphertext);
        // Wrapped ciphers may alias caller plaintext on encrypt(); never zero
        // caller-owned buffers here.
        if (!overlapBytes(plaintext, ciphertext)) ciphertext.fill(0);
        return out;
    };
    // NOTE: we cannot support DST here, it would be mistake:
    // - we don't know how much dst length cipher requires
    // - nonce may unalign dst and break everything
    // - we create new u8a anyway (concatBytes)
    // - previously we passed all args to cipher, but that was mistake!
    const res = (key, ...args)=>({
            encrypt (plaintext) {
                abytes(plaintext);
                const nonce = randomBytes_(nonceLength);
                const encrypted = fn(key, nonce, ...args).encrypt(plaintext);
                // @ts-ignore
                if (encrypted instanceof Promise) return encrypted.then((ct)=>addNonce(nonce, ct, plaintext));
                return addNonce(nonce, encrypted, plaintext);
            },
            decrypt (ciphertext) {
                abytes(ciphertext);
                const nonce = ciphertext.subarray(0, nonceLength);
                const decrypted = ciphertext.subarray(nonceLength);
                return fn(key, nonce, ...args).decrypt(decrypted);
            }
        });
    // Auto-nonce wrappers still preserve the wrapped payload geometry.
    if ('blockSize' in fn) res.blockSize = fn.blockSize;
    if ('tagLength' in fn) res.tagLength = fn.tagLength;
    return res;
}
}),
"[project]/node_modules/@noble/hashes/_md.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chi",
    ()=>Chi,
    "HashMD",
    ()=>HashMD,
    "Maj",
    ()=>Maj,
    "SHA224_IV",
    ()=>SHA224_IV,
    "SHA256_IV",
    ()=>SHA256_IV,
    "SHA384_IV",
    ()=>SHA384_IV,
    "SHA512_IV",
    ()=>SHA512_IV
]);
/**
 * Internal Merkle-Damgard hash utils.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/_u64.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/utils.js [app-rsc] (ecmascript)");
;
;
function Chi(a, b, c) {
    return a & b ^ ~a & c;
}
function Maj(a, b, c) {
    return a & b ^ a & c ^ b & c;
}
class HashMD {
    blockLen;
    outputLen;
    canXOF = false;
    padOffset;
    isLE;
    // For partial updates less than block size
    buffer;
    view;
    finished = false;
    length = 0;
    pos = 0;
    destroyed = false;
    constructor(blockLen, outputLen, padOffset, isLE){
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createView"])(this.buffer);
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        let processed = false;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path only when there is no buffered partial block: `take === blockLen` implies
            // `this.pos === 0`, so we can process full blocks directly from the input view.
            if (take === blockLen) {
                const dataView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createView"])(data);
                for(; blockLen <= len - pos; pos += blockLen)this.process(dataView, pos);
                processed = true;
                continue;
            }
            // When the whole input is buffered in one go (common for short messages), passing `data`
            // directly avoids allocating a subarray view.
            buffer.set(pos === 0 && take === len ? data : data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
                processed = true;
            }
        }
        this.length += data.length;
        // Shared schedule buffers only pick up input-derived words inside process(); if everything
        // was buffered without processing, there is nothing to zero.
        if (processed) this.roundClean();
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message, then zero-pad the rest of the block
        buffer[pos++] = 0b10000000;
        buffer.fill(0, pos);
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            buffer.fill(0);
        }
        // `padOffset` reserves the whole length field. For SHA-384/512 the high 64 bits stay zero from
        // the padding fill above, and JS will overflow before user input can make that half non-zero.
        // So we only need to write the low 64 bits here (`length * 8` only scales the exponent of an
        // integer below 2**53, so the split inside the helper stays exact).
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setU64FromNum"])(view, blockLen - 8, this.length * 8, isLE);
        this.process(view, 0);
        // The final block above is processed outside update(), so the shared message-schedule
        // buffers (e.g. SHA256_W) would otherwise retain input-derived words after digest().
        this.roundClean();
        // digest() passes our own `buffer` as `out`; reuse its cached view instead of allocating one.
        const oview = out === buffer ? view : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createView"])(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which must be fused in single op with modulo by JIT
        const outLen = len / 4;
        const state = this.get();
        // Subclass-misconfiguration invariant: outputLen must be 32-bit aligned and fit the state.
        if (len % 4 || outLen > state.length) throw new Error('invalid outputLen');
        for(let i = 0; i < outLen; i++)oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        // Copy before destroy(): subclasses wipe `buffer` during cleanup, but `digest()` must return
        // fresh bytes to the caller.
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneIntoMeta(to) {
        const { buffer, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        // Only partial-block bytes need copying: when `length % blockLen === 0`, `pos === 0` and
        // later `update()` / `digestInto()` overwrite `to.buffer` from the start before reading it.
        if (pos) to.buffer.set(buffer); // Avoid a hot modulo guard.
        return to;
    }
    clone() {
        return this._cloneInto();
    }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
]);
const SHA224_IV = /* @__PURE__ */ Uint32Array.from([
    0xc1059ed8,
    0x367cd507,
    0x3070dd17,
    0xf70e5939,
    0xffc00b31,
    0x68581511,
    0x64f98fa7,
    0xbefa4fa4
]);
const SHA384_IV = /* @__PURE__ */ Uint32Array.from([
    0xcbbb9d5d,
    0xc1059ed8,
    0x629a292a,
    0x367cd507,
    0x9159015a,
    0x3070dd17,
    0x152fecd8,
    0xf70e5939,
    0x67332667,
    0xffc00b31,
    0x8eb44a87,
    0x68581511,
    0xdb0c2e0d,
    0x64f98fa7,
    0x47b5481d,
    0xbefa4fa4
]);
const SHA512_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xf3bcc908,
    0xbb67ae85,
    0x84caa73b,
    0x3c6ef372,
    0xfe94f82b,
    0xa54ff53a,
    0x5f1d36f1,
    0x510e527f,
    0xade682d1,
    0x9b05688c,
    0x2b3e6c1f,
    0x1f83d9ab,
    0xfb41bd6b,
    0x5be0cd19,
    0x137e2179
]);
}),
"[project]/node_modules/@noble/hashes/_u64.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "add3H",
    ()=>add3H,
    "add3L",
    ()=>add3L,
    "add4H",
    ()=>add4H,
    "add4L",
    ()=>add4L,
    "add5H",
    ()=>add5H,
    "add5L",
    ()=>add5L,
    "fromBig",
    ()=>fromBig,
    "fromNumH",
    ()=>fromNumH,
    "fromNumL",
    ()=>fromNumL,
    "rotr32H",
    ()=>rotr32H,
    "rotr32L",
    ()=>rotr32L,
    "rotrBH",
    ()=>rotrBH,
    "rotrBL",
    ()=>rotrBL,
    "rotrSH",
    ()=>rotrSH,
    "rotrSL",
    ()=>rotrSL,
    "setU64FromNum",
    ()=>setU64FromNum,
    "shrSH",
    ()=>shrSH,
    "shrSL",
    ()=>shrSL,
    "split",
    ()=>split,
    "toBig",
    ()=>toBig
]);
const U32_MASK64 = /* @__PURE__ */ (()=>BigInt(2 ** 32 - 1))();
const _32n = /* @__PURE__ */ BigInt(32);
// Split bigint into two 32-bit halves. With `le=true`, returned fields become `{ h: low, l: high
// }` to match little-endian word order rather than the property names.
function fromBig(n, le = false) {
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
// Split bigint list into `[highWords, lowWords]` when `le=false`; with `le=true`, the first array
// holds the low halves because `fromBig(...)` swaps the semantic meaning of `h` and `l`.
function split(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for(let i = 0; i < len; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
// Combine explicit `(high, low)` 32-bit halves into a bigint; `>>> 0` normalizes signed JS
// bitwise results back to uint32 first, and little-endian callers must swap.
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// Split a JS number into u32 halves without a BigInt allocation. Exact only for integers
// `0 <= n < 2**53`; callers use it on byte / bit counters, which JS length math caps far below
// that (an ArrayBuffer cannot exceed 2**53 - 1 bytes).
const fromNumH = (n)=>n / 2 ** 32 | 0;
const fromNumL = (n)=>n >>> 0;
// Drop-in replacement for `view.setBigUint64(byteOffset, BigInt(n), isLE)` without the per-call
// BigInt allocation. Same `n < 2**53` precondition as `fromNumH`/`fromNumL`.
function setU64FromNum(view, byteOffset, n, isLE) {
    const h = fromNumH(n);
    const l = fromNumL(n);
    view.setUint32(byteOffset, isLE ? l : h, isLE);
    view.setUint32(byteOffset + 4, isLE ? h : l, isLE);
}
// High 32-bit half of a 64-bit logical right shift for `s` in `0..31`.
const shrSH = (h, _l, s)=>h >>> s;
// Low 32-bit half of a 64-bit logical right shift, valid for `s` in `1..31`.
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// High 32-bit half of a 64-bit right rotate, valid for `s` in `1..31`.
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
// Low 32-bit half of a 64-bit right rotate, valid for `s` in `1..31`.
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// High 32-bit half of a 64-bit right rotate, valid for `s` in `33..63`; `32` uses `rotr32*`.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
// Low 32-bit half of a 64-bit right rotate, valid for `s` in `33..63`; `32` uses `rotr32*`.
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// High 32-bit half of a 64-bit right rotate for `s === 32`; this is just the swapped low half.
const rotr32H = (_h, l)=>l;
// Low 32-bit half of a 64-bit right rotate for `s === 32`; this is just the swapped high half.
const rotr32L = (h, _l)=>h;
// 64-bit left rotates (rotl*) are not defined here: sha3.ts, their only consumer, keeps
// local copies so V8 inlines them into keccakP.
// Add two split 64-bit words and return the split `{ h, l }` sum.
// JS uses 32-bit signed integers for bitwise operations, so we cannot simply shift the carry out
// of the low sum and instead use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
// Unmasked low-word accumulator for 3-way addition; pass the raw result into `add3H(...)`.
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
// High-word finalize step for 3-way addition; `low` must be the untruncated output of `add3L(...)`.
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
// Unmasked low-word accumulator for 4-way addition; pass the raw result into `add4H(...)`.
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
// High-word finalize step for 4-way addition; `low` must be the untruncated output of `add4L(...)`.
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
// Unmasked low-word accumulator for 5-way addition; pass the raw result into `add5H(...)`.
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
// High-word finalize step for 5-way addition; `low` must be the untruncated output of `add5L(...)`.
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
}),
"[project]/node_modules/@noble/hashes/hkdf.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "expand",
    ()=>expand,
    "extract",
    ()=>extract,
    "hkdf",
    ()=>hkdf
]);
/**
 * HKDF (RFC 5869): extract + expand in one step.
 * See {@link https://soatok.blog/2021/11/17/understanding-hkdf/}.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$hmac$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/hmac.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/utils.js [app-rsc] (ecmascript)");
;
;
function extract(hash, ikm, salt) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ahash"])(hash);
    // NOTE: some libraries treat zero-length array as 'not provided';
    // we don't, since we have undefined as 'not provided'
    // https://github.com/RustCrypto/KDFs/issues/15
    if (salt === undefined) salt = new Uint8Array(hash.outputLen);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$hmac$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hmac"])(hash, salt, ikm);
}
// Shared mutable scratch byte for the RFC 5869 block counter `N`.
// Safe to reuse because `expand()` is synchronous and resets it with `clean(...)` before returning.
const HKDF_COUNTER = /* @__PURE__ */ Uint8Array.of(0);
// Shared RFC 5869 empty string for both `info === undefined` and the first-block `T(0)` input.
const EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash, prk, info, length = 32, _recycled) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ahash"])(hash);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["anumber"])(length, 'length');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(prk, undefined, 'prk');
    const olen = hash.outputLen;
    // RFC 5869 §2.3: PRK is "a pseudorandom key of at least HashLen octets".
    if (prk.length < olen) throw new Error('"prk" must be at least HashLen octets');
    // RFC 5869 §2.3 only bounds `L` by `<= 255*HashLen`; `L=0` is valid and yields empty OKM.
    if (length > 255 * olen) throw new Error('Length must be <= 255*HashLen');
    const blocks = Math.ceil(length / olen);
    if (info === undefined) info = EMPTY_BUFFER;
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(info, undefined, 'info');
    if (!blocks) {
        if (_recycled) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(prk); // Full hkdf() owns this intermediate PRK.
        return new Uint8Array();
    }
    // first L(ength) octets of T
    // The private PRK can become both T and a one-block result after HMAC consumes the key.
    const okm = _recycled && blocks === 1 ? prk : new Uint8Array(blocks * olen);
    const { iHash, oHash } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$hmac$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hmac"].create(hash, prk);
    // Driving them directly also skips `_HMAC.digestInto`'s per-digest destroy.
    const T = _recycled ? prk : new Uint8Array(olen);
    // Full hkdf() donates one destroyed extract hash; standalone creates one alternating worker.
    const worker = blocks > 1 ? _recycled?.iHash || hash.create() : undefined;
    for(let counter = 0; counter < blocks - 1; counter++){
        HKDF_COUNTER[0] = counter + 1;
        const iWork = iHash._cloneInto(worker);
        // T(0) = empty string (zero length)
        // T(N) = HMAC-Hash(PRK, T(N-1) | info | N)
        if (counter) iWork.update(T);
        iWork.update(info).update(HKDF_COUNTER).digestInto(T);
        oHash._cloneInto(worker).update(T).digestInto(T);
        okm.set(T, olen * counter);
    }
    // Midstates are key-equivalent: they allow computing HMAC(prk, ...) for any message.
    HKDF_COUNTER[0] = blocks; // Final block consumes them; retain worker for cleanup.
    if (blocks > 1) iHash.update(T);
    iHash.update(info).update(HKDF_COUNTER).digestInto(T);
    oHash.update(T).digestInto(T);
    okm.set(T, olen * (blocks - 1));
    iHash.destroy(); // Raw digests may leave key-derived base/worker state; wipe all explicitly.
    oHash.destroy();
    worker?.destroy();
    if (T !== okm) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(T); // Wipe private T/PRK; standalone preserves caller-owned PRK.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(HKDF_COUNTER);
    // Exact fit: return without the extra copy.
    if (length === okm.length) return okm;
    // Copy the requested prefix, then wipe the full buffer: its tail holds
    // up to HashLen-1 bytes of derived key material past `length`.
    const res = okm.slice(0, length);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(okm);
    return res;
}
const hkdf = (hash, ikm, salt, info, length)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ahash"])(hash);
    if (salt === undefined) salt = new Uint8Array(hash.outputLen);
    const HMAC = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$hmac$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hmac"].create(hash, salt).update(ikm);
    // The intermediate PRK is secret key material; wipe it instead of
    // leaving it for GC.
    return expand(hash, HMAC.digest(), info, length, HMAC); // expand() owns and consumes it.
};
}),
"[project]/node_modules/@noble/hashes/hmac.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_HMAC",
    ()=>_HMAC,
    "hmac",
    ()=>hmac
]);
/**
 * HMAC: RFC2104 message authentication code.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/utils.js [app-rsc] (ecmascript)");
;
class _HMAC {
    oHash;
    iHash;
    blockLen;
    outputLen;
    canXOF = false;
    finished = false;
    destroyed = false;
    constructor(hash, key){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ahash"])(hash);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abytes"])(key, undefined, 'key');
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function') throw new Error('expected Hash instance');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of the first block) of the outer hash here,
        // we can re-use it between multiple calls via clone.
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36 ^ 0x5c;
        this.oHash.update(pad);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(pad);
    }
    update(buf) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aexists"])(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        this.finished = true;
        const buf = out.subarray(0, this.outputLen);
        // Reuse the first outputLen bytes for the inner digest; the outer hash consumes them before
        // overwriting that same prefix with the final tag, leaving any oversized tail untouched.
        this.iHash.digestInto(buf);
        this.oHash.update(buf);
        this.oHash.digestInto(buf);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since the key
        // is already in state and we don't know it.
        to ||= Object.create(Object.getPrototypeOf(this), {});
        const { oHash, iHash, finished, destroyed, blockLen, outputLen, canXOF } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.canXOF = canXOF;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
}
const hmac = /* @__PURE__ */ (()=>{
    const hmac_ = (hash, key, message)=>new _HMAC(hash, key).update(message).digest();
    hmac_.create = (hash, key)=>new _HMAC(hash, key);
    return hmac_;
})();
}),
"[project]/node_modules/@noble/hashes/sha2.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_SHA224",
    ()=>_SHA224,
    "_SHA256",
    ()=>_SHA256,
    "_SHA384",
    ()=>_SHA384,
    "_SHA512",
    ()=>_SHA512,
    "_SHA512_224",
    ()=>_SHA512_224,
    "_SHA512_256",
    ()=>_SHA512_256,
    "sha224",
    ()=>sha224,
    "sha256",
    ()=>sha256,
    "sha384",
    ()=>sha384,
    "sha512",
    ()=>sha512,
    "sha512_224",
    ()=>sha512_224,
    "sha512_256",
    ()=>sha512_256
]);
/**
 * SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
 * SHA256 is the fastest hash implementable in JS, even faster than Blake3.
 * Check out {@link https://www.rfc-editor.org/rfc/rfc4634 | RFC 4634} and
 * {@link https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | FIPS 180-4}.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/_md.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/_u64.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/utils.js [app-rsc] (ecmascript)");
;
;
;
/**
 * SHA-224 / SHA-256 round constants from RFC 6234 §5.1: the first 32 bits
 * of the cube roots of the first 64 primes (2..311).
 */ // prettier-ignore
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
/** Reusable SHA-224 / SHA-256 message schedule buffer `W_t` from RFC 6234 §6.2 step 1. */ const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
/** Internal SHA-224 / SHA-256 compression engine from RFC 6234 §6.2. */ class SHA2_32B extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HashMD"] {
    // We cannot use array here since array allows indexing by variable
    // which means optimizer/compiler cannot use registers.
    // Numeric initializers matter: starting the fields as `undefined` changes
    // V8's field representation and makes sha256 3x slower (measured).
    A = 0;
    B = 0;
    C = 0;
    D = 0;
    E = 0;
    F = 0;
    G = 0;
    H = 0;
    constructor(outputLen, IV){
        super(64, outputLen, 8, false);
        this.A = IV[0] | 0;
        this.B = IV[1] | 0;
        this.C = IV[2] | 0;
        this.D = IV[3] | 0;
        this.E = IV[4] | 0;
        this.F = IV[5] | 0;
        this.G = IV[6] | 0;
        this.H = IV[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
        ];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    _cloneInto(to) {
        (to ||= new this.constructor()).set(...this.get());
        return this._cloneIntoMeta(to);
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4)SHA256_W[i] = view.getUint32(offset, false);
        for(let i = 16; i < 64; i++){
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(W15, 7) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(W15, 18) ^ W15 >>> 3;
            const s1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(W2, 17) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for(let i = 0; i < 64; i++){
            const sigma1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(E, 6) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(E, 11) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(E, 25);
            const T1 = H + sigma1 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Chi"])(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(A, 2) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(A, 13) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotr"])(A, 22);
            const T2 = sigma0 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Maj"])(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(SHA256_W);
    }
    destroy() {
        // HashMD callers route post-destroy usability through `destroyed`; zeroizing alone still leaves
        // update()/digest() callable on reused instances.
        this.destroyed = true;
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
    }
}
class _SHA256 extends SHA2_32B {
    constructor(){
        super(32, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SHA256_IV"]);
    }
}
class _SHA224 extends SHA2_32B {
    constructor(){
        super(28, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SHA224_IV"]);
    }
}
// SHA2-512 is slower than sha256 in js because u64 operations are slow.
// SHA-384 / SHA-512 round constants from RFC 6234 §5.2:
// 80 full 64-bit words split into high/low halves.
// prettier-ignore
const K512 = /* @__PURE__ */ (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["split"]([
        '0x428a2f98d728ae22',
        '0x7137449123ef65cd',
        '0xb5c0fbcfec4d3b2f',
        '0xe9b5dba58189dbbc',
        '0x3956c25bf348b538',
        '0x59f111f1b605d019',
        '0x923f82a4af194f9b',
        '0xab1c5ed5da6d8118',
        '0xd807aa98a3030242',
        '0x12835b0145706fbe',
        '0x243185be4ee4b28c',
        '0x550c7dc3d5ffb4e2',
        '0x72be5d74f27b896f',
        '0x80deb1fe3b1696b1',
        '0x9bdc06a725c71235',
        '0xc19bf174cf692694',
        '0xe49b69c19ef14ad2',
        '0xefbe4786384f25e3',
        '0x0fc19dc68b8cd5b5',
        '0x240ca1cc77ac9c65',
        '0x2de92c6f592b0275',
        '0x4a7484aa6ea6e483',
        '0x5cb0a9dcbd41fbd4',
        '0x76f988da831153b5',
        '0x983e5152ee66dfab',
        '0xa831c66d2db43210',
        '0xb00327c898fb213f',
        '0xbf597fc7beef0ee4',
        '0xc6e00bf33da88fc2',
        '0xd5a79147930aa725',
        '0x06ca6351e003826f',
        '0x142929670a0e6e70',
        '0x27b70a8546d22ffc',
        '0x2e1b21385c26c926',
        '0x4d2c6dfc5ac42aed',
        '0x53380d139d95b3df',
        '0x650a73548baf63de',
        '0x766a0abb3c77b2a8',
        '0x81c2c92e47edaee6',
        '0x92722c851482353b',
        '0xa2bfe8a14cf10364',
        '0xa81a664bbc423001',
        '0xc24b8b70d0f89791',
        '0xc76c51a30654be30',
        '0xd192e819d6ef5218',
        '0xd69906245565a910',
        '0xf40e35855771202a',
        '0x106aa07032bbd1b8',
        '0x19a4c116b8d2d0c8',
        '0x1e376c085141ab53',
        '0x2748774cdf8eeb99',
        '0x34b0bcb5e19b48a8',
        '0x391c0cb3c5c95a63',
        '0x4ed8aa4ae3418acb',
        '0x5b9cca4f7763e373',
        '0x682e6ff3d6b2b8a3',
        '0x748f82ee5defb2fc',
        '0x78a5636f43172f60',
        '0x84c87814a1f0ab72',
        '0x8cc702081a6439ec',
        '0x90befffa23631e28',
        '0xa4506cebde82bde9',
        '0xbef9a3f7b2c67915',
        '0xc67178f2e372532b',
        '0xca273eceea26619c',
        '0xd186b8c721c0c207',
        '0xeada7dd6cde0eb1e',
        '0xf57d4f7fee6ed178',
        '0x06f067aa72176fba',
        '0x0a637dc5a2c898a6',
        '0x113f9804bef90dae',
        '0x1b710b35131c471b',
        '0x28db77f523047d84',
        '0x32caab7b40c72493',
        '0x3c9ebe0a15c9bebc',
        '0x431d67c49c100d4c',
        '0x4cc5d4becb3e42b6',
        '0x597f299cfc657e2a',
        '0x5fcb6fab3ad6faec',
        '0x6c44198c4a475817'
    ].map((n)=>BigInt(n))))();
const SHA512_Kh = /* @__PURE__ */ (()=>K512[0])();
const SHA512_Kl = /* @__PURE__ */ (()=>K512[1])();
// Reusable high-half schedule buffer for the RFC 6234 §6.4 64-bit `W_t` words.
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
// Reusable low-half schedule buffer for the RFC 6234 §6.4 64-bit `W_t` words.
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
/** Internal SHA-384 / SHA-512 compression engine from RFC 6234 §6.4. */ class SHA2_64B extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HashMD"] {
    // We cannot use array here since array allows indexing by variable
    // which means optimizer/compiler cannot use registers.
    // h -- high 32 bits, l -- low 32 bits
    // Numeric initializers matter: starting the fields as `undefined` changes
    // V8's field representation and slows hashing down (measured on sha256).
    Ah = 0;
    Al = 0;
    Bh = 0;
    Bl = 0;
    Ch = 0;
    Cl = 0;
    Dh = 0;
    Dl = 0;
    Eh = 0;
    El = 0;
    Fh = 0;
    Fl = 0;
    Gh = 0;
    Gl = 0;
    Hh = 0;
    Hl = 0;
    constructor(outputLen, IV){
        super(128, outputLen, 16, false);
        this.Ah = IV[0] | 0;
        this.Al = IV[1] | 0;
        this.Bh = IV[2] | 0;
        this.Bl = IV[3] | 0;
        this.Ch = IV[4] | 0;
        this.Cl = IV[5] | 0;
        this.Dh = IV[6] | 0;
        this.Dl = IV[7] | 0;
        this.Eh = IV[8] | 0;
        this.El = IV[9] | 0;
        this.Fh = IV[10] | 0;
        this.Fl = IV[11] | 0;
        this.Gh = IV[12] | 0;
        this.Gl = IV[13] | 0;
        this.Hh = IV[14] | 0;
        this.Hl = IV[15] | 0;
    }
    // prettier-ignore
    get() {
        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        return [
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
        ];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
        this.Ah = Ah | 0;
        this.Al = Al | 0;
        this.Bh = Bh | 0;
        this.Bl = Bl | 0;
        this.Ch = Ch | 0;
        this.Cl = Cl | 0;
        this.Dh = Dh | 0;
        this.Dl = Dl | 0;
        this.Eh = Eh | 0;
        this.El = El | 0;
        this.Fh = Fh | 0;
        this.Fl = Fl | 0;
        this.Gh = Gh | 0;
        this.Gl = Gl | 0;
        this.Hh = Hh | 0;
        this.Hl = Hl | 0;
    }
    _cloneInto(to) {
        (to ||= new this.constructor()).set(...this.get());
        return this._cloneIntoMeta(to);
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 64 words w[16..79] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4){
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
        }
        for(let i = 16; i < 80; i++){
            // s0 := (w[i-15] rightrotate 1) xor (w[i-15] rightrotate 8) xor (w[i-15] rightshift 7)
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSH"](W15h, W15l, 1) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSH"](W15h, W15l, 8) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shrSH"](W15h, W15l, 7);
            const s0l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSL"](W15h, W15l, 1) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSL"](W15h, W15l, 8) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shrSL"](W15h, W15l, 7);
            // s1 := (w[i-2] rightrotate 19) xor (w[i-2] rightrotate 61) xor (w[i-2] rightshift 6)
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSH"](W2h, W2l, 19) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBH"](W2h, W2l, 61) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shrSH"](W2h, W2l, 6);
            const s1l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSL"](W2h, W2l, 19) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBL"](W2h, W2l, 61) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shrSL"](W2h, W2l, 6);
            // SHA512_W[i] = s0 + s1 + SHA512_W[i - 7] + SHA512_W[i - 16];
            const SUMl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add4L"](s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add4H"](SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
        }
        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        // Compression function main loop, 80 rounds
        for(let i = 0; i < 80; i++){
            // S1 := (e rightrotate 14) xor (e rightrotate 18) xor (e rightrotate 41)
            const sigma1h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSH"](Eh, El, 14) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSH"](Eh, El, 18) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBH"](Eh, El, 41);
            const sigma1l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSL"](Eh, El, 14) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSL"](Eh, El, 18) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBL"](Eh, El, 41);
            //const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            // T1 = H + sigma1 + Chi(E, F, G) + SHA512_K[i] + SHA512_W[i]
            // prettier-ignore
            const T1ll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add5L"](Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add5H"](T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            // S0 := (a rightrotate 28) xor (a rightrotate 34) xor (a rightrotate 39)
            const sigma0h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSH"](Ah, Al, 28) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBH"](Ah, Al, 34) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBH"](Ah, Al, 39);
            const sigma0l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrSL"](Ah, Al, 28) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBL"](Ah, Al, 34) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rotrBL"](Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add3L"](T1l, sigma0l, MAJl);
            Ah = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add3H"](All, T1h, sigma0h, MAJh);
            Al = All | 0;
        }
        // Add the compressed chunk to the current hash value
        ({ h: Ah, l: Al } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
        ({ h: Bh, l: Bl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
        ({ h: Ch, l: Cl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
        ({ h: Dh, l: Dl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
        ({ h: Eh, l: El } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Eh | 0, this.El | 0, Eh | 0, El | 0));
        ({ h: Fh, l: Fl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
        ({ h: Gh, l: Gl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
        ({ h: Hh, l: Hl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["add"](this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(SHA512_W_H, SHA512_W_L);
    }
    destroy() {
        // HashMD callers route post-destroy usability through `destroyed`; zeroizing alone still leaves
        // update()/digest() callable on reused instances.
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
class _SHA512 extends SHA2_64B {
    constructor(){
        super(64, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SHA512_IV"]);
    }
}
class _SHA384 extends SHA2_64B {
    constructor(){
        super(48, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_md$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SHA384_IV"]);
    }
}
/**
 * Truncated SHA512/256 and SHA512/224.
 * SHA512_IV is XORed with 0xa5a5a5a5a5a5a5a5, then used as "intermediary" IV of SHA512/t.
 * Then t hashes string to produce result IV.
 * See the repo-side derivation recipe in `test/misc/sha2-gen-iv.js`.
 * These IV literals are checked against that script rather than a dedicated
 * local RFC section.
 */ /** SHA-512/224 IV derived by the SHA-512/t recipe in `test/misc/sha2-gen-iv.js` and
 * stored as sixteen big-endian 32-bit halves. */ const T224_IV = /* @__PURE__ */ Uint32Array.from([
    0x8c3d37c8,
    0x19544da2,
    0x73e19966,
    0x89dcd4d6,
    0x1dfab7ae,
    0x32ff9c82,
    0x679dd514,
    0x582f9fcf,
    0x0f6d2b69,
    0x7bd44da8,
    0x77e36f73,
    0x04c48942,
    0x3f9d85a8,
    0x6a1d36c8,
    0x1112e6ad,
    0x91d692a1
]);
/** SHA-512/256 IV derived by the SHA-512/t recipe in `test/misc/sha2-gen-iv.js` and
 * stored as sixteen big-endian 32-bit halves. */ const T256_IV = /* @__PURE__ */ Uint32Array.from([
    0x22312194,
    0xfc2bf72c,
    0x9f555fa3,
    0xc84c64c2,
    0x2393b86b,
    0x6f53b151,
    0x96387719,
    0x5940eabd,
    0x96283ee2,
    0xa88effe3,
    0xbe5e1e25,
    0x53863992,
    0x2b0199fc,
    0x2c85b8aa,
    0x0eb72ddc,
    0x81c52ca2
]);
class _SHA512_224 extends SHA2_64B {
    constructor(){
        super(28, T224_IV);
    }
}
class _SHA512_256 extends SHA2_64B {
    constructor(){
        super(32, T256_IV);
    }
}
const sha256 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHasher"])(()=>new _SHA256(), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["oidNist"])(0x01));
const sha224 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHasher"])(()=>new _SHA224(), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["oidNist"])(0x04));
const sha512 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHasher"])(()=>new _SHA512(), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["oidNist"])(0x03));
const sha384 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHasher"])(()=>new _SHA384(), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["oidNist"])(0x02));
const sha512_256 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHasher"])(()=>new _SHA512_256(), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["oidNist"])(0x06));
const sha512_224 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHasher"])(()=>new _SHA512_224(), /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["oidNist"])(0x05));
}),
"[project]/node_modules/@noble/hashes/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
 * @param a - value to test
 * @returns `true` when the value is a Uint8Array-compatible view.
 * @example
 * Check whether a value is a Uint8Array-compatible view.
 * ```ts
 * isBytes(new Uint8Array([1, 2, 3]));
 * ```
 */ __turbopack_context__.s([
    "abool",
    ()=>abool,
    "abytes",
    ()=>abytes,
    "aexists",
    ()=>aexists,
    "ahash",
    ()=>ahash,
    "anumber",
    ()=>anumber,
    "aoutput",
    ()=>aoutput,
    "asyncLoop",
    ()=>asyncLoop,
    "byteSwap",
    ()=>byteSwap,
    "byteSwap32",
    ()=>byteSwap32,
    "bytesToHex",
    ()=>bytesToHex,
    "checkOpts",
    ()=>checkOpts,
    "clean",
    ()=>clean,
    "concatBytes",
    ()=>concatBytes,
    "copyBytes",
    ()=>copyBytes,
    "createHasher",
    ()=>createHasher,
    "createView",
    ()=>createView,
    "hexToBytes",
    ()=>hexToBytes,
    "isBytes",
    ()=>isBytes,
    "isLE",
    ()=>isLE,
    "kdfInputToBytes",
    ()=>kdfInputToBytes,
    "nextTick",
    ()=>nextTick,
    "oidNist",
    ()=>oidNist,
    "randomBytes",
    ()=>randomBytes,
    "rotl",
    ()=>rotl,
    "rotr",
    ()=>rotr,
    "swap32IfBE",
    ()=>swap32IfBE,
    "swap8IfBE",
    ()=>swap8IfBE,
    "u32",
    ()=>u32,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes,
    "validateObject",
    ()=>validateObject
]);
function isBytes(a) {
    // Plain `instanceof Uint8Array` is too strict for some Buffer / proxy / cross-realm cases.
    // The fallback still requires a real ArrayBuffer view, so plain
    // JSON-deserialized `{ constructor: ... }` spoofing is rejected, and
    // `BYTES_PER_ELEMENT === 1` keeps the fallback on byte-oriented views.
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array' && 'BYTES_PER_ELEMENT' in a && a.BYTES_PER_ELEMENT === 1;
}
// Shared error-message prefix builder. Only called on throw paths, so assert
// success paths never pay for the string concatenation.
const atitle = (title)=>title ? `"${title}" ` : '';
function anumber(n, title = '') {
    if (typeof n !== 'number') throw new TypeError(atitle(title) + 'expected number, got ' + typeof n);
    if (!Number.isSafeInteger(n) || n < 0) throw new RangeError(atitle(title) + 'expected integer >= 0, got ' + n);
    return n;
}
function abool(value, title = '') {
    if (typeof value !== 'boolean') throw new TypeError(atitle(title) + 'expected boolean, got type=' + typeof value);
    return value;
}
function abytes(value, length, title = '') {
    // Success path first: this runs at the start of every update() / digestInto(), and the
    // common `abytes(data)` form must not pay for length handling it does not use.
    if (isBytes(value) && (length === undefined || value.length === length)) return value;
    // Error path: recompute freely to build the exact message.
    if (length !== undefined) anumber(length, 'length');
    const bytes = isBytes(value);
    const ofLen = length !== undefined ? ` of length ${length}` : '';
    const got = bytes ? `length=${value.length}` : `type=${typeof value}`;
    const message = atitle(title) + 'expected Uint8Array' + ofLen + ', got ' + got;
    if (!bytes) throw new TypeError(message);
    throw new RangeError(message);
}
function copyBytes(bytes) {
    // `Uint8Array.from(...)` would also accept arrays / other typed arrays. Keep this helper strict
    // because callers use it at byte-validation boundaries before mutating the detached copy.
    return Uint8Array.from(abytes(bytes));
}
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function') throw new TypeError('expected hash wrapped by utils.createHasher');
    anumber(h.outputLen);
    anumber(h.blockLen);
    // HMAC and KDF callers treat these as real byte lengths; allowing zero lets fake wrappers pass
    // validation and can produce empty outputs instead of failing fast.
    if (h.outputLen < 1 || h.blockLen < 1) throw new Error('hash blockLen / outputLen must be >= 1');
}
const aobject = (value, label)=>{
    if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new TypeError((label === 'object' ? '' : `"${label}" `) + 'expected object, got type=' + typeof value);
};
function aexists(instance, checkFinished = true) {
    // Runs on every update()/digestInto(); the flags are library-owned booleans, so only their
    // truthiness is checked - re-validating their type per call was pure hot-path overhead.
    if (instance.destroyed) throw new Error('hash was destroyed');
    if (checkFinished && instance.finished) throw new Error('digest() was already called');
}
function aoutput(out, instance) {
    abytes(out, undefined, 'output');
    // `outputLen` is a library-owned readonly number; the negated comparison keeps failing fast
    // when it is missing/NaN (comparisons with undefined/NaN are false) without an anumber() call.
    const min = instance.outputLen;
    if (!(out.length >= min)) {
        throw new RangeError('"output" expected length >= ' + min);
    }
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
function byteSwap(word) {
    return word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
}
const swap8IfBE = isLE ? (n)=>n : (n)=>byteSwap(n) >>> 0;
function byteSwap32(arr) {
    for(let i = 0; i < arr.length; i++){
        arr[i] = byteSwap(arr[i]);
    }
    return arr;
}
const swap32IfBE = isLE ? (u)=>u : byteSwap32;
// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
const hasHexBuiltin = /* @__PURE__ */ (()=>// @ts-ignore
    typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    abytes(bytes);
    // @ts-ignore
    if (hasHexBuiltin) return bytes.toHex();
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// Strict ASCII nibble parser: non-ASCII hex lookalikes are rejected as undefined.
// ASCII codes: '0'..'9' = 48..57, 'A'..'F' = 65..70, 'a'..'f' = 97..102.
// prettier-ignore
function asciiToBase16(ch) {
    return ch >= 48 && ch <= 57 ? ch - 48 // '2' => 50-48
     : ch >= 65 && ch <= 70 ? ch - (65 - 10) // 'B' => 66-(65-10)
     : ch >= 97 && ch <= 102 ? ch - (97 - 10) // 'b' => 98-(97-10)
     : undefined;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new TypeError('hex string expected, got ' + typeof hex);
    if (hasHexBuiltin) {
        try {
            return Uint8Array.fromHex(hex);
        } catch (error) {
            if (error instanceof SyntaxError) throw new RangeError(error.message);
            throw error;
        }
    }
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new RangeError('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi)); // parse first char, multiply it by 16
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1)); // parse second char
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new RangeError('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // example: 'A9' => 10*16 + 9
    }
    return array;
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    anumber(iters, 'iters');
    anumber(tick, 'tick');
    if (typeof cb !== 'function') throw new TypeError('callback must be a function');
    // Callback is synchronous by contract; asyncLoop only yields between sync work windows.
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        // Track only synchronous work time; scheduler delay after yielding is outside our budget.
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new TypeError('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function kdfInputToBytes(data, errorTitle = '') {
    if (typeof data === 'string') return utf8ToBytes(data);
    return abytes(data, undefined, errorTitle);
}
function concatBytes(...arrays) {
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
const validateObject = (object, fields = {}, optFields = {}, title = 'object')=>{
    aobject(object, title);
    aobject(fields, 'fields');
    aobject(optFields, 'optFields');
    function checkField(fieldName, expectedType, isOpt) {
        const label = title === 'object' ? `param "${String(fieldName)}"` : `"${title}.${String(fieldName)}"`;
        // Config fields must be explicit own properties. Optional inherited values are rejected too
        // because callers keep reading the same options object after validation.
        const val = object[fieldName];
        // Runtime objects such as Field instances intentionally satisfy required method slots
        // via their shared prototype.
        if (!Object.hasOwn(object, fieldName) && (isOpt ? val !== undefined : expectedType !== 'function')) {
            throw new TypeError(`${label} is invalid: expected own property`);
        }
        if (isOpt && val === undefined) return;
        const current = typeof val;
        if (current !== expectedType || val === null) throw new TypeError(`${label} is invalid: expected ${expectedType}, got ${current}`);
    }
    const iter = (f, isOpt)=>Object.entries(f).forEach(([k, v])=>checkField(k, v, isOpt));
    iter(fields, false);
    iter(optFields, true);
};
function checkOpts(defaults, opts, title = 'opts') {
    aobject(defaults, 'defaults');
    if (opts !== undefined) aobject(opts, title);
    const merged = Object.assign(defaults, opts);
    return merged;
}
function createHasher(hashCons, info = {}) {
    if (typeof hashCons !== 'function') throw new TypeError('"hashCons" expected function, got type=' + typeof hashCons);
    info = checkOpts({}, info, 'info');
    const hashC = (msg, opts)=>hashCons(opts).update(msg).digest();
    const tmp = hashCons(undefined);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.canXOF = tmp.canXOF;
    hashC.create = (opts)=>hashCons(opts);
    Object.assign(hashC, info);
    return Object.freeze(hashC);
}
function randomBytes(bytesLength = 32) {
    // Match the repo's other length-taking helpers instead of relying on Uint8Array coercion.
    anumber(bytesLength, 'bytesLength');
    const cr = typeof globalThis === 'object' ? globalThis.crypto : null;
    if (typeof cr?.getRandomValues !== 'function') throw new Error('crypto.getRandomValues must be defined');
    // Web Cryptography API Level 2 §10.1.1:
    // if `byteLength > 65536`, throw `QuotaExceededError`.
    // Keep the guard explicit so callers can see the quota in code
    // instead of discovering it by reading the spec or host errors.
    // This wrapper surfaces the same quota as a stable library RangeError.
    if (bytesLength > 65536) throw new RangeError(`"bytesLength" expected <= 65536, got ${bytesLength}`);
    return cr.getRandomValues(new Uint8Array(bytesLength));
}
const oidNist = (suffix)=>({
        // Current NIST hashAlgs suffixes used here fit in one DER subidentifier octet.
        // Larger suffix values would need base-128 OID encoding and a different length byte.
        oid: Uint8Array.from([
            0x06,
            0x09,
            0x60,
            0x86,
            0x48,
            0x01,
            0x65,
            0x03,
            0x04,
            0x02,
            suffix
        ])
    });
}),
"[project]/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ //----------------------------------------------------------------------------------------------------------
// DO NOT EDIT, this is an Auto-generated file from scripts/semconv/templates/registry/stable/attributes.ts.j2
//----------------------------------------------------------------------------------------------------------
/**
 * ASP.NET Core exception middleware handling result.
 *
 * @example handled
 * @example unhandled
 */ __turbopack_context__.s([
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED,
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED,
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED,
    "ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED",
    ()=>ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER,
    "ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED",
    ()=>ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED,
    "ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE",
    ()=>ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE,
    "ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS",
    ()=>ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS,
    "ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT",
    ()=>ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT,
    "ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE",
    ()=>ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE,
    "ATTR_ASPNETCORE_RATE_LIMITING_POLICY",
    ()=>ATTR_ASPNETCORE_RATE_LIMITING_POLICY,
    "ATTR_ASPNETCORE_RATE_LIMITING_RESULT",
    ()=>ATTR_ASPNETCORE_RATE_LIMITING_RESULT,
    "ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED",
    ()=>ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED,
    "ATTR_ASPNETCORE_ROUTING_IS_FALLBACK",
    ()=>ATTR_ASPNETCORE_ROUTING_IS_FALLBACK,
    "ATTR_ASPNETCORE_ROUTING_MATCH_STATUS",
    ()=>ATTR_ASPNETCORE_ROUTING_MATCH_STATUS,
    "ATTR_ASPNETCORE_USER_IS_AUTHENTICATED",
    ()=>ATTR_ASPNETCORE_USER_IS_AUTHENTICATED,
    "ATTR_CLIENT_ADDRESS",
    ()=>ATTR_CLIENT_ADDRESS,
    "ATTR_CLIENT_PORT",
    ()=>ATTR_CLIENT_PORT,
    "ATTR_CODE_COLUMN_NUMBER",
    ()=>ATTR_CODE_COLUMN_NUMBER,
    "ATTR_CODE_FILE_PATH",
    ()=>ATTR_CODE_FILE_PATH,
    "ATTR_CODE_FUNCTION_NAME",
    ()=>ATTR_CODE_FUNCTION_NAME,
    "ATTR_CODE_LINE_NUMBER",
    ()=>ATTR_CODE_LINE_NUMBER,
    "ATTR_CODE_STACKTRACE",
    ()=>ATTR_CODE_STACKTRACE,
    "ATTR_CONTAINER_ID",
    ()=>ATTR_CONTAINER_ID,
    "ATTR_CONTAINER_IMAGE_NAME",
    ()=>ATTR_CONTAINER_IMAGE_NAME,
    "ATTR_CONTAINER_IMAGE_REPO_DIGESTS",
    ()=>ATTR_CONTAINER_IMAGE_REPO_DIGESTS,
    "ATTR_CONTAINER_IMAGE_TAGS",
    ()=>ATTR_CONTAINER_IMAGE_TAGS,
    "ATTR_DB_COLLECTION_NAME",
    ()=>ATTR_DB_COLLECTION_NAME,
    "ATTR_DB_NAMESPACE",
    ()=>ATTR_DB_NAMESPACE,
    "ATTR_DB_OPERATION_BATCH_SIZE",
    ()=>ATTR_DB_OPERATION_BATCH_SIZE,
    "ATTR_DB_OPERATION_NAME",
    ()=>ATTR_DB_OPERATION_NAME,
    "ATTR_DB_QUERY_SUMMARY",
    ()=>ATTR_DB_QUERY_SUMMARY,
    "ATTR_DB_QUERY_TEXT",
    ()=>ATTR_DB_QUERY_TEXT,
    "ATTR_DB_RESPONSE_STATUS_CODE",
    ()=>ATTR_DB_RESPONSE_STATUS_CODE,
    "ATTR_DB_STORED_PROCEDURE_NAME",
    ()=>ATTR_DB_STORED_PROCEDURE_NAME,
    "ATTR_DB_SYSTEM_NAME",
    ()=>ATTR_DB_SYSTEM_NAME,
    "ATTR_DEPLOYMENT_ENVIRONMENT_NAME",
    ()=>ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
    "ATTR_DOTNET_GC_HEAP_GENERATION",
    ()=>ATTR_DOTNET_GC_HEAP_GENERATION,
    "ATTR_ERROR_TYPE",
    ()=>ATTR_ERROR_TYPE,
    "ATTR_EXCEPTION_ESCAPED",
    ()=>ATTR_EXCEPTION_ESCAPED,
    "ATTR_EXCEPTION_MESSAGE",
    ()=>ATTR_EXCEPTION_MESSAGE,
    "ATTR_EXCEPTION_STACKTRACE",
    ()=>ATTR_EXCEPTION_STACKTRACE,
    "ATTR_EXCEPTION_TYPE",
    ()=>ATTR_EXCEPTION_TYPE,
    "ATTR_HTTP_REQUEST_HEADER",
    ()=>ATTR_HTTP_REQUEST_HEADER,
    "ATTR_HTTP_REQUEST_METHOD",
    ()=>ATTR_HTTP_REQUEST_METHOD,
    "ATTR_HTTP_REQUEST_METHOD_ORIGINAL",
    ()=>ATTR_HTTP_REQUEST_METHOD_ORIGINAL,
    "ATTR_HTTP_REQUEST_RESEND_COUNT",
    ()=>ATTR_HTTP_REQUEST_RESEND_COUNT,
    "ATTR_HTTP_RESPONSE_HEADER",
    ()=>ATTR_HTTP_RESPONSE_HEADER,
    "ATTR_HTTP_RESPONSE_STATUS_CODE",
    ()=>ATTR_HTTP_RESPONSE_STATUS_CODE,
    "ATTR_HTTP_ROUTE",
    ()=>ATTR_HTTP_ROUTE,
    "ATTR_JVM_GC_ACTION",
    ()=>ATTR_JVM_GC_ACTION,
    "ATTR_JVM_GC_NAME",
    ()=>ATTR_JVM_GC_NAME,
    "ATTR_JVM_MEMORY_POOL_NAME",
    ()=>ATTR_JVM_MEMORY_POOL_NAME,
    "ATTR_JVM_MEMORY_TYPE",
    ()=>ATTR_JVM_MEMORY_TYPE,
    "ATTR_JVM_THREAD_DAEMON",
    ()=>ATTR_JVM_THREAD_DAEMON,
    "ATTR_JVM_THREAD_STATE",
    ()=>ATTR_JVM_THREAD_STATE,
    "ATTR_K8S_CLUSTER_NAME",
    ()=>ATTR_K8S_CLUSTER_NAME,
    "ATTR_K8S_CLUSTER_UID",
    ()=>ATTR_K8S_CLUSTER_UID,
    "ATTR_K8S_CONTAINER_NAME",
    ()=>ATTR_K8S_CONTAINER_NAME,
    "ATTR_K8S_CONTAINER_RESTART_COUNT",
    ()=>ATTR_K8S_CONTAINER_RESTART_COUNT,
    "ATTR_K8S_CRONJOB_ANNOTATION",
    ()=>ATTR_K8S_CRONJOB_ANNOTATION,
    "ATTR_K8S_CRONJOB_LABEL",
    ()=>ATTR_K8S_CRONJOB_LABEL,
    "ATTR_K8S_CRONJOB_NAME",
    ()=>ATTR_K8S_CRONJOB_NAME,
    "ATTR_K8S_CRONJOB_UID",
    ()=>ATTR_K8S_CRONJOB_UID,
    "ATTR_K8S_DAEMONSET_ANNOTATION",
    ()=>ATTR_K8S_DAEMONSET_ANNOTATION,
    "ATTR_K8S_DAEMONSET_LABEL",
    ()=>ATTR_K8S_DAEMONSET_LABEL,
    "ATTR_K8S_DAEMONSET_NAME",
    ()=>ATTR_K8S_DAEMONSET_NAME,
    "ATTR_K8S_DAEMONSET_UID",
    ()=>ATTR_K8S_DAEMONSET_UID,
    "ATTR_K8S_DEPLOYMENT_ANNOTATION",
    ()=>ATTR_K8S_DEPLOYMENT_ANNOTATION,
    "ATTR_K8S_DEPLOYMENT_LABEL",
    ()=>ATTR_K8S_DEPLOYMENT_LABEL,
    "ATTR_K8S_DEPLOYMENT_NAME",
    ()=>ATTR_K8S_DEPLOYMENT_NAME,
    "ATTR_K8S_DEPLOYMENT_UID",
    ()=>ATTR_K8S_DEPLOYMENT_UID,
    "ATTR_K8S_JOB_ANNOTATION",
    ()=>ATTR_K8S_JOB_ANNOTATION,
    "ATTR_K8S_JOB_LABEL",
    ()=>ATTR_K8S_JOB_LABEL,
    "ATTR_K8S_JOB_NAME",
    ()=>ATTR_K8S_JOB_NAME,
    "ATTR_K8S_JOB_UID",
    ()=>ATTR_K8S_JOB_UID,
    "ATTR_K8S_NAMESPACE_ANNOTATION",
    ()=>ATTR_K8S_NAMESPACE_ANNOTATION,
    "ATTR_K8S_NAMESPACE_LABEL",
    ()=>ATTR_K8S_NAMESPACE_LABEL,
    "ATTR_K8S_NAMESPACE_NAME",
    ()=>ATTR_K8S_NAMESPACE_NAME,
    "ATTR_K8S_NODE_ANNOTATION",
    ()=>ATTR_K8S_NODE_ANNOTATION,
    "ATTR_K8S_NODE_LABEL",
    ()=>ATTR_K8S_NODE_LABEL,
    "ATTR_K8S_NODE_NAME",
    ()=>ATTR_K8S_NODE_NAME,
    "ATTR_K8S_NODE_UID",
    ()=>ATTR_K8S_NODE_UID,
    "ATTR_K8S_POD_ANNOTATION",
    ()=>ATTR_K8S_POD_ANNOTATION,
    "ATTR_K8S_POD_HOSTNAME",
    ()=>ATTR_K8S_POD_HOSTNAME,
    "ATTR_K8S_POD_IP",
    ()=>ATTR_K8S_POD_IP,
    "ATTR_K8S_POD_LABEL",
    ()=>ATTR_K8S_POD_LABEL,
    "ATTR_K8S_POD_NAME",
    ()=>ATTR_K8S_POD_NAME,
    "ATTR_K8S_POD_START_TIME",
    ()=>ATTR_K8S_POD_START_TIME,
    "ATTR_K8S_POD_UID",
    ()=>ATTR_K8S_POD_UID,
    "ATTR_K8S_REPLICASET_ANNOTATION",
    ()=>ATTR_K8S_REPLICASET_ANNOTATION,
    "ATTR_K8S_REPLICASET_LABEL",
    ()=>ATTR_K8S_REPLICASET_LABEL,
    "ATTR_K8S_REPLICASET_NAME",
    ()=>ATTR_K8S_REPLICASET_NAME,
    "ATTR_K8S_REPLICASET_UID",
    ()=>ATTR_K8S_REPLICASET_UID,
    "ATTR_K8S_STATEFULSET_ANNOTATION",
    ()=>ATTR_K8S_STATEFULSET_ANNOTATION,
    "ATTR_K8S_STATEFULSET_LABEL",
    ()=>ATTR_K8S_STATEFULSET_LABEL,
    "ATTR_K8S_STATEFULSET_NAME",
    ()=>ATTR_K8S_STATEFULSET_NAME,
    "ATTR_K8S_STATEFULSET_UID",
    ()=>ATTR_K8S_STATEFULSET_UID,
    "ATTR_NETWORK_LOCAL_ADDRESS",
    ()=>ATTR_NETWORK_LOCAL_ADDRESS,
    "ATTR_NETWORK_LOCAL_PORT",
    ()=>ATTR_NETWORK_LOCAL_PORT,
    "ATTR_NETWORK_PEER_ADDRESS",
    ()=>ATTR_NETWORK_PEER_ADDRESS,
    "ATTR_NETWORK_PEER_PORT",
    ()=>ATTR_NETWORK_PEER_PORT,
    "ATTR_NETWORK_PROTOCOL_NAME",
    ()=>ATTR_NETWORK_PROTOCOL_NAME,
    "ATTR_NETWORK_PROTOCOL_VERSION",
    ()=>ATTR_NETWORK_PROTOCOL_VERSION,
    "ATTR_NETWORK_TRANSPORT",
    ()=>ATTR_NETWORK_TRANSPORT,
    "ATTR_NETWORK_TYPE",
    ()=>ATTR_NETWORK_TYPE,
    "ATTR_OTEL_EVENT_NAME",
    ()=>ATTR_OTEL_EVENT_NAME,
    "ATTR_OTEL_SCOPE_NAME",
    ()=>ATTR_OTEL_SCOPE_NAME,
    "ATTR_OTEL_SCOPE_VERSION",
    ()=>ATTR_OTEL_SCOPE_VERSION,
    "ATTR_OTEL_STATUS_CODE",
    ()=>ATTR_OTEL_STATUS_CODE,
    "ATTR_OTEL_STATUS_DESCRIPTION",
    ()=>ATTR_OTEL_STATUS_DESCRIPTION,
    "ATTR_SERVER_ADDRESS",
    ()=>ATTR_SERVER_ADDRESS,
    "ATTR_SERVER_PORT",
    ()=>ATTR_SERVER_PORT,
    "ATTR_SERVICE_INSTANCE_ID",
    ()=>ATTR_SERVICE_INSTANCE_ID,
    "ATTR_SERVICE_NAME",
    ()=>ATTR_SERVICE_NAME,
    "ATTR_SERVICE_NAMESPACE",
    ()=>ATTR_SERVICE_NAMESPACE,
    "ATTR_SERVICE_VERSION",
    ()=>ATTR_SERVICE_VERSION,
    "ATTR_SIGNALR_CONNECTION_STATUS",
    ()=>ATTR_SIGNALR_CONNECTION_STATUS,
    "ATTR_SIGNALR_TRANSPORT",
    ()=>ATTR_SIGNALR_TRANSPORT,
    "ATTR_TELEMETRY_DISTRO_NAME",
    ()=>ATTR_TELEMETRY_DISTRO_NAME,
    "ATTR_TELEMETRY_DISTRO_VERSION",
    ()=>ATTR_TELEMETRY_DISTRO_VERSION,
    "ATTR_TELEMETRY_SDK_LANGUAGE",
    ()=>ATTR_TELEMETRY_SDK_LANGUAGE,
    "ATTR_TELEMETRY_SDK_NAME",
    ()=>ATTR_TELEMETRY_SDK_NAME,
    "ATTR_TELEMETRY_SDK_VERSION",
    ()=>ATTR_TELEMETRY_SDK_VERSION,
    "ATTR_URL_FRAGMENT",
    ()=>ATTR_URL_FRAGMENT,
    "ATTR_URL_FULL",
    ()=>ATTR_URL_FULL,
    "ATTR_URL_PATH",
    ()=>ATTR_URL_PATH,
    "ATTR_URL_QUERY",
    ()=>ATTR_URL_QUERY,
    "ATTR_URL_SCHEME",
    ()=>ATTR_URL_SCHEME,
    "ATTR_USER_AGENT_ORIGINAL",
    ()=>ATTR_USER_AGENT_ORIGINAL,
    "DB_SYSTEM_NAME_VALUE_MARIADB",
    ()=>DB_SYSTEM_NAME_VALUE_MARIADB,
    "DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER",
    ()=>DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER,
    "DB_SYSTEM_NAME_VALUE_MYSQL",
    ()=>DB_SYSTEM_NAME_VALUE_MYSQL,
    "DB_SYSTEM_NAME_VALUE_POSTGRESQL",
    ()=>DB_SYSTEM_NAME_VALUE_POSTGRESQL,
    "DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT",
    ()=>DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT,
    "DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION",
    ()=>DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION,
    "DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING",
    ()=>DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING,
    "DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST",
    ()=>DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST,
    "DOTNET_GC_HEAP_GENERATION_VALUE_GEN0",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_GEN0,
    "DOTNET_GC_HEAP_GENERATION_VALUE_GEN1",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_GEN1,
    "DOTNET_GC_HEAP_GENERATION_VALUE_GEN2",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_GEN2,
    "DOTNET_GC_HEAP_GENERATION_VALUE_LOH",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_LOH,
    "DOTNET_GC_HEAP_GENERATION_VALUE_POH",
    ()=>DOTNET_GC_HEAP_GENERATION_VALUE_POH,
    "ERROR_TYPE_VALUE_OTHER",
    ()=>ERROR_TYPE_VALUE_OTHER,
    "HTTP_REQUEST_METHOD_VALUE_CONNECT",
    ()=>HTTP_REQUEST_METHOD_VALUE_CONNECT,
    "HTTP_REQUEST_METHOD_VALUE_DELETE",
    ()=>HTTP_REQUEST_METHOD_VALUE_DELETE,
    "HTTP_REQUEST_METHOD_VALUE_GET",
    ()=>HTTP_REQUEST_METHOD_VALUE_GET,
    "HTTP_REQUEST_METHOD_VALUE_HEAD",
    ()=>HTTP_REQUEST_METHOD_VALUE_HEAD,
    "HTTP_REQUEST_METHOD_VALUE_OPTIONS",
    ()=>HTTP_REQUEST_METHOD_VALUE_OPTIONS,
    "HTTP_REQUEST_METHOD_VALUE_OTHER",
    ()=>HTTP_REQUEST_METHOD_VALUE_OTHER,
    "HTTP_REQUEST_METHOD_VALUE_PATCH",
    ()=>HTTP_REQUEST_METHOD_VALUE_PATCH,
    "HTTP_REQUEST_METHOD_VALUE_POST",
    ()=>HTTP_REQUEST_METHOD_VALUE_POST,
    "HTTP_REQUEST_METHOD_VALUE_PUT",
    ()=>HTTP_REQUEST_METHOD_VALUE_PUT,
    "HTTP_REQUEST_METHOD_VALUE_TRACE",
    ()=>HTTP_REQUEST_METHOD_VALUE_TRACE,
    "JVM_MEMORY_TYPE_VALUE_HEAP",
    ()=>JVM_MEMORY_TYPE_VALUE_HEAP,
    "JVM_MEMORY_TYPE_VALUE_NON_HEAP",
    ()=>JVM_MEMORY_TYPE_VALUE_NON_HEAP,
    "JVM_THREAD_STATE_VALUE_BLOCKED",
    ()=>JVM_THREAD_STATE_VALUE_BLOCKED,
    "JVM_THREAD_STATE_VALUE_NEW",
    ()=>JVM_THREAD_STATE_VALUE_NEW,
    "JVM_THREAD_STATE_VALUE_RUNNABLE",
    ()=>JVM_THREAD_STATE_VALUE_RUNNABLE,
    "JVM_THREAD_STATE_VALUE_TERMINATED",
    ()=>JVM_THREAD_STATE_VALUE_TERMINATED,
    "JVM_THREAD_STATE_VALUE_TIMED_WAITING",
    ()=>JVM_THREAD_STATE_VALUE_TIMED_WAITING,
    "JVM_THREAD_STATE_VALUE_WAITING",
    ()=>JVM_THREAD_STATE_VALUE_WAITING,
    "NETWORK_TRANSPORT_VALUE_PIPE",
    ()=>NETWORK_TRANSPORT_VALUE_PIPE,
    "NETWORK_TRANSPORT_VALUE_QUIC",
    ()=>NETWORK_TRANSPORT_VALUE_QUIC,
    "NETWORK_TRANSPORT_VALUE_TCP",
    ()=>NETWORK_TRANSPORT_VALUE_TCP,
    "NETWORK_TRANSPORT_VALUE_UDP",
    ()=>NETWORK_TRANSPORT_VALUE_UDP,
    "NETWORK_TRANSPORT_VALUE_UNIX",
    ()=>NETWORK_TRANSPORT_VALUE_UNIX,
    "NETWORK_TYPE_VALUE_IPV4",
    ()=>NETWORK_TYPE_VALUE_IPV4,
    "NETWORK_TYPE_VALUE_IPV6",
    ()=>NETWORK_TYPE_VALUE_IPV6,
    "OTEL_STATUS_CODE_VALUE_ERROR",
    ()=>OTEL_STATUS_CODE_VALUE_ERROR,
    "OTEL_STATUS_CODE_VALUE_OK",
    ()=>OTEL_STATUS_CODE_VALUE_OK,
    "SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN",
    ()=>SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN,
    "SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE",
    ()=>SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE,
    "SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT",
    ()=>SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT,
    "SIGNALR_TRANSPORT_VALUE_LONG_POLLING",
    ()=>SIGNALR_TRANSPORT_VALUE_LONG_POLLING,
    "SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS",
    ()=>SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS,
    "SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS",
    ()=>SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS,
    "TELEMETRY_SDK_LANGUAGE_VALUE_CPP",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_CPP,
    "TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET,
    "TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG,
    "TELEMETRY_SDK_LANGUAGE_VALUE_GO",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_GO,
    "TELEMETRY_SDK_LANGUAGE_VALUE_JAVA",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_JAVA,
    "TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN,
    "TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
    "TELEMETRY_SDK_LANGUAGE_VALUE_PHP",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_PHP,
    "TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON,
    "TELEMETRY_SDK_LANGUAGE_VALUE_RUBY",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_RUBY,
    "TELEMETRY_SDK_LANGUAGE_VALUE_RUST",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_RUST,
    "TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT,
    "TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS",
    ()=>TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS
]);
const ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = 'aspnetcore.diagnostics.exception.result';
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = "aborted";
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = "handled";
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = "skipped";
const ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = "unhandled";
const ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = 'aspnetcore.diagnostics.handler.type';
const ATTR_ASPNETCORE_RATE_LIMITING_POLICY = 'aspnetcore.rate_limiting.policy';
const ATTR_ASPNETCORE_RATE_LIMITING_RESULT = 'aspnetcore.rate_limiting.result';
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = "acquired";
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = "endpoint_limiter";
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = "global_limiter";
const ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = "request_canceled";
const ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = 'aspnetcore.request.is_unhandled';
const ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = 'aspnetcore.routing.is_fallback';
const ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = 'aspnetcore.routing.match_status';
const ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = "failure";
const ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = "success";
const ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = 'aspnetcore.user.is_authenticated';
const ATTR_CLIENT_ADDRESS = 'client.address';
const ATTR_CLIENT_PORT = 'client.port';
const ATTR_CODE_COLUMN_NUMBER = 'code.column.number';
const ATTR_CODE_FILE_PATH = 'code.file.path';
const ATTR_CODE_FUNCTION_NAME = 'code.function.name';
const ATTR_CODE_LINE_NUMBER = 'code.line.number';
const ATTR_CODE_STACKTRACE = 'code.stacktrace';
const ATTR_CONTAINER_ID = 'container.id';
const ATTR_CONTAINER_IMAGE_NAME = 'container.image.name';
const ATTR_CONTAINER_IMAGE_REPO_DIGESTS = 'container.image.repo_digests';
const ATTR_CONTAINER_IMAGE_TAGS = 'container.image.tags';
const ATTR_DB_COLLECTION_NAME = 'db.collection.name';
const ATTR_DB_NAMESPACE = 'db.namespace';
const ATTR_DB_OPERATION_BATCH_SIZE = 'db.operation.batch.size';
const ATTR_DB_OPERATION_NAME = 'db.operation.name';
const ATTR_DB_QUERY_SUMMARY = 'db.query.summary';
const ATTR_DB_QUERY_TEXT = 'db.query.text';
const ATTR_DB_RESPONSE_STATUS_CODE = 'db.response.status_code';
const ATTR_DB_STORED_PROCEDURE_NAME = 'db.stored_procedure.name';
const ATTR_DB_SYSTEM_NAME = 'db.system.name';
const DB_SYSTEM_NAME_VALUE_MARIADB = "mariadb";
const DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = "microsoft.sql_server";
const DB_SYSTEM_NAME_VALUE_MYSQL = "mysql";
const DB_SYSTEM_NAME_VALUE_POSTGRESQL = "postgresql";
const ATTR_DEPLOYMENT_ENVIRONMENT_NAME = 'deployment.environment.name';
const DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT = "development";
const DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION = "production";
const DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING = "staging";
const DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST = "test";
const ATTR_DOTNET_GC_HEAP_GENERATION = 'dotnet.gc.heap.generation';
const DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = "gen0";
const DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = "gen1";
const DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = "gen2";
const DOTNET_GC_HEAP_GENERATION_VALUE_LOH = "loh";
const DOTNET_GC_HEAP_GENERATION_VALUE_POH = "poh";
const ATTR_ERROR_TYPE = 'error.type';
const ERROR_TYPE_VALUE_OTHER = "_OTHER";
const ATTR_EXCEPTION_ESCAPED = 'exception.escaped';
const ATTR_EXCEPTION_MESSAGE = 'exception.message';
const ATTR_EXCEPTION_STACKTRACE = 'exception.stacktrace';
const ATTR_EXCEPTION_TYPE = 'exception.type';
const ATTR_HTTP_REQUEST_HEADER = (key)=>`http.request.header.${key}`;
const ATTR_HTTP_REQUEST_METHOD = 'http.request.method';
const HTTP_REQUEST_METHOD_VALUE_OTHER = "_OTHER";
const HTTP_REQUEST_METHOD_VALUE_CONNECT = "CONNECT";
const HTTP_REQUEST_METHOD_VALUE_DELETE = "DELETE";
const HTTP_REQUEST_METHOD_VALUE_GET = "GET";
const HTTP_REQUEST_METHOD_VALUE_HEAD = "HEAD";
const HTTP_REQUEST_METHOD_VALUE_OPTIONS = "OPTIONS";
const HTTP_REQUEST_METHOD_VALUE_PATCH = "PATCH";
const HTTP_REQUEST_METHOD_VALUE_POST = "POST";
const HTTP_REQUEST_METHOD_VALUE_PUT = "PUT";
const HTTP_REQUEST_METHOD_VALUE_TRACE = "TRACE";
const ATTR_HTTP_REQUEST_METHOD_ORIGINAL = 'http.request.method_original';
const ATTR_HTTP_REQUEST_RESEND_COUNT = 'http.request.resend_count';
const ATTR_HTTP_RESPONSE_HEADER = (key)=>`http.response.header.${key}`;
const ATTR_HTTP_RESPONSE_STATUS_CODE = 'http.response.status_code';
const ATTR_HTTP_ROUTE = 'http.route';
const ATTR_JVM_GC_ACTION = 'jvm.gc.action';
const ATTR_JVM_GC_NAME = 'jvm.gc.name';
const ATTR_JVM_MEMORY_POOL_NAME = 'jvm.memory.pool.name';
const ATTR_JVM_MEMORY_TYPE = 'jvm.memory.type';
const JVM_MEMORY_TYPE_VALUE_HEAP = "heap";
const JVM_MEMORY_TYPE_VALUE_NON_HEAP = "non_heap";
const ATTR_JVM_THREAD_DAEMON = 'jvm.thread.daemon';
const ATTR_JVM_THREAD_STATE = 'jvm.thread.state';
const JVM_THREAD_STATE_VALUE_BLOCKED = "blocked";
const JVM_THREAD_STATE_VALUE_NEW = "new";
const JVM_THREAD_STATE_VALUE_RUNNABLE = "runnable";
const JVM_THREAD_STATE_VALUE_TERMINATED = "terminated";
const JVM_THREAD_STATE_VALUE_TIMED_WAITING = "timed_waiting";
const JVM_THREAD_STATE_VALUE_WAITING = "waiting";
const ATTR_K8S_CLUSTER_NAME = 'k8s.cluster.name';
const ATTR_K8S_CLUSTER_UID = 'k8s.cluster.uid';
const ATTR_K8S_CONTAINER_NAME = 'k8s.container.name';
const ATTR_K8S_CONTAINER_RESTART_COUNT = 'k8s.container.restart_count';
const ATTR_K8S_CRONJOB_ANNOTATION = (key)=>`k8s.cronjob.annotation.${key}`;
const ATTR_K8S_CRONJOB_LABEL = (key)=>`k8s.cronjob.label.${key}`;
const ATTR_K8S_CRONJOB_NAME = 'k8s.cronjob.name';
const ATTR_K8S_CRONJOB_UID = 'k8s.cronjob.uid';
const ATTR_K8S_DAEMONSET_ANNOTATION = (key)=>`k8s.daemonset.annotation.${key}`;
const ATTR_K8S_DAEMONSET_LABEL = (key)=>`k8s.daemonset.label.${key}`;
const ATTR_K8S_DAEMONSET_NAME = 'k8s.daemonset.name';
const ATTR_K8S_DAEMONSET_UID = 'k8s.daemonset.uid';
const ATTR_K8S_DEPLOYMENT_ANNOTATION = (key)=>`k8s.deployment.annotation.${key}`;
const ATTR_K8S_DEPLOYMENT_LABEL = (key)=>`k8s.deployment.label.${key}`;
const ATTR_K8S_DEPLOYMENT_NAME = 'k8s.deployment.name';
const ATTR_K8S_DEPLOYMENT_UID = 'k8s.deployment.uid';
const ATTR_K8S_JOB_ANNOTATION = (key)=>`k8s.job.annotation.${key}`;
const ATTR_K8S_JOB_LABEL = (key)=>`k8s.job.label.${key}`;
const ATTR_K8S_JOB_NAME = 'k8s.job.name';
const ATTR_K8S_JOB_UID = 'k8s.job.uid';
const ATTR_K8S_NAMESPACE_ANNOTATION = (key)=>`k8s.namespace.annotation.${key}`;
const ATTR_K8S_NAMESPACE_LABEL = (key)=>`k8s.namespace.label.${key}`;
const ATTR_K8S_NAMESPACE_NAME = 'k8s.namespace.name';
const ATTR_K8S_NODE_ANNOTATION = (key)=>`k8s.node.annotation.${key}`;
const ATTR_K8S_NODE_LABEL = (key)=>`k8s.node.label.${key}`;
const ATTR_K8S_NODE_NAME = 'k8s.node.name';
const ATTR_K8S_NODE_UID = 'k8s.node.uid';
const ATTR_K8S_POD_ANNOTATION = (key)=>`k8s.pod.annotation.${key}`;
const ATTR_K8S_POD_HOSTNAME = 'k8s.pod.hostname';
const ATTR_K8S_POD_IP = 'k8s.pod.ip';
const ATTR_K8S_POD_LABEL = (key)=>`k8s.pod.label.${key}`;
const ATTR_K8S_POD_NAME = 'k8s.pod.name';
const ATTR_K8S_POD_START_TIME = 'k8s.pod.start_time';
const ATTR_K8S_POD_UID = 'k8s.pod.uid';
const ATTR_K8S_REPLICASET_ANNOTATION = (key)=>`k8s.replicaset.annotation.${key}`;
const ATTR_K8S_REPLICASET_LABEL = (key)=>`k8s.replicaset.label.${key}`;
const ATTR_K8S_REPLICASET_NAME = 'k8s.replicaset.name';
const ATTR_K8S_REPLICASET_UID = 'k8s.replicaset.uid';
const ATTR_K8S_STATEFULSET_ANNOTATION = (key)=>`k8s.statefulset.annotation.${key}`;
const ATTR_K8S_STATEFULSET_LABEL = (key)=>`k8s.statefulset.label.${key}`;
const ATTR_K8S_STATEFULSET_NAME = 'k8s.statefulset.name';
const ATTR_K8S_STATEFULSET_UID = 'k8s.statefulset.uid';
const ATTR_NETWORK_LOCAL_ADDRESS = 'network.local.address';
const ATTR_NETWORK_LOCAL_PORT = 'network.local.port';
const ATTR_NETWORK_PEER_ADDRESS = 'network.peer.address';
const ATTR_NETWORK_PEER_PORT = 'network.peer.port';
const ATTR_NETWORK_PROTOCOL_NAME = 'network.protocol.name';
const ATTR_NETWORK_PROTOCOL_VERSION = 'network.protocol.version';
const ATTR_NETWORK_TRANSPORT = 'network.transport';
const NETWORK_TRANSPORT_VALUE_PIPE = "pipe";
const NETWORK_TRANSPORT_VALUE_QUIC = "quic";
const NETWORK_TRANSPORT_VALUE_TCP = "tcp";
const NETWORK_TRANSPORT_VALUE_UDP = "udp";
const NETWORK_TRANSPORT_VALUE_UNIX = "unix";
const ATTR_NETWORK_TYPE = 'network.type';
const NETWORK_TYPE_VALUE_IPV4 = "ipv4";
const NETWORK_TYPE_VALUE_IPV6 = "ipv6";
const ATTR_OTEL_EVENT_NAME = 'otel.event.name';
const ATTR_OTEL_SCOPE_NAME = 'otel.scope.name';
const ATTR_OTEL_SCOPE_VERSION = 'otel.scope.version';
const ATTR_OTEL_STATUS_CODE = 'otel.status_code';
const OTEL_STATUS_CODE_VALUE_ERROR = "ERROR";
const OTEL_STATUS_CODE_VALUE_OK = "OK";
const ATTR_OTEL_STATUS_DESCRIPTION = 'otel.status_description';
const ATTR_SERVER_ADDRESS = 'server.address';
const ATTR_SERVER_PORT = 'server.port';
const ATTR_SERVICE_INSTANCE_ID = 'service.instance.id';
const ATTR_SERVICE_NAME = 'service.name';
const ATTR_SERVICE_NAMESPACE = 'service.namespace';
const ATTR_SERVICE_VERSION = 'service.version';
const ATTR_SIGNALR_CONNECTION_STATUS = 'signalr.connection.status';
const SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = "app_shutdown";
const SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = "normal_closure";
const SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = "timeout";
const ATTR_SIGNALR_TRANSPORT = 'signalr.transport';
const SIGNALR_TRANSPORT_VALUE_LONG_POLLING = "long_polling";
const SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = "server_sent_events";
const SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = "web_sockets";
const ATTR_TELEMETRY_DISTRO_NAME = 'telemetry.distro.name';
const ATTR_TELEMETRY_DISTRO_VERSION = 'telemetry.distro.version';
const ATTR_TELEMETRY_SDK_LANGUAGE = 'telemetry.sdk.language';
const TELEMETRY_SDK_LANGUAGE_VALUE_CPP = "cpp";
const TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = "dotnet";
const TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = "erlang";
const TELEMETRY_SDK_LANGUAGE_VALUE_GO = "go";
const TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = "java";
const TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN = "kotlin";
const TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = "nodejs";
const TELEMETRY_SDK_LANGUAGE_VALUE_PHP = "php";
const TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = "python";
const TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = "ruby";
const TELEMETRY_SDK_LANGUAGE_VALUE_RUST = "rust";
const TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = "swift";
const TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs";
const ATTR_TELEMETRY_SDK_NAME = 'telemetry.sdk.name';
const ATTR_TELEMETRY_SDK_VERSION = 'telemetry.sdk.version';
const ATTR_URL_FRAGMENT = 'url.fragment';
const ATTR_URL_FULL = 'url.full';
const ATTR_URL_PATH = 'url.path';
const ATTR_URL_QUERY = 'url.query';
const ATTR_URL_SCHEME = 'url.scheme';
const ATTR_USER_AGENT_ORIGINAL = 'user_agent.original';
}),
"[project]/node_modules/defu/dist/defu.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefu",
    ()=>createDefu,
    "default",
    ()=>defu,
    "defu",
    ()=>defu,
    "defuArrayFn",
    ()=>defuArrayFn,
    "defuFn",
    ()=>defuFn
]);
function isPlainObject(value) {
    if (value === null || typeof value !== "object") {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
        return false;
    }
    if (Symbol.iterator in value) {
        return false;
    }
    if (Symbol.toStringTag in value) {
        return Object.prototype.toString.call(value) === "[object Module]";
    }
    return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
    if (!isPlainObject(defaults)) {
        return _defu(baseObject, {}, namespace, merger);
    }
    const object = {
        ...defaults
    };
    for (const key of Object.keys(baseObject)){
        if (key === "__proto__" || key === "constructor") {
            continue;
        }
        const value = baseObject[key];
        if (value === null || value === void 0) {
            continue;
        }
        if (merger && merger(object, key, value, namespace)) {
            continue;
        }
        if (Array.isArray(value) && Array.isArray(object[key])) {
            object[key] = [
                ...value,
                ...object[key]
            ];
        } else if (isPlainObject(value) && isPlainObject(object[key])) {
            object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
        } else {
            object[key] = value;
        }
    }
    return object;
}
function createDefu(merger) {
    return (...arguments_)=>// eslint-disable-next-line unicorn/no-array-reduce
        arguments_.reduce((p, c)=>_defu(p, c, "", merger), {});
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue)=>{
    if (object[key] !== void 0 && typeof currentValue === "function") {
        object[key] = currentValue(object[key]);
        return true;
    }
});
const defuArrayFn = createDefu((object, key, currentValue)=>{
    if (Array.isArray(object[key]) && typeof currentValue === "function") {
        object[key] = currentValue(object[key]);
        return true;
    }
});
;
}),
"[project]/node_modules/rou3/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NullProtoObj",
    ()=>NullProtoObj,
    "addRoute",
    ()=>addRoute,
    "createRouter",
    ()=>createRouter,
    "findAllRoutes",
    ()=>findAllRoutes,
    "findRoute",
    ()=>findRoute,
    "removeRoute",
    ()=>removeRoute,
    "routeToRegExp",
    ()=>routeToRegExp
]);
const NullProtoObj = /* @__PURE__ */ (()=>{
    const e = function() {};
    return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
/**
* Create a new router context.
*/ function createRouter() {
    return {
        root: {
            key: ""
        },
        static: new NullProtoObj()
    };
}
function splitPath(path) {
    const [_, ...s] = path.split("/");
    return s[s.length - 1] === "" ? s.slice(0, -1) : s;
}
function getMatchParams(segments, paramsMap) {
    const params = new NullProtoObj();
    for (const [index, name] of paramsMap){
        const segment = index < 0 ? segments.slice(-(index + 1)).join("/") : segments[index];
        if (typeof name === "string") params[name] = segment;
        else {
            const match = segment.match(name);
            if (match) for(const key in match.groups)params[key] = match.groups[key];
        }
    }
    return params;
}
/**
* Add a route to the router context.
*/ function addRoute(ctx, method = "", path, data) {
    method = method.toUpperCase();
    if (path.charCodeAt(0) !== 47) path = `/${path}`;
    path = path.replace(/\\:/g, "%3A");
    const segments = splitPath(path);
    let node = ctx.root;
    let _unnamedParamIndex = 0;
    const paramsMap = [];
    const paramsRegexp = [];
    for(let i = 0; i < segments.length; i++){
        let segment = segments[i];
        if (segment.startsWith("**")) {
            if (!node.wildcard) node.wildcard = {
                key: "**"
            };
            node = node.wildcard;
            paramsMap.push([
                -(i + 1),
                segment.split(":")[1] || "_",
                segment.length === 2
            ]);
            break;
        }
        if (segment === "*" || segment.includes(":")) {
            if (!node.param) node.param = {
                key: "*"
            };
            node = node.param;
            if (segment === "*") paramsMap.push([
                i,
                `_${_unnamedParamIndex++}`,
                true
            ]);
            else if (segment.includes(":", 1)) {
                const regexp = getParamRegexp(segment);
                paramsRegexp[i] = regexp;
                node.hasRegexParam = true;
                paramsMap.push([
                    i,
                    regexp,
                    false
                ]);
            } else paramsMap.push([
                i,
                segment.slice(1),
                false
            ]);
            continue;
        }
        if (segment === "\\*") segment = segments[i] = "*";
        else if (segment === "\\*\\*") segment = segments[i] = "**";
        const child = node.static?.[segment];
        if (child) node = child;
        else {
            const staticNode = {
                key: segment
            };
            if (!node.static) node.static = new NullProtoObj();
            node.static[segment] = staticNode;
            node = staticNode;
        }
    }
    const hasParams = paramsMap.length > 0;
    if (!node.methods) node.methods = new NullProtoObj();
    node.methods[method] ??= [];
    node.methods[method].push({
        data: data || null,
        paramsRegexp,
        paramsMap: hasParams ? paramsMap : void 0
    });
    if (!hasParams) ctx.static["/" + segments.join("/")] = node;
}
function getParamRegexp(segment) {
    const regex = segment.replace(/:(\w+)/g, (_, id)=>`(?<${id}>[^/]+)`).replace(/\./g, "\\.");
    return /* @__PURE__ */ new RegExp(`^${regex}$`);
}
/**
* Find a route by path.
*/ function findRoute(ctx, method = "", path, opts) {
    if (path.charCodeAt(path.length - 1) === 47) path = path.slice(0, -1);
    const staticNode = ctx.static[path];
    if (staticNode && staticNode.methods) {
        const staticMatch = staticNode.methods[method] || staticNode.methods[""];
        if (staticMatch !== void 0) return staticMatch[0];
    }
    const segments = splitPath(path);
    const match = _lookupTree(ctx, ctx.root, method, segments, 0)?.[0];
    if (match === void 0) return;
    if (opts?.params === false) return match;
    return {
        data: match.data,
        params: match.paramsMap ? getMatchParams(segments, match.paramsMap) : void 0
    };
}
function _lookupTree(ctx, node, method, segments, index) {
    if (index === segments.length) {
        if (node.methods) {
            const match = node.methods[method] || node.methods[""];
            if (match) return match;
        }
        if (node.param && node.param.methods) {
            const match = node.param.methods[method] || node.param.methods[""];
            if (match) {
                const pMap = match[0].paramsMap;
                if (pMap?.[pMap?.length - 1]?.[2]) return match;
            }
        }
        if (node.wildcard && node.wildcard.methods) {
            const match = node.wildcard.methods[method] || node.wildcard.methods[""];
            if (match) {
                const pMap = match[0].paramsMap;
                if (pMap?.[pMap?.length - 1]?.[2]) return match;
            }
        }
        return;
    }
    const segment = segments[index];
    if (node.static) {
        const staticChild = node.static[segment];
        if (staticChild) {
            const match = _lookupTree(ctx, staticChild, method, segments, index + 1);
            if (match) return match;
        }
    }
    if (node.param) {
        const match = _lookupTree(ctx, node.param, method, segments, index + 1);
        if (match) {
            if (node.param.hasRegexParam) {
                const exactMatch = match.find((m)=>m.paramsRegexp[index]?.test(segment)) || match.find((m)=>!m.paramsRegexp[index]);
                return exactMatch ? [
                    exactMatch
                ] : void 0;
            }
            return match;
        }
    }
    if (node.wildcard && node.wildcard.methods) return node.wildcard.methods[method] || node.wildcard.methods[""];
}
/**
* Remove a route from the router context.
*/ function removeRoute(ctx, method, path) {
    const segments = splitPath(path);
    return _remove(ctx.root, method || "", segments, 0);
}
function _remove(node, method, segments, index) {
    if (index === segments.length) {
        if (node.methods && method in node.methods) {
            delete node.methods[method];
            if (Object.keys(node.methods).length === 0) node.methods = void 0;
        }
        return;
    }
    const segment = segments[index];
    if (segment === "*") {
        if (node.param) {
            _remove(node.param, method, segments, index + 1);
            if (_isEmptyNode(node.param)) node.param = void 0;
        }
        return;
    }
    if (segment.startsWith("**")) {
        if (node.wildcard) {
            _remove(node.wildcard, method, segments, index + 1);
            if (_isEmptyNode(node.wildcard)) node.wildcard = void 0;
        }
        return;
    }
    const childNode = node.static?.[segment];
    if (childNode) {
        _remove(childNode, method, segments, index + 1);
        if (_isEmptyNode(childNode)) {
            delete node.static[segment];
            if (Object.keys(node.static).length === 0) node.static = void 0;
        }
    }
}
function _isEmptyNode(node) {
    return node.methods === void 0 && node.static === void 0 && node.param === void 0 && node.wildcard === void 0;
}
/**
* Find all route patterns that match the given path.
*/ function findAllRoutes(ctx, method = "", path, opts) {
    if (path.charCodeAt(path.length - 1) === 47) path = path.slice(0, -1);
    const segments = splitPath(path);
    const matches = _findAll(ctx, ctx.root, method, segments, 0);
    if (opts?.params === false) return matches;
    return matches.map((m)=>{
        return {
            data: m.data,
            params: m.paramsMap ? getMatchParams(segments, m.paramsMap) : void 0
        };
    });
}
function _findAll(ctx, node, method, segments, index, matches = []) {
    const segment = segments[index];
    if (node.wildcard && node.wildcard.methods) {
        const match = node.wildcard.methods[method] || node.wildcard.methods[""];
        if (match) matches.push(...match);
    }
    if (node.param) {
        _findAll(ctx, node.param, method, segments, index + 1, matches);
        if (index === segments.length && node.param.methods) {
            const match = node.param.methods[method] || node.param.methods[""];
            if (match) {
                const pMap = match[0].paramsMap;
                if (pMap?.[pMap?.length - 1]?.[2]) matches.push(...match);
            }
        }
    }
    const staticChild = node.static?.[segment];
    if (staticChild) _findAll(ctx, staticChild, method, segments, index + 1, matches);
    if (index === segments.length && node.methods) {
        const match = node.methods[method] || node.methods[""];
        if (match) matches.push(...match);
    }
    return matches;
}
function routeToRegExp(route = "/") {
    const reSegments = [];
    let idCtr = 0;
    for (const segment of route.split("/")){
        if (!segment) continue;
        if (segment === "*") reSegments.push(`(?<_${idCtr++}>[^/]*)`);
        else if (segment.startsWith("**")) reSegments.push(segment === "**" ? "?(?<_>.*)" : `?(?<${segment.slice(3)}>.+)`);
        else if (segment.includes(":")) reSegments.push(segment.replace(/:(\w+)/g, (_, id)=>`(?<${id}>[^/]+)`).replace(/\./g, "\\."));
        else reSegments.push(segment);
    }
    return /* @__PURE__ */ new RegExp(`^/${reSegments.join("/")}/?$`);
}
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1_47-54._.js.map