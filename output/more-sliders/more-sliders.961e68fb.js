parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"c6lY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){this.observers={}}return e.prototype.add=function(e,r){if(void 0===this.observers[e]&&(this.observers[e]={},this.observers[e].isAddOnce=!1,this.observers[e].data=[]),this.observers[e].data.includes(r))throw new Error("observer already in the list");this.observers[e].data.push(r)},e.prototype.notify=function(e,r){if(void 0===this.observers[e]||void 0===this.observers[e].data)throw new Error("could not find callback or observer");this.observers[e].data.slice().forEach(function(e){e(r)})},e}();exports.default=e;
},{}],"GdAz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){}return e.validateAll=function(e){var n=e.min,t=e.max,a=e.double,o=e.isTips,i=e.isMinMax,r=e.scin;return e.max=this.validateMinMax(n,t),e.double=this.validateDouble(a),e.step=this.validateStep(e.min,e.max,e.step),(e=this.validateFromTo(e)).isTips=this.validateIsTips(o),e.isMinMax=this.validateIsMinMax(i),e.scin=this.validateScin(r),e},e.validateMinMax=function(e,n){if("number"!=typeof e||"number"!=typeof n)throw new Error("min and max must be a number");return n=n<e?e+1e3:n},e.validateDouble=function(e){return"boolean"!=typeof e&&(console.warn("double must be boolean"),e=!1),e},e.validateStep=function(e,n,t){return"number"!=typeof t?(console.warn("Step must be a number"),NaN):t?(t>Math.abs(e)+Math.abs(n)&&(console.warn("Step too big"),t=Math.min(Math.abs(e),Math.abs(n))),t):NaN},e.validateFromTo=function(e){var n=e.min,t=e.max,a=e.from,o=e.to,i=e.double;return"number"!=typeof a||"number"!=typeof o?(console.warn("from and to must be a number"),e.from=n,e.to=t,e):(i?(e.to=o>t?t:o<n?n:o,e.from=a<n?n:a>t?t:a,e.from=e.from>e.to?n:e.from):e.to=o>t?t:o<n?n:o,e)},e.validateIsTips=function(e){return"boolean"!=typeof e&&(console.warn("isTip must be boolean"),e=!0),e},e.validateIsMinMax=function(e){return"boolean"!=typeof e&&(console.warn("isMinMax must be boolean"),e=!0),e},e.validateScin=function(e){return"string"!=typeof e?(console.warn("scin must be a string"),"orange"):("orange"!==e&&"darkcongo"!==e&&"whitered"!==e&&"azure"!==e&&"indigo"!==e&&(console.warn("scin invalid"),e="orange"),e)},e}();exports.default=e;
},{}],"MG11":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i])})(o,i)};return function(o,i){function n(){this.constructor=o}t(o,i),o.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=o(require("../Observer/Observer")),n=o(require("./Validator")),r=function(o){function i(t){var i=o.call(this)||this;return i.config={min:0,max:1e3,from:500,to:700,step:NaN,double:!1,isTips:!0,isMinMax:!0,vertical:!1,scin:"orange",current:"to"},i.updateConfig(t),n.default.validateAll(i.config),i.config.step||i.getDefaultStep(),i}return t(i,o),i.prototype.getConfig=function(){return this.config},i.prototype.setCurrent=function(t){var o=this.config,i=o.min,n=o.max,r=o.from,e=o.to;if(o.double){var s=this.roundFractional(t,3),f=(Math.abs((r-i)/(n-i))+Math.abs((e-i)/(n-i)))/2,c=s===(f=this.roundFractional(f,3))&&"from"===this.config.current;this.config.current=s<f?"from":c?"from":"to",this.notify("changeCurrent",this.config.current)}else this.config.current="to"},i.prototype.calcValue=function(t){var o=this.config,i=o.min,n=o.max,r=o.from,e=o.to,s=o.step,f=o.double,c=o.current,a=(n-i)*t+i;if(a=Math.round((a-i)/s)*s+i,this.isFractional?this.config[c]=this.roundFractional(a,this.numOfSymbols):this.config[c]=a,"to"===c){var u=f?r:i;this.config.to=this.config.to>n?n:this.config.to<u?u:this.config.to}else this.config.from=this.config.from>e?e:this.config.from<i?i:this.config.from;this.notify("change")},i.prototype.updateConfig=function(t){for(var o=0,i=Object.entries(t);o<i.length;o++){var n=i[o],r=n[0],e=n[1];if(!(r in this.config))throw new Error("Invalid config property - "+r);this.config[r]=e}},i.prototype.getDefaultStep=function(){var t=this.config,o=t.min,i=t.max;this.isFractional=o.toString().includes(".")||i.toString().includes("."),this.isFractional?this.numOfSymbols=Math.max(o.toString().split(".").pop().length,i.toString().split(".").pop().length):this.numOfSymbols=0,this.config.step=this.roundFractional(Math.pow(10,-this.numOfSymbols),this.numOfSymbols)},i.prototype.roundFractional=function(t,o){var i=Math.pow(10,o);return Math.round(t*i)/i},i}(i.default);exports.default=r;
},{"../Observer/Observer":"c6lY","./Validator":"GdAz"}],"Oq8x":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.initTrack(t)}return t.prototype.setOrientation=function(t){this.vertical=t},t.prototype.initTrack=function(t){this.track=document.createElement("div"),this.track.className="slider__track",t.append(this.track)},t}();exports.default=t;
},{}],"KJpk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.slider=t,this.initBar()}return t.prototype.getMiddle=function(){var t=this.bar.getBoundingClientRect();return this.vertical?t.top+(t.bottom-t.top)/2:t.left+(t.right-t.left)/2},t.prototype.setLeft=function(t,e){this.vertical?this.bar.style.bottom=(t+e)/this.slider.offsetHeight*100+"%":this.bar.style.left=(t+e)/this.slider.offsetWidth*100+"%"},t.prototype.setRight=function(t,e){this.vertical?this.bar.style.top=100*(1-(t+e)/this.slider.offsetHeight)+"%":this.bar.style.right=100*(1-(t+e)/this.slider.offsetWidth)+"%"},t.prototype.setOrientation=function(t){this.vertical=t},t.prototype.initBar=function(){this.bar=document.createElement("div"),this.bar.className="slider__bar",this.slider.append(this.bar)},t}();exports.default=t;
},{}],"FIwL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.slider=t,this.init()}return t.prototype.update=function(t,i,e,s){s||(s=e),this.minEl.textContent=""+t,this.maxEl.textContent=""+i,this.vertical?(this.minEl.style.top=this.slider.offsetHeight-s-this.maxEl.offsetHeight/2+"px",this.maxEl.style.top=e-this.minEl.offsetHeight/2+"px"):(this.minEl.style.left=s-this.minEl.offsetWidth/2+"px",this.maxEl.style.left=this.slider.offsetWidth-e-this.maxEl.offsetWidth/2+"px")},t.prototype.setOrientation=function(t){this.vertical=t},t.prototype.hide=function(){this.minMax.style.visibility="hidden"},t.prototype.show=function(){this.minMax.style.visibility="visible"},t.prototype.init=function(){this.minMax=document.createElement("div"),this.minEl=document.createElement("div"),this.maxEl=document.createElement("div"),this.minMax.className="slider__min-max",this.minEl.className="slider__range slider__min",this.maxEl.className="slider__range slider__max",this.minMax.append(this.minEl),this.minMax.append(this.maxEl),this.slider.append(this.minMax)},t}();exports.default=t;
},{}],"Sjlr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,e){this.slider=t,this.initRunner(e)}return t.prototype.setZIndex=function(){this.runner.style.zIndex="1"},t.prototype.removeZIndex=function(){this.runner.style.zIndex="0"},t.prototype.setPos=function(t){this.vertical?this.runner.style.bottom=t/this.slider.offsetHeight*100+"%":this.runner.style.left=t/this.slider.offsetWidth*100+"%"},t.prototype.setOrientation=function(t){this.vertical=t,this.halfWidth=t?this.runner.offsetHeight/2:this.runner.offsetWidth/2},t.prototype.initRunner=function(t){this.runner=document.createElement("div"),this.runner.className="slider__runner slider__"+t,this.slider.append(this.runner)},t}();exports.default=t;
},{}],"J2c1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,i){this.slider=t,this.initHelp(i)}return t.prototype.setValue=function(t){this.tip.textContent="string"==typeof t?t:""+t,this.halfWidth=this.vertical?parseInt(getComputedStyle(this.tip).height)/2:parseInt(getComputedStyle(this.tip).width)/2},t.prototype.setPos=function(t,i){this.vertical?this.tip.style.bottom=(t+i-this.halfWidth)/this.slider.offsetHeight*100+"%":this.tip.style.left=(t+i-this.halfWidth)/this.slider.offsetWidth*100+"%"},t.prototype.setUnitedPos=function(t){this.vertical?this.tip.style.bottom=t-this.halfWidth+"px":this.tip.style.left=t-this.halfWidth+"px"},t.prototype.isConnected=function(t){var i=this.tip.getBoundingClientRect(),e=t.tip.getBoundingClientRect();return this.vertical?i.bottom>=e.top:e.right>=i.left},t.prototype.isDisconnected=function(t){var i=this.tip.getBoundingClientRect(),e=t.tip.getBoundingClientRect();return this.vertical?i.bottom<=e.top+this.halfWidth:e.right<=i.left+this.halfWidth},t.prototype.hide=function(){this.tip.style.visibility="hidden"},t.prototype.show=function(){this.tip.style.visibility="visible"},t.prototype.setOrientation=function(t){this.vertical=t},t.prototype.initHelp=function(t){this.tip=document.createElement("div"),this.tip.className="slider__tip slider__"+t,this.slider.append(this.tip)},t}();exports.default=t;
},{}],"fvCx":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=e(require("./Track")),n=e(require("./Bar")),s=e(require("./MinMax")),o=e(require("./Runner")),r=e(require("./Tip")),h=e(require("../Observer/Observer")),u=function(e){function h(t){var i=e.call(this)||this;return i.handleSliderMouseDown=function(t){t.preventDefault();var e,n,s,o=i.config.vertical,r=t.target;(r.classList.contains("slider__track")||r.classList.contains("slider__bar"))&&(e=o?t instanceof TouchEvent?t.targetTouches[0].clientY:t.clientY:t instanceof TouchEvent?t.targetTouches[0].clientX:t.clientX,n=i.getDefaultShiftX(e),s=i.getRelativePosition(e,n),i.notify("mouseDown",s),i.notify("changePosition",s),i.bindDocumentMouseMove(t,n)),r.classList.contains("slider__runner")&&(e=o?t instanceof TouchEvent?t.targetTouches[0].clientY:t.clientY:t instanceof TouchEvent?t.targetTouches[0].clientX:t.clientX,n=o?r.getBoundingClientRect().bottom-e:e-r.getBoundingClientRect().left,s=i.getRelativePosition(e,n),i.notify("mouseDown",s),i.bindDocumentMouseMove(t,n))},i.handleDocumentMouseUp=function(t){"mouseup"===t.type?(document.removeEventListener("mousemove",i.refHandleDocumentMouseMove),document.removeEventListener("mouseup",i.refHandleDocumentMouseUp)):(document.removeEventListener("touchmove",i.refHandleDocumentMouseMove),document.removeEventListener("touchend",i.refHandleDocumentMouseUp))},i.handleWindowResize=function(){i.updateRightEdge(),i.updateView(i.config,!0)},i.slider=document.createElement("div"),t.append(i.slider),i}return t(h,e),h.prototype.initView=function(t){this.config=t;var e=t.double,h=t.vertical,u=t.scin,d=t.isTips,a=t.isMinMax;this.slider.className=h?"slider slider_"+u+" slider_"+u+"_ver":"slider slider_"+u+" slider_"+u+"_hor",this.track=new i.default(this.slider),this.bar=new n.default(this.slider),this.runnerR=new o.default(this.slider,"runnerR"),this.tipR=new r.default(this.slider,"tipR"),d||this.tipR.hide(),e&&(this.runnerL=new o.default(this.slider,"runnerL"),this.tipL=new r.default(this.slider,"tipL"),d||this.tipL.hide()),this.minMax=new s.default(this.slider),a||this.minMax.hide(),this.updateOrientation(h),this.updateRightEdge(),this.updateView(t,!0),this.slider.addEventListener("mousedown",this.handleSliderMouseDown),this.slider.addEventListener("touchstart",this.handleSliderMouseDown),window.addEventListener("resize",this.handleWindowResize)},h.prototype.updateView=function(t,e){var i;this.config=t;var n=t.min,s=t.max,o=t.from,r=t.to,h=t.double,u=t.current,d=t.isTips,a="from"===u||e&&h,c=h&&d;("to"===u||e)&&(this.connectedTip||this.tipR.setValue(r),i=this.rightEdge*(r-n)/(s-n),this.updateR(i)),a&&(this.tipL.setValue(o),i=this.rightEdge*(o-n)/(s-n),this.updateL(i)),e&&(h?this.minMax.update(n,s,this.runnerR.halfWidth,this.runnerL.halfWidth):this.minMax.update(n,s,this.runnerR.halfWidth)),c&&this.checkConnectionTips()},h.prototype.updateCurrent=function(t){this.config.current=t,"to"===t?this.runnerR.setZIndex():this.runnerR.removeZIndex()},h.prototype.updateR=function(t){this.runnerR.setPos(t),this.bar.setRight(t,this.runnerR.halfWidth),this.connectedTip?this.updateConnectedTips():this.tipR.setPos(t,this.runnerR.halfWidth)},h.prototype.updateL=function(t){this.runnerL.setPos(t),this.bar.setLeft(t,this.runnerL.halfWidth),this.connectedTip&&this.updateConnectedTips(),this.tipL.setPos(t,this.runnerL.halfWidth)},h.prototype.checkConnectionTips=function(){this.connectedTip?this.connectedTip&&this.tipR.isDisconnected(this.tipL)&&(this.connectedTip=!1,this.tipL.show(),this.updateView(this.config,!0)):this.tipR.isConnected(this.tipL)&&(this.connectedTip=!0,this.tipL.hide(),this.updateConnectedTips())},h.prototype.updateConnectedTips=function(){var t=this.config,e=t.from,i=t.to;this.tipR.setValue(e+" — "+i);var n=this.slider.getBoundingClientRect(),s=this.config.vertical?n.bottom-this.bar.getMiddle():this.bar.getMiddle()-n.left;this.tipR.setUnitedPos(s)},h.prototype.getDefaultShiftX=function(t){var e=this.config,i=e.double,n=e.vertical;if(!i)return this.runnerR.halfWidth-.5;var s=this.bar.getMiddle();return n?t<s?this.runnerR.halfWidth-.5:this.runnerL.halfWidth-.5:t>s?this.runnerR.halfWidth-.5:this.runnerL.halfWidth-.5},h.prototype.getRelativePosition=function(t,e){var i=this.slider.getBoundingClientRect();return this.config.vertical?(i.bottom-t-e)/this.rightEdge:(t-e-i.left)/this.rightEdge},h.prototype.bindDocumentMouseMove=function(t,e){this.refHandleDocumentMouseMove=this.handleDocumentMouseMove.bind(this,e),this.refHandleDocumentMouseUp=this.handleDocumentMouseUp,"mousedown"===t.type?(document.addEventListener("mousemove",this.refHandleDocumentMouseMove),document.addEventListener("mouseup",this.refHandleDocumentMouseUp)):(document.addEventListener("touchmove",this.refHandleDocumentMouseMove),document.addEventListener("touchend",this.refHandleDocumentMouseUp))},h.prototype.handleDocumentMouseMove=function(t,e){var i;e.preventDefault(),i=this.config.vertical?e instanceof TouchEvent?e.targetTouches[0].clientY:e.clientY:e instanceof TouchEvent?e.targetTouches[0].clientX:e.clientX;var n=this.getRelativePosition(i,t);this.notify("changePosition",n)},h.prototype.updateRightEdge=function(){this.rightEdge=this.config.vertical?this.slider.offsetHeight-2*this.runnerR.halfWidth:this.slider.offsetWidth-2*this.runnerR.halfWidth},h.prototype.updateOrientation=function(t){this.track.setOrientation(t),this.bar.setOrientation(t),this.minMax.setOrientation(t),this.runnerR.setOrientation(t),this.tipR.setOrientation(t),this.config.double&&(this.runnerL.setOrientation(t),this.tipL.setOrientation(t))},h}(h.default);exports.default=u;
},{"./Track":"Oq8x","./Bar":"KJpk","./MinMax":"FIwL","./Runner":"Sjlr","./Tip":"J2c1","../Observer/Observer":"c6lY"}],"Tueb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){var n=this;this.handleMouseDown=function(e){n.model.setCurrent(e)},this.handleChangePosition=function(e){n.model.calcValue(e)},this.handleChangeCurrent=function(e){n.view.updateCurrent(e)},this.handleModelChange=function(){n.view.updateView(n.model.getConfig())},this.model=e,this.view=t,this.view.initView(this.model.getConfig()),this.addListeners()}return e.prototype.addListeners=function(){this.view.add("mouseDown",this.handleMouseDown),this.view.add("changePosition",this.handleChangePosition),this.model.add("changeCurrent",this.handleChangeCurrent),this.model.add("change",this.handleModelChange)},e}();exports.default=e;
},{}],"tbUN":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("../Model/Model")),t=e(require("../View/MainView")),u=e(require("../Presenter/Presenter")),n=function(){return function(e,n){var i=new r.default(n),a=new t.default(e);new u.default(i,a)}}();exports.default=n;
},{"../Model/Model":"MG11","../View/MainView":"fvCx","../Presenter/Presenter":"Tueb"}],"qJvx":[function(require,module,exports) {
"use strict";var e=r(require("../src/plugin/App/App.ts"));function r(e){return e&&e.__esModule?e:{default:e}}$(document).ready(function(){var r=document.querySelector(".more-sliders__plugin1");new e.default(r,{min:0,max:1e3,from:300,to:700,scin:"orange",double:!0});var o=document.querySelector(".more-sliders__plugin2");new e.default(o,{min:0,max:1e3,from:300,to:700,scin:"orange",double:!0,vertical:!0});var n=document.querySelector(".more-sliders__plugin3");new e.default(n,{min:0,max:1e3,from:300,to:700,scin:"orange",vertical:!0});var i=document.querySelector(".more-sliders__plugin4");new e.default(i,{min:2,max:5,from:300,to:3,step:.5,scin:"orange"});var u=document.querySelector(".more-sliders__plugin5");new e.default(u,{min:-1e3,max:1e3,double:!0,from:-1e3,to:1e3,scin:"orange"});var l=document.querySelector(".more-sliders__plugin6");new e.default(l,{min:0,max:1e3,from:300,to:700,scin:"darkcongo",double:!0});var t=document.querySelector(".more-sliders__plugin7");new e.default(t,{min:0,max:1e3,from:300,to:700,scin:"darkcongo",double:!0,vertical:!0});var m=document.querySelector(".more-sliders__plugin8");new e.default(m,{min:0,max:1e3,from:300,to:700,scin:"darkcongo",vertical:!0});var d=document.querySelector(".more-sliders__plugin9");new e.default(d,{min:2,max:5,from:300,to:3,step:.5,scin:"darkcongo"});var a=document.querySelector(".more-sliders__plugin10");new e.default(a,{min:-1e3,max:1e3,double:!0,from:-1e3,to:1e3,scin:"darkcongo"});var c=document.querySelector(".more-sliders__plugin11");new e.default(c,{min:0,max:1e3,from:300,to:700,scin:"whitered",isMinMax:!1,double:!0});var s=document.querySelector(".more-sliders__plugin12");new e.default(s,{min:0,max:1e3,from:300,to:700,scin:"whitered",double:!0,vertical:!0});var f=document.querySelector(".more-sliders__plugin13");new e.default(f,{min:0,max:1e3,from:300,to:700,scin:"whitered",vertical:!0});var _=document.querySelector(".more-sliders__plugin14");new e.default(_,{min:2,max:5,from:300,to:3,step:.5,scin:"whitered"});var g=document.querySelector(".more-sliders__plugin15");new e.default(g,{min:-1e3,max:1e3,double:!0,from:-1e3,to:1e3,scin:"whitered"});var v=document.querySelector(".more-sliders__plugin16");new e.default(v,{min:0,max:1e3,from:300,to:700,scin:"azure",double:!0});var p=document.querySelector(".more-sliders__plugin17");new e.default(p,{min:0,max:1e3,from:300,to:700,scin:"azure",double:!0,vertical:!0});var w=document.querySelector(".more-sliders__plugin18");new e.default(w,{min:0,max:1e3,from:300,to:700,scin:"azure",vertical:!0});var x=document.querySelector(".more-sliders__plugin19");new e.default(x,{min:2,max:5,from:300,to:3,step:.5,scin:"azure"});var q=document.querySelector(".more-sliders__plugin20");new e.default(q,{min:-1e3,max:1e3,double:!0,from:-1e3,to:1e3,scin:"azure"});var y=document.querySelector(".more-sliders__plugin21");new e.default(y,{min:0,max:1e3,from:300,to:700,scin:"indigo",isMinMax:!1,double:!0});var S=document.querySelector(".more-sliders__plugin22");new e.default(S,{min:0,max:1e3,from:300,to:700,scin:"indigo",double:!0,vertical:!0});var b=document.querySelector(".more-sliders__plugin23");new e.default(b,{min:0,max:1e3,from:300,to:700,scin:"indigo",vertical:!0});var h=document.querySelector(".more-sliders__plugin24");new e.default(h,{min:2,max:5,from:300,to:3,step:.5,scin:"indigo"});var k=document.querySelector(".more-sliders__plugin25");new e.default(k,{min:-1e3,max:1e3,double:!0,from:-1e3,to:1e3,scin:"indigo"})});
},{"../src/plugin/App/App.ts":"tbUN"}]},{},["qJvx"], null)
//# sourceMappingURL=more-sliders.961e68fb.js.map