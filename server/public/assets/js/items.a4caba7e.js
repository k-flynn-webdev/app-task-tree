(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["items"],{"0d1e":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"container"},[i("div",{staticClass:"columns is-centered flex-wrap"},[i("row-create",{attrs:{type:t.type},on:{click:function(e){return t.onEdit(-1)}}}),t._l(t.pageItems,(function(e){return i("row-item",{key:e.id,class:{"is-active":t.pageCurrentItem.id===e.id},attrs:{item:e,type:t.type,edit:t.edit},on:{onEdit:t.onEdit}})})),i("page-controls",{attrs:{type:t.type}}),0===t.pageItems.length?i("div",{staticClass:"column is-8 is-12-mobile px-0 py-0 mb-2 row"},[i("div",{staticClass:"is-flex start flex-grow has-text-light is-radius row__item has-border-transparent has-background-mid mx-1"},[i("span",{staticClass:"pad has-border-transparent is-family-sans-serif word-break"},[t._v(" No "+t._s(t.type)+"s found ")])])]):t._e()],2)])},n=[],r=i("89d7"),a=i("3d1a"),o=i("c93d"),l=i("3dbb"),c={name:"Plans",mixins:[o["a"]],components:{rowItem:a["a"],rowCreate:r["a"],pageControls:l["a"]},data:function(){return{isLoading:!1}},props:{type:{type:String,default:""}}},u=c,d=i("2877"),h=Object(d["a"])(u,s,n,!1,null,null,null);e["default"]=h.exports},2532:function(t,e,i){"use strict";var s=i("23e7"),n=i("5a34"),r=i("1d80"),a=i("ab13");s({target:"String",proto:!0,forced:!a("includes")},{includes:function(t){return!!~String(r(this)).indexOf(n(t),arguments.length>1?arguments[1]:void 0)}})},"3d1a":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"column is-8 is-12-mobile row is-family-sans-serif"},[i("div",{staticClass:"is-flex start"},[i("div",{staticClass:"row__item",class:[t.isEdit?"has-background-transparent has-border-light":"has-border-transparent has-background-mid"],on:{click:t.onSelect,dblclick:t.onDblClick}},[t.isTask?i("b-button",{staticClass:"row__item__content-button",attrs:{loading:t.isLoadingDone},on:{click:function(e){return e.stopPropagation(),t.toggleDone(e)}}},[i("ic-tick",{class:t.tickButtonClass})],1):i("div",{staticClass:"row__item__content-pre"},[t.showProgress?i("small",{staticClass:"row__item__content-progress"},[t._v(" "+t._s(t.progress)+" ")]):i("span",{staticClass:"row__item__content-button"},[i("ic-tick",{class:t.tickButtonClass})],1)]),t.isEdit?i("b-input",{staticClass:"row__item__content-input",style:t.rowHeightStyle,attrs:{placeholder:t.value,readonly:!t.isEdit,type:"textarea",customClass:""},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}):i("div",{ref:"rowItemText",staticClass:"row__item__content-msg"},[t._v(" "+t._s(t.item.value)+" ")]),t.isEdit?t._e():i("div",{staticClass:"row__item__content-date"},[i("small",{staticClass:"is-hidden-mobile"},[t._v(t._s(t._f("itemDate")(t.item)))]),i("small",{staticClass:"is-hidden-tablet"},[t._v(t._s(t._f("itemDate")(t.item,!0,!0,!1)))])])],1),i("b-button",{staticClass:"mx-0 is-transparent hover",on:{click:t.toggleEdit}},[i("ic-option",{staticClass:"fill-light",class:{"color-alpha":t.isEdit}})],1)],1),t.isEdit?i("div",{staticClass:"row__item-buttons"},[i("div",{staticStyle:{"flex-grow":"1"}}),i("b-button",{staticClass:"has-background-danger hover",attrs:{size:"is-small"},on:{click:t.removeItemConfirm}},[i("ic-delete",{staticClass:"fill-bg v-align-center is-large"})],1),i("b-button",{staticClass:"has-background-success hover",attrs:{size:"is-small",disabled:!t.allowEditSubmit},on:{click:t.updateItem}},[i("ic-tick",{staticClass:"fill-bg v-align-center is-large"})],1)],1):t._e()])},n=[],r=(i("a9e3"),i("d3b7"),i("25f0"),i("ade3")),a=i("fb6e"),o=i("b05c"),l=i("62b5"),c=i("5a50"),u=i("ec41"),d=function(){return{id:0,owner:0,type:"",value:"",is_done:!1}},h={name:"rowItem",components:{icTick:l["a"],icOption:a["a"],icDelete:o["a"]},data:function(){return{isLoadingDone:!1,isLoading:!1,value:null,row:{height:5}}},props:{item:{type:Object,default:d},type:{type:String,default:""},edit:{type:Number,default:-1}},computed:{rowHeightStyle:function(){return{"min-height":this.row.height+"px"}},isEdit:function(){return this.item.id===this.edit},isTask:function(){return this.type===c["k"].task.value},isComplete:function(){return!!this.item.is_done},showProgress:function(){return!this.isComplete&&!this.isTask},progress:function(){return this.showProgress?this.renderProgressPercent(this.item.progress,this.item.total):""},tickButtonClass:function(){return this.isLoadingDone?"fill-transparent":this.item.is_done?"fill-success":"fill-bg"},allowEditSubmit:function(){return this.value!==this.item.value&&this.value.length>3}},mounted:function(){this.getRowHeight()},methods:{getRowHeight:function(){this.row.height=this.$refs.rowItemText.clientHeight-10},toggleEdit:function(){this.isEdit?this.closeEdit():this.onEdit()},onEdit:function(){this.value=this.item.value,this.openEdit()},openEdit:function(){this.$emit("onEdit",this.item.id)},closeEdit:function(){this.$emit("onEdit",-1)},onSelect:function(){if(!this.isEdit&&this.type!==c["k"].task.value)return this.$store.commit("".concat(c["k"][this.type].store,"/setCurrent"),this.item)},onOpenItem:function(){var t=c["k"][this.type].child;this.$router.push({name:t,query:Object(r["a"])({},this.type,this.item.id)})},onDblClick:function(){if(this.type===c["k"].task.value){if(this.isEdit)return;return this.toggleDone()}return this.onOpenItem()},renderProgressPercent:function(t,e){if(!e||0===e)return"0%";if(!t||0===t)return"0%";var i=Math.floor(t/e*100);return"".concat(i.toString(),"%")},toggleDone:function(){var t=this;if(!this.isEdit&&!this.isLoadingDone&&this.type===c["k"].task.value){this.isLoadingDone=!0;var e=!!this.item.is_done;return this.$store.dispatch("".concat(c["k"][this.type].store,"/patch"),{id:this.item.id,is_done:!e}).catch((function(e){return t.handleError(e)})).finally((function(){return t.isLoadingDone=!1}))}},updateItem:function(){var t=this;if(!this.isLoading&&this.allowEditSubmit)return this.isLoading=!0,this.$store.dispatch("".concat(c["k"][this.type].store,"/patch"),{id:this.item.id,value:this.value}).then((function(){t.closeEdit()})).then((function(){return t.getRowHeight()})).catch((function(e){return t.handleError(e)})).finally((function(){return t.isLoading=!1}))},removeItemConfirm:function(){var t=this;this.$buefy.dialog.confirm({title:"Deleting ".concat(this.value),message:"Are you sure you want to <b>delete</b>? This action cannot be undone.",confirmText:"Delete ".concat(this.type),type:"is-danger",hasIcon:!0,onConfirm:function(){return t.removeItem()}})},removeItem:function(){var t=this;if(!this.isLoading)return this.isLoading=!0,this.$store.dispatch("".concat(c["k"][this.type].store,"/remove"),this.item.id).then((function(){t.closeEdit(),t.$buefy.toast.open({type:"is-success",message:"Item deleted!"})})).catch((function(e){return t.handleError(e)})).finally((function(){return t.isLoading=!1}))},handleError:function(t){this.isLoading=!0,this.$buefy.toast.open({duration:5e3,message:Object(u["a"])(t,"response.data.message","error"),position:"is-top",type:"is-danger"})}}},p=h,m=i("2877"),f=Object(m["a"])(p,s,n,!1,null,null,null);e["a"]=f.exports},"3dbb":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.showControls?i("div",{staticClass:"column is-8 is-12-mobile px-0 mb-0"},[i("div",{staticClass:"mx-1 is-flex flex-space-between"},t._l(t.buttons,(function(e){return i("button",{staticClass:"button is-size-7-tablet has-text-weight-bold",class:{"is-loading":e.loading},attrs:{disabled:e.disabled},on:{click:function(i){return t.hasClicked(e)}}},[t._v(" "+t._s(e.value)+" ")])})),0)]):t._e()},n=[],r=(i("b0c0"),i("a9e3"),i("b64b"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"-30 -30 260 260",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[i("path",{attrs:{d:"M167.175,32.825c-37.075,-37.075 -97.275,-37.075 -134.35,0c-37.075,37.075 -37.075,97.275 0,134.35c37.075,37.075 97.275,37.075 134.35,0c37.075,-37.075 37.075,-97.275 0,-134.35Z"}})])}),a=[],o=i("2877"),l={},c=Object(o["a"])(l,r,a,!1,null,null,null),u=c.exports,d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[i("path",{attrs:{d:"M121.355,170.711l0,-141.422l-70.71,70.711l70.71,70.711Z"}})])},h=[],p={},m=Object(o["a"])(p,d,h,!1,null,null,null),f=m.exports,g=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[i("path",{attrs:{d:"M50,0l0,200l100,-100l-100,-100Z"}})])},b=[],v={},y=Object(o["a"])(v,g,b,!1,null,null,null),w=y.exports,k=i("5a50"),_=i("ec41"),x={name:"pageControls",components:{icStart:u,icLeft:f,icRight:w},data:function(){return{buttons:{start:{disabled:!1,value:"Page 1",url:{},loading:!1},pre:{disabled:!1,value:"Page x",url:{},loading:!1},post:{disabled:!1,value:"Page x",url:{},loading:!1}}}},props:{type:{type:String,default:""}},computed:{itemTotal:function(){return this.$store.state[k["k"][this.type].store].total},itemLoading:function(){return this.$store.state[k["k"][this.type].store].loading},itemSkip:function(){return Number(Object(_["a"])(this.$route.query,"$skip",0))},itemQuery:function(){return this.$store.state.query},itemOpened:function(){return this.$store.state.opened},showControls:function(){return this.itemTotal>k["c"].pageLimit}},watch:{itemTotal:function(){this.rebuild(this.itemLoading)},itemLoading:function(){this.rebuild(this.itemLoading)},itemQuery:function(){this.rebuild(this.itemLoading)}},mounted:function(){this.rebuild(this.itemLoading)},methods:{scrollToTop:function(){document.getElementById("app").scrollIntoView({behavior:"smooth"})},buildQueryObj:function(){var t={},e=Object.keys(this.itemQuery);t.query={},t.query.$skip=this.itemSkip,t.name=k["k"][this.type].route.name;for(var i=0;i<e.length;i++)t.query[e[i]]=this.itemQuery[e[i]];return t},hasClicked:function(t){t.loading=!0,this.$router.push(t.url,this.scrollToTop)},rebuild:function(t){var e=this.buildQueryObj();delete e.query["$skip"];var i=this.buildQueryObj(),s=this.itemSkip-k["c"].pageLimit;i.query["$skip"]=s>0?s:0;var n=this.buildQueryObj();n.query["$skip"]=this.itemSkip+k["c"].pageLimit,this.buttons.start.url=e,this.buttons.pre.url=i,this.buttons.post.url=n,t||(this.buttons.start.loading=!1,this.buttons.pre.loading=!1,this.buttons.post.loading=!1),this.buttons.start.value="Page 1",this.buttons.pre.value="Page ".concat(Math.floor(i.query["$skip"]/k["c"].pageLimit)+1),this.buttons.post.value="Page ".concat(Math.floor(n.query["$skip"]/k["c"].pageLimit)+1),this.buttons.start.disabled=0===this.itemSkip,this.buttons.pre.disabled=this.itemSkip<k["c"].pageLimit,this.buttons.post.disabled=this.itemTotal-(this.itemSkip+k["c"].pageLimit)<=0}}},C=x,$=Object(o["a"])(C,s,n,!1,null,null,null);e["a"]=$.exports},"5a34":function(t,e,i){var s=i("44e7");t.exports=function(t){if(s(t))throw TypeError("The method doesn't accept regular expressions");return t}},"62b5":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{staticClass:"icon",staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"},attrs:{viewBox:"0 0 200 200",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve","xmlns:serif":"http://www.serif.com/"}},[i("path",{attrs:{d:"M79.623,182.472l-79.454,-79.454l40.754,-40.754l38.7,38.699l79.454,-79.454l40.754,40.755l-120.208,120.208Z"}})])},n=[],r=i("2877"),a={},o=Object(r["a"])(a,s,n,!1,null,null,null);e["a"]=o.exports},"89d7":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"column is-8 is-12-mobile px-0 mb-0"},[i("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm(e)}}},[i("b-field",{staticClass:"mx-1"},[i("b-input",{ref:"createInput",staticClass:"is-expanded",attrs:{type:"string",minLength:"3",maxlength:"200",disabled:!t.canCreate,hasCounter:!1,placeholder:t.placeHolder},on:{focus:t.onClick},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),i("p",{staticClass:"control"},[i("b-button",{attrs:{"native-type":"submit",type:"is-primary",disabled:!t.isValid,loading:t.isLoading},on:{click:t.submitForm}},[i("ic-add",{staticClass:"v-align-center is-medium",class:t.createBtnClass})],1)],1)],1)],1)])},n=[],r=i("5530"),a=i("62b5"),o=i("5a50"),l=i("ec41"),c={name:"rowCreate",components:{icAdd:a["a"]},data:function(){return{value:"",previous:null,isLoading:!1}},props:{type:{type:String,default:""}},computed:{isValid:function(){return this.value.length>=3&&this.value.length<=200},placeHolder:function(){return"".concat(this.type," to create ..")},createBtnClass:function(){return this.isLoading?"fill-transparent":(this.isValid,"fill-bg")},canCreate:function(){return this.type===o["k"]["project"].value||Object(l["a"])(this.$store,"state.opened.value")}},created:function(){this.reset()},methods:{reset:function(){this.value="",this.isLoading=!1},onClick:function(){this.$emit("click")},submitForm:function(){var t=this;if(this.isValid&&!this.isLoading&&this.previous!==this.value){this.isLoading=!0;var e=this.$store.state.query;return this.$store.dispatch("".concat(o["k"][this.type].store,"/post"),Object(r["a"])({value:this.value},e)).then((function(e){t.previous=t.value,t.reset();var i=t.$refs.createInput.$el.getElementsByTagName("input")[0];i.blur(),t.$buefy.toast.open({duration:1500,message:Object(l["a"])(e,"data.message","success"),position:"is-top",type:"is-success"})})).catch((function(e){throw t.isLoading=!1,t.$buefy.toast.open({duration:5e3,message:Object(l["a"])(e,"response.data.message","error"),position:"is-top",type:"is-danger"}),e}))}}}},u=c,d=i("2877"),h=Object(d["a"])(u,s,n,!1,null,null,null);e["a"]=h.exports},ab13:function(t,e,i){var s=i("b622"),n=s("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[n]=!1,"/./"[t](e)}catch(s){}}return!1}},acca:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"container"},[i("div",{staticClass:"columns is-centered flex-wrap"},[i("row-create",{attrs:{type:t.type},on:{click:function(e){return t.onEdit(-1)}}}),t._l(t.pageItems,(function(e){return i("row-item",{key:e.id,class:{"is-active":t.pageCurrentItem.id===e.id},attrs:{item:e,type:t.type,edit:t.edit},on:{onEdit:t.onEdit}})})),i("page-controls",{attrs:{type:t.type}})],2),0===t.pageItems.length?i("div",{staticClass:"column is-8 is-12-mobile px-0 py-0 mb-2 row"},[i("div",{staticClass:"is-flex start flex-grow has-text-light is-radius row__item has-border-transparent has-background-mid mx-1"},[i("span",{staticClass:"pad has-border-transparent is-family-sans-serif word-break"},[t._v(" No "+t._s(t.type)+"s found ")])])]):t._e()])},n=[],r=i("89d7"),a=i("3d1a"),o=i("c93d"),l=i("3dbb"),c={name:"Projects",mixins:[o["a"]],components:{rowItem:a["a"],rowCreate:r["a"],pageControls:l["a"]},data:function(){return{isLoading:!1}},props:{type:{type:String,default:""}}},u=c,d=i("2877"),h=Object(d["a"])(u,s,n,!1,null,null,null);e["default"]=h.exports},c93d:function(t,e,i){"use strict";i("4de4"),i("4160"),i("caad"),i("b64b"),i("d3b7"),i("2532"),i("159b");var s=i("5a50"),n=i("ec41"),r=Object.keys(s["k"]);e["a"]={data:function(){return{edit:-1,page:{isLoading:!1}}},computed:{pageCurrentItem:function(){return this.$store.state[s["k"][this.type].store].current||{id:-1}},pageItems:function(){return this.$store.state[s["k"][this.type].store].items},pageMode:function(){return s["k"][this.type]},pageSort:function(){return this.$store.getters["getSortObj"]}},watch:{pageSort:function(){return this.getPageItems()}},beforeRouteUpdate:function(t,e,i){this.getPageItemsQuery(t.query),i()},created:function(){this.init()},methods:{init:function(){var t=this;return this.$store.commit("mode",s["k"][this.type]),s["k"][this.type].children.forEach((function(e){t.$store.commit("".concat(s["k"][e].store,"/setCurrent"),null)})),this.getPageItems().then((function(){return t.getOpenedItem()}))},onEdit:function(t){this.edit=t},getItemFromRoute:function(){var t=Object.keys(this.$route.query),e=t.filter((function(t){return r.includes(t)}));if(e&&!(e.length<1)){var i=this.$route.query[e[0]];if(i){var s={};return s[e[0]]=i,s}}},getOpenedItem:function(){var t=this,e=this.getItemFromRoute();if(!e)return this.$store.commit("setOpened",null),void this.$store.commit("setQuery",null);var i=Object.keys(e)[0];return this.$store.dispatch("".concat(s["k"][i].store,"/getById"),{id:e[i]}).then((function(i){var s=i.data;t.$store.commit("setQuery",e),t.$store.commit("setOpened",s.data)}))},getPageItems:function(){var t=Object(n["a"])(this.$route,"query.$skip"),e=this.getItemFromRoute(),i=Object.assign({$skip:t,$sort:this.pageSort},e);return this.getPageItemsQuery(i)},getPageItemsQuery:function(t){var e=this;if(!this.page.isLoading)return this.page.isLoading=!0,this.$store.dispatch("".concat(s["k"][this.type].store,"/get"),{query:t}).catch((function(t){throw e.page.isLoading=!1,e.$buefy.toast.open({duration:5e3,message:Object(n["a"])(t,"response.data.message","error"),position:"is-top",type:"is-danger"}),t})).finally((function(t){e.page.isLoading=!1}))}}}},caad:function(t,e,i){"use strict";var s=i("23e7"),n=i("4d64").includes,r=i("44d2"),a=i("ae40"),o=a("indexOf",{ACCESSORS:!0,1:0});s({target:"Array",proto:!0,forced:!o},{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),r("includes")},eb1f:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"container"},[i("div",{staticClass:"columns is-centered flex-wrap"},[i("row-create",{attrs:{type:t.type},on:{click:function(e){return t.onEdit(-1)}}}),t._l(t.pageItems,(function(e){return i("row-item",{key:e.id,class:{"is-active":t.pageCurrentItem.id===e.id},attrs:{item:e,type:t.type,edit:t.edit},on:{onEdit:t.onEdit}})})),i("page-controls",{attrs:{type:t.type}}),0===t.pageItems.length?i("div",{staticClass:"column is-8 is-12-mobile px-0 py-0 mb-2 row"},[i("div",{staticClass:"is-flex start flex-grow has-text-light is-radius row__item has-border-transparent has-background-mid mx-1"},[i("span",{staticClass:"pad has-border-transparent is-family-sans-serif word-break"},[t._v(" No "+t._s(t.type)+"s found ")])])]):t._e()],2)])},n=[],r=i("89d7"),a=i("3d1a"),o=i("c93d"),l=i("3dbb"),c={name:"Tasks",mixins:[o["a"]],components:{rowItem:a["a"],rowCreate:r["a"],pageControls:l["a"]},data:function(){return{isLoading:!1}},props:{type:{type:String,default:""}}},u=c,d=i("2877"),h=Object(d["a"])(u,s,n,!1,null,null,null);e["default"]=h.exports}}]);