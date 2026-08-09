module.exports = [
"[project]/apps/web/node_modules/@better-auth/core/dist/env/env-impl.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/web/node_modules/@better-auth/core/dist/error/codes.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_ERROR_CODES",
    ()=>BASE_ERROR_CODES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$error$2d$codes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/error-codes.mjs [app-ssr] (ecmascript)");
;
//#region src/error/codes.ts
const BASE_ERROR_CODES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$error$2d$codes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineErrorCodes"])({
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
"[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIError",
    ()=>APIError,
    "BetterAuthError",
    ()=>BetterAuthError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$codes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/codes.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-call/dist/error.mjs [app-ssr] (ecmascript)");
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
var APIError = class APIError extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$call$2f$dist$2f$error$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"] {
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
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/error-codes.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/string.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/web/node_modules/@better-auth/core/dist/utils/url.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/web/node_modules/better-auth/dist/client/broadcast-channel.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGlobalBroadcastChannel",
    ()=>getGlobalBroadcastChannel,
    "kBroadcastChannel",
    ()=>kBroadcastChannel
]);
//#region src/client/broadcast-channel.ts
const kBroadcastChannel = Symbol.for("better-auth:broadcast-channel");
const now = ()=>Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
    listeners = /* @__PURE__ */ new Set();
    name;
    constructor(name = "better-auth.message"){
        this.name = name;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>{
            this.listeners.delete(listener);
        };
    }
    post(message) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    setup() {
        if ("TURBOPACK compile-time truthy", 1) return ()=>{};
        //TURBOPACK unreachable
        ;
        const handler = undefined;
    }
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
    if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
    return globalThis[kBroadcastChannel];
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/config.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClientConfig",
    ()=>getClientConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$utils$2f$url$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/utils/url.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$parser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/parser.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$fetch$2d$plugins$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/fetch-plugins.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$session$2d$atom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/session-atom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
//#region src/client/config.ts
const resolvePublicAuthUrl = (basePath)=>{
    if (typeof process === "undefined") return void 0;
    const path = basePath ?? "/api/auth";
    if (process.env.NEXT_PUBLIC_AUTH_URL) return process.env.NEXT_PUBLIC_AUTH_URL;
    if ("TURBOPACK compile-time truthy", 1) {
        if (process.env.NEXTAUTH_URL) try {
            return process.env.NEXTAUTH_URL;
        } catch  {}
        if (process.env.VERCEL_URL) try {
            const protocol = process.env.VERCEL_URL.startsWith("http") ? "" : "https://";
            return `${new URL(`${protocol}${process.env.VERCEL_URL}`).origin}${path}`;
        } catch  {}
    }
};
const getClientConfig = (options, loadEnv)=>{
    const isCredentialsSupported = "credentials" in Request.prototype;
    const baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$utils$2f$url$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBaseURL"])(options?.baseURL, options?.basePath, void 0, loadEnv) ?? resolvePublicAuthUrl(options?.basePath) ?? "/api/auth";
    const pluginsFetchPlugins = options?.plugins?.flatMap((plugin)=>plugin.fetchPlugins).filter((pl)=>pl !== void 0) || [];
    const lifeCyclePlugin = {
        id: "lifecycle-hooks",
        name: "lifecycle-hooks",
        hooks: {
            onSuccess: options?.fetchOptions?.onSuccess,
            onError: options?.fetchOptions?.onError,
            onRequest: options?.fetchOptions?.onRequest,
            onResponse: options?.fetchOptions?.onResponse
        }
    };
    const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
    const $fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFetch"])({
        baseURL,
        ...isCredentialsSupported ? {
            credentials: "include"
        } : {},
        method: "GET",
        jsonParser (text) {
            if (!text) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$parser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseJSON"])(text, {
                strict: false
            });
        },
        customFetchImpl: fetch,
        ...restOfFetchOptions,
        plugins: [
            lifeCyclePlugin,
            ...restOfFetchOptions.plugins || [],
            ...options?.disableDefaultFetchPlugins ? [] : [
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$fetch$2d$plugins$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["redirectPlugin"]
            ],
            ...pluginsFetchPlugins
        ]
    });
    const { $sessionSignal, session, broadcastSessionUpdate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$session$2d$atom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSessionAtom"])($fetch, options);
    const plugins = options?.plugins || [];
    let pluginsActions = {};
    const pluginsAtoms = {
        $sessionSignal,
        session
    };
    const pluginPathMethods = {
        "/sign-out": "POST",
        "/revoke-sessions": "POST",
        "/revoke-other-sessions": "POST",
        "/delete-user": "POST"
    };
    const atomListeners = [
        {
            signal: "$sessionSignal",
            matcher (path) {
                return path === "/sign-out" || path === "/update-user" || path === "/update-session" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/revoke-other-sessions" || path === "/change-email" || path === "/change-password";
            },
            callback (path) {
                if (path === "/sign-out") broadcastSessionUpdate("signout");
                else if (path === "/update-user" || path === "/update-session") broadcastSessionUpdate("updateUser");
            }
        }
    ];
    for (const plugin of plugins){
        if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
        if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
        if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
    }
    const $store = {
        notify: (signal)=>{
            pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
        },
        listen: (signal, listener)=>{
            pluginsAtoms[signal].subscribe(listener);
        },
        atoms: pluginsAtoms
    };
    for (const plugin of plugins)if (plugin.getActions) pluginsActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defu"])(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
    return {
        get baseURL () {
            return baseURL;
        },
        pluginsActions,
        pluginsAtoms,
        pluginPathMethods,
        atomListeners,
        $fetch,
        $store
    };
};
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/equality.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isJsonEqual",
    ()=>isJsonEqual,
    "withEquality",
    ()=>withEquality
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$lifecycle$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/lifecycle/index.js [app-ssr] (ecmascript)");
;
//#region src/client/equality.ts
function isPlainObject(value) {
    if (typeof value !== "object" || value === null) return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
}
/**
* Deep structural equality for JSON-serializable values.
* Handles: primitives, null, arrays, and plain objects.
* Short-circuits on referential equality at every recursion level.
*/ function isJsonEqual(a, b) {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for(let i = 0; i < a.length; i++)if (!isJsonEqual(a[i], b[i])) return false;
        return true;
    }
    if (isPlainObject(a) && isPlainObject(b)) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (const key of keysA)if (!(key in b) || !isJsonEqual(a[key], b[key])) return false;
        return true;
    }
    return false;
}
/**
* Attach an equality gate to a nanostores atom via `onSet`.
* When `isEqual(currentValue, newValue)` returns true, the `set()` call
* is aborted: no listeners fire, no framework re-renders occur.
*
* Returns the unsubscribe function from `onSet`.
*/ function withEquality(store, isEqual) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$lifecycle$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSet"])(store, ({ newValue, abort })=>{
        if (isEqual(store.value, newValue)) abort();
    });
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/fetch-plugins.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "redirectPlugin",
    ()=>redirectPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$url$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/url.mjs [app-ssr] (ecmascript)");
;
//#region src/client/fetch-plugins.ts
const redirectPlugin = {
    id: "redirect",
    name: "Redirect",
    hooks: {
        onSuccess (context) {
            if (context.data?.url && context.data?.redirect && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$url$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeUrlScheme"])(context.data.url)) {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
            }
        }
    }
};
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/focus-manager.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGlobalFocusManager",
    ()=>getGlobalFocusManager,
    "kFocusManager",
    ()=>kFocusManager
]);
//#region src/client/focus-manager.ts
const kFocusManager = Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
    listeners = /* @__PURE__ */ new Set();
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>{
            this.listeners.delete(listener);
        };
    }
    setFocused(focused) {
        this.listeners.forEach((listener)=>listener(focused));
    }
    setup() {
        if ("TURBOPACK compile-time truthy", 1) return ()=>{};
        //TURBOPACK unreachable
        ;
        const visibilityHandler = undefined;
    }
};
function getGlobalFocusManager() {
    if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
    return globalThis[kFocusManager];
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/online-manager.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGlobalOnlineManager",
    ()=>getGlobalOnlineManager,
    "kOnlineManager",
    ()=>kOnlineManager
]);
//#region src/client/online-manager.ts
const kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
    listeners = /* @__PURE__ */ new Set();
    isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>{
            this.listeners.delete(listener);
        };
    }
    setOnline(online) {
        this.isOnline = online;
        this.listeners.forEach((listener)=>listener(online));
    }
    setup() {
        if ("TURBOPACK compile-time truthy", 1) return ()=>{};
        //TURBOPACK unreachable
        ;
        const onOnline = undefined;
        const onOffline = undefined;
    }
};
function getGlobalOnlineManager() {
    if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
    return globalThis[kOnlineManager];
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/parser.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseJSON",
    ()=>parseJSON
]);
//#region src/client/parser.ts
const PROTO_POLLUTION_PATTERNS = {
    proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    protoShort: /"__proto__"\s*:/,
    constructorShort: /"constructor"\s*:/
};
const JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
const SPECIAL_VALUES = {
    true: true,
    false: false,
    null: null,
    undefined: void 0,
    nan: NaN,
    infinity: Number.POSITIVE_INFINITY,
    "-infinity": Number.NEGATIVE_INFINITY
};
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
    const match = ISO_DATE_REGEX.exec(value);
    if (!match) return null;
    const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
    const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
    if (offsetSign) {
        const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
        date.setUTCMinutes(date.getUTCMinutes() + offset);
    }
    return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
    const { strict = false, warnings = false, reviver, parseDates = true } = options;
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    const lowerValue = trimmed.toLowerCase();
    if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
    if (!JSON_SIGNATURE.test(trimmed)) {
        if (strict) throw new SyntaxError("[better-json] Invalid JSON");
        return value;
    }
    if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern])=>{
        const matches = pattern.test(trimmed);
        if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
        return matches;
    }) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
    try {
        const secureReviver = (key, value)=>{
            if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
                if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
                return;
            }
            if (parseDates && typeof value === "string") {
                const date = parseISODate(value);
                if (date) return date;
            }
            return reviver ? reviver(key, value) : value;
        };
        return JSON.parse(trimmed, secureReviver);
    } catch (error) {
        if (strict) throw error;
        return value;
    }
}
function parseJSON(value, options = {
    strict: true
}) {
    return betterJSONParse(value, options);
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/proxy.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDynamicPathProxy",
    ()=>createDynamicPathProxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$utils$2f$is$2d$atom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/utils/is-atom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/string.mjs [app-ssr] (ecmascript)");
;
;
//#region src/client/proxy.ts
function getMethod(path, knownPathMethods, args) {
    const method = knownPathMethods[path];
    const { fetchOptions, query: _query, ...body } = args || {};
    if (method) return method;
    if (fetchOptions?.method) return fetchOptions.method;
    if (body && Object.keys(body).length > 0) return "POST";
    return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
    function createProxy(path = []) {
        return new Proxy(function() {}, {
            get (_, prop) {
                if (typeof prop !== "string") return;
                if (prop === "then" || prop === "catch" || prop === "finally") return;
                const fullPath = [
                    ...path,
                    prop
                ];
                let current = routes;
                for (const segment of fullPath)if (current && typeof current === "object" && segment in current) current = current[segment];
                else {
                    current = void 0;
                    break;
                }
                if (typeof current === "function") return current;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$utils$2f$is$2d$atom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAtom"])(current)) return current;
                return createProxy(fullPath);
            },
            apply: async (_, __, args)=>{
                const routePath = "/" + path.map(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toKebabCase"]).join("/");
                const arg = args[0] || {};
                const fetchOptions = args[1] || {};
                const { query, fetchOptions: argFetchOptions, ...body } = arg;
                const options = {
                    ...fetchOptions,
                    ...argFetchOptions
                };
                const method = getMethod(routePath, knownPathMethods, arg);
                return await client(routePath, {
                    ...options,
                    body: method === "GET" ? void 0 : {
                        ...body,
                        ...options?.body || {}
                    },
                    query: query || options?.query,
                    method,
                    async onSuccess (context) {
                        await options?.onSuccess?.(context);
                        if (!atomListeners || options.disableSignal) return;
                        /**
						* We trigger listeners
						*/ const matches = atomListeners.filter((s)=>s.matcher(routePath));
                        if (!matches.length) return;
                        const visited = /* @__PURE__ */ new Set();
                        for (const match of matches){
                            const signal = atoms[match.signal];
                            if (!signal) return;
                            if (visited.has(match.signal)) continue;
                            visited.add(match.signal);
                            /**
							* To avoid race conditions we set the signal in a setTimeout
							*/ const val = signal.get();
                            setTimeout(()=>{
                                signal.set(!val);
                            }, 10);
                            match.callback?.(routePath);
                        }
                    }
                });
            }
        });
    }
    return createProxy();
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/react/index.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAuthClient",
    ()=>createAuthClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$config$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/config.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$react$2d$store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/react/react-store.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/string.mjs [app-ssr] (ecmascript)");
;
;
;
;
//#region src/client/react/index.ts
function getAtomKey(str) {
    return `use${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$string$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capitalizeFirstLetter"])(str)}`;
}
function createAuthClient(options) {
    const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$config$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientConfig"])(options);
    const resolvedHooks = {};
    for (const [key, value] of Object.entries(pluginsAtoms))resolvedHooks[getAtomKey(key)] = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$react$2d$store$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(value);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDynamicPathProxy"])({
        ...pluginsActions,
        ...resolvedHooks,
        $fetch,
        $store
    }, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/react/react-store.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$listen$2d$keys$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/listen-keys/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
//#region src/client/react/react-store.ts
/**
* Subscribe to store changes and get store's value.
*
* Can be used with store builder too.
*
* ```js
* import { useStore } from 'nanostores/react'
*
* import { router } from '../store/router'
*
* export const Layout = () => {
*   let page = useStore(router)
*   if (page.route === 'home') {
*     return <HomePage />
*   } else {
*     return <Error404 />
*   }
* }
* ```
*
* @param store Store instance.
* @returns Store value.
*/ function useStore(store, options = {}) {
    const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(store.get());
    const { keys, deps = [
        store,
        keys
    ] } = options;
    const subscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((onChange)=>{
        const emitChange = (value)=>{
            if (snapshotRef.current === value) return;
            snapshotRef.current = value;
            onChange();
        };
        emitChange(store.value);
        if (keys?.length) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$listen$2d$keys$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listenKeys"])(store, keys, emitChange);
        return store.listen(emitChange);
    }, deps);
    const get = ()=>snapshotRef.current;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, get, get);
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/session-atom.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSessionAtom",
    ()=>getSessionAtom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$equality$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/equality.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$session$2d$refresh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/session-refresh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$lifecycle$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/lifecycle/index.js [app-ssr] (ecmascript)");
;
;
;
//#region src/client/session-atom.ts
const isServer = ()=>("TURBOPACK compile-time value", "undefined") === "undefined";
/**
* Normalize $fetch response: `throw: true` returns data directly,
* otherwise `{ data, error }`.
*/ function normalizeSessionResponse(res) {
    if (typeof res === "object" && res !== null && "data" in res && "error" in res) return res;
    return {
        data: res,
        error: null
    };
}
function normalizeSessionData(data) {
    if (!data) return null;
    if (data.session === null && data.user === null) return null;
    return data;
}
function isSessionAtomEqual(a, b) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$equality$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isJsonEqual"])(a.data, b.data) && a.error === b.error && a.isPending === b.isPending && a.isRefetching === b.isRefetching && a.refetch === b.refetch;
}
function getSessionAtom($fetch, options) {
    const $signal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(false);
    let abortController;
    const refetch = (queryParams)=>fetchSession(queryParams);
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])({
        data: null,
        error: null,
        isPending: true,
        isRefetching: false,
        refetch
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$equality$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withEquality"])(session, isSessionAtomEqual);
    const settleAbortedFetch = (controller)=>{
        if (abortController !== controller) return;
        const current = session.get();
        abortController = void 0;
        if (!current.isPending && !current.isRefetching) return;
        session.set({
            ...current,
            isPending: false,
            isRefetching: false,
            refetch
        });
    };
    const fetchSession = async (queryParams)=>{
        abortController?.abort();
        const controller = new AbortController();
        abortController = controller;
        const current = session.get();
        session.set({
            ...current,
            isPending: current.data === null,
            isRefetching: true,
            error: null,
            refetch
        });
        try {
            const res = await $fetch("/get-session", {
                method: "GET",
                query: queryParams?.query,
                signal: controller.signal
            });
            if (controller.signal.aborted) {
                settleAbortedFetch(controller);
                return;
            }
            let { data, error } = normalizeSessionResponse(res);
            if (data?.needsRefresh) try {
                const refreshRes = await $fetch("/get-session", {
                    method: "POST",
                    signal: controller.signal
                });
                if (controller.signal.aborted) {
                    settleAbortedFetch(controller);
                    return;
                }
                ({ data, error } = normalizeSessionResponse(refreshRes));
            } catch  {
                if (controller.signal.aborted) {
                    settleAbortedFetch(controller);
                    return;
                }
            }
            if (error) {
                const latest = session.get();
                const isUnauthorized = error?.status === 401;
                session.set({
                    data: isUnauthorized ? null : latest.data,
                    error,
                    isPending: false,
                    isRefetching: false,
                    refetch
                });
                return;
            }
            const sessionData = normalizeSessionData(data);
            const current = session.get();
            const stableData = current.data != null && sessionData != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$equality$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isJsonEqual"])(current.data, sessionData) ? current.data : sessionData;
            session.set({
                data: stableData,
                error: null,
                isPending: false,
                isRefetching: false,
                refetch
            });
        } catch (fetchError) {
            if (controller.signal.aborted) {
                settleAbortedFetch(controller);
                return;
            }
            const latest = session.get();
            session.set({
                data: latest.data,
                error: fetchError,
                isPending: false,
                isRefetching: false,
                refetch
            });
        }
    };
    let broadcastSessionUpdate = ()=>{};
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$lifecycle$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onMount"])(session, ()=>{
        let timeoutId;
        if (!isServer()) //TURBOPACK unreachable
        ;
        const refreshManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$session$2d$refresh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSessionRefreshManager"])({
            fetchSession,
            shouldPollSession: ()=>session.get().data != null,
            sessionSignal: $signal,
            options
        });
        refreshManager.init();
        broadcastSessionUpdate = refreshManager.broadcastSessionUpdate;
        return ()=>{
            if (timeoutId) clearTimeout(timeoutId);
            const controller = abortController;
            controller?.abort();
            if (controller) settleAbortedFetch(controller);
            refreshManager.cleanup();
        };
    });
    return {
        session,
        $sessionSignal: $signal,
        broadcastSessionUpdate: (trigger)=>broadcastSessionUpdate(trigger)
    };
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/client/session-refresh.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSessionRefreshManager",
    ()=>createSessionRefreshManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$broadcast$2d$channel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/broadcast-channel.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$focus$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/focus-manager.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$online$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/client/online-manager.mjs [app-ssr] (ecmascript)");
;
;
;
//#region src/client/session-refresh.ts
const now = ()=>Math.floor(Date.now() / 1e3);
/**
* Rate limit: don't refetch on focus if a session request was made within this many seconds
*/ const FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
    const { fetchSession, shouldPollSession = ()=>true, sessionSignal, options = {} } = opts;
    const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
    const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
    const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
    const state = {
        isInitialized: false,
        lastSessionRequest: 0
    };
    const shouldRefetch = ()=>{
        return refetchWhenOffline || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$online$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalOnlineManager"])().isOnline;
    };
    const triggerRefetch = (event)=>{
        if (!shouldRefetch()) return;
        if (event?.event === "storage") {
            fetchSession();
            return;
        }
        if (event?.event === "poll") {
            state.lastSessionRequest = now();
            fetchSession();
            return;
        }
        if (event?.event === "visibilitychange") {
            if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
            state.lastSessionRequest = now();
            fetchSession();
            return;
        }
        fetchSession();
    };
    const broadcastSessionUpdate = (trigger)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$broadcast$2d$channel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalBroadcastChannel"])().post({
            event: "session",
            data: {
                trigger
            },
            clientId: Math.random().toString(36).substring(7)
        });
    };
    const setupPolling = ()=>{
        if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(()=>{
            if (shouldPollSession()) triggerRefetch({
                event: "poll"
            });
        }, refetchInterval * 1e3);
    };
    const setupBroadcast = ()=>{
        state.unsubscribeBroadcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$broadcast$2d$channel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalBroadcastChannel"])().subscribe(()=>{
            triggerRefetch({
                event: "storage"
            });
        });
    };
    const setupFocusRefetch = ()=>{
        if (!refetchOnWindowFocus) return;
        state.unsubscribeFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$focus$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalFocusManager"])().subscribe(()=>{
            triggerRefetch({
                event: "visibilitychange"
            });
        });
    };
    const setupOnlineRefetch = ()=>{
        state.unsubscribeOnline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$online$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalOnlineManager"])().subscribe((online)=>{
            if (online) triggerRefetch({
                event: "visibilitychange"
            });
        });
    };
    const setupSignalSubscription = ()=>{
        state.unsubscribeSignal = sessionSignal.listen(()=>{
            fetchSession();
        });
    };
    const init = ()=>{
        if (state.isInitialized) return;
        state.isInitialized = true;
        setupPolling();
        setupBroadcast();
        setupFocusRefetch();
        setupOnlineRefetch();
        setupSignalSubscription();
        state.cleanupBroadcastSetup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$broadcast$2d$channel$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalBroadcastChannel"])().setup();
        state.cleanupFocusSetup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$focus$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalFocusManager"])().setup();
        state.cleanupOnlineSetup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$online$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGlobalOnlineManager"])().setup();
    };
    const cleanup = ()=>{
        if (!state.isInitialized) return;
        if (state.pollInterval) {
            clearInterval(state.pollInterval);
            state.pollInterval = void 0;
        }
        if (state.unsubscribeBroadcast) {
            state.unsubscribeBroadcast();
            state.unsubscribeBroadcast = void 0;
        }
        if (state.unsubscribeFocus) {
            state.unsubscribeFocus();
            state.unsubscribeFocus = void 0;
        }
        if (state.unsubscribeOnline) {
            state.unsubscribeOnline();
            state.unsubscribeOnline = void 0;
        }
        if (state.unsubscribeSignal) {
            state.unsubscribeSignal();
            state.unsubscribeSignal = void 0;
        }
        if (state.cleanupBroadcastSetup) {
            state.cleanupBroadcastSetup();
            state.cleanupBroadcastSetup = void 0;
        }
        if (state.cleanupFocusSetup) {
            state.cleanupFocusSetup();
            state.cleanupFocusSetup = void 0;
        }
        if (state.cleanupOnlineSetup) {
            state.cleanupOnlineSetup();
            state.cleanupOnlineSetup = void 0;
        }
        state.isInitialized = false;
        state.lastSessionRequest = 0;
    };
    return {
        init,
        cleanup,
        triggerRefetch,
        broadcastSessionUpdate
    };
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/package.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
//#region package.json
var version = "1.6.26";
;
}),
"[project]/apps/web/node_modules/better-auth/dist/plugins/username/client.mjs [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usernameClient",
    ()=>usernameClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$version$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/version.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$plugins$2f$username$2f$error$2d$codes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/plugins/username/error-codes.mjs [app-ssr] (ecmascript)");
;
;
//#region src/plugins/username/client.ts
const usernameClient = ()=>{
    return {
        id: "username",
        version: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$version$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PACKAGE_VERSION"],
        $InferServerPlugin: {},
        atomListeners: [
            {
                matcher: (path)=>path === "/sign-in/username",
                signal: "$sessionSignal"
            }
        ],
        $ERROR_CODES: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$plugins$2f$username$2f$error$2d$codes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["USERNAME_ERROR_CODES"]
    };
};
;
}),
"[project]/apps/web/node_modules/better-auth/dist/plugins/username/error-codes.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "USERNAME_ERROR_CODES",
    ()=>USERNAME_ERROR_CODES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$error$2d$codes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/utils/error-codes.mjs [app-ssr] (ecmascript)");
;
//#region src/plugins/username/error-codes.ts
const USERNAME_ERROR_CODES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$utils$2f$error$2d$codes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineErrorCodes"])({
    INVALID_USERNAME_OR_PASSWORD: "Invalid username or password",
    EMAIL_NOT_VERIFIED: "Email not verified",
    UNEXPECTED_ERROR: "Unexpected error",
    USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.",
    USERNAME_TOO_SHORT: "Username is too short",
    USERNAME_TOO_LONG: "Username is too long",
    INVALID_USERNAME: "Username is invalid",
    INVALID_DISPLAY_USERNAME: "Display username is invalid"
});
;
}),
"[project]/apps/web/node_modules/better-auth/dist/utils/is-atom.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAtom",
    ()=>isAtom
]);
//#region src/utils/is-atom.ts
function isAtom(value) {
    return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/utils/url.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBaseURL",
    ()=>getBaseURL,
    "getHost",
    ()=>getHost,
    "getHostFromSource",
    ()=>getHostFromSource,
    "getOrigin",
    ()=>getOrigin,
    "getProtocol",
    ()=>getProtocol,
    "getProtocolFromSource",
    ()=>getProtocolFromSource,
    "isDynamicBaseURLConfig",
    ()=>isDynamicBaseURLConfig,
    "isRequestLike",
    ()=>isRequestLike,
    "matchesHostPattern",
    ()=>matchesHostPattern,
    "resolveBaseURL",
    ()=>resolveBaseURL,
    "resolveDynamicBaseURL",
    ()=>resolveDynamicBaseURL,
    "trimTrailingSlashes",
    ()=>trimTrailingSlashes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$utils$2f$wildcard$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/utils/wildcard.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/env/env-impl.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@better-auth/core/dist/error/index.mjs [app-ssr] (ecmascript) <locals>");
;
;
;
//#region src/utils/url.ts
const SLASH_CHAR_CODE = "/".charCodeAt(0);
/**
* Minimal loopback check for dev scheme inference only. Reachable from
* `client/config.ts` via `getBaseURL`, so we MUST NOT import the full
* `@better-auth/core/utils/host` classifier here: its `utils/ip` dependency
* on zod would leak into the client bundle (see `e2e/smoke/test/vite.spec.ts`).
*
* Server-side SSRF/loopback checks (oauth redirect matching, trusted-origin
* resolution, electron fetch gate) continue to use the authoritative
* `isLoopbackHost` from `@better-auth/core/utils/host`. This helper's only
* job is picking `http` vs `https` for dev ergonomics.
*/ function isLoopbackForDevScheme(host) {
    const hostname = host.replace(/:\d+$/, "").replace(/^\[|\]$/g, "").toLowerCase();
    return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "::1" || hostname.startsWith("127.");
}
function trimTrailingSlashes(value) {
    let end = value.length;
    while(end > 0 && value.charCodeAt(end - 1) === SLASH_CHAR_CODE)end--;
    return end === value.length ? value : value.slice(0, end);
}
function checkHasPath(url) {
    try {
        return (trimTrailingSlashes(new URL(url).pathname) || "/") !== "/";
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Invalid base URL: ${url}. Please provide a valid base URL.`);
    }
}
function assertHasProtocol(url) {
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]) throw error;
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Invalid base URL: ${url}. Please provide a valid base URL.`, {
            cause: error
        });
    }
}
function withPath(url, path = "/api/auth") {
    assertHasProtocol(url);
    if (checkHasPath(url)) return url;
    const trimmedUrl = trimTrailingSlashes(url);
    if (!path || path === "/") return trimmedUrl;
    path = path.startsWith("/") ? path : `/${path}`;
    return `${trimmedUrl}${path}`;
}
function validateProxyHeader(header, type) {
    if (!header || header.trim() === "") return false;
    if (type === "proto") return header === "http" || header === "https";
    if (type === "host") {
        if ([
            /\.\./,
            /\0/,
            /[\s]/,
            /^[.]/,
            /[<>'"]/,
            /javascript:/i,
            /file:/i,
            /data:/i
        ].some((pattern)=>pattern.test(header))) return false;
        return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(header) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(header) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(header) || /^localhost(:[0-9]{1,5})?$/i.test(header);
    }
    return false;
}
function getBaseURL(url, path, request, loadEnv, trustedProxyHeaders) {
    if (url) return withPath(url, path);
    if (loadEnv !== false) {
        const fromEnv = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].NUXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].NUXT_PUBLIC_AUTH_URL || (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].BASE_URL !== "/" ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$env$2f$env$2d$impl$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].BASE_URL : void 0);
        if (fromEnv) return withPath(fromEnv, path);
    }
    const fromRequest = request?.headers.get("x-forwarded-host");
    const fromRequestProto = request?.headers.get("x-forwarded-proto");
    if (fromRequest && fromRequestProto && trustedProxyHeaders) {
        if (validateProxyHeader(fromRequestProto, "proto") && validateProxyHeader(fromRequest, "host")) try {
            return withPath(`${fromRequestProto}://${fromRequest}`, path);
        } catch (_error) {}
    }
    if (request) {
        const url = getOrigin(request.url);
        if (!url) throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("Could not get origin from request. Please provide a valid base URL.");
        return withPath(url, path);
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function getOrigin(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.origin === "null" ? null : parsedUrl.origin;
    } catch  {
        return null;
    }
}
function getProtocol(url) {
    try {
        return new URL(url).protocol;
    } catch  {
        return null;
    }
}
function getHost(url) {
    try {
        return new URL(url).host;
    } catch  {
        return null;
    }
}
/**
* Checks if the baseURL config is a dynamic config object
*/ function isDynamicBaseURLConfig(config) {
    return typeof config === "object" && config !== null && "allowedHosts" in config && Array.isArray(config.allowedHosts);
}
/**
* Check if a value is a `Request`
* - `instanceof`: works for native Request instances
* - `toString`: handles where instanceof check fails but the object is still a
*   valid Request (e.g. cross-realm, polyfills). Paired with a shape check so
*   an object that only spoofs `Symbol.toStringTag` without the real shape is
*   rejected before downstream code tries to read `.headers` / `.url`.
*
* @param value The value to check
* @returns `true` if the value is a Request instance
*/ function isRequestLike(value) {
    if (value instanceof Request) return true;
    if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Request]") return false;
    const v = value;
    return typeof v.url === "string" && typeof v.headers === "object" && v.headers !== null && typeof v.headers.get === "function";
}
/**
* Extracts the host from a `Request` or `Headers`.
* Honors `x-forwarded-host` only when `trustedProxyHeaders` is enabled,
* then falls back to the `host` header and finally the request URL.
*/ function getHostFromSource(source, trustedProxyHeaders) {
    const headers = isRequestLike(source) ? source.headers : source;
    if (trustedProxyHeaders) {
        const forwardedHost = headers.get("x-forwarded-host");
        if (forwardedHost && validateProxyHeader(forwardedHost, "host")) return forwardedHost;
    }
    const host = headers.get("host");
    if (host && validateProxyHeader(host, "host")) return host;
    if (isRequestLike(source)) try {
        return new URL(source.url).host;
    } catch  {
        return null;
    }
    return null;
}
/**
* Extracts the protocol from a `Request` or `Headers`.
* Honors `x-forwarded-proto` only when `trustedProxyHeaders` is enabled,
* then falls back to the request URL, then to "https".
*/ function getProtocolFromSource(source, configProtocol, trustedProxyHeaders) {
    if (configProtocol === "http" || configProtocol === "https") return configProtocol;
    const headers = isRequestLike(source) ? source.headers : source;
    if (trustedProxyHeaders) {
        const forwardedProto = headers.get("x-forwarded-proto");
        if (forwardedProto && validateProxyHeader(forwardedProto, "proto")) return forwardedProto;
    }
    if (isRequestLike(source)) try {
        const url = new URL(source.url);
        if (url.protocol === "http:" || url.protocol === "https:") return url.protocol.slice(0, -1);
    } catch  {}
    const host = getHostFromSource(source, trustedProxyHeaders);
    if (host && isLoopbackForDevScheme(host)) return "http";
    return "https";
}
/**
* Matches a hostname against a host pattern.
* Supports wildcard patterns like `*.vercel.app` or `preview-*.myapp.com`.
*
* @param host The hostname to test (e.g., "myapp.com", "preview-123.vercel.app")
* @param pattern The host pattern (e.g., "myapp.com", "*.vercel.app")
* @returns {boolean} true if the host matches the pattern, false otherwise.
*
* @example
* ```ts
* matchesHostPattern("myapp.com", "myapp.com") // true
* matchesHostPattern("preview-123.vercel.app", "*.vercel.app") // true
* matchesHostPattern("preview-123.myapp.com", "preview-*.myapp.com") // true
* matchesHostPattern("evil.com", "myapp.com") // false
* ```
*/ const matchesHostPattern = (host, pattern)=>{
    if (!host || !pattern) return false;
    const normalizedHost = host.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
    const normalizedPattern = pattern.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
    if (normalizedPattern.includes("*") || normalizedPattern.includes("?")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$utils$2f$wildcard$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wildcardMatch"])(normalizedPattern)(normalizedHost);
    return normalizedHost.toLowerCase() === normalizedPattern.toLowerCase();
};
/**
* Resolves the base URL from a dynamic config based on the incoming request.
* Validates the derived host against the allowedHosts allowlist.
*
* @param config The dynamic base URL config
* @param request The incoming request
* @param basePath The base path to append
* @returns The resolved base URL with path
* @throws BetterAuthError if host is not in allowedHosts and no fallback is set
*/ function resolveDynamicBaseURL(config, source, basePath, trustedProxyHeaders) {
    const host = getHostFromSource(source, trustedProxyHeaders);
    if (!host) {
        if (config.fallback) return withPath(config.fallback, basePath);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"]("Could not determine host from request headers. Please provide a fallback URL in your baseURL config.");
    }
    if (config.allowedHosts.some((pattern)=>matchesHostPattern(host, pattern))) return withPath(`${getProtocolFromSource(source, config.protocol, trustedProxyHeaders)}://${host}`, basePath);
    if (config.fallback) return withPath(config.fallback, basePath);
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$better$2d$auth$2f$core$2f$dist$2f$error$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BetterAuthError"](`Host "${host}" is not in the allowed hosts list. Allowed hosts: ${config.allowedHosts.join(", ")}. Add this host to your allowedHosts config or provide a fallback URL.`);
}
/**
* Resolves the base URL from any config type (static string or dynamic object).
* This is the main entry point for base URL resolution.
*
* @param config The base URL config (string or object)
* @param basePath The base path to append
* @param request Optional request for dynamic resolution
* @param loadEnv Whether to load from environment variables
* @param trustedProxyHeaders Whether to trust proxy headers (for legacy behavior)
* @returns The resolved base URL with path
*/ function resolveBaseURL(config, basePath, source, loadEnv, trustedProxyHeaders) {
    if (isDynamicBaseURLConfig(config)) {
        if (source) return resolveDynamicBaseURL(config, source, basePath, trustedProxyHeaders);
        if (config.fallback) return withPath(config.fallback, basePath);
        return getBaseURL(void 0, basePath, void 0, loadEnv, trustedProxyHeaders);
    }
    const request = isRequestLike(source) ? source : void 0;
    if (typeof config === "string") return getBaseURL(config, basePath, request, loadEnv, trustedProxyHeaders);
    return getBaseURL(void 0, basePath, request, loadEnv, trustedProxyHeaders);
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/utils/wildcard.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wildcardMatch",
    ()=>wildcardMatch
]);
//#region src/utils/wildcard.ts
/**
* Escapes a character if it has a special meaning in regular expressions
* and returns the character as is if it doesn't
*/ function escapeRegExpChar(char) {
    if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") return `\\${char}`;
    else return char;
}
/**
* Escapes all characters in a given string that have a special meaning in regular expressions
*/ function escapeRegExpString(str) {
    let result = "";
    for(let i = 0; i < str.length; i++)result += escapeRegExpChar(str[i]);
    return result;
}
/**
* Transforms one or more glob patterns into a RegExp pattern
*/ function transform(pattern, separator = true) {
    if (Array.isArray(pattern)) return `(?:${pattern.map((p)=>`^${transform(p, separator)}$`).join("|")})`;
    let separatorSplitter = "";
    let separatorMatcher = "";
    let wildcard = ".";
    if (separator === true) {
        separatorSplitter = "/";
        separatorMatcher = "[/\\\\]";
        wildcard = "[^/\\\\]";
    } else if (separator) {
        separatorSplitter = separator;
        separatorMatcher = escapeRegExpString(separatorSplitter);
        if (separatorMatcher.length > 1) {
            separatorMatcher = `(?:${separatorMatcher})`;
            wildcard = `((?!${separatorMatcher}).)`;
        } else wildcard = `[^${separatorMatcher}]`;
    }
    const requiredSeparator = separator ? `${separatorMatcher}+?` : "";
    const optionalSeparator = separator ? `${separatorMatcher}*?` : "";
    const segments = separator ? pattern.split(separatorSplitter) : [
        pattern
    ];
    let result = "";
    for(let s = 0; s < segments.length; s++){
        const segment = segments[s];
        const nextSegment = segments[s + 1];
        let currentSeparator = "";
        if (!segment && s > 0) continue;
        if (separator) if (s === segments.length - 1) currentSeparator = optionalSeparator;
        else if (nextSegment !== "**") currentSeparator = requiredSeparator;
        else currentSeparator = "";
        if (separator && segment === "**") {
            if (currentSeparator) {
                result += s === 0 ? "" : currentSeparator;
                result += `(?:${wildcard}*?${currentSeparator})*?`;
            }
            continue;
        }
        for(let c = 0; c < segment.length; c++){
            const char = segment[c];
            if (char === "\\") {
                if (c < segment.length - 1) {
                    result += escapeRegExpChar(segment[c + 1]);
                    c++;
                }
            } else if (char === "?") result += wildcard;
            else if (char === "*") result += `${wildcard}*?`;
            else result += escapeRegExpChar(char);
        }
        result += currentSeparator;
    }
    return result;
}
function isMatch(regexp, sample) {
    if (typeof sample !== "string") throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
    return regexp.test(sample);
}
/**
* Compiles one or more glob patterns into a RegExp and returns an isMatch function.
* The isMatch function takes a sample string as its only argument and returns `true`
* if the string matches the pattern(s).
*
* ```js
* wildcardMatch('src/*.js')('src/index.js') //=> true
* ```
*
* ```js
* const isMatch = wildcardMatch('*.example.com', '.')
* isMatch('foo.example.com') //=> true
* isMatch('foo.bar.com') //=> false
* ```
*/ function wildcardMatch(pattern, options) {
    if (typeof pattern !== "string" && !Array.isArray(pattern)) throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
    if (typeof options === "string" || typeof options === "boolean") options = {
        separator: options
    };
    if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
    options = options || {};
    if (options.separator === "\\") throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
    const regexpPattern = transform(pattern, options.separator);
    const regexp = new RegExp(`^${regexpPattern}$`, options.flags);
    const fn = isMatch.bind(null, regexp);
    fn.options = options;
    fn.pattern = pattern;
    fn.regexp = regexp;
    return fn;
}
;
}),
"[project]/apps/web/node_modules/better-auth/dist/version.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PACKAGE_VERSION",
    ()=>PACKAGE_VERSION
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$package$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/better-auth/dist/package.mjs [app-ssr] (ecmascript)");
;
//#region src/version.ts
const PACKAGE_VERSION = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$better$2d$auth$2f$dist$2f$package$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"];
;
}),
"[project]/apps/web/node_modules/better-call/dist/error.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "atom",
    ()=>atom,
    "batch",
    ()=>batch,
    "nanostoresGlobal",
    ()=>nanostoresGlobal,
    "readonlyType",
    ()=>readonlyType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/clean-stores/index.js [app-ssr] (ecmascript)");
;
let listenerQueue = [];
let lqIndex = 0;
let batchSeen = null;
const QUEUE_ITEMS_PER_LISTENER = 4;
const nanostoresGlobal = globalThis.nanostoresGlobal ||= {
    epoch: 0
};
let drainQueue = ()=>{
    for(lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER){
        listenerQueue[lqIndex](listenerQueue[lqIndex + 1].value, listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
    }
    listenerQueue.length = 0;
};
const batch = (fn)=>{
    let outer = !batchSeen;
    if (outer) batchSeen = new Set();
    try {
        fn();
    } finally{
        if (outer) {
            try {
                if (listenerQueue.length) drainQueue();
            } finally{
                batchSeen = null;
            }
        }
    }
};
const atom = (initialValue)=>{
    let listeners = [];
    let $atom = {
        get () {
            if (!$atom.lc) {
                $atom.listen(()=>{})();
            }
            return $atom.value;
        },
        init: initialValue,
        lc: 0,
        listen (listener) {
            $atom.lc = listeners.push(listener);
            return ()=>{
                for(let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;){
                    if (listenerQueue[i] === listener) {
                        listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
                    } else {
                        i += QUEUE_ITEMS_PER_LISTENER;
                    }
                }
                let index = listeners.indexOf(listener);
                if (~index) {
                    listeners.splice(index, 1);
                    if (!--$atom.lc) $atom.off();
                }
            };
        },
        notify (oldValue, changedKey) {
            nanostoresGlobal.epoch++;
            let runListenerQueue = !listenerQueue.length && !batchSeen;
            for (let listener of listeners){
                if (batchSeen?.has(listener)) continue;
                batchSeen?.add(listener);
                listenerQueue.push(listener, $atom, oldValue, batchSeen ? undefined : changedKey);
            }
            if (runListenerQueue) {
                drainQueue();
            }
        },
        /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */ off () {},
        set (newValue) {
            let oldValue = $atom.value;
            if (oldValue !== newValue) {
                $atom.value = newValue;
                $atom.notify(oldValue);
            }
        },
        subscribe (listener) {
            let unbind = $atom.listen(listener);
            listener($atom.value);
            return unbind;
        },
        value: initialValue
    };
    if ("TURBOPACK compile-time truthy", 1) {
        $atom[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"]] = ()=>{
            listeners = [];
            $atom.lc = 0;
            $atom.off();
        };
    }
    return $atom;
};
const readonlyType = (store)=>store;
}),
"[project]/node_modules/nanostores/clean-stores/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clean",
    ()=>clean,
    "cleanStores",
    ()=>cleanStores
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$task$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/task/index.js [app-ssr] (ecmascript)");
;
const clean = Symbol('clean');
const cleanStores = (...stores)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$task$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanTasks"])();
    for (let $store of stores){
        if ($store) {
            if ($store.mocked) delete $store.mocked;
            if ($store[clean]) $store[clean]();
        }
    }
};
}),
"[project]/node_modules/nanostores/lifecycle/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORE_UNMOUNT_DELAY",
    ()=>STORE_UNMOUNT_DELAY,
    "on",
    ()=>on,
    "onMount",
    ()=>onMount,
    "onNotify",
    ()=>onNotify,
    "onSet",
    ()=>onSet,
    "onStart",
    ()=>onStart,
    "onStop",
    ()=>onStop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/clean-stores/index.js [app-ssr] (ecmascript)");
;
const START = 0;
const STOP = 1;
const SET = 2;
const NOTIFY = 3;
const MOUNT = 5;
const UNMOUNT = 6;
const REVERT_MUTATION = 10;
let on = (object, listener, eventKey, mutateStore)=>{
    object.events = object.events || {};
    if (!object.events[eventKey + REVERT_MUTATION]) {
        object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps)=>{
            // eslint-disable-next-line no-sequences
            object.events[eventKey].reduceRight((event, l)=>(l(event), event), {
                shared: {},
                ...eventProps
            });
        });
    }
    object.events[eventKey] = object.events[eventKey] || [];
    object.events[eventKey].push(listener);
    return ()=>{
        let currentListeners = object.events[eventKey];
        let index = currentListeners.indexOf(listener);
        currentListeners.splice(index, 1);
        if (!currentListeners.length) {
            delete object.events[eventKey];
            object.events[eventKey + REVERT_MUTATION]();
            delete object.events[eventKey + REVERT_MUTATION];
        }
    };
};
let onStart = ($store, listener)=>on($store, listener, START, (runListeners)=>{
        let originListen = $store.listen;
        $store.listen = (arg)=>{
            if (!$store.lc && !$store.starting) {
                $store.starting = true;
                runListeners();
                delete $store.starting;
            }
            return originListen(arg);
        };
        return ()=>{
            $store.listen = originListen;
        };
    });
let onStop = ($store, listener)=>on($store, listener, STOP, (runListeners)=>{
        let originOff = $store.off;
        $store.off = ()=>{
            runListeners();
            originOff();
        };
        return ()=>{
            $store.off = originOff;
        };
    });
let onSet = ($store, listener)=>on($store, listener, SET, (runListeners)=>{
        let originSet = $store.set;
        let originSetKey = $store.setKey;
        if ($store.setKey) {
            $store.setKey = (changed, changedValue)=>{
                let isAborted;
                let abort = ()=>{
                    isAborted = true;
                };
                runListeners({
                    abort,
                    changed,
                    newValue: {
                        ...$store.value,
                        [changed]: changedValue
                    }
                });
                if (!isAborted) return originSetKey(changed, changedValue);
            };
        }
        $store.set = (newValue)=>{
            let isAborted;
            let abort = ()=>{
                isAborted = true;
            };
            runListeners({
                abort,
                newValue
            });
            if (!isAborted) return originSet(newValue);
        };
        return ()=>{
            $store.set = originSet;
            $store.setKey = originSetKey;
        };
    });
let onNotify = ($store, listener)=>on($store, listener, NOTIFY, (runListeners)=>{
        let originNotify = $store.notify;
        $store.notify = (oldValue, changed)=>{
            let isAborted;
            let abort = ()=>{
                isAborted = true;
            };
            runListeners({
                abort,
                changed,
                oldValue
            });
            if (!isAborted) return originNotify(oldValue, changed);
        };
        return ()=>{
            $store.notify = originNotify;
        };
    });
const STORE_UNMOUNT_DELAY = 1000;
let onMount = ($store, initialize)=>{
    let listener = (payload)=>{
        let destroy = initialize(payload);
        if (destroy) $store.events[UNMOUNT].push(destroy);
    };
    return on($store, listener, MOUNT, (runListeners)=>{
        let originListen = $store.listen;
        $store.listen = (...args)=>{
            if (!$store.lc && !$store.active) {
                $store.active = true;
                runListeners();
            }
            return originListen(...args);
        };
        let originOff = $store.off;
        $store.events[UNMOUNT] = [];
        $store.off = ()=>{
            originOff();
            setTimeout(()=>{
                if ($store.active && !$store.lc) {
                    $store.active = false;
                    for (let destroy of $store.events[UNMOUNT])destroy();
                    $store.events[UNMOUNT] = [];
                }
            }, STORE_UNMOUNT_DELAY);
        };
        if ("TURBOPACK compile-time truthy", 1) {
            let originClean = $store[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"]];
            $store[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"]] = ()=>{
                for (let destroy of $store.events[UNMOUNT])destroy();
                $store.events[UNMOUNT] = [];
                $store.active = false;
                originClean();
            };
        }
        return ()=>{
            $store.listen = originListen;
            $store.off = originOff;
        };
    });
};
}),
"[project]/node_modules/nanostores/listen-keys/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listenKeys",
    ()=>listenKeys,
    "subscribeKeys",
    ()=>subscribeKeys
]);
function listenKeys($store, keys, listener) {
    let keysSet = new Set(keys);
    return $store.listen((value, oldValue, changed)=>{
        if (changed === undefined ? keys.some((key)=>value[key] !== oldValue[key]) : keysSet.has(changed) || keysSet.has(changed.split(/\.|\[/)[0])) {
            listener(value, oldValue, changed);
        }
    });
}
function subscribeKeys($store, keys, listener) {
    let unbind = listenKeys($store, keys, listener);
    listener($store.value);
    return unbind;
}
}),
"[project]/node_modules/nanostores/task/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allTasks",
    ()=>allTasks,
    "cleanTasks",
    ()=>cleanTasks,
    "startTask",
    ()=>startTask,
    "task",
    ()=>task
]);
let tasks = 0;
let resolves = [];
function startTask() {
    tasks += 1;
    return ()=>{
        tasks -= 1;
        if (tasks === 0) {
            let prevResolves = resolves;
            resolves = [];
            for (let i of prevResolves)i();
        }
    };
}
function task(cb) {
    let endTask = startTask();
    let promise;
    try {
        promise = Promise.resolve(cb()).finally(endTask);
    } catch (error) {
        endTask();
        throw error;
    }
    promise.t = true;
    return promise;
}
function allTasks() {
    if (tasks === 0) {
        return Promise.resolve();
    } else {
        return new Promise((resolve)=>{
            resolves.push(resolve);
        });
    }
}
function cleanTasks() {
    tasks = 0;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_17254y7._.js.map