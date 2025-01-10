var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, n = new Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "8656ee1a-c16d-47cd-84c2-a438187556af", e._sentryDebugIdIdentifier = "sentry-dbid-8656ee1a-c16d-47cd-84c2-a438187556af");
  } catch (e2) {
  }
}();
(function() {
  "use strict";
  var _global = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  _global.SENTRY_RELEASE = { id: "79c15cbd481be54c222041b6a83787b513e98a67" };
  class Management {
    constructor(context) {
      __publicField(this, "context");
      this.context = context;
    }
    uninstall() {
      var _a;
      const options = {
        showConfirmDialog: true
      };
      return (_a = this.context) == null ? void 0 : _a.management.uninstallSelf(options);
    }
  }
  class Message {
    constructor(namepsace, context) {
      __publicField(this, "context");
      __publicField(this, "namespace");
      this.namespace = namepsace;
      this.context = context;
    }
    async send(message) {
      var _a, _b;
      const data = {
        ...message,
        from: this.namespace
      };
      return await ((_b = (_a = this.context) == null ? void 0 : _a.runtime) == null ? void 0 : _b.sendMessage(data));
    }
    addListener(callback) {
      var _a, _b, _c;
      (_c = (_b = (_a = this.context) == null ? void 0 : _a.runtime) == null ? void 0 : _b.onMessage) == null ? void 0 : _c.addListener(callback);
    }
  }
  const UPDATE_KEY = "updatesViewed";
  const CONSENT_KEY = "dataConsentAgreed";
  class Storage {
    constructor(context) {
      __publicField(this, "context");
      this.context = context;
    }
    async set(items) {
      var _a;
      for (const key in items) {
        items[key] = JSON.stringify(items[key]);
      }
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        await this.context.storage.local.set(items);
        return;
      }
      for (const key in items) {
        localStorage.setItem(key, items[key]);
      }
    }
    async get(keys) {
      var _a;
      let items = {};
      const includesDefaults = !!(keys && typeof keys !== "string" && !Array.isArray(keys));
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        items = await this.context.storage.local.get(keys);
        for (const key in items) {
          if (typeof items[key] === "string") {
            items[key] = JSON.parse(items[key]);
          }
        }
        return items;
      }
      let iterableKeys = keys;
      if (typeof keys === "string") {
        iterableKeys = [keys];
      } else if (keys && !Array.isArray(keys)) {
        iterableKeys = Object.keys(keys);
      }
      if (!iterableKeys) {
        items = { ...localStorage };
      } else {
        iterableKeys.forEach((key) => {
          items[key] = localStorage.getItem(key);
          if (includesDefaults && !items[key]) {
            items[key] = keys[key];
          }
        });
      }
      for (const key in items) {
        if (typeof items[key] === "string") {
          items[key] = JSON.parse(items[key]);
        }
      }
      return items;
    }
    async remove(keys) {
      var _a;
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        await this.context.storage.local.remove(keys);
        return;
      }
      const iterableKeys = Array.isArray(keys) ? keys : [keys];
      iterableKeys.forEach((key) => localStorage.removeItem(key));
    }
    async clear({ keepDeviceId = false } = {}) {
      var _a;
      const { deviceId } = await this.get("deviceId");
      const updates = await this.get(UPDATE_KEY);
      const dataConsent = await this.get(CONSENT_KEY);
      if ((_a = this.context) == null ? void 0 : _a.storage) {
        await this.context.storage.local.clear();
      } else {
        localStorage.clear();
      }
      if (deviceId && keepDeviceId) {
        await this.set({ deviceId });
      }
      if (updates[UPDATE_KEY]) {
        await this.set(updates);
      }
      if (dataConsent[CONSENT_KEY]) {
        await this.set(dataConsent);
      }
    }
  }
  class ExtensionApi {
    constructor(namespace) {
      __publicField(this, "_context");
      __publicField(this, "storage");
      __publicField(this, "message");
      __publicField(this, "management");
      var _a;
      if (typeof browser !== "undefined") {
        this._context = browser;
      } else if (typeof chrome !== "undefined") {
        this._context = chrome;
      }
      if (this._context) {
        (_a = this._context.runtime) == null ? void 0 : _a.connect();
      }
      this.storage = new Storage(this._context);
      this.message = new Message(namespace, this._context);
      this.management = new Management(this._context);
    }
    get context() {
      return this._context;
    }
    get popup() {
      var _a, _b, _c, _d, _e;
      if ((_b = (_a = this.context) == null ? void 0 : _a.extension) == null ? void 0 : _b.getViews) {
        return !!((_e = (_d = (_c = this.context) == null ? void 0 : _c.extension) == null ? void 0 : _d.getViews({ type: "popup" })) == null ? void 0 : _e.length);
      }
      return false;
    }
    getManifest() {
      if (!this.context) {
        return {};
      }
      return this.context.runtime.getManifest();
    }
    getURL(url) {
      var _a;
      if (!this.context) {
        return "";
      }
      return (_a = this.context.runtime) == null ? void 0 : _a.getURL(url);
    }
    async getBrowserInfo() {
      var _a, _b;
      if ((_b = (_a = this.context) == null ? void 0 : _a.runtime) == null ? void 0 : _b.getBrowserInfo) {
        return this.context.runtime.getBrowserInfo();
      }
      return {
        name: "",
        vendor: "",
        version: "",
        buildID: ""
      };
    }
    addListener(event, callback) {
      if (!this.context) {
        return;
      }
      this.context.runtime[event].addListener(callback);
    }
    addBrowserActionListener(callback) {
      if (!this.context) {
        return;
      }
      this.context.action.onClicked.addListener(callback);
    }
    async getCurrentTab() {
      if (!this.context || !this.context.tabs) {
        return;
      }
      const [tab] = await this.context.tabs.query({
        active: true,
        currentWindow: true
      });
      return tab;
    }
    addTabListener(listener) {
      var _a, _b;
      (_b = (_a = this.context) == null ? void 0 : _a.tabs) == null ? void 0 : _b.onUpdated.addListener(listener);
    }
  }
  const appExtensionApi = new ExtensionApi("app");
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  const native = {
    randomUUID
  };
  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  async function transformFetchResponse(response) {
    const { ok, status, url } = response;
    const headers = Object.fromEntries(response.headers.entries());
    const respObj = {
      data: void 0,
      ok,
      status,
      url,
      headers
    };
    if (response.ok) {
      try {
        respObj.data = await response.json();
      } catch (err) {
      }
    } else {
      try {
        respObj.data = JSON.parse(await response.clone().text());
      } catch (err) {
        respObj.text = await response.text();
      }
    }
    return respObj;
  }
  function transformFetchError(err, url) {
    return {
      data: void 0,
      ok: false,
      url,
      text: err.message
    };
  }
  function removeEmptyParams(params = {}) {
    return Object.fromEntries(
      Object.entries(params || {}).filter(([, value]) => value !== void 0)
    );
  }
  const apiUrl = "https://app.privacy.com";
  class PrivacyApi {
    constructor(version = "1") {
      __publicField(this, "appVersion", "");
      __publicField(this, "apiVersion");
      __publicField(this, "baseURL");
      var _a;
      try {
        this.appVersion = ((_a = appExtensionApi.getManifest()) == null ? void 0 : _a.version) || this.appVersion;
      } catch (err) {
      }
      this.apiVersion = version;
      this.baseURL = `${apiUrl}/api/v${version}/extension`;
    }
    get(url, params, config) {
      return this.request(url, "GET", config, params);
    }
    post(url, data, config) {
      return this.request(url, "POST", config, {}, data);
    }
    patch(url, data, config) {
      return this.request(url, "PATCH", config, {}, data);
    }
    put(url, data, config) {
      return this.request(url, "PUT", config, {}, data);
    }
    delete(url, config) {
      return this.request(url, "DELETE", config, {});
    }
    // Wrap fetch to automatically include request headers
    // and to handle error responses
    async request(url, method, config = {}, params, body) {
      config = JSON.parse(JSON.stringify(config));
      body = JSON.parse(JSON.stringify(body || {}));
      params = removeEmptyParams(params);
      await PrivacyApi.authTokenInterceptor(config);
      await PrivacyApi.setSessionIdInterceptor(config);
      PrivacyApi.setApiHeaders(config);
      url = this.baseURL + url;
      return appExtensionApi.message.send({
        event: "sendApiRequest",
        payload: { url, method, params, body, config }
      }).then(PrivacyApi.responseInterceptor);
    }
    static async responseInterceptor(response) {
      var _a;
      if (response.ok) {
        return response;
      }
      const isLogin = (_a = response.url) == null ? void 0 : _a.endsWith("/auth/login");
      if (!isLogin && response.status === 401) {
        try {
          await appExtensionApi.storage.clear({ keepDeviceId: true });
        } catch (err) {
        } finally {
          window.location.assign(
            appExtensionApi.popup ? "/index.html" : "/interstitial.html"
          );
        }
        return response;
      }
      const errorData = response.data || { message: response.text };
      return Promise.reject(errorData);
    }
    static async authTokenInterceptor(config) {
      try {
        const { token } = await appExtensionApi.storage.get("token");
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
          };
        }
      } catch (err) {
      }
      return config;
    }
    static async setSessionIdInterceptor(config) {
      let sessionID;
      try {
        const { sessionID: session } = await appExtensionApi.storage.get(
          "sessionID"
        );
        sessionID = session;
      } catch (err) {
      }
      if (!sessionID) {
        sessionID = v4();
        try {
          await appExtensionApi.storage.set({ sessionID });
        } catch (err) {
        }
      }
      config.headers = {
        ...config.headers,
        sessionID
      };
      return config;
    }
    static setApiHeaders(config) {
      var _a;
      config.headers = {
        "Content-Type": "application/json",
        "x-extension-id": "djEuMC4x",
        "x-extension-version": ((_a = appExtensionApi.getManifest()) == null ? void 0 : _a.version) || "",
        ...config.headers
      };
      return config;
    }
  }
  const v1Api = new PrivacyApi();
  new PrivacyApi("2");
  const hasDataConsent = async () => {
    const dataConsent = await appExtensionApi.storage.get(CONSENT_KEY) || {};
    return !!dataConsent[CONSENT_KEY];
  };
  const EVENT_ROUTE = "/event";
  const EVENT_ENDPOINTS = {
    track: `${EVENT_ROUTE}/track`,
    log: `${EVENT_ROUTE}/log`,
    error: `${EVENT_ROUTE}/error`
  };
  var EXTENSION_EVENTS = /* @__PURE__ */ ((EXTENSION_EVENTS2) => {
    EXTENSION_EVENTS2["CONSENT_SHOWN"] = "Extension: Consent Shown";
    EXTENSION_EVENTS2["CONSENT_ACCEPTED"] = "Extension: Consent Accepted";
    EXTENSION_EVENTS2["CONSENT_DECLINED"] = "Extension: Consent Declined";
    EXTENSION_EVENTS2["CONSENT_DECLINE_CANCELLED"] = "Extension: Consent Decline Cancelled";
    EXTENSION_EVENTS2["OPENED"] = "Extension: Opened";
    EXTENSION_EVENTS2["DISMISSED"] = "Extension: Dismissed";
    EXTENSION_EVENTS2["SIGN_UP"] = "Extension: Sign Up";
    EXTENSION_EVENTS2["ACCOUNT_REDIRECT"] = "Extension: Account Redirect";
    EXTENSION_EVENTS2["CHECKOUT"] = "Extension: Checkout";
    EXTENSION_EVENTS2["DETECTED_CHECKOUT_FORM"] = "Extension: Detected Checkout Form";
    EXTENSION_EVENTS2["FILL_CHECKOUT"] = "Extension: Fill Checkout";
    EXTENSION_EVENTS2["FILL_CHECKOUT_NO_FORM"] = "Extension: Fill Checkout No Form Detected";
    EXTENSION_EVENTS2["FILL_CHECKOUT_INPUT_FORMAT"] = "Extension: Unable to Determine Input Field Format";
    return EXTENSION_EVENTS2;
  })(EXTENSION_EVENTS || {});
  const extensionApi = new ExtensionApi("background");
  const DEFAULT_TIMEOUT = 25e3;
  function sendRequest({ url, method, params, body, config }) {
    const headers = (config == null ? void 0 : config.headers) || {};
    const controller = new AbortController();
    const reqInit = {
      method,
      headers,
      signal: controller.signal
    };
    if (method === "GET" && params) {
      url += `?${new URLSearchParams(params).toString()}`;
    } else if (method !== "DELETE") {
      reqInit.body = JSON.stringify(body);
    }
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        controller.abort();
        resolve(
          new Response("Request timed out", {
            status: 408,
            statusText: "Request timed out"
          })
        );
      }, DEFAULT_TIMEOUT);
    });
    return Promise.race([fetch(url, reqInit), timeoutPromise]);
  }
  const onDisconnect = () => {
    sendRequest({
      url: v1Api.baseURL + EVENT_ENDPOINTS.track,
      method: "POST",
      body: {
        name: EXTENSION_EVENTS.DISMISSED
      },
      config: PrivacyApi.setApiHeaders({})
    });
  };
  extensionApi.addListener("onInstalled", async () => {
    var _a, _b;
    const agreed = await hasDataConsent();
    const info = await extensionApi.getBrowserInfo();
    if (agreed || info.name !== "Firefox") {
      return;
    }
    const url = extensionApi.getURL("install.html");
    await ((_b = (_a = extensionApi.context) == null ? void 0 : _a.tabs) == null ? void 0 : _b.create({ url }));
  });
  extensionApi.addListener("onConnect", (port) => {
    if (port.name === "popup") {
      port.onDisconnect.addListener(onDisconnect);
    }
  });
  const tabHasContent = (tab) => {
    var _a;
    return (_a = tab.url) == null ? void 0 : _a.startsWith("http");
  };
  extensionApi.addBrowserActionListener(async (tab) => {
    var _a;
    const approve = await ((_a = extensionApi.context) == null ? void 0 : _a.permissions.request({
      origins: ["<all_urls>"]
    }));
    if (!approve) {
      return;
    }
    if (tabHasContent(tab)) {
      sendMessageToActiveTab({ target: "checkout", event: "showInterstitial" });
    }
  });
  extensionApi.addTabListener(
    (tabId, _changeInfo, tab) => {
      var _a;
      const popup = tabHasContent(tab) ? "" : "index.html";
      (_a = extensionApi.context) == null ? void 0 : _a.action.setPopup({ popup, tabId });
    }
  );
  const sendMessageToActiveTab = async (message) => {
    var _a, _b;
    const tab = await extensionApi.getCurrentTab();
    if (!tab) {
      return;
    }
    const response = await ((_b = (_a = extensionApi.context) == null ? void 0 : _a.tabs) == null ? void 0 : _b.sendMessage(
      tab.id,
      message
    ));
    return response;
  };
  const uninstallExtension = async (sendResponse) => {
    try {
      await extensionApi.management.uninstall();
      sendResponse(true);
    } catch (err) {
      sendResponse(false);
    }
  };
  extensionApi.message.addListener((message, sender, sendResponse) => {
    var _a;
    if (message.event === "getCurrentTab") {
      extensionApi.getCurrentTab().then(sendResponse);
    } else if (message.event === "fillCheckoutResult") {
      sendRequest({
        url: v1Api.baseURL + EVENT_ENDPOINTS.track,
        method: "POST",
        body: message.payload,
        config: PrivacyApi.setApiHeaders({})
      }).then(() => sendResponse({ success: true }));
    } else if (message.event === "sendApiRequest") {
      const { url, method, params, body, config } = message.payload;
      sendRequest({ url, method, params, body, config }).then(transformFetchResponse).then(sendResponse).catch((err) => {
        const errResponse = transformFetchError(err, url);
        sendResponse(errResponse);
      });
    } else if (message.event === "uninstallExtension") {
      uninstallExtension(sendResponse);
    } else if (message.event === "addShortLivedAuthCookie") {
      (_a = extensionApi.context) == null ? void 0 : _a.cookies.set(message.payload).then(sendResponse).catch((err) => {
        sendResponse({ error: err });
      });
    } else {
      sendMessageToActiveTab(message).then(sendResponse);
    }
    return true;
  });
})();
//# sourceMappingURL=background.js.map
