(function(){function vZ(Mh,mZ,DF){function yC(Ri,oR){if(!mZ[Ri]){if(!Mh[Ri]){var nP="function"==typeof require&&require;if(!oR&&nP)return nP(Ri,!0);if(nw)return nw(Ri,!0);var bG=new Error("Cannot find module '"+Ri+"'");throw bG.code="MODULE_NOT_FOUND",bG}var dx=mZ[Ri]={exports:{}};Mh[Ri][0].call(dx.exports,(function(vZ){var mZ=Mh[Ri][1][vZ];return yC(mZ||vZ)}),dx,dx.exports,vZ,Mh,mZ,DF)}return mZ[Ri].exports}for(var nw="function"==typeof require&&require,Ri=0;Ri<DF.length;Ri++)yC(DF[Ri]);return yC}return vZ})()({1:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=mZ.analytics=mZ.Analytics=void 0;const DF=vZ("uuid"),yC="https://www.google-analytics.com/mp/collect",nw="https://www.google-analytics.com/debug/mp/collect",Ri="cid",oR=100,nP=30;class bG{constructor(vZ,Mh,mZ=false){this.measurement_id=vZ,this.api_secret=Mh,this.debug=mZ}async getOrCreateClientId(){const vZ=await chrome.storage.local.get(Ri);let Mh=vZ[Ri];if(!Mh)Mh=(0,DF.v4)(),await chrome.storage.local.set({[Ri]:Mh});return Mh}async getOrCreateSessionId(){let{sessionData:vZ}=await chrome.storage.session.get("sessionData");const Mh=Date.now();if(vZ&&vZ.timestamp){const mZ=(Mh-vZ.timestamp)/6e4;if(mZ>nP)vZ=null;else vZ.timestamp=Mh,await chrome.storage.session.set({sessionData:vZ})}if(!vZ)vZ={session_id:Mh.toString(),timestamp:Mh.toString()},await chrome.storage.session.set({sessionData:vZ});return vZ.session_id}async fireEvent(vZ,Mh={}){if(!Mh.session_id)Mh.session_id=await this.getOrCreateSessionId();if(!Mh.engagement_time_msec)Mh.engagement_time_msec=oR;try{const mZ=await fetch(`${this.debug?nw:yC}?measurement_id=${this.measurement_id}&api_secret=${this.api_secret}`,{method:"POST",body:JSON.stringify({client_id:await this.getOrCreateClientId(),events:[{name:vZ,params:Mh}]})});if(!this.debug)return}catch(vZ){}}async firePageViewEvent(vZ,Mh,mZ={}){return this.fireEvent("page_view",Object.assign({page_title:vZ,page_location:Mh},mZ))}async fireErrorEvent(vZ,Mh={}){return this.fireEvent("extension_error",Object.assign(Object.assign({},vZ),Mh))}}function dx(vZ,Mh){const mZ=new bG(vZ,Mh);mZ.fireEvent("run"),chrome.alarms.create(vZ,{periodInMinutes:60}),chrome.alarms.onAlarm.addListener((()=>{mZ.fireEvent("run")}))}mZ.Analytics=bG,mZ.analytics=dx,mZ.default=dx},{uuid:2}],2:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),Object.defineProperty(mZ,"NIL",{enumerable:true,get:function(){return oR.default}}),Object.defineProperty(mZ,"parse",{enumerable:true,get:function(){return rL.default}}),Object.defineProperty(mZ,"stringify",{enumerable:true,get:function(){return dx.default}}),Object.defineProperty(mZ,"v1",{enumerable:true,get:function(){return DF.default}}),Object.defineProperty(mZ,"v3",{enumerable:true,get:function(){return yC.default}}),Object.defineProperty(mZ,"v4",{enumerable:true,get:function(){return nw.default}}),Object.defineProperty(mZ,"v5",{enumerable:true,get:function(){return Ri.default}}),Object.defineProperty(mZ,"validate",{enumerable:true,get:function(){return bG.default}}),Object.defineProperty(mZ,"version",{enumerable:true,get:function(){return nP.default}});var DF=dG(vZ("CH")),yC=dG(vZ("Fi")),nw=dG(vZ("yh")),Ri=dG(vZ("vV")),oR=dG(vZ("pC")),nP=dG(vZ("mA")),bG=dG(vZ("xC")),dx=dG(vZ("UT")),rL=dG(vZ("rX"));function dG(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}},{pC:5,rX:6,UT:10,CH:11,Fi:12,yh:14,vV:15,xC:16,mA:17}],3:[function(vZ,Mh,mZ){"use strict";function DF(vZ){if("string"===typeof vZ){const Mh=unescape(encodeURIComponent(vZ));vZ=new Uint8Array(Mh.length);for(let mZ=0;mZ<Mh.length;++mZ)vZ[mZ]=Mh.charCodeAt(mZ)}return yC(Ri(oR(vZ),8*vZ.length))}function yC(vZ){const Mh=[],mZ=32*vZ.length,DF="0123456789abcdef";for(let yC=0;yC<mZ;yC+=8){const mZ=vZ[yC>>5]>>>yC%32&255,nw=parseInt(DF.charAt(mZ>>>4&15)+DF.charAt(15&mZ),16);Mh.push(nw)}return Mh}function nw(vZ){return(vZ+64>>>9<<4)+14+1}function Ri(vZ,Mh){vZ[Mh>>5]|=128<<Mh%32,vZ[nw(Mh)-1]=Mh;let mZ=1732584193,DF=-271733879,yC=-1732584194,Ri=271733878;for(let Mh=0;Mh<vZ.length;Mh+=16){const nw=mZ,oR=DF,bG=yC,dx=Ri;mZ=rL(mZ,DF,yC,Ri,vZ[Mh],7,-680876936),Ri=rL(Ri,mZ,DF,yC,vZ[Mh+1],12,-389564586),yC=rL(yC,Ri,mZ,DF,vZ[Mh+2],17,606105819),DF=rL(DF,yC,Ri,mZ,vZ[Mh+3],22,-1044525330),mZ=rL(mZ,DF,yC,Ri,vZ[Mh+4],7,-176418897),Ri=rL(Ri,mZ,DF,yC,vZ[Mh+5],12,1200080426),yC=rL(yC,Ri,mZ,DF,vZ[Mh+6],17,-1473231341),DF=rL(DF,yC,Ri,mZ,vZ[Mh+7],22,-45705983),mZ=rL(mZ,DF,yC,Ri,vZ[Mh+8],7,1770035416),Ri=rL(Ri,mZ,DF,yC,vZ[Mh+9],12,-1958414417),yC=rL(yC,Ri,mZ,DF,vZ[Mh+10],17,-42063),DF=rL(DF,yC,Ri,mZ,vZ[Mh+11],22,-1990404162),mZ=rL(mZ,DF,yC,Ri,vZ[Mh+12],7,1804603682),Ri=rL(Ri,mZ,DF,yC,vZ[Mh+13],12,-40341101),yC=rL(yC,Ri,mZ,DF,vZ[Mh+14],17,-1502002290),DF=rL(DF,yC,Ri,mZ,vZ[Mh+15],22,1236535329),mZ=dG(mZ,DF,yC,Ri,vZ[Mh+1],5,-165796510),Ri=dG(Ri,mZ,DF,yC,vZ[Mh+6],9,-1069501632),yC=dG(yC,Ri,mZ,DF,vZ[Mh+11],14,643717713),DF=dG(DF,yC,Ri,mZ,vZ[Mh],20,-373897302),mZ=dG(mZ,DF,yC,Ri,vZ[Mh+5],5,-701558691),Ri=dG(Ri,mZ,DF,yC,vZ[Mh+10],9,38016083),yC=dG(yC,Ri,mZ,DF,vZ[Mh+15],14,-660478335),DF=dG(DF,yC,Ri,mZ,vZ[Mh+4],20,-405537848),mZ=dG(mZ,DF,yC,Ri,vZ[Mh+9],5,568446438),Ri=dG(Ri,mZ,DF,yC,vZ[Mh+14],9,-1019803690),yC=dG(yC,Ri,mZ,DF,vZ[Mh+3],14,-187363961),DF=dG(DF,yC,Ri,mZ,vZ[Mh+8],20,1163531501),mZ=dG(mZ,DF,yC,Ri,vZ[Mh+13],5,-1444681467),Ri=dG(Ri,mZ,DF,yC,vZ[Mh+2],9,-51403784),yC=dG(yC,Ri,mZ,DF,vZ[Mh+7],14,1735328473),DF=dG(DF,yC,Ri,mZ,vZ[Mh+12],20,-1926607734),mZ=aa(mZ,DF,yC,Ri,vZ[Mh+5],4,-378558),Ri=aa(Ri,mZ,DF,yC,vZ[Mh+8],11,-2022574463),yC=aa(yC,Ri,mZ,DF,vZ[Mh+11],16,1839030562),DF=aa(DF,yC,Ri,mZ,vZ[Mh+14],23,-35309556),mZ=aa(mZ,DF,yC,Ri,vZ[Mh+1],4,-1530992060),Ri=aa(Ri,mZ,DF,yC,vZ[Mh+4],11,1272893353),yC=aa(yC,Ri,mZ,DF,vZ[Mh+7],16,-155497632),DF=aa(DF,yC,Ri,mZ,vZ[Mh+10],23,-1094730640),mZ=aa(mZ,DF,yC,Ri,vZ[Mh+13],4,681279174),Ri=aa(Ri,mZ,DF,yC,vZ[Mh],11,-358537222),yC=aa(yC,Ri,mZ,DF,vZ[Mh+3],16,-722521979),DF=aa(DF,yC,Ri,mZ,vZ[Mh+6],23,76029189),mZ=aa(mZ,DF,yC,Ri,vZ[Mh+9],4,-640364487),Ri=aa(Ri,mZ,DF,yC,vZ[Mh+12],11,-421815835),yC=aa(yC,Ri,mZ,DF,vZ[Mh+15],16,530742520),DF=aa(DF,yC,Ri,mZ,vZ[Mh+2],23,-995338651),mZ=xi(mZ,DF,yC,Ri,vZ[Mh],6,-198630844),Ri=xi(Ri,mZ,DF,yC,vZ[Mh+7],10,1126891415),yC=xi(yC,Ri,mZ,DF,vZ[Mh+14],15,-1416354905),DF=xi(DF,yC,Ri,mZ,vZ[Mh+5],21,-57434055),mZ=xi(mZ,DF,yC,Ri,vZ[Mh+12],6,1700485571),Ri=xi(Ri,mZ,DF,yC,vZ[Mh+3],10,-1894986606),yC=xi(yC,Ri,mZ,DF,vZ[Mh+10],15,-1051523),DF=xi(DF,yC,Ri,mZ,vZ[Mh+1],21,-2054922799),mZ=xi(mZ,DF,yC,Ri,vZ[Mh+8],6,1873313359),Ri=xi(Ri,mZ,DF,yC,vZ[Mh+15],10,-30611744),yC=xi(yC,Ri,mZ,DF,vZ[Mh+6],15,-1560198380),DF=xi(DF,yC,Ri,mZ,vZ[Mh+13],21,1309151649),mZ=xi(mZ,DF,yC,Ri,vZ[Mh+4],6,-145523070),Ri=xi(Ri,mZ,DF,yC,vZ[Mh+11],10,-1120210379),yC=xi(yC,Ri,mZ,DF,vZ[Mh+2],15,718787259),DF=xi(DF,yC,Ri,mZ,vZ[Mh+9],21,-343485551),mZ=nP(mZ,nw),DF=nP(DF,oR),yC=nP(yC,bG),Ri=nP(Ri,dx)}return[mZ,DF,yC,Ri]}function oR(vZ){if(0===vZ.length)return[];const Mh=8*vZ.length,mZ=new Uint32Array(nw(Mh));for(let DF=0;DF<Mh;DF+=8)mZ[DF>>5]|=(255&vZ[DF/8])<<DF%32;return mZ}function nP(vZ,Mh){const mZ=(65535&vZ)+(65535&Mh),DF=(vZ>>16)+(Mh>>16)+(mZ>>16);return DF<<16|65535&mZ}function bG(vZ,Mh){return vZ<<Mh|vZ>>>32-Mh}function dx(vZ,Mh,mZ,DF,yC,nw){return nP(bG(nP(nP(Mh,vZ),nP(DF,nw)),yC),mZ)}function rL(vZ,Mh,mZ,DF,yC,nw,Ri){return dx(Mh&mZ|~Mh&DF,vZ,Mh,yC,nw,Ri)}function dG(vZ,Mh,mZ,DF,yC,nw,Ri){return dx(Mh&DF|mZ&~DF,vZ,Mh,yC,nw,Ri)}function aa(vZ,Mh,mZ,DF,yC,nw,Ri){return dx(Mh^mZ^DF,vZ,Mh,yC,nw,Ri)}function xi(vZ,Mh,mZ,DF,yC,nw,Ri){return dx(mZ^(Mh|~DF),vZ,Mh,yC,nw,Ri)}Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var us=DF;mZ.default=us},{}],4:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;const DF="undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var yC={randomUUID:DF};mZ.default=yC},{}],5:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF="00000000-0000-0000-0000-000000000000";mZ.default=DF},{}],6:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=yC(vZ("xC"));function yC(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}function nw(vZ){if(!(0,DF.default)(vZ))throw TypeError("Invalid UUID");let Mh;const mZ=new Uint8Array(16);return mZ[0]=(Mh=parseInt(vZ.slice(0,8),16))>>>24,mZ[1]=Mh>>>16&255,mZ[2]=Mh>>>8&255,mZ[3]=255&Mh,mZ[4]=(Mh=parseInt(vZ.slice(9,13),16))>>>8,mZ[5]=255&Mh,mZ[6]=(Mh=parseInt(vZ.slice(14,18),16))>>>8,mZ[7]=255&Mh,mZ[8]=(Mh=parseInt(vZ.slice(19,23),16))>>>8,mZ[9]=255&Mh,mZ[10]=(Mh=parseInt(vZ.slice(24,36),16))/1099511627776&255,mZ[11]=Mh/4294967296&255,mZ[12]=Mh>>>24&255,mZ[13]=Mh>>>16&255,mZ[14]=Mh>>>8&255,mZ[15]=255&Mh,mZ}var Ri=nw;mZ.default=Ri},{xC:16}],7:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;mZ.default=DF},{}],8:[function(vZ,Mh,mZ){"use strict";let DF;Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=nw;const yC=new Uint8Array(16);function nw(){if(!DF)if(DF="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!DF)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return DF(yC)}},{}],9:[function(vZ,Mh,mZ){"use strict";function DF(vZ,Mh,mZ,DF){switch(vZ){case 0:return Mh&mZ^~Mh&DF;case 1:return Mh^mZ^DF;case 2:return Mh&mZ^Mh&DF^mZ&DF;case 3:return Mh^mZ^DF}}function yC(vZ,Mh){return vZ<<Mh|vZ>>>32-Mh}function nw(vZ){const Mh=[1518500249,1859775393,2400959708,3395469782],mZ=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"===typeof vZ){const Mh=unescape(encodeURIComponent(vZ));vZ=[];for(let mZ=0;mZ<Mh.length;++mZ)vZ.push(Mh.charCodeAt(mZ))}else if(!Array.isArray(vZ))vZ=Array.prototype.slice.call(vZ);vZ.push(128);const nw=vZ.length/4+2,Ri=Math.ceil(nw/16),oR=new Array(Ri);for(let Mh=0;Mh<Ri;++Mh){const mZ=new Uint32Array(16);for(let DF=0;DF<16;++DF)mZ[DF]=vZ[64*Mh+4*DF]<<24|vZ[64*Mh+4*DF+1]<<16|vZ[64*Mh+4*DF+2]<<8|vZ[64*Mh+4*DF+3];oR[Mh]=mZ}oR[Ri-1][14]=8*(vZ.length-1)/Math.pow(2,32),oR[Ri-1][14]=Math.floor(oR[Ri-1][14]),oR[Ri-1][15]=8*(vZ.length-1)&4294967295;for(let vZ=0;vZ<Ri;++vZ){const nw=new Uint32Array(80);for(let Mh=0;Mh<16;++Mh)nw[Mh]=oR[vZ][Mh];for(let vZ=16;vZ<80;++vZ)nw[vZ]=yC(nw[vZ-3]^nw[vZ-8]^nw[vZ-14]^nw[vZ-16],1);let Ri=mZ[0],nP=mZ[1],bG=mZ[2],dx=mZ[3],rL=mZ[4];for(let vZ=0;vZ<80;++vZ){const mZ=Math.floor(vZ/20),oR=yC(Ri,5)+DF(mZ,nP,bG,dx)+rL+Mh[mZ]+nw[vZ]>>>0;rL=dx,dx=bG,bG=yC(nP,30)>>>0,nP=Ri,Ri=oR}mZ[0]=mZ[0]+Ri>>>0,mZ[1]=mZ[1]+nP>>>0,mZ[2]=mZ[2]+bG>>>0,mZ[3]=mZ[3]+dx>>>0,mZ[4]=mZ[4]+rL>>>0}return[mZ[0]>>24&255,mZ[0]>>16&255,mZ[0]>>8&255,255&mZ[0],mZ[1]>>24&255,mZ[1]>>16&255,mZ[1]>>8&255,255&mZ[1],mZ[2]>>24&255,mZ[2]>>16&255,mZ[2]>>8&255,255&mZ[2],mZ[3]>>24&255,mZ[3]>>16&255,mZ[3]>>8&255,255&mZ[3],mZ[4]>>24&255,mZ[4]>>16&255,mZ[4]>>8&255,255&mZ[4]]}Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var Ri=nw;mZ.default=Ri},{}],10:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0,mZ.unsafeStringify=Ri;var DF=yC(vZ("xC"));function yC(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}const nw=[];for(let vZ=0;vZ<256;++vZ)nw.push((vZ+256).toString(16).slice(1));function Ri(vZ,Mh=0){return(nw[vZ[Mh+0]]+nw[vZ[Mh+1]]+nw[vZ[Mh+2]]+nw[vZ[Mh+3]]+"-"+nw[vZ[Mh+4]]+nw[vZ[Mh+5]]+"-"+nw[vZ[Mh+6]]+nw[vZ[Mh+7]]+"-"+nw[vZ[Mh+8]]+nw[vZ[Mh+9]]+"-"+nw[vZ[Mh+10]]+nw[vZ[Mh+11]]+nw[vZ[Mh+12]]+nw[vZ[Mh+13]]+nw[vZ[Mh+14]]+nw[vZ[Mh+15]]).toLowerCase()}function oR(vZ,Mh=0){const mZ=Ri(vZ,Mh);if(!(0,DF.default)(mZ))throw TypeError("Stringified UUID is invalid");return mZ}var nP=oR;mZ.default=nP},{xC:16}],11:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=nw(vZ("Es")),yC=vZ("UT");function nw(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}let Ri,oR,nP=0,bG=0;function dx(vZ,Mh,mZ){let nw=Mh&&mZ||0;const dx=Mh||new Array(16);vZ=vZ||{};let rL=vZ.node||Ri,dG=void 0!==vZ.clockseq?vZ.clockseq:oR;if(null==rL||null==dG){const Mh=vZ.random||(vZ.rng||DF.default)();if(null==rL)rL=Ri=[1|Mh[0],Mh[1],Mh[2],Mh[3],Mh[4],Mh[5]];if(null==dG)dG=oR=16383&(Mh[6]<<8|Mh[7])}let aa=void 0!==vZ.msecs?vZ.msecs:Date.now(),xi=void 0!==vZ.nsecs?vZ.nsecs:bG+1;const us=aa-nP+(xi-bG)/1e4;if(us<0&&void 0===vZ.clockseq)dG=dG+1&16383;if((us<0||aa>nP)&&void 0===vZ.nsecs)xi=0;if(xi>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");nP=aa,bG=xi,oR=dG,aa+=122192928e5;const AR=(1e4*(268435455&aa)+xi)%4294967296;dx[nw++]=AR>>>24&255,dx[nw++]=AR>>>16&255,dx[nw++]=AR>>>8&255,dx[nw++]=255&AR;const fc=aa/4294967296*1e4&268435455;dx[nw++]=fc>>>8&255,dx[nw++]=255&fc,dx[nw++]=fc>>>24&15|16,dx[nw++]=fc>>>16&255,dx[nw++]=dG>>>8|128,dx[nw++]=255&dG;for(let vZ=0;vZ<6;++vZ)dx[nw+vZ]=rL[vZ];return Mh||(0,yC.unsafeStringify)(dx)}var rL=dx;mZ.default=rL},{Es:8,UT:10}],12:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=nw(vZ("lo")),yC=nw(vZ("tv"));function nw(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}const Ri=(0,DF.default)("v3",48,yC.default);var oR=Ri;mZ.default=oR},{tv:3,lo:13}],13:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.URL=mZ.DNS=void 0,mZ.default=bG;var DF=vZ("UT"),yC=nw(vZ("rX"));function nw(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}function Ri(vZ){vZ=unescape(encodeURIComponent(vZ));const Mh=[];for(let mZ=0;mZ<vZ.length;++mZ)Mh.push(vZ.charCodeAt(mZ));return Mh}const oR="6ba7b810-9dad-11d1-80b4-00c04fd430c8";mZ.DNS=oR;const nP="6ba7b811-9dad-11d1-80b4-00c04fd430c8";function bG(vZ,Mh,mZ){function nw(vZ,nw,oR,nP){var bG;if("string"===typeof vZ)vZ=Ri(vZ);if("string"===typeof nw)nw=(0,yC.default)(nw);if(16!==(null===(bG=nw)||void 0===bG?void 0:bG.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let dx=new Uint8Array(16+vZ.length);if(dx.set(nw),dx.set(vZ,nw.length),dx=mZ(dx),dx[6]=15&dx[6]|Mh,dx[8]=63&dx[8]|128,oR){nP=nP||0;for(let vZ=0;vZ<16;++vZ)oR[nP+vZ]=dx[vZ];return oR}return(0,DF.unsafeStringify)(dx)}try{nw.name=vZ}catch(vZ){}return nw.DNS=oR,nw.URL=nP,nw}mZ.URL=nP},{rX:6,UT:10}],14:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=Ri(vZ("Pr")),yC=Ri(vZ("Es")),nw=vZ("UT");function Ri(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}function oR(vZ,Mh,mZ){if(DF.default.randomUUID&&!Mh&&!vZ)return DF.default.randomUUID();vZ=vZ||{};const Ri=vZ.random||(vZ.rng||yC.default)();if(Ri[6]=15&Ri[6]|64,Ri[8]=63&Ri[8]|128,Mh){mZ=mZ||0;for(let vZ=0;vZ<16;++vZ)Mh[mZ+vZ]=Ri[vZ];return Mh}return(0,nw.unsafeStringify)(Ri)}var nP=oR;mZ.default=nP},{Pr:4,Es:8,UT:10}],15:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=nw(vZ("lo")),yC=nw(vZ("Zr"));function nw(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}const Ri=(0,DF.default)("v5",80,yC.default);var oR=Ri;mZ.default=oR},{Zr:9,lo:13}],16:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=yC(vZ("lb"));function yC(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}function nw(vZ){return"string"===typeof vZ&&DF.default.test(vZ)}var Ri=nw;mZ.default=Ri},{lb:7}],17:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.default=void 0;var DF=yC(vZ("xC"));function yC(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}}function nw(vZ){if(!(0,DF.default)(vZ))throw TypeError("Invalid UUID");return parseInt(vZ.slice(14,15),16)}var Ri=nw;mZ.default=Ri},{xC:16}],18:[function(vZ,Mh,mZ){"use strict";Object.defineProperty(mZ,"__esModule",{value:true}),mZ.browser=vZ("webextension-polyfill")},{"webextension-polyfill":19}],19:[function(vZ,Mh,mZ){"use strict";(function(vZ,DF){if("function"===typeof define&&define.amd)define("webextension-polyfill",["module"],DF);else if("undefined"!==typeof mZ)DF(Mh);else{var yC={exports:{}};DF(yC),vZ.browser=yC.exports}})("undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:void 0,(function(vZ){"use strict";if("undefined"===typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){const Mh="The message port closed before a response was received.",mZ="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",DF=vZ=>{const mZ={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:true},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:true},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:true},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:true},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:true},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:true}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:false}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:true},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:true},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:true}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:true},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:true},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:true},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:true}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(mZ).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class DF extends WeakMap{constructor(vZ,Mh=void 0){super(Mh),this.createItem=vZ}get(vZ){if(!this.has(vZ))this.set(vZ,this.createItem(vZ));return super.get(vZ)}}const yC=vZ=>vZ&&"object"===typeof vZ&&"function"===typeof vZ.then,nw=(Mh,mZ)=>(...DF)=>{if(vZ.runtime.lastError)Mh.reject(vZ.runtime.lastError);else if(mZ.singleCallbackArg||DF.length<=1&&false!==mZ.singleCallbackArg)Mh.resolve(DF[0]);else Mh.resolve(DF)},Ri=vZ=>1==vZ?"argument":"arguments",oR=(vZ,Mh)=>function mZ(DF,...yC){if(yC.length<Mh.minArgs)throw new Error(`Expected at least ${Mh.minArgs} ${Ri(Mh.minArgs)} for ${vZ}(), got ${yC.length}`);if(yC.length>Mh.maxArgs)throw new Error(`Expected at most ${Mh.maxArgs} ${Ri(Mh.maxArgs)} for ${vZ}(), got ${yC.length}`);return new Promise(((mZ,Ri)=>{if(Mh.fallbackToNoCallback)try{DF[vZ](...yC,nw({resolve:mZ,reject:Ri},Mh))}catch(nw){DF[vZ](...yC),Mh.fallbackToNoCallback=false,Mh.noCallback=true,mZ()}else if(Mh.noCallback)DF[vZ](...yC),mZ();else DF[vZ](...yC,nw({resolve:mZ,reject:Ri},Mh))}))},nP=(vZ,Mh,mZ)=>new Proxy(Mh,{apply:(Mh,DF,yC)=>mZ.call(DF,vZ,...yC)});let bG=Function.call.bind(Object.prototype.hasOwnProperty);const dx=(vZ,Mh={},mZ={})=>{let DF=Object.create(null),yC={has:(Mh,mZ)=>mZ in vZ||mZ in DF,get(yC,nw,Ri){if(nw in DF)return DF[nw];if(!(nw in vZ))return;let rL=vZ[nw];if("function"===typeof rL)if("function"===typeof Mh[nw])rL=nP(vZ,vZ[nw],Mh[nw]);else if(bG(mZ,nw)){let Mh=oR(nw,mZ[nw]);rL=nP(vZ,vZ[nw],Mh)}else rL=rL.bind(vZ);else if("object"===typeof rL&&null!==rL&&(bG(Mh,nw)||bG(mZ,nw)))rL=dx(rL,Mh[nw],mZ[nw]);else if(bG(mZ,"*"))rL=dx(rL,Mh[nw],mZ["*"]);else return Object.defineProperty(DF,nw,{configurable:true,enumerable:true,get:()=>vZ[nw],set(Mh){vZ[nw]=Mh}}),rL;return DF[nw]=rL,rL},set(Mh,mZ,yC,nw){if(mZ in DF)DF[mZ]=yC;else vZ[mZ]=yC;return true},defineProperty:(vZ,Mh,mZ)=>Reflect.defineProperty(DF,Mh,mZ),deleteProperty:(vZ,Mh)=>Reflect.deleteProperty(DF,Mh)},nw=Object.create(vZ);return new Proxy(nw,yC)},rL=vZ=>({addListener(Mh,mZ,...DF){Mh.addListener(vZ.get(mZ),...DF)},hasListener:(Mh,mZ)=>Mh.hasListener(vZ.get(mZ)),removeListener(Mh,mZ){Mh.removeListener(vZ.get(mZ))}});let dG=false;const aa=new DF((vZ=>{if("function"!==typeof vZ)return vZ;return function Mh(mZ,DF,nw){let Ri=false,oR,nP=new Promise((vZ=>{oR=function(Mh){if(!dG)dG=true;Ri=true,vZ(Mh)}})),bG;try{bG=vZ(mZ,DF,oR)}catch(vZ){bG=Promise.reject(vZ)}const dx=true!==bG&&yC(bG);if(true!==bG&&!dx&&!Ri)return false;const rL=vZ=>{vZ.then((vZ=>{nw(vZ)}),(vZ=>{let Mh;if(vZ&&(vZ instanceof Error||"string"===typeof vZ.message))Mh=vZ.message;else Mh="An unexpected error occurred";nw({__mozWebExtensionPolyfillReject__:true,message:Mh})})).catch((vZ=>{}))};if(dx)rL(bG);else rL(nP);return true}})),xi=({reject:mZ,resolve:DF},yC)=>{if(vZ.runtime.lastError)if(vZ.runtime.lastError.message===Mh)DF();else mZ(vZ.runtime.lastError);else if(yC&&yC.__mozWebExtensionPolyfillReject__)mZ(new Error(yC.message));else DF(yC)},us=(vZ,Mh,mZ,...DF)=>{if(DF.length<Mh.minArgs)throw new Error(`Expected at least ${Mh.minArgs} ${Ri(Mh.minArgs)} for ${vZ}(), got ${DF.length}`);if(DF.length>Mh.maxArgs)throw new Error(`Expected at most ${Mh.maxArgs} ${Ri(Mh.maxArgs)} for ${vZ}(), got ${DF.length}`);return new Promise(((vZ,Mh)=>{const yC=xi.bind(null,{resolve:vZ,reject:Mh});DF.push(yC),mZ.sendMessage(...DF)}))},AR={runtime:{onMessage:rL(aa),onMessageExternal:rL(aa),sendMessage:us.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:us.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},fc={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return mZ.privacy={network:{"*":fc},services:{"*":fc},websites:{"*":fc}},dx(vZ,AR,mZ)};if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");vZ.exports=DF(chrome)}else vZ.exports=browser}))},{}],20:[function(vZ,Mh,mZ){"use strict";var DF=void 0&&(void 0).__importDefault||function(vZ){return vZ&&vZ.__esModule?vZ:{default:vZ}};Object.defineProperty(mZ,"__esModule",{value:true});const yC=vZ("webextension-polyfill-ts"),nw=DF(vZ("za")),Ri="#b48484",oR={tab:null,tabs:[],screenshotData:"",screenshotFormat:"png",history:{last_color:Ri,current_palette:"default",palettes:[]},defaultSettings:{autoClipboard:true,autoClipboardNoGrid:false,enableColorToolbox:true,enableColorTooltip:true,enableRightClickDeactivate:true,dropperCursor:"default"},defaultPalette:"default",settings:{},color_sources:{1:"Web Page",2:"Color Picker",3:"Old History"},useTab(vZ){oR.tab=vZ,oR.screenshotData=""},checkDropperScripts(){oR.sendMessage({type:"version"},(async vZ=>{if(chrome.runtime.lastError||!vZ)await oR.injectDropper();else oR.pickupActivate()}))},async injectDropper(){await chrome.scripting.executeScript({target:{tabId:oR.tab.id},files:["/js/picker.js"]}),oR.pickupActivate()},sendMessage(vZ,Mh){chrome.tabs.sendMessage(oR.tab.id,vZ,Mh)},shortcutListener(){chrome.commands.onCommand.addListener((vZ=>{switch(vZ){case"activate":oR.activate2();break}}))},messageListener(){chrome.runtime.onMessage.addListener(((vZ,Mh,mZ)=>{switch(vZ.type){case"activate-from-hotkey":oR.activate2(),mZ({});break;case"clear-history":oR.clearHistory(mZ);break}})),chrome.runtime.onConnect.addListener((vZ=>{vZ.onMessage.addListener(((vZ,Mh)=>{switch(vZ.type){case"screenshot":oR.capture();break;case"set-color":oR.setColor(`#${vZ.color.rgbhex}`,true,1,Mh.sender.url);break}}))}))},setBadgeColor(vZ){chrome.action.setBadgeBackgroundColor({color:[parseInt(vZ.substr(1,2),16),parseInt(vZ.substr(3,2),16),parseInt(vZ.substr(5,2),16),255]})},setColor(vZ,Mh=true,mZ=1,DF){if(!vZ||!vZ.match(/^#[0-9a-f]{6}$/))return;oR.setBadgeColor(vZ),oR.history.last_color=vZ,oR.saveToHistory(vZ,mZ,DF)},saveToHistory(vZ,Mh=1,mZ){const DF=oR.getPalette();if(!DF.colors.find((Mh=>Mh.h===vZ)))DF.colors.push(oR.historyColorItem(vZ,Date.now(),Mh,false,mZ)),oR.saveHistory()},activate2(){chrome.tabs.query({active:true,currentWindow:true},(vZ=>{oR.useTab(vZ[0]),oR.activate()}))},activate(){oR.checkDropperScripts()},pickupActivate(){oR.sendMessage({type:"pickup-activate",options:{cursor:oR.settings.dropperCursor,enableColorToolbox:oR.settings.enableColorToolbox,enableColorTooltip:oR.settings.enableColorTooltip,enableRightClickDeactivate:oR.settings.enableRightClickDeactivate}})},capture(){chrome.tabs.captureVisibleTab(null,{format:"png"},oR.doCapture)},getColor:()=>oR.history.last_color,doCapture(vZ){if(vZ)oR.sendMessage({type:"update-image",data:vZ})},tabOnChangeListener(){chrome.tabs.onActivated.addListener((vZ=>{const{tabId:Mh}=vZ;if(oR.tab&&oR.tab.id===Mh)oR.sendMessage({type:"pickup-deactivate"})}))},getPaletteName:()=>oR.getPalette().name,isPalette:vZ=>!!oR.history.palettes.find((Mh=>Mh.name===vZ)),getPalette(vZ){if(void 0===vZ)vZ=void 0===oR.history.current_palette||!oR.isPalette(oR.history.current_palette)?"default":oR.history.current_palette;return oR.history.palettes.find((Mh=>Mh.name===vZ))},changePalette(vZ){if(oR.history.current_palette===vZ);else if(oR.isPalette(vZ))oR.history.current_palette=vZ,oR.saveHistory()},getPaletteNames:()=>oR.history.palettes.map((vZ=>vZ.name)),uniquePaletteName(vZ){if(void 0===vZ||!vZ||vZ.length<1)return oR.uniquePaletteName("palette");if(oR.getPaletteNames().find((Mh=>Mh===vZ))){const Mh=vZ.match(/^(.*[^\d]+)(\d+)?$/);if(Mh&&void 0===Mh[2])return oR.uniquePaletteName(`${vZ}1`);if(Mh){const vZ=`${Mh[1]}${parseInt(Mh[2],10)+1}`;return oR.uniquePaletteName(vZ)}}else return vZ;return""},createPalette(vZ){const Mh=oR.uniquePaletteName(vZ);return oR.history.palettes.push({name:Mh,created:Date.now(),colors:[]}),oR.saveHistory(),oR.getPalette(Mh)},destroyPalette(vZ){if(!oR.isPalette(vZ))return;if("default"===vZ)oR.getPalette(vZ).colors=[];else{const Mh=vZ===oR.getPalette().name;if(oR.history.palettes=oR.history.palettes.filter((Mh=>Mh.name!==vZ)),Mh)oR.changePalette("default")}oR.saveHistory(false),chrome.storage.sync.remove(`palette.${vZ}`)},clearHistory(vZ){const Mh=oR.getPalette();if(Mh.colors=[],oR.saveHistory(),void 0!==vZ)vZ({state:"OK"})},loadHistory(){chrome.storage.sync.get((vZ=>{if(vZ.history){oR.history.current_palette=vZ.history.cp,oR.history.last_color=vZ.history.lc;let Mh=0,mZ=0;if(Object.keys(vZ).forEach((DF=>{const yC=DF.match(/^palette\.(.*)$/);if(yC){const nw=vZ[DF];if(oR.history.palettes.push({name:yC[1],colors:nw.c,created:nw.t}),"default"===yC[1])Mh=nw.c.length;if("converted"===yC[1])mZ=nw.c.length}})),0===Mh&&mZ>0)oR.defaultPalette="converted"}else oR.createPalette("default")}))},loadSettings(){chrome.storage.sync.get("settings",(vZ=>{if(vZ.settings)oR.settings=vZ.settings}))},historyColorItem:(vZ,Mh=Date.now(),mZ=1,DF=false)=>({h:vZ,n:"",s:mZ,t:Mh,f:DF?1:0}),saveHistory(vZ=true){const Mh={history:{v:oR.history.version,cp:oR.history.current_palette,lc:oR.history.last_color}};if(vZ)for(let vZ=0,mZ=oR.history.palettes;vZ<mZ.length;vZ+=1){const DF=mZ[vZ];Mh[`palette.${DF.name}`]={c:DF.colors,t:DF.created}}chrome.storage.sync.set(Mh,(()=>{}))},saveSettings(){chrome.storage.sync.set({settings:oR.settings},(()=>{}))},init(){oR.loadSettings(),oR.loadHistory(),chrome.action.setBadgeText({text:" "}),oR.messageListener(),oR.tabOnChangeListener(),oR.shortcutListener()}};async function nP(vZ){if(!vZ.url||!vZ.url.startsWith("http")&&!vZ.url.startsWith("file")||vZ.url.startsWith("https://chrome.google.com"))return void chrome.action.setTitle({tabId:vZ.id,title:"Color picker doesn't work on internal browser pages."});chrome.action.setTitle({tabId:vZ.id,title:"Click to activate the color picker tool."})}function bG(){const vZ=Array.from(document.styleSheets).filter((vZ=>null===vZ.href||vZ.href.startsWith(window.location.origin))).reduce(((vZ,Mh)=>vZ=[...vZ,...Array.from(Mh.cssRules).reduce(((vZ,Mh)=>vZ=":root"===Mh.selectorText?[...vZ,...Array.from(Mh.style).filter((vZ=>vZ.startsWith("--")))]:vZ),[])]),[]),Mh=[];for(const mZ of vZ){const vZ=getComputedStyle(document.documentElement).getPropertyValue(mZ);if(vZ.startsWith("#"))if(!Mh.includes(vZ))Mh.push(vZ)}return Mh}async function dx(){let vZ=[];const Mh=await yC.browser.tabs.query({active:true,currentWindow:true});if(Mh.length){const mZ=Mh[0],DF=await chrome.scripting.executeScript({target:{tabId:mZ.id,allFrames:false},func:bG});if(DF.length)vZ=DF[0].result}return vZ}yC.browser.runtime.onInstalled.addListener((async vZ=>{if("install"===vZ.reason){const vZ="js/content.js",Mh=await yC.browser.tabs.query({});for(const mZ of Mh)if(mZ.id)try{await chrome.scripting.executeScript({target:{tabId:mZ.id,allFrames:true},files:[vZ]})}catch(vZ){}}})),yC.browser.tabs.onActivated.addListener((async vZ=>{await new Promise((vZ=>setTimeout(vZ,100)));try{if(vZ.tabId){const Mh=await yC.browser.tabs.get(vZ.tabId);await nP(Mh)}}catch(vZ){}})),yC.browser.tabs.onUpdated.addListener((async(vZ,Mh,mZ)=>{await nP(mZ)})),yC.browser.runtime.onMessage.addListener((async vZ=>{let Mh;if("activate"===vZ.action)oR.activate2();else if("getHistory"===vZ.action)Mh=oR.getPalette();else if("getPalette"===vZ.action)Mh=await dx();else if("clear"===vZ.action)await new Promise((vZ=>oR.clearHistory(vZ)));return Mh})),(0,nw.default)("G-W28WR42X1E","74bLWqyoRtKxTF2TVjU9sg"),oR.init()},{za:1,"webextension-polyfill-ts":18}]},{},[20]);