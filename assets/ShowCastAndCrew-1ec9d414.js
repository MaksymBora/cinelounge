import{u as i,j as s,L as x,f as o,r as c,k as m}from"./index-e558ba13.js";import{i as h,a as j}from"./imagePath-b3d8f83e.js";const f=({movieData:e})=>{const{id:a}=i();return s.jsx("div",{className:"bg-white dark:bg-bgCard",children:s.jsxs("header",{className:"max-w-xxl my-0 mx-auto flex items-center mb-12 bg-white dark:bg-bgCard",children:[s.jsx("img",{src:`${h}w342${e==null?void 0:e.poster_path}`,alt:"Poster",className:"w-[58px] rounded-sm my-4 mx-0"}),s.jsxs("div",{className:"flex flex-col gap-y-1.5 h-full ml-8",children:[s.jsxs("h1",{className:"text-[26px] text-black dark:text-mainTextColo font-medium",children:[e==null?void 0:e.name,s.jsxs("span",{className:"font-normal tracking-[2px] text-black dark:text-mainTextColo",children:["(",e==null?void 0:e.first_air_date.slice(0,4),")"]})]}),s.jsxs(x,{to:`/shows/${a}`,className:"flex items-center text-sl text-black dark:text-mainTextColo [&>svg]:text-3xl [&>svg]:mr-[5px]",children:[s.jsx(o,{})," Back to main"]})]})]})})},p=({id:e,profile_path:a,name:t,total_episode_count:r,credits:l})=>{const d="character"in l[0]?l[0].character:l[0].job;return s.jsxs("li",{className:"flex items-center",children:[s.jsx(x,{to:`/cast/${e}`,tabIndex:-1,children:s.jsx("img",{loading:"lazy",src:`${j}${a}`,alt:"",className:"w-[66px] h-[66px] object-cover object-top rounded-sm"})}),s.jsxs("div",{className:"flex flex-col ml-6",children:[s.jsx(x,{to:`/person/${e}`,children:s.jsx("h3",{className:"text-black dark:text-mainTextColo font-medium",children:t})}),s.jsxs("p",{className:"text-sm text-black dark:text-mainTextColo",children:[d,s.jsxs("span",{className:"text-black dark:text-mainTextColo",children:["(",r," episodes)"]})]})]})]})},n=({credits:e,creditType:a})=>s.jsxs("div",{className:"flex flex-col w-full",children:[s.jsx("h2",{className:"listHeading text-[22px] mb-4 capitalize text-black dark:text-mainTextColo font-semibold",children:a}),s.jsx("ul",{className:"flex flex-col gap-y-4",children:e==null?void 0:e.map(t=>{var r,l;return t.profile_path&&c.createElement(p,{...t,credits:"roles"in t?t.roles:t.jobs,key:"roles"in t?(r=t.roles)==null?void 0:r[0].credit_id:(l=t.jobs)==null?void 0:l[0].credit_id})})})]}),b=()=>{const[e,a]=c.useState(null),{id:t}=i();return c.useEffect(()=>{if(!t)return;(async()=>{try{const l=await m(t);a(l==null?void 0:l.data)}catch(l){console.log(l)}})()},[t]),s.jsxs("div",{className:"my-12",children:[e&&s.jsx(f,{movieData:e}),s.jsx("div",{className:"max-w-xxl flex flex-col my-0 mx-auto",children:s.jsxs("div",{className:"flex justify-between items-start",children:[s.jsx(n,{credits:e==null?void 0:e.aggregate_credits.cast,creditType:"Cast"}),s.jsx(n,{credits:e==null?void 0:e.aggregate_credits.crew,creditType:"Crew"})]})})]})};export{b as default};
