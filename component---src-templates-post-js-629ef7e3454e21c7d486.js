(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"6qSS":function(e,t,n){"use strict";n.r(t),n.d(t,"query",(function(){return D}));var r=n("q1tI"),a=n.n(r),o=n("TJpk"),i=n.n(o),s=n("+ZDr"),u=n.n(s),l=n("1DYX"),c=n.n(l),p=n("L61M"),d=n.n(p),f=n("UbMB"),m=n.n(f),h=n("RPjP"),v=n.n(h),y=(n("qHiR"),n("aeq4")),g=n.n(y),E=n("snnE"),b=n("SbOt"),w=n("aArQ");var q=m.a.bind(g.a),_=c()((function(e){return new Date(e)}),Object(E.a)("YYYY-MM-DD")),P=d()(["data","post"]),j=d()(["pageContext"]),N=function(e){var t=e.disqusId,n=e.pageURL,r={shortname:"iansinnott"};return t&&(r.identifier=t),n&&(r.url=n),a.a.createElement(v.a,r)},O=function(e){var t=e.prev,n=e.next;return a.a.createElement("div",{className:q("PostNav")},t&&a.a.createElement(u.a,{to:"/"+t.slug+"/"},"Prev"),a.a.createElement(u.a,{to:"/"},"All Posts"),n&&a.a.createElement(u.a,{to:"/"+n.slug+"/"},"Next"))},k=function(e){var t,n;function r(){return e.apply(this,arguments)||this}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.render=function(){if(this.props.errors&&this.props.errors.length)return this.props.errors.forEach((function(e){var t=e.message;console.error("Blog render errr: "+t)})),a.a.createElement("div",null,a.a.createElement("h2",null,"Errors"),a.a.createElement("p",null,"See console for details."));var e=P(this.props),t=j(this.props),n=t.next,r=t.prev;return a.a.createElement(w.a,null,a.a.createElement("div",{className:q("Post")},a.a.createElement(i.a,{title:e.properties.title+" | Ian Sinnott"}),a.a.createElement("h1",null,e.properties.title),a.a.createElement("div",{className:q("meta")},a.a.createElement("p",{className:q("date")},a.a.createElement("i",{style:{marginRight:10},className:"fa fa-calendar-check-o"}),"Published: ",a.a.createElement("strong",null,_(e.properties.created))),a.a.createElement("p",{className:q("middot"),style:{margin:"0 1em"}},"•")),a.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.content_html}}),a.a.createElement("hr",null),a.a.createElement(b.a,null),a.a.createElement("hr",null),a.a.createElement(O,{prev:r,next:n}),a.a.createElement("hr",{style:{marginTop:"2rem"}}),a.a.createElement(N,{disqusId:e.properties.disqusId,pageURL:e.canonicalURL})))},r}(a.a.Component);t.default=k;var D="3544140423"},RPjP:function(e,t,n){"use strict";e.exports=n("SLms")},SLms:function(e,t,n){"use strict";n("sC2a"),n("wZFJ"),n("U6Bt"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("JHok"),n("LagC"),n("pS08"),n("E5k/"),n("R48M"),Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=s(n("q1tI")),i=s(n("17x9"));function s(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var c=["shortname","identifier","title","url","category_id","onNewComment"],p=!1;function d(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";Object.keys(t).forEach((function(r){e[n+r]=t[r]})),"function"==typeof t.onNewComment&&(e[n+"config"]=function(){this.callbacks.onNewComment=[function(e){t.onNewComment(e)}]})}var f=function(e){function t(){return u(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(e,t){return e.identifier!==this.props.identifier}},{key:"render",value:function(){var e=this,t=Object.keys(this.props).reduce((function(t,n){return c.some((function(e){return e===n}))?t:r({},t,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},n,e.props[n]))}),{});return o.default.createElement("div",t,o.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!p){var e=this.disqus=document.createElement("script"),t=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];e.async=!0,e.type="text/javascript",e.src="//"+this.props.shortname+".disqus.com/embed.js",t.appendChild(e),p=!0}}},{key:"loadDisqus",value:function(){var e=this,t={};c.forEach((function(n){e.props[n]&&(t[n]=e.props[n])})),t.url&&t.url.length||(t.url=window.location.href),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){d(this.page,t),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(d(window,t,"disqus_"),this.addDisqusScript())}}]),t}(o.default.Component);f.displayName="DisqusThread",f.propTypes={id:i.default.string,shortname:i.default.string.isRequired,identifier:i.default.string,title:i.default.string,url:i.default.string,category_id:i.default.string,onNewComment:i.default.func},t.default=f},aeq4:function(e,t,n){e.exports={Post:"post-module--Post--cZXFE",meta:"post-module--meta--2aiWT",middot:"post-module--middot--1Fv2J",timeToRead:"post-module--timeToRead--2sFTf",date:"post-module--date--wxQK2",PostNav:"post-module--PostNav--35dLv"}},qHiR:function(e,t,n){}}]);
//# sourceMappingURL=component---src-templates-post-js-629ef7e3454e21c7d486.js.map