import"./modulepreload-polyfill-B5Qt9EMX.js";import{l as Fe,c as Ht,f as Pt,_ as Dt,b as ke,d as st,g as Vt,S as Ft}from"./showroom-data-C8s3txE5.js";import{generateListingById as Ut,getCatalogCategory as Ot}from"./catalog-pfF1HJ-x.js";import{loadHiddenCatalogIds as it,isCatalogListingHidden as zt}from"./catalog-hidden-store-Ci-G2dxV.js";import{P as wt,g as nt,b as lt,f as Wt,T as Gt,M as Yt}from"./motorhome-data-CupbOvk0.js";import{g as ct,a as Kt,C as Jt,P as Xt}from"./phone-data-Of7KtnOV.js";import{s as Zt,a as Se,o as _e,w as Le,b as Qt,r as kt}from"./showroom-cards-hQyVeAwa.js";import{getCurrentUser as z,setRedirectAfterAuth as me}from"./auth-CtTDfG3h.js";import{supabase as B}from"./supabase-client-DSkAnHxH.js";import{l as ea,b as ta}from"./promo-backgrounds-C4TNWBGI.js";import"./app-promo-banner-PF5d4OnQ.js";/* empty css                                       */import"./categories-72WACZm8.js";import"./site-content-slMvSP6y.js";import"./promo-pool-D-DxY8Py.js";const aa=[];function xe(e){let t=2166136261;for(let a=0;a<e.length;a++)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function ra(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let a=Math.imul(t^t>>>15,1|t);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}const Ue=["James","Emma","Liam","Olivia","Noah","Ava","Ethan","Sophia","Lucas","Mia","Daniel","Isabella","Matthew","Charlotte","Samuel","Amelia","Gabriel","Harper","Nathan","Evelyn","Caleb","Abigail","Adrian","Ella","Owen","Grace","Leo","Chloe","Julian","Nora","Mason","Aria","Elijah","Layla","Isaac","Zoe","Hunter","Scarlett","Christian","Lily","Aaron","Hannah","Dylan","Savannah","Andrew","Ruby","David","Elena","Ryan","Nina","Marcus","Priya","Kwame","Fatima","Andre","Yuki","Tomas","Ingrid","Mateo","Sofia","Omar","Zara","Felix","Amara","Jonas","Leila","Victor","Mila","Diego","Iris","Hugo","Camila","Adam","Freya","Oscar","Amina","Peter","Naomi","Elias","Lucia","Ray","Talia","Marco","Sienna","Joshua","Anya","Kofi","Petra"],ve=["Anderson","Baker","Carter","Diaz","Evans","Foster","Garcia","Harris","Ingram","Johnson","Kelly","Lewis","Miller","Nelson","Ortiz","Parker","Quinn","Reed","Sanders","Turner","Underwood","Vaughn","Walker","Young","Zimmerman","Brooks","Coleman","Dunn","Fisher","Grant","Hayes","Jordan","Knight","Lopez","Morgan","Nguyen","Okafor","Peterson","Romano","Silva","Thompson","Umeh","Volkov","Wang","Xu","Yates","Zhou","Bennett","Chukwu","Doyle","Eze","Ferreira","Gonzalez","Hansen","Ivanov","Jansen","Kumar","Larsen","Moreau","Novak","Osei","Patel","Quintero","Rossi","Schmidt","Tavares","Ueda","Vasquez","Weber","Xavier","Yamamoto","Ziegler","Adeyemi","Barlow","Costa","Diop","Eriksen","Fontaine","Gomez","Holmes","Ikram","Juma","Karlsson","Lawson","Mensah","Nilsson"],dt=[{city:"Austin",country:"United States"},{city:"New York",country:"United States"},{city:"Seattle",country:"United States"},{city:"Los Angeles",country:"United States"},{city:"Chicago",country:"United States"},{city:"Boston",country:"United States"},{city:"San Diego",country:"United States"},{city:"Denver",country:"United States"},{city:"Miami",country:"United States"},{city:"Portland",country:"United States"},{city:"Toronto",country:"Canada"},{city:"Vancouver",country:"Canada"},{city:"Montreal",country:"Canada"},{city:"Calgary",country:"Canada"},{city:"Ottawa",country:"Canada"},{city:"London",country:"United Kingdom"},{city:"Manchester",country:"United Kingdom"},{city:"Birmingham",country:"United Kingdom"},{city:"Edinburgh",country:"United Kingdom"},{city:"Glasgow",country:"United Kingdom"},{city:"Bristol",country:"United Kingdom"},{city:"Liverpool",country:"United Kingdom"},{city:"Dublin",country:"Ireland"},{city:"Cork",country:"Ireland"},{city:"Paris",country:"France"},{city:"Lyon",country:"France"},{city:"Marseille",country:"France"},{city:"Berlin",country:"Germany"},{city:"Munich",country:"Germany"},{city:"Hamburg",country:"Germany"},{city:"Frankfurt",country:"Germany"},{city:"Amsterdam",country:"Netherlands"},{city:"Rotterdam",country:"Netherlands"},{city:"Brussels",country:"Belgium"},{city:"Antwerp",country:"Belgium"},{city:"Zurich",country:"Switzerland"},{city:"Geneva",country:"Switzerland"},{city:"Vienna",country:"Austria"},{city:"Rome",country:"Italy"},{city:"Milan",country:"Italy"},{city:"Florence",country:"Italy"},{city:"Madrid",country:"Spain"},{city:"Barcelona",country:"Spain"},{city:"Valencia",country:"Spain"},{city:"Lisbon",country:"Portugal"},{city:"Porto",country:"Portugal"},{city:"Stockholm",country:"Sweden"},{city:"Gothenburg",country:"Sweden"},{city:"Oslo",country:"Norway"},{city:"Copenhagen",country:"Denmark"},{city:"Helsinki",country:"Finland"},{city:"Reykjavik",country:"Iceland"},{city:"Warsaw",country:"Poland"},{city:"Krakow",country:"Poland"},{city:"Prague",country:"Czech Republic"},{city:"Athens",country:"Greece"},{city:"Sydney",country:"Australia"},{city:"Melbourne",country:"Australia"},{city:"Brisbane",country:"Australia"},{city:"Perth",country:"Australia"},{city:"Adelaide",country:"Australia"},{city:"Auckland",country:"New Zealand"},{city:"Wellington",country:"New Zealand"},{city:"Christchurch",country:"New Zealand"},{city:"Singapore",country:"Singapore"},{city:"Tokyo",country:"Japan"},{city:"Osaka",country:"Japan"},{city:"Kyoto",country:"Japan"},{city:"Seoul",country:"South Korea"},{city:"Busan",country:"South Korea"},{city:"Dubai",country:"United Arab Emirates"},{city:"Abu Dhabi",country:"United Arab Emirates"},{city:"Doha",country:"Qatar"},{city:"Tel Aviv",country:"Israel"},{city:"Taipei",country:"Taiwan"},{city:"Hong Kong",country:"Hong Kong"}],we=["just ordered from this shop and it was so easy fr","first time buying here and honestly impressed ngl","checked out in like 2 minutes, easiest thing ever","was a little skeptical at first but it all worked out","placed my order from my phone, super smooth","i've ordered here a few times and it never lets me down","took a chance on this store and zero regrets","signing up and ordering took no time at all","everything from picking to paying was really simple","first international order and it went perfectly 🙏","lowkey wasn't expecting much but it was great","order went through instantly, no drama","the site is so easy to use, even i managed it lol","been shopping online for years, this one stands out","quick and painless, just how online shopping should be","had a tiny doubt before ordering but it was fine","the whole process felt very professional","just what i needed, no stress, no hassle","my cousin recommended this shop and he was right","ordered without overthinking and it paid off"],F=["shipping was mad fast, arrived way earlier than expected","my package came in perfect condition 🔥","the delivery guy was super nice and careful","got updates the entire time, no guessing","tracking was accurate and it showed up on time","packaging was really solid, nothing was damaged","they answered my question in like 10 minutes","customer service was actually helpful, rare these days","everything arrived exactly as described","the parcel was wrapped so well, impressive","it showed up a day early, which was a nice surprise","payment was secure and confirmation came right away","kept me posted at every single step","dispatching was quick, shipped the same day","the item looked even better in person","my order was handled with so much care","they were super responsive whenever i messaged","the tracking link actually worked the whole way","delivery was on schedule, not a minute late","everything came neatly packed and in one piece","no issues at all, straight to my door","they followed up after delivery which i thought was nice","the whole team was polite and professional","my doubts disappeared once the package arrived","quality was clear as soon as i opened the box","support replied quickly even though it was late","well organized from start to finish","came when they said it would, no surprises","fast dispatch and smooth handling of my order","the notifications kept me calm the whole time lol","everything i ordered was in the box, nothing missing","the courier called before arriving, so professional","shipped in sturdy packaging, survived the trip perfectly","i could track it the whole way, very reassuring","they processed my order in record time","came in perfect shape and very well protected","every update they sent was accurate and clear","exactly the delivery experience you hope for","returns and support were straightforward too","very clean, well managed order, i was impressed"],Oe=["100% ordering again fr","would recommend this shop to anyone","already told my friends about it","this is my new go to place now","can't recommend them enough","definitely coming back, no question","so glad i found this store","will 100% be back 💯","no complaints at all honestly","totally worth it, trust me","10/10 experience, easy","this shop is legit, trust","loyal customer for life now","five stars from me, easy","a real hidden gem honestly","can't wait for my next order"],ut={vehicle:["my vehicle was delivered safe and sound, kept me updated the whole trip","the listing was exact and delivery was arranged super smoothly"],property:["the listing was spot on and they walked me through the whole process","all the paperwork was handled clean, very easy from start to finish"],phone:["the phone matched the photos exactly and shipped out quick","they double checked everything before sending, packaging was solid"],pet:["they handled everything so carefully, i felt reassured the whole way","all the paperwork was sorted out and the process was really easy"],product:["the item was exactly like the photos, arrived in great shape","order was processed fast and the packaging was really solid"]},pt=["🔥","✨","😍","🙌","💯","😭","❤️","👍","🎯","👌","✅","⚡","📦","🙏"],$t=[{year:2018,w:3},{year:2019,w:7},{year:2020,w:11},{year:2021,w:13},{year:2022,w:15},{year:2023,w:16},{year:2024,w:15},{year:2025,w:12},{year:2026,w:8}],oa=$t.reduce((e,t)=>e+t.w,0);function sa(e){let t=e()*oa;for(const a of $t){if(t<a.w)return a.year;t-=a.w}return 2024}function ze(e,t,a,r){return(e+t*a)%r}function ia(e,t={}){const a=String(e.property_id||e.id||"");if(!a)return{reviews:[],breakdown:{5:0,4:0,3:0,2:0,1:0},total:0,computedRating:0};const r=xe(a),o=187+r%660,n=Math.min(5,Math.max(1,Number(e.rating)||0))||4.5;let i=Math.max(.3,Math.min(.9,n/5)),s=1-i,c=.07,b=.04,y=.03;const h=1/(i+s+c+b+y);i*=h,s*=h,c*=h,b*=h,y*=h;const p=[i,s,c,b,y],g=e.listing_type==="vehicle"?"vehicle":e.listing_type==="property"?"property":e.listing_type==="pet"?"pet":String(e.category||"").toLowerCase().includes("phone")?"phone":"product",v=ut[g]||ut.product,f=[],$=Ue.length*ve.length,w=we.length*F.length*F.length*Oe.length,C=457,x=811;for(let k=0;k<o;k++){const H=ra(xe(a+"::"+k));let fe=H(),K=5,J=0;for(let ge=5;ge>=1;ge--)if(J+=p[5-ge],fe<=J){K=ge;break}const ae=ze(r,k,C,$),re=Ue[Math.floor(ae/ve.length)%Ue.length],oe=ve[ae%ve.length],X=`${re} ${oe}`;let m=ze(r,k,x,w);const E=we[m%we.length];m=Math.floor(m/we.length);const A=F[m%F.length];m=Math.floor(m/F.length);const S=F[m%F.length];m=Math.floor(m/F.length);const R=Oe[m%Oe.length];let M=`${E} ${A}`;k%3===0&&v.length&&(M+=` ${v[k%v.length]}`),k%2===0&&(M+=` ${S}`),M+=` ${R}`,k%3===2&&(M+=` ${pt[(r+k*13)%pt.length]}`);const _=dt[ze(r,k,337,dt.length)],j=Date.now(),se=sa(H),Ve=se===2018?10+Math.floor(H()*3):1+Math.floor(H()*12),he=1+Math.floor(H()*28),jt=Date.UTC(se,Ve-1,he),qt=new Date(Math.min(jt,j)).toISOString(),Tt=`@${re.toLowerCase()}${oe.toLowerCase()}`,Rt=2+xe(a+"::likes::"+k)%380,Nt=k%7===0?1+xe(a+"::rep::"+k)%4:0;f.push({name:X,handle:Tt,location:_.country,date:qt,rating:K,text:M,likes:Rt,replies:Nt,verified:!1,seeded:!0})}f.sort((k,H)=>k.date<H.date?1:-1);const I={5:0,4:0,3:0,2:0,1:0};let V=0;for(let k=5;k>=1;k--)I[k]=Math.round(o*p[5-k]),V+=I[k];const T=o-V;T!==0&&(I[T>0?5:1]+=T);let te=0;for(let k=5;k>=1;k--)te+=k*I[k];const De=te/o;return{reviews:f,breakdown:I,total:o,computedRating:De}}let ie="pending",Z=null;const Je=e=>`kco_review_likes_${e}`,Xe=e=>`kco_review_comments_${e}`;function Y(e){try{return JSON.parse(localStorage.getItem(e)||"null")}catch{return null}}function Ie(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}async function Ze(){try{Z||(Z=await z()||null)}catch{Z=null}if(Z&&Z.id)return"u:"+Z.id;try{let e=localStorage.getItem("kco_anon_id");return e||(e="anon-"+Math.random().toString(36).slice(2)+Date.now().toString(36),localStorage.setItem("kco_anon_id",e)),e}catch{return"anon-"+Math.random().toString(36).slice(2)+Date.now().toString(36)}}async function Qe(){if(ie!=="pending")return ie;try{const{error:e}=await B.from("review_likes").select("id").limit(1),{error:t}=await B.from("review_comments").select("id").limit(1);ie=e||t?"local":"server"}catch{ie="local"}return ie}async function St(e){const t=new Map,a=new Set,r=new Map,o=String(e||"");try{if(await Qe()==="server"){const[{data:l},{data:n}]=await Promise.all([B.from("review_likes").select("review_key, liker_id").eq("property_id",o),B.from("review_comments").select("*").eq("property_id",o).order("created_at",{ascending:!0})]),i=await Ze();for(const s of l||[])t.set(s.review_key,(t.get(s.review_key)||0)+1),s.liker_id===i&&a.add(s.review_key);for(const s of n||[]){const c=r.get(s.review_key)||[];c.push({id:s.id,author:s.author,body:s.body,created_at:s.created_at}),r.set(s.review_key,c)}}else{const l=Y(Je(o))||{},n=await Ze();for(const[s,c]of Object.entries(l)){const b=Array.isArray(c)?c:[];t.set(s,b.length),b.includes(n)&&a.add(s)}const i=Y(Xe(o))||{};for(const[s,c]of Object.entries(i))Array.isArray(c)&&r.set(s,c)}}catch{}return{likes:t,liked:a,comments:r}}async function na(e,t){const a=String(e||""),r=!1;try{const o=await Ze();if(await Qe()==="server"){const{data:s}=await B.from("review_likes").select("id").eq("review_key",t).eq("liker_id",o).limit(1);if(s&&s.length){const{error:b}=await B.from("review_likes").delete().eq("review_key",t).eq("liker_id",o);return{liked:b?r:!1}}const{error:c}=await B.from("review_likes").insert({property_id:a,review_key:t,liker_id:o});return{liked:!c}}const l=Y(Je(a))||{},n=Array.isArray(l[t])?l[t]:[],i=n.indexOf(o);return i>=0?n.splice(i,1):n.push(o),l[t]=n,Ie(Je(a),l),{liked:i<0}}catch{return{liked:r}}}async function la(e,t,a,r){const o=String(e||""),l=String(r||"").trim().slice(0,1e3),n=String(a).trim().slice(0,40)||"Guest";if(!l)return null;try{if(await Qe()==="server"){const{data:b,error:y}=await B.from("review_comments").insert({property_id:o,review_key:t,author:n,body:l}).select("id, author, body, created_at").single();if(!y&&b)return b}}catch{}const i={id:"c_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8),author:n,body:l,created_at:new Date().toISOString()},s=Y(Xe(o))||{},c=Array.isArray(s[t])?s[t]:[];return c.push(i),s[t]=c,Ie(Xe(o),s),i}const de=e=>`kco_guest_reviews_${e}`;function ca(e){const t=String(e||""),a=Y(de(t));return Array.isArray(a)?a.filter(r=>r&&r.rating>=1&&r.rating<=5&&(r.text||r.comment)).map(r=>({...r,_local:!0,comment:r.comment||r.text,text:r.text||r.comment,name:r.name||"",rating:Math.max(1,Math.min(5,Math.round(Number(r.rating)||0)))})).sort((r,o)=>new Date(o.created_at||0)-new Date(r.created_at||0)):[]}function da(e,t){const a=String(e||""),r=Math.max(1,Math.min(5,Math.round(Number(t&&t.rating)||0))),o=String(t&&t.text||"").trim().slice(0,2e3),l=String(t&&t.name||"").trim().slice(0,40);if(!r||!o)return null;const n={id:"gv_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8),rating:r,text:o,comment:o,name:l,created_at:new Date().toISOString(),_local:!0},i=Y(de(a));return Array.isArray(i)?(i.push(n),Ie(de(a),i),n):null}function ua(e,t){const a=String(e||""),r=Math.max(1,Math.min(5,Math.round(Number(t&&t.rating)||0))),o=String(t&&t.text||"").trim(),l=Y(de(a));if(!Array.isArray(l))return;const n=l.filter(i=>!(Math.round(Number(i.rating))===r&&String(i.text||"").trim()===o));n.length!==l.length&&Ie(de(a),n)}let mt=!1;function pa(){if(mt)return;mt=!0;const e=document.createElement("style");e.id="kco-temu-effects",e.textContent=`
    @keyframes kcoSalePulse{
      0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(239,68,68,.55)}
      50%{transform:scale(1.06);box-shadow:0 0 0 10px rgba(239,68,68,0)}
    }
    @keyframes kcoGlow{
      0%,100%{box-shadow:0 0 6px 1px rgba(59,130,246,.35);border-color:rgba(59,130,246,.5)}
      50%{box-shadow:0 0 16px 4px rgba(59,130,246,.5);border-color:rgba(59,130,246,.85)}
    }
    @keyframes kcoBlinkSoft{0%,100%{opacity:1}50%{opacity:.55}}
    @keyframes kcoHurry{
      0%,100%{transform:scale(1)}
      50%{transform:scale(1.03);background-color:rgba(251,191,36,.18)}
    }
    @keyframes kcoShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes kcoLiveDot{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1.25)}}
    .kco-sale-pulse{animation:kcoSalePulse 1.6s ease-in-out infinite}
    .kco-glow{animation:kcoGlow 2.2s ease-in-out infinite}
    .kco-blink-soft{animation:kcoBlinkSoft 1.8s ease-in-out infinite}
    .kco-hurry{animation:kcoHurry 1.4s ease-in-out infinite}
    .kco-shimmer{
      background:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.55) 50%,rgba(255,255,255,0) 100%);
      background-size:200% 100%;animation:kcoShimmer 2.6s linear infinite
    }
    .kco-live-dot{width:8px;height:8px;border-radius:99px;background:#22c55e;display:inline-block;animation:kcoLiveDot 1.1s ease-in-out infinite}
  `,document.head.appendChild(e)}pa();let N={likes:new Map,liked:new Set,comments:new Map},O=null,ce="",W=[],le=!1,ue="";function _t(e){let t=2166136261;for(let a=0;a<e.length;a++)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function Ee(e){return Array.isArray(e)&&e.length>0?e:[]}function P(e){return!e||typeof e!="string"?!1:/^data:video\//i.test(e)?!0:e.startsWith("blob:")?!1:/\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(e)}function et(e,t){return P(e)?`<video src="${d(e)}" muted preload="auto" playsinline class="w-20 h-16 object-cover"></video>`:'<div class="w-20 h-16 flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-5 h-5 text-gray-300"></i></div>'}function tt(e){const t=Array.isArray(e.images)&&e.images[0]||e.video||e.video_url||"";return P(t)?`<video id="hero-image" src="${d(t)}" muted loop playsinline controls preload="metadata" class="w-full h-full object-contain"></video>`:'<div id="hero-image" class="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">No video</div>'}function at(e,t){const a=document.getElementById("gallery-label");e.querySelectorAll(".gallery-thumb").forEach((r,o)=>{r.addEventListener("click",()=>{e.querySelectorAll(".gallery-thumb").forEach(i=>i.classList.remove("active","border-blue-500")),e.querySelectorAll(".gallery-thumb").forEach(i=>i.classList.add("border-gray-200")),r.classList.add("active","border-blue-500"),r.classList.remove("border-gray-200");const l=r.dataset.img,n=document.getElementById("hero-image");if(n)if(n.closest(".hero-zoom"),P(l)){const i=document.createElement("video");i.id="hero-image",i.src=l,i.muted=!0,i.loop=!0,i.controls=!0,i.playsInline=!0,i.preload="metadata",i.className="w-full h-full object-contain",n.replaceWith(i)}else{const i=document.createElement("div");i.id="hero-image",i.className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400",i.textContent="No video",n.replaceWith(i)}a&&(a.textContent=t[o]||`View ${o+1}`)})})}function ma(e,t){const a=o=>{if(o.readyState>=2&&o.videoWidth)try{const l=document.createElement("canvas");l.width=o.videoWidth,l.height=o.videoHeight,l.getContext("2d").drawImage(o,0,0);const n=l.toDataURL("image/jpeg",.8);n&&n.length>100&&(e.poster=n)}catch{}},r=document.createElement("video");r.muted=!0,r.playsInline=!0,r.preload="auto",r.src=t,r.addEventListener("loadeddata",()=>a(r),{once:!0}),r.addEventListener("error",()=>{},{once:!0}),r.load(),setTimeout(()=>{try{r.removeAttribute("src"),r.load()}catch{}},12e3)}function Lt(e,t="w-4 h-4"){const a=Math.round(Number(e)||0);return[1,2,3,4,5].map(r=>`<i data-lucide="star" class="${t} ${r<=a?"fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(0,0,0,.25)]":"text-gray-300"}"></i>`).join("")}function ee(e,t,a="blue"){const r={blue:"bg-blue-50 text-blue-600",amber:"bg-amber-50 text-amber-600",emerald:"bg-emerald-50 text-emerald-600",violet:"bg-violet-50 text-violet-600",rose:"bg-rose-50 text-rose-600"};return`
    <div class="flex items-center gap-2.5 mb-4">
      <div class="shrink-0 w-10 h-10 rounded-xl ${r[a]||r.blue} flex items-center justify-center"><i data-lucide="${e}" class="w-5 h-5"></i></div>
      <h3 class="text-lg font-black text-gray-900 tracking-tight">${t}</h3>
    </div>`}function ba(e){return`
    <div class="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
      <div class="flex items-center gap-1.5 text-gray-500 text-xs mb-1.5"><i data-lucide="${e.icon}" class="w-3.5 h-3.5"></i>${e.label}</div>
      <div class="text-gray-900 font-bold text-[15px] leading-snug">${e.html||d(e.value)}</div>
    </div>`}function ne(e,t,a,r="blue"){return!a||!a.length?"":`
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${ee(t,e,r)}
      ${It(a)}
    </div>`}function It(e){return!e||!e.length?"":`<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">${e.map(ba).join("")}</div>`}function Me(e){return!e||!e.length?"":`
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${ee("list-checks","Features & Amenities","emerald")}
      ${Et(e)}
    </div>`}function Et(e){return!e||!e.length?"":`<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${e.map(t=>`
          <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
            <span class="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>
            <span class="text-[15px] text-gray-800 font-medium">${d(t)}</span>
          </div>`).join("")}
      </div>`}function fa(e){return!e||!e.length?"":`
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${ee("star","Highlights","amber")}
      ${Mt(e)}
    </div>`}function Mt(e){return!e||!e.length?"":`<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${e.map(t=>`
          <div class="flex items-start gap-2.5 bg-amber-50/60 border border-amber-100 rounded-xl px-3.5 py-2.5">
            <i data-lucide="badge-check" class="w-4 h-4 text-amber-500 mt-0.5 shrink-0"></i>
            <span class="text-[15px] text-gray-800 font-medium">${d(t)}</span>
          </div>`).join("")}
      </div>`}function We(e,t="emerald"){if(!e||!e.length)return"";const a={emerald:"bg-emerald-100 text-emerald-600",amber:"bg-amber-100 text-amber-600",blue:"bg-blue-100 text-blue-600",violet:"bg-violet-100 text-violet-600",rose:"bg-rose-100 text-rose-600"}[t]||"bg-emerald-100 text-emerald-600";return`<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
    ${e.map(r=>`
      <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
        <span class="shrink-0 w-6 h-6 rounded-full ${a} flex items-center justify-center"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>
        <span class="text-[15px] text-gray-800 font-medium">${d(String(r))}</span>
      </div>`).join("")}
  </div>`}function ya(e){const t=e.floor_plan&&typeof e.floor_plan=="object"?e.floor_plan:{},a=Array.isArray(t.rooms)?t.rooms:[];if(!(t.image||t.levels||t.total_area||a.length))return"";const o=a.length?`
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
      ${a.map(n=>{const i=typeof n=="string"?n:n.name||"Room",s=typeof n=="string"?"":n.dimensions||"";return`<div class="bg-gray-50 border border-gray-100 rounded-xl p-3">
          <p class="text-[15px] font-bold text-gray-900">${d(String(i))}</p>
          ${s?`<p class="text-xs text-gray-500 mt-0.5">${d(String(s))}</p>`:""}
        </div>`}).join("")}
    </div>`:"",l=[t.levels?`Levels: ${t.levels}`:"",t.total_area?`Total area: ${t.total_area}`:""].filter(Boolean);return`
    <div class="space-y-3">
      ${t.image?`<img src="${d(String(t.image))}" alt="Floor plan" class="w-full rounded-xl border border-gray-200 bg-gray-50" loading="lazy" onerror="this.style.display='none'">`:""}
      ${l.length?`<div class="flex flex-wrap gap-2">${l.map(n=>`<span class="inline-flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">${d(String(n))}</span>`).join("")}</div>`:""}
      ${o}
    </div>`}function ha(e){const t=Array.isArray(e.legal_info)?e.legal_info:[],a=e.risk_notes;if(!t.length&&!a)return"";const r={"Seller provided":"bg-amber-50 text-amber-700 border-amber-200",Documented:"bg-blue-50 text-blue-700 border-blue-200","Not verified":"bg-gray-50 text-gray-600 border-gray-200"};return`
    <div class="space-y-2.5">
      ${t.map(l=>{const n=typeof l=="string"?l:l.label||"",i=typeof l=="string"?"":l.value||"",s=typeof l=="string"?"Not verified":l.source||"Not verified",c=r[s]||r["Not verified"],b=`${n}${i?": "+i:""}`;return`<div class="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
      <span class="text-[15px] text-gray-800 font-medium">${d(b)}</span>
      <span class="shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-full border ${c}">${d(s)}</span>
    </div>`}).join("")||""}
      ${a?`<div class="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5"><p class="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Condition / Risk Notes</p><p class="text-sm text-gray-700 leading-relaxed">${d(String(a))}</p></div>`:""}
      <p class="text-xs text-gray-400 leading-relaxed"><strong class="text-gray-500">Note:</strong> Legal and ownership details are provided by the seller for information only and have not been independently verified by the marketplace. Always confirm with the seller or a qualified professional before purchase.</p>
    </div>`}function ga(e){const t=e.nearby_area&&typeof e.nearby_area=="object"?e.nearby_area:{},a=[{icon:"school",label:"Schools",items:t.schools},{icon:"cross",label:"Hospitals & Clinics",items:t.hospitals},{icon:"shopping-cart",label:"Shopping & Markets",items:t.shopping},{icon:"bus",label:"Transportation",items:t.transportation}].filter(o=>Array.isArray(o.items)&&o.items.length),r=Array.isArray(t.distances)?t.distances:[];return!a.length&&!r.length?"":`
    <div class="space-y-3">
      ${a.map(o=>`
        <div>
          <p class="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5"><i data-lucide="${o.icon}" class="w-3.5 h-3.5"></i> ${o.label}</p>
          <div class="flex flex-wrap gap-2">
            ${o.items.map(l=>`<span class="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-full">${d(String(l))}</span>`).join("")}
          </div>
        </div>`).join("")}
      ${r.length?`<div><p class="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5"><i data-lucide="navigation" class="w-3.5 h-3.5"></i> Distances</p><div class="flex flex-wrap gap-2">${r.map(o=>`<span class="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full">${d(String(o))}</span>`).join("")}</div></div>`:""}
    </div>`}function xa(e){const t=e.verification_status||"Not verified",a={Verified:"bg-emerald-50 text-emerald-700 border-emerald-200","Pending verification":"bg-amber-50 text-amber-700 border-amber-200","Not verified":"bg-gray-50 text-gray-600 border-gray-200"}[t]||"bg-gray-50 text-gray-600 border-gray-200",r=Array.isArray(e.documents)?e.documents:[],o=[{icon:"shield-check",label:"Verification",value:t,badge:a},e.verification_date?{icon:"calendar-check",label:"Verification Date",value:e.verification_date}:null,e.inspection_info?{icon:"clipboard-check",label:"Inspection",value:e.inspection_info}:null].filter(Boolean);return`
    <div class="space-y-3">
      ${o.length?`<div class="space-y-2.5">${o.map(l=>`
        <div class="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
          <span class="flex items-center gap-2 text-sm text-gray-800 font-medium"><i data-lucide="${l.icon}" class="w-4 h-4 text-blue-500"></i> ${l.label}</span>
          ${l.badge?`<span class="shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-full border ${l.badge}">${d(String(l.value))}</span>`:`<span class="text-sm text-gray-700 font-semibold">${d(String(l.value))}</span>`}
        </div>`).join("")}</div>`:""}
      ${r.length?`<div><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Documents</p><div class="space-y-1.5">${r.map(l=>`<a href="${d(String(l))}" target="_blank" rel="noopener" class="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"><i data-lucide="file-text" class="w-3.5 h-3.5"></i> ${d(String(l))}</a>`).join("")}</div></div>`:""}
      <div class="flex flex-wrap gap-2">
        <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full"><i data-lucide="lock" class="w-3.5 h-3.5"></i> Secure Checkout</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Payment Protection</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1.5 rounded-full"><i data-lucide="file-check" class="w-3.5 h-3.5"></i> Purchase Agreement</span>
      </div>
      <p class="text-xs text-gray-400 leading-relaxed">Full purchase and booking terms are confirmed with the seller before any payment is completed.</p>
    </div>`}function va(e){if(e.listing_type!=="property")return"";const t=[],a=We(e.interior_features,"emerald"),r=We(e.exterior_features,"blue"),o=We(e.home_systems,"violet"),l=[a?`<div class="mb-4"><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Interior Features</p>${a}</div>`:"",r?`<div class="mb-4"><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Exterior Features</p>${r}</div>`:"",o?`<div><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Home Systems</p>${o}</div>`:""].filter(Boolean).join("");l&&t.push(q("acc-features","home","Features & Home Systems",l,!1,"emerald"));const n=ya(e);n&&t.push(q("acc-floorplan","layout-dashboard","Floor Plan",n,!1,"violet"));const i=ha(e);i&&t.push(q("acc-legal","scale","Legal & Financial",i,!1,"amber"));const s=ga(e);s&&t.push(q("acc-nearby","map-pin","Nearby Area",s,!1,"rose"));const c=xa(e);return c&&t.push(q("acc-trust","shield-check","Verification & Trust",c,!1,"blue")),t.join("")}function u(e,t,a=""){const r=e[t];if(r!=null&&String(r).trim()!=="")return r;const o=e.specifications&&typeof e.specifications=="object"?e.specifications:{};return o[t]!=null?o[t]:a}function rt(e){if(e==null)return!1;const t=String(e).trim();return!(!t||/requires?\s+verification|not\s+provided|not\s+specified|not\s+available|not\s+found|not\s+visible|not\s+applicable|not\s+listed|\bunknown\b|undisclosed|no\s+data|full\s+street\s+address|postal\s+code|local\s+area\s+details|to\s+be\s+(?:confirmed|verified|announced|updated)|^\s*n\/?a\s*$|^\s*none\s*$|^\s*null\s*$|^\s*-{1,}\s*$/i.test(t))}function ot(...e){const t=e.map(a=>a==null?"":String(a).trim()).filter(a=>a&&rt(a));return t.length?"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(t.join(", ")):""}function D(e,t){const a=e==null?"":String(e).trim();if(!a)return"";if(!rt(a))return`<span class="text-[15px] text-gray-400 font-semibold" title="Requires verification">${d(a)}</span>`;const r=ot(...t);return r?`<a href="${r}" target="_blank" rel="noopener" class="inline-flex flex-wrap items-center gap-1 text-[15px] text-blue-600 font-bold hover:text-blue-700 underline decoration-blue-300 underline-offset-2" title="Open in Google Maps">${d(a)} <i data-lucide="external-link" class="w-3.5 h-3.5 shrink-0"></i></a>`:`<span class="text-[15px] text-gray-400 font-semibold" title="Requires verification">${d(a)}</span>`}function wa(e){const t=[];for(const a of["address","neighborhood","product_location","location","town","city","state","country"]){const r=u(e,a);rt(r)&&t.push(String(r).trim())}return t.join(", ")}const ka=new Set(["Cars","Cars & Vehicles","Trucks","Buses","Buses & Coaches","Motorhomes","Motorcycles","Marine & Boating","RV & Camper Accessories","Vehicles","Luxury Cars","Commercial Vehicles"]);function pe(e){return e.listing_type==="vehicle"||ka.has(e.category)}function $a(e){const t=String(u(e,"wheels_tires")||"");if(!t.trim())return"";t.split(",").map(o=>o.trim()).filter(Boolean);const a=String(t).match(/(?:[0-9]{2,4}\s*(?:\/[0-9]{2,3}\s*)?(?:R|ZR)[0-9]{1,2}|[0-9]{1,2}(?:\.|x|X)[0-9]{1,2}(?:\.|x|X)-?[0-9]+|[0-9]{2,3}\s*(?:\.[0-9]{1,2})?\s*(?:inches|inch|in|"))/),r=a?a[0]:"";return`
    <div class="flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-200 rounded-2xl p-5">
      <div class="relative shrink-0 w-36 h-36 sm:w-40 sm:h-40">
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-950 shadow-xl" style="background:radial-gradient(circle at 35% 30%, #4b5563, #111827 70%)"></div>
        <div class="absolute inset-[26%] rounded-full bg-white shadow-inner flex items-center justify-center">
          <div class="w-full h-full rounded-full border-[10px] border-gray-200"></div>
        </div>
        <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-widest text-gray-500 uppercase">Tire</span>
      </div>
      <div class="flex-1 min-w-0 text-center sm:text-left">
        <p class="text-xs font-black text-amber-700 uppercase tracking-wide mb-1">Wheels & Tires</p>
        <p class="text-lg font-black text-gray-900 leading-snug">${d(t)}</p>
        ${r?`<div class="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-amber-200 px-3 py-1.5 rounded-full"><i data-lucide="ruler" class="w-3.5 h-3.5 text-amber-600"></i> Size: ${d(r)}</div>`:""}
        <div class="mt-3 rounded-xl bg-white/80 border border-amber-200 p-3.5 text-left">
          <p class="text-[11px] font-black text-gray-600 uppercase tracking-wide mb-1.5">What this means for you</p>
          <ul class="space-y-1 text-xs text-gray-600 leading-relaxed">
            <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0"></i><span>Confirms the exact tire and wheel fitment — what the vehicle wears and whether spares match.</span></li>
            <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0"></i><span>Fresh tires mean no surprise costs when you drive away — worn ones are called out up front.</span></li>
            <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0"></i><span>Always confirm tread and condition in person or with the seller's inspection report.</span></li>
          </ul>
        </div>
      </div>
    </div>`}function Sa(e){if(!pe(e))return"";const t=[],a=(y,h,p)=>p!=null&&String(p)!==""?`<div class="bg-gray-50 border border-gray-100 rounded-xl p-3.5"><div class="flex items-center gap-1.5 text-gray-500 text-xs mb-1.5"><i data-lucide="${y}" class="w-3.5 h-3.5"></i>${h}</div><div class="text-gray-900 font-bold text-[15px] leading-snug">${d(String(p))}</div></div>`:"",r=(y,h,p)=>p?`
    <div class="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5">
      <span class="shrink-0 w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center"><i data-lucide="${y}" class="w-4 h-4 text-emerald-600"></i></span>
      <div class="min-w-0"><p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">${h}</p><p class="text-sm text-gray-700 leading-relaxed">${d(String(p))}</p></div>
    </div>`:"",o=[a("badge-check","Condition",u(e,"condition")),a("user-round","Previous Owners",u(e,"previous_owners")),a("clipboard-check","Registration",u(e,"registration_status")),a("shield-check","Inspection",u(e,"inspection_status")),a("badge-dollar-sign","Warranty",u(e,"warranty"))].filter(Boolean).join(""),l=[r("scroll-text","Ownership History",u(e,"ownership_history")),r("wrench","Service & Maintenance History",u(e,"service_history")),r("alert-triangle","Accident / Damage History",u(e,"accident_history"))].filter(Boolean).join("");(o||l)&&t.push(q("acc-vh-cond","shield-check","Condition & History",`
      ${o?`<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">${o}</div>`:""}
      ${l}`.trim(),!0,"emerald"));const n=$a(e);n&&t.push(q("acc-vh-wheels","circle-dot","Wheels & Tires",n,!0,"amber"));const i=(y,h,p)=>Array.isArray(y)&&y.length?`
    <div><p class="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5"><i data-lucide="${h}" class="w-3.5 h-3.5"></i> ${p}</p>
    <div class="flex flex-wrap gap-2">${y.map(g=>`<span class="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-full">${d(String(g))}</span>`).join("")}</div></div>`:"",s=[i(u(e,"safety_features"),"shield","Safety Features"),i(u(e,"driver_assistance"),"radar","Driver Assistance"),i(u(e,"technology"),"cpu","Technology & Infotainment"),i(u(e,"interior"),"armchair","Interior & Comfort")].filter(Boolean).join("");s&&t.push(q("acc-vh-safety","cpu","Safety & Technology",s,!1,"rose"));const c=[a("ruler","Dimensions (L x W x H)",u(e,"dimensions")),a("package","Cargo Capacity",u(e,"cargo_capacity")),a("truck","Towing Capacity",u(e,"towing_capacity")),a("fuel","Fuel Economy",u(e,"fuel_economy")),a("users","Seats",u(e,"seating_capacity")),a("door-open","Doors",u(e,"doors"))].filter(Boolean).join("");c&&t.push(q("acc-vh-dims","ruler","Dimensions & Capacity",`<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${c}</div>`,!1,"sky"));const b=u(e,"location")||[u(e,"city"),u(e,"state"),u(e,"country")].filter(Boolean).join(", ");if(b){const y=ot(b);t.push(q("acc-vh-loc","map-pin","Location & Availability",`
      <div class="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5">
        <span class="shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center"><i data-lucide="map-pin" class="w-5 h-5"></i></span>
        <div class="min-w-0"><p class="text-[15px] text-gray-900 font-bold">${D(b,[b])}</p>
        ${y?`<a href="${y}" target="_blank" rel="noopener" class="text-xs font-bold text-blue-600 hover:underline">Open in Google Maps</a>`:""}</div>
      </div>
      <div class="mt-3 grid grid-cols-2 gap-3">
        <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-3"><p class="text-xs text-gray-500">Availability</p><p class="text-sm font-black text-emerald-700">${d(e.availability_status||(e.stock_quantity>0?"In Stock":"Available"))}</p></div>
        <div class="bg-gray-50 border border-gray-100 rounded-xl p-3"><p class="text-xs text-gray-500">Listing Location</p><p class="text-sm font-black text-gray-900">${d(String(u(e,"location")||"Marketplace"))}</p></div>
      </div>`,!1,"sky"))}return t.join("")}function _a(e){const t=u(e,"seller_name")||u(e,"contact_name"),a=u(e,"seller_phone")||u(e,"contact_phone"),r=u(e,"seller_email")||u(e,"contact_email"),o=u(e,"location"),l=[];return t&&l.push({icon:"user-round",label:"Company / Contact",value:t}),a&&l.push({icon:"phone",label:"Phone / WhatsApp",value:a}),r&&l.push({icon:"mail",label:"Email",value:r,link:"mailto:"+r}),o&&l.push({icon:"map-pin",label:"Location",html:D(o,[o])}),`
    <div class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
      ${ee("contact-round","Buyer Information","emerald")}
      <div class="space-y-2.5">
        ${l.map(n=>`
          <div class="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
            <span class="flex items-center gap-2 text-sm text-gray-800 font-bold"><i data-lucide="${n.icon}" class="w-4 h-4 text-emerald-600"></i> ${n.label}</span>
            ${n.html?n.html:n.link?`<a href="${d(n.link)}" class="text-sm text-blue-600 font-bold hover:underline">${d(String(n.value))}</a>`:`<span class="text-sm text-gray-700 font-semibold">${d(String(n.value))}</span>`}
          </div>`).join("")}
        <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"></i>
          <p class="text-xs text-gray-600 leading-relaxed">Buy with confidence — secure checkout, payment protection and verified contact details. Questions about this ${e.listing_type==="property"?"property":"vehicle"}? Reach out before purchase, or open a live chat any time.</p>
        </div>
      </div>
    </div>`}function q(e,t,a,r,o=!1,l="blue"){const n={blue:"bg-blue-50 text-blue-600",amber:"bg-amber-50 text-amber-600",emerald:"bg-emerald-50 text-emerald-600",violet:"bg-violet-50 text-violet-600",rose:"bg-rose-50 text-rose-600"},i=n[l]||n.blue;return`
    <div class="bg-white border border-gray-200 rounded-2xl mb-3 overflow-hidden shadow-sm">
      <button type="button" data-acc="${e}" class="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-gray-50 transition active:bg-gray-100">
        <span class="flex items-center gap-3 min-w-0">
          <span class="shrink-0 w-10 h-10 rounded-xl ${i} flex items-center justify-center"><i data-lucide="${t}" class="w-5 h-5"></i></span>
          <span class="text-[15px] sm:text-base font-black text-gray-900 tracking-tight">${a}</span>
        </span>
        <span data-acc-icon="${e}" class="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${o?"rotate-180":""}">
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500"></i>
        </span>
      </button>
      <div data-acc-body="${e}" class="px-4 sm:px-5 pb-5 ${o?"":"hidden"}">
        ${r}
      </div>
    </div>`}window.toggleAccordion=e=>{const t=document.querySelector(`[data-acc-body="${e}"]`),a=document.querySelector(`[data-acc-icon="${e}"]`);!t||!a||(t.classList.toggle("hidden"),a.classList.toggle("rotate-180"))};function La(){return`
    <div class="space-y-3 text-[15px] text-gray-700 leading-relaxed">
      <p class="flex items-start gap-2.5"><i data-lucide="truck" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Shipping methods.</strong> Standard delivery is <strong>free worldwide</strong> (3–7 business days). Express (2–4 business days, $25) and Priority (1–2 business days, $50) are available at checkout.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="package" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Courier partners.</strong> We ship with trusted international couriers — DHL, FedEx, UPS and EMS. Every shipment gets a tracking number.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="clock" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Processing time.</strong> Orders are processed within 1–2 business days after payment confirmation. Bank-transfer orders are processed once the receipt is verified.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="globe" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">International delivery.</strong> We ship to over 200 countries. Customs duties and import taxes may apply and are the buyer's responsibility.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="search-check" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Tracking.</strong> You'll receive a shipping confirmation email with your tracking number. You can also track orders from your account dashboard.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="badge-help" class="w-5 h-5 text-blue-500 mt-0.5 shrink-0"></i><span>Questions? <a href="/shipping-policy.html" class="text-blue-600 font-bold hover:underline">Read the full Shipping Policy</a>.</span></p>
    </div>`}function Ia(){return`
    <div class="space-y-3 text-[15px] text-gray-700 leading-relaxed">
      <p class="flex items-start gap-2.5"><i data-lucide="rotate-ccw" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">14-day easy returns.</strong> Items may be returned within 14 days of delivery. Refund requests must be submitted within 30 days of the order date.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="calendar-x" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Cancellation before shipment.</strong> Cancel before your order ships and a full refund is issued within 5–7 business days.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="package-x" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Damaged or defective.</strong> If your item arrives damaged, contact us within 7 days with photos — we arrange a replacement or full refund, including return shipping.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="package-search" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Non-delivery.</strong> If your order doesn't arrive within the estimated window plus 14 days, we investigate with the carrier and refund or resend at no cost.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="wallet" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Refund processing.</strong> Approved refunds are processed within 5–7 business days. Card refunds take 5–10 business days to appear, bank transfers 7–14, mobile money 3–5.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="circle-slash" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span><strong class="text-gray-900">Non-refundable.</strong> Final-sale items, digital products, and items used or damaged by the customer are not eligible for refunds.</span></p>
      <p class="flex items-start gap-2.5"><i data-lucide="badge-help" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i><span>Questions? <a href="/refund-policy.html" class="text-blue-600 font-bold hover:underline">Read the full Return &amp; Refund Policy</a>.</span></p>
    </div>`}function Ea(){const e=[{q:"How do I track my order?",a:"Once your order ships you'll get a confirmation email with your tracking number. You can also track it anytime from your account dashboard under Shipping & Delivery."},{q:"Is shipping really free worldwide?",a:"Yes. Standard shipping to any country is free on every order. Express and Priority upgrades are available at checkout if you need it sooner."},{q:"How long does delivery take?",a:"Standard delivery takes 3–7 business days. Express takes 2–4 business days and Priority 1–2 business days. Processing adds 1–2 business days after payment is confirmed."},{q:"How do returns work?",a:"Items can be returned within 14 days of delivery. Refund requests must be submitted within 30 days of the order date — see the Return &amp; Refund Policy section above."}],t=[{q:"Is my payment secure?",a:"Yes. All payments are processed over SSL-encrypted connections through certified payment gateways. Your payment details are never stored on our servers in plain text."},{q:"Can I cancel my order before it ships?",a:"Absolutely. Cancel before shipment and a full refund is issued within 5–7 business days to your original payment method."},{q:"What if my item arrives damaged?",a:"Contact us within 7 days of delivery with photos and a description. We'll arrange a replacement or a full refund — including return shipping costs."},{q:"How do I contact customer support?",a:"Email us at support@weverseonlineshop.com or use the Contact page. Our team reviews every message within 48 hours."},{q:"Do you ship to my country?",a:"We ship to over 200 countries worldwide. Customs duties and import taxes, where applicable, are the buyer's responsibility."},{q:"How do I request a refund?",a:"Email support@weverseonlineshop.com with your order number, the reason, and any supporting documentation. Approved refunds are processed within 5–7 business days."}],a=r=>`
    <div class="border border-gray-100 rounded-xl overflow-hidden">
      <button type="button" data-acc="faq" class="faq-q w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-gray-50 transition">
        <span class="text-[14px] font-bold text-gray-900">${d(r.q)}</span>
        <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300"></i>
      </button>
      <div class="faq-a hidden px-3.5 pb-3.5 text-sm text-gray-600 leading-relaxed">${d(r.a)}</div>
    </div>`;return`
    <div class="space-y-2">
      ${e.map(a).join("")}
      <div class="faq-extra hidden space-y-2">${t.map(a).join("")}</div>
      <button type="button" id="faq-show-more" class="mt-2 w-full inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-blue-600 font-bold py-2.5 rounded-xl text-sm transition">
        Show more questions <i data-lucide="chevron-down" class="w-4 h-4"></i>
      </button>
    </div>`}function Ma(e){const t=(e.description||"").trim(),a="text-[15px] sm:text-[16px] text-gray-900 leading-[1.75] mb-3";if(t.length>140)return t.split(/\r?\n+/).filter(Boolean).map(x=>`<p class="${a}">${d(x)}</p>`).join("");(e.title||"this item").trim();const r=String(e.category||e.listing_type||"item").toLowerCase(),o=(e.brand||"").trim(),l=(e.color||"").trim(),n=(e.condition||"").trim(),i=(e.country||"").trim(),s=Array.isArray(e.features)&&e.features.length?e.features.map(x=>typeof x=="string"?x.trim():(x&&x.label||"").trim()).filter(Boolean):[],c=Array.isArray(e.tags)&&e.tags.length?e.tags.map(x=>typeof x=="string"?x.trim():String(x).trim()).filter(Boolean):[];let b=_t(String(e.property_id||e.id||"")+"::desc");const y=()=>{b|=0,b=b+1831565813|0;let x=Math.imul(b^b>>>15,1|b);return x=x+Math.imul(x^x>>>7,61|x)^x,((x^x>>>14)>>>0)/4294967296},h=x=>x[Math.floor(y()*x.length)%x.length],p=h(["This "+r+" is built around one simple idea: you get something genuinely useful that holds up to everyday use.","A practical, well-made "+r+" that fits right into your routine without overcomplicating things.","Thoughtfully put together and easy to live with, this "+r+" does exactly what it should, without fuss.","Made to be used, not just looked at — a dependable "+r+" that earns its place."]),g=h(["The materials and finish feel solid in person, so you can count on it for the long run.","Construction is clean and sturdy, and the details are finished with real care.","It is well assembled and holds up to regular use, with quality you can feel right away."]),v=h(["It is easy to use from the moment it arrives, with nothing complicated to figure out.","Everything is straightforward and practical — set it up and it just works.","Designed to be convenient day to day, it is simple to handle and a pleasure to use."]);let f=[];o&&f.push(`brand: ${o}`),n&&f.push(n.toLowerCase()==="new"?"brand new condition":`${n.toLowerCase()} condition`),l&&f.push(`colour: ${l}`),i&&f.push(`shipping from ${i}`),f=f.filter(Boolean);const $=f.length?`You can expect ${f.slice(0,3).join(" · ")}.`:"",w=c.length?c.slice(0,6).map(x=>`<span class="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 mr-1.5 mb-1.5">${d(x)}</span>`).join(""):"",C=s.length?`
      <div class="mt-4">
        <h4 class="flex items-center gap-2 text-[13px] font-black uppercase tracking-wide text-gray-900 mb-2.5">
          <i data-lucide="list-checks" class="w-4 h-4 text-blue-500"></i> Key features
        </h4>
        <ul class="space-y-2.5">
          ${s.slice(0,6).map(x=>`
            <li class="flex items-start gap-2.5">
              <i data-lucide="check-circle-2" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5"></i>
              <span class="text-[15px] sm:text-[16px] text-gray-900 leading-relaxed">${d(x)}</span>
            </li>`).join("")}
        </ul>
      </div>`:"";return`
    <h4 class="flex items-center gap-2 text-[13px] font-black uppercase tracking-wide text-gray-900 mb-3">
      <i data-lucide="file-text" class="w-4 h-4 text-blue-500"></i> About this ${r}
    </h4>
    <p class="${a}">${d(p)}</p>
    <p class="${a}">${d(g)} ${d(v)}</p>
    ${t.trim()?`<p class="${a}">${d(t.trim())}</p>`:""}
    ${$?`<p class="${a}"><span class="font-bold text-gray-900">Details:</span> ${d($)}</p>`:""}
    ${C}
    ${w?`<div class="mt-3 pt-3">${w}</div>`:""}
    <p class="${a} mt-3 border-t border-slate-100 pt-3">${d(h(["Order with confidence — the Weverse Online Shop team is here if you need anything along the way.","A dependable everyday choice, backed by our easy-returns promise if it is not quite right for you.","Great value for what you get, delivered to your door with secure checkout and helpful support."]))}</p>`}function Ce(e,t,a,r,o,l=""){const n=e.listing_type==="property",i=`
    ${Ma(e)}
    ${o||""}
    ${Mt(r)}
    ${Et(a)}`;return`
    ${q("acc-details","file-text",n?"Property Details":pe(e)?"Vehicle Details":"Product Details",i,!0,"blue")}
    ${q("acc-specs","settings-2",n?"Property Specifications":pe(e)?"Vehicle Specifications":"Specifications",It(t)||'<p class="text-sm text-gray-500">No specifications available for this listing.</p>',!0,"violet")}
    ${l||""}
    ${q("acc-shipping","truck","Shipping Information",La(),!1,"emerald")}
    ${q("acc-refund","rotate-ccw","Return &amp; Refund Policy",Ia(),!1,"rose")}
    ${q("acc-faq","circle-help","Frequently Asked Questions",Ea(),!1,"amber")}`}function Be(){const e=document.getElementById("details-content");if(!e)return;e.querySelectorAll("[data-acc]").forEach(a=>{a.dataset.bound||(a.dataset.bound="1",a.addEventListener("click",()=>{const r=a.dataset.acc,o=e.querySelector(`[data-acc-body="${r}"]`),l=e.querySelector(`[data-acc-icon="${r}"]`);!o||!l||(o.classList.toggle("hidden"),l.classList.toggle("rotate-180"),window.lucide&&lucide.createIcons())}))}),e.querySelectorAll(".faq-q").forEach(a=>{a.dataset.bound||(a.dataset.bound="1",a.addEventListener("click",()=>{const r=a.querySelector("i, svg"),o=a.nextElementSibling;o&&(o.classList.toggle("hidden"),r&&r.classList.toggle("rotate-180"))}))});const t=e.querySelector("#faq-show-more");t&&!t.dataset.bound&&(t.dataset.bound="1",t.addEventListener("click",()=>{const a=e.querySelector(".faq-extra");if(!a)return;a.classList.toggle("hidden");const r=t.querySelector("i, svg");r&&r.classList.toggle("rotate-180"),t.innerHTML=a.classList.contains("hidden")?'Show more questions <i data-lucide="chevron-down" class="w-4 h-4"></i>':'Show fewer questions <i data-lucide="chevron-up" class="w-4 h-4"></i>',window.lucide&&lucide.createIcons()}))}function $e(e){if(!e)return"";const t=new Date(e);return!t.getTime()||isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Ca(e){if(typeof e.likes=="number"&&e.likes>0)return e.likes;const t=String(e.text||e.comment||e.created_at||e.name||"");let a=2166136261;for(let r=0;r<t.length;r++)a^=t.charCodeAt(r),a=Math.imul(a,16777619);return 2+(a>>>0)%140}function bt(e){return e>=1e3?(e/1e3).toFixed(1).replace(/\.0$/,"")+"k":String(e)}function Ba(e){return`
    <div class="flex gap-2.5 pl-0.5">
      <div class="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center text-[11px] font-black uppercase shadow-sm">${d(String(e.author||"Guest").trim().charAt(0).toUpperCase()||"G")}</div>
      <div class="min-w-0 flex-1 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span class="text-xs font-bold text-gray-900">${d(e.author||"Guest")}</span>
          <span class="text-[11px] text-gray-400">&middot; ${$e(e.created_at)}</span>
        </div>
        <p class="text-sm text-gray-700 mt-0.5 leading-relaxed break-words">${d(e.body||"")}</p>
      </div>
    </div>`}function Aa(e){const t=e.author_name||e.name||e.profiles?.full_name||"Anonymous",a=d(t.trim().charAt(0).toUpperCase()||"A"),r=e.handle?`<span class="text-xs font-semibold text-gray-400">${d(e.handle)}</span>`:"",o=$e(e.date||e.created_at),l=o?`<span class="text-xs text-gray-400">&middot; ${o}</span>`:"",n=e.location&&!e.handle?`<span class="text-xs text-gray-400">&middot; ${d(e.location)}</span>`:"",i=e.title?`<p class="text-sm font-bold text-gray-900 mt-1">${d(e.title)}</p>`:"",s=e.verified?'<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"><i data-lucide="badge-check" class="w-3 h-3"></i> Verified Purchase</span>':"",c=e.review_photo?`<div class="mt-2.5"><img src="${d(e.review_photo)}" alt="Customer photo" class="w-28 h-28 object-cover rounded-xl border border-gray-200" loading="lazy" onerror="this.style.display='none'"></div>`:"",b=e._key||"",y=N.likes.get(b)||0,h=Ca(e)+y,p=N.liked.has(b),g=N.comments.get(b)||[],v=(typeof e.replies=="number"&&e.replies>0?e.replies:0)+g.length,f=`
    <button type="button" class="review-like-btn btn-press inline-flex items-center gap-1.5 text-xs font-bold transition ${p?"text-[#fe2c55]":"text-gray-500 hover:text-[#fe2c55]"}" data-key="${b}">
      <i data-lucide="heart" class="w-4 h-4 ${p?"fill-[#fe2c55] text-[#fe2c55]":""}"></i> ${bt(h)}
    </button>`,$=`
    <button type="button" class="review-reply-toggle btn-press inline-flex items-center gap-1.5 text-xs font-bold transition ${O===b?"text-blue-600":"text-gray-500 hover:text-blue-500"}" data-key="${b}">
      <i data-lucide="message-circle" class="w-4 h-4"></i> ${v>0?`${bt(v)} replies`:"Reply"}
    </button>`;let w="";O===b&&(w=`
      <div class="review-reply-box mt-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3 space-y-2">
        <input type="text" class="review-reply-name w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Your name (optional)" maxlength="40" value="${d(ce||"")}">
        <textarea class="review-reply-body w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[74px] resize-y" placeholder="Write a comment..." maxlength="1000"></textarea>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="review-reply-cancel text-xs font-bold text-gray-500 hover:text-gray-700 px-3 py-2 transition">Cancel</button>
          <button type="button" data-key="${b}" class="review-reply-post btn-press inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm shadow-blue-500/20"><i data-lucide="send" class="w-3.5 h-3.5"></i> Comment</button>
        </div>
      </div>`);const C=g.length?`<div class="mt-2.5 space-y-2.5">${g.map(Ba).join("")}</div>`:"";return`
    <div class="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <button type="button" class="review-avatar shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-sm font-black uppercase shadow-sm transition hover:ring-2 hover:ring-blue-200" data-open-reviewer="${b}" title="View ${d(t)}'s profile">${a}</button>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <button type="button" data-open-reviewer="${b}" class="review-author text-sm font-bold text-gray-900 hover:text-blue-600 hover:underline transition">${d(t)}</button>${r}${l}${n}
          ${s}
        </div>
        <div class="flex gap-0.5 mt-1">${[1,2,3,4,5].map(x=>`<i data-lucide="star" class="w-3.5 h-3.5 ${x<=(e.rating||0)?"fill-amber-400 text-amber-400":"text-gray-300"}"></i>`).join("")}</div>
        ${i}
        <p class="text-[15px] text-gray-700 leading-relaxed mt-1.5">${d(e.text||e.comment||"")}</p>
        ${c}
        <div class="flex items-center gap-5 mt-2.5">
          ${f}
          ${$}
        </div>
        ${w}
        ${C}
      </div>
    </div>`}function Ae(e){return`
    <div id="reviews-section" class="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm mb-8">
      <div class="absolute inset-0" data-bg-slot="reviews"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-white/92 to-white/95"></div>
      <div class="relative p-4 sm:p-6 lg:p-8">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div class="flex items-center gap-3">
            <div class="shrink-0 w-11 h-11 rounded-2xl bg-amber-400/15 text-amber-500 flex items-center justify-center"><i data-lucide="message-square-star" class="w-5 h-5"></i></div>
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Customer Reviews</h3>
              <p class="text-xs text-gray-500 mt-0.5">All reviews are from verified buyers only.</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> 100% Verified Purchase Reviews</span>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6 mb-5">
          <div id="reviews-summary" class="mb-4"><div class="text-gray-400 text-sm py-3">Loading ratings…</div></div>
          <div id="reviews-breakdown"></div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6 mb-5">
          <div class="flex items-center justify-between gap-3 mb-2">
            <h4 class="text-sm font-black text-gray-900 uppercase tracking-wide">What Buyers Say</h4>
            <span class="text-xs text-gray-400">Newest first</span>
          </div>
          <div id="reviews-list"><div class="text-gray-400 text-sm py-4">Loading reviews…</div></div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6">
          <div id="review-form-wrapper">
            <h4 class="text-[15px] font-black text-gray-900 mb-0.5 flex items-center gap-2"><i data-lucide="pen-line" class="w-4 h-4 text-blue-500"></i> Write a Review</h4>
            <p class="text-xs text-gray-500 mb-3">Rate the product and share your experience — your review appears right at the top, newest first. No account needed.</p>
            <form id="review-form" class="space-y-3">
              <div class="flex items-center gap-2">
                <label class="text-xs text-gray-700 font-bold uppercase">Rating</label>
                <div id="star-rating" class="flex gap-1">
                  ${[1,2,3,4,5].map(t=>`<button type="button" data-rating="${t}" class="star-btn p-1"><i data-lucide="star" class="w-5 h-5 text-gray-300 hover:text-amber-400 transition"></i></button>`).join("")}
                </div>
              </div>
              <input id="review-name" type="text" maxlength="40" placeholder="Your name (optional)" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
              <textarea id="review-text" rows="3" placeholder="Share your experience with this product..." class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"></textarea>
              <div id="review-photo-row" class="flex items-center gap-3">
                <label for="review-photo-input" class="inline-flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition">
                  <i data-lucide="camera" class="w-4 h-4 text-blue-500"></i> Add a photo
                </label>
                <input id="review-photo-input" type="file" accept="image/*" class="hidden">
                <div id="review-photo-preview" class="flex items-center gap-2"></div>
              </div>
              <div class="flex items-center gap-3">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition">Submit Review</button>
                <div id="review-submit-msg" class="text-xs text-emerald-600 font-bold hidden"><i data-lucide="check-circle" class="w-3.5 h-3.5 inline"></i> Thank you! Your review is now live.</div>
                <div id="review-error-msg" class="text-xs text-red-600 font-bold hidden"><i data-lucide="alert-circle" class="w-3.5 h-3.5 inline"></i> <span></span></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>`}function ja(e,t,a){const r=Math.max(1,a);return`
    <div class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 items-center bg-gray-50 border border-gray-100 rounded-2xl p-4">
      ${[5,4,3,2,1].map(o=>{const l=t[o]||0,n=Math.round(l/r*100);return`
        <div class="flex items-center gap-1.5 text-xs text-gray-600 font-semibold"><i data-lucide="star" class="w-3 h-3 fill-amber-400 text-amber-400"></i>${o}</div>
        <div class="flex items-center gap-2">
          <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div class="h-full bg-amber-400 rounded-full" style="width:${n}%"></div></div>
          <span class="text-[11px] text-gray-400 w-9 text-right tabular-nums">${n}%</span>
        </div>`}).join("")}
    </div>`}function qa(){const t=new URLSearchParams(window.location.search).get("id");if(t)return t;const a=window.location.pathname.match(/^\/product\/([^/]+)\/?$/);if(a&&a[1])try{return decodeURIComponent(a[1])}catch{return a[1]}return null}const Q=[...wt];function ft(e){return Q.find(t=>t.property_id===e)||null}let Ge=null;function Ta(){return Ge||(Ge=Dt(()=>import("./motorhome-data-CupbOvk0.js").then(e=>e.c),[]).then(e=>{const t=e.PRODUCT_EXTRA_LISTINGS||[];for(const a of t)Q.some(r=>r.property_id===a.property_id)||Q.push(a);return Q}).catch(()=>Q)),Ge}function Ra(e){const t=document.getElementById("details-content"),a=Wt(e),o=Ee(e.images).map((s,c)=>`<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${c===0?"active border-blue-500":"border-gray-200"} shrink-0" data-img="${d(s)}">
      ${et(s)}
    </button>`).join(""),l=["Front View","Rear View","Left Side","Right Side","Interior Dashboard","Driver Seat","Cargo Area / Truck Bed","Engine","Wheels / Tires","Additional View"],n=[{icon:"building-2",label:"Brand",value:e.brand},{icon:"car",label:"Model",value:e.model},{icon:"calendar",label:"Model Year",value:e.model_year},{icon:"badge-check",label:"Condition",value:e.condition},{icon:"gauge",label:"Mileage",value:e.mileage},{icon:"cog",label:"Transmission",value:e.transmission},{icon:"fuel",label:"Fuel Type",value:e.fuel_type},{icon:"zap",label:"Engine",value:e.engine},{icon:"truck",label:"Drive Type",value:e.drive_type},{icon:"palette",label:"Colour",value:e.color},{icon:"package",label:"Payload Capacity",value:e.payload_capacity},{icon:"link",label:"Towing Capacity",value:e.towing_capacity},{icon:"barcode",label:"VIN",value:e.vin},{icon:"tag",label:"Stock Number",value:e.stock_number}].filter(s=>s.value!=null&&s.value!==""&&s.value!=="N/A");Me(e.features);const i=Ae();t.innerHTML=`
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Trucks</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${e.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6">
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-2"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> ${e.verification_status==="Verified"?"Verified listing":"Marketplace listing"}</span>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">${d(e.title)}</h1>
            <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-blue-500 font-mono font-bold">${d(e.stock_number||"—")}</span> &middot; VIN: <span class="text-gray-600 font-mono">${d(e.vin||"—")}</span></p>
          </div>
          <div class="text-right shrink-0">
            <div class="text-3xl font-black text-blue-600">${a}</div>
            <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-1">${d(e.condition||"Used")} &middot; For Sale</span>
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <div class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 hero-zoom flex items-center justify-center">
        ${tt(e)}
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${l[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${o}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="wishlist-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Add to Wishlist">
          <i data-lucide="heart" class="w-5 h-5"></i>
        </button>
        <button id="share-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      ${Te(e)}

      ${Re()}

      <!-- Smart Agent Buttons -->
      <div class="mb-8 pt-4 border-t border-gray-100" id="agent-buttons-block">${Se(e,{compact:!1})}</div>

      <!-- Description -->
      ${Ce(e,n,e.features,null,null)}

      ${i}

      ${je(e)}

      ${qe()}
    </div>
  `,at(t,l),document.getElementById("buy-now-btn").addEventListener("click",async()=>{await z()?window.location.href=`/checkout.html?id=${e.property_id}`:(me(`/checkout.html?id=${e.property_id}`),window.location.href=`/auth.html?redirect=${encodeURIComponent("/checkout.html?id="+e.property_id)}`)}),document.getElementById("share-btn").addEventListener("click",()=>{_e(e)}),Le(document.getElementById("agent-buttons-block"),()=>e),He(e),Ne(e),Pe(e),be(e),Be(),window.lucide&&lucide.createIcons()}function Na(e){const t=document.getElementById("details-content"),a=ke(e),o=Ee(e.images).map((s,c)=>`<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${c===0?"active border-blue-500":"border-gray-200"} shrink-0" data-img="${d(s)}">
      ${et(s)}
    </button>`).join(""),l=["Exterior Front","Exterior Side","Exterior Rear","Living Area","Kitchen","Bedroom","Bathroom","Additional View"],n=[{icon:"building-2",label:"Brand",value:e.brand},{icon:"car",label:"Model",value:e.model},{icon:"calendar",label:"Model Year",value:e.model_year},{icon:"badge-check",label:"Condition",value:e.condition},{icon:"gauge",label:"Mileage",value:e.mileage},{icon:"cog",label:"Transmission",value:e.transmission},{icon:"fuel",label:"Fuel Type",value:e.fuel_type},{icon:"zap",label:"Engine",value:e.engine},{icon:"bus",label:"Type",value:e.property_type},{icon:"truck",label:"Drive Type",value:e.drive_type},{icon:"palette",label:"Colour",value:e.color},{icon:"moon",label:"Sleeping Capacity",value:e.sleeping_capacity},{icon:"users",label:"Seating Capacity",value:e.seating_capacity},{icon:"shower-head",label:"Bathroom",value:e.bathroom},{icon:"utensils",label:"Kitchen",value:e.kitchen},{icon:"droplet",label:"Water Tank",value:e.water_tank},{icon:"barcode",label:"VIN",value:e.vin},{icon:"tag",label:"Stock Number",value:e.stock_number}].filter(s=>s.value!=null&&s.value!==""&&s.value!=="N/A");Me(e.features);const i=Ae();t.innerHTML=`
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Motorhomes</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${e.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6">
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-2"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> ${e.verification_status==="Verified"?"Verified listing":"Marketplace listing"}</span>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">${d(e.title)}</h1>
            <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-blue-500 font-mono font-bold">${d(e.stock_number||"—")}</span> &middot; VIN: <span class="text-gray-600 font-mono">${d(e.vin||"—")}</span></p>
          </div>
          <div class="text-right shrink-0">
            <div class="text-3xl font-black text-blue-600">${a}</div>
            <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-1">${d(e.condition||"Used")} &middot; For Sale</span>
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <div class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 hero-zoom flex items-center justify-center">
        ${tt(e)}
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${l[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${o}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="wishlist-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Add to Wishlist">
          <i data-lucide="heart" class="w-5 h-5"></i>
        </button>
        <button id="share-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      ${Te(e)}

      ${Re()}

      <!-- Smart Agent Buttons -->
      <div class="mb-8 pt-4 border-t border-gray-100" id="agent-buttons-block">${Se(e,{compact:!1})}</div>

      <!-- Description -->
      ${Ce(e,n,e.features,null,null)}

      ${i}

      ${je(e)}

      ${qe()}
    </div>
  `,at(t,l),document.getElementById("buy-now-btn").addEventListener("click",async()=>{await z()?window.location.href=`/checkout.html?id=${e.property_id}`:(me(`/checkout.html?id=${e.property_id}`),window.location.href=`/auth.html?redirect=${encodeURIComponent("/checkout.html?id="+e.property_id)}`)}),document.getElementById("share-btn").addEventListener("click",()=>{_e(e)}),Le(document.getElementById("agent-buttons-block"),()=>e),He(e),Ne(e),Pe(e),be(e),Be(),window.lucide&&lucide.createIcons()}function Ha(e){const t=document.getElementById("details-content"),a=ke(e),o=Ee(e.images).map((s,c)=>`<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${c===0?"active border-blue-500":"border-gray-200"} shrink-0" data-img="${d(s)}">
      ${et(s)}
    </button>`).join(""),l=["Front View","Rear View","Left Side","Right Side","Interior Dashboard","Driver Seat","Cabin / Interior","Wheels / Tires","Additional View"],n=[{icon:"building-2",label:"Brand",value:e.brand},{icon:"car",label:"Model",value:e.model},{icon:"calendar",label:"Model Year",value:e.model_year},{icon:"badge-check",label:"Condition",value:e.condition},{icon:"gauge",label:"Mileage",value:e.mileage},{icon:"cog",label:"Transmission",value:e.transmission},{icon:"fuel",label:"Fuel Type",value:e.fuel_type},{icon:"zap",label:"Engine",value:e.engine},{icon:"truck",label:"Drive Type",value:e.drive_type},{icon:"palette",label:"Colour",value:e.color},{icon:"barcode",label:"VIN",value:e.vin},{icon:"tag",label:"Stock Number",value:e.stock_number}].filter(s=>s.value!=null&&s.value!==""&&s.value!=="N/A");Me(e.features);const i=Ae();t.innerHTML=`
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Cars</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${e.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6">
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-2"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> ${e.verification_status==="Verified"?"Verified listing":"Marketplace listing"}</span>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">${d(e.title)}</h1>
            <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-blue-500 font-mono font-bold">${d(e.stock_number||"—")}</span> &middot; VIN: <span class="text-gray-600 font-mono">${d(e.vin||"—")}</span></p>
          </div>
          <div class="text-right shrink-0">
            <div class="text-3xl font-black text-blue-600">${a}</div>
            <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-1">${d(e.condition||"Used")} &middot; For Sale</span>
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <div class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 hero-zoom flex items-center justify-center">
        ${tt(e)}
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${l[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${o}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="wishlist-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Add to Wishlist">
          <i data-lucide="heart" class="w-5 h-5"></i>
        </button>
        <button id="share-btn" class="px-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      ${Te(e)}

      ${Re()}

      <!-- Smart Agent Buttons -->
      <div class="mb-8 pt-4 border-t border-gray-100" id="agent-buttons-block">${Se(e,{compact:!1})}</div>

      <!-- Description -->
      ${Ce(e,n,e.features,null,null)}

      ${i}

      ${je(e)}

      ${qe()}
    </div>
  `,at(t,l),document.getElementById("buy-now-btn").addEventListener("click",async()=>{await z()?window.location.href=`/checkout.html?id=${e.property_id}`:(me(`/checkout.html?id=${e.property_id}`),window.location.href=`/auth.html?redirect=${encodeURIComponent("/checkout.html?id="+e.property_id)}`)}),document.getElementById("share-btn").addEventListener("click",()=>{_e(e)}),Le(document.getElementById("agent-buttons-block"),()=>e),He(e),Ne(e),Pe(e),be(e),Be(),window.lucide&&lucide.createIcons()}function Pa(e){const t=e.listing_type==="property",a=t?"Share Property":"Share",r=`/contact.html?listing=${encodeURIComponent(e.property_id||"")}`,o=t?'<a href="#listing-map" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-700 font-bold py-3 rounded-xl transition text-sm"><i data-lucide="map-pin" class="w-5 h-5"></i> View Map</a>':"",l=t?`
    <button type="button" id="request-viewing-btn" class="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="eye" class="w-4 h-4"></i> Request Viewing
    </button>
    <button type="button" id="request-info-btn" class="flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="info" class="w-4 h-4"></i> Request More Information
    </button>
    <a href="${r}" class="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="badge-check" class="w-4 h-4"></i> Contact Us
      <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online</span>
    </a>
    <a href="${r}&subject=Message" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="message-circle" class="w-5 h-5"></i> Send Message
    </a>
  `:`
    <a href="${r}" class="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-bold py-3 rounded-xl transition text-sm">
      <i data-lucide="badge-check" class="w-4 h-4"></i> Contact Us
      <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online</span>
    </a>`;return`
    <div class="mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button type="button" id="buy-now-btn" class="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition text-sm uppercase tracking-wider">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button type="button" id="add-cart-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition text-sm">
          <i data-lucide="shopping-cart" class="w-5 h-5"></i> Add to Cart
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
        <button type="button" id="view-details-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition text-sm">
          <i data-lucide="eye" class="w-5 h-5"></i> View Details
        </button>
        <button type="button" id="wishlist-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-700 font-bold py-3 rounded-xl transition text-sm">
          <i data-lucide="heart" class="w-5 h-5"></i> Favorite
        </button>
        <button type="button" id="share-btn" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-700 font-bold py-3 rounded-xl transition text-sm">
          <i data-lucide="share-2" class="w-5 h-5"></i> ${a}
        </button>
        ${o}
      </div>
      ${t?`<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">${l}</div>`:""}
      <div class="mt-4 pt-4 border-t border-gray-100" id="agent-buttons-block">${Se(e,{compact:!1})}</div>
    </div>
  `}function je(e){const t=e.listing_type==="property",a=`/contact.html?listing=${encodeURIComponent(e.property_id||"")}`;return`
    <div class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <div class="shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
          <img src="/w-logo.svg" alt="Weverse Online Shop" class="w-full h-full object-contain" onerror="this.onerror=null;this.style.display='none'">
        </div>
        <div class="min-w-0">
          <p class="text-[15px] font-black text-gray-900 flex items-center gap-1.5">Weverse Online Shop <i data-lucide="badge-check" class="w-4 h-4 fill-blue-600 text-white"></i></p>
          <p class="text-xs text-gray-500">${t?"Professional agent for this listing":"Trusted marketplace seller"}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Secure Checkout</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full"><i data-lucide="truck" class="w-3.5 h-3.5"></i> Fast Worldwide Delivery</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1.5 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Authentic Listings</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full"><i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Easy Returns</span>
      </div>
      <div class="flex gap-2">
        <a href="${a}" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-sm text-center transition">Contact Seller</a>
        <a href="${a}&subject=Enquiry" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-sm text-center transition">Send Message</a>
      </div>
    </div>`}function qe(){return`
      <div id="similar-section" class="hidden mb-6">
        <h3 class="rel-title text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Similar Products</h3>
        <div class="rel-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
      </div>
      <div id="related-section" class="hidden mb-6">
        <h3 class="rel-title text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Related Products</h3>
        <div class="rel-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
      </div>
      <div id="recommended-section" class="hidden mb-6">
        <h3 class="rel-title text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Recommended For You</h3>
        <div class="rel-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
      </div>`}function Da(e){const t=e.listing_type==="property",a=pe(e),r=[];return r.push({icon:"badge-check",title:t?"Managed & promoted by":"Sold & shipped by",sub:"Weverse Online Shop"}),t?(r.push({icon:"shield-check",title:"Verified listing",sub:"Checked before publish"}),r.push({icon:"calendar-check",title:"Viewing available",sub:"In-person or live video"})):a?(r.push({icon:"shield-check",title:"Inspected & verified",sub:"Condition confirmed"}),r.push({icon:"truck",title:"Delivery arranged",sub:"Door-to-door options"})):(r.push({icon:"clock",title:"Ships in 24 hours",sub:"Free worldwide 3–7 days"}),r.push({icon:"package-search",title:"Tracked every step",sub:"DHL · FedEx · UPS · EMS"})),`
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
      ${r.map(o=>`
        <div class="flex items-center gap-3 bg-white/75 border border-gray-200 rounded-xl px-3.5 py-3 shadow-sm">
          <span class="shrink-0 w-9 h-9 rounded-full ${o.icon==="badge-check"?"bg-blue-50 text-blue-600":o.icon==="shield-check"?"bg-emerald-50 text-emerald-600":"bg-violet-50 text-violet-600"} flex items-center justify-center"><i data-lucide="${o.icon}" class="w-4 h-4"></i></span>
          <div class="min-w-0">
            <p class="text-xs font-black text-gray-900 leading-tight">${o.title}</p>
            <p class="text-[11px] text-gray-500 leading-tight">${o.sub}</p>
          </div>
        </div>`).join("")}
    </div>`}function Va(){return`
    <div class="mt-5">
      <p class="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-gray-500 mb-3"><i data-lucide="route" class="w-3.5 h-3.5 text-blue-500"></i> From order to your door</p>
      <div class="relative flex justify-between">
        <span class="absolute top-[17px] left-[6%] right-[6%] h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-sky-300 rounded-full" aria-hidden="true"></span>
        ${[{icon:"receipt-text",label:"Ordered"},{icon:"package",label:"Shipped"},{icon:"truck",label:"On the way"},{icon:"home",label:"Delivered"}].map(t=>`
          <div class="flex flex-col items-center gap-1.5 relative z-10">
            <span class="w-9 h-9 rounded-full bg-white text-blue-600 border-2 border-blue-500 flex items-center justify-center shadow-sm"><i data-lucide="${t.icon}" class="w-4 h-4"></i></span>
            <span class="text-[10px] sm:text-[11px] font-bold text-gray-700 text-center whitespace-nowrap">${t.label}</span>
          </div>`).join("")}
      </div>
    </div>`}function Fa(){return`
    <div class="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      ${[{icon:"lock",label:"SSL Secure",sub:"Encrypted checkout"},{icon:"shield-check",label:"Buyer Protection",sub:"Payment protected"},{icon:"rotate-ccw",label:"14-day Returns",sub:"Easy & refundable"},{icon:"headphones",label:"24/7 Support",sub:"Real humans"}].map(e=>`
        <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
          <span class="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><i data-lucide="${e.icon}" class="w-4 h-4"></i></span>
          <div class="min-w-0">
            <p class="text-[11px] font-black text-gray-900 leading-tight">${e.label}</p>
            <p class="text-[10px] text-gray-500 leading-tight">${e.sub}</p>
          </div>
        </div>`).join("")}
    </div>`}function Te(e){return`
    <div class="mb-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div class="px-5 sm:px-6 py-5 sm:py-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 class="flex items-center gap-2 text-sm font-black text-gray-900 uppercase tracking-wide"><i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i> Buy with confidence</h3>
          <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"><i data-lucide="badge-check" class="w-3 h-3"></i> Verified marketplace</span>
        </div>
        ${Da(e)}
        ${Va()}
        ${Fa()}
        <p class="mt-4 text-[11px] text-gray-400 leading-relaxed">Every <strong class="text-gray-500">Weverse Online Shop</strong> order is packed with care, tracked in real time, and covered by buyer protection. Questions? Our USA, Europe &amp; UK support team is online 24/7 and replies fast.</p>
      </div>
    </div>`}function Re(){return`
    <div id="hot-now-section" class="hidden mb-8">
      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-4">
        <div class="absolute inset-0" style="background:
          radial-gradient(700px 260px at 88% -40%, rgba(59,130,246,.18), transparent 60%),
          radial-gradient(560px 240px at 0% 130%, rgba(16,185,129,.14), transparent 55%),
          linear-gradient(120deg,#eef6ff 0%,#ffffff 55%,#ebfdf7 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700"><i data-lucide="flame" class="w-3.5 h-3.5 kco-blink-soft text-orange-500"></i> Hot right now</p>
            <h3 class="text-lg sm:text-xl font-black text-gray-900 tracking-tight mt-1">This week's most-wanted products</h3>
            <p class="text-sm text-gray-500 mt-0.5">Real customer favorites across the USA, Europe &amp; the UK — in stock and ready to ship.</p>
          </div>
          <a href="/#showroom-directory" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition shadow-md shadow-blue-600/20">See all products <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
        </div>
      </div>
      <div class="hot-grid flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"></div>
    </div>`}async function Ne(e){try{const t=document.getElementById("hot-now-section"),a=t&&t.querySelector(".hot-grid");if(!t||!a)return;const o=[...Ct(e)].sort((n,i)=>(Number(i.favorite_count)||0)+(Number(i.sold_count)||0)*2+(Number(i.rating)||0)*10-((Number(n.favorite_count)||0)+(Number(n.sold_count)||0)*2+(Number(n.rating)||0)*10)).slice(0,10);if(!o.length)return;t.classList.remove("hidden"),a.innerHTML="";const l=document.createDocumentFragment();o.forEach(n=>{const i=document.createElement("div");i.className="shrink-0 w-[220px] sm:w-[280px] snap-start relative";const s=kt(n);s.style.width="100%",i.appendChild(s);const c=document.createElement("span");c.className="kco-live-dot absolute top-2.5 left-2.5 z-10 w-2.5 h-2.5 ring-2 ring-white/80",c.setAttribute("aria-hidden","true"),c.title="Available now",i.appendChild(c),l.appendChild(i)}),a.appendChild(l),window.lucide&&lucide.createIcons()}catch{}}function Ct(e){const t=new Map,a=r=>(r||[]).forEach(o=>{o&&o.property_id&&t.set(o.property_id,o)});return a(Ft),a(Gt),a(Yt),a(Jt),a(Xt),a(aa),a(wt),a(Q),a(Vt()),Ot(e.category||e.subcategory),[...t.values()].filter(r=>r.property_id!==e.property_id)}function Ua(e,t){let a=0;const r=c=>String(c||"").trim().toLowerCase();e.listing_type&&e.listing_type===t.listing_type&&(a+=40),e.category&&r(e.category)===r(t.category)&&(a+=30),e.subcategory&&r(e.subcategory)===r(t.subcategory)&&(a+=20),e.brand&&r(e.brand)===r(t.brand)&&(a+=15),e.breed&&r(e.breed)===r(t.breed)&&(a+=15),e.model&&r(e.model)===r(t.model)&&(a+=10),e.property_type&&r(e.property_type)===r(t.property_type)&&(a+=15);const o=parseFloat(e.price)||0,l=parseFloat(t.price)||0;if(o>0&&l>0){const c=Math.min(o,l)/Math.max(o,l);c>=.8?a+=10:c>=.6?a+=6:c>=.4&&(a+=3)}e.country_code&&e.country_code===t.country_code&&(a+=5);const n=new Set(r(e.title).split(/[^a-z0-9]+/).filter(c=>c.length>2)),i=new Set(r(t.title).split(/[^a-z0-9]+/).filter(c=>c.length>2));let s=0;return n.forEach(c=>{i.has(c)&&s++}),a+=Math.min(s*2,10),a}function Ye(e,t){const a=document.getElementById(e);if(!a)return;const r=a.querySelector(".rel-grid");if(!r)return;if(!t.length){a.classList.add("hidden");return}a.classList.remove("hidden"),r.innerHTML="";const o=document.createDocumentFragment();t.slice(0,10).forEach(l=>{const n=document.createElement("div");n.className="shrink-0 w-[260px] sm:w-[320px] snap-start relative";const i=kt(l);i.style.width="100%",n.appendChild(i);const s=document.createElement("span");s.className="kco-live-dot absolute top-2.5 left-2.5 z-10 w-2.5 h-2.5 ring-2 ring-white/80",s.setAttribute("aria-hidden","true"),s.title="Available now",n.appendChild(s),o.appendChild(n)}),r.appendChild(o),window.lucide&&lucide.createIcons()}function He(e){const t=Ct(e),a=t.map(s=>({item:s,score:Ua(e,s)})).sort((s,c)=>c.score-s.score||(c.item.rating||0)-(s.item.rating||0)),r=a.filter(s=>s.score>=35).map(s=>s.item),o=new Set(r.map(s=>s.property_id)),l=a.filter(s=>s.score>=15&&s.score<35&&!o.has(s.item.property_id)).map(s=>s.item),n=[...t].filter(s=>!o.has(s.property_id)).sort((s,c)=>(c.rating||0)-(s.rating||0)).slice(0,10),i=a.filter(s=>!o.has(s.item.property_id)).map(s=>s.item);Ye("similar-section",r.length?r:i.slice(0,10)),Ye("related-section",l.length?l:i.slice(0,10)),Ye("recommended-section",n.length?n:i.slice(0,10))}function Oa(e){const t=document.getElementById("details-content"),a=e.listing_type==="property",r=pe(e),o=ke(e),l=st(e.country_code),n=e.listing_type==="product"?"Product ID":a?"Property ID":"Listing ID";let i="",s="",c=parseFloat(e.real_price);if((!Number.isFinite(c)||c<=0)&&(c=parseFloat(e.compare_at_price??e.original_price)),Number.isFinite(c)&&c>0&&c>parseFloat(e.price)){const m=Math.round((1-parseFloat(e.price)/c)*100);i=`<span class="text-lg text-gray-400 price-strike line-through font-medium">${ke({...e,price:c})}</span>`,s=`<span class="kco-sale-pulse kco-glow inline-flex items-center gap-1 text-xs font-black text-white bg-red-500 px-2.5 py-1 rounded-full relative overflow-hidden">-${m}% OFF<span class="absolute inset-0 kco-shimmer pointer-events-none"></span></span>`}const b=e.availability_status||(e.listing_type==="product"?"In Stock":"Available"),y=Ee(e.images),h=[e.video,e.video_url].find(m=>m&&typeof m=="string"&&P(m)),p=[...y];h&&!p.includes(h)&&p.unshift(h);const g=p.findIndex(m=>P(m)),v=p.findIndex(m=>!P(m)),f=g>=0?g:v>=0?v:0,$=p[f],w=P($),C=(g>=0?[]:p).map((m,E)=>{const S=P(m)?`<video src="${d(m)}" muted preload="auto" playsinline class="w-20 h-16 object-cover"></video>
         <div class="absolute inset-0 flex items-center justify-center"><div class="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center"><svg class="w-2.5 h-2.5 text-gray-800 ml-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>`:'<div class="w-20 h-16 flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-5 h-5 text-gray-300"></i></div>';return`<button class="gallery-thumb relative rounded-lg overflow-hidden border-2 ${E===f?"active border-blue-500":"border-gray-200"} shrink-0" data-img="${d(m)}">
      ${S}
    </button>`}).join("");let x="";if(a){const m=[{icon:"globe",label:"Country",value:D(`${l} ${e.country}`,[e.country])},{icon:"map-pin",label:"State / Province",value:D(e.state,[e.state,e.country])},{icon:"building",label:"City",value:D(e.city,[e.city,e.state,e.country])},{icon:"navigation",label:"Town / Local Area",value:D(e.town,[e.town,e.city,e.state,e.country])},{icon:"signpost",label:"Neighborhood / District",value:D(u(e,"neighborhood"),[u(e,"neighborhood"),e.city,e.state,e.country])},{icon:"home",label:"Address",value:D(u(e,"address"),[u(e,"address"),e.city,e.state,e.country])}].filter(E=>E.value);x=`
      <div class="mt-4">
        ${ee("map-pin","Location","rose")}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${m.map(E=>`
            <div class="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
              <div class="p-2.5 bg-white border border-gray-100 rounded-lg"><i data-lucide="${E.icon}" class="w-4 h-4 text-blue-500"></i></div>
              <div class="min-w-0"><div class="text-gray-500 text-xs">${E.label}</div><div class="mt-0.5">${E.value}</div></div>
            </div>
          `).join("")}
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-200" style="height:280px"></div>
      </div>`}else if(r){const E=[u(e,"location"),u(e,"city"),u(e,"state"),u(e,"country")].map(A=>A==null?"":String(A).trim()).filter(Boolean).join(", ");if(E){const A=ot(E);x=`
      <div class="mt-4">
        ${ee("map-pin","Location","rose")}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="sm:col-span-2 flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <div class="p-2.5 bg-white border border-gray-100 rounded-lg"><i data-lucide="map-pin" class="w-4 h-4 text-blue-500"></i></div>
            <div class="min-w-0"><div class="text-gray-500 text-xs">Vehicle Location</div><div class="mt-0.5">${D(E,[E])}</div></div>
          </div>
          ${A?`<div class="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <div class="p-2.5 bg-white border border-gray-100 rounded-lg"><i data-lucide="navigation" class="w-4 h-4 text-blue-500"></i></div>
            <div><div class="text-gray-500 text-xs">View on Map</div><a href="${A}" target="_blank" rel="noopener" class="text-blue-600 font-bold text-sm hover:underline">Google Maps <i data-lucide="external-link" class="w-3.5 h-3.5 inline"></i></a></div>
          </div>`:""}
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-200" style="height:280px"></div>
      </div>`}}let I=[];a?(I=[{icon:"bed-double",label:"Bedrooms",value:e.bedrooms},{icon:"bath",label:"Bathrooms",value:e.bathrooms},{icon:"droplets",label:"Half Bathrooms",value:e.half_bathrooms},{icon:"building",label:"Building / Living Size",value:e.building_size},{icon:"ruler",label:"Land / Lot Size",value:e.land_size},{icon:"layers",label:"Floors / Levels",value:e.floors},{icon:"car-front",label:"Parking Spaces",value:e.parking_spaces},{icon:"warehouse",label:"Garage",value:e.garage},{icon:"home",label:"Property Type",value:e.property_type},{icon:"sofa",label:"Furnished",value:e.furnished},{icon:"badge-check",label:"Condition",value:e.condition},{icon:"calendar",label:"Year Built",value:e.year_built},{icon:"paintbrush",label:"Year Renovated",value:e.year_renovated},{icon:"mail",label:"ZIP / Postal Code",value:e.zip_code},{icon:"tag",label:"Status",value:e.listing_status==="rent"?"For Rent":"For Sale"},{icon:"signpost",label:"Neighborhood",html:D(u(e,"neighborhood"),[u(e,"neighborhood"),e.city,e.state,e.country])},{icon:"sofa",label:"Living Areas",value:u(e,"living_areas")},{icon:"flame",label:"Kitchens",value:u(e,"kitchens")},{icon:"tree-pine",label:"Balconies",value:u(e,"balconies")},{icon:"leaf",label:"Garden / Yard",value:u(e,"garden")},{icon:"waves",label:"Pool",value:u(e,"pool")},{icon:"lock",label:"Security",value:u(e,"security")},{icon:"home",label:"Utilities & Heating",value:u(e,"utilities")},{icon:"hammer",label:"Construction Type",value:u(e,"construction_type")},{icon:"clipboard-check",label:"Construction Status",value:u(e,"construction_status")},{icon:"user-check",label:"Ownership Type",value:u(e,"ownership_type")}].filter(m=>m.html||m.value!=null&&m.value!==""),ne("Property Information","home",I)):e.category==="Motorhomes"?(I=[{icon:"factory",label:"Brand",value:e.brand},{icon:"car",label:"Model",value:e.model},{icon:"calendar",label:"Year",value:e.model_year},{icon:"badge-check",label:"Condition",value:e.condition},{icon:"gauge",label:"Mileage",value:e.mileage},{icon:"cog",label:"Transmission",value:e.transmission},{icon:"fuel",label:"Fuel Type",value:e.fuel_type},{icon:"zap",label:"Engine",value:e.engine},{icon:"bus",label:"Type",value:e.property_type},{icon:"moon",label:"Sleeping Capacity",value:e.sleeping_capacity},{icon:"users",label:"Seating Capacity",value:e.seating_capacity},{icon:"shower-head",label:"Bathroom",value:e.bathroom},{icon:"utensils",label:"Kitchen",value:e.kitchen},{icon:"droplet",label:"Water Tank",value:e.water_tank}].filter(m=>m.html||m.value!=null&&m.value!==""),ne("Vehicle Information","bus",I,"violet")):r?(I=[{icon:"tag",label:"Title / Listing",value:e.title},{icon:"car-front",label:"Vehicle / Body Type",value:u(e,"body_type")},{icon:"factory",label:"Make / Brand",value:u(e,"make")||e.brand},{icon:"car",label:"Model",value:u(e,"model")},{icon:"badge-award",label:"Trim / Edition",value:u(e,"trim")},{icon:"calendar",label:"Year",value:u(e,"model_year")},{icon:"gauge",label:"Mileage",value:u(e,"mileage")},{icon:"zap",label:"Engine",value:u(e,"engine")},{icon:"gauge",label:"Horsepower",value:u(e,"horsepower")},{icon:"cog",label:"Transmission",value:u(e,"transmission")},{icon:"route",label:"Drive Type",value:u(e,"drive_type")},{icon:"fuel",label:"Fuel Type",value:u(e,"fuel_type")},{icon:"fuel",label:"Fuel Economy",value:u(e,"fuel_economy")},{icon:"users",label:"Seating Capacity",value:u(e,"seating_capacity")},{icon:"door-open",label:"Doors",value:u(e,"doors")},{icon:"palette",label:"Color / Exterior",value:u(e,"color")},{icon:"fingerprint",label:"VIN",value:u(e,"vin")},{icon:"badge-check",label:"Condition",value:u(e,"condition")},{icon:"wrench",label:"Warranty",value:u(e,"warranty")}].filter(m=>m.html||m.value!=null&&m.value!==""),ne("Vehicle Specifications","car-front",I,"violet")):e.listing_type==="product"?(I=[{icon:"factory",label:"Brand",value:e.brand},{icon:"tag",label:"Subcategory",value:e.subcategory},{icon:"palette",label:"Colour",value:e.color},{icon:"ruler",label:"Size",value:e.size},{icon:"layers",label:"Material",value:e.material},{icon:"badge-check",label:"Condition",value:e.condition||"New"},{icon:"shield-check",label:"Warranty",value:e.warranty},{icon:"package-check",label:"Availability",value:e.availability_status}].filter(m=>m.html||m.value!=null&&m.value!==""),ne("Product Information","package",I)):e.listing_type==="pet"&&(I=[{icon:"paw-print",label:"Breed",value:e.breed},{icon:"calendar",label:"Age",value:e.age},{icon:"users",label:"Gender",value:e.gender},{icon:"palette",label:"Colour",value:e.color},{icon:"scale",label:"Weight",value:e.size},{icon:"globe",label:"Origin",html:D(`${st(e.country_code)} ${e.country}`,[e.country])},{icon:"badge-check",label:"Health",value:e.condition}].filter(m=>m.html||m.value!=null&&m.value!==""),ne("Pet Information","paw-print",I,"amber")),Me(e.features),fa(e.highlights);const V=Ae(),T=[];if(Number(e.rating)>0){const m=Math.max(0,Math.round(Number(e.rating_count)||0));T.push(`<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700"><span class="flex">${Lt(e.rating,"w-4 h-4")}</span><span>${Number(e.rating).toFixed(1)}${m?` (${m} rated)`:""}</span></span>`)}Math.round(Number(e.review_count)||0)>0&&T.push(`<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700"><i data-lucide="message-square" class="w-4 h-4 text-blue-500"></i>${Math.round(Number(e.review_count))} reviews</span>`),Math.round(Number(e.favorite_count)||0)>0&&T.push(`<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700"><i data-lucide="heart" class="w-4 h-4 text-rose-500"></i>${Math.round(Number(e.favorite_count))} saved</span>`);const te=Math.round(Number(e.sold_count)||Number(e.review_count)||0);te>0&&T.push(`<span class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700"><i data-lucide="shopping-bag" class="w-4 h-4"></i>${te}+ shopped</span>`);const De=T.length?`<div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-gray-100">${T.join("")}</div>`:"",k=parseInt(e.stock_quantity,10);let H="";Number.isFinite(k)&&k>0&&k<=5?H=`<span class="kco-hurry inline-flex items-center gap-1.5 text-xs font-black text-amber-800 bg-amber-50 border-2 border-amber-300 px-2.5 py-1 rounded-full"><i data-lucide="flame" class="w-3.5 h-3.5 kco-blink-soft text-amber-500"></i> Hurry! Only ${k} left in stock</span>`:Number.isFinite(k)&&k>5&&(H=`<span class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full"><i data-lucide="layers" class="w-3.5 h-3.5"></i> ${k} in stock</span>`);let fe="";s&&(fe=`
      <div class="mt-3 kco-glow relative overflow-hidden rounded-xl bg-white border border-blue-200 p-0">
        <div class="flex items-center gap-3 px-3 py-2">
          <span class="kco-live-dot shrink-0" aria-hidden="true"></span>
          <span class="text-xs font-black text-gray-900 uppercase tracking-wide">Live deal</span>
          <span class="text-xs font-black text-red-500 kco-blink-soft">Save ${Math.round((1-parseFloat(e.price)/c)*100)}%</span>
          <span class="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700"><i data-lucide="tag" class="w-3 h-3"></i> Limited-time price</span>
        </div>
      </div>`),t.innerHTML=`
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>${e.category}</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-700 truncate">${d(e.title)}</span>
      </div>

      <div class="mb-5">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">${d(e.title)}</h1>
        <div class="flex flex-wrap items-center gap-2 mt-2.5">
          ${a?e.verification_status==="Verified"?'<span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified</span>':e.verification_status==="Pending verification"?'<span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full"><i data-lucide="clock" class="w-3.5 h-3.5"></i> Pending Verification</span>':'<span class="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full"><i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Not Verified</span>':'<span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified</span>'}
          <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full"><i data-lucide="box" class="w-3.5 h-3.5"></i> ${n}: <span class="font-mono">${d(e.property_id)}</span></span>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">${e.listing_status==="rent"?"For Rent":"For Sale"}</span>
          ${g>=0?'<span class="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full"><i data-lucide="video" class="w-3.5 h-3.5"></i> Video Tour</span>':""}
        </div>
        ${De}
      </div>

      <div class="relative overflow-hidden rounded-2xl border border-blue-100 mb-6 shadow-sm">
        <div class="absolute inset-0" style="background:
          radial-gradient(760px 300px at 92% -20%, rgba(59,130,246,.16), transparent 60%),
          radial-gradient(600px 260px at 0% 115%, rgba(16,185,129,.12), transparent 55%),
          linear-gradient(180deg,#ffffff 0%,#f7fbff 100%)"></div>
        <div class="absolute top-0 inset-x-0 h-1.5" style="background:linear-gradient(90deg,#2563eb,#0ea5e9,#10b981)" aria-hidden="true"></div>
        <div class="relative flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
        <div>
          <div class="flex items-baseline flex-wrap gap-2">
            ${i}
            <span class="text-4xl font-black text-blue-600">${o}</span>
          </div>
          <div class="flex items-center gap-2 mt-1.5">
            ${s}
            <span class="text-sm text-emerald-600 font-bold flex items-center gap-1"><i data-lucide="package-check" class="w-4 h-4"></i> ${b}</span>
          </div>
          ${H?`<div class="flex items-center gap-2 mt-1.5">${H}</div>`:""}
          ${fe}
        </div>
        <div class="flex flex-col gap-1.5 text-sm">
          <span class="inline-flex items-center gap-1.5 text-gray-600"><i data-lucide="truck" class="w-4 h-4 text-blue-500"></i> Free worldwide shipping</span>
          <span class="inline-flex items-center gap-1.5 text-gray-600"><i data-lucide="rotate-ccw" class="w-4 h-4 text-blue-500"></i> Easy returns within 14 days</span>
          <span class="inline-flex items-center gap-1.5 text-gray-600"><i data-lucide="lock" class="w-4 h-4 text-blue-500"></i> Secure payment protection</span>
        </div>
        </div>
      </div>

      <div id="hero-wrap" class="relative w-full h-[46vh] sm:h-[60vh] lg:h-[72vh] rounded-2xl overflow-hidden bg-gray-100 mb-3 cursor-zoom-in group flex items-center justify-center" role="button" tabindex="0" aria-label="Open image gallery">
        ${w?`<video id="hero-image" src="${d($)}"  autoplay muted loop playsinline preload="metadata" controls class="w-full h-full object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"></video>
             <div class="absolute inset-0 flex items-center justify-center pointer-events-none" style="display:flex"><div class="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-lg"><svg class="w-7 h-7 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>`:'<div id="hero-image" class="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400">No video</div>'}
        <div class="absolute inset-0 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/50 backdrop-blur px-3 py-1.5 rounded-full"><i data-lucide="expand" class="w-3.5 h-3.5"></i> Tap to enlarge</span>
        </div>
        ${g>=0?`
        <button type="button" id="hero-video-tour-btn" class="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white pl-2 pr-3 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue-600/40 transition cursor-pointer">
          <span class="w-6 h-6 rounded-full bg-white flex items-center justify-center"><svg class="w-3.5 h-3.5 text-blue-700 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
          Watch Video Tour
        </button>`:""}
      </div>

      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${C}
      </div>

      ${Pa(e)}

      ${Te(e)}

      ${Re()}

      <div id="listing-details">
        ${Ce(e,I,e.features,e.highlights,x,a?va(e):r?Sa(e):"")}
      </div>

      ${V}

      ${a?je(e):r?_a(e):""}

      <div id="recommendations-section" class="hidden">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">You May Also Like</h3>
        <div id="recommendations-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"></div>
      </div>

      ${qe()}
    </div>
  `;const K=document.getElementById("hero-image"),J=document.getElementById("hero-wrap");if(K&&K.tagName==="VIDEO"&&ma(K,$),J){const m=g>=0?p.filter(S=>P(S)):p,E=()=>yt(e,m),A=document.getElementById("hero-video-tour-btn");A&&A.addEventListener("click",S=>{S.stopPropagation(),yt(e,p,{startIdx:g,autoplay:!0})}),J.addEventListener("click",S=>{const R=document.getElementById("hero-image");if(R&&R.tagName==="VIDEO"){const M=R.getBoundingClientRect();if(M.width>0&&S.clientX>=M.left&&S.clientX<=M.right&&S.clientY>=M.top&&S.clientY<=M.bottom){if(R.paused&&R.readyState>=2){R.play().catch(()=>{});return}return R.paused,void 0}}E()}),J.addEventListener("keydown",S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),E())})}t.querySelectorAll(".gallery-thumb").forEach(m=>{m.addEventListener("click",()=>{t.querySelectorAll(".gallery-thumb").forEach(_=>_.classList.remove("active","border-blue-500")),t.querySelectorAll(".gallery-thumb").forEach(_=>_.classList.add("border-gray-200")),m.classList.add("active","border-blue-500"),m.classList.remove("border-gray-200");const E=m.dataset.img,A=P(E),S=document.getElementById("hero-wrap");if(!S)return;const R=S.querySelector(".hero-video-overlay");R&&R.remove();const M=document.getElementById("hero-image");if(A)if(M&&M.tagName==="VIDEO")M.src=E;else{const _=document.createElement("video");_.id="hero-image",_.src=E,_.muted=!0,_.loop=!0,_.autoplay=!0,_.preload="metadata",_.playsInline=!0,_.controls=!0,_.className="w-full h-full object-contain",S.insertBefore(_,S.firstChild),M&&M.remove&&M.remove();const j=document.createElement("div");j.className="hero-video-overlay absolute inset-0 flex items-center justify-center pointer-events-none",j.innerHTML='<div class="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-lg"><svg class="w-7 h-7 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>',S.insertBefore(j,S.firstChild?.nextSibling)}else{const _=document.createElement("div");_.id="hero-image",_.className="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400",_.textContent="No video",S.insertBefore(_,S.firstChild),M&&M.remove&&M.remove()}})}),document.getElementById("buy-now-btn").addEventListener("click",async()=>{await z()?window.location.href=`/checkout.html?id=${e.property_id}`:(me(`/checkout.html?id=${e.property_id}`),window.location.href=`/auth.html?redirect=${encodeURIComponent("/checkout.html?id="+e.property_id)}`)}),document.getElementById("share-btn").addEventListener("click",()=>{_e(e)});const ae=document.getElementById("request-viewing-btn");ae&&ae.addEventListener("click",()=>ht(e,"viewing"));const re=document.getElementById("request-info-btn");re&&re.addEventListener("click",()=>ht(e,"info"));const oe=document.getElementById("view-details-btn");oe&&oe.addEventListener("click",()=>{const m=document.getElementById("listing-details");m&&m.scrollIntoView({behavior:"smooth",block:"start"})});const X=document.getElementById("add-cart-btn");X&&X.addEventListener("click",()=>{Qt(e.property_id,1),X.innerHTML='<i data-lucide="check" class="w-5 h-5"></i> Added to Cart',window.lucide&&lucide.createIcons(),setTimeout(()=>{X.innerHTML='<i data-lucide="shopping-cart" class="w-5 h-5"></i> Add to Cart',window.lucide&&lucide.createIcons()},2e3)}),Wa(e),Le(document.getElementById("agent-buttons-block"),()=>e),Pe(e),be(e),Za(e),Ne(e),Be(),window.lucide&&lucide.createIcons(),e.property_id,e.title,parseFloat(e.price),e.currency;const ye=document.getElementById("listing-map");if(ye&&window.L){const m=parseFloat(e.latitude)||null,E=parseFloat(e.longitude)||null,A=wa(e),S=A||e.title,R=A?"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(A):"",M=(j,se,Ve)=>{const he=L.map(ye).setView([j,se],Ve);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(he),L.marker([j,se]).addTo(he).bindPopup(`<strong>${d(e.title)}</strong><br>${d(S)}`).openPopup()},_=()=>{ye.innerHTML=`<div class="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50 text-center p-4">
        <i data-lucide="map-pin" class="w-6 h-6 text-gray-400"></i>
        <p class="text-xs text-gray-500">Exact map position not available for this location.</p>
        <a href="${R}" target="_blank" rel="noopener" class="text-xs font-bold text-blue-600 hover:underline">Open location in Google Maps</a>
      </div>`,window.lucide&&lucide.createIcons()};m&&E?M(m,E,13):A?fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(A)).then(j=>j.json()).then(j=>{j&&j[0]?M(parseFloat(j[0].lat),parseFloat(j[0].lon),12):_()}).catch(_):_()}}function yt(e,t,a){const r=(Array.isArray(t)&&t.length?t:[e.video||e.video_url||e.images?.[0]||""]).filter(Boolean);if(!r.length)return;let l=a&&Number.isInteger(a.startIdx)&&a.startIdx>=0&&a.startIdx<r.length?a.startIdx:0,n=!!(a&&a.autoplay);const i=document.createElement("div");i.id="gallery-lightbox",i.className="fixed inset-0 z-[500] bg-black/95 flex flex-col",i.innerHTML=`
    <style>
      #gallery-lightbox .lb-media{transition:opacity .18s ease}
      #gallery-lightbox .lb-media.lb-fade{opacity:0}
    </style>
    <div class="flex items-center justify-between px-4 py-3 text-white">
      <span class="text-xs font-bold text-gray-300 truncate">${d(e.title)}</span>
      <button type="button" id="lb-close" class="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white" aria-label="Close">✕</button>
    </div>
    <div id="lb-viewport" class="relative flex-1 flex items-center justify-center overflow-hidden select-none">
      <div id="lb-media-container" class="max-w-full max-h-full px-4 flex items-center justify-center"></div>
      <button type="button" id="lb-prev" class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl" aria-label="Previous">‹</button>
      <button type="button" id="lb-next" class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl" aria-label="Next">›</button>
    </div>
    <div class="px-4 py-3 flex items-center justify-between gap-3 text-white">
      <span id="lb-count" class="shrink-0 text-xs font-bold text-gray-300"></span>
      <div id="lb-thumbs" class="flex gap-1.5 overflow-x-auto scrollbar-none justify-end"></div>
    </div>
  `,document.body.appendChild(i),document.body.style.overflow="hidden";const s=i.querySelector("#lb-media-container"),c=i.querySelector("#lb-count"),b=i.querySelector("#lb-thumbs");let y=null;const h=()=>{s.classList.add("lb-fade"),setTimeout(()=>{const w=r[l],C=n;n=!1,P(w)?s.innerHTML=`<video src="${d(w)}" ${C?"autoplay ":""}controls playsinline preload="auto" class="lb-media max-w-full max-h-[70vh] object-contain rounded-lg"></video>`:s.innerHTML='<div class="lb-media max-w-full max-h-[70vh] flex items-center justify-center text-gray-500 text-sm">No video</div>',s.classList.remove("lb-fade"),c.textContent=`${l+1} / ${r.length}`,b.innerHTML=r.map((x,I)=>{const T=P(x)?'<div class="w-full h-full flex items-center justify-center bg-gray-800"><svg class="w-3 h-3 text-white ml-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>':'<div class="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600"><i data-lucide="video-off" class="w-3 h-3"></i></div>';return`<button type="button" data-i="${I}" class="relative w-12 h-9 rounded-lg overflow-hidden border-2 ${I===l?"border-blue-500":"border-transparent"}" aria-label="Item ${I+1}">${T}</button>`}).join(""),b.querySelectorAll("[data-i]").forEach(x=>x.addEventListener("click",()=>{l=parseInt(x.dataset.i,10),h()}))},90)},p=()=>{l=(l-1+r.length)%r.length,h()},g=()=>{l=(l+1)%r.length,h()},v=()=>{i.remove(),document.body.style.overflow="",document.removeEventListener("keydown",f)},f=w=>{w.key==="Escape"?v():w.key==="ArrowLeft"?p():w.key==="ArrowRight"&&g()};i.querySelector("#lb-close").addEventListener("click",v),i.querySelector("#lb-prev").addEventListener("click",p),i.querySelector("#lb-next").addEventListener("click",g);const $=i.querySelector("#lb-viewport");$.addEventListener("touchstart",w=>{y=w.touches[0].clientX},{passive:!0}),$.addEventListener("touchend",w=>{if(y==null)return;const C=w.changedTouches[0].clientX-y;Math.abs(C)>40&&(C<0?g():p()),y=null},{passive:!0}),$.addEventListener("click",w=>{w.target===$&&v()}),document.addEventListener("keydown",f),h()}function ht(e,t){const a=t==="viewing",r=e.property_id||e.id||"",o=document.createElement("div");o.id="property-request-modal",o.className="fixed inset-0 z-[450] flex items-end sm:items-center justify-center p-0 sm:p-4",o.innerHTML=`
    <style>
      @keyframes req-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
      @media (min-width:640px){@keyframes req-up{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}}
      #property-request-modal .animate-req-up{animation:req-up .26s cubic-bezier(.2,.8,.2,1)}
    </style>
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-req-close></div>
    <div class="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-req-up">
      <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
        <div>
          <h3 class="text-base font-black text-gray-900 tracking-tight">${a?"Request a Viewing":"Request More Information"}</h3>
          <p class="text-xs text-gray-500 mt-0.5 truncate">${d(e.title)}</p>
        </div>
        <button type="button" data-req-close class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition" aria-label="Close">✕</button>
      </div>
      <form id="property-request-form" class="p-5 space-y-4">
        <input type="hidden" id="prq-kind" value="${a?"viewing":"info"}">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Your Name *</label><input type="text" id="prq-name" required placeholder="Full name" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email Address *</label><input type="email" id="prq-email" required placeholder="you@email.com" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone (optional)</label><input type="tel" id="prq-phone" placeholder="+1 555 000 0000" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          ${a?'<div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Preferred Date</label><input type="date" id="prq-date" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>':""}
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Message</label><textarea id="prq-message" rows="3" placeholder="${a?"Preferred time, questions about the property…":"What would you like to know about this property?"}" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"></textarea></div>
        <button type="submit" id="prq-submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">${a?"Request Viewing":"Send Request"}</button>
        <div id="prq-status" class="hidden text-center text-sm py-2 rounded-xl"></div>
      </form>
    </div>
  `,document.body.appendChild(o),document.body.style.overflow="hidden",z().then(n=>{if(n){const i=o.querySelector("#prq-name"),s=o.querySelector("#prq-email"),c=n.user_metadata||{};c?.full_name&&i&&!i.value&&(i.value=c.full_name),n.email&&s&&!s.value&&(s.value=n.email)}});const l=()=>{o.remove(),document.body.style.overflow=""};o.querySelectorAll("[data-req-close]").forEach(n=>n.addEventListener("click",l)),o.addEventListener("submit",async n=>{n.preventDefault();const i=o.querySelector("#prq-submit"),s=o.querySelector("#prq-status"),c=o.querySelector("#prq-name").value.trim(),b=o.querySelector("#prq-email").value.trim(),y=o.querySelector("#prq-phone")?.value.trim()||"",h=o.querySelector("#prq-date")?.value||"",p=o.querySelector("#prq-message").value.trim();i.disabled=!0,i.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i> Sending...',window.lucide&&lucide.createIcons();try{let g=null;try{g=(await B.auth.getUser()).data?.user?.id||null}catch{}const v=a?"Request Viewing":"Request More Information",f=[r&&`Property: ${r}`,y&&`Phone: ${y}`,h&&`Preferred date: ${h}`,p].filter(Boolean).join(" | "),{error:$}=await B.from("site_feedback").insert({user_id:g,name:c,email:b,rating:5,feedback:`${v} (${e.title}): ${f}`,is_approved:!1});if($)throw new Error($.message);try{await fetch("https://mzgrjwvwzgqgivwmlkno.supabase.co/functions/v1/send-auth-email",{method:"POST",headers:{Authorization:"Bearer sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX","Content-Type":"application/json"},body:JSON.stringify({type:"contact_form",name:c,email:b,subject:`${v} — ${e.title}`,message:f})})}catch{}s.className="text-center text-sm py-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200",s.textContent=a?"Viewing request sent! We'll confirm your appointment within 24 hours.":"Request sent! We'll get back to you within 24 hours.",s.classList.remove("hidden"),setTimeout(l,1800)}catch{s.className="text-center text-sm py-3 rounded-xl bg-red-50 text-red-600 border border-red-200",s.textContent="Failed to send. Please email support@weverseonlineshop.com directly.",s.classList.remove("hidden"),i.disabled=!1,i.innerHTML=a?"Request Viewing":"Send Request",window.lucide&&lucide.createIcons()}})}let U=0,gt=!1;function za(){if(gt)return;gt=!0;const e=document.createElement("style");e.textContent="@keyframes kcoWishPop{0%{transform:scale(1)}35%{transform:scale(1.45)}60%{transform:scale(.86)}100%{transform:scale(1)}}",document.head.appendChild(e)}function Ke(e,t){if(!e)return;za(),e.innerHTML=`<i data-lucide="heart" class="w-5 h-5 ${t?"fill-red-500 text-red-500":""}"></i>`,e.classList.toggle("bg-red-50",t),e.classList.toggle("border",t),e.classList.toggle("border-red-200",t);const a=e.querySelector("span");a&&(a.textContent=t?"Saved to Wishlist":"Add to Wishlist"),window.lucide&&lucide.createIcons();const r=e.querySelector("i");r&&(r.style.animation="none",r.offsetWidth,r.style.animation="kcoWishPop .5s cubic-bezier(.34,1.56,.64,1)",setTimeout(()=>{r&&(r.style.animation="")},550))}async function Wa(e){const t=document.getElementById("wishlist-btn");if(!t)return;const a=await z();if(!a){t.addEventListener("click",()=>{me(window.location.pathname+window.location.search),window.location.href=`/auth.html?redirect=${encodeURIComponent(window.location.pathname+window.location.search)}`});return}const{data:r,error:o}=await B.from("wishlist").select("id").eq("user_id",a.id).eq("listing_id",e.id).maybeSingle();if(o){console.error("Wishlist check failed:",o.message);return}r&&Ke(t,!0),t.addEventListener("click",async()=>{const{data:l,error:n}=await B.from("wishlist").select("id").eq("user_id",a.id).eq("listing_id",e.id).maybeSingle();if(n){console.error("Wishlist toggle failed:",n.message);return}if(l){const{error:i}=await B.from("wishlist").delete().eq("id",l.id);if(i){console.error("Wishlist delete failed:",i.message);return}Ke(t,!1)}else{const{error:i}=await B.from("wishlist").insert({user_id:a.id,listing_id:e.id});if(i){console.error("Wishlist insert failed:",i.message);return}Ke(t,!0)}})}async function Pe(e){const t=document.getElementById("review-form");if(!t)return;const a=await z(),r=e.property_id||e.id||"",o=document.getElementById("review-photo-row");o&&(a?o.classList.remove("hidden"):o.classList.add("hidden"));const l=document.getElementById("review-name");if(l){let h="";try{h=localStorage.getItem("kco_review_name")||""}catch{}l.value=h}document.querySelectorAll(".star-btn").forEach(h=>{h.addEventListener("click",()=>{U=parseInt(h.dataset.rating,10),document.querySelectorAll(".star-btn").forEach((p,g)=>{const v=p.querySelector("i, svg");v&&(g<U?(v.classList.add("fill-amber-400","text-amber-400"),v.classList.remove("text-gray-300")):(v.classList.remove("fill-amber-400","text-amber-400"),v.classList.add("text-gray-300")))})})});const n=document.getElementById("review-photo-input"),i=document.getElementById("review-photo-preview");let s=null;n&&n.addEventListener("change",()=>{if(s=n.files&&n.files[0],!!i&&(i.innerHTML="",s)){const h=URL.createObjectURL(s);i.innerHTML=`<span class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1"><img src="${h}" alt="" class="w-5 h-5 rounded object-cover">${d(s.name)}</span>`}});const c=document.getElementById("review-submit-msg"),b=document.getElementById("review-error-msg"),y=h=>{if(b)if(h){b.classList.remove("hidden");const p=b.querySelector("span");p&&(p.textContent=h)}else b.classList.add("hidden")};t.addEventListener("submit",async h=>{h.preventDefault(),y("");const p=document.getElementById("review-text").value.trim();if(!U){alert("Please select a rating.");return}if(!p){alert("Please write a review.");return}const g=t.querySelector('button[type="submit"]'),v=g.innerHTML;g.disabled=!0,g.innerHTML='<span class="inline-block animate-spin">⏳</span> Submitting…';const f=(l?l.value:"").trim();if(f)try{localStorage.setItem("kco_review_name",f)}catch{}let $=!1;if(a){let w=null;if(s){const x=(s.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg",I=`${a.id}/${Date.now()}_${String(Math.random()).slice(2)}.${x}`,{error:V}=await B.storage.from("review-photos").upload(I,s,{contentType:s.type||"image/jpeg",cacheControl:"3600",upsert:!1});if(V){g.disabled=!1,g.innerHTML=v,y("Could not upload photo: "+V.message);return}const{data:T}=B.storage.from("review-photos").getPublicUrl(I);w=T?.publicUrl||null}const{error:C}=await B.from("product_reviews").insert({listing_id:e.id||null,property_id:r,user_id:a.id,rating:U,comment:p,review_photo:w,is_approved:!0});C?y("Could not save your review: "+(C.message||"unknown error")):$=!0}else{try{const{error:w}=await B.from("product_reviews").insert({listing_id:e.id||null,property_id:r,rating:U,comment:p,author_name:f||null,is_approved:!0});w||($=!0,ua(r,{rating:U,text:p,name:f}))}catch{}$||($=!!da(r,{rating:U,text:p,name:f})),$||y("Could not save your review right now — please try again.")}if(!$){g.disabled=!1,g.innerHTML=v;return}g.disabled=!1,g.innerHTML=v,document.getElementById("review-text").value="",l&&(l.value=f),U=0,s=null,n&&(n.value=""),i&&(i.innerHTML=""),document.querySelectorAll(".star-btn").forEach(w=>{const C=w.querySelector("i, svg");C&&(C.classList.remove("fill-amber-400","text-amber-400"),C.classList.add("text-gray-300"))}),c&&(c.classList.remove("hidden"),setTimeout(()=>{c&&c.classList.add("hidden")},4e3)),be(e)})}async function be(e){Bt();const t=document.getElementById("reviews-list"),a=document.getElementById("reviews-summary"),r=document.getElementById("reviews-breakdown");if(!t)return;const o=ia(e),l={5:o.breakdown[5]||0,4:o.breakdown[4]||0,3:o.breakdown[3]||0,2:o.breakdown[2]||0,1:o.breakdown[1]||0};let n=Math.max(Number(o.total)||0,o.reviews.length);const i=[],s=e.property_id||e.id||"";if(s){const{data:f,error:$}=await B.from("product_reviews").select("*, profiles(full_name)").eq("property_id",s).eq("is_approved",!0).order("created_at",{ascending:!1});if(!$&&f)for(const w of f){i.push({...w,name:w.author_name||w.profiles?.full_name||"Anonymous",verified:w.is_verified_purchase});const C=Math.min(5,Math.max(1,Math.round(Number(w.rating)||0)));l[C]++,n++}}const c=ca(s).filter(f=>!i.some($=>Math.round(Number($.rating))===Math.round(Number(f.rating))&&String($.comment||"").trim()===String(f.text||"").trim()));for(const f of c){const $=Math.min(5,Math.max(1,Math.round(Number(f.rating)||0)));l[$]++,n++}let b=0;for(let f=5;f>=1;f--)b+=f*l[f];const h=(n?b/n:0)||Number(e.rating)||0,p=n,g=`
    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
      <div class="flex items-center gap-4 shrink-0">
        <div class="text-5xl sm:text-6xl font-black leading-none text-gray-900 tracking-tight">${h>0?h.toFixed(1):"New"}</div>
        <div class="shrink-0">
          <div class="flex gap-1">${Lt(h,"w-5 h-5 sm:w-6 sm:h-6")}</div>
          <div class="text-[13px] sm:text-sm font-bold text-gray-500 mt-1.5 tracking-wide">Customer Reviews</div>
        </div>
      </div>
      <div class="hidden md:block w-px h-12 bg-gray-200"></div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified Listing</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-full"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Secure Checkout</span>
        <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full"><i data-lucide="truck" class="w-3.5 h-3.5"></i> Fast Worldwide Delivery</span>
      </div>
    </div>`;a&&(a.innerHTML=g),r&&(r.innerHTML=ja(e,l,p));const v=[...c,...i,...o.reviews];if(!v.length){t.innerHTML='<p class="text-gray-400 text-sm py-2">No reviews yet. Be the first to review this product!</p>',window.lucide&&lucide.createIcons();return}W=v.map(f=>(f._local?f._key="local-"+f.id:f.id?f._key="db-"+f.id:f._key="seed-"+_t(String(s)+"||"+(f.date||"")+"||"+(f.text||"")),f)),ue=s;try{ce=localStorage.getItem("kco_reply_name")||""}catch{}if(s)try{N=await St(s)}catch{N={likes:new Map,liked:new Set,comments:new Map}}else N={likes:new Map,liked:new Set,comments:new Map};O=null,le=!1,Ka(t),G()}async function Bt(){const e=document.querySelector('[data-bg-slot="reviews"]');if(e)try{const t=await ea();e.innerHTML=ta(t.reviews_bg_image,t.reviews_bg_video)}catch{}}document.addEventListener("promo-backgrounds-updated",()=>{try{Bt()}catch{}});function G(){const e=document.getElementById("reviews-list");if(!e||!W.length)return;const t=le?W:W.slice(0,3);if(e.innerHTML=t.map(Aa).join(""),window.lucide&&lucide.createIcons(),le)Xa(e,()=>{le=!1,G()});else if(W.length>t.length){const a=document.createElement("div");a.className="mt-4 flex justify-center",a.innerHTML=`
      <button type="button" class="view-all-reviews-btn btn-press inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition shadow-sm shadow-blue-500/20">
        View All Customer Reviews
        <i data-lucide="chevron-down" class="w-4 h-4"></i>
      </button>`,e.appendChild(a),window.lucide&&lucide.createIcons(),a.querySelector(".view-all-reviews-btn").addEventListener("click",()=>{le=!0,G()})}}async function Ga(){if(ue)try{N=await St(ue)}catch{N={likes:new Map,liked:new Set,comments:new Map}}}function Ya(){if(!O)return;const e=document.querySelector(".review-reply-box textarea.review-reply-body");e&&setTimeout(()=>{try{e.focus()}catch{}},60)}function Ka(e){!e||e.dataset.riBound==="1"||(e.dataset.riBound="1",e.addEventListener("click",async t=>{const a=t.target.closest("[data-open-reviewer]");if(a){t.preventDefault();const i=a.dataset.openReviewer,s=W.find(c=>c._key===i);s&&Ja(s);return}const r=t.target.closest(".review-like-btn");if(r){t.preventDefault();const i=r.dataset.key;if(!i)return;let c=!N.liked.has(i);try{const b=await na(ue,i);b&&typeof b.liked=="boolean"&&(c=b.liked)}catch{}c?N.liked.add(i):N.liked.delete(i),N.likes.set(i,Math.max(0,(N.likes.get(i)||0)+(c?1:-1))),G();return}const o=t.target.closest(".review-reply-toggle");if(o){t.preventDefault(),O=O===o.dataset.key?null:o.dataset.key,G(),Ya();return}if(t.target.closest(".review-reply-cancel")){t.preventDefault(),O=null,G();return}const n=t.target.closest(".review-reply-post");if(n){t.preventDefault();const i=t.target.closest(".review-reply-box");if(!i)return;const s=i.querySelector(".review-reply-name"),c=i.querySelector(".review-reply-body"),b=(s&&s.value||"").trim(),y=(c&&c.value||"").trim();if(!y){c&&c.focus();return}ce=b||ce;try{await la(ue,n.dataset.key,b||"Guest",y)}catch{}try{localStorage.setItem("kco_reply_name",ce)}catch{}O=null,await Ga(),G()}}))}function Ja(e){const t=e.author_name||e.name||e.profiles?.full_name||"Anonymous",a=d(t.trim().charAt(0).toUpperCase()||"A"),r=e.location||e.profiles?.country||"",o=e.handle||"",l=e.date||e.created_at||"",n=W.filter(p=>(p.author_name||p.name||p.profiles?.full_name||"")===t),i=n.length||1,s=i>0?n.reduce((p,g)=>p+(Number(g.rating)||0),0)/n.length:Number(e.rating)||0,c=n.reduce((p,g)=>{const v=g._key||"";return p+(g.likes||0)+(v&&N.likes.get(v)||0)},0),b=n.slice(0,4).map(p=>`
      <div class="rounded-xl border border-gray-100 bg-gray-50/70 p-3">
        <div class="flex items-center gap-1.5 mb-1">${[1,2,3,4,5].map(v=>`<i data-lucide="star" class="w-3 h-3 ${v<=(Number(p.rating)||0)?"fill-amber-400 text-amber-400":"text-gray-300"}"></i>`).join("")}<span class="text-[11px] text-gray-400 ml-1">${$e(p.date||p.created_at)}</span></div>
        <p class="text-[13px] text-gray-700 leading-relaxed">${d(p.text||p.comment||"")}</p>
      </div>`).join(""),y=document.createElement("div");y.id="reviewer-profile-modal",y.className="fixed inset-0 z-[460] flex items-end sm:items-center justify-center p-0 sm:p-4",y.innerHTML=`
    <style>
      @keyframes rp-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
      @media (min-width:640px){@keyframes rp-up{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}}
      #reviewer-profile-modal .animate-rp-up{animation:rp-up .26s cubic-bezier(.2,.8,.2,1)}
      #reviewer-profile-modal::-webkit-scrollbar{display:none}
    </style>
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-rp-close></div>
    <div class="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-rp-up">
      <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
        <h3 class="text-base font-black text-gray-900 tracking-tight">Reviewer Profile</h3>
        <button type="button" data-rp-close class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition" aria-label="Close">✕</button>
      </div>
      <div class="max-h-[70vh] overflow-y-auto px-5 py-5 space-y-4" style="-ms-overflow-style:none;scrollbar-width:none">
        <div class="flex items-center gap-3.5">
          <div class="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-black uppercase shadow">${a}</div>
          <div class="min-w-0">
            <div class="text-lg font-black text-gray-900 leading-tight">${d(t)}</div>
            ${o?`<div class="text-xs font-semibold text-blue-500">@${d(o)}</div>`:""}
            ${r?`<div class="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i>${d(r)}</div>`:""}
            ${l?`<div class="flex items-center gap-1 text-xs text-gray-400 mt-0.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>Reviewed ${$e(l)}</div>`:""}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
            <div class="text-lg font-black text-gray-900">${s?Number(s).toFixed(1):"—"}</div>
            <div class="flex justify-center gap-0.5 mt-0.5">${[1,2,3,4,5].map(p=>`<i data-lucide="star" class="w-3 h-3 ${p<=Math.round(s)?"fill-amber-400 text-amber-400":"text-gray-300"}"></i>`).join("")}</div>
            <div class="text-[11px] text-gray-400 mt-1">Avg rating</div>
          </div>
          <div class="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
            <div class="text-lg font-black text-gray-900">${i}</div>
            <div class="text-[11px] text-gray-400 mt-1">Reviews</div>
          </div>
          <div class="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
            <div class="text-lg font-black text-gray-900">${c}</div>
            <div class="text-[11px] text-gray-400 mt-1">Helpful votes</div>
          </div>
        </div>
        ${b?`
          <div>
            <h4 class="text-xs font-black uppercase tracking-wide text-gray-500 mb-2">Reviews on this listing</h4>
            <div class="space-y-2">${b}</div>
          </div>`:""}
        <p class="text-[11px] text-gray-400 leading-relaxed">Follower and activity counts shown are based on real reviews and reviews-likes on this listing.</p>
      </div>
    </div>
  `,document.body.appendChild(y),document.body.style.overflow="hidden",window.lucide&&lucide.createIcons();const h=()=>{y.remove(),document.body.style.overflow=""};y.querySelectorAll("[data-rp-close]").forEach(p=>p.addEventListener("click",h)),y.addEventListener("click",p=>{p.target===y&&h()})}function Xa(e,t){if(!e)return;const a=document.getElementById("reviews-back-top");a&&a.remove();const r=document.createElement("button");r.type="button",r.id="reviews-back-top",r.setAttribute("aria-label","Back to product page"),r.className="btn-press fixed z-[90] bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-white font-bold pl-3 pr-5 py-3 rounded-full text-xs shadow-xl shadow-slate-950/50 border border-white/10 backdrop-blur transition active:scale-95",r.innerHTML=`
    <span class="shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"><i data-lucide="chevron-up" class="w-4 h-4"></i></span>
    Back to product page`,document.body.appendChild(r),r.addEventListener("click",()=>{r.remove(),typeof t=="function"&&t();const o=document.getElementById("reviews-section");o&&o.scrollIntoView({behavior:"smooth",block:"start"})}),window.lucide&&lucide.createIcons()}async function Za(e){const t=document.getElementById("recommendations-section"),a=document.getElementById("recommendations-grid");if(!t||!a||!e.id)return;const{data:r,error:o}=await B.from("product_recommendations").select("recommended_listing_id, showroom_listings!product_recommendations_recommended_listing_id_fkey(property_id, title, price, currency, images, listing_type)").eq("listing_id",e.id).order("score",{ascending:!1}).limit(4);if(o){console.error("Recommendations load failed:",o.message),t.classList.add("hidden");return}let l=(r||[]).map(n=>n.showroom_listings).filter(Boolean);if(l.length<4){const{data:n}=await B.from("showroom_listings").select("property_id, title, price, currency, images, listing_type").eq("category",e.category).neq("id",e.id).eq("is_active",!0).order("rating",{ascending:!1}).limit(4-l.length);l=[...l,...n||[]]}if(l.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),a.innerHTML=l.map(n=>{const i=n.video||n.video_url||n.images&&n.images[0]||"",s=/\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(i.split("?")[0])||/^data:video\//i.test(i),c=typeof n.price=="number"?n.price:parseFloat(n.price||0),b=n.currency||"USD",y=s?`<video src="${d(i)}" muted loop autoplay playsinline class="w-full h-full object-cover group-hover:scale-105 transition" preload="metadata"></video>`:'<div class="w-full h-full flex items-center justify-center bg-gray-100"><i data-lucide="video-off" class="w-6 h-6 text-gray-300"></i></div>';return`<a href="/details.html?id=${encodeURIComponent(n.property_id)}" class="block bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition group">
      <div class="aspect-square overflow-hidden bg-gray-100">${y}</div>
      <div class="p-2"><p class="text-xs text-gray-900 font-bold truncate">${d(n.title)}</p><p class="text-xs text-blue-500 font-bold mt-1">${b} ${c.toLocaleString()}</p></div>
    </a>`}).join("")}function d(e){return String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}async function Qa(){const e=qa();if(!e){document.getElementById("details-content").innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>';return}const t=()=>{document.getElementById("details-content").innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>'},a=()=>nt(e)||lt(e)||ct(e)||Kt(e)||ft(e)||Pt(e)||Ut(),r=c=>{if(Ht(c),document.title=`${c.title} | Weverse Online Shop`,Zt(c),c===nt(e))Ra(c);else if(c===lt(e))Na(c);else if(c===ct(e))Ha(c);else{Oa(c);try{He(c)}catch{}}},l=document.getElementById("details-content")?.querySelector("[data-ssr-product]");if(l&&l.getAttribute("data-ssr-product")===e){Fe(e).then(c=>{if(c&&c.property_id===e)try{r(c)}catch{}}).catch(()=>{});return}const n=a();if(n){try{r(n)}catch{try{t()}catch{}return}Fe(e).then(c=>{it().then(()=>{if(zt(e)){t();return}if(c&&c.property_id===e)try{r(c)}catch{}})});return}const i=await Fe(e);if(i){r(i);return}await Ta();const s=ft(e);if(s){r(s);return}await it();{t();return}}const xt=document.getElementById("details-content"),er=xt?xt.innerHTML:"";let vt=!1;function At(e){if(e)try{console.error("[details] init failed:",e&&(e.stack||e.message||e))}catch{}if(!vt){vt=!0;try{const t=document.getElementById("details-content");if(!t||t.querySelector("[data-ssr-product]")||t.innerHTML!==er||t.querySelector(".fade-in, #reviews-section"))return;t.innerHTML='<div class="text-center py-20 text-gray-500">We couldn’t load this listing right now. Please check your connection and try again.</div>'}catch{}}}window.setTimeout(At,12e3);Qa().catch(At);
