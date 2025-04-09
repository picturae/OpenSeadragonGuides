!function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var i={};t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=3)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.$=OpenSeadragon,t.DIRECTION_HORIZONTAL=Symbol("horizontal"),t.DIRECTION_VERTICAL=Symbol("vertical")},function(e,t,i){"use strict";function n(e,t,i,n,o){var l=n===a.DIRECTION_HORIZONTAL?"horizontal":"vertical",d=r(),u=d.find(function(t){return t.id===e});u?(u.x=t,u.y=i,u.rotation=o):d.push({id:e,x:t,y:i,direction:l,rotation:o}),s(d)}function o(e){s(r().filter(function(t){return t.id!==e}))}function r(){var e=window.sessionStorage.getItem(l);return e?JSON.parse(e):[]}function s(e){window.sessionStorage.setItem(l,JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var a=i(0),l="openseadragon-guides";t.default={addGuide:n,deleteGuide:o,getGuides:r,useStorage:!1}},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){var i=document.createElement("div");switch(i.id="osd-guide-"+t,i.classList.add("osd-guide"),e){case a.DIRECTION_HORIZONTAL:i.classList.add("osd-guide-horizontal");break;case a.DIRECTION_VERTICAL:i.classList.add("osd-guide-vertical");break;default:throw new Error("Invalid guide direction")}return i}function r(){var e=document.createElement("div");return e.classList.add("osd-guide-line"),e}Object.defineProperty(t,"__esModule",{value:!0}),t.Guide=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(0),l=i(1),d=function(e){return e&&e.__esModule?e:{default:e}}(l);t.Guide=function(){function e(t){var i=t.clickHandler,s=t.direction,l=void 0===s?a.DIRECTION_HORIZONTAL:s,d=t.id,u=void 0===d?Date.now():d,h=t.plugin,c=t.rotation,p=void 0===c?0:c,v=t.viewer,g=t.x,f=t.y;n(this,e),this.viewer=v,this.plugin=h,this.direction=l,this.rotation=p,this.id=u,this.point=this.viewer.viewport.getCenter(),this.point.x=g||this.point.x,this.point.y=f||this.point.y,this.elem=o(this.direction,this.id),this.line=r(),this.elem.appendChild(this.line),l===a.DIRECTION_VERTICAL?(this.point.y=-10,this.overlay=new a.$.Overlay({element:this.elem,location:this.point,height:20,width:1e-4})):(this.point.x=-10,this.overlay=new a.$.Overlay({element:this.elem,location:this.point,width:20,height:1e-4})),this.draw(),this.saveInStorage(),i&&this.plugin.allowRotation&&(this.clickHandler=i),this.plugin.allowRotation&&this.rotate(this.rotation),this.addHandlers()}return s(e,[{key:"addHandlers",value:function(){this.tracker=new a.$.MouseTracker({element:this.elem,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,dragHandler:this.dragHandler.bind(this),dragEndHandler:this.dragEndHandler.bind(this),dblClickHandler:this.remove.bind(this)}),this.clickHandler&&(this.tracker.clickHandler=this.clickHandler.bind(this)),this.viewer.addHandler("open",this.draw.bind(this)),this.viewer.addHandler("animation",this.draw.bind(this)),this.viewer.addHandler("resize",this.draw.bind(this)),this.viewer.addHandler("rotate",this.draw.bind(this))}},{key:"dragHandler",value:function(e){var t=this.viewer.viewport.deltaPointsFromPixels(e.delta,!0);switch(this.direction){case a.DIRECTION_HORIZONTAL:this.point.y+=t.y;break;case a.DIRECTION_VERTICAL:this.point.x+=t.x}this.elem.classList.add("osd-guide-drag"),this.draw()}},{key:"dragEndHandler",value:function(){this.elem.classList.remove("osd-guide-drag"),this.saveInStorage()}},{key:"draw",value:function(){return this.point&&(this.overlay.update(this.point),this.overlay.drawHTML(this.viewer.drawer.container,this.viewer.viewport)),this}},{key:"remove",value:function(){return this.viewer.removeHandler("open",this.draw.bind(this)),this.viewer.removeHandler("animation",this.draw.bind(this)),this.viewer.removeHandler("resize",this.draw.bind(this)),this.viewer.removeHandler("rotate",this.draw.bind(this)),this.overlay.destroy(),this.point=null,d.default.deleteGuide(this.id),this.plugin.allowRotation&&this.plugin.closePopup(),this}},{key:"rotate",value:function(e){if(parseFloat(e)){switch(this.direction){case a.DIRECTION_HORIZONTAL:case a.DIRECTION_VERTICAL:this.line.style.webkitTransform="rotateZ("+e+"deg)",this.line.style.transform="rotateZ("+e+"deg)"}this.rotation=e}else this.line.style.webkitTransform="",this.line.style.transform="",this.rotation=0;this.saveInStorage()}},{key:"saveInStorage",value:function(){d.default.useStorage&&d.default.addGuide(this.id,this.point.x,this.point.y,this.direction,this.rotation)}}]),e}()},function(e,t,i){"use strict";var n=i(2),o=i(0),r=i(1),s=function(e){return e&&e.__esModule?e:{default:e}}(r);if(!o.$.version||o.$.version.major<2)throw new Error("This version of OpenSeadragon Guides requires OpenSeadragon version 2.0.0+");o.$.Viewer.prototype.guides=function(e){return this.guidesInstance&&!e||(e=e||{},e.viewer=this,this.guidesInstance=new o.$.Guides(e)),this.guidesInstance},o.$.Guides=function(e){var t=this;o.$.extend(!0,this,{viewer:null,guides:[],allowRotation:!1,horizontalGuideButton:null,verticalGuideButton:null,prefixUrl:null,removeOnClose:!1,useSessionStorage:!1,navImages:{guideHorizontal:{REST:"guidehorizontal_rest.png",GROUP:"guidehorizontal_grouphover.png",HOVER:"guidehorizontal_hover.png",DOWN:"guidehorizontal_pressed.png"},guideVertical:{REST:"guidevertical_rest.png",GROUP:"guidevertical_grouphover.png",HOVER:"guidevertical_hover.png",DOWN:"guidevertical_pressed.png"}}},e),o.$.extend(!0,this.navImages,this.viewer.navImages);var i=this.prefixUrl||this.viewer.prefixUrl||"",r=this.viewer.buttonGroup&&this.viewer.buttonGroup.buttons,a=r?this.viewer.buttons.buttons[0]:null,l=a?a.onFocus:null,d=a?a.onBlur:null;if(this.horizontalGuideButton=new o.$.Button({element:this.horizontalGuideButton?o.$.getElement(this.horizontalGuideButton):null,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,tooltip:o.$.getString("Tooltips.HorizontalGuide")||"Horizontal guide",srcRest:i+this.navImages.guideHorizontal.REST,srcGroup:i+this.navImages.guideHorizontal.GROUP,srcHover:i+this.navImages.guideHorizontal.HOVER,srcDown:i+this.navImages.guideHorizontal.DOWN,onRelease:this.createHorizontalGuide.bind(this),onFocus:l,onBlur:d}),this.verticalGuideButton=new o.$.Button({element:this.verticalGuideButton?o.$.getElement(this.verticalGuideButton):null,clickTimeThreshold:this.viewer.clickTimeThreshold,clickDistThreshold:this.viewer.clickDistThreshold,tooltip:o.$.getString("Tooltips.VerticalGuide")||"vertical guide",srcRest:i+this.navImages.guideVertical.REST,srcGroup:i+this.navImages.guideVertical.GROUP,srcHover:i+this.navImages.guideVertical.HOVER,srcDown:i+this.navImages.guideVertical.DOWN,onRelease:this.createVerticalGuide.bind(this),onFocus:l,onBlur:d}),r&&(this.viewer.buttonGroup.buttons.push(this.horizontalGuideButton),this.viewer.buttonGroup.element.appendChild(this.horizontalGuideButton.element),this.viewer.buttonGroup.buttons.push(this.verticalGuideButton),this.viewer.buttonGroup.element.appendChild(this.verticalGuideButton.element)),s.default.useStorage=this.useSessionStorage,s.default.useStorage){s.default.getGuides().forEach(function(e){var i=new n.Guide({viewer:t.viewer,direction:"horizontal"===e.direction?o.DIRECTION_HORIZONTAL:o.DIRECTION_VERTICAL,rotation:e.rotation,id:e.id,clickHandler:function(){return t.showPopup(i)},plugin:t,x:e.x,y:e.y});t.guides.push(i)})}this.removeOnClose&&this.viewer.addHandler("close",function(){t.guides.forEach(function(e){return e.remove()}),t.guides=[]}),this.allowRotation&&(this.popup=this.createRotationPopup(),this.viewer.addControl(this.popup,{}),this.popup.style.display="none",this.popupInput=this.popup.querySelector("input"))},o.$.extend(o.$.Guides.prototype,{createHorizontalGuide:function(){var e=this,t=new n.Guide({viewer:this.viewer,plugin:this,direction:o.DIRECTION_HORIZONTAL,clickHandler:function(){return e.showPopup(t)}});this.guides.push(t)},createVerticalGuide:function(){var e=this,t=new n.Guide({viewer:this.viewer,plugin:this,direction:o.DIRECTION_VERTICAL,clickHandler:function(){return e.showPopup(t)}});this.guides.push(t)},showPopup:function(e){this.popup.style.display="block",this.selectedGuide=e,this.popupInput.value=this.selectedGuide.rotation},closePopup:function(){this.popup.style.display="none",this.popupInput.value="",this.selectedGuide=null},createRotationPopup:function(){var e=this,t=document.createElement("div");t.id="osd-guide-popup",t.classList.add("osd-guide-popup"),t.style.position="absolute",t.style.bottom="10px",t.style.left="10px";var i=document.createElement("form");i.classList.add("osd-guide-popup-form"),i.style.display="block",i.style.position="relative",i.style.background="#fff",i.style.padding="10px",t.appendChild(i);var n=document.createElement("input");n.type="text",n.style.display="inline-block",n.style.width="50px",n.style.fontSize="14px",i.appendChild(n);var r=document.createElement("button");r.type="submit",r.innerHTML=o.$.getString("Tool.rotate")||"rotate",r.style.fontSize="14px",r.classList.add("osd-guide-rotate-button"),r.addEventListener("click",function(){e.selectedGuide.rotate(n.value),e.closePopup()}),i.appendChild(r);var s=document.createElement("button");return s.innerHTML="&times;",s.title=o.$.getString("Tool.close")||"close",s.style.fontWeight="bold",s.style.fontSize="14px",s.classList.add("osd-guide-close"),s.addEventListener("click",function(){e.closePopup()}),i.appendChild(s),t}})}]);
//# sourceMappingURL=openseadragon-guides.js.map