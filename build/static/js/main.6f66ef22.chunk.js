(this["webpackJsonpam-newsletter"]=this["webpackJsonpam-newsletter"]||[]).push([[0],{37:function(e,t,n){e.exports=n(61)},41:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(27),i=n.n(o),c=n(3),l=(n(41),n(13)),s=n(22),u=n(8),d=n(5),m=n(15),f=function(e){var t=e.radius,n=e.startPosition,o=e.sphereState,i=e.setSphereState,c=e.setGradientActive,f=e.breakPoint,b=e.endPosition,h=e.setEmailVisible,p=e.setInstructionsVisible,F=Object(a.useRef)(null),g=Object(a.useRef)(null),v=Object(a.useRef)(n),j=Object(m.b)({config:{mass:1.8,tension:84,friction:22,clamp:!0},pointsPosition:o.hold?b:n,circlePosition:o.hold?b:n,onFrame:function(e){v.current=e.pointsPosition,v.current[2]>0&&v.current[2]<50&&("backwards"===o.direction?(h((function(){return!0})),p((function(){return!0}))):(h((function(){return!1})),p((function(){return!1}))))},onRest:function(e){v.current.length===b.length&&v.current.every((function(e,t){return e===b[t]}))&&c((function(){return!0}))}});Object(l.e)((function(){if(F.current)return F.current.rotation.y=F.current.rotation.y+.003}));var O=Object(a.useCallback)((function(){v.current[2]>=f?i({hold:!0,direction:"forwards"}):i({hold:!1,direction:"backwards"})}),[i,f]),y=Object(a.useMemo)((function(){for(var e=[],n=0;n<1600;n++){var a=d.MathUtils.randFloatSpread(360),r=d.MathUtils.randFloatSpread(360),o=t*Math.sin(a)*Math.cos(r),i=t*Math.sin(a)*Math.sin(r),c=t*Math.cos(a);e.push([o,i,c])}return e.map((function(e){return Object(s.a)(d.Vector3,Object(u.a)(e))}))}),[t]);return r.a.createElement("group",null,r.a.createElement(m.a.mesh,{rotation:[-Math.PI/2,0,0],ref:g,onPointerDown:function(){return i({hold:!0,direction:"forwards"})},onPointerUp:function(){return O()},position:j.circlePosition},r.a.createElement("sphereBufferGeometry",{attach:"geometry",args:[130,32,32,0,2*Math.PI,0,.7*Math.PI]}),r.a.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0,side:d.DoubleSide})),r.a.createElement(m.a.points,{ref:F,position:j.pointsPosition},r.a.createElement("geometry",{attach:"geometry",vertices:y}),r.a.createElement("pointsMaterial",{attach:"material",color:new d.Color(13383628),size:2})))},b=n(19),h=n(7),p=n(36),F=function(e){var t=e.gradientActive,n=e.swipeThreshold,o=e.children,i=e.chapterConfigs,s=e.setGradientActive,u=e.setSphereState,d=e.chapterIndex,f=e.setChapterIndex,F=e.darkMode,g=Object(a.useRef)(void 0),v=Object(a.useRef)(null),j=Object(a.useRef)(r.a.Children.toArray(o).length),O=Object(a.useRef)(7),y=Object(a.useRef)([25,33.8,42.7,51.5]),E=Object(a.useState)({active:!1,initial_y_direction:null,x_start:null,y_start:null,y_travel:null,x_travel:null,swipePercentage:null}),C=Object(c.a)(E,2),x=C[0],w=C[1],S=Object(a.useState)(1),_=Object(c.a)(S,2),M=_[0],k=_[1],P=Object(a.useState)(0),A=Object(c.a)(P,2),I=A[0],N=A[1],R=Object(a.useState)(i[0].textColor),L=Object(c.a)(R,2),B=L[0],T=L[1],D=Object(a.useState)(i[0].lightColor),G=Object(c.a)(D,2),V=G[0],z=G[1],U=Object(a.useState)([0,0,0]),W=Object(c.a)(U,2),J=W[0],Y=W[1],X=Object(a.useState)([0,0,0]),q=Object(c.a)(X,2),H=q[0],$=(q[1],Object(a.useState)(i[0].planeColor)),K=Object(c.a)($,2),Q=K[0],Z=K[1],ee=Object(a.useState)(i[0].lightIntensity),te=Object(c.a)(ee,2),ne=te[0],ae=te[1],re=Object(a.useState)(y.current[0]),oe=Object(c.a)(re,2),ie=oe[0],ce=oe[1],le=Object(a.useMemo)((function(){return F?"#000000":"#FFFFFF"}),[F]),se=Object(m.b)({color:Q}),ue=Object(m.b)({position:J,color:V,rotation:H,intensity:ne,config:{mass:1,friction:8,tension:70,clamp:!0},onRest:function(e){null===d&&J.every((function(e){return 0===e}))&&(s((function(){return!1})),u((function(){return{hold:!1,direction:"backwards"}})),setTimeout((function(){return f((function(){return 0}))}),500))}}),de=Object(h.b)({backgroundColor:F?"#FFFFFF":"#000000",top:ie,opacity:null===d?"0":"1",config:{clamp:!0}}),me=Object(h.b)({zIndex:t?4:-1,opacity:t?1:0,immediate:function(e){return"zIndex"===e}}),fe=Object(a.useCallback)((function(){f((function(){return null}))}),[f]),be=Object(a.useCallback)((function(){w((function(){return{active:!1,initial_y_direction:null,x_start:null,y_start:null,y_travel:null,x_travel:null,swipePercentage:null}}))}),[]),he=Object(a.useCallback)((function(){z((function(){return null===d?le:i[d].lightColor})),T((function(){return null===d?le:i[d].textColor})),ae((function(){return null===d?2:i[d].lightIntensity})),Z((function(){return null===d?le:i[d].planeColor})),Y((function(){return[0,0,0]})),N((function(){return 0})),k((function(){return 1}))}),[d,i,le]),pe=Object(a.useCallback)((function(e){var t=e.clientY,n=e.clientX;w((function(e){var a={active:!0,x_start:n,y_start:t};return Object(b.a)(Object(b.a)({},e),a)}))}),[]),Fe=Object(a.useCallback)((function(e){be()}),[be]),ge=Object(a.useCallback)((function(e){if(x.active){e.preventDefault();var t=e.clientY,a=e.clientX;w((function(e){var r,o=e.y_start?t-e.y_start:null,i=e.x_start?a-e.x_start:null;if(null===e.initial_y_direction){var c=null;o&&(o<0?c="up":o>0&&(c="down")),r={y_travel:o,x_travel:i,initial_y_direction:c}}else if(null!==e.initial_y_direction){var l=null!==o?o/n:null;"up"===e.initial_y_direction?l&&l<0&&(Math.abs(l)<.1&&(l=0),r={y_travel:o,x_travel:i,swipePercentage:l}):"down"===e.initial_y_direction&&null!==d&&d>0&&l&&l>0&&(Math.abs(l)<.1&&(l=0),r={y_travel:o,x_travel:i,swipePercentage:l})}return Object(b.a)(Object(b.a)({},e),r)}))}}),[x,n,d]);return Object(a.useEffect)((function(){var e=v.current;return e&&(e.addEventListener("pointerdown",pe),e.addEventListener("pointermove",ge,!1),e.addEventListener("pointerup",Fe)),function(){e&&(e.removeEventListener("pointerdown",pe),e.removeEventListener("pointermove",ge,!1),e.removeEventListener("pointerup",Fe))}}),[ge,pe,Fe]),Object(a.useEffect)((function(){var e=x.active,t=x.swipePercentage,n=x.initial_y_direction;if(e)if(null!==t){var a=Math.abs(t);a>=1?(t<0?d===j.current-1?fe():f((function(e){return null!==e?e+1:e})):f((function(e){return null!==e?e-1:e})),be()):a>=0&&a<1&&(N((function(){return 4+a*O.current})),k((function(){return 1-.5*a})),a>=.7?Y((function(){return[48,120,72]})):a>=.5?Y((function(){return[36,90,54]})):a>=.1&&Y((function(){return[27,67.5,40.5]})))}else null===n?(N((function(){return 3.5})),Y((function(){return[10,-52.5,31.5]}))):0===d&&"down"===n&&be();else he()}),[x,d,be,he,fe,f]),function(e,t){var n=Object(a.useRef)(!1);Object(a.useEffect)((function(){n.current?e():n.current=!0}),t)}((function(){z((function(){return null===d?le:i[d].lightColor})),T((function(){return null===d?le:i[d].textColor})),ae((function(){return null===d?2:i[d].lightIntensity})),Z((function(){return null===d?le:i[d].planeColor})),Y((function(){return[0,0,0]})),k((function(){return 1})),N((function(){return 0})),ce((function(e){return null===d?e:y.current[d]}))}),[d,i,le]),r.a.createElement(h.a.div,{className:"GradientShow",style:me,ref:v},r.a.createElement(h.a.div,{className:"scroll-indicator",style:de}),r.a.createElement("div",{className:"grid"},r.a.createElement(p.Transition,{items:d,from:{opacity:0,textShadow:"0px 0px 0px ".concat(B),immediate:function(e){return"textShadow"===e}},update:{opacity:M,textShadow:"0px 0px ".concat(I,"px ").concat(B),config:{mass:1,tension:190,friction:20,clamp:!0}},enter:{opacity:1},leave:{textShadow:"0px 0px ".concat(O,"px black"),opacity:0,config:{mass:1,friction:10,clamp:!0}}},(function(e){return function(t){return null!==e?r.a.cloneElement(r.a.Children.toArray(o)[e],{style:t}):null}})),r.a.createElement(l.a,{className:"gradient"},r.a.createElement(m.a.rectAreaLight,{position:ue.position,color:ue.color,rotation:ue.rotation,intensity:ue.intensity,width:150,height:550,lookAt:function(){return g.current&&g.current.position}}),r.a.createElement("mesh",{position:[0,0,-80],ref:g},r.a.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,1e3]}),r.a.createElement(m.a.meshPhysicalMaterial,{attach:"material",color:se.color})))))},g=function(e){var t=e.darkMode,n=Object(a.useState)(null),o=Object(c.a)(n,2),i=o[0],l=o[1],s=Object(a.useState)(""),u=Object(c.a)(s,2),d=u[0],m=u[1],f=Object(h.b)({color:t?"#FFFFFF":"#000000",borderBottom:t?"1.5px solid #FFFFFF":"1.5px solid #000000",config:{duration:130}}),b=Object(h.b)({boxShadow:t?"inset 0px 0px 1px 0px #FFFFFF":"inset 0px 0px 2px 1px #FFFFFF",immediate:function(e){return"boxShadow"===e}});return r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={email:d},n={method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(t)};fetch("http://localhost:3000/subscribe",n).then((function(e){return e.json()})).then((function(e){console.log(e),202===e.statusCode?l(!0):l(!1)})).catch((function(e){return console.log(e)}))},className:i?"Email success":"false"===i?"Email fail":"Email"},r.a.createElement(h.a.input,{className:t?"darkmode":"",style:f,type:"email",value:d,placeholder:"email",onChange:function(e){return m(e.currentTarget.value)},required:!0}),r.a.createElement(h.a.input,{style:b,type:"submit",value:"SUBSCRIBE"}))},v=function(e){e.sphereState;var t=e.emailVisible,n=e.darkMode,a=e.setDarkMode,o=Object(h.b)({config:{mass:1,friction:20,clamp:!0},opacity:t?1:0,bottom:t?0:-6,backgroundColor:n?"#000B23":"#F4F4F4",immediate:function(e){return["backgroundColor"].includes(e)}}),i=Object(h.b)({color:n?"#FFFFFF":"#000000",config:{duration:130}}),c=Object(h.b)({border:n?"2px solid #FFFFFF":"2px solid #000000",color:n?"#FFFFFF":"#000000",config:{duration:130}});return r.a.createElement(h.a.div,{className:"MobileEmailForm",style:o},r.a.createElement(h.a.p,{style:i},"STAY UPDATED"),r.a.createElement(g,{darkMode:n}),r.a.createElement(h.a.button,{style:c,className:"mode-switch",onClick:function(){return a((function(){return!n}))}},n?"L":"D"))},j=function(){var e=Object(a.useState)(!1),t=Object(c.a)(e,2),n=t[0],o=t[1],i=Object(a.useState)(!1),s=Object(c.a)(i,2),u=s[0],d=s[1],m=Object(a.useState)(0),b=Object(c.a)(m,2),p=b[0],g=b[1],j=Object(a.useState)({hold:!1,direction:null}),O=Object(c.a)(j,2),y=O[0],E=O[1],C=Object(a.useState)(!0),x=Object(c.a)(C,2),w=x[0],S=x[1],_=Object(a.useState)(!0),M=Object(c.a)(_,2),k=M[0],P=M[1],A=Object(a.useMemo)((function(){return n?[{lightIntensity:0,textColor:"#972C95",planeColor:"#000000",lightColor:"#000000"},{lightIntensity:1.45,textColor:"#000000",planeColor:"#FFFFFF",lightColor:"#EAEAEA"},{lightIntensity:1.3,textColor:"#C9C9C9",planeColor:"#FFFFFF",lightColor:"#e75a81"},{lightIntensity:2,textColor:"#e75a81",planeColor:"#FFFFFF",lightColor:"#FFFFFF"}]:[{lightIntensity:2,textColor:"#972C95",planeColor:"#FFFFFF",lightColor:"#FFFFFF"},{lightIntensity:1.3,textColor:"#FFFFFF",planeColor:"#FFFFFF",lightColor:"#e75a81"},{lightIntensity:1.45,textColor:"#e75a81",planeColor:"#FFFFFF",lightColor:"#EAEAEA"},{lightIntensity:1,textColor:"#C9C9C9",planeColor:"#FFFFFF",lightColor:"#000000"}]}),[n]),I=Object(h.b)({opacity:k?1:0,config:{mass:1,friction:10,clamp:!0}}),N=Object(h.b)({color:n?"#FFFFFF":"#000000",config:{duration:130}});return r.a.createElement("div",{className:"MobileAnimation"},r.a.createElement("div",{className:"logo",onClick:function(){u&&g((function(){return null}))}},n?r.a.createElement("img",{src:"../assets/logo_white.svg",alt:"Logo"}):r.a.createElement("img",{src:"../assets/logo.svg",alt:"Logo"})),r.a.createElement(l.a,{style:{backgroundColor:n?"#000000":"transparent"},className:"Canvas",camera:{position:[0,0,500]}},r.a.createElement(f,{radius:135,setInstructionsVisible:P,setEmailVisible:S,startPosition:[0,135,0],sphereState:y,endPosition:[0,-120,646],setSphereState:E,setGradientActive:d,breakPoint:468})),r.a.createElement(F,{darkMode:n,chapterIndex:p,setChapterIndex:g,gradientActive:u,swipeThreshold:150,chapterConfigs:A,setGradientActive:d,setSphereState:E},r.a.createElement("div",{className:"text"},r.a.createElement("h2",null,"The most damaging phrase in language is 'It's always been done that way.'"),r.a.createElement("h4",{className:"spacer-top-1"},"- Admiral Grace Hopper"),r.a.createElement("p",{className:"begin"},"Scroll to begin.")),r.a.createElement("div",{className:"text"},r.a.createElement("h2",null,"Andy Mag is an experiential magazine that enables readers to interact (engage) with diverse themes and ideas.")),r.a.createElement("div",{className:"text"},r.a.createElement("h2",null,"Because a great story is worth remembering.")),r.a.createElement("div",{className:"text"},r.a.createElement("h2",null,"Subscribe to Andy Mag for updates."))),r.a.createElement(h.a.div,{className:"hold-icon",style:I},n?r.a.createElement("img",{src:"../assets/holdicon_white.svg",alt:"Press and hold to learn more about Andy Mag"}):r.a.createElement("img",{src:"../assets/holdicon.svg",alt:"Press and hold to learn more about Andy Mag"}),r.a.createElement(h.a.p,{style:N},"Press and hold to learn more about Andy Mag")),r.a.createElement(v,{sphereState:y,emailVisible:w,darkMode:n,setDarkMode:o}))},O=function(){return r.a.createElement(j,null)};var y=function(){var e=Object(a.useState)(window.innerWidth<=900),t=Object(c.a)(e,2),n=t[0],o=t[1],i=Object(a.useCallback)((function(){window.innerWidth<=900?o(!0):o(!1)}),[]);return Object(a.useEffect)((function(){window.addEventListener("resize",i)}),[i]),r.a.createElement("div",{className:"App"},n&&r.a.createElement(O,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.6f66ef22.chunk.js.map