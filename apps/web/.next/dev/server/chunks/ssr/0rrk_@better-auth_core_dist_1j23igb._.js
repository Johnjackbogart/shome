module.exports = [
"[project]/apps/web/node_modules/@better-auth/core/dist/api/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAuthEndpoint",
    ()=>createAuthEndpoint,
    "createAuthMiddleware",
    ()=>createAuthMiddleware,
    "optionsMiddleware",
    ()=>optionsMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$endpoint$2d$context$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/context/endpoint-context.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$is$2d$api$2d$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/is-api-error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$endpoint$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/endpoint.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/middleware.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
;
;
;
//#region src/api/index.ts
/**
* Better-call's createEndpoint re-throws APIError without exposing the headers
* accumulated on ctx.responseHeaders (e.g. Set-Cookie from deleteSessionCookie
* before throw). Attach them to the error via kAPIErrorHeaderSymbol — matching
* better-call's createMiddleware contract so the outer pipeline can merge them
* into the response.
*/ function attachResponseHeadersToAPIError(responseHeaders, e) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$is$2d$api$2d$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAPIError"])(e) || !responseHeaders) return;
    Object.defineProperty(e, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["kAPIErrorHeaderSymbol"], {
        enumerable: false,
        configurable: true,
        value: responseHeaders,
        writable: false
    });
}
const optionsMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createMiddleware"])(async ()=>{
    /**
	* This will be passed on the instance of
	* the context. Used to infer the type
	* here.
	*/ return {};
});
const createAuthMiddleware = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createMiddleware"].create({
    use: [
        optionsMiddleware,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createMiddleware"])(async ()=>{
            return {};
        })
    ]
});
const use = [
    optionsMiddleware
];
function createAuthEndpoint(pathOrOptions, handlerOrOptions, handlerOrNever) {
    const path = typeof pathOrOptions === "string" ? pathOrOptions : void 0;
    const options = typeof handlerOrOptions === "object" ? handlerOrOptions : pathOrOptions;
    const handler = typeof handlerOrOptions === "function" ? handlerOrOptions : handlerOrNever;
    const wrapped = async (ctx)=>{
        const runtimeCtx = ctx;
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$endpoint$2d$context$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runWithEndpointContext"])(ctx, ()=>handler(ctx));
        } catch (e) {
            attachResponseHeadersToAPIError(runtimeCtx.responseHeaders, e);
            throw e;
        }
    };
    if (path) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$endpoint$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEndpoint"])(path, {
        ...options,
        use: [
            ...options?.use || [],
            ...use
        ]
    }, wrapped);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$endpoint$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEndpoint"])({
        ...options,
        use: [
            ...options?.use || [],
            ...use
        ]
    }, wrapped);
}
/**
* Set `metadata.SERVER_ONLY` while preserving any existing metadata
* (`$Infer`, `openapi`, ...).
*/ function withServerOnly(options) {
    return {
        ...options,
        metadata: {
            ...options.metadata,
            SERVER_ONLY: true
        }
    };
}
/**
* Declare a **server-only** endpoint.
*
* The endpoint is callable through `auth.api.*` from trusted server code but is
* never registered on the HTTP router and never emitted into the OpenAPI
* schema. It takes no path because it has no URL to be reached at.
*
* Prefer this over the path-less `createAuthEndpoint({ ... }, handler)` form.
* Setting `metadata.SERVER_ONLY` makes the intent explicit at the call site and
* keeps the endpoint off the HTTP surface even if a path is later added by
* mistake: better-call's router skips an endpoint when its path is missing *or*
* when `SERVER_ONLY` is set, so the two together are defense in depth. Relying
* on path omission alone is invisible and one keystroke away from exposure.
*
* @example
* ```ts
* viewBackupCodes: createAuthEndpoint.serverOnly(
* 	{ method: "POST", body: schema },
* 	async (ctx) => { ... },
* )
* ```
*/ createAuthEndpoint.serverOnly = (options, handler)=>createAuthEndpoint(withServerOnly(options), handler);
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/async_hooks/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAsyncLocalStorage",
    ()=>getAsyncLocalStorage
]);
//#region src/async_hooks/index.ts
const AsyncLocalStoragePromise = import(/* @vite-ignore */ /* webpackIgnore: true */ "node:async_hooks").then((mod)=>mod.AsyncLocalStorage).catch((err)=>{
    if ("AsyncLocalStorage" in globalThis) return globalThis.AsyncLocalStorage;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    console.warn("[better-auth] Warning: AsyncLocalStorage is not available in this environment. Some features may not work as expected.");
    console.warn("[better-auth] Please read more about this warning at https://better-auth.com/docs/installation#mount-handler");
    console.warn("[better-auth] If you are using Cloudflare Workers, please see: https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag");
    throw err;
});
async function getAsyncLocalStorage() {
    const mod = await AsyncLocalStoragePromise;
    if (mod === null) throw new Error("getAsyncLocalStorage is only available in server code");
    else return mod;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/context/endpoint-context.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentAuthContext",
    ()=>getCurrentAuthContext,
    "getCurrentAuthContextAsyncLocalStorage",
    ()=>getCurrentAuthContextAsyncLocalStorage,
    "runWithEndpointContext",
    ()=>runWithEndpointContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$global$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/context/global.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$async_hooks$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/async_hooks/index.mjs [app-rsc] (ecmascript)");
;
;
//#region src/context/endpoint-context.ts
const ensureAsyncStorage = async ()=>{
    const betterAuthGlobal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$global$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__getBetterAuthGlobal"])();
    if (!betterAuthGlobal.context.endpointContextAsyncStorage) {
        const AsyncLocalStorage = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$async_hooks$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAsyncLocalStorage"])();
        betterAuthGlobal.context.endpointContextAsyncStorage = new AsyncLocalStorage();
    }
    return betterAuthGlobal.context.endpointContextAsyncStorage;
};
/**
* This is for internal use only. Most users should use `getCurrentAuthContext` instead.
*
* It is exposed for advanced use cases where you need direct access to the AsyncLocalStorage instance.
*/ async function getCurrentAuthContextAsyncLocalStorage() {
    return ensureAsyncStorage();
}
async function getCurrentAuthContext() {
    const context = (await ensureAsyncStorage()).getStore();
    if (!context) throw new Error("No auth context found. Please make sure you are calling this function within a `runWithEndpointContext` callback.");
    return context;
}
async function runWithEndpointContext(context, fn) {
    return (await ensureAsyncStorage()).run(context, fn);
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/context/global.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__getBetterAuthGlobal",
    ()=>__getBetterAuthGlobal,
    "getBetterAuthVersion",
    ()=>getBetterAuthVersion
]);
//#region src/context/global.ts
const symbol = Symbol.for("better-auth:global");
let bind = null;
const __context = {};
const __betterAuthVersion = "1.6.26";
/**
* We store context instance in the globalThis.
*
* The reason we do this is that some bundlers, web framework, or package managers might
* create multiple copies of BetterAuth in the same process intentionally or unintentionally.
*
* For example, yarn v1, Next.js, SSR, Vite...
*
* @internal
*/ function __getBetterAuthGlobal() {
    if (!globalThis[symbol]) {
        globalThis[symbol] = {
            version: __betterAuthVersion,
            epoch: 1,
            context: __context
        };
        bind = globalThis[symbol];
    }
    bind = globalThis[symbol];
    if (bind.version !== __betterAuthVersion) {
        bind.version = __betterAuthVersion;
        bind.epoch++;
    }
    return globalThis[symbol];
}
function getBetterAuthVersion() {
    return __getBetterAuthGlobal().version;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/context/request-state.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineRequestState",
    ()=>defineRequestState,
    "getCurrentRequestState",
    ()=>getCurrentRequestState,
    "getRequestStateAsyncLocalStorage",
    ()=>getRequestStateAsyncLocalStorage,
    "hasRequestState",
    ()=>hasRequestState,
    "runWithRequestState",
    ()=>runWithRequestState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$global$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/context/global.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$async_hooks$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/async_hooks/index.mjs [app-rsc] (ecmascript)");
;
;
//#region src/context/request-state.ts
let asyncStorageInit = null;
const ensureAsyncStorage = async ()=>{
    const betterAuthGlobal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$global$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__getBetterAuthGlobal"])();
    const existing = betterAuthGlobal.context.requestStateAsyncStorage;
    if (existing) return existing;
    if (!asyncStorageInit) asyncStorageInit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$async_hooks$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAsyncLocalStorage"])().then((AsyncLocalStorage)=>{
        betterAuthGlobal.context.requestStateAsyncStorage ??= new AsyncLocalStorage();
        return betterAuthGlobal.context.requestStateAsyncStorage;
    });
    return asyncStorageInit;
};
async function getRequestStateAsyncLocalStorage() {
    return ensureAsyncStorage();
}
async function hasRequestState() {
    return (await ensureAsyncStorage()).getStore() !== void 0;
}
async function getCurrentRequestState() {
    const store = (await ensureAsyncStorage()).getStore();
    if (!store) throw new Error("No request state found. Please make sure you are calling this function within a `runWithRequestState` callback.");
    return store;
}
async function runWithRequestState(store, fn) {
    return (await ensureAsyncStorage()).run(store, fn);
}
function defineRequestState(initFn) {
    const ref = Object.freeze({});
    return {
        get ref () {
            return ref;
        },
        async get () {
            const store = await getCurrentRequestState();
            if (!store.has(ref)) {
                const initialValue = await initFn();
                store.set(ref, initialValue);
                return initialValue;
            }
            return store.get(ref);
        },
        async set (value) {
            (await getCurrentRequestState()).set(ref, value);
        }
    };
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/context/transaction.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentAdapter",
    ()=>getCurrentAdapter,
    "getCurrentDBAdapterAsyncLocalStorage",
    ()=>getCurrentDBAdapterAsyncLocalStorage,
    "queueAfterTransactionHook",
    ()=>queueAfterTransactionHook,
    "runWithAdapter",
    ()=>runWithAdapter,
    "runWithTransaction",
    ()=>runWithTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$global$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/context/global.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$async_hooks$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/async_hooks/index.mjs [app-rsc] (ecmascript)");
;
;
//#region src/context/transaction.ts
const ensureAsyncStorage = async ()=>{
    const betterAuthGlobal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$global$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__getBetterAuthGlobal"])();
    if (!betterAuthGlobal.context.adapterAsyncStorage) {
        const AsyncLocalStorage = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$async_hooks$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAsyncLocalStorage"])();
        betterAuthGlobal.context.adapterAsyncStorage = new AsyncLocalStorage();
    }
    return betterAuthGlobal.context.adapterAsyncStorage;
};
/**
* This is for internal use only. Most users should use `getCurrentAdapter` instead.
*
* It is exposed for advanced use cases where you need direct access to the AsyncLocalStorage instance.
*/ const getCurrentDBAdapterAsyncLocalStorage = async ()=>{
    return ensureAsyncStorage();
};
const getCurrentAdapter = async (fallback)=>{
    return ensureAsyncStorage().then((als)=>{
        return als.getStore()?.adapter || fallback;
    }).catch(()=>{
        return fallback;
    });
};
const runWithAdapter = async (adapter, fn)=>{
    let called = false;
    return ensureAsyncStorage().then(async (als)=>{
        called = true;
        const pendingHooks = [];
        let result;
        let error;
        let hasError = false;
        try {
            result = await als.run({
                adapter,
                pendingHooks,
                isTransactionActive: false
            }, fn);
        } catch (err) {
            error = err;
            hasError = true;
        }
        for (const hook of pendingHooks)await hook();
        if (hasError) throw error;
        return result;
    }).catch((err)=>{
        if (!called) return fn();
        throw err;
    });
};
const runWithTransaction = async (adapter, fn)=>{
    let called = false;
    return ensureAsyncStorage().then(async (als)=>{
        called = true;
        if (als.getStore()?.isTransactionActive) return fn();
        const pendingHooks = [];
        let result;
        let error;
        let hasError = false;
        try {
            result = await adapter.transaction(async (trx)=>{
                return als.run({
                    adapter: trx,
                    pendingHooks,
                    isTransactionActive: true
                }, fn);
            });
        } catch (e) {
            hasError = true;
            error = e;
        }
        for (const hook of pendingHooks)await hook();
        if (hasError) throw error;
        return result;
    }).catch((err)=>{
        if (!called) return fn();
        throw err;
    });
};
/**
* Queue a hook to be executed after the current transaction commits.
* If not in a transaction, the hook will execute immediately.
*/ const queueAfterTransactionHook = async (hook)=>{
    return ensureAsyncStorage().then((als)=>{
        const store = als.getStore();
        if (store) store.pendingHooks.push(hook);
        else return hook();
    }).catch(()=>{
        return hook();
    });
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/factory.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdapterFactory",
    ()=>createAdapterFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$transaction$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/context/transaction.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$get$2d$tables$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/get-tables.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$color$2d$depth$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/color-depth.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$json$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/json.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-model-name.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-field-name.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$id$2d$field$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-id-field.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$field$2d$attributes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-field-attributes.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-field-name.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-model-name.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/instrumentation/tracer.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
//#region src/db/adapter/factory.ts
let debugLogs = [];
let transactionId = -1;
const createAsIsTransaction = (adapter)=>(fn)=>fn(adapter);
const createAdapterFactory = ({ adapter: customAdapter, config: cfg })=>(options)=>{
        const uniqueAdapterFactoryInstanceId = Math.random().toString(36).substring(2, 15);
        const config = {
            ...cfg,
            supportsBooleans: cfg.supportsBooleans ?? true,
            supportsDates: cfg.supportsDates ?? true,
            supportsJSON: cfg.supportsJSON ?? false,
            adapterName: cfg.adapterName ?? cfg.adapterId,
            supportsNumericIds: cfg.supportsNumericIds ?? true,
            supportsUUIDs: cfg.supportsUUIDs ?? false,
            supportsArrays: cfg.supportsArrays ?? false,
            transaction: cfg.transaction ?? false,
            disableTransformInput: cfg.disableTransformInput ?? false,
            disableTransformOutput: cfg.disableTransformOutput ?? false,
            disableTransformJoin: cfg.disableTransformJoin ?? false
        };
        if (options.advanced?.database?.generateId === "serial" && config.supportsNumericIds === false) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`[${config.adapterName}] Your database or database adapter does not support numeric ids. Please disable "useNumberId" in your config.`);
        const schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$get$2d$tables$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthTables"])(options);
        const debugLog = (...args)=>{
            if (config.debugLogs === true || typeof config.debugLogs === "object") {
                const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLogger"])({
                    level: "info"
                });
                if (typeof config.debugLogs === "object" && "isRunningAdapterTests" in config.debugLogs) {
                    if (config.debugLogs.isRunningAdapterTests) {
                        args.shift();
                        debugLogs.push({
                            instance: uniqueAdapterFactoryInstanceId,
                            args
                        });
                    }
                    return;
                }
                if (typeof config.debugLogs === "object" && config.debugLogs.logCondition && !config.debugLogs.logCondition?.()) return;
                if (typeof args[0] === "object" && "method" in args[0]) {
                    const method = args.shift().method;
                    if (typeof config.debugLogs === "object") {
                        if (method === "create" && !config.debugLogs.create) return;
                        else if (method === "update" && !config.debugLogs.update) return;
                        else if (method === "updateMany" && !config.debugLogs.updateMany) return;
                        else if (method === "findOne" && !config.debugLogs.findOne) return;
                        else if (method === "findMany" && !config.debugLogs.findMany) return;
                        else if (method === "delete" && !config.debugLogs.delete) return;
                        else if (method === "deleteMany" && !config.debugLogs.deleteMany) return;
                        else if (method === "consumeOne" && !config.debugLogs.consumeOne) return;
                        else if (method === "incrementOne" && !config.debugLogs.incrementOne) return;
                        else if (method === "count" && !config.debugLogs.count) return;
                    }
                    logger.info(`[${config.adapterName}]`, ...args);
                } else logger.info(`[${config.adapterName}]`, ...args);
            }
        };
        const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLogger"])(options.logger);
        const getDefaultModelName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultModelName"])({
            usePlural: config.usePlural,
            schema
        });
        const getDefaultFieldName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultFieldName"])({
            usePlural: config.usePlural,
            schema
        });
        const getModelName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetModelName"])({
            usePlural: config.usePlural,
            schema
        });
        const getFieldName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetFieldName"])({
            schema,
            usePlural: config.usePlural
        });
        const idField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$id$2d$field$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetIdField"])({
            schema,
            options,
            usePlural: config.usePlural,
            disableIdGeneration: config.disableIdGeneration,
            customIdGenerator: config.customIdGenerator,
            supportsUUIDs: config.supportsUUIDs
        });
        const getFieldAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$field$2d$attributes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetFieldAttributes"])({
            schema,
            options,
            usePlural: config.usePlural,
            disableIdGeneration: config.disableIdGeneration,
            customIdGenerator: config.customIdGenerator
        });
        const transformInput = async (data, defaultModelName, action, forceAllowId)=>{
            const transformedData = {};
            const fields = schema[defaultModelName].fields;
            const newMappedKeys = config.mapKeysTransformInput ?? {};
            const useNumberId = options.advanced?.database?.generateId === "serial";
            fields.id = idField({
                customModelName: defaultModelName,
                forceAllowId: forceAllowId && "id" in data
            });
            for(const field in fields){
                let value = data[field];
                const fieldAttributes = fields[field];
                const newFieldName = newMappedKeys[field] || fields[field].fieldName || field;
                if (value === void 0 && (fieldAttributes.defaultValue === void 0 && !fieldAttributes.transform?.input && !(action === "update" && fieldAttributes.onUpdate) || action === "update" && !fieldAttributes.onUpdate)) continue;
                if (fieldAttributes && fieldAttributes.type === "date" && !(value instanceof Date) && typeof value === "string") try {
                    value = new Date(value);
                } catch  {
                    logger.error("[Adapter Factory] Failed to convert string to date", {
                        value,
                        field
                    });
                }
                let newValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withApplyDefault"])(value, fieldAttributes, action);
                if (fieldAttributes.transform?.input) newValue = await fieldAttributes.transform.input(newValue);
                if (fieldAttributes.references?.field === "id" && useNumberId) if (Array.isArray(newValue)) newValue = newValue.map((x)=>x !== null ? Number(x) : null);
                else newValue = newValue !== null ? Number(newValue) : null;
                else if (config.supportsJSON === false && typeof newValue === "object" && fieldAttributes.type === "json") newValue = JSON.stringify(newValue);
                else if (config.supportsArrays === false && Array.isArray(newValue) && (fieldAttributes.type === "string[]" || fieldAttributes.type === "number[]")) newValue = JSON.stringify(newValue);
                else if (config.supportsDates === false && newValue instanceof Date && fieldAttributes.type === "date") newValue = newValue.toISOString();
                else if (config.supportsBooleans === false && typeof newValue === "boolean") newValue = newValue ? 1 : 0;
                if (config.customTransformInput) newValue = config.customTransformInput({
                    data: newValue,
                    action,
                    field: newFieldName,
                    fieldAttributes,
                    model: getModelName(defaultModelName),
                    schema,
                    options
                });
                if (newValue !== void 0) transformedData[newFieldName] = newValue;
            }
            return transformedData;
        };
        const transformOutput = async (data, unsafe_model, select = [], join)=>{
            const transformSingleOutput = async (data, unsafe_model, select = [])=>{
                if (!data) return null;
                const newMappedKeys = config.mapKeysTransformOutput ?? {};
                const transformedData = {};
                const tableSchema = schema[getDefaultModelName(unsafe_model)].fields;
                const idKey = Object.entries(newMappedKeys).find(([_, v])=>v === "id")?.[0];
                tableSchema[idKey ?? "id"] = {
                    type: options.advanced?.database?.generateId === "serial" ? "number" : "string"
                };
                for(const key in tableSchema){
                    if (select.length && !select.includes(key)) continue;
                    const field = tableSchema[key];
                    if (field) {
                        const originalKey = field.fieldName || key;
                        let newValue = data[Object.entries(newMappedKeys).find(([_, v])=>v === originalKey)?.[0] || originalKey];
                        if (field.transform?.output) newValue = await field.transform.output(newValue);
                        const newFieldName = newMappedKeys[key] || key;
                        if (originalKey === "id" || field.references?.field === "id") {
                            if (typeof newValue !== "undefined" && newValue !== null) newValue = String(newValue);
                        } else if (config.supportsJSON === false && typeof newValue === "string" && field.type === "json") newValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$json$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeJSONParse"])(newValue);
                        else if (config.supportsArrays === false && typeof newValue === "string" && (field.type === "string[]" || field.type === "number[]")) newValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$json$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeJSONParse"])(newValue);
                        else if (config.supportsDates === false && typeof newValue === "string" && field.type === "date") newValue = new Date(newValue);
                        else if (config.supportsBooleans === false && typeof newValue === "number" && field.type === "boolean") newValue = newValue === 1;
                        if (config.customTransformOutput) newValue = config.customTransformOutput({
                            data: newValue,
                            field: newFieldName,
                            fieldAttributes: field,
                            select,
                            model: getModelName(unsafe_model),
                            schema,
                            options
                        });
                        transformedData[newFieldName] = newValue;
                    }
                }
                return transformedData;
            };
            if (!join || Object.keys(join).length === 0) return await transformSingleOutput(data, unsafe_model, select);
            unsafe_model = getDefaultModelName(unsafe_model);
            const transformedData = await transformSingleOutput(data, unsafe_model, select);
            const requiredModels = Object.entries(join).map(([model, joinConfig])=>({
                    modelName: getModelName(model),
                    defaultModelName: getDefaultModelName(model),
                    joinConfig
                }));
            if (!data) return null;
            for (const { modelName, defaultModelName, joinConfig } of requiredModels){
                let joinedData = await (async ()=>{
                    if (options.experimental?.joins) return data[modelName];
                    else return await handleFallbackJoin({
                        baseModel: unsafe_model,
                        baseData: transformedData,
                        joinModel: modelName,
                        specificJoinConfig: joinConfig
                    });
                })();
                if (joinedData === void 0 || joinedData === null) joinedData = joinConfig.relation === "one-to-one" ? null : [];
                if (joinConfig.relation === "one-to-many" && !Array.isArray(joinedData)) joinedData = [
                    joinedData
                ];
                const transformed = [];
                if (Array.isArray(joinedData)) for (const item of joinedData){
                    const transformedItem = await transformSingleOutput(item, modelName, []);
                    transformed.push(transformedItem);
                }
                else {
                    const transformedItem = await transformSingleOutput(joinedData, modelName, []);
                    transformed.push(transformedItem);
                }
                transformedData[defaultModelName] = (joinConfig.relation === "one-to-one" ? transformed[0] : transformed) ?? null;
            }
            return transformedData;
        };
        const transformWhereClause = ({ model, where, action })=>{
            if (!where) return void 0;
            const newMappedKeys = config.mapKeysTransformInput ?? {};
            return where.map((w)=>{
                const { field: unsafe_field, value, operator = "eq", connector = "AND", mode = "sensitive" } = w;
                if (operator === "in") {
                    if (!Array.isArray(value)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("Value must be an array");
                }
                let newValue = value;
                const defaultModelName = getDefaultModelName(model);
                const defaultFieldName = getDefaultFieldName({
                    field: unsafe_field,
                    model
                });
                const fieldName = newMappedKeys[defaultFieldName] || getFieldName({
                    field: defaultFieldName,
                    model: defaultModelName
                });
                const fieldAttr = getFieldAttributes({
                    field: defaultFieldName,
                    model: defaultModelName
                });
                const useNumberId = options.advanced?.database?.generateId === "serial";
                if (defaultFieldName === "id" || fieldAttr.references?.field === "id") {
                    if (useNumberId) if (Array.isArray(value)) newValue = value.map(Number);
                    else newValue = Number(value);
                }
                if (fieldAttr.type === "date" && value instanceof Date && !config.supportsDates) newValue = value.toISOString();
                if (fieldAttr.type === "boolean" && typeof newValue === "string") newValue = newValue === "true";
                if (fieldAttr.type === "number") {
                    if (typeof newValue === "string" && newValue.trim() !== "") {
                        const parsed = Number(newValue);
                        if (!Number.isNaN(parsed)) newValue = parsed;
                    } else if (Array.isArray(newValue)) {
                        const parsed = newValue.map((v)=>typeof v === "string" && v.trim() !== "" ? Number(v) : NaN);
                        if (parsed.every((n)=>!Number.isNaN(n))) newValue = parsed;
                    }
                }
                if (fieldAttr.type === "boolean" && typeof newValue === "boolean" && !config.supportsBooleans) newValue = newValue ? 1 : 0;
                if (fieldAttr.type === "json" && typeof value === "object" && !config.supportsJSON) try {
                    newValue = JSON.stringify(value);
                } catch (error) {
                    throw new Error(`Failed to stringify JSON value for field ${fieldName}`, {
                        cause: error
                    });
                }
                if (config.customTransformInput) newValue = config.customTransformInput({
                    data: newValue,
                    fieldAttributes: fieldAttr,
                    field: fieldName,
                    model: getModelName(model),
                    schema,
                    options,
                    action
                });
                return {
                    operator,
                    connector,
                    field: fieldName,
                    value: newValue,
                    mode
                };
            });
        };
        const transformJoinClause = (baseModel, unsanitizedJoin, select)=>{
            if (!unsanitizedJoin) return void 0;
            if (Object.keys(unsanitizedJoin).length === 0) return void 0;
            const transformedJoin = {};
            for (const [model, join] of Object.entries(unsanitizedJoin)){
                if (!join) continue;
                const defaultModelName = getDefaultModelName(model);
                const defaultBaseModelName = getDefaultModelName(baseModel);
                let foreignKeys = Object.entries(schema[defaultModelName].fields).filter(([field, fieldAttributes])=>fieldAttributes.references && getDefaultModelName(fieldAttributes.references.model) === defaultBaseModelName);
                let isForwardJoin = true;
                if (!foreignKeys.length) {
                    foreignKeys = Object.entries(schema[defaultBaseModelName].fields).filter(([field, fieldAttributes])=>fieldAttributes.references && getDefaultModelName(fieldAttributes.references.model) === defaultModelName);
                    isForwardJoin = false;
                }
                if (!foreignKeys.length) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`No foreign key found for model ${model} and base model ${baseModel} while performing join operation.`);
                else if (foreignKeys.length > 1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Multiple foreign keys found for model ${model} and base model ${baseModel} while performing join operation. Only one foreign key is supported.`);
                const [foreignKey, foreignKeyAttributes] = foreignKeys[0];
                if (!foreignKeyAttributes.references) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`No references found for foreign key ${foreignKey} on model ${model} while performing join operation.`);
                let from;
                let to;
                let requiredSelectField;
                if (isForwardJoin) {
                    requiredSelectField = foreignKeyAttributes.references.field;
                    from = getFieldName({
                        model: baseModel,
                        field: requiredSelectField
                    });
                    to = getFieldName({
                        model,
                        field: foreignKey
                    });
                } else {
                    requiredSelectField = foreignKey;
                    from = getFieldName({
                        model: baseModel,
                        field: requiredSelectField
                    });
                    to = getFieldName({
                        model,
                        field: foreignKeyAttributes.references.field
                    });
                }
                if (select && !select.includes(requiredSelectField)) select.push(requiredSelectField);
                const isUnique = to === "id" ? true : foreignKeyAttributes.unique ?? false;
                let limit = options.advanced?.database?.defaultFindManyLimit ?? 100;
                if (isUnique) limit = 1;
                else if (typeof join === "object" && typeof join.limit === "number") limit = join.limit;
                transformedJoin[getModelName(model)] = {
                    on: {
                        from,
                        to
                    },
                    limit,
                    relation: isUnique ? "one-to-one" : "one-to-many"
                };
            }
            return {
                join: transformedJoin,
                select
            };
        };
        /**
	* Handle joins by making separate queries and combining results (fallback for adapters that don't support native joins).
	*/ const handleFallbackJoin = async ({ baseModel, baseData, joinModel, specificJoinConfig: joinConfig })=>{
            if (!baseData) return baseData;
            const modelName = getModelName(joinModel);
            const field = joinConfig.on.to;
            const value = baseData[getDefaultFieldName({
                field: joinConfig.on.from,
                model: baseModel
            })];
            if (value === null || value === void 0) return joinConfig.relation === "one-to-one" ? null : [];
            let result;
            const where = transformWhereClause({
                model: modelName,
                where: [
                    {
                        field,
                        value,
                        operator: "eq",
                        connector: "AND"
                    }
                ],
                action: "findOne"
            });
            try {
                if (joinConfig.relation === "one-to-one") result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db findOne ${modelName}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "findOne",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: modelName
                }, ()=>adapterInstance.findOne({
                        model: modelName,
                        where
                    }));
                else {
                    const limit = joinConfig.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
                    result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db findMany ${modelName}`, {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "findMany",
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: modelName
                    }, ()=>adapterInstance.findMany({
                            model: modelName,
                            where,
                            limit
                        }));
                }
            } catch (error) {
                logger.error(`Failed to query fallback join for model ${modelName}:`, {
                    where,
                    limit: joinConfig.limit
                });
                console.error(error);
                throw error;
            }
            return result;
        };
        const adapterInstance = customAdapter({
            options,
            schema,
            debugLog,
            getFieldName,
            getModelName,
            getDefaultModelName,
            getDefaultFieldName,
            getFieldAttributes,
            transformInput,
            transformOutput,
            transformWhereClause
        });
        let lazyLoadTransaction = null;
        const adapter = {
            transaction: async (cb)=>{
                if (!lazyLoadTransaction) if (!config.transaction) lazyLoadTransaction = createAsIsTransaction(adapter);
                else {
                    logger.debug(`[${config.adapterName}] - Using provided transaction implementation.`);
                    lazyLoadTransaction = config.transaction;
                }
                return lazyLoadTransaction(cb);
            },
            create: async ({ data: unsafeData, model: unsafeModel, select, forceAllowId = false })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                unsafeModel = getDefaultModelName(unsafeModel);
                if ("id" in unsafeData && typeof unsafeData.id !== "undefined" && !forceAllowId) {
                    logger.warn(`[${config.adapterName}] - You are trying to create a record with an id. This is not allowed as we handle id generation for you, unless you pass in the \`forceAllowId\` parameter. The id will be ignored.`);
                    const stack = /* @__PURE__ */ new Error().stack?.split("\n").filter((_, i)=>i !== 1).join("\n").replace("Error:", "Create method with `id` being called at:");
                    console.log(stack);
                    unsafeData.id = void 0;
                }
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`, `${formatMethod("create")} ${formatAction("Unsafe Input")}:`, {
                    model,
                    data: unsafeData
                });
                let data = unsafeData;
                if (!config.disableTransformInput) data = await transformInput(unsafeData, unsafeModel, "create", forceAllowId);
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`, `${formatMethod("create")} ${formatAction("Parsed Input")}:`, {
                    model,
                    data
                });
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db create ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "create",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.create({
                        data,
                        model
                    }));
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`, `${formatMethod("create")} ${formatAction("DB Result")}:`, {
                    model,
                    res
                });
                let transformed = res;
                if (!config.disableTransformOutput) transformed = await transformOutput(res, unsafeModel, select, void 0);
                debugLog({
                    method: "create"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`, `${formatMethod("create")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            update: async ({ model: unsafeModel, where: unsafeWhere, update: unsafeData })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                unsafeModel = getDefaultModelName(unsafeModel);
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "update"
                });
                if (where.length === 0) return null;
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`, `${formatMethod("update")} ${formatAction("Unsafe Input")}:`, {
                    model,
                    data: unsafeData
                });
                let data = unsafeData;
                if (!config.disableTransformInput) data = await transformInput(unsafeData, unsafeModel, "update");
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`, `${formatMethod("update")} ${formatAction("Parsed Input")}:`, {
                    model,
                    data
                });
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db update ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "update",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.update({
                        model,
                        where,
                        update: data
                    }));
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`, `${formatMethod("update")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput) transformed = await transformOutput(res, unsafeModel, void 0, void 0);
                debugLog({
                    method: "update"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`, `${formatMethod("update")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            updateMany: async ({ model: unsafeModel, where: unsafeWhere, update: unsafeData })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "updateMany"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`, `${formatMethod("updateMany")} ${formatAction("Unsafe Input")}:`, {
                    model,
                    data: unsafeData
                });
                let data = unsafeData;
                if (!config.disableTransformInput) data = await transformInput(unsafeData, unsafeModel, "update");
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`, `${formatMethod("updateMany")} ${formatAction("Parsed Input")}:`, {
                    model,
                    data
                });
                const updatedCount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db updateMany ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "updateMany",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.updateMany({
                        model,
                        where,
                        update: data
                    }));
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`, `${formatMethod("updateMany")} ${formatAction("DB Result")}:`, {
                    model,
                    data: updatedCount
                });
                debugLog({
                    method: "updateMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`, `${formatMethod("updateMany")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: updatedCount
                });
                return updatedCount;
            },
            findOne: async ({ model: unsafeModel, where: unsafeWhere, select, join: unsafeJoin })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "findOne"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                let join;
                let passJoinToAdapter = true;
                if (!config.disableTransformJoin) {
                    const result = transformJoinClause(unsafeModel, unsafeJoin, select);
                    if (result) {
                        join = result.join;
                        select = result.select;
                    }
                    if (!options.experimental?.joins && join && Object.keys(join).length > 0) passJoinToAdapter = false;
                } else join = unsafeJoin;
                debugLog({
                    method: "findOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`, `${formatMethod("findOne")}:`, {
                    model,
                    where,
                    select,
                    join
                });
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db findOne ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "findOne",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.findOne({
                        model,
                        where,
                        select,
                        join: passJoinToAdapter ? join : void 0
                    }));
                debugLog({
                    method: "findOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`, `${formatMethod("findOne")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput) transformed = await transformOutput(res, unsafeModel, select, join);
                debugLog({
                    method: "findOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`, `${formatMethod("findOne")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            findMany: async ({ model: unsafeModel, where: unsafeWhere, limit: unsafeLimit, select, sortBy, offset, join: unsafeJoin })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const limit = unsafeLimit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "findMany"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                let join;
                let passJoinToAdapter = true;
                if (!config.disableTransformJoin) {
                    const result = transformJoinClause(unsafeModel, unsafeJoin, select);
                    if (result) {
                        join = result.join;
                        select = result.select;
                    }
                    if (!options.experimental?.joins && join && Object.keys(join).length > 0) passJoinToAdapter = false;
                } else join = unsafeJoin;
                debugLog({
                    method: "findMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`, `${formatMethod("findMany")}:`, {
                    model,
                    where,
                    limit,
                    sortBy,
                    offset,
                    join
                });
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db findMany ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "findMany",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.findMany({
                        model,
                        where,
                        limit,
                        select,
                        sortBy,
                        offset,
                        join: passJoinToAdapter ? join : void 0
                    }));
                debugLog({
                    method: "findMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`, `${formatMethod("findMany")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput) transformed = await Promise.all(res.map(async (r)=>{
                    return await transformOutput(r, unsafeModel, void 0, join);
                }));
                debugLog({
                    method: "findMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`, `${formatMethod("findMany")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            delete: async ({ model: unsafeModel, where: unsafeWhere })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "delete"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "delete"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`, `${formatMethod("delete")}:`, {
                    model,
                    where
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db delete ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "delete",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.delete({
                        model,
                        where
                    }));
                debugLog({
                    method: "delete"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`, `${formatMethod("delete")} ${formatAction("DB Result")}:`, {
                    model
                });
            },
            deleteMany: async ({ model: unsafeModel, where: unsafeWhere })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "deleteMany"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "deleteMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`, `${formatMethod("deleteMany")} ${formatAction("DeleteMany")}:`, {
                    model,
                    where
                });
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db deleteMany ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "deleteMany",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.deleteMany({
                        model,
                        where
                    }));
                debugLog({
                    method: "deleteMany"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`, `${formatMethod("deleteMany")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                return res;
            },
            consumeOne: async ({ model: unsafeModel, where: unsafeWhere })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "consumeOne"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "consumeOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`, `${formatMethod("consumeOne")} ${formatAction("ConsumeOne")}:`, {
                    model,
                    where
                });
                let res;
                let resultNeedsOutputTransform = true;
                if (adapterInstance.consumeOne) res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db consumeOne ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "consumeOne",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.consumeOne({
                        model,
                        where
                    }));
                else {
                    res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db consumeOne ${model}`, {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "consumeOne",
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                    }, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$transaction$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runWithTransaction"])(adapter, async ()=>{
                            const trx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$transaction$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentAdapter"])(adapter);
                            const target = (await trx.findMany({
                                model: unsafeModel,
                                where: unsafeWhere,
                                limit: 1
                            }))[0];
                            if (!target) return null;
                            const deleted = await trx.deleteMany({
                                model: unsafeModel,
                                where: [
                                    ...unsafeWhere,
                                    {
                                        field: "id",
                                        value: target.id,
                                        operator: "eq",
                                        connector: "AND",
                                        mode: "sensitive"
                                    }
                                ]
                            });
                            if (typeof deleted !== "number") throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Adapter "${config.adapterId}" returned a non-numeric value from deleteMany during the consumeOne fallback. Return the number of deleted rows, or implement a native consumeOne for atomic single-use consumption.`);
                            return deleted > 0 ? target : null;
                        }));
                    resultNeedsOutputTransform = false;
                }
                debugLog({
                    method: "consumeOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`, `${formatMethod("consumeOne")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput && resultNeedsOutputTransform && res) transformed = await transformOutput(res, unsafeModel, void 0, void 0);
                debugLog({
                    method: "consumeOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`, `${formatMethod("consumeOne")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            incrementOne: async ({ model: unsafeModel, where: unsafeWhere, increment: unsafeIncrement, set: unsafeSet })=>{
                const hasIncrement = Object.keys(unsafeIncrement).length > 0;
                const hasSet = !!unsafeSet && Object.keys(unsafeSet).length > 0;
                if (!hasIncrement && !hasSet) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("incrementOne requires a non-empty `increment` or `set`; both were empty.");
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "incrementOne"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "incrementOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`, `${formatMethod("incrementOne")} ${formatAction("IncrementOne")}:`, {
                    model,
                    where,
                    increment: unsafeIncrement,
                    set: unsafeSet
                });
                let res;
                let resultNeedsOutputTransform = true;
                if (adapterInstance.incrementOne) {
                    const mappedKeys = config.mapKeysTransformInput ?? {};
                    const increment = {};
                    for (const [field, delta] of Object.entries(unsafeIncrement))increment[mappedKeys[field] || getFieldName({
                        model: unsafeModel,
                        field
                    })] = delta;
                    let set;
                    if (unsafeSet && !config.disableTransformInput) set = await transformInput(unsafeSet, unsafeModel, "update");
                    else set = unsafeSet;
                    if (Object.keys(increment).length === 0 && (!set || Object.keys(set).length === 0)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("incrementOne resolved to an empty update: every increment/set field was unknown to the schema or transformed away.");
                    res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db incrementOne ${model}`, {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "incrementOne",
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                    }, ()=>adapterInstance.incrementOne({
                            model,
                            where,
                            increment,
                            set
                        }));
                } else {
                    res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db incrementOne ${model}`, {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "incrementOne",
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                    }, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$transaction$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runWithTransaction"])(adapter, async ()=>{
                            const trx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$context$2f$transaction$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentAdapter"])(adapter);
                            const target = (await trx.findMany({
                                model: unsafeModel,
                                where: unsafeWhere,
                                limit: 1
                            }))[0];
                            if (!target) return null;
                            const nextValues = {
                                ...unsafeSet ?? {}
                            };
                            for (const [field, delta] of Object.entries(unsafeIncrement))nextValues[field] = (typeof target[field] === "number" ? target[field] : 0) + delta;
                            const updated = await trx.updateMany({
                                model: unsafeModel,
                                where: [
                                    ...unsafeWhere,
                                    {
                                        field: "id",
                                        value: target.id,
                                        operator: "eq",
                                        connector: "AND",
                                        mode: "sensitive"
                                    }
                                ],
                                update: nextValues
                            });
                            if (typeof updated !== "number") throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Adapter "${config.adapterId}" returned a non-numeric value from updateMany during the incrementOne fallback. Return the number of updated rows, or implement a native incrementOne for atomic guarded counter updates.`);
                            return updated > 0 ? {
                                ...target,
                                ...nextValues
                            } : null;
                        }));
                    resultNeedsOutputTransform = false;
                }
                debugLog({
                    method: "incrementOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`, `${formatMethod("incrementOne")} ${formatAction("DB Result")}:`, {
                    model,
                    data: res
                });
                let transformed = res;
                if (!config.disableTransformOutput && resultNeedsOutputTransform && res) transformed = await transformOutput(res, unsafeModel, void 0, void 0);
                debugLog({
                    method: "incrementOne"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`, `${formatMethod("incrementOne")} ${formatAction("Parsed Result")}:`, {
                    model,
                    data: transformed
                });
                return transformed;
            },
            count: async ({ model: unsafeModel, where: unsafeWhere })=>{
                transactionId++;
                const thisTransactionId = transactionId;
                const model = getModelName(unsafeModel);
                const where = transformWhereClause({
                    model: unsafeModel,
                    where: unsafeWhere,
                    action: "count"
                });
                unsafeModel = getDefaultModelName(unsafeModel);
                debugLog({
                    method: "count"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`, `${formatMethod("count")}:`, {
                    model,
                    where
                });
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$tracer$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["withSpan"])(`db count ${model}`, {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_OPERATION_NAME"]]: "count",
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_DB_COLLECTION_NAME"]]: model
                }, ()=>adapterInstance.count({
                        model,
                        where
                    }));
                debugLog({
                    method: "count"
                }, `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`, `${formatMethod("count")}:`, {
                    model,
                    data: res
                });
                return res;
            },
            createSchema: adapterInstance.createSchema ? async (_, file)=>{
                const tables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$get$2d$tables$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthTables"])(options);
                if (options.secondaryStorage && !options.session?.storeSessionInDatabase) delete tables.session;
                return adapterInstance.createSchema({
                    file,
                    tables
                });
            } : void 0,
            options: {
                adapterConfig: config,
                ...adapterInstance.options ?? {}
            },
            id: config.adapterId,
            ...config.debugLogs?.isRunningAdapterTests ? {
                adapterTestDebugLogs: {
                    resetDebugLogs () {
                        debugLogs = debugLogs.filter((log)=>log.instance !== uniqueAdapterFactoryInstanceId);
                    },
                    printDebugLogs () {
                        const separator = `─`.repeat(80);
                        const logs = debugLogs.filter((log)=>log.instance === uniqueAdapterFactoryInstanceId);
                        if (logs.length === 0) return;
                        const log = logs.reverse().map((log)=>{
                            log.args[0] = `\n${log.args[0]}`;
                            return [
                                ...log.args,
                                "\n"
                            ];
                        }).reduce((prev, curr)=>{
                            return [
                                ...curr,
                                ...prev
                            ];
                        }, [
                            `\n${separator}`
                        ]);
                        console.log(...log);
                    }
                }
            } : {}
        };
        return adapter;
    };
function formatTransactionId(transactionId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$color$2d$depth$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColorDepth"])() < 8) return `#${transactionId}`;
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].fg.magenta}#${transactionId}${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
function formatStep(step, total) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].bg.black}${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].fg.yellow}[${step}/${total}]${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
function formatMethod(method) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].bright}${method}${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
function formatAction(action) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].dim}(${action})${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TTY_COLORS"].reset}`;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-field-name.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initGetDefaultFieldName",
    ()=>initGetDefaultFieldName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-model-name.mjs [app-rsc] (ecmascript)");
;
;
//#region src/db/adapter/get-default-field-name.ts
const initGetDefaultFieldName = ({ schema, usePlural })=>{
    const getDefaultModelName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultModelName"])({
        schema,
        usePlural
    });
    /**
	* This function helps us get the default field name from the schema defined by devs.
	* Often times, the user will be using the `fieldName` which could had been customized by the users.
	* This function helps us get the actual field name useful to match against the schema. (eg: schema[model].fields[field])
	*
	* If it's still unclear what this does:
	*
	* 1. User can define a custom fieldName.
	* 2. When using a custom fieldName, doing something like `schema[model].fields[field]` will not work.
	*/ const getDefaultFieldName = ({ field, model: unsafeModel })=>{
        if (field === "id" || field === "_id") return "id";
        const model = getDefaultModelName(unsafeModel);
        let f = schema[model]?.fields[field];
        if (!f) {
            const result = Object.entries(schema[model].fields).find(([_, f])=>f.fieldName === field);
            if (result) {
                f = result[1];
                field = result[0];
            }
        }
        if (!f) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Field ${field} not found in model ${model}`);
        return field;
    };
    return getDefaultFieldName;
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-model-name.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initGetDefaultModelName",
    ()=>initGetDefaultModelName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
;
//#region src/db/adapter/get-default-model-name.ts
const initGetDefaultModelName = ({ usePlural, schema })=>{
    /**
	* This function helps us get the default model name from the schema defined by devs.
	* Often times, the user will be using the `modelName` which could had been customized by the users.
	* This function helps us get the actual model name useful to match against the schema. (eg: schema[model])
	*
	* If it's still unclear what this does:
	*
	* 1. User can define a custom modelName.
	* 2. When using a custom modelName, doing something like `schema[model]` will not work.
	* 3. Using this function helps us get the actual model name based on the user's defined custom modelName.
	*/ const getDefaultModelName = (model)=>{
        const resolve = (candidate)=>{
            if (schema[candidate]) return candidate;
            return Object.entries(schema).find(([_, f])=>f.modelName === candidate)?.[0];
        };
        if (usePlural && model.charAt(model.length - 1) === "s") {
            const m = resolve(model.slice(0, -1));
            if (m) return m;
        }
        const m = resolve(model);
        if (!m) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Model "${model}" not found in schema`);
        return m;
    };
    return getDefaultModelName;
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-field-attributes.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initGetFieldAttributes",
    ()=>initGetFieldAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-model-name.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-field-name.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$id$2d$field$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-id-field.mjs [app-rsc] (ecmascript)");
;
;
;
;
//#region src/db/adapter/get-field-attributes.ts
const initGetFieldAttributes = ({ usePlural, schema, options, customIdGenerator, disableIdGeneration })=>{
    const getDefaultModelName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultModelName"])({
        usePlural,
        schema
    });
    const getDefaultFieldName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultFieldName"])({
        usePlural,
        schema
    });
    const idField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$id$2d$field$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetIdField"])({
        usePlural,
        schema,
        options,
        customIdGenerator,
        disableIdGeneration
    });
    const getFieldAttributes = ({ model, field })=>{
        const defaultModelName = getDefaultModelName(model);
        const defaultFieldName = getDefaultFieldName({
            field,
            model: defaultModelName
        });
        const fields = schema[defaultModelName].fields;
        fields.id = idField({
            customModelName: defaultModelName
        });
        const fieldAttributes = fields[defaultFieldName];
        if (!fieldAttributes) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Field ${field} not found in model ${model}`);
        return fieldAttributes;
    };
    return getFieldAttributes;
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-field-name.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initGetFieldName",
    ()=>initGetFieldName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-model-name.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-field-name.mjs [app-rsc] (ecmascript)");
;
;
//#region src/db/adapter/get-field-name.ts
const initGetFieldName = ({ schema, usePlural })=>{
    const getDefaultModelName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultModelName"])({
        schema,
        usePlural
    });
    const getDefaultFieldName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$field$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultFieldName"])({
        schema,
        usePlural
    });
    /**
	* Get the field name which is expected to be saved in the database based on the user's schema.
	*
	* This function is useful if you need to save the field name to the database.
	*
	* For example, if the user has defined a custom field name for the `user` model, then you can use this function to get the actual field name from the schema.
	*/ function getFieldName({ model: modelName, field: fieldName }) {
        const model = getDefaultModelName(modelName);
        const field = getDefaultFieldName({
            model,
            field: fieldName
        });
        return schema[model]?.fields[field]?.fieldName || field;
    }
    return getFieldName;
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-id-field.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initGetIdField",
    ()=>initGetIdField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$id$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/id.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-model-name.mjs [app-rsc] (ecmascript)");
;
;
;
//#region src/db/adapter/get-id-field.ts
const initGetIdField = ({ usePlural, schema, disableIdGeneration, options, customIdGenerator, supportsUUIDs })=>{
    const getDefaultModelName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultModelName"])({
        usePlural,
        schema
    });
    const idField = ({ customModelName, forceAllowId })=>{
        const useNumberId = options.advanced?.database?.generateId === "serial";
        const useUUIDs = options.advanced?.database?.generateId === "uuid";
        const shouldGenerateId = (()=>{
            if (disableIdGeneration) return false;
            else if (useNumberId && !forceAllowId) return false;
            else if (useUUIDs) return !supportsUUIDs;
            else return true;
        })();
        const model = getDefaultModelName(customModelName ?? "id");
        return {
            type: useNumberId ? "number" : "string",
            required: shouldGenerateId ? true : false,
            ...shouldGenerateId ? {
                defaultValue () {
                    if (disableIdGeneration) return void 0;
                    const generateId$1 = options.advanced?.database?.generateId;
                    if (generateId$1 === false || generateId$1 === "serial") return void 0;
                    if (typeof generateId$1 === "function") return generateId$1({
                        model
                    });
                    if (generateId$1 === "uuid") return crypto.randomUUID();
                    if (customIdGenerator) return customIdGenerator({
                        model
                    });
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$id$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateId"])();
                }
            } : {},
            transform: {
                input: (value)=>{
                    if (!value) return void 0;
                    if (useNumberId) {
                        const numberValue = Number(value);
                        if (isNaN(numberValue)) return;
                        return numberValue;
                    }
                    if (useUUIDs) {
                        if (shouldGenerateId && !forceAllowId) return value;
                        if (disableIdGeneration) return void 0;
                        if (forceAllowId && typeof value === "string") if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) return value;
                        else {
                            const stack = /* @__PURE__ */ new Error().stack?.split("\n").filter((_, i)=>i !== 1).join("\n").replace("Error:", "");
                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].warn("[Adapter Factory] - Invalid UUID value for field `id` provided when `forceAllowId` is true. Generating a new UUID.", stack);
                        }
                        if (supportsUUIDs) return void 0;
                        if (typeof value !== "string" && !supportsUUIDs) return crypto.randomUUID();
                        return;
                    }
                    return value;
                },
                output: (value)=>{
                    if (!value) return void 0;
                    return String(value);
                }
            }
        };
    };
    return idField;
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-model-name.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initGetModelName",
    ()=>initGetModelName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/get-default-model-name.mjs [app-rsc] (ecmascript)");
;
//#region src/db/adapter/get-model-name.ts
const initGetModelName = ({ usePlural, schema })=>{
    const getDefaultModelName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$db$2f$adapter$2f$get$2d$default$2d$model$2d$name$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initGetDefaultModelName"])({
        schema,
        usePlural
    });
    /**
	* Users can overwrite the default model of some tables. This function helps find the correct model name.
	* Furthermore, if the user passes `usePlural` as true in their adapter config,
	* then we should return the model name ending with an `s`.
	*/ const getModelName = (model)=>{
        const defaultModelKey = getDefaultModelName(model);
        if (schema && schema[defaultModelKey] && schema[defaultModelKey].modelName !== model) return usePlural ? `${schema[defaultModelKey].modelName}s` : schema[defaultModelKey].modelName;
        return usePlural ? `${model}s` : model;
    };
    return getModelName;
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/adapter/utils.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deepmerge",
    ()=>deepmerge,
    "withApplyDefault",
    ()=>withApplyDefault
]);
//#region src/db/adapter/utils.ts
function withApplyDefault(value, field, action) {
    if (action === "update") {
        if (value === void 0 && field.onUpdate !== void 0) {
            if (typeof field.onUpdate === "function") return field.onUpdate();
            return field.onUpdate;
        }
        return value;
    }
    if (action === "create") {
        if (value === void 0 || field.required === true && value === null) {
            if (field.defaultValue !== void 0) {
                if (typeof field.defaultValue === "function") return field.defaultValue();
                return field.defaultValue;
            }
        }
    }
    return value;
}
function isObject(item) {
    return item !== null && typeof item === "object" && !Array.isArray(item);
}
function deepmerge(target, source) {
    if (Array.isArray(target) && Array.isArray(source)) return [
        ...target,
        ...source
    ];
    else if (isObject(target) && isObject(source)) {
        const result = {
            ...target
        };
        for (const [key, value] of Object.entries(source)){
            if (value === void 0) continue;
            if (key in target) result[key] = deepmerge(target[key], value);
            else result[key] = value;
        }
        return result;
    }
    return source;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/db/get-tables.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthTables",
    ()=>getAuthTables
]);
//#region src/db/get-tables.ts
const getAuthTables = (options)=>{
    const pluginSchema = (options.plugins ?? []).reduce((acc, plugin)=>{
        const schema = plugin.schema;
        if (!schema) return acc;
        for (const [key, value] of Object.entries(schema))acc[key] = {
            fields: {
                ...acc[key]?.fields,
                ...value.fields
            },
            modelName: value.modelName || key,
            disableMigrations: value.disableMigration ?? acc[key]?.disableMigrations
        };
        return acc;
    }, {});
    const shouldAddRateLimitTable = options.rateLimit?.storage === "database";
    const rateLimitTable = {
        rateLimit: {
            modelName: options.rateLimit?.modelName || "rateLimit",
            fields: {
                key: {
                    type: "string",
                    unique: true,
                    required: true,
                    fieldName: options.rateLimit?.fields?.key || "key"
                },
                count: {
                    type: "number",
                    required: true,
                    fieldName: options.rateLimit?.fields?.count || "count"
                },
                lastRequest: {
                    type: "number",
                    bigint: true,
                    required: true,
                    fieldName: options.rateLimit?.fields?.lastRequest || "lastRequest",
                    defaultValue: ()=>Date.now()
                }
            }
        }
    };
    const { user, session, account, verification, ...pluginTables } = pluginSchema;
    const verificationTable = {
        verification: {
            modelName: options.verification?.modelName || "verification",
            fields: {
                identifier: {
                    type: "string",
                    required: true,
                    fieldName: options.verification?.fields?.identifier || "identifier",
                    index: true
                },
                value: {
                    type: "string",
                    required: true,
                    fieldName: options.verification?.fields?.value || "value"
                },
                expiresAt: {
                    type: "date",
                    required: true,
                    fieldName: options.verification?.fields?.expiresAt || "expiresAt"
                },
                createdAt: {
                    type: "date",
                    required: true,
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    fieldName: options.verification?.fields?.createdAt || "createdAt"
                },
                updatedAt: {
                    type: "date",
                    required: true,
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    onUpdate: ()=>/* @__PURE__ */ new Date(),
                    fieldName: options.verification?.fields?.updatedAt || "updatedAt"
                },
                ...verification?.fields,
                ...options.verification?.additionalFields
            },
            order: 4
        }
    };
    const sessionTable = {
        session: {
            modelName: options.session?.modelName || "session",
            fields: {
                expiresAt: {
                    type: "date",
                    required: true,
                    fieldName: options.session?.fields?.expiresAt || "expiresAt"
                },
                token: {
                    type: "string",
                    required: true,
                    fieldName: options.session?.fields?.token || "token",
                    unique: true
                },
                createdAt: {
                    type: "date",
                    required: true,
                    fieldName: options.session?.fields?.createdAt || "createdAt",
                    defaultValue: ()=>/* @__PURE__ */ new Date()
                },
                updatedAt: {
                    type: "date",
                    required: true,
                    fieldName: options.session?.fields?.updatedAt || "updatedAt",
                    onUpdate: ()=>/* @__PURE__ */ new Date()
                },
                ipAddress: {
                    type: "string",
                    required: false,
                    fieldName: options.session?.fields?.ipAddress || "ipAddress"
                },
                userAgent: {
                    type: "string",
                    required: false,
                    fieldName: options.session?.fields?.userAgent || "userAgent"
                },
                userId: {
                    type: "string",
                    fieldName: options.session?.fields?.userId || "userId",
                    references: {
                        model: "user",
                        field: "id",
                        onDelete: "cascade"
                    },
                    required: true,
                    index: true
                },
                ...session?.fields,
                ...options.session?.additionalFields
            },
            order: 2
        }
    };
    return {
        user: {
            modelName: options.user?.modelName || "user",
            fields: {
                name: {
                    type: "string",
                    required: true,
                    fieldName: options.user?.fields?.name || "name",
                    sortable: true
                },
                email: {
                    type: "string",
                    unique: true,
                    required: true,
                    fieldName: options.user?.fields?.email || "email",
                    sortable: true
                },
                emailVerified: {
                    type: "boolean",
                    defaultValue: false,
                    required: true,
                    fieldName: options.user?.fields?.emailVerified || "emailVerified",
                    input: false
                },
                image: {
                    type: "string",
                    required: false,
                    fieldName: options.user?.fields?.image || "image"
                },
                createdAt: {
                    type: "date",
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    required: true,
                    fieldName: options.user?.fields?.createdAt || "createdAt"
                },
                updatedAt: {
                    type: "date",
                    defaultValue: ()=>/* @__PURE__ */ new Date(),
                    onUpdate: ()=>/* @__PURE__ */ new Date(),
                    required: true,
                    fieldName: options.user?.fields?.updatedAt || "updatedAt"
                },
                ...user?.fields,
                ...options.user?.additionalFields
            },
            order: 1
        },
        ...!options.secondaryStorage || options.session?.storeSessionInDatabase ? sessionTable : {},
        account: {
            modelName: options.account?.modelName || "account",
            fields: {
                accountId: {
                    type: "string",
                    required: true,
                    fieldName: options.account?.fields?.accountId || "accountId"
                },
                providerId: {
                    type: "string",
                    required: true,
                    fieldName: options.account?.fields?.providerId || "providerId"
                },
                userId: {
                    type: "string",
                    references: {
                        model: "user",
                        field: "id",
                        onDelete: "cascade"
                    },
                    required: true,
                    fieldName: options.account?.fields?.userId || "userId",
                    index: true
                },
                accessToken: {
                    type: "string",
                    required: false,
                    returned: false,
                    fieldName: options.account?.fields?.accessToken || "accessToken"
                },
                refreshToken: {
                    type: "string",
                    required: false,
                    returned: false,
                    fieldName: options.account?.fields?.refreshToken || "refreshToken"
                },
                idToken: {
                    type: "string",
                    required: false,
                    returned: false,
                    fieldName: options.account?.fields?.idToken || "idToken"
                },
                accessTokenExpiresAt: {
                    type: "date",
                    required: false,
                    returned: false,
                    fieldName: options.account?.fields?.accessTokenExpiresAt || "accessTokenExpiresAt"
                },
                refreshTokenExpiresAt: {
                    type: "date",
                    required: false,
                    returned: false,
                    fieldName: options.account?.fields?.refreshTokenExpiresAt || "refreshTokenExpiresAt"
                },
                scope: {
                    type: "string",
                    required: false,
                    fieldName: options.account?.fields?.scope || "scope"
                },
                password: {
                    type: "string",
                    required: false,
                    returned: false,
                    fieldName: options.account?.fields?.password || "password"
                },
                createdAt: {
                    type: "date",
                    required: true,
                    fieldName: options.account?.fields?.createdAt || "createdAt",
                    defaultValue: ()=>/* @__PURE__ */ new Date()
                },
                updatedAt: {
                    type: "date",
                    required: true,
                    fieldName: options.account?.fields?.updatedAt || "updatedAt",
                    onUpdate: ()=>/* @__PURE__ */ new Date()
                },
                ...account?.fields,
                ...options.account?.additionalFields
            },
            order: 3
        },
        ...!options.secondaryStorage || options.verification?.storeInDatabase ? verificationTable : {},
        ...pluginTables,
        ...shouldAddRateLimitTable ? rateLimitTable : {}
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/env/color-depth.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getColorDepth",
    ()=>getColorDepth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/env-impl.mjs [app-rsc] (ecmascript)");
;
//#region src/env/color-depth.ts
const COLORS_2 = 1;
const COLORS_16 = 4;
const COLORS_256 = 8;
const COLORS_16m = 24;
const TERM_ENVS = {
    eterm: COLORS_16,
    cons25: COLORS_16,
    console: COLORS_16,
    cygwin: COLORS_16,
    dtterm: COLORS_16,
    gnome: COLORS_16,
    hurd: COLORS_16,
    jfbterm: COLORS_16,
    konsole: COLORS_16,
    kterm: COLORS_16,
    mlterm: COLORS_16,
    mosh: COLORS_16m,
    putty: COLORS_16,
    st: COLORS_16,
    "rxvt-unicode-24bit": COLORS_16m,
    terminator: COLORS_16m,
    "xterm-kitty": COLORS_16m
};
const CI_ENVS_MAP = new Map(Object.entries({
    APPVEYOR: COLORS_256,
    BUILDKITE: COLORS_256,
    CIRCLECI: COLORS_16m,
    DRONE: COLORS_256,
    GITEA_ACTIONS: COLORS_16m,
    GITHUB_ACTIONS: COLORS_16m,
    GITLAB_CI: COLORS_256,
    TRAVIS: COLORS_256
}));
const TERM_ENVS_REG_EXP = [
    /ansi/,
    /color/,
    /linux/,
    /direct/,
    /^con[0-9]*x[0-9]/,
    /^rxvt/,
    /^screen/,
    /^xterm/,
    /^vt100/,
    /^vt220/
];
function getColorDepth() {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("FORCE_COLOR") !== void 0) switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("FORCE_COLOR")){
        case "":
        case "1":
        case "true":
            return COLORS_16;
        case "2":
            return COLORS_256;
        case "3":
            return COLORS_16m;
        default:
            return COLORS_2;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("NODE_DISABLE_COLORS") !== void 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("NODE_DISABLE_COLORS") !== "" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("NO_COLOR") !== void 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("NO_COLOR") !== "" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM") === "dumb") return COLORS_2;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TMUX")) return COLORS_16m;
    if ("TF_BUILD" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"] && "AGENT_NAME" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"]) return COLORS_16;
    if ("CI" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"]) {
        for (const { 0: envName, 1: colors } of CI_ENVS_MAP)if (envName in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"]) return colors;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("CI_NAME") === "codeship") return COLORS_256;
        return COLORS_2;
    }
    if ("TEAMCITY_VERSION" in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"]) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.exec((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TEAMCITY_VERSION")) !== null ? COLORS_16 : COLORS_2;
    switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM_PROGRAM")){
        case "iTerm.app":
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM_PROGRAM_VERSION") || /^[0-2]\./.exec((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM_PROGRAM_VERSION")) !== null) return COLORS_256;
            return COLORS_16m;
        case "HyperTerm":
        case "MacTerm":
            return COLORS_16m;
        case "Apple_Terminal":
            return COLORS_256;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("COLORTERM") === "truecolor" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("COLORTERM") === "24bit") return COLORS_16m;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM")) {
        if (/truecolor/.exec((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM")) !== null) return COLORS_16m;
        if (/^xterm-256/.exec((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM")) !== null) return COLORS_256;
        const termEnv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("TERM").toLowerCase();
        if (TERM_ENVS[termEnv]) return TERM_ENVS[termEnv];
        if (TERM_ENVS_REG_EXP.some((term)=>term.exec(termEnv) !== null)) return COLORS_16;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnvVar"])("COLORTERM")) return COLORS_16;
    return COLORS_2;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/env/env-impl.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENV",
    ()=>ENV,
    "env",
    ()=>env,
    "getBooleanEnvVar",
    ()=>getBooleanEnvVar,
    "getEnvVar",
    ()=>getEnvVar,
    "isDevelopment",
    ()=>isDevelopment,
    "isProduction",
    ()=>isProduction,
    "isTest",
    ()=>isTest,
    "nodeENV",
    ()=>nodeENV
]);
//#region src/env/env-impl.ts
const _envShim = Object.create(null);
const _getEnv = (useShim)=>globalThis.process?.env || globalThis.Deno?.env.toObject() || globalThis.__env__ || (useShim ? _envShim : globalThis);
const env = new Proxy(_envShim, {
    get (_, prop) {
        return _getEnv()[prop] ?? _envShim[prop];
    },
    has (_, prop) {
        return prop in _getEnv() || prop in _envShim;
    },
    set (_, prop, value) {
        const env = _getEnv(true);
        env[prop] = value;
        return true;
    },
    deleteProperty (_, prop) {
        if (!prop) return false;
        const env = _getEnv(true);
        delete env[prop];
        return true;
    },
    ownKeys () {
        const env = _getEnv(true);
        return Object.keys(env);
    }
});
function toBoolean(val) {
    return val ? val !== "false" : false;
}
const nodeENV = env.NODE_ENV ?? "";
/** Detect if `NODE_ENV` environment variable is `production` */ const isProduction = nodeENV === "production";
/** Detect if `NODE_ENV` environment variable is `dev` or `development` */ const isDevelopment = ()=>nodeENV === "dev" || nodeENV === "development";
/** Detect if `NODE_ENV` environment variable is `test` */ const isTest = ()=>nodeENV === "test" || toBoolean(env.TEST);
/**
* Get environment variable with fallback
*/ function getEnvVar(key, fallback) {
    if (typeof process !== "undefined" && process.env) return process.env[key] ?? fallback;
    if (typeof Deno !== "undefined") return Deno.env.get(key) ?? fallback;
    if (typeof Bun !== "undefined") return Bun.env[key] ?? fallback;
    return fallback;
}
/**
* Get boolean environment variable
*/ function getBooleanEnvVar(key, fallback = true) {
    const value = getEnvVar(key);
    if (!value) return fallback;
    return value !== "0" && value.toLowerCase() !== "false" && value !== "";
}
/**
* Common environment variables used in Better Auth
*/ const ENV = Object.freeze({
    get BETTER_AUTH_SECRET () {
        return getEnvVar("BETTER_AUTH_SECRET");
    },
    get AUTH_SECRET () {
        return getEnvVar("AUTH_SECRET");
    },
    get BETTER_AUTH_TELEMETRY () {
        return getEnvVar("BETTER_AUTH_TELEMETRY");
    },
    get BETTER_AUTH_TELEMETRY_ID () {
        return getEnvVar("BETTER_AUTH_TELEMETRY_ID");
    },
    get NODE_ENV () {
        return getEnvVar("NODE_ENV", "development");
    },
    get PACKAGE_VERSION () {
        return getEnvVar("PACKAGE_VERSION", "0.0.0");
    },
    get BETTER_AUTH_TELEMETRY_ENDPOINT () {
        return getEnvVar("BETTER_AUTH_TELEMETRY_ENDPOINT", "");
    }
});
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TTY_COLORS",
    ()=>TTY_COLORS,
    "createLogger",
    ()=>createLogger,
    "levels",
    ()=>levels,
    "logger",
    ()=>logger,
    "shouldPublishLog",
    ()=>shouldPublishLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$color$2d$depth$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/color-depth.mjs [app-rsc] (ecmascript)");
;
//#region src/env/logger.ts
const TTY_COLORS = {
    reset: "\x1B[0m",
    bright: "\x1B[1m",
    dim: "\x1B[2m",
    undim: "\x1B[22m",
    underscore: "\x1B[4m",
    blink: "\x1B[5m",
    reverse: "\x1B[7m",
    hidden: "\x1B[8m",
    fg: {
        black: "\x1B[30m",
        red: "\x1B[31m",
        green: "\x1B[32m",
        yellow: "\x1B[33m",
        blue: "\x1B[34m",
        magenta: "\x1B[35m",
        cyan: "\x1B[36m",
        white: "\x1B[37m"
    },
    bg: {
        black: "\x1B[40m",
        red: "\x1B[41m",
        green: "\x1B[42m",
        yellow: "\x1B[43m",
        blue: "\x1B[44m",
        magenta: "\x1B[45m",
        cyan: "\x1B[46m",
        white: "\x1B[47m"
    }
};
const levels = [
    "debug",
    "info",
    "success",
    "warn",
    "error"
];
function shouldPublishLog(currentLogLevel, logLevel) {
    return levels.indexOf(logLevel) >= levels.indexOf(currentLogLevel);
}
const levelColors = {
    info: TTY_COLORS.fg.blue,
    success: TTY_COLORS.fg.green,
    warn: TTY_COLORS.fg.yellow,
    error: TTY_COLORS.fg.red,
    debug: TTY_COLORS.fg.magenta
};
const formatMessage = (level, message, colorsEnabled)=>{
    const timestamp = /* @__PURE__ */ new Date().toISOString();
    if (colorsEnabled) return `${TTY_COLORS.dim}${timestamp}${TTY_COLORS.reset} ${levelColors[level]}${level.toUpperCase()}${TTY_COLORS.reset} ${TTY_COLORS.bright}[Better Auth]:${TTY_COLORS.reset} ${message}`;
    return `${timestamp} ${level.toUpperCase()} [Better Auth]: ${message}`;
};
const createLogger = (options)=>{
    const enabled = options?.disabled !== true;
    const logLevel = options?.level ?? "warn";
    const colorsEnabled = options?.disableColors !== void 0 ? !options.disableColors : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$color$2d$depth$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColorDepth"])() !== 1;
    const LogFunc = (level, message, args = [])=>{
        if (!enabled || !shouldPublishLog(logLevel, level)) return;
        const formattedMessage = formatMessage(level, message, colorsEnabled);
        if (!options || typeof options.log !== "function") {
            if (level === "error") console.error(formattedMessage, ...args);
            else if (level === "warn") console.warn(formattedMessage, ...args);
            else console.log(formattedMessage, ...args);
            return;
        }
        options.log(level === "success" ? "info" : level, message, ...args);
    };
    return {
        ...Object.fromEntries(levels.map((level)=>[
                level,
                (...[message, ...args])=>LogFunc(level, message, args)
            ])),
        get level () {
            return logLevel;
        }
    };
};
const logger = createLogger();
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/error/codes.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_ERROR_CODES",
    ()=>BASE_ERROR_CODES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$error$2d$codes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/error-codes.mjs [app-rsc] (ecmascript)");
;
//#region src/error/codes.ts
const BASE_ERROR_CODES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$error$2d$codes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineErrorCodes"])({
    USER_NOT_FOUND: "User not found",
    FAILED_TO_CREATE_USER: "Failed to create user",
    FAILED_TO_CREATE_SESSION: "Failed to create session",
    FAILED_TO_UPDATE_USER: "Failed to update user",
    FAILED_TO_GET_SESSION: "Failed to get session",
    INVALID_PASSWORD: "Invalid password",
    INVALID_EMAIL: "Invalid email",
    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
    INVALID_USER: "Invalid user",
    SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked",
    PROVIDER_NOT_FOUND: "Provider not found",
    INVALID_TOKEN: "Invalid token",
    TOKEN_EXPIRED: "Token expired",
    ID_TOKEN_NOT_SUPPORTED: "id_token not supported",
    FAILED_TO_GET_USER_INFO: "Failed to get user info",
    USER_EMAIL_NOT_FOUND: "User email not found",
    EMAIL_NOT_VERIFIED: "Email not verified",
    PASSWORD_TOO_SHORT: "Password too short",
    PASSWORD_TOO_LONG: "Password too long",
    USER_ALREADY_EXISTS: "User already exists.",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.",
    EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated",
    CHANGE_EMAIL_DISABLED: "Change email is disabled",
    CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found",
    SESSION_EXPIRED: "Session expired. Re-authenticate to perform this action.",
    FAILED_TO_UNLINK_LAST_ACCOUNT: "You can't unlink your last account",
    ACCOUNT_NOT_FOUND: "Account not found",
    USER_ALREADY_HAS_PASSWORD: "User already has a password. Provide that to delete the account.",
    CROSS_SITE_NAVIGATION_LOGIN_BLOCKED: "Cross-site navigation login blocked. This request appears to be a CSRF attack.",
    VERIFICATION_EMAIL_NOT_ENABLED: "Verification email isn't enabled",
    EMAIL_ALREADY_VERIFIED: "Email is already verified",
    EMAIL_MISMATCH: "Email mismatch",
    SESSION_NOT_FRESH: "Session is not fresh",
    LINKED_ACCOUNT_ALREADY_EXISTS: "Linked account already exists",
    INVALID_ORIGIN: "Invalid origin",
    INVALID_CALLBACK_URL: "Invalid callbackURL",
    INVALID_REDIRECT_URL: "Invalid redirectURL",
    INVALID_ERROR_CALLBACK_URL: "Invalid errorCallbackURL",
    INVALID_NEW_USER_CALLBACK_URL: "Invalid newUserCallbackURL",
    MISSING_OR_NULL_ORIGIN: "Missing or null Origin",
    CALLBACK_URL_REQUIRED: "callbackURL is required",
    FAILED_TO_CREATE_VERIFICATION: "Unable to create verification",
    FIELD_NOT_ALLOWED: "Field not allowed to be set",
    ASYNC_VALIDATION_NOT_SUPPORTED: "Async validation is not supported",
    VALIDATION_ERROR: "Validation Error",
    MISSING_FIELD: "Field is required",
    METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED: "POST method requires deferSessionRefresh to be enabled in session config",
    BODY_MUST_BE_AN_OBJECT: "Body must be an object",
    PASSWORD_ALREADY_SET: "User already has a password set"
});
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIError",
    ()=>APIError,
    "BetterAuthError",
    ()=>BetterAuthError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$codes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/codes.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
;
;
//#region src/error/index.ts
var BetterAuthError = class extends Error {
    constructor(message, options){
        super(message, options);
        this.name = "BetterAuthError";
        this.message = message;
        this.stack = "";
    }
};
var APIError = class APIError extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"] {
    constructor(...args){
        super(...args);
    }
    static fromStatus(status, body) {
        return new APIError(status, body);
    }
    static from(status, error) {
        return new APIError(status, {
            message: error.message,
            code: error.code
        });
    }
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/instrumentation/api.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOpenTelemetryAPI",
    ()=>getOpenTelemetryAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$noop$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/instrumentation/noop.mjs [app-rsc] (ecmascript)");
;
//#region src/instrumentation/api.ts
let openTelemetryAPIPromise;
let openTelemetryAPI;
function getOpenTelemetryAPI() {
    if (!openTelemetryAPIPromise) openTelemetryAPIPromise = __turbopack_context__.A("[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs, async loader)").then((mod)=>{
        openTelemetryAPI = mod;
    }).catch(()=>void 0);
    return openTelemetryAPI ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$noop$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["noopOpenTelemetryAPI"];
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/instrumentation/attributes.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ATTR_CONTEXT",
    ()=>ATTR_CONTEXT,
    "ATTR_HOOK_TYPE",
    ()=>ATTR_HOOK_TYPE,
    "ATTR_OPERATION_ID",
    ()=>ATTR_OPERATION_ID
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [app-rsc] (ecmascript)");
;
//#region src/instrumentation/attributes.ts
/** Operation identifier (e.g. getSession, signUpWithEmailAndPassword). Uses endpoint operationId when set, otherwise the endpoint key. */ const ATTR_OPERATION_ID = "better_auth.operation_id";
/** Hook type (e.g. before, after, create.before). */ const ATTR_HOOK_TYPE = "better_auth.hook.type";
/** Execution context (e.g. user, plugin:id). */ const ATTR_CONTEXT = "better_auth.context";
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/instrumentation/noop.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "noopOpenTelemetryAPI",
    ()=>noopOpenTelemetryAPI
]);
//#region src/instrumentation/noop.ts
function createNoopSpan() {
    const span = {
        end () {},
        setAttribute (_key, _value) {},
        setStatus (_status) {},
        recordException (_exception) {},
        updateName (_name) {
            return span;
        }
    };
    return span;
}
function createNoopTracer(noopSpan) {
    function startActiveSpan(_name, ...rest) {
        const fn = rest[rest.length - 1];
        return fn(noopSpan);
    }
    return {
        startActiveSpan
    };
}
function createNoopTraceAPI() {
    const noopTracer = createNoopTracer(createNoopSpan());
    return {
        getTracer (_name, _version) {
            return noopTracer;
        },
        getActiveSpan () {}
    };
}
function createNoopOpenTelemetryAPI() {
    return {
        SpanStatusCode: {
            UNSET: 0,
            OK: 1,
            ERROR: 2
        },
        trace: createNoopTraceAPI()
    };
}
const noopOpenTelemetryAPI = createNoopOpenTelemetryAPI();
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/instrumentation/tracer.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withSpan",
    ()=>withSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$api$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/instrumentation/api.mjs [app-rsc] (ecmascript)");
;
;
//#region src/instrumentation/tracer.ts
const INSTRUMENTATION_SCOPE = "better-auth";
const INSTRUMENTATION_VERSION = "1.6.26";
/**
* Better-auth uses `throw ctx.redirect(url)` for flow control (e.g. OAuth
* callbacks). These are APIErrors with 3xx status codes and should not be
* recorded as span errors.
*/ function isRedirectError(err) {
    if (err != null && typeof err === "object" && "name" in err && err.name === "APIError" && "statusCode" in err) {
        const status = err.statusCode;
        return status >= 300 && status < 400;
    }
    return false;
}
function endSpanWithError(span, err) {
    const { SpanStatusCode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$api$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOpenTelemetryAPI"])();
    if (isRedirectError(err)) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_HTTP_RESPONSE_STATUS_CODE"], err.statusCode);
        span.setStatus({
            code: SpanStatusCode.OK
        });
    } else {
        span.recordException(err);
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: String(err?.message ?? err)
        });
    }
    span.end();
}
function withSpan(name, attributes, fn) {
    const { trace } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$instrumentation$2f$api$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOpenTelemetryAPI"])();
    return trace.getTracer(INSTRUMENTATION_SCOPE, INSTRUMENTATION_VERSION).startActiveSpan(name, {
        attributes
    }, (span)=>{
        try {
            const result = fn();
            if (result instanceof Promise) return result.then((value)=>{
                span.end();
                return value;
            }).catch((err)=>{
                endSpanWithError(span, err);
                throw err;
            });
            span.end();
            return result;
        } catch (err) {
            endSpanWithError(span, err);
            throw err;
        }
    });
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAuthorizationURL",
    ()=>createAuthorizationURL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
;
//#region src/oauth2/create-authorization-url.ts
async function createAuthorizationURL({ id, options, authorizationEndpoint, state, codeVerifier, scopes, claims, redirectURI, duration, prompt, accessType, responseType, display, loginHint, hd, responseMode, additionalParams, scopeJoiner }) {
    options = typeof options === "function" ? await options() : options;
    const url = new URL(options.authorizationEndpoint || authorizationEndpoint);
    url.searchParams.set("response_type", responseType || "code");
    const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
    url.searchParams.set("client_id", primaryClientId);
    url.searchParams.set("state", state);
    if (scopes) url.searchParams.set("scope", scopes.join(scopeJoiner || " "));
    url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
    duration && url.searchParams.set("duration", duration);
    display && url.searchParams.set("display", display);
    loginHint && url.searchParams.set("login_hint", loginHint);
    prompt && url.searchParams.set("prompt", prompt);
    hd && url.searchParams.set("hd", hd);
    accessType && url.searchParams.set("access_type", accessType);
    responseMode && url.searchParams.set("response_mode", responseMode);
    if (codeVerifier) {
        const codeChallenge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateCodeChallenge"])(codeVerifier);
        url.searchParams.set("code_challenge_method", "S256");
        url.searchParams.set("code_challenge", codeChallenge);
    }
    if (claims) {
        const claimsObj = claims.reduce((acc, claim)=>{
            acc[claim] = null;
            return acc;
        }, {});
        url.searchParams.set("claims", JSON.stringify({
            id_token: {
                email: null,
                email_verified: null,
                ...claimsObj
            }
        }));
    }
    if (additionalParams) Object.entries(additionalParams).forEach(([key, value])=>{
        url.searchParams.set(key, value);
    });
    return url;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRefreshAccessTokenRequest",
    ()=>createRefreshAccessTokenRequest,
    "refreshAccessToken",
    ()=>refreshAccessToken,
    "refreshAccessTokenRequest",
    ()=>refreshAccessTokenRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$reject$2d$redirects$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/reject-redirects.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
;
;
//#region src/oauth2/refresh-access-token.ts
async function refreshAccessTokenRequest({ refreshToken, options, authentication, extraParams, resource }) {
    options = typeof options === "function" ? await options() : options;
    return createRefreshAccessTokenRequest({
        refreshToken,
        options,
        authentication,
        extraParams,
        resource
    });
}
/**
* @deprecated use async'd refreshAccessTokenRequest instead
*/ function createRefreshAccessTokenRequest({ refreshToken, options, authentication, extraParams, resource }) {
    const body = new URLSearchParams();
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json"
    };
    body.set("grant_type", "refresh_token");
    body.set("refresh_token", refreshToken);
    if (authentication === "basic") {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        if (primaryClientId) headers["authorization"] = "Basic " + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(`${primaryClientId}:${options.clientSecret ?? ""}`);
        else headers["authorization"] = "Basic " + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(`:${options.clientSecret ?? ""}`);
    } else {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        body.set("client_id", primaryClientId);
        if (options.clientSecret) body.set("client_secret", options.clientSecret);
    }
    if (resource) if (typeof resource === "string") body.append("resource", resource);
    else for (const _resource of resource)body.append("resource", _resource);
    if (extraParams) for (const [key, value] of Object.entries(extraParams))body.set(key, value);
    return {
        body,
        headers
    };
}
async function refreshAccessToken({ refreshToken, options, tokenEndpoint, authentication, extraParams }) {
    const { body, headers } = await createRefreshAccessTokenRequest({
        refreshToken,
        options,
        authentication,
        extraParams
    });
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$reject$2d$redirects$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchRefusingRedirects"])(tokenEndpoint, {
        method: "POST",
        body,
        headers
    });
    if (error) throw error;
    const tokens = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        tokenType: data.token_type,
        scopes: data.scope?.split(" "),
        idToken: data.id_token
    };
    if (data.expires_in) tokens.accessTokenExpiresAt = new Date(/* @__PURE__ */ new Date().getTime() + data.expires_in * 1e3);
    if (data.refresh_token_expires_in) tokens.refreshTokenExpiresAt = new Date(/* @__PURE__ */ new Date().getTime() + data.refresh_token_expires_in * 1e3);
    return tokens;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/reject-redirects.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NO_FOLLOW_REDIRECT",
    ()=>NO_FOLLOW_REDIRECT,
    "assertResponseNotRedirect",
    ()=>assertResponseNotRedirect,
    "fetchRefusingRedirects",
    ()=>fetchRefusingRedirects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
//#region src/oauth2/reject-redirects.ts
const HTTP_REDIRECT_STATUSES = /* @__PURE__ */ new Set([
    301,
    302,
    303,
    307,
    308
]);
/**
* Whether a response from a `redirect: "manual"` fetch is a redirect.
*
* Node/undici exposes the real 3xx status. Spec-compliant runtimes (Cloudflare
* Workers, Deno, browsers) return an opaque-redirect filtered response with
* status 0 and type `"opaqueredirect"`, so the status alone is not enough.
*/ function isRedirectResponse(response) {
    return response.type === "opaqueredirect" || HTTP_REDIRECT_STATUSES.has(response.status);
}
function redirectRefused(endpoint) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`The OAuth endpoint "${endpoint}" returned an HTTP redirect. Server-side OAuth fetches refuse redirects to prevent SSRF; configure the final endpoint URL.`);
}
/**
* Fetch option that refuses HTTP redirects portably.
*
* Cloudflare Workers (workerd) rejects `redirect: "error"`, so manual mode is
* used and the resolved response is checked with {@link assertResponseNotRedirect}
* (or, for betterFetch, with {@link fetchRefusingRedirects}).
*/ const NO_FOLLOW_REDIRECT = {
    redirect: "manual"
};
/**
* Throw when a native-`fetch` response (e.g. jose's JWKS loader) resolved to a
* redirect, so an attacker-influenced endpoint cannot bounce a server-side
* request to an internal address.
*/ function assertResponseNotRedirect(endpoint, response) {
    if (isRedirectResponse(response)) throw redirectRefused(endpoint);
}
/**
* betterFetch that refuses HTTP redirects on a server-side OAuth fetch.
*
* Returns the betterFetch result and throws if the endpoint redirected, on both
* undici (real 3xx status) and spec-compliant runtimes (opaque redirect, where
* the error status is 0). The redirect is never followed on any runtime.
*/ async function fetchRefusingRedirects(url, options) {
    let redirected = false;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(url, {
        ...options,
        ...NO_FOLLOW_REDIRECT,
        onError (context) {
            if (isRedirectResponse(context.response)) redirected = true;
        }
    });
    if (redirected) throw redirectRefused(url);
    return result;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyDefaultAccessTokenExpiry",
    ()=>applyDefaultAccessTokenExpiry,
    "generateCodeChallenge",
    ()=>generateCodeChallenge,
    "getOAuth2Tokens",
    ()=>getOAuth2Tokens,
    "getPrimaryClientId",
    ()=>getPrimaryClientId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
;
//#region src/oauth2/utils.ts
function getOAuth2Tokens(data) {
    const getDate = (seconds)=>{
        return new Date(/* @__PURE__ */ new Date().getTime() + seconds * 1e3);
    };
    return {
        tokenType: data.token_type,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        accessTokenExpiresAt: data.expires_in ? getDate(data.expires_in) : void 0,
        refreshTokenExpiresAt: data.refresh_token_expires_in ? getDate(data.refresh_token_expires_in) : void 0,
        scopes: data?.scope ? typeof data.scope === "string" ? data.scope.split(" ") : data.scope : [],
        idToken: data.id_token,
        raw: data
    };
}
/**
* Fill in `accessTokenExpiresAt` from the provider's configured
* `accessTokenExpiresIn` when the token response omitted `expires_in`. Without a
* known expiry, `getAccessToken` cannot tell the token is expired and never
* refreshes it. No-op when the provider already supplied an expiry or no
* fallback is configured.
*/ function applyDefaultAccessTokenExpiry(tokens, accessTokenExpiresIn) {
    if (!tokens.accessTokenExpiresAt && accessTokenExpiresIn) tokens.accessTokenExpiresAt = new Date(Date.now() + accessTokenExpiresIn * 1e3);
    return tokens;
}
/**
* Return the provider's primary Client ID: the single string, or the entry at
* array index 0 for the cross-platform form used by ID token audience
* verification. Index 0 is the designated primary and pairs with
* `clientSecret` for the authorization code flow; later array entries are
* only used as additional accepted audiences. Returns `undefined` when the
* primary value is missing or an empty string.
*/ function getPrimaryClientId(clientId) {
    const value = Array.isArray(clientId) ? clientId[0] : clientId;
    return typeof value === "string" && value.length > 0 ? value : void 0;
}
async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64Url"].encode(new Uint8Array(hash), {
        padding: false
    });
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorizationCodeRequest",
    ()=>authorizationCodeRequest,
    "createAuthorizationCodeRequest",
    ()=>createAuthorizationCodeRequest,
    "validateAuthorizationCode",
    ()=>validateAuthorizationCode,
    "validateToken",
    ()=>validateToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$reject$2d$redirects$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/reject-redirects.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwks$2f$remote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwks/remote.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/oauth2/validate-authorization-code.ts
async function authorizationCodeRequest({ code, codeVerifier, redirectURI, options, authentication, deviceId, headers, additionalParams = {}, resource }) {
    options = typeof options === "function" ? await options() : options;
    return createAuthorizationCodeRequest({
        code,
        codeVerifier,
        redirectURI,
        options,
        authentication,
        deviceId,
        headers,
        additionalParams,
        resource
    });
}
/**
* @deprecated use async'd authorizationCodeRequest instead
*/ function createAuthorizationCodeRequest({ code, codeVerifier, redirectURI, options, authentication, deviceId, headers, additionalParams = {}, resource }) {
    const body = new URLSearchParams();
    const requestHeaders = {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json",
        ...headers
    };
    body.set("grant_type", "authorization_code");
    body.set("code", code);
    codeVerifier && body.set("code_verifier", codeVerifier);
    options.clientKey && body.set("client_key", options.clientKey);
    deviceId && body.set("device_id", deviceId);
    body.set("redirect_uri", options.redirectURI || redirectURI);
    if (resource) if (typeof resource === "string") body.append("resource", resource);
    else for (const _resource of resource)body.append("resource", _resource);
    if (authentication === "basic") {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        requestHeaders["authorization"] = `Basic ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(`${primaryClientId}:${options.clientSecret ?? ""}`)}`;
    } else {
        const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
        body.set("client_id", primaryClientId);
        if (options.clientSecret) body.set("client_secret", options.clientSecret);
    }
    for (const [key, value] of Object.entries(additionalParams))if (!body.has(key)) body.append(key, value);
    return {
        body,
        headers: requestHeaders
    };
}
async function validateAuthorizationCode({ code, codeVerifier, redirectURI, options, tokenEndpoint, authentication, deviceId, headers, additionalParams = {}, resource }) {
    const { body, headers: requestHeaders } = await authorizationCodeRequest({
        code,
        codeVerifier,
        redirectURI,
        options,
        authentication,
        deviceId,
        headers,
        additionalParams,
        resource
    });
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$reject$2d$redirects$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchRefusingRedirects"])(tokenEndpoint, {
        method: "POST",
        body,
        headers: requestHeaders
    });
    if (error) throw error;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOAuth2Tokens"])(data);
}
async function validateToken(token, jwksEndpoint, options) {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwks$2f$remote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRemoteJWKSet"])(new URL(jwksEndpoint), {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwks$2f$remote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["customFetch"]]: async (url, init)=>{
            const response = await fetch(url, {
                ...init,
                ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$reject$2d$redirects$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NO_FOLLOW_REDIRECT"]
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$reject$2d$redirects$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assertResponseNotRedirect"])(String(url), response);
            return response;
        }
    }), {
        audience: options?.audience,
        issuer: options?.issuer
    });
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/apple.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apple",
    ()=>apple,
    "getApplePublicKey",
    ()=>getApplePublicKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_protected_header.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/key/import.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
//#region src/social-providers/apple.ts
async function sha256Hex(value) {
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest)).map((byte)=>byte.toString(16).padStart(2, "0")).join("");
}
async function nonceMatches(jwtNonce, nonce) {
    if (typeof jwtNonce !== "string") return false;
    if (jwtNonce === nonce) return true;
    return jwtNonce === await sha256Hex(nonce);
}
const apple = (options)=>{
    const tokenEndpoint = "https://appleid.apple.com/auth/token";
    return {
        id: "apple",
        name: "Apple",
        async createAuthorizationURL ({ state, scopes, redirectURI, codeVerifier }) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrimaryClientId"])(options.clientId) || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client ID and client secret are required for Apple. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            const _scope = options.disableDefaultScope ? [] : [
                "email",
                "name"
            ];
            if (options.scope) _scope.push(...options.scope);
            if (scopes) _scope.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "apple",
                options,
                authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
                scopes: _scope,
                state,
                redirectURI,
                codeVerifier,
                responseMode: "form_post",
                responseType: "code id_token"
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        async verifyIdToken (token, nonce, ctx) {
            if (options.disableIdTokenSignIn) return false;
            if (options.verifyIdToken) return options.verifyIdToken(token, nonce, ctx);
            try {
                const { kid, alg: jwtAlg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(token);
                if (!kid || !jwtAlg) return false;
                const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, await getApplePublicKey(kid), {
                    algorithms: [
                        jwtAlg
                    ],
                    issuer: "https://appleid.apple.com",
                    audience: options.audience && options.audience.length ? options.audience : options.appBundleIdentifier ? options.appBundleIdentifier : options.clientId,
                    maxTokenAge: "1h"
                });
                [
                    "email_verified",
                    "is_private_email"
                ].forEach((field)=>{
                    if (jwtClaims[field] !== void 0) jwtClaims[field] = Boolean(jwtClaims[field]);
                });
                if (nonce && !await nonceMatches(jwtClaims.nonce, nonce)) return false;
                return !!jwtClaims;
            } catch  {
                return false;
            }
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options,
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (!token.idToken) return null;
            const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            if (!profile) return null;
            let name;
            if (token.user?.name) name = `${token.user.name.firstName || ""} ${token.user.name.lastName || ""}`.trim();
            else name = profile.name || "";
            const emailVerified = typeof profile.email_verified === "boolean" ? profile.email_verified : profile.email_verified === "true";
            const enrichedProfile = {
                ...profile,
                name
            };
            const userMap = await options.mapProfileToUser?.(enrichedProfile);
            return {
                user: {
                    id: profile.sub,
                    name: enrichedProfile.name,
                    emailVerified,
                    email: profile.email,
                    ...userMap
                },
                data: enrichedProfile
            };
        },
        options
    };
};
const getApplePublicKey = async (kid)=>{
    const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(`https://appleid.apple.com/auth/keys`);
    if (!data?.keys) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["APIError"]("BAD_REQUEST", {
        message: "Keys not found"
    });
    const jwk = data.keys.find((key)=>key.kid === kid);
    if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importJWK"])(jwk, jwk.alg);
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/atlassian.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "atlassian",
    ()=>atlassian
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
//#region src/social-providers/atlassian.ts
const atlassian = (options)=>{
    const tokenEndpoint = "https://auth.atlassian.com/oauth/token";
    return {
        id: "atlassian",
        name: "Atlassian",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Secret are required for Atlassian");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("codeVerifier is required for Atlassian");
            const _scopes = options.disableDefaultScope ? [] : [
                "read:jira-user",
                "offline_access"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "atlassian",
                options,
                authorizationEndpoint: "https://auth.atlassian.com/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                additionalParams: {
                    audience: "api.atlassian.com"
                },
                prompt: options.prompt
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (!token.accessToken) return null;
            try {
                const { data: profile } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.atlassian.com/me", {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
                if (!profile) return null;
                const userMap = await options.mapProfileToUser?.(profile);
                return {
                    user: {
                        id: profile.account_id,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        emailVerified: false,
                        ...userMap
                    },
                    data: profile
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Figma:", error);
                return null;
            }
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/cognito.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cognito",
    ()=>cognito,
    "getCognitoPublicKey",
    ()=>getCognitoPublicKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_protected_header.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/key/import.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
//#region src/social-providers/cognito.ts
const cognito = (options)=>{
    if (!options.domain || !options.region || !options.userPoolId) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Domain, region and userPoolId are required for Amazon Cognito. Make sure to provide them in the options.");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("DOMAIN_AND_REGION_REQUIRED");
    }
    const cleanDomain = options.domain.replace(/^https?:\/\//, "");
    const authorizationEndpoint = `https://${cleanDomain}/oauth2/authorize`;
    const tokenEndpoint = `https://${cleanDomain}/oauth2/token`;
    const userInfoEndpoint = `https://${cleanDomain}/oauth2/userinfo`;
    return {
        id: "cognito",
        name: "Cognito",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrimaryClientId"])(options.clientId)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("ClientId is required for Amazon Cognito. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (options.requireClientSecret && !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Secret is required when requireClientSecret is true. Make sure to provide it in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_SECRET_REQUIRED");
            }
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "cognito",
                options: {
                    ...options
                },
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt
            });
            const scopeValue = url.searchParams.get("scope");
            if (scopeValue) {
                url.searchParams.delete("scope");
                const encodedScope = encodeURIComponent(scopeValue);
                const urlString = url.toString();
                const separator = urlString.includes("?") ? "&" : "?";
                return new URL(`${urlString}${separator}scope=${encodedScope}`);
            }
            return url;
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async verifyIdToken (token, nonce, ctx) {
            if (options.disableIdTokenSignIn) return false;
            if (options.verifyIdToken) return options.verifyIdToken(token, nonce, ctx);
            try {
                const { kid, alg: jwtAlg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(token);
                if (!kid || !jwtAlg) return false;
                const publicKey = await getCognitoPublicKey(kid, options.region, options.userPoolId);
                const expectedIssuer = `https://cognito-idp.${options.region}.amazonaws.com/${options.userPoolId}`;
                const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, publicKey, {
                    algorithms: [
                        jwtAlg
                    ],
                    issuer: expectedIssuer,
                    audience: options.clientId,
                    maxTokenAge: "1h"
                });
                if (nonce && jwtClaims.nonce !== nonce) return false;
                return true;
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to verify ID token:", error);
                return false;
            }
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (token.idToken) try {
                const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
                if (!profile) return null;
                const name = profile.name || profile.given_name || profile.username || "";
                const enrichedProfile = {
                    ...profile,
                    name
                };
                const userMap = await options.mapProfileToUser?.(enrichedProfile);
                return {
                    user: {
                        id: profile.sub,
                        name: enrichedProfile.name,
                        email: profile.email,
                        image: profile.picture,
                        emailVerified: profile.email_verified,
                        ...userMap
                    },
                    data: enrichedProfile
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to decode ID token:", error);
            }
            if (token.accessToken) try {
                const { data: userInfo } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(userInfoEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
                if (userInfo) {
                    const userMap = await options.mapProfileToUser?.(userInfo);
                    return {
                        user: {
                            id: userInfo.sub,
                            name: userInfo.name || userInfo.given_name || userInfo.username || "",
                            email: userInfo.email,
                            image: userInfo.picture,
                            emailVerified: userInfo.email_verified,
                            ...userMap
                        },
                        data: userInfo
                    };
                }
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Cognito:", error);
            }
            return null;
        },
        options
    };
};
const getCognitoPublicKey = async (kid, region, userPoolId)=>{
    const COGNITO_JWKS_URI = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
    try {
        const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(COGNITO_JWKS_URI);
        if (!data?.keys) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["APIError"]("BAD_REQUEST", {
            message: "Keys not found"
        });
        const jwk = data.keys.find((key)=>key.kid === kid);
        if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importJWK"])(jwk, jwk.alg);
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch Cognito public key:", error);
        throw error;
    }
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/discord.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "discord",
    ()=>discord
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
//#region src/social-providers/discord.ts
const discord = (options)=>{
    const tokenEndpoint = "https://discord.com/api/oauth2/token";
    return {
        id: "discord",
        name: "Discord",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "identify",
                "email"
            ];
            if (scopes) _scopes.push(...scopes);
            if (options.scope) _scopes.push(...options.scope);
            const permissionsParam = _scopes.includes("bot") && options.permissions !== void 0 ? `&permissions=${options.permissions}` : "";
            return new URL(`https://discord.com/api/oauth2/authorize?scope=${_scopes.join("+")}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(options.redirectURI || redirectURI)}&state=${state}&prompt=${options.prompt || "none"}${permissionsParam}`);
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://discord.com/api/users/@me", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            if (profile.avatar === null) profile.image_url = `https://cdn.discordapp.com/embed/avatars/${profile.discriminator === "0" ? Number(BigInt(profile.id) >> BigInt(22)) % 6 : parseInt(profile.discriminator) % 5}.png`;
            else {
                const format = profile.avatar.startsWith("a_") ? "gif" : "png";
                profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.global_name || profile.username || "",
                    email: profile.email,
                    emailVerified: profile.verified,
                    image: profile.image_url,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/dropbox.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dropbox",
    ()=>dropbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/dropbox.ts
const dropbox = (options)=>{
    const tokenEndpoint = "https://api.dropboxapi.com/oauth2/token";
    return {
        id: "dropbox",
        name: "Dropbox",
        createAuthorizationURL: async ({ state, scopes, codeVerifier, redirectURI })=>{
            const _scopes = options.disableDefaultScope ? [] : [
                "account_info.read"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            const additionalParams = {};
            if (options.accessType) additionalParams.token_access_type = options.accessType;
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "dropbox",
                options,
                authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                codeVerifier,
                additionalParams
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.dropboxapi.com/2/users/get_current_account", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.account_id,
                    name: profile.name?.display_name,
                    email: profile.email,
                    emailVerified: profile.email_verified || false,
                    image: profile.profile_photo_url,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/facebook.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "facebook",
    ()=>facebook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwks$2f$remote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwks/remote.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
//#region src/social-providers/facebook.ts
/**
* Validate an opaque Facebook access token against the configured app.
*
* Facebook access tokens are not audience-bound at the Graph `/me` endpoint: a
* token minted for any Facebook app returns that app's profile. Without this
* check, a token issued to an unrelated app could be presented to this
* app's direct sign-in path and accepted as proof of identity. We call the
* `debug_token` endpoint and require the token to be valid, bound to one of the
* configured client ids, and tied to a user.
*
* @see https://developers.facebook.com/docs/facebook-login/guides/access-tokens/debugging
*
* @returns the inspected token's `user_id` when the token is valid and bound to
* the configured app, otherwise `null`.
*/ async function verifyFacebookAccessToken(accessToken, options) {
    const primaryClientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrimaryClientId"])(options.clientId);
    if (!primaryClientId || !options.clientSecret) return null;
    const clientIds = Array.isArray(options.clientId) ? options.clientId : [
        options.clientId
    ];
    const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://graph.facebook.com/debug_token", {
        query: {
            input_token: accessToken,
            access_token: `${primaryClientId}|${options.clientSecret}`
        }
    });
    if (error || !data?.data) return null;
    const { is_valid, app_id, user_id } = data.data;
    if (is_valid !== true || !app_id || !clientIds.includes(app_id) || !user_id) return null;
    return user_id;
}
const facebook = (options)=>{
    return {
        id: "facebook",
        name: "Facebook",
        async createAuthorizationURL ({ state, scopes, redirectURI, loginHint }) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrimaryClientId"])(options.clientId) || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client ID and client secret are required for Facebook. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            const _scopes = options.disableDefaultScope ? [] : [
                "email",
                "public_profile"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "facebook",
                options,
                authorizationEndpoint: "https://www.facebook.com/v24.0/dialog/oauth",
                scopes: _scopes,
                state,
                redirectURI,
                loginHint,
                additionalParams: options.configId ? {
                    config_id: options.configId
                } : {}
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://graph.facebook.com/v24.0/oauth/access_token"
            });
        },
        async verifyIdToken (token, nonce, ctx) {
            if (options.disableIdTokenSignIn) return false;
            if (options.verifyIdToken) return options.verifyIdToken(token, nonce, ctx);
            if (token.split(".").length === 3) try {
                const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwks$2f$remote$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRemoteJWKSet"])(new URL("https://limited.facebook.com/.well-known/oauth/openid/jwks/")), {
                    algorithms: [
                        "RS256"
                    ],
                    audience: options.clientId,
                    issuer: "https://www.facebook.com"
                });
                if (nonce && jwtClaims.nonce !== nonce) return false;
                return !!jwtClaims;
            } catch  {
                return false;
            }
            return await verifyFacebookAccessToken(token, options) !== null;
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://graph.facebook.com/v24.0/oauth/access_token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (token.idToken && token.idToken.split(".").length === 3) {
                const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
                const user = {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    picture: {
                        data: {
                            url: profile.picture,
                            height: 100,
                            width: 100,
                            is_silhouette: false
                        }
                    }
                };
                const userMap = await options.mapProfileToUser?.({
                    ...user,
                    email_verified: false
                });
                return {
                    user: {
                        ...user,
                        emailVerified: false,
                        ...userMap
                    },
                    data: profile
                };
            }
            const accessToken = token.accessToken;
            if (!accessToken) return null;
            const tokenUserId = await verifyFacebookAccessToken(accessToken, options);
            if (!tokenUserId) return null;
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://graph.facebook.com/me?fields=" + [
                "id",
                "name",
                "email",
                "picture",
                ...options?.fields || []
            ].join(","), {
                auth: {
                    type: "Bearer",
                    token: accessToken
                }
            });
            if (error) return null;
            if (profile.id !== tokenUserId) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                    emailVerified: profile.email_verified ?? false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/figma.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "figma",
    ()=>figma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
//#region src/social-providers/figma.ts
const figma = (options)=>{
    const tokenEndpoint = "https://api.figma.com/v1/oauth/token";
    return {
        id: "figma",
        name: "Figma",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret are required for Figma. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("codeVerifier is required for Figma");
            const _scopes = options.disableDefaultScope ? [] : [
                "current_user:read"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "figma",
                options,
                authorizationEndpoint: "https://www.figma.com/oauth",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint,
                authentication: "basic"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint,
                authentication: "basic"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            try {
                const { data: profile } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.figma.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
                if (!profile) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user from Figma");
                    return null;
                }
                const userMap = await options.mapProfileToUser?.(profile);
                return {
                    user: {
                        id: profile.id,
                        name: profile.handle,
                        email: profile.email,
                        image: profile.img_url,
                        emailVerified: false,
                        ...userMap
                    },
                    data: profile
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Figma:", error);
                return null;
            }
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/github.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "github",
    ()=>github
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
//#region src/social-providers/github.ts
const github = (options)=>{
    const tokenEndpoint = "https://github.com/login/oauth/access_token";
    return {
        id: "github",
        name: "GitHub",
        createAuthorizationURL ({ state, scopes, loginHint, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "read:user",
                "user:email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "github",
                options,
                authorizationEndpoint: "https://github.com/login/oauth/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                loginHint,
                prompt: options.prompt
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            const { body, headers: requestHeaders } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationCodeRequest"])({
                code,
                codeVerifier,
                redirectURI,
                options
            });
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
                method: "POST",
                body,
                headers: requestHeaders
            });
            if (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("GitHub OAuth token exchange failed:", error);
                return null;
            }
            if ("error" in data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("GitHub OAuth token exchange failed:", data);
                return null;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOAuth2Tokens"])(data);
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.github.com/user", {
                headers: {
                    "User-Agent": "better-auth",
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const { data: emails } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "User-Agent": "better-auth"
                }
            });
            if (!profile.email && emails) profile.email = (emails.find((e)=>e.primary) ?? emails[0])?.email;
            const emailVerified = emails?.find((e)=>e.email === profile.email)?.verified ?? false;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.name || profile.login || "",
                    email: profile.email,
                    image: profile.avatar_url,
                    emailVerified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/gitlab.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gitlab",
    ()=>gitlab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/gitlab.ts
const cleanDoubleSlashes = (input = "")=>{
    return input.split("://").map((str)=>str.replace(/\/{2,}/g, "/")).join("://");
};
const issuerToEndpoints = (issuer)=>{
    const baseUrl = issuer || "https://gitlab.com";
    return {
        authorizationEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/authorize`),
        tokenEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/token`),
        userinfoEndpoint: cleanDoubleSlashes(`${baseUrl}/api/v4/user`)
    };
};
const gitlab = (options)=>{
    const { authorizationEndpoint, tokenEndpoint, userinfoEndpoint } = issuerToEndpoints(options.issuer);
    const issuerId = "gitlab";
    return {
        id: issuerId,
        name: "Gitlab",
        createAuthorizationURL: async ({ state, scopes, codeVerifier, loginHint, redirectURI })=>{
            const _scopes = options.disableDefaultScope ? [] : [
                "read_user"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: issuerId,
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                redirectURI,
                codeVerifier,
                loginHint
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI, codeVerifier })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                codeVerifier,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(userinfoEndpoint, {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || profile.state !== "active" || profile.locked) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.name ?? profile.username ?? "",
                    email: profile.email,
                    image: profile.avatar_url,
                    emailVerified: profile.email_verified ?? false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/google.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGooglePublicKey",
    ()=>getGooglePublicKey,
    "google",
    ()=>google,
    "isGoogleHostedDomainAllowed",
    ()=>isGoogleHostedDomainAllowed,
    "verifyGoogleIdToken",
    ()=>verifyGoogleIdToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_protected_header.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/key/import.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
//#region src/social-providers/google.ts
const GOOGLE_ID_TOKEN_MAX_AGE = "1h";
/**
* Verifies a Google ID token against Google's issuer, audience, signature,
* expiry, and maximum token age.
*/ const verifyGoogleIdToken = async ({ token, audience, nonce })=>{
    try {
        const { kid, alg: jwtAlg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(token);
        if (!kid || !jwtAlg) return null;
        const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, await getGooglePublicKey(kid), {
            algorithms: [
                jwtAlg
            ],
            issuer: [
                "https://accounts.google.com",
                "accounts.google.com"
            ],
            audience,
            maxTokenAge: GOOGLE_ID_TOKEN_MAX_AGE
        });
        if (nonce && jwtClaims.nonce !== nonce) return null;
        return jwtClaims;
    } catch  {
        return null;
    }
};
/**
* Checks whether Google's verified `hd` claim satisfies the configured hosted
* domain restriction. `hd: "*"` accepts any Google Workspace hosted domain.
*/ const isGoogleHostedDomainAllowed = (configuredHostedDomain, tokenHostedDomain)=>{
    if (!configuredHostedDomain) return true;
    if (typeof tokenHostedDomain !== "string" || !tokenHostedDomain) return false;
    if (configuredHostedDomain === "*") return true;
    return tokenHostedDomain === configuredHostedDomain;
};
const google = (options)=>{
    return {
        id: "google",
        name: "Google",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI, loginHint, display }) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrimaryClientId"])(options.clientId) || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret is required for Google. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("codeVerifier is required for Google");
            const _scopes = options.disableDefaultScope ? [] : [
                "email",
                "profile",
                "openid"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "google",
                options,
                authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt,
                accessType: options.accessType,
                display: display || options.display,
                loginHint,
                hd: options.hd,
                additionalParams: {
                    include_granted_scopes: "true"
                }
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint: "https://oauth2.googleapis.com/token"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://oauth2.googleapis.com/token"
            });
        },
        async verifyIdToken (token, nonce, ctx) {
            if (options.disableIdTokenSignIn) return false;
            if (options.verifyIdToken) return options.verifyIdToken(token, nonce, ctx);
            const jwtClaims = await verifyGoogleIdToken({
                token,
                audience: options.clientId,
                nonce
            });
            if (!jwtClaims) return false;
            return isGoogleHostedDomainAllowed(options.hd, jwtClaims.hd);
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (!token.idToken) return null;
            const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            if (!isGoogleHostedDomainAllowed(options.hd, user.hd)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error(`Google sign-in rejected: id token hosted domain (hd) "${user.hd ?? "<missing>"}" does not satisfy the configured "hd" option "${options.hd}".`);
                return null;
            }
            const userMap = await options.mapProfileToUser?.(user);
            return {
                user: {
                    id: user.sub,
                    name: user.name,
                    email: user.email,
                    image: user.picture,
                    emailVerified: user.email_verified,
                    ...userMap
                },
                data: user
            };
        },
        options
    };
};
const getGooglePublicKey = async (kid)=>{
    const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://www.googleapis.com/oauth2/v3/certs");
    if (!data?.keys) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["APIError"]("BAD_REQUEST", {
        message: "Keys not found"
    });
    const jwk = data.keys.find((key)=>key.kid === kid);
    if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importJWK"])(jwk, jwk.alg);
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/huggingface.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "huggingface",
    ()=>huggingface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/huggingface.ts
const huggingface = (options)=>{
    const tokenEndpoint = "https://huggingface.co/oauth/token";
    return {
        id: "huggingface",
        name: "Hugging Face",
        createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "huggingface",
                options,
                authorizationEndpoint: "https://huggingface.co/oauth/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://huggingface.co/oauth/userinfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.name || profile.preferred_username || "",
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified ?? false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocialProviderListEnum",
    ()=>SocialProviderListEnum,
    "socialProviderList",
    ()=>socialProviderList,
    "socialProviders",
    ()=>socialProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$apple$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/apple.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$atlassian$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/atlassian.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$cognito$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/cognito.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$discord$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/discord.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$dropbox$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/dropbox.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$facebook$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/facebook.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$figma$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/figma.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$github$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/github.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$gitlab$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/gitlab.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$google$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/google.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$huggingface$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/huggingface.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$kakao$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/kakao.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$kick$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/kick.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$line$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/line.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$linear$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/linear.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$linkedin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/linkedin.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$microsoft$2d$entra$2d$id$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/microsoft-entra-id.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$naver$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/naver.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$notion$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/notion.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$paybin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/paybin.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$paypal$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/paypal.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$polar$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/polar.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$railway$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/railway.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$reddit$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/reddit.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$roblox$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/roblox.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$salesforce$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/salesforce.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$slack$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/slack.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$spotify$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/spotify.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$tiktok$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/tiktok.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$twitch$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/twitch.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$twitter$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/twitter.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$vercel$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/vercel.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$vk$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/vk.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$wechat$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/wechat.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$zoom$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/zoom.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/zod/v4/classic/schemas.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
//#region src/social-providers/index.ts
const socialProviders = {
    apple: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$apple$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apple"],
    atlassian: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$atlassian$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["atlassian"],
    cognito: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$cognito$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cognito"],
    discord: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$discord$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["discord"],
    facebook: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$facebook$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["facebook"],
    figma: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$figma$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["figma"],
    github: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$github$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["github"],
    microsoft: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$microsoft$2d$entra$2d$id$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["microsoft"],
    google: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$google$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["google"],
    huggingface: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$huggingface$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["huggingface"],
    slack: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$slack$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["slack"],
    spotify: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$spotify$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["spotify"],
    twitch: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$twitch$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twitch"],
    twitter: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$twitter$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twitter"],
    dropbox: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$dropbox$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dropbox"],
    kick: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$kick$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["kick"],
    linear: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$linear$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["linear"],
    linkedin: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$linkedin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["linkedin"],
    gitlab: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$gitlab$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gitlab"],
    tiktok: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$tiktok$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tiktok"],
    reddit: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$reddit$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reddit"],
    roblox: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$roblox$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["roblox"],
    salesforce: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$salesforce$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["salesforce"],
    vk: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$vk$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vk"],
    zoom: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$zoom$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["zoom"],
    notion: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$notion$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notion"],
    kakao: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$kakao$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["kakao"],
    naver: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$naver$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["naver"],
    line: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$line$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["line"],
    paybin: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$paybin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paybin"],
    paypal: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$paypal$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paypal"],
    polar: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$polar$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["polar"],
    railway: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$railway$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["railway"],
    vercel: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$vercel$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vercel"],
    wechat: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$social$2d$providers$2f$wechat$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["wechat"]
};
const socialProviderList = Object.keys(socialProviders);
const SocialProviderListEnum = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["enum"](socialProviderList).or(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"]());
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/kakao.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "kakao",
    ()=>kakao
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/kakao.ts
const kakao = (options)=>{
    const tokenEndpoint = "https://kauth.kakao.com/oauth/token";
    return {
        id: "kakao",
        name: "Kakao",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "account_email",
                "profile_image",
                "profile_nickname"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "kakao",
                options,
                authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
                scopes: _scopes,
                state,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || !profile) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            const account = profile.kakao_account || {};
            const kakaoProfile = account.profile || {};
            return {
                user: {
                    id: String(profile.id),
                    name: kakaoProfile.nickname || account.name || "",
                    email: account.email,
                    image: kakaoProfile.profile_image_url || kakaoProfile.thumbnail_image_url,
                    emailVerified: !!account.is_email_valid && !!account.is_email_verified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/kick.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "kick",
    ()=>kick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/kick.ts
const kick = (options)=>{
    return {
        id: "kick",
        name: "Kick",
        createAuthorizationURL ({ state, scopes, redirectURI, codeVerifier }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user:read"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "kick",
                redirectURI,
                options,
                authorizationEndpoint: "https://id.kick.com/oauth/authorize",
                scopes: _scopes,
                codeVerifier,
                state
            });
        },
        async validateAuthorizationCode ({ code, redirectURI, codeVerifier }) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint: "https://id.kick.com/oauth/token",
                codeVerifier
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://id.kick.com/oauth/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.kick.com/public/v1/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const profile = data.data[0];
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.user_id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.profile_picture,
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/line.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "line",
    ()=>line
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
;
;
;
;
;
//#region src/social-providers/line.ts
/**
* LINE Login v2.1
* - Authorization endpoint: https://access.line.me/oauth2/v2.1/authorize
* - Token endpoint: https://api.line.me/oauth2/v2.1/token
* - UserInfo endpoint: https://api.line.me/oauth2/v2.1/userinfo
* - Verify ID token: https://api.line.me/oauth2/v2.1/verify
*
* Docs: https://developers.line.biz/en/reference/line-login/#issue-access-token
*/ const line = (options)=>{
    const authorizationEndpoint = "https://access.line.me/oauth2/v2.1/authorize";
    const tokenEndpoint = "https://api.line.me/oauth2/v2.1/token";
    const userInfoEndpoint = "https://api.line.me/oauth2/v2.1/userinfo";
    const verifyIdTokenEndpoint = "https://api.line.me/oauth2/v2.1/verify";
    return {
        id: "line",
        name: "LINE",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI, loginHint }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "line",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                loginHint
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async verifyIdToken (token, nonce, ctx) {
            if (options.disableIdTokenSignIn) return false;
            if (options.verifyIdToken) return options.verifyIdToken(token, nonce, ctx);
            const body = new URLSearchParams();
            body.set("id_token", token);
            body.set("client_id", options.clientId);
            if (nonce) body.set("nonce", nonce);
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(verifyIdTokenEndpoint, {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                body
            });
            if (error || !data) return false;
            if (data.aud !== options.clientId) return false;
            if (data.nonce && data.nonce !== nonce) return false;
            return true;
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            let profile = null;
            if (token.idToken) try {
                profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            } catch  {}
            if (!profile) {
                const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(userInfoEndpoint, {
                    headers: {
                        authorization: `Bearer ${token.accessToken}`
                    }
                });
                profile = data || null;
            }
            if (!profile) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            const id = profile.sub || profile.userId;
            const name = profile.name || profile.displayName || "";
            const image = profile.picture || profile.pictureUrl || void 0;
            return {
                user: {
                    id,
                    name,
                    email: profile.email,
                    image,
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/linear.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linear",
    ()=>linear
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/linear.ts
const linear = (options)=>{
    const tokenEndpoint = "https://api.linear.app/oauth/token";
    return {
        id: "linear",
        name: "Linear",
        createAuthorizationURL ({ state, scopes, loginHint, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "read"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "linear",
                options,
                authorizationEndpoint: "https://linear.app/oauth/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                loginHint
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.linear.app/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.accessToken}`
                },
                body: JSON.stringify({
                    query: `
							query {
								viewer {
									id
									name
									email
									avatarUrl
									active
									createdAt
									updatedAt
								}
							}
						`
                })
            });
            if (error || !profile?.data?.viewer) return null;
            const userData = profile.data.viewer;
            const userMap = await options.mapProfileToUser?.(userData);
            return {
                user: {
                    id: profile.data.viewer.id,
                    name: profile.data.viewer.name,
                    email: profile.data.viewer.email,
                    image: profile.data.viewer.avatarUrl,
                    emailVerified: false,
                    ...userMap
                },
                data: userData
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/linkedin.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linkedin",
    ()=>linkedin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/linkedin.ts
const linkedin = (options)=>{
    const authorizationEndpoint = "https://www.linkedin.com/oauth/v2/authorization";
    const tokenEndpoint = "https://www.linkedin.com/oauth/v2/accessToken";
    return {
        id: "linkedin",
        name: "Linkedin",
        createAuthorizationURL: async ({ state, scopes, redirectURI, loginHint })=>{
            const _scopes = options.disableDefaultScope ? [] : [
                "profile",
                "email",
                "openid"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "linkedin",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                loginHint,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.linkedin.com/v2/userinfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    emailVerified: profile.email_verified ?? false,
                    image: profile.picture,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/microsoft-entra-id.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMicrosoftPublicKey",
    ()=>getMicrosoftPublicKey,
    "microsoft",
    ()=>microsoft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_protected_header.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/key/import.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
//#region src/social-providers/microsoft-entra-id.ts
/**
* Microsoft's fixed tenant id for personal (consumer) Microsoft accounts. Every
* personal-account token carries it as the `tid` claim, so it distinguishes the
* consumer account class from work/school tenants.
* @see https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference
*/ const MICROSOFT_CONSUMER_TENANT_ID = "9188040d-6c67-4c5b-b112-36a304b66dad";
const microsoft = (options)=>{
    const tenant = options.tenantId || "common";
    let authority = options.authority || "https://login.microsoftonline.com";
    while(authority.endsWith("/"))authority = authority.slice(0, -1);
    const authorizationEndpoint = `${authority}/${tenant}/oauth2/v2.0/authorize`;
    const tokenEndpoint = `${authority}/${tenant}/oauth2/v2.0/token`;
    return {
        id: "microsoft",
        name: "Microsoft EntraID",
        createAuthorizationURL (data) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrimaryClientId"])(options.clientId)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Id is required for Microsoft Entra ID. Make sure to provide it in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            const scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email",
                "User.Read",
                "offline_access"
            ];
            if (options.scope) scopes.push(...options.scope);
            if (data.scopes) scopes.push(...data.scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "microsoft",
                options,
                authorizationEndpoint,
                state: data.state,
                codeVerifier: data.codeVerifier,
                scopes,
                redirectURI: data.redirectURI,
                prompt: options.prompt,
                loginHint: data.loginHint
            });
        },
        validateAuthorizationCode ({ code, codeVerifier, redirectURI }) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        async verifyIdToken (token, nonce, ctx) {
            if (options.disableIdTokenSignIn) return false;
            if (options.verifyIdToken) return options.verifyIdToken(token, nonce, ctx);
            try {
                const { kid, alg: jwtAlg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(token);
                if (!kid || !jwtAlg) return false;
                const publicKey = await getMicrosoftPublicKey(kid, tenant, authority);
                const verifyOptions = {
                    algorithms: [
                        jwtAlg
                    ],
                    audience: options.clientId,
                    maxTokenAge: "1h"
                };
                /**
				* Issuer varies per user's tenant for multi-tenant endpoints, so only validate for specific tenants.
				* @see https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols#endpoints
				*/ if (tenant !== "common" && tenant !== "organizations" && tenant !== "consumers") verifyOptions.issuer = `${authority}/${tenant}/v2.0`;
                const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, publicKey, verifyOptions);
                if (nonce && jwtClaims.nonce !== nonce) return false;
                const tid = jwtClaims.tid;
                if (typeof tid !== "string" || jwtClaims.iss !== `${authority}/${tid}/v2.0`) return false;
                if (tenant === "organizations" && tid === MICROSOFT_CONSUMER_TENANT_ID) return false;
                if (tenant === "consumers" && tid !== MICROSOFT_CONSUMER_TENANT_ID) return false;
                return true;
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to verify ID token:", error);
                return false;
            }
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (!token.idToken) return null;
            const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            const profilePhotoSize = options.profilePhotoSize || 48;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(`https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                },
                async onResponse (context) {
                    if (options.disableProfilePhoto || !context.response.ok) return;
                    try {
                        const pictureBuffer = await context.response.clone().arrayBuffer();
                        const pictureBase64 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(pictureBuffer);
                        user.picture = `data:image/jpeg;base64, ${pictureBase64}`;
                    } catch (e) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error(e && typeof e === "object" && "name" in e ? e.name : "", e);
                    }
                }
            });
            const userMap = await options.mapProfileToUser?.(user);
            const emailVerified = user.email_verified !== void 0 ? user.email_verified : user.email && (user.verified_primary_email?.includes(user.email) || user.verified_secondary_email?.includes(user.email)) ? true : false;
            return {
                user: {
                    id: user.sub,
                    name: user.name,
                    email: user.email,
                    image: user.picture,
                    emailVerified,
                    ...userMap
                },
                data: user
            };
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            const scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email",
                "User.Read",
                "offline_access"
            ];
            if (options.scope) scopes.push(...options.scope);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                extraParams: {
                    scope: scopes.join(" ")
                },
                tokenEndpoint
            });
        },
        options
    };
};
const getMicrosoftPublicKey = async (kid, tenant, authority)=>{
    const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(`${authority}/${tenant}/discovery/v2.0/keys`);
    if (!data?.keys) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["APIError"]("BAD_REQUEST", {
        message: "Keys not found"
    });
    const jwk = data.keys.find((key)=>key.kid === kid);
    if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importJWK"])(jwk, jwk.alg);
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/naver.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "naver",
    ()=>naver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/naver.ts
const naver = (options)=>{
    const tokenEndpoint = "https://nid.naver.com/oauth2.0/token";
    return {
        id: "naver",
        name: "Naver",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "profile",
                "email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "naver",
                options,
                authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
                scopes: _scopes,
                state,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://openapi.naver.com/v1/nid/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || !profile || profile.resultcode !== "00") return null;
            const userMap = await options.mapProfileToUser?.(profile);
            const res = profile.response || {};
            return {
                user: {
                    id: res.id,
                    name: res.name || res.nickname || "",
                    email: res.email,
                    image: res.profile_image,
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/notion.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notion",
    ()=>notion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/notion.ts
const notion = (options)=>{
    const tokenEndpoint = "https://api.notion.com/v1/oauth/token";
    return {
        id: "notion",
        name: "Notion",
        createAuthorizationURL ({ state, scopes, loginHint, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "notion",
                options,
                authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                loginHint,
                additionalParams: {
                    owner: "user"
                }
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint,
                authentication: "basic"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.notion.com/v1/users/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "Notion-Version": "2022-06-28"
                }
            });
            if (error || !profile) return null;
            const userProfile = profile.bot?.owner?.user;
            if (!userProfile) return null;
            const userMap = await options.mapProfileToUser?.(userProfile);
            return {
                user: {
                    id: userProfile.id,
                    name: userProfile.name || "",
                    email: userProfile.person?.email || null,
                    image: userProfile.avatar_url,
                    emailVerified: false,
                    ...userMap
                },
                data: userProfile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/paybin.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paybin",
    ()=>paybin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
//#region src/social-providers/paybin.ts
const paybin = (options)=>{
    const issuer = options.issuer || "https://idp.paybin.io";
    const authorizationEndpoint = `${issuer}/oauth2/authorize`;
    const tokenEndpoint = `${issuer}/oauth2/token`;
    return {
        id: "paybin",
        name: "Paybin",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI, loginHint }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret is required for Paybin. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("codeVerifier is required for Paybin");
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "email",
                "profile"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "paybin",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt,
                loginHint
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (!token.idToken) return null;
            const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken);
            const userMap = await options.mapProfileToUser?.(user);
            return {
                user: {
                    id: user.sub,
                    name: user.name || user.preferred_username || "",
                    email: user.email,
                    image: user.picture,
                    emailVerified: user.email_verified || false,
                    ...userMap
                },
                data: user
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/paypal.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPayPalPublicKey",
    ()=>getPayPalPublicKey,
    "paypal",
    ()=>paypal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_protected_header.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/key/import.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
//#region src/social-providers/paypal.ts
/**
* ID token signing algorithms advertised by PayPal's OpenID configuration.
* Anything outside this allowlist is rejected so each token is only ever
* verified with the algorithm it was issued for.
*
* @see https://www.paypal.com/.well-known/openid-configuration
*/ const PAYPAL_ID_TOKEN_ALGORITHMS = [
    "RS256",
    "HS256"
];
const paypal = (options)=>{
    const isSandbox = (options.environment || "sandbox") === "sandbox";
    const authorizationEndpoint = isSandbox ? "https://www.sandbox.paypal.com/signin/authorize" : "https://www.paypal.com/signin/authorize";
    const tokenEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/oauth2/token" : "https://api-m.paypal.com/v1/oauth2/token";
    const userInfoEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo" : "https://api-m.paypal.com/v1/identity/oauth2/userinfo";
    /**
	* Issuer and JWKS endpoints used to cryptographically verify ID tokens.
	*
	* @see https://www.paypal.com/.well-known/openid-configuration
	*/ const issuer = isSandbox ? "https://www.sandbox.paypal.com" : "https://www.paypal.com";
    const jwksEndpoint = isSandbox ? "https://api.sandbox.paypal.com/v1/oauth2/certs" : "https://api.paypal.com/v1/oauth2/certs";
    return {
        id: "paypal",
        name: "PayPal",
        async createAuthorizationURL ({ state, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret is required for PayPal. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "paypal",
                options,
                authorizationEndpoint,
                scopes: [],
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            /**
			* PayPal requires Basic Auth for token exchange
			**/ const credentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(`${options.clientId}:${options.clientSecret}`);
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${credentials}`,
                        Accept: "application/json",
                        "Accept-Language": "en_US",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        grant_type: "authorization_code",
                        code,
                        redirect_uri: redirectURI
                    }).toString()
                });
                if (!response.data) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("FAILED_TO_GET_ACCESS_TOKEN");
                const data = response.data;
                return {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token,
                    accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0,
                    idToken: data.id_token
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("PayPal token exchange failed:", error);
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("FAILED_TO_GET_ACCESS_TOKEN");
            }
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            const credentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(`${options.clientId}:${options.clientSecret}`);
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(tokenEndpoint, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${credentials}`,
                        Accept: "application/json",
                        "Accept-Language": "en_US",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        grant_type: "refresh_token",
                        refresh_token: refreshToken
                    }).toString()
                });
                if (!response.data) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("FAILED_TO_REFRESH_ACCESS_TOKEN");
                const data = response.data;
                return {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token,
                    accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("PayPal token refresh failed:", error);
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("FAILED_TO_REFRESH_ACCESS_TOKEN");
            }
        },
        async verifyIdToken (token, nonce, ctx) {
            if (options.disableIdTokenSignIn) return false;
            if (options.verifyIdToken) return options.verifyIdToken(token, nonce, ctx);
            try {
                const { kid, alg: jwtAlg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_protected_header$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeProtectedHeader"])(token);
                if (!jwtAlg) return false;
                if (!PAYPAL_ID_TOKEN_ALGORITHMS.includes(jwtAlg)) return false;
                const key = jwtAlg === "HS256" ? new TextEncoder().encode(options.clientSecret) : kid ? await getPayPalPublicKey(kid, jwksEndpoint) : void 0;
                if (!key) return false;
                const { payload: jwtClaims } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, key, {
                    algorithms: [
                        jwtAlg
                    ],
                    issuer,
                    audience: options.clientId,
                    maxTokenAge: "1h"
                });
                if (nonce && jwtClaims.nonce !== nonce) return false;
                return true;
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to verify PayPal ID token:", error);
                return false;
            }
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            if (!token.accessToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Access token is required to fetch PayPal user info");
                return null;
            }
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(`${userInfoEndpoint}?schema=paypalv1.1`, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                        Accept: "application/json"
                    }
                });
                if (!response.data) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from PayPal");
                    return null;
                }
                const userInfo = response.data;
                if (token.idToken) {
                    let idTokenSubject;
                    try {
                        idTokenSubject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(token.idToken).sub;
                    } catch (error) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to decode PayPal ID token:", error);
                        return null;
                    }
                    const userInfoSubject = userInfo.sub ?? userInfo.user_id;
                    if (!idTokenSubject || userInfoSubject !== idTokenSubject) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("PayPal user info subject does not match ID token subject");
                        return null;
                    }
                }
                const userMap = await options.mapProfileToUser?.(userInfo);
                return {
                    user: {
                        id: userInfo.user_id,
                        name: userInfo.name,
                        email: userInfo.email,
                        image: userInfo.picture,
                        emailVerified: userInfo.email_verified,
                        ...userMap
                    },
                    data: userInfo
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from PayPal:", error);
                return null;
            }
        },
        options
    };
};
const getPayPalPublicKey = async (kid, jwksUri)=>{
    const { data } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(jwksUri);
    if (!data?.keys) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["APIError"]("BAD_REQUEST", {
        message: "Keys not found"
    });
    const jwk = data.keys.find((key)=>key.kid === kid);
    if (!jwk) throw new Error(`JWK with kid ${kid} not found`);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$key$2f$import$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["importJWK"])(jwk, jwk.alg);
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/polar.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "polar",
    ()=>polar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/polar.ts
const polar = (options)=>{
    const tokenEndpoint = "https://api.polar.sh/v1/oauth2/token";
    return {
        id: "polar",
        name: "Polar",
        createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "polar",
                options,
                authorizationEndpoint: "https://polar.sh/oauth2/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI,
                prompt: options.prompt
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.polar.sh/v1/oauth2/userinfo", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.public_name || profile.username || "",
                    email: profile.email,
                    image: profile.avatar_url,
                    emailVerified: profile.email_verified ?? false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/railway.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "railway",
    ()=>railway
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/railway.ts
const authorizationEndpoint = "https://backboard.railway.com/oauth/auth";
const tokenEndpoint = "https://backboard.railway.com/oauth/token";
const userinfoEndpoint = "https://backboard.railway.com/oauth/me";
const railway = (options)=>{
    return {
        id: "railway",
        name: "Railway",
        createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "email",
                "profile"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "railway",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint,
                authentication: "basic"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint,
                authentication: "basic"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(userinfoEndpoint, {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || !profile) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/reddit.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reddit",
    ()=>reddit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
//#region src/social-providers/reddit.ts
const reddit = (options)=>{
    return {
        id: "reddit",
        name: "Reddit",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "identity"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "reddit",
                options,
                authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                duration: options.duration
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            const body = new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: options.redirectURI || redirectURI
            });
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://www.reddit.com/api/v1/access_token", {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    accept: "text/plain",
                    "user-agent": "better-auth",
                    Authorization: `Basic ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["base64"].encode(`${options.clientId}:${options.clientSecret}`)}`
                },
                body: body.toString()
            });
            if (error) throw error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOAuth2Tokens"])(data);
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                authentication: "basic",
                tokenEndpoint: "https://www.reddit.com/api/v1/access_token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://oauth.reddit.com/api/v1/me", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "User-Agent": "better-auth"
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            const email = userMap?.email || `${profile.id}@reddit.invalid`;
            return {
                user: {
                    id: profile.id,
                    name: profile.name,
                    image: profile.icon_img?.split("?")[0],
                    ...userMap,
                    email,
                    emailVerified: userMap?.emailVerified ?? false
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/roblox.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "roblox",
    ()=>roblox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
//#region src/social-providers/roblox.ts
const roblox = (options)=>{
    const tokenEndpoint = "https://apis.roblox.com/oauth/v1/token";
    return {
        id: "roblox",
        name: "Roblox",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return new URL(`https://apis.roblox.com/oauth/v1/authorize?scope=${_scopes.join("+")}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(options.redirectURI || redirectURI)}&state=${state}&prompt=${options.prompt || "select_account consent"}`);
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI: options.redirectURI || redirectURI,
                options,
                tokenEndpoint,
                authentication: "post"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://apis.roblox.com/oauth/v1/userinfo", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.nickname || profile.preferred_username || "",
                    image: profile.picture,
                    email: profile.preferred_username || null,
                    emailVerified: false,
                    ...userMap
                },
                data: {
                    ...profile
                }
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/salesforce.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "salesforce",
    ()=>salesforce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
//#region src/social-providers/salesforce.ts
const salesforce = (options)=>{
    const isSandbox = (options.environment ?? "production") === "sandbox";
    const authorizationEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/authorize` : isSandbox ? "https://test.salesforce.com/services/oauth2/authorize" : "https://login.salesforce.com/services/oauth2/authorize";
    const tokenEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/token` : isSandbox ? "https://test.salesforce.com/services/oauth2/token" : "https://login.salesforce.com/services/oauth2/token";
    const userInfoEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/userinfo` : isSandbox ? "https://test.salesforce.com/services/oauth2/userinfo" : "https://login.salesforce.com/services/oauth2/userinfo";
    return {
        id: "salesforce",
        name: "Salesforce",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!options.clientId || !options.clientSecret) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Client Id and Client Secret are required for Salesforce. Make sure to provide them in the options.");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("CLIENT_ID_AND_SECRET_REQUIRED");
            }
            if (!codeVerifier) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("codeVerifier is required for Salesforce");
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "email",
                "profile"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "salesforce",
                options,
                authorizationEndpoint,
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI: options.redirectURI || redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI: options.redirectURI || redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            try {
                const { data: user } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(userInfoEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
                if (!user) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Salesforce");
                    return null;
                }
                const userMap = await options.mapProfileToUser?.(user);
                return {
                    user: {
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                        image: user.photos?.picture || user.photos?.thumbnail,
                        emailVerified: user.email_verified ?? false,
                        ...userMap
                    },
                    data: user
                };
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Failed to fetch user info from Salesforce:", error);
                return null;
            }
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/slack.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "slack",
    ()=>slack
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
//#region src/social-providers/slack.ts
const slack = (options)=>{
    const tokenEndpoint = "https://slack.com/api/openid.connect.token";
    return {
        id: "slack",
        name: "Slack",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "openid",
                "profile",
                "email"
            ];
            if (scopes) _scopes.push(...scopes);
            if (options.scope) _scopes.push(...options.scope);
            const url = new URL("https://slack.com/openid/connect/authorize");
            url.searchParams.set("scope", _scopes.join(" "));
            url.searchParams.set("response_type", "code");
            url.searchParams.set("client_id", options.clientId);
            url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
            url.searchParams.set("state", state);
            return url;
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://slack.com/api/openid.connect.userInfo", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile["https://slack.com/user_id"],
                    name: profile.name || "",
                    email: profile.email,
                    emailVerified: profile.email_verified,
                    image: profile.picture || profile["https://slack.com/user_image_512"],
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/spotify.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "spotify",
    ()=>spotify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/spotify.ts
const spotify = (options)=>{
    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    return {
        id: "spotify",
        name: "Spotify",
        createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user-read-email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "spotify",
                options,
                authorizationEndpoint: "https://accounts.spotify.com/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images[0]?.url,
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/tiktok.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tiktok",
    ()=>tiktok
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
//#region src/social-providers/tiktok.ts
const tiktok = (options)=>{
    const tokenEndpoint = "https://open.tiktokapis.com/v2/oauth/token/";
    return {
        id: "tiktok",
        name: "TikTok",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user.info.profile"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return new URL(`https://www.tiktok.com/v2/auth/authorize?scope=${_scopes.join(",")}&response_type=code&client_key=${options.clientKey}&redirect_uri=${encodeURIComponent(options.redirectURI || redirectURI)}&state=${state}`);
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI: options.redirectURI || redirectURI,
                options: {
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientSecret: options.clientSecret
                },
                tokenEndpoint,
                authentication: "post",
                extraParams: {
                    client_key: options.clientKey
                }
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])(`https://open.tiktokapis.com/v2/user/info/?fields=${[
                "open_id",
                "avatar_large_url",
                "display_name",
                "username"
            ].join(",")}`, {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            return {
                user: {
                    email: profile.data.user.email || profile.data.user.username,
                    id: profile.data.user.open_id,
                    name: profile.data.user.display_name || profile.data.user.username || "",
                    image: profile.data.user.avatar_large_url,
                    emailVerified: false
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/twitch.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "twitch",
    ()=>twitch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/util/decode_jwt.js [app-rsc] (ecmascript)");
;
;
;
;
;
//#region src/social-providers/twitch.ts
const twitch = (options)=>{
    const tokenEndpoint = "https://id.twitch.tv/oauth2/token";
    return {
        id: "twitch",
        name: "Twitch",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "user:read:email",
                "openid"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "twitch",
                redirectURI,
                options,
                authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
                scopes: _scopes,
                state,
                claims: options.claims || [
                    "email",
                    "email_verified",
                    "preferred_username",
                    "picture"
                ]
            });
        },
        validateAuthorizationCode: async ({ code, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const idToken = token.idToken;
            if (!idToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("No idToken found in token");
                return null;
            }
            const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeJwt"])(idToken);
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.preferred_username,
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/twitter.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "twitter",
    ()=>twitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/twitter.ts
const twitter = (options)=>{
    const tokenEndpoint = "https://api.x.com/2/oauth2/token";
    return {
        id: "twitter",
        name: "Twitter",
        createAuthorizationURL (data) {
            const _scopes = options.disableDefaultScope ? [] : [
                "users.read",
                "tweet.read",
                "offline.access",
                "users.email"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (data.scopes) _scopes.push(...data.scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "twitter",
                options,
                authorizationEndpoint: "https://x.com/i/oauth2/authorize",
                scopes: _scopes,
                state: data.state,
                codeVerifier: data.codeVerifier,
                redirectURI: data.redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                authentication: "basic",
                redirectURI,
                options,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                authentication: "basic",
                tokenEndpoint
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error: profileError } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.x.com/2/users/me?user.fields=profile_image_url", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (profileError) return null;
            const { data: emailData, error: emailError } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.x.com/2/users/me?user.fields=confirmed_email", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            let emailVerified = false;
            if (!emailError && emailData?.data?.confirmed_email) {
                profile.data.email = emailData.data.confirmed_email;
                emailVerified = true;
            }
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.data.id,
                    name: profile.data.name,
                    email: profile.data.email || profile.data.username || null,
                    image: profile.data.profile_image_url,
                    emailVerified,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/vercel.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "vercel",
    ()=>vercel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/vercel.ts
const vercel = (options)=>{
    return {
        id: "vercel",
        name: "Vercel",
        createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            if (!codeVerifier) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("codeVerifier is required for Vercel");
            let _scopes = void 0;
            if (options.scope !== void 0 || scopes !== void 0) {
                _scopes = [];
                if (options.scope) _scopes.push(...options.scope);
                if (scopes) _scopes.push(...scopes);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "vercel",
                options,
                authorizationEndpoint: "https://vercel.com/oauth/authorize",
                scopes: _scopes,
                state,
                codeVerifier,
                redirectURI
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI,
                options,
                tokenEndpoint: "https://api.vercel.com/login/oauth/token"
            });
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.vercel.com/login/oauth/userinfo", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error || !profile) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.sub,
                    name: profile.name ?? profile.preferred_username ?? "",
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified ?? false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/vk.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "vk",
    ()=>vk
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/create-authorization-url.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/vk.ts
const vk = (options)=>{
    const tokenEndpoint = "https://id.vk.com/oauth2/auth";
    return {
        id: "vk",
        name: "VK",
        async createAuthorizationURL ({ state, scopes, codeVerifier, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "email",
                "phone"
            ];
            if (options.scope) _scopes.push(...options.scope);
            if (scopes) _scopes.push(...scopes);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$create$2d$authorization$2d$url$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAuthorizationURL"])({
                id: "vk",
                options,
                authorizationEndpoint: "https://id.vk.com/authorize",
                scopes: _scopes,
                state,
                redirectURI,
                codeVerifier
            });
        },
        validateAuthorizationCode: async ({ code, codeVerifier, redirectURI, deviceId })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                codeVerifier,
                redirectURI: options.redirectURI || redirectURI,
                options,
                deviceId,
                tokenEndpoint
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint
            });
        },
        async getUserInfo (data) {
            if (options.getUserInfo) return options.getUserInfo(data);
            if (!data.accessToken) return null;
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://id.vk.com/oauth2/user_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    access_token: data.accessToken,
                    client_id: options.clientId
                }).toString()
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            if (!profile.user.email && !userMap?.email) return null;
            return {
                user: {
                    id: profile.user.user_id,
                    first_name: profile.user.first_name,
                    last_name: profile.user.last_name,
                    email: profile.user.email,
                    image: profile.user.avatar,
                    emailVerified: false,
                    birthday: profile.user.birthday,
                    sex: profile.user.sex,
                    name: `${profile.user.first_name} ${profile.user.last_name}`,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/wechat.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wechat",
    ()=>wechat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
//#region src/social-providers/wechat.ts
const wechat = (options)=>{
    return {
        id: "wechat",
        name: "WeChat",
        createAuthorizationURL ({ state, scopes, redirectURI }) {
            const _scopes = options.disableDefaultScope ? [] : [
                "snsapi_login"
            ];
            options.scope && _scopes.push(...options.scope);
            scopes && _scopes.push(...scopes);
            const url = new URL("https://open.weixin.qq.com/connect/qrconnect");
            url.searchParams.set("scope", _scopes.join(","));
            url.searchParams.set("response_type", "code");
            url.searchParams.set("appid", options.clientId);
            url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
            url.searchParams.set("state", state);
            url.searchParams.set("lang", options.lang || "cn");
            url.hash = "wechat_redirect";
            return url;
        },
        validateAuthorizationCode: async ({ code })=>{
            const { data: tokenData, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.weixin.qq.com/sns/oauth2/access_token?" + new URLSearchParams({
                appid: options.clientId,
                secret: options.clientSecret,
                code,
                grant_type: "authorization_code"
            }).toString(), {
                method: "GET"
            });
            if (error || !tokenData || tokenData.errcode) throw new Error(`Failed to validate authorization code: ${tokenData?.errmsg || error?.message || "Unknown error"}`);
            return {
                tokenType: "Bearer",
                accessToken: tokenData.access_token,
                refreshToken: tokenData.refresh_token,
                accessTokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1e3),
                scopes: tokenData.scope.split(","),
                openid: tokenData.openid,
                unionid: tokenData.unionid
            };
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>{
            const { data: tokenData, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.weixin.qq.com/sns/oauth2/refresh_token?" + new URLSearchParams({
                appid: options.clientId,
                grant_type: "refresh_token",
                refresh_token: refreshToken
            }).toString(), {
                method: "GET"
            });
            if (error || !tokenData || tokenData.errcode) throw new Error(`Failed to refresh access token: ${tokenData?.errmsg || error?.message || "Unknown error"}`);
            return {
                tokenType: "Bearer",
                accessToken: tokenData.access_token,
                refreshToken: tokenData.refresh_token,
                accessTokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1e3),
                scopes: tokenData.scope.split(",")
            };
        },
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const openid = token.openid;
            if (!openid) return null;
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.weixin.qq.com/sns/userinfo?" + new URLSearchParams({
                access_token: token.accessToken || "",
                openid,
                lang: "zh_CN"
            }).toString(), {
                method: "GET"
            });
            if (error || !profile || profile.errcode) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.unionid || profile.openid || openid,
                    name: profile.nickname,
                    email: profile.email || `${profile.unionid || profile.openid || openid}@wechat.invalid`,
                    image: profile.headimgurl,
                    emailVerified: false,
                    ...userMap
                },
                data: profile
            };
        },
        options
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/social-providers/zoom.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zoom",
    ()=>zoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/utils.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/refresh-access-token.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/oauth2/validate-authorization-code.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-rsc] (ecmascript)");
;
;
;
;
//#region src/social-providers/zoom.ts
const zoom = (userOptions)=>{
    const options = {
        pkce: true,
        ...userOptions
    };
    return {
        id: "zoom",
        name: "Zoom",
        createAuthorizationURL: async ({ state, redirectURI, codeVerifier })=>{
            const params = new URLSearchParams({
                response_type: "code",
                redirect_uri: options.redirectURI ? options.redirectURI : redirectURI,
                client_id: options.clientId,
                state
            });
            if (options.pkce) {
                const codeChallenge = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$utils$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateCodeChallenge"])(codeVerifier);
                params.set("code_challenge_method", "S256");
                params.set("code_challenge", codeChallenge);
            }
            const url = new URL("https://zoom.us/oauth/authorize");
            url.search = params.toString();
            return url;
        },
        validateAuthorizationCode: async ({ code, redirectURI, codeVerifier })=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$validate$2d$authorization$2d$code$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateAuthorizationCode"])({
                code,
                redirectURI: options.redirectURI || redirectURI,
                codeVerifier,
                options,
                tokenEndpoint: "https://zoom.us/oauth/token",
                authentication: "post"
            });
        },
        refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$oauth2$2f$refresh$2d$access$2d$token$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["refreshAccessToken"])({
                refreshToken,
                options: {
                    clientId: options.clientId,
                    clientKey: options.clientKey,
                    clientSecret: options.clientSecret
                },
                tokenEndpoint: "https://zoom.us/oauth/token"
            }),
        async getUserInfo (token) {
            if (options.getUserInfo) return options.getUserInfo(token);
            const { data: profile, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["betterFetch"])("https://api.zoom.us/v2/users/me", {
                headers: {
                    authorization: `Bearer ${token.accessToken}`
                }
            });
            if (error) return null;
            const userMap = await options.mapProfileToUser?.(profile);
            return {
                user: {
                    id: profile.id,
                    name: profile.display_name,
                    image: profile.pic_url,
                    email: profile.email,
                    emailVerified: Boolean(profile.verified),
                    ...userMap
                },
                data: {
                    ...profile
                }
            };
        }
    };
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/db.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterOutputFields",
    ()=>filterOutputFields
]);
//#region src/utils/db.ts
/**
* Filters output data by removing fields with the `returned: false` attribute.
* This ensures sensitive fields are not exposed in API responses.
*/ function filterOutputFields(data, additionalFields) {
    if (!data || !additionalFields) return data;
    const returnFiltered = Object.entries(additionalFields).filter(([, { returned }])=>returned === false).map(([key])=>key);
    return Object.entries(structuredClone(data)).filter(([key])=>!returnFiltered.includes(key)).reduce((acc, [key, value])=>({
            ...acc,
            [key]: value
        }), {});
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/deprecate.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deprecate",
    ()=>deprecate
]);
//#region src/utils/deprecate.ts
/**
* Wraps a function to log a deprecation warning at once.
*/ function deprecate(fn, message, logger) {
    let warned = false;
    return function(...args) {
        if (!warned) {
            (logger?.warn ?? console.warn)(`[Deprecation] ${message}`);
            warned = true;
        }
        return fn.apply(this, args);
    };
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/error-codes.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineErrorCodes",
    ()=>defineErrorCodes
]);
//#region src/utils/error-codes.ts
function defineErrorCodes(codes) {
    return Object.fromEntries(Object.entries(codes).map(([key, value])=>[
            key,
            {
                code: key,
                message: value,
                toString: ()=>key
            }
        ]));
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/host.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classifyHost",
    ()=>classifyHost,
    "isLoopbackHost",
    ()=>isLoopbackHost,
    "isLoopbackIP",
    ()=>isLoopbackIP,
    "isPublicRoutableHost",
    ()=>isPublicRoutableHost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$ip$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/ip.mjs [app-rsc] (ecmascript)");
;
//#region src/utils/host.ts
/**
* Cloud provider instance metadata service FQDNs. These resolve to link-local
* IPs (usually `169.254.169.254`) inside their respective clouds and are
* prime SSRF targets.
*
* The IPs themselves are already caught by the `linkLocal` kind; this set
* only exists for the FQDN form that a naive server-side fetch might resolve
* via its own resolver.
*/ const CLOUD_METADATA_HOSTS = /* @__PURE__ */ new Set([
    "metadata.google.internal",
    "metadata.goog",
    "metadata",
    "instance-data",
    "instance-data.ec2.internal"
]);
/** Strip `[...]` if the entire input is bracketed (IPv6 literal form). */ function stripBrackets(host) {
    if (host.length >= 2 && host.startsWith("[") && host.endsWith("]")) return host.slice(1, -1);
    return host;
}
/**
* Strip trailing `:port` from host-with-port strings.
*
* - Bracketed IPv6 with port: `[::1]:8080` → `[::1]`
* - IPv4/FQDN with port: `127.0.0.1:3000` / `example.com:443` → base form
* - Bare IPv6: `::1` / `fe80::1` → unchanged (multiple colons means no port)
*/ function stripPort(host) {
    if (host.startsWith("[")) {
        const end = host.indexOf("]");
        if (end === -1) return host;
        return host.slice(0, end + 1);
    }
    const firstColon = host.indexOf(":");
    if (firstColon === -1) return host;
    if (host.indexOf(":", firstColon + 1) !== -1) return host;
    return host.slice(0, firstColon);
}
/** Strip IPv6 zone identifier: `fe80::1%eth0` → `fe80::1`. */ function stripZoneId(host) {
    const zone = host.indexOf("%");
    if (zone === -1) return host;
    return host.slice(0, zone);
}
/**
* Strip trailing dots (RFC 1034 absolute DNS form): `localhost.` → `localhost`.
* Without this, `metadata.google.internal.` would fall through to `public` and
* bypass the cloud-metadata / `.localhost` checks, since WHATWG URL parsing
* preserves the trailing dot in `url.hostname`.
*/ function stripTrailingDot(host) {
    return host.replace(/\.+$/, "");
}
/** Fast dotted-decimal shape check. Does NOT validate octet bounds. */ function looksLikeIPv4(host) {
    return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
}
/** Pack a validated dotted-decimal IPv4 into a 32-bit unsigned integer. */ function ipv4ToUint32(ip) {
    const parts = ip.split(".");
    return (Number(parts[0]) << 24 | Number(parts[1]) << 16 | Number(parts[2]) << 8 | Number(parts[3])) >>> 0;
}
/** Check whether a 32-bit value matches `prefix/length` (both unsigned). */ function inIPv4Range(value, prefix, length) {
    if (length === 0) return true;
    const mask = length === 32 ? 4294967295 : -1 << 32 - length >>> 0;
    return (value & mask) === (prefix & mask);
}
function classifyIPv4(ip) {
    if (ip === "0.0.0.0") return "unspecified";
    if (ip === "255.255.255.255") return "broadcast";
    const n = ipv4ToUint32(ip);
    if (inIPv4Range(n, ipv4ToUint32("127.0.0.0"), 8)) return "loopback";
    if (inIPv4Range(n, ipv4ToUint32("10.0.0.0"), 8)) return "private";
    if (inIPv4Range(n, ipv4ToUint32("172.16.0.0"), 12)) return "private";
    if (inIPv4Range(n, ipv4ToUint32("192.168.0.0"), 16)) return "private";
    if (inIPv4Range(n, ipv4ToUint32("169.254.0.0"), 16)) return "linkLocal";
    if (inIPv4Range(n, ipv4ToUint32("100.64.0.0"), 10)) return "sharedAddressSpace";
    if (inIPv4Range(n, ipv4ToUint32("192.0.2.0"), 24)) return "documentation";
    if (inIPv4Range(n, ipv4ToUint32("198.51.100.0"), 24)) return "documentation";
    if (inIPv4Range(n, ipv4ToUint32("203.0.113.0"), 24)) return "documentation";
    if (inIPv4Range(n, ipv4ToUint32("198.18.0.0"), 15)) return "benchmarking";
    if (inIPv4Range(n, ipv4ToUint32("224.0.0.0"), 4)) return "multicast";
    if (inIPv4Range(n, ipv4ToUint32("0.0.0.0"), 8)) return "reserved";
    if (inIPv4Range(n, ipv4ToUint32("192.0.0.0"), 24)) return "reserved";
    if (inIPv4Range(n, ipv4ToUint32("240.0.0.0"), 4)) return "reserved";
    return "public";
}
/**
* Extract an IPv4 address embedded in an expanded IPv6 literal.
*
* Used to recurse into tunnel/translation forms (6to4, NAT64, Teredo) so a
* private destination cannot be smuggled behind a syntactically-public IPv6
* literal. `startGroup` is the index of the first of two 16-bit groups in the
* expanded form (`0000:0000:...`). With `xor: true`, the 32-bit value is XORed
* with `0xffffffff` before decoding (Teredo obfuscates the client IPv4 this
* way).
*/ function extractEmbeddedIPv4(expanded, startGroup, options = {}) {
    const offset = startGroup * 5;
    const g1 = Number.parseInt(expanded.slice(offset, offset + 4), 16);
    const g2 = Number.parseInt(expanded.slice(offset + 5, offset + 9), 16);
    if (!Number.isFinite(g1) || !Number.isFinite(g2)) return null;
    let combined = (g1 << 16 | g2) >>> 0;
    if (options.xor) combined = (combined ^ 4294967295) >>> 0;
    return `${combined >>> 24 & 255}.${combined >>> 16 & 255}.${combined >>> 8 & 255}.${combined & 255}`;
}
/**
* Classify an expanded, full-form, lowercase IPv6 address (no IPv4-mapped
* input — those are unmapped to IPv4 before reaching here).
*
* 6to4 (`2002::/16`), NAT64 (`64:ff9b::/96`) and Teredo (`2001:0000::/32`)
* embed an IPv4 that can route to private/loopback space. If the embedded
* IPv4 classifies as non-`public`, return `reserved` — blocks SSRF without
* advertising the address as a loopback literal for RFC 8252 §7.3 matching.
*/ function classifyIPv6(expanded) {
    if (expanded === "0000:0000:0000:0000:0000:0000:0000:0000") return "unspecified";
    if (expanded === "0000:0000:0000:0000:0000:0000:0000:0001") return "loopback";
    const firstByte = Number.parseInt(expanded.slice(0, 2), 16);
    const secondByte = Number.parseInt(expanded.slice(2, 4), 16);
    if (firstByte === 255) return "multicast";
    if (firstByte === 254 && (secondByte & 192) === 128) return "linkLocal";
    if ((firstByte & 254) === 252) return "private";
    if (expanded.startsWith("2001:0db8:")) return "documentation";
    if (expanded.startsWith("2001:0002:0000:")) return "benchmarking";
    if (expanded.startsWith("2002:")) {
        const embedded = extractEmbeddedIPv4(expanded, 1);
        if (embedded && classifyIPv4(embedded) !== "public") return "reserved";
        return "public";
    }
    if (expanded.startsWith("0064:ff9b:0000:0000:0000:0000:")) {
        const embedded = extractEmbeddedIPv4(expanded, 6);
        if (embedded && classifyIPv4(embedded) !== "public") return "reserved";
        return "reserved";
    }
    if (expanded.startsWith("0064:ff9b:0001:")) return "reserved";
    if (expanded.startsWith("2001:0000:")) {
        const embedded = extractEmbeddedIPv4(expanded, 6, {
            xor: true
        });
        if (embedded && classifyIPv4(embedded) !== "public") return "reserved";
        return "reserved";
    }
    if (expanded.startsWith("0100:0000:0000:0000:")) return "reserved";
    if (expanded.startsWith("3fff:0")) return "documentation";
    if (expanded.startsWith("5f00:")) return "reserved";
    return "public";
}
/**
* Classify a host string according to RFC 6890 / RFC 6761.
*
* Accepts inputs in any of these shapes and normalizes before classifying:
*
*   - Bare IPv4: `127.0.0.1`
*   - Bare IPv6: `::1`, `fe80::1%eth0`
*   - Bracketed IPv6: `[::1]`
*   - Host with port: `localhost:3000`, `127.0.0.1:443`, `[::1]:8080`
*   - FQDN: `example.com`, `tenant.localhost`
*   - IPv4-mapped IPv6: `::ffff:192.0.2.1` (reported as `literal: "ipv4"`)
*
* Invalid or non-resolvable FQDNs are returned as `{ kind: "public", literal: "fqdn" }`
* — this function never throws. Callers that need structural validation must
* combine this with a URL/hostname validator upstream.
*
* @example
* classifyHost("127.0.0.1")
* // { kind: "loopback", literal: "ipv4", canonical: "127.0.0.1" }
*
* @example
* classifyHost("[::1]:8080")
* // { kind: "loopback", literal: "ipv6", canonical: "0000:0000:...:0001" }
*
* @example
* classifyHost("::ffff:192.0.2.1")
* // { kind: "documentation", literal: "ipv4", canonical: "192.0.2.1" }
*
* @example
* classifyHost("tenant-a.localhost")
* // { kind: "localhost", literal: "fqdn", canonical: "tenant-a.localhost" }
*/ function classifyHost(host) {
    const lowered = stripTrailingDot(stripZoneId(stripBrackets(stripPort(host.trim())))).toLowerCase();
    if (lowered === "") return {
        kind: "reserved",
        literal: "fqdn",
        canonical: ""
    };
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$ip$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidIP"])(lowered)) {
        if (lowered === "localhost" || lowered.endsWith(".localhost")) return {
            kind: "localhost",
            literal: "fqdn",
            canonical: lowered
        };
        if (CLOUD_METADATA_HOSTS.has(lowered)) return {
            kind: "cloudMetadata",
            literal: "fqdn",
            canonical: lowered
        };
        return {
            kind: "public",
            literal: "fqdn",
            canonical: lowered
        };
    }
    if (looksLikeIPv4(lowered)) return {
        kind: classifyIPv4(lowered),
        literal: "ipv4",
        canonical: lowered
    };
    const canonical = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$ip$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeIP"])(lowered, {
        ipv6Subnet: 128
    });
    if (looksLikeIPv4(canonical)) return {
        kind: classifyIPv4(canonical),
        literal: "ipv4",
        canonical
    };
    return {
        kind: classifyIPv6(canonical),
        literal: "ipv6",
        canonical
    };
}
/**
* Strict loopback-IP-literal check per RFC 8252 §7.3.
*
* Returns true ONLY for IPv4 `127.0.0.0/8` or IPv6 `::1`. The DNS name
* `localhost` returns false — RFC 8252 §8.3 explicitly recommends against
* relying on name resolution for loopback redirect URIs.
*
* Use this for OAuth redirect URI matching.
*
* @example
* isLoopbackIP("127.0.0.1")     // true
* isLoopbackIP("::1")           // true
* isLoopbackIP("[::1]:8080")    // true
* isLoopbackIP("localhost")     // false  (use isLoopbackHost for DNS names)
* isLoopbackIP("0.0.0.0")       // false  (unspecified, not loopback)
*/ function isLoopbackIP(host) {
    return classifyHost(host).kind === "loopback";
}
/**
* Permissive loopback check for developer-ergonomics code paths.
*
* Returns true for IPv4 `127.0.0.0/8`, IPv6 `::1`, the literal name `localhost`,
* and any RFC 6761 `.localhost` subdomain (`tenant.localhost`, `app.localhost`).
*
* Use this for things like: allowing HTTP for dev servers, skipping Secure
* cookie requirements, browser-trust heuristics. Do NOT use this for OAuth
* redirect URI matching — use {@link isLoopbackIP} there.
*
* @example
* isLoopbackHost("localhost")         // true
* isLoopbackHost("tenant.localhost")  // true  (RFC 6761)
* isLoopbackHost("127.0.0.1")         // true
* isLoopbackHost("0.0.0.0")           // false (unspecified, NOT loopback)
*/ function isLoopbackHost(host) {
    const kind = classifyHost(host).kind;
    return kind === "loopback" || kind === "localhost";
}
/**
* First-line SSRF gate: returns true ONLY for hosts that classify as `public`.
*
* Every RFC 6890 special-purpose range (loopback, private, link-local,
* unspecified, documentation, multicast, broadcast, reserved, shared address
* space, benchmarking) and cloud-metadata FQDN returns false.
*
* Use this BEFORE issuing a server-side fetch to a user-supplied URL, e.g.
* OAuth introspection endpoints, webhook targets, or metadata-document
* fetches (CIMD).
*
* Limitations (this is a syntactic check, not a complete SSRF mitigation):
* - No DNS resolution: a public-looking FQDN that resolves to a private IP
*   passes this check. Re-verify the resolved address before connecting, or
*   pin the socket to the resolved IP.
* - No DNS-rebinding defense: attackers can return a public IP on the first
*   lookup and a private IP on the second. Resolve once and reuse the IP.
* - No redirect following: HTTP 3xx responses can redirect to private hosts.
*   Re-run this check on every redirect target, or disable auto-follow.
*
* @example
* isPublicRoutableHost("example.com")            // true
* isPublicRoutableHost("127.0.0.1")              // false (loopback)
* isPublicRoutableHost("169.254.169.254")        // false (linkLocal / AWS IMDS)
* isPublicRoutableHost("metadata.google.internal") // false (cloudMetadata)
* isPublicRoutableHost("10.0.0.1")               // false (private)
* isPublicRoutableHost("::ffff:127.0.0.1")       // false (mapped loopback)
*/ function isPublicRoutableHost(host) {
    return classifyHost(host).kind === "public";
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/id.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateId",
    ()=>generateId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-rsc] (ecmascript)");
;
//#region src/utils/id.ts
const generateId = (size)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRandomStringGenerator"])("a-z", "A-Z", "0-9")(size || 32);
};
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/ip.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRateLimitKey",
    ()=>createRateLimitKey,
    "findInvalidTrustedProxies",
    ()=>findInvalidTrustedProxies,
    "getIPFromHeader",
    ()=>getIPFromHeader,
    "getIp",
    ()=>getIp,
    "isValidIP",
    ()=>isValidIP,
    "normalizeIP",
    ()=>normalizeIP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/env-impl.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/zod/v4/classic/schemas.js [app-rsc] (ecmascript)");
;
;
//#region src/utils/ip.ts
/**
* Checks if an IP is valid IPv4 or IPv6
*/ function isValidIP(ip) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ipv4"]().safeParse(ip).success || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ipv6"]().safeParse(ip).success;
}
/**
* Checks if an IP is IPv6
*/ function isIPv6(ip) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ipv6"]().safeParse(ip).success;
}
/**
* Converts IPv4-mapped IPv6 address to IPv4
* e.g., "::ffff:192.0.2.1" -> "192.0.2.1"
*/ function extractIPv4FromMapped(ipv6) {
    const lower = ipv6.toLowerCase();
    if (lower.startsWith("::ffff:")) {
        const ipv4Part = lower.substring(7);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ipv4"]().safeParse(ipv4Part).success) return ipv4Part;
    }
    const parts = ipv6.split(":");
    if (parts.length === 7 && parts[5]?.toLowerCase() === "ffff") {
        const ipv4Part = parts[6];
        if (ipv4Part && __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ipv4"]().safeParse(ipv4Part).success) return ipv4Part;
    }
    if (lower.includes("::ffff:") || lower.includes(":ffff:")) {
        const groups = expandIPv6(ipv6);
        if (groups.length === 8 && groups[0] === "0000" && groups[1] === "0000" && groups[2] === "0000" && groups[3] === "0000" && groups[4] === "0000" && groups[5] === "ffff" && groups[6] && groups[7]) return `${Number.parseInt(groups[6].substring(0, 2), 16)}.${Number.parseInt(groups[6].substring(2, 4), 16)}.${Number.parseInt(groups[7].substring(0, 2), 16)}.${Number.parseInt(groups[7].substring(2, 4), 16)}`;
    }
    return null;
}
/**
* Expands a compressed IPv6 address to full form
* e.g., "2001:db8::1" -> ["2001", "0db8", "0000", "0000", "0000", "0000", "0000", "0001"]
*/ function expandIPv6(ipv6) {
    if (ipv6.includes("::")) {
        const sides = ipv6.split("::");
        const left = sides[0] ? sides[0].split(":") : [];
        const right = sides[1] ? sides[1].split(":") : [];
        const missingGroups = 8 - left.length - right.length;
        const zeros = Array(missingGroups).fill("0000");
        const paddedLeft = left.map((g)=>g.padStart(4, "0"));
        const paddedRight = right.map((g)=>g.padStart(4, "0"));
        return [
            ...paddedLeft,
            ...zeros,
            ...paddedRight
        ];
    }
    return ipv6.split(":").map((g)=>g.padStart(4, "0"));
}
/**
* Normalizes an IPv6 address to canonical form
* e.g., "2001:DB8::1" -> "2001:0db8:0000:0000:0000:0000:0000:0001"
*/ function normalizeIPv6(ipv6, subnetPrefix) {
    const groups = expandIPv6(ipv6);
    if (subnetPrefix !== void 0 && subnetPrefix < 128) {
        let bitsRemaining = Math.max(0, Math.floor(subnetPrefix));
        return groups.map((group)=>{
            if (bitsRemaining <= 0) return "0000";
            if (bitsRemaining >= 16) {
                bitsRemaining -= 16;
                return group;
            }
            const masked = Number.parseInt(group, 16) & (65535 << 16 - bitsRemaining & 65535);
            bitsRemaining = 0;
            return masked.toString(16).padStart(4, "0");
        }).join(":").toLowerCase();
    }
    return groups.join(":").toLowerCase();
}
/**
* Normalizes an IP address (IPv4 or IPv6) for consistent rate limiting.
*
* @param ip - The IP address to normalize
* @param options - Normalization options
* @returns Normalized IP address
*
* @example
* normalizeIP("2001:DB8::1")
* // -> "2001:0db8:0000:0000:0000:0000:0000:0000"
*
* @example
* normalizeIP("::ffff:192.0.2.1")
* // -> "192.0.2.1" (converted to IPv4)
*
* @example
* normalizeIP("2001:db8::1", { ipv6Subnet: 64 })
* // -> "2001:0db8:0000:0000:0000:0000:0000:0000" (subnet /64)
*/ function normalizeIP(ip, options = {}) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ipv4"]().safeParse(ip).success) return ip.toLowerCase();
    if (!isIPv6(ip)) return ip.toLowerCase();
    const ipv4 = extractIPv4FromMapped(ip);
    if (ipv4) return ipv4.toLowerCase();
    return normalizeIPv6(ip, options.ipv6Subnet ?? 64);
}
/**
* Raw bytes of an IP for CIDR comparison. Returns `null` for an invalid IP.
*/ function ipToBytes(ip) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ipv4"]().safeParse(ip).success) return Uint8Array.from(ip.split(".").map((octet)=>Number(octet)));
    if (!isIPv6(ip)) return null;
    const mapped = extractIPv4FromMapped(ip);
    if (mapped) return Uint8Array.from(mapped.split(".").map((octet)=>Number(octet)));
    const groups = expandIPv6(ip);
    const bytes = /* @__PURE__ */ new Uint8Array(16);
    for(let i = 0; i < 8; i++){
        const group = Number.parseInt(groups[i] ?? "0", 16);
        bytes[i * 2] = group >> 8 & 255;
        bytes[i * 2 + 1] = group & 255;
    }
    return bytes;
}
const CIDR_PREFIX_PATTERN = /^\d+$/;
/**
* Parses an IP or `IP/prefix` string into network bytes and a prefix length.
* The prefix must be digits only and within the address family. `null` if the
* value is not a valid IP or CIDR range, which keeps a malformed entry from
* silently behaving like a non-match.
*/ function parseCIDR(value) {
    const slash = value.lastIndexOf("/");
    const bytes = ipToBytes(slash === -1 ? value : value.slice(0, slash));
    if (!bytes) return null;
    const maxBits = bytes.length * 8;
    if (slash === -1) return {
        bytes,
        prefix: maxBits
    };
    const prefixPart = value.slice(slash + 1);
    if (!CIDR_PREFIX_PATTERN.test(prefixPart)) return null;
    const prefix = Number(prefixPart);
    return prefix <= maxBits ? {
        bytes,
        prefix
    } : null;
}
/**
* Whether `ipBytes` falls inside an already-parsed CIDR network.
*/ function matchesCIDR(ipBytes, net) {
    if (ipBytes.length !== net.bytes.length) return false;
    let bitsRemaining = net.prefix;
    for(let i = 0; i < ipBytes.length && bitsRemaining > 0; i++){
        const take = bitsRemaining >= 8 ? 8 : bitsRemaining;
        const mask = take === 8 ? 255 : 255 << 8 - take & 255;
        if (((ipBytes[i] ?? 0) & mask) !== ((net.bytes[i] ?? 0) & mask)) return false;
        bitsRemaining -= 8;
    }
    return true;
}
/**
* Trusted-proxy entries that are not a valid IP address or CIDR range.
*/ function findInvalidTrustedProxies(entries) {
    return entries.filter((entry)=>parseCIDR(entry) === null);
}
/**
* Resolves the client IP from a forwarded header. The leftmost token is spoofable,
* so with `trustedProxies` the chain is stripped from the right to the first
* untrusted hop. Otherwise only a single-value header is trusted. Returns `null`
* when no trustworthy client IP can be resolved.
*/ function getIPFromHeader(value, options = {}) {
    const forwardedIps = value.split(",").map((ip)=>ip.trim()).filter(Boolean);
    if (forwardedIps.length === 0) return null;
    const trustedProxies = (options.trustedProxies ?? []).map(parseCIDR).filter((proxy)=>{
        return proxy !== null;
    });
    if (trustedProxies.length > 0) {
        for(let i = forwardedIps.length - 1; i >= 0; i--){
            const ip = forwardedIps[i];
            const ipBytes = ip ? ipToBytes(ip) : null;
            if (!ip || !ipBytes) return null;
            if (trustedProxies.some((proxy)=>matchesCIDR(ipBytes, proxy))) continue;
            return normalizeIP(ip, {
                ipv6Subnet: options.ipv6Subnet
            });
        }
        return null;
    }
    if (forwardedIps.length !== 1) return null;
    const selectedIp = forwardedIps[0];
    if (!selectedIp || !isValidIP(selectedIp)) return null;
    return normalizeIP(selectedIp, {
        ipv6Subnet: options.ipv6Subnet
    });
}
const LOCALHOST_IP = "127.0.0.1";
const DEFAULT_IP_HEADERS = [
    "x-forwarded-for"
];
/**
* Resolves the client IP for a request from the configured IP headers.
* Honors `disableIpTracking`, walks `ipAddressHeaders` in order (default
* `x-forwarded-for`), and falls back to localhost in development and test.
* Returns `null` when tracking is disabled or no trustworthy IP can be resolved.
*/ function getIp(req, options) {
    if (options.advanced?.ipAddress?.disableIpTracking) return null;
    const headers = "headers" in req ? req.headers : req;
    const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || DEFAULT_IP_HEADERS;
    for (const key of ipHeaders){
        const value = "get" in headers ? headers.get(key) : headers[key];
        if (typeof value === "string") {
            const ip = getIPFromHeader(value, {
                ipv6Subnet: options.advanced?.ipAddress?.ipv6Subnet,
                trustedProxies: options.advanced?.ipAddress?.trustedProxies
            });
            if (ip) return ip;
        }
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTest"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isDevelopment"])()) return LOCALHOST_IP;
    return null;
}
/**
* Creates a rate limit key from IP and path
* Uses a separator to prevent collision attacks
*
* @param ip - The IP address (should be normalized)
* @param path - The request path
* @returns Rate limit key
*/ function createRateLimitKey(ip, path) {
    return `${ip}|${path}`;
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/is-api-error.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAPIError",
    ()=>isAPIError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-rsc] (ecmascript)");
;
;
//#region src/utils/is-api-error.ts
function isAPIError(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"] || error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["APIError"] || error?.name === "APIError";
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/json.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safeJSONParse",
    ()=>safeJSONParse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/logger.mjs [app-rsc] (ecmascript)");
;
//#region src/utils/json.ts
const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
function reviveDate(value) {
    if (typeof value === "string" && iso8601Regex.test(value)) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) return date;
    }
    return value;
}
/**
* Recursively walk a pre-parsed object and convert ISO 8601 date strings
* to Date instances. This handles the case where a Redis client (or similar)
* returns already-parsed JSON objects whose date fields are still strings.
*/ function reviveDates(value) {
    if (value === null || value === void 0) return value;
    if (typeof value === "string") return reviveDate(value);
    if (value instanceof Date) return value;
    if (Array.isArray(value)) return value.map(reviveDates);
    if (typeof value === "object") {
        const result = {};
        for (const key of Object.keys(value))result[key] = reviveDates(value[key]);
        return result;
    }
    return value;
}
function safeJSONParse(data) {
    try {
        if (typeof data !== "string") {
            if (data === null || data === void 0) return null;
            return reviveDates(data);
        }
        return JSON.parse(data, (_, value)=>reviveDate(value));
    } catch (e) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$logger$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logger"].error("Error parsing JSON", {
            error: e
        });
        return null;
    }
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/string.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capitalizeFirstLetter",
    ()=>capitalizeFirstLetter,
    "toCamelCase",
    ()=>toCamelCase,
    "toKebabCase",
    ()=>toKebabCase,
    "toPascalCase",
    ()=>toPascalCase,
    "toSnakeCase",
    ()=>toSnakeCase
]);
//#region src/utils/string.ts
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const WORD_PATTERN = /[\p{Ll}\d]+|\p{Lu}+(?!\p{Ll})|\p{Lu}[\p{Ll}\d]+|\p{Lo}+/gu;
const APOSTROPHE_PATTERN = /['\u2019]/g;
function splitWords(input) {
    return input.replace(APOSTROPHE_PATTERN, "").match(WORD_PATTERN) ?? [];
}
function toSnakeCase(input) {
    return splitWords(input).map((word)=>word.toLowerCase()).join("_");
}
function toKebabCase(input) {
    return splitWords(input).map((word)=>word.toLowerCase()).join("-");
}
function toCamelCase(input) {
    return splitWords(input).reduce((acc, word, i)=>{
        return acc + (i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`);
    }, "");
}
function toPascalCase(input) {
    return splitWords(input).map((word)=>`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`).join("");
}
;
}),
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/url.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DANGEROUS_URL_SCHEMES",
    ()=>DANGEROUS_URL_SCHEMES,
    "isSafeUrlScheme",
    ()=>isSafeUrlScheme,
    "normalizePathname",
    ()=>normalizePathname
]);
//#region src/utils/url.ts
/**
* Normalizes a request pathname by removing the basePath prefix and trailing slashes.
* This is useful for matching paths against configured path lists.
*
* @param requestUrl - The full request URL
* @param basePath - The base path of the auth API (e.g., "/api/auth")
* @returns The normalized path without basePath prefix or trailing slashes,
*          or "/" if URL parsing fails
*
* @example
* normalizePathname("http://localhost:3000/api/auth/sso/saml2/callback/provider1", "/api/auth")
* // Returns: "/sso/saml2/callback/provider1"
*
* normalizePathname("http://localhost:3000/sso/saml2/callback/provider1/", "/")
* // Returns: "/sso/saml2/callback/provider1"
*/ function normalizePathname(requestUrl, basePath) {
    let pathname;
    try {
        pathname = new URL(requestUrl).pathname.replace(/\/+$/, "") || "/";
    } catch  {
        return "/";
    }
    const normalizedBasePath = basePath.replace(/\/+$/, "");
    if (normalizedBasePath === "") return pathname;
    if (pathname === normalizedBasePath) return "/";
    if (pathname.startsWith(normalizedBasePath + "/")) return pathname.slice(normalizedBasePath.length).replace(/\/+$/, "") || "/";
    return pathname;
}
/**
* Schemes that execute or embed code when navigated to or accepted as a
* redirect target. These are never safe as an OAuth `redirect_uri` or as a
* client-side navigation target (`window.location.href`, `location.assign`, ...).
*/ const DANGEROUS_URL_SCHEMES = [
    "javascript:",
    "data:",
    "vbscript:"
];
/**
* Returns `false` only when `value` is an absolute URL using a dangerous scheme
* (`javascript:`, `data:`, `vbscript:`). Relative URLs (e.g. `/dashboard`) and
* safe absolute schemes (`http`, `https`, custom app schemes such as
* `myapp://`) return `true`.
*
* Use this to guard browser navigation sinks and any redirect target that may
* originate from untrusted input. It is intentionally narrow: it blocks code
* execution schemes without rejecting relative paths or mobile deep links.
*/ function isSafeUrlScheme(value) {
    let parsed;
    try {
        parsed = new URL(value);
    } catch  {
        return true;
    }
    return !DANGEROUS_URL_SCHEMES.includes(parsed.protocol);
}
;
}),
];

//# sourceMappingURL=0rrk_%40better-auth_core_dist_1j23igb._.js.map