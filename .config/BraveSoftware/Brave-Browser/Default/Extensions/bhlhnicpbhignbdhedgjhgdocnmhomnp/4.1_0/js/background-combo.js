/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/
void 0!==ColorZilla&&ColorZilla||(ColorZilla={}),function(){var l=ColorZilla;l.czHSVTriple=function(o,e,t){this.h=o,this.s=e,this.v=t,this.toString=function(){return"("+this.h+", "+this.s+", "+this.v+")"}},l.czHSLTriple=function(o,e,t){this.h=o,this.s=e,this.l=t,this.toString=function(){return"("+this.h+", "+this.s+", "+this.l+")"}},l.czRGBTriple=function(o,e,t){this.r=o,this.g=e,this.b=t,this.toString=function(){return"("+this.r+", "+this.g+", "+this.b+")"}},l.czLABTriple=function(o,e,t){this.l=o,this.a=e,this.b=t,this.toString=function(){return"("+this.l+", "+this.a+", "+this.b+")"}},l.czXYZTriple=function(o,e,t){this.x=o,this.y=e,this.z=t,this.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"}},l.czCMYKQuadruple=function(o,e,t,r){this.c=o,this.m=e,this.y=t,this.k=r,this.toString=function(){return"("+this.c+", "+this.m+", "+this.y+", "+this.k+")"}},l.czRGBToColor=function(o,e,t){return o|e<<8|t<<16},l.czGetRValue=function(o){return 255&o},l.czGetGValue=function(o){return o>>8&255},l.czGetBValue=function(o){return o>>16&255},l.czIntToPercent=function(o){return Math.floor(100*o/255+.5)},l.czIntToDegrees=function(o){return Math.floor(360*o/255+.5)},l.czDecimalToHexa=function(o){o=o.toString(16);return o=o.length<2?"0"+o:o},l.czColToRGBPercentageAttribute=function(o){return"rgb("+(l.czIntToPercent(l.czGetRValue(o))+"%, "+l.czIntToPercent(l.czGetGValue(o))+"%, "+l.czIntToPercent(l.czGetBValue(o))+"%")+")"},l.czColToHSLAttribute=function(o){o=l.czRGBToHSL(l.czGetRValue(o),l.czGetGValue(o),l.czGetBValue(o));return"hsl("+(o.h+", "+l.czIntToPercent(o.s)+"%, "+l.czIntToPercent(o.l)+"%")+")"},l.czColToRGBAttribute=function(o){return"rgb("+(l.czGetRValue(o)+", "+l.czGetGValue(o)+", "+l.czGetBValue(o))+")"},l.czColToRGBAAttribute=function(o,e){return"rgba("+(l.czGetRValue(o)+", "+l.czGetGValue(o)+", "+l.czGetBValue(o)+", "+e)+")"},l.czRGBAttributeToCol=function(o){o=(o=(o=o.split("(")[1]).split(")")[0]).split(",");return l.czRGBToColor(o[0],o[1],o[2])},l.czColToRGBHexaAttribute=function(o){o=l.czDecimalToHexa(l.czGetRValue(o))+l.czDecimalToHexa(l.czGetGValue(o))+l.czDecimalToHexa(l.czGetBValue(o));return"#"+(o=l.gbCZLowerCaseHexa?o:o.toUpperCase())},l.czRGBHexaAttributeToCol=function(o){var e=o.substr(1,2),t=o.substr(3,2),o=o.substr(5,2),e=parseInt(e,16),t=parseInt(t,16),o=parseInt(o,16);return l.czRGBToColor(e,t,o)},l.czRGBToGrayscale=function(o,e,t){return.3*o+.59*e+.11*t},l.czColToSpecificColorFormat=function(o,e){var t;switch(e){case"rgb":t=l.czColToRGBAttribute(o);break;case"rgba":t=l.czColToRGBAAttribute(o,1);break;case"rgb-perc":t=l.czColToRGBPercentageAttribute(o);break;case"hsl":t=l.czColToHSLAttribute(o);break;case"hex-no-hash":t=(t=l.czColToRGBHexaAttribute(o)).substring(1);break;default:t=l.czColToRGBHexaAttribute(o)}return t},l.czCSSColToSpecificColorFormat=function(o,e){o="#"==o.substr(0,1)?l.czRGBHexaAttributeToCol(o):l.czRGBAttributeToCol(o);return l.czColToSpecificColorFormat(o,e)},l.czRGBToHSV=function(o,e,t){var r,n=Math.max(o,e,t),a=n-Math.min(o,e,t),c=0==n?0:255*a/n;return 0==c?r=0:o==n?r=60*(e-t)/a:e==n?r=120+60*(t-o)/a:t==n&&(r=240+60*(o-e)/a),r<0&&(r+=360),r=Math.round(255*r/360),c=Math.round(c),new l.czHSVTriple(r,c,n)},l.czRGBToHSL=function(o,e,t){o/=255,e/=255,t/=255;var r,n=Math.max(o,e,t),a=Math.min(o,e,t),c=(n+a)/2;if(n==a)r=s=0;else{var i=n-a,s=i/(.5<c?2-n-a:n+a);switch(n){case o:r=(e-t)/i+(e<t?6:0);break;case e:r=(t-o)/i+2;break;case t:r=(o-e)/i+4}r/=6}return r=Math.round(360*r),s=Math.round(255*s),c=Math.round(255*c),new l.czHSLTriple(r,s,c)},l.czRGBToXYZ=function(o,e,t){function r(o){return.04045<o?Math.pow((o+.055)/1.055,2.4):o/12.92}e/=255,t/=255;var n=.4124*(o=r(o/=255))+.3576*(e=r(e))+.1805*(t=r(t)),a=.2126*o+.7152*e+.0722*t,o=.0193*o+.1192*e+.9505*t;return new l.czXYZTriple(n*=100,a*=100,o*=100)},l.czXYZToRGB=function(o,e,t){function r(o){return.0031308<o?1.055*Math.pow(o,1/2.4)-.055:12.92*o}var n=-.9689*(o/=100)+1.8758*(e/=100)+.0415*(t/=100),a=.0557*o-.204*e+1.057*t;function c(o){return o<0?0:255<o?255:o}return o=r(3.2406*o-1.5372*e-.4986*t),n=r(n),a=r(a),o=c(Math.round(255*o)),n=c(Math.round(255*n)),a=c(Math.round(255*a)),new l.czRGBTriple(o,n,a)},l.czXYZToLAB=function(o,e,t){function r(o){return.00885645<o?Math.pow(o,.3333333333):7.787037037037*o+.13793103448}o=r(o/96.422),e=r(e/100),t=r(t/82.521);return new l.czLABTriple(116*e-16,500*(o-e),200*(e-t))},l.czLABToXYZ=function(o,e,t){function r(o){return 6/29<o?Math.pow(o,3):.128418549*(o-.137931)}o=(o+16)/116,t=o-t/200,e=r(o+e/500),o=r(o),t=r(t);return new l.czXYZTriple(e*=96.422,o*=100,t*=82.521)},l.czRGBToLAB=function(o,e,t){o=l.czRGBToXYZ(o,e,t);return l.czXYZToLAB(o.x,o.y,o.z)},l.czLABToRGB=function(o,e,t){o=l.czLABToXYZ(parseFloat(o),parseFloat(e),parseFloat(t));return l.czXYZToRGB(o.x,o.y,o.z)},l.czHSVToRGB=function(o,e,t){var r,n,a,c,i,s,u;if(0==e)r=n=a=t;else{switch(i=(t/=255)*(1-(e/=255)),s=t*(1-e*(c=(o=359*o/15300)-(o=Math.floor(o)))),u=t*(1-e*(1-c)),o){case 0:r=t,n=u,a=i;break;case 1:r=s,n=t,a=i;break;case 2:r=i,n=t,a=u;break;case 3:r=i,n=s,a=t;break;case 4:r=u,n=i,a=t;break;default:r=t,n=i,a=s}r=Math.round(255*r),n=Math.round(255*n),a=Math.round(255*a)}return new l.czRGBTriple(r,n,a)},l.czRGBToCMYK=function(o,e,t){var o=255-o,e=255-e,t=255-t,r=Math.min(o,Math.min(e,t));return 255==r?o=e=t=0:(o=Math.round((o-r)/(255-r)*255),e=Math.round((e-r)/(255-r)*255),t=Math.round((t-r)/(255-r)*255)),new l.czCMYKQuadruple(o,e,t,r)},l.czCMYKToRGB=function(o,e,t,n){return o=(o/=255)*(1-(n/=255))+n,e=(e/=255)*(1-n)+n,t=(t/=255)*(1-n)+n,r=Math.round(255*(1-o)),g=Math.round(255*(1-e)),b=Math.round(255*(1-t)),new l.czRGBTriple(r,g,b)},l.czGetColorLightness=function(o){var e=l.czGetRValue(o),t=l.czGetGValue(o),o=l.czGetBValue(o);return Math.max(e,t,o)},l.czHexaAttributeToPredefinedColor=function(o){return"#800000"==(o=o.toLowerCase())?"maroon":"#ff0000"==o?"red":"#ffa500"==o?"orange":"#ffff00"==o?"yellow":"#808000"==o?"olive":"#800080"==o?"purple":"#ff00ff"==o?"fuchsia":"#ffffff"==o?"white":"#00ff00"==o?"lime":"#008000"==o?"green":"#000080"==o?"navy":"#0000ff"==o?"blue":"#00ffff"==o?"aqua":"#008080"==o?"teal":"#000000"==o?"black":"#c0c0c0"==o?"silver":"#808080"==o?"gray":null},l.czFixHexValue=function(o){return 7!=o.length||"#"!=o.substr(0,1)?"#000000":o},l.czFixByteValue=function(o){return 255<o?o=255:o<0&&(o=0),o},l.czFix100Value=function(o){return 100<o?o=100:o<0&&(o=0),o},l.czFixLabABValue=function(o){return 127<o?o=127:o<-128&&(o=-128),o},l.czValidateByteValue=function(o){return!(o<0||255<o)},l.czCompareTwoStrings=function(o,e){return o<e?-1:e<o?1:0},l.czClipString=function(o,e){return o&&(o.length>(e=void 0===e?15:e)?o.substr(0,e)+"...":o)},l.czGetColorPalettePermalink=function(o,e,t){for(var r=[],n=0;n<o.length;n++){var a=o[n],a=l.czColToRGBHexaAttribute(a).substring(1);r.push(a)}o=(r=256<r.length?r.slice(0,255):r).join("+");var c="http://colorzilla.com/colors/"+r.join("+"),t=(t&&(64<t.length&&(t=t.substr(0,64)),c+="/"+encodeURIComponent(t)),null);return e&&(t=(t=(t=(t=e).replace(/^https?:\/\//,"")).replace(/\?.*$/,"")).replace(/#.*$/,""),t=encodeURIComponent(t)),t&&c.length+t.length<1900&&(c+="?source-url="+t),c},l.gbCZLowerCaseHexa=!1}();var browser=chrome||browser;let browserPromise="undefined"!=typeof ChromePromise?new ChromePromise:browser;(ColorZilla=void 0!==ColorZilla&&ColorZilla?ColorZilla:{}).BrowserUtils={"openURLInNewTab":function(o){browser.tabs.create({"url":o})},"getLocalizedURL":function(o,e){let t=browser.i18n.getMessage("locale");return t&&"en"!=t?o+"/"+(t=t.trim().toLowerCase().replace(/_/g,"-"))+e:o+e},"getExtensionVersion":function(e){fetch(browser.runtime.getURL("/manifest.json")).then(o=>o.json()).then(o=>{e(o.version)})},"getChromeVersion":function(){var o;return navigator&&(o=navigator.userAgent)&&o.match(/Chrome\/([0-9.]+)/)?RegExp.$1:"-"},"getFirefoxVersion":function(){var o;return navigator&&(o=navigator.userAgent)&&o.match(/Firefox\/([0-9.]+)/)?RegExp.$1:"-"},"getBrowserVersion":function(){switch(this.getBrowser()){case"firefox":return this.getFirefoxVersion();case"chrome":return this.getChromeVersion();default:return"-"}},"getBrowser":function(){var o=navigator.userAgent.toLowerCase();return o?o.match(/chrome/)?"chrome":o.match(/firefox/)?"firefox":void 0:"unknown"},"getPlatform":function(){var o=navigator.userAgent.toLowerCase();return-1!=o.indexOf("mac")?"mac":-1!=o.indexOf("windows")?"windows":-1!=o.indexOf("linux")?"linux":"unknown"},"platformIs":function(o){return this.getPlatform()==o},"platformSupportsNonForegroundHover":function(){return"windows"==this.getPlatform()||"firefox"==this.getBrowser()},"i18nReplace":function(o,e){$(o).html(browser.i18n.getMessage(e))},"copyToClipboard":function(o,e){var t=(e=e||document).getElementById("clipboard-copier");t||((t=e.createElement("textarea")).id="clipboard-copier",t.style="position:absolute;top:0;left:0;overflow:hidden;width:1px;height:1px;opacity:0.01",e.body.appendChild(t)),t.value=o,t.select();try{e.execCommand("copy",!1,null)}catch(o){}},"escapeHTML":function(o){const e={"&":"&amp;",'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;"};return o.replace(/[&"'<>]/g,function(o){return e[o]})}}
/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/,(ColorZilla=void 0!==ColorZilla&&ColorZilla?ColorZilla:{}).ColorHistory={"_historyColors":[],"_maxLength":65,"addColor":function(o){var e;-1!=(e=cz.ColorHistory._historyColors.indexOf(o))&&cz.ColorHistory._historyColors.splice(e,1),cz.ColorHistory._historyColors.unshift(o),cz.ColorHistory._historyColors=cz.ColorHistory._historyColors.slice(0,cz.ColorHistory._maxLength-1),cz.ColorHistory.persist()},"clear":function(){cz.ColorHistory._historyColors=[],cz.ColorHistory.persist()},"get":function(){return cz.ColorHistory._historyColors},"persist":function(){browser.storage.local.set({"color-history":JSON.stringify(cz.ColorHistory._historyColors)}),browserPromise.runtime.sendMessage({"op":"history-persisted"}).catch(o=>{})},"persistEventListener":function(o,e,t){"history-persisted"==o.op&&(cz.ColorHistory.readFromStorage(),t({"res":!0}))},"readFromStorage":async function(){var o=await browserPromise.storage.local.get("color-history");"color-history"in o&&(cz.ColorHistory._historyColors=JSON.parse(o["color-history"]))},"init":async function(){await cz.ColorHistory.readFromStorage(),browser.runtime.onMessage.hasListener(cz.ColorHistory.persistEventListener)||browser.runtime.onMessage.addListener(cz.ColorHistory.persistEventListener)}}
/*!
   This file is part of ColorZilla

   Written by Alex Sirota (alex @ iosart.com)

   Copyright (c) iosart labs llc 2011, All Rights Reserved

   Please do not use without permission
*/;var ColorZilla,browserAction=(browser=chrome||browser).action||browser.browserAction,cz=ColorZilla=void 0!==ColorZilla&&ColorZilla?ColorZilla:{},localStorageData={};let creatingOffscreenDoc,createdOffscreenDoc=!1;cz.Background={"init":async function(){debugTrace("initing background..."),await cz.Background.createOffscreenDocument(),browserPromise.storage.session&&(cz.Background.currentColor=(await browserPromise.storage.session.get({"currentColor":null})).currentColor,cz.Background.lastSampledColor=(await browserPromise.storage.session.get({"lastSampledColor":null})).lastSampledColor),debugTrace("current color "+cz.Background.currentColor),debugTrace("last sampled color "+cz.Background.lastSampledColor),cz.Background.colorWasSampled=!1,cz.Background.cachedScreenshotData=null,cz.Background.cachedZoomRatio=null,cz.Background.currentActionColor=null,cz.Background.currentActionColorBadgeTextSet=!1,await cz.Background.readOptions(),cz.Background.history=cz.ColorHistory,setTimeout(function(){cz.Background.showWelcomePageIfNeeded()},200),setTimeout(function(){cz.Background.injectScriptsIntoExistingTabs()},20);var o=await cz.Background.isDarkMode();cz.Background.initMainIconImageDataAndSetDarkLight(o),debugTrace("done initing background.")},"initMainIconImageDataAndSetDarkLight":function(o){cz.Background.currentColor||browserAction.setBadgeText({"text":null});let e=!!cz.Background.mainIconImageData;cz.Background.initMainIconImageData(o,()=>{!o&&!e&&cz.Background.currentColor||browserAction.setIcon({"imageData":cz.Background.mainIconImageData})})},"createOffscreenDocument":async function(){if(browser.offscreen)try{await cz.Background.setupOffscreenDocument("html/offscreen.html"),createdOffscreenDoc=!0}catch(o){console.warn(o)}else document&&(await new Promise(function(o,e){var t=document.createElement("iframe");t.src="/html/offscreen.html",t.addEventListener("load",()=>{o()}),document.body.appendChild(t)}),createdOffscreenDoc=!0)},"setupOffscreenDocument":async function(o){var e=chrome.runtime.getURL(o);for(const t of await clients.matchAll())if(t.url===e)return;creatingOffscreenDoc?await creatingOffscreenDoc:(await(creatingOffscreenDoc=chrome.offscreen.createDocument({"url":o,"reasons":["LOCAL_STORAGE"],"justification":"access localStorage etc."})),creatingOffscreenDoc=null)},"isDarkMode":async function(){let o=!1;try{var e=await browserPromise.runtime.sendMessage({"op":"get-is-dark-mode"});o=e.darkMode}catch(o){console.warn(o)}return o},"injectScriptsIntoExistingTabs":function(){browser.windows.getAll({"populate":!0},function(o){o.forEach(function(o){o.tabs.forEach(function(o){o&&o.url&&0==o.url.indexOf("http")&&(browser.scripting?browser.scripting.executeScript({"injectImmediately":!0,"target":{"tabId":o.id},"files":["/js/global-shortcut.js"]}):browser.tabs.executeScript(o.id,{"file":"/js/global-shortcut.js"}))})})})},"readOption":async function(o,e){var t;return(o in localStorageData?localStorageData:((t={})[o]=e,await browserPromise.storage.local.get(t)))[o]},"writeOption":async function(o,e){localStorageData[o]=e;var t={};t[o]=e,await browserPromise.storage.local.set(t)},"readOptions":async function(){localStorageData=await browserPromise.storage.local.get(null),await this.parseOptions()},"parseOptions":async function(){cz.Background.options={},cz.Background.options.autostartEyedropper="true"==await cz.Background.readOption("option-autostart-eyedropper-v2","true"),cz.BrowserUtils.platformSupportsNonForegroundHover()||(cz.Background.options.autostartEyedropper=!1),cz.Background.options.showMagnifier="true"==await cz.Background.readOption("option-show-magnifier","true"),cz.Background.options.outlineHovered="true"==await cz.Background.readOption("option-outline-hovered","true"),cz.Background.options.cursorCrosshair="true"==await cz.Background.readOption("option-cursor-crosshair","true"),cz.Background.options.moveDocDownWhenSampling=!("true"==await cz.Background.readOption("option-dont-move-doc-down","false")),cz.Background.options.showStatusPanel=!0,cz.Background.options.samplingMode=await cz.Background.readOption("sampling-mode","1x1"),cz.Background.options.autocopyToClipboard="true"==await cz.Background.readOption("option-autocopy-to-clipboard","true"),cz.Background.options.autocopyShowMessage="true"==await cz.Background.readOption("option-autocopy-show-message","true"),cz.Background.options.autocopyColorFormat=await cz.Background.readOption("option-autocopy-color-format","hex"),cz.Background.options.lowercaseHexa="true"==await cz.Background.readOption("option-lowercase-hexa","false"),cz.gbCZLowerCaseHexa=cz.Background.options.lowercaseHexa,cz.Background.options.keyboardShortCutsEnabled="true"==await cz.Background.readOption("option-keyboard-shortcuts-enabled","false"),cz.Background.options.keyboardShortCutsChar=await cz.Background.readOption("option-keyboard-shortcuts-char","Z"),cz.Background.options.debugModeOn="true"==await cz.Background.readOption("debug","false")},"getVersionNumberFromLocalStorage":async function(){if(createdOffscreenDoc){var o=await browserPromise.storage.local.get("version");if(!o.version){if("undefined"!=typeof localStorage)return localStorage.version;let o;try{var e=await browserPromise.runtime.sendMessage({"op":"get-localstorage-version"});o=e.prevVersion}catch(o){console.warn(o)}return o}}},"showWelcomePageIfNeeded":async function(){let a=await cz.Background.getVersionNumberFromLocalStorage();cz.BrowserUtils.getExtensionVersion(function(n){browser.storage.local.get("version",function(o){var e,t,r,o=o.version||a;n!=o&&(browser.storage.local.set({"version":n}),r=void 0===o?(o="-","new"):"updated",e=cz.BrowserUtils.getBrowser(),t=cz.BrowserUtils.getBrowserVersion(),r=cz.BrowserUtils.getLocalizedURL("https://www.colorzilla.com","/"+e+"/welcome/"+r+"/?"+e+"/"+t+"/"+o+"/"+n),cz.BrowserUtils.openURLInNewTab(r))})})},"setupListeners":function(){browser.runtime.onMessage.addListener(function(e,o,t){let r=!0,n=!1,a=o=>{n||(t(o),n=!0)};if(init().then(()=>{switch(e.op){case"ping-service-worker":a({"pong":"pong"});break;case"already-injected-start-monitor":cz.Background.sendStartMonitoringMessage();break;case"inject-and-start-monitor":cz.Background.injectAndStartMonitoring();break;case"inject-and-analyze-page-colors":cz.Background.injectAndAnalyzePageColors();break;case"options-changed":cz.Background.readOptions();break;case"get-options":a(cz.Background.options);break;case"open-options-dialog":cz.BrowserUtils.openURLInNewTab("/html/options.html");break;case"get-current-color":a({"color":cz.Background.currentColor});break;case"hotkey-pressed":setTimeout(function(){cz.Background.onHotKeyPressed(e.keyCode)},20);break;case"start-monitoring":cz.Background.startMonitoring();break;case"stop-monitoring":cz.Background.stopMonitoring();break;case"resample-last-location":cz.Background.resampleLastLocation();break;case"analyze-page-colors":cz.Background.analyzePageColors();break;case"highlight-elements-by-color":cz.Background.highlightElementsByColor(e.colorRef);break;case"clear-monitoring-highlights":cz.Background.clearMonitoringHighlights();break;case"on-popup-close":cz.Background.onPopupClose();break;case"update-color":cz.Background.updateColor({"color":e.color,"op":e.origOp});break;case"cache-screenshot":cz.Background.takeAndCacheScreenshot();break;case"is-dark-mode-changed":var o=e.darkMode;cz.Background.initMainIconImageDataAndSetDarkLight(o);break;case"offscreen-log":console.log(e.data);break;default:r=!1}r&&a({"res":!0})}),r)return!0}),browser.runtime.onConnect.addListener(async function(o){function e(o){o._timer&&(clearTimeout(o._timer),delete o._timer)}await init(),debugTrace("connecting to port..."),"cz-content"===o.name&&(o.onMessage.addListener(function(o,e){switch(o.op){case"sampling-color":cz.Background.colorWasSampled||cz.Background.updateColor(o);break;case"color-sampled":cz.Background.colorWasSampled=!0,setTimeout(function(){cz.Background.colorWasSampled=!1},2e3),cz.Background.setActiveColor(o);break;case"take-screenshot":cz.Background.takeScreenshot(void 0,!1,o.token);break;case"page-colors-ready":browser.runtime.sendMessage({"op":"populate-page-analyzer-colors","colors":o.colors});break;case"stopped-monitoring":cz.Background.colorWasSampled||cz.Background.lastSampledColor&&cz.Background.setActiveColor({"color":cz.Background.lastSampledColor});break;case"kill-popup":debugTrace("kill-popup message received"),browserPromise.runtime.sendMessage({"op":"close-popup"}).catch(o=>{});break;case"get-zoom-ratio":browser.tabs.getZoom(cz.Background.lastTabId,function(o){cz.Background.sendRequestToTab(cz.Background.lastTabId,{"op":"set-zoom-ratio","zoomRatio":o})});break;case"persist-option":cz.Background.writeOption(o.name,o.value),cz.Background.readOptions()}}),o.onDisconnect.addListener(e),o._timer=setTimeout(function(o){e(o),debugTrace("disconnecting from port..."),o.disconnect()},25e4,o))}),browser.tabs.onActivated.addListener(async function(o){await init(),cz.Background.stopMonitoring()}),browser.tabs.onUpdated.addListener(async function(o,e,t){await init(),0==t.url.indexOf("http")&&"complete"==e.status&&(browser.scripting?browser.scripting.executeScript({"injectImmediately":!0,"target":{"tabId":o},"files":["/js/global-shortcut.js"]}):browser.tabs.executeScript(o,{"file":"/js/global-shortcut.js"}))})},"onPopupClose":function(){setTimeout(function(){cz.Background.highlightElementsByColor(null)},100)},"updateColor":async function(o){var e;try{e=await browserPromise.runtime.sendMessage({"op":"mouse-is-over-popup"})}catch(o){}e&&e.mouseIsOverPopup&&o.op&&"sampling-color"==o.op&&"mouse-move"!=o.sourceEvent?setTimeout(function(){cz.Background.clearMonitoringHighlights()},20):cz.Background.setActiveColor(o)},"setActiveColor":function(o){var e=o.color;"#"!=e.substr(0,1)&&(e=cz.czColToRGBHexaAttribute(cz.czRGBAttributeToCol(e))),cz.Background.currentColor=e,cz.Background.setButtonColor(cz.Background.currentColor),"color-sampled"==o.op&&(cz.Background.lastSampledColor=e,cz.Background.history.addColor(e),browser.storage.session)&&browser.storage.session.set({"lastSampledColor":e}),browser.storage.session&&browser.storage.session.set({"currentColor":e}),browserPromise.runtime.sendMessage({"op":"set-popup-active-color","color":cz.Background.currentColor,"data":o}).catch(o=>{})},"initMainIconImageData":function(o,l){fetch(browser.runtime.getURL(`/images/main-icon-19${o?"-dark":""}.png`)).then(o=>o.blob()).then(o=>{createImageBitmap(o).then(o=>{for(var e=new OffscreenCanvas(19,19).getContext("2d"),t=(e.drawImage(o,0,0),e.getImageData(0,0,19,19)),r=[],n=0;n<t.width;n++)for(var a=0;a<t.height;a++){var c=4*(n+a*t.width),i=t.data[0+c],s=t.data[1+c],u=t.data[2+c];t.data[3+c]<10||i==s&&s==u||(i=cz.czRGBToHSV(i,s,u),r[c]=i)}cz.Background.mainIconImageData=t,cz.Background.mainIconImageHSVData=r,l&&l()})})},"changeMainIconHueSat":function(o,e,t){for(var r=cz.Background.mainIconImageData,n=0;n<r.width;n++)for(var a=0;a<r.height;a++){var c,i=4*(n+a*r.width),s=(r.data[0+i],r.data[1+i],r.data[2+i],r.data[3+i]),u=cz.Background.mainIconImageHSVData[i];void 0!==u&&(c=e<25||t<60?0:u.s,c=cz.czHSVToRGB(o,c,u.v),r.data[0+i]=c.r,r.data[1+i]=c.g,r.data[2+i]=c.b,r.data[3+i]=s)}},"drawBadgeOnMainIcon":function(o,e,t){for(var r=cz.Background.mainIconImageData,n=r.width-6;n<r.width;n++)for(var a=r.height-6;a<r.height;a++){var c=4*(n+a*r.width);r.data[0+c]=o,r.data[1+c]=e,r.data[2+c]=t,r.data[3+c]=255}},"setButtonColor":function(o){var e,t,r,n;o!=cz.Background.currentActionColor&&(r=cz.czRGBHexaAttributeToCol(o),e=cz.czGetRValue(r),t=cz.czGetGValue(r),r=cz.czGetBValue(r),n=cz.czRGBToHSV(e,t,r),"firefox"!=cz.BrowserUtils.getBrowser()?(cz.Background.currentActionColorBadgeTextSet||(browserAction.setBadgeText({"text":"\xb7"}),cz.Background.currentActionColorBadgeTextSet=!0),browserAction.setBadgeBackgroundColor({"color":[e,t,r,255]})):cz.Background.drawBadgeOnMainIcon(e,t,r),cz.Background.changeMainIconHueSat(n.h,n.s,n.v),browserAction.setIcon({"imageData":cz.Background.mainIconImageData}),cz.Background.currentActionColor=o)},"sendRequestToSelectedTab":function(e,t){browser.tabs.query({"active":!0,"currentWindow":!0},function(o){0<o?.length&&(o=o[0],cz.Background.lastTabId=o.id,browser.tabs.sendMessage(o.id,e,{},t))})},"sendRequestToSpecificTab":function(o,e,t){browser.tabs.sendMessage(o,e,null,t)},"sendRequestToTab":function(o,e,t){void 0!==o?cz.Background.sendRequestToSpecificTab(o,e,t):cz.Background.sendRequestToSelectedTab(e,t)},"analyzePageColorsContentScript":function(){var o=chrome||o;"undefined"!=typeof gColorZillaPageManager?gColorZillaPageManager.analyzePageColors():o.runtime.sendMessage({"op":"inject-and-analyze-page-colors"})},"analyzePageColors":function(){browser.tabs.query({"currentWindow":!0,"active":!0},o=>{browser.scripting?browser.scripting.executeScript({"injectImmediately":!0,"target":{"tabId":o[0].id},"func":cz.Background.analyzePageColorsContentScript}):browser.tabs.executeScript(null,{"code":`(${cz.Background.analyzePageColorsContentScript.toString()})()`})})},"startMonitoringContentScript":function(){var o=chrome||o;"undefined"!=typeof gColorZillaPageManager?o.runtime.sendMessage({"op":"already-injected-start-monitor"}):o.runtime.sendMessage({"op":"inject-and-start-monitor"})},"startMonitoring":function(){cz.Background.lastSampledColor=cz.Background.currentColor,browser.tabs.query({"currentWindow":!0,"active":!0},o=>{browser.scripting?browser.scripting.executeScript({"injectImmediately":!0,"target":{"tabId":o[0].id},"func":cz.Background.startMonitoringContentScript}):browser.tabs.executeScript(null,{"code":`(${cz.Background.startMonitoringContentScript.toString()})()`})})},"stopMonitoring":function(){debugTrace("bg.stopMonitoring()"),cz.Background.lastTabId&&cz.Background.sendRequestToTab(cz.Background.lastTabId,{"op":"stop-monitoring"})},"resampleLastLocation":function(){cz.Background.takeScreenshot(function(){cz.Background.sendRequestToSelectedTab({"op":"resample-last-location"})})},"clearMonitoringHighlights":function(){cz.Background.sendRequestToTab(cz.Background.lastTabId,{"op":"clear-monitoring-highlights"})},"highlightElementsByColor":function(o){cz.Background.sendRequestToTab(cz.Background.lastTabId,{"op":"highlight-elements-by-color","colorRef":o})},"injectAndPerformAction":function(e){debugTrace("injecting"),browser.tabs.query({"active":!0,"currentWindow":!0},function(o){o=o[0];browser.scripting?browser.scripting.executeScript({"injectImmediately":!0,"target":{"tabId":o.id},"files":["js/content-script-combo.js"]},e):browser.tabs.executeScript(null,{"file":"js/content-script-combo.js"},e)})},"injectAndStartMonitoring":function(){cz.Background.injectAndPerformAction(()=>cz.Background.sendStartMonitoringMessage())},"injectAndAnalyzePageColors":function(){cz.Background.injectAndPerformAction(function(){cz.Background.sendRequestToSelectedTab({"op":"analyze-page-colors"})})},"prepareMessagesForContentScript":function(){var e={};return["close_and_stop_picking","collapse_this_panel","expand_this_panel","options","color_copied_to_clipboard","point_sample","3x3_average","5x5_average","11x11_average","25x25_average","selection_average","select_area_to_sample","sampling"].forEach(function(o){e[o]=browser.i18n.getMessage(o)}),e},"sendStartMonitoringMessage":function(o){var e=cz.Background.prepareMessagesForContentScript(),e={"op":"start-monitoring","options":cz.Background.options,"messages":e};cz.Background.cachedScreenshotData&&(e.screenshotData=cz.Background.cachedScreenshotData),cz.Background.cachedZoomRatio&&(e.zoomRatio=cz.Background.cachedZoomRatio),cz.Background.sendRequestToSelectedTab(e,o)},"takeAndCacheScreenshot":async function(){cz.Background.cachedZoomRatio=null;try{cz.Background.cachedZoomRatio=await browserPromise.tabs.getZoom()}catch(o){}cz.Background.cachedScreenshotData=null,cz.Background.takeScreenshot(void 0,!0)},"takeScreenshot":function(e,o,t){o=o||!1,!(t=t||{}).type&&o&&(t.type="caching"),browser.tabs.captureVisibleTab(null,{"format":"png","quality":100},function(o){o?(console.log("screenshot ready"),cz.Background.cachedScreenshotData=o,cz.Background.sendRequestToSelectedTab({"op":"screenshot-ready","data":o,"options":cz.Background.options,"token":t}),void 0!==e&&setTimeout(e,100)):console.warn("screenshot capture returned empty data")})},"onHotKeyPressed":function(o){cz.Background.options.keyboardShortCutsEnabled&&o==cz.Background.options.keyboardShortCutsChar.charCodeAt(0)&&cz.Background.startMonitoring()},"debugTrace":function(o){cz.Background.options?.debugModeOn&&console.log(o)}};var debugTrace=cz.Background.debugTrace;async function init(){cz.backgroundWorkerInited||(await cz.ColorHistory.init(),await cz.Background.init(),cz.backgroundWorkerInited=!0)}cz.backgroundWorkerInited=!1,cz.Background.setupListeners(),init();