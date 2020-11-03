(this["webpackJsonpam-newsletter"]=this["webpackJsonpam-newsletter"]||[]).push([[0],{33:function(e,t,n){e.exports=n(42)},37:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(28),o=n.n(c),i=n(2),u=(n(37),n(6)),l=n(12),s=n(8),f=n(19),m=n(9),d=n(3),p=n(15),b=function(e){var t=e.radius,n=e.sphereState,c=e.setSphereState,o=e.breakPoint,i=e.setEmailVisible,u=e.setColorShowActive,b=e.setInstructionsState,h=Object(r.useRef)(null),g=Object(l.f)(),E=g.camera,v=g.size,O=Object(r.useRef)(1.7),j=[0,0,0],y=[0,-v.height/9,626],x=Object(r.useRef)(null);Object(l.e)((function(){if(h.current)return h.current.rotation.y=h.current.rotation.y+.003}));var w=Object(r.useCallback)((function(){return n.mountAnimating||n.hold?y:j}),[j,n,y]),S=Object(r.useCallback)((function(){h.current.position.z>=o?c((function(e){return{hold:!0,direction:"forwards",mountAnimating:e.mountAnimating}})):c((function(e){return{hold:!1,direction:"backwards",mountAnimating:e.mountAnimating}}))}),[c,o,n]),F=Object(r.useMemo)((function(){for(var e=[],n=0;n<1600;n++){var r=d.MathUtils.randFloatSpread(360),a=d.MathUtils.randFloatSpread(360),c=t*Math.sin(r)*Math.cos(a),o=t*Math.sin(r)*Math.sin(a),i=t*Math.cos(r);e.push([c,o,i])}return e.map((function(e){return Object(f.a)(d.Vector3,Object(m.a)(e))}))}),[t]),M=Object(p.b)({config:{mass:1.8,tension:84,friction:22,clamp:!0},pointsPosition:w(),opacity:n.mountAnimating?0:1,onFrame:function(e){h.current.position.z>0&&h.current.position.z<20?"backwards"===n.direction?b((function(e){return Object(s.a)(Object(s.a)({},e),{},{visible:!0})})):b((function(e){return Object(s.a)(Object(s.a)({},e),{},{visible:!1})})):h.current.position.z>20&&h.current.position.z<50&&("backwards"===n.direction?i((function(){return!0})):i((function(){return!1})))},onRest:function(e){y.every((function(e,t){if(!n.mountAnimating){if(0===t)return h.current.position.x===e;if(1===t)return h.current.position.y===e;if(2===t)return h.current.position.z===e}return!1}))&&"forwards"===n.direction&&(u((function(e){return e||!0})),c((function(e){return Object(s.a)(Object(s.a)({},e),{},{direction:"backwards"})})))}});return Object(r.useEffect)((function(){v.height&&E&&(h.current.material.size=O.current/Math.tan(Math.PI/180*E.fov/2),E.lookAt(0,-v.height/6.5,0))}),[v,E]),Object(r.useEffect)((function(){c((function(e){return e.mountAnimating?Object(s.a)(Object(s.a)({},e),{},{mountAnimating:!1}):e}))}),[c]),a.a.createElement("group",null,a.a.createElement(p.a.mesh,{rotation:[-Math.PI/2,0,0],ref:x,onPointerDown:function(){return c((function(e){return{hold:!0,direction:"forwards",mountAnimating:e.mountAnimating}}))},onPointerUp:function(){return S()},position:M.circlePosition},a.a.createElement("sphereBufferGeometry",{attach:"geometry",args:[130,32,32,0,2*Math.PI,0,.7*Math.PI]}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0,side:d.DoubleSide})),a.a.createElement(p.a.points,{ref:h,position:M.pointsPosition},a.a.createElement("geometry",{attach:"geometry",vertices:F}),a.a.createElement(p.a.pointsMaterial,{attach:"material",color:new d.Color(13383628),size:1.7,opacity:M.opacity})))},h=function(e){var t=e.chapterIndex,n=e.colorShowActive,c=e.setColorShowActive,o=e.setChapterIndex,u=e.setSphereState,l=e.darkMode,f=Object(r.useRef)(null),m=Object(r.useState)(!1),d=Object(i.a)(m,2),p=d[0],b=d[1],h=Object(r.useState)(!1),g=Object(i.a)(h,2),E=g[0],v=g[1],O=Object(r.useState)(!1),j=Object(i.a)(O,2),y=j[0],x=j[1],w=Object(r.useState)({xStart:null,yStart:null,yTravel:null,xTravel:null}),S=Object(i.a)(w,2),F=S[0],M=S[1],C=Object(r.useRef)({lightMode:["#E4F0FA","#D64773","#CBCBCB","#000000"],darkMode:["#000000","#D64773","#E4F0FA","#F9FAFC"]}),k=Object(r.useRef)({lightMode:["#6E81A0","#FFFFFF","#D64773","#CBCBCB"],darkMode:["#6E81A0","#000000","#D64773","#009CDF"]}),A=Object(r.useState)(C.current.lightMode[t]),D=Object(i.a)(A,2),L=D[0],B=D[1],R=Object(r.useState)(k.current.lightMode[t]),T=Object(i.a)(R,2),N=T[0],I=T[1],P=function(){if(f.current){for(var e=-1,t=f.current.children,n=0;n<t.length;n++)if(!t[n].classList.contains("out-down")&&!t[n].classList.contains("out-up")){e=n;break}return e}return-1},z=function(){b((function(e){return f.current?f.current.clientHeight===window.innerHeight:e}))};return Object(r.useEffect)((function(){t>=0&&n&&y&&(b((function(e){return f.current?f.current.clientHeight===window.innerHeight:e})),P()<t?function(){if(f.current){var e=P();if(e>=0&&e<f.current.children.length-2){v((function(){return!0}));var n=f.current.children[e],r=n.children[n.children.length-1].children[0],a=f.current.children[t],c=a.children[a.children.length-1].children[0];r.addEventListener("transitionend",(function e(){a.classList.remove("out-down"),B((function(e){return l?C.current.darkMode[t]:C.current.lightMode[t]})),I((function(){return l?k.current.darkMode[t]:k.current.lightMode[t]})),r.removeEventListener("transitionend",e)}));c.addEventListener("transitionend",(function e(){v((function(){return!1})),c.removeEventListener("transitionend",e)})),n.classList.add("out-up")}}}():P()>t&&function(){if(f.current){var e=P();if(e>0){v((function(){return!0}));var n=f.current.children[e],r=n.children[n.children.length-1].children[0],a=f.current.children[t],c=a.children[a.children.length-1].children[0];r.addEventListener("transitionend",(function e(){a.classList.remove("out-up"),B((function(e){return l?C.current.darkMode[t]:C.current.lightMode[t]})),I((function(){return l?k.current.darkMode[t]:k.current.lightMode[t]})),r.removeEventListener("transitionend",e)}));c.addEventListener("transitionend",(function e(){v((function(){return!1})),c.removeEventListener("transitionend",e)})),n.classList.add("out-down")}}}())}),[t,n,y,l]),Object(r.useEffect)((function(){l&&!y?B((function(){return C.current.darkMode[0]})):l||y||B((function(){return C.current.lightMode[0]}))}),[l,y]),Object(r.useEffect)((function(){return window.addEventListener("resize",z),function(){return window.removeEventListener("resize",z)}}),[]),Object(r.useEffect)((function(){n&&!y?(console.log("init"),f.current&&(f.current.classList.add("active"),f.current.children[0].classList.remove("out-down"),x((function(){return!0})))):!n&&y&&function(){if(f.current){v((function(){return!0}));var e=P(),t=f.current.children[e],n=t.children[t.children.length-1].children[0];f.current.addEventListener("transitionend",(function e(){f.current&&(u((function(e){return{hold:!1,direction:"backwards",mountAnimating:e.mountAnimating}})),setTimeout((function(){if(f.current){for(var e=0;e<f.current.children.length-1;e++)f.current.children[e].classList.remove("out-up"),f.current.children[e].classList.add("out-down");o((function(){return 0})),B((function(e){return l?C.current.darkMode[0]:C.current.lightMode[0]})),I((function(){return l?k.current.darkMode[0]:k.current.lightMode[0]})),b((function(){return!1})),x((function(){return!1}))}}),1e3),f.current.removeEventListener("transitionend",e))}));n.addEventListener("transitionend",(function e(){f.current&&(v((function(){return!1})),f.current.classList.remove("active"),n.removeEventListener("transitionend",e))})),0===e?t.classList.add("out-down"):t.classList.add("out-up")}}()}),[n,y,u,o,l]),Object(r.useEffect)((function(){F.yTravel>0&&F.yTravel>=100?(o((function(e){if(f.current){if(e<f.current.children.length-2&&!E)return e+1;e===f.current.children.length-2&&c((function(){return!1}))}return e})),M((function(){return{xTravel:null,yTravel:null,xStart:null,yStart:null}}))):F.yTravel<0&&F.yTravel<=-100&&(o((function(e){if(f.current&&!E){if(e>0)return e-1;0===e&&c((function(){return!1}))}return e})),M((function(){return{xTravel:null,yTravel:null,xStart:null,yStart:null}})))}),[F,o,E,c]),a.a.createElement("div",{className:"ColorShow grid",ref:f,onTouchStart:function(e){return function(e){var t=e.touches[0],n=t.clientY,r=t.clientX;M((function(e){var t={xStart:r,yStart:n};return Object(s.a)(Object(s.a)({},e),t)}))}(e)},onTouchMove:function(e){return function(e){var t=e.touches[0],n=t.clientY,r=t.clientX;M((function(e){var t=e.yStart?e.yStart-n:null,a=e.xStart?r-e.xStart:null;return Object(s.a)(Object(s.a)({},e),{},{yTravel:t,xTravel:a})}))}(e)},onTouchEnd:function(){M((function(){return{xTravel:null,yTravel:null,xStart:null,yStart:null}}))},style:{background:L,touchAction:p?"none":"auto"}},a.a.createElement("div",{className:"ColorShowText out-down",style:{color:l?"#E066DB":"#334669"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"The most dangerous phrase"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"in language is 'It's always"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.1s"}},a.a.createElement("h4",null,"been done that way'\""))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.15s"}},a.a.createElement("p",{style:{color:l?"#FFFFFF":"#334669"}},"Admiral Grace Hopper")))),a.a.createElement("div",{className:"ColorShowText out-down",style:{color:l?"#000000":"#FFFFFF"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"Andy Mag is an experiential"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"magazine that enables"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.1s"}},a.a.createElement("h4",null,"readers to interact (engage)"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.15s"}},a.a.createElement("h4",null,"with diverse themes and "))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.2s"}},a.a.createElement("h4",null,"ideas.")))),a.a.createElement("div",{className:"ColorShowText out-down",style:{color:"#D64773"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"Because a great story is"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"worth remembering.")))),a.a.createElement("div",{className:"ColorShowText out-down",style:{color:l?"#009CDF":"#CBCBCB"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"Subscribe to Andy Mag for"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"updates.")))),a.a.createElement("div",{className:"Arrows",style:{opacity:n?1:0}},a.a.createElement("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.3691 6.74592C11.757 6.35382 11.7536 5.72383 11.3615 5.33594L6.74686 0.770747C6.35477 0.382855 5.72478 0.386251 5.33688 0.778347L0.771692 5.39302C0.3838 5.78512 0.387195 6.41511 0.779292 6.803C1.17139 7.19089 1.80138 7.1875 2.18927 6.7954L6.0583 2.89449L9.95916 6.75352C10.3513 7.14141 10.9912 7.12796 11.3691 6.74592Z",fill:N})),a.a.createElement("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.3691 6.74592C11.757 6.35382 11.7536 5.72383 11.3615 5.33594L6.74686 0.770747C6.35477 0.382855 5.72478 0.386251 5.33688 0.778347L0.771692 5.39302C0.3838 5.78512 0.387195 6.41511 0.779292 6.803C1.17139 7.19089 1.80138 7.1875 2.18927 6.7954L6.0583 2.89449L9.95916 6.75352C10.3513 7.14141 10.9912 7.12796 11.3691 6.74592Z",fill:N}))))},g=function(e){var t=e.darkMode,n=Object(r.useState)(null),c=Object(i.a)(n,2),o=c[0],l=c[1],s=Object(r.useState)(""),f=Object(i.a)(s,2),m=f[0],d=f[1],p=Object(r.useState)(null),b=Object(i.a)(p,2),h=b[0],g=b[1],E=Object(r.useState)(!1),v=Object(i.a)(E,2),O=v[0],j=v[1],y=function(){g((function(){return null})),l((function(){return null})),j((function(){return!1}))},x=Object(r.useRef)(null),w=Object(u.b)({color:t?"#FFFFFF":"#000000",borderBottom:t?"1.5px solid #FFFFFF":"1.5px solid #000000",config:{duration:130}}),S=Object(u.b)({background:o?"#61F04A":t?"#754AAD":"#EE84FF",boxShadow:t?"21px 17px 45px rgba(14, 28, 33, .8)":"5px 5px 30px rgba(176, 195, 210, .8)",color:o?"#000000":t?"#FFFFFF":"#2E476E",immediate:function(e){return"boxShadow"===e}});return a.a.createElement("form",{ref:x,onSubmit:function(e){if(e.preventDefault(),!o&&!O){y();var t="https://script.google.com/macros/s/AKfycbxIwfHc-mtjekhSMWF9_x2KBgAUKL60Lq1xY3e4fklzy4mzCJg/exec",n={method:"POST",body:x.current?new FormData(x.current):null};O||(j((function(){return!0})),fetch(t,n).then((function(e){return e.json()})).then((function(e){"success"===e.result?(l((function(){return!0})),g((function(){return e.message}))):"error"===e.result&&(l((function(){return!1})),g((function(){return e.error}))),j((function(){return!1}))})).catch((function(e){l((function(){return!1})),g((function(){return"An error occurred please try again."})),j((function(){return!1}))})))}},className:t?"Email darkmode":"Email"},a.a.createElement(u.a.input,{style:w,name:"Email",type:"email",value:m,placeholder:"email",onChange:function(e){return d(e.currentTarget.value)},onFocus:function(){y()},required:!0}),a.a.createElement("div",{className:"submitWrapper"},a.a.createElement(u.a.input,{style:S,type:"submit",value:o?"Subscribed":O?"":"Subscribe"}),O&&a.a.createElement("div",{className:"dot-wrap"},a.a.createElement("div",{className:"dot-flashing"}))),!1===o&&a.a.createElement("p",{className:"error"},h))},E=function(e){e.sphereState;var t=e.emailVisible,n=e.darkMode,r=e.setDarkMode,c=Object(u.b)({config:{duration:150},opacity:t?1:0,bottom:t?0:-6,background:n?"#2E3138":"#F9FAFC",boxShadow:n?"0px 4px 13px rgba(29, 30, 35, .9)":"0px 14px 18px rgba(31, 36, 39, .75)",immediate:function(e){return["background","boxShadow"].includes(e)}}),o=Object(u.b)({color:n?"#FFFFFF":"#000000",config:{duration:130}}),i=Object(u.b)({background:n?"#2C3036":"#E6EEF8",color:n?"#FFFFFF":"#000000",boxShadow:n?"-2px -1px 7px rgba(72, 78, 83, 0.75), 3px 1px 7px rgba(22, 26, 28, 0.9)":"-4px -2px 10px rgba(255, 255, 255, 1), 4px 2px 18px rgba(170, 187, 201, 0.9)",config:{duration:130},immediate:function(e){return["background","boxShadow"].includes(e)}});return a.a.createElement(u.a.div,{className:"MobileEmailForm",style:c},a.a.createElement(u.a.h5,{style:o},"Stay Updated"),a.a.createElement(g,{darkMode:n}),a.a.createElement(u.a.button,{style:i,className:"mode-switch",onClick:function(){return r((function(){return!n}))}},n?"L":"D"))},v=function(e){var t=e.instructionsState,n=e.darkMode,c=e.setInstructionsState,o=Object(r.useRef)(null),l=Object(r.useState)({xStart:null,yStart:null,yTravel:null,xTravel:null}),f=Object(i.a)(l,2),m=f[0],d=f[1],p=function(e){var t=e.clientX,n=e.clientY;d((function(e){var r={xStart:t,yStart:n};return Object(s.a)(Object(s.a)({},e),r)}))},b=function(e){var t=e.clientX,n=e.clientY;d((function(e){var r=e.yStart?e.yStart-n:null,a=e.xStart?t-e.xStart:null;return Object(s.a)(Object(s.a)({},e),{},{yTravel:r,xTravel:a})}))},h=function(){d((function(){return{xTravel:null,yTravel:null,xStart:null,yStart:null}}))},g=Object(r.useCallback)((function(){c((function(e){return"down"===e.position?Object(s.a)(Object(s.a)({},e),{},{position:"up"}):e}))}),[c]),E=Object(u.b)({opacity:t.visible?1:0,config:"down"===t.position?{duration:70}:{tension:280,clamp:!0}}),v=Object(u.b)({color:n?"#FFFFFF":"#000000",config:{duration:130}});return Object(r.useEffect)((function(){null!==m.yTravel&&(console.log(m),c((function(e){return"up"===e.position&&m.yTravel<-8?Object(s.a)(Object(s.a)({},e),{},{position:"down"}):"down"===e.position&&m.yTravel>8?Object(s.a)(Object(s.a)({},e),{},{position:"up"}):e})))}),[m,c]),Object(r.useEffect)((function(){var e=o.current;return e&&(e.addEventListener("pointerdown",(function(e){return p(e)})),e.addEventListener("pointermove",(function(e){return b(e)})),e.addEventListener("pointerup",(function(){return h()})),e.addEventListener("click",(function(){return g()}))),function(){e&&(e.removeEventListener("pointerdown",(function(e){return p(e)})),e.removeEventListener("pointermove",(function(e){return b(e)})),e.removeEventListener("pointerup",(function(){return h()})),e.removeEventListener("click",(function(){return g()})))}}),[g]),a.a.createElement(u.a.div,{ref:o,style:E,className:"hold-icon".concat(n?" darkMode":"").concat("down"===t.position?" down":"")},a.a.createElement("div",{className:"center"},a.a.createElement("div",{className:"swiper"})),n?a.a.createElement("img",{src:"../assets/holdicon_white.svg",alt:"Press and hold to learn more about Andy Mag"}):a.a.createElement("img",{src:"../assets/holdicon.svg",alt:"Press and hold to learn more about Andy Mag"}),a.a.createElement(u.a.p,{style:v},"Press and hold to learn more about Andy Mag"))},O=function(){var e=Object(r.useRef)(null),t=Object(l.f)(),n=t.aspect,c=t.size,o=t.setDefaultCamera,i=c.height/1,u=2*Math.atan(i/2/500)*(180/Math.PI);return Object(r.useEffect)((function(){console.log(e.current),e.current&&o(e.current)}),[c,o]),a.a.createElement("perspectiveCamera",{ref:e,aspect:n,fov:u,position:[0,0,500],onUpdate:function(e){return e.updateProjectionMatrix()}})},j=function(){var e=Object(r.useRef)([-1,10,22,31.5]),t=Object(r.useState)(!1),n=Object(i.a)(t,2),c=n[0],o=n[1],s=Object(r.useState)(0),f=Object(i.a)(s,2),m=f[0],d=f[1],p=Object(r.useState)(!1),g=Object(i.a)(p,2),j=g[0],y=g[1],x=Object(r.useState)({hold:!1,direction:"backwards",mountAnimating:!0}),w=Object(i.a)(x,2),S=w[0],F=w[1],M=Object(r.useState)(!1),C=Object(i.a)(M,2),k=C[0],A=C[1],D=Object(r.useState)({position:"up",visible:!1}),L=Object(i.a)(D,2),B=L[0],R=L[1],T=Object(r.useState)(e.current[0]),N=Object(i.a)(T,2),I=N[0],P=N[1],z=Object(u.b)({backgroundColor:c?"#FFFFFF":"#000000",top:I,opacity:j?"1":"0",config:{clamp:!0}});return Object(r.useEffect)((function(){P((function(){return e.current[m]}))}),[m]),a.a.createElement("div",{className:"MobileAnimation"},a.a.createElement("div",{className:"logo",onClick:function(){y((function(){return!1}))}},c?a.a.createElement("img",{src:"../assets/logo_white.svg",alt:"Logo"}):a.a.createElement("img",{src:"../assets/logo.svg",alt:"Logo"}),a.a.createElement(u.a.div,{className:"scroll-indicator",style:z})),a.a.createElement(l.a,{style:{backgroundColor:c?"#26282C":"#F9FAFC"},className:"Canvas"},a.a.createElement(O,null),a.a.createElement(b,{radius:135,setInstructionsState:R,setEmailVisible:A,inPosition:[0,135,0],sphereState:S,outPosition:[0,60,646],setSphereState:F,breakPoint:468,setColorShowActive:y})),a.a.createElement(h,{chapterIndex:m,colorShowActive:j,setColorShowActive:y,setChapterIndex:d,setSphereState:F,darkMode:c}),a.a.createElement(v,{darkMode:c,instructionsState:B,setInstructionsState:R}),a.a.createElement(E,{sphereState:S,emailVisible:k,darkMode:c,setDarkMode:o}))},y=function(){return a.a.createElement(j,null)},x=function(e){var t=e.chapterIndex,n=e.setChapterIndex,c=e.wheelThreshold,o=e.setBackgroundColor,l=e.setButtonShadow,s=e.setOrbMovingState,f=e.subscribeActive,m=Object(r.useRef)([Object(r.createRef)(),Object(r.createRef)(),Object(r.createRef)(),Object(r.createRef)()]),d=Object(r.useState)(null),p=Object(i.a)(d,2),b=p[0],h=p[1],g=Object(u.b)({opacity:f?0:1,zIndex:f?-1:2,config:{mass:1,friction:4,clamp:!0}}),E=Object(r.useCallback)((function(){null!==m.current&&m.current.forEach((function(e,t){null!==e.current&&(e.current.classList.remove("out-up"),e.current.classList.add("out-down"))}))}),[]);Object(r.useEffect)((function(){var e=m.current[0].current,t=void 0===e?null:e;null===t||void 0===t||t.classList.remove("out-down")}),[]),Object(r.useEffect)((function(){f?(o((function(){return"#231B1B"})),setTimeout(E,1e3)):null!==m.current&&null!==m.current[0].current&&m.current[0].current.classList.contains("out-down")&&m.current[0].current.classList.remove("out-down")}),[f,o,E]),function(e,t){var n=Object(r.useRef)(!1);Object(r.useEffect)((function(){n.current?e():n.current=!0}),t)}((function(){if(null!==t){var e=m.current[t].current,n=void 0===e?null:e;h((function(){return"in"})),null===n||void 0===n||n.classList.remove("out-down","out-up")}}),[t]);var v=Object(r.useCallback)((function(e){var n=e.deltaY;if(null===b&&Math.abs(n)>c&&null!==t){var r=m.current[t].current,a=void 0===r?null:r;n>0&&t<3?(null===a||void 0===a||a.classList.add("out-up"),h((function(){return"out-up"})),s((function(){return"out"}))):n<0&&t>0&&(null===a||void 0===a||a.classList.add("out-down"),h((function(){return"out-down"})),s((function(){return"out"})))}}),[t,c,b,s]);return a.a.createElement(u.a.div,{className:"Text grid",style:g},a.a.createElement("div",{className:"chapter out-down",onWheel:function(e){return v(e)},ref:m.current[0]},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h2",null,"The most damaging phrase in language is 'It's"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.06s"}},a.a.createElement("h2",null,"always been done that way'"))),a.a.createElement("span",{className:"spacer-top-1"},a.a.createElement("span",{style:{transitionDelay:"0.09s"},onTransitionEnd:function(){"out-up"===b?(n((function(){return 1})),o((function(){return"#D695C7"}))):"in"===b&&h((function(){return null}))}},a.a.createElement("h2",null,"- Admiral Grace Hopper")))),a.a.createElement("div",{className:"chapter out-down",ref:m.current[1],onWheel:function(e){return v(e)}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h2",null,"Andy Mag is an experiential magazine that"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.06s"}},a.a.createElement("h2",null,"enables readers to interact (engage) with diverse"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.09s"},onTransitionEnd:function(){"out-up"===b?(n((function(){return 2})),o((function(){return"#9C95D6"})),l((function(){return"1px 2px 7px #877DD8, -1px -2px 7px #BAB7D3"}))):"out-down"===b?(n((function(){return 0})),o((function(){return"#D695AB"})),l((function(){return"1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"}))):"in"===b&&h((function(){return null}))}},a.a.createElement("h2",null,"themes and ideas.")))),a.a.createElement("div",{className:"chapter out-down",ref:m.current[2],onWheel:function(e){return v(e)}},a.a.createElement("span",null,a.a.createElement("span",{onTransitionEnd:function(){"out-up"===b?(n((function(){return 3})),o((function(){return"#95B1D6"})),l((function(){return"1px 2px 7px 0px #779FD4, -1px -2px 7px #BAC4D2"}))):"out-down"===b?(n((function(){return 1})),o((function(){return"#D695C7"})),l((function(){return"1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"}))):"in"===b&&h((function(){return null}))}},a.a.createElement("h2",null,"Because a great story is worth remembering.")))),a.a.createElement("div",{className:"chapter out-down",ref:m.current[3],onWheel:function(e){return v(e)}},a.a.createElement("span",null,a.a.createElement("span",{onTransitionEnd:function(){"out-down"===b?(n((function(){return 2})),o((function(){return"#9C95D6"})),l((function(){return"1px 2px 7px #877DD8, -1px -2px 7px #BAB7D3"}))):"in"===b&&h((function(){return null}))}},a.a.createElement("h2",null,"Subscribe to Andy Mag for updates.")))))},w=function(e){var t=e.pointerPosition,n=e.chapterIndex,c=e.orbMovingState,o=e.resetPointer,u=e.setOrbMovingState,s=e.subscribeActive,b=e.setSubscribeActive,h=e.setEmailActive,g=e.setOrbHold,E=e.orbHold,v=e.setScrollIndicatorHeight,O=e.setChapterIndex,j=e.setBackgroundColor,y=e.setButtonShadow,x=Object(l.f)().viewport,w=Object(r.useRef)(null),S=Object(r.useRef)(null),F=Object(r.useRef)(null),M=Object(r.useRef)([x.width<1280?-220:-260,0,0]),C=Object(r.useRef)(null),k=Object(r.useRef)(new d.Sphere),A=Object(r.useRef)([{textRef1:{position:[0,59,0],geometry:[690,26,0]},textRef2:{position:[0,6,0],geometry:[415,26,0]},textRef3:{position:[0,-60,0],geometry:[355,26,0]}},{textRef1:{position:[0,51,0],geometry:[647,26,0]},textRef2:{position:[0,-1,0],geometry:[748,26,0]},textRef3:{position:[0,-51,0],geometry:[272,26,0]}},{textRef1:{position:null,geometry:void 0},textRef2:{position:[0,0,0],geometry:[682,26,0]},textRef3:{position:null,geometry:void 0}},{textRef1:{position:null,geometry:void 0},textRef2:{position:[0,0,0],geometry:[537,26,0]},textRef3:{position:null,geometry:void 0}}]),D=Object(r.useMemo)((function(){var e=200;return x.width>=1280&&(e=240),[{pre:[-x.width/2+100,-x.height/2-e,0],start:[0,0,0]},{pre:[-x.width/2+180,x.height/2+e,0],start:[-250,0,0]},{pre:[x.width/2+180,-x.height/2-180,0],start:[50,0,0]},{pre:[x.width/2-200,x.height/2+e,0],start:[100,0,0]}]}),[]),L=Object(r.useRef)({resting:{mass:1e3,friction:1400,clamp:!1},intersecting:void 0,out:{mass:5,friction:4.5,clamp:!0},to:{duration:1},in:{mass:1e3,friction:1400,clamp:!1},subscribe:{tension:120,clamp:!0},subscribe_hold:{mass:70,tension:100,clamp:!0},at_threshold:{duration:600}}),B=Object(r.useRef)(null),R=Object(r.useRef)(new d.Box3(new d.Vector3,new d.Vector3)),T=Object(r.useRef)(null),N=Object(r.useRef)(new d.Box3(new d.Vector3,new d.Vector3)),I=Object(r.useRef)(null),P=Object(r.useRef)(new d.Box3(new d.Vector3,new d.Vector3)),z=Object(r.useRef)(null),_=Object(r.useRef)(new d.Box3(new d.Vector3,new d.Vector3)),H=Object(r.useState)(null),W=Object(i.a)(H,2),V=W[0],U=W[1],G=Object(r.useState)(D[n].pre),Y=Object(i.a)(G,2),X=Y[0],q=Y[1],J=Object(r.useState)("intersecting"===c),K=Object(i.a)(J,2),Z=K[0],$=K[1],Q=Object(r.useState)(1),ee=Object(i.a)(Q,2),te=ee[0],ne=ee[1],re=Object(r.useMemo)((function(){for(var e=[],t=0;t<1800;t++){var n=d.MathUtils.randFloatSpread(360),r=d.MathUtils.randFloatSpread(360),a=200*Math.sin(n)*Math.cos(r),c=200*Math.sin(n)*Math.sin(r),o=200*Math.cos(n);e.push([a,c,o])}return e.map((function(e){return Object(f.a)(d.Vector3,Object(m.a)(e))}))}),[]),ae=Object(r.useCallback)((function(){if(null!==w.current){var e=[w.current.position.x,w.current.position.y,w.current.position.z],t=X;if("subscribe"===c?!!t&&e.every((function(e,n){return Math.abs(e-t[n])<8})):!!t&&e.every((function(e,n){return e===t[n]})))switch(c){case"to":return"pre";case"subscribe":return"subscribe";case"at_threshold":return"at_threshold";default:return!1}return!1}return!1}),[c,X]),ce=Object(p.b)({position:X,opacity:te,transparent:0,config:Z?L.current.intersecting:L.current[c],onFrame:function(e){var t=e.opacity,r=ae();"pre"===r?(b((function(e){return!1})),v((function(){return 0})),u((function(){return"in"})),q((function(){return D[n].start}))):"subscribe"===r?h((function(){return!0})):"at_threshold"===r&&0===t&&(O((function(){return 0})),u((function(){return"to"})),h((function(){return!1})),g((function(){return!1})),q((function(){return D[0].pre})),j((function(){return"#D695AB"})),y((function(){return"1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"})))}}),oe=ce.position,ie=ce.opacity,ue=ce.transparent,le=Object(r.useCallback)((function(e){null!==w.current&&(w.current.rotation.y+=e)}),[]),se=Object(r.useCallback)((function(){null!==C.current&&C.current.geometry.computeBoundingSphere(),null!==B.current&&B.current.geometry.computeBoundingBox(),null!==T.current&&T.current.geometry.computeBoundingBox(),null!==I.current&&I.current.geometry.computeBoundingBox(),null!==z.current&&z.current.geometry.computeBoundingBox()}),[]),fe=Object(r.useCallback)((function(){null!==k.current&&(x.width>900&&x.width<1280?k.current.radius=C.current.geometry.boundingSphere.radius:x.width>=1280&&(k.current.radius=C.current.geometry.boundingSphere.radius+40))}),[x]),me=Object(r.useCallback)((function(){null!==k.current&&(k.current.center=new d.Vector3(C.current.position.x,C.current.position.y,C.current.position.z))}),[]),de=Object(r.useCallback)((function(){if(null!==w.current){var e={left:w.current.position.x+.5*x.width,right:.5*x.width-w.current.position.x,top:.5*x.height-w.current.position.y,bottom:w.current.position.y+.5*x.height},t=Math.min(e.left,e.right,e.top,e.bottom);if(t===e.left)return"left";if(t===e.right)return"right";if(t===e.bottom)return"bottom";if(t===e.top)return"top"}return null}),[x]),pe=Object(r.useCallback)((function(){var e=null;null!==t[0]&&null!==t[1]&&(e=[t[0]-window.innerWidth/2,-t[1]+window.innerHeight/2,0]);return e}),[t]),be=Object(r.useCallback)((function(e,t){var n=Math.max(t.min.x,Math.min(e.center.x,t.max.x)),r=Math.max(t.min.y,Math.min(e.center.y,t.max.y)),a=Math.max(t.min.z,Math.min(e.center.z,t.max.z));return Math.sqrt((n-e.center.x)*(n-e.center.x)+(r-e.center.y)*(r-e.center.y)+(a-e.center.z)*(a-e.center.z))<e.radius}),[]),he=Object(r.useCallback)((function(){var e;e=x.width>900&&x.width<1280?200:240,q((function(t){if(null!==t&&null!==w.current){var n=w.current.position.x,r=w.current.position.y,a=w.current.position.z;return"left"===F.current?n=-.5*x.width-e:"bottom"===F.current?r=-.5*x.height-e:"top"===F.current?r=.5*x.height+e:"right"===F.current&&(n=.5*x.width+e),[n,r,a]}return null}))}),[x]),ge=Object(r.useCallback)((function(){return!s&&(be(k.current,R.current)||be(k.current,_.current)||be(k.current,N.current)||be(k.current,P.current))}),[be,s]);return Object(r.useEffect)((function(){se(),_.current.setFromObject(z.current),fe(),me()}),[se,fe,me]),Object(r.useEffect)((function(){u((function(){return"to"})),q((function(){return D[n].pre})),R.current.setFromObject(B.current),N.current.setFromObject(T.current),P.current.setFromObject(I.current)}),[n,u,D]),Object(r.useEffect)((function(){x.width>900&&x.width<1280?(U((function(){return[1,1,1]})),fe()):(U((function(){return[1.2,1.2,1.2]})),fe())}),[x,fe]),Object(r.useEffect)((function(){"out"===c?(he(),o()):"at_threshold"===c?ne((function(){return 0})):"to"===c&&ne((function(e){return 0===e?1:e}))}),[c,he,o]),Object(r.useEffect)((function(){s?u((function(){return"subscribe"})):ne((function(e){return 0===e?1:e}))}),[s,u]),Object(r.useEffect)((function(){u((function(e){return"subscribe"===e&&!0===E?"subscribe_hold":"subscribe_hold"===e&&!1===E?"subscribe":e}))}),[E,u]),Object(l.e)((function(){null!==w.current&&(le(.001),me(),F.current=de(),ge()?($((function(){return!0})),q((function(){return S.current}))):($((function(){return!1})),S.current=[w.current.position.x,w.current.position.y,w.current.position.z],"subscribe"===c?(q((function(){return M.current=[x.width<1280?-220:-260,0,0],[x.width<1280?-220:-260,0,0]})),v((function(e){if(null!==w.current&&M.current[1]-w.current.position.y<1){var t=M.current[0],n=w.current.position.x,r=0;return null!==n&&(r=Math.abs(t-n)/Math.abs(t)),47.2*r}return e}))):"resting"===c?q((function(e){return"resting"===c&&null!==t[0]&&null!==t[1]?pe():e})):"in"===c?q((function(e){return null!==t[0]&&null!==t[1]?(u((function(){return"resting"})),pe()):e})):"subscribe_hold"===c&&(q((function(){return[0,0,0]})),v((function(e){if(null!==w.current&&M.current[1]-w.current.position.y<1){var t=M.current[0],n=w.current.position.x,r=0;return null!==n&&(r=Math.abs(t-n)/Math.abs(t)),1===r&&u((function(){return"at_threshold"})),47.2*r}return e})))))})),a.a.createElement(a.a.Fragment,null,a.a.createElement("group",null,a.a.createElement(p.a.mesh,{onPointerDown:function(){return g((function(e){return"subscribe"===c||"subscribe_hold"===c||e}))},onPointerUp:function(){return g((function(e){return"subscribe"!==c&&"subscribe_hold"!==c&&e}))},ref:C,scale:V,position:oe},a.a.createElement("sphereBufferGeometry",{attach:"geometry",args:[200,32,32,0,2*Math.PI,0,Math.PI]}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0,side:d.DoubleSide})),a.a.createElement(p.a.points,{onPointerDown:function(){return g((function(){return!0}))},onPointerUp:function(){return g((function(){return!1}))},ref:w,scale:V,position:oe},a.a.createElement("geometry",{attach:"geometry",vertices:re}),a.a.createElement(p.a.pointsMaterial,{attach:"material",color:new d.Color(13383628),size:2.5,transparent:ue,opacity:ie}))),a.a.createElement("group",null,a.a.createElement("mesh",{ref:B,position:A.current[n].textRef1.position},a.a.createElement("boxGeometry",{attach:"geometry",args:A.current[n].textRef1.geometry}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0})),a.a.createElement("mesh",{ref:T,position:A.current[n].textRef2.position},a.a.createElement("boxGeometry",{attach:"geometry",args:A.current[n].textRef2.geometry}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0})),a.a.createElement("mesh",{ref:I,position:A.current[n].textRef3.position},a.a.createElement("boxGeometry",{attach:"geometry",args:A.current[n].textRef3.geometry}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0})),a.a.createElement("mesh",{ref:z,position:[0,-x.height/2.65,0]},a.a.createElement("boxGeometry",{attach:"geometry",args:[280,50,0]}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0}))))},S=function(e){var t=e.emailActive,n=e.orbHold,c=Object(r.useState)(null),o=Object(i.a)(c,2),l=o[0],s=o[1],f=Object(r.useState)(""),m=Object(i.a)(f,2),d=m[0],p=m[1],b=Object(r.useState)(!1),h=Object(i.a)(b,2),g=h[0],E=h[1],v=Object(r.useRef)(null),O=Object(u.b)({opacity:n?0:1,visibility:n?"hidden":"visible",config:{mass:2,friction:2,clamp:!0}});Object(r.useEffect)((function(){null!==v.current&&(t?v.current.classList.add("active"):v.current.classList.remove("active"),g?v.current.classList.add("focused"):v.current.classList.remove("focused"))}),[t,g,d]);return a.a.createElement(u.a.div,{className:"DesktopEmail grid",ref:v,style:O},a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={email:d},n={method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(t)};fetch("http://localhost:3000/subscribe",n).then((function(e){return e.json()})).then((function(e){console.log(e),202===e.statusCode?s(!0):s(!1)})).catch((function(e){return console.log(e)}))},className:l?"desktopEmailWrapper Email success":"false"===l?"desktopEmailWrapper Email fail":"desktopEmailWrapper Email"},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h3",null,"STAY UPDATED WITH THE"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h3",null,"ANDY MAG NEWSLETTER"))),a.a.createElement("label",null,a.a.createElement("h4",null,"Email")),g?a.a.createElement("img",{className:"submitIcon",src:"../assets/paper_plane_purple.svg",alt:"Submit"}):a.a.createElement("img",{className:"submitIcon",src:"../assets/paper_plane_white.svg",alt:"Submit"}),a.a.createElement("input",{onFocus:function(){return E((function(){return!0}))},onBlur:function(){(void 0===d||d.length<1)&&E((function(){return!1}))},type:"email",value:d,onChange:function(e){return p(e.currentTarget.value)},required:!0})))},F=function(){var e=Object(r.useState)(0),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)("#D695AB"),s=Object(i.a)(o,2),f=s[0],m=s[1],d=Object(r.useState)(!1),p=Object(i.a)(d,2),b=p[0],h=p[1],g=Object(r.useState)(!1),E=Object(i.a)(g,2),v=E[0],O=E[1],j=Object(r.useState)("1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"),y=Object(i.a)(j,2),F=y[0],M=y[1],C=Object(r.useRef)([0,10,19,28.2]),k=Object(r.useState)(C.current[0]),A=Object(i.a)(k,2),D=A[0],L=A[1],B=Object(r.useState)(0),R=Object(i.a)(B,2),T=R[0],N=R[1],I=Object(r.useState)(null),P=Object(i.a)(I,2),z=P[0],_=(P[1],Object(r.useState)("resting")),H=Object(i.a)(_,2),W=H[0],V=H[1],U=Object(r.useState)(!1),G=Object(i.a)(U,2),Y=G[0],X=G[1],q=Object(r.useState)([null,null]),J=Object(i.a)(q,2),K=J[0],Z=J[1],$=Object(r.useRef)(40),Q=Object(r.useRef)(null),ee=Object(u.b)({top:b?"auto":D,bottom:b?1:"auto",height:b?T:19,config:{clamp:!0},backgroundColor:b?"white":"black"});Object(r.useEffect)((function(){L((function(){return C.current[n]}))}),[n]);var te=Object(r.useCallback)((function(){Z((function(){return[null,null]}))}),[]),ne=Object(u.b)({opacity:b?0:1,config:{mass:1,friction:4,clamp:!0}});return a.a.createElement("div",{ref:Q,className:"DesktopAnimation",style:{backgroundColor:f},onPointerMove:function(e){var t=e.clientX,n=e.clientY;Z((function(){return[t,n]}))}},a.a.createElement(l.a,{className:"Orb",style:{position:"absolute"},orthographic:!0,camera:{left:z?-z.width/2:void 0,right:z?z.width/2:void 0,top:z?z.height/2:void 0,bottom:z?-z.height/2:void 0,near:300,far:-300}},a.a.createElement(w,{setBackgroundColor:m,setButtonShadow:M,setChapterIndex:c,setScrollIndicatorHeight:N,orbHold:Y,setOrbHold:X,setEmailActive:O,pointerPosition:K,chapterIndex:n,orbMovingState:W,resetPointer:te,setOrbMovingState:V,subscribeActive:b,setSubscribeActive:h})),a.a.createElement("div",{className:"logo",onClick:function(){return c((function(){return 0}))}},b?a.a.createElement("img",{src:"../assets/logo_white.svg",alt:"Logo"}):a.a.createElement("img",{src:"../assets/logo.svg",alt:"Logo"}),a.a.createElement(u.a.div,{className:"scroll-indicator",style:ee})),a.a.createElement(x,{chapterIndex:n,setChapterIndex:c,wheelThreshold:$.current,setBackgroundColor:m,setButtonShadow:M,setOrbMovingState:V,subscribeActive:b}),a.a.createElement(u.a.div,{className:"SubscribeButton",style:ne},a.a.createElement("button",{onClick:function(){return h((function(){return!0}))},style:{boxShadow:F}},"SUBSCRIBE")),a.a.createElement("div",{className:"SocialMedia"},a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.snapchat.com/add/theandymag"},a.a.createElement("img",{src:"../assets/snapchat.svg",alt:"Snapchat"})),a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/theandymag/"},a.a.createElement("img",{src:"../assets/instagram.svg",alt:"Instagram"})),a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://twitter.com/theandymag_"},a.a.createElement("img",{src:"../assets/twitter.svg",alt:"Twitter"}))),a.a.createElement(S,{orbHold:Y,emailActive:v}))};var M=function(){var e=Object(r.useState)(window.innerWidth<=900),t=Object(i.a)(e,2),n=t[0],c=t[1],o=function(){return document.documentElement.style.setProperty("--app-height","".concat(window.innerHeight,"px"))},u=Object(r.useCallback)((function(){window.innerWidth<=900?c(!0):c(!1)}),[]);return Object(r.useEffect)((function(){window.addEventListener("resize",u),window.addEventListener("resize",o)}),[u]),Object(r.useEffect)((function(){o()}),[]),a.a.createElement("div",{className:"App"},n?a.a.createElement(y,null):a.a.createElement(F,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.31d40420.chunk.js.map