(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"+x2M":function(t,e,n){t.exports=n("xhtX")},"Lv/3":function(module,exports,__webpack_require__){"use strict";var timeago=function(){var o={second:1e3,minute:6e4,hour:36e5,day:864e5,week:6048e5,month:2592e6,year:31536e6},obj={ago:function(t,e){var n,r=Math.round,a=" ago",i=function(t,n){return void 0===e?n+" "+t+(n>1?"s":"")+a:n+t.substring(0,1)},s=Date.now()-new Date(t).getTime();for(var u in s<0&&(s*=-1,a=" from now"),o){if(r(s)<o[u])return i(n||"m",r(s/(o[n]||1)));n=u}return i(u,r(s/o[u]))},today:function(){var t=new Date,e=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"),n=new Array("January","February","March","April","May","June","July","August","September","October","November","December");return e[t.getDay()]+", "+n[t.getMonth()]+" "+t.getDate()+", "+t.getFullYear()},timefriendly:function(s){var t=s.match(/(\d).([a-z]*?)s?$/);return t[1]*eval(o[t[2]])},mintoread:function(t,e,n){return(Math.round(t.split(" ").length/(n||200))||"< 1")+(e||" min to read")}};return obj};module.exports&&(module.exports=timeago())},aK7f:function(t,e,n){},gEGz:function(t,e,n){"use strict";var r=n("aK7f");n.n(r).a},iyQ6:function(t,e,n){"use strict";n.r(e);var r=n("Lv/3"),o=n("+x2M"),a=n.n(o),i={metaInfo:{title:"Hello, world!"},filters:{ago:function(t){return Object(r.ago)(t)},reading:function(t){return a()(null!=t?t:"").text}}},s=(n("gEGz"),n("KHd+")),u=null,l=Object(s.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Layout",[n("div",{staticClass:"text-center mb-8"},[n("h1",{staticClass:"text-3xl"},[t._v("Welcome to my blog")]),n("p",[t._v("This is where I save my thoughts about programming. Make yourself comfortable.")])]),n("p",{staticClass:"home-links"},t._l(t.$page.allPost.edges,(function(e){return n("g-link",{key:e.node.id,attrs:{to:e.node.path}},[n("div",[n("div",{staticClass:"text-xl font-bold"},[t._v(t._s(e.node.title))]),n("span",{staticClass:"text-gray-500"},[t._v(t._s(t._f("ago")(e.node.published_at))+" • "+t._s(t._f("reading")(e.node.content))),n("div",{staticClass:"text-gray-5"})]),n("div",{staticClass:"text"},[t._v(t._s(e.node.excerpt))])])])})),1)])}),[],!1,null,null,null);"function"==typeof u&&u(l);e.default=l.exports},xhtX:function(t,e,n){"use strict";
/*!
 * reading-time
 * Copyright (c) Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */function r(t){return" "===t||"\n"===t||"\r"===t||"\t"===t}t.exports=function(t,e){var n,o,a=0,i=0,s=t.length-1;for((e=e||{}).wordsPerMinute=e.wordsPerMinute||200,n=e.wordBound||r;n(t[i]);)i++;for(;n(t[s]);)s--;for(o=i;o<=s;){for(;o<=s&&!n(t[o]);o++);for(a++;o<=s&&n(t[o]);o++);}var u=a/e.wordsPerMinute,l=60*u*1e3;return{text:Math.ceil(u.toFixed(2))+" min read",minutes:u,time:l,words:a}}}}]);