(this["webpackJsonpam-newsletter"]=this["webpackJsonpam-newsletter"]||[]).push([[0],{33:function(e,t,n){e.exports=n(42)},37:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(28),o=n.n(c),i=n(2),u=(n(37),n(11)),l=n(14),s=n(19),m=n(8),f=n(3),d=n(15),p=function(e){var t=e.radius,n=e.sphereState,c=e.setSphereState,o=e.breakPoint,i=e.setEmailVisible,p=e.setInstructionsVisible,h=e.setColorShowActive,b=Object(r.useRef)(null),g=Object(u.f)(),E=g.camera,v=g.camera.fov,O=g.size,j=Object(r.useRef)(1.7),y=[0,0,0],x=[0,-O.height/9,626],w=Object(r.useRef)(null);Object(u.e)((function(){if(b.current)return b.current.rotation.y=b.current.rotation.y+.003}));var S=Object(r.useCallback)((function(){return n.mountAnimating||n.hold?x:y}),[y,n,x]),F=Object(r.useCallback)((function(){b.current.position.z>=o?c((function(e){return{hold:!0,direction:"forwards",mountAnimating:e.mountAnimating}})):c((function(e){return{hold:!1,direction:"backwards",mountAnimating:e.mountAnimating}}))}),[c,o,n]),M=Object(r.useMemo)((function(){for(var e=[],n=0;n<1600;n++){var r=f.MathUtils.randFloatSpread(360),a=f.MathUtils.randFloatSpread(360),c=t*Math.sin(r)*Math.cos(a),o=t*Math.sin(r)*Math.sin(a),i=t*Math.cos(r);e.push([c,o,i])}return e.map((function(e){return Object(s.a)(f.Vector3,Object(m.a)(e))}))}),[t]),C=Object(d.b)({config:{mass:1.8,tension:84,friction:22,clamp:!0},pointsPosition:S(),opacity:n.mountAnimating?0:1,onFrame:function(e){b.current.position.z>0&&b.current.position.z<50&&("backwards"===n.direction?(i((function(){return!0})),p((function(){return!0}))):(i((function(){return!1})),p((function(){return!1}))))},onRest:function(e){console.log(n),x.every((function(e,t){if(!n.mountAnimating){if(0===t)return b.current.position.x===e;if(1===t)return b.current.position.y===e;if(2===t)return b.current.position.z===e}return!1}))&&"forwards"===n.direction&&(h((function(e){return e||!0})),c((function(e){return Object(l.a)(Object(l.a)({},e),{},{direction:"backwards"})})))}});return Object(r.useEffect)((function(){b.current&&(b.current.material.size=j.current/Math.tan(Math.PI/180*v/2))}),[v]),Object(r.useEffect)((function(){O.height&&E&&E.lookAt(0,-O.height/5,0)}),[O,E]),Object(r.useEffect)((function(){c((function(e){return e.mountAnimating?Object(l.a)(Object(l.a)({},e),{},{mountAnimating:!1}):e}))}),[c]),a.a.createElement("group",null,a.a.createElement(d.a.mesh,{rotation:[-Math.PI/2,0,0],ref:w,onPointerDown:function(){return c((function(e){return{hold:!0,direction:"forwards",mountAnimating:e.mountAnimating}}))},onPointerUp:function(){return F()},position:C.circlePosition},a.a.createElement("sphereBufferGeometry",{attach:"geometry",args:[130,32,32,0,2*Math.PI,0,.7*Math.PI]}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0,side:f.DoubleSide})),a.a.createElement(d.a.points,{ref:b,position:C.pointsPosition},a.a.createElement("geometry",{attach:"geometry",vertices:M}),a.a.createElement(d.a.pointsMaterial,{attach:"material",color:new f.Color(13383628),size:1.7,opacity:C.opacity})))},h=function(e){var t=e.chapterIndex,n=e.colorShowActive,c=e.setColorShowActive,o=e.setChapterIndex,u=e.setSphereState,s=e.darkMode,m=Object(r.useRef)(null),f=Object(r.useState)(!1),d=Object(i.a)(f,2),p=d[0],h=d[1],b=Object(r.useState)(!1),g=Object(i.a)(b,2),E=g[0],v=g[1],O=Object(r.useState)({xStart:null,yStart:null,yTravel:null,xTravel:null}),j=Object(i.a)(O,2),y=j[0],x=j[1],w=Object(r.useRef)({lightMode:["#E4F0FA","#D64773","#CBCBCB","#000000"],darkMode:["#000000","#D64773","#E4F0FA","#F9FAFC"]}),S=Object(r.useRef)({lightMode:["#6E81A0","#FFFFFF","#D64773","#CBCBCB"],darkMode:["#6E81A0","#000000","#D64773","#009CDF"]}),F=Object(r.useState)(w.current.lightMode[t]),M=Object(i.a)(F,2),C=M[0],k=M[1],A=Object(r.useState)(S.current.lightMode[t]),D=Object(i.a)(A,2),B=D[0],R=D[1],L=function(){if(m.current){for(var e=-1,t=m.current.children,n=0;n<t.length;n++)if(!t[n].classList.contains("out-down")&&!t[n].classList.contains("out-up")){e=n;break}return e}return-1};return Object(r.useEffect)((function(){t>=0&&n&&E&&(L()<t?(console.log("next"),function(){if(m.current){var e=L();if(e>=0&&e<m.current.children.length-2){h((function(){return!0}));var n=m.current.children[e],r=n.children[n.children.length-1].children[0],a=m.current.children[t],c=a.children[a.children.length-1].children[0];r.addEventListener("transitionend",(function e(){a.classList.remove("out-down"),k((function(e){return s?w.current.darkMode[t]:w.current.lightMode[t]})),R((function(){return s?S.current.darkMode[t]:S.current.lightMode[t]})),r.removeEventListener("transitionend",e)}));c.addEventListener("transitionend",(function e(){h((function(){return!1})),c.removeEventListener("transitionend",e)})),n.classList.add("out-up")}}}()):L()>t&&(console.log("back"),function(){if(m.current){var e=L();if(e>0){h((function(){return!0}));var n=m.current.children[e],r=n.children[n.children.length-1].children[0],a=m.current.children[t],c=a.children[a.children.length-1].children[0];r.addEventListener("transitionend",(function e(){a.classList.remove("out-up"),k((function(e){return s?w.current.darkMode[t]:w.current.lightMode[t]})),R((function(){return s?S.current.darkMode[t]:S.current.lightMode[t]})),r.removeEventListener("transitionend",e)}));c.addEventListener("transitionend",(function e(){h((function(){return!1})),c.removeEventListener("transitionend",e)})),n.classList.add("out-down")}}}()))}),[t,n,E,s]),Object(r.useEffect)((function(){s&&!E?k((function(){return w.current.darkMode[0]})):s||E||k((function(){return w.current.lightMode[0]}))}),[s,E]),Object(r.useEffect)((function(){n&&!E?(console.log("init"),m.current&&(m.current.classList.add("active"),m.current.children[0].classList.remove("out-down"),v((function(){return!0})))):!n&&E&&function(){if(m.current){h((function(){return!0}));var e=L(),t=m.current.children[e],n=t.children[t.children.length-1].children[0];m.current.addEventListener("transitionend",(function e(){m.current&&(u((function(e){return{hold:!1,direction:"backwards",mountAnimating:e.mountAnimating}})),setTimeout((function(){if(m.current){for(var e=0;e<m.current.children.length-1;e++)m.current.children[e].classList.remove("out-up"),m.current.children[e].classList.add("out-down");o((function(){return 0})),k((function(e){return s?w.current.darkMode[0]:w.current.lightMode[0]})),R((function(){return s?S.current.darkMode[0]:S.current.lightMode[0]})),v((function(){return!1}))}}),1e3),m.current.removeEventListener("transitionend",e))}));n.addEventListener("transitionend",(function e(){m.current&&(h((function(){return!1})),m.current.classList.remove("active"),n.removeEventListener("transitionend",e))})),0===e?t.classList.add("out-down"):t.classList.add("out-up")}}()}),[n,E,u,o,s]),Object(r.useEffect)((function(){y.yTravel>0&&y.yTravel>=100?(o((function(e){if(m.current){if(e<m.current.children.length-2&&!p)return e+1;e===m.current.children.length-2&&c((function(){return!1}))}return e})),x((function(){return{xTravel:null,yTravel:null,xStart:null,yStart:null}}))):y.yTravel<0&&y.yTravel<=-100&&(o((function(e){if(m.current&&!p){if(e>0)return e-1;0===e&&c((function(){return!1}))}return e})),x((function(){return{xTravel:null,yTravel:null,xStart:null,yStart:null}})))}),[y,o,p,c]),a.a.createElement("div",{className:"ColorShow grid",ref:m,onPointerDown:function(e){return function(e){var t=e.clientX,n=e.clientY;x((function(e){var r={xStart:t,yStart:n};return Object(l.a)(Object(l.a)({},e),r)}))}(e)},onPointerMove:function(e){return function(e){var t=e.clientX,n=e.clientY;x((function(e){var r=e.yStart?e.yStart-n:null,a=e.xStart?t-e.xStart:null;return Object(l.a)(Object(l.a)({},e),{},{yTravel:r,xTravel:a})}))}(e)},onPointerUp:function(){x((function(){return{xTravel:null,yTravel:null,xStart:null,yStart:null}}))},style:{background:C}},a.a.createElement("div",{className:"ColorShowText out-down",style:{color:s?"#E066DB":"#334669"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"The most dangerous phrase"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"in language is 'It's always"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.1s"}},a.a.createElement("h4",null,"been done that way'\""))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.15s"}},a.a.createElement("p",{style:{color:s?"#FFFFFF":"#334669"}},"Admiral Grace Hopper")))),a.a.createElement("div",{className:"ColorShowText out-down",style:{color:s?"#000000":"#FFFFFF"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"Andy Mag is an experiential"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"magazine that enables"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.1s"}},a.a.createElement("h4",null,"readers to interact (engage)"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.15s"}},a.a.createElement("h4",null,"with diverse themes and "))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.2s"}},a.a.createElement("h4",null,"ideas.")))),a.a.createElement("div",{className:"ColorShowText out-down",style:{color:"#D64773"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"Because a great story is"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"worth remembering.")))),a.a.createElement("div",{className:"ColorShowText out-down",style:{color:s?"#009CDF":"#CBCBCB"}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h4",null,"Subscribe to Andy Mag for"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h4",null,"updates.")))),a.a.createElement("div",{className:"Arrows",style:{opacity:n?1:0}},a.a.createElement("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.3691 6.74592C11.757 6.35382 11.7536 5.72383 11.3615 5.33594L6.74686 0.770747C6.35477 0.382855 5.72478 0.386251 5.33688 0.778347L0.771692 5.39302C0.3838 5.78512 0.387195 6.41511 0.779292 6.803C1.17139 7.19089 1.80138 7.1875 2.18927 6.7954L6.0583 2.89449L9.95916 6.75352C10.3513 7.14141 10.9912 7.12796 11.3691 6.74592Z",fill:B})),a.a.createElement("svg",{width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a.a.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.3691 6.74592C11.757 6.35382 11.7536 5.72383 11.3615 5.33594L6.74686 0.770747C6.35477 0.382855 5.72478 0.386251 5.33688 0.778347L0.771692 5.39302C0.3838 5.78512 0.387195 6.41511 0.779292 6.803C1.17139 7.19089 1.80138 7.1875 2.18927 6.7954L6.0583 2.89449L9.95916 6.75352C10.3513 7.14141 10.9912 7.12796 11.3691 6.74592Z",fill:B}))))},b=n(6),g=function(e){var t=e.darkMode,n=Object(r.useState)(null),c=Object(i.a)(n,2),o=c[0],u=(c[1],Object(r.useState)("")),l=Object(i.a)(u,2),s=l[0],m=l[1],f=Object(b.b)({color:t?"#FFFFFF":"#000000",borderBottom:t?"1.5px solid #FFFFFF":"1.5px solid #000000",config:{duration:130}}),d=Object(b.b)({background:t?"#754AAD":"#EE84FF",boxShadow:t?"21px 17px 45px rgba(14, 28, 33, .8)":"8px 8px 24px rgba(176, 195, 210, .8)",color:t?"#FFFFFF":"#2E476E",immediate:function(e){return"boxShadow"===e}});return a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t="https://script.google.com/macros/s/AKfycbxIwfHc-mtjekhSMWF9_x2KBgAUKL60Lq1xY3e4fklzy4mzCJg/exec",n={email:s},r={method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(n)};console.log(t),fetch(t,r).then((function(e){return e.json()})).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))},className:o?"Email success":"false"===o?"Email fail":"Email"},a.a.createElement(b.a.input,{className:t?"darkmode":"",style:f,name:"Email",type:"email",value:s,placeholder:"email",onChange:function(e){return m(e.currentTarget.value)},required:!0}),a.a.createElement(b.a.input,{style:d,type:"submit",value:"Subscribe"}))},E=function(e){e.sphereState;var t=e.emailVisible,n=e.darkMode,r=e.setDarkMode,c=Object(b.b)({config:{mass:1,friction:20,clamp:!0},opacity:t?1:0,bottom:t?0:-6,background:n?"#2E3138":"#F9FAFC",boxShadow:n?"0px 4px 13px rgba(29, 30, 35, .9)":"0px 14px 18px rgba(31, 36, 39, .75)",immediate:function(e){return["background","boxShadow"].includes(e)}}),o=Object(b.b)({color:n?"#FFFFFF":"#000000",config:{duration:130}}),i=Object(b.b)({background:n?"#2C3036":"#E6EEF8",color:n?"#FFFFFF":"#000000",boxShadow:n?"-2px -1px 7px rgba(72, 78, 83, 0.75), 3px 1px 7px rgba(22, 26, 28, 0.9)":"-4px -2px 10px rgba(255, 255, 255, 1), 4px 2px 18px rgba(170, 187, 201, 0.9)",config:{duration:130},immediate:function(e){return["background","boxShadow"].includes(e)}});return a.a.createElement(b.a.div,{className:"MobileEmailForm",style:c},a.a.createElement(b.a.p,{style:o},"Stay Updated"),a.a.createElement(g,{darkMode:n}),a.a.createElement(b.a.button,{style:i,className:"mode-switch",onClick:function(){return r((function(){return!n}))}},n?"L":"D"))},v=function(){var e=Object(r.useRef)(null),t=Object(u.f)(),n=t.aspect,c=t.size,o=t.setDefaultCamera,i=c.height/1,l=2*Math.atan(i/2/500)*(180/Math.PI);return Object(r.useEffect)((function(){e.current&&o(e.current)}),[o]),a.a.createElement("perspectiveCamera",{ref:e,aspect:n,fov:l,position:[0,0,500],onUpdate:function(e){return e.updateProjectionMatrix()}})},O=function(){var e=Object(r.useRef)([-1,10,22,31.5]),t=Object(r.useState)(!1),n=Object(i.a)(t,2),c=n[0],o=n[1],l=Object(r.useState)(0),s=Object(i.a)(l,2),m=s[0],f=s[1],d=Object(r.useState)(!1),g=Object(i.a)(d,2),O=g[0],j=g[1],y=Object(r.useState)({hold:!1,direction:"backwards",mountAnimating:!0}),x=Object(i.a)(y,2),w=x[0],S=x[1],F=Object(r.useState)(!1),M=Object(i.a)(F,2),C=M[0],k=M[1],A=Object(r.useState)(!1),D=Object(i.a)(A,2),B=D[0],R=D[1],L=Object(r.useState)(e.current[0]),T=Object(i.a)(L,2),N=T[0],P=T[1],I=Object(b.b)({opacity:B?1:0,config:{mass:1,friction:10,clamp:!0}}),z=Object(b.b)({color:c?"#FFFFFF":"#000000",config:{duration:130}}),_=Object(b.b)({backgroundColor:c?"#FFFFFF":"#000000",top:N,opacity:O?"1":"0",config:{clamp:!0}});return Object(r.useEffect)((function(){P((function(){return e.current[m]}))}),[m]),a.a.createElement("div",{className:"MobileAnimation"},a.a.createElement("div",{className:"logo",onClick:function(){j((function(){return!1}))}},c?a.a.createElement("img",{src:"../assets/logo_white.svg",alt:"Logo"}):a.a.createElement("img",{src:"../assets/logo.svg",alt:"Logo"}),a.a.createElement(b.a.div,{className:"scroll-indicator",style:_})),a.a.createElement(u.a,{style:{backgroundColor:c?"#26282C":"#F9FAFC"},className:"Canvas"},a.a.createElement(v,null),a.a.createElement(p,{radius:135,setInstructionsVisible:R,setEmailVisible:k,inPosition:[0,135,0],sphereState:w,outPosition:[0,60,646],setSphereState:S,breakPoint:468,setColorShowActive:j})),a.a.createElement(h,{chapterIndex:m,colorShowActive:O,setColorShowActive:j,setChapterIndex:f,setSphereState:S,darkMode:c}),a.a.createElement(b.a.div,{className:"hold-icon",style:I},c?a.a.createElement("img",{src:"../assets/holdicon_white.svg",alt:"Press and hold to learn more about Andy Mag"}):a.a.createElement("img",{src:"../assets/holdicon.svg",alt:"Press and hold to learn more about Andy Mag"}),a.a.createElement(b.a.p,{style:z},"Press and hold to learn more about Andy Mag")),a.a.createElement(E,{sphereState:w,emailVisible:C,darkMode:c,setDarkMode:o}))},j=function(){return a.a.createElement(O,null)},y=function(e){var t=e.chapterIndex,n=e.setChapterIndex,c=e.wheelThreshold,o=e.setBackgroundColor,u=e.setButtonShadow,l=e.setOrbMovingState,s=e.subscribeActive,m=Object(r.useRef)([Object(r.createRef)(),Object(r.createRef)(),Object(r.createRef)(),Object(r.createRef)()]),f=Object(r.useState)(null),d=Object(i.a)(f,2),p=d[0],h=d[1],g=Object(b.b)({opacity:s?0:1,zIndex:s?-1:2,config:{mass:1,friction:4,clamp:!0}}),E=Object(r.useCallback)((function(){null!==m.current&&m.current.forEach((function(e,t){null!==e.current&&(e.current.classList.remove("out-up"),e.current.classList.add("out-down"))}))}),[]);Object(r.useEffect)((function(){var e=m.current[0].current,t=void 0===e?null:e;null===t||void 0===t||t.classList.remove("out-down")}),[]),Object(r.useEffect)((function(){s?(o((function(){return"#231B1B"})),setTimeout(E,1e3)):null!==m.current&&null!==m.current[0].current&&m.current[0].current.classList.contains("out-down")&&m.current[0].current.classList.remove("out-down")}),[s,o,E]),function(e,t){var n=Object(r.useRef)(!1);Object(r.useEffect)((function(){n.current?e():n.current=!0}),t)}((function(){if(null!==t){var e=m.current[t].current,n=void 0===e?null:e;h((function(){return"in"})),null===n||void 0===n||n.classList.remove("out-down","out-up")}}),[t]);var v=Object(r.useCallback)((function(e){var n=e.deltaY;if(null===p&&Math.abs(n)>c&&null!==t){var r=m.current[t].current,a=void 0===r?null:r;n>0&&t<3?(null===a||void 0===a||a.classList.add("out-up"),h((function(){return"out-up"})),l((function(){return"out"}))):n<0&&t>0&&(null===a||void 0===a||a.classList.add("out-down"),h((function(){return"out-down"})),l((function(){return"out"})))}}),[t,c,p,l]);return a.a.createElement(b.a.div,{className:"Text grid",style:g},a.a.createElement("div",{className:"chapter out-down",onWheel:function(e){return v(e)},ref:m.current[0]},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h2",null,"The most damaging phrase in language is 'It's"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.06s"}},a.a.createElement("h2",null,"always been done that way'"))),a.a.createElement("span",{className:"spacer-top-1"},a.a.createElement("span",{style:{transitionDelay:"0.09s"},onTransitionEnd:function(){"out-up"===p?(n((function(){return 1})),o((function(){return"#D695C7"}))):"in"===p&&h((function(){return null}))}},a.a.createElement("h2",null,"- Admiral Grace Hopper")))),a.a.createElement("div",{className:"chapter out-down",ref:m.current[1],onWheel:function(e){return v(e)}},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h2",null,"Andy Mag is an experiential magazine that"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.06s"}},a.a.createElement("h2",null,"enables readers to interact (engage) with diverse"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.09s"},onTransitionEnd:function(){"out-up"===p?(n((function(){return 2})),o((function(){return"#9C95D6"})),u((function(){return"1px 2px 7px #877DD8, -1px -2px 7px #BAB7D3"}))):"out-down"===p?(n((function(){return 0})),o((function(){return"#D695AB"})),u((function(){return"1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"}))):"in"===p&&h((function(){return null}))}},a.a.createElement("h2",null,"themes and ideas.")))),a.a.createElement("div",{className:"chapter out-down",ref:m.current[2],onWheel:function(e){return v(e)}},a.a.createElement("span",null,a.a.createElement("span",{onTransitionEnd:function(){"out-up"===p?(n((function(){return 3})),o((function(){return"#95B1D6"})),u((function(){return"1px 2px 7px 0px #779FD4, -1px -2px 7px #BAC4D2"}))):"out-down"===p?(n((function(){return 1})),o((function(){return"#D695C7"})),u((function(){return"1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"}))):"in"===p&&h((function(){return null}))}},a.a.createElement("h2",null,"Because a great story is worth remembering.")))),a.a.createElement("div",{className:"chapter out-down",ref:m.current[3],onWheel:function(e){return v(e)}},a.a.createElement("span",null,a.a.createElement("span",{onTransitionEnd:function(){"out-down"===p?(n((function(){return 2})),o((function(){return"#9C95D6"})),u((function(){return"1px 2px 7px #877DD8, -1px -2px 7px #BAB7D3"}))):"in"===p&&h((function(){return null}))}},a.a.createElement("h2",null,"Subscribe to Andy Mag for updates.")))))},x=function(e){var t=e.pointerPosition,n=e.chapterIndex,c=e.orbMovingState,o=e.resetPointer,l=e.setOrbMovingState,p=e.subscribeActive,h=e.setSubscribeActive,b=e.setEmailActive,g=e.setOrbHold,E=e.orbHold,v=e.setScrollIndicatorHeight,O=e.setChapterIndex,j=e.setBackgroundColor,y=e.setButtonShadow,x=Object(u.f)().viewport,w=Object(r.useRef)(null),S=Object(r.useRef)(null),F=Object(r.useRef)(null),M=Object(r.useRef)([x.width<1280?-220:-260,0,0]),C=Object(r.useRef)(null),k=Object(r.useRef)(new f.Sphere),A=Object(r.useRef)([{textRef1:{position:[0,59,0],geometry:[690,26,0]},textRef2:{position:[0,6,0],geometry:[415,26,0]},textRef3:{position:[0,-60,0],geometry:[355,26,0]}},{textRef1:{position:[0,51,0],geometry:[647,26,0]},textRef2:{position:[0,-1,0],geometry:[748,26,0]},textRef3:{position:[0,-51,0],geometry:[272,26,0]}},{textRef1:{position:null,geometry:void 0},textRef2:{position:[0,0,0],geometry:[682,26,0]},textRef3:{position:null,geometry:void 0}},{textRef1:{position:null,geometry:void 0},textRef2:{position:[0,0,0],geometry:[537,26,0]},textRef3:{position:null,geometry:void 0}}]),D=Object(r.useMemo)((function(){var e=200;return x.width>=1280&&(e=240),[{pre:[-x.width/2+100,-x.height/2-e,0],start:[0,0,0]},{pre:[-x.width/2+180,x.height/2+e,0],start:[-250,0,0]},{pre:[x.width/2+180,-x.height/2-180,0],start:[50,0,0]},{pre:[x.width/2-200,x.height/2+e,0],start:[100,0,0]}]}),[]),B=Object(r.useRef)({resting:{mass:1e3,friction:1400,clamp:!1},intersecting:void 0,out:{mass:5,friction:4.5,clamp:!0},to:{duration:1},in:{mass:1e3,friction:1400,clamp:!1},subscribe:{tension:120,clamp:!0},subscribe_hold:{mass:70,tension:100,clamp:!0},at_threshold:{duration:600}}),R=Object(r.useRef)(null),L=Object(r.useRef)(new f.Box3(new f.Vector3,new f.Vector3)),T=Object(r.useRef)(null),N=Object(r.useRef)(new f.Box3(new f.Vector3,new f.Vector3)),P=Object(r.useRef)(null),I=Object(r.useRef)(new f.Box3(new f.Vector3,new f.Vector3)),z=Object(r.useRef)(null),_=Object(r.useRef)(new f.Box3(new f.Vector3,new f.Vector3)),V=Object(r.useState)(null),W=Object(i.a)(V,2),H=W[0],U=W[1],G=Object(r.useState)(D[n].pre),Y=Object(i.a)(G,2),J=Y[0],q=Y[1],K=Object(r.useState)("intersecting"===c),X=Object(i.a)(K,2),Z=X[0],$=X[1],Q=Object(r.useState)(1),ee=Object(i.a)(Q,2),te=ee[0],ne=ee[1],re=Object(r.useMemo)((function(){for(var e=[],t=0;t<1800;t++){var n=f.MathUtils.randFloatSpread(360),r=f.MathUtils.randFloatSpread(360),a=200*Math.sin(n)*Math.cos(r),c=200*Math.sin(n)*Math.sin(r),o=200*Math.cos(n);e.push([a,c,o])}return e.map((function(e){return Object(s.a)(f.Vector3,Object(m.a)(e))}))}),[]),ae=Object(r.useCallback)((function(){if(null!==w.current){var e=[w.current.position.x,w.current.position.y,w.current.position.z],t=J;if("subscribe"===c?!!t&&e.every((function(e,n){return Math.abs(e-t[n])<8})):!!t&&e.every((function(e,n){return e===t[n]})))switch(c){case"to":return"pre";case"subscribe":return"subscribe";case"at_threshold":return"at_threshold";default:return!1}return!1}return!1}),[c,J]),ce=Object(d.b)({position:J,opacity:te,transparent:0,config:Z?B.current.intersecting:B.current[c],onFrame:function(e){var t=e.opacity,r=ae();"pre"===r?(h((function(e){return!1})),v((function(){return 0})),l((function(){return"in"})),q((function(){return D[n].start}))):"subscribe"===r?b((function(){return!0})):"at_threshold"===r&&0===t&&(O((function(){return 0})),l((function(){return"to"})),b((function(){return!1})),g((function(){return!1})),q((function(){return D[0].pre})),j((function(){return"#D695AB"})),y((function(){return"1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"})))}}),oe=ce.position,ie=ce.opacity,ue=ce.transparent,le=Object(r.useCallback)((function(e){null!==w.current&&(w.current.rotation.y+=e)}),[]),se=Object(r.useCallback)((function(){null!==C.current&&C.current.geometry.computeBoundingSphere(),null!==R.current&&R.current.geometry.computeBoundingBox(),null!==T.current&&T.current.geometry.computeBoundingBox(),null!==P.current&&P.current.geometry.computeBoundingBox(),null!==z.current&&z.current.geometry.computeBoundingBox()}),[]),me=Object(r.useCallback)((function(){null!==k.current&&(x.width>900&&x.width<1280?k.current.radius=C.current.geometry.boundingSphere.radius:x.width>=1280&&(k.current.radius=C.current.geometry.boundingSphere.radius+40))}),[x]),fe=Object(r.useCallback)((function(){null!==k.current&&(k.current.center=new f.Vector3(C.current.position.x,C.current.position.y,C.current.position.z))}),[]),de=Object(r.useCallback)((function(){if(null!==w.current){var e={left:w.current.position.x+.5*x.width,right:.5*x.width-w.current.position.x,top:.5*x.height-w.current.position.y,bottom:w.current.position.y+.5*x.height},t=Math.min(e.left,e.right,e.top,e.bottom);if(t===e.left)return"left";if(t===e.right)return"right";if(t===e.bottom)return"bottom";if(t===e.top)return"top"}return null}),[x]),pe=Object(r.useCallback)((function(){var e=null;null!==t[0]&&null!==t[1]&&(e=[t[0]-window.innerWidth/2,-t[1]+window.innerHeight/2,0]);return e}),[t]),he=Object(r.useCallback)((function(e,t){var n=Math.max(t.min.x,Math.min(e.center.x,t.max.x)),r=Math.max(t.min.y,Math.min(e.center.y,t.max.y)),a=Math.max(t.min.z,Math.min(e.center.z,t.max.z));return Math.sqrt((n-e.center.x)*(n-e.center.x)+(r-e.center.y)*(r-e.center.y)+(a-e.center.z)*(a-e.center.z))<e.radius}),[]),be=Object(r.useCallback)((function(){var e;e=x.width>900&&x.width<1280?200:240,q((function(t){if(null!==t&&null!==w.current){var n=w.current.position.x,r=w.current.position.y,a=w.current.position.z;return"left"===F.current?n=-.5*x.width-e:"bottom"===F.current?r=-.5*x.height-e:"top"===F.current?r=.5*x.height+e:"right"===F.current&&(n=.5*x.width+e),[n,r,a]}return null}))}),[x]),ge=Object(r.useCallback)((function(){return!p&&(he(k.current,L.current)||he(k.current,_.current)||he(k.current,N.current)||he(k.current,I.current))}),[he,p]);return Object(r.useEffect)((function(){se(),_.current.setFromObject(z.current),me(),fe()}),[se,me,fe]),Object(r.useEffect)((function(){l((function(){return"to"})),q((function(){return D[n].pre})),L.current.setFromObject(R.current),N.current.setFromObject(T.current),I.current.setFromObject(P.current)}),[n,l,D]),Object(r.useEffect)((function(){x.width>900&&x.width<1280?(U((function(){return[1,1,1]})),me()):(U((function(){return[1.2,1.2,1.2]})),me())}),[x,me]),Object(r.useEffect)((function(){"out"===c?(be(),o()):"at_threshold"===c?ne((function(){return 0})):"to"===c&&ne((function(e){return 0===e?1:e}))}),[c,be,o]),Object(r.useEffect)((function(){p?l((function(){return"subscribe"})):ne((function(e){return 0===e?1:e}))}),[p,l]),Object(r.useEffect)((function(){l((function(e){return"subscribe"===e&&!0===E?"subscribe_hold":"subscribe_hold"===e&&!1===E?"subscribe":e}))}),[E,l]),Object(u.e)((function(){null!==w.current&&(le(.001),fe(),F.current=de(),ge()?($((function(){return!0})),q((function(){return S.current}))):($((function(){return!1})),S.current=[w.current.position.x,w.current.position.y,w.current.position.z],"subscribe"===c?(q((function(){return M.current=[x.width<1280?-220:-260,0,0],[x.width<1280?-220:-260,0,0]})),v((function(e){if(null!==w.current&&M.current[1]-w.current.position.y<1){var t=M.current[0],n=w.current.position.x,r=0;return null!==n&&(r=Math.abs(t-n)/Math.abs(t)),47.2*r}return e}))):"resting"===c?q((function(e){return"resting"===c&&null!==t[0]&&null!==t[1]?pe():e})):"in"===c?q((function(e){return null!==t[0]&&null!==t[1]?(l((function(){return"resting"})),pe()):e})):"subscribe_hold"===c&&(q((function(){return[0,0,0]})),v((function(e){if(null!==w.current&&M.current[1]-w.current.position.y<1){var t=M.current[0],n=w.current.position.x,r=0;return null!==n&&(r=Math.abs(t-n)/Math.abs(t)),1===r&&l((function(){return"at_threshold"})),47.2*r}return e})))))})),a.a.createElement(a.a.Fragment,null,a.a.createElement("group",null,a.a.createElement(d.a.mesh,{onPointerDown:function(){return g((function(e){return"subscribe"===c||"subscribe_hold"===c||e}))},onPointerUp:function(){return g((function(e){return"subscribe"!==c&&"subscribe_hold"!==c&&e}))},ref:C,scale:H,position:oe},a.a.createElement("sphereBufferGeometry",{attach:"geometry",args:[200,32,32,0,2*Math.PI,0,Math.PI]}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0,side:f.DoubleSide})),a.a.createElement(d.a.points,{onPointerDown:function(){return g((function(){return!0}))},onPointerUp:function(){return g((function(){return!1}))},ref:w,scale:H,position:oe},a.a.createElement("geometry",{attach:"geometry",vertices:re}),a.a.createElement(d.a.pointsMaterial,{attach:"material",color:new f.Color(13383628),size:2.5,transparent:ue,opacity:ie}))),a.a.createElement("group",null,a.a.createElement("mesh",{ref:R,position:A.current[n].textRef1.position},a.a.createElement("boxGeometry",{attach:"geometry",args:A.current[n].textRef1.geometry}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0})),a.a.createElement("mesh",{ref:T,position:A.current[n].textRef2.position},a.a.createElement("boxGeometry",{attach:"geometry",args:A.current[n].textRef2.geometry}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0})),a.a.createElement("mesh",{ref:P,position:A.current[n].textRef3.position},a.a.createElement("boxGeometry",{attach:"geometry",args:A.current[n].textRef3.geometry}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0})),a.a.createElement("mesh",{ref:z,position:[0,-x.height/2.65,0]},a.a.createElement("boxGeometry",{attach:"geometry",args:[280,50,0]}),a.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0}))))},w=function(e){var t=e.emailActive,n=e.orbHold,c=Object(r.useState)(null),o=Object(i.a)(c,2),u=o[0],l=o[1],s=Object(r.useState)(""),m=Object(i.a)(s,2),f=m[0],d=m[1],p=Object(r.useState)(!1),h=Object(i.a)(p,2),g=h[0],E=h[1],v=Object(r.useRef)(null),O=Object(b.b)({opacity:n?0:1,visibility:n?"hidden":"visible",config:{mass:2,friction:2,clamp:!0}});Object(r.useEffect)((function(){null!==v.current&&(t?v.current.classList.add("active"):v.current.classList.remove("active"),g?v.current.classList.add("focused"):v.current.classList.remove("focused"))}),[t,g,f]);return a.a.createElement(b.a.div,{className:"DesktopEmail grid",ref:v,style:O},a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={email:f},n={method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(t)};fetch("http://localhost:3000/subscribe",n).then((function(e){return e.json()})).then((function(e){console.log(e),202===e.statusCode?l(!0):l(!1)})).catch((function(e){return console.log(e)}))},className:u?"desktopEmailWrapper Email success":"false"===u?"desktopEmailWrapper Email fail":"desktopEmailWrapper Email"},a.a.createElement("span",null,a.a.createElement("span",null,a.a.createElement("h3",null,"STAY UPDATED WITH THE"))),a.a.createElement("span",null,a.a.createElement("span",{style:{transitionDelay:"0.05s"}},a.a.createElement("h3",null,"ANDY MAG NEWSLETTER"))),a.a.createElement("label",null,a.a.createElement("h4",null,"Email")),g?a.a.createElement("img",{className:"submitIcon",src:"../assets/paper_plane_purple.svg",alt:"Submit"}):a.a.createElement("img",{className:"submitIcon",src:"../assets/paper_plane_white.svg",alt:"Submit"}),a.a.createElement("input",{onFocus:function(){return E((function(){return!0}))},onBlur:function(){(void 0===f||f.length<1)&&E((function(){return!1}))},type:"email",value:f,onChange:function(e){return d(e.currentTarget.value)},required:!0})))},S=function(){var e=Object(r.useState)(0),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)("#D695AB"),l=Object(i.a)(o,2),s=l[0],m=l[1],f=Object(r.useState)(!1),d=Object(i.a)(f,2),p=d[0],h=d[1],g=Object(r.useState)(!1),E=Object(i.a)(g,2),v=E[0],O=E[1],j=Object(r.useState)("1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3"),S=Object(i.a)(j,2),F=S[0],M=S[1],C=Object(r.useRef)([0,10,19,28.2]),k=Object(r.useState)(C.current[0]),A=Object(i.a)(k,2),D=A[0],B=A[1],R=Object(r.useState)(0),L=Object(i.a)(R,2),T=L[0],N=L[1],P=Object(r.useState)(null),I=Object(i.a)(P,2),z=I[0],_=(I[1],Object(r.useState)("resting")),V=Object(i.a)(_,2),W=V[0],H=V[1],U=Object(r.useState)(!1),G=Object(i.a)(U,2),Y=G[0],J=G[1],q=Object(r.useState)([null,null]),K=Object(i.a)(q,2),X=K[0],Z=K[1],$=Object(r.useRef)(40),Q=Object(r.useRef)(null),ee=Object(b.b)({top:p?"auto":D,bottom:p?1:"auto",height:p?T:19,config:{clamp:!0},backgroundColor:p?"white":"black"});Object(r.useEffect)((function(){B((function(){return C.current[n]}))}),[n]);var te=Object(r.useCallback)((function(){Z((function(){return[null,null]}))}),[]),ne=Object(b.b)({opacity:p?0:1,config:{mass:1,friction:4,clamp:!0}});return a.a.createElement("div",{ref:Q,className:"DesktopAnimation",style:{backgroundColor:s},onPointerMove:function(e){var t=e.clientX,n=e.clientY;Z((function(){return[t,n]}))}},a.a.createElement(u.a,{className:"Orb",style:{position:"absolute"},orthographic:!0,camera:{left:z?-z.width/2:void 0,right:z?z.width/2:void 0,top:z?z.height/2:void 0,bottom:z?-z.height/2:void 0,near:300,far:-300}},a.a.createElement(x,{setBackgroundColor:m,setButtonShadow:M,setChapterIndex:c,setScrollIndicatorHeight:N,orbHold:Y,setOrbHold:J,setEmailActive:O,pointerPosition:X,chapterIndex:n,orbMovingState:W,resetPointer:te,setOrbMovingState:H,subscribeActive:p,setSubscribeActive:h})),a.a.createElement("div",{className:"logo",onClick:function(){return c((function(){return 0}))}},p?a.a.createElement("img",{src:"../assets/logo_white.svg",alt:"Logo"}):a.a.createElement("img",{src:"../assets/logo.svg",alt:"Logo"}),a.a.createElement(b.a.div,{className:"scroll-indicator",style:ee})),a.a.createElement(y,{chapterIndex:n,setChapterIndex:c,wheelThreshold:$.current,setBackgroundColor:m,setButtonShadow:M,setOrbMovingState:H,subscribeActive:p}),a.a.createElement(b.a.div,{className:"SubscribeButton",style:ne},a.a.createElement("button",{onClick:function(){return h((function(){return!0}))},style:{boxShadow:F}},"SUBSCRIBE")),a.a.createElement("div",{className:"SocialMedia"},a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.snapchat.com/add/theandymag"},a.a.createElement("img",{src:"../assets/snapchat.svg",alt:"Snapchat"})),a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/theandymag/"},a.a.createElement("img",{src:"../assets/instagram.svg",alt:"Instagram"})),a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://twitter.com/theandymag_"},a.a.createElement("img",{src:"../assets/twitter.svg",alt:"Twitter"}))),a.a.createElement(w,{orbHold:Y,emailActive:v}))};var F=function(){var e=Object(r.useState)(window.innerWidth<=900),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(r.useCallback)((function(){window.innerWidth<=900?c(!0):c(!1)}),[]);return Object(r.useEffect)((function(){window.addEventListener("resize",o)}),[o]),a.a.createElement("div",{className:"App"},n?a.a.createElement(j,null):a.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.7b946dd3.chunk.js.map