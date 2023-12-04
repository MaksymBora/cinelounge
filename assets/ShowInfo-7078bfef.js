import{r as n,a as S,j as e,A as L,u as B,B as H,b as O,_ as T,L as E,c as V,d as K,e as q,l as J}from"./index-4edb6553.js";import{a as Q}from"./index.esm-c3fd1986.js";import{F as U}from"./index.esm-7aca774a.js";import{i as o}from"./imagePath-b3d8f83e.js";import{c as X,f as Y,a as Z}from"./utilities-1b6bfb65.js";import{u as P,I as v,i as D,C as ss,T as es,a as ts,M as rs}from"./index.esm-a9f1e527.js";import{g as I,a as ls,d as ns}from"./serviceFavMovies-6c2d1849.js";import"./TransitionGroupContext-7cfe6ae1.js";import"./Transition-5cad3421.js";const cs=document.getElementById("trailerModal"),xs=({setViewTrailer:s,trailer:r,movie:t})=>{const c=P("Escape");return n.useEffect(()=>{c&&s(!1)},[c,s]),S.createPortal(e.jsx("div",{className:"fixed top-0 left-0 w-screen h-screen bg-imageGallery z-[2] opacity-100",onClick:()=>s(!1),children:e.jsx("iframe",{src:`https://www.youtube-nocookie.com/embed/${r==null?void 0:r.key}?autoplay=0`,className:`trailer fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 
		max-h-[92vh] bg-black border border-[#ccc] shadow-[0_0_10px_1-px_rgba(0,0,0,0)] w-iframeW h-iframeH`,allowFullScreen:!0,title:t==null?void 0:t.title})}),cs)},ds=document.getElementById("imageGallery"),is=({setViewGallery:s,movie:r})=>{const t=P("Escape"),c=["780","1280",""];n.useEffect(()=>{t&&s(!1)},[t,s]);const l=r==null?void 0:r.images.backdrops.map(d=>({original:`${o}w780${d.file_path}`,thumbnail:`${o}w780${d.file_path}`,originalWidth:780,originalHeight:439,sizes:"(max-width: 780px) 780px, (max-width: 1280px) 1280px",srcSet:c.map((x,p)=>`${o}${p<2?"w":"original"}${x}${d.file_path} ${p<2?x:d.width}w`).join(", "),loading:"lazy",thumbnailLoading:"lazy",originalAlt:"",thumbnailAlt:""})),u=d=>{const x=d.target;(x.classList.contains("image-gallery-swipe")||x.classList.contains("wrapper")||x.classList.contains("image-gallery-slide-wrapper"))&&s(!1)};return S.createPortal(e.jsx("div",{className:"fixed top-0 left-0 w-screen h-screen bg-imageGallery z-[2] wrapper",onClick:u,children:e.jsx(v,{slideInterval:2400,items:l,showFullscreenButton:D.isBrowser,showIndex:!0})}),ds)},as=({movieData:s})=>{var m,_;const[r,t]=n.useState(!1),[c,l]=n.useState(!1),[u,d]=n.useState(!1),[x,p]=n.useState(!1),{isLoggedIn:b}=n.useContext(L),{id:w}=B();if(n.useEffect(()=>{b&&!x&&(async()=>{try{(await I()).find(j=>j.movieId===Number(w))&&p(!0)}catch(a){p(!1),console.log(a)}})()},[]),!s)return null;const{vote_average:y,genres:g}=s,k=(s==null?void 0:s.images.backdrops)&&s.images.backdrops.length>0,N=(_=(m=s==null?void 0:s.videos)==null?void 0:m.results)==null?void 0:_.find(i=>i.type.toLowerCase()==="trailer"&&i.site.toLowerCase()==="youtube"),W=()=>k&&t(!0),M=()=>{if(!b){l(!0);return}const{first_air_date:i,vote_average:a,poster_path:C,id:j,name:A}=s,F={movieId:j,date:i,rating:a,poster:C,name:A,type:"shows"},z=async h=>{try{await ls(h),p(!0),T.success(e.jsxs("div",{children:["Movie ",e.jsx("b",{children:h.name})," added in Watchlist!"]}),{duration:4e3,icon:"✅"})}catch(f){console.log(f)}},G=async()=>{try{const f=(await I()).find(R=>R.movieId===Number(w)),$=await ns(f==null?void 0:f._id);return p(!1),T.success(e.jsxs("div",{children:["Movie ",e.jsx("b",{children:$.message.slice(5,13)})," from Watchlist!"]}),{duration:4e3,icon:"🚫"}),$}catch(h){return console.log(h),h}};x||z(F),x&&G()};return e.jsxs("section",{className:"my-12 mx-0 relative",children:[e.jsxs("div",{className:`h-[600px]  {${s!=null&&s.backdrop_path?"":"bg-movieAboutBg"}}`,children:[e.jsx("div",{style:{background:`url('${o}original${s==null?void 0:s.backdrop_path}') no-repeat top center/cover`},className:"absolute w-full h-full -z-5"}),e.jsxs("div",{className:"grid grid-cols-[1fr,4fr] items-center gap-x-16 z-[1] max-w-xxl mx-auto my-0 text-white relative h-full",children:[k?e.jsxs("button",{type:"button",className:"w-[300px] flex items-start rounded-cardBr relative text-xl border-none overflow-hidden bg-black cursor-pointer transition duration-250 ease-in group",onClick:W,children:[e.jsx("img",{src:`${o}w780${s==null?void 0:s.poster_path}`,alt:"",className:"transition-all group-hover:opacity-25"}),e.jsxs("p",{className:"opacity-0 w-full h-full absolute top-0 left-0 transition-all flex justify-center items-center text-white group-hover:opacity-100 ",children:[e.jsx("i",{children:e.jsx(Q,{className:"text-2xl flex hover:opacity-60"})}),e.jsx("span",{className:"ml-1.5",children:"View Gallery"})]})]}):e.jsx("img",{className:"transition-all group-hover:opacity-25",src:`${o}w780${s==null?void 0:s.poster_path}`,alt:""}),e.jsxs("div",{children:[e.jsx("div",{className:"flex items-center flex-wrap",children:e.jsxs("h1",{className:"text-[32px] mb-1.5 font-bold font-['Montserrat']",children:[s==null?void 0:s.title," ",(s==null?void 0:s.release_date)&&e.jsxs("span",{className:"text-3xl ml-2.5 font-normal tracking-[2px] text-[32px]",children:["(",s==null?void 0:s.release_date.slice(0,4),")"]})]})}),(s==null?void 0:s.tagline)&&e.jsx("p",{className:"text-sm italic mb-3",children:s==null?void 0:s.tagline}),e.jsxs("div",{className:"inline-flex items-center justify-between whitespace-nowrap mt-3 mb-4",children:[e.jsxs("div",{className:"flex items-center text-base",children:[e.jsxs("div",{className:"flex items-center justify-center bg-[#081c22] text-white w-[55px] h-[55px] rounded-[50px] text-lg",style:{border:`3px solid ${s!=null&&s.vote_average?X(y/10):"#777"}`},children:[e.jsx("p",{className:"tracking-normal",children:s!=null&&s.vote_average?+y.toFixed(1)*10:"NR"}),s!=null&&s.vote_average?e.jsx(U,{className:"text-[8px] translate-x-[1px] translate-y-[-3px]"}):null]}),s!=null&&s.runtime?e.jsx("span",{className:"mx-4 w-[2px] rounded-[10px] text-mainTextColo opacity-60 h-[30px]"}):"",s!=null&&s.runtime?e.jsx("p",{className:"runtime",children:Y(s==null?void 0:s.runtime)}):""]}),(s==null?void 0:s.genres)&&s.genres.length>0&&e.jsx("span",{className:"mx-4 w-[2px] rounded-[10px] text-mainTextColo opacity-60 h-[30px]"}),e.jsx("ul",{className:"genres",children:g==null?void 0:g.map((i,a)=>a<3&&e.jsxs("li",{children:[i.name," ",a===g.length-1||a===2?null:","]},i.id))})]}),(s==null?void 0:s.overview)&&e.jsxs("div",{className:"overview",children:[e.jsx("h3",{children:"Overview"}),e.jsx("p",{children:s==null?void 0:s.overview})]}),e.jsxs("div",{className:"flex items-center gap-x-8 mt-8",children:[N&&e.jsxs("button",{type:"button",onClick:()=>d(!0),className:`flex justify-center items-center 
                  text-base cursor-pointer bg-transparent border-none text-white 
                  transition-all tracking-[0.5px] min-h-[35px] [&>svg]:w-[35px] 
                  [&>svg]:h-[35px] [&>svg]:mr-[8px] hover:opacity-60 font-semibold`,children:[e.jsx(H,{}),e.jsx("span",{children:"Play Trailer"})]}),e.jsx(ss,{onClickAway:()=>l(!1),children:e.jsx(es,{title:e.jsx("span",{style:{fontSize:"12px",letterSpacing:"0.5px"},children:"Please login to add to Watchlist"}),arrow:!0,PopperProps:{disablePortal:!0},onClose:()=>l(!1),open:c,disableFocusListener:!0,disableHoverListener:!0,disableTouchListener:!0,children:e.jsxs("button",{type:"button",className:`[&>svg]:w-[20px] [&>svg]:h-[20px] [&>svg]:mr-[14px] 
                    flex justify-center items-center 
                    text-base cursor-pointer bg-transparent border-none text-white 
                    transition-all tracking-[0.5px] min-h-[35px] hover:opacity-60 font-semibold`,onClick:M,children:[e.jsx(O,{}),e.jsx("span",{children:x&&b?"Remove from Watchlist":"Add to Watchlist"})]})})})]})]})]})]}),u&&e.jsx(xs,{trailer:N,setViewTrailer:d,movie:s}),r&&e.jsx(is,{setViewGallery:t,movie:s})]})},os=({name:s,profile_path:r,roles:t,id:c})=>e.jsxs("li",{className:"w-[138px] bg-white dark:bg-bgCard rounded-cardBr shadow-castShadow border dark:border-black",children:[e.jsx(E,{to:`/cast/${c}`,children:e.jsx("img",{src:`${o}w342${r}`,alt:s,className:"w-full flex rounded-s-sm"})}),e.jsxs("div",{className:"py-[13px] px-[11px]",children:[e.jsx("h3",{className:"text-sm text-black dark:text-mainTextColo",children:s}),e.jsx("p",{className:"text-xs mt-[5px] text-[#3c3c3c] dark:text-secondaryText",children:t[0].character})]})]}),ps=({movieData:s})=>{var c;const{darkMode:r}=n.useContext(L),t=n.useRef(null);return e.jsxs("div",{className:"cast",children:[e.jsx("h2",{className:"mb-4 font-bold text-lg text-black dark:text-mainTextColo",children:"Cast"}),e.jsx("div",{className:"h-full relative flex",children:e.jsxs("ul",{className:`relative grid grid-flow-col justify-start gap-4 overflow-x-auto translate-y-[-2px] pt-[2px] pb-4 ${r?"scroll":"scroll-day"}`,ref:t,children:[(c=s==null?void 0:s.aggregate_credits)==null?void 0:c.cast.map((l,u)=>l.profile_path&&u<20&&n.createElement(os,{...l,key:`${l.id}-${l.popularity}`})),e.jsx("li",{className:"flex justify-center items-center flex-nowrap font-bold text-sm w-[144px]",children:e.jsxs(E,{to:"casts",className:"flex items-center text-base",children:["View More ",e.jsx(ts,{size:50})]})})]})})]})},hs=({movieData:s})=>{const r=[{base:"https://instagram.com/",id:s==null?void 0:s.external_ids.instagram_id,icon:V,keyID:9823479237498,name:"Instagram"},{base:"https://facebook.com/",id:s==null?void 0:s.external_ids.facebook_id,icon:K,keyID:1458972394879,name:"Facebook"},{base:"https://twitter.com/",id:s==null?void 0:s.external_ids.twitter_id,icon:q,keyID:7849236987293,name:"Twitter"},{base:"",id:s==null?void 0:s.homepage,icon:rs,keyID:8386725394781,name:"Website"}];return e.jsxs("div",{className:"w-[260px] flex flex-col flex-1",children:[e.jsx("ul",{className:"flex justify-start text-2xl w-[150px] translate-x-[-10px] mb-4",children:r.map(t=>t.id&&e.jsx("li",{className:"[&:not(:first-child)]:ml-[1.2rem]",children:e.jsx("a",{href:`${t.base}${t.id}`,target:"_blank",rel:"noreferrer","aria-label":`${s==null?void 0:s.title} ${t.name}`,className:"flex justify-center items-center py-[5px] px-[10px] transition-all text-black dark:text-mainTextColo hover:opacity-60",children:e.jsx(t.icon,{})})},`${t.id}-${t.keyID}`))}),r.some(t=>t.id)&&e.jsx("div",{className:"w-full bg-[#ccc] h-[2px] mb-4 rounded-[50px]"}),e.jsxs("div",{className:"flex flex-col gap-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-bold text-black dark:text-mainTextColo",children:"Status"}),e.jsx("p",{className:"text-sm mt-[2px] text-black dark:text-mainTextColo",children:s==null?void 0:s.status})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-bold text-black dark:text-mainTextColo",children:"Seasons"}),e.jsx("p",{className:"text-sm mt-[2px] text-black dark:text-mainTextColo",children:s==null?void 0:s.number_of_seasons})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-bold text-black dark:text-mainTextColo",children:"Episodes"}),e.jsx("p",{className:"text-sm mt-[2px] text-black dark:text-mainTextColo",children:s==null?void 0:s.number_of_episodes})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-bold text-black dark:text-mainTextColo",children:"Last Air Date"}),(s==null?void 0:s.last_air_date)&&e.jsx("p",{className:"text-sm mt-[2px] text-black dark:text-mainTextColo",children:Z(s.last_air_date.replace(/-/g,"/"),"short")})]}),e.jsx("div",{children:(s==null?void 0:s.networks)&&s.networks.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"text-[18px] font-bold text-black dark:text-mainTextColo",children:"Network"}),e.jsx("img",{src:`${o}original${s==null?void 0:s.networks[0].logo_path}`,alt:s==null?void 0:s.networks[0].name,className:"w-[45px] mt-2"})]})})]})]})},ms=()=>{const[s,r]=n.useState(null),{id:t}=B();return n.useEffect(()=>{if(!t)return;(async()=>{try{const l=await J(t);r(l==null?void 0:l.data)}catch(l){console.log(l)}})()},[t]),e.jsxs(e.Fragment,{children:[e.jsx(as,{movieData:s}),e.jsxs("section",{className:"flex justify-between items-start gap-x-12 max-w-xxl mt-0 mx-auto mb-12",children:[e.jsx(ps,{movieData:s}),e.jsx(hs,{movieData:s})]})]})};export{ms as default};
