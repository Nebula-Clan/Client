(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{485:function(t,e,o){var content=o(506);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(14).default)("7ce06795",content,!0,{sourceMap:!1})},486:function(t,e,o){"use strict";o.r(e);var r={name:"NewComment",data:function(){return{replayText:"",isFormValid:!1,commentRules:[function(p){return!!p||"Type Something"},function(p){return p.length>=3||"Must be at least 3 characters"},function(p){return p.length<=500||"Must be lower than 100 characters"}]}},props:["isLoadingToSend","submitComment"]},n=o(35),c=o(36),l=o.n(c),d=o(464),v=o(533),m=o(534),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-form",{model:{value:t.isFormValid,callback:function(e){t.isFormValid=e},expression:"isFormValid"}},[o("v-textarea",{attrs:{rules:t.commentRules,outlined:"","auto-grow":"",counter:"500",label:"Reply the post"},model:{value:t.replayText,callback:function(e){t.replayText=e},expression:"replayText"}}),t._v(" "),o("div",{staticClass:"pb-2 d-flex flex-row-reverse"},[o("v-btn",{staticClass:"mt-2",attrs:{outlined:"",depressed:"",color:"primary",loading:t.isLoadingToSend,disabled:!t.isFormValid,elevation:"2"},on:{click:function(e){return t.submitComment({replayText:t.replayText})}}},[t._v("\n      Send\n    ")])],1)],1)}),[],!1,null,"8b82cee6",null);e.default=component.exports;l()(component,{VBtn:d.a,VForm:v.a,VTextarea:m.a})},492:function(t,e,o){"use strict";o.r(e);o(6),o(11),o(8),o(16),o(17),o(12),o(9);var r=o(2),n=o(117),c=o(116),l=o(496);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"Post-quick-view",components:{NewComment:o(486).default,UserAvatar:c.default},props:["post"],data:function(){return{isCommentToPostExpanded:!1,isLoadingToSendComment:!1,chipsColors:["blue","red","green","purple","orange"],like:!1,dislike:!1}},computed:{likedPost:function(){return this.dislike||!this.post.is_liked&&!this.like?"":"pink"},postDateDuration:function(){return Object(l.a)(this.post.date_created)}},methods:v(v(v({},Object(n.b)("modules/profile/profileLikes",["submitLikeAtPostWithID","deleteLikeAtPostWithID"])),Object(n.b)("modules/comment/post_comment",["replyToPost"])),{},{likePost:function(){var t=this;this.like?this.deleteLikeAtPostWithID(this.post.id).then((function(e){e.data;t.like=!1,t.dislike=!0})).catch((function(e){403==e.response.status&&t.showErrorWithMessage("Please Login in or Sign Up")})):this.submitLikeAtPostWithID(this.post.id).then((function(e){e.data;t.like=!0,t.dislike=!1})).catch((function(e){403==e.response.status&&t.showErrorWithMessage("Please Login in or Sign Up")}))},showErrorWithMessage:function(t){this.$notifier.showMessage({content:t,color:"error"})},replyComment:function(t){var e=this;this.isLoadingToSendComment=!0,this.replyToPost({postId:this.post.id,content:t.replayText}).then((function(t){t.data;e.isLoadingToSendComment=!1,e.isCommentToPostExpanded=!e.isCommentToPostExpanded,e.$notifier.showMessage({content:"Sent",color:"success"})})).catch((function(t){e.showErrorWithMessage(t)}))},showPost:function(){this.post.is_reported=!1}}),mounted:function(){}},h=(o(505),o(35)),f=o(36),_=o.n(f),y=o(464),x=o(484),w=o(523),k=o(477),C=o(118),P=o(205),O=o(476),j=o(65),S=o(479),component=Object(h.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"mb-2 pa-1 layout-post",attrs:{elevation:"2"}},[o("v-row",[o("v-col",{staticClass:"ml-5"},[o("v-row",{staticClass:"pb-1"},[o("nuxt-link",{staticClass:"text-decoration-none white--text",attrs:{to:"/posts/"+t.post.id}},[o("h2",[t._v(t._s(t.post.title))])]),t._v(" "),null!==t.post.category?o("nuxt-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/explore/category?category="+t.post.category.title+"&order=new"}},[o("v-sheet",{attrs:{outlined:"",elevation:"1",color:"blue px-3 mt-1 ml-4 rounded-pill"}},[o("span",[t._v("\n                "+t._s(t.post.category.title)+"\n              ")])])],1):t._e()],1),t._v(" "),o("v-row",{staticClass:"pb-1"},[o("div",{staticClass:"mr-2"},[o("v-icon",{attrs:{size:"15"}},[t._v("\n            mdi-clock\n          ")]),t._v(" "),o("span",{staticStyle:{"font-size":"smaller"}},[t._v(t._s(t.postDateDuration))])],1)])],1),t._v(" "),o("v-col",{staticClass:"text-right",attrs:{cols:"2"}},[o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[o("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",n,!1),r),[o("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[t._v(" "),o("span",[t._v("More")])])],1)],1),t._v(" "),o("v-row",[t.post.header_image&&"/media/undefined"!==t.post.header_image?o("v-col",{staticClass:"mx-5 header-image"},[o("img",{attrs:{alt:"image",src:t.$axios.defaults.baseURL+"/media/"+t.post.header_image}})]):t._e()],1),t._v(" "),o("v-row",[o("v-col",{staticClass:"mx-5"},[o("p",[t._v(t._s(t.post.description))])])],1),t._v(" "),o("v-row",[o("v-col",{staticClass:"d-flex justify-right ml-2"},t._l(t.post.hashtags,(function(e,i){return o("v-chip",{key:i,staticClass:"mx-1",attrs:{nuxt:"",to:"/search/hashtag?keyword="+e.text+"&sort=latest",outlined:"",small:"",color:t.chipsColors[i]}},[t._v("\n        #"+t._s(e.text)+"\n      ")])})),1)],1),t._v(" "),o("v-row",{staticClass:"mx-2"},[o("v-col",[o("nuxt-link",{staticClass:"text-decoration-none white--text d-flex",attrs:{to:"/profile/"+t.post.author.username}},[o("div",[o("UserAvatar",{attrs:{color:"primary","avatar-string":t.post.author.username,"avatar-src":t.post.author.profile_picture}})],1),t._v(" "),o("div",{staticClass:"d-flex flex-column ml-3"},[o("span",[o("b",[t._v(t._s(t.post.author.username))])]),t._v(" "),o("span",{staticStyle:{"font-size":"smaller"}},[t._v(t._s(t.post.author.first_name)+" "+t._s(t.post.author.last_name))])])])],1),t._v(" "),o("v-col",{staticClass:"text-right d-flex justify-end align-center"},[o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[o("v-btn",t._g(t._b({attrs:{color:t.likedPost,icon:""},on:{click:t.likePost}},"v-btn",n,!1),r),[o("v-icon",[t._v("mdi-heart")])],1)]}}])},[t._v(" "),o("span",[t._v("Like")])]),t._v(" "),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[o("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(e){t.isCommentToPostExpanded=!t.isCommentToPostExpanded}}},"v-btn",n,!1),r),[o("v-icon",[t._v("mdi-comment")])],1)]}}])},[t._v(" "),o("span",[t._v("Comment")])])],1)],1),t._v(" "),o("v-expand-transition",[o("div",{directives:[{name:"show",rawName:"v-show",value:t.isCommentToPostExpanded,expression:"isCommentToPostExpanded"}],staticClass:"ml-3 mt-3"},[o("NewComment",{attrs:{"is-loading-to-send":t.isLoadingToSendComment,"submit-comment":t.replyComment}})],1)]),t._v(" "),t.post.is_reported?o("div",{staticClass:"report",attrs:{id:"report"}},[o("p",[t._v("This post has been reported by several users. It may contain inappropriate content.")]),t._v(" "),o("v-btn",{attrs:{color:"accent",outlined:""},on:{click:t.showPost}},[t._v("\n      Show post\n    ")])],1):t._e()],1)}),[],!1,null,"4fb6e848",null);e.default=component.exports;_()(component,{UserAvatar:o(116).default,NewComment:o(486).default}),_()(component,{VBtn:y.a,VCard:x.a,VChip:w.a,VCol:k.a,VExpandTransition:C.a,VIcon:P.a,VRow:O.a,VSheet:j.a,VTooltip:S.a})},496:function(t,e,o){"use strict";o.d(e,"a",(function(){return r})),o.d(e,"c",(function(){return n})),o.d(e,"b",(function(){return c}));o(27);function r(t){var e=new Date(t).getTime(),o=(new Date).getTime();return o-e<36e5?Math.floor((o-e)/6e4)+" m":o-e>36e5&&o-e<864e5?Math.floor((o-e)/36e5)+" h":Math.floor((o-e)/864e5)+" day(s)"}function n(t){return"".concat($nuxt.$axios.defaults.baseURL,"/media/").concat(t)}function c(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1})}},505:function(t,e,o){"use strict";var r=o(485);o.n(r).a},506:function(t,e,o){(e=o(13)(!1)).push([t.i,".layout-post[data-v-4fb6e848]{position:relative}.layout-post .report[data-v-4fb6e848]{position:absolute;top:0;bottom:0;width:100%;left:0;background-color:rgba(0,0,0,.8);-webkit-backdrop-filter:blur(1px);backdrop-filter:blur(15px);padding:50px;display:flex;text-align:center;flex-direction:column;justify-content:center;align-items:center}.header-image[data-v-4fb6e848]{text-align:center}.header-image img[data-v-4fb6e848]{width:90%;height:250px;border-radius:5px}",""]),t.exports=e},531:function(t,e,o){"use strict";o.r(e);o(6),o(11),o(8),o(16),o(17),o(12),o(30),o(61),o(9);var r=o(2);function n(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={name:"Settings",data:function(){return{sort:this.$route.query.sort}},methods:{apply:function(){var t=this.$route.query;this.$router.replace({query:c(c({},t),{},{sort:this.sort})})}},watch:{"$route.query.sort":function(){this.sort=this.$route.query.sort}}},d=o(35),v=o(36),m=o.n(v),h=o(464),f=o(484),_=o(482),y=o(477),x=o(792),w=o(793),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"pa-2",attrs:{elevation:"2"}},[o("v-card-title",[t._v("\n    Search settings\n  ")]),t._v(" "),o("v-card-text",[o("v-col",[o("p",[t._v("Sort by")]),t._v(" "),o("v-radio-group",{attrs:{column:""},model:{value:t.sort,callback:function(e){t.sort=e},expression:"sort"}},[o("v-radio",{attrs:{label:"latest",value:"latest"}}),t._v(" "),o("v-radio",{attrs:{label:"popular",value:"popular"}})],1)],1)],1),t._v(" "),o("v-card-actions",[o("v-btn",{attrs:{color:"accent",outlined:""},on:{click:t.apply}},[t._v("\n      Apply filters\n    ")])],1)],1)}),[],!1,null,"f497f450",null);e.default=component.exports;m()(component,{VBtn:h.a,VCard:f.a,VCardActions:_.a,VCardText:_.c,VCardTitle:_.d,VCol:y.a,VRadio:x.a,VRadioGroup:w.a})},812:function(t,e,o){"use strict";o.r(e);o(27);var r=o(531),n=o(492),c={name:"hashtag",components:{Settings:r.default,PostQuickView:n.default},data:function(){return{hashtag:this.$route.query.keyword,sort:this.$route.query.sort,posts:[]}},mounted:function(){this.getPosts()},methods:{getPosts:function(){var t=this;this.$axios.get("api/hashtag/posts?text=".concat(this.hashtag,"&sort=").concat(this.sort)).then((function(e){return t.posts=e.data.posts})).catch((function(e){return t.$notifier.showMessage({content:e.message,color:"error"})}))}},watch:{"$route.query.keyword":function(){this.hashtag=this.$route.query.keyword,this.getPosts()},"$route.query.sort":function(){this.sort=this.$route.query.sort,this.getPosts()}}},l=o(35),d=o(36),v=o.n(d),m=o(477),h=o(481),f=o(476),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",[o("v-row",[o("v-col",[o("h1",[t._v("#"+t._s(t.hashtag))])])],1),t._v(" "),o("v-row",[t.posts?o("v-col",{attrs:{md:"8"}},t._l(t.posts,(function(t){return o("PostQuickView",{key:t.id,attrs:{post:t}})})),1):t._e(),t._v(" "),o("v-col",{attrs:{md:"4"}},[o("Settings")],1)],1)],1)}),[],!1,null,"328eb0fc",null);e.default=component.exports;v()(component,{PostQuickView:o(492).default,Settings:o(531).default}),v()(component,{VCol:m.a,VContainer:h.a,VRow:f.a})}}]);