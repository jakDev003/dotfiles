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
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "ca17a22f-fbe3-4043-afb1-f22b52431274", e._sentryDebugIdIdentifier = "sentry-dbid-ca17a22f-fbe3-4043-afb1-f22b52431274");
  } catch (e2) {
  }
}();
(function() {
  var _a;
  "use strict";
  var _global = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  _global.SENTRY_RELEASE = { id: "79c15cbd481be54c222041b6a83787b513e98a67" };
  function billingSelector(selector) {
    return `[autocomplete~='billing'][autocomplete~='${selector}']`;
  }
  const notHidden = ":not([type='hidden'],[aria-hidden='true'])";
  const autocompleteSelectors = {
    cvv: `input[autocomplete='cc-csc']${notHidden}`,
    expiry: `input[autocomplete='cc-exp']${notHidden}`,
    expMonth: `[autocomplete='cc-exp-month']${notHidden}`,
    expYear: `[autocomplete='cc-exp-year']${notHidden}`,
    firstName: `input[autocomplete='cc-given-name']${notHidden}`,
    lastName: `input[autocomplete='cc-family-name']${notHidden}`,
    name: `input[autocomplete='cc-name']${notHidden}`,
    pan: `input[autocomplete='cc-number']${notHidden}`,
    type: `[autocomplete='cc-type']${notHidden}`,
    // Address fields
    streetAddress: `input${billingSelector("street-address")}${notHidden}`,
    addressLine1: `input${billingSelector("address-line1")}${notHidden}`,
    addressLine2: `input${billingSelector("address-line2")}${notHidden}`,
    addressLevel2: `input${billingSelector("address-level2")}${notHidden}`,
    // city
    addressLevel1: billingSelector("address-level1") + notHidden,
    // state
    postalCode: `input${billingSelector("postal-code")}${notHidden}`
  };
  const inverseAutocompleteSelectors = {
    cvv: "[autocomplete='cc-csc']",
    expiry: "[autocomplete='cc-exp']",
    expMonth: "[autocomplete='cc-exp-month']",
    expYear: "[autocomplete='cc-exp-year']",
    firstName: "[autocomplete='cc-given-name']",
    lastName: "[autocomplete='cc-family-name']",
    name: "[autocomplete='cc-name']",
    pan: "[autocomplete='cc-number']",
    type: "[autocomplete='cc-type']",
    // Address fields
    streetAddress: billingSelector("street-address"),
    addressLine1: billingSelector("address-line1"),
    addressLine2: billingSelector("address-line2"),
    addressLevel2: billingSelector("address-level2"),
    // city
    addressLevel1: billingSelector("address-level1"),
    // state
    postalCode: billingSelector("postal-code")
  };
  const genericSelectors = [
    "input:not([type],[disabled],[readonly],[aria-hidden='true'])",
    "input:is([type='text'],[type='number'],[type='tel'],[type='password']):not([disabled],[readonly],[aria-hidden='true'])"
  ];
  const matchingRules = {
    cvv: /cvv|cid|csc|cvd|cvn|cvc|ccv|spc|signature.*panel|secure.*id|sec(urity)?.*code|account.*verification|card.*verification|verification.*(code|number)|credit.*card.*code|security.*number|card.*extra.*code|card.*code/i,
    expiry: /((card|cc)((.(?!\s))*)(exp|date))|(exp.*date)|(mm ?\/ ?yy)/i,
    expMonth: /((exp|card|cc).*(mo|mm))|^mm$|^month$/i,
    expYear: /((exp|card|cc).*(yr|yy|year))|^yy$|^year$/i,
    firstName: /(credit|card|cc|pay|billing).*(((given|first|fore).*(holder|name|owner))|fname)/i,
    lastName: /(credit|card|cc|pay|billing).*(((family|last|sur).*(holder|name|owner))|lname)/i,
    name: /(credit|card|cc|pay|billing).*(holder|name|owner)/i,
    pan: /((card|cc|pay).*(num|#))|creditcard|^pan|AuthorizeNet_ccno|^cc$|^cnb$/i,
    type: {
      attrs: /((card|cc|pay).*(type|brand))/i,
      value: /visa|master\s?card/i
    }
  };
  const denyGiftCardRule = /gift.?card|rewards?.?card|redeemable.?card|payGCNum|gc-/i;
  const fieldDenyRules = {
    general: /bank|name|owner|phone|postal|zip/i,
    giftCard: denyGiftCardRule
  };
  const panDenyRules = {
    general: /address|bank|bankaccount|company|cvv|email|name|owner|phone|postal|promo|zip/i,
    giftCard: denyGiftCardRule,
    issueNumber: /issue.?number/i,
    routingNumber: /routing.?number/i
  };
  const nameDenyRule = /cvv|cvc|brand|pan|number|type|exp|month|year|address|shipping|street|account|company|business/i;
  const lastNameDenyRule = /(credit|card|cc|pay|billing).*(fullname)/i;
  const domainRules = /* @__PURE__ */ new Map([
    [
      "bestbuy.com",
      {
        pan: "#number",
        expMonth: "#expMonth",
        expYear: "#expYear",
        cvv: "#cvv"
      }
    ],
    [
      "brownpapertickets.com",
      {
        pan: "#cc",
        cvv: "[type='text'][name='code']",
        expMonth: "#month",
        expYear: "#year",
        type: "[type='radio'][name='type']"
      }
    ],
    [
      // iframe found on costco.com for PAN only
      "na.accpg.accertify.net",
      {
        pan: "#number"
      }
    ],
    [
      "roguefitness.com",
      {
        pan: "#card_number",
        expMonth: ".select.month select",
        expYear: ".select.year select",
        cvv: "#cvv"
      }
    ]
  ]);
  function findElementsAsArray(document2, selector) {
    return Array.from(document2.querySelectorAll(selector));
  }
  function matchedAllFields(matches) {
    var _a2, _b, _c, _d, _e, _f;
    return !!(((_a2 = matches.pan) == null ? void 0 : _a2.length) && ((_b = matches.cvv) == null ? void 0 : _b.length) && ((_c = matches.type) == null ? void 0 : _c.length) && (((_d = matches.expiry) == null ? void 0 : _d.length) || ((_e = matches.expMonth) == null ? void 0 : _e.length) && ((_f = matches.expYear) == null ? void 0 : _f.length)));
  }
  const allowedAttrs = [
    "autocomplete",
    "class",
    "id",
    "maxlength",
    "name",
    "pattern",
    "placeholder",
    "size",
    "title"
  ];
  const stripCharsRegex = /[^0-9]/g;
  function testFieldDenyRules(value) {
    return Object.values(fieldDenyRules).some((rule) => rule.test(value));
  }
  function getAttributes(el) {
    const attrs = Array.from(el.attributes).filter((attr) => allowedAttrs.includes(attr.name)).reduce((acc, attr) => {
      if (attr.name === "autocomplete" && attr.value === "off") {
        return acc;
      }
      acc[attr.name] = attr.value;
      return acc;
    }, {});
    return attrs;
  }
  function matchCvv(attrs) {
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    if (maxlength) {
      const len = parseInt(maxlength);
      if (len < 3 || len > 4) {
        return false;
      }
    }
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.cvv.test(value);
      if (!match || testFieldDenyRules(value)) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchExpiry(attrs) {
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    if (maxlength && parseInt(maxlength) < 4) {
      return false;
    }
    if (size && parseInt(size) < 4) {
      return false;
    }
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.expiry.test(value);
      if (!match) {
        return;
      }
      if (matchingRules.expMonth.test(value) || matchingRules.expYear.test(value) || testFieldDenyRules(value)) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchExpMonth(el, attrs) {
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    const isSelect = el.tagName === "SELECT";
    if (maxlength && parseInt(maxlength) > 2) {
      return false;
    }
    if (isSelect && el.options.length > 13) {
      return false;
    }
    if (!isSelect && size && parseInt(size) < 2) {
      return false;
    }
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.expMonth.test(value);
      if (!match || matchingRules.expYear.test(value) || testFieldDenyRules(value)) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchExpYear(el, attrs) {
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    const isSelect = el.tagName === "SELECT";
    if (maxlength && parseInt(maxlength) > 4) {
      return false;
    }
    if (!isSelect && size && parseInt(size) < 2) {
      return false;
    }
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.expYear.test(value);
      if (!match || matchingRules.expMonth.test(value) || testFieldDenyRules(value)) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchPan(attrs) {
    const { maxlength, size, placeholder, ...attr } = attrs;
    const matchedAttrs = [];
    if (maxlength) {
      const len = parseInt(maxlength);
      if (len < 14) {
        return false;
      }
    }
    if (size && parseInt(size) < 14) {
      return false;
    }
    if (placeholder) {
      const placeholderStripped = placeholder.replace(stripCharsRegex, "");
      if (placeholderStripped.length == 16) {
        matchedAttrs.push("placeholder");
      }
    }
    for (const [key, value] of Object.entries(attr)) {
      const match = matchingRules.pan.test(value);
      if (!match || matchingRules.cvv.test(value)) {
        continue;
      }
      const denyMatch = Object.values(panDenyRules).some(
        (regex) => regex.test(value)
      );
      if (denyMatch) {
        return false;
      }
      matchedAttrs.push(key);
    }
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchName(attrs) {
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.name.test(value);
      if (!match || nameDenyRule.test(value) || matchingRules.firstName.test(value) || matchingRules.lastName.test(value) && !lastNameDenyRule.test(value)) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchFirstName(attrs) {
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.firstName.test(value);
      if (!match || nameDenyRule.test(value) || matchingRules.lastName.test(value) && !lastNameDenyRule.test(value)) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchLastName(attrs) {
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.lastName.test(value);
      if (!match || nameDenyRule.test(value) || lastNameDenyRule.test(value) || matchingRules.firstName.test(value)) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  function matchType(input, attrs) {
    var _a2, _b;
    const { maxlength, size, ...attr } = attrs;
    const matchedAttrs = [];
    const radio = input.type === "radio";
    if (radio) {
      const label = ((_b = (_a2 = input.labels) == null ? void 0 : _a2[0]) == null ? void 0 : _b.innerText) || "";
      if (matchingRules.type.value.test(label)) {
        matchedAttrs.push("label");
      }
      if (matchingRules.type.value.test(input.value)) {
        matchedAttrs.push("value");
      }
    }
    if (input instanceof HTMLSelectElement) {
      const options = input.options;
      const match = Array.from(options).some(
        (option) => matchingRules.type.value.test(option.value) || matchingRules.type.value.test(option.text)
      );
      if (match) {
        matchedAttrs.push("options");
      }
    }
    Object.entries(attr).forEach(([key, value]) => {
      const match = matchingRules.type.attrs.test(value);
      if (!match || testFieldDenyRules(value) || radio && !matchedAttrs.some((key2) => key2 === "label" || key2 === "value")) {
        return;
      }
      matchedAttrs.push(key);
    });
    return matchedAttrs.length ? matchedAttrs : false;
  }
  async function process(inputs, radios, selects, currentMatches) {
    const candidates = {};
    inputs.forEach((input) => {
      const attrs = getAttributes(input);
      const panMatches = !currentMatches.pan && matchPan(attrs);
      const cvvMatches = !currentMatches.cvv && matchCvv(attrs);
      const expMonthMatches = !currentMatches.expMonth && !currentMatches.expiry && matchExpMonth(input, attrs);
      const expYearMatches = !currentMatches.expiry && !currentMatches.expYear && matchExpYear(input, attrs);
      const expiryMatches = !currentMatches.expiry && !(currentMatches.expMonth && currentMatches.expYear) && !(expMonthMatches && expYearMatches) && matchExpiry(attrs);
      const firstNameMatches = input.type === "text" && !currentMatches.name && !currentMatches.firstName && matchFirstName(attrs);
      const lastNameMatches = input.type === "text" && !currentMatches.name && !currentMatches.lastName && matchLastName(attrs);
      const nameMatches = input.type === "text" && !currentMatches.name && !(currentMatches.firstName && currentMatches.lastName) && !(firstNameMatches && lastNameMatches) && matchName(attrs);
      if (panMatches) {
        candidates.pan || (candidates.pan = []);
        candidates.pan.push({ input, matches: panMatches, attrs });
      }
      if (cvvMatches) {
        candidates.cvv || (candidates.cvv = []);
        candidates.cvv.push({ input, matches: cvvMatches, attrs });
      }
      if (expiryMatches) {
        candidates.expiry || (candidates.expiry = []);
        candidates.expiry.push({ input, matches: expiryMatches, attrs });
      }
      if (expMonthMatches) {
        candidates.expMonth || (candidates.expMonth = []);
        candidates.expMonth.push({ input, matches: expMonthMatches, attrs });
      }
      if (expYearMatches) {
        candidates.expYear || (candidates.expYear = []);
        candidates.expYear.push({ input, matches: expYearMatches, attrs });
      }
      if (firstNameMatches) {
        candidates.firstName || (candidates.firstName = []);
        candidates.firstName.push({ input, matches: firstNameMatches, attrs });
      }
      if (lastNameMatches) {
        candidates.lastName || (candidates.lastName = []);
        candidates.lastName.push({ input, matches: lastNameMatches, attrs });
      }
      if (nameMatches) {
        candidates.name || (candidates.name = []);
        candidates.name.push({ input, matches: nameMatches, attrs });
      }
    });
    if (!currentMatches.type) {
      radios.forEach((radio) => {
        const attrs = getAttributes(radio);
        const typeMatches = matchType(radio, attrs);
        if (typeMatches) {
          candidates.type || (candidates.type = []);
          candidates.type.push({ input: radio, matches: typeMatches, attrs });
        }
      });
    }
    selects.forEach((select) => {
      let attrs;
      if (!(currentMatches.expiry && candidates.expiry) && !(currentMatches.expMonth && candidates.expMonth) && !(currentMatches.expYear && candidates.expYear)) {
        attrs = getAttributes(select);
        const expMonthMatches = matchExpMonth(select, attrs);
        const expYearMatches = matchExpYear(select, attrs);
        if (expMonthMatches) {
          candidates.expMonth || (candidates.expMonth = []);
          candidates.expMonth.push({
            input: select,
            matches: expMonthMatches,
            attrs
          });
        }
        if (expYearMatches) {
          candidates.expYear || (candidates.expYear = []);
          candidates.expYear.push({
            input: select,
            matches: expYearMatches,
            attrs
          });
        }
      }
      if (!currentMatches.type && !candidates.type) {
        attrs || (attrs = getAttributes(select));
        const typeMatches = matchType(select, attrs);
        if (typeMatches) {
          candidates.type || (candidates.type = []);
          candidates.type.push({ input: select, matches: typeMatches, attrs });
        }
      }
    });
    const matches = Object.entries(candidates).reduce(
      (acc, [key, candidates2]) => {
        acc[key] = candidates2.map(
          (candidate) => candidate.input
        );
        return acc;
      },
      {}
    );
    return matches;
  }
  class CheckoutParser {
    constructor(hostname = "") {
      __publicField(this, "customRules");
      const normalizedHostname = hostname.replace("www.", "");
      this.customRules = domainRules.get(normalizedHostname);
    }
    async scan(document2 = window.document) {
      const fields = {};
      const excludeElements = [];
      const findElements = (selector) => {
        let els = findElementsAsArray(document2, selector);
        els = els.filter((el) => el.offsetParent !== null);
        return els.length ? els : false;
      };
      if (this.customRules) {
        Object.entries(this.customRules).reduce((acc, [key, value]) => {
          const matches = findElements(value);
          if (matches) {
            acc[key] = matches;
          }
          return acc;
        }, fields);
        if (matchedAllFields(fields)) {
          return fields;
        }
      }
      const pan = findElements(autocompleteSelectors.pan);
      const cvv = findElements(autocompleteSelectors.cvv);
      const type = findElements(autocompleteSelectors.type);
      const expMonth = findElements(autocompleteSelectors.expMonth);
      const expYear = findElements(autocompleteSelectors.expYear);
      const expiry = !(expMonth && expYear) && findElements(autocompleteSelectors.expiry);
      const firstName = findElements(autocompleteSelectors.firstName);
      const lastName = findElements(autocompleteSelectors.lastName);
      const name = !(firstName && lastName) && findElements(autocompleteSelectors.name);
      const addressLine1 = findElements(autocompleteSelectors.addressLine1);
      const addressLine2 = findElements(autocompleteSelectors.addressLine2);
      const addressLevel2 = findElements(autocompleteSelectors.addressLevel2);
      const addressLevel1 = findElements(autocompleteSelectors.addressLevel1);
      const postalCode = findElements(autocompleteSelectors.postalCode);
      const streetAddress = !(addressLine1 || addressLine2) && findElements(autocompleteSelectors.streetAddress);
      if (pan) {
        fields.pan = pan;
        excludeElements.push(inverseAutocompleteSelectors.pan);
      }
      if (cvv) {
        fields.cvv = cvv;
        excludeElements.push(inverseAutocompleteSelectors.cvv);
      }
      if (type) {
        fields.type = type;
        excludeElements.push(inverseAutocompleteSelectors.type);
      }
      if (expMonth) {
        fields.expMonth = expMonth;
        excludeElements.push(inverseAutocompleteSelectors.expMonth);
      }
      if (expYear) {
        fields.expYear = expYear;
        excludeElements.push(inverseAutocompleteSelectors.expYear);
      }
      if (expiry) {
        fields.expiry = expiry;
        excludeElements.push(
          inverseAutocompleteSelectors.expiry,
          inverseAutocompleteSelectors.expMonth,
          inverseAutocompleteSelectors.expYear
        );
      }
      if (firstName) {
        fields.firstName = firstName;
        excludeElements.push(inverseAutocompleteSelectors.firstName);
      }
      if (lastName) {
        fields.lastName = lastName;
        excludeElements.push(inverseAutocompleteSelectors.lastName);
      }
      if (firstName && lastName) {
        excludeElements.push(inverseAutocompleteSelectors.name);
      }
      if (name) {
        fields.name = name;
        excludeElements.push(
          inverseAutocompleteSelectors.name,
          inverseAutocompleteSelectors.firstName,
          inverseAutocompleteSelectors.lastName
        );
      }
      if (addressLine1) {
        fields.addressLine1 = addressLine1;
        excludeElements.push(inverseAutocompleteSelectors.addressLine1);
      }
      if (addressLine2) {
        fields.addressLine2 = addressLine2;
        excludeElements.push(inverseAutocompleteSelectors.addressLine2);
      }
      if (addressLevel2) {
        fields.addressLevel2 = addressLevel2;
        excludeElements.push(inverseAutocompleteSelectors.addressLevel2);
      }
      if (addressLevel1) {
        fields.addressLevel1 = addressLevel1;
        excludeElements.push(inverseAutocompleteSelectors.addressLevel1);
      }
      if (streetAddress) {
        fields.streetAddress = streetAddress;
        excludeElements.push(inverseAutocompleteSelectors.streetAddress);
      }
      if (postalCode) {
        fields.postalCode = postalCode;
        excludeElements.push(inverseAutocompleteSelectors.postalCode);
      }
      if (matchedAllFields(fields)) {
        return fields;
      }
      const excludeSelector = excludeElements.join(",");
      const fieldSelectors = genericSelectors.map(
        (selector) => selector + (excludeSelector.length ? `:not(${excludeSelector})` : "")
      ).join(",");
      const inputs = findElements(fieldSelectors) || [];
      const radios = findElements(
        "input[type='radio']:not([disabled],[readonly])"
      ) || [];
      const selects = findElements(
        "select:not([disabled],[readonly])"
      ) || [];
      let results = {};
      if (inputs.length || selects.length) {
        results = await process(inputs, radios, selects, fields);
      }
      return {
        ...results,
        ...fields
      };
    }
  }
  var FillDescription = /* @__PURE__ */ ((FillDescription2) => {
    FillDescription2["NO_FIELD"] = "Could not find field to fill";
    FillDescription2["NO_INPUT_FORMAT"] = "Could not determine input format";
    FillDescription2["NO_OPTION"] = "Could not find any matching option";
    FillDescription2["NO_OPTION_VALUE"] = "Could not find matching option value";
    return FillDescription2;
  })(FillDescription || {});
  class Management {
    constructor(context) {
      __publicField(this, "context");
      this.context = context;
    }
    uninstall() {
      var _a2;
      const options = {
        showConfirmDialog: true
      };
      return (_a2 = this.context) == null ? void 0 : _a2.management.uninstallSelf(options);
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
      var _a2, _b;
      const data = {
        ...message,
        from: this.namespace
      };
      return await ((_b = (_a2 = this.context) == null ? void 0 : _a2.runtime) == null ? void 0 : _b.sendMessage(data));
    }
    addListener(callback) {
      var _a2, _b, _c;
      (_c = (_b = (_a2 = this.context) == null ? void 0 : _a2.runtime) == null ? void 0 : _b.onMessage) == null ? void 0 : _c.addListener(callback);
    }
  }
  const UPDATE_KEY = "updatesViewed";
  const CONSENT_KEY = "dataConsentAgreed";
  const ACTIVITY_CONSENT_KEY = "activityConsentAgreed";
  class Storage {
    constructor(context) {
      __publicField(this, "context");
      this.context = context;
    }
    async set(items) {
      var _a2;
      for (const key in items) {
        items[key] = JSON.stringify(items[key]);
      }
      if ((_a2 = this.context) == null ? void 0 : _a2.storage) {
        await this.context.storage.local.set(items);
        return;
      }
      for (const key in items) {
        localStorage.setItem(key, items[key]);
      }
    }
    async get(keys) {
      var _a2;
      let items = {};
      const includesDefaults = !!(keys && typeof keys !== "string" && !Array.isArray(keys));
      if ((_a2 = this.context) == null ? void 0 : _a2.storage) {
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
      var _a2;
      if ((_a2 = this.context) == null ? void 0 : _a2.storage) {
        await this.context.storage.local.remove(keys);
        return;
      }
      const iterableKeys = Array.isArray(keys) ? keys : [keys];
      iterableKeys.forEach((key) => localStorage.removeItem(key));
    }
    async clear({ keepDeviceId = false } = {}) {
      var _a2;
      const { deviceId } = await this.get("deviceId");
      const updates = await this.get(UPDATE_KEY);
      const dataConsent = await this.get(CONSENT_KEY);
      if ((_a2 = this.context) == null ? void 0 : _a2.storage) {
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
      var _a2;
      if (typeof browser !== "undefined") {
        this._context = browser;
      } else if (typeof chrome !== "undefined") {
        this._context = chrome;
      }
      if (this._context) {
        (_a2 = this._context.runtime) == null ? void 0 : _a2.connect();
      }
      this.storage = new Storage(this._context);
      this.message = new Message(namespace, this._context);
      this.management = new Management(this._context);
    }
    get context() {
      return this._context;
    }
    get popup() {
      var _a2, _b, _c, _d, _e;
      if ((_b = (_a2 = this.context) == null ? void 0 : _a2.extension) == null ? void 0 : _b.getViews) {
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
      var _a2;
      if (!this.context) {
        return "";
      }
      return (_a2 = this.context.runtime) == null ? void 0 : _a2.getURL(url);
    }
    async getBrowserInfo() {
      var _a2, _b;
      if ((_b = (_a2 = this.context) == null ? void 0 : _a2.runtime) == null ? void 0 : _b.getBrowserInfo) {
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
      var _a2, _b;
      (_b = (_a2 = this.context) == null ? void 0 : _a2.tabs) == null ? void 0 : _b.onUpdated.addListener(listener);
    }
  }
  const logo = '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">\n  <path\n    d="M29.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V29.4C1 32.7603 1 34.4405 1.65396 35.7239C2.2292 36.8529 3.14708 37.7708 4.27606 38.346C5.55953 39 7.23969 39 10.6 39H29.4C32.7603 39 34.4405 39 35.7239 38.346C36.8529 37.7708 37.7708 36.8529 38.346 35.7239C39 34.4405 39 32.7603 39 29.4V10.6C39 7.23969 39 5.55953 38.346 4.27606C37.7708 3.14708 36.8529 2.2292 35.7239 1.65396C34.4405 1 32.7603 1 29.4 1Z"\n    fill="#232320" />\n  <path\n    d="m19.56 10.001h-7.5603v20.046h4.2956v-6.5866h3.2647c5.7656 0 8.6484-2.2433 8.6484-6.7298s-2.8828-6.7298-8.6484-6.7298zm0.2004 3.7801c2.711 0 4.0665 0.9833 4.0665 2.9497s-1.3555 2.9496-4.0665 2.9496h-3.4651v-5.8993h3.4651z"\n    clip-rule="evenodd" fill="#fff" fill-rule="evenodd" />\n</svg>\n';
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function isIPhone() {
    return navigator.userAgent.includes("iPhone");
  }
  function isIPad() {
    return navigator.userAgent.includes("iPad") || navigator.userAgent.includes("Mac") && "ontouchend" in document;
  }
  function isIOS() {
    return isIPhone() || isIPad();
  }
  function isFirefox() {
    return navigator.userAgent.includes("Firefox") && navigator.userAgent.includes("rv:");
  }
  const wrapperStyles$1 = {
    all: "initial",
    height: "24px",
    left: "0px",
    "max-height": "36px",
    "max-width": "36px",
    "min-height": "12px",
    "min-width": "12px",
    position: "fixed",
    top: "0px",
    width: "24px",
    "z-index": "2147483647"
  };
  const wrapperStylesMobile$1 = {
    height: "44px",
    "max-height": "44px",
    "max-width": "44px",
    top: "unset",
    width: "44px"
  };
  const tooltipStyles = {
    all: "initial",
    background: "#000",
    "border-radius": "5px",
    bottom: "calc(100% + 5px)",
    "box-shadow": "0 0 0 1px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.1)",
    color: "#fff",
    "font-family": "Helvetica, Arial, sans-serif",
    "font-size": "11px",
    left: "-99999999px",
    padding: "5px",
    position: "absolute",
    "text-align": "center",
    transform: "translateX(-50%)",
    width: "100px",
    opacity: 0,
    transition: "opacity 250ms ease-in-out 300ms"
  };
  const tooltipStylesMobile = {
    bottom: "5px",
    transform: "translate(0)"
  };
  const arrowStyles = {
    all: "initial",
    border: "5px solid transparent",
    "border-top-color": "#000",
    content: '""',
    left: "50%",
    position: "absolute",
    top: "100%",
    transform: "translateX(-50%)"
  };
  const arrowStylesMobile = {
    bottom: "unset",
    left: "-10px",
    transform: "translateY(-50%)",
    top: "50%",
    "border-top-color": "transparent",
    "border-right-color": "#000"
  };
  const buttonStyles = {
    all: "initial",
    border: "none",
    cursor: "pointer",
    display: "block",
    height: "100%",
    width: "100%"
  };
  const iconStyles = {
    display: "block",
    width: "100%",
    height: "100%"
  };
  function getStyleStr$1(styles2) {
    return Object.entries(styles2).map(([key, value]) => `${key}:${value}`).join(";");
  }
  const wrapperId$1 = "pwp-button";
  const buttonSelector = "#" + wrapperId$1;
  const generateStyles = () => {
    const wrapper = {
      ...wrapperStyles$1,
      ...isIOS() ? wrapperStylesMobile$1 : {}
    };
    const tooltip = {
      ...tooltipStyles,
      ...isIOS() ? tooltipStylesMobile : {}
    };
    const arrow = {
      ...arrowStyles,
      ...isIOS() ? arrowStylesMobile : {}
    };
    return `
    ${buttonSelector} { ${getStyleStr$1(wrapper)} }
    #pwp-tooltip { ${getStyleStr$1(tooltip)} }
    #pwp-control { ${getStyleStr$1(buttonStyles)} }
    #pwp-control svg { ${getStyleStr$1(iconStyles)} }
    #pwp-tooltip::after { ${getStyleStr$1(arrow)} }
    ${buttonSelector}:hover #pwp-tooltip { left: 110%; opacity: 1; }
  `;
  };
  function createButton() {
    const style = document.createElement("style");
    style.textContent = generateStyles();
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", wrapperId$1);
    const tooltip = document.createElement("div");
    tooltip.setAttribute("id", "pwp-tooltip");
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-hidden", "true");
    tooltip.textContent = "Autofill Privacy Card";
    const button = document.createElement("button");
    button.setAttribute("id", "pwp-control");
    button.setAttribute("aria-label", "Autofill Privacy Card");
    button.insertAdjacentHTML("beforeend", logo.trim());
    wrapper.appendChild(style);
    wrapper.appendChild(tooltip);
    wrapper.appendChild(button);
    return wrapper;
  }
  const wrapperId = "pwp-interstitial";
  const frameId = wrapperId + "-frame";
  const interstitialSelector = "#" + wrapperId;
  const frameSelector = "#" + frameId;
  const wrapperStyles = {
    all: "initial",
    position: "fixed",
    "z-index": 2147483647
  };
  const wrapperStylesMobile = {
    width: "100vw",
    top: "0px",
    left: "0px"
  };
  const wrapperStylesBackground = {
    height: "100vh",
    "background-color": "rgba(184, 184, 204, 0.5)"
  };
  const frameStyles = {
    all: "initial",
    "box-sizing": "content-box",
    position: "fixed",
    "z-index": "2147483647",
    height: "500px",
    width: "366px",
    top: "10px",
    right: "10px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    "border-radius": "8px",
    "box-shadow": "0 5px 40px rgba(40, 51, 75, 0.1)",
    transition: "height 0.3s ease-in-out"
  };
  const frameStylesMobile = {
    left: "10px",
    width: "calc(100% - 20px)"
  };
  const styles = {
    [interstitialSelector]: {
      ...wrapperStyles,
      ...isIPhone() ? wrapperStylesMobile : {}
    },
    [frameSelector]: {
      ...frameStyles,
      ...isIPhone() ? frameStylesMobile : {}
    }
  };
  function getStyleStr(styleObj) {
    return Object.entries(styleObj).map(([key, value]) => `${key}: ${value}`).join(";");
  }
  const defaultStyles = `
  ${interstitialSelector} { ${getStyleStr(styles[interstitialSelector])} }
  ${frameSelector} { ${getStyleStr(styles[frameSelector])} }
`;
  const backgroundStyles = `
  ${interstitialSelector} { ${getStyleStr(wrapperStylesBackground)} };
`;
  function setStyles(wrapper, includeBg = true) {
    let style = wrapper.querySelector("style");
    if (!style) {
      style = document.createElement("style");
      wrapper.appendChild(style);
    }
    let text = defaultStyles;
    if (includeBg) {
      text += backgroundStyles;
    }
    style.textContent = text;
  }
  function createInterstitial(src) {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", wrapperId);
    const frame = document.createElement("iframe");
    frame.setAttribute("id", frameId);
    frame.setAttribute("src", src);
    frame.setAttribute("allow", "clipboard-write");
    setStyles(wrapper);
    wrapper.appendChild(frame);
    return wrapper;
  }
  function getCardTypeRegex(pan) {
    const mii = pan[0];
    if (mii === "4") {
      return /visa/i;
    } else if (mii === "5") {
      return /master ?card/i;
    } else {
      throw new Error("Unsupported card type");
    }
  }
  function getLabel(ele) {
    var _a2, _b;
    return trimString(((_b = (_a2 = ele.labels) == null ? void 0 : _a2[0]) == null ? void 0 : _b.textContent) || "");
  }
  function trimString(target = "") {
    return target.trim().replace(/\s\s+/g, " ");
  }
  function isFourInputPAN(elements = []) {
    if (elements.length >= 4) {
      const widthCount = {}, topCount = {};
      let filteredCandidates = elements.filter(function(candidate) {
        return candidate.getAttribute("maxlength") === "4" || candidate.getAttribute("size") === "4";
      });
      filteredCandidates.forEach((candidate) => {
        const { top, width } = candidate.getBoundingClientRect();
        widthCount[width] = (widthCount[width] || 0) + 1;
        topCount[top] = (topCount[top] || 0) + 1;
      });
      const filteredCandidatesLength = filteredCandidates.length;
      if (filteredCandidatesLength >= 4) {
        filteredCandidates = filteredCandidates.filter((candidate) => {
          const clientRect = candidate.getBoundingClientRect();
          if (widthCount[clientRect.width] * 2 > filteredCandidatesLength || topCount[clientRect.top] * 2 > filteredCandidatesLength) {
            return true;
          }
        });
        if (filteredCandidates.length == 4) {
          filteredCandidates.sort(function(lhs, rhs) {
            return lhs.getBoundingClientRect().left - rhs.getBoundingClientRect().left;
          });
          return true;
        }
      }
    }
    return false;
  }
  const states = [
    {
      name: "Alabama",
      abbreviation: "AL"
    },
    {
      name: "Alaska",
      abbreviation: "AK"
    },
    {
      name: "American Samoa",
      abbreviation: "AS"
    },
    {
      name: "Arizona",
      abbreviation: "AZ"
    },
    {
      name: "Arkansas",
      abbreviation: "AR"
    },
    {
      name: "California",
      abbreviation: "CA"
    },
    {
      name: "Colorado",
      abbreviation: "CO"
    },
    {
      name: "Connecticut",
      abbreviation: "CT"
    },
    {
      name: "Delaware",
      abbreviation: "DE"
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC"
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM"
    },
    {
      name: "Florida",
      abbreviation: "FL"
    },
    {
      name: "Georgia",
      abbreviation: "GA"
    },
    {
      name: "Guam",
      abbreviation: "GU"
    },
    {
      name: "Hawaii",
      abbreviation: "HI"
    },
    {
      name: "Idaho",
      abbreviation: "ID"
    },
    {
      name: "Illinois",
      abbreviation: "IL"
    },
    {
      name: "Indiana",
      abbreviation: "IN"
    },
    {
      name: "Iowa",
      abbreviation: "IA"
    },
    {
      name: "Kansas",
      abbreviation: "KS"
    },
    {
      name: "Kentucky",
      abbreviation: "KY"
    },
    {
      name: "Louisiana",
      abbreviation: "LA"
    },
    {
      name: "Maine",
      abbreviation: "ME"
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH"
    },
    {
      name: "Maryland",
      abbreviation: "MD"
    },
    {
      name: "Massachusetts",
      abbreviation: "MA"
    },
    {
      name: "Michigan",
      abbreviation: "MI"
    },
    {
      name: "Minnesota",
      abbreviation: "MN"
    },
    {
      name: "Mississippi",
      abbreviation: "MS"
    },
    {
      name: "Missouri",
      abbreviation: "MO"
    },
    {
      name: "Montana",
      abbreviation: "MT"
    },
    {
      name: "Nebraska",
      abbreviation: "NE"
    },
    {
      name: "Nevada",
      abbreviation: "NV"
    },
    {
      name: "New Hampshire",
      abbreviation: "NH"
    },
    {
      name: "New Jersey",
      abbreviation: "NJ"
    },
    {
      name: "New Mexico",
      abbreviation: "NM"
    },
    {
      name: "New York",
      abbreviation: "NY"
    },
    {
      name: "North Carolina",
      abbreviation: "NC"
    },
    {
      name: "North Dakota",
      abbreviation: "ND"
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP"
    },
    {
      name: "Ohio",
      abbreviation: "OH"
    },
    {
      name: "Oklahoma",
      abbreviation: "OK"
    },
    {
      name: "Oregon",
      abbreviation: "OR"
    },
    {
      name: "Palau",
      abbreviation: "PW"
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA"
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR"
    },
    {
      name: "Rhode Island",
      abbreviation: "RI"
    },
    {
      name: "South Carolina",
      abbreviation: "SC"
    },
    {
      name: "South Dakota",
      abbreviation: "SD"
    },
    {
      name: "Tennessee",
      abbreviation: "TN"
    },
    {
      name: "Texas",
      abbreviation: "TX"
    },
    {
      name: "Utah",
      abbreviation: "UT"
    },
    {
      name: "Vermont",
      abbreviation: "VT"
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI"
    },
    {
      name: "Virginia",
      abbreviation: "VA"
    },
    {
      name: "Washington",
      abbreviation: "WA"
    },
    {
      name: "West Virginia",
      abbreviation: "WV"
    },
    {
      name: "Wisconsin",
      abbreviation: "WI"
    },
    {
      name: "Wyoming",
      abbreviation: "WY"
    }
  ];
  const stateAbbreviations = states.reduce((acc, state) => {
    acc[state.abbreviation] = state.name;
    return acc;
  }, {});
  const monthAbbreviations = {
    1: "jan",
    2: "feb",
    3: "mar",
    4: "apr",
    5: "may",
    6: "jun",
    7: "jul",
    8: "aug",
    9: "sept",
    10: "oct",
    11: "nov",
    12: "dec"
  };
  const expiryRegExp = /(?<month>mm)(?<separator>\s*\/?\s*)(?<year>(?:yy){1,2})/i;
  class CheckoutFiller {
    constructor(matches, cardData) {
      __publicField(this, "data", {});
      __publicField(this, "matches");
      this.matches = matches;
      this.data = cardData;
    }
    fillAllFields() {
      const results = {};
      results.type = this.fillCardType(this.data.pan, window.document);
      results.pan = this.fillPan(this.matches.pan, this.data.pan);
      results.cvv = this.fillCvv(this.matches.cvv, this.data.cvv);
      if (this.matches.expMonth) {
        results.expMonth = this.fillExpMonth({
          expMonthFields: this.matches.expMonth,
          expMonth: this.data.expMonth
        });
      }
      if (this.matches.expYear) {
        results.expYear = this.fillExpYear({
          expYear: this.data.expYear,
          expYearFields: this.matches.expYear
        });
      }
      if (this.matches.expiry) {
        results.expiry = this.fillExpiry(this.matches.expiry, {
          expMonth: this.data.expMonth,
          expYear: this.data.expYear
        });
      }
      if (this.matches.streetAddress) {
        this.populateInput(
          this.matches.streetAddress,
          this.data.streetAddress
        );
        results.streetAddress = { filled: true };
      }
      if (this.matches.addressLine1) {
        this.populateInput(
          this.matches.addressLine1,
          this.data.addressLine1
        );
        results.addressLine1 = { filled: true };
      }
      if (this.matches.addressLine2) {
        this.populateInput(
          this.matches.addressLine2,
          this.data.addressLine2
        );
        results.addressLine2 = { filled: true };
      }
      if (this.matches.addressLevel2) {
        this.populateInput(
          this.matches.addressLevel2,
          this.data.addressLevel2
        );
        results.addressLevel2 = { filled: true };
      }
      if (this.matches.addressLevel1) {
        this.fillAddressLevel1(
          this.matches.addressLevel1,
          this.data.addressLevel1
        );
        results.addressLevel2 = { filled: true };
      }
      if (this.matches.postalCode) {
        this.populateInput(
          this.matches.postalCode,
          this.data.postalCode
        );
        results.postalCode = { filled: true };
      }
      if (this.matches.name) {
        this.populateInput(
          this.matches.name,
          this.data.name
        );
        results.name = { filled: true };
      }
      if (this.matches.firstName) {
        this.populateInput(
          this.matches.firstName,
          this.data.firstName
        );
        results.firstName = { filled: true };
      }
      if (this.matches.lastName) {
        this.populateInput(
          this.matches.lastName,
          this.data.lastName
        );
        results.lastName = { filled: true };
      }
      return results;
    }
    // Some forms make the user choose VISA/Mastercard from a dropdown or radio
    // buttons, even though this can be determined from the PAN
    fillCardType(pan, doc = window.document) {
      const cardRE = getCardTypeRegex(pan);
      const selects = Array.from(
        doc.querySelectorAll("select:not([disabled],[readonly])")
      );
      const options = selects.map(({ options: options2 }) => Array.from(options2)).flat();
      const result = { filled: false };
      const option = options.filter((el) => {
        return el.text.match(cardRE) || el.value.match(cardRE);
      }).sort((a, b) => {
        return a.text.toLowerCase().length > b.text.toLowerCase().length ? 1 : -1;
      }).shift();
      if (option) {
        const select = option.closest("select");
        this.populateSelect(select, option.value);
        result.filled = true;
        return result;
      }
      const radios = Array.from(
        doc.querySelectorAll('input[type="radio"]:not([disabled],[readonly])')
      );
      const radio = radios.filter((el) => {
        const label = getLabel(el);
        return label.match(/visa|mastercard/i) && !label.match(/visa\s*checkout/i) && !label.match(/master\s*card/i);
      }).sort((a, b) => {
        return getLabel(a).toLowerCase().length > getLabel(b).toLowerCase().length ? 1 : -1;
      }).shift();
      if (radio) {
        this.triggerClick(radio);
        result.filled = true;
        return result;
      }
      result.description = FillDescription.NO_FIELD;
      return result;
    }
    fillPan(elements, value) {
      const result = { filled: false };
      if (!elements) {
        result.description = FillDescription.NO_FIELD;
        return result;
      }
      const fourInputPAN = isFourInputPAN(elements);
      if (fourInputPAN) {
        const panSplits = value.match(/\d{4}/g) || [];
        panSplits.forEach((fourDigitGroup, idx) => {
          this.populateInput(elements[idx], fourDigitGroup);
        });
      } else {
        this.populateInput(elements, value);
      }
      result.filled = true;
      return result;
    }
    fillCvv(elements, value) {
      const result = { filled: false };
      if (!elements) {
        result.description = FillDescription.NO_FIELD;
        return result;
      }
      this.populateInput(elements, value);
      result.filled = true;
      return result;
    }
    // Set the expiration month input value
    // The month will either be a SELECT dropdown or a text INPUT
    fillExpMonth({
      expMonthFields,
      expMonth
    }) {
      const result = { filled: false };
      if (!(expMonthFields == null ? void 0 : expMonthFields.length) || !expMonth) {
        result.description = FillDescription.NO_FIELD;
        return result;
      }
      const monthNum = parseInt(expMonth, 10);
      const monthAbbrev = monthAbbreviations[monthNum];
      const formatRegex = /mm/i;
      expMonthFields.forEach((candidate) => {
        var _a2;
        if (candidate instanceof HTMLSelectElement) {
          let selector = "option[value^='" + monthAbbrev + "' i],";
          const zeroBased = candidate.querySelector("option[value='0']") && !candidate.querySelector("option[value='12']");
          if (zeroBased) {
            const zeroMonth = monthNum - 1;
            selector += `option[value='${zeroMonth}'],option[value='${zeroMonth.toString(10).padStart(2, "0")}']`;
          } else {
            selector += `option[value='${monthNum}'],option[value='${expMonth}']`;
          }
          let option = candidate.querySelector(selector);
          if (!option) {
            option = Array.from(candidate.options).find((opt) => {
              const text = opt.text.trim().toLowerCase();
              return text === monthNum.toString() || text === expMonth || text.includes(monthAbbrev);
            });
          }
          if ((_a2 = option == null ? void 0 : option.value) == null ? void 0 : _a2.length) {
            this.populateSelect(candidate, option.value);
            result.filled = true;
          } else if (option) {
            option.selected = true;
            result.description = FillDescription.NO_OPTION_VALUE;
            result.filled = true;
          } else {
            result.description = FillDescription.NO_OPTION;
          }
        } else if (candidate instanceof HTMLInputElement) {
          const formatFound = candidate.maxLength === 2 || formatRegex.test(candidate.placeholder) || formatRegex.test(candidate.alt) || formatRegex.test(candidate.title) || formatRegex.test(getLabel(candidate));
          if (!formatFound) {
            result.description = FillDescription.NO_INPUT_FORMAT;
          }
          this.populateInput(candidate, expMonth);
          result.filled = true;
        }
      });
      return result;
    }
    // Fill expiration month and year when they are separate fields
    fillExpYear({
      expYearFields,
      expYear
    }) {
      const result = { filled: false };
      if (!(expYearFields == null ? void 0 : expYearFields.length) || !expYear) {
        result.description = FillDescription.NO_FIELD;
        return result;
      }
      const expYearShort = expYear.slice(-2);
      const selector = `option[value$='${expYearShort}']`;
      const formatRegex = /yy/i;
      expYearFields.forEach((candidate) => {
        var _a2;
        if (candidate instanceof HTMLSelectElement) {
          let option = candidate.querySelector(selector);
          if (!option) {
            option = Array.from(candidate.options).find(
              (option2) => option2.text.trim().endsWith(expYearShort)
            );
          }
          if ((_a2 = option == null ? void 0 : option.value) == null ? void 0 : _a2.length) {
            this.populateSelect(candidate, option.value);
            result.filled = true;
          } else if (option) {
            option.selected = true;
            result.description = FillDescription.NO_OPTION_VALUE;
            result.filled = true;
          } else {
            result.description = FillDescription.NO_OPTION;
          }
        } else if (candidate instanceof HTMLInputElement) {
          if (formatRegex.test(candidate.placeholder) || formatRegex.test(candidate.alt) || formatRegex.test(candidate.title) || formatRegex.test(getLabel(candidate)) || candidate.maxLength === 2) {
            this.populateInput(candidate, expYearShort);
          } else {
            this.populateInput(candidate, expYear);
            result.description = FillDescription.NO_INPUT_FORMAT;
          }
          result.filled = true;
        }
      });
      return result;
    }
    // Fill the expiration month + date when they are a single combined field
    fillExpiry(elements, { expMonth, expYear }) {
      const result = { filled: false };
      if (!elements) {
        result.description = FillDescription.NO_FIELD;
        return result;
      }
      elements.forEach((candidate) => {
        var _a2;
        const { groups } = expiryRegExp.exec(candidate.placeholder) || expiryRegExp.exec(candidate.alt) || expiryRegExp.exec(candidate.title) || expiryRegExp.exec(getLabel(candidate)) || {};
        if (!groups) {
          this.populateInput(candidate, expMonth + "/" + expYear);
          result.filled = true;
          result.description = FillDescription.NO_INPUT_FORMAT;
          return;
        }
        const yearStart = expYear.length - (((_a2 = groups == null ? void 0 : groups.year) == null ? void 0 : _a2.length) || 4);
        const input = expMonth + (groups == null ? void 0 : groups.separator) + expYear.substring(yearStart);
        this.populateInput(candidate, input);
        result.filled = true;
      });
      return result;
    }
    fillAddressLevel1(elements, addressLevel1) {
      const result = { filled: false };
      const selector = `option[value='${addressLevel1}' i],option[value='${stateAbbreviations[addressLevel1]}' i]`;
      elements.forEach((candidate) => {
        var _a2;
        if (candidate instanceof HTMLInputElement) {
          this.populateInput(candidate, addressLevel1);
          result.filled = true;
        } else if (candidate instanceof HTMLSelectElement) {
          let option = candidate.querySelector(selector);
          if (!option) {
            option = Array.from(candidate.options).find((opt) => {
              var _a3;
              const text = opt.text.trim().toLowerCase();
              return text === (addressLevel1 == null ? void 0 : addressLevel1.toLowerCase()) || text === ((_a3 = stateAbbreviations[addressLevel1]) == null ? void 0 : _a3.toLowerCase());
            });
          }
          if ((_a2 = option == null ? void 0 : option.value) == null ? void 0 : _a2.length) {
            this.populateSelect(candidate, option.value);
            result.filled = true;
          } else if (option) {
            option.selected = true;
            result.description = FillDescription.NO_OPTION_VALUE;
            result.filled = true;
          } else {
            result.description = FillDescription.NO_OPTION;
          }
        }
      });
      return result;
    }
    // Fill an input field with the given value
    // Trigger events to simulate user interaction
    populateInput(fieldElements, value = "") {
      const fields = [fieldElements].flat();
      const lastChar = value.slice(-1);
      fields.forEach((field) => {
        field.focus();
        this.dispatchKeyEvent(field, "keydown", lastChar);
        this.dispatchKeyEvent(field, "keypress", lastChar);
        field.value = value;
        this.dispatchEvent(field, "input");
        this.dispatchKeyEvent(field, "keyup", lastChar);
        this.dispatchEvent(field, "change");
        field.blur();
      });
    }
    // Search for the given value in a select list and select it, if found.
    // Trigger a events to simulate user interaction
    populateSelect(field, value = "") {
      field.focus();
      field.value = value;
      this.dispatchEvent(field, "change");
      field.blur();
    }
    // Trigger a key event on the given element
    // The `key` value will be a single-character string representing the last
    // character of the input value being simulated
    dispatchKeyEvent(target, eventName, key) {
      const code = parseInt(key) ? `Digit${key}` : `Key${key.toUpperCase()}`;
      target.dispatchEvent(
        new KeyboardEvent(eventName, {
          bubbles: true,
          cancelable: true,
          composed: true,
          key,
          code,
          keyCode: key.charCodeAt(0),
          // deprecated
          which: key.charCodeAt(0),
          // deprecated
          altKey: false,
          shiftKey: false,
          ctrlKey: false
        })
      );
    }
    dispatchEvent(target, eventName) {
      target.dispatchEvent(
        new Event(eventName, {
          bubbles: true,
          cancelable: false,
          composed: false
        })
      );
    }
    // Propagates all the events associated with clicking an element
    triggerClick(ele) {
      try {
        const events = ["mouseenter", "mousedown", "mouseup", "click"];
        events.forEach((event) => {
          ele.dispatchEvent(
            new MouseEvent(event, {
              bubbles: true,
              cancelable: true,
              view: window instanceof Window ? window : null
            })
          );
        });
      } catch (e) {
        console.error("Error triggering click on ", ele, "Error=", e);
      }
    }
  }
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
  const documentIframeSelector = `iframe:not([name^='__privateStripeMetricsController'],[name^='__privateStripeController'],[title='reCAPTCHA'],${frameSelector})`;
  const stripAnchorTag = (str) => str == null ? void 0 : str.replace(/#.*$/, "");
  const iframes = /* @__PURE__ */ new Map();
  function processIframe(iframe, window2, isTopWindow) {
    const { x, y } = iframe.getBoundingClientRect();
    return {
      src: iframe.src,
      parent: isTopWindow ? null : window2.location.href,
      x,
      y,
      scrollX: window2.scrollX,
      scrollY: window2.scrollY
    };
  }
  class Checkout {
    constructor(hostname = "") {
      __publicField(this, "parser");
      __publicField(this, "isTopWindow", window === window.top);
      __publicField(this, "originalUrl", window.location.href);
      __publicField(this, "extensionApi", new ExtensionApi("checkout"));
      __publicField(this, "insertingButton", false);
      __publicField(this, "savedViewport", "");
      __publicField(this, "attrs", {});
      __publicField(this, "topWindowEventSubscriber", (event, _sender, sendResponse) => {
        var _a2, _b;
        if (event.target !== "checkout") {
          return;
        }
        switch (event.event) {
          case "addButton":
            if (isIOS()) {
              this.addUpdateButtonMobile();
            } else {
              this.addButton(event);
            }
            sendResponse({ success: true });
            break;
          case "removeButton":
            this.removeButton();
            sendResponse({ success: true });
            break;
          case "removeInterstitial":
            this.removeInterstitial();
            sendResponse({ success: true });
            break;
          case "showInterstitial":
            this.addInterstitial();
            sendResponse({ success: true });
            break;
          case "updateInterstitialHeight":
            this.updateInterstitialHeight(event.payload.height);
            sendResponse({ success: true });
            break;
          case "updateInterstitialStyles":
            this.updateInterstitialStyles(event.payload.includeBg);
            sendResponse({ success: true });
            break;
          case "showCollapsedCard":
            if ((_a2 = event.payload) == null ? void 0 : _a2.cardUuid) {
              this.removeInterstitial();
              sendResponse({
                success: this.showCollapsedCard((_b = event.payload) == null ? void 0 : _b.cardUuid)
              });
            }
            break;
          case "iframeFound":
            iframes.set(event.payload.src, event.payload);
            sendResponse({ success: true });
            break;
        }
        return true;
      });
      __publicField(this, "extensionEventsSubscriber", (event, sender, sendResponse) => {
        let results = {};
        switch (event.event) {
          case "paymentInputsFound":
            if (this.found) {
              sendResponse({ success: true });
            }
            break;
          case "fillCheckout":
            results = this.fillCheckout(event.payload);
            if (Object.keys(results).length) {
              const filtered = Object.entries(results).filter(
                ([, { description }]) => description && description !== FillDescription.NO_FIELD
              );
              if (filtered.length) {
                this.extensionApi.message.send({
                  target: "background",
                  event: "fillCheckoutResult",
                  payload: {
                    name: EXTENSION_EVENTS.FILL_CHECKOUT_INPUT_FORMAT,
                    data: Object.fromEntries(filtered)
                  }
                }).finally(() => {
                  sendResponse({ success: true });
                });
              }
            }
            break;
          case "resumeParsing":
            this.findElements().finally(() => {
              sendResponse({ success: true });
            });
            break;
          case "pauseParsing":
            this.removeEventListeners();
            this.removeButton();
            this.attrs = {};
            break;
        }
        return true;
      });
      __publicField(this, "emitAddButton", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "click" && event.target === document.activeElement && (document.querySelector(buttonSelector) || this.insertingButton)) {
          return;
        }
        const currentTarget = event.target;
        const dimensions = currentTarget.getBoundingClientRect();
        const styles2 = window.getComputedStyle(currentTarget);
        let origin = window.location.href;
        let adyen;
        if (!this.isTopWindow && window.location.href.includes("adyen.com")) {
          const head = document.querySelector("head[title]");
          adyen = head == null ? void 0 : head.getAttribute("title");
        } else if (!this.isTopWindow && origin !== this.originalUrl) {
          origin = this.originalUrl;
        }
        let size = 24;
        if (dimensions.height > 48) {
          size = 36;
        } else if (dimensions.height <= 24) {
          size = Math.min(18, dimensions.height - 2);
        }
        const top = dimensions.top + (dimensions.height - size) / 2;
        const left = dimensions.right - size - Math.max(Number(styles2.paddingRight.replace("px", "")), 8);
        this.extensionApi.message.send({
          target: "checkout",
          event: "addButton",
          payload: {
            origin,
            inFrame: !this.isTopWindow,
            adyen,
            size,
            top,
            left
          }
        });
      });
      this.hostname = hostname;
      this.parser = new CheckoutParser(hostname);
      this.extensionApi.message.addListener(this.extensionEventsSubscriber);
      if (!isIOS()) {
        window.addEventListener(
          "click",
          () => {
            this.extensionApi.message.send({
              target: "checkout",
              event: "removeButton"
            });
          },
          { passive: true }
        );
      }
      if (this.isTopWindow) {
        this.extensionApi.message.addListener(this.topWindowEventSubscriber);
        if (!isIOS()) {
          ["scroll", "resize"].forEach((event) => {
            window.addEventListener(event, this.removeButton, {
              passive: true
            });
          });
        } else {
          ["scroll", "resize"].forEach((event) => {
            window.visualViewport.addEventListener(
              event,
              this.addUpdateButtonMobile,
              { passive: true }
            );
          });
        }
      }
    }
    get found() {
      return !!Object.keys(this.attrs).length;
    }
    async findElements() {
      document.querySelectorAll(documentIframeSelector).forEach((iframe) => {
        const payload = processIframe(iframe, window, this.isTopWindow);
        this.extensionApi.message.send({
          target: "checkout",
          event: "iframeFound",
          payload
        });
      });
      const result = await this.parser.scan();
      Object.entries(result).forEach(([key, value]) => {
        if (value.length) {
          this.attrs[key] = value;
        }
      });
      if (this.found && isIOS()) {
        this.extensionApi.message.send({
          target: "checkout",
          event: "addButton"
        });
        return;
      } else if (this.found) {
        this.addAttrListeners();
      }
    }
    addAttrListeners() {
      Object.values(this.attrs).forEach((elements) => {
        const lastEl = elements[elements.length - 1];
        if (lastEl instanceof HTMLInputElement && (["text", "tel", "number", "password", "email"].includes(lastEl.type) || !lastEl.hasAttribute("type"))) {
          lastEl.removeEventListener("focus", this.emitAddButton);
          lastEl.removeEventListener("click", this.emitAddButton);
          lastEl.addEventListener("focus", this.emitAddButton);
          lastEl.addEventListener("click", this.emitAddButton);
        }
      });
    }
    removeEventListeners() {
      Object.values(this.attrs).forEach((elements) => {
        const lastEl = elements[elements.length - 1];
        if (lastEl instanceof HTMLInputElement && (["text", "tel", "number", "password", "email"].includes(lastEl.type) || !lastEl.hasAttribute("type"))) {
          lastEl.removeEventListener("focus", this.emitAddButton);
          lastEl.removeEventListener("click", this.emitAddButton);
        }
      });
    }
    // This method is ONLY run from the top window
    async addButton(data) {
      var _a2;
      if (this.insertingButton) {
        return;
      }
      this.insertingButton = true;
      let { size, top, left, origin, adyen, inFrame } = data.payload;
      if (inFrame) {
        let iframe;
        if (adyen) {
          const frame = document.querySelector(
            `iframe[title="${adyen}"]`
          );
          if (frame) {
            iframe = processIframe(frame, window, true);
          }
        } else {
          iframe = iframes.get(origin);
        }
        if (!iframe) {
          const strippedOrigin = stripAnchorTag(origin);
          const key = [...iframes.keys()].find((key2) => {
            return key2.startsWith(strippedOrigin);
          });
          iframe = iframes.get(key);
        }
        if (iframe) {
          do {
            top += iframe.y;
            left += iframe.x;
            if (!iframe.parent) {
              if (iframe.scrollY !== window.scrollY) {
                top += iframe.scrollY - window.scrollY;
              }
              if (iframe.scrollX !== window.scrollX) {
                left += iframe.scrollX - window.scrollX;
              }
              iframe = void 0;
            } else {
              iframe = iframes.get(iframe.parent);
            }
          } while (iframe);
        }
      }
      top += ((_a2 = window.visualViewport) == null ? void 0 : _a2.offsetTop) || 0;
      const currentButton = document.querySelector(buttonSelector);
      const button = currentButton || createButton();
      button.style.setProperty("top", `${top}px`);
      button.style.setProperty("left", `${left}px`);
      if (size) {
        button.style.setProperty("height", `${size}px`);
        button.style.setProperty("width", `${size}px`);
      }
      if (!currentButton) {
        const modifiedHostname = this.hostname.replace("www.", "");
        button.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.removeInterstitial();
          this.addInterstitial({
            page: "suggestions",
            query: `q=${modifiedHostname}`
          });
        });
      }
      setTimeout(() => {
        document.body.appendChild(button);
        this.insertingButton = false;
      }, 15);
    }
    // Mobile button is only shown in the top window, not per-input.
    addUpdateButtonMobile() {
      const size = 44;
      const edgeSpace = ".5rem";
      const top = window.visualViewport.height + window.visualViewport.offsetTop - size;
      const currentButton = document.querySelector(buttonSelector);
      const button = currentButton || createButton();
      button.style.setProperty("top", `calc(${top}px - ${edgeSpace})`);
      if (!currentButton) {
        button.style.setProperty("left", `${edgeSpace}`);
        const modifiedHostname = this.hostname.replace("www.", "");
        button.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.removeInterstitial();
          this.addInterstitial({
            page: "suggestions",
            query: `q=${modifiedHostname}`
          });
        });
      }
      document.body.appendChild(button);
    }
    removeButton() {
      var _a2;
      (_a2 = document.querySelector(buttonSelector)) == null ? void 0 : _a2.remove();
    }
    addInterstitial(options = {}) {
      if (document.querySelector(interstitialSelector)) {
        return;
      }
      const appUrl = this.extensionApi.getURL("interstitial.html");
      const url = new URL(appUrl);
      if (options.query) {
        url.searchParams.set("query", options.query);
      }
      if (options.page) {
        url.searchParams.set("page", options.page);
      }
      if (isIPhone()) {
        const pageViewport = document.querySelector(
          "meta[name='viewport']"
        );
        this.savedViewport = (pageViewport == null ? void 0 : pageViewport.content) || "";
        const viewportOptions = pageViewport == null ? void 0 : pageViewport.content.split(",").filter((item) => !!item);
        viewportOptions.push("maximum-scale=1.0");
        pageViewport.content = viewportOptions.join(",");
      }
      const interstitial = createInterstitial(url.toString());
      document.body.appendChild(interstitial);
    }
    updateInterstitialHeight(height) {
      const iframe = document.querySelector(frameSelector);
      iframe == null ? void 0 : iframe.style.setProperty("height", `${height}px`);
    }
    updateInterstitialStyles(includeBg) {
      if (isIPhone()) {
        const wrapper = document.querySelector(interstitialSelector);
        if (!wrapper) {
          return;
        }
        setStyles(wrapper, includeBg);
      }
    }
    removeInterstitial() {
      var _a2;
      (_a2 = document.querySelector(interstitialSelector)) == null ? void 0 : _a2.remove();
      if (this.savedViewport) {
        const pageViewport = document.querySelector(
          "meta[name='viewport']"
        );
        pageViewport.content = this.savedViewport;
        this.savedViewport = "";
      }
    }
    fillCheckout(cardData = {}) {
      if (!this.found) {
        return {};
      }
      const filler = new CheckoutFiller(this.attrs, cardData);
      const results = filler.fillAllFields();
      return results;
    }
    showCollapsedCard(cardUuid) {
      if (!cardUuid) {
        return false;
      }
      this.addInterstitial({
        page: "card-collapsed",
        query: `uuid=${cardUuid}`
      });
      return true;
    }
  }
  const appExtensionApi = new ExtensionApi("app");
  const hasActivityConsent = async () => {
    if (!isFirefox()) {
      return true;
    }
    const activityConsent = await appExtensionApi.storage.get(ACTIVITY_CONSENT_KEY) || {};
    return !!activityConsent[ACTIVITY_CONSENT_KEY];
  };
  const version = "2.4.6";
  const checkout = new Checkout(window.location.hostname);
  function testSkip(node) {
    return (
      // @ts-ignore
      node.id === "pwp-button" || // @ts-ignore
      node.id === "pwp-interstitial" || node.nodeName === "COM-1PASSWORD-MENU" || node.nodeName === "COM-1PASSWORD-BUTTON"
    );
  }
  const debouncedFindElements = debounce((mutations) => {
    let skip = false;
    mutations == null ? void 0 : mutations.forEach((mutation) => {
      if (mutation.type !== "childList") {
        return;
      }
      if (mutation.addedNodes.length === 1) {
        skip = testSkip(mutation.addedNodes[0]);
      }
      if (mutation.removedNodes.length === 1 && !skip) {
        skip = testSkip(mutation.removedNodes[0]);
      }
    });
    if (skip) {
      return;
    }
    checkout.findElements();
  });
  hasActivityConsent().then((consent) => {
    if (!consent) {
      return;
    }
    const observer = new MutationObserver(debouncedFindElements);
    observer.observe(document.body, {
      // We should not listen to _ALL_ attributes, but only to the ones that
      // are relevant to payments inputs.
      attributeFilter: [
        "aria-disabled",
        "aria-hidden",
        "class",
        "maxlength",
        "name",
        "pattern",
        "placeholder",
        "size",
        "title",
        "type"
      ],
      childList: true,
      characterData: true,
      subtree: true
    });
    debouncedFindElements();
  });
  (_a = document == null ? void 0 : document.querySelector("body")) == null ? void 0 : _a.setAttribute("data-extension-installed", version);
})();
//# sourceMappingURL=content.js.map
