"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[201],{540:(e,t,a)=>{a.d(t,{A:()=>j});var n=a(2155),s=a(851),r=a(4045),i=a(5308),l=a(4077),o=a(4907),c=a(2934),d=a(8488);function m(e){const{pathname:t}=(0,c.zy)();return(0,n.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,d.ys)(e.permalink,t))}(e,t)))),[e,t])}const u={sidebar:"sidebar_v6x4",sidebarItemTitle:"sidebarItemTitle_nh4D",sidebarItemList:"sidebarItemList_uv7K",sidebarItem:"sidebarItem_Cetf",sidebarItemLink:"sidebarItemLink_whfX",sidebarItemLinkActive:"sidebarItemLinkActive_dSQA"};var h=a(5723);function g(e){let{sidebar:t}=e;const a=m(t.items);return(0,h.jsx)("aside",{className:"col col--3",children:(0,h.jsxs)("nav",{className:(0,s.A)(u.sidebar,"thin-scrollbar"),"aria-label":(0,o.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,h.jsx)("div",{className:(0,s.A)(u.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,h.jsx)("ul",{className:(0,s.A)(u.sidebarItemList,"clean-list"),children:a.map((e=>(0,h.jsx)("li",{className:u.sidebarItem,children:(0,h.jsx)(l.A,{isNavLink:!0,to:e.permalink,className:u.sidebarItemLink,activeClassName:u.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var f=a(9607);function p(e){let{sidebar:t}=e;const a=m(t.items);return(0,h.jsx)("ul",{className:"menu__list",children:a.map((e=>(0,h.jsx)("li",{className:"menu__list-item",children:(0,h.jsx)(l.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function b(e){return(0,h.jsx)(f.GX,{component:p,props:e})}function x(e){let{sidebar:t}=e;const a=(0,i.l)();return t?.items.length?"mobile"===a?(0,h.jsx)(b,{sidebar:t}):(0,h.jsx)(g,{sidebar:t}):null}function j(e){const{sidebar:t,toc:a,children:n,...i}=e,l=t&&t.items.length>0;return(0,h.jsx)(r.A,{...i,children:(0,h.jsx)("div",{className:"container margin-vert--lg",children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsx)(x,{sidebar:t}),(0,h.jsx)("main",{className:(0,s.A)("col",{"col--7":l,"col--9 col--offset-1":!l}),children:n}),a&&(0,h.jsx)("div",{className:"col col--2",children:a})]})})})}},4335:(e,t,a)=>{a.d(t,{A:()=>F});var n=a(2155),s=a(851),r=a(630),i=a(5723);function l(e){let{children:t,className:a}=e;return(0,i.jsx)("article",{className:a,children:t})}var o=a(4077);const c={title:"title_A9w0"};function d(e){let{className:t}=e;const{metadata:a,isBlogPostPage:n}=(0,r.e)(),{permalink:l,title:d}=a,m=n?"h1":"h2";return(0,i.jsx)(m,{className:(0,s.A)(c.title,t),children:n?d:(0,i.jsx)(o.A,{to:l,children:d})})}var m=a(4907),u=a(1689);const h=["zero","one","two","few","many","other"];function g(e){return h.filter((t=>e.includes(t)))}const f={locale:"en",pluralForms:g(["one","other"]),select:e=>1===e?"one":"other"};function p(){const{i18n:{currentLocale:e}}=(0,u.A)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:g(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),f}}),[e])}function b(){const e=p();return{selectMessage:(t,a)=>function(e,t,a){const n=e.split("|");if(1===n.length)return n[0];n.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const s=a.select(t),r=a.pluralForms.indexOf(s);return n[Math.min(r,n.length-1)]}(a,t,e)}}var x=a(5683);const j={container:"container_YCth"};function v(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=b();return t=>{const a=Math.ceil(t);return e(a,(0,m.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return(0,i.jsx)(i.Fragment,{children:a(t)})}function A(e){let{date:t,formattedDate:a}=e;return(0,i.jsx)("time",{dateTime:t,children:a})}function N(){return(0,i.jsx)(i.Fragment,{children:" \xb7 "})}function P(e){let{className:t}=e;const{metadata:a}=(0,r.e)(),{date:n,readingTime:l}=a,o=(0,x.i)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,i.jsxs)("div",{className:(0,s.A)(j.container,"margin-vert--md",t),children:[(0,i.jsx)(A,{date:n,formattedDate:(c=n,o.format(new Date(c)))}),void 0!==l&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(N,{}),(0,i.jsx)(v,{readingTime:l})]})]});var c}function k(e){return e.href?(0,i.jsx)(o.A,{...e}):(0,i.jsx)(i.Fragment,{children:e.children})}function w(e){let{author:t,className:a}=e;const{name:n,title:r,url:l,imageURL:o,email:c}=t,d=l||c&&`mailto:${c}`||void 0;return(0,i.jsxs)("div",{className:(0,s.A)("avatar margin-bottom--sm",a),children:[o&&(0,i.jsx)(k,{href:d,className:"avatar__photo-link",children:(0,i.jsx)("img",{className:"avatar__photo",src:o,alt:n})}),n&&(0,i.jsxs)("div",{className:"avatar__intro",children:[(0,i.jsx)("div",{className:"avatar__name",children:(0,i.jsx)(k,{href:d,children:(0,i.jsx)("span",{children:n})})}),r&&(0,i.jsx)("small",{className:"avatar__subtitle",children:r})]})]})}const y={authorCol:"authorCol_ayKR",imageOnlyAuthorRow:"imageOnlyAuthorRow_u0D8",imageOnlyAuthorCol:"imageOnlyAuthorCol_CRjy"};function _(e){let{className:t}=e;const{metadata:{authors:a},assets:n}=(0,r.e)();if(0===a.length)return null;const l=a.every((e=>{let{name:t}=e;return!t}));return(0,i.jsx)("div",{className:(0,s.A)("margin-top--md margin-bottom--sm",l?y.imageOnlyAuthorRow:"row",t),children:a.map(((e,t)=>(0,i.jsx)("div",{className:(0,s.A)(!l&&"col col--6",l?y.imageOnlyAuthorCol:y.authorCol),children:(0,i.jsx)(w,{author:{...e,imageURL:n.authorsImageUrls[t]??e.imageURL}})},t)))})}function I(){return(0,i.jsxs)("header",{children:[(0,i.jsx)(d,{}),(0,i.jsx)(P,{}),(0,i.jsx)(_,{})]})}var T=a(305),M=a(2959);function U(e){let{children:t,className:a}=e;const{isBlogPostPage:n}=(0,r.e)();return(0,i.jsx)("div",{id:n?T.blogPostContainerID:void 0,className:(0,s.A)("markdown",a),children:(0,i.jsx)(M.A,{children:t})})}var B=a(5410),C=a(3084),L=a(5592);function R(){return(0,i.jsx)("b",{children:(0,i.jsx)(m.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function $(e){const{blogPostTitle:t,...a}=e;return(0,i.jsx)(o.A,{"aria-label":(0,m.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...a,children:(0,i.jsx)(R,{})})}function O(){const{metadata:e,isBlogPostPage:t}=(0,r.e)(),{tags:a,title:n,editUrl:l,hasTruncateMarker:o,lastUpdatedBy:c,lastUpdatedAt:d}=e,m=!t&&o,u=a.length>0;if(!(u||m||l))return null;if(t){const e=!!(l||d||c);return(0,i.jsxs)("footer",{className:"docusaurus-mt-lg",children:[u&&(0,i.jsx)("div",{className:(0,s.A)("row","margin-top--sm",B.G.blog.blogFooterEditMetaRow),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(L.A,{tags:a})})}),e&&(0,i.jsx)(C.A,{className:(0,s.A)("margin-top--sm",B.G.blog.blogFooterEditMetaRow),editUrl:l,lastUpdatedAt:d,lastUpdatedBy:c})]})}return(0,i.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[u&&(0,i.jsx)("div",{className:(0,s.A)("col",{"col--9":m}),children:(0,i.jsx)(L.A,{tags:a})}),m&&(0,i.jsx)("div",{className:(0,s.A)("col text--right",{"col--3":u}),children:(0,i.jsx)($,{blogPostTitle:n,to:e.permalink})})]})}function F(e){let{children:t,className:a}=e;const n=function(){const{isBlogPostPage:e}=(0,r.e)();return e?void 0:"margin-bottom--xl"}();return(0,i.jsxs)(l,{className:(0,s.A)(n,a),children:[(0,i.jsx)(I,{}),(0,i.jsx)(U,{children:t}),(0,i.jsx)(O,{})]})}},630:(e,t,a)=>{a.d(t,{e:()=>o,i:()=>l});var n=a(2155),s=a(7515),r=a(5723);const i=n.createContext(null);function l(e){let{children:t,content:a,isBlogPostPage:s=!1}=e;const l=function(e){let{content:t,isBlogPostPage:a}=e;return(0,n.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a})),[t,a])}({content:a,isBlogPostPage:s});return(0,r.jsx)(i.Provider,{value:l,children:t})}function o(){const e=(0,n.useContext)(i);if(null===e)throw new s.dV("BlogPostProvider");return e}},538:(e,t,a)=>{a.d(t,{k:()=>d,J:()=>m});var n=a(9850),s=a(1689),r=a(754);var i=a(630);const l=e=>new Date(e).toISOString();function o(e){const t=e.map(u);return{author:1===t.length?t[0]:t}}function c(e,t,a){return e?{image:h({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${a}`})}:{}}function d(e){const{siteConfig:t}=(0,s.A)(),{withBaseUrl:a}=(0,n.hH)(),{metadata:{blogDescription:r,blogTitle:i,permalink:d}}=e,m=`${t.url}${d}`;return{"@context":"https://schema.org","@type":"Blog","@id":m,mainEntityOfPage:m,headline:i,description:r,blogPost:e.items.map((e=>function(e,t,a){const{assets:n,frontMatter:s,metadata:r}=e,{date:i,title:d,description:m,lastUpdatedAt:u}=r,h=n.image??s.image,g=s.keywords??[],f=`${t.url}${r.permalink}`,p=u?l(u):void 0;return{"@type":"BlogPosting","@id":f,mainEntityOfPage:f,url:f,headline:d,name:d,description:m,datePublished:i,...p?{dateModified:p}:{},...o(r.authors),...c(h,a,d),...g?{keywords:g}:{}}}(e.content,t,a)))}}function m(){const e=function(){const e=(0,r.A)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:a}=(0,i.e)(),{siteConfig:d}=(0,s.A)(),{withBaseUrl:m}=(0,n.hH)(),{date:u,title:h,description:g,frontMatter:f,lastUpdatedAt:p}=a,b=t.image??f.image,x=f.keywords??[],j=p?l(p):void 0,v=`${d.url}${a.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":v,mainEntityOfPage:v,url:v,headline:h,name:h,description:g,datePublished:u,...j?{dateModified:j}:{},...o(a.authors),...c(b,m,h),...x?{keywords:x}:{},isPartOf:{"@type":"Blog","@id":`${d.url}${e.blogBasePath}`,name:e.blogTitle}}}function u(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function h(e){let{imageUrl:t,caption:a}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:a}}}}]);