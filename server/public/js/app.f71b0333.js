(function(t){function e(e){for(var n,r,a=e[0],c=e[1],u=e[2],d=0,p=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&p.push(o[r][0]),o[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,u||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],n=!0,a=1;a<s.length;a++){var c=s[a];0!==o[c]&&(n=!1)}n&&(i.splice(e--,1),t=r(r.s=s[0]))}return t}var n={},o={app:0},i=[];function r(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=n,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(s,n,function(e){return t[e]}.bind(null,n));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var l=c;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("d3b7"),s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("2b0e"),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task",attrs:{id:"app"}},[s("ToastHolder"),s("router-view"),t._m(0)],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task__footer"},[s("p",[t._v("footer")])])}],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toast"},t._l(t.Toasts,(function(t){return s("Toast",{key:t.id,attrs:{data:t}})})),1)},a=[],c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toast",class:{ERROR:t.data.isError}},[s("div",{staticClass:"toast__content"},[t._v(" "+t._s(t.data)+" ")]),s("button",{staticClass:"toast__close",on:{click:t.closeToast}},[t._v(" X ")])])},u=[];function l(){return{id:-1,title:"",message:"",status:"",isError:!1,isTimed:!1,time:-1}}var d={name:"Toast",props:{data:l()},methods:{closeToast:function(){this.$store.commit("toasts/toastRemove",this.data)}}},p=d,h=s("2877"),f=Object(h["a"])(p,c,u,!1,null,null,null),m=f.exports,_={name:"ToastHolder",components:{Toast:m},computed:{Toasts:function(){return this.$store.getters["toasts/toasts"]}},methods:{clearAllToasts:function(){this.$store.commit("toasts/toastRemoveAll")}}},E=_,v=Object(h["a"])(E,r,a,!1,null,null,null),C=v.exports,w={name:"App",components:{ToastHolder:C}},k=w,j=Object(h["a"])(k,o,i,!1,null,null,null),g=j.exports,S=s("2f62"),T=(s("b0c0"),s("bc3a")),L=s.n(T);function R(t,e){return L.a.get(t,e)}function D(t,e){return L.a.post(t,e)}function O(t,e){return L.a.put(t,e)}function x(t,e){return L.a.patch(t,e)}function A(t,e){return L.a.delete(t,e)}L.a.defaults.headers.common["Accept-Version"]="v1",L.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";var b={get:R,post:D,put:O,patch:x,remove:A},I=b,$="user_token",y="user_payload";function P(t){return t.data&&t.data.data&&t.data.data.account?(localStorage.setItem(y,JSON.stringify(t.data.data.account)),t):(localStorage.setItem(y,""),t)}function U(){var t=localStorage.getItem(y);if(void 0!==t&&"undefined"!==t&&null!==t)return JSON.parse(t)}function B(){N()}function M(t){return t.data&&t.data.data&&t.data.data.token?(localStorage.setItem($,t.data.data.token),V(t.data.data.token),t):(localStorage.setItem($,null),K(),t)}function N(){var t=localStorage.getItem($);t?V(t):K()}function V(t){L.a.defaults.headers.common.authorization="Bearer ".concat(t)}function K(){L.a.defaults.headers.common.authorization=null}function W(){return I.get("/api/user").then((function(t){return M(t)})).then((function(t){return P(t)}))}function Y(t){return I.post("/api/user",t).then((function(t){return M(t)})).then((function(t){return P(t)}))}function H(t){return I.post("/api/user/anon",t).then((function(t){return P(t)}))}function J(t){return I.post("/api/user/login",t).then((function(t){return M(t)})).then((function(t){return P(t)}))}function Z(){return I.post("/api/user/logout").then((function(t){return M(t)})).then((function(t){return P(t)}))}function F(t){return I.patch("/api/user",t).then((function(t){return M(t)})).then((function(t){return P(t)}))}function G(t){return I.post("/api/user/reset",t).then((function(t){return M(t)})).then((function(t){return P(t)}))}function q(t){return I.patch("/api/user/reset/".concat(t.verify),t).then((function(t){return M(t)})).then((function(t){return P(t)}))}function X(t){return I.get("/api/user/verify/".concat(t)).then((function(t){return M(t)})).then((function(t){return P(t)}))}B();var z={create:Y,createAnon:H,login:J,logout:Z,update:F,verify:X,get:W,getUser:U,resetStart:G,resetComplete:q},Q=z;function tt(){var t=Q.getUser();return void 0!==t?t:{id:-1,name:"",email:"",role:"user"}}var et={namespaced:!0,state:{user:tt()},getters:{user:function(t){return t.user}},mutations:{user:function(t,e){t.user.id=e.id,t.user.name=e.name,t.user.email=e.email,t.user.role=e.role}},actions:{createAnon:function(t){return Q.createAnon().then((function(e){return t.commit("user",e.data.data.account),e.data.data.account}))}}},st=(s("4de4"),-1),nt=null,ot=10,it=1e3;function rt(t){st+=1;var e=t.title?t.title:"",s=t.response&&t.response&&t.response.data?t.response.data.message:t.message,n=!t.isError||t.isError,o=!!t.isTimed&&t.isTimed,i=function(){return t.isTimed?ot:-1};return{id:st,title:e,message:s,isError:n,isTimed:o,time:i()}}function at(t){nt||(nt=setTimeout((function(){ut(t)}),it))}function ct(){clearTimeout(nt),nt=null}function ut(t){for(var e=!0,s=t.toasts.length-1;s>=0;s--)t.toasts[s].isTimed&&t.toasts[s].time>=0&&(t.toasts[s].time-=1,t.toasts[s].isTimed&&t.toasts[s].time<0&&n["a"].delete(t.toasts,s),e=!1);e?ct():(nt=null,at(t))}var lt={namespaced:!0,state:{toasts:[]},getters:{toasts:function(t){return t.toasts},toast:function(t){return function(e){return t.toasts.filter((function(t){return t.id===e}))}}},mutations:{toastAdd:function(t,e){var s=rt(e);return t.toasts.push(s),s.isTimed>=0&&at(t),e},toastRemove:function(t,e){for(var s=0,o=t.toasts.length;s<o;s++)if(t.toasts[s].id===e.id)return n["a"].delete(t.toasts,s),e},toastRemoveAll:function(t){n["a"].set(t,"toasts",[])}},actions:{}};s("7db0"),s("a434");function dt(t){return I.get("/api/tasks",{params:t})}function pt(t){return I.get("/api/task/".concat(t.id))}function ht(t){return I.post("/api/task/create",t)}function ft(t){return I.patch("/api/task/".concat(t.id),t)}function mt(t){return I.put("/api/task/".concat(t.id),t)}function _t(t){return I.remove("/api/task/".concat(t.id),t)}var Et={all:dt,get:pt,create:ht,update:ft,replace:mt,remove:_t},vt=Et,Ct={namespaced:!0,state:{tasks:[],current:{}},getters:{current:function(t){return t.current},tasks:function(t){return t.tasks},task:function(t){return function(e){return t.tasks.find((function(t){return t.id===e}))}}},mutations:{taskCurrent:function(t,e){n["a"].set(t,"current",e)},taskAdd:function(t,e){return t.tasks.unshift(e),e},taskReplace:function(t,e){for(var s=0,n=t.tasks.length;s<n;s++)if(t.tasks[s].id===e.id)return t.tasks.splice(s,1,e),t.tasks[s]},taskRemove:function(t,e){for(var s=0,n=t.tasks.length;s<n;s++)if(t.tasks[s].id===e.id)return t.tasks.splice(s,1),e},taskSet:function(t,e){n["a"].set(t,"tasks",e)}},actions:{create:function(t,e){return vt.create(e).then((function(e){return t.commit("taskCurrent",e.data.data.task),t.commit("taskAdd",e.data.data.task)}))},update:function(t,e){return vt.update(e).then((function(e){return t.commit("taskReplace",e.data.data.task)}))},remove:function(t,e){return vt.remove(e).then((function(){return t.commit("taskRemove",e)}))},getTasksByUserOrProject:function(t,e){return vt.all(e).then((function(e){return t.commit("taskSet",e.data.data.tasks),e.data.data.tasks}))}}},wt=500,kt=250,jt=33,gt=900,St=6e3,Tt=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return{id:-1,name:"Project",user:t,tasksDone:0,tasksTotal:0}},Lt=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return{name:"Project",user:t,tasksDone:0,tasksTotal:0}},Rt=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return{id:-1,text:"Task",project:-1,user:t,isDone:!1}},Dt={DELAY:wt,DELAY_BLIP:jt,DELAY_SHORT:kt,DELAY_SUCCESS:gt,DELAY_ERROR:St,DEFAULT_PROJECT:Tt,DEFAULT_PROJECT_NO_ID:Lt,DEFAULT_TASK:Rt};function Ot(t){return I.get("/api/projects",{params:t})}function xt(t){return I.get("/api/project/".concat(t.id))}function At(t){return I.post("/api/project/create",t)}function bt(t){return I.patch("/api/project/".concat(t.id),t)}function It(t){return I.remove("/api/project/".concat(t.id))}var $t={all:Ot,get:xt,create:At,update:bt,remove:It},yt=$t,Pt={namespaced:!0,state:{projects:[],current:Dt.DEFAULT_PROJECT()},getters:{current:function(t){return t.current},projects:function(t){return t.projects},project:function(t){return function(e){return t.projects.find((function(t){return t.id===e}))}}},mutations:{projectCurrent:function(t,e){n["a"].set(t,"current",e)},projectAdd:function(t,e){return t.projects.unshift(e),e},projectReplace:function(t,e){for(var s=0,n=t.projects.length;s<n;s++)if(t.projects[s].id===e.id)return t.projects.splice(s,1,e),t.projects[s]},projectRemove:function(t,e){for(var s=0,n=t.projects.length;s<n;s++)if(t.projects[s].id===e.id)return t.projects.splice(s,1),e},projectSet:function(t,e){n["a"].set(t,"projects",e)}},actions:{create:function(t,e){return yt.create(e).then((function(e){return t.commit("projectCurrent",e.data.data.project),t.commit("projectAdd",e.data.data.project),e.data.data.project}))},update:function(t,e){return yt.update(e).then((function(s){if(t.commit("projectReplace",s.data.data.project),t.getters.current.id===e.id)return t.commit("projectCurrent",s.data.data.project),s.data.data.project}))},remove:function(t,e){return yt.remove(e).then((function(){if(t.commit("projectRemove",e),t.getters.current.id===e.id)return t.commit("projectCurrent",t.getters.projects[0])}))},getProjectById:function(t,e){return yt.get(e).then((function(s){if(t.commit("projectReplace",s.data.data.project),t.getters.current.id===e.id)return t.commit("projectCurrent",s.data.data.project),s.data.data.project}))},getProjectsByUserId:function(t,e){return yt.all(e).then((function(e){if(!(e.data.data.projects.length<1))return t.commit("projectSet",e.data.data.projects),t.commit("projectCurrent",t.getters.projects[0])}))}}};n["a"].use(S["a"]);var Ut=new S["a"].Store({state:{},mutations:{},actions:{},modules:{toasts:lt,user:et,tasks:Ct,projects:Pt}}),Bt=s("8c4f"),Mt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"relative"},[s("div",{staticClass:"task__project__header"},[s("ProjectInfoName")],1),s("div",{staticClass:"task__project__header__controls"},[s("div",{staticClass:"flex-row"},[s("ProjectTaskSwitch",{model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}}),s("UserInfoMini")],1),s("InputBar",{attrs:{mode:t.mode}})],1),t.isProjects?s("ProjectsList",{on:{showTasks:t.showTasks}}):t._e(),t.isTasks?s("TasksList"):t._e()],1)},Nt=[],Vt="CLEAR",Kt="USER",Wt="PROJECTS",Yt="TASKS",Ht="EDIT",Jt="CREATE",Zt="DELETE",Ft="ALL",Gt="CONFIRM",qt="SELECT",Xt="CLICk",zt="DOUBLE-CLICk",Qt="OPEN",te="CLOSE",ee={CLEAR:Vt,USER:Kt,PROJECTS:Wt,TASKS:Yt,EDIT:Ht,CREATE:Jt,DELETE:Zt,ALL:Ft,CONFIRM:Gt,SELECT:qt,CLICK:Xt,DOUBLE_CLICK:zt,OPEN:Qt,CLOSE:te},se=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task__project__header__controls__input-bar"},[s("form",{staticClass:"relative",on:{submit:function(e){return e.preventDefault(),t.submitInput(e)}}},[s("StatusBar",{attrs:{status:t.status}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],ref:"itemInput",class:[t.status,t.isDisabled?"DISABLED":""],attrs:{type:"text",required:"",minlength:"4",placeholder:t.placeHolder},domProps:{value:t.input},on:{input:[function(e){e.target.composing||(t.input=e.target.value)},t.resetStatus]}})],1),s("button",{staticClass:"no-margin-x text-right",class:[t.status,t.isValid?"":"DISABLED"],attrs:{"aria-label":"submit",title:"submit"},on:{click:t.submitInput}},[s("icTick",{staticClass:"md",attrs:{alt:"submit"}})],1)])},ne=[],oe=(s("99af"),s("25f0"),function(t,e){return setTimeout((function(){t()}),e)}),ie=function(t){if(!t)return"No date";var e=new Date(t);return e.toLocaleDateString()},re=function(t){if(!t)return"No date";var e=new Date(t),s=e.getHours(),n=s>12;n&&(s-=12),s<10&&(s="0"+s);var o=n?" pm":" am",i=e.getMinutes();return i<10&&(i="0"+i),s+":"+i+o},ae=function(t){return ie(t)+" "+re(t)},ce=["(",")"],ue=function(t){var e=t.tasksDone,s=t.tasksTotal;return"".concat(ce[0]).concat(e,"/").concat(s).concat(ce[1])},le=function(t){var e=t.tasksDone,s=t.tasksTotal;if(!s||0===s)return"0%";if(!e||0===e)return"0%";var n=Math.floor(e/s*100);return"".concat(ce[0]).concat(n.toString(),"%").concat(ce[1])},de={timeDelay:oe,renderDate:ie,renderTime:re,renderDateTime:ae,renderProgressNum:ue,renderProgressPercent:le},pe=de,he="",fe="WAITING",me="SUCCESS",_e="DISABLED",Ee="ERROR",ve="OPEN",Ce="CLOSE",we="COMPLETE",ke="SELECT",je="RESET",ge="VALUE",Se="INPUT",Te="EDIT",Le="CLICK",Re={RESET:je,CLEAR:he,WAITING:fe,SUCCESS:me,DISABLED:_e,ERROR:Ee,OPEN:ve,CLOSE:Ce,SELECT:ke,COMPLETE:we,VALUE:ge,INPUT:Se,EDIT:Te,CLICK:Le},De=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"status bar ",class:t.statusUpdate})},Oe=[],xe={name:"StatusBar",data:function(){return{statusUpdate:Re.CLEAR}},props:{status:{type:String,default:Re.CLEAR}},watch:{status:function(t,e){var s=e&&e.length>0,n=t&&t.length>0,o=t===e;!s||n?s&&n&&!o?this.delayStatusUpdate(t):this.statusUpdate=t:this.delayComplete()}},methods:{delayComplete:function(){var t=this;this.statusUpdate=Re.COMPLETE,pe.timeDelay((function(){t.statusUpdate=Re.CLEAR}),Dt.DELAY_SHORT)},delayStatusUpdate:function(t){var e=this;this.statusUpdate=Re.CLEAR,pe.timeDelay((function(){e.statusUpdate=t}),Dt.DELAY_BLIP)}}},Ae=xe,be=Object(h["a"])(Ae,De,Oe,!1,null,null,null),Ie=be.exports,$e=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M79.623,182.472l-79.454,-79.454l40.754,-40.754l38.7,38.699l79.454,-79.454l40.754,40.755l-120.208,120.208Z"}})])},ye=[],Pe={},Ue=Object(h["a"])(Pe,$e,ye,!1,null,null,null),Be=Ue.exports,Me={name:"InputBar",components:{icTick:Be,StatusBar:Ie},props:{mode:{type:String,default:Re.CLEAR}},data:function(){return{input:Re.CLEAR,status:Re.CLEAR,isDisabled:!1}},computed:{isValid:function(){return this.input.length>=4},user:function(){return this.$store.getters["user/user"]},project:function(){return this.$store.getters["projects/current"]},placeHolder:function(){return this.mode===ee.TASKS?"Add a new task":"Add a new project"}},watch:{mode:function(t,e){this.status=Re.CLEAR,this.mode===ee.TASKS&&this.project.id<0&&(this.status=Re.DISABLED)}},mounted:function(){this.$root.$on(Re.EDIT.toLowerCase(),this.disableInput)},beforeDestroy:function(){this.$root.$off(Re.EDIT.toLowerCase(),this.disableInput)},methods:{reset:function(){this.input=Re.CLEAR,this.resetStatus()},resetStatus:function(){this.status=Re.CLEAR},disableInput:function(t){this.isDisabled=t},submitInput:function(){var t=this;if(this.isValid&&this.status===Re.CLEAR){this.status=Re.WAITING;var e="projects/create",s={user:this.user.id,name:this.input};return this.mode===ee.TASKS&&(e="tasks/create",s={user:this.user.id,project:this.project.id,text:this.input}),this.$store.dispatch(e,s).then((function(e){if(t.input=Re.CLEAR,t.status=Re.SUCCESS,t.$emit(Re.SUCCESS,e),pe.timeDelay((function(){t.reset()}),Dt.DELAY_SUCCESS),t.$nextTick((function(){return t.$refs.itemInput.blur()})),t.mode===ee.TASKS)return t.getLatestProject()})).catch((function(e){return t.handleError(e)}))}},getLatestProject:function(){return this.$store.dispatch("projects/getProjectById",{id:this.project.id})},handleError:function(t){this.status=Re.ERROR,this.$emit(Re.ERROR,t),this.$store.commit("toasts/toastAdd",t)}}},Ne=Me,Ve=Object(h["a"])(Ne,se,ne,!1,null,null,null),Ke=Ve.exports,We=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("router-link",{staticClass:"task__project__header__user",attrs:{to:"/user",title:"go to user"}},[s("div",{staticClass:"flex-row no-wrap"},[s("p",{staticClass:"task__project__header__user-name upper text-bold hide-sm-down"},[t._v(" "+t._s(t.user.name)+" ")]),s("icUser",{staticClass:"task__project__header__user-icon"})],1)])},Ye=[],He=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M52.923,136.896c0,0 -11.002,-76.303 -8.308,-98.12c1.672,-13.535 11.728,-27.941 24.477,-32.785c14.382,-5.464 47.434,-5.464 61.816,0c12.749,4.844 22.805,19.25 24.477,32.785c2.694,21.817 -8.308,98.12 -8.308,98.12c0,0 29.396,13.337 36,23.539c6.603,10.202 6.923,39.565 6.923,39.565l-180,0c0,0 0.32,-29.363 6.923,-39.565c6.604,-10.202 36,-23.539 36,-23.539Zm29.769,-46.006c5.77,-3.462 28.846,-3.462 34.616,0c5.769,3.461 5.769,17.308 0,20.769c-5.77,3.462 -28.846,3.462 -34.616,0c-5.769,-3.461 -5.769,-17.308 0,-20.769Zm35.197,-42.984c3.461,-3.462 17.307,-3.462 20.769,0c3.461,3.461 3.461,17.308 0,20.769c-3.462,3.462 -17.308,3.462 -20.769,0c-3.462,-3.461 -3.462,-17.308 0,-20.769Zm-56.547,0c3.462,-3.462 17.308,-3.462 20.769,0c3.462,3.461 3.462,17.308 0,20.769c-3.461,3.462 -17.307,3.462 -20.769,0c-3.461,-3.461 -3.461,-17.308 0,-20.769Z"}})])},Je=[],Ze={},Fe=Object(h["a"])(Ze,He,Je,!1,null,null,null),Ge=Fe.exports,qe={name:"UserInfoMini",components:{icUser:Ge},computed:{user:function(){return this.$store.getters["user/user"]}}},Xe=qe,ze=Object(h["a"])(Xe,We,Ye,!1,null,null,null),Qe=ze.exports,ts=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task__project__projects-list no-overflow"},[s("transition-group",{attrs:{name:"list-anim",tag:"ul"}},t._l(t.projects,(function(e){return s("ProjectItem",{key:e.id,attrs:{data:e,selected:t.project.id===e.id},on:{"show-tasks":t.showTasks}})})),1),t.projects.length<1?s("div",{staticClass:"text-center"},[s("p",{staticClass:"hint"},[t._v(" Start by creating a new project to add tasks to ")])]):t._e()],1)},es=[],ss=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("RowItem",{ref:"projItem",staticClass:"HOVER",class:{SELECT:t.selected},attrs:{data:t.data,status:t.status,selected:t.selected},on:{reset:t.resetValue,confirm:t.onConfirm,click:t.onSelectProject,dblclick:t.onShowTasks},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})},ns=[],os=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"row__item"},[s("div",{staticClass:"row__item__line",class:{OPEN:t.options.open,EDIT:t.isEdit,DELETE:t.isDelete}},[s("RowStatus",{class:{SHADE:!t.selected&&!t.isDone},attrs:{"is-waiting":t.isWaiting,"is-done":t.isDone},on:{click:t.onStatusClick}}),s("div",{staticClass:"row__item__line__mid"},[s("div",{staticClass:"row__item__line__mid__content",on:{dblclick:t.onDblClick,click:t.onClick}},[t.progress?s("p",{staticClass:"row__item__line__mid__content-progress"},[t._v(" "+t._s(t.progress)+" ")]):t._e(),s("p",{staticClass:"row__item__line__mid__content-data break-word"},[t._v(" "+t._s(t.textOrName)+" ")]),t.data.updated?s("small",{staticClass:"row__item__line__mid__content-date-md"},[t._v(" "+t._s(t.dayMonth)+" ")]):t._e(),t.data.updated?s("small",{staticClass:"row__item__line__mid__content-date-lg"},[t._v(" "+t._s(t.dayMonth+"/"+t.year)+" ")]):t._e(),t.data.updated?s("small",{staticClass:"row__item__line__mid__content-date-xl"},[t._v(" "+t._s(t.dayMonth+"/"+t.year+" "+t.time)+" ")]):t._e()]),s("form",{staticClass:"row__item__line__mid__edit",on:{submit:function(e){return e.preventDefault(),t.onConfirmOption(e)}}},[s("input",{ref:"itemEdit",staticClass:"row__item__line__mid__edit-input",class:t.status,attrs:{type:"text"},domProps:{value:t.value},on:{input:t.onValueChange}})]),s("StatusBar",{attrs:{status:t.status}}),s("div",{staticClass:"row__item__line__mid-bg"})],1),s("div",{staticClass:"row__item__line__option-btn"},[s("button",{attrs:{"aria-label":"open options",title:"open options"},on:{click:t.onOpenOption}},[s("icOptions",{staticClass:"icon-70"})],1)])],1),s("RowOption",{attrs:{options:t.options,status:t.status},on:{confirm:t.onConfirmOption,edit:t.onModeEdit,delete:t.onModeDelete,close:t.onCloseOption}})],1)},is=[],rs=(s("a15b"),s("ac1f"),s("1276"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M0,155.556l178.182,0l21.818,44.444l-180,0l-20,-44.444Zm0,-77.778l178.182,0l21.818,44.444l-180,0l-20,-44.444Zm0,-77.778l178.182,0l21.818,44.444l-180,0l-20,-44.444Z"}})])}),as=[],cs={},us=Object(h["a"])(cs,rs,as,!1,null,null,null),ls=us.exports,ds=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row__item__status",attrs:{title:"Click to change status"},on:{click:t.onClick}},[s("div",{staticClass:"row__item__status-icon"},[t.isDone?s("icDone",{staticClass:"fill-success"}):t.isWaiting?s("icNone",{staticClass:"fill-waiting"}):s("icRound",{staticClass:"icon-60 fill-fore"})],1)])},ps=[],hs=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M100,36.36l-63.64,63.64l63.64,63.64l63.64,-63.64l-63.64,-63.64Z"}})])},fs=[],ms={},_s=Object(h["a"])(ms,hs,fs,!1,null,null,null),Es=_s.exports,vs=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M167.175,32.825c-37.075,-37.075 -97.275,-37.075 -134.35,0c-37.075,37.075 -37.075,97.275 0,134.35c37.075,37.075 97.275,37.075 134.35,0c37.075,-37.075 37.075,-97.275 0,-134.35Z"}})])},Cs=[],ws={},ks=Object(h["a"])(ws,vs,Cs,!1,null,null,null),js=ks.exports,gs={name:"RowStatus",components:{icNone:Es,icDone:Be,icRound:js},props:{isWaiting:{type:Boolean,default:!1},isDone:{type:Boolean,default:!1}},methods:{onClick:function(){this.$emit("click")}}},Ss=gs,Ts=Object(h["a"])(Ss,ds,ps,!1,null,null,null),Ls=Ts.exports,Rs=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.options.open?s("div",{staticClass:"task__project__list__item__option-bar"},[t.showConfirm?s("span",{key:"showConfirm",staticClass:"task__project__list__item__option-bar-confirm"},["DELETE"===t.options.mode?s("span",[t._v(" Delete "),s("span",{staticClass:"hide-md-down"},[t._v(" Item")]),t._v(" ? ")]):t._e(),s("button",{class:[t.options.isValidEdit?"":"DISABLED",t.status],attrs:{"aria-label":"confirm change",title:"confirm change"},on:{click:t.onConfirm}},[s("icDone")],1)]):t._e(),t.options.showEdit?s("button",{key:"showEdit",staticClass:"task__project__list__item__option-bar-edit",attrs:{"aria-label":"edit item",title:"edit item"},on:{click:t.onEdit}},[s("icEdit")],1):t._e(),t.options.showDelete?s("button",{key:"showDelete",staticClass:"task__project__list__item__option-bar-delete fill-warning-status",attrs:{"aria-label":"delete item",title:"delete item"},on:{click:t.onDelete}},[s("icDelete")],1):t._e(),t.options.showClose?s("button",{key:"showClose",staticClass:"task__project__list__item__option-bar-close",attrs:{"aria-label":"close options",title:"close options"},on:{click:t.closeOptions}},[s("icRight")],1):t._e()]):t._e()},Ds=[],Os=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M34.738,131.069l101.601,-100.84l33.767,34.021l-101.6,100.841l-33.768,-34.022Zm-4.719,5.14l33.312,33.562l-33.437,-0.125l0.125,-33.437Z"}})])},xs=[],As={},bs=Object(h["a"])(As,Os,xs,!1,null,null,null),Is=bs.exports,$s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M50,0l0,200l100,-100l-100,-100Z"}})])},ys=[],Ps={},Us=Object(h["a"])(Ps,$s,ys,!1,null,null,null),Bs=Us.exports,Ms=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[s("path",{attrs:{d:"M100,68.887l50.205,-50.204l31.112,31.112l-50.204,50.205l50.204,50.205l-31.112,31.112l-50.205,-50.204l-50.205,50.204l-31.112,-31.112l50.204,-50.205l-50.204,-50.205l31.112,-31.112l50.205,50.204Z"}})])},Ns=[],Vs={},Ks=Object(h["a"])(Vs,Ms,Ns,!1,null,null,null),Ws=Ks.exports,Ys=function(){return{mode:Re.CLEAR,open:!1,showEdit:!0,showDelete:!0,showClose:!0,isValidEdit:!0}},Hs={name:"RowOption",components:{icEdit:Is,icDone:Be,icRight:Bs,icDelete:Ws},props:{options:{type:Object,default:Ys()},status:{type:String,default:Re.CLEAR}},computed:{showConfirm:function(){return this.options.mode===ee.EDIT||this.options.mode===ee.DELETE}},methods:{onEdit:function(){this.$emit(ee.EDIT.toLowerCase())},onDelete:function(){this.$emit(ee.DELETE.toLowerCase())},onConfirm:function(){this.$emit(ee.CONFIRM.toLowerCase(),this.options.mode)},closeOptions:function(){this.$emit(Re.CLOSE.toLowerCase())}}},Js=Hs,Zs=Object(h["a"])(Js,Rs,Ds,!1,null,null,null),Fs=Zs.exports,Gs=function(){return{mode:Re.CLEAR,open:!1,showEdit:!0,showDelete:!0,showClose:!0,isValidEdit:!1}},qs={name:"RowItem",components:{RowStatus:Ls,icOptions:ls,RowOption:Fs,StatusBar:Ie},data:function(){return{options:Gs()}},props:{data:{type:Object,default:Dt.DEFAULT_PROJECT},status:{type:String,default:Re.CLEAR},selected:{type:Boolean,default:!1},value:{type:String,default:Re.CLEAR}},computed:{progress:function(){return this.data.tasksTotal?pe.renderProgressNum(this.data):null},textOrName:function(){return this.data.name||this.data.text},date:function(){return this.data.updated?pe.renderDate(this.data.updated):null},dayMonth:function(){if(!this.data.updated)return null;var t=this.date.split("/");return t.splice(t.length-1,1),t.join("/")},year:function(){if(!this.data.updated)return null;var t=this.date.split("/");return t[t.length-1]},time:function(){return this.data.updated?pe.renderTime(this.data.updated):null},isEdit:function(){return this.options.mode===ee.EDIT},isDelete:function(){return this.options.mode===ee.DELETE},isWaiting:function(){return this.status===Re.WAITING},isDone:function(){return!this.isWaiting&&this.data.isDone>0},isError:function(){return this.status===Re.ERROR}},mounted:function(){this.$root.$on(Re.CLOSE.toLowerCase(),this.onCloseImmediate)},beforeDestroy:function(){this.$root.$off(Re.CLOSE.toLowerCase(),this.onCloseImmediate)},methods:{resetStatus:function(){this.$emit(Re.RESET.toLowerCase(),Re.CLEAR)},resetMode:function(){this.options.mode=Re.CLEAR},onClick:function(){this.$root.$emit(Re.CLOSE.toLowerCase(),this.data.id),this.$emit(Re.CLICK.toLowerCase(),this.data.id)},onDblClick:function(){this.$emit("dblclick",this.data.id)},onStatusClick:function(){this.$emit("status-click",this.data.id)},onConfirmOption:function(){this.$emit(ee.CONFIRM.toLowerCase(),this.options.mode)},onModeEdit:function(){var t=this;this.onClick(),this.$root.$emit(ee.EDIT.toLowerCase(),!0),this.options.mode=ee.EDIT,this.options.showEdit=!1,this.options.showDelete=!1,this.$nextTick((function(){return t.$refs.itemEdit.focus()}))},onModeDelete:function(){this.onClick(),this.options.mode=ee.DELETE,this.options.showEdit=!1,this.options.showDelete=!1,this.options.isValidEdit=!0},onOpenOption:function(){this.$root.$emit(Re.CLOSE.toLowerCase(),this.data.id),this.resetMode(),this.resetStatus(),this.options.open=!0,this.options.showEdit=!0,this.options.showDelete=!0,this.options.showClose=!0,this.options.isValidEdit=!1},onCloseOption:function(){this.onCloseImmediate()},onCloseImmediate:function(t){this.$root.$emit(ee.EDIT.toLowerCase(),!1),this.data.id!==t&&(this.resetMode(),this.options.open=!1,this.options.showEdit=!1,this.options.showDelete=!1,this.options.showClose=!1)},onValueChange:function(t){this.checkEditIsValid(t),this.$emit(Re.INPUT.toLowerCase(),t.target.value)},checkEditIsValid:function(t){t.target.value.length<4?this.options.isValidEdit=!1:this.options.isValidEdit=t.target.value!==this.textOrName}}},Xs=qs,zs=Object(h["a"])(Xs,os,is,!1,null,null,null),Qs=zs.exports,tn={name:"ProjectItem",components:{RowItem:Qs},props:{data:{type:Object,default:Dt.DEFAULT_PROJECT()},selected:{type:Boolean,default:!1}},data:function(){return{status:Re.CLEAR,input:Re.CLEAR}},methods:{onSelectProject:function(){this.$store.commit("projects/projectCurrent",this.data)},onShowTasks:function(){this.$emit("show-tasks")},onConfirm:function(t){return t===ee.EDIT?this.confirmEdit():t===ee.DELETE?this.confirmDelete():void 0},confirmEdit:function(){var t=this;if(this.status===Re.CLEAR&&this.input!==this.data.name){this.status=Re.WAITING;var e={id:this.data.id,name:this.input};return this.$store.dispatch("projects/update",e).then((function(){return t.handleSuccess()})).catch((function(e){return t.handleError(e)}))}},confirmDelete:function(){var t=this;if(this.status===Re.CLEAR)return this.status=Re.WAITING,this.$store.dispatch("projects/remove",this.data).then((function(){return t.handleSuccess()})).catch((function(e){return t.handleError(e)}))},checkEdit:function(){return this.resetStatus(),!(!this.input||this.input.length<4)&&this.input!==this.data.name},resetValue:function(){this.input=this.data.name},resetStatus:function(){this.status=Re.CLEAR},handleSuccess:function(){var t=this;this.status=Re.SUCCESS,pe.timeDelay((function(){t.$root.$emit(Re.CLOSE.toLowerCase(),-1)}),Dt.DELAY_SUCCESS),pe.timeDelay((function(){t.resetStatus()}),Dt.DELAY_SUCCESS+Dt.DELAY)},handleError:function(t){var e=this;this.status=Re.ERROR,this.$root.$emit(ee.EDIT.toLowerCase(),!1),this.$emit(Re.ERROR.toLowerCase(),t),this.$store.commit("toasts/toastAdd",t),pe.timeDelay((function(){e.resetStatus()}),Dt.DELAY_ERROR)}}},en=tn,sn=Object(h["a"])(en,ss,ns,!1,null,null,null),nn=sn.exports,on={name:"ProjectsList",components:{ProjectItem:nn},computed:{project:function(){return this.$store.getters["projects/current"]},projects:function(){return this.$store.getters["projects/projects"]}},methods:{showTasks:function(){this.$emit("showTasks")}}},rn=on,an=Object(h["a"])(rn,ts,es,!1,null,null,null),cn=an.exports,un=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task__project__header__info flex-row no-wrap",attrs:{title:"click to toggle between % or total"},on:{click:function(e){t.showTotals=!t.showTotals}}},[s("p",{staticClass:"task__project__header__info-name name text-bold"},[t._v(" "+t._s(t.project.name)+" ")]),s("p",{staticClass:"task__project__header__info-count text-bold"},[t._v(" "+t._s(t.progress)+" ")])])},ln=[],dn={name:"ProjectInfoName",data:function(){return{showTotals:!0}},computed:{project:function(){return this.$store.getters["projects/current"]},progress:function(){return this.showTotals?pe.renderProgressNum(this.project):pe.renderProgressPercent(this.project)}}},pn=dn,hn=Object(h["a"])(pn,un,ln,!1,null,null,null),fn=hn.exports,mn=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task__project__header__controls__switch"},[s("button",{staticClass:"task__project__header__controls__switch-projects",class:{ACTIVE:t.isProjects},on:{click:t.showProjects}},[t._v(" projects ")]),s("button",{staticClass:"task__project__header__controls__switch-tasks",class:{ACTIVE:t.isTasks},on:{click:t.showTasks}},[t._v(" tasks ")])])},_n=[],En={name:"ProjectTaskSwitch",props:{value:{type:String,default:ee.CLEAR}},computed:{isTasks:function(){return this.value===ee.TASKS},isProjects:function(){return this.value===ee.PROJECTS}},methods:{showTasks:function(){this.$emit("input",ee.TASKS)},showProjects:function(){this.$emit("input",ee.PROJECTS)}}},vn=En,Cn=Object(h["a"])(vn,mn,_n,!1,null,null,null),wn=Cn.exports,kn=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task__project__tasks-list no-overflow"},[s("transition-group",{attrs:{name:"list-anim",tag:"ul"}},t._l(t.tasks,(function(t){return s("TaskItem",{key:t.id,attrs:{data:t}})})),1),t.project.id<0?s("div",{staticClass:"text-center"},[s("p",{staticClass:"hint"},[t._v(" First you need to create a project to add tasks to ")])]):t._e(),t.project.id>=0&&t.tasks.length<1?s("div",{staticClass:"text-center"},[s("p",{staticClass:"hint"},[t._v(" Add a new task ")])]):t._e()],1)},jn=[],gn=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("RowItem",{ref:"taskItem",staticClass:"HOVER1",attrs:{data:t.data,status:t.status,selected:t.selected},on:{reset:t.resetValue,confirm:t.onConfirm,dblclick:t.onSelectTask,"status-click":t.onSelectTask},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})},Sn=[],Tn={name:"TaskItem",components:{RowItem:Qs},props:{data:{type:Object,default:Dt.DEFAULT_TASK()},selected:{type:Boolean,default:!1}},data:function(){return{status:Re.CLEAR,input:Re.CLEAR}},methods:{onSelectTask:function(){var t=this;if(this.status===Re.CLEAR){this.status=Re.WAITING;var e={id:this.data.id,isDone:!this.data.isDone};return this.$store.dispatch("tasks/update",e).then((function(){return t.handleSuccess(),t.getLatestProject()})).catch((function(e){return t.handleError(e)}))}},onConfirm:function(t){return t===ee.EDIT?this.confirmEdit():t===ee.DELETE?this.confirmDelete():void 0},confirmEdit:function(){var t=this;if(this.status===Re.CLEAR&&this.input!==this.data.text){this.status=Re.WAITING;var e={id:this.data.id,text:this.input};return this.$store.dispatch("tasks/update",e).then((function(){return t.handleSuccess()})).catch((function(e){return t.handleError(e)}))}},confirmDelete:function(){var t=this;if(this.status===Re.CLEAR)return this.status=Re.WAITING,this.$store.dispatch("tasks/remove",this.data).then((function(){return t.handleSuccess(),t.getLatestProject()})).catch((function(e){return t.handleError(e)}))},checkEdit:function(){return this.resetStatus(),!(!this.input||this.input.length<4)&&this.input!==this.data.text},resetValue:function(){this.input=this.data.text},resetStatus:function(){this.status=Re.CLEAR},getLatestProject:function(){return this.$store.dispatch("projects/getProjectById",{id:this.data.project})},handleSuccess:function(){var t=this;this.status=Re.SUCCESS,pe.timeDelay((function(){t.$root.$emit(Re.CLOSE.toLowerCase(),-1)}),Dt.DELAY_SUCCESS),pe.timeDelay((function(){t.resetStatus()}),Dt.DELAY_SUCCESS+Dt.DELAY)},handleError:function(t){var e=this;this.status=Re.ERROR,this.$root.$emit(ee.EDIT.toLowerCase(),!1),this.$emit(Re.ERROR.toLowerCase(),t),this.$store.commit("toasts/toastAdd",t),pe.timeDelay((function(){e.resetStatus()}),Dt.DELAY_ERROR)}}},Ln=Tn,Rn=Object(h["a"])(Ln,gn,Sn,!1,null,null,null),Dn=Rn.exports,On={name:"TasksList",components:{TaskItem:Dn},computed:{project:function(){return this.$store.getters["projects/current"]},task:function(){return this.$store.getters["tasks/current"]},tasks:function(){return this.$store.getters["tasks/tasks"]}},mounted:function(){return this.getTasksOfProject()},methods:{getTasksOfProject:function(){var t=this;return this.$store.dispatch("tasks/getTasksByUserOrProject",{project:this.project.id}).then((function(t){})).catch((function(e){return t.handleError(e)}))},handleError:function(t){this.status=Re.ERROR,this.$emit(Re.ERROR,t),this.$store.commit("toasts/toastAdd",t)}}},xn=On,An=Object(h["a"])(xn,kn,jn,!1,null,null,null),bn=An.exports,In={name:"Home",components:{InputBar:Ke,UserInfoMini:Qe,ProjectsList:cn,ProjectInfoName:fn,ProjectTaskSwitch:wn,TasksList:bn},data:function(){return{mode:ee.PROJECTS,test:{isWaiting:!1,isDone:!1}}},computed:{isProjects:function(){return this.mode===ee.PROJECTS},isTasks:function(){return this.mode===ee.TASKS}},methods:{showTasks:function(){this.mode=ee.TASKS}}},$n=In,yn=Object(h["a"])($n,Mt,Nt,!1,null,null,null),Pn=yn.exports,Un="home",Bn="task",Mn="user",Nn={HOME:Un,USER:Mn,TASK:Bn};n["a"].use(Bt["a"]);var Vn=[{path:"/",name:Nn.HOME,component:Pn}],Kn=new Bt["a"]({mode:"history",base:"/",routes:Vn}),Wn=Kn;s("b20f");n["a"].config.productionTip=!1,new n["a"]({router:Wn,store:Ut,render:function(t){return t(g)},created:function(){var t=this,e=this.$store.getters["user/user"],s=Promise.resolve(e);return e&&e.id<0&&(s=this.$store.dispatch("user/createAnon")),s.then((function(e){return t.$store.dispatch("projects/getProjectsByUserId",{user:e.id})})).catch((function(e){t.$store.commit("toasts/toastAdd",e)}))}}).$mount("#app")},b20f:function(t,e,s){}});
//# sourceMappingURL=app.f71b0333.js.map