import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as J,_ as Ii}from"./showroom-data-C8s3txE5.js";import{supabase as c}from"./supabase-client-DSkAnHxH.js";import{a as Ti,g as Bi,C as Ne}from"./country-data-BXM8T1RS.js";import{A as Li}from"./localization-CBo_e9qC.js";import{patchLocalShowroomListing as Mt,getLocalShowroomListingById as Ae,removeLocalShowroomListing as Mi,upsertLocalShowroomListing as Xe,listLocalShowroomListings as Kt}from"./local-showroom-store-mzP0nSoS.js";import{g as Qt,s as Di,l as ji,a as Ri}from"./payment-settings-BZM-gsG8.js";import{P as Ea,a as Ca,T as Ia,M as Ta}from"./motorhome-data-CupbOvk0.js";import{getCatalogCategories as Fi}from"./catalog-pfF1HJ-x.js";import{i as qi}from"./promo-backgrounds-C4TNWBGI.js";import{i as Ba,D as Ui}from"./site-content-slMvSP6y.js";import{M as Ni,a as Oi}from"./categories-72WACZm8.js";import{v as Hi,e as Vi,c as Wi,s as Gi,d as zi,n as Yi}from"./showroom-write-Domq7NWE.js";import{saveCatalogHidden as La,loadHiddenCatalogIds as Jt,getHiddenCatalogIds as rt,resetHiddenCatalogIds as Ki}from"./catalog-hidden-store-Ci-G2dxV.js";/* empty css                                       */const W=1,X=5e6,Qi=[{id:"prod-smartphone",listingType:"product",category:"Phones",subcategory:"Smartphones",label:"Flagship Smartphone",brand:"Global Mobile",model:"X Pro",color:"Midnight Black",size:"6.7-inch",condition:"New",features:["5G connectivity","OLED display","Fast charging","Unlocked","Premium cameras"],highlights:["Retail-ready packaging","Strong search demand","Ideal for global shipping"],keywords:["smartphone","mobile phone","5g"],descriptionType:"phone"},{id:"prod-laptop",listingType:"product",category:"Computers & Laptops",subcategory:"Laptops",label:"Performance Laptop",brand:"NorthBridge",model:"Studio 14",color:"Silver",size:"14-inch",condition:"New",features:["Fast processor","SSD storage","Long battery life","Portable chassis","Business-ready design"],highlights:["Suitable for work and study","Premium margin band","Global audience appeal"],keywords:["laptop","notebook","computer"],descriptionType:"laptop"},{id:"prod-tv",listingType:"product",category:"Electronics",subcategory:"Smart TVs",label:"4K Smart TV",brand:"VistaHome",model:"UltraView",color:"Black",size:"65-inch",condition:"New",features:["4K panel","Streaming apps","HDR support","Voice control","Slim bezel"],highlights:["Living-room centerpiece","Popular premium electronics segment"],keywords:["tv","smart tv","home electronics"],descriptionType:"electronics"},{id:"prod-watch",listingType:"product",category:"Watches",subcategory:"Luxury Watches",label:"Luxury Wristwatch",brand:"Aurelius",model:"Chrono 8",color:"Gold / Black",size:"42mm",condition:"New",features:["Precision movement","Premium case","Gift-ready presentation","Water resistance","Collector appeal"],highlights:["High perceived value","Strong gifting category"],keywords:["watch","luxury watch","timepiece"],descriptionType:"luxury"},{id:"prod-jewelry",listingType:"product",category:"Jewelry",subcategory:"Fine Jewelry",label:"Fine Jewelry Set",brand:"Maison Valeur",model:"Signature Set",color:"Gold",size:"Adjustable",condition:"New",features:["Premium finish","Gift packaging","Occasion-ready","Elegant styling"],highlights:["High-value presentation","Wedding and celebration demand"],keywords:["jewelry","necklace","bracelet"],descriptionType:"luxury"},{id:"prod-handbag",listingType:"product",category:"Bags & Accessories",subcategory:"Designer Bags",label:"Designer Handbag",brand:"Rue Maison",model:"Carry All",color:"Tan",size:"Medium",condition:"New",features:["Structured silhouette","Premium hardware","Travel-friendly storage","Retail-ready finish"],highlights:["Fashion-forward listing","Broad international demand"],keywords:["handbag","designer bag","accessories"],descriptionType:"fashion"},{id:"prod-sneakers",listingType:"product",category:"Shoes",subcategory:"Premium Sneakers",label:"Premium Sneakers",brand:"RunNorth",model:"Air Flex",color:"White",size:"EU 42",condition:"New",features:["Comfort cushioning","Streetwear styling","Durable outsole","Daily wear ready"],highlights:["High-conversion category","Easy multi-country merchandising"],keywords:["sneakers","shoes","fashion"],descriptionType:"fashion"},{id:"prod-sofa",listingType:"product",category:"Furniture",subcategory:"Living Room",label:"Luxury Sofa Set",brand:"Grand Habitat",model:"Residence 3-Piece",color:"Sand Beige",size:"3-Piece Set",condition:"New",features:["Premium upholstery","Statement living-room piece","Comfort seating","Interior-ready styling"],highlights:["Large-ticket home category","Ideal for premium households"],keywords:["sofa","furniture","living room"],descriptionType:"home"},{id:"prod-generator",listingType:"product",category:"Home & Kitchen",subcategory:"Power Solutions",label:"Backup Power Generator",brand:"VoltWorks",model:"SilentMax",color:"Graphite",size:"7.5kVA",condition:"New",features:["Reliable backup power","Low-noise housing","Residential and business use","Heavy-duty build"],highlights:["Practical high-demand utility item","Useful in many markets"],keywords:["generator","power","backup power"],descriptionType:"industrial"},{id:"prod-drone",listingType:"product",category:"Cameras & Photography",subcategory:"Drones",label:"Pro Camera Drone",brand:"SkyFrame",model:"Aerial 4K",color:"Gray",size:"Foldable",condition:"New",features:["4K stabilized video","GPS return home","Portable folding frame","Creator-ready footage"],highlights:["Strong visual listing appeal","Premium creator equipment"],keywords:["drone","camera drone","aerial"],descriptionType:"electronics"},{id:"prod-grocery",listingType:"product",category:"Food & Groceries",subcategory:"Family Essentials",label:"Family Grocery Bundle",brand:"Market Select",model:"Household Pack",color:"Mixed",size:"Bulk Pack",condition:"New",features:["Everyday essentials","Bulk value","Family sized","Easy repeat orders"],highlights:["Fast-moving everyday goods","Useful across broad regions"],keywords:["groceries","food bundle","household essentials"],descriptionType:"daily"},{id:"prod-scale-house",listingType:"product",category:"Home & Kitchen",subcategory:"Model Houses",label:"Architectural Model House",brand:"Studio Form",model:"Estate Miniature",color:"Natural Wood",size:"1:50 Scale",condition:"New",features:["Collector display piece","Detailed craftsmanship","Interior decor appeal","Gift-ready packaging"],highlights:["Supports the model-house use case","Works for decor and collector audiences"],keywords:["model house","architectural model","collector decor"],descriptionType:"home"},{id:"veh-sedan",listingType:"product",category:"Cars",subcategory:"Sedans",label:"Executive Sedan",brand:"Summit Motors",model:"S Line",color:"Pearl White",size:"Mid-size",condition:"Used - Like New",features:["Comfortable cabin","Road-trip ready","Well-maintained presentation","Family and executive appeal"],highlights:["Vehicle posts support 24-image galleries","Map-ready listing"],keywords:["car","sedan","vehicle"],requiredImageCount:24,descriptionType:"vehicle"},{id:"veh-suv",listingType:"product",category:"Cars",subcategory:"SUVs",label:"Family SUV",brand:"Frontier Auto",model:"Terrain X",color:"Obsidian",size:"7-Seater",condition:"Used - Like New",features:["Spacious seating","Utility-focused cargo room","Suitable for families","Road and city versatility"],highlights:["High-demand automotive segment","Works well with showroom map"],keywords:["suv","family car","vehicle"],requiredImageCount:24,descriptionType:"vehicle"},{id:"veh-luxury",listingType:"product",category:"Luxury Cars",subcategory:"Luxury Vehicles",label:"Luxury Performance Car",brand:"Regal Automotive",model:"Imperium GT",color:"Metallic Black",size:"Coupe",condition:"Used - Like New",features:["Prestige brand positioning","Performance styling","Collector-level appeal","Premium interior"],highlights:["Supports the requested high-ticket range","Designed for showroom-style luxury listings"],keywords:["luxury car","sports car","supercar"],requiredImageCount:24,descriptionType:"vehicle"},{id:"veh-motorcycle",listingType:"product",category:"Motorcycles",subcategory:"Street Bikes",label:"Sport Motorcycle",brand:"Velocity Moto",model:"R 900",color:"Red",size:"900cc",condition:"Used - Like New",features:["Agile handling","Performance design","Lifestyle buyer appeal","Weekend-ready machine"],highlights:["Automotive category with image-rich display"],keywords:["motorcycle","bike","sport bike"],requiredImageCount:24,descriptionType:"vehicle"},{id:"veh-commercial",listingType:"product",category:"Commercial Vehicles",subcategory:"Utility Vehicles",label:"Commercial Utility Vehicle",brand:"FleetCore",model:"CargoPro",color:"White",size:"Long wheelbase",condition:"Used - Good",features:["Business-ready load space","Fleet-friendly purchase","Service history presentation","Commercial utility"],highlights:["Suitable for business buyers","Map-ready logistics listing"],keywords:["commercial vehicle","cargo van","fleet"],requiredImageCount:24,descriptionType:"vehicle"},{id:"veh-boat",listingType:"product",category:"Boats & Marine",subcategory:"Leisure Boats",label:"Leisure Boat",brand:"BlueHarbor",model:"Coastline 28",color:"Navy / White",size:"28 ft",condition:"Used - Like New",features:["Marina-ready presentation","Leisure and charter appeal","Premium leisure category"],highlights:["Large-format gallery support","High-ticket recreational listing"],keywords:["boat","marine","yacht"],requiredImageCount:24,descriptionType:"vehicle"}],Ji=[{id:"prop-apartment",listingType:"property",category:"Real Estate",subcategory:"Apartments",label:"City Apartment",propertyType:"Apartment",bedrooms:2,bathrooms:2,buildingSize:"1,150 sqft",landSize:"",furnished:"Furnished",features:["Secure access","Modern kitchen","Prime urban access","Balcony or city views"],highlights:["Strong urban demand","Good for short and long stay buyers"],keywords:["apartment","real estate","city home"],requiredImageCount:24,descriptionType:"property"},{id:"prop-condo",listingType:"property",category:"Real Estate",subcategory:"Condos",label:"Modern Condo",propertyType:"Condo",bedrooms:3,bathrooms:2,buildingSize:"1,450 sqft",landSize:"",furnished:"Furnished",features:["Managed building","Amenity access","Contemporary finish","Secure parking"],highlights:["Works across major global markets"],keywords:["condo","property","home"],requiredImageCount:24,descriptionType:"property"},{id:"prop-townhouse",listingType:"property",category:"Real Estate",subcategory:"Townhouses",label:"Townhouse Residence",propertyType:"Townhouse",bedrooms:4,bathrooms:3,buildingSize:"2,000 sqft",landSize:"0.08 acres",furnished:"Unfurnished",features:["Multi-level layout","Family-ready plan","Private entry","Parking included"],highlights:["Popular residential ownership format"],keywords:["townhouse","residence","property"],requiredImageCount:24,descriptionType:"property"},{id:"prop-villa",listingType:"property",category:"Real Estate",subcategory:"Villas",label:"Private Villa",propertyType:"Villa",bedrooms:5,bathrooms:5,buildingSize:"4,800 sqft",landSize:"0.4 acres",furnished:"Furnished",features:["Private outdoor space","Premium architecture","Luxury entertaining zones","Prestige location potential"],highlights:["Premium property tier","Designed for international buyers"],keywords:["villa","luxury property","real estate"],requiredImageCount:24,descriptionType:"property"},{id:"prop-mansion",listingType:"property",category:"Real Estate",subcategory:"Mansions",label:"Luxury Mansion",propertyType:"Mansion",bedrooms:8,bathrooms:10,buildingSize:"12,000 sqft",landSize:"1.2 acres",furnished:"Furnished",features:["Grand entrance","High-end interior finishes","Staff or guest quarters","Statement curb appeal"],highlights:["Matches the mansion requirement directly","Supports high-ticket luxury listings"],keywords:["mansion","estate","luxury home"],requiredImageCount:24,descriptionType:"property"},{id:"prop-beach",listingType:"property",category:"Real Estate",subcategory:"Beach Houses",label:"Beachfront House",propertyType:"Beach House",bedrooms:4,bathrooms:4,buildingSize:"3,600 sqft",landSize:"0.25 acres",furnished:"Furnished",features:["Waterfront views","Outdoor leisure space","Vacation-rental appeal","Premium lifestyle positioning"],highlights:["Ideal for tourism and lifestyle markets"],keywords:["beach house","waterfront home","property"],requiredImageCount:24,descriptionType:"property"},{id:"prop-farm",listingType:"property",category:"Real Estate",subcategory:"Farm Houses",label:"Farm House Estate",propertyType:"Farm House",bedrooms:4,bathrooms:3,buildingSize:"3,100 sqft",landSize:"5 acres",furnished:"Unfurnished",features:["Land-rich asset","Agricultural potential","Quiet residential use","Outbuilding opportunity"],highlights:["Suitable for rural and suburban regions"],keywords:["farm house","landed property","estate"],requiredImageCount:24,descriptionType:"property"},{id:"prop-commercial",listingType:"property",category:"Real Estate",subcategory:"Commercial Buildings",label:"Commercial Building",propertyType:"Commercial Building",bedrooms:0,bathrooms:4,buildingSize:"8,500 sqft",landSize:"0.35 acres",furnished:"Unfurnished",features:["Business district potential","Mixed-use flexibility","Visible frontage","Investor-ready asset class"],highlights:["Attractive for business buyers and investors"],keywords:["commercial building","office","investment property"],requiredImageCount:24,descriptionType:"property"},{id:"prop-hotel",listingType:"property",category:"Real Estate",subcategory:"Hotels",label:"Boutique Hotel",propertyType:"Hotel",bedrooms:18,bathrooms:20,buildingSize:"15,000 sqft",landSize:"0.75 acres",furnished:"Furnished",features:["Hospitality-ready layout","Guest-focused amenities","Tourism and corporate appeal","Revenue asset potential"],highlights:["Supports hospitality listings globally"],keywords:["hotel","hospitality","investment"],requiredImageCount:24,descriptionType:"property"},{id:"prop-land",listingType:"property",category:"Real Estate",subcategory:"Land",label:"Development Land",propertyType:"Land",bedrooms:0,bathrooms:0,buildingSize:"",landSize:"10 acres",furnished:"",features:["Development potential","Flexible use case","Long-term investment appeal","Location-led value"],highlights:["Useful for land banking and development"],keywords:["land","plot","development"],requiredImageCount:24,descriptionType:"property"}],Ma=[...Qi,...Ji];function Xt(e){return Ti[e]||"USD"}function Da(e,t){return Ma.filter(a=>a.listingType!==e?!1:t?a.category===t:!0)}function Xi(e,t){const a=Math.max(W,Math.min(X,Number(e)||W));return new Intl.NumberFormat("en-US",{style:"currency",currency:t,maximumFractionDigits:0}).format(a)}function Zi(e,t,a,i,o){const s=Xi(i,a);return e.descriptionType==="vehicle"?`${e.label} listed at ${s}. This template is intended to present a complete automotive post with exterior, interior, condition, performance, and gallery details in a clean showroom-style format.`:e.descriptionType==="property"?`${e.label} located in ${o}. Offered at ${s}, this property template is designed for a complete real-estate presentation with map-ready location data, rich visual gallery coverage, and buyer-friendly highlights covering layout, lifestyle, and investment value.`:e.descriptionType==="phone"?`${e.label} listed at ${s}. The template focuses on a clean premium device presentation with brand, model, condition, core features, and strong online merchandising copy.`:e.descriptionType==="laptop"?`${e.label} listed at ${s}. Built for marketplace listings that need clear performance positioning, specification highlights, and an easy-to-scan description for students, professionals, and remote workers.`:e.descriptionType==="luxury"?`${e.label} listed at ${s}. This template supports high-value presentation with polished positioning, premium selling points, and a strong showroom-style description.`:e.descriptionType==="fashion"?`${e.label} listed at ${s}. This product template highlights styling, quality, and day-to-day appeal while keeping the listing easy to customize.`:e.descriptionType==="home"?`${e.label} listed at ${s}. The listing copy is structured for shoppers looking for quality presentation, reliable detail, and visual merchandising support.`:e.descriptionType==="industrial"?`${e.label} listed at ${s}. This template emphasizes practical use, dependable performance, and business or household value in a straightforward format.`:e.descriptionType==="daily"?`${e.label} listed at ${s}. The copy is designed for repeat-buy categories with clear value messaging and broad buyer appeal.`:`${e.label} listed at ${s}. This template generates a clean, marketable listing with ready-made highlights, keywords, and presentation details.`}function ja({templateId:e,listingType:t,category:a,countryCode:i,currency:o,price:s}){const r=Ma.find(g=>g.id===e&&g.listingType===t);if(!r)return null;const l=Bi(i)||Ne[0],d=o||Xt(l.code),u=[l.name].filter(Boolean).join(", "),b={category:r.category||a||(t==="property"?"Real Estate":"Other"),subcategory:r.subcategory||r.label,title:t==="property"?`${r.label} in ${l.name}`:r.label,description:Zi(r,l,d,s,u),currency:d,features:[...r.features],highlights:[...r.highlights||[]],seo_keywords:[...new Set([r.category,r.subcategory,r.label,...t==="property"?[l.name]:[],...r.keywords||[]].filter(Boolean))],requiredImageCount:r.requiredImageCount||0};return t==="property"?{...b,country:l.name,country_code:l.code,product_location:l.name,property_type:r.propertyType||r.label,bedrooms:r.bedrooms??null,bathrooms:r.bathrooms??null,building_size:r.buildingSize||"",land_size:r.landSize||"",furnished:r.furnished||""}:{...b,brand:r.brand||"",model:r.model||"",color:r.color||"",size:r.size||"",condition:r.condition||"New"}}function Ra(e){const t=String(e||"").toLowerCase();return t.endsWith(".pdf")||t.includes(".pdf?")||t.includes(".pdf#")}const Zt="".replace(/\/$/,""),Dt=[{id:"overview",label:"Overview",icon:"layout-dashboard"},{id:"accounts",label:"Connected Accounts",icon:"link-2"},{id:"auto",label:"Automatic Posting",icon:"bot"},{id:"manual",label:"Manual Posting",icon:"pen-line"},{id:"schedule",label:"Posting Schedule",icon:"calendar-clock"},{id:"queue",label:"Content Queue",icon:"list-checks"},{id:"published",label:"Published Posts",icon:"check-circle-2"},{id:"failed",label:"Failed Posts",icon:"alert-triangle"},{id:"logs",label:"Post Logs",icon:"scroll-text"},{id:"platforms",label:"Platform Settings",icon:"settings-2"},{id:"apistatus",label:"API Connection Status",icon:"server"}];let Ke="overview";function y(e){if(e==null)return"";const t=document.createElement("div");return t.textContent=String(e),t.innerHTML}function w(e,t="success"){const a=document.getElementById("toast"),i=document.getElementById("toast-msg");if(!a||!i){alert(e);return}i.textContent=e;const o=a.querySelector("i[data-lucide]"),s={success:"check-circle",error:"alert-circle",info:"info"},r={success:"text-emerald-400",error:"text-red-400",info:"text-blue-400"};o&&(o.setAttribute("data-lucide",s[t]||"info"),o.className=`w-4 h-4 shrink-0 ${r[t]||"text-blue-400"}`),a.style.transform="translateY(0)",a.style.opacity="1",window.lucide&&lucide.createIcons(),clearTimeout(a._t),a._t=setTimeout(()=>{a.style.transform="translateY(20px)",a.style.opacity="0"},3200)}function eo(){return'<div class="flex items-center justify-center py-28"><div class="flex items-center gap-3 text-gray-400 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading…</div></div>'}function ae(e,t="inbox"){return`<div class="flex flex-col items-center justify-center py-16 text-center"><div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4"><i data-lucide="${t}" class="w-8 h-8 text-blue-400"></i></div><p class="text-sm text-gray-500 max-w-xs">${y(e)}</p></div>`}function N(){if(window.lucide)try{lucide.createIcons()}catch{}}function re(e){return e?new Date(e).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}async function Fa(){const{data:e}=await c.auth.getSession();return e?.session?.access_token||""}async function ue(e,t={}){const i={authorization:`Bearer ${await Fa()}`,"content-type":"application/json",...t.headers||{}},o=await fetch(`${Zt}${e}`,{...t,headers:i});let s={};try{s=await o.json()}catch{s={}}if(!o.ok)throw Object.assign(new Error(s?.error||`Request failed (HTTP ${o.status})`),{status:o.status,code:s.code});return s}async function to(e){const t=(e.name.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,""),a=`uploads/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${t}`,{error:i}=await c.storage.from("social-posts").upload(a,e,{contentType:e.type,upsert:!1,cacheControl:"3600"});if(i)throw i;const{data:o}=c.storage.from("social-posts").getPublicUrl(a),s=(e.type||"").startsWith("video/")||/\.(mp4|webm|mov|m4v)$/i.test(e.name);return{url:o.publicUrl,type:s?"video":"image"}}const G={tiktok:{label:"TikTok",icon:"music-2",tone:"text-white"},telegram:{label:"Telegram",icon:"send",tone:"text-sky-400"},facebook:{label:"Facebook Pages",icon:"thumbs-up",tone:"text-blue-400"},instagram:{label:"Instagram",icon:"camera",tone:"text-pink-400"},youtube:{label:"YouTube",icon:"youtube",tone:"text-red-400"},x:{label:"X (Twitter)",icon:"twitter",tone:"text-gray-300"},pinterest:{label:"Pinterest",icon:"pinterest",tone:"text-red-500"},linkedin:{label:"LinkedIn",icon:"linkedin",tone:"text-sky-500"},whatsapp:{label:"WhatsApp Channels",icon:"message-circle",tone:"text-emerald-400"}};function ie(e){return G[e]?.icon||"share-2"}function q(e){return G[e]?.label||e}function ao(e){const t={connected:"bg-emerald-500/15 text-emerald-300 border-emerald-500/30",disconnected:"bg-gray-500/15 text-gray-300 border-gray-500/30",error:"bg-red-500/15 text-red-300 border-red-500/30",revoked:"bg-red-500/15 text-red-300 border-red-500/30",requires_approval:"bg-amber-500/15 text-amber-300 border-amber-500/30",expired:"bg-amber-500/15 text-amber-300 border-amber-500/30",not_connected:"bg-gray-500/10 text-gray-400 border-gray-500/20",draft:"bg-gray-500/15 text-gray-300 border-gray-500/30",scheduled:"bg-amber-500/15 text-amber-300 border-amber-500/30",queued:"bg-sky-500/15 text-sky-300 border-sky-500/30",publishing:"bg-violet-500/15 text-violet-300 border-violet-500/30",published:"bg-emerald-500/15 text-emerald-300 border-emerald-500/30",failed:"bg-red-500/15 text-red-300 border-red-500/30",cancelled:"bg-gray-500/10 text-gray-400 border-gray-500/20",paused:"bg-amber-500/15 text-amber-300 border-amber-500/30",enabled:"bg-emerald-500/15 text-emerald-300 border-emerald-500/30",disabled:"bg-gray-500/15 text-gray-400 border-gray-500/25"};return t[e]||t.not_connected}function Se(e){return`<span class="badge ${ao(e)}">${y(e.replace(/_/g," "))}</span>`}function jt(e="overview"){Ke=Dt.find(a=>a.id===e)?e:"overview";const t=document.getElementById("content");t.innerHTML=`
    <div class="space-y-4 fade-in">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-xl font-black text-white flex items-center gap-2"><i data-lucide="share-2" class="w-5 h-5 text-blue-400"></i> Social Media Automation</h2>
          <p class="text-xs text-gray-500 mt-1">Automatic posting runs from the server. Connect official accounts below — nothing posts until you authorize and connect.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.socialRunScheduler()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="zap" class="w-3.5 h-3.5 inline mr-1"></i>Run now</button>
        </div>
      </div>
      <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        ${Dt.map(a=>`<button onclick="window.socialNav('${a.id}')" class="tab-btn ${Ke===a.id?"active":""}">${a.label}</button>`).join("")}
      </div>
      <div id="social-body"></div>
    </div>`,N(),nt(Ke)}window.socialNav=async function(e){Ke=e,document.querySelectorAll("#content .tab-btn").forEach((t,a)=>t.classList.toggle("active",Dt[a]?.id===e)),await nt(e)};async function nt(e){const t=document.getElementById("social-body");if(!t)return;t.innerHTML=eo(),N(),await({overview:ha,accounts:Oe,auto:He,manual:Na,schedule:co,queue:ea,published:po,failed:mo,logs:yo,platforms:dt,apistatus:_o}[e]||ha)(t)}async function fe(){return await ue("/api/social/status")}let qa=null;async function ha(e){try{const t=await fe();qa=t;const a=t.settings||{},i=await c.from("social_automation_rules").select("*").order("created_at",{ascending:!1}),o=await c.from("social_posts").select("*").order("created_at",{ascending:!1}).limit(300),r=(o.data||[]).filter(b=>b.status==="scheduled"||b.status==="queued"&&b.created_at).sort((b,g)=>new Date(b.scheduled_for||b.created_at)-new Date(g.scheduled_for||g.created_at))[0]||null,l=(o.data||[]).reduce((b,g)=>(b[g.status]=(b[g.status]||0)+1,b),{}),d=(t.accounts||[]).filter(b=>b.status==="connected"),u=!!(i.data||[]).some(b=>b.approval_mode==="manual"||b.enabled&&a.require_approval);e.innerHTML=`
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        ${ne("bot",a.auto_posting_enabled?"ON":"OFF","Automatic Posting",a.auto_posting_enabled?"text-emerald-300":"text-gray-300")}
        ${ne("power",a.automation_paused?"Paused":"Running","Automation Status",a.automation_paused?"text-amber-300":"text-emerald-300")}
        ${ne("link-2",String(d.length),"Connected Accounts","text-blue-300")}
        ${ne("share-2",String(l.published||0),"Published Posts","text-emerald-300")}
        ${ne("calendar-clock",String(l.scheduled||0),"Scheduled","text-amber-300")}
        ${ne("list-checks",String(l.queued||0),"In Queue","text-sky-300")}
        ${ne("alert-triangle",String(l.failed||0),"Failed","text-red-300")}
        ${ne("hourglass",String(l.draft||0),"Awaiting Approval",u?"text-violet-300":"text-gray-300")}
      </div>

      <div class="grid lg:grid-cols-3 gap-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3 lg:col-span-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="share-2" class="w-4 h-4 text-blue-400"></i> Platform Connection Status</h3>
          ${(t.platforms||[]).map(b=>`
            <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/5 rounded-xl">
              <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="${ie(b.id)}" class="w-4 h-4 ${G[b.id]?.tone||"text-gray-300"}"></i></div>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-bold text-white">${q(b.id)}</p>
                <p class="text-[11px] text-gray-500 truncate">${b.connected?b.accountName||"connected":b.configured?b.requiresApproval?"Requires approval":"Not connected":"API not configured"}</p>
              </div>
              <div class="flex items-center gap-2">
                ${b.configured?b.connected?Se("connected"):b.requiresApproval?'<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">approval</span>':Se("not_connected"):'<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">setup needed</span>'}
                <button onclick="window.socialNav('accounts')" class="btn-press text-[11px] font-bold text-blue-300 hover:text-white transition px-2 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">Manage</button>
              </div>
            </div>`).join("")||ae("No platforms available.")}
        </div>

        <div class="space-y-4">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-black text-white flex items-center gap-2 mb-3"><i data-lucide="calendar-clock" class="w-4 h-4 text-amber-300"></i> Next Scheduled Post</h3>
            ${r?`
              <p class="text-xs text-gray-400 mb-1">${re(r.scheduled_for||r.created_at)}</p>
              <p class="text-sm text-white font-bold mb-2">${q(r.platform)}${r.caption?" · "+y(r.caption.slice(0,60)):""}</p>
              <div class="flex gap-1 flex-wrap">${Se(r.status)}</div>`:ae("No upcoming posts. Create one under Manual Posting or enable an automation rule.","hourglass")}
          </div>
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-black text-white mb-3">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-2">
              ${[{icon:"bot",label:"Automatic Posting",fn:"window.socialNav('auto')"},{icon:"pen-line",label:"Manual Posting",fn:"window.socialNav('manual')"},{icon:"list-checks",label:"Content Queue",fn:"window.socialNav('queue')"},{icon:"settings-2",label:"Platform Settings",fn:"window.socialNav('platforms')"}].map(b=>`<button onclick="${b.fn}" class="btn-press p-3 bg-white/[.03] border border-white/10 rounded-xl text-left hover:border-blue-500/40 transition"><i data-lucide="${b.icon}" class="w-4 h-4 text-blue-400 mb-1.5 inline-block"></i><p class="text-[11px] font-bold text-white">${b.label}</p></button>`).join("")}
            </div>
          </div>
        </div>
      </div>`,N(),e.querySelectorAll("#social-body")}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">Could not load overview: ${y(t.message)}</div>`}}function ne(e,t,a,i){return`<div class="stat-card glass-soft border border-blue-500/15 rounded-3xl p-5">
    <div class="flex items-center gap-3 mb-2"><i data-lucide="${e}" class="w-5 h-5 ${i}"></i></div>
    <p class="text-3xl font-black text-white">${y(t)}</p>
    <p class="text-xs text-gray-500 uppercase tracking-wide mt-1 font-bold">${y(a)}</p>
  </div>`}async function Oe(e){try{const t=await ue("/api/social/accounts"),i=(await fe()).platforms||[],o=t.accounts||[];e.innerHTML=`
      <div class="space-y-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <p class="text-xs text-gray-500">Official OAuth connections only. Accounts are stored server-side with encrypted tokens. No passwords are ever requested.</p>
          <div class="flex gap-2">
            <select id="acct-filter" onchange="window.socialAccountsFilter()" class="input-field !w-44 !py-2 !px-3 !text-xs">
              <option value="">All platforms</option>
              ${i.map(s=>`<option value="${s.id}">${y(s.label)}</option>`).join("")}
            </select>
            <button onclick="window.socialRefresh()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="refresh-cw" class="w-3.5 h-3.5 inline mr-1"></i>Refresh</button>
          </div>
        </div>
        <div id="acct-grid" class="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          ${i.map(s=>io(s,o.find(r=>r.platform===s.id))).join("")}
        </div>
      </div>`,N()}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${y(t.message)}</div>`}}window.socialAccountsFilter=function(){const e=document.getElementById("acct-filter")?.value||"";document.querySelectorAll("#acct-grid > [data-platform]").forEach(t=>{t.style.display=!e||t.dataset.platform===e?"":"none"})};window.socialRefresh=()=>{Oe(document.getElementById("social-body"))};function io(e,t){const a=t?.status==="connected";return`
    <div data-platform="${e.id}" class="glass-soft border ${a?"border-emerald-500/25":"border-blue-500/15"} rounded-2xl p-4 space-y-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="${ie(e.id)}" class="w-5 h-5 ${G[e.id]?.tone||"text-gray-300"}"></i></div>
          <div class="min-w-0">
            <p class="text-xs font-black text-white truncate">${y(e.label)}</p>
            <p class="text-[11px] text-gray-500 truncate">${a?y(t.accountName||t.display_name||"Connected"):"Not connected"}</p>
          </div>
        </div>
        ${a?Se("connected"):e.configured?Se("not_connected"):'<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">setup needed</span>'}
      </div>

      <p class="text-[11px] text-gray-500 leading-relaxed">${y(e.requirements?.note||e.approvalNote||"")}</p>

      ${e.requiresApproval?`<div class="flex items-start gap-2 p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl"><i data-lucide="alert-circle" class="w-4 h-4 text-amber-300 shrink-0 mt-0.5"></i><p class="text-[11px] text-amber-200 leading-relaxed">${y(e.approvalNote||e.requirements?.note||"This platform may require app review / business verification / paid access before posting.")}</p></div>`:""}

      ${a?`
        <div class="grid grid-cols-2 gap-2">
          <button onclick="window.socialValidate('${t.id}')" class="btn-press py-2 rounded-xl text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="shield-check" class="w-3.5 h-3.5 inline mr-1"></i>Validate</button>
          <button onclick="window.socialDisconnect('${t.id}','${e.id}')" class="btn-press py-2 rounded-xl text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition"><i data-lucide="unplug" class="w-3.5 h-3.5 inline mr-1"></i>Disconnect</button>
          <button onclick="window.socialReconnect('${e.id}')" class="btn-press py-2 rounded-xl text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20 transition col-span-2"><i data-lucide="rotate-cw" class="w-3.5 h-3.5 inline mr-1"></i>Reconnect</button>
        </div>
        ${t.last_error?`<p class="text-[11px] text-red-300 truncate" title="${y(t.last_error)}">Last error: ${y(t.last_error)}</p>`:""}`:`
        <button onclick="window.socialConnect('${e.id}')" class="btn-press w-full py-2.5 rounded-xl text-[11px] font-bold ${e.configured?"bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500":"bg-gray-500/15 text-gray-400 border border-gray-500/25 cursor-not-allowed"} transition" ${e.configured?"":"disabled"}><i data-lucide="plug" class="w-3.5 h-3.5 inline mr-1"></i>Connect ${y(e.label)}</button>
        ${e.configured?"":'<p class="text-[10px] text-amber-300/80">Set the server environment variables first (see .env.example).</p>'}`}
    </div>`}window.socialConnect=async function(e){try{const a=((await fe()).platforms||[]).find(i=>i.id===e);if(!a?.configured){w("API credentials are not configured server-side.","error");return}if(a.usesOAuth){window.location.href=`${Zt}/api/social/oauth/start?platform=${encodeURIComponent(e)}`;return}await ue("/api/social/accounts",{method:"POST",body:JSON.stringify({action:"connect",platform:e})}),w(`${q(e)} connected.`),Oe(document.getElementById("social-body"))}catch(t){w(t.message,"error")}};window.socialValidate=async function(e){try{const t=await ue("/api/social/accounts",{method:"POST",body:JSON.stringify({action:"validate",account_id:e})});w(t.note||"Connection is valid."),Oe(document.getElementById("social-body"))}catch(t){w(t.message,"error")}};window.socialDisconnect=async function(e,t){if(confirm(`Disconnect your ${q(t)} account? Tokens will be wiped from the server.`))try{await ue("/api/social/accounts",{method:"POST",body:JSON.stringify({action:"disconnect",account_id:e})}),w(`${q(t)} disconnected.`),Oe(document.getElementById("social-body"))}catch(a){w(a.message,"error")}};window.socialReconnect=async function(e){window.socialConnect(e)};window.socialRunScheduler=async function(){try{const e=await Fa(),t=localStorage.getItem("kco_cron_secret")||"",a=await fetch(`${Zt}/api/social/scheduler`,{method:"POST",headers:{"content-type":"application/json",...t?{"x-cron-secret":t}:{}},body:JSON.stringify({})}),i=await a.json().catch(()=>({}));if(!a.ok){w(i?.error||"Scheduler requires the admin secret (set SCHEDULER_CRON_SECRET).","error");return}w(`Scheduler tick complete · ${i.published??0} published · ${i.scheduledEnqueued??0} enqueued`),nt("overview")}catch(e){w(e.message,"error")}};let De=[],oo={products:[],content:[],promos:[]};async function He(e){try{const a=(await fe()).settings||{};De=(await c.from("social_automation_rules").select("*").order("created_at",{ascending:!1})).data||[];const o=`
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
        <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-blue-400"></i> Global Automation Controls</h3>
        <div class="grid sm:grid-cols-2 gap-3">
          ${Et("Master switch","When ON, the server picks content and posts automatically to connected accounts.","auto_posting_enabled",a.auto_posting_enabled,"window.socialToggleGlobal('auto_posting_enabled')")}
          ${Et("Pause all automation","Temporarily stops ALL automatic and scheduled publishing. Resume anytime.","automation_paused",a.automation_paused,"window.socialToggleGlobal('automation_paused')")}
          ${Et("Approve posts before publishing","Auto-generated posts stay in the Content Queue as drafts until you approve them.","require_approval",a.require_approval,"window.socialToggleGlobal('require_approval')")}
          <div class="p-3 rounded-xl bg-white/[.03] border border-white/10 flex items-center justify-between gap-3">
            <div><p class="text-xs font-bold text-white">Schedule heartbeat</p><p class="text-[11px] text-gray-500">The server-side scheduler wakes every 15 minutes (Vercel Cron).</p></div>
            <span class="badge bg-sky-500/15 text-sky-300 border-sky-500/30">*/15 * * * *</span>
          </div>
        </div>
      </div>`,s=`
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="bot" class="w-4 h-4 text-blue-400"></i> Automation Rules</h3>
          <button onclick="window.socialRuleForm()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition"><i data-lucide="plus" class="w-3.5 h-3.5 inline mr-1"></i>New Rule</button>
        </div>
        ${De.length?De.map(so).join(""):ae("No automation rules yet. Create one to automatically publish products, promotions or news on a schedule.","bot")}
      </div>`;e.innerHTML=`${o}<div class="grid gap-4">${s}</div>`,N()}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${y(t.message)}</div>`}}function Et(e,t,a,i,o){return`<div class="p-3 rounded-xl bg-white/[.03] border border-white/10 flex items-center justify-between gap-3">
    <div><p class="text-xs font-bold text-white">${y(e)}</p><p class="text-[11px] text-gray-500">${y(t)}</p></div>
    <label class="toggle-switch"><input type="checkbox" ${i?"checked":""} onchange="${o}"><span class="toggle-slider"></span></label>
  </div>`}window.socialToggleGlobal=async function(e){try{const t=qa?.settings||{},a={...t,[e]:!t[e]},{error:i}=await c.from("social_settings").upsert({id:1,...a});if(i)throw i;w(e==="automation_paused"?a[e]?"Automation paused.":"Automation resumed.":"Saved."),He(document.getElementById("social-body"))}catch(t){w(t.message,"error")}};function so(e){const t=e.enabled&&!e.paused?"enabled":e.paused?"paused":"disabled",a={products:"New products (auto-pick new arrivals)",selected_products:"Selected products",promotions:"Promotions",content_items:"News / articles (Content Items)"},i={mon:"M",tue:"T",wed:"W",thu:"T",fri:"F",sat:"S",sun:"S"},o=e.next_run_at?`Next run ${re(e.next_run_at)}`:"First run pending";return`
    <div data-rule="${e.id}" class="p-4 rounded-2xl bg-white/[.03] border border-white/10 space-y-3">
      <div class="flex items-start justify-between gap-2 flex-wrap">
        <div class="min-w-0">
          <p class="text-sm font-black text-white">${y(e.name)}</p>
          <p class="text-[11px] text-gray-500 mt-0.5">${y(a[e.content_type]||e.content_type)} · ${y((e.platforms||[]).map(q).join(", "))}</p>
        </div>
        <div class="flex items-center gap-2">${Se(t)} <span class="badge bg-blue-500/10 text-blue-300 border-blue-500/20">${y(Ua(e))}</span></div>
      </div>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
        <span><i data-lucide="zap" class="w-3 h-3 inline mr-1 text-amber-300"></i>${y(e.max_posts_per_day??1)} /day max</span>
        <span><i data-lucide="send" class="w-3 h-3 inline mr-1 text-sky-300"></i>${e.approval_mode==="manual"?"Approval required":"Auto-publish"}</span>
        <span><i data-lucide="calendar-clock" class="w-3 h-3 inline mr-1 text-emerald-300"></i>${y(o)}</span>
        <span>${y((e.schedule_days||[]).length?(e.schedule_days||[]).map(s=>i[s]||s).join(" "):"daily")} ${y(e.schedule_time||"")}</span>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button onclick="window.socialRuleForm('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition"><i data-lucide="pencil" class="w-3 h-3 inline mr-1"></i>Edit</button>
        <button onclick="window.socialToggleRule('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${e.paused?"bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25":"bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20"} transition">${e.paused?'<i data-lucide="play" class="w-3 h-3 inline mr-1"></i>Resume':e.enabled?'<i data-lucide="pause" class="w-3 h-3 inline mr-1"></i>Pause':'<i data-lucide="play" class="w-3 h-3 inline mr-1"></i>Enable'}</button>
        <button onclick="window.socialDeleteRule('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition"><i data-lucide="trash-2" class="w-3 h-3 inline mr-1"></i>Delete</button>
      </div>
    </div>`}function Ua(e){const t=e.schedule_time||"";return e.schedule_type==="hourly"?"hourly":e.schedule_type==="interval"?`every ${e.interval_hours||24}h`:e.schedule_type==="weekly"?"weekly":e.schedule_type==="custom"?"custom":`daily ${t}`}window.socialToggleRule=async function(e){const t=De.find(i=>i.id===e);if(!t)return;let a;t.paused?a={paused:!1,enabled:!0}:t.enabled?a={enabled:!1}:a={enabled:!0,paused:!1},await c.from("social_automation_rules").update(a).eq("id",e),w("Rule updated."),He(document.getElementById("social-body"))};window.socialDeleteRule=async function(e){confirm("Delete this automation rule?")&&(await c.from("social_automation_rules").delete().eq("id",e),w("Rule deleted."),He(document.getElementById("social-body")))};window.socialRuleForm=async function(e){let t=De.find(o=>o.id===e);t||(t={id:"",name:"",enabled:!1,platforms:[],content_type:"products",selected_ids:[],schedule_type:"daily",schedule_time:"09:00",schedule_days:["mon","tue","wed","thu","fri","sat","sun"],interval_hours:24,max_posts_per_day:1,approval_mode:"auto",caption_template:`{{title}}
{{price}}
{{link}}`,include_price:!0,include_link:!0,hashtags:"",paused:!1});let a="";try{const{data:o}=await c.from("showroom_listings").select("property_id,title,listing_type,is_active").eq("is_active",!0).limit(400);oo.products=o||[],a=o.map(s=>`<div class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5"><label class="flex items-center gap-2 text-xs text-gray-300 flex-1"><input type="checkbox" class="rule-sel" value="${y(s.property_id)}" ${(t.selected_ids||[]).includes(s.property_id)?"checked":""}><span class="truncate">${y(s.title)} ${s.listing_type==="property"?'<span class="text-amber-300">(property)</span>':""}</span></label></div>`).join("")}catch{a=""}const i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
    <div class="modal-box wide">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-black text-white">${t.id?"Edit Automation Rule":"New Automation Rule"}</h3>
        <button onclick="document.querySelector('.modal-overlay').remove()" class="p-2 rounded-lg text-gray-400 hover:bg-white/5 transition"><i data-lucide="x" class="w-4 h-4"></i></button>
      </div>
      <div class="space-y-4 text-left max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="md:col-span-2"><label class="lbl">Rule name</label><input id="rule-name" class="input-field" value="${y(t.name||"")}" placeholder="e.g. Daily new arrivals → TikTok & Telegram"></div>
          <div><label class="lbl">Content type</label><select id="rule-content" class="input-field" onchange="window.socialRuleContentChange()">
            ${["products","selected_products","promotions","content_items"].map(o=>`<option value="${o}" ${t.content_type===o?"selected":""}>${y({products:"Auto-pick new products",selected_products:"Selected products",promotions:"Promotions",content_items:"News / articles (Content Items)"}[o])}</option>`).join("")}
          </select></div>
          <div><label class="lbl">Platforms</label><select id="rule-platforms" class="input-field" style="min-height:80px" multiple>
            ${G?Object.keys(G).filter(o=>o!=="whatsapp").map(o=>`<option value="${o}" ${(t.platforms||[]).includes(o)?"selected":""}>${y(q(o))}</option>`).join(""):""}
          </select><p class="text-[10px] text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple.</p></div>
          <div id="rule-period" class="grid grid-cols-2 gap-3">
            <div><label class="lbl">Schedule type</label><select id="rule-sched" class="input-field" onchange="window.socialRuleSchedChange()">
              ${["hourly","daily","weekly","interval","custom"].map(o=>`<option value="${o}" ${t.schedule_type===o?"selected":""}>${o}</option>`).join("")}
            </select></div>
            <div id="sched-time-wrap"><label class="lbl">Post time</label><input id="rule-time" type="time" class="input-field" value="${y(t.schedule_time||"09:00")}"></div>
          </div>
          <div id="sched-extra" class="md:col-span-2 grid grid-cols-2 gap-3">
            <div id="sched-days-wrap"><label class="lbl">Days</label><div class="flex gap-1 flex-wrap">
              ${["mon","tue","wed","thu","fri","sat","sun"].map(o=>`<label class="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300"><input type="checkbox" class="rule-day" value="${o}" ${(t.schedule_days||[]).includes(o)?"checked":""} style="accent-color:#2563eb">${o.toUpperCase()}</label>`).join("")}
            </div></div>
            <div id="sched-interval-wrap"><label class="lbl">Interval (hours)</label><input id="rule-interval" type="number" class="input-field" value="${y(t.interval_hours||24)}" min="1" max="720"></div>
          </div>
          <div><label class="lbl">Max posts per day</label><input id="rule-max" type="number" class="input-field" value="${y(t.max_posts_per_day??1)}" min="1" max="24"></div>
          <div><label class="lbl">Publishing</label><select id="rule-approval" class="input-field">
            <option value="auto" ${t.approval_mode!=="manual"?"selected":""}>Publish automatically without approval</option>
            <option value="manual" ${t.approval_mode==="manual"?"selected":""}>Require my approval (goes to Content Queue)</option>
          </select></div>
          <div id="rule-selected-wrap" class="md:col-span-2 hidden">
            <label class="lbl">Selected products (check to include)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 max-h-48 overflow-y-auto scrollbar-thin border border-white/10 rounded-xl p-2 bg-white/[.02]">${a||'<p class="text-xs text-gray-500 p-2">No active products found.</p>'}</div>
          </div>
          <div class="md:col-span-2"><label class="lbl">Caption template</label><textarea id="rule-caption" class="input-field" placeholder="{{title}} {{price}} {{link}}">${y(t.caption_template||`{{title}}
{{price}}
{{link}}`)}</textarea><p class="text-[10px] text-gray-500 mt-1">Variables: {{title}} {{price}} {{category}} {{brand}} {{site}} {{link}}</p></div>
          <div><label class="lbl">Hashtags</label><input id="rule-hashtags" class="input-field" value="${y(t.hashtags||"")}" placeholder="#marketplace #newarrival"></div>
          <div class="grid grid-cols-2 gap-3">
            <label class="flex items-center gap-2 text-xs text-gray-300"><input type="checkbox" id="rule-price" ${t.include_price!==!1?"checked":""} style="accent-color:#2563eb"> Include price</label>
            <label class="flex items-center gap-2 text-xs text-gray-300"><input type="checkbox" id="rule-link" ${t.include_link!==!1?"checked":""} style="accent-color:#2563eb"> Include product link</label>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
          <button onclick="document.querySelector('.modal-overlay').remove()" class="btn-press px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5 transition">Cancel</button>
          <button onclick="window.socialSaveRule('${t.id}')" class="btn-press px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition">Save Rule</button>
        </div>
      </div>
    </div>`,document.getElementById("modal-container").appendChild(i),socialRuleSchedChange(),socialRuleContentChange(),N()};window.socialRuleSchedChange=function(){const e=document.getElementById("rule-sched")?.value||"daily",t=document.getElementById("sched-days-wrap"),a=document.getElementById("sched-interval-wrap"),i=document.getElementById("sched-time-wrap");t.style.display=e==="weekly"?"block":"none",a.style.display=e==="interval"?"block":"none",i.style.display=e==="hourly"||e==="interval"||e==="custom"||e==="weekly"?"none":"block",e==="weekly"&&(t.style.display="block")};window.socialRuleContentChange=function(){const e=document.getElementById("rule-content")?.value||"products";document.getElementById("rule-selected-wrap").classList.toggle("hidden",e!=="selected_products")};window.socialSaveRule=async function(e){try{const t=Array.from(document.querySelectorAll("#rule-platforms option:checked")).map(d=>d.value),a=Array.from(document.querySelectorAll(".rule-day:checked")).map(d=>d.value),i=Array.from(document.querySelectorAll(".rule-sel:checked")).map(d=>d.value);if(!t.length)return w("Select at least one platform.","error");const o=document.getElementById("rule-sched").value;let s=document.getElementById("rule-time")?.value||"09:00",r=Number(document.getElementById("rule-interval")?.value)||24;const l={name:document.getElementById("rule-name").value.trim()||"Automation rule",enabled:!1,paused:!1,platforms:t,content_type:document.getElementById("rule-content").value,selected_ids:i,schedule_type:o,schedule_time:s,schedule_days:o==="weekly"?a:["mon","tue","wed","thu","fri","sat","sun"],interval_hours:r,max_posts_per_day:Number(document.getElementById("rule-max").value)||1,approval_mode:document.getElementById("rule-approval").value,caption_template:document.getElementById("rule-caption").value||`{{title}}
{{price}}
{{link}}`,hashtags:document.getElementById("rule-hashtags").value.trim(),include_price:document.getElementById("rule-price").checked,include_link:document.getElementById("rule-link").checked,next_run_at:new Date().toISOString()};e?await c.from("social_automation_rules").update(l).eq("id",e):await c.from("social_automation_rules").insert(l),document.querySelector(".modal-overlay")?.remove(),w("Rule saved. Enable it when ready."),He(document.getElementById("social-body"))}catch(t){w(t.message,"error")}};let v={sourceType:"product",sourceId:"",caption:"",hashtags:"",platform:"",media:[],linkUrl:"",allowDuplicate:!1};async function Na(e){try{const t=await fe(),a=(t.platforms||[]).filter(d=>d.connected&&d.enabled),i=(t.accounts||[]).filter(d=>d.status==="connected"),{data:o}=await c.from("showroom_listings").select("property_id,title,category,price,currency,images,video_url,listing_type").eq("is_active",!0).limit(600),{data:s}=await c.from("promotions").select("id,title,image_url,video_url").eq("is_active",!0).limit(50),{data:r}=await c.from("social_content_items").select("*").order("created_at",{ascending:!1}).limit(50),{data:l}=await c.from("social_posts").select("*").eq("status","draft").order("created_at",{ascending:!1}).limit(40);v.platform=v.platform||a[0]?.id||"",v.sourceType=v.sourceType||(l?.length?"draft":"product"),e.innerHTML=`
      <div class="grid lg:grid-cols-3 gap-4">
        <div class="lg:col-span-1 glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="file-edit" class="w-4 h-4 text-blue-400"></i> 1 · Content</h3>

          <div><label class="lbl">Source</label>
            <select id="mp-source" onchange="window.socialManualSource()" class="input-field">
              <option value="product" ${v.sourceType==="product"?"selected":""}>Marketplace product</option>
              <option value="promo" ${v.sourceType==="promo"?"selected":""}>Promotion</option>
              <option value="content" ${v.sourceType==="content"?"selected":""}>News / article (Content Item)</option>
              <option value="text" ${v.sourceType==="text"?"selected":""}>Custom text / announcement</option>
              <option value="draft" ${v.sourceType==="draft"?"selected":""}>Saved draft</option>
            </select>
          </div>

          <div id="mp-source-picker">${ro(v.sourceType,o,s,r,l)}</div>

          <div><label class="lbl">Caption</label><textarea id="mp-caption" class="input-field" placeholder="Write your post caption…">${y(v.caption)}</textarea></div>
          <div><label class="lbl">Hashtags</label><input id="mp-hashtags" class="input-field" value="${y(v.hashtags)}" placeholder="#newarrival #marketplace"></div>
          <div><label class="lbl">Link (optional)</label><input id="mp-link" class="input-field" value="${y(v.linkUrl)}" placeholder="https://…"></div>

          <div>
            <label class="lbl">Media</label>
            <div id="mp-media" class="space-y-2">${v.media.length?v.media.map((d,u)=>Oa(d,u)).join(""):'<p class="text-[11px] text-gray-500">Media auto-fills from the source. Add extra image/video below.</p>'}</div>
            <div class="flex gap-2 mt-2">
              <input id="mp-media-url" class="input-field !text-xs !py-2" placeholder="Image/video URL…">
              <button onclick="window.socialAddMediaUrl()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 transition">Add</button>
            </div>
            <input type="file" id="mp-file" accept="image/*,video/*" class="hidden" onchange="window.socialAddMediaFile(event)">
            <button onclick="document.getElementById('mp-file').click()" class="btn-press w-full mt-2 py-2 rounded-xl text-xs font-bold bg-white/[.03] border border-white/10 text-gray-300 hover:border-blue-500/30 transition"><i data-lucide="upload" class="w-3.5 h-3.5 inline mr-1"></i>Upload image / video (stored in Secure Cloud Storage)</button>
          </div>
        </div>

        <div class="lg:col-span-1 glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="share-2" class="w-4 h-4 text-blue-400"></i> 2 · Platforms</h3>
          <p class="text-[11px] text-gray-500">Only connected accounts can receive posts.</p>
          <div id="mp-platforms" class="space-y-2">
            ${a.length?a.map(d=>`
              <label class="flex items-center gap-3 p-3 rounded-xl bg-white/[.03] border ${v.platform===d.id?"border-blue-500/50":"border-white/10"} cursor-pointer transition" onclick="window.socialManualPlatform('${d.id}')">
                <input type="radio" name="mp-p" class="accent-blue-600" ${v.platform===d.id?"checked":""}>
                <i data-lucide="${ie(d.id)}" class="w-4 h-4 ${G[d.id]?.tone||""}"></i>
                <span class="text-xs font-bold text-white flex-1">${y(q(d.id))}</span>
                <span class="text-[10px] text-gray-500">${y(d.capability)}</span>
              </label>`).join(""):ae("Connect at least one account first.","plug-zap")}
          </div>
          <button onclick="window.socialNav('accounts')" class="btn-press w-full py-2.5 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 transition mt-2">Manage accounts</button>
        </div>

        <div class="lg:col-span-1 glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="eye" class="w-4 h-4 text-blue-400"></i> 3 · Preview & Publish</h3>
          <div id="mp-preview" class="border border-white/10 rounded-2xl overflow-hidden bg-black/30">
            ${Ha(v.media,v.caption,v.hashtags,v.platform)}
          </div>
          <label class="flex items-center gap-2 text-xs text-gray-300 mt-3"><input type="checkbox" id="mp-dup" ${v.allowDuplicate?"checked":""} style="accent-color:#2563eb"> Allow duplicate (bypass duplicate-post protection)</label>
          <div class="grid grid-cols-2 gap-2 mt-3">
            <button onclick="window.socialManualGo('publish_now')" class="btn-press py-3 rounded-xl text-xs font-black bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition"><i data-lucide="send" class="w-4 h-4 inline mr-1"></i>Publish Now</button>
            <button onclick="window.socialManualGo('draft')" class="btn-press py-3 rounded-xl text-xs font-bold bg-white/[.04] border border-white/10 text-gray-300 hover:border-blue-500/30 transition"><i data-lucide="save" class="w-4 h-4 inline mr-1"></i>Save Draft</button>
          </div>
          <button onclick="window.socialManualGo('schedule')" class="btn-press w-full py-3 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition"><i data-lucide="calendar-clock" class="w-4 h-4 inline mr-1"></i>Schedule for Later
            <input id="mp-when" type="datetime-local" class="input-field !mt-2 !py-2 !text-xs"></button>
        </div>
      </div>`,N()}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${y(t.message)}</div>`}}function ro(e,t,a,i,o){return e==="product"?`<div class="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto scrollbar-thin border border-white/10 rounded-xl p-2 bg-white/[.02]">
      ${(t||[]).map(s=>`<button data-pid="${y(s.property_id)}" onclick="window.socialPickProduct('${y(s.property_id)}', this)" class="btn-press text-left p-2 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 hover:text-white border border-transparent hover:border-blue-500/30 transition truncate">${y(s.title)}</button>`).join("")||'<p class="text-xs text-gray-500 p-2">No active products.</p>'}
    </div>`:e==="promo"?`<div class="space-y-2 max-h-44 overflow-y-auto scrollbar-thin">
      ${(a||[]).map(s=>`<button data-pid="${y(s.id)}" onclick="window.socialPickPromo('${y(s.id)}', this)" class="btn-press w-full text-left p-2.5 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 transition border border-white/5">${y(s.title||s.id)}</button>`).join("")||'<p class="text-xs text-gray-500 p-2">No active promotions.</p>'}
    </div>`:e==="content"?`<div class="space-y-2 max-h-44 overflow-y-auto scrollbar-thin">
      ${(i||[]).map(s=>`<button data-pid="${y(s.id)}" onclick="window.socialPickContent('${y(s.id)}', this)" class="btn-press w-full text-left p-2.5 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 transition border border-white/5">${y(s.title)}</button>`).join("")||'<p class="text-xs text-gray-500 p-2">No content items. Add them under Platform Settings → News / Articles.</p>'}
    </div>`:e==="draft"?`<div class="space-y-2 max-h-44 overflow-y-auto scrollbar-thin">
      ${(o||[]).map(s=>`<button onclick="window.socialLoadDraft('${y(s.id)}')" class="btn-press w-full text-left p-2.5 rounded-lg text-[11px] text-gray-300 hover:bg-blue-500/10 transition border border-white/5"><b>${y(q(s.platform))}</b> · ${y((s.caption||"").slice(0,40))}</button>`).join("")||'<p class="text-xs text-gray-500 p-2">No drafts.</p>'}
    </div>`:`<p class="text-[11px] text-gray-500">Write a custom announcement — remember to comply with each platform's rules.</p>`}window.socialManualSource=function(){v.sourceType=document.getElementById("mp-source").value,v.caption="",v.linkUrl="",v.media=[],Na(document.getElementById("social-body"))};window.socialPickProduct=function(e,t){c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle().then(({data:a})=>{if(!a)return;v.sourceId=e,v.linkUrl=`${window.location.origin}/product/${encodeURIComponent(e)}`;const i=Array.isArray(a.images)?a.images.filter(r=>/^https?:\/\//i.test(r)).slice(0,6).map(r=>({url:r,type:"image"})):[];a.video_url&&/^https?:\/\//i.test(a.video_url)&&i.push({url:a.video_url,type:"video"}),v.media=i;const o=a.currency||"USD",s=a.price!=null?`${Number(a.price).toLocaleString("en-US")} ${o}`:"";v.caption=`${a.title}
${s?`${s}
`:""}${v.linkUrl}`,document.getElementById("mp-caption").value=v.caption,document.getElementById("mp-link").value=v.linkUrl,he(),pe(),document.querySelectorAll("#mp-source-picker button").forEach(r=>{r.classList.remove("bg-blue-500/10","text-white","border-blue-500/30"),r.classList.add("border-transparent")}),t&&(t.classList.add("bg-blue-500/10","text-white","border-blue-500/30"),t.classList.remove("border-transparent"))})};window.socialPickPromo=function(e,t){c.from("promotions").select("*").eq("id",e).maybeSingle().then(({data:a})=>{a&&(v.sourceType="promo",v.sourceId=e,v.media=[],a.image_url&&/^https?:\/\//i.test(a.image_url)&&v.media.push({url:a.image_url,type:"image"}),a.video_url&&/^https?:\/\//i.test(a.video_url)&&v.media.push({url:a.video_url,type:"video"}),v.caption=a.title||"Special offer",document.getElementById("mp-caption").value=v.caption,he(),pe())})};window.socialPickContent=function(e,t){c.from("social_content_items").select("*").eq("id",e).maybeSingle().then(({data:a})=>{a&&(v.sourceType="content",v.sourceId=e,v.media=[],a.image_url&&/^https?:\/\//i.test(a.image_url)&&v.media.push({url:a.image_url,type:"image"}),a.video_url&&/^https?:\/\//i.test(a.video_url)&&v.media.push({url:a.video_url,type:"video"}),v.caption=`${a.title}
${a.body||""}`.trim(),v.linkUrl=a.link_url||"",document.getElementById("mp-caption").value=v.caption,document.getElementById("mp-link").value=v.linkUrl,he(),pe())})};window.socialLoadDraft=async function(e){const{data:t}=await c.from("social_posts").select("*").eq("id",e).maybeSingle();t&&(window.socialNav("manual"),setTimeout(()=>{v={sourceType:"text",sourceId:t.id,caption:t.caption||"",hashtags:(t.hashtags||"").replace(/#/g,""),platform:t.platform,media:Array.isArray(t.media)?t.media:[],linkUrl:t.metadata?.link_url||"",allowDuplicate:!0},document.getElementById("mp-caption").value=v.caption,document.getElementById("mp-hashtags").value=v.hashtags,document.getElementById("mp-link").value=v.linkUrl,he(),pe()},200))};window.socialManualPlatform=function(e){v.platform=e,document.querySelectorAll("#mp-platforms label").forEach((a,i,o)=>{a.classList.toggle("border-blue-500/50",a.querySelector(".accent-blue-600")?.value===e)}),document.querySelectorAll("#mp-platforms label").forEach(a=>a.classList.remove("border-blue-500/50"));const t=Array.from(document.querySelectorAll("#mp-platforms label")).find(a=>a.textContent.includes(q(e)));t&&t.classList.add("border-blue-500/50"),pe()};window.socialAddMediaUrl=function(){const e=document.getElementById("mp-media-url").value.trim();if(!e)return;const t=/\.(mp4|webm|mov|m4v)(\?|$)/i.test(e)?"video":"image";v.media.push({url:e,type:t}),document.getElementById("mp-media-url").value="",he(),pe()};window.socialAddMediaFile=async function(e){const t=e.target.files?.[0];if(t){try{w("Uploading media…","info");const a=await to(t);v.media.push(a),he(),pe(),w("Media added.")}catch(a){w(a.message,"error")}e.target.value=""}};function Oa(e,t){return`<div class="flex items-center gap-2 p-2 rounded-lg bg-white/[.03] border border-white/10">
    ${e.type==="video"?'<i data-lucide="video" class="w-4 h-4 text-violet-300 shrink-0"></i>':'<i data-lucide="image" class="w-4 h-4 text-emerald-300 shrink-0"></i>'}
    <span class="text-[11px] text-gray-400 truncate flex-1">${y(e.url)}</span>
    <button onclick="window.socialRemoveMedia(${t})" class="p-1 text-red-400 hover:text-red-300"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
  </div>`}window.socialRemoveMedia=function(e){v.media.splice(e,1),he(),pe()};function he(){const e=document.getElementById("mp-media");e&&(e.innerHTML=v.media.length?v.media.map(Oa).join(""):'<p class="text-[11px] text-gray-500">No media. Add an image or video URL, or upload a file.</p>'),N()}function Ha(e,t,a,i){const o=e?.[0],s=[t,a?a.split(/[ ,]+/).map(r=>"#"+r.replace(/^#/,"")).join(" "):""].filter(Boolean).join(`
`);return`
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><i data-lucide="${ie(i)}" class="w-4 h-4 text-blue-300"></i></div>
        <p class="text-[11px] font-bold text-gray-300">${y(q(i)||"Select a platform")}</p>
      </div>
      ${o?o.type==="video"?`<video src="${y(o.url)}" class="w-full rounded-xl max-h-40 object-cover" controls muted></video>`:`<img src="${y(o.url)}" class="w-full rounded-xl max-h-40 object-cover" onerror="this.style.display='none'">`:'<div class="w-full h-24 rounded-xl bg-white/5 flex items-center justify-center"><span class="text-[11px] text-gray-600">No media</span></div>'}
      <p class="text-xs text-gray-300 whitespace-pre-wrap break-words max-h-32 overflow-y-auto scrollbar-thin">${y(s||"Your caption will appear here…")}</p>
    </div>`}function pe(){v.caption=document.getElementById("mp-caption")?.value??v.caption,v.hashtags=document.getElementById("mp-hashtags")?.value??v.hashtags;const e=document.getElementById("mp-preview");e&&(e.innerHTML=Ha(v.media,v.caption,v.hashtags,v.platform)),N()}function no(){v.caption=document.getElementById("mp-caption")?.value||"",v.hashtags=document.getElementById("mp-hashtags")?.value||"",v.linkUrl=document.getElementById("mp-link")?.value||"",v.allowDuplicate=document.getElementById("mp-dup")?.checked||!1;const e=v.hashtags.split(/[\s,]+/).filter(Boolean).map(t=>t.replace(/^#/,"")).filter(Boolean);return{platform:v.platform,caption:v.caption,hashtags:e,media:v.media,linkUrl:v.linkUrl,contentType:v.sourceType==="draft"?"manual":v.sourceType,sourceType:lo(v.sourceType),sourceId:v.sourceId,allowDuplicate:v.allowDuplicate}}function lo(e){return e==="promo"?"promotions":e==="content"?"social_content_item":e==="product"?"showroom_listing":null}window.socialManualGo=async function(e){const t=no();if(!t.platform)return w("Select a platform first.","error");if(!t.caption.trim()&&t.sourceType==="text")return w("Write a caption.","error");if(t.sourceType==="showroom_listing"&&!t.sourceId)return w("Pick a product first.","error");if(v.sourceType==="draft"&&v.sourceId)try{await ue("/api/social/posts",{method:"POST",body:JSON.stringify({action:"trigger",post_id:v.sourceId})}),w("Draft published."),window.socialNav("published");return}catch(a){return w(a.message,"error")}if(e==="schedule"){const a=document.getElementById("mp-when")?.value;if(!a)return w("Choose a date and time to schedule.","error");t.mode="schedule",t.scheduledFor=new Date(a).toISOString()}else e==="draft"?t.mode="draft":t.mode="publish_now";try{const a=document.getElementById("social-body")?.querySelector("button");a&&(a.disabled=!0);const i=await ue("/api/social/publish",{method:"POST",body:JSON.stringify(t)});w(i.message||"Done."),v.media=[],window.socialNav(e==="publish_now"?"published":e==="schedule"?"schedule":"queue")}catch(a){w(a.message,"error")}};async function co(e){try{const[t,a]=await Promise.all([c.from("social_automation_rules").select("*").eq("enabled",!0).order("next_run_at"),c.from("social_posts").select("*").eq("status","scheduled").order("scheduled_for")]),i=t.data||[],o=a.data||[];e.innerHTML=`
      <div class="space-y-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="bot" class="w-4 h-4 text-blue-400"></i> Automation Schedules (server-driven)</h3>
          ${i.length?i.map(s=>`
            <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
              <i data-lucide="bot" class="w-4 h-4 text-blue-400"></i>
              <div class="flex-1 min-w-0"><p class="text-xs font-bold text-white truncate">${y(s.name)}</p><p class="text-[11px] text-gray-500">${y((s.platforms||[]).map(q).join(", "))} · ${y(Ua(s))}</p></div>
              <div class="text-right"><p class="text-[11px] font-bold text-emerald-300">${s.next_run_at?re(s.next_run_at):"pending"}</p><p class="text-[10px] text-gray-500">next run</p></div>
            </div>`).join(""):ae("No enabled automation rules. Enable rules under Automatic Posting.","bot")}
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="calendar-clock" class="w-4 h-4 text-amber-300"></i> Manually Scheduled Posts</h3>
          ${o.length?o.map(s=>`
            <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
              <i data-lucide="${ie(s.platform)}" class="w-4 h-4 ${G[s.platform]?.tone||""}"></i>
              <div class="flex-1 min-w-0"><p class="text-xs font-bold text-white truncate">${q(s.platform)}${s.caption?" · "+y(s.caption.slice(0,70)):""}</p><p class="text-[11px] text-gray-500">Scheduled ${re(s.scheduled_for)}</p></div>
              <div class="flex gap-2">
                <button onclick="window.socialPostAction('${s.id}','trigger')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Publish now</button>
                <button onclick="window.socialPostAction('${s.id}','cancel')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition">Cancel</button>
              </div>
            </div>`).join(""):ae("Nothing scheduled yet. Use Manual Posting → Schedule for Later.","calendar-clock")}
        </div>
      </div>`,N()}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${y(t.message)}</div>`}}async function ea(e){const{data:t}=await c.from("social_posts").select("*").in("status",["draft","queued","publishing"]).order("created_at",{ascending:!0}),a=t||[],i={draft:a.filter(o=>o.status==="draft"),queued:a.filter(o=>o.status==="queued"),publishing:a.filter(o=>o.status==="publishing")};e.innerHTML=`
    <div class="space-y-4">
      ${["publishing","queued","draft"].map(o=>`
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="${o==="draft"?"hourglass":o==="queued"?"list-checks":"loader-2"}" class="w-4 h-4 ${o==="draft"?"text-violet-300":o==="queued"?"text-sky-300":"text-violet-300"}"></i> ${o==="draft"?"Awaiting Approval (drafts)":o==="queued"?"Queued":"Publishing"}</h3>
            <span class="badge bg-blue-500/10 text-blue-300 border-blue-500/20">${i[o].length}</span>
          </div>
          ${i[o].length?i[o].map(s=>uo(s)).join(""):'<p class="text-[11px] text-gray-600 py-2">Empty.</p>'}
        </div>`).join("")}
    </div>`,N()}function uo(e){const t=e.status==="draft";return`
    <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
      <i data-lucide="${ie(e.platform)}" class="w-4 h-4 ${G[e.platform]?.tone||""} shrink-0"></i>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-white truncate">${q(e.platform)}${e.caption?" · "+y(e.caption.slice(0,60)):""}</p>
        <p class="text-[11px] text-gray-500">${y(e.source_type||"manual")} · ${t?"auto-generated, needs approval":e.auto_generated?"automatic":"manual"} · ${re(e.created_at)}</p>
      </div>
      <div class="flex gap-2 flex-wrap justify-end">
        ${e.scheduled_for?`<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">${re(e.scheduled_for)}</span>`:""}
        ${t?`<button onclick="window.socialApprove('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Approve & publish</button>`:""}
        ${!t&&e.status==="queued"?`<button onclick="window.socialPostAction('${e.id}','trigger')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Publish now</button>`:""}
        <button onclick="window.socialPostAction('${e.id}','cancel')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition">Cancel</button>
        <button onclick="window.socialPostAction('${e.id}','delete')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/25 hover:bg-gray-500/20 transition">Delete</button>
      </div>
    </div>`}window.socialApprove=async function(e){const{error:t}=await c.from("social_posts").update({status:"queued",updated_at:new Date().toISOString()}).eq("id",e);if(t)return w(t.message,"error");w("Approved. It will publish on the next scheduler tick (or click Publish now)."),ea(document.getElementById("social-body"))};window.socialPostAction=async function(e,t){try{if(t==="delete"&&!confirm("Delete this post record?"))return;await ue("/api/social/posts",{method:"POST",body:JSON.stringify({action:t,post_id:e})}),w({trigger:"Published!",retry:"Retried.",cancel:"Cancelled.",delete:"Deleted."}[t]||"Done.");const a=document.getElementById("social-body");a&&(t==="trigger"||t==="retry")?window.socialNav("published"):ea(a)}catch(a){w(a.message,"error")}};async function po(e){const{data:t}=await c.from("social_posts").select("*").eq("status","published").order("published_at",{ascending:!1}).limit(200),a=t||[];e.innerHTML=`
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
      <div class="flex items-center justify-between"><h3 class="text-sm font-black text-white"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 inline mr-1.5"></i>Published Posts</h3><span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30">${a.length}</span></div>
      ${a.length?`<div class="space-y-2">${a.map(bo).join("")}</div>`:ae("No published posts yet. Post manually or enable automation.","check-circle-2")}
    </div>`,N()}function bo(e){const t=(e.media||[])[0];return`
    <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
      ${t?t.type==="video"?`<video src="${y(t.url)}" class="w-10 h-10 rounded-lg object-cover shrink-0"></video>`:`<img src="${y(t.url)}" class="w-10 h-10 rounded-lg object-cover shrink-0" onerror="this.style.display='none'">`:`<div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="${ie(e.platform)}" class="w-4 h-4 ${G[e.platform]?.tone||""}"></i></div>`}
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-white truncate">${q(e.platform)} · ${e.auto_generated?"automatic":"manual"}${e.content_type!=="manual"?" · "+y(e.content_type):""}</p>
        <p class="text-[11px] text-gray-500 truncate">${y(e.caption||"(no caption)")}</p>
        <p class="text-[10px] text-gray-600">${re(e.published_at)}${e.platform_post_id?" · id "+y(e.platform_post_id):""}</p>
      </div>
      <div class="flex gap-2 flex-wrap justify-end">
        ${e.platform_post_url?`<a href="${y(e.platform_post_url)}" target="_blank" rel="noopener" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition">View</a>`:""}
        <button onclick="window.socialPostAction('${e.id}','delete')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/25 hover:bg-gray-500/20 transition">Delete</button>
      </div>
    </div>`}async function mo(e){const{data:t}=await c.from("social_posts").select("*").eq("status","failed").order("updated_at",{ascending:!1}).limit(200),a=t||[];e.innerHTML=`
    <div class="glass-soft border border-red-500/20 rounded-2xl p-5 space-y-3">
      <div class="flex items-center justify-between"><h3 class="text-sm font-black text-white"><i data-lucide="alert-triangle" class="w-4 h-4 text-red-400 inline mr-1.5"></i>Failed Posts</h3><span class="badge bg-red-500/15 text-red-300 border-red-500/30">${a.length}</span></div>
      ${a.length?a.map(go).join(""):ae("No failed posts.","check-circle-2")}
    </div>`,N()}function go(e){const t=e.next_retry_at;return`
    <div class="p-3 rounded-xl bg-red-500/[.04] border border-red-500/20 space-y-2">
      <div class="flex items-center gap-3">
        <i data-lucide="${ie(e.platform)}" class="w-4 h-4 ${G[e.platform]?.tone||""} shrink-0"></i>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-white truncate">${q(e.platform)} · attempt ${e.retry_count||0}${e.max_retries?" / "+e.max_retries:""}</p>
          <p class="text-[11px] text-gray-500 truncate">${y(e.caption||"(no caption)")}</p>
        </div>
        <div class="flex gap-2 flex-wrap justify-end">
          <button onclick="window.socialPostAction('${e.id}','retry')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition">Retry now</button>
          <button onclick="window.socialPostAction('${e.id}','delete')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/25 hover:bg-gray-500/20 transition">Delete</button>
        </div>
      </div>
      <p class="text-[11px] text-red-300/90 break-words">${y(e.last_error||"Unknown error")}</p>
      ${t?`<p class="text-[10px] text-amber-300/80">Auto-retry scheduled: ${re(t)}.</p>`:""}
    </div>`}async function yo(e){const[t,a]=await Promise.all([c.from("social_post_logs").select("*").order("created_at",{ascending:!1}).limit(300),c.from("social_posts").select("id,caption,platform")]),i=t.data||[],o=new Map((a.data||[]).map(r=>[r.id,r])),s={info:"text-sky-300",warn:"text-amber-300",error:"text-red-300"};e.innerHTML=`
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
      <div class="flex items-center justify-between"><h3 class="text-sm font-black text-white"><i data-lucide="scroll-text" class="w-4 h-4 text-blue-400 inline mr-1.5"></i>Post Logs</h3><span class="badge bg-blue-500/10 text-blue-300 border-blue-500/20">${i.length}</span></div>
      <div class="space-y-1.5 max-h-[65vh] overflow-y-auto scrollbar-thin">${i.map(r=>{const l=o.get(r.post_id);return`<div class="p-2.5 rounded-xl bg-white/[.02] border border-white/5 flex items-start gap-3">
          <span class="badge ${s[r.level]||s.info} border-transparent !text-[10px]">${y(r.level)}</span>
          <div class="flex-1 min-w-0">
            <p class="text-[11px] text-gray-300 break-words">${y(r.message)}</p>
            <p class="text-[10px] text-gray-600">${re(r.created_at)}${l?" · "+y(q(l.platform))+(l.caption?" · "+y(l.caption.slice(0,50)):""):""}</p>
          </div>
        </div>`}).join("")||ae("No logs yet.","scroll-text")}</div>
    </div>`,N()}let lt=[];async function dt(e){try{const t=await fe(),{data:a}=await c.from("social_platform_settings").select("*").order("platform");lt=a||[];const{data:i}=await c.from("social_content_items").select("*").order("created_at",{ascending:!1});e.innerHTML=`
      ${ho()}
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        ${(t.platforms||[]).map(o=>vo(o)).join("")}
      </div>
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3 mt-4">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="newspaper" class="w-4 h-4 text-blue-400"></i> News / Articles (Content Items for Auto Posting)</h3>
          <button onclick="window.socialNewContentItem()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 transition"><i data-lucide="plus" class="w-3.5 h-3.5 inline mr-1"></i>New item</button>
        </div>
        ${(i||[]).length?(i||[]).map(fo).join(""):ae('Add news/article items to make them available for the automatic publisher (content type "News / articles").',"newspaper")}
      </div>`,N()}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${y(t.message)}</div>`}}function fo(e){return`<div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
    ${e.image_url?`<img src="${y(e.image_url)}" class="w-10 h-10 rounded-lg object-cover shrink-0" onerror="this.style.display='none'">`:'<i data-lucide="newspaper" class="w-4 h-4 text-blue-400 shrink-0"></i>'}
    <div class="flex-1 min-w-0"><p class="text-xs font-bold text-white truncate">${y(e.title)}</p><p class="text-[11px] text-gray-500 truncate">${y((e.body||"").slice(0,60))}</p></div>
    <span class="badge ${e.is_active?"bg-emerald-500/15 text-emerald-300 border-emerald-500/30":"bg-gray-500/15 text-gray-400 border-gray-500/30"}">${e.is_active?"active":"inactive"}</span>
    <button onclick="window.socialToggleContentItem('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${e.is_active?"bg-amber-500/10 text-amber-300":"bg-emerald-500/15 text-emerald-300"} transition">${e.is_active?"Deactivate":"Activate"}</button>
    <button onclick="window.socialDeleteContentItem('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition">Delete</button>
  </div>`}window.socialNewContentItem=function(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`<div class="modal-box">
    <div class="flex items-center justify-between mb-4"><h3 class="text-base font-black text-white">New News / Article Item</h3><button onclick="this.closest('.modal-overlay').remove()" class="p-2 rounded-lg text-gray-400 hover:bg-white/5"><i data-lucide="x" class="w-4 h-4"></i></button></div>
    <div class="space-y-3">
      <div><label class="lbl">Title *</label><input id="ci-title" class="input-field" placeholder="Article title"></div>
      <div><label class="lbl">Body</label><textarea id="ci-body" class="input-field" placeholder="Article summary / text…"></textarea></div>
      <div><label class="lbl">Image URL</label><input id="ci-image" class="input-field" placeholder="https://…"></div>
      <div><label class="lbl">Video URL</label><input id="ci-video" class="input-field" placeholder="https://…"></div>
      <div><label class="lbl">Link URL</label><input id="ci-link" class="input-field" placeholder="https://…"></div>
      <div class="flex justify-end gap-2 pt-3 border-t border-white/10">
        <button onclick="this.closest('.modal-overlay').remove()" class="btn-press px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5">Cancel</button>
        <button onclick="window.socialSaveContentItem()" class="btn-press px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white">Save item</button>
      </div>
    </div></div>`,document.getElementById("modal-container").appendChild(e),N()};window.socialSaveContentItem=async function(){const e=document.getElementById("ci-title").value.trim();if(!e)return w("Title is required.","error");const{error:t}=await c.from("social_content_items").insert({title:e,body:document.getElementById("ci-body").value,image_url:document.getElementById("ci-image").value.trim(),video_url:document.getElementById("ci-video").value.trim(),link_url:document.getElementById("ci-link").value.trim(),is_active:!0});if(t)return w(t.message,"error");document.querySelector(".modal-overlay")?.remove(),w("Content item saved."),dt(document.getElementById("social-body"))};window.socialToggleContentItem=async function(e){const{data:t}=await c.from("social_content_items").select("is_active").eq("id",e).maybeSingle();if(!t)return w("Item not found.","error");const{error:a}=await c.from("social_content_items").update({is_active:!t.is_active}).eq("id",e);if(a)return w(a.message,"error");w("Updated."),dt(document.getElementById("social-body"))};window.socialDeleteContentItem=async function(e){confirm("Delete this content item?")&&(await c.from("social_content_items").delete().eq("id",e),w("Deleted."),dt(document.getElementById("social-body")))};function ho(){return`
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3 mb-4">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0"><i data-lucide="music-2" class="w-5 h-5 text-white"></i></div>
        <div class="min-w-0 flex-1">
          <h3 class="text-sm font-black text-white">TikTok Developer Connection — official setup</h3>
          <p class="text-xs text-gray-500 leading-relaxed mt-1">Create your TikTok app <b class="text-gray-300">externally</b> on the official <a href="https://developers.tiktok.com/app/" target="_blank" rel="noopener" class="text-blue-400 underline hover:text-blue-300">TikTok Developer Portal</a>. This dashboard then connects to it through the official API — no password collection, no fake developer tools.</p>
          <ol class="text-[11px] text-gray-400 space-y-1 mt-2 list-decimal list-inside">
            <li>Sign in at developers.tiktok.com → <b>Manage apps</b> → create your app (must contain your TikTok Business account).</li>
            <li>Under your app, enable the scopes <b>user.info.basic</b>, <b>video.upload</b> and <b>video.publish</b>.</li>
            <li>Add this exact redirect/callback URL to your app:</li>
          </ol>
          <div class="mt-2 flex items-center gap-2">
            <code class="text-[11px] text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 flex-1 break-all">/api/social/oauth/callback?platform=tiktok</code>
            <button onclick="window.socialCopy(this)" data-text="${y(`${window.location.origin}/api/social/oauth/callback?platform=tiktok`)}" class="btn-press px-3 py-2 rounded-lg text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition">Copy</button>
          </div>
          <ol class="text-[11px] text-gray-400 space-y-1 mt-2 list-decimal list-inside" start="4">
            <li>Copy your <b>Client Key</b> and <b>Client Secret</b> into the server environment variables <code class="text-[11px] text-green-300">TIKTOK_CLIENT_KEY</code> and <code class="text-[11px] text-green-300">TIKTOK_CLIENT_SECRET</code> (Vercel → project → Settings → Environment Variables). Never put them in browser code.</li>
            <li>Submit your app for <b>Content Posting / app review</b> if you want public posting — until then TikTok publishes as <i>SELF_ONLY</i> and you control privacy below.</li>
            <li>Come back to <b>Connected Accounts</b> → <b>Connect TikTok</b> to authorize your account via official OAuth.</li>
          </ol>
          <p class="text-[10px] text-amber-300/90 mt-2"><i data-lucide="shield-check" class="w-3 h-3 inline mr-1"></i>Nothing is posted automatically until you connect an account, enable automation, and the server-side scheduler runs.</p>
        </div>
      </div>
    </div>`}function vo(e){const t=lt.find(i=>i.platform===e.id)||{},a=t.config||{};return e.account,`
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-4 space-y-3">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0"><i data-lucide="${ie(e.id)}" class="w-4 h-4 ${G[e.id]?.tone||""}"></i><p class="text-xs font-black text-white truncate">${y(e.label)}</p></div>
        <label class="toggle-switch"><input type="checkbox" data-platform="ps-${e.id}" ${t.enabled===!1?"":"checked"} onchange="window.socialTogglePlatform('${e.id}', this.checked)"><span class="toggle-slider"></span></label>
      </div>
      ${e.requiresApproval?`<div class="flex items-start gap-2 p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-300 shrink-0 mt-0.5"></i><p class="text-[11px] text-amber-200 leading-relaxed">${y(e.approvalNote||"This platform requires approval / business verification / paid access.")}</p></div>`:""}
      ${e.configured?"":'<p class="text-[10px] text-amber-300/90">API credentials not configured server-side yet (see .env.example).</p>'}
      <div class="grid grid-cols-2 gap-2">
        <div><label class="lbl">Max / day</label><input type="number" class="input-field !text-xs !py-2" value="${y(t.max_posts_per_day??e.maxPostsPerDay??5)}" min="0" onchange="window.socialSavePlatform('${e.id}')" data-f="max_posts_per_day"></div>
        <div><label class="lbl">Min interval (min)</label><input type="number" class="input-field !text-xs !py-2" value="${y(t.min_interval_minutes??60)}" min="0" onchange="window.socialSavePlatform('${e.id}')" data-f="min_interval_minutes"></div>
      </div>
      ${xo(e.id,a,e)}
      <div class="flex gap-2 flex-wrap">
        ${e.connected?'<span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30">connected</span>':e.usesOAuth?'<span class="badge bg-gray-500/10 text-gray-400 border-gray-500/20">not connected</span>':""}
        ${e.usesOAuth?`<button onclick="window.socialConnect('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${e.connected?"bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20":"bg-gradient-to-r from-blue-600 to-blue-700 text-white"} transition">${e.connected?"Reconnect":"Connect account"}</button>`:`<button onclick="window.socialConnect('${e.id}')" class="btn-press px-3 py-1.5 rounded-lg text-[11px] font-bold ${e.connected?"bg-blue-500/10 text-blue-300":"bg-gradient-to-r from-blue-600 to-blue-700 text-white"} transition">${e.connected?"Reconnect":"Connect"}</button>`}
      </div>
    </div>`}function xo(e,t,a){const i=[];if(e==="tiktok"&&i.push(`<div><label class="lbl">Post privacy</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${e}')" data-f="tiktok_privacy_level">
      <option value="SELF_ONLY" ${(t.tiktok_privacy_level||"SELF_ONLY")==="SELF_ONLY"?"selected":""}>SELF_ONLY (recommended until app approved)</option>
      <option value="PUBLIC_TO_EVERYONE" ${t.tiktok_privacy_level==="PUBLIC_TO_EVERYONE"?"selected":""}>PUBLIC (requires app approval)</option>
    </select></div>`),e==="telegram"&&i.push(`<div class="col-span-2"><label class="lbl">Destination chat / channel (@id or numeric)</label><input class="input-field !text-xs !py-2" value="${y(t.telegram_chat_id||"")}" onchange="window.socialSavePlatform('${e}')" data-f="telegram_chat_id" placeholder="@yourchannel"></div>`),e==="whatsapp"&&i.push(`
      <div><label class="lbl">Phone number ID</label><input class="input-field !text-xs !py-2" value="${y(t.whatsapp_phone_id||"")}" onchange="window.socialSavePlatform('${e}')" data-f="whatsapp_phone_id"></div>
      <div><label class="lbl">Recipient number</label><input class="input-field !text-xs !py-2" value="${y(t.whatsapp_recipient||"")}" onchange="window.socialSavePlatform('${e}')" data-f="whatsapp_recipient"></div>
      <div class="col-span-2"><label class="lbl">Channel id</label><input class="input-field !text-xs !py-2" value="${y(t.whatsapp_channel_id||"")}" onchange="window.socialSavePlatform('${e}')" data-f="whatsapp_channel_id"></div>`),e==="facebook"){const o=Array.isArray(a.account?.extra?.pages)?a.account.extra.pages:[];i.push(`<div class="col-span-2"><label class="lbl">Facebook Page to post to</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${e}')" data-f="facebook_page_id">
      <option value="">Select a page…</option>
      ${o.map(s=>`<option value="${y(s.id)}" ${t.facebook_page_id===s.id?"selected":""}>${y(s.name)}</option>`).join("")}
    </select>${o.length?"":'<p class="text-[10px] text-gray-500">Connect a Facebook account first.</p>'}</div>`)}if(e==="instagram"){const o=Array.isArray(a.account?.extra?.pages)?a.account.extra.pages:[];i.push(`<div class="col-span-2"><label class="lbl">Instagram account</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${e}')" data-f="instagram_ig_user_id">
      <option value="">Select an Instagram Business account…</option>
      ${o.map(s=>`<option value="${y(s.igUserId)}" ${t.instagram_ig_user_id===String(s.igUserId)?"selected":""}>@${y(s.username)}</option>`).join("")}
    </select>${o.length?"":'<p class="text-[10px] text-gray-500">Connect an Instagram business account first.</p>'}</div>`)}return e==="pinterest"&&i.push(`<div class="col-span-2"><label class="lbl">Board id</label><input class="input-field !text-xs !py-2" value="${y(t.pinterest_board_id||"")}" onchange="window.socialSavePlatform('${e}')" data-f="pinterest_board_id" placeholder="Paste a board id from Pinterest"></div>`),e==="youtube"&&i.push(`<div><label class="lbl">Privacy</label><select class="input-field !text-xs !py-2" onchange="window.socialSavePlatform('${e}')" data-f="youtube_privacy">
      <option value="private" ${(t.youtube_privacy||"private")==="private"?"selected":""}>Private</option>
      <option value="unlisted" ${t.youtube_privacy==="unlisted"?"selected":""}>Unlisted</option>
      <option value="public" ${t.youtube_privacy==="public"?"selected":""}>Public</option>
    </select></div>`),i.length?`<div class="grid grid-cols-2 gap-2">${i.join("")}</div>`:""}window.socialTogglePlatform=async function(e,t){await wo(e,{enabled:t})};async function wo(e,t){const a=lt.find(o=>o.platform===e),{error:i}=await c.from("social_platform_settings").upsert({id:a?.id,platform:e,...t,updated_at:new Date().toISOString()},{onConflict:"platform"});if(i){w(i.message,"error");return}w(`${q(e)} ${t.enabled!==void 0?t.enabled?"enabled":"disabled":"saved"}.`)}window.socialSavePlatform=async function(e){const t=Array.from(document.querySelectorAll(`[onchange="window.socialSavePlatform('${e}')"]`)),a={};for(const s of t){const r=s.dataset.f;r&&(a[r]=s.value)}const i=lt.find(s=>s.platform===e),{error:o}=await c.from("social_platform_settings").upsert({id:i?.id,platform:e,config:{...i?.config||{},...a},updated_at:new Date().toISOString()},{onConflict:"platform"});if(o){w(o.message,"error");return}w(`${q(e)} settings saved.`)};window.socialCopy=function(e){const t=e.dataset.text||"";navigator.clipboard?.writeText(t).then(()=>w("Copied.")).catch(()=>w("Copy failed.","error"))};async function _o(e){try{const t=await fe(),a=t.serverConfigured||{};e.innerHTML=`
      <div class="space-y-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="server" class="w-4 h-4 text-blue-400"></i> Server Configuration</h3>
          <div class="grid sm:grid-cols-3 gap-2">
            ${Ct("Supabase service keys",a.supabase,"Needed for scheduler + token storage")}
            ${Ct("Token encryption key",a.tokenEncryption,"SOCIAL_TOKEN_ENC_KEY (AES-256-GCM)")}
            ${Ct("Scheduler secret",a.schedulerSecret,"SCHEDULER_CRON_SECRET for the 15-min cron")}
          </div>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="plug" class="w-4 h-4 text-blue-400"></i> Platform API Ready Status</h3>
          <div class="grid md:grid-cols-2 gap-2">
            ${(t.platforms||[]).map(i=>`
              <div class="flex items-center gap-3 p-3 bg-white/[.03] border border-white/10 rounded-xl">
                <i data-lucide="${ie(i.id)}" class="w-4 h-4 ${G[i.id]?.tone||""} shrink-0"></i>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-white">${y(i.label)}</p>
                  <p class="text-[10px] text-gray-500 leading-relaxed">${y(i.requirements?.note||"")}</p>
                </div>
                <span class="badge ${i.configured?"bg-emerald-500/15 text-emerald-300 border-emerald-500/30":"bg-amber-500/15 text-amber-300 border-amber-500/30"}">${i.configured?"ready":"setup needed"}</span>
              </div>`).join("")}
          </div>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-2">
          <h3 class="text-sm font-black text-white">Security notes</h3>
          <ul class="text-[11px] text-gray-400 space-y-1.5 list-disc list-inside">
            <li>API keys and client secrets are only read from server environment variables — they never reach the browser or frontend code.</li>
            <li>Access / refresh tokens are encrypted with AES-256-GCM before storage and are decrypted only inside server functions.</li>
            <li>All social endpoints verify admin access; the scheduler additionally checks its cron secret.</li>
            <li>No TikTok passwords are collected. Only the official OAuth flow is used — no scraping, no unofficial bots.</li>
            <li>Public posting on TikTok / Meta / Google / X is subject to each platform's app review and its posting rules; the dashboard shows those requirements.</li>
          </ul>
        </div>
      </div>`,N()}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">${y(t.message)}</div>`}}function Ct(e,t,a){return`<div class="p-3 rounded-xl bg-white/[.03] border border-white/10">
    <div class="flex items-center justify-between gap-2"><p class="text-xs font-bold text-white">${y(e)}</p><span class="badge ${t?"bg-emerald-500/15 text-emerald-300 border-emerald-500/30":"bg-red-500/15 text-red-300 border-red-500/30"}">${t?"OK":"missing"}</span></div>
    <p class="text-[10px] text-gray-500 mt-1">${y(a)}</p>
  </div>`}window.social={renderSocialMedia:jt,loadTab:nt};let Ze=[];function D(e){if(e==null)return"";const t=document.createElement("div");return t.textContent=String(e),t.innerHTML}function ta(){if(window.lucide)try{lucide.createIcons()}catch{}}function me(e,t="success"){const a=document.getElementById("toast"),i=document.getElementById("toast-msg");if(!a||!i){t==="error"&&alert(e);return}i.textContent=e;const o=a.querySelector("i[data-lucide]"),s={success:"check-circle",error:"alert-circle",info:"info"},r={success:"text-emerald-400",error:"text-red-400",info:"text-blue-400"};o&&(o.setAttribute("data-lucide",s[t]||"info"),o.className=`w-4 h-4 shrink-0 ${r[t]||"text-blue-400"}`),a.style.transform="translateY(0)",a.style.opacity="1",ta(),clearTimeout(a._t),a._t=setTimeout(()=>{a.style.transform="translateY(20px)",a.style.opacity="0"},3200)}function ko(){return'<div class="flex items-center justify-center py-24"><div class="flex items-center gap-3 text-gray-400 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading…</div></div>'}async function $o(){const{data:e}=await c.auth.getSession();return e?.session?.access_token||""}async function ct(e,{method:t="GET",body:a}={}){const o={authorization:`Bearer ${await $o()}`,"content-type":"application/json"};t!=="GET"&&(o["x-admin-csrf"]="1");const s=await fetch(e,{method:t,headers:o,body:a?JSON.stringify(a):void 0});let r={};try{r=await s.json()}catch{r={}}if(!s.ok)throw Object.assign(new Error(r?.error||`Request failed (HTTP ${s.status})`),{status:s.status,data:r});return r}function Va(e,t){return e?`<span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30">${t==="environment"?"Configured (env)":"Configured"}</span>`:'<span class="badge bg-amber-500/15 text-amber-300 border-amber-500/30">Not configured</span>'}function So(e){try{return e?new Date(e).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):null}catch{return null}}function Po(e){return`
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><i data-lucide="${D(e.icon||"lock")}" class="w-4 h-4 text-blue-400"></i></div>
          <div><h3 class="text-sm font-black text-white">${D(e.label)}</h3><p class="text-[11px] text-gray-500">Cloudflare deployment secret</p></div>
        </div>
        ${Va(e.configured,"environment")}
      </div>
      <p class="text-xs text-gray-500 mb-3">${D(e.description||"")}</p>
      <div class="space-y-2">
        ${(e.secrets||[]).map(t=>`
          <div class="flex items-start justify-between gap-3 p-3 bg-white/[.03] border border-white/5 rounded-xl">
            <div class="min-w-0">
              <p class="text-xs font-bold text-white">${D(t.label)} <code class="text-[10px] text-gray-500">${D(t.name)}</code></p>
              <p class="text-[11px] text-gray-500 mt-0.5">${D(t.note||"")}</p>
            </div>
            ${t.configured?'<span class="badge bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shrink-0">set</span>':'<span class="badge bg-red-500/15 text-red-300 border-red-500/30 shrink-0">missing</span>'}
          </div>`).join("")}
      </div>
      <a href="${D(e.dashboardUrl||"#")}" target="_blank" rel="noopener" class="btn-press inline-flex items-center gap-1.5 mt-4 px-3 py-2 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition">
        <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Set in Cloudflare dashboard
      </a>
    </div>`}function Ao(e){const t=So(e.updatedAt);return`
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5" data-category="${D(e.id)}">
      <div class="flex items-start justify-between gap-3 mb-4">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><i data-lucide="${D(e.icon||"plug")}" class="w-4 h-4 text-blue-400"></i></div>
          <div><h3 class="text-sm font-black text-white">${D(e.label)}</h3>
            <p class="text-[11px] text-gray-500">${t?"Updated "+D(t):"No credentials stored yet"}</p></div>
        </div>
        ${Va(e.configured,e.source)}
      </div>
      <div class="space-y-3">
        ${(e.fields||[]).map(a=>`
          <div>
            <label class="block text-[11px] font-bold text-gray-400 mb-1">
              ${D(a.label)}${a.optional?' <span class="text-gray-600 font-normal">(optional)</span>':""}
              ${a.configured?'<span class="ml-1 text-emerald-400 font-normal">• stored</span>':""}
            </label>
            <div class="flex gap-2">
              <input id="int-${D(e.id)}-${D(a.name)}" type="${a.secret?"password":"text"}" autocomplete="new-password" spellcheck="false"
                maxlength="${a.max||400}" placeholder="${a.configured?"•••••••• (leave blank to keep)":a.secret?"Enter value":""}"
                class="flex-1 bg-white/[.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-blue-500/50 outline-none">
              ${a.secret?`<button type="button" onclick="window.intToggle('int-${D(e.id)}-${D(a.name)}', this)" class="px-3 rounded-xl bg-white/[.04] border border-white/10 text-gray-400 hover:text-white" title="Show / hide"><i data-lucide="eye" class="w-4 h-4"></i></button>`:""}
            </div>
          </div>`).join("")}
      </div>
      <div class="flex items-center gap-2 flex-wrap mt-4">
        <button onclick="window.intSave('${D(e.id)}')" class="btn-press inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition"><i data-lucide="save" class="w-3.5 h-3.5"></i> Save</button>
        <button onclick="window.intTest('${D(e.id)}')" class="btn-press inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white/[.05] text-gray-200 border border-white/10 hover:border-blue-500/40 transition"><i data-lucide="plug-zap" class="w-3.5 h-3.5"></i> Test connection</button>
        ${e.configured?`<button onclick="window.intRemove('${D(e.id)}')" class="btn-press inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Remove</button>`:""}
      </div>
      <p id="int-result-${D(e.id)}" class="hidden text-[11px] mt-3 px-3 py-2 rounded-xl"></p>
    </div>`}function Eo(){const e=Ze.filter(a=>a.kind==="deployment"),t=Ze.filter(a=>a.kind==="platform");return`
    <div class="space-y-5">
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-4">
        <p class="text-xs text-gray-400"><i data-lucide="shield-check" class="w-3.5 h-3.5 inline text-emerald-400 mr-1"></i>
        Credentials you save here are encrypted on the server (AES-256-GCM) before storage. Saved values are never sent back to the browser — after saving you will only ever see whether a field is configured.</p>
      </div>
      <div>
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-wide mb-2">Security &amp; platform infrastructure</h3>
        <div class="grid lg:grid-cols-2 gap-4">${e.map(Po).join("")}</div>
      </div>
      <div>
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-wide mb-2">Platform integrations</h3>
        <div class="grid lg:grid-cols-2 gap-4">${t.map(Ao).join("")}</div>
      </div>
    </div>`}function aa(e){return Ze.find(t=>t.id===e)}async function Co(){const e=document.getElementById("content");e&&(e.innerHTML=`
    <div class="space-y-4 fade-in">
      <div>
        <h2 class="text-xl font-black text-white flex items-center gap-2"><i data-lucide="key-round" class="w-5 h-5 text-blue-400"></i> API &amp; Integrations Settings</h2>
        <p class="text-xs text-gray-500 mt-1">Manage the credentials for every external integration yourself. Secrets are stored encrypted server-side and never displayed again after saving.</p>
      </div>
      <div id="integrations-body">${ko()}</div>
    </div>`,ta(),await ia())}async function ia(){const e=document.getElementById("integrations-body");if(e)try{Ze=(await ct("/api/social/integrations")).categories||[],e.innerHTML=Eo(),ta()}catch(t){e.innerHTML=`<div class="glass-soft border border-red-500/20 rounded-2xl p-6 text-sm text-red-300">${D(t.message)}</div>`}}function Io(e){const t={};for(const a of e.fields||[]){const i=document.getElementById(`int-${e.id}-${a.name}`);if(!i)continue;const o=String(i.value||"").trim();o&&(t[a.name]=o)}return t}function It(e,t,a){const i=document.getElementById(`int-result-${e}`);i&&(i.classList.remove("hidden","bg-emerald-500/10","text-emerald-300","bg-red-500/10","text-red-300","bg-amber-500/10","text-amber-300"),t?i.classList.add("bg-emerald-500/10","text-emerald-300"):i.classList.add("bg-red-500/10","text-red-300"),i.textContent=a||(t?"OK":"Failed"))}window.intToggle=function(e,t){const a=document.getElementById(e);a&&(a.type=a.type==="password"?"text":"password")};window.intSave=async function(e){const t=aa(e);if(!t)return;const a=Io(t),i=(t.fields||[]).filter(o=>!o.optional&&!a[o.name]&&!o.configured);if(i.length){me(`Please fill: ${i.map(o=>o.label).join(", ")}`,"error");return}try{await ct("/api/social/integrations/save",{method:"POST",body:{category:e,values:a}}),me(`${t.label} credentials saved.`),await ia()}catch(o){me(o.message,"error")}};window.intRemove=async function(e){const t=aa(e);if(t&&window.confirm(`Remove the stored ${t.label} credentials? Publishing for this platform will stop until new credentials are added.`))try{await ct("/api/social/integrations/remove",{method:"POST",body:{category:e}}),me(`${t.label} credentials removed.`),await ia()}catch(a){me(a.message,"error")}};window.intTest=async function(e){const t=aa(e);if(t){It(e,!0,"Testing…");try{const a=await ct("/api/social/integrations/test",{method:"POST",body:{category:e}});It(e,!!a.ok,a.note||(a.ok?"Connection verified.":"Test failed.")),me(a.ok?`${t.label} connection verified.`:a.requiresAccount?`${t.label}: ${a.note}`:`Test failed: ${a.note||""}`,a.ok?"success":"error")}catch(a){It(e,!1,a.message),me(a.message,"error")}}};const Wa="weverseonlineshop@gmail.com",Ga="Weverse Online Shop",za="GLOBAL SHOPPING â€¢ WORLDWIDE DELIVERY",Ya="https://mzgrjwvwzgqgivwmlkno.supabase.co".replace(/\/$/,""),To=[{group:"Main",items:[{id:"dashboard",label:"Dashboard",icon:"layout-dashboard"},{id:"products",label:"Products",icon:"package"},{id:"video-scanner",label:"AI Video Scanner",icon:"video"},{id:"content-settings",label:"Content Settings",icon:"file-cog"},{id:"properties",label:"Properties",icon:"home"},{id:"catalog",label:"Catalog Manager",icon:"boxes"},{id:"orders",label:"Orders",icon:"shopping-bag"},{id:"customers",label:"Customers",icon:"users"},{id:"reviews",label:"Reviews",icon:"star"},{id:"messages",label:"Messages",icon:"message-circle"},{id:"coupons",label:"Coupons",icon:"ticket"},{id:"ads",label:"Advertisements",icon:"megaphone"},{id:"notifications",label:"Notifications",icon:"bell"}]},{group:"Marketing",items:[{id:"social",label:"Social Media Automation",icon:"share-2"},{id:"integrations",label:"API & Integrations Settings",icon:"key-round"}]},{group:"Configuration",items:[{id:"payment-settings",label:"Payment Settings",icon:"credit-card"},{id:"social-settings",label:"Social Media Integrations",icon:"plug"},{id:"homepage-branding",label:"Homepage Branding",icon:"image"},{id:"promo-bg",label:"Promo & Backgrounds",icon:"image"},{id:"brand",label:"Brand Manager",icon:"palette"},{id:"content",label:"Content Manager",icon:"file-text"},{id:"seo",label:"SEO Manager",icon:"search"},{id:"email",label:"Email Settings",icon:"mail"},{id:"analytics",label:"Analytics",icon:"bar-chart-3"},{id:"security",label:"Security",icon:"shield"},{id:"activity",label:"Activity Logs",icon:"activity"},{id:"backup",label:"Backup & Restore",icon:"database"},{id:"settings",label:"Settings",icon:"settings"},{id:"publish",label:"Publish & Deploy",icon:"rocket"}]}],Bo={dashboard:"Dashboard",products:"Products Manager",properties:"Properties Manager",catalog:"Catalog Manager","video-scanner":"AI Video Scanner",orders:"Orders Manager",customers:"Customers Manager",reviews:"Reviews Manager",messages:"Messages & Support",coupons:"Coupons Manager",ads:"Advertisement Manager",content:"Content Manager","content-settings":"Content Settings","homepage-branding":"Homepage Branding","promo-bg":"Promo & Backgrounds",brand:"Brand Manager","payment-settings":"Payment Settings",seo:"SEO Manager",email:"Email Settings",analytics:"Analytics",security:"Security",activity:"Activity Logs",backup:"Backup & Restore",settings:"Settings",publish:"Publish & Deploy",social:"Social Media Automation","social-settings":"Social Media Integrations",integrations:"API & Integrations Settings"},oa=[...Li].sort();let A={user:null,section:"dashboard"};function n(e){if(e==null)return"";const t=document.createElement("div");return t.textContent=String(e),t.innerHTML}function Ka(e,t="USD"){return`${(parseFloat(e)||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} ${t}`}function Z(e){return e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"â€”"}function be(e){return e?new Date(e).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"â€”"}function ut(){return"W-"+String(Date.now()).slice(-6)+Math.floor(Math.random()*1e3).toString().padStart(3,"0")}const Lo=["id","property_id","listing_type","category","subcategory","title","description","price","price_period","currency","country","country_code","state","city","town","product_location","latitude","longitude","bedrooms","bathrooms","building_size","land_size","parking_spaces","property_type","furnished","listing_status","images","features","tags","highlights","seo_keywords","specifications","brand","color","size","condition","warranty","shipping_info","delivery_estimate","weight","dimensions","storage_options","ram_options","color_options","availability_status","stock_quantity","sku","is_active","is_featured","is_ai_generated","ai_generated_fields","rating","rating_count","favorite_count","review_count","video","video_url","approval_status","published_at","created_at","updated_at","real_price","year_built","year_renovated","half_bathrooms","floors","garage","zip_code","address","landmarks","interior_features","exterior_features","home_systems","legal_info","risk_notes","floor_plan","nearby_area","verification_status","verification_date","inspection_info","documents","language_info","ai_video_scan"];function se(e){const t={};if(!e||typeof e!="object")return t;for(const a of Lo)a in e&&(t[a]=e[a]);return t}function p(e,t="success"){const a=document.getElementById("toast"),i=document.getElementById("toast-msg"),o=a.querySelector("i[data-lucide]");if(!a||!i)return;i.textContent=e;const s={success:"check-circle",error:"alert-circle",info:"info"},r={success:"text-emerald-400",error:"text-red-400",info:"text-blue-400"};o&&(o.setAttribute("data-lucide",s[t]||"info"),o.className=`w-4 h-4 shrink-0 ${r[t]||"text-blue-400"}`),a.style.transform="translateY(0)",a.style.opacity="1",window.lucide&&lucide.createIcons(),clearTimeout(a._t),a._t=setTimeout(()=>{a.style.transform="translateY(20px)",a.style.opacity="0"},3e3)}function I(e){return!e||typeof e!="string"?!1:/^data:video\//i.test(e)?!0:e.startsWith("blob:")?!1:/\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(e)}function Re(e){return e?e.type&&e.type.startsWith("video/")?!0:/\.(mp4|webm|mov|m4v|avi|mkv|ogv)$/i.test(String(e.name||"")):!1}function H(e){const t={pending_verification:["bg-amber-400/20 text-amber-300 border-amber-400/30","Pending Verification"],approved:["bg-emerald-400/20 text-emerald-300 border-emerald-400/30","Approved"],rejected:["bg-red-400/20 text-red-300 border-red-400/30","Payment Rejected"],payment_received:["bg-cyan-400/20 text-cyan-300 border-cyan-400/30","Payment Received"],payment_approved:["bg-emerald-400/20 text-emerald-300 border-emerald-400/30","Payment Approved"],payment_verified:["bg-emerald-400/20 text-emerald-300 border-emerald-400/30","Payment Verified"],paid:["bg-emerald-400/20 text-emerald-300 border-emerald-400/30","Paid"],payment_failed:["bg-red-400/20 text-red-300 border-red-400/30","Payment Failed"],documentation_pending:["bg-amber-400/20 text-amber-300 border-amber-400/30","Documentation Pending"],refund_processing:["bg-orange-400/20 text-orange-300 border-orange-400/30","Refund Processing"],order_completed:["bg-emerald-400/20 text-emerald-300 border-emerald-400/30","Order Completed"],order_placed:["bg-amber-400/20 text-amber-300 border-amber-400/30","Placed"],processing:["bg-indigo-400/20 text-indigo-300 border-indigo-400/30","Processing"],order_processing:["bg-indigo-400/20 text-indigo-300 border-indigo-400/30","Processing"],shipped:["bg-violet-400/20 text-violet-300 border-violet-400/30","Shipped"],order_shipped:["bg-violet-400/20 text-violet-300 border-violet-400/30","Shipped"],in_transit:["bg-violet-400/20 text-violet-300 border-violet-400/30","In Transit"],out_for_delivery:["bg-cyan-400/20 text-cyan-300 border-cyan-400/30","Out for Delivery"],delivered:["bg-emerald-400/20 text-emerald-300 border-emerald-400/30","Delivered"],order_delivered:["bg-emerald-400/20 text-emerald-300 border-emerald-400/30","Delivered"],cancelled:["bg-red-400/20 text-red-300 border-red-400/30","Cancelled"],active:["bg-emerald-500/10 text-emerald-400 border-emerald-500/20","Active"],inactive:["bg-gray-500/10 text-gray-400 border-gray-500/20","Inactive"],sale:["bg-blue-500/10 text-blue-400 border-blue-500/20","For Sale"],rent:["bg-violet-500/10 text-violet-400 border-violet-500/20","For Rent"],true:["bg-emerald-500/10 text-emerald-400 border-emerald-500/20","Active"],false:["bg-gray-500/10 text-gray-400 border-gray-500/20","Inactive"]},[a,i]=t[String(e)]||["bg-gray-500/10 text-gray-400 border-gray-500/20",n(e)||"â€”"];return`<span class="badge ${a}">${i}</span>`}function z(){document.getElementById("modal-container").innerHTML=""}function j(e){document.getElementById("modal-container").innerHTML=e,window.lucide&&lucide.createIcons()}window.closeModal=z;window.openModal=j;function R(e,t,a,i,o=""){const s={blue:"bg-blue-500/10 text-blue-400 border-blue-500/15",amber:"bg-amber-500/10 text-amber-400 border-amber-500/15",emerald:"bg-emerald-500/10 text-emerald-400 border-emerald-500/15",red:"bg-red-500/10 text-red-400 border-red-500/15",violet:"bg-violet-500/10 text-violet-400 border-violet-500/15",blue:"bg-blue-500/10 text-blue-400 border-blue-500/15"};return`<div class="stat-card glass-soft border border-blue-500/15 rounded-3xl p-5">
    <div class="flex items-start justify-between mb-3">
      <div class="p-3 ${s[i]||s.blue} rounded-2xl border"><i data-lucide="${a}" class="w-5 h-5"></i></div>
    </div>
    <p class="text-3xl font-black text-white">${n(t)}</p>
    <p class="text-xs text-gray-500 uppercase tracking-wide mt-1 font-bold">${n(e)}</p>
    ${o?`<p class="text-xs text-gray-600 mt-1">${n(o)}</p>`:""}
  </div>`}function Ce(){return'<div class="flex items-center justify-center py-24"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loadingâ€¦</div></div>'}function ge(e,t,a,i=""){return`<div class="flex flex-col items-center justify-center py-20 text-center"><div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4"><i data-lucide="${e}" class="w-8 h-8 text-blue-400"></i></div><h3 class="text-base font-black text-white mb-1">${n(t)}</h3><p class="text-sm text-gray-500 max-w-xs">${n(a)}</p>${i?`<div class="mt-5">${i}</div>`:""}</div>`}function Qa(){const e=document.getElementById("sidebar-nav");e&&(e.innerHTML=To.map(t=>`
    <div>
      <span class="section-label">${t.group}</span>
      ${t.items.map(a=>`
        <button class="nav-item ${A.section===a.id?"active":""} w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold rounded-xl" onclick="navigate('${a.id}')">
          <i data-lucide="${a.icon}" class="w-4 h-4 shrink-0"></i>
          <span>${a.label}</span>
        </button>`).join("")}
    </div>`).join(""),window.lucide&&lucide.createIcons())}window.navigate=function(e){if(e==="video-scanner"){window.location.href="/admin-video-scanner.html";return}A.section=e;const t=Bo[e]||e,a=document.getElementById("page-title");a&&(a.textContent=t),Qa(),closeSidebar();const i=document.getElementById("content");i&&(i.innerHTML=Ce()),window.lucide&&lucide.createIcons(),({dashboard:zo,products:M,properties:wt,catalog:Le,orders:ca,customers:Ss,reviews:We,messages:gi,coupons:_t,ads:Be,notifications:Es,"homepage-branding":$t,"promo-bg":Ue,content:Ms,"content-settings":wi,seo:Os,email:Hs,analytics:Ns,security:kt,activity:Vs,brand:St,"payment-settings":Yt,backup:Ws,settings:Gs,publish:At,social:()=>jt("overview"),"social-settings":()=>jt("platforms"),integrations:()=>Co()}[e]||(()=>{const r=document.getElementById("content");r&&(r.innerHTML=ge("construction","Coming Soon",`${t} is being built.`))}))()};window.openSidebar=()=>{document.getElementById("sidebar").classList.add("open"),document.getElementById("sidebar-overlay").classList.remove("hidden")};window.closeSidebar=()=>{document.getElementById("sidebar").classList.remove("open"),document.getElementById("sidebar-overlay").classList.add("hidden")};document.getElementById("close-sidebar")?.addEventListener("click",closeSidebar);const Pe="kco_admin_remember",sa="kco_login_attempts",Rt=5,Mo=15*60*1e3;function U(e){const t=document.getElementById("login-error"),a=document.getElementById("login-error-text");!t||!a||(a.textContent=e,t.classList.remove("hidden"),document.getElementById("login-success")?.classList.add("hidden"),window.lucide&&lucide.createIcons())}function Do(e){const t=document.getElementById("login-success"),a=document.getElementById("login-success-text");!t||!a||(a.textContent=e,t.classList.remove("hidden"),document.getElementById("login-error")?.classList.add("hidden"))}function pt(){document.getElementById("login-error")?.classList.add("hidden"),document.getElementById("login-success")?.classList.add("hidden")}function Ve(e){return String(e||"").trim().toLowerCase()}function jo(){try{const e=JSON.parse(localStorage.getItem(Pe)||"{}");e?.email&&!Ve(e.email)&&localStorage.removeItem(Pe)}catch{localStorage.removeItem(Pe)}}function Ro(){try{const e=JSON.parse(localStorage.getItem(Pe)||"{}");return Ve(e?.email)}catch{return""}}function ra(){jo();const e=Ro(),t=document.getElementById("login-email");t&&(t.value=e||t.value||Wa,t.removeAttribute("readonly"));const a=document.getElementById("reset-email");a&&(a.value=e||a.value||"",a.removeAttribute("readonly"))}function Fo(){return`${window.location.origin}/admin.html`}function ve(e){const t=document.getElementById("login-header-title"),a=document.getElementById("login-header-icon");document.getElementById("login-form")?.classList.toggle("hidden",e!=="login"),document.getElementById("twofa-form")?.classList.toggle("hidden",e!=="2fa"),document.getElementById("forgot-form")?.classList.toggle("hidden",e!=="forgot"),pt(),e==="login"&&(t&&(t.textContent="Admin Access"),a&&a.setAttribute("data-lucide","shield-check")),e==="2fa"&&(t&&(t.textContent="Two-Factor Auth"),a&&a.setAttribute("data-lucide","smartphone")),e==="forgot"&&(t&&(t.textContent="Reset Password"),a&&a.setAttribute("data-lucide","mail")),window.lucide&&lucide.createIcons()}function F(e,t,a=""){const i=document.getElementById(e);i&&(i.disabled=t,t?i.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline-block mr-1"></i> Please waitâ€¦':a&&(i.innerHTML=a),window.lucide&&lucide.createIcons())}function Ja(){try{return JSON.parse(localStorage.getItem(sa)||'{"count":0}')}catch{return{count:0}}}function Xa(){const e=Ja();return e.count=(e.count||0)+1,e.count>=Rt&&(e.lockedUntil=Date.now()+Mo),localStorage.setItem(sa,JSON.stringify(e)),e}function Za(){localStorage.removeItem(sa)}function ei(){const e=Ja();if(!e.lockedUntil)return null;const t=e.lockedUntil-Date.now();return t<=0?(Za(),null):Math.ceil(t/6e4)}async function te(e,t,a={}){try{await c.from("admin_security_logs").insert({user_id:e,event_type:t,ip_address:await qo(),user_agent:navigator.userAgent.slice(0,200),...a})}catch{}}async function qo(){try{return(await(await fetch("https://api64.ipify.org?format=json",{signal:AbortSignal.timeout(3e3)})).json()).ip||"unknown"}catch{return"unknown"}}async function ti(e){if(!e)return!1;let t=!1,a=!1;try{const{data:i}=await c.rpc("is_current_user_admin");t=!0,a=!!i}catch{t=!1}return t?a:Ve(e.email)===Wa}async function Uo(){const e=window.location.hash;if(e.includes("type=recovery")||e.includes("access_token")){et(),Go();return}const{data:{session:t}}=await c.auth.getSession();if(t?.user&&await ti(t.user)){const{data:{currentUser:i}}=await c.auth.getUser(),o=await c.auth.mfa.getAuthenticatorAssuranceLevel(),s=o.data?.currentLevel;if(o.data?.nextLevel==="aal2"&&s!=="aal2"){A.user=t.user,et(),ve("2fa"),na();return}A.user=t.user,bt();return}No()}function et(){const e=document.getElementById("login-screen");e&&(e.style.display="flex")}function No(){et(),ve("login"),ra(),ai(),ii(),na(),Oo();const e=ei();e&&(U(`Too many failed attempts. Try again in ${e} minute${e>1?"s":""}.`),document.getElementById("login-btn").disabled=!0)}function Oo(){document.getElementById("toggle-pw")?.addEventListener("click",()=>{const e=document.getElementById("login-password"),t=document.querySelector("#toggle-pw i");e&&(e.type=e.type==="password"?"text":"password",t&&t.setAttribute("data-lucide",e.type==="password"?"eye":"eye-off"),window.lucide&&lucide.createIcons())})}function ai(){const e=document.getElementById("login-form");!e||e._bound||(e._bound=!0,e.addEventListener("submit",Ho),document.getElementById("forgot-pw-btn")?.addEventListener("click",()=>ve("forgot")))}async function Ho(e){e.preventDefault();const t=ei();if(t){U(`Account locked. Try again in ${t} minute${t>1?"s":""}.`);return}const a=document.getElementById("login-email"),i=Ve(a?.value);if(!i){U("Enter your admin email address."),F("login-btn",!1,'<i data-lucide="log-in" class="w-4 h-4 inline mr-1"></i> Sign In');return}const o=document.getElementById("login-password").value,s=document.getElementById("remember-me")?.checked;F("login-btn",!0),pt();const{data:r,error:l}=await c.auth.signInWithPassword({email:i,password:o});if(l||!r.user){const x=String(l?.message||"").toLowerCase();if(x.includes("missing supabase credentials")||x.includes("authentication service is unavailable")){U("Authentication is temporarily unavailable due to configuration. Please contact support."),F("login-btn",!1,'<i data-lucide="log-in" class="w-4 h-4 inline mr-1"></i> Sign In');return}if(x.includes("failed to fetch")||x.includes("network request failed")){U("Network error while signing in. Check your connection and try again."),F("login-btn",!1,'<i data-lucide="log-in" class="w-4 h-4 inline mr-1"></i> Sign In');return}if(x.includes("email not confirmed")){U("Your admin email is not confirmed yet. Open your verification email and confirm first."),F("login-btn",!1,'<i data-lucide="log-in" class="w-4 h-4 inline mr-1"></i> Sign In');return}const f=Xa(),m=Rt-f.count,h=f.lockedUntil?`Account locked for 15 minutes after ${Rt} failed attempts.`:`Invalid email or password. ${m>0?m+" attempt"+(m!==1?"s":"")+" remaining.":""}`;U(h),F("login-btn",!1,'<i data-lucide="log-in" class="w-4 h-4 inline mr-1"></i> Sign In'),r?.user&&await te(r.user.id,"login_failed",{metadata:{reason:"wrong_password"}});return}if(!await ti(r.user)){await c.auth.signOut(),U(`Access denied for ${r.user.email}. This account is signed in but does not have administrator privileges.`),F("login-btn",!1,'<i data-lucide="log-in" class="w-4 h-4 inline mr-1"></i> Sign In'),await te(r.user.id,"login_denied",{metadata:{reason:"not_admin"}});return}if(s?localStorage.setItem(Pe,JSON.stringify({email:i,ts:Date.now()})):localStorage.removeItem(Pe),Za(),A.user=r.user,(await c.auth.mfa.getAuthenticatorAssuranceLevel()).data?.nextLevel==="aal2"){F("login-btn",!1,'<i data-lucide="log-in" class="w-4 h-4 inline mr-1"></i> Sign In'),ve("2fa"),na(),setTimeout(()=>document.getElementById("totp-code")?.focus(),100);return}await te(r.user.id,"login_success"),F("login-btn",!1),bt()}function na(){const e=document.getElementById("verify-2fa-btn");e&&!e._bound&&(e._bound=!0,e.addEventListener("click",va));const t=document.getElementById("totp-code");t&&!t._bound&&(t._bound=!0,t.addEventListener("input",i=>{i.target.value=i.target.value.replace(/\D/g,"").slice(0,6),i.target.value.length===6&&va()})),document.getElementById("cancel-2fa-btn")?.addEventListener("click",async()=>{await c.auth.signOut(),A.user=null,ve("login")}),document.getElementById("use-backup-btn")?.addEventListener("click",()=>{document.getElementById("backup-code-wrap")?.classList.toggle("hidden");const o=document.getElementById("backup-code");o&&o.focus()});const a=document.getElementById("verify-backup-btn");a&&!a._bound&&(a._bound=!0,a.addEventListener("click",Vo))}async function va(){const e=document.getElementById("totp-code")?.value?.trim();if(!e||e.length!==6){U("Enter the 6-digit code from your authenticator app.");return}F("verify-2fa-btn",!0),pt();try{const{data:t}=await c.auth.mfa.listFactors(),a=(t?.totp||[])[0];if(!a){U("No 2FA factor found. Please re-login."),F("verify-2fa-btn",!1,'<i data-lucide="shield-check" class="w-4 h-4 inline mr-1"></i> Verify & Sign In');return}const{data:i,error:o}=await c.auth.mfa.challenge({factorId:a.id});if(o)throw o;const{error:s}=await c.auth.mfa.verify({factorId:a.id,challengeId:i.id,code:e});if(s)throw s;await te(A.user.id,"login_2fa_success"),F("verify-2fa-btn",!1),bt()}catch(t){Xa(),U(t.message?.includes("Invalid")?"Incorrect code. Check your authenticator and try again.":t.message),F("verify-2fa-btn",!1,'<i data-lucide="shield-check" class="w-4 h-4 inline mr-1"></i> Verify & Sign In'),document.getElementById("totp-code").value="",document.getElementById("totp-code").focus()}}async function Vo(){const e=document.getElementById("backup-code")?.value?.trim().toUpperCase().replace(/\s/g,"");if(!e){U("Enter a backup recovery code.");return}F("verify-backup-btn",!0);try{const{data:t}=await c.from("admin_2fa").select("backup_codes").eq("user_id",A.user.id).maybeSingle();if(!t?.backup_codes?.length){U("No backup codes found."),F("verify-backup-btn",!1,"Use Backup Code");return}if(!t.backup_codes.find(o=>(o.code||o).toUpperCase().replace(/-/g,"")===e.replace(/-/g,"")&&!o.used)){U("Backup code not found or already used."),F("verify-backup-btn",!1,"Use Backup Code");return}const i=t.backup_codes.map(o=>(o.code||o).toUpperCase().replace(/-/g,"")===e.replace(/-/g,"")?{...typeof o=="object"?o:{code:o},used:!0}:o);await c.from("admin_2fa").update({backup_codes:i}).eq("user_id",A.user.id),await te(A.user.id,"login_backup_code_used"),bt()}catch(t){U(t.message),F("verify-backup-btn",!1,"Use Backup Code")}}function ii(){document.getElementById("back-to-login")?.addEventListener("click",()=>ve("login")),document.getElementById("send-reset-btn")?.addEventListener("click",Wo)}async function Wo(){const e=document.getElementById("reset-email"),t=Ve(e?.value);if(!t){U("Enter your admin email address to receive a reset link.");return}F("send-reset-btn",!0),pt();const{error:a}=await c.auth.resetPasswordForEmail(t,{redirectTo:Fo()});if(F("send-reset-btn",!1,'<i data-lucide="mail" class="w-4 h-4 inline mr-1"></i> Send Reset Link'),a){U(a.message);return}Do("Reset link sent! Check your inbox and open it from this device to continue.")}function Go(){const e=document.getElementById("login-screen");if(!e)return;const t=e.querySelector(".login-card");t&&(t.innerHTML=`
    <div class="flex items-center gap-3 mb-6">
      <div class="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shrink-0"><i data-lucide="lock" class="w-5 h-5 text-white"></i></div>
      <div><h1 class="text-lg font-black text-white">Set New Password</h1><p class="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Weverse Admin</p></div>
    </div>
    <div id="reset-pw-error" class="hidden mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs"></div>
    <div class="space-y-4">
      <div>
        <label class="lbl">New Password</label>
        <input type="password" id="new-pw-reset" class="input-field" placeholder="At least 8 characters" minlength="8">
      </div>
      <div>
        <label class="lbl">Confirm New Password</label>
        <input type="password" id="confirm-pw-reset" class="input-field" placeholder="Repeat password">
      </div>
      <button id="set-pw-btn" onclick="handlePasswordResetSubmit()" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2">
        <i data-lucide="check" class="w-4 h-4"></i> Set New Password
      </button>
    </div>`,window.lucide&&lucide.createIcons())}window.handlePasswordResetSubmit=async function(){const e=document.getElementById("new-pw-reset")?.value,t=document.getElementById("confirm-pw-reset")?.value,a=document.getElementById("reset-pw-error");if(e!==t){a&&(a.textContent="Passwords do not match.",a.classList.remove("hidden"));return}if((e||"").length<8){a&&(a.textContent="Password must be at least 8 characters.",a.classList.remove("hidden"));return}const{error:i}=await c.auth.updateUser({password:e});if(i){a&&(a.textContent=i.message,a.classList.remove("hidden"));return}p("Password updated! Please log in with your new password."),window.location.hash="",setTimeout(()=>window.location.reload(),1500)};function bt(){const e=document.getElementById("login-screen");e&&(e.style.display="none");const t=document.getElementById("admin-user-email");t&&A.user&&(t.textContent=A.user.email||"Admin"),ra();const a=(window.location.hash||"").replace(/^#/,"");a==="social"||a==="social-settings"?navigate(a):navigate("dashboard")}window.adminSignOut=async function(){A.user&&await te(A.user.id,"logout"),await c.auth.signOut(),A.user=null,et(),ve("login"),ra(),ai(),ii()};window.logoutAllDevices=async function(){confirm("This will sign you out on ALL devices. Continue?")&&(A.user&&await te(A.user.id,"logout_all_devices"),await c.auth.signOut({scope:"global"}),A.user=null,p("Signed out from all devices."),setTimeout(()=>window.location.reload(),1200))};async function zo(){const e=document.getElementById("content");try{const[t,a,i,o]=await Promise.all([c.from("showroom_listings").select("id,listing_type,is_active,price",{count:"exact"}),c.from("payment_receipts").select("id,order_number,amount,status,created_at",{count:"exact"}).order("created_at",{ascending:!1}).limit(200),c.from("profiles").select("user_id,created_at",{count:"exact"}),c.from("product_reviews").select("id,is_approved",{count:"exact"})]),s=t.data||[],r=a.data||[],l=r.filter(_=>["approved","payment_approved","delivered"].includes(_.status)).reduce((_,k)=>_+(parseFloat(k.amount)||0),0),d=r.filter(_=>["pending","pending_verification","processing"].includes(_.status)).length,u=s.filter(_=>_.listing_type!=="property").length,b=s.filter(_=>_.listing_type==="property").length,g=s.filter(_=>_.listing_type!=="property"&&_.is_active).length,x=i.count||0,f=o.count||0,m=(o.data||[]).filter(_=>!_.is_approved).length,h=new Date,S=r.filter(_=>{const k=new Date(_.created_at);return k.getMonth()===h.getMonth()&&k.getFullYear()===h.getFullYear()}).filter(_=>["approved","payment_approved","delivered"].includes(_.status)).reduce((_,k)=>_+(parseFloat(k.amount)||0),0),C=r.slice(0,6);e.innerHTML=`
      <div class="space-y-6 fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-black text-white">Good ${ls()}, Admin</h2>
            <p class="text-sm text-gray-500 mt-0.5">${new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
          </div>
          <button onclick="navigate('products')" class="btn-press hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
            <i data-lucide="plus" class="w-4 h-4"></i> Add Product
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          ${R("Total Revenue",`$${l.toLocaleString("en-US",{maximumFractionDigits:0})}`,"dollar-sign","emerald",`$${S.toLocaleString("en-US",{maximumFractionDigits:0})} this month`)}
          ${R("Total Orders",r.length,"shopping-bag","blue",`${d} pending`)}
          ${R("Customers",x,"users","violet")}
          ${R("Products",u,"package","amber",`${g} active`)}
          ${R("Properties",b,"home","blue")}
          ${R("Reviews",f,"star","blue",`${m} pending`)}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="trending-up" class="w-4 h-4 text-blue-400"></i> Revenue Overview</h3>
            <canvas id="chart-revenue" height="200"></canvas>
          </div>
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-bold text-white flex items-center gap-2"><i data-lucide="clock" class="w-4 h-4 text-blue-400"></i> Recent Orders</h3>
              <button onclick="navigate('orders')" class="text-xs text-blue-400 hover:text-blue-300 font-medium transition">View all</button>
            </div>
            ${C.length===0?'<p class="text-xs text-gray-500 text-center py-8">No orders yet</p>':C.map(_=>`
                <div class="flex items-center justify-between py-2 border-b border-blue-500/5 last:border-0">
                  <div class="min-w-0">
                    <p class="text-xs font-bold text-white truncate">${n(_.order_number||_.id?.slice(0,8))}</p>
                    <p class="text-[10px] text-gray-500">${be(_.created_at)}</p>
                  </div>
                  <div class="flex items-center gap-2 shrink-0 ml-2">
                    <span class="text-xs font-bold text-emerald-400">$${parseFloat(_.amount||0).toLocaleString("en-US",{maximumFractionDigits:0})}</span>
                    ${H(_.status)}
                  </div>
                </div>`).join("")}
          </div>
        </div>

        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="zap" class="w-4 h-4 text-amber-400"></i> Quick Actions</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            ${[{icon:"plus-circle",label:"Add Product",fn:"navigate('products')"},{icon:"home",label:"Add Property",fn:"navigate('properties')"},{icon:"shopping-bag",label:"View Orders",fn:"navigate('orders')"},{icon:"star",label:"Reviews",fn:"navigate('reviews')"},{icon:"ticket",label:"Coupons",fn:"navigate('coupons')"},{icon:"settings",label:"Settings",fn:"navigate('settings')"}].map(_=>`
              <button onclick="${_.fn}" class="btn-press flex flex-col items-center gap-2 p-3 glass-soft border border-blue-500/15 rounded-xl hover:border-blue-500/30 transition">
                <i data-lucide="${_.icon}" class="w-5 h-5 text-blue-400"></i>
                <span class="text-[11px] font-bold text-gray-300">${_.label}</span>
              </button>`).join("")}
          </div>
        </div>
      </div>`,window.lucide&&lucide.createIcons(),ci(r)}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400 text-sm">Error: ${n(t.message)}</div>`)}}async function M(){const e=document.getElementById("content");try{const{data:t,error:a}=await c.from("showroom_listings").select("*").order("created_at",{ascending:!1}),i=new Set,o=[];for(const u of a?[]:t||[])u&&u.property_id&&!i.has(u.property_id)&&(i.add(u.property_id),o.push(u));for(const u of Kt())u&&u.property_id&&!i.has(u.property_id)&&(i.add(u.property_id),o.push(u));if(Array.isArray(J))for(const u of J.filter(b=>b.property_id))i.has(u.property_id)||(i.add(u.property_id),o.push(u));const s=[...Ea,...Ca,...Ia,...Ta];for(const u of s)u&&u.property_id&&!i.has(u.property_id)&&(i.add(u.property_id),o.push(u));o.sort((u,b)=>new Date(b.created_at||0)-new Date(u.created_at||0));try{await Jt()}catch{}const r=new Set(rt());if(r.size)for(let u=o.length-1;u>=0;u--)o[u]&&o[u].property_id&&r.has(o[u].property_id)&&o.splice(u,1);for(let u=o.length-1;u>=0;u--){const b=o[u],g=Number(b&&b.price);Number.isFinite(g)&&g>=1&&g<=100&&o.splice(u,1)}const l=[...new Set(o.map(u=>u.category).filter(Boolean))].sort((u,b)=>u.localeCompare(b)),d=[...new Set(o.flatMap(u=>Array.isArray(u.tags)?u.tags:[]).filter(Boolean))].sort((u,b)=>u.localeCompare(b));window._productFilters||(window._productFilters={search:"",category:"",tag:"",status:"",featured:"",sort:"newest"}),window._productSelection||(window._productSelection=new Set),e.innerHTML=`
      <div class="space-y-5 fade-in">

        <div class="glass-soft border border-blue-500/20 rounded-2xl p-5 sm:p-6">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-300/80">Product Showroom</p>
              <h2 class="text-3xl font-black text-white mt-1">Professional Product Showroom</h2>
              <p class="text-sm text-gray-400 mt-1">Unlimited products, smooth infinite scrolling layout, and clean auto-aligned cards.</p>
            </div>
            <div class="flex items-center gap-2.5 flex-wrap">
              <button onclick="showAddPropertyModal()" class="btn-press flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-sm font-black px-5 py-3.5 rounded-2xl transition shadow-xl shadow-emerald-700/25" title="Add a real estate property with a multi-country interactive map">
                <i data-lucide="home" class="w-5 h-5"></i> Add Real Estate
              </button>
              <button onclick="showAddVehicleModal()" class="btn-press flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-sm font-black px-5 py-3.5 rounded-2xl transition shadow-xl shadow-orange-700/25" title="Add a car, truck, bus, motorhome, motorcycle or boat">
                <i data-lucide="car-front" class="w-5 h-5"></i> Add Cars &amp; Trucks
              </button>
              <button onclick="showAddProductStep1()" class="btn-press flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-black px-6 py-3.5 rounded-2xl transition shadow-xl shadow-blue-700/25">
                <i data-lucide="plus" class="w-5 h-5"></i> Add Product
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-3">
          ${R("Total Products",o.length,"package","blue")}
          ${R("Published",o.filter(u=>!!u.is_active).length,"badge-check","emerald")}
          ${R("Draft / Hidden",o.filter(u=>!u.is_active).length,"file-clock","amber")}
          ${R("Featured",o.filter(u=>!!u.is_featured).length,"sparkles","violet")}
          ${R("Inventory Units",o.reduce((u,b)=>u+(parseInt(b.stock_quantity,10)||0),0),"boxes","blue")}
          ${R("Avg Price",`$${Math.round(o.reduce((u,b)=>u+(parseFloat(b.price)||0),0)/Math.max(o.length,1)).toLocaleString()}`,"dollar-sign","blue")}
        </div>

        <div class="glass-soft border border-blue-500/15 rounded-2xl p-3 sm:p-4 space-y-3">
          <div class="relative">
            <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300"></i>
            <input id="prod-search" type="search" class="input-field pl-12 py-4 pr-28 text-base font-semibold !rounded-2xl border-blue-500/40 shadow-inner shadow-blue-900/20 focus:border-blue-400"
              placeholder="Search any product by name, SKU, brand, category, tag..." value="${n(window._productFilters.search||"")}"
              oninput="filterProducts()" onkeydown="productSearchKeydown(event)">
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">Press Enter to open</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-2.5">
            <select id="prod-cat-filter" class="input-field" onchange="filterProducts()">
              <option value="">All Categories</option>
              ${(l.length?l:ui).map(u=>`<option value="${n(u)}" ${(window._productFilters.category||"")===u?"selected":""}>${n(u)}</option>`).join("")}
            </select>
            <select id="prod-tag-filter" class="input-field" onchange="filterProducts()">
              <option value="">All Tags</option>
              ${d.map(u=>`<option value="${n(u)}" ${(window._productFilters.tag||"")===u?"selected":""}>${n(u)}</option>`).join("")}
            </select>
            <select id="prod-status-filter" class="input-field" onchange="filterProducts()">
              <option value="">All Status</option>
              <option value="active" ${(window._productFilters.status||"")==="active"?"selected":""}>Published</option>
              <option value="inactive" ${(window._productFilters.status||"")==="inactive"?"selected":""}>Unpublished</option>
              <option value="archived" ${(window._productFilters.status||"")==="archived"?"selected":""}>Archived</option>
            </select>
            <select id="prod-featured-filter" class="input-field" onchange="filterProducts()">
              <option value="">All Visibility</option>
              <option value="featured" ${(window._productFilters.featured||"")==="featured"?"selected":""}>Featured</option>
              <option value="standard" ${(window._productFilters.featured||"")==="standard"?"selected":""}>Standard</option>
            </select>
            <select id="prod-sort" class="input-field" onchange="filterProducts()">
              <option value="newest" ${(window._productFilters.sort||"")==="newest"?"selected":""}>Newest</option>
              <option value="oldest" ${(window._productFilters.sort||"")==="oldest"?"selected":""}>Oldest</option>
              <option value="price-high" ${(window._productFilters.sort||"")==="price-high"?"selected":""}>Price: High to Low</option>
              <option value="price-low" ${(window._productFilters.sort||"")==="price-low"?"selected":""}>Price: Low to High</option>
              <option value="sales-high" ${(window._productFilters.sort||"")==="sales-high"?"selected":""}>Sales: High to Low</option>
              <option value="views-high" ${(window._productFilters.sort||"")==="views-high"?"selected":""}>Views: High to Low</option>
            </select>
          </div>

<div class="flex flex-wrap items-center gap-2.5">
            <button onclick="toggleSelectAllProducts(true)" class="btn-press px-4 py-2.5 text-sm font-bold rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-300 hover:bg-blue-500/15 transition">Select Visible</button>
            <button onclick="toggleSelectAllProducts(false)" class="btn-press px-4 py-2.5 text-sm font-bold rounded-xl border border-gray-500/20 bg-gray-500/10 text-gray-300 hover:bg-gray-500/15 transition">Clear Selection</button>
            <button onclick="resetProductFilters()" class="btn-press px-4 py-2.5 text-sm font-bold rounded-xl border border-gray-500/20 bg-transparent text-gray-300 hover:bg-white/5 transition">Reset Filters</button>
            <div class="ml-auto flex items-center gap-1.5">
              <span class="text-sm text-gray-400">View:</span>
<button onclick="setProductView('card')" id="view-card-btn" class="view-toggle ${!window._productView||window._productView==="card"?"active":""}"><i data-lucide="layout-grid" class="w-4 h-4"></i> Cards</button>
              <button onclick="setProductView('table')" id="view-table-btn" class="view-toggle ${window._productView==="table"?"active":""}"><i data-lucide="table" class="w-4 h-4"></i> Table</button>
            </div>
            <span class="text-sm text-gray-400 ml-2"><span id="products-result-count">0</span> shown</span>
          </div>
        </div>

        <div id="bulk-actions" class="hidden items-center gap-2.5 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
          <span id="bulk-count" class="text-sm font-bold text-blue-300">0 selected</span>
          <button onclick="bulkToggleActive(true)" class="btn-press text-sm font-bold text-emerald-300 hover:text-emerald-200 px-4 py-2.5 rounded-xl bg-emerald-500/15 transition">Publish</button>
          <button onclick="bulkToggleActive(false)" class="btn-press text-sm font-bold text-amber-300 hover:text-amber-200 px-4 py-2.5 rounded-xl bg-amber-500/15 transition">Unpublish</button>
          <button onclick="bulkDuplicateProducts()" class="btn-press text-sm font-bold text-gray-200 hover:text-white px-4 py-2.5 rounded-xl bg-white/10 transition">Duplicate</button>
          <button onclick="bulkArchive()" class="btn-press text-sm font-bold text-red-300 hover:text-red-200 px-4 py-2.5 rounded-xl bg-red-500/15 transition">Archive</button>
          <button onclick="bulkDeleteProducts()" class="btn-press text-sm font-bold text-red-200 hover:text-white px-4 py-2.5 rounded-xl bg-red-600/20 transition">Delete</button>
        </div>

<div class="space-y-4">
          <div id="products-grid" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 items-stretch"></div>
          <div id="products-more" class="flex justify-center pt-1"></div>
          <div id="products-table-wrap" class="hidden overflow-x-auto scrollbar-thin rounded-2xl border border-blue-500/15">
            <table class="w-full dt">
              <thead><tr>
                <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Date</th><th>Actions</th>
              </tr></thead>
              <tbody id="products-table-body"></tbody>
            </table>
          </div>
          <div id="products-empty" class="hidden">${ge("package-search","No matching products","Try different filters or add a new product.",'<button onclick="showAddProductStep1()" class="btn-press bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl">Add Product</button>')}</div>
          <div class="text-center text-[11px] text-gray-500 py-2">Scroll to explore all products. Layout auto-rearranges as products are added, edited, moved, or removed.</div>
        </div>
      </div>`,window._productsData=o,window._productsCardLimit=60,ni(o),filterProducts(),updateBulkBar(),window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400 text-sm">Error: ${n(t.message)}</div>`)}}function de(e){const t=parseFloat(e);return Number.isFinite(t)?t:0}function Fe(e){return Array.isArray(e.tags)?e.tags.filter(Boolean):[]}function Yo(e){const t=de(e.price),a=parseFloat(e.real_price);if(Number.isFinite(a)&&a>0&&a>t)return`${Math.round((1-t/a)*100)}% OFF`;const i=parseFloat(e.discount_percent??e.discount??0);return Number.isFinite(i)&&i>0?`${Math.round(i)}% OFF`:"No discount"}function Ko(e){const t=de(e.price),a=parseFloat(e.real_price),i=`$${t.toLocaleString()}`;return Number.isFinite(a)&&a>0&&a>t?`<span class="block text-xs text-gray-400 price-strike line-through">$${a.toLocaleString()}</span><span class="text-emerald-300 font-black">$${t.toLocaleString()}</span>`:i}function mt(e){return e.is_archived||e.availability_status==="Archived"?"archived":e.is_active?"active":"inactive"}function Ft(e){return parseInt(e.views??e.view_count??0,10)||0}function qt(e){return parseInt(e.sales??e.sales_count??0,10)||0}function gt(e){return e.sku||e.property_id||"N/A"}function yt(e){const a=(Array.isArray(e&&e.images)?e.images:[]).find(o=>typeof o=="string"&&I(o));if(a)return a;const i=e&&(e.video||e.video_url);return typeof i=="string"&&I(i)?i:""}function qe(e,t,a){if(!e)return"";const i=a||{},o=i.autoplay?' data-autoplay-card="1"':"",s=i.loop?" loop":"";return`<video src="${n(e)}" class="${t}" muted playsinline preload="metadata"${s}${o}></video>`}let Tt=null;function Qo(){"IntersectionObserver"in window&&(Tt||(Tt=new IntersectionObserver(e=>{for(const t of e){const a=t.target;if(t.isIntersecting){const i=a.play();i&&i.catch&&i.catch(()=>{})}else a.pause()}},{rootMargin:"250px",threshold:.15})),document.querySelectorAll("video[data-autoplay-card]").forEach(e=>Tt.observe(e)))}function xe(e,t){return`<div class="${e} flex items-center justify-center text-gray-600"><i data-lucide="video-off" class="w-6 h-6"></i></div>`}function ye(e){if(!e)return"";const t=[e.video,e.video_url].find(i=>typeof i=="string"&&I(i));return t||(Array.isArray(e.images)?e.images:[]).find(i=>typeof i=="string"&&I(i))||""}function oi(e){const t=ye(e);return t?/^https?:\/\//i.test(t)||t.startsWith("data:")||t.startsWith("blob:")?t:new URL(t,window.location.origin).href:""}const Bt=new Set,si=new Map,tt=new Map;function Jo(e){const t=tt.get(e);t&&(URL.revokeObjectURL(t),tt.delete(e))}async function Xo(e,t){const a=String(e.name||"clip.mp4").slice(0,120).replace(/[^\w.\-]+/g,"_"),i=`scans/${Date.now()}-${Math.random().toString(36).slice(2,8)}-${a}`,o=`${Ya}/functions/v1/video-scanner`,s=await fetch(o,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({action:"upload_token",path:i,content_type:e.type||"video/mp4"})}),r=await s.json().catch(()=>({}));if(!s.ok||!r?.url)throw new Error(r?.error||`Could not start upload (${s.status}).`);return await new Promise((l,d)=>{const u=new XMLHttpRequest;u.open("PUT",r.url,!0),u.setRequestHeader("Content-Type",e.type||"video/mp4"),u.onload=()=>u.status>=200&&u.status<300?l():d(new Error(`Upload failed (HTTP ${u.status}).`)),u.onerror=()=>d(new Error("Upload failed — check your connection.")),u.send(e)}),i}window.pmVideoBroken=function(e){const t=document.getElementById("pmFallback");t&&t.classList.remove("hidden");const a=document.getElementById("pmVideoNote");a&&(a.textContent="This video could not be loaded from the site.")};window.pmPickLocalVideo=function(e,t){const a=t.files&&t.files[0];if(!a)return;si.set(e,a),Jo(e);const i=URL.createObjectURL(a);tt.set(e,i);const o=document.getElementById("pmScanVideo");o&&(o.src=i,o.play().catch(()=>{}));const s=document.getElementById("pmFallback");s&&s.classList.add("hidden");const r=document.getElementById("pmVideoNote");r&&(r.textContent="Playing from this computer: "+a.name),p("Video loaded from this computer","success")};window.watchProductVideo=async function(e){const t=(window._productsData||[]).find(l=>l.property_id===e)||(await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle()).data;if(!t)return p("Product not found","error");const a=oi(t);if(!a)return p("This product has no video to scan.","error");const i=tt.get(e),o=i||a,s=t.ai_video_scan&&t.ai_video_scan.status?t.ai_video_scan:null;j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box" style="max-width:60rem">
        <div class="flex items-center justify-between mb-4 gap-3">
          <h3 class="text-base font-black text-white flex items-center gap-2 min-w-0">
            <i data-lucide="play-circle" class="w-4 h-4 text-violet-400 shrink-0"></i>
            <span class="truncate">${n(t.title||"Product video")}</span>
          </h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition shrink-0">Close</button>
        </div>

        <video id="pmScanVideo" src="${n(o)}" controls autoplay muted playsinline preload="auto"
          class="w-full aspect-video rounded-2xl bg-black border border-white/10"
          onerror="pmVideoBroken('${e}')"></video>
        <p id="pmVideoNote" class="text-xs text-gray-500 mt-2">${i?"Playing from this computer.":"Watch it, then scan this exact video with AI."}</p>

        <div id="pmFallback" class="hidden mt-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 p-4">
          <p class="text-sm text-amber-200 font-bold">Pick the video from this computer</p>
          <p class="text-xs text-amber-200/70 mt-1">Look in <span class="font-mono">C:\\Users\\HP\\house for sale\\build\\houses\\videos</span> for the file named <span class="font-mono">${n((ye(t)||"").split("/").pop())}</span></p>
          <input type="file" accept="video/mp4,video/*" onchange="pmPickLocalVideo('${e}', this)"
            class="mt-3 block w-full text-xs text-gray-300 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:bg-violet-600 file:text-white file:text-xs file:font-bold" />
        </div>

        <div class="flex flex-wrap items-center gap-2 mt-4">
          <button onclick="runProductVideoScan('${e}')" class="btn-press flex-1 min-w-[12rem] py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white transition">
            <span class="inline-flex items-center gap-2"><i data-lucide="scan-line" class="w-4 h-4"></i> Scan this video with AI</span>
          </button>
          ${s?`<span class="badge bg-violet-500/15 text-violet-200 border-violet-500/30">Last scan ${Math.round(s.confidence||0)}%</span>`:""}
        </div>
        <p class="text-xs text-gray-600 mt-2">Scanning analyses the same file you are watching above, then saves the report to this product. 20–90 seconds.</p>
      </div>
    </div>`),window.lucide&&lucide.createIcons();const r=document.getElementById("pmScanVideo");r&&r.play().catch(()=>{})};window.scanProductVideo=window.watchProductVideo;window.runProductVideoScan=async function(e,t){if(Bt.has(e))return;const a=(window._productsData||[]).find(l=>l.property_id===e)||(await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle()).data;if(!a)return p("Product not found","error");const i=oi(a);if(!i)return p("This product has no video to scan.","error");const o=t||si.get(e)||null,{data:{session:s}}=await c.auth.getSession(),r=s?.access_token||"";if(!r)return p("Please sign in first.","error");Bt.add(e),j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-black text-white flex items-center gap-2"><i data-lucide="scan-line" class="w-4 h-4 text-violet-400"></i> AI Scanning Video</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition">Close</button>
        </div>
        <div class="flex flex-col items-center justify-center py-12 text-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center"><i data-lucide="loader-2" class="w-7 h-7 text-violet-400 animate-spin"></i></div>
          <div>
            <p class="text-white font-bold">Analyzing the product video with AI…</p>
            <p class="text-sm text-gray-500 mt-1">${n(a.title||"")}</p>
            <p class="text-xs text-gray-600 mt-2">Watching motion + listening to audio. This usually takes 20–90 seconds.</p>
          </div>
        </div>
      </div>
    </div>`),window.lucide&&lucide.createIcons();try{const l=`${Ya}/functions/v1/video-scanner`,d=Date.now();let u;o?u={action:"scan",path:await Xo(o,r),listing_id:e,question:""}:u={action:"scan_url",url:i,listing_id:e,question:""};const b=await fetch(l,{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify(u)}),g=await b.json().catch(()=>({}));if(!b.ok)throw new Error(g.error||`Scanner failed (${b.status})`);const x=g.result||{},f=((Date.now()-d)/1e3).toFixed(1),m={...a,ai_video_scan:x},h=(window._productsData||[]).findIndex(E=>E.property_id===e);h>=0&&(window._productsData[h]=m),M(),j(os(m,f,!!g.saved)),window.lucide&&lucide.createIcons(),g.saved||p("Analysis complete — re-run to save to product","info")}catch(l){j(`
      <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
        <div class="modal-box">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-black text-white flex items-center gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-red-400"></i> Scan Failed</h3>
            <button onclick="closeModal()" class="text-gray-500 hover:text-white transition">Close</button>
          </div>
          <div class="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-200">${n(l.message)}</div>
          <p class="text-xs text-gray-500 mt-3">Free-tier Gemini limits per model per day. If every model is busy, wait a little and try again — the scanner automatically falls back through 4 models.</p>
          <div class="mt-5 flex gap-2">
            <button onclick="closeModal();runProductVideoScan('${e}')" class="btn-press flex-1 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold">Try Again</button>
            <button onclick="closeModal()" class="btn-press px-4 py-3 rounded-2xl bg-white/10 text-gray-200 text-sm font-bold">Close</button>
          </div>
        </div>
      </div>`),window.lucide&&lucide.createIcons()}finally{Bt.delete(e)}};const le="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-violet-400 outline-none";function Zo(e,t){const a=`data-ai-field="1" data-item="${e}" data-key="${n(t.key)}" data-ftype="${n(t.type)}"`,i=`ai_${e}_${n(t.key)}`,o=`<label for="${i}" class="block text-[11px] uppercase tracking-wide font-bold text-gray-400 mb-1">${n(t.label)}${t.required?' <span class="text-rose-400">*</span>':""}</label>`,s=t.value;let r;if(t.type==="textarea")r=`<textarea ${a} id="${i}" rows="3" class="${le}">${n(s)}</textarea>`;else if(t.type==="select"){const l=["",...t.options||[]].map(d=>`<option value="${n(d)}" ${String(s)===String(d)?"selected":""}>${n(d||"— Select —")}</option>`).join("");r=`<select ${a} id="${i}" class="${le}">${l}</select>`}else if(t.type==="boolean")r=`<label class="inline-flex items-center gap-2 text-sm text-gray-200"><input ${a} id="${i}" type="checkbox" ${s?"checked":""} class="w-5 h-5 accent-violet-500"> Yes</label>`;else if(t.type==="multiselect"){const l=Array.isArray(s)?s.join(", "):s||"";r=`<input ${a} id="${i}" type="text" value="${n(l)}" placeholder="comma, separated" class="${le}">`}else t.type==="number"||t.type==="price"?r=`<input ${a} id="${i}" type="number" step="any" value="${n(s)}" class="${le}">`:t.type==="date"?r=`<input ${a} id="${i}" type="date" value="${n(s)}" class="${le}">`:t.type==="email"?r=`<input ${a} id="${i}" type="email" value="${n(s)}" class="${le}">`:t.type==="url"?r=`<input ${a} id="${i}" type="url" value="${n(s)}" class="${le}">`:r=`<input ${a} id="${i}" type="text" value="${n(s)}" class="${le}">`;return`<div>${o}${r}${t.help?`<p class="text-[10px] text-gray-600 mt-1">${n(t.help)}</p>`:""}</div>`}function es(e){return`
    <div class="mt-4">
      <div class="flex items-center gap-2 mb-2">
        <i data-lucide="list-checks" class="w-4 h-4 text-violet-300"></i>
        <p class="text-sm font-black text-white">Scanned Listing Form</p>
        <span class="text-[11px] text-gray-500">AI-generated fields — edit anything before saving.</span>
      </div>
      <div class="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
        ${e.map((t,a)=>`
          <div class="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="badge bg-violet-500/15 text-violet-200 border-violet-500/30">${n(t.listing_type||"product")}</span>
              ${t.category?`<span class="badge bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20">${n(t.category)}</span>`:""}
              <span class="text-sm font-bold text-white truncate">${n(t.title||`Item ${a+1}`)}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${(t.fields||[]).filter(i=>!i.removed).map(i=>Zo(a,i)).join("")}
            </div>
          </div>`).join("")}
      </div>
    </div>`}function ts(e){const t=e.map(()=>({}));return document.querySelectorAll("[data-ai-field]").forEach(a=>{const i=Number(a.getAttribute("data-item")),o=a.getAttribute("data-key");!t[i]||!o||(t[i][o]=a.type==="checkbox"?a.checked:a.value)}),t}function as(e,t){const a=["listing_type","category","subcategory","description","brand","color","size","condition","warranty","sku","stock_quantity","country","state","city","town","product_location"];for(const i of a){if(!(i in e))continue;const o=e[i];if((o==null||o==="")&&t[i]!=null&&t[i]!==""){delete e[i];continue}i==="listing_type"&&o==="product"&&t.listing_type&&t.listing_type!=="product"&&delete e[i]}for(const i of["features","highlights","seo_keywords","tags"])Array.isArray(e[i])&&e[i].length===0&&Array.isArray(t[i])&&t[i].length&&delete e[i];return e}async function is(e){try{if(window._productsData){const{data:t}=await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle(),a=window._productsData.findIndex(i=>i.property_id===e);a>=0&&t&&(window._productsData[a]=t)}typeof M=="function"&&document.getElementById("products-grid")&&M()}catch{}}window.saveAiScanForm=async function(e,t){const a=window._aiScanFormItems||[];if(!a.length)return p("No scanned form to save.","error");const i=(window._productsData||[]).find(r=>r.property_id===e)||(await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle()).data;if(!i)return p("Product not found","error");const o=ts(a);for(let r=0;r<a.length;r++){const l=Hi(a[r],{requirePrice:!!t});if(!l.ok&&t)return p("Missing required: "+l.errors.map(d=>d.label).join(", "),"error")}const s=document.getElementById("aiSaveBtn");s&&(s.disabled=!0,s.textContent=t?"Publishing…":"Saving…");try{for(let r=0;r<a.length;r++){const l=r===0,d=l?e:Vi(),u=l?{...i.specifications||{}}:{},b=Wi(a[r],o[r],{propertyId:d,images:l?Array.isArray(i.images)?i.images:[]:[],videoUrl:l&&(i.video_url||ye(i))||null,isActive:t?!0:l?!!i.is_active:!1,isFeatured:l?!!i.is_featured:!1,approvalStatus:t?"published":l&&i.approval_status||"draft",currency:l&&i.currency||"USD",report:i.ai_video_scan||null});l&&(b.specifications={...u,...b.specifications||{}},b.published_at=t?new Date().toISOString():i.published_at||null,b.listing_status=i.listing_status||"sale",b.availability_status=i.availability_status||"In Stock",as(b,i));const{error:g}=await Gi(b);if(g)return s&&(s.disabled=!1,s.textContent=t?"Publish":"Save"),p(zi(g,t?"Publish":"Save"),"error")}await is(e),z(),p(t?"Published — the listing is now live.":"Saved. Your edits are stored.","success")}catch(r){s&&(s.disabled=!1,s.textContent=t?"Publish":"Save"),p(r.message||"Save failed.","error")}};function os(e,t,a){const i=e?.ai_video_scan||{},o=i.status==="ok",s=Math.round(i.confidence||0),r=o?'<span class="badge bg-emerald-500/10 text-emerald-300 border-emerald-500/20">Verified</span>':`<span class="badge bg-amber-500/10 text-amber-300 border-amber-500/20">${n(i.status==="error"?"Error":"Needs Review")}</span>`,l=Array.isArray(i.observations)?i.observations:[],d=Array.isArray(i.sections)?i.sections:[],u=Array.isArray(i.warnings)?i.warnings:[],g=(Array.isArray(i.items)?i.items:[]).length?Yi(i,{fallbackLabel:i.label}):[];window._aiScanFormItems=g;const x=g.length?es(g):'<div class="mt-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 text-sm text-amber-200">This scan has no generated form. Re-scan the video to build an editable listing form.</div>',f=g.length?`
          <button id="aiSaveBtn" onclick="saveAiScanForm('${e.property_id}', false)" class="btn-press px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition">Save</button>
          <button onclick="saveAiScanForm('${e.property_id}', true)" class="btn-press flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-black transition shadow-lg shadow-emerald-600/20">Publish</button>
          <button onclick="closeModal()" class="btn-press px-4 py-3 rounded-2xl bg-white/10 text-gray-200 text-sm font-bold">Close</button>`:`
          <button onclick="closeModal()" class="btn-press px-4 py-3 rounded-2xl bg-white/10 text-gray-200 text-sm font-bold">Close</button>`;return`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box wide">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-black text-white flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4 text-violet-400"></i> AI Video Scan Report</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition">Back</button>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-4 text-center">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-3"><p class="text-2xl font-black text-emerald-300">${s}%</p><p class="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Confidence</p></div>
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-3"><p class="text-2xl font-black text-blue-300">${n(i.label||"—")}</p><p class="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Detected</p></div>
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-3"><p class="text-2xl font-black text-gray-200">${n(t)}s</p><p class="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Scan Time</p></div>
        </div>
        <div class="mb-4">${r}${a?'<span class="badge bg-violet-500/10 text-violet-300 border-violet-500/20">Saved to Product</span>':'<span class="badge bg-gray-500/10 text-gray-400 border-gray-500/20">Not Saved Yet</span>'}</div>
        <div class="space-y-4 max-h-[48vh] overflow-y-auto pr-1">
          <div class="rounded-2xl bg-white/5 border border-white/10 p-4">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-bold mb-1">Summary</p>
            <p class="text-sm text-gray-200 leading-relaxed">${n(i.overall_analysis||"No summary.")}</p>
          </div>
          ${i.reason_if_cannot_determine?`<div class="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 text-sm text-amber-200">${n(i.reason_if_cannot_determine)}</div>`:""}
          ${l.length?`<div class="rounded-2xl bg-white/5 border border-white/10 p-4"><p class="text-xs text-gray-400 uppercase tracking-wide font-bold mb-2">Timeline (${l.length})</p><div class="space-y-1.5">${l.map(m=>`<div class="flex gap-2 text-sm"><span class="text-violet-300 font-mono text-xs mt-0.5 shrink-0">${n(m.time||"")}</span><span class="text-gray-300">${n(m.note||"")}</span></div>`).join("")}</div></div>`:""}
          ${d.length?`<div class="rounded-2xl bg-white/5 border border-white/10 p-4"><p class="text-xs text-gray-400 uppercase tracking-wide font-bold mb-2">Sections (${d.length})</p><div class="space-y-2">${d.map(m=>`<div><p class="text-sm font-bold text-white">${n(m.time||"")} · ${n(m.title||"")}</p><p class="text-sm text-gray-400">${n(m.description||"")}</p></div>`).join("")}</div></div>`:""}
          ${i.audio_notes?`<div class="rounded-2xl bg-white/5 border border-white/10 p-4"><p class="text-xs text-gray-400 uppercase tracking-wide font-bold mb-1">Audio</p><p class="text-sm text-gray-300">${n(i.audio_notes)}</p></div>`:""}
          ${u.length?`<div class="rounded-2xl bg-red-500/10 border border-red-500/20 p-4"><p class="text-xs text-gray-400 uppercase tracking-wide font-bold mb-1">Warnings</p><ul class="list-disc list-inside text-sm text-red-200 space-y-1">${u.map(m=>`<li>${n(m)}</li>`).join("")}</ul></div>`:""}
        </div>
        ${x}
        <div class="mt-5 flex flex-wrap gap-2 items-center">
          ${f}
        </div>
      </div>
    </div>`}function ss(e){const t=yt(e),a=Fe(e),i=mt(e),o=window._productSelection?.has(e.property_id),s=H(i==="archived"?"inactive":i==="active"?"active":"inactive"),r=Z(e.created_at),l=!!e.is_featured,d=(Array.isArray(e.images)?e.images:[]).filter(I).length,u=d>0||!!ye(e),b=e.ai_video_scan&&e.ai_video_scan.status?e.ai_video_scan:null,g=t?qe(t,"w-full h-full object-cover"):xe("w-full h-full"),x=ye(e),f=x?`<div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-blue-500/20 bg-black">
        ${qe(x,"w-full h-full object-cover",{autoplay:!0,loop:!0})}
        <span class="absolute bottom-2 left-2 badge bg-black/70 text-white border-white/20 text-[10px] !px-2 !py-0.5">▶ Playing</span>
        ${b?`<span class="absolute bottom-2 right-2 badge bg-violet-500/80 text-white border-violet-300/40 text-[10px] !px-2 !py-0.5">AI ${Math.round(b.confidence||0)}%</span>`:""}
      </div>`:"",m=e.is_active?`unpublishProduct('${e.property_id}')`:`publishProduct('${e.property_id}')`,h=e.is_active?"Unpublish":"Publish",E=e.is_active?"bg-amber-500/15 text-amber-200 hover:bg-amber-500/25":"bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25";return`<article data-id="${e.property_id}" data-cat="${n(e.category||"")}" data-status="${i}" data-featured="${l?"featured":"standard"}" onclick="editProduct('${e.property_id}')" title="Tap anywhere to edit this product" class="prod-card glass-soft border ${o?"border-blue-400/60":"border-blue-500/15"} rounded-3xl p-5 flex flex-col gap-4 transition hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer select-none active:scale-[.99]">
    ${f}
    <div class="flex items-start gap-4">
      <input type="checkbox" class="prod-check accent-blue-500 w-5 h-5 mt-1 shrink-0" value="${e.property_id}" ${o?"checked":""} onclick="event.stopPropagation()" onchange="toggleProductSelection('${e.property_id}', this.checked)">
      ${x?"":`<div class="relative w-24 h-24 rounded-2xl overflow-hidden border border-blue-500/20 shrink-0 bg-[#0b1124]">
        ${g}${l?'<span class="absolute top-1.5 left-1.5 text-[10px] font-black px-2 py-0.5 rounded-lg bg-amber-400 text-[#111827]">Featured</span>':""}
      </div>`}
      <div class="min-w-0 flex-1">
        <h3 class="text-lg font-black text-white leading-snug line-clamp-2">${n(e.title||"Untitled Product")}</h3>
        <p class="text-xs text-gray-500 font-mono mt-1">SKU: ${n(gt(e))}</p>
        <div class="mt-2 flex items-center gap-2 flex-wrap">
          ${s}
          ${b?`<span class="badge bg-violet-500/15 text-violet-200 border-violet-500/30" title="AI scanned: ${n(b.label||"")}">AI Scanned · ${Math.round(b.confidence||0)}%</span>`:""}
          <span class="badge bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20">${n(e.category||"Uncategorized")}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2.5 text-sm">
      <div class="rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5">
        <span class="text-gray-400 text-xs">Price</span>
        <p class="text-emerald-300 font-black text-base">
          ${Ko(e)}
        </p>
      </div>
      <div class="rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5"><span class="text-gray-400 text-xs">Discount</span><p class="text-amber-300 font-bold">${n(Yo(e))}</p></div>
      <div class="rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5"><span class="text-gray-400 text-xs">Stock</span><p class="text-gray-200 font-bold">${e.stock_quantity!=null?n(e.stock_quantity):"Unlimited"}</p></div>
      <div class="rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5"><span class="text-gray-400 text-xs">Brand</span><p class="text-gray-200 font-bold truncate">${n(e.brand||"N/A")}</p></div>
      <div class="rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5"><span class="text-gray-400 text-xs">Views</span><p class="text-blue-300 font-bold">${Ft(e).toLocaleString()}</p></div>
      <div class="rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5"><span class="text-gray-400 text-xs">Sales</span><p class="text-cyan-300 font-bold">${qt(e).toLocaleString()}</p></div>
    </div>

    <div class="flex items-center justify-between text-xs text-gray-500 border-t border-blue-500/10 pt-3">
      <span>Date Added: ${n(r)}</span>
      <span>${d} video${d===1?"":"s"}</span>
    </div>

    <div class="flex flex-wrap gap-2 mt-auto">
      <button onclick="event.stopPropagation();editProduct('${e.property_id}')" class="btn-press flex-1 min-w-[9.5rem] px-5 py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white transition shadow-lg shadow-blue-600/15">Edit Product</button>
      ${u?`<button onclick="event.stopPropagation();watchProductVideo('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-violet-500/15 text-violet-200 hover:bg-violet-500/25 transition">${b?"Watch &amp; Re-scan":"Watch &amp; Scan with AI"}</button>`:""}
      <button onclick="event.stopPropagation();quickEditProduct('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/25 transition">Quick Edit</button>
      <button onclick="event.stopPropagation();previewProduct('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-sky-500/15 text-sky-200 hover:bg-sky-500/25 transition">Preview</button>
      <button onclick="event.stopPropagation();${m}" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold ${E} transition">${h}</button>
      <button onclick="event.stopPropagation();duplicateProduct('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-white/10 text-gray-200 hover:bg-white/20 transition">Duplicate</button>
      <button onclick="event.stopPropagation();archiveProduct('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-red-500/15 text-red-200 hover:bg-red-500/25 transition">Archive</button>
      <button onclick="event.stopPropagation();shareProductFromAdmin('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-violet-500/15 text-violet-200 hover:bg-violet-500/25 transition">Share</button>
      <button onclick="event.stopPropagation();deleteProduct('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-rose-600/15 text-rose-200 hover:bg-rose-600/25 transition">Delete</button>
      <button onclick="event.stopPropagation();openProductMoreActions('${e.property_id}')" class="btn-press px-4 py-3.5 rounded-2xl text-sm font-bold bg-gray-600/20 text-gray-200 hover:bg-gray-600/35 transition">More</button>
    </div>

    ${a.length?`<div class="flex flex-wrap gap-1.5">${a.slice(0,6).map(S=>`<span class="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-200">${n(S)}</span>`).join("")}</div>`:'<div class="text-xs text-gray-500">No tags</div>'}
  </article>`}function ri(e,t){const a=[...e],i=o=>new Date(o||0).getTime()||0;return t==="oldest"?a.sort((o,s)=>i(o.created_at)-i(s.created_at)):t==="price-high"?a.sort((o,s)=>de(s.price)-de(o.price)):t==="price-low"?a.sort((o,s)=>de(o.price)-de(s.price)):t==="sales-high"?a.sort((o,s)=>qt(s)-qt(o)):t==="views-high"?a.sort((o,s)=>Ft(s)-Ft(o)):a.sort((o,s)=>i(s.created_at)-i(o.created_at)),a}function ni(e){const t=document.getElementById("products-grid"),a=document.getElementById("products-empty"),i=document.getElementById("products-result-count");if(!t)return;const o=window._productsCardLimit||60,s=e.slice(0,o);t.innerHTML=s.map(ss).join(""),i&&(i.textContent=String(e.length));const r=document.getElementById("products-more");if(r){const l=e.length-s.length;l>0?r.innerHTML=`<button onclick="loadMoreProducts()" class="btn-press px-8 py-4 rounded-2xl text-base font-black bg-blue-500/15 text-blue-200 hover:bg-blue-500/25 border border-blue-500/25 transition">Show ${Math.min(60,l)} more (${l} left)</button>`:r.innerHTML=e.length>60?'<span class="text-sm text-gray-500">All products shown</span>':""}a&&a.classList.toggle("hidden",e.length>0),updateBulkBar(),Qo(),window.lucide&&lucide.createIcons()}window.loadMoreProducts=function(){window._productsCardLimit=(window._productsCardLimit||60)+60,filterProducts(!0)};function li(e){const t=document.getElementById("products-table-body"),a=document.getElementById("products-result-count");t&&(t.innerHTML=e.length===0?'<tr><td colspan="7" class="text-center text-gray-500 py-10">No products found.</td></tr>':e.map(i=>{const o=yt(i),s=o?qe(o,"w-9 h-9 rounded-lg object-cover border border-blue-500/20 shrink-0"):xe("w-9 h-9 rounded-lg border border-blue-500/20 shrink-0"),r=mt(i),l=window._productSelection?.has(i.property_id),d=i.is_active?`unpublishProduct('${i.property_id}')`:`publishProduct('${i.property_id}')`,u=i.is_active?"Unpublish":"Publish";return`<tr class="prod-table-row" data-id="${i.property_id}" style="cursor:pointer">
          <td>
            <div class="flex items-center gap-2.5" onclick="editProduct('${i.property_id}')">
              <input type="checkbox" class="prod-check accent-blue-500" value="${i.property_id}" ${l?"checked":""} onclick="event.stopPropagation()" onchange="toggleProductSelection('${i.property_id}', this.checked)">
              ${s}
              <div class="min-w-0">
                <p class="text-xs font-bold text-white truncate max-w-[160px]">${n(i.title||"Untitled Product")}</p>
                <p class="text-[10px] font-mono text-gray-500">${n(gt(i))}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-gray-300">${n(i.category||"Uncategorized")}</span>
              ${i.ai_video_scan&&i.ai_video_scan.status?`<span class="badge bg-violet-500/15 text-violet-200 border-violet-500/30 text-[9px] !px-1.5 !py-0.5" title="AI scanned: ${n(i.ai_video_scan.label||"")}">AI · ${Math.round(i.ai_video_scan.confidence||0)}%</span>`:""}
            </div>
          </td>
          <td>
            <div class="text-xs">
              ${(()=>{const b=de(i.price),g=parseFloat(i.real_price);return Number.isFinite(g)&&g>0&&g>b?`<span class="text-[10px] text-gray-500 price-strike line-through block">$${g.toLocaleString()}</span><span class="font-bold text-emerald-400">$${b.toLocaleString()}</span>`:`<span class="font-bold text-emerald-400">$${b.toLocaleString()}</span>`})()}
            </div>
          </td>
          <td><span class="text-xs text-gray-300">${i.stock_quantity!=null?n(i.stock_quantity):"Unlimited"}</span></td>
          <td>${H(r==="archived"?"inactive":r==="active"?"active":"inactive")}</td>
          <td><span class="text-xs text-gray-500">${Z(i.created_at)}</span></td>
          <td>
            <div class="flex gap-1">
              <button onclick="editProduct('${i.property_id}')" class="btn-press p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition" title="Edit"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>
              ${ye(i)?`<button onclick="scanProductVideo('${i.property_id}')" class="btn-press p-1.5 text-violet-400 hover:bg-violet-500/10 rounded-lg transition" title="Scan Video with AI"><i data-lucide="scan-line" class="w-3.5 h-3.5"></i></button>`:""}
              <button onclick="quickEditProduct('${i.property_id}')" class="btn-press p-1.5 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition" title="Quick Edit"><i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i></button>
              <button onclick="${d}" class="btn-press p-1.5 ${i.is_active?"text-amber-400 hover:bg-amber-500/10":"text-emerald-400 hover:bg-emerald-500/10"} rounded-lg transition" title="${u}"><i data-lucide="${i.is_active?"eye-off":"eye"}" class="w-3.5 h-3.5"></i></button>
              <button onclick="archiveProduct('${i.property_id}')" class="btn-press p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Archive"><i data-lucide="archive" class="w-3.5 h-3.5"></i></button>
            </div>
          </td>
        </tr>`}).join(""),a&&(a.textContent=String(e.length)),window.lucide&&lucide.createIcons())}window.setProductView=function(e){window._productView=e==="table"?"table":"card";const t=document.getElementById("products-grid"),a=document.getElementById("products-table-wrap"),i=document.getElementById("view-card-btn"),o=document.getElementById("view-table-btn"),s=document.getElementById("products-empty"),r=window._productsData||[];t&&t.classList.toggle("hidden",e==="table"),a&&(a.classList.toggle("hidden",e!=="table"),e==="table"&&li(r)),i&&i.classList.toggle("active",e!=="table"),o&&o.classList.toggle("active",e==="table"),s&&s.classList.toggle("hidden",r.length>0)};window.filterProducts=function(e){const t=window._productFilters||{};t.search=(document.getElementById("prod-search")?.value||"").trim().toLowerCase(),t.category=document.getElementById("prod-cat-filter")?.value||"",t.tag=document.getElementById("prod-tag-filter")?.value||"",t.status=document.getElementById("prod-status-filter")?.value||"",t.featured=document.getElementById("prod-featured-filter")?.value||"",t.sort=document.getElementById("prod-sort")?.value||"newest",window._productFilters=t;const a=(window._productsData||[]).filter(o=>{const s=[o.title,o.brand,o.category,gt(o),Fe(o).join(" "),o.description].join(" ").toLowerCase();return!(t.search&&!s.includes(t.search)||t.category&&(o.category||"")!==t.category||t.tag&&!Fe(o).includes(t.tag)||t.status&&mt(o)!==t.status||t.featured&&t.featured==="featured"!=!!o.is_featured)}),i=ri(a,t.sort);e||(window._productsCardLimit=60),ni(i),window._productView==="table"&&li(i)};window.productSearchKeydown=function(e){if(e.key!=="Enter")return;const t=(document.getElementById("prod-search")?.value||"").trim().toLowerCase();if(!t)return;const a=window._productFilters||{},i=(window._productsData||[]).filter(s=>!(![s.title,s.brand,s.category,gt(s),Fe(s).join(" "),s.description].join(" ").toLowerCase().includes(t)||a.category&&(s.category||"")!==a.category||a.tag&&!Fe(s).includes(a.tag)||a.status&&mt(s)!==a.status||a.featured&&a.featured==="featured"!=!!s.is_featured)),o=ri(i,a.sort||"newest")[0];o?editProduct(o.property_id):p("No product matched that search","error")};window.resetProductFilters=function(){window._productFilters={search:"",category:"",tag:"",status:"",featured:"",sort:"newest"},["prod-search","prod-cat-filter","prod-tag-filter","prod-status-filter","prod-featured-filter","prod-sort"].forEach(t=>{const a=document.getElementById(t);a&&(t==="prod-sort"?a.value="newest":a.value="")}),filterProducts()};window.toggleProductSelection=function(e,t){window._productSelection||(window._productSelection=new Set),t?window._productSelection.add(e):window._productSelection.delete(e),updateBulkBar()};window.toggleSelectAll=function(e,t){document.querySelectorAll("."+t).forEach(a=>{a.checked=e.checked;const i=a.value;window._productSelection||(window._productSelection=new Set),e.checked?window._productSelection.add(i):window._productSelection.delete(i)}),updateBulkBar()};window.toggleSelectAllProducts=function(e){document.querySelectorAll(".prod-check").forEach(t=>{t.checked=!!e,window._productSelection||(window._productSelection=new Set),e?window._productSelection.add(t.value):window._productSelection.delete(t.value)}),updateBulkBar()};window.updateBulkBar=function(){const e=window._productSelection?window._productSelection.size:0,t=document.getElementById("bulk-actions"),a=document.getElementById("bulk-count");t&&(t.classList.toggle("hidden",e===0),e>0&&t.classList.add("flex")),a&&(a.textContent=`${e} selected`)};function ft(){return window._productSelection?[...window._productSelection]:[]}function Y(e){const t=String(e?.message||e?.code||"").toLowerCase();return t.includes("row-level security")||t.includes("permission denied")||t.includes("permission denied for table")||t.includes("new row violates row-level security")||t.includes("not permitted")||t.includes("rls policy")}function di(e,t,a){return e&&Y(e)?(p(`âš ï¸ ${a} blocked: Your account is signed in but the database admin role is not active. Re-run the admin permission migration, or contact the owner.`,"error"),!0):e?(t&&t(),p(`${a} saved locally (DB unavailable): ${e.message||"unknown error"}`,"info"),!0):!1}function Lt(e,t){if(!e)return`${t} failed for an unknown reason. Please try again.`;const a=String(e.message||""),i=e.code||"";return Y(e)?`${t} was BLOCKED: your account is signed in but the database admin role is not active. Re-run the admin permission migration (or contact the owner), then press Publish again.`:String(i)==="401"||/jwt|token|not authenticated|unauthorized|invalid api key/i.test(a)?`${t} failed: your sign-in session expired or is invalid. Please sign out and sign back in, then try again. Your changes are still in the form.`:String(i)==="23505"||/duplicate key|unique constraint/i.test(a)?`${t} failed: a duplicate-record conflict occurred in the database. Refresh the page and try again.`:String(i)==="23503"||/foreign key/i.test(a)?`${t} failed: the database rejected a reference (foreign key). Refresh the page, re-open the product and try again.`:String(i)==="42P01"||/column .* does not exist|relation .* does not exist/i.test(a)?`${t} failed: the database schema is out of date. Run the latest database migration, then try again.`:String(i)==="23502"||/null value in column .* violates/i.test(a)?`${t} failed: a required field was rejected by the database. Fill in every required field, then try again.`:/failed to fetch|networkerror|network request|fetch failed|load failed|offline|ERR_NAME|ERR_CONNECTION|timeout/i.test(a)?`${t} failed: no connection to the server. Check your internet connection and press Publish again. Your changes are still in the form.`:String(i)==="42501"||/permission denied|row-level security/i.test(a)?`${t} was BLOCKED by database permissions. Re-run the admin permission migration (or contact the owner), then try again.`:/rate limit|too many requests/i.test(a)?`${t} failed: too many requests were sent at once. Wait a few seconds and press Publish again.`:`${t} failed: ${a||"an unexpected database error occurred"}. Nothing was saved — your changes are still in the form, so you can press Publish again.`}function rs(e){const t=String(e?.title||"").trim();if(!t)return"";const a=e?.price&&typeof e.price=="object"?e.price.price:e?.price,i=Number(a)||0,o=[e?.city,e?.state,e?.country].filter(Boolean).join(", ")||String(e?.product_location||"").trim(),s=String(e?.availability_status||"").trim()||"In Stock";let r=t;if(i>0)try{r+=` for ${i.toLocaleString("en-US",{style:"currency",currency:e?.currency||"USD",maximumFractionDigits:0})}`}catch{r+=` for $${i.toLocaleString("en-US")}`}r+=` — ${s}.`,o&&(r+=` Located in ${o}.`);const l=String(e?.description||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();return l&&(r+=` ${l}`),r.length>235?r.slice(0,235).replace(/\s+\S*$/,"")+"…":r}async function xa(e){try{let{data:{session:i}}=await c.auth.getSession();if(!i){const{data:r}=await c.auth.getSession();i=r?.session}if(!i)return{error:new Error("Your sign-in session has expired. Please sign out and sign back in, then press Publish again.")};const{data:{user:o},error:s}=await c.auth.getUser();if(s||!o)return{error:new Error("Your sign-in session is invalid. Please sign out and sign back in, then press Publish again.")}}catch(i){return console.error("[safePublishShowroom] Auth check failed:",i),{error:new Error("Could not verify your sign-in status. Check your internet connection and try again.")}}String(e?.meta_description||"").trim()||(e.meta_description=rs(e));const t={...e||{}};for(const i of["created_at","updated_at","published_at"]){const o=t[i];if(o==null||o===""){delete t[i];continue}if(typeof o=="string"){const s=new Date(o);t[i]=Number.isNaN(s.getTime())?new Date().toISOString():s.toISOString()}else o instanceof Date&&!Number.isNaN(o.getTime())?t[i]=o.toISOString():delete t[i]}const a={...e,...t,updated_at:new Date().toISOString()};if(a.property_id){const{error:i}=await c.from("showroom_listings").upsert(a,{onConflict:"property_id"});if(!i)return{error:null};console.warn("[safePublishShowroom] Direct upsert failed, trying RPC fallback:",i?.message||i)}else{const{error:i}=await c.from("showroom_listings").insert(a);if(!i)return{error:null};console.warn("[safePublishShowroom] Direct insert failed, trying RPC fallback:",i?.message||i)}try{const i={...a};delete i.id;const{data:o,error:s}=await c.rpc("publish_showroom_upsert",{p_data:[i]});return s?(console.error("[safePublishShowroom] RPC fallback also failed:",s),{error:new Error(`Database write failed: ${s.message||"unknown error"}. Your changes are preserved in the form — please try again.`)}):(console.log("[safePublishShowroom] RPC fallback succeeded, rows affected:",o),{error:null})}catch(i){return console.error("[safePublishShowroom] RPC exception:",i),{error:new Error(`Database write failed: ${i.message||"network error"}. Your changes are preserved in the form — please try again.`)}}}window.bulkToggleActive=async function(e){const t=ft();if(!t.length)return;const a=await Promise.all(t.map(s=>{const r=se((window._productsData||[]).find(l=>l.property_id===s));return c.from("showroom_listings").upsert({...r,property_id:s,is_active:e},{onConflict:"property_id"})}));if(a.some(s=>s.error&&Y(s.error))){p(`âš ï¸ ${t.length} products NOT ${e?"published":"unpublished"}: database admin role blocked the write. Re-run the admin permission migration.`,"error"),window._productSelection=new Set,M();return}const o=a.filter(s=>s.error).length;p(`${t.length-o}/${t.length} products ${e?"published":"unpublished"}${o?` (${o} failed: ${a.find(s=>s.error)?.error?.message||"error"})`:""}`,o?"error":"success"),window._productSelection=new Set,M()};window.bulkDuplicateProducts=async function(){const e=ft();if(e.length){for(const t of e)await duplicateProduct(t,!0);p(`${e.length} products duplicated`),window._productSelection=new Set,M()}};window.bulkArchive=async function(){const e=ft();if(!e.length||!confirm(`Archive ${e.length} products? They will be hidden but not deleted.`))return;const t=await Promise.all(e.map(o=>c.from("showroom_listings").update({is_active:!1,availability_status:"Archived"}).eq("property_id",o)));if(t.some(o=>o.error&&Y(o.error))){p("âš ï¸ Archive blocked: database admin role rejected the write. Re-run the admin permission migration.","error"),window._productSelection=new Set,M();return}const i=t.filter(o=>o.error).length;p(`${e.length-i}/${e.length} products archived${i?` (${i} failed)`:""}`,i?"error":"success"),window._productSelection=new Set,M()};window.bulkDeleteProducts=async function(){const e=ft();if(!e.length||!confirm(`Delete ${e.length} products permanently? This action cannot be undone.`))return;const t=await Promise.all(e.map(o=>c.from("showroom_listings").delete().eq("property_id",o)));if(t.some(o=>o.error&&Y(o.error))){p("âš ï¸ Delete blocked: database admin role rejected the write. Re-run the admin permission migration.","error"),window._productSelection=new Set,M();return}const i=t.filter(o=>o.error).length;p(`${e.length-i}/${e.length} products deleted${i?` (${i} failed)`:""}`,i?"error":"success"),window._productSelection=new Set,M()};window.previewProduct=async function(e){const t=await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle(),a=(window._productsData||[]).find(i=>i.property_id===e)||t.data;if(!a)return p("Product not found","error");j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box wide">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-black text-white">Product Live Preview</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="space-y-2">
            ${(()=>{const i=(a.images||[]).filter(I).slice(0,8),o=i[0]||"",s=o?`<video src="${n(o)}" class="w-full h-64 object-cover rounded-xl border border-blue-500/20" muted playsinline preload="metadata"></video>`:xe("w-full h-64 rounded-xl border border-blue-500/20"),r=i.map((l,d)=>d===0?`<video src="${n(l)}" class="w-12 h-12 rounded-lg object-cover border border-blue-500/20 ring-2 ring-blue-400" muted playsinline preload="metadata"></video>`:`<video src="${n(l)}" class="w-12 h-12 rounded-lg object-cover border border-blue-500/20" muted playsinline preload="metadata"></video>`).join("");return`${s}<div class="flex flex-wrap gap-2">${r}</div>`})()}
          </div>
          <div class="space-y-2">
            <h4 class="text-lg font-black text-white">${n(a.title||"Untitled Product")}</h4>
            <div class="flex items-center gap-2">${H(a.is_active?"active":"inactive")}${a.is_featured?'<span class="badge bg-amber-500/15 text-amber-200 border-amber-500/30">Featured</span>':""}</div>
            <p class="text-xs text-gray-400">${n(a.description||"No description")}</p>
            <div class="grid grid-cols-2 gap-2 text-xs mt-2">
              <div class="glass-soft border border-blue-500/15 rounded-lg p-2"><span class="text-gray-500">Price</span><p class="text-emerald-300 font-black">$${de(a.price).toLocaleString()}</p></div>
              <div class="glass-soft border border-blue-500/15 rounded-lg p-2"><span class="text-gray-500">Stock</span><p class="text-gray-200 font-bold">${a.stock_quantity!=null?n(a.stock_quantity):"Unlimited"}</p></div>
              <div class="glass-soft border border-blue-500/15 rounded-lg p-2"><span class="text-gray-500">Brand</span><p class="text-gray-200 font-bold">${n(a.brand||"N/A")}</p></div>
              <div class="glass-soft border border-blue-500/15 rounded-lg p-2"><span class="text-gray-500">Category</span><p class="text-gray-200 font-bold">${n(a.category||"N/A")}</p></div>
            </div>
            <div class="pt-2 flex gap-2">
              <button onclick="editProduct('${a.property_id}');closeModal();" class="btn-press px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl">Edit</button>
              <button onclick="shareProductFromAdmin('${a.property_id}')" class="btn-press px-3 py-2 bg-violet-600/70 hover:bg-violet-500 text-white text-xs font-bold rounded-xl">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>`)};window.quickEditProduct=async function(e){const t=await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle(),a=(window._productsData||[]).find(o=>o.property_id===e)||t.data;if(!a)return p("Product not found","error");const i=(Array.isArray(a.images)?a.images:[]).filter(I);j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-black text-white">Quick Edit Product</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition">Back</button>
        </div>
        <form onsubmit="saveQuickEditProduct(event,'${a.property_id}')" class="space-y-4">
          <div><label class="lbl">Title</label><input name="title" class="input-field" value="${n(a.title||"")}"></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="lbl">Real Price</label><input type="number" step="0.01" name="real_price" class="input-field" value="${n(a.real_price??a.specifications?.real_price??"")}" placeholder="Original price (crossed out)"></div>
            <div><label class="lbl">Discount Price</label><input type="number" step="0.01" name="price" class="input-field" value="${n(a.price||0)}" placeholder="Price customers pay"></div>
          </div>
          <div><label class="lbl">Availability</label><select name="availability_status" class="input-field">${["In Stock","Out of Stock","Pre-order","Limited Stock","Archived"].map(o=>`<option value="${o}" ${a.availability_status===o?"selected":""}>${o}</option>`).join("")}</select></div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span class="text-sm text-gray-300">Featured</span><input type="checkbox" name="is_featured" ${a.is_featured?"checked":""} class="accent-blue-500 w-5 h-5"></div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span class="text-sm text-gray-300">Published</span><input type="checkbox" name="is_active" ${a.is_active?"checked":""} class="accent-blue-500 w-5 h-5"></div>
          <div>
            <label class="lbl">Gallery Videos (up to 24)</label>
            <div id="drop-zone" class="drop-zone" onclick="pickMediaForForm('img-upload')">
              <i data-lucide="image-plus" class="w-10 h-10 text-blue-400 mx-auto mb-2"></i>
              <p class="text-base font-bold text-gray-300">Tap to add videos (up to 24)</p>
              <p class="text-sm text-gray-500 mt-1">MP4, WebM. First video is the cover.</p>
              <input type="file" id="img-upload" class="hidden" multiple accept="video/mp4,video/webm,video/*" onchange="handleImageUpload(event)">
            </div>
            <div id="image-preview" class="flex flex-wrap gap-2.5 mt-3">
              ${i.map((o,s)=>we(o,s)).join("")}
            </div>
            <div id="image-url-inputs">${i.map((o,s)=>`<input type="hidden" name="images" id="img-url-${s}" value="${n(o)}">`).join("")}</div>
            <p id="gallery-counter" class="text-sm mt-1 font-bold text-gray-400"></p>
          </div>
          <button type="submit" class="btn-press w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-base font-bold">Save Quick Edit</button>
        </form>
      </div>
    </div>`),ht(),vt(),Ie(),Te(),window.lucide&&lucide.createIcons()};window.saveQuickEditProduct=async function(e,t){e.preventDefault();const a=new FormData(e.target),i=[...document.querySelectorAll("#image-preview .img-thumb")].map(b=>b.dataset.url||(b.querySelector("video")?b.querySelector("video").getAttribute("src"):"")).filter(b=>b&&!String(b).startsWith("blob:")&&I(b)),o={title:a.get("title")||"Untitled Product",price:Math.max(W,Math.min(X,parseFloat(a.get("price"))||0)),stock_quantity:a.get("stock_quantity")===""?null:parseInt(a.get("stock_quantity"),10),availability_status:a.get("availability_status")||"In Stock",is_featured:a.get("is_featured")==="on",is_active:a.get("is_active")==="on"||i.length>=24,images:i},s=String(a.get("real_price")||"").trim(),r=s===""?null:parseFloat(s);if(r!=null&&!Number.isFinite(r)){p("Real Price must be a number.","error");return}const l=se((window._productsData||[]).find(b=>b.property_id===t)),d=l.specifications&&typeof l.specifications=="object"?l.specifications:{};o.specifications={...d,real_price:r!=null&&r>0?Math.round(r):null};const{error:u}=await c.from("showroom_listings").upsert({...l,...o,property_id:t},{onConflict:"property_id"});if(u){if(Y(u)){p("âš ï¸ Save blocked: database admin role rejected the write. Re-run the admin permission migration.","error"),z(),M();return}Mt(t,o),p("Quick edit saved locally","info")}else p(o.is_active?"Saved & published â€” your showroom shows it now":"Quick edit saved (draft)");z(),M()};window.publishProduct=function(e){return toggleProductActive(e,!0)};window.unpublishProduct=function(e){return toggleProductActive(e,!1)};window.shareProductFromAdmin=async function(e){const t=`${window.location.origin}/product/${encodeURIComponent(e)}`,a=(window._productsData||[]).find(d=>d.property_id===e)||(window._propertiesData||[]).find(d=>d.property_id===e)||Ae(e);if(a&&typeof window.openShareSheet=="function"){window.openShareSheet(a);return}const i=a&&String(a.title||"").trim()||"Product on Weverse Online Shop",o=a&&Number(a.price||0)>0?`${i} — ${ns(a)}
${t}`:`${i}
${t}`,r=await(async()=>{try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(t),!0}catch{}try{const d=document.createElement("textarea");return d.value=t,d.style.cssText="position:fixed;opacity:0;pointer-events:none",document.body.appendChild(d),d.focus(),d.select(),document.execCommand("copy"),d.remove(),!0}catch{return!1}})();let l=!1;if(navigator.share)try{await navigator.share({title:i,text:o,url:t}),l=!0}catch{}l||p(r?"Product link copied to clipboard":"Product link: "+t)};function ns(e){const t=Number(e&&typeof e.price=="object"?e.price.price:e&&e.price)||0,a=e&&e.currency||"USD";let i;try{i=t.toLocaleString("en-US",{style:"currency",currency:a,maximumFractionDigits:0})}catch{i="$"+t.toLocaleString("en-US")}return e&&e.price_period&&(i+="/"+e.price_period),i}window.deleteProduct=async function(e){if(!confirm("Delete this product permanently? This action cannot be undone."))return;const t=(window._productsData||[]).find(i=>i.property_id===e)||(window._propertiesData||[]).find(i=>i.property_id===e)||Ae(e),{error:a}=await c.from("showroom_listings").delete().eq("property_id",e);if(a&&!Y(a))return p("Delete failed: "+a.message,"error");Mi(e);try{const i=await La(e,!0);i&&i.error&&Y(i.error)?p("âš ï¸ Deleted, but the site-wide hidden list could not be saved: database admin role rejected the write. Re-run the admin permission migration.","error"):p("Product deleted")}catch{p("Product deleted")}t&&t.listing_type==="property"?wt():M()};window.openProductMoreActions=function(e){j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-black text-white">More Actions</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <button onclick="previewProduct('${e}');closeModal();" class="btn-press text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-200">Live Preview</button>
          <button onclick="quickEditProduct('${e}');closeModal();" class="btn-press text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-200">Quick Edit</button>
          <button onclick="duplicateProduct('${e}');closeModal();" class="btn-press text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-200">Duplicate</button>
          <button onclick="archiveProduct('${e}');closeModal();" class="btn-press text-left px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-sm font-semibold text-red-200">Archive</button>
        </div>
      </div>
    </div>`)};function ls(){const e=new Date().getHours();return e<12?"morning":e<17?"afternoon":"evening"}function ci(e){const t=document.getElementById("chart-revenue");if(!t)return;const a=[],i=new Date;for(let s=5;s>=0;s--){const r=new Date(i.getFullYear(),i.getMonth()-s,1);a.push({label:r.toLocaleString("default",{month:"short"}),month:r.getMonth(),year:r.getFullYear()})}const o=a.map(s=>e.filter(r=>{const l=new Date(r.created_at);return l.getMonth()===s.month&&l.getFullYear()===s.year&&["approved","payment_approved","delivered"].includes(r.status)}).reduce((r,l)=>r+(parseFloat(l.amount)||0),0));new Chart(t,{type:"bar",data:{labels:a.map(s=>s.label),datasets:[{label:"Revenue (USD)",data:o,backgroundColor:"rgba(59,130,246,.6)",borderColor:"rgb(59,130,246)",borderWidth:1,borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{ticks:{color:"#64748b",callback:s=>"$"+s.toLocaleString()},grid:{color:"rgba(59,130,246,.05)"}},x:{ticks:{color:"#64748b"},grid:{display:!1}}}}})}const ui=Ni.map(e=>e.name),pi=Oi,B={default:[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"model",label:"Model",type:"text"},{key:"color",label:"Color",type:"text"},{key:"size",label:"Size",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}],Phones:[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text",required:!0},{key:"model",label:"Model",type:"text",required:!0},{key:"storage",label:"Storage (e.g. 128GB)",type:"text"},{key:"ram",label:"RAM (e.g. 8GB)",type:"text"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}],"Computers & Laptops":[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text",required:!0},{key:"model",label:"Model",type:"text",required:!0},{key:"processor",label:"Processor (CPU)",type:"text"},{key:"ram",label:"RAM",type:"text"},{key:"storage",label:"Storage",type:"text"},{key:"display",label:"Display Size",type:"text"},{key:"graphics",label:"Graphics Card",type:"text"},{key:"os",label:"Operating System",type:"text"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}],Electronics:[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"model",label:"Model Number",type:"text"},{key:"color",label:"Color",type:"text"},{key:"voltage",label:"Voltage",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}],Shoes:[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text",required:!0},{key:"size",label:"Size",type:"text"},{key:"color",label:"Color",type:"text"},{key:"material",label:"Material",type:"text"},{key:"gender",label:"Gender",type:"select",options:["Men","Women","Unisex","Kids"]},{key:"condition",label:"Condition",type:"select",options:["New","Used"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}],Jewelry:[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"material",label:"Material (e.g. 14k Gold)",type:"text"},{key:"gemstone",label:"Gemstone",type:"text"},{key:"size",label:"Size / Weight",type:"text"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Used - Like New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}],Watches:[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text",required:!0},{key:"model",label:"Model",type:"text"},{key:"movement",label:"Movement (Quartz/Automatic)",type:"text"},{key:"case_material",label:"Case Material",type:"text"},{key:"water_resistance",label:"Water Resistance",type:"text"},{key:"color",label:"Dial Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"description",label:"Description",type:"textarea",span:2}],Gaming:[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"platform",label:"Platform (PS5, Xbox, PCâ€¦)",type:"text"},{key:"model",label:"Game / Model",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Used"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}],"Sports & Fitness":[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"size",label:"Size / Dimensions",type:"text"},{key:"color",label:"Color",type:"text"},{key:"material",label:"Material",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}]};["Men's Fashion","Women's Fashion","Fashion"].forEach(e=>B[e]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (T-Shirt, Dressâ€¦)",type:"text"},{key:"size",label:"Size",type:"text"},{key:"color",label:"Color",type:"text"},{key:"material",label:"Material",type:"text"},{key:"gender",label:"Gender",type:"select",options:["Men","Women","Unisex","Kids"]},{key:"condition",label:"Condition",type:"select",options:["New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}]);B["Bags & Accessories"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Handbag, Backpack, Luggageâ€¦)",type:"text"},{key:"size",label:"Size / Dimensions",type:"text"},{key:"material",label:"Material (e.g. Leather)",type:"text"},{key:"color",label:"Color",type:"text"},{key:"gender",label:"Gender",type:"select",options:["Men","Women","Unisex","Kids"]},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}];B["Beauty & Skincare"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Serum, Cream, Makeupâ€¦)",type:"text"},{key:"size",label:"Size (ml / g)",type:"text"},{key:"skin_type",label:"Skin Type",type:"text"},{key:"ingredients",label:"Key Ingredients",type:"text"},{key:"color",label:"Color / Shade",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Home & Kitchen"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"model",label:"Model",type:"text"},{key:"type",label:"Type (Appliance, Cookware, Decorâ€¦)",type:"text"},{key:"color",label:"Color",type:"text"},{key:"material",label:"Material",type:"text"},{key:"dimensions",label:"Dimensions",type:"text"},{key:"voltage",label:"Voltage / Power",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}];B.Furniture=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Sofa, Table, Chairâ€¦)",type:"text"},{key:"material",label:"Material",type:"text"},{key:"color",label:"Color",type:"text"},{key:"dimensions",label:"Dimensions",type:"text"},{key:"assembly",label:"Assembly Required",type:"select",options:["","Yes","No"]},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}];B["Garden & Outdoor"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Mower, Grill, Furnitureâ€¦)",type:"text"},{key:"material",label:"Material",type:"text"},{key:"color",label:"Color",type:"text"},{key:"dimensions",label:"Dimensions",type:"text"},{key:"weatherproof",label:"Weatherproof",type:"select",options:["","Yes","No"]},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Toys & Games"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"model",label:"Model / Set Name",type:"text"},{key:"age_range",label:"Age Range",type:"text"},{key:"material",label:"Material",type:"text"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Food & Groceries"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Snack, Beverage, Pantryâ€¦)",type:"text"},{key:"size",label:"Size / Weight",type:"text"},{key:"shelf_life",label:"Shelf Life",type:"text"},{key:"storage",label:"Storage Instructions",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","New (Sealed)","Open Box"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Baby & Kids"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Stroller, Clothing, Toyâ€¦)",type:"text"},{key:"age_range",label:"Age Range",type:"text"},{key:"size",label:"Size",type:"text"},{key:"material",label:"Material",type:"text"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}];B["Health & Medical"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Device, Supplement, Careâ€¦)",type:"text"},{key:"size",label:"Size / Quantity",type:"text"},{key:"usage",label:"Usage / Dosage",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}];B["Books & Education"]=[{key:"title",label:"Title / Book Name",type:"text",required:!0,span:2},{key:"author",label:"Author",type:"text"},{key:"publisher",label:"Publisher",type:"text"},{key:"language",label:"Language",type:"text"},{key:"format",label:"Format (Hardcover, Paperback, E-book)",type:"text"},{key:"isbn",label:"ISBN",type:"text"},{key:"pages",label:"Pages",type:"text"},{key:"edition",label:"Edition",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Like New","Very Good","Good","Fair"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Office & Stationery"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Notebook, Pen, Printerâ€¦)",type:"text"},{key:"material",label:"Material",type:"text"},{key:"color",label:"Color",type:"text"},{key:"size",label:"Size",type:"text"},{key:"quantity",label:"Quantity / Pack Size",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Pet Supplies"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text"},{key:"type",label:"Type (Food, Toy, Bed, Collarâ€¦)",type:"text"},{key:"pet_type",label:"Pet Type (Dog, Cat, Birdâ€¦)",type:"text"},{key:"size",label:"Size / Weight",type:"text"},{key:"material",label:"Material",type:"text"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Musical Instruments"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text",required:!0},{key:"model",label:"Model",type:"text"},{key:"type",label:"Type (Guitar, Piano, Drumsâ€¦)",type:"text"},{key:"material",label:"Material",type:"text"},{key:"color",label:"Color / Finish",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}];B["Cameras & Photography"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand",type:"text",required:!0},{key:"model",label:"Model",type:"text"},{key:"lens",label:"Lens",type:"text"},{key:"sensor",label:"Sensor",type:"text"},{key:"megapixels",label:"Megapixels",type:"text"},{key:"video",label:"Video Recording",type:"text"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"],required:!0},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}];B["Software & Digital"]=[{key:"title",label:"Product Title",type:"text",required:!0,span:2},{key:"brand",label:"Brand / Developer",type:"text"},{key:"type",label:"Type (Software, App, Licenseâ€¦)",type:"text"},{key:"platform",label:"Platform",type:"text"},{key:"license",label:"License Type",type:"text"},{key:"version",label:"Version",type:"text"},{key:"language",label:"Language",type:"text"},{key:"format",label:"Format",type:"text"},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B.Services=[{key:"title",label:"Service Title",type:"text",required:!0,span:2},{key:"type",label:"Service Type",type:"text"},{key:"duration",label:"Duration",type:"text"},{key:"location",label:"Location / Coverage",type:"text"},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];B["Social Media Accounts"]=[{key:"title",label:"Account Title",type:"text",required:!0,span:2},{key:"type",label:"Platform (Instagram, TikTokâ€¦)",type:"text"},{key:"followers",label:"Followers",type:"text"},{key:"engagement",label:"Engagement Rate",type:"text"},{key:"niche",label:"Niche",type:"text"},{key:"condition",label:"Status",type:"select",options:["Active","Verified","Suspended"]},{key:"price",label:"Price (USD)",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"description",label:"Description",type:"textarea",span:2}];pi.forEach(e=>B[e]=[{key:"title",label:"Vehicle Title",type:"text",required:!0,span:2,placeholder:"e.g. 2023 Toyota Land Cruiser V8 Turbo Diesel"},{key:"brand",label:"Brand",type:"text",required:!0},{key:"model",label:"Model",type:"text",required:!0},{key:"model_year",label:"Model Year",type:"text",placeholder:"e.g. 2023"},{key:"body_type",label:"Body Type",type:"select",options:["Sedan","SUV","Hatchback","Coupe","Convertible","Wagon","Pickup","Van","Truck","Sports Car","Luxury Sedan","Motorcycle","Yacht","Other"]},{key:"mileage",label:"Mileage",type:"text",placeholder:"e.g. 15,000 mi or 0 (new)"},{key:"engine",label:"Engine",type:"text",placeholder:"e.g. 4.0L V8 Turbo Diesel"},{key:"horsepower",label:"Horsepower (HP)",type:"text",placeholder:"e.g. 500 HP"},{key:"transmission",label:"Transmission",type:"select",options:["Automatic","Manual","CVT","Dual-Clutch","Semi-Automatic","Electric (Single Speed)"]},{key:"drive_type",label:"Drive Type",type:"select",options:["FWD","RWD","AWD","4WD"]},{key:"fuel_type",label:"Fuel Type",type:"select",options:["Gasoline","Diesel","Electric","Hybrid","Plug-in Hybrid","LPG","Bio-diesel"]},{key:"seating_capacity",label:"Seating Capacity",type:"text",placeholder:"e.g. 5 seats"},{key:"doors",label:"Number of Doors",type:"text",placeholder:"e.g. 4"},{key:"safety_features",label:"Safety Features (comma separated)",type:"text",placeholder:"ABS, Airbags, Lane Assist, Traction Controlâ€¦"},{key:"color",label:"Color",type:"text"},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"],required:!0},{key:"price",label:"Price",type:"number",required:!0},{key:"stock_quantity",label:"Stock Qty",type:"number"},{key:"warranty",label:"Warranty",type:"text"},{key:"description",label:"Description",type:"textarea",span:2}]);for(const e of Object.keys(B))B[e]=B[e].flatMap(t=>t.key!=="price"?[t]:[{key:"real_price",label:"Real Price (USD) â€” crossed out when a discount is active",type:"number",placeholder:"e.g. 250000 â€” original price before discount"},{...t,label:"Discount Price (USD) â€” the price customers pay",placeholder:"e.g. 200000 â€” the price customers actually pay"}]);function la(e=""){return Ne.map(t=>`<option value="${t.code}" ${e===t.code?"selected":""}>${t.flag} ${t.name}</option>`).join("")}function bi(e="USD"){return oa.map(t=>`<option value="${t}" ${e===t?"selected":""}>${t}</option>`).join("")}function Ut(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function P(e,t){const a=document.querySelector(`[name="${e}"]`);!a||t==null||(a.value=t)}function Nt(e){const t=document.getElementById(e);t&&(t.min=String(W),t.max=String(X),t.placeholder=`Price (${W} - ${X})`)}function wa(e){const t=document.getElementById(`${e}-country_code`),a=document.getElementById(`${e}-country`),i=document.getElementById(`${e}-currency`);if(!t)return;const o=Ne.find(s=>s.code===t.value);a&&o&&(a.value=o.name),i&&o&&(i.value=Xt(o.code))}function at(e,t){const a=document.getElementById(`${e}-image-requirement`),i=document.getElementById(`${e}-required_image_count`);i&&(i.value=t?String(t):""),a&&(t>0?(a.textContent=`This template fits up to ${t} images. Fewer images are perfectly fine â€” you can save and publish anytime.`,a.classList.remove("hidden")):(a.textContent="",a.classList.add("hidden")))}function Ot(e,t="full"){const a=document.getElementById("pf-catalog_template_id")?.value||"",i=document.getElementById("pf-currency")?.value||"USD",o=parseFloat(document.getElementById("pf-price")?.value)||W,s=ja({templateId:a,listingType:"product",category:e,countryCode:"US",currency:i,price:o});if(!s){at("pf",pi.includes(e)?24:0);return}at("pf",s.requiredImageCount||0),P("currency",s.currency),P("subcategory",s.subcategory),P("features_text",s.features.join(", ")),P("highlights_text",s.highlights.join(", ")),P("seo_keywords_text",s.seo_keywords.join(", ")),t==="full"?(P("title",s.title),P("description",s.description),P("brand",s.brand||""),P("model",s.model||""),P("color",s.color||""),P("size",s.size||""),P("condition",s.condition||"New")):P("description",s.description)}function Ht(e="full"){const t=document.getElementById("ppf-catalog_template_id")?.value||"",a=document.getElementById("ppf-country_code")?.value||"US",i=document.getElementById("ppf-currency")?.value||"USD",o=parseFloat(document.getElementById("ppf-price")?.value)||W,s=ja({templateId:t,listingType:"property",category:"Real Estate",countryCode:a,currency:i,price:o});if(!s){at("ppf",0);return}at("ppf",s.requiredImageCount||0),P("country",s.country),P("country_code",s.country_code),P("currency",s.currency),P("subcategory",s.subcategory),P("product_location",s.product_location),P("features_text",s.features.join(", ")),P("highlights_text",s.highlights.join(", ")),P("seo_keywords_text",s.seo_keywords.join(", ")),e==="full"?(P("title",s.title),P("description",s.description),P("property_type",s.property_type||""),P("bedrooms",s.bedrooms??""),P("bathrooms",s.bathrooms??""),P("building_size",s.building_size||""),P("land_size",s.land_size||""),P("furnished",s.furnished||"")):P("description",s.description)}window.applyProductCatalogTemplate=function(e,t="full"){Ot(e,t)};window.applyPropertyCatalogTemplate=function(e="full"){Ht(e)};function ds(e){return B[e]||B.default}function cs(e,t={},a=!1){return ds(e).map(o=>{const s=t[o.key]||"",r=o.span===2?"sm:col-span-2":"",l=!a&&o.required?"required":"",d=o.placeholder||o.label;let u="";if(o.type==="select")u=`<select class="input-field" name="${o.key}" id="pf-${o.key}" ${l}>
        <option value="">Selectâ€¦</option>
        ${o.options.map(b=>`<option value="${b}" ${s===b?"selected":""}>${b}</option>`).join("")}
      </select>`;else if(o.type==="textarea")u=`<textarea class="input-field" name="${o.key}" id="pf-${o.key}" rows="3" placeholder="Write a detailed descriptionâ€¦">${n(s)}</textarea>`;else{const g=["brand","model","color","size","material","platform"].includes(o.key)?`pf-list-${o.key}`:"",f=({brand:["Apple","Samsung","Sony","LG","HP","Dell","Lenovo","Asus","Nike","Adidas","Puma","Gucci","Rolex","Toyota","Mercedes","BMW","Tesla"],model:["Pro","Ultra","Max","SE","Standard","Plus","Series 1","Series 2"],color:["Black","White","Silver","Blue","Red","Green","Gold","Gray","Pink","Brown"],size:["XS","S","M","L","XL","XXL","32","34","36","38","40","42"],material:["Cotton","Leather","Stainless Steel","Aluminum","Wood","Glass","Plastic"],platform:["PS5","Xbox Series X","Nintendo Switch","PC","Android","iOS"]}[o.key]||[]).map(m=>`<option value="${n(m)}"></option>`).join("");u=`<input type="${o.type}" class="input-field" name="${o.key}" id="pf-${o.key}" value="${n(s)}" placeholder="${d}" ${g?`list="${g}"`:""} ${l}>${g?`<datalist id="${g}">${f}</datalist>`:""}`}return`<div class="${r}"><label class="lbl">${o.label}${o.required?a?"":" *":""}</label>${u}</div>`}).join("")}window.showAddProductStep1=function(){j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">Add New Product</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>


        <div class="flex items-center gap-3 mb-3">
          <div class="flex-1 h-px bg-gray-800"></div>
          <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wide">or choose a category manually</span>
          <div class="flex-1 h-px bg-gray-800"></div>
        </div>

        <p class="text-xs text-gray-400 mb-3">Choose the category that best matches your product. The form will show smart fields automatically.</p>
        <div class="relative mb-3">
          <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"></i>
          <input id="product-category-search" type="search" class="input-field pl-9" placeholder="Search category..." oninput="filterProductCategoryChoices(this.value)">
        </div>
        <div id="product-category-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto scrollbar-thin pr-1">
          ${ui.map(e=>`
            <button data-category="${n(e).toLowerCase()}" onclick="showAddProductStep2('${e.replace(/'/g,"\\'")}')" class="btn-press flex items-center gap-3 p-4 glass-soft border border-blue-500/15 hover:border-blue-500/40 rounded-2xl transition text-left">
              <i data-lucide="tag" class="w-5 h-5 text-blue-400 shrink-0"></i>
              <span class="text-sm font-semibold text-gray-200">${n(e)}</span>
            </button>`).join("")}
        </div>
      </div>
    </div>`),window.lucide&&lucide.createIcons()};window.filterProductCategoryChoices=function(e){const t=String(e||"").trim().toLowerCase();document.querySelectorAll("#product-category-grid [data-category]").forEach(a=>{const i=!t||a.dataset.category.includes(t);a.classList.toggle("hidden",!i)})};window.showAddProductStep2=function(e,t={}){const a=!!t.property_id,i=Da("product",e),o=t.currency||"USD";j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeProductFormModal()">
      <div class="modal-box wide">
        <div class="flex items-center justify-between gap-3 mb-6">
          <div class="min-w-0">
            <h3 class="text-2xl font-black text-white">${a?"Edit Product":"Add Product"} â€” ${n(e)}</h3>
            <p class="text-sm text-gray-500 mt-1 truncate">${a?`Editing: ${n(t.property_id)}`:"Fill in the product details below"}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            ${a&&ye(t)?`<button type="button" onclick="scanProductVideo('${n(t.property_id)}')" class="btn-press px-4 py-2.5 rounded-xl text-sm font-bold bg-violet-600/70 hover:bg-violet-500 text-white transition flex items-center gap-1.5"><i data-lucide="scan-line" class="w-4 h-4"></i> Scan Video with AI</button>`:""}
            ${a?'<button type="button" onclick="closeProductFormModal()" class="btn-press px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-700/60 hover:bg-gray-600 text-gray-200 transition flex items-center gap-1.5"><i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Product Manager</button>':'<button type="button" onclick="showAddProductStep1()" class="btn-press px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-700/60 hover:bg-gray-600 text-gray-200 transition flex items-center gap-1.5" title="Change category"><i data-lucide="arrow-left" class="w-4 h-4"></i> Category</button>'}
            <button type="button" onclick="closeProductFormModal()" class="btn-press px-4 h-11 flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-white hover:bg-gray-800 transition" title="Close (X) â€” return to Product Manager">
              <i data-lucide="x" class="w-4 h-4 mr-1.5"></i>Back
            </button>
          </div>
        </div>

        <form id="product-form" onsubmit="saveProduct(event,'${n(e)}','${a?t.property_id:""}')" class="space-y-6">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-bold text-white uppercase tracking-wide">Global Catalog Autofill</p>
                <p class="text-sm text-gray-500 mt-1">Pick a template, country, and currency to auto-build the listing title, description, and metadata.</p>
              </div>
              <button type="button" onclick="applyProductCatalogTemplate('${n(e)}')" class="btn-press px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition">Refresh Template</button>
            </div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Catalog Template</label><select class="input-field" name="catalog_template_id" id="pf-catalog_template_id" onchange="applyProductCatalogTemplate('${n(e)}')"><option value="">Choose a template...</option>${i.map(s=>`<option value="${s.id}">${n(s.label)} - ${n(s.subcategory||s.category)}</option>`).join("")}</select></div>
              <div class="sm:col-span-2"><label class="lbl">Currency</label><select class="input-field" name="currency" id="pf-currency" onchange="applyProductCatalogTemplate('${n(e)}')">${bi(o)}</select></div>
            </div>
            <p id="pf-image-requirement" class="hidden text-sm text-amber-300"></p>
            <input type="hidden" name="required_image_count" id="pf-required_image_count" value="">
          </div>

          <div id="product-autosave-note" class="hidden p-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-sm text-emerald-200"></div>

          <!-- Step 1: Image Upload -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="lbl !mb-0">Step 1: Upload Product Images or Videos</label>
              <span class="text-sm text-gray-500">Upload one or multiple images before publishing</span>
            </div>
            <div id="drop-zone" class="drop-zone" onclick="pickMediaForForm('img-upload')">
              <i data-lucide="image-plus" class="w-12 h-12 text-blue-400 mx-auto mb-3"></i>
              <p class="text-lg font-bold text-gray-300">Click or drag & drop product videos here</p>
              <p class="text-sm text-gray-500 mt-1">MP4, WebM. First video = cover.</p>
<input type="file" id="img-upload" class="hidden" multiple accept="video/mp4,video/webm,video/*" onclick="event.stopPropagation()" onchange="handleImageUpload(event)">
            </div>
            <div id="image-preview" class="flex flex-wrap gap-2.5 mt-3">
              ${(t.images||[]).filter(I).map((s,r)=>we(s,r)).join("")}
            </div>
            <p class="text-sm text-gray-500 mt-1">Drag to reorder â€¢ âœ• deletes any video (even the main/cover â€” the next video becomes the cover) â€¢ â†» replaces â€¢ Upload up to 24 gallery videos</p>
            <p id="gallery-counter" class="text-sm mt-1 font-bold text-gray-400"></p>
            <div id="image-url-inputs">
              ${(t.images||[]).filter(I).map((s,r)=>`<input type="hidden" name="images" id="img-url-${r}" value="${n(s)}">`).join("")}
            </div>
          </div>


          <!-- Step 2: Product Details -->
          <div class="text-sm text-blue-200 font-bold uppercase tracking-wide">Step 2: Product Details</div>
          <div class="form-grid form-grid-2">
            ${cs(e,t,a)}
          </div>

          <div class="form-grid form-grid-2">
            <div class="sm:col-span-2"><label class="lbl">Subcategory</label><input class="input-field" name="subcategory" value="${n(t.subcategory||"")}" placeholder="e.g. Smartphones, SUVs, Model Houses"></div>
            <div class="sm:col-span-2"><label class="lbl">Features (comma separated)</label><input class="input-field" name="features_text" value="${n((t.features||[]).join(", "))}" placeholder="5G connectivity, OLED display, fast charging"></div>
            <div class="sm:col-span-2"><label class="lbl">Highlights (comma separated)</label><input class="input-field" name="highlights_text" value="${n((t.highlights||[]).join(", "))}" placeholder="Retail-ready packaging, premium demand, strong presentation"></div>
            <div class="sm:col-span-2"><label class="lbl">SEO Keywords (comma separated)</label><input class="input-field" name="seo_keywords_text" value="${n((t.seo_keywords||[]).join(", "))}" placeholder="smartphone, unlocked, global shipping"></div>
          </div>

          <!-- Tags / Badges -->
          <div>
            <label class="lbl">Product Tags / Badges</label>
            <div class="flex flex-wrap gap-2.5">
              ${["New Arrival","Best Seller","Hot Deal","Featured","Limited Stock"].map(s=>`
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="tags" value="${s}" ${(t.tags||[]).includes(s)?"checked":""} class="accent-blue-500 w-5 h-5">
                  <span class="text-sm text-gray-300">${s}</span>
                </label>`).join("")}
            </div>
          </div>

          <!-- Availability -->
          <div class="form-grid form-grid-2">
            <div>
              <label class="lbl">Availability Status</label>
              <select class="input-field" name="availability_status" id="pf-availability_status">
                ${["In Stock","Out of Stock","Pre-order","Limited Stock"].map(s=>`<option value="${s}" ${t.availability_status===s?"selected":""}>${s}</option>`).join("")}
              </select>
            </div>
            <div class="p-4 glass-soft border border-blue-500/15 rounded-2xl">
              <p class="text-sm font-bold text-white">Global Price Range</p>
              <p class="text-sm text-gray-500 mt-1">Allowed price range is ${W} to ${X} in the selected currency.</p>
            </div>
          </div>

          <!-- Featured -->
          <div class="flex items-center justify-between p-4 glass-soft border border-blue-500/15 rounded-2xl">
            <div>
              <p class="text-sm font-bold text-white">Featured Product</p>
              <p class="text-sm text-gray-500">Show in featured sections</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" name="is_featured" ${t.is_featured?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <!-- Active -->
          <div class="flex items-center justify-between p-4 glass-soft border border-blue-500/15 rounded-2xl">
            <div>
              <p class="text-sm font-bold text-white">Published / Active</p>
              <p class="text-sm text-gray-500">Visible to customers on the website</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" name="is_active" ${a?t.is_active?"checked":"":"checked"}>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="glass-soft border border-blue-500/15 rounded-2xl p-4" id="product-review-panel">
            <p class="text-sm font-bold text-white">Quick Review Before Publish</p>
            <div class="text-sm text-gray-400 mt-1" id="product-review-content">Fill in product details to preview your publish summary.</div>
          </div>

          <div class="flex gap-3 pt-2">
            <button type="button" onclick="previewProductDraft()" class="btn-press px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl text-base transition">
              Live Preview
            </button>
            <button type="submit" name="action" value="publish" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 rounded-2xl text-base transition shadow-lg shadow-blue-600/15">
              ${a?"One-Click Publish Changes":"One-Click Publish Product"}
            </button>
            <button type="submit" name="action" value="draft" class="btn-press px-7 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-2xl text-base transition">
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>`),ht(),vt(),Nt("pf-price"),Nt("pf-real_price"),Ot(e,"pricing"),document.getElementById("pf-price")?.addEventListener("input",()=>Ot(e,"pricing")),fs(e,t.property_id||""),window._pfEscapeHandler=s=>{s.key==="Escape"&&closeProductFormModal()},document.addEventListener("keydown",window._pfEscapeHandler)};window.closeProductFormModal=function(){window._pfEscapeHandler&&(document.removeEventListener("keydown",window._pfEscapeHandler),window._pfEscapeHandler=null),window._productPublishInFlight=!1,z(),M()};window.switchProductFormCategory=function(e){const t=document.getElementById("product-form");if(!t)return;const a={},i=new FormData(t);for(const[o,s]of i.entries())o==="images"?(a.images=a.images||[],s&&!String(s).startsWith("blob:")&&a.images.push(String(s))):o==="tags"?(a.tags=a.tags||[],a.tags.push(s)):a[o]=s;a.is_featured=t.querySelector('[name="is_featured"]')?.checked||!1,a.is_active=t.querySelector('[name="is_active"]')?.checked||!1,a.property_id&&String(a.property_id).trim()?showAddProductStep2(e,a):showAddProductStep2(e,{images:a.images||[],...a})};function we(e,t){const a=Ra(e),i=I(e);let o;return a?o='<div class="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-300 select-none"><span class="text-2xl leading-none">📄</span><span class="text-[10px] font-bold mt-1">PDF</span></div>':i?o=`<video src="${n(e)}" muted loop preload="metadata" playsinline class="w-full h-full object-cover" onerror="this.style.display='none'"></video>
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none"><div class="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow"><svg class="w-4 h-4 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>`:o=xe("w-full h-full"),`<div class="img-thumb ${t===0?"cover-img":""}" data-index="${t}" data-url="${n(e)}" title="${t===0?"Cover (main)":(i?"Video ":"Image ")+(t+1)}">
    ${o}
    <button class="rm" onclick="removeImage(${t})" type="button" title="Delete">✕</button>
    <button class="rp" onclick="document.getElementById('rp-input-${t}').click()" type="button" title="Replace">↻</button>
    <input type="file" accept="video/mp4,video/webm,video/*" class="rp-input" id="rp-input-${t}" onchange="replaceImage(${t}, this)">
  </div>`}function ht(){const e=document.getElementById("drop-zone");e&&(e.addEventListener("dragover",t=>{t.preventDefault(),e.classList.add("drag-over")}),e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e.addEventListener("drop",t=>{t.preventDefault(),e.classList.remove("drag-over"),us(t.dataTransfer.files)}))}function vt(){const e=document.getElementById("image-preview");!e||!window.Sortable||new Sortable(e,{animation:150,onEnd:()=>Ie()})}window.handleImageUpload=async function(e){await da(e.target.files)};async function us(e){await da(e)}async function ps(e,t,a){const i=new Array(e.length);let o=0;const s=Array.from({length:Math.min(Math.max(t,1),e.length)},async()=>{for(;o<e.length;){const r=o++;try{i[r]=await a(e[r],r)}catch{i[r]=null}}});return await Promise.all(s),i}function bs(e,t,a,i,o=9e4){return new Promise(s=>{let r=!1;const l=setTimeout(()=>{r||(r=!0,s({error:{message:`Upload timed out after ${Math.round(o/1e3)}s — the network is too slow for this file size.`}}))},o);c.storage.from(e).upload(t,a,i).then(d=>{r||(r=!0,clearTimeout(l),s(d))})})}async function _a(e,t=1920,a=.82){const i=URL.createObjectURL(e);try{const o=new Image;await new Promise((g,x)=>{o.onload=g,o.onerror=x,o.src=i});const s=Math.min(1,t/Math.max(o.width,o.height)),r=Math.max(1,Math.round(o.width*s)),l=Math.max(1,Math.round(o.height*s)),d=document.createElement("canvas");d.width=r,d.height=l,d.getContext("2d").drawImage(o,0,0,r,l);const u=await new Promise(g=>d.toBlob(g,"image/jpeg",a));if(!u||!u.size)return null;const b=(e.name||"photo.jpg").replace(/\.[^.]+$/i,"")+".jpg";return new File([u],b,{type:"image/jpeg"})}catch{return null}finally{URL.revokeObjectURL(i)}}async function da(e){const t=document.getElementById("image-preview");if(!t)return;const a=[];for(const o of e){if(!Re(o)){p("Images are removed - the Admin accepts videos only. Drop a product video instead.","error");continue}if(o.size>100*1024*1024){p("Video must be under 100 MB.","error");continue}a.push(o)}if(!a.length)return;const i=a.map(()=>{const o=document.createElement("div");return o.className="img-thumb uploading",o.style.cssText="min-width:90px;min-height:80px;",o.innerHTML='<div class="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-400"><div class="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-1.5"></div><span class="text-[10px] font-bold">Uploading…</span></div>',t.appendChild(o),o});await ps(a,3,async(o,s)=>{const r=i[s],l=await mi(o);setTimeout(()=>{if(!(!r||!r.isConnected)){if(r.remove(),l){const d=document.createElement("div");d.innerHTML=we(l,s);const u=d.firstElementChild,b=r.nextSibling;b?t.insertBefore(u,b):t.appendChild(u)}else p(`Failed to upload ${Re(o)?"video":"image"}. Try a smaller file.`,"error");Ie(),xt(),Te(),window.lucide&&lucide.createIcons()}},0)})}async function mi(e){try{const{data:{session:t}}=await c.auth.getSession(),a=String(e.type||"").startsWith("image/"),i=Re(e);let o=e;if(a&&e.size>250*1024){const d=await _a(e);d&&d.size&&(o=d)}const s=o.type==="image/jpeg"?"jpg":(e.name||"photo.jpg").split(".").pop()||"jpg",r=`products/${Date.now()}-${Math.random().toString(36).slice(2)}`,l=i?3e5:9e4;for(let d=0;d<2;d++){const u=`${r}${d?"-"+Math.random().toString(36).slice(2,7):""}.${s}`,{error:b}=await bs("product-images",u,o,{contentType:o.type||e.type,upsert:!1},l);if(b)console.warn("product-images upload failed (attempt "+(d+1)+"):",b.message||b);else{const{data:g}=c.storage.from("product-images").getPublicUrl(u);if(g&&g.publicUrl)return g.publicUrl}}if(i)return null;try{const d=await _a(o,1200,.72);if(d&&d.size){const u=new FileReader,b=await new Promise(g=>{u.onload=()=>g(u.result),u.onerror=()=>g(null),u.readAsDataURL(d)});if(b)return b}}catch{}return URL.createObjectURL(e)}catch{return Re(e)?null:URL.createObjectURL(e)}}async function ms(){if(!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform()))return null;try{const{Camera:e,MediaTypeSelection:t}=await Ii(async()=>{const{Camera:o,MediaTypeSelection:s}=await import("@capacitor/camera");return{Camera:o,MediaTypeSelection:s}},[]),{results:a}=await e.chooseFromGallery({mediaType:t.All,allowMultipleSelection:!0,includeMetadata:!0}),i=[];for(const o of a||[])if(o.webPath)try{const s=o.type===1,r=(o.metadata&&o.metadata.format||(s?"mp4":"jpg")).toLowerCase().replace(/^jpeg$/,"jpg"),l=await fetch(o.webPath).then(d=>d.blob());i.push(new File([l],`gallery-${Date.now()}-${Math.random().toString(36).slice(2)}.${r}`,{type:l.type||(s?"video/mp4":"image/jpeg")}))}catch{}return i}catch(e){return console.warn("Native gallery picker unavailable:",e),null}}window.pickMediaForForm=async function(e){if(!!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform())){document.getElementById(e)?.click();return}const a=await ms();!a||!a.length||await da(a)};window.removeImage=function(e){const t=document.getElementById("image-preview");if(!t)return;const a=[...t.children];a[e]&&a[e].remove(),Ie(),xt(),Te()};window.replaceImage=async function(e,t){const a=document.getElementById("image-preview");if(!a||!t||!t.files||!t.files[0])return;const i=t.files[0],o=i.type==="application/pdf"||Ra(i.name),s=Re(i);if(!i.type.startsWith("image/")&&!o&&!s){p("Please choose an image, video, or PDF file.","error");return}if(s&&i.size>100*1024*1024){p("Video must be under 100 MB.","error");return}const r=await mi(i);if(!r)return;const d=[...a.querySelectorAll(".img-thumb")][e];d&&(d.outerHTML=we(r,e),Ie(),xt(),Te(),p(o?"Document replaced. Save to apply.":s?"Video replaced. Save to apply.":"Image replaced. Save to apply.","info"))};function Ie(){const e=document.getElementById("image-preview"),t=document.getElementById("image-url-inputs");!e||!t||(t.innerHTML="",[...e.querySelectorAll(".img-thumb")].forEach((a,i)=>{const o=a.dataset.url||(a.querySelector("img")?a.querySelector("img").src:"");if(!o)return;const s=document.createElement("input");s.type="hidden",s.name="images",s.id=`img-url-${i}`,s.value=o,t.appendChild(s),a.dataset.index=i;const r=a.querySelector(".rm");r&&r.setAttribute("onclick",`removeImage(${i})`);const l=a.querySelector(".rp");l&&l.setAttribute("onclick",`document.getElementById('rp-input-${i}').click()`);const d=a.querySelector(".rp-input");d&&(d.id=`rp-input-${i}`,d.onchange=()=>replaceImage(i,d))}))}function xt(){const e=document.getElementById("image-preview");e&&[...e.querySelectorAll(".img-thumb")].forEach((t,a)=>{t.classList.toggle("cover-img",a===0);const i=I(t.dataset.url);t.title=a===0?"Cover (main)":(i?"Video ":"Image ")+(a+1)})}function Te(){const e=document.getElementById("image-preview"),t=document.getElementById("gallery-counter");if(!e||!t)return;const a=[...e.querySelectorAll(".img-thumb")],i=a.length,o=a.filter(r=>I(r.dataset.url)).length,s=i-o;if(i===0)t.textContent="No media yet — you can still save and publish anytime";else{const r=[];s>0&&r.push(`${s} image${s>1?"s":""}`),o>0&&r.push(`${o} video${o>1?"s":""}`),t.textContent=`${r.join(" + ")} — you can save and publish anytime`}t.className="text-sm mt-1 font-bold text-gray-400"}function Vt(e,t){return`kco_product_form_autosave_${e}_${t||"new"}`}function gs(e){const t=new FormData(e),a={images:[],tags:[],fields:{}};for(const[i,o]of t.entries())i==="images"?o&&!String(o).startsWith("blob:")&&a.images.push(String(o)):i==="tags"?a.tags.push(String(o)):a.fields[i]=String(o);return a.fields.is_featured=e.querySelector('[name="is_featured"]')?.checked?"on":"",a.fields.is_active=e.querySelector('[name="is_active"]')?.checked?"on":"",a}function ys(e,t){if(!t||typeof t!="object")return!1;const a=t.fields||{};Object.entries(a).forEach(([o,s])=>{const r=e.querySelector(`[name="${o}"]`);r&&(r.type==="checkbox"?r.checked=s==="on"||s===!0:r.value=s==null?"":String(s))});const i=Array.isArray(t.tags)?t.tags:[];if(e.querySelectorAll('input[name="tags"]').forEach(o=>{o.checked=i.includes(o.value)}),Array.isArray(t.images)){const o=document.getElementById("image-preview");o&&(o.innerHTML=t.images.filter(I).map((s,r)=>we(s,r)).join(""),Ie(),xt(),Te())}return!0}function ka(){const e=document.getElementById("product-review-content"),t=document.getElementById("product-form");if(!e||!t)return;const a=t.querySelector('[name="title"]')?.value||"Untitled Product",i=t.querySelector('[name="brand"]')?.value||"N/A",o=parseFloat(t.querySelector('[name="price"]')?.value||"0")||0,s=parseFloat(t.querySelector('[name="real_price"]')?.value||"0")||0,r=t.querySelector('[name="stock_quantity"]')?.value,l=r===""||r==null?"Unlimited":r,d=A.section==="products"&&document.querySelector("#product-form")?.dataset?.category||"",u=[...t.querySelectorAll('input[name="tags"]:checked')].map(x=>x.value),b=document.querySelectorAll("#image-preview .img-thumb").length,g=t.querySelector('[name="is_active"]')?.checked;e.innerHTML=`
    <div class="grid grid-cols-2 gap-2">
      <div><span class="text-gray-500">Title</span><p class="text-white font-semibold">${n(a)}</p></div>
      <div><span class="text-gray-500">Brand</span><p class="text-white font-semibold">${n(i)}</p></div>
      <div><span class="text-gray-500">Price</span><p class="text-emerald-300 font-semibold">${s>o?`<span class="line-through text-gray-500 mr-1">$${s.toLocaleString()}</span>`:""}$${o.toLocaleString()}</p></div>
      <div><span class="text-gray-500">Stock</span><p class="text-white font-semibold">${n(l)}</p></div>
      <div><span class="text-gray-500">Media</span><p class="text-white font-semibold">${b}</p></div>
      <div><span class="text-gray-500">Status</span><p class="${g?"text-emerald-300":"text-amber-300"} font-semibold">${g?"Published":"Draft / Hidden"}</p></div>
    </div>
    <div class="mt-2 text-gray-400">Tags: ${u.length?n(u.join(", ")):"No tags selected"}</div>
    ${d?`<div class="text-gray-500 mt-1">Category: ${n(d)}</div>`:""}
  `}window.previewProductDraft=function(){const e=document.getElementById("product-form");if(!e)return;const t=document.querySelector("#image-preview video")?.getAttribute("src")||"",a=e.querySelector('[name="title"]')?.value||"Untitled Product",i=e.querySelector('[name="description"]')?.value||"No description yet.",o=e.querySelector('[name="brand"]')?.value||"N/A",s=parseFloat(e.querySelector('[name="price"]')?.value||"0")||0,r=parseFloat(e.querySelector('[name="real_price"]')?.value||"0")||0,l=e.dataset.category||"Product",d=e.querySelector('[name="stock_quantity"]')?.value||"Unlimited",u=e.querySelector('[name="is_active"]')?.checked;j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box wide">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-black text-white">Live Draft Preview</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white transition"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${t?`<video src="${n(t)}" class="w-full h-64 object-cover rounded-xl border border-blue-500/20" muted playsinline preload="metadata"></video>`:xe("w-full h-64 rounded-xl border border-blue-500/20")}
          <div class="space-y-2">
            <h4 class="text-xl font-black text-white">${n(a)}</h4>
            <div class="flex items-center gap-2">${H(u?"active":"inactive")}<span class="badge bg-blue-500/10 text-blue-300 border-blue-500/20">${n(l)}</span></div>
            <p class="text-sm text-gray-400">${n(i)}</p>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="glass-soft border border-blue-500/15 rounded-lg p-2"><span class="text-gray-500">Price</span><p class="text-emerald-300 font-black">${r>s?`<span class="text-xs line-through text-gray-500 mr-1">$${r.toLocaleString()}</span>`:""}$${s.toLocaleString()}</p></div>
              <div class="glass-soft border border-blue-500/15 rounded-lg p-2"><span class="text-gray-500">Stock</span><p class="text-gray-200 font-bold">${n(d)}</p></div>
              <div class="glass-soft border border-blue-500/15 rounded-lg p-2 col-span-2"><span class="text-gray-500">Brand</span><p class="text-gray-200 font-bold">${n(o)}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>`)};function fs(e,t){const a=document.getElementById("product-form");if(!a)return;a.dataset.category=e;const i=Vt(e,t),o=document.getElementById("product-autosave-note");if(!t)try{const d=localStorage.getItem(i);if(d){const u=JSON.parse(d);ys(a,u)&&o&&(o.textContent="Autosave restored from your last session.",o.classList.remove("hidden"))}}catch{}const s=()=>{try{localStorage.setItem(i,JSON.stringify(gs(a))),o&&(o.textContent=`Auto saved at ${new Date().toLocaleTimeString()}`,o.classList.remove("hidden"))}catch{}ka()};let r;const l=()=>{clearTimeout(r),r=setTimeout(s,500)};a.querySelectorAll("input, textarea, select").forEach(d=>{d.addEventListener("input",l),d.addEventListener("change",l)}),ka(),Te()}window.saveProduct=async function(e,t,a){e.preventDefault();const i=e.target,o=i.querySelector("[type=submit][name=action][value=publish]"),s=a?"One-Click Publish Changes":"One-Click Publish Product";if(window._productPublishInFlight)return;window._productPublishInFlight=!0,o&&(o.disabled=!0,o.style.opacity="0.75",o.innerHTML='<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:_pubspin .7s linear infinite;vertical-align:-2px;margin-right:8px;"></span>Publishing…');try{if(!document.getElementById("_pubspin-style")){const l=document.createElement("style");l.id="_pubspin-style",l.textContent="@keyframes _pubspin{to{transform:rotate(360deg)}}",document.head.appendChild(l)}}catch{}const r=()=>{window._productPublishInFlight=!1,o&&(o.disabled=!1,o.style.opacity="",o.textContent=s)};try{const l=new FormData(i),d={};let u=0;for(const[f,m]of l.entries())if(f==="images"){d.images=d.images||[];const h=String(m);m&&!h.startsWith("blob:")&&I(h)?d.images.push(h):h.startsWith("blob:")&&u++}else f==="tags"?(d.tags=d.tags||[],d.tags.push(m)):d[f]=m;if(u&&!(d.images||[]).length){r(),p("Your images were still uploading â€” please wait a moment and press Publish again (the photos were not saved with the product).","error");return}d.is_featured=i.querySelector('[name="is_featured"]')?.checked?"on":"",d.is_active=i.querySelector('[name="is_active"]')?.checked?"on":"";const b=l.get("action")==="draft",g=f=>Ut(f),x=f=>{const m=["model","storage","ram","processor","display","material","gender","platform","voltage","engine","transmission","fuel_type","horsepower","mileage","drive_type","body_type","model_year","seating_capacity","doors","real_price","type","size","age_range","skin_type","ingredients","dimensions","author","publisher","language","format","isbn","pages","edition","quantity","pet_type","lens","sensor","megapixels","video","license","version","duration","followers","engagement","niche","usage","shelf_life","assembly","weatherproof","movement","case_material","water_resistance","gemstone","movement_type","warranty_period"],h={};for(const E of m){const S=f[E];if(E==="real_price"){const C=S!=null&&String(S).trim()!==""?parseFloat(S):null;h[E]=C!=null&&Number.isFinite(C)&&C>0?Math.round(C):null;continue}h[E]=S!=null&&String(S).trim()!==""?S:null}if(f.safety_features){const E=g(f.safety_features);h.safety_features=E.length?E:null}return h};if(a){let f=null;try{const{data:T}=await c.from("showroom_listings").select("*").eq("property_id",a).maybeSingle();T&&(f=se(T))}catch{}if(f||(f=se((window._productsData||[]).find(T=>T.property_id===a))),f||(f=se(Ae?Ae(a):null)),!f)throw new Error("Could not load the current product to compare your changes against. Refresh the page, re-open the product and try again.");const m=(T,K)=>{const Ei=T===""||T==null?"":T,Ci=K===""||K==null?"":K;return String(Ei).trim()===String(Ci).trim()},h={};["title","description","currency","subcategory","brand","color","size","condition","warranty","availability_status"].forEach(T=>{m(d[T],f[T])||(h[T]=d[T]==null||d[T]===""?null:d[T])});const E=d.price===""||d.price==null?null:parseFloat(d.price);m(E,f.price)||(h.price=E==null?f.price:Math.max(W,Math.min(X,E)));const S=d.stock_quantity===""||d.stock_quantity==null?null:parseInt(d.stock_quantity,10);m(S,f.stock_quantity)||(h.stock_quantity=Number.isFinite(S)?S:null);const C=g(d.features_text);m(C.join("||"),(Array.isArray(f.features)?f.features:[]).join("||"))||(h.features=C);const _=d.tags||[];m(_.join("||"),(Array.isArray(f.tags)?f.tags:[]).join("||"))||(h.tags=_);const k=g(d.highlights_text);m(k.join("||"),(Array.isArray(f.highlights)?f.highlights:[]).join("||"))||(h.highlights=k);const ke=g(d.seo_keywords_text);m(ke.join("||"),(Array.isArray(f.seo_keywords)?f.seo_keywords:[]).join("||"))||(h.seo_keywords=ke);const $=d.images||[];m($.join("||"),(Array.isArray(f.images)?f.images:[]).join("||"))||(h.images=$);const V=$.find(T=>typeof T=="string"&&I(T))||null;m(V,f.video_url)||(h.video_url=V);const $e=d.is_featured==="on";!!f.is_featured!==$e&&(h.is_featured=$e);const ga=b?!1:d.is_active==="on";!!f.is_active!==ga&&(h.is_active=ga);const Ai=x(d),ya={...f.specifications&&typeof f.specifications=="object"?f.specifications:{},...Ai};if(JSON.stringify(ya)!==JSON.stringify(f.specifications||{})&&(h.specifications=ya),Object.keys(h).length===0){p("No changes detected â€” nothing was saved.","info");try{localStorage.removeItem(Vt(t,a))}catch{}p("No changes were needed — this product is already published with exactly these details.","info"),r(),closeProductFormModal(),M();return}const ze={...f,...h,property_id:a,updated_at:new Date().toISOString()};delete ze.id;const fa=await xa(ze);if(fa.error){r();const T=Lt(fa.error,b?"Draft save":"Product publish");p(T,"error");try{let K=i.querySelector(".__publish-error-banner");K||(K=document.createElement("div"),K.className="__publish-error-banner mb-3 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-medium",i.prepend(K)),K.textContent=T}catch{}return}try{Xe(ze)}catch{}try{const T=(window._productsData||[]).findIndex(K=>K.property_id===a);T>=0&&(window._productsData[T]=ze)}catch{}p(b?"Draft saved!":`Published Successfully â€” your product is updated and live in your showroom (${Object.keys(h).length} change${Object.keys(h).length>1?"s":""}).`)}else{if(!d.title||!d.title.trim())throw new Error("A product title is required.");if(d.price===""||d.price==null||!isFinite(parseFloat(d.price)))throw new Error("A price is required.");if(!!i.querySelector('[name="condition"]')&&!d.condition)throw new Error("Please choose the product condition.");const m={listing_type:"product",category:t,subcategory:d.subcategory||null,title:d.title.trim(),description:d.description||"",price:Math.max(W,Math.min(X,parseFloat(d.price)||0)),currency:d.currency||"USD",country:"",country_code:"",listing_status:"sale",state:"",city:"",product_location:"",latitude:null,longitude:null,is_active:b?!1:d.is_active==="on",is_featured:d.is_featured==="on",brand:d.brand||null,color:d.color||null,size:d.size||null,condition:d.condition||null,warranty:d.warranty||null,availability_status:d.availability_status||"In Stock",stock_quantity:d.stock_quantity?parseInt(d.stock_quantity):null,images:d.images||[],video_url:(d.images||[]).find(S=>typeof S=="string"&&I(S))||null,features:g(d.features_text).length?g(d.features_text):d.tags||[],tags:d.tags||[],highlights:g(d.highlights_text),seo_keywords:g(d.seo_keywords_text),is_ai_generated:!!d.catalog_template_id,ai_generated_fields:d.catalog_template_id?["title","description","features","highlights","seo_keywords"]:[],specifications:x(d)},h=ut();m.property_id=h;const E=await xa(m);if(E.error){r();const S=Lt(E.error,"Product publish");p(S,"error");try{let C=i.querySelector(".__publish-error-banner");C||(C=document.createElement("div"),C.className="__publish-error-banner mb-3 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-medium",i.prepend(C)),C.textContent=S}catch{}return}try{Xe({...m,property_id:m.property_id})}catch{}try{(window._productsData=window._productsData||[]).unshift({...m})}catch{}p(b?"Draft saved!":"Published Successfully! Your product is now live in your showroom.")}r();try{localStorage.removeItem(Vt(t,a))}catch{}closeProductFormModal(),M()}catch(l){const d=l&&l.message&&!/failed to fetch|networkerror/i.test(String(l.message))?l.message:Lt(l,"Product publish");r(),p(d,"error")}};window.editProduct=async function(e){const{data:t,error:a}=await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle();let i=a?null:t;if(i||(i=Ae(e)),i||(i=(window._productsData||[]).find(o=>o.property_id===e)||null),!i)return p("Product not found","error");i.specifications&&typeof i.specifications=="object"&&(i={...i,...i.specifications}),showAddProductStep2(i.category||"Other",i)};window.toggleProductActive=async function(e,t){let a=null;try{const{data:o}=await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle();o&&(a=se(o))}catch{}if(a||(a=se((window._productsData||[]).find(o=>o.property_id===e))),!a||!a.property_id){Mt(e,{is_active:t,availability_status:t?"In Stock":"Out of Stock"}),p(t?"Product published locally":"Product unpublished locally","info"),M();return}delete a.id,a.property_id=e,a.is_active=t,a.availability_status=t?"In Stock":"Out of Stock";const{error:i}=await c.from("showroom_listings").upsert(a,{onConflict:"property_id"});if(i){if(Y(i))return p(`âšï¸ ${t?"Publish":"Unpublish"} blocked: database admin role rejected the write. Re-run the admin permission migration.`,"error");Mt(e,{is_active:t,availability_status:t?"In Stock":"Out of Stock"}),p(t?"Product published locally":"Product unpublished locally","info"),M();return}p(t?"Product published":"Product unpublished"),M()};window.duplicateProduct=async function(e,t=!1){const{data:a}=await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle();if(!a)return;const{id:i,property_id:o,created_at:s,updated_at:r,...l}=a,d=ut();await c.from("showroom_listings").insert({...l,property_id:d,title:a.title+" (Copy)",is_active:!1}),t||(p("Product duplicated"),M())};window.archiveProduct=async function(e){confirm("Archive this product? It will be hidden from the website but can be restored.")&&(await c.from("showroom_listings").update({is_active:!1,availability_status:"Archived"}).eq("property_id",e),p("Product archived"),M())};const hs=["Single-Family Home","Apartment","Condo","Townhouse","Villa","Mansion","Beach House","Farm House","Commercial Building","Hotel","Land","Other"];async function wt(){const e=document.getElementById("content");try{const{data:t,error:a}=await c.from("showroom_listings").select("*").eq("listing_type","property").order("created_at",{ascending:!1});let i=a?Kt().filter(s=>s.listing_type==="property"):t||[];if(Array.isArray(J)){const s=new Set(i.map(l=>l.property_id)),r=J.filter(l=>l.listing_type==="property"&&l.property_id&&!s.has(l.property_id));r.length&&(i=i.concat(r))}i.sort((s,r)=>new Date(r.created_at||0)-new Date(s.created_at||0));try{await Jt()}catch{}const o=new Set(rt());i=i.filter(s=>!(s&&s.property_id&&o.has(s.property_id))),window._propertiesData=i,e.innerHTML=`
      <div class="space-y-4 fade-in">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-xl font-black text-white flex-1">Properties Manager</h2>
          <button onclick="fixPropertyMaps()" class="btn-press flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition" title="Geocode any property that is missing its map coordinates and update its map">
            <i data-lucide="map-pin" class="w-4 h-4"></i> Fix Maps
          </button>
          <button onclick="showAddPropertyModal()" class="btn-press flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition">
            <i data-lucide="plus" class="w-4 h-4"></i> Add Property
          </button>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full dt">
              <thead><tr>
                <th>Property</th><th>Type</th><th class="hidden sm:table-cell">Location</th>
                <th class="hidden md:table-cell">Price</th><th>Status</th><th>Actions</th>
              </tr></thead>
              <tbody>
                ${i.length===0?'<tr><td colspan="6" class="text-center text-gray-500 py-12">No properties yet.</td></tr>':i.map(s=>`<tr>
                    <td>
                      <div class="flex items-center gap-2.5">
                        ${(()=>{const r=yt(s);return r?qe(r,"w-9 h-9 rounded-lg object-cover border border-blue-500/20 shrink-0"):xe("w-9 h-9 rounded-lg border border-blue-500/20 shrink-0")})()}
                        <div><p class="text-xs font-bold text-white truncate max-w-[160px]">${n(s.title)}</p><p class="text-[10px] font-mono text-gray-500">${n(s.property_id)}</p></div>
                      </div>
                    </td>
                    <td><span class="text-xs text-gray-300">${n(s.property_type||s.category)}</span></td>
                    <td class="hidden sm:table-cell"><span class="text-xs text-gray-400">${n([s.city,s.state,s.country].filter(Boolean).join(", ")||"â€”")}</span></td>
                    <td class="hidden md:table-cell"><span class="text-xs font-bold text-emerald-400">$${parseFloat(s.price||0).toLocaleString()}</span></td>
                    <td>${H(s.listing_status||"sale")} ${H(s.is_active?"active":"inactive")}</td>
                    <td>
                      <div class="flex gap-1">
                        <button onclick="editProperty('${s.property_id}')" class="btn-press p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>
                        <button onclick="archiveProduct('${s.property_id}')" class="btn-press p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition"><i data-lucide="archive" class="w-3.5 h-3.5"></i></button>
                        <button onclick="deleteProduct('${s.property_id}')" class="btn-press p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.showAddPropertyModal=function(e={}){const t=!!e.property_id,a=Da("property","Real Estate"),i=e.country_code||"US",o=e.currency||Xt(i);j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box wide">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">${t?"Edit":"Add"} Property</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <form id="property-form" onsubmit="saveProperty(event,'${t?e.property_id:""}')" class="space-y-4">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-4 space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-bold text-white uppercase tracking-wide">Property Catalog Autofill</p>
                <p class="text-[11px] text-gray-500 mt-1">Choose a property template and country to generate a global real-estate listing with map-ready fields.</p>
              </div>
              <button type="button" onclick="applyPropertyCatalogTemplate()" class="btn-press px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-xl transition">Refresh Template</button>
            </div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Property Template</label><select class="input-field" name="catalog_template_id" id="ppf-catalog_template_id" onchange="applyPropertyCatalogTemplate()"><option value="">Choose a property template...</option>${a.map(r=>`<option value="${r.id}">${n(r.label)} - ${n(r.propertyType||r.subcategory)}</option>`).join("")}</select></div>
              <div><label class="lbl">Country</label><select class="input-field" name="country_code" id="ppf-country_code" onchange="syncPropertyCountry(); applyPropertyCatalogTemplate()">${la(i)}</select></div>
              <div><label class="lbl">Currency</label><select class="input-field" name="currency" id="ppf-currency" onchange="applyPropertyCatalogTemplate()">${bi(o)}</select></div>
            </div>
            <p id="ppf-image-requirement" class="text-[11px] text-gray-400">Any number of images is fine â€” save and publish anytime.</p>
            <input type="hidden" name="required_image_count" id="ppf-required_image_count" value="">
          </div>


          <div class="glass-soft border border-blue-500/15 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="home" class="w-4 h-4 text-blue-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Basic Information</p></div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Property Title *</label><input class="input-field" name="title" value="${n(e.title||"")}" required placeholder="e.g. Cozy 3-Bedroom Family Home"></div>
              <div><label class="lbl">Property Type *</label><select class="input-field" name="property_type" required>
                ${hs.map(r=>`<option value="${r}" ${e.property_type===r?"selected":""}>${r}</option>`).join("")}
              </select></div>
              <div><label class="lbl">Listing Status</label><select class="input-field" name="listing_status">
                <option value="sale" ${e.listing_status!=="rent"?"selected":""}>For Sale</option>
                <option value="rent" ${e.listing_status==="rent"?"selected":""}>For Rent</option>
              </select></div>
              <div><label class="lbl">Price *</label><input type="number" class="input-field" id="ppf-price" name="price" value="${e.price||""}" required placeholder="0"></div>
              <div><label class="lbl">Real Price (crossed out)</label><input type="number" class="input-field" id="ppf-real_price" name="real_price" value="${e.real_price??e.specifications?.real_price??""}" placeholder="Original price before discount"></div>
              <div><label class="lbl">Country Name *</label><input class="input-field" id="ppf-country" name="country" value="${n(e.country||"")}" required placeholder="United States"></div>
              <div><label class="lbl">Subcategory</label><input class="input-field" name="subcategory" value="${n(e.subcategory||"")}" placeholder="e.g. Villas, Mansions, Hotels"></div>
              <div><label class="lbl">Furnished</label><select class="input-field" name="furnished">
                <option value="">Not specified</option>
                <option value="Furnished" ${e.furnished==="Furnished"?"selected":""}>Furnished</option>
                <option value="Unfurnished" ${e.furnished==="Unfurnished"?"selected":""}>Unfurnished</option>
              </select></div>
              <div><label class="lbl">Condition</label><select class="input-field" name="condition">
                <option value="">Not specified</option>
                ${["New Construction","Like New","Excellent","Good","Fair","Needs Renovation"].map(r=>`<option value="${r}" ${e.condition===r?"selected":""}>${r}</option>`).join("")}
              </select></div>
              <div><label class="lbl">Year Built</label><input type="number" class="input-field" name="year_built" value="${e.year_built??""}" placeholder="2015"></div>
              <div><label class="lbl">Year Renovated</label><input type="number" class="input-field" name="year_renovated" value="${e.year_renovated??""}" placeholder="2021"></div>
            </div>
          </div>

          <div class="glass-soft border border-sky-500/15 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-sky-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Location &amp; Map</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">State / Province</label><input class="input-field" name="state" value="${n(e.state||"")}" placeholder="e.g. California"></div>
              <div><label class="lbl">City</label><input class="input-field" name="city" value="${n(e.city||"")}" placeholder="e.g. Los Angeles"></div>
              <div><label class="lbl">Town / Local Area</label><input class="input-field" name="town" value="${n(e.town||"")}" placeholder="Neighborhood or district"></div>
              <div class="sm:col-span-2"><label class="lbl">Property Location</label><input class="input-field" name="product_location" value="${n(e.product_location||"")}" placeholder="Estate, district, city, landmark"></div>
              <div class="sm:col-span-2"><label class="lbl">Street / Address</label><input class="input-field" name="address" value="${n(e.address||"")}" placeholder="Street and number, e.g. 123 Maple Street"></div>
              <div><label class="lbl">ZIP / Postal Code</label><input class="input-field" name="zip_code" value="${n(e.zip_code||"")}" placeholder="e.g. 10001"></div>
              <div><label class="lbl">Neighborhood / District</label><input class="input-field" name="neighborhood" value="${n(e.neighborhood||"")}" placeholder="e.g. Beverly Hills, Riverside"></div>
              <div><label class="lbl">Latitude</label><input type="number" step="any" class="input-field" name="latitude" value="${n(e.latitude||"")}" placeholder="40.7128"></div>
              <div><label class="lbl">Longitude</label><input type="number" step="any" class="input-field" name="longitude" value="${n(e.longitude||"")}" placeholder="-74.0060"></div>
              <div class="sm:col-span-2"><label class="lbl">Landmarks (comma separated)</label><input class="input-field" name="landmarks_text" value="${n((e.landmarks||[]).join(", "))}" placeholder="City Hall, Central Park, Main Station"></div>
              <div class="sm:col-span-2">
                <div class="rounded-xl border border-gray-200 overflow-hidden" style="height:250px;background:#e2e8f0"><div id="property-map-preview" style="width:100%;height:100%"></div></div>
                <div class="flex flex-wrap items-center justify-between gap-2 mt-2">
                  <div class="text-[11px] text-gray-500" id="property-map-status">Map preview â€” fill the location fields or click the map to drop a pin.</div>
                  <div class="flex items-center gap-2">
                    <button type="button" id="btn-geocode-property" class="btn-press text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1 hover:bg-blue-100 transition">Locate from fields</button>
                    <a id="btn-open-google-map" href="#" target="_blank" rel="noopener" class="text-[11px] font-bold text-gray-600 bg-gray-100 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-200 transition">Open in Google Maps</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-soft border border-emerald-500/20 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="ruler" class="w-4 h-4 text-emerald-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Size &amp; Layout</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Bedrooms</label><input type="number" class="input-field" name="bedrooms" value="${e.bedrooms??""}" placeholder="3"></div>
              <div><label class="lbl">Bathrooms</label><input type="number" class="input-field" name="bathrooms" value="${e.bathrooms??""}" placeholder="2"></div>
              <div><label class="lbl">Half Bathrooms</label><input type="number" class="input-field" name="half_bathrooms" value="${e.half_bathrooms??""}" placeholder="1"></div>
              <div><label class="lbl">Floors / Levels</label><input type="number" class="input-field" name="floors" value="${e.floors??""}" placeholder="2"></div>
              <div><label class="lbl">Building Size</label><input class="input-field" name="building_size" value="${n(e.building_size||"")}" placeholder="e.g. 2,500 sqft"></div>
              <div><label class="lbl">Land Size</label><input class="input-field" name="land_size" value="${n(e.land_size||"")}" placeholder="e.g. 0.5 acres"></div>
              <div><label class="lbl">Parking Spaces</label><input type="number" class="input-field" name="parking_spaces" value="${e.parking_spaces??""}"></div>
              <div><label class="lbl">Garage</label><input class="input-field" name="garage" value="${n(e.garage||"")}" placeholder="e.g. 2-car attached, None"></div>
              <div><label class="lbl">Living Areas</label><input class="input-field" name="living_areas" value="${n(e.living_areas||"")}" placeholder="Living room, Dining, Family room"></div>
              <div><label class="lbl">Kitchens</label><input type="number" class="input-field" name="kitchens" value="${e.kitchens??""}" placeholder="1"></div>
              <div><label class="lbl">Balconies</label><input type="number" class="input-field" name="balconies" value="${e.balconies??""}" placeholder="2"></div>
              <div><label class="lbl">Garden</label><input class="input-field" name="garden" value="${n(e.garden||"")}" placeholder="Private garden / Landscaped / None"></div>
              <div><label class="lbl">Pool</label><input class="input-field" name="pool" value="${n(e.pool||"")}" placeholder="Private pool / Community pool / None"></div>
              <div><label class="lbl">Security</label><input class="input-field" name="security" value="${n(e.security||"")}" placeholder="Gated community, CCTV, Alarm"></div>
              <div><label class="lbl">Utilities</label><input class="input-field" name="utilities" value="${n(e.utilities||"")}" placeholder="Water, electricity, gas, internet"></div>
            </div>
          </div>

          <div class="glass-soft border border-cyan-500/20 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-cyan-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Description, Features &amp; SEO</p></div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Description</label><textarea class="input-field" name="description" rows="3" placeholder="Describe the propertyâ€¦">${n(e.description||"")}</textarea></div>
              <div class="sm:col-span-2"><label class="lbl">Features (comma separated)</label><input class="input-field" name="features_text" value="${n((e.features||[]).join(", "))}" placeholder="Swimming Pool, Garden, Garageâ€¦"></div>
              <div class="sm:col-span-2"><label class="lbl">Highlights (comma separated)</label><input class="input-field" name="highlights_text" value="${n((e.highlights||[]).join(", "))}" placeholder="Prime location, map-ready post, 24-image gallery"></div>
              <div class="sm:col-span-2"><label class="lbl">SEO Keywords (comma separated)</label><input class="input-field" name="seo_keywords_text" value="${n((e.seo_keywords||[]).join(", "))}" placeholder="mansion, villa, property investment"></div>
            </div>
          </div>

          <div class="glass-soft border border-emerald-500/20 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="home" class="w-4 h-4 text-emerald-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Interior &amp; Exterior Features</p></div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Interior Features (comma separated)</label><input class="input-field" name="interior_features_text" value="${n((e.interior_features||[]).join(", "))}" placeholder="Open plan kitchen, Walk-in closet, Fireplace…"></div>
              <div class="sm:col-span-2"><label class="lbl">Exterior Features (comma separated)</label><input class="input-field" name="exterior_features_text" value="${n((e.exterior_features||[]).join(", "))}" placeholder="Swimming pool, Garden, Balcony, Patio…"></div>
              <div class="sm:col-span-2"><label class="lbl">Home Systems (comma separated)</label><input class="input-field" name="home_systems_text" value="${n((e.home_systems||[]).join(", "))}" placeholder="Central heating, Air conditioning, Solar panels…"></div>
            </div>
          </div>

          <div class="glass-soft border border-amber-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="hard-hat" class="w-4 h-4 text-amber-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Construction, Ownership &amp; Contact</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Construction Type</label><input class="input-field" name="construction_type" value="${n(e.construction_type||"")}" placeholder="Brick, Concrete, Timber…"></div>
              <div><label class="lbl">Construction Status</label><input class="input-field" name="construction_status" value="${n(e.construction_status||"")}" placeholder="Completed, Under construction"></div>
              <div><label class="lbl">Ownership Type</label><input class="input-field" name="ownership_type" value="${n(e.ownership_type||"")}" placeholder="Freehold, Leasehold, HOA…"></div>
              <div><label class="lbl">Contact / Agent Name</label><input class="input-field" name="contact_name" value="${n(e.contact_name||"")}" placeholder="Listing agent name"></div>
              <div><label class="lbl">Contact Phone / WhatsApp</label><input class="input-field" name="contact_phone" value="${n(e.contact_phone||"")}" placeholder="+1 555 010 2233"></div>
              <div><label class="lbl">Contact Email</label><input class="input-field" name="contact_email" value="${n(e.contact_email||"")}" placeholder="agent@example.com"></div>
            </div>
          </div>

          <div class="glass-soft border border-violet-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="layout-dashboard" class="w-4 h-4 text-violet-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Floor Plan</p></div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Floor Plan Image URL</label><input class="input-field" name="floor_plan_image" value="${n(e.floor_plan?.image||"")}" placeholder="https://â€¦/floor-plan.png"></div>
              <div><label class="lbl">Levels</label><input class="input-field" name="floor_plan_levels" value="${n(e.floor_plan?.levels||"")}" placeholder="e.g. Ground + 1"></div>
              <div><label class="lbl">Total Area</label><input class="input-field" name="floor_plan_total_area" value="${n(e.floor_plan?.total_area||"")}" placeholder="e.g. 2,500 sqft"></div>
              <div class="sm:col-span-2"><label class="lbl">Rooms (comma separated â€” Name: dimensions)</label><input class="input-field" name="floor_plan_rooms" value="${n((e.floor_plan?.rooms||[]).map(r=>(r.name||"")+(r.dimensions?": "+r.dimensions:"")).join(", "))}" placeholder="Living Room: 15x12, Kitchen: 10x10â€¦"></div>
            </div>
          </div>

          <div class="glass-soft border border-amber-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="school" class="w-4 h-4 text-amber-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Nearby Area</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Schools (comma separated)</label><input class="input-field" name="nearby_schools_text" value="${n((e.nearby_area?.schools||[]).join(", "))}" placeholder="Riverside Elementaryâ€¦"></div>
              <div><label class="lbl">Hospitals / Clinics</label><input class="input-field" name="nearby_hospitals_text" value="${n((e.nearby_area?.hospitals||[]).join(", "))}" placeholder="City General Hospitalâ€¦"></div>
              <div><label class="lbl">Shopping / Markets</label><input class="input-field" name="nearby_shopping_text" value="${n((e.nearby_area?.shopping||[]).join(", "))}" placeholder="Maple Mall, Farmers Marketâ€¦"></div>
              <div><label class="lbl">Transportation</label><input class="input-field" name="nearby_transportation_text" value="${n((e.nearby_area?.transportation||[]).join(", "))}" placeholder="Metro Station, Bus Stopâ€¦"></div>
              <div class="sm:col-span-2"><label class="lbl">Distances (comma separated)</label><input class="input-field" name="nearby_distances_text" value="${n((e.nearby_area?.distances||[]).join(", "))}" placeholder="0.5 mi to school, 1 mi to hospitalâ€¦"></div>
            </div>
          </div>

          <div class="glass-soft border border-blue-500/20 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="shield-check" class="w-4 h-4 text-blue-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Legal, Verification &amp; Trust</p></div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Legal / Financial Info (comma separated â€” add source tag)</label><input class="input-field" name="legal_info_text" value="${n((e.legal_info||[]).map(r=>(r.label||"")+(r.value?": "+r.value:"")+(r.source?` (${r.source})`:"")).join(", "))}" placeholder="Ownership: Clear title (Seller provided), Property taxes: (Not verified)â€¦"></div>
              <div><label class="lbl">Verification Status</label><select class="input-field" name="verification_status">
                <option value="Not verified" ${(e.verification_status||"Not verified")==="Not verified"?"selected":""}>Not verified</option>
                <option value="Pending verification" ${e.verification_status==="Pending verification"?"selected":""}>Pending verification</option>
                <option value="Verified" ${e.verification_status==="Verified"?"selected":""}>Verified</option>
              </select></div>
              <div><label class="lbl">Verification Date</label><input type="date" class="input-field" name="verification_date" value="${n(e.verification_date||"")}"></div>
              <div class="sm:col-span-2"><label class="lbl">Inspection Info</label><input class="input-field" name="inspection_info" value="${n(e.inspection_info||"")}" placeholder="Inspected on date by company â€” result"></div>
              <div class="sm:col-span-2"><label class="lbl">Documents (comma separated URLs)</label><input class="input-field" name="documents_text" value="${n((e.documents||[]).join(", "))}" placeholder="https://â€¦/title.pdf, https://â€¦/inspection.pdf"></div>
              <div class="sm:col-span-2"><label class="lbl">Condition / Risk Notes</label><textarea class="input-field" name="risk_notes" rows="2" placeholder="Any known issues, renovation needs, or risk notesâ€¦">${n(e.risk_notes||"")}</textarea></div>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 glass-soft border border-blue-500/15 rounded-xl">
            <div><p class="text-xs font-bold text-white">Published / Active</p><p class="text-[11px] text-gray-500">Visible on the website</p></div>
            <label class="toggle-switch"><input type="checkbox" name="is_active" ${t?e.is_active?"checked":"":"checked"}><span class="toggle-slider"></span></label>
          </div>

          <div>
            <label class="lbl">Property Videos</label>
            <div id="drop-zone" class="drop-zone" onclick="pickMediaForForm('img-upload')">
              <i data-lucide="image-plus" class="w-7 h-7 text-blue-400 mx-auto mb-2"></i>
              <p class="text-xs font-bold text-gray-300">Click or drag & drop videos</p>
              <input type="file" id="img-upload" class="hidden" multiple accept="video/mp4,video/webm,video/*" onchange="handleImageUpload(event)">
            </div>
            <div id="image-preview" class="flex flex-wrap gap-2 mt-3">
              ${(e.images||[]).filter(I).map((r,l)=>we(r,l)).join("")}
            </div>
            <div id="image-url-inputs">
              ${(e.images||[]).map((r,l)=>`<input type="hidden" name="images" id="img-url-${l}" value="${n(r)}">`).join("")}
            </div>
          </div>


          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition">${t?"ðŸ’¾ Save Changes":"ðŸš€ Publish Property"}</button>
          </div>
        </form>
      </div>
    </div>`),ht(),vt(),Nt("ppf-price"),window._propFormDirty=!!t;const s=document.getElementById("property-form");if(s){const r=()=>{window._propFormDirty=!0};s.addEventListener("input",r),s.addEventListener("change",r)}window.syncPropertyCountry=function(){wa("ppf")},wa("ppf"),Ht("pricing"),document.getElementById("ppf-price")?.addEventListener("input",()=>Ht("pricing")),ws()};let Q=null,Qe=null,$a=null;function vs(){const e=document.querySelector("#property-form");if(!e)return"";const t=a=>(e.querySelector(`[name="${a}"]`)?.value||"").trim();return[t("product_location"),t("town"),t("city"),t("state"),t("country")].filter(Boolean).join(", ")}function oe(e,t){const a=document.getElementById("property-map-status");a&&(a.textContent=e,a.style.color=t?"#dc2626":"")}function je(e,t,{reverse:a=!1}={}){if(!Q||!Number.isFinite(e)||!Number.isFinite(t))return;const i=[e,t];Qe?Qe.setLatLng(i):Qe=L.marker(i,{draggable:!0}).addTo(Q),Q.setView(i,Math.max(Q.getZoom(),13));const o=document.querySelector('#property-form [name="latitude"]'),s=document.querySelector('#property-form [name="longitude"]');o&&(o.value=String(Number(e.toFixed(6)))),s&&(s.value=String(Number(t.toFixed(6)))),a&&xs(e,t);const r=document.getElementById("btn-open-google-map");r&&(r.href=`https://www.google.com/maps?q=${e.toFixed(6)},${t.toFixed(6)}`)}async function Me(){const e=vs();if(!e){oe("Enter a location (address, area, city, state, country), then press Locate from fields.");return}oe("Searching locationâ€¦");try{const a=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(e))).json();a&&a[0]?(je(parseFloat(a[0].lat),parseFloat(a[0].lon)),oe("Located: "+a[0].display_name)):oe("Could not find that location. Check the spelling or click the map to drop the pin.",!0)}catch{oe("Map lookup failed. You can still drop the pin by clicking the map.",!0)}}async function xs(e,t){const a=document.querySelector("#property-form");if(a)try{const o=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=16`)).json(),s=o&&o.address||{},r=(f,m)=>{if(!m)return;const h=a.querySelector(`[name="${f}"]`);return h&&!String(h.value||"").trim()?(h.value=m,!0):!1},l=[s.road||"",s.house_number||""].filter(Boolean).join(" "),d=s.suburb||s.neighbourhood||s.quarter||s.district||s.borough||"",u=s.town||s.village||s.municipality||s.city_district||"",b=s.city||s.county||"",g=s.state||s.region||"",x=s.country||"";if(r("product_location",l||d||u),r("town",d||u),r("city",b),r("state",g),x){r("country",x);const f=a.querySelector('[name="country_code"]');if(f){const m=(Ne||[]).find(h=>String(h.name||"").toLowerCase()===String(x).toLowerCase());m&&m.code&&!f.value&&(f.value=m.code)}}oe("Pin set at "+e.toFixed(5)+", "+t.toFixed(5)+(o.display_name?" â€” "+o.display_name:""))}catch{oe("Pin set. Could not reverse-geocode the address.",!0)}}window.refreshPropertyMapFromForm=function(){if(!Q)return;const e=parseFloat(document.querySelector('#property-form [name="latitude"]')?.value),t=parseFloat(document.querySelector('#property-form [name="longitude"]')?.value);Number.isFinite(e)&&Number.isFinite(t)&&(e||t)?(je(e,t),oe("Map updated from coordinates.")):Me()};function ws(){const e=document.getElementById("property-map-preview");if(!e||!window.L){oe("Map unavailable right now â€” your location fields still save normally.");return}Q&&(Q.remove(),Q=null,Qe=null);const t=parseFloat(document.querySelector('#property-form [name="latitude"]')?.value),a=parseFloat(document.querySelector('#property-form [name="longitude"]')?.value),i=Number.isFinite(t)&&Number.isFinite(a)&&(t||a);Q=L.map(e,{scrollWheelZoom:!1}).setView(i?[t,a]:[20,0],i?13:2),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(Q),Q.on("click",o=>je(o.latlng.lat,o.latlng.lng,{reverse:!0})),document.getElementById("btn-geocode-property")?.addEventListener("click",Me),["product_location","town","city","state","country","latitude","longitude"].forEach(o=>{const s=document.querySelector(`#property-form [name="${o}"]`);s&&(s.addEventListener("input",()=>{if(o==="latitude"||o==="longitude"){const r=parseFloat(document.querySelector('#property-form [name="latitude"]')?.value),l=parseFloat(document.querySelector('#property-form [name="longitude"]')?.value);Number.isFinite(r)&&Number.isFinite(l)&&(r||l)&&je(r,l);return}clearTimeout($a),$a=setTimeout(Me,900)}),s.addEventListener("change",()=>{o!=="latitude"&&o!=="longitude"&&Me()}))}),i?je(t,a):Me()}window.fixPropertyMaps=async function(){const t=(window._propertiesData||[]).filter(o=>{const s=parseFloat(o.latitude),r=parseFloat(o.longitude),l=[o.product_location,o.town,o.city,o.state,o.country].filter(Boolean).join(", ");return!(Number.isFinite(s)&&Number.isFinite(r)&&(s!==0||r!==0))&&!!l});if(!t.length){p("All properties already have map coordinates.","success");return}p(`Fixing maps for ${t.length} propert${t.length>1?"ies":"y"}â€¦`,"success");let a=0,i=0;for(const o of t){const s=[o.product_location,o.town,o.city,o.state,o.country].filter(Boolean).join(", ");try{const l=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(s))).json();if(l&&l[0]){const d={latitude:parseFloat(l[0].lat),longitude:parseFloat(l[0].lon)},{error:u}=await c.from("showroom_listings").update(d).eq("property_id",o.property_id);u?i++:(Object.assign(o,d),a++)}else i++}catch{i++}await new Promise(r=>setTimeout(r,1100))}p(`Map fix done: ${a} updated, ${i} failed.`,i?"error":"success"),wt()};window.saveProperty=async function(e,t){e.preventDefault();const a=new FormData(e.target),i=Object.fromEntries(a.entries()),o=a.getAll("images").filter(m=>m&&!m.startsWith("blob:")&&I(m)),s=(i.features_text||"").split(",").map(m=>m.trim()).filter(Boolean),r=i.real_price===""||i.real_price==null?null:Math.max(W,Math.min(X,parseFloat(i.real_price)||0)),l=m=>(m||"").split(",").map(h=>h.trim()).filter(Boolean),d=m=>m===""||m==null||!isFinite(parseInt(m,10))?null:parseInt(m,10),u=l(i.floor_plan_rooms).map(m=>{const h=String(m).match(/^(.*?):\s*(.*)$/);return h?{name:h[1].trim(),dimensions:h[2].trim()}:{name:m,dimensions:""}}),b={listing_type:"property",category:i.property_type||"Real Estate",subcategory:i.subcategory||null,title:i.title,description:i.description||"",price:Math.max(W,Math.min(X,parseFloat(i.price)||0)),currency:i.currency||"USD",real_price:r,country:i.country||"",country_code:(i.country_code||"").toUpperCase(),state:i.state||"",city:i.city||"",town:i.town||"",address:i.address||"",zip_code:i.zip_code||"",product_location:i.product_location||"",latitude:i.latitude?parseFloat(i.latitude):null,longitude:i.longitude?parseFloat(i.longitude):null,property_type:i.property_type||"",listing_status:i.listing_status||"sale",condition:i.condition||null,bedrooms:i.bedrooms?parseInt(i.bedrooms):null,bathrooms:i.bathrooms?parseInt(i.bathrooms):null,half_bathrooms:d(i.half_bathrooms),building_size:i.building_size||"",land_size:i.land_size||"",floors:d(i.floors),garage:i.garage||"",parking_spaces:i.parking_spaces?parseInt(i.parking_spaces):null,furnished:i.furnished||"",year_built:d(i.year_built),year_renovated:d(i.year_renovated),landmarks:l(i.landmarks_text),interior_features:l(i.interior_features_text),exterior_features:l(i.exterior_features_text),home_systems:l(i.home_systems_text),legal_info:l(i.legal_info_text).map(m=>{const h=String(m).match(/^(.*?):\s*(.*?)\s*\((Seller provided|Not verified|Documented)\)\s*$/i);return h?{label:h[1].trim(),value:h[2].trim(),source:h[3]}:{label:m,value:"",source:"Not verified"}}),risk_notes:i.risk_notes||"",floor_plan:{image:i.floor_plan_image||"",rooms:u,levels:i.floor_plan_levels||"",total_area:i.floor_plan_total_area||""},nearby_area:{schools:l(i.nearby_schools_text),hospitals:l(i.nearby_hospitals_text),shopping:l(i.nearby_shopping_text),transportation:l(i.nearby_transportation_text),distances:l(i.nearby_distances_text)},verification_status:i.verification_status||"Not verified",verification_date:i.verification_date||"",inspection_info:i.inspection_info||"",documents:l(i.documents_text),features:s,images:o,video_url:(o||[]).find(m=>typeof m=="string"&&I(m))||null,video:(o||[]).find(m=>typeof m=="string"&&I(m))||null,highlights:Ut(i.highlights_text),seo_keywords:Ut(i.seo_keywords_text),is_ai_generated:!!i.catalog_template_id,ai_generated_fields:i.catalog_template_id?["title","description","features","highlights","seo_keywords","country","country_code","product_location"]:[],is_active:i.is_active==="on"},g={neighborhood:i.neighborhood||"",living_areas:i.living_areas||"",kitchens:d(i.kitchens),balconies:d(i.balconies),garden:i.garden||"",pool:i.pool||"",security:i.security||"",utilities:i.utilities||"",construction_type:i.construction_type||"",construction_status:i.construction_status||"",ownership_type:i.ownership_type||"",contact_name:i.contact_name||"",contact_phone:i.contact_phone||"",contact_email:i.contact_email||""},x={};for(const[m,h]of Object.entries({...g,real_price:r}))h!=null&&String(h).trim()!==""&&(x[m]=h);let f;if(t){b.property_id=t;const m=se((window._propertiesData||[]).find(h=>h.property_id===t)||(window._productsData||[]).find(h=>h.property_id===t));b.specifications={...m.specifications&&typeof m.specifications=="object"?m.specifications:{},...x},{error:f}=await c.from("showroom_listings").upsert({...m,...b},{onConflict:"property_id"})}else b.property_id=ut(),b.specifications={...x},{error:f}=await c.from("showroom_listings").insert(b);f&&di(f,()=>Xe({...b,property_id:t||b.property_id}),t?"Property update":"Property publish")||(p(t?"Property updated!":"Property published!"),z(),wt())};const Je={Car:"Cars",Truck:"Trucks",Bus:"Buses","Motorhome / RV":"Motorhomes",Motorcycle:"Motorcycles","Boat / Marine":"Marine & Boating"},_s=["Sedan","SUV","Hatchback","Coupe","Convertible","Wagon","Pickup","Van","Truck","Sports Car","Luxury Sedan","Bus","Motorhome","Motorcycle","Yacht","Jet Ski","Other"];window.showAddVehicleModal=function(e={}){const t=!!e.property_id,a=Object.keys(Je).find(l=>Je[l]===e.category)||"Car",i=e.specifications&&typeof e.specifications=="object"?e.specifications:{},o=(l,d)=>e[l]??i[l]??d,s=(l,d="")=>Array.isArray(l)?l.join(", "):l??d;j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box wide">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">${t?"Edit":"Add"} Vehicle — Professional Listing</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <form id="vehicle-form" onsubmit="saveVehicle(event,'${t?e.property_id:""}')" class="space-y-4">
          <div class="glass-soft border border-amber-500/15 rounded-2xl p-4">
            <div class="flex items-start gap-3">
              <span class="shrink-0 w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><i data-lucide="car-front" class="w-4.5 h-4.5 text-amber-400"></i></span>
              <div>
                <p class="text-xs font-bold text-white uppercase tracking-wide">Cars &amp; Trucks — Direct seller listings</p>
                <p class="text-[11px] text-gray-500 mt-0.5">This professional listing lives in the Vehicles row above Real Estate. Fill in the vehicle details below — you review everything before publishing.</p>
              </div>
            </div>
          </div>

          <div class="glass-soft border border-violet-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="car" class="w-4 h-4 text-violet-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Overview &amp; Identity</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Vehicle Type *</label><select class="input-field" name="vehicle_type" required>${Object.keys(Je).map(l=>`<option value="${l}" ${a===l?"selected":""}>${l}</option>`).join("")}</select></div>
              <div><label class="lbl">Body Type</label><select class="input-field" name="body_type">${["",..._s].map(l=>`<option value="${l}" ${o("body_type","")===l?"selected":""}>${l||"General"}</option>`).join("")}</select></div>
              <div class="sm:col-span-2"><label class="lbl">Vehicle Title *</label><input class="input-field" name="title" value="${n(e.title||"")}" placeholder="e.g. 2023 Toyota Land Cruiser V8 Turbo Diesel"></div>
              <div><label class="lbl">Brand / Make *</label><input class="input-field" name="make" value="${n(o("make",o("brand","")))}" placeholder="e.g. Toyota"></div>
              <div><label class="lbl">Model *</label><input class="input-field" name="model" value="${n(i.model||e.model||"")}" placeholder="e.g. Land Cruiser"></div>
              <div><label class="lbl">Trim / Edition</label><input class="input-field" name="trim" value="${n(o("trim",""))}" placeholder="e.g. GXR V8, Platinum, LS"></div>
              <div><label class="lbl">Model Year</label><input class="input-field" name="model_year" value="${n(o("model_year",""))}" placeholder="e.g. 2023"></div>
              <div><label class="lbl">Doors</label><input class="input-field" name="doors" value="${n(o("doors",""))}" placeholder="e.g. 4"></div>
              <div><label class="lbl">Color (Exterior)</label><input class="input-field" name="color" value="${n(e.color||i.color||"")}" placeholder="e.g. Pearl White"></div>
              <div><label class="lbl">VIN / Serial</label><input class="input-field" name="vin" value="${n(o("vin",""))}" placeholder="Optional identification number"></div>
            </div>
          </div>

          <div class="glass-soft border border-amber-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="gauge" class="w-4 h-4 text-amber-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Performance &amp; Mechanical</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Mileage</label><input class="input-field" name="mileage" value="${n(o("mileage",""))}" placeholder="e.g. 15,000 mi or 0 (new)"></div>
              <div><label class="lbl">Engine</label><input class="input-field" name="engine" value="${n(o("engine",""))}" placeholder="e.g. 4.0L V8 Turbo Diesel"></div>
              <div><label class="lbl">Horsepower</label><input class="input-field" name="horsepower" value="${n(o("horsepower",""))}" placeholder="e.g. 400 hp"></div>
              <div><label class="lbl">Transmission</label><select class="input-field" name="transmission">${["","Automatic","Manual","CVT","Dual-Clutch","Semi-Automatic","Electric (Single Speed)"].map(l=>`<option value="${l}" ${o("transmission","")===l?"selected":""}>${l||"Not specified"}</option>`).join("")}</select></div>
              <div><label class="lbl">Fuel Type</label><select class="input-field" name="fuel_type">${["","Gasoline","Diesel","Electric","Hybrid","Plug-in Hybrid","LPG","Bio-diesel"].map(l=>`<option value="${l}" ${o("fuel_type","")===l?"selected":""}>${l||"Not specified"}</option>`).join("")}</select></div>
              <div><label class="lbl">Drive Type</label><select class="input-field" name="drive_type">${["","FWD","RWD","AWD","4WD"].map(l=>`<option value="${l}" ${o("drive_type","")===l?"selected":""}>${l||"Not specified"}</option>`).join("")}</select></div>
              <div><label class="lbl">Fuel Economy</label><input class="input-field" name="fuel_economy" value="${n(o("fuel_economy",""))}" placeholder="e.g. 25 mpg combined"></div>
              <div><label class="lbl">Towing Capacity</label><input class="input-field" name="towing_capacity" value="${n(o("towing_capacity",""))}" placeholder="e.g. 7,700 lbs"></div>
              <div><label class="lbl">(${o("sleeping_capacity","")?"Sleeps":"Seating Capacity"})</label><input class="input-field" name="seating_capacity" value="${n(o("seating_capacity",""))}" placeholder="e.g. 5 seats or Sleeps 6"></div>
              <div><label class="lbl">Wheels &amp; Tires</label><input class="input-field" name="wheels_tires" value="${n(o("wheels_tires",""))}" placeholder="e.g. 2 new front, 20" alloy, 265/65 R18"></div>
              <div><label class="lbl">Dimensions (L × W × H)</label><input class="input-field" name="dimensions" value="${n(o("dimensions",""))}" placeholder="e.g. 4,950 x 1,980 x 1,890 mm"></div>
              <div><label class="lbl">Cargo Capacity</label><input class="input-field" name="cargo_capacity" value="${n(o("cargo_capacity",""))}" placeholder="e.g. 2,000 L / 5 seats up"></div>
            </div>
          </div>

          <div class="glass-soft border border-emerald-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Condition, History &amp; Ownership</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Condition *</label><select class="input-field" name="condition" required>${["","New","Used - Like New","Used - Good","Used - Fair","Refurbished"].map(l=>`<option value="${l}" ${o("condition","")===l?"selected":""}>${l||"Select condition"}</option>`).join("")}</select></div>
              <div><label class="lbl">Previous Owners</label><input class="input-field" name="previous_owners" value="${n(o("previous_owners",""))}" placeholder="e.g. 1 or None (new)"></div>
              <div class="sm:col-span-2"><label class="lbl">Ownership History</label><textarea class="input-field" name="ownership_history" rows="2" placeholder="e.g. Single owner, always garaged, clean title">${n(o("ownership_history",""))}</textarea></div>
              <div class="sm:col-span-2"><label class="lbl">Service / Maintenance History</label><textarea class="input-field" name="service_history" rows="2" placeholder="e.g. Full dealer service every 5,000 mi, new brakes 2024">${n(o("service_history",""))}</textarea></div>
              <div class="sm:col-span-2"><label class="lbl">Accident / Damage History</label><textarea class="input-field" name="accident_history" rows="2" placeholder="e.g. Accident-free, or: minor rear bumper repair 2022">${n(o("accident_history",""))}</textarea></div>
              <div><label class="lbl">Registration Status</label><select class="input-field" name="registration_status">${["","Registered","Unregistered","Registration Pending"].map(l=>`<option value="${l}" ${o("registration_status","")===l?"selected":""}>${l||"Not specified"}</option>`).join("")}</select></div>
              <div><label class="lbl">Inspection Status</label><select class="input-field" name="inspection_status">${["","Inspected & Certified","Inspected","Not Inspected","Under Inspection"].map(l=>`<option value="${l}" ${o("inspection_status","")===l?"selected":""}>${l||"Not specified"}</option>`).join("")}</select></div>
            </div>
          </div>

          <div class="glass-soft border border-rose-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="cpu" class="w-4 h-4 text-rose-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Safety, Technology &amp; Interior</p></div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Safety Features (comma separated)</label><input class="input-field" name="safety_features" value="${n(typeof o("safety_features",[]).join=="function"?o("safety_features",[]).join(", "):o("safety_features",""))}" placeholder="ABS, Airbags, Lane Assist, Traction Control, 360 Camera"></div>
              <div class="sm:col-span-2"><label class="lbl">Driver Assistance</label><input class="input-field" name="driver_assistance" value="${n(s(o("driver_assistance","")))}" placeholder="Adaptive Cruise, Auto Emergency Braking, Blind-spot Monitor"></div>
              <div class="sm:col-span-2"><label class="lbl">Technology &amp; Infotainment</label><input class="input-field" name="technology" value="${n(s(o("technology","")))}" placeholder="Apple CarPlay, Navigation, BOSE sound, Reverse camera"></div>
              <div class="sm:col-span-2"><label class="lbl">Interior &amp; Comfort</label><input class="input-field" name="interior" value="${n(s(o("interior","")))}" placeholder="Leather seats, Heated front seats, Sunroof, AC"></div>
            </div>
          </div>

          <div class="glass-soft border border-sky-500/25 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="badge-dollar-sign" class="w-4 h-4 text-sky-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Price, Warranty, Location &amp; Seller</p></div>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Price (USD) *</label><input type="number" class="input-field" name="price" value="${e.price||""}" required placeholder="0"></div>
              <div><label class="lbl">Real Price (crossed out)</label><input type="number" class="input-field" name="real_price" value="${e.real_price??i.real_price??""}" placeholder="Original price before discount"></div>
              <div><label class="lbl">Stock Qty</label><input type="number" class="input-field" name="stock_quantity" value="${e.stock_quantity??"1"}"></div>
              <div><label class="lbl">Warranty</label><input class="input-field" name="warranty" value="${n(e.warranty||i.warranty||"")}" placeholder="e.g. 3-year manufacturer"></div>
              <div class="sm:col-span-2"><label class="lbl">Listing Location</label><input class="input-field" name="location" value="${n(o("location",""))}" placeholder="e.g. Houston, TX, United States"></div>
              <div><label class="lbl">Seller / Contact Name</label><input class="input-field" name="seller_name" value="${n(o("seller_name",""))}" placeholder="e.g. James Carter"></div>
              <div><label class="lbl">Seller Phone / WhatsApp</label><input class="input-field" name="seller_phone" value="${n(o("seller_phone",""))}" placeholder="e.g. +1 555 010 2233"></div>
              <div><label class="lbl">Seller Email</label><input class="input-field" name="seller_email" value="${n(o("seller_email",""))}" placeholder="e.g. james@example.com"></div>
            </div>
          </div>

          <div class="glass-soft border border-blue-500/20 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2"><i data-lucide="photo" class="w-4 h-4 text-blue-400"></i><p class="text-xs font-bold text-white uppercase tracking-wide">Description &amp; Media</p></div>
            <div class="form-grid form-grid-2">
              <div class="sm:col-span-2"><label class="lbl">Description</label><textarea class="input-field" name="description" rows="4" placeholder="Clear, professional description of the vehicle, its condition, extras and service history...">${n(e.description||"")}</textarea></div>
              <div class="sm:col-span-2"><label class="lbl">Features (comma separated)</label><input class="input-field" name="features_text" value="${n((e.features||[]).join(", "))}" placeholder="Leather seats, Sunroof, GPS, Heated seats, Roof rack"></div>
            </div>
            <div>
              <label class="lbl">Vehicle Videos</label>
              <div id="drop-zone" class="drop-zone" onclick="pickMediaForForm('img-upload')">
                <i data-lucide="image-plus" class="w-7 h-7 text-blue-400 mx-auto mb-2"></i>
                <p class="text-xs font-bold text-gray-300">Click or drag &amp; drop videos</p>
                <input type="file" id="img-upload" class="hidden" multiple accept="video/mp4,video/webm,video/*" onchange="handleImageUpload(event)">
              </div>
              <div id="image-preview" class="flex flex-wrap gap-2 mt-3">
                ${(e.images||[]).filter(I).map((l,d)=>we(l,d)).join("")}
              </div>
              <div id="image-url-inputs">
                ${(e.images||[]).filter(I).map((l,d)=>`<input type="hidden" name="images" id="img-url-${d}" value="${n(l)}">`).join("")}
              </div>
            </div>
            <label class="flex items-center gap-2.5 cursor-pointer select-none mt-2"><input type="checkbox" name="is_active" ${e.is_active===!1?"":"checked"} class="w-4 h-4 accent-emerald-500"><span class="text-xs font-bold text-gray-300">Publish immediately</span></label>
          </div>

          <div class="flex items-center justify-between gap-3">
            <button type="button" onclick="closeModal()" class="btn-press px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-700/60 hover:bg-gray-600 text-gray-200 transition">Cancel</button>
            <button type="submit" class="btn-press flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm font-black px-7 py-3 rounded-2xl transition shadow-xl shadow-orange-700/25">Publish Vehicle</button>
          </div>
        </form>
      </div>
    </div>`),ht(),vt(),window._vehFormDirty=!!t;const r=document.getElementById("vehicle-form");if(r){const l=()=>{window._vehFormDirty=!0};r.addEventListener("input",l),r.addEventListener("change",l)}window.lucide&&lucide.createIcons()};window.saveVehicle=async function(e,t){e.preventDefault();const a=new FormData(e.target),i=Object.fromEntries(a.entries()),o=[...a.getAll("images")].filter(k=>k&&!String(k).startsWith("blob:")&&I(k)).concat(String(i.images_text||"").split(/\r?\n/).map(k=>k.trim()).filter(I)),s=[...new Set(o)],r=(i.features_text||"").split(",").map(k=>k.trim()).filter(Boolean),l=(i.safety_features||"").split(",").map(k=>k.trim()).filter(Boolean),d=(i.driver_assistance||"").split(",").map(k=>k.trim()).filter(Boolean),u=(i.technology||"").split(",").map(k=>k.trim()).filter(Boolean),b=(i.interior||"").split(",").map(k=>k.trim()).filter(Boolean),g=i.real_price===""||i.real_price==null?null:Math.max(W,Math.min(X,parseFloat(i.real_price)||0)),x=Je[i.vehicle_type]||"Cars",f=String(i.model_year||"").trim(),m=String(i.make||"").trim(),h=String(i.model||"").trim(),E=[f,m,h].filter(Boolean).join(" ")||String(i.title||"").trim(),S={make:m,model:h,model_year:f,body_type:i.body_type||null,trim:i.trim||"",mileage:i.mileage||"",engine:i.engine||"",horsepower:i.horsepower||"",transmission:i.transmission||null,drive_type:i.drive_type||null,fuel_type:i.fuel_type||null,fuel_economy:i.fuel_economy||"",towing_capacity:i.towing_capacity||"",seating_capacity:i.seating_capacity||null,sleeping_capacity:x==="Motorhomes"&&i.seating_capacity||null,doors:i.doors||null,safety_features:l,driver_assistance:d,technology:u,interior:b,wheels_tires:i.wheels_tires||"",dimensions:i.dimensions||"",cargo_capacity:i.cargo_capacity||"",ownership_history:i.ownership_history||"",service_history:i.service_history||"",accident_history:i.accident_history||"",previous_owners:i.previous_owners||"",registration_status:i.registration_status||null,inspection_status:i.inspection_status||null,color:i.color||"",vin:i.vin||"",warranty:i.warranty||"",condition:i.condition||"",location:i.location||"",seller_name:i.seller_name||"",seller_phone:i.seller_phone||"",seller_email:i.seller_email||"",product_location:i.location||""};for(const k of Object.keys(S))S[k]==null&&delete S[k];const C={listing_type:"vehicle",category:x,subcategory:i.body_type||i.vehicle_type||null,title:String(i.title||"").trim()||E,description:i.description||"",price:Math.max(W,Math.min(X,parseFloat(i.price)||0)),currency:"USD",real_price:g,images:s,features:r,brand:m||null,color:i.color||null,condition:i.condition||null,warranty:i.warranty||null,stock_quantity:parseInt(i.stock_quantity,10)||1,is_active:i.is_active==="on",is_featured:!1,specifications:{...S,real_price:g}};let _;if(t){C.property_id=t;const k=se((window._productsData||[]).find(ke=>ke.property_id===t));C.specifications={...k.specifications&&typeof k.specifications=="object"?k.specifications:{},...S,real_price:g},{error:_}=await c.from("showroom_listings").upsert({...k||{},...C},{onConflict:"property_id"})}else C.property_id=ut(),{error:_}=await c.from("showroom_listings").insert(C);_&&di(_,()=>Xe({...C,property_id:t||C.property_id}),t?"Vehicle update":"Vehicle publish")||(p(t?"Vehicle updated!":"Vehicle published! It now appears in the Cars & Trucks row."),z(),M())};window.editProperty=async function(e){const{data:t,error:a}=await c.from("showroom_listings").select("*").eq("property_id",e).maybeSingle();let i=a?null:t;i||(i=Ae(e)),i||(i=(Array.isArray(J)?J.find(o=>o.property_id===e):null)||null),i&&showAddPropertyModal(i)};const ks=["pending_verification","payment_received","payment_approved","documentation_pending","refund_processing","processing","shipped","in_transit","out_for_delivery","delivered","order_completed","cancelled","rejected"];async function ca(){const e=document.getElementById("content");try{const{data:t}=await c.from("payment_receipts").select("*").order("created_at",{ascending:!1}).limit(300),a=t||[],i=["All","Pending Verification","Paid","Documentation","Processing","Shipped","Delivered","Rejected"];let o="All";e.innerHTML=`
      <div class="space-y-4 fade-in">
        <h2 class="text-xl font-black text-white">Orders Manager</h2>
        <div class="flex gap-2 flex-wrap" id="order-tabs">
          ${i.map(s=>`<button class="tab-btn ${s==="All"?"active":""}" onclick="filterOrders('${s}')">${s}</button>`).join("")}
        </div>
        <div class="flex gap-3">
          <div class="flex-1 relative">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"></i>
            <input type="search" class="input-field pl-9" placeholder="Search order, email, nameâ€¦" oninput="searchOrders(this.value)">
          </div>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full dt">
              <thead><tr>
                <th>Order #</th><th>Customer</th><th>Product</th>
                <th class="hidden sm:table-cell">Amount</th><th>Status</th>
                <th class="hidden md:table-cell">Date</th><th>Actions</th>
              </tr></thead>
              <tbody id="orders-tbody">
                ${a.length===0?'<tr><td colspan="7" class="text-center text-gray-500 py-12">No orders yet</td></tr>':a.map(s=>$s(s)).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`,window._ordersData=a,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}function $s(e){return`<tr class="order-row" data-status="${e.status}" data-search="${n(e.order_number)} ${n(e.full_name)} ${n(e.email)}">
    <td><span class="font-mono text-xs text-blue-400 font-bold">${n(e.order_number||e.id?.slice(0,8))}</span></td>
    <td>
      <p class="text-xs font-bold text-white">${n(e.full_name||"Guest")}</p>
      <p class="text-[10px] text-gray-500">${n(e.email)}</p>
    </td>
    <td><p class="text-xs text-gray-300 truncate max-w-[140px]">${n(e.listing_title||e.listing_id||"â€”")}</p></td>
    <td class="hidden sm:table-cell"><span class="text-xs font-bold text-emerald-400">$${parseFloat(e.amount||0).toLocaleString()}</span></td>
    <td>${H(e.status)}</td>
    <td class="hidden md:table-cell"><span class="text-xs text-gray-500">${Z(e.created_at)}</span></td>
    <td>
      <button onclick="viewOrder('${e.id}')" class="btn-press p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition" title="View / Update">
        <i data-lucide="eye" class="w-3.5 h-3.5"></i>
      </button>
    </td>
  </tr>`}window.filterOrders=function(e){document.querySelectorAll("#order-tabs .tab-btn").forEach(t=>t.classList.toggle("active",t.textContent===e)),document.querySelectorAll(".order-row").forEach(t=>{const a=t.dataset.status||"",i=e==="All"||e==="Pending Verification"&&["pending_verification","payment_received","order_placed","receipt_requested"].includes(a)||e==="Paid"&&["payment_approved","payment_verified","paid","approved"].includes(a)||e==="Documentation"&&["documentation_pending"].includes(a)||e==="Processing"&&["processing","order_processing"].includes(a)||e==="Shipped"&&["shipped","order_shipped","in_transit","out_for_delivery"].includes(a)||e==="Delivered"&&["delivered","order_delivered","order_completed"].includes(a)||e==="Rejected"&&["cancelled","rejected","refund_processing","payment_failed"].includes(a);t.style.display=i?"":"none"})};window.searchOrders=function(e){const t=e.toLowerCase();document.querySelectorAll(".order-row").forEach(a=>{a.style.display=!t||a.dataset.search.toLowerCase().includes(t)?"":"none"})};window.viewOrder=async function(e){const t=(window._ordersData||[]).find(i=>i.id===e);if(!t)return;let a="";if(t.receipt_file_path&&(a=`
      <div class="p-3 glass-soft border border-blue-500/15 rounded-xl">
        <p class="text-[10px] text-gray-500 font-bold uppercase mb-1.5 flex items-center justify-between">
          <span><i data-lucide="receipt" class="w-3.5 h-3.5 inline mr-1 align-[-2px]"></i> Payment Receipt ${t.receipt_file_name?"("+n(t.receipt_file_name)+")":""}</span>
          <a href="#" data-receipt-view="true" class="text-blue-400 hover:underline font-bold uppercase">View</a>
        </p>
        <iframe data-receipt-iframe="true" class="w-full h-40 rounded-lg bg-black/20 border border-blue-500/10 mt-1" title="Receipt preview"></iframe>
      </div>`),j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">Order ${n(t.order_number)}</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <div class="space-y-3 text-sm">
          <div class="grid grid-cols-2 gap-3">
            ${[["Customer",t.full_name],["Email",t.email],["Phone",t.phone],["Amount",`${Ka(t.amount,t.currency||"USD")}`],["Product",t.listing_title||t.listing_id],["Date",be(t.created_at)],["Method",t.payment_method==="flutterwave"?"Card / ATM (Flutterwave)":"Manual Bank Transfer"],["Qty",t.quantity||1]].map(([i,o])=>`<div><p class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">${i}</p><p class="text-xs text-white font-medium">${n(o)||"—"}</p></div>`).join("")}
          </div>
          ${t.guest_shipping_address?`<div><p class="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Shipping Address</p><p class="text-xs text-gray-300">${n(t.guest_shipping_address||t.billing_address)||"—"}</p></div>`:""}
          ${t.transaction_reference?`<div class="p-3 glass-soft border border-blue-500/15 rounded-xl"><p class="text-[10px] text-gray-500 font-bold uppercase mb-1">Transaction Reference</p><p class="text-xs font-mono text-blue-300">${n(t.transaction_reference)}</p></div>`:""}
          ${t.additional_notes?`<div class="p-3 glass-soft border border-amber-500/15 rounded-xl"><p class="text-[10px] text-gray-500 font-bold uppercase mb-1">Notes</p><p class="text-xs text-gray-300">${n(t.additional_notes)}</p></div>`:""}
          ${a}
          <div>
            <label class="lbl">Verification Actions</label>
            <div class="grid grid-cols-2 gap-2">
              <button onclick="quickOrderAction('${t.id}','payment_approved')" class="btn-press px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition"><i data-lucide="shield-check" class="w-3.5 h-3.5 inline mr-1 align-[-2px]"></i> Approve Payment</button>
              <button onclick="quickOrderAction('${t.id}','documentation_pending')" class="btn-press px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition"><i data-lucide="file-question" class="w-3.5 h-3.5 inline mr-1 align-[-2px]"></i> Request Docs</button>
              <button onclick="quickOrderAction('${t.id}','rejected')" class="btn-press px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition"><i data-lucide="x-circle" class="w-3.5 h-3.5 inline mr-1 align-[-2px]"></i> Reject Payment</button>
              <button onclick="quickOrderAction('${t.id}','refund_processing')" class="btn-press px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition"><i data-lucide="rotate-ccw" class="w-3.5 h-3.5 inline mr-1 align-[-2px]"></i> Refund Processing</button>
            </div>
          </div>
          <div>
            <label class="lbl">Update Order Status</label>
            <div class="flex gap-2">
              <select id="order-status-select" class="input-field flex-1">
                ${ks.map(i=>`<option value="${i}" ${t.status===i?"selected":""}>${i.replace(/_/g," ")}</option>`).join("")}
              </select>
              <button onclick="updateOrderStatus('${t.id}')" class="btn-press px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition">Update</button>
            </div>
          </div>
          <div>
            <label class="lbl">Admin Notes</label>
            <textarea id="order-admin-notes" rows="2" class="input-field w-full" placeholder="Verification notes…">${n(t.admin_notes||"")}</textarea>
            <button onclick="saveOrderAdminNotes('${t.id}')" class="btn-press mt-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-xl transition">Save Notes</button>
          </div>
        </div>
      </div>
    </div>`),t.receipt_file_path)try{const{data:i,error:o}=await c.storage.from("payment-receipts").createSignedUrl(t.receipt_file_path,3600),s=!o&&i?.signedUrl?i.signedUrl:null,r=document.querySelector('[data-receipt-iframe="true"]'),l=document.querySelector('[data-receipt-view="true"]');r&&s&&(r.src=s),l&&s&&(l.href=s),l&&!s&&l.remove()}catch{}};window.saveOrderAdminNotes=async function(e){const t=document.getElementById("order-admin-notes")?.value,{error:a}=await c.from("payment_receipts").update({admin_notes:t||null,admin_reviewed_at:new Date().toISOString()}).eq("id",e);if(a){p(a.message,"error");return}p("Notes saved")};window.quickOrderAction=async function(e,t){const{error:a}=await c.from("payment_receipts").update({status:t,admin_reviewed_at:new Date().toISOString()}).eq("id",e);if(a){p(a.message,"error");return}p("Order updated to "+t.replace(/_/g," ")),z(),ca()};window.updateOrderStatus=async function(e){const t=document.getElementById("order-status-select")?.value;if(!t)return;const{error:a}=await c.from("payment_receipts").update({status:t,admin_reviewed_at:new Date().toISOString()}).eq("id",e);if(a){p(a.message,"error");return}p("Order status updated"),z(),ca()};async function Ss(){const e=document.getElementById("content");try{const{data:t}=await c.from("profiles").select("*").order("created_at",{ascending:!1}).limit(200),a=t||[];e.innerHTML=`
      <div class="space-y-4 fade-in">
        <div class="flex items-center gap-3">
          <h2 class="text-xl font-black text-white flex-1">Customers Manager</h2>
          <span class="text-sm text-gray-400 font-medium">${a.length} total</span>
        </div>
        <div class="relative">
          <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"></i>
          <input type="search" class="input-field pl-9" placeholder="Search customersâ€¦" oninput="searchCustomers(this.value)">
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full dt">
              <thead><tr><th>Customer</th><th class="hidden sm:table-cell">Country</th><th class="hidden md:table-cell">Joined</th><th>Actions</th></tr></thead>
              <tbody id="customers-tbody">
                ${a.length===0?'<tr><td colspan="4" class="text-center text-gray-500 py-12">No customers yet</td></tr>':a.map(i=>`<tr class="cust-row" data-search="${n(i.display_name)} ${n(i.user_id)}">
                    <td>
                      <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                          <i data-lucide="user" class="w-4 h-4 text-blue-400"></i>
                        </div>
                        <div>
                          <p class="text-xs font-bold text-white">${n(i.display_name||"Anonymous")}</p>
                          <p class="text-[10px] font-mono text-gray-500">${n(i.user_id?.slice(0,12))}â€¦</p>
                        </div>
                      </div>
                    </td>
                    <td class="hidden sm:table-cell"><span class="text-xs text-gray-300">${n(i.country_code||"â€”")}</span></td>
                    <td class="hidden md:table-cell"><span class="text-xs text-gray-500">${Z(i.created_at)}</span></td>
                    <td>
                      <button onclick="viewCustomer('${i.user_id}')" class="btn-press p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition"><i data-lucide="eye" class="w-3.5 h-3.5"></i></button>
                    </td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`,window._customersData=a,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.searchCustomers=function(e){const t=e.toLowerCase();document.querySelectorAll(".cust-row").forEach(a=>{a.style.display=!t||a.dataset.search.toLowerCase().includes(t)?"":"none"})};window.viewCustomer=async function(e){const t=(window._customersData||[]).find(i=>i.user_id===e);if(!t)return;const{data:a}=await c.from("payment_receipts").select("order_number,amount,currency,status,created_at").eq("user_id",e).order("created_at",{ascending:!1}).limit(20);j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">Customer Profile</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <div class="flex items-center gap-4 mb-5 p-4 glass-soft border border-blue-500/15 rounded-xl">
          <div class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
            <i data-lucide="user" class="w-6 h-6 text-blue-400"></i>
          </div>
          <div>
            <p class="font-black text-white">${n(t.display_name||"Anonymous")}</p>
            <p class="text-xs text-gray-400 mt-0.5">Joined ${Z(t.created_at)} Â· ${n(t.country_code||"Unknown country")}</p>
          </div>
        </div>
        <h4 class="text-xs font-bold text-gray-400 uppercase mb-3">Purchase History</h4>
        ${(a||[]).length===0?'<p class="text-xs text-gray-500 py-4 text-center">No orders yet</p>':(a||[]).map(i=>`<div class="flex items-center justify-between py-2 border-b border-blue-500/5 last:border-0">
            <div><p class="text-xs font-bold text-white font-mono">${n(i.order_number)}</p><p class="text-[10px] text-gray-500">${be(i.created_at)}</p></div>
            <div class="flex items-center gap-2">${H(i.status)}<span class="text-xs font-bold text-emerald-400">$${parseFloat(i.amount).toLocaleString()}</span></div>
          </div>`).join("")}
      </div>
    </div>`)};async function We(){const e=document.getElementById("content");try{const{data:t}=await c.from("product_reviews").select("*, showroom_listings(title, property_id)").order("created_at",{ascending:!1}).limit(200),a=t||[],i=a.filter(l=>!l.is_approved).length,{data:o}=await c.from("site_feedback").select("*").order("created_at",{ascending:!1}).limit(200),s=o||[],r=s.filter(l=>!l.is_approved).length;e.innerHTML=`
      <div class="space-y-4 fade-in">
        <div class="flex items-center gap-3">
          <h2 class="text-xl font-black text-white flex-1">Reviews & Feedback Manager</h2>
          ${i+r>0?`<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${i+r} pending</span>`:""}
        </div>

        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="star" class="w-4 h-4 text-amber-400"></i> Product Reviews</h3>
            <div class="flex gap-2 ml-auto">
              <button onclick="filterReviewTab('all')" class="tab-btn active" id="rtab-all">All Reviews</button>
              <button onclick="filterReviewTab('pending')" class="tab-btn" id="rtab-pending">Pending (${i})</button>
              <button onclick="filterReviewTab('approved')" class="tab-btn" id="rtab-approved">Approved</button>
            </div>
          </div>
          <div class="space-y-3" id="reviews-list">
            ${a.length===0?ge("star","No Reviews","Customer reviews will appear here."):a.map(l=>As(l)).join("")}
          </div>
        </div>

        <div class="glass-soft border border-emerald-500/15 rounded-2xl p-5 space-y-4">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="message-square-text" class="w-4 h-4 text-emerald-400"></i> Customer Feedback (site-wide)</h3>
            ${r>0?`<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${r} pending</span>`:""}
          </div>
          <p class="text-[11px] text-gray-500">Feedback submitted from the "Feedback" form on every page. Approve to show it in the public "View more Feedback" list.</p>
          <div class="space-y-3" id="feedback-list">
            ${s.length===0?ge("message-square","No Feedback Yet","Site feedback will appear here."):s.map(l=>Ps(l)).join("")}
          </div>
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}function Ps(e){const t=Array.from({length:5},(a,i)=>i<(e.rating||5)?"â˜…":"â˜†").join("");return`<div class="glass-soft border ${e.is_approved?"border-emerald-500/15":"border-amber-500/20"} rounded-xl p-4" data-fb-approved="${e.is_approved}">
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-amber-400 font-bold text-sm">${t}</span>
          <span class="text-xs font-black text-white">${n(e.name||"Anonymous shopper")}</span>
          <span class="text-xs text-gray-500">${n(e.email||"no email")} Â· ${Z(e.created_at)}</span>
          ${e.is_approved?'<span class="badge bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Approved</span>':'<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Pending</span>'}
        </div>
        <p class="text-sm text-gray-200 leading-relaxed">${n(e.feedback||"â€”")}</p>
      </div>
      <div class="flex gap-1 shrink-0">
        ${e.is_approved?"":`<button onclick="approveFeedback('${e.id}')" class="btn-press p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition" title="Approve"><i data-lucide="check" class="w-4 h-4"></i></button>`}
        <button onclick="deleteFeedback('${e.id}')" class="btn-press p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    </div>
  </div>`}window.approveFeedback=async function(e){const{error:t}=await c.from("site_feedback").update({is_approved:!0}).eq("id",e);t?p(t.message,"error"):p("Feedback approved â€” it now shows on every page."),We()};window.deleteFeedback=async function(e){if(!confirm("Delete this feedback permanently?"))return;const{error:t}=await c.from("site_feedback").delete().eq("id",e);t?p(t.message,"error"):p("Feedback deleted."),We()};function As(e){const t=Array.from({length:5},(a,i)=>i<e.rating?"â˜…":"â˜†").join("");return`<div class="review-card glass-soft border ${e.is_approved?"border-blue-500/15":"border-amber-500/20"} rounded-xl p-4" data-approved="${e.is_approved}">
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-amber-400 font-bold text-sm">${t}</span>
          <span class="text-xs text-gray-500">${Z(e.created_at)}</span>
          ${e.is_approved?'<span class="badge bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Approved</span>':'<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Pending Approval</span>'}
        </div>
        <p class="text-sm text-gray-200 leading-relaxed">${n(e.comment||e.review_text||"â€”")}</p>
        <p class="text-[11px] text-blue-400 mt-1.5">On: ${n(e.showroom_listings?.title||e.listing_id)}</p>
      </div>
      <div class="flex gap-1 shrink-0">
        ${e.is_approved?"":`<button onclick="approveReview('${e.id}')" class="btn-press p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition" title="Approve"><i data-lucide="check" class="w-4 h-4"></i></button>`}
        <button onclick="deleteReview('${e.id}')" class="btn-press p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    </div>
  </div>`}window.filterReviewTab=function(e){["all","pending","approved"].forEach(t=>document.getElementById(`rtab-${t}`)?.classList.toggle("active",t===e)),document.querySelectorAll(".review-card").forEach(t=>{const a=e==="all"||e==="pending"&&t.dataset.approved==="false"||e==="approved"&&t.dataset.approved==="true";t.style.display=a?"":"none"})};window.approveReview=async function(e){await c.from("product_reviews").update({is_approved:!0}).eq("id",e),p("Review approved"),We()};window.deleteReview=async function(e){confirm("Delete this review permanently?")&&(await c.from("product_reviews").delete().eq("id",e),p("Review deleted"),We())};async function gi(){const e=document.getElementById("content");try{const{data:t}=await c.from("support_messages").select("*").order("created_at",{ascending:!1}).limit(200),a=t||[];e.innerHTML=`
      <div class="space-y-4 fade-in">
        <h2 class="text-xl font-black text-white">Messages & Support</h2>
        <div class="space-y-3">
          ${a.length===0?ge("message-circle","No Messages","Customer support messages will appear here."):a.map(i=>`
              <div class="glass-soft border ${i.is_read?"border-blue-500/10":"border-blue-400/30"} rounded-xl p-4 ${i.is_read?"":"ring-1 ring-blue-500/10"}">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs font-black text-white">${n(i.full_name||i.name||"Anonymous")}</span>
                      ${i.is_read?"":'<span class="badge bg-blue-500/15 text-blue-400 border-blue-500/20">New</span>'}
                      <span class="text-[10px] text-gray-500 ml-auto">${be(i.created_at)}</span>
                    </div>
                    <p class="text-[11px] text-blue-400 mb-1">${n(i.email||"â€”")}</p>
                    <p class="text-xs text-gray-300">${n(i.message||i.body||"â€”")}</p>
                    ${i.subject?`<p class="text-[11px] text-gray-500 mt-1">Subject: ${n(i.subject)}</p>`:""}
                  </div>
                  <div class="flex gap-1 shrink-0">
                    <button onclick="markMsgRead('${i.id}')" class="btn-press p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition" title="Mark Read"><i data-lucide="check" class="w-4 h-4"></i></button>
                  </div>
                </div>
              </div>`).join("")}
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.markMsgRead=async function(e){await c.from("support_messages").update({is_read:!0}).eq("id",e),p("Marked as read"),gi()};async function _t(){const e=document.getElementById("content");try{const{data:t}=await c.from("coupons").select("*").order("created_at",{ascending:!1}),a=t||[];e.innerHTML=`
      <div class="space-y-4 fade-in">
        <div class="flex items-center gap-3">
          <h2 class="text-xl font-black text-white flex-1">Coupons Manager</h2>
          <button onclick="showAddCouponModal()" class="btn-press flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition">
            <i data-lucide="plus" class="w-4 h-4"></i> Add Coupon
          </button>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full dt">
              <thead><tr><th>Code</th><th>Type</th><th>Value</th><th class="hidden sm:table-cell">Min Amount</th><th>Status</th><th class="hidden md:table-cell">Expires</th><th>Actions</th></tr></thead>
              <tbody>
                ${a.length===0?'<tr><td colspan="7" class="text-center text-gray-500 py-12">No coupons yet</td></tr>':a.map(i=>`<tr>
                    <td><code class="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">${n(i.code)}</code></td>
                    <td><span class="text-xs text-gray-300">${i.discount_type==="percent"?"Percentage":"Fixed Amount"}</span></td>
                    <td><span class="text-xs font-bold text-emerald-400">${i.discount_type==="percent"?i.discount_value+"%":"$"+i.discount_value}</span></td>
                    <td class="hidden sm:table-cell"><span class="text-xs text-gray-400">${i.min_amount?"$"+i.min_amount:"â€”"}</span></td>
                    <td>${H(i.is_active?"active":"inactive")}</td>
                    <td class="hidden md:table-cell"><span class="text-xs text-gray-500">${Z(i.expires_at)}</span></td>
                    <td>
                      <div class="flex gap-1">
                        <button onclick="toggleCoupon('${i.id}',${!i.is_active})" class="btn-press p-1.5 ${i.is_active?"text-amber-400 hover:bg-amber-500/10":"text-emerald-400 hover:bg-emerald-500/10"} rounded-lg transition"><i data-lucide="${i.is_active?"eye-off":"eye"}" class="w-3.5 h-3.5"></i></button>
                        <button onclick="deleteCoupon('${i.id}')" class="btn-press p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.showAddCouponModal=function(){j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">Create Coupon</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <form id="coupon-form" onsubmit="saveCoupon(event)" class="space-y-4">
          <div class="form-grid form-grid-2">
            <div><label class="lbl">Coupon Code *</label><input class="input-field uppercase" name="code" required placeholder="e.g. SAVE20" style="text-transform:uppercase"></div>
            <div><label class="lbl">Discount Type *</label><select class="input-field" name="discount_type" required>
              <option value="percent">Percentage (%)</option>
              <option value="fixed">Fixed Amount ($)</option>
            </select></div>
            <div><label class="lbl">Discount Value *</label><input type="number" class="input-field" name="discount_value" required min="0" step="0.01" placeholder="e.g. 20"></div>
            <div><label class="lbl">Minimum Order Amount</label><input type="number" class="input-field" name="min_amount" min="0" placeholder="0"></div>
            <div><label class="lbl">Usage Limit</label><input type="number" class="input-field" name="usage_limit" min="1" placeholder="Unlimited"></div>
            <div><label class="lbl">Expiry Date</label><input type="date" class="input-field" name="expires_at"></div>
          </div>
          <button type="submit" class="btn-press w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition">Create Coupon</button>
        </form>
      </div>
    </div>`)};window.saveCoupon=async function(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries()),i={code:a.code.toUpperCase(),discount_type:a.discount_type,discount_value:parseFloat(a.discount_value),min_amount:a.min_amount?parseFloat(a.min_amount):null,usage_limit:a.usage_limit?parseInt(a.usage_limit):null,expires_at:a.expires_at||null,is_active:!0},{error:o}=await c.from("coupons").insert(i);if(o){p(o.message,"error");return}p("Coupon created!"),z(),_t()};window.toggleCoupon=async function(e,t){await c.from("coupons").update({is_active:t}).eq("id",e),p(t?"Coupon activated":"Coupon deactivated"),_t()};window.deleteCoupon=async function(e){confirm("Delete this coupon?")&&(await c.from("coupons").delete().eq("id",e),p("Coupon deleted"),_t())};async function Es(){const e=document.getElementById("content");try{const{data:t}=await c.from("notification_log").select("*").order("created_at",{ascending:!1}).limit(100),a=t||[];e.innerHTML=`
      <div class="space-y-4 fade-in">
        <h2 class="text-xl font-black text-white">Notifications</h2>
        <div class="space-y-2">
          ${a.length===0?ge("bell","No Notifications","System notifications will appear here."):a.map(i=>`
              <div class="glass-soft border border-blue-500/10 rounded-xl p-3.5 flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <i data-lucide="bell" class="w-4 h-4 text-blue-400"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-xs font-bold text-white">${n(i.subject||i.event_type||"Notification")}</span>
                    ${H(i.status)}
                    <span class="text-[10px] text-gray-500 ml-auto">${be(i.created_at)}</span>
                  </div>
                  <p class="text-[11px] text-gray-400">${n(i.recipient||i.order_number)}</p>
                </div>
              </div>`).join("")}
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}const yi=["Featured","Sponsored","Featured Collection","Discover","Promotion"],Cs=[{id:"real-estate",name:"Real Estate & Properties"},{id:"marketplace",name:"Marketplace Showroom"}];let Ye=null;function Is(e){const t={Featured:"bg-blue-500/10 text-blue-300 border-blue-500/30",Sponsored:"bg-violet-500/10 text-violet-300 border-violet-500/30","Featured Collection":"bg-amber-500/10 text-amber-300 border-amber-500/30",Discover:"bg-emerald-500/10 text-emerald-300 border-emerald-500/30",Promotion:"bg-blue-500/10 text-blue-300 border-blue-500/30"};return`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${t[e]||t.Featured}">${n(e)}</span>`}function Ts(e){return!e||!e.link_type||e.link_type==="none"?'<span class="text-[10px] text-gray-500">No link</span>':e.link_type==="product"?`<span class="text-[10px] text-blue-300"><i data-lucide="package" class="w-3 h-3 inline mr-1"></i>Product Â· ${n(e.link_target||"")}</span>`:e.link_type==="category"?`<span class="text-[10px] text-emerald-300"><i data-lucide="tag" class="w-3 h-3 inline mr-1"></i>Category Â· ${n(e.link_target||"")}</span>`:`<span class="text-[10px] text-amber-300"><i data-lucide="layout-grid" class="w-3 h-3 inline mr-1"></i>Section Â· ${n(e.link_target||"")}</span>`}function Bs(e){return e.video_url?`<video src="${n(e.video_url)}" ${e.poster_url?`poster="${n(e.poster_url)}"`:""} class="w-24 h-14 rounded-lg object-cover border border-blue-500/20 shrink-0" muted preload="metadata"></video>`:e.image_url?`<img src="${n(e.image_url)}" class="w-24 h-14 rounded-lg object-cover border border-blue-500/20 shrink-0" onerror="this.remove()">`:'<div class="w-24 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0"><i data-lucide="megaphone" class="w-6 h-6 text-blue-400"></i></div>'}async function fi(){if(Ye)return Ye;const e=[],t=new Set,a=[],i=s=>{if(!s||!s.property_id)return;e.push({id:s.property_id,title:s.title||s.property_id});const r=s.category||"";r&&!t.has(r)&&(t.add(r),a.push(r))};try{J.forEach(i)}catch{}try{const{data:s,error:r}=await c.from("showroom_listings").select("property_id,title,category").order("created_at",{ascending:!1});!r&&s&&s.forEach(i)}catch{}return["Women","Men","Kids","Home","Sports","Jewellery","Electronics","Cars","Motorcycles","Phones","Computers","Furniture","Beauty","Fashion","Real Estate","Bicycles","Trucks","Land","Kitchen","Food","Pets","Books","Toys","Services"].forEach(s=>{t.has(s)||(t.add(s),a.push(s))}),Ye={products:e,categories:a,sections:Cs},Ye}async function Ls(e){try{const{data:{session:t}}=await c.auth.getSession();if(!t)return p("Sign in to upload media","error"),null;const a=(e.name.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,""),i=/^(mp4|webm|mov|m4v)$/.test(a)||e.type.startsWith("video/"),o=`ads/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${a}`,{error:s}=await c.storage.from("advertisements").upload(o,e,{contentType:e.type,upsert:!1});if(s)return p("Upload failed: "+s.message,"error"),null;const{data:r}=c.storage.from("advertisements").getPublicUrl(o);return{url:r.publicUrl,isVideo:i}}catch{return p("Upload failed","error"),null}}function it(e,t){const a=document.getElementById("ad-media-preview");if(!a)return;const i=document.getElementById("ad-hidden-video"),o=document.getElementById("ad-hidden-image");i&&(i.value=t?e:""),o&&(o.value=t?"":e),a.innerHTML=t?`<video src="${n(e)}" class="w-full h-40 object-cover rounded-xl" controls muted playsinline></video>`:`<img src="${n(e)}" class="w-full h-40 object-cover rounded-xl">`,window.lucide&&lucide.createIcons()}window.onAdMediaPicked=async function(e){const t=e.files&&e.files[0];if(!t)return;if(!(t.type.startsWith("image/")||t.type.startsWith("video/"))){p("Choose an image or video file","error");return}const i=await Ls(t);if(!i){e.value="";return}it(i.url,i.isVideo);const o=document.getElementById("ad-media-url");o&&(o.value=i.url)};window.onAdMediaUrl=function(e){const t=(e.value||"").trim();if(!t)return;const a=/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(t);it(t,a)};function ua(e,t,a){const i=document.getElementById("ad-link-target-wrap");if(!i)return;if(!t||t==="none"){i.innerHTML='<p class="text-[10px] text-gray-500">This ad is informational and will not be clickable.</p>';return}let o="";t==="product"?o='<option value="">Select a productâ€¦</option>'+e.products.map(s=>`<option value="${n(s.id)}" ${String(a)===String(s.id)?"selected":""}>${n(s.id)} â€” ${n((s.title||"").slice(0,60))}</option>`).join(""):t==="category"?o='<option value="">Select a categoryâ€¦</option>'+e.categories.map(s=>`<option value="${n(s)}" ${a===s?"selected":""}>${n(s)}</option>`).join(""):t==="section"&&(o='<option value="">Select a sectionâ€¦</option>'+e.sections.map(s=>`<option value="${n(s.id)}" ${a===s.id?"selected":""}>${n(s.name)}</option>`).join("")),i.innerHTML=`<label class="lbl">Target</label><select class="input-field" name="link_target">${o}</select>`}function hi(e){return`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box wide">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">${e?"Edit Advertisement":"Add Advertisement"}</h3>
          <button onclick="closeModal()" class="btn-press text-xs font-bold text-gray-400 hover:text-white transition">âœ• Close</button>
        </div>
        <form id="ad-form" onsubmit="saveAd(event)" class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <input type="hidden" name="id" value="${e?e.id:""}">
          <div class="form-grid form-grid-2">
            <div><label class="lbl">Title *</label><input class="input-field" name="title" required value="${n(e&&e.title?e.title:"")}" placeholder="e.g. Summer Sale 2026"></div>
            <div><label class="lbl">Ad Label</label>
              <select class="input-field" name="ad_label">
                ${yi.map(t=>`<option value="${t}" ${e&&e.ad_label===t?"selected":""}>${t}</option>`).join("")}
              </select>
            </div>
          </div>
          <div><label class="lbl">Message</label><textarea class="input-field" name="description" rows="2" placeholder="Short message shown on the adâ€¦">${n(e&&e.description?e.description:"")}</textarea></div>

          <div class="glass-soft border border-blue-500/15 rounded-xl p-4 space-y-3">
            <label class="lbl">Image / Video</label>
            <div id="ad-media-preview" class="w-full h-40 rounded-xl bg-black/40 flex items-center justify-center text-gray-600 text-xs border border-dashed border-gray-700"></div>
            <div class="flex items-center gap-2 flex-wrap">
              <label class="btn-press cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition">
                <i data-lucide="upload" class="w-4 h-4"></i> Upload File
                <input type="file" accept="image/*,video/mp4,video/webm,video/quicktime" class="hidden" onchange="onAdMediaPicked(this)">
              </label>
              <input id="ad-media-url" class="input-field flex-1 min-w-[160px]" placeholder="â€¦or paste media URL" oninput="onAdMediaUrl(this)">
            </div>
            <p class="text-[10px] text-gray-500">Videos play muted in the showcase. Images are cropped to fill (object-fit: cover).</p>
            <input type="hidden" name="image_url" id="ad-hidden-image">
            <input type="hidden" name="video_url" id="ad-hidden-video">
          </div>

          <div class="form-grid form-grid-2">
            <div><label class="lbl">Start Date</label><input type="date" class="input-field" name="start_date" value="${e&&e.start_date?String(e.start_date).slice(0,10):""}"></div>
            <div><label class="lbl">End Date</label><input type="date" class="input-field" name="end_date" value="${e&&e.end_date?String(e.end_date).slice(0,10):""}"></div>
          </div>

          <div class="glass-soft border border-blue-500/15 rounded-xl p-4 space-y-3">
            <label class="lbl">Link Destination</label>
            <select class="input-field" name="link_type" onchange="onAdLinkTypeChange()">
              <option value="none" ${!e||!e.link_type||e.link_type==="none"?"selected":""}>No link</option>
              <option value="product" ${e&&e.link_type==="product"?"selected":""}>Link to a product</option>
              <option value="category" ${e&&e.link_type==="category"?"selected":""}>Link to a category</option>
              <option value="section" ${e&&e.link_type==="section"?"selected":""}>Link to a showroom section</option>
            </select>
            <div id="ad-link-target-wrap"></div>
          </div>

          <div class="flex items-center justify-between p-3 glass-soft border border-blue-500/15 rounded-xl">
            <p class="text-xs font-bold text-white">Active</p>
            <label class="toggle-switch"><input type="checkbox" name="is_active" ${!e||e.is_active?"checked":""}><span class="toggle-slider"></span></label>
          </div>
          <button type="submit" class="btn-press w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition">${e?"Save Changes":"Create Advertisement"}</button>
        </form>
      </div>
    </div>`}window.onAdLinkTypeChange=function(){const e=window._adLinkCache||{products:[],categories:[],sections:[]},t=document.querySelector('#ad-form select[name="link_type"]'),a=t?t.value:"none";ua(e,a,"")};window.showAddAdModal=async function(){const e=await fi();window._adLinkCache=e,j(hi(null)),ua(e,"none","")};window.showEditAdModal=async function(e){const t=await fi();window._adLinkCache=t;const{data:a}=await c.from("promotions").select("*").eq("id",e).maybeSingle();if(!a){p("Ad not found","error");return}j(hi(a)),a.image_url?it(a.image_url,!1):a.video_url&&it(a.video_url,!0),ua(t,a.link_type||"none",a.link_target||"")};window.saveAd=async function(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries()),i=a.id||"",o={title:a.title,description:a.description||"",ad_label:yi.includes(a.ad_label)?a.ad_label:"Featured",image_url:a.image_url||null,video_url:a.video_url||null,link_type:["none","product","category","section"].includes(a.link_type)?a.link_type:"none",link_target:a.link_target||null,start_date:a.start_date?new Date(a.start_date+"T00:00:00").toISOString():null,end_date:a.end_date?new Date(a.end_date+"T23:59:59").toISOString():null,is_active:a.is_active==="on",promo_type:"banner"};if(!o.image_url&&!o.video_url){p("Add an image or video for the ad","error");return}const s=e.target.querySelector('button[type="submit"]');s&&(s.disabled=!0);try{if(i){const{error:r}=await c.from("promotions").update(o).eq("id",i);if(r)throw r;p("Ad updated!")}else{const{error:r}=await c.from("promotions").insert(o);if(r)throw r;p("Ad created!")}}catch(r){p(r.message||"Save failed","error"),s&&(s.disabled=!1);return}z(),Be()};window.togglePromo=async function(e,t){const{error:a}=await c.from("promotions").update({is_active:t}).eq("id",e);if(a){p(a.message,"error");return}p(t?"Ad activated":"Ad deactivated"),Be()};window.moveAd=async function(e,t){try{const{data:a,error:i}=await c.from("promotions").select("id,sort_order").order("sort_order",{ascending:!0}).order("created_at",{ascending:!1});if(i)throw i;const o=a||[],s=o.findIndex(u=>u.id===e),r=s+t;if(s<0||r<0||r>=o.length){p("Already at the edge","info");return}const l=o[s],d=o[r];await c.from("promotions").update({sort_order:d.sort_order}).eq("id",l.id),await c.from("promotions").update({sort_order:l.sort_order}).eq("id",d.id),p("Order updated")}catch(a){p(a.message||"Reorder failed","error")}Be()};window.deletePromo=async function(e){if(confirm("Delete this ad? This cannot be undone.")){try{const{data:t}=await c.from("promotions").select("image_url,video_url,poster_url").eq("id",e).maybeSingle();if(t){const i=[t.image_url,t.video_url,t.poster_url].filter(Boolean).map(o=>{const s=/\/object\/public\/advertisements\/(.+)$/.exec(o);return s?decodeURIComponent(s[1]):null}).filter(Boolean);if(i.length)try{await c.storage.from("advertisements").remove(i)}catch{}}const{error:a}=await c.from("promotions").delete().eq("id",e);if(a)throw a;p("Ad deleted")}catch(t){p(t.message||"Delete failed","error")}Be()}};async function Be(){const e=document.getElementById("content");try{const{data:t}=await c.from("promotions").select("*").order("sort_order",{ascending:!0}).order("created_at",{ascending:!1}),a=t||[];e.innerHTML=`
      <div class="space-y-4 fade-in">
        <div class="flex items-center gap-3 flex-wrap">
          <div class="flex-1 min-w-0">
            <h2 class="text-xl font-black text-white">Advertisement Manager</h2>
            <p class="text-xs text-gray-500 mt-0.5">Create professional showcase ads that appear on the homepage â€” with labels, media and product links.</p>
          </div>
          <button onclick="showAddAdModal()" class="btn-press flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition">
            <i data-lucide="plus" class="w-4 h-4"></i> Add Advertisement
          </button>
        </div>
        <div class="grid gap-3">
          ${a.length===0?ge("megaphone","No Ads","Create your first showcase ad â€” add a title, image or video, label, and optional product link.",'<button onclick="showAddAdModal()" class="btn-press flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"><i data-lucide="plus" class="w-4 h-4"></i> Add Advertisement</button>'):a.map((i,o)=>`
              <div class="glass-soft border border-blue-500/15 rounded-xl p-4 flex items-center gap-4">
                ${Bs(i)}
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <p class="text-sm font-black text-white truncate">${n(i.title||i.name)}</p>
                    ${Is(i.ad_label||"Featured")}
                  </div>
                  <p class="text-xs text-gray-400 mt-0.5 line-clamp-1">${n(i.description||"")}</p>
                  <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${i.is_active?"bg-emerald-500/10 text-emerald-400 border-emerald-500/20":"bg-gray-500/10 text-gray-400 border-gray-500/20"}">${i.is_active?"Active":"Inactive"}</span>
                    ${Ts(i)}
                    <span class="text-[10px] text-gray-500">${Z(i.start_date)}${i.start_date?" â†’ ":""}${Z(i.end_date)}</span>
                  </div>
                </div>
                <div class="flex gap-1 shrink-0 flex-wrap justify-end">
                  <button onclick="moveAd('${i.id}',-1)" class="btn-press p-1.5 text-gray-400 hover:text-white rounded-lg transition" title="Move up"><i data-lucide="chevron-up" class="w-4 h-4"></i></button>
                  <button onclick="moveAd('${i.id}',1)" class="btn-press p-1.5 text-gray-400 hover:text-white rounded-lg transition" title="Move down"><i data-lucide="chevron-down" class="w-4 h-4"></i></button>
                  <button onclick="togglePromo('${i.id}',${i.is_active?"false":"true"})" class="btn-press p-1.5 ${i.is_active?"text-amber-400":"text-emerald-400"} rounded-lg transition" title="${i.is_active?"Deactivate":"Activate"}"><i data-lucide="${i.is_active?"eye-off":"eye"}" class="w-4 h-4"></i></button>
                  <button onclick="showEditAdModal('${i.id}')" class="btn-press p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition" title="Edit"><i data-lucide="pencil" class="w-4 h-4"></i></button>
                  <button onclick="deletePromo('${i.id}')" class="btn-press p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                </div>
              </div>`).join("")}
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.renderAds=Be;async function Ms(){const e=document.getElementById("content");try{const[{data:t},a]=await Promise.all([c.from("site_settings").select("*").limit(1).maybeSingle(),Ds()]),i=t||{},o=new Set(Array.isArray(i.live_promo_product_ids)?i.live_promo_product_ids:[]),s=a.length?`
        <div class="mt-4">
          <label class="lbl">Which products appear in the Live Promotions (Featured Product Alerts)?</label>
          <p class="text-[11px] text-gray-400 mb-2">Leave all unchecked to let the store pick real products automatically.</p>
          <input id="promo-picker-search" type="search" class="input-field mb-2" placeholder="Search products to chooseâ€¦" oninput="filterPromoPicker(this.value)">
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1.5 max-h-72 overflow-y-auto pr-1" id="promo-picker-list">
            ${a.map(r=>{const l=r.property_id||r.id,d=o.has(l)?"checked":"";return`<label class="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2 cursor-pointer hover:border-blue-400/40 transition" data-promo-search="${n((r.title||r.name||"")+" "+(r.category||""))}">
                <input type="checkbox" name="live_promo_product_ids" value="${n(l)}" ${d} class="accent-blue-500 w-4 h-4">
                <span class="min-w-0"><span class="block text-xs font-bold text-white truncate">${n(r.title||r.name||l)}</span><span class="block text-[10px] text-gray-400">${n(r.category||r.listing_type||"")} Â· ${n(l)}</span></span>
              </label>`}).join("")}
          </div>
          <div class="flex gap-2 mt-2">
            <button type="button" onclick="selectAllPromoPicks()" class="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition">Select all</button>
            <button type="button" onclick="clearAllPromoPicks()" class="text-[11px] font-bold text-gray-400 hover:text-gray-200 transition">Clear all</button>
          </div>
        </div>`:"";e.innerHTML=`
      <div class="space-y-6 fade-in">
        <h2 class="text-xl font-black text-white">Website Content Manager</h2>
        <form id="content-form" onsubmit="saveContent(event)" class="space-y-5">
          ${[{section:"Site Identity",fields:[{key:"site_name",label:"Site Name",type:"text",placeholder:"Weverse Online Shop"},{key:"site_tagline",label:"Tagline / Slogan",type:"text",placeholder:"Premium International Commerce"},{key:"site_description",label:"Site Description (SEO)",type:"textarea",placeholder:"Your trusted global shopâ€¦"}]},{section:"Contact Information",fields:[{key:"contact_email",label:"Contact Email",type:"email",placeholder:"support@example.com"},{key:"contact_phone",label:"Contact Phone",type:"tel",placeholder:"+1 234 567 8900"},{key:"contact_address",label:"Business Address",type:"textarea",placeholder:"123 Main St, City, Country"},{key:"whatsapp_number",label:"WhatsApp Number",type:"tel",placeholder:"+1 234 567 8900"}]},{section:"Hero Section",fields:[{key:"hero_headline",label:"Hero Headline",type:"text",placeholder:"Weverse Online Shop"},{key:"hero_subtext",label:"Hero Subtext",type:"textarea",placeholder:"Shop premium productsâ€¦"},{key:"hero_cta_text",label:"CTA Button Text",type:"text",placeholder:"Shop Now"}]},{section:"Social Media",fields:[{key:"facebook_url",label:"Facebook URL",type:"url",placeholder:"https://facebook.com/â€¦"},{key:"instagram_url",label:"Instagram URL",type:"url",placeholder:"https://instagram.com/â€¦"},{key:"twitter_url",label:"Twitter / X URL",type:"url",placeholder:"https://twitter.com/â€¦"},{key:"youtube_url",label:"YouTube URL",type:"url",placeholder:"https://youtube.com/â€¦"},{key:"tiktok_url",label:"TikTok URL",type:"url",placeholder:"https://tiktok.com/â€¦"}]},{section:"Mobile App Promotion Banner",fields:[{key:"app_banner_enabled",label:"Show the App Promotion banner at the bottom of every page",type:"checkbox"},{key:"app_banner_headline",label:"Banner Headline",type:"text",placeholder:"Discover More with the Weverse Online Shop App"},{key:"app_play_store_url",label:"Google Play Store URL (real app listing â€” leave empty while unpublished)",type:"url",placeholder:"https://play.google.com/store/apps/details?id=â€¦"}]},{section:"Live Product Promotions (Featured Product Alerts)",fields:[{key:"live_promo_enabled",label:"Show Live Product Promotions (small alerts at the bottom corner)",type:"checkbox"},{key:"live_promo_first_delay_seconds",label:"First alert after (seconds)",type:"number",placeholder:"12"},{key:"live_promo_interval_seconds",label:"Delay between alerts (seconds)",type:"number",placeholder:"60"}],extra:s}].map(r=>`
            <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
              <h3 class="text-sm font-black text-white mb-4">${r.section}</h3>
              <div class="form-grid form-grid-2">
                ${r.fields.map(l=>`
                  <div ${l.type==="textarea"||l.type==="checkbox"?'class="sm:col-span-2"':""}>
                    ${l.type==="checkbox"?`<label class="flex items-center gap-2.5 cursor-pointer"><input type="checkbox" name="${l.key}" class="accent-blue-500 w-4 h-4" ${i[l.key]?"checked":""}><span class="text-sm text-gray-300">${l.label}</span></label>`:l.type==="textarea"?`<label class="lbl">${l.label}</label><textarea class="input-field" name="${l.key}" placeholder="${n(l.placeholder)}" rows="2">${n(i[l.key]||"")}</textarea>`:`<label class="lbl">${l.label}</label><input type="${l.type}" class="input-field" name="${l.key}" value="${n(i[l.key]||"")}" placeholder="${n(l.placeholder||"")}">`}
                  </div>`).join("")}
              </div>
              ${r.extra||""}
            </div>`).join("")}
          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm transition">ðŸ’¾ Save Content Settings</button>
        </form>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}async function Ds(){const e=new Set,t=[],a=i=>{for(const o of i||[]){const s=o&&(o.property_id||o.id);s&&!e.has(s)&&(e.add(s),t.push(o))}};try{const{data:i}=await c.from("showroom_listings").select("property_id,title,name,category,listing_type,images,is_active").order("created_at",{ascending:!1}).limit(500);a(i)}catch{}return a(Kt()),a(J),a(Ea),a(Ca),a(Ia),a(Ta),t.slice(0,250)}window.filterPromoPicker=function(e){const t=document.getElementById("promo-picker-list");if(!t)return;const a=(e||"").trim().toLowerCase();t.querySelectorAll("[data-promo-search]").forEach(i=>{i.style.display=!a||i.dataset.promoSearch.toLowerCase().includes(a)?"":"none"})};window.selectAllPromoPicks=function(){document.querySelectorAll('#promo-picker-list input[name="live_promo_product_ids"]').forEach(e=>{e.checked=!0})};window.clearAllPromoPicks=function(){document.querySelectorAll('#promo-picker-list input[name="live_promo_product_ids"]').forEach(e=>{e.checked=!1})};window.saveContent=async function(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries()),i=Array.from(new Set(t.getAll("live_promo_product_ids").map(s=>String(s).trim()).filter(Boolean)));i.length?a.live_promo_product_ids=i:a.live_promo_product_ids=[];const{error:o}=await c.from("site_settings").upsert({id:1,...a});if(o){p(o.message,"error");return}p("Content settings saved!")};const pa=[{key:"hero_videos",custom:!0,title:"HERO VIDEO BANNER (ROTATING)",desc:"Upload your own promotional videos (MP4 & WebM) to the top homepage banner. Each saved slide becomes its own full-width hero with its title, subtitle and CTA over a soft dark overlay so the text always stays readable. Add one video, one poster, or many rotating slides. If no video is added here, the single promo banner and the built-in brand banner below are shown instead as fallbacks.",accent:"from-indigo-400 to-violet-500"},{key:"banner",title:"ANDROID APP BANNER",desc:"The mobile-app promotion banner shown at the bottom of every page. Editing these words never changes the banner design, phone image, logo or buttons.",accent:"from-cyan-400 to-blue-500",fields:[{key:"app_banner_title",label:"App Banner Title",type:"text"},{key:"app_banner_description",label:"App Banner Description",type:"textarea"},{key:"app_banner_button_text",label:"App Banner Button Text",type:"text"},{key:"app_banner_secondary_text",label:"App Banner Secondary Text",type:"text"}]},{key:"bottom",title:"BOTTOM / END-OF-PAGE SECTION",desc:"The final professional closing area of the website â€” thank-you message, customer support, footer links and copyright. The polished design stays; only these words change.",accent:"from-emerald-400 to-cyan-500",fields:[{key:"bottom_heading",label:"Bottom Section Heading",type:"text"},{key:"bottom_main_message",label:"Main Bottom Message",type:"textarea"},{key:"bottom_closing_message",label:"Closing Message",type:"text"},{key:"bottom_support_heading",label:"Customer Support Heading",type:"text"},{key:"bottom_support_description",label:"Customer Support Description",type:"textarea"},{key:"bottom_support_button_text",label:"Support Button Text",type:"text"},{key:"bottom_footer_text",label:"Footer Section Text",type:"text"},{key:"bottom_footer_closing",label:"Footer Closing Message",type:"text"},{key:"bottom_copyright",label:"Copyright Text (empty = automatic â€œÂ© year Brandâ€ line)",type:"text"}]},{key:"promo_banner",title:"HOME PAGE PROMO BANNER",desc:"The main rotating banner at the top of the homepage. Upload your own image or video and write your own words â€” the clean design stays. If empty, the built-in image banners rotate.",accent:"from-fuchsia-400 to-purple-500",fields:[{key:"promo_banner_enabled",label:"Show my promo banner",type:"checkbox"},{key:"promo_banner_image",label:"Banner Image",type:"media",kind:"image"},{key:"promo_banner_video",label:"Banner Video (plays if no image)",type:"media",kind:"video"},{key:"promo_banner_title",label:"Banner Title",type:"text"},{key:"promo_banner_subtitle",label:"Banner Subtitle",type:"text"},{key:"promo_banner_button_text",label:"Button Text",type:"text"},{key:"promo_banner_button_link",label:"Button Link",type:"text"}]},{key:"video_ad",title:"HOME PAGE VIDEO ADVERTISEMENT",desc:"A separate video card below the promo banner. Upload your own video (and optional poster image) and write your own words. It plays muted with play/pause and a progress bar.",accent:"from-rose-400 to-orange-500",fields:[{key:"video_ad_enabled",label:"Show the video advertisement",type:"checkbox"},{key:"video_ad_video_url",label:"Video File",type:"media",kind:"video"},{key:"video_ad_poster_url",label:"Poster Image (shown before play)",type:"media",kind:"image"},{key:"video_ad_title",label:"Video Title",type:"text"},{key:"video_ad_subtitle",label:"Video Subtitle",type:"text"},{key:"video_ad_button_text",label:"Button Text",type:"text"},{key:"video_ad_button_link",label:"Button Link",type:"text"}]}];function vi(e,t){const a=e.kind==="image",i=t||"",o=a?"image":"video",s="text-fuchsia-300",r=!!i;return`<div id="slot-${e.key}">
      ${r?`<div class="relative group w-full h-28 rounded-xl overflow-hidden bg-gray-900 border border-fuchsia-500/15 flex items-center justify-center">
             ${a?`<img src="${n(i)}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:`<video src="${n(i)}" class="w-full h-full object-cover" muted playsinline preload="metadata"></video>`}
             <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
               <button type="button" onclick="triggerContentMediaUpload('${e.key}')" class="text-xs font-bold text-white bg-fuchsia-600 px-3 py-1.5 rounded-lg">Replace</button>
               <button type="button" onclick="clearContentMedia('${e.key}')" class="text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-lg">Remove</button>
             </div>
           </div>`:`<button type="button" onclick="triggerContentMediaUpload('${e.key}')" class="w-full h-28 rounded-xl border-2 border-dashed border-fuchsia-500/25 hover:border-fuchsia-500/50 flex flex-col items-center justify-center gap-1.5 transition">
             <i data-lucide="${o}" class="w-6 h-6 ${s}"></i>
             <p class="text-[10px] text-gray-500">Upload ${a?"Image":"Video"}</p>
           </button>`}
      <input type="file" id="file-${e.key}" class="hidden" accept="${a?"image/*":"video/*"}" onchange="handleContentMediaUpload(event,'${e.key}')">
      <input type="hidden" name="${e.key}" id="val-${e.key}" value="${n(i)}">
      <div class="flex gap-2 mt-1.5">
        <input class="input-field text-xs flex-1" id="url-${e.key}" value="${n(i)}" placeholder="Or paste ${a?"image":"video"} URL" oninput="document.getElementById('val-${e.key}').value=this.value">
      </div>
    </div>`}window.triggerContentMediaUpload=function(e){document.getElementById("file-"+e)?.click()};window.clearContentMedia=function(e){const t=document.getElementById("val-"+e),a=document.getElementById("url-"+e);t&&(t.value=""),a&&(a.value=""),p("Cleared. Save to apply.","info"),wi()};window.handleContentMediaUpload=async function(e,t){const a=e.target.files?.[0];if(a){a.type.startsWith("video/"),p(`Uploading ${a.name}â€¦`,"info");try{const{data:{session:i}}=await c.auth.getSession();if(!i){p("Sign in to upload media","error");return}const o=(a.name.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,""),s=`content/${t}-${Date.now()}.${o}`,{error:r}=await c.storage.from("product-images").upload(s,a,{contentType:a.type,upsert:!1});if(r){p("Upload failed: "+r.message,"error");return}const{data:l}=c.storage.from("product-images").getPublicUrl(s),d=l.publicUrl,u=document.getElementById("val-"+t),b=document.getElementById("url-"+t);u&&(u.value=d),b&&(b.value=d);const g=document.getElementById("slot-"+t);if(g){const x=pa.flatMap(f=>f.fields||[]).find(f=>f.key===t);x&&(g.outerHTML=vi(x,d))}p("âœ“ Uploaded â€” save to apply","success")}catch{p("Upload failed","error")}}};const js=["SHOP NOW","EXPLORE DEALS","VIEW PRODUCTS","DISCOVER MORE","SEE OFFERS","SHOP THE LOOK"];window._heroVideoDraft=[];function ee(){return Array.isArray(window._heroVideoDraft)||(window._heroVideoDraft=[]),window._heroVideoDraft}function Ge(){const e=document.getElementById("hs-json");e&&(e.value=JSON.stringify(ee()))}function _e(){Ge();const e=document.getElementById("hero-videos-manager");e&&(e.innerHTML=xi(ee()),window.lucide&&lucide.createIcons())}function Rs(e,t){const a=String(e&&e.video||"").trim(),i=String(e&&e.poster||"").trim(),o=a&&Sa(a)||i&&Sa(i)?'<p class="mt-2 text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">âš  Temporary preview only â€” the upload FAILED, this will NOT be saved. Re-upload a smaller MP4/WebM.</p>':"";return`
    <div>
      <div class="w-full overflow-hidden rounded-xl bg-gray-950 border border-indigo-500/20 flex items-center justify-center">${a?`<video src="${n(a)}" ${i?`poster="${n(i)}"`:""} class="w-full h-40 object-cover" muted controls preload="metadata"></video>`:i?`<img src="${n(i)}" class="w-full h-40 object-cover" onerror="this.style.display='none'">`:'<div class="w-full h-40 flex items-center justify-center text-[11px] text-gray-500">No media yet â€” upload a video (MP4/WebM) or a poster below</div>'}</div>
      ${o}
      <div class="flex flex-wrap gap-1.5 mt-2 justify-end">
        <button type="button" onclick="heroVideoUpload(${t},'video')" class="px-3 py-1.5 rounded-lg ${a?"bg-white/10 text-gray-200 border border-white/10":"bg-indigo-600 text-white"} text-[10px] font-bold transition">${a?"Replace Video":"Upload Video"}</button>
        ${a?`<button type="button" onclick="heroVideoRemoveMedia(${t},'video')" class="px-3 py-1.5 rounded-lg bg-red-600/80 text-white text-[10px] font-bold">Remove Video</button>`:""}
        <button type="button" onclick="heroVideoUpload(${t},'poster')" class="px-3 py-1.5 rounded-lg bg-white/10 text-gray-200 text-[10px] font-bold border border-white/10 transition">${i?"Replace Poster":"Add Poster"}</button>
        ${i?`<button type="button" onclick="heroVideoRemoveMedia(${t},'poster')" class="px-3 py-1.5 rounded-lg bg-red-600/80 text-white text-[10px] font-bold">Remove Poster</button>`:""}
      </div>
    </div>`}function xi(e){return(e||[]).map((t,a)=>{const i=String(t&&t.buttonText||"SHOP NOW"),o=js.map(s=>`<button type="button" onclick="heroVideoPreset(${a},'${s}')" class="px-2.5 py-1 rounded-full text-[9px] font-black ${i===s?"bg-indigo-600 text-white":"bg-white/5 text-gray-400"} border ${i===s?"border-indigo-500":"border-white/10"} transition">${s}</button>`).join("");return`
    <div class="rounded-xl border border-indigo-500/25 bg-violet-500/8 p-4 space-y-3">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <p class="text-xs font-black text-white flex items-center gap-2"><i data-lucide="video" class="w-4 h-4 text-indigo-400"></i> Slide ${a+1}</p>
        <div class="flex items-center gap-1.5">
          <button type="button" onclick="heroVideoToggle(${a})" class="text-[10px] font-bold px-2.5 py-1.5 rounded-lg ${t&&t.enabled===!1?"bg-gray-700 text-gray-400":"bg-emerald-600 text-white"} transition">${t&&t.enabled===!1?"Disabled":"Enabled"}</button>
          <button type="button" onclick="heroVideoMove(${a},-1)" class="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10" title="Move up"><i data-lucide="arrow-up" class="w-3.5 h-3.5 text-gray-300"></i></button>
          <button type="button" onclick="heroVideoMove(${a},1)" class="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10" title="Move down"><i data-lucide="arrow-down" class="w-3.5 h-3.5 text-gray-300"></i></button>
          <button type="button" onclick="heroVideoDelete(${a})" class="px-2 py-1 rounded-lg bg-red-600/80 hover:bg-red-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5 text-white"></i></button>
        </div>
      </div>
      ${Rs(t,a)}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="lbl">Title</label>
          <input type="text" value="${n(t.title||"")}" class="input-field w-full" placeholder="e.g. Season Sale is Live" oninput="heroVideoField(${a},'title',this.value)">
        </div>
        <div>
          <label class="lbl">Subtitle</label>
          <input type="text" value="${n(t.subtitle||"")}" class="input-field w-full" placeholder="e.g. Up to 50% off top brands" oninput="heroVideoField(${a},'subtitle',this.value)">
        </div>
      </div>
      <div>
        <label class="lbl">Button</label>
        <div class="flex flex-wrap gap-1.5">${o}</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <input type="text" value="${n(i)}" class="input-field w-full" placeholder="SHOP NOW" oninput="heroVideoField(${a},'buttonText',this.value)">
          <input type="text" value="${n(t.buttonLink||"/#showroom-directory")}" class="input-field w-full" placeholder="/#showroom-directory" oninput="heroVideoField(${a},'buttonLink',this.value)">
        </div>
      </div>
    </div>`}).join("")}window.heroVideoUpload=function(e,t){const a=document.createElement("input");a.type="file",a.accept=t==="video"?"video/mp4,video/webm,.mp4,.webm":"image/*",a.onchange=()=>{const i=a.files&&a.files[0];i&&qs(e,t,i)},a.click()};window.heroVideoField=function(e,t,a){const i=ee();i[e]&&(i[e][t]=a,Ge())};window.heroVideoPreset=function(e,t){const a=ee();a[e]&&(a[e].buttonText=t,_e())};window.heroVideoToggle=function(e){const t=ee();t[e]&&(t[e].enabled=t[e].enabled===!1,_e())};window.heroVideoMove=function(e,t){const a=ee(),i=e+t;i<0||i>=a.length||([a[e],a[i]]=[a[i],a[e]],_e())};window.heroVideoDelete=function(e){const t=ee();e<0||e>=t.length||confirm("Delete this hero video slide?")&&(t.splice(e,1),_e())};window.heroVideoRemoveMedia=function(e,t){const a=ee();a[e]&&(t==="video"?a[e].video="":t==="poster"&&(a[e].poster=""),_e())};window.addHeroVideoSlide=function(){ee().push({id:"hv"+Date.now()+Math.floor(Math.random()*999),enabled:!0,video:"",poster:"",title:"",subtitle:"",buttonText:"SHOP NOW",buttonLink:"/#showroom-directory"}),_e(),p("New slide added â€” upload a video and press Save to show it.","info")};async function Fs(e,t){try{const{data:{session:a}}=await c.auth.getSession();if(!a)return{url:URL.createObjectURL(e),persisted:!1,error:"You are signed out â€” sign in again, then re-upload."};const i=(e.name.split(".").pop()||(t==="video"?"mp4":"jpg")).toLowerCase().replace(/[^a-z0-9]/g,""),o=`hero/${t}/${Date.now()}-${Math.random().toString(36).slice(2)}.${i}`,{error:s}=await c.storage.from("product-images").upload(o,e,{contentType:e.type,cacheControl:"3600",upsert:!0});if(s)return{url:URL.createObjectURL(e),persisted:!1,error:s.message};const{data:r}=c.storage.from("product-images").getPublicUrl(o),l=r&&r.publicUrl;return l?{url:l,persisted:!0,error:null}:{url:URL.createObjectURL(e),persisted:!1,error:"Storage did not return a public URL."}}catch(a){return{url:URL.createObjectURL(e),persisted:!1,error:String(a&&a.message||a)}}}function Sa(e){return/^blob:/i.test(String(e||""))}async function qs(e,t,a){const i=ee();if(!a||!i[e])return;if(t==="video"){if(!/video\/(mp4|webm)|\.(mp4|webm)$/i.test(a.type+" "+a.name)){p("Please choose an MP4 or WebM video file.","error");return}}else if(!a.type.startsWith("image/")){p("Please choose an image for the poster.","error");return}p("â³ Uploading "+(t==="video"?"video":"poster")+"â€¦","info");const o=await Fs(a,t);t==="video"?i[e].video=o.url:i[e].poster=o.url,_e(),o.persisted?p("âœ“ "+(t==="video"?"Video":"Poster")+" uploaded â€” press Save & Publish Hero Banner to go live.","success"):p("âš  UPLOAD FAILED: "+(o.error||"unknown reason")+" â€” this preview is TEMPORARY and will NOT be saved. Try a smaller MP4/WebM (keep videos under ~50 MB), then re-upload.","error")}function Us(e){const t=Array.isArray(e)?e.map(i=>({...i})):[];return window._heroVideoDraft=t,Ge(),`
    <div class="space-y-3">
      <div id="hero-videos-manager" class="space-y-3">${t.length?"":`
    <div class="rounded-xl border-2 border-dashed border-indigo-500/30 bg-white/5 p-6 text-center">
      <i data-lucide="video" class="w-8 h-8 text-indigo-400 mx-auto"></i>
      <p class="text-xs text-gray-400 mt-2 font-bold">No hero videos yet</p>
      <p class="text-[11px] text-gray-500 mt-1">Add your first promotional video slide to turn the homepage banner into an auto-playing video hero. Until then, the built-in brand banner and any single promo banner below are used.</p>
    </div>`}${xi(t)}</div>
      <button type="button" onclick="heroVideoSavePublish(this)" class="btn-press w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-black rounded-xl transition flex items-center justify-center gap-2">
        <i data-lucide="rocket" class="w-4 h-4"></i> Save &amp; Publish Hero Banner
      </button>
      <p class="text-[10px] text-gray-500 text-center">One video is enough â€” no minimum. Your banner goes live as soon as you press this button.</p>
      <button type="button" onclick="addHeroVideoSlide()" class="btn-press w-full px-4 py-3 border-2 border-dashed border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2">
        <i data-lucide="plus" class="w-4 h-4"></i> Add Another Hero Video Slide
      </button>
    </div>`}window.heroVideoSavePublish=async function(e){const t=d=>/^blob:/i.test(String(d||"")),a=ee().filter(d=>d&&(d.video||d.poster||d.title||d.subtitle));if(!a.length){p("Add at least one video slide before publishing.","error");return}a.forEach(d=>{d.poster&&t(d.poster)&&(d.poster="")});const i=a.filter(d=>d.video&&t(d.video)),o=a.filter(d=>d.video&&!t(d.video));if(i.length&&!o.length){p(`Upload FAILED for your video${i.length>1?"s":""} â€” temporary previews cannot go live. Re-upload a smaller MP4/WebM (under ~50 MB), then press this button again.`,"error");return}if(i.length&&!confirm(`${i.length} slide${i.length>1?"s":""} had a FAILED upload and will be LEFT OUT. Publish the remaining ${o.length} slide${o.length===1?"":"s"} now?`))return;const s=o,r=s.filter(d=>d.video);if(!s.length){p("Please upload a video in at least one slide first.","error");return}const l=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML="â³ Publishingâ€¦");try{Ge();const{data:d}=await c.from("site_settings").select("id").limit(1).maybeSingle();let u;if(d?.id?{error:u}=await c.from("site_settings").update({hero_video_slides:s}).eq("id",d.id):{error:u}=await c.from("site_settings").insert({id:crypto.randomUUID(),hero_video_slides:s}),u)throw new Error(u.message);Ba(),p("âœ“ Hero video banner published! "+r.length+(r.length===1?" video is":" videos are")+" now live on your homepage.","success")}catch(d){p(d.message||"Could not publish the hero banner. Please try again.","error")}finally{e&&(e.disabled=!1,e.innerHTML=l,window.lucide&&lucide.createIcons())}};async function wi(){const e=document.getElementById("content");try{const{data:t}=await c.from("site_settings").select("*").limit(1).maybeSingle(),a={...Ui,...t||{}};e.innerHTML=`
      <div class="space-y-6 fade-in">
        <div>
          <h2 class="text-xl font-black text-white">Content Settings</h2>
          <p class="text-xs text-gray-400 mt-1">Edit the wording of the two shared sections below. Save once and every page updates automatically â€” no code needed. Your products, prices, reviews, orders and design are never touched.</p>
        </div>
        <form id="content-settings-form" onsubmit="saveContentSettings(event)" class="space-y-5">
          ${pa.map(i=>`
            <div class="glass-soft border border-white/10 rounded-2xl p-5">
              <div class="flex items-center gap-2.5 mb-1">
                <span class="w-2 h-2 rounded-full bg-gradient-to-r ${i.accent}"></span>
                <h3 class="text-sm font-black text-white tracking-wide">${i.title}</h3>
              </div>
              <p class="text-[11px] text-gray-400 mb-4">${i.desc}</p>
              ${i.key==="hero_videos"?Us(a.hero_video_slides||[]):`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${i.fields.map(o=>`
                  <div class="${o.type==="textarea"||o.type==="media"?"sm:col-span-2":""}">
                    ${o.type==="checkbox"?`<label class="flex items-center gap-2.5 cursor-pointer select-none py-2">
                           <input id="cs-${o.key}" type="checkbox" name="${o.key}" ${a[o.key]?"checked":""} class="w-4 h-4 accent-blue-500 rounded">
                           <span class="text-sm font-bold text-gray-200">${o.label}</span>
                         </label>`:`<label class="lbl" for="cs-${o.key}">${o.label}</label>`}
                    ${o.type==="textarea"?`<textarea id="cs-${o.key}" name="${o.key}" rows="3" class="input-field w-full" placeholder="Enter the current wordingâ€¦">${n(a[o.key]||"")}</textarea>`:o.type==="media"?vi(o,a[o.key]||""):o.type==="checkbox"?"":`<input id="cs-${o.key}" type="text" name="${o.key}" value="${n(a[o.key]||"")}" class="input-field w-full" placeholder="Enter the current wordingâ€¦">`}
                    ${o.type==="text"||o.type==="textarea"?`<p class="text-[10px] text-gray-500 mt-1">Current: ${n((a[o.key]||"").slice(0,80))}${(a[o.key]||"").length>80?"â€¦":""}</p>`:""}
                  </div>`).join("")}
              </div>`}
            </div>`).join("")}
          <input type="hidden" id="hs-json" name="hero_video_slides" value="">
          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-3 rounded-xl text-sm transition">ðŸ’¾ Save Content</button>
        </form>
      </div>`,Ge(),window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.saveContentSettings=async function(e){e.preventDefault();const t=new FormData(e.target),a={};for(const[o,s]of t.entries())a[o]=s;for(const o of pa)if(o.fields)for(const s of o.fields)s.type==="checkbox"&&!(s.key in a)?a[s.key]=!1:s.type==="checkbox"&&(a[s.key]=!0);let i=[];try{const o=t.get("hero_video_slides");if(String(o||"").trim()){const s=JSON.parse(o);Array.isArray(s)&&(i=s)}}catch{i=[]}a.hero_video_slides=i;try{const{data:o}=await c.from("site_settings").select("id").limit(1).maybeSingle();let s;if(o?.id?{error:s}=await c.from("site_settings").update(a).eq("id",o.id):{error:s}=await c.from("site_settings").insert({id:crypto.randomUUID(),...a}),s)throw new Error(s.message);Ba(),p("Content updated â€” the banners now use your new words and uploads.","success")}catch(o){p(o.message||"Could not save content. Please try again.","error")}};async function Ns(){const e=document.getElementById("content");try{const[t,a,i]=await Promise.all([c.from("payment_receipts").select("amount,currency,status,created_at").order("created_at",{ascending:!1}).limit(500),c.from("showroom_listings").select("id,listing_type,category,is_active",{count:"exact"}),c.from("profiles").select("user_id,created_at",{count:"exact"})]),o=t.data||[],s=o.filter($=>["approved","payment_approved","delivered"].includes($.status)).reduce(($,V)=>$+(parseFloat(V.amount)||0),0),r=o.length>0?(o.filter($=>$.status!=="cancelled").length/o.length*100).toFixed(1):0,l={};(a.data||[]).forEach($=>{l[$.category]=(l[$.category]||0)+1});const d=Object.entries(l).sort(($,V)=>V[1]-$[1]).slice(0,8),u=$=>new Date($.getTime()-$.getTimezoneOffset()*6e4).toISOString().slice(0,10),b=u(new Date),g=u(new Date(Date.now()-6*864e5)),{data:x,error:f}=await c.from("visitor_analytics").select("visit_date,page_views,device_type").order("visit_date",{ascending:!1}).limit(1e3),m=x||[],h=$=>$.reduce((V,$e)=>V+(parseInt($e.page_views,10)||1),0),E=h(m.filter($=>$.visit_date===b)),S=h(m.filter($=>$.visit_date>=g)),C=h(m),_=m.length>0?Math.round(m.filter($=>$.device_type==="mobile").length/m.length*100):0,k=[];for(let $=13;$>=0;$--){const V=u(new Date(Date.now()-$*864e5));k.push({d:V,n:h(m.filter($e=>$e.visit_date===V))})}const ke=Math.max(1,...k.map($=>$.n));e.innerHTML=`
      <div class="space-y-6 fade-in">
        <h2 class="text-xl font-black text-white">Analytics</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          ${R("Total Revenue",`$${s.toLocaleString("en-US",{maximumFractionDigits:0})}`,"dollar-sign","emerald")}
          ${R("Total Orders",o.length,"shopping-bag","blue")}
          ${R("Customers",i.count||0,"users","violet")}
          ${R("Conversion Rate",r+"%","trending-up","amber")}
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          ${R("Visits Today",E,"eye","blue")}
          ${R("Visits (7 Days)",S,"users","violet")}
          ${R("Total Visits",C,"globe","amber")}
          ${R("Mobile Share",_+"%","smartphone","emerald")}
        </div>
        ${f?`<p class="text-xs text-red-400">${n(f.message)}</p>`:""}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="bar-chart-3" class="w-4 h-4 text-blue-400"></i> Revenue (Last 6 Months)</h3>
            <canvas id="analytics-chart" height="220"></canvas>
          </div>
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="activity" class="w-4 h-4 text-emerald-400"></i> Public Visitors (Last 14 Days)</h3>
            <p class="text-[11px] text-gray-500 mb-3">One row per public page load — collected invisibly on product, hub, and home pages; shown only here.</p>
            <div class="flex items-end gap-1 h-32">
              ${k.map($=>`<div class="flex-1 flex flex-col items-center justify-end gap-1"><div class="w-full rounded-t bg-emerald-500/70 hover:bg-emerald-400 transition" style="height:${Math.round($.n/ke*100)+2}px" title="${$.d}: ${$.n} visit(s)"></div><span class="text-[9px] text-gray-500">${$.d.slice(5)}</span></div>`).join("")}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="pie-chart" class="w-4 h-4 text-violet-400"></i> Top Categories by Listings</h3>
            ${d.length===0?'<p class="text-xs text-gray-500 text-center py-8">No data</p>':d.map(([$,V])=>`
              <div class="flex items-center gap-3 py-1.5">
                <span class="text-xs text-gray-300 flex-1 truncate">${n($)}</span>
                <div class="w-24 h-2 bg-blue-500/10 rounded-full overflow-hidden"><div class="h-full bg-blue-500 rounded-full" style="width:${Math.round(V/d[0][1]*100)}%"></div></div>
                <span class="text-xs font-bold text-white w-6 text-right">${V}</span>
              </div>`).join("")}
          </div>
        </div>
      </div>`,window.lucide&&lucide.createIcons(),ci(o)}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}async function Os(){const e=document.getElementById("content"),{data:t}=await c.from("site_settings").select("*").limit(1).maybeSingle(),a=t||{};e.innerHTML=`
    <div class="space-y-5 fade-in">
      <h2 class="text-xl font-black text-white">SEO Manager</h2>
      <a href="/seo-audit" target="_blank" rel="noopener" class="block p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-black text-emerald-300">SEO Audit Dashboard</p>
            <p class="text-xs text-emerald-200/70 mt-1">Live 20-point audit of every product page, duplicate detection, and one-click revive of missing titles.</p>
          </div>
          <span class="text-emerald-300 font-black text-xl">&rarr;</span>
        </div>
      </a>
      <form id="seo-form" onsubmit="saveSeo(event)" class="space-y-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
          <h3 class="text-sm font-black text-white">Homepage SEO</h3>
          <div><label class="lbl">Meta Title</label><input class="input-field" name="meta_title" value="${n(a.meta_title||"")}" placeholder="Weverse Online Shop | Premium International Commerce"></div>
          <div><label class="lbl">Meta Description</label><textarea class="input-field" name="meta_description" rows="2" placeholder="Your trusted global shopâ€¦">${n(a.meta_description||"")}</textarea></div>
          <div><label class="lbl">Meta Keywords (comma separated)</label><input class="input-field" name="meta_keywords" value="${n(a.meta_keywords||"")}" placeholder="global marketplace, online shopping, â€¦"></div>
          <div><label class="lbl">Canonical URL</label><input class="input-field" name="canonical_url" value="${n(a.canonical_url||"")}" placeholder="https://yoursite.com"></div>
          <div><label class="lbl">OG Image URL (Social share image)</label><input class="input-field" name="og_image" value="${n(a.og_image||"")}" placeholder="https://â€¦/og-image.jpg"></div>
          <div><label class="lbl">Google Analytics ID</label><input class="input-field" name="ga_id" value="${n(a.ga_id||"")}" placeholder="G-XXXXXXXXXX"></div>
          <div><label class="lbl">Google Search Console Verification</label><input class="input-field" name="gsc_verify" value="${n(a.gsc_verify||"")}" placeholder="Verification meta tag content"></div>
        </div>
        <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm transition">ðŸ’¾ Save SEO Settings</button>
      </form>
    </div>`,window.lucide&&lucide.createIcons()}window.saveSeo=async function(e){e.preventDefault();const t=Object.fromEntries(new FormData(e.target).entries());await c.from("site_settings").upsert({id:1,...t}),p("SEO settings saved!")};async function Hs(){const e=document.getElementById("content"),{data:t}=await c.from("site_settings").select("*").limit(1).maybeSingle(),a=t||{};e.innerHTML=`
    <div class="space-y-5 fade-in">
      <h2 class="text-xl font-black text-white">Email Settings</h2>
      <div class="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-xs text-blue-300">Email is handled by Supabase Auth's built-in SMTP. Configure SMTP in your Supabase project â†’ Auth â†’ SMTP Settings.</div>
      <form id="email-form" onsubmit="saveEmailSettings(event)" class="space-y-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
          <h3 class="text-sm font-black text-white">Email Notifications</h3>
          ${[{key:"email_order_placed",label:"Order Confirmation Email",desc:"Send confirmation when order is placed"},{key:"email_order_shipped",label:"Shipping Notification",desc:"Notify customer when order is shipped"},{key:"email_order_delivered",label:"Delivery Confirmation",desc:"Confirm when order is delivered"},{key:"email_review_request",label:"Review Request",desc:"Ask for review after delivery"}].map(i=>`
            <div class="flex items-center justify-between p-3 glass-soft border border-blue-500/10 rounded-xl">
              <div><p class="text-xs font-bold text-white">${i.label}</p><p class="text-[11px] text-gray-500">${i.desc}</p></div>
              <label class="toggle-switch"><input type="checkbox" name="${i.key}" ${a[i.key]!==!1?"checked":""}><span class="toggle-slider"></span></label>
            </div>`).join("")}
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
          <h3 class="text-sm font-black text-white">Sender Information</h3>
          <div><label class="lbl">Sender Name</label><input class="input-field" name="email_from_name" value="${n(a.email_from_name||"")}" placeholder="Weverse Online Shop"></div>
          <div><label class="lbl">Reply-To Email</label><input type="email" class="input-field" name="email_reply_to" value="${n(a.email_reply_to||"")}" placeholder="support@example.com"></div>
        </div>
        <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm transition">ðŸ’¾ Save Email Settings</button>
      </form>
    </div>`,window.lucide&&lucide.createIcons()}window.saveEmailSettings=async function(e){e.preventDefault();const t=new FormData(e.target),a={};for(const[i,o]of t.entries())a[i]=o;["email_order_placed","email_order_shipped","email_order_delivered","email_review_request"].forEach(i=>{i in a?a[i]=!0:a[i]=!1}),await c.from("site_settings").upsert({id:1,...a}),p("Email settings saved!")};async function kt(){const e=document.getElementById("content");e&&(e.innerHTML=Ce());try{const[t,a,i]=await Promise.all([c.from("admin_security_logs").select("*").order("created_at",{ascending:!1}).limit(50),c.from("admin_2fa").select("enabled,backup_codes,created_at").eq("user_id",A.user?.id).maybeSingle(),c.auth.mfa.listFactors()]),o=t.data||[],s=a.data||{},r=(i.data?.totp||[])[0],l=!!r&&r.status==="verified",d=(s.backup_codes||[]).filter(u=>!u.used).length;e.innerHTML=`
      <div class="space-y-6 fade-in">
        <h2 class="text-xl font-black text-white">Security</h2>

        <!-- 2FA STATUS BANNER -->
        <div class="p-4 rounded-xl border flex items-center gap-4 ${l?"bg-emerald-500/5 border-emerald-500/20":"bg-amber-500/5 border-amber-500/20"}">
          <div class="w-10 h-10 ${l?"bg-emerald-500/10":"bg-amber-500/10"} rounded-xl flex items-center justify-center shrink-0">
            <i data-lucide="${l?"shield-check":"shield-alert"}" class="w-5 h-5 ${l?"text-emerald-400":"text-amber-400"}"></i>
          </div>
          <div class="flex-1">
            <p class="text-sm font-black ${l?"text-emerald-300":"text-amber-300"}">Two-Factor Authentication is ${l?"ENABLED âœ“":"NOT ENABLED"}</p>
            <p class="text-xs text-gray-400 mt-0.5">${l?`Backup codes available: ${d} Â· Enrolled: ${Z(s.created_at)}`:"Enable 2FA to protect your admin account with an authenticator app."}</p>
          </div>
          ${l?'<button onclick="disable2FA()" class="btn-press flex-shrink-0 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-xl transition">Disable 2FA</button>':'<button onclick="setup2FAFlow()" class="btn-press flex-shrink-0 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-xl transition"><i data-lucide="shield-plus" class="w-3.5 h-3.5 inline mr-1"></i>Enable 2FA</button>'}
        </div>

        <!-- BACKUP CODES (only if 2FA enabled) -->
        ${l?`
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="key" class="w-4 h-4 text-amber-400"></i> Backup Recovery Codes</h3>
            <button onclick="regenerateBackupCodes()" class="btn-press text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-xl transition">Regenerate</button>
          </div>
          <p class="text-xs text-gray-400 mb-3">Save these codes in a safe place. Use them if you lose access to your authenticator app. Each code works only once.</p>
          <div id="backup-codes-display" class="grid grid-cols-2 gap-2">
            ${(s.backup_codes||[]).length===0?'<p class="text-xs text-gray-500 col-span-2 text-center py-4">No backup codes generated. Click Regenerate to create them.</p>':(s.backup_codes||[]).map(u=>`<code class="font-mono text-xs px-3 py-2 ${u.used?"bg-gray-900 text-gray-600 line-through":"bg-blue-500/5 text-blue-300 border border-blue-500/15"} rounded-lg">${typeof u=="object"?u.code:u}</code>`).join("")}
          </div>
        </div>`:""}

        <!-- CHANGE PASSWORD -->
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
          <h3 class="text-sm font-black text-white mb-4 flex items-center gap-2"><i data-lucide="lock" class="w-4 h-4 text-blue-400"></i> Change Password</h3>
          <form id="pw-form" onsubmit="changePassword(event)" class="space-y-3 max-w-sm">
            <div>
              <label class="lbl">Current Password</label>
              <input type="password" class="input-field" id="current-pw" placeholder="Current password" required>
            </div>
            <div>
              <label class="lbl">New Password</label>
              <input type="password" class="input-field" id="new-pw" placeholder="Min 8 characters" minlength="8" required>
              <div id="pw-strength" class="mt-1.5 space-y-1"></div>
            </div>
            <div>
              <label class="lbl">Confirm New Password</label>
              <input type="password" class="input-field" id="confirm-pw" placeholder="Repeat password" required>
            </div>
            <button type="submit" class="btn-press bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded-xl text-sm transition flex items-center gap-2">
              <i data-lucide="check" class="w-4 h-4"></i> Update Password
            </button>
          </form>
        </div>

        <!-- SESSION MANAGEMENT -->
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
          <h3 class="text-sm font-black text-white mb-4 flex items-center gap-2"><i data-lucide="monitor-smartphone" class="w-4 h-4 text-blue-400"></i> Session Management</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 glass-soft border border-blue-500/10 rounded-xl">
              <div>
                <p class="text-xs font-bold text-white">Current Session</p>
                <p class="text-[11px] text-gray-500">${n(navigator.userAgent.slice(0,60))}â€¦</p>
              </div>
              <span class="badge bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</span>
            </div>
            <button onclick="logoutAllDevices()" class="btn-press w-full flex items-center justify-center gap-2 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/15 py-2.5 rounded-xl transition">
              <i data-lucide="log-out" class="w-4 h-4"></i> Sign Out from ALL Devices
            </button>
          </div>
        </div>

        <!-- LOGIN HISTORY -->
        <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-blue-500/10 flex items-center justify-between">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="history" class="w-4 h-4 text-blue-400"></i> Login History</h3>
            <span class="text-xs text-gray-500">Last ${o.length} events</span>
          </div>
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full dt">
              <thead><tr><th>Event</th><th>IP Address</th><th class="hidden sm:table-cell">Device</th><th>Date</th></tr></thead>
              <tbody>
                ${o.length===0?'<tr><td colspan="4" class="text-center text-gray-500 py-8">No security events yet</td></tr>':o.map(u=>{const b=["login_success","login_2fa_success"].includes(u.event_type),g=["login_failed","login_denied","login_backup_code_used"].includes(u.event_type),x=b?"text-emerald-400":g?"text-red-400":"text-gray-300",f={login_success:"Login âœ“",login_failed:"Failed Login âœ—",login_denied:"Access Denied âœ—",login_2fa_success:"2FA Verified âœ“",login_backup_code_used:"Backup Code Used",logout:"Logged Out",logout_all_devices:"Logout All Devices"}[u.event_type]||u.event_type;return`<tr>
                      <td><span class="text-xs font-bold ${x}">${n(f)}</span></td>
                      <td><span class="text-xs font-mono text-gray-300">${n(u.ip_address||"â€”")}</span></td>
                      <td class="hidden sm:table-cell"><span class="text-xs text-gray-500 max-w-[160px] block truncate">${n((u.user_agent||"â€”").slice(0,50))}</span></td>
                      <td><span class="text-xs text-gray-500">${be(u.created_at)}</span></td>
                    </tr>`}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`,document.getElementById("new-pw")?.addEventListener("input",u=>{const b=u.target.value,g=[{label:"8+ characters",ok:b.length>=8},{label:"Uppercase letter",ok:/[A-Z]/.test(b)},{label:"Number",ok:/[0-9]/.test(b)},{label:"Special character",ok:/[^a-zA-Z0-9]/.test(b)}];document.getElementById("pw-strength").innerHTML=g.map(x=>`<div class="flex items-center gap-1.5 text-[10px] ${x.ok?"text-emerald-400":"text-gray-600"}">
          <i data-lucide="${x.ok?"check-circle":"circle"}" class="w-3 h-3"></i>${x.label}</div>`).join(""),window.lucide&&lucide.createIcons()}),window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.changePassword=async function(e){e.preventDefault();const t=document.getElementById("current-pw").value,a=document.getElementById("new-pw").value,i=document.getElementById("confirm-pw").value;if(a!==i){p("Passwords do not match","error");return}if(a.length<8){p("Password must be at least 8 characters","error");return}const{error:o}=await c.auth.signInWithPassword({email:A.user.email,password:t});if(o){p("Current password is incorrect","error");return}const{error:s}=await c.auth.updateUser({password:a});if(s){p(s.message,"error");return}await te(A.user.id,"password_changed"),p("Password updated successfully!"),e.target.reset(),document.getElementById("pw-strength").innerHTML=""};window.setup2FAFlow=async function(){j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white flex items-center gap-2"><i data-lucide="shield-plus" class="w-5 h-5 text-emerald-400"></i> Enable Two-Factor Authentication</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <div id="2fa-setup-content">
          <div class="flex items-center justify-center py-8"><i data-lucide="loader-2" class="w-6 h-6 animate-spin text-blue-400"></i></div>
        </div>
      </div>
    </div>`),window.lucide&&lucide.createIcons();try{const{data:e,error:t}=await c.auth.mfa.enroll({factorType:"totp",friendlyName:"Weverse Admin"});if(t)throw t;const a=e.totp.qr_code,i=e.totp.secret,o=e.id;document.getElementById("2fa-setup-content").innerHTML=`
      <div class="space-y-5">
        <div class="p-3 bg-blue-500/8 border border-blue-500/20 rounded-xl text-xs text-blue-300">
          <strong>Step 1:</strong> Open your authenticator app (Google Authenticator, Authy, or similar).<br>
          <strong>Step 2:</strong> Scan the QR code below or enter the secret manually.<br>
          <strong>Step 3:</strong> Enter the 6-digit code shown in your app.
        </div>
        <div class="flex flex-col items-center gap-4">
          <div class="bg-white p-3 rounded-xl">
            <img src="${n(a)}" alt="QR Code" class="w-44 h-44" onerror="this.closest('div').innerHTML='<p class=&quot;text-xs text-gray-500 w-44 text-center&quot;>QR code unavailable. Use the secret below.</p>'">
          </div>
          <div class="w-full">
            <label class="lbl">Or enter this secret manually</label>
            <div class="flex gap-2">
              <code class="flex-1 input-field font-mono text-xs text-emerald-300 select-all">${n(i)}</code>
              <button onclick="navigator.clipboard.writeText('${n(i)}').then(()=>showToast('Copied!'))" class="btn-press p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition text-blue-400"><i data-lucide="copy" class="w-4 h-4"></i></button>
            </div>
          </div>
        </div>
        <div>
          <label class="lbl">Enter 6-digit code from app *</label>
          <input type="text" id="setup-totp-code" inputmode="numeric" maxlength="6" class="input-field text-center text-xl font-black tracking-[0.5em] py-3" placeholder="000000" autocomplete="one-time-code">
        </div>
        <div id="setup-2fa-error" class="hidden p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs"></div>
        <button onclick="confirm2FAEnrollment('${n(o)}')" class="btn-press w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4"></i> Verify & Enable 2FA
        </button>
      </div>`,window.lucide&&lucide.createIcons(),setTimeout(()=>document.getElementById("setup-totp-code")?.focus(),100),document.getElementById("setup-totp-code")?.addEventListener("input",s=>{s.target.value=s.target.value.replace(/\D/g,"").slice(0,6)})}catch(e){document.getElementById("2fa-setup-content").innerHTML=`<div class="text-red-400 text-sm text-center py-4">${n(e.message)}</div>`}};window.confirm2FAEnrollment=async function(e){const t=document.getElementById("setup-totp-code")?.value?.trim(),a=document.getElementById("setup-2fa-error");if(!t||t.length!==6){a&&(a.textContent="Enter the 6-digit code.",a.classList.remove("hidden"));return}try{const{data:i,error:o}=await c.auth.mfa.challenge({factorId:e});if(o)throw o;const{error:s}=await c.auth.mfa.verify({factorId:e,challengeId:i.id,code:t});if(s)throw s;const r=_i(10);await c.from("admin_2fa").upsert({user_id:A.user.id,enabled:!0,backup_codes:r}),await te(A.user.id,"2fa_enrolled"),z(),ki(r.map(l=>l.code)),kt()}catch(i){const o=document.getElementById("setup-2fa-error");o&&(o.textContent=i.message?.includes("Invalid")?"Wrong code. Check your app and try again.":i.message,o.classList.remove("hidden")),document.getElementById("setup-totp-code").value="",document.getElementById("setup-totp-code").focus()}};function _i(e){const t=[];for(let a=0;a<e;a++){const i=Array.from({length:16},()=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random()*32)]).join("");t.push({code:`${i.slice(0,4)}-${i.slice(4,8)}-${i.slice(8,12)}-${i.slice(12,16)}`,used:!1})}return t}function ki(e){j(`
    <div class="modal-overlay">
      <div class="modal-box">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0"><i data-lucide="key" class="w-5 h-5 text-amber-400"></i></div>
          <div>
            <h3 class="text-base font-black text-white">Save Your Backup Codes</h3>
            <p class="text-xs text-red-400 font-bold">âš  These will not be shown again!</p>
          </div>
        </div>
        <p class="text-xs text-gray-400 mb-4">Store these codes somewhere safe. If you lose your authenticator, use one of these to log in. Each code works once.</p>
        <div class="grid grid-cols-2 gap-2 mb-5">
          ${e.map(t=>`<code class="font-mono text-xs px-3 py-2 bg-blue-500/5 text-blue-300 border border-blue-500/15 rounded-lg text-center select-all">${n(t)}</code>`).join("")}
        </div>
        <div class="flex gap-3">
          <button onclick="copyBackupCodes([${e.map(t=>`'${t}'`).join(",")}])" class="btn-press flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs transition"><i data-lucide="copy" class="w-4 h-4"></i> Copy All</button>
          <button onclick="downloadBackupCodes([${e.map(t=>`'${t}'`).join(",")}])" class="btn-press flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-xl text-xs transition"><i data-lucide="download" class="w-4 h-4"></i> Download</button>
          <button onclick="closeModal()" class="btn-press px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs transition">Done</button>
        </div>
      </div>
    </div>`),window.lucide&&lucide.createIcons()}window.copyBackupCodes=function(e){navigator.clipboard.writeText(e.join(`
`)).then(()=>p("Backup codes copied!"))};window.downloadBackupCodes=function(e){const t=new Blob([`Weverse Admin Backup Codes
Generated: ${new Date().toISOString()}

${e.join(`
`)}

Each code works once. Store securely.`],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(t),a.download="kco-admin-backup-codes.txt",a.click()};window.regenerateBackupCodes=async function(){if(!confirm("This will invalidate ALL existing backup codes. Continue?"))return;const e=_i(10);await c.from("admin_2fa").update({backup_codes:e}).eq("user_id",A.user.id),p("New backup codes generated"),ki(e.map(t=>t.code)),kt()};window.disable2FA=async function(){if(confirm("Disable two-factor authentication? Your account will be less secure."))try{const{data:e}=await c.auth.mfa.listFactors(),t=(e?.totp||[])[0];if(t){const{error:a}=await c.auth.mfa.unenroll({factorId:t.id});if(a)throw a}await c.from("admin_2fa").update({enabled:!1}).eq("user_id",A.user.id),await te(A.user.id,"2fa_disabled"),p("2FA has been disabled"),kt()}catch(e){p(e.message,"error")}};async function Vs(){const e=document.getElementById("content");try{const{data:t}=await c.from("admin_activity_logs").select("*").order("created_at",{ascending:!1}).limit(100);e.innerHTML=`
      <div class="space-y-4 fade-in">
        <h2 class="text-xl font-black text-white">Activity Logs</h2>
        <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full dt">
              <thead><tr><th>Action</th><th>Entity</th><th class="hidden sm:table-cell">Admin</th><th>Date</th></tr></thead>
              <tbody>
                ${(t||[]).length===0?'<tr><td colspan="4" class="text-center text-gray-500 py-8">No activity yet</td></tr>':(t||[]).map(a=>`<tr>
                    <td><span class="text-xs font-bold text-white">${n(a.action)}</span></td>
                    <td><span class="text-xs text-gray-400">${n(a.entity_type||"â€”")} <span class="text-gray-600">${n(a.entity_id?.slice(0,8)||"")}</span></span></td>
                    <td class="hidden sm:table-cell"><span class="text-xs text-blue-400">${n(a.user_email||a.user_id?.slice(0,8)||"â€”")}</span></td>
                    <td><span class="text-xs text-gray-500">${be(a.created_at)}</span></td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}async function Ws(){const e=document.getElementById("content");try{const{data:t}=await c.from("deployment_history").select("*").order("created_at",{ascending:!1}).limit(20);e.innerHTML=`
      <div class="space-y-5 fade-in">
        <h2 class="text-xl font-black text-white">Backup & Restore</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <div class="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3"><i data-lucide="download" class="w-5 h-5 text-blue-400"></i></div>
            <h3 class="text-sm font-black text-white mb-1">Export Products</h3>
            <p class="text-xs text-gray-400 mb-4">Download all products and properties as a JSON file.</p>
            <button onclick="exportProducts()" class="btn-press flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
              <i data-lucide="download" class="w-4 h-4"></i> Download JSON
            </button>
          </div>
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5">
            <div class="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center mb-3"><i data-lucide="database" class="w-5 h-5 text-violet-400"></i></div>
            <h3 class="text-sm font-black text-white mb-1">Export Orders</h3>
            <p class="text-xs text-gray-400 mb-4">Download all order data as a CSV file.</p>
            <button onclick="exportOrders()" class="btn-press flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
              <i data-lucide="file-down" class="w-4 h-4"></i> Download CSV
            </button>
          </div>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
          <div class="p-4 border-b border-blue-500/10"><h3 class="text-sm font-black text-white">Deployment History</h3></div>
          <div class="divide-y divide-blue-500/5">
            ${(t||[]).length===0?'<p class="text-xs text-gray-500 text-center py-8">No deployment history</p>':(t||[]).map(a=>`<div class="flex items-center gap-3 px-4 py-3">
                <div class="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0"><i data-lucide="rocket" class="w-4 h-4 text-emerald-400"></i></div>
                <div class="flex-1"><p class="text-xs font-bold text-white">${n(a.version||a.id?.slice(0,8))}</p><p class="text-[10px] text-gray-500">${be(a.created_at)}</p></div>
                ${H(a.status||"completed")}
              </div>`).join("")}
          </div>
        </div>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.exportProducts=async function(){const{data:e}=await c.from("showroom_listings").select("*"),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(t),a.download=`kco-products-${new Date().toISOString().slice(0,10)}.json`,a.click(),p("Products exported!")};window.exportOrders=async function(){const{data:e}=await c.from("payment_receipts").select("*").order("created_at",{ascending:!1});if(!e||!e.length){p("No orders to export","info");return}const t=Object.keys(e[0]).join(","),a=e.map(s=>Object.values(s).map(r=>`"${String(r||"").replace(/"/g,'""')}"`).join(",")).join(`
`),i=new Blob([t+`
`+a],{type:"text/csv"}),o=document.createElement("a");o.href=URL.createObjectURL(i),o.download=`kco-orders-${new Date().toISOString().slice(0,10)}.csv`,o.click(),p("Orders exported!")};async function Gs(){const e=document.getElementById("content"),{data:t}=await c.from("site_settings").select("*").limit(1).maybeSingle(),a=t||{};e.innerHTML=`
    <div class="space-y-5 fade-in">
      <h2 class="text-xl font-black text-white">Settings</h2>
      <form id="settings-form" onsubmit="saveSettings(event)" class="space-y-4">
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
          <h3 class="text-sm font-black text-white">General Settings</h3>
          <div class="form-grid form-grid-2">
            <div><label class="lbl">Default Currency</label><select class="input-field" name="default_currency">
              ${["USD","EUR","GBP","NGN","KES","ZAR","GHS"].map(i=>`<option value="${i}" ${(a.default_currency||"USD")===i?"selected":""}>${i}</option>`).join("")}
            </select></div>
            <div><label class="lbl">Default Language</label><select class="input-field" name="default_language">
              ${["en","fr","es","de","pt","ar","sw"].map(i=>`<option value="${i}" ${(a.default_language||"en")===i?"selected":""}>${i}</option>`).join("")}
            </select></div>
            <div><label class="lbl">Timezone</label><input class="input-field" name="timezone" value="${n(a.timezone||"UTC")}" placeholder="UTC"></div>
            <div><label class="lbl">Low Stock Threshold</label><input type="number" class="input-field" name="low_stock_threshold" value="${n(a.low_stock_threshold||10)}" min="1"></div>
          </div>
        </div>
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-black text-white">Feature Toggles</h3>
          ${[{key:"maintenance_mode",label:"Maintenance Mode",desc:"Show a maintenance page to visitors"},{key:"reviews_enabled",label:"Reviews Enabled",desc:"Allow customers to leave reviews",default:!0},{key:"wishlist_enabled",label:"Wishlist Enabled",desc:"Allow customers to save products",default:!0},{key:"guest_checkout",label:"Guest Checkout",desc:"Allow checkout without an account",default:!0}].map(i=>`
            <div class="flex items-center justify-between p-3 glass-soft border border-blue-500/10 rounded-xl">
              <div><p class="text-xs font-bold text-white">${i.label}</p><p class="text-[11px] text-gray-500">${i.desc}</p></div>
              <label class="toggle-switch"><input type="checkbox" name="${i.key}" ${a[i.key]!==!1&&(a[i.key]||i.default)?"checked":""}><span class="toggle-slider"></span></label>
            </div>`).join("")}
        </div>
        <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm transition">ðŸ’¾ Save Settings</button>
      </form>
    </div>`,window.lucide&&lucide.createIcons()}window.saveSettings=async function(e){e.preventDefault();const t=new FormData(e.target),a={};for(const[i,o]of t.entries())a[i]=o;["maintenance_mode","reviews_enabled","wishlist_enabled","guest_checkout"].forEach(i=>{a[i]=i in a}),await c.from("site_settings").upsert({id:1,...a}),p("Settings saved!")};async function $t(){const e=document.getElementById("content");e&&(e.innerHTML=Ce());try{const{data:t}=await c.from("site_settings").select("*").limit(1).maybeSingle(),a=t||{},i=a.homepage_banner_image||"",o=a.homepage_banner_alt||"Homepage header banner",s=i?"Uploaded banner will appear at the top of the homepage only.":"No homepage banner is set yet.";e.innerHTML=`
      <div class="space-y-5 fade-in">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-xl font-black text-white flex items-center gap-2"><i data-lucide="image" class="w-5 h-5 text-blue-400"></i> Homepage Branding</h2>
            <p class="text-xs text-gray-500 mt-1">Upload a header banner for the homepage. This does not change your logo, text, colors, or verification badge.</p>
          </div>
          <button type="button" onclick="toggleHomepageBannerPreview()" class="btn-press flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i> Live Preview
          </button>
        </div>

        <div id="homepage-banner-preview-panel" class="glass-soft border border-violet-500/20 rounded-2xl p-5 space-y-3 hidden">
          <h3 class="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-2"><i data-lucide="eye" class="w-3.5 h-3.5"></i> Live Preview</h3>
          <div class="rounded-2xl overflow-hidden border border-blue-500/10 bg-[#0f172a]">
            <div class="px-4 py-3 border-b border-white/5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              <i data-lucide="layout-panel-top" class="w-3.5 h-3.5 text-blue-400"></i>
              Homepage header banner
            </div>
            <div class="bg-[#070b16] p-3 sm:p-4">
              <div class="overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-2xl shadow-black/20" style="aspect-ratio: 1600 / 320;">
                ${i?`<img id="homepage-banner-preview-img" src="${n(i)}" alt="${n(o)}" class="h-full w-full object-cover">`:'<div class="flex h-full w-full items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"><div class="text-center"><i data-lucide="image-off" class="mx-auto w-8 h-8 text-gray-500"></i><p class="mt-2 text-xs font-semibold text-gray-500">No banner selected</p></div></div>'}
              </div>
            </div>
            <div class="px-4 py-3 border-t border-white/5 bg-[#0b1020] flex items-center gap-2 text-[11px] text-gray-400">
              <i data-lucide="crop" class="w-3.5 h-3.5 text-blue-400"></i>
              <span>Crop / resize is previewed in a fixed banner frame. Wide images work best.</span>
            </div>
          </div>
          <p id="homepage-banner-preview-note" class="text-[10px] text-gray-500">${n(s)}</p>
        </div>

        <form id="homepage-branding-form" onsubmit="saveHomepageBranding(event)" class="space-y-5">
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="image-plus" class="w-4 h-4 text-blue-400"></i> Header Banner Image</h3>
                <p class="text-[11px] text-gray-500 mt-1">PNG, JPG, WEBP. The banner is stored permanently and published instantly after saving.</p>
              </div>
              <span class="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full font-bold">Homepage only</span>
            </div>

            <div id="homepage-banner-status" class="hidden p-3 bg-blue-500/8 border border-blue-500/20 rounded-xl text-xs text-blue-300 flex items-center gap-2">
              <i data-lucide="loader-2" class="w-4 h-4 animate-spin shrink-0"></i>
              <span id="homepage-banner-msg">Uploadingâ€¦</span>
            </div>

            <div class="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
              <div class="space-y-3">
                <div class="group relative overflow-hidden rounded-2xl border border-dashed border-blue-500/25 bg-[#0b1020] transition hover:border-blue-500/50">
                  <div class="p-3 sm:p-4">
                    <div class="overflow-hidden rounded-xl border border-white/10 bg-[#111827]" style="aspect-ratio: 1600 / 320;">
                      ${i?`<img id="homepage-banner-image" src="${n(i)}" alt="${n(o)}" class="h-full w-full object-cover">`:'<div class="flex h-full w-full items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"><div class="text-center"><i data-lucide="image-plus" class="mx-auto w-8 h-8 text-blue-400"></i><p class="mt-2 text-xs font-semibold text-gray-400">Upload a homepage banner</p></div></div>'}
                    </div>
                    <div class="mt-3 flex flex-wrap gap-2">
                      <button type="button" onclick="triggerImgUpload('homepage_banner_image')" class="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg">${i?"Replace Image":"Upload Image"}</button>
                      <button type="button" onclick="clearHomepageBannerImg()" class="text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-lg">Remove Image</button>
                      <button type="button" onclick="restoreHomepageBannerDefault()" class="text-xs font-bold text-white bg-slate-700 px-3 py-1.5 rounded-lg">Restore Default</button>
                    </div>
                  </div>
                </div>
                <input type="file" id="file-homepage_banner_image" class="hidden" accept="image/*" onchange="handleBrandImgUpload(event,'homepage_banner_image')">
                <input type="hidden" name="homepage_banner_image" id="val-homepage_banner_image" value="${n(i)}">
                <input type="text" id="url-homepage_banner_image" value="${n(i)}" placeholder="Or paste image URL" oninput="document.getElementById('val-homepage_banner_image').value=this.value;updateHomepageBannerPreview()" class="input-field text-xs">
                <p class="text-[10px] text-gray-500">Use a wide image for the cleanest banner. The homepage frame will crop/resize it automatically.</p>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="lbl">Banner Alt Text</label>
                  <textarea class="input-field" id="homepage_banner_alt" name="homepage_banner_alt" rows="4" placeholder="Accessible description for the banner image">${n(o)}</textarea>
                </div>
                <div class="glass-soft border border-blue-500/15 rounded-2xl p-4 space-y-2">
                  <p class="text-xs font-black text-white flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4 text-violet-400"></i> Publish Controls</p>
                  <p class="text-[11px] text-gray-500">Click Publish Changes to save the banner permanently. Remove Image clears it from the homepage.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl text-xs text-blue-300 flex items-start gap-3">
            <i data-lucide="info" class="w-4 h-4 shrink-0 mt-0.5 text-blue-400"></i>
            <p>The homepage banner is separate from your brand logo and brand text. It only affects the top homepage header area.</p>
          </div>

          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2">
            <i data-lucide="upload" class="w-4 h-4"></i> Publish Changes
          </button>
        </form>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}async function St(){const e=document.getElementById("content");e&&(e.innerHTML=Ce());try{let t=function(l,d,u,b="",g="blue"){const x=!!(u&&u.trim());return`
        <div class="glass-soft border border-${g}-500/15 rounded-xl p-4 space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-xs font-black text-white">${n(l)}</p>
            ${x?'<span class="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">âœ“ Uploaded</span>':'<span class="text-[9px] text-gray-600">Empty</span>'}
          </div>
          ${x?`<div class="relative group w-full h-24 rounded-xl overflow-hidden bg-gray-900 border border-blue-500/10 flex items-center justify-center">
                <img src="${n(u)}" alt="${n(l)}" class="max-h-20 max-w-full object-contain p-2" onerror="this.closest('div').innerHTML='<p class=&quot;text-xs text-gray-600 text-center&quot;>Image broken</p>'">
                <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button type="button" onclick="triggerImgUpload('${d}')" class="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg">Replace</button>
                  <button type="button" onclick="clearBrandImg('${d}')" class="text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-lg">Remove</button>
                </div>
               </div>`:`<div class="w-full h-24 rounded-xl border-2 border-dashed border-${g}-500/25 hover:border-${g}-500/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition" onclick="triggerImgUpload('${d}')">
                <i data-lucide="image-plus" class="w-7 h-7 text-${g}-400"></i>
                <p class="text-[11px] text-gray-500">Click to upload</p>
               </div>`}
          ${b?`<p class="text-[10px] text-gray-500">${n(b)}</p>`:""}
          <input type="file" id="file-${d}" class="hidden" accept="image/*" onchange="handleBrandImgUpload(event,'${d}')">
          <input type="hidden" name="${d}" id="val-${d}" value="${n(u||"")}">
          <div class="flex gap-2">
            <input class="input-field text-xs flex-1 ${x?"":"hidden"}" id="url-${d}" value="${n(u||"")}" placeholder="Or paste image URL" oninput="document.getElementById('val-${d}').value=this.value;updateLivePreview()">
            <button type="button" onclick="document.getElementById('url-${d}').classList.toggle('hidden')" class="text-[10px] text-${g}-400 hover:text-${g}-300 transition shrink-0">${x?"Edit URL":"Paste URL"}</button>
          </div>
        </div>`};const{data:a}=await c.from("site_settings").select("*").limit(1).maybeSingle(),i=a||{},o=i.brand_name||i.site_name||Ga,s=i.brand_slogan||i.site_tagline||za,r=i.brand_logo||i.brand_header_logo||"";e.innerHTML=`
      <div class="space-y-5 fade-in">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <h2 class="text-xl font-black text-white flex items-center gap-2"><i data-lucide="palette" class="w-5 h-5 text-blue-400"></i> Brand Manager</h2>
          <div class="flex items-center gap-2">
            <button type="button" onclick="toggleLivePreview()" class="btn-press flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i> Live Preview
            </button>
          </div>
        </div>

        <!-- â”€â”€ LIVE PREVIEW PANEL â”€â”€ -->
        <div id="live-preview-panel" class="hidden glass-soft border border-violet-500/20 rounded-2xl p-5 space-y-3">
          <h3 class="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-2"><i data-lucide="eye" class="w-3.5 h-3.5"></i> Live Preview â€” updates as you type</h3>
          <!-- Header preview -->
          <div class="rounded-xl overflow-hidden border border-blue-500/10">
            <div id="preview-header" class="flex items-center gap-3 px-4 py-3" style="background:#0f172a">
              <div id="preview-logo-wrap" class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style="background:var(--preview-primary,#f97316)">
                ${r?`<img src="${n(r)}" alt="${n(o)}" class="w-full h-full object-contain p-1">`:'<i data-lucide="globe" class="w-4 h-4 text-white"></i>'}
              </div>
              <div>
                <p id="preview-name" class="text-sm font-black text-white leading-none">${n(o)}</p>
                <p id="preview-slogan" class="text-[10px] text-blue-400 font-semibold mt-0.5">${n(s)}</p>
              </div>
              <div id="preview-badge-wrap" class="ml-auto ${i.brand_badge?"":"hidden"}">
                <img id="preview-badge" src="${n(i.brand_badge||"")}" alt="Verified" class="w-6 h-6 object-contain">
              </div>
            </div>
            <div class="px-4 py-2 border-t border-gray-800 text-[11px] text-gray-500" style="background:#070b16">
              <span id="preview-btn" style="background:${n(i.brand_primary_color||"#f97316")};color:#000;padding:4px 12px;border-radius:8px;font-weight:700;font-size:11px">Shop Now</span>
              <span class="ml-3" style="color:${n(i.brand_secondary_color||"#3b82f6")}">All Products â†’</span>
            </div>
          </div>
          <!-- Footer preview -->
          <div id="preview-footer" class="rounded-xl px-4 py-3 border border-gray-800 flex items-center gap-3" style="background:#0f172a">
            <div id="preview-footer-logo-wrap" class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style="background:var(--preview-primary,#f97316)">
              ${r?`<img src="${n(r)}" alt="${n(o)}" class="w-full h-full object-contain p-1">`:'<i data-lucide="globe" class="w-4 h-4 text-white"></i>'}
            </div>
            <div>
              <p id="preview-footer-name" class="text-xs font-black text-white">${n(o)}</p>
              <p id="preview-footer-slogan" class="text-[10px] text-gray-500">${n(s)}</p>
            </div>
            <p class="ml-auto text-[10px] text-gray-600">Â© 2026 <span id="preview-copy-name">${n(o)}</span></p>
          </div>
          <p class="text-[10px] text-gray-500">This is how your brand will appear on every page. Click Save to apply everywhere.</p>
        </div>

        <form id="brand-form" onsubmit="saveBrandSettings(event)" class="space-y-5">

          <!-- â”€â”€ Brand Identity â”€â”€ -->
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="type" class="w-4 h-4 text-blue-400"></i> Brand Identity</h3>
            <div class="form-grid form-grid-2">
              <div>
                <label class="lbl">Brand Name *</label>
                <input class="input-field" name="brand_name" id="inp-brand-name" value="${n(o)}" placeholder="Your brand name" required oninput="updateLivePreview()">
              </div>
              <div>
                <label class="lbl">Short Name</label>
                <input class="input-field" name="brand_short_name" value="${n(i.brand_short_name||"")}" placeholder="e.g. Weverse">
              </div>
              <div class="sm:col-span-2">
                <label class="lbl">Slogan / Tagline *</label>
                <input class="input-field" name="brand_slogan" id="inp-brand-slogan" value="${n(s)}" placeholder="e.g. Global Shopping â€¢ Worldwide Delivery" oninput="updateLivePreview()">
              </div>
              <div class="sm:col-span-2">
                <label class="lbl">Brand Description</label>
                <textarea class="input-field" name="brand_description" rows="2" placeholder="Short descriptionâ€¦">${n(i.brand_description||"")}</textarea>
              </div>
            </div>
          </div>

          <!-- â”€â”€ Brand Colors â”€â”€ -->
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="palette" class="w-4 h-4 text-violet-400"></i> Brand Colors</h3>
            <div class="form-grid form-grid-2">
              <div>
                <label class="lbl">Primary Color (buttons, accents)</label>
                <div class="flex gap-2 items-center">
                  <input type="color" class="w-10 h-10 rounded-xl border border-blue-500/20 bg-transparent cursor-pointer shrink-0" id="cp-primary" value="${n(i.brand_primary_color||"#f97316")}" oninput="document.getElementById('ct-primary').value=this.value;updateLivePreview()">
                  <input class="input-field flex-1 font-mono" id="ct-primary" name="brand_primary_color" value="${n(i.brand_primary_color||"#f97316")}" placeholder="#f97316" oninput="if(/^#[0-9a-fA-F]{6}$/.test(this.value))document.getElementById('cp-primary').value=this.value;updateLivePreview()">
                </div>
              </div>
              <div>
                <label class="lbl">Secondary Color (links, highlights)</label>
                <div class="flex gap-2 items-center">
                  <input type="color" class="w-10 h-10 rounded-xl border border-blue-500/20 bg-transparent cursor-pointer shrink-0" id="cp-secondary" value="${n(i.brand_secondary_color||"#3b82f6")}" oninput="document.getElementById('ct-secondary').value=this.value;updateLivePreview()">
                  <input class="input-field flex-1 font-mono" id="ct-secondary" name="brand_secondary_color" value="${n(i.brand_secondary_color||"#3b82f6")}" placeholder="#3b82f6" oninput="if(/^#[0-9a-fA-F]{6}$/.test(this.value))document.getElementById('cp-secondary').value=this.value;updateLivePreview()">
                </div>
              </div>
              <div>
                <label class="lbl">Tagline Color 1 (e.g. "GLOBAL SHOPPING")</label>
                <div class="flex gap-2 items-center">
                  <input type="color" class="w-10 h-10 rounded-xl border border-blue-500/20 bg-transparent cursor-pointer shrink-0" id="cp-tag1" value="${n(i.brand_tagline_color1||"#22d3ee")}" oninput="document.getElementById('ct-tag1').value=this.value;updateLivePreview()">
                  <input class="input-field flex-1 font-mono" id="ct-tag1" name="brand_tagline_color1" value="${n(i.brand_tagline_color1||"#22d3ee")}" placeholder="#22d3ee" oninput="if(/^#[0-9a-fA-F]{6}$/.test(this.value))document.getElementById('cp-tag1').value=this.value;updateLivePreview()">
                </div>
              </div>
              <div>
                <label class="lbl">Tagline Color 2 (e.g. "WORLDWIDE DELIVERY")</label>
                <div class="flex gap-2 items-center">
                  <input type="color" class="w-10 h-10 rounded-xl border border-blue-500/20 bg-transparent cursor-pointer shrink-0" id="cp-tag2" value="${n(i.brand_tagline_color2||"#a3e635")}" oninput="document.getElementById('ct-tag2').value=this.value;updateLivePreview()">
                  <input class="input-field flex-1 font-mono" id="ct-tag2" name="brand_tagline_color2" value="${n(i.brand_tagline_color2||"#a3e635")}" placeholder="#a3e635" oninput="if(/^#[0-9a-fA-F]{6}$/.test(this.value))document.getElementById('cp-tag2').value=this.value;updateLivePreview()">
                </div>
              </div>
            </div>
          </div>

          <!-- â”€â”€ Brand Font â”€â”€ -->
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="type" class="w-4 h-4 text-amber-400"></i> Brand Font</h3>
            <div class="form-grid form-grid-2">
              <div>
                <label class="lbl">Font Family</label>
                <select class="input-field" name="brand_font" id="brand-font-select" onchange="previewFont(this.value)">
                  ${["Inter","Poppins","Roboto","Montserrat","Nunito","Raleway","Lato","Open Sans","Outfit","Plus Jakarta Sans","DM Sans","Urbanist","Sora","Manrope","Work Sans","Space Grotesk"].map(l=>`<option value="${l}" ${(i.brand_font||"Inter")===l?"selected":""}>${l}</option>`).join("")}
                </select>
              </div>
              <div>
                <label class="lbl">Custom Google Font (overrides above)</label>
                <input class="input-field" name="brand_custom_font" value="${n(i.brand_custom_font||"")}" placeholder="e.g. Space Grotesk">
              </div>
            </div>
            <div id="font-preview" class="p-3 rounded-xl bg-gray-900 border border-blue-500/10">
              <p id="font-sample" class="text-sm text-white font-bold" style="font-family:'${n(i.brand_font||"Inter")}',sans-serif">The quick brown fox jumps â€” 0123456789 Â· Weverse Online Shop</p>
            </div>
          </div>

          <!-- â”€â”€ Logo & Verified Badge â”€â”€ -->
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="image" class="w-4 h-4 text-emerald-400"></i> Logos & Verified Badge</h3>
              <p class="text-[10px] text-gray-500">PNG, SVG, WebP</p>
            </div>
            <div id="brand-upload-status" class="hidden p-3 bg-blue-500/8 border border-blue-500/20 rounded-xl text-xs text-blue-300 flex items-center gap-2">
              <i data-lucide="loader-2" class="w-4 h-4 animate-spin shrink-0"></i>
              <span id="brand-upload-msg">Uploadingâ€¦</span>
            </div>

            <!-- Verified Badge â€” highlighted at top -->
            <div class="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl space-y-3">
              <div class="flex items-center gap-2 mb-1">
                <i data-lucide="badge-check" class="w-4 h-4 text-blue-400"></i>
                <p class="text-xs font-black text-white">Verified Badge</p>
                <span class="text-[9px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full font-bold">Shows next to your brand name</span>
              </div>
              ${t("Verification Badge Image","brand_badge",i.brand_badge,"Upload your blue checkmark or any verification badge. Recommended: 64Ã—64px PNG with transparent background.","blue")}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${t("Brand Logo / Banner Image","brand_logo",r,"Upload your image here. This changes only the logo/banner image and keeps the other brand fields as they are.")}
              ${t("Favicon / Tab Icon","brand_favicon",i.brand_favicon,"Browser tab icon. 32Ã—32 or 64Ã—64px.")}
              ${t("Mobile Logo","brand_mobile_logo",i.brand_mobile_logo,"Smaller logo for phones. 120Ã—40px.")}
              ${t("Header Logo","brand_header_logo",i.brand_header_logo,"Top navigation bar.")}
              ${t("Footer Logo","brand_footer_logo",i.brand_footer_logo,"Website footer.")}
              ${t("Login Page Logo","brand_login_logo",i.brand_login_logo,"Shown on auth/login page.")}
              ${t("Admin Dashboard Logo","brand_admin_logo",i.brand_admin_logo,"Admin sidebar header.")}
              ${t("OG / Social Image","brand_og_image",i.brand_og_image,"1200Ã—630px â€” shown when sharing links.")}
            </div>
          </div>

          <!-- â”€â”€ Contact â”€â”€ -->
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2"><i data-lucide="globe" class="w-4 h-4 text-blue-400"></i> Website & Contact</h3>
            <div class="form-grid form-grid-2">
              <div><label class="lbl">Website URL</label><input class="input-field" name="brand_website_url" value="${n(i.brand_website_url||i.production_url||"https://weverseonlineshop.com")}" placeholder="https://â€¦"></div>
              <div><label class="lbl">Support Email</label><input type="email" class="input-field" name="brand_email" value="${n(i.brand_email||i.contact_email||"")}" placeholder="support@â€¦"></div>
              <div><label class="lbl">Phone / WhatsApp</label><input class="input-field" name="brand_phone" value="${n(i.brand_phone||i.contact_phone||"")}" placeholder="+1 234â€¦"></div>
              <div><label class="lbl">Business Address</label><input class="input-field" name="brand_address" value="${n(i.brand_address||i.contact_address||"")}" placeholder="City, Country"></div>
            </div>
          </div>

          <div class="p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl text-xs text-blue-300 flex items-start gap-3">
            <i data-lucide="info" class="w-4 h-4 shrink-0 mt-0.5 text-blue-400"></i>
            <p>After saving, your brand name, logo image, slogan, and verified badge will automatically appear on <strong>every page</strong> â€” Header, Footer, Login, Checkout, Contact, Admin, and all future pages. Uploading the image does not change your other brand settings.</p>
          </div>

          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2">
            <i data-lucide="save" class="w-4 h-4"></i> Save Brand & Apply to All Pages
          </button>
        </form>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.toggleLivePreview=function(){document.getElementById("live-preview-panel")?.classList.toggle("hidden"),updateLivePreview()};window.updateLivePreview=function(){const e=document.getElementById("live-preview-panel");if(!e||e.classList.contains("hidden"))return;const t=document.getElementById("inp-brand-name")?.value||Ga,a=document.getElementById("inp-brand-slogan")?.value||za,i=document.getElementById("ct-primary")?.value||"#f97316",o=document.getElementById("ct-secondary")?.value||"#3b82f6",s=document.getElementById("ct-tag1")?.value||"#22d3ee",r=document.getElementById("ct-tag2")?.value||"#a3e635",l=document.getElementById("val-brand_logo")?.value||DEFAULT_BRAND_LOGO,d=document.getElementById("val-brand_badge")?.value||"";["preview-name","preview-footer-name","preview-copy-name"].forEach(m=>{const h=document.getElementById(m);h&&(h.textContent=t)}),["preview-slogan","preview-footer-slogan"].forEach(m=>{const h=document.getElementById(m);h&&(h.textContent=a)});const u=document.getElementById("preview-slogan");if(u&&a){const m=a,h=m.indexOf(","),E=h>-1?m.slice(0,h+1):m,S=h>-1?m.slice(h+1):"";u.innerHTML=`<span style="color:${s};font-weight:800">${n(E)}</span><span style="color:${r};font-weight:700">${n(S)}</span>`}const b=document.getElementById("preview-btn");b&&(b.style.background=i);const g=e.querySelector('[style*="color:"]');g&&(g.style.color=o),["preview-logo-wrap","preview-footer-logo-wrap"].forEach(m=>{const h=document.getElementById(m);h&&(l?(h.innerHTML=`<img src="${l}" alt="${t}" class="w-full h-full object-contain p-1">`,h.style.background="transparent"):(h.innerHTML='<i data-lucide="globe" class="w-4 h-4 text-white"></i>',h.style.background=i,window.lucide&&lucide.createIcons()))});const x=document.getElementById("preview-badge-wrap"),f=document.getElementById("preview-badge");x&&f&&(d?(f.src=d,x.classList.remove("hidden")):x.classList.add("hidden"))};window.triggerImgUpload=function(e){document.getElementById("file-"+e)?.click()};window.clearBrandImg=function(e){document.getElementById("val-"+e).value="";const t=document.getElementById("url-"+e);t&&(t.value=""),(e&&e.startsWith("homepage_")?$t:St)()};window.clearHomepageBannerImg=function(){const e=document.getElementById("val-homepage_banner_image"),t=document.getElementById("url-homepage_banner_image"),a=document.getElementById("homepage_banner_alt");e&&(e.value=""),t&&(t.value=""),a&&(a.value=""),$t()};window.restoreHomepageBannerDefault=function(){window.clearHomepageBannerImg()};window.syncColor=function(e,t){const a=document.getElementById("color-"+e);a&&/^#[0-9a-fA-F]{6}$/.test(t)&&(a.value=t)};window.previewFont=function(e){const t=document.getElementById("font-sample");t&&(t.style.fontFamily=`'${e}', sans-serif`);const a="gf-preview";let i=document.getElementById(a);i||(i=document.createElement("link"),i.id=a,i.rel="stylesheet",document.head.appendChild(i)),i.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;700;900&display=swap`};const Wt="weverse_brand_v1",Gt="weverse_brand_override_v1";function zt(){try{const e=JSON.parse(localStorage.getItem(Gt)||"null");if(e&&typeof e=="object")return e}catch{}try{const e=JSON.parse(localStorage.getItem(Wt)||"null");if(e&&typeof e=="object")return e.data&&typeof e.data=="object"?e.data:e}catch{}return{}}function ot(e){const t={...zt(),...e};try{localStorage.setItem(Gt,JSON.stringify(t))}catch{}try{localStorage.setItem(Wt,JSON.stringify({ts:Date.now(),data:t}))}catch{}return window.dispatchEvent(new StorageEvent("storage",{key:Gt})),window.dispatchEvent(new StorageEvent("storage",{key:Wt})),window.dispatchEvent(new CustomEvent("brand-updated",{detail:t})),t}window.handleBrandImgUpload=async function(e,t){const a=e.target.files?.[0];if(!a)return;const i=t&&t.startsWith("homepage_"),o=document.getElementById(i?"homepage-banner-status":"brand-upload-status"),s=document.getElementById(i?"homepage-banner-msg":"brand-upload-msg");o&&o.classList.remove("hidden"),s&&(s.textContent=`Uploading ${a.name}â€¦`);try{const r=a.name.split(".").pop(),l=`brand/${t}-${Date.now()}.${r}`,{error:d}=await c.storage.from("product-images").upload(l,a,{contentType:a.type,upsert:!0});let u;if(d)u=URL.createObjectURL(a),s&&(s.textContent=`Preview only (storage: ${d.message})`);else{const{data:x}=c.storage.from("product-images").getPublicUrl(l);u=x.publicUrl,s&&(s.textContent=`âœ“ ${a.name} uploaded`)}const b=document.getElementById("val-"+t),g=document.getElementById("url-"+t);b&&(b.value=u),g&&(g.value=u,g.classList.remove("hidden")),i?updateHomepageBannerPreview():(updateLivePreview(),setTimeout(()=>St(),1e3))}catch(r){s&&(s.textContent=`Upload failed: ${r.message}`)}setTimeout(()=>o?.classList.add("hidden"),4e3)};window.saveBrandSettings=async function(e){e.preventDefault();const t=new FormData(e.target),a={};for(const[l,d]of t.entries())l.endsWith("_url")||(a[l]=d);a.brand_slogan&&(a.site_tagline=a.brand_slogan),a.brand_description&&(a.site_description=a.brand_description),a.brand_email&&(a.contact_email=a.brand_email),a.brand_phone&&(a.contact_phone=a.brand_phone),a.brand_address&&(a.contact_address=a.brand_address),a.brand_website_url&&(a.production_url=a.brand_website_url);const i=a.brand_custom_font||a.brand_font;i&&previewFont(i);const o=e.target.querySelector("[type=submit]");o&&(o.disabled=!0,o.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i>Savingâ€¦',window.lucide&&lucide.createIcons());const{data:s}=await c.from("site_settings").select("id").limit(1).maybeSingle();let r;s?.id?{error:r}=await c.from("site_settings").update(a).eq("id",s.id):{error:r}=await c.from("site_settings").insert(a),r?(ot(a),p("Brand saved locally because the live settings table rejected part of the update. The site now uses the override immediately.","success")):(ot(a),p("âœ… Brand saved! All pages will now show your updated brand.","success")),setTimeout(()=>St(),500)};window.toggleHomepageBannerPreview=function(){document.getElementById("homepage-banner-preview-panel")?.classList.toggle("hidden"),updateHomepageBannerPreview()};window.updateHomepageBannerPreview=function(){const e=document.getElementById("homepage-banner-preview-panel");if(!e||e.classList.contains("hidden"))return;const t=document.getElementById("val-homepage_banner_image")?.value||"",a=document.getElementById("homepage_banner_alt")?.value||"Homepage header banner",i=document.getElementById("homepage-banner-image"),o=document.getElementById("homepage-banner-preview-img");[i,o].forEach(r=>{r&&(t?(r.src=t,r.alt=a,r.classList.remove("hidden")):r.classList.add("hidden"))});const s=document.getElementById("homepage-banner-preview-note");s&&(s.textContent=t?"Uploaded banner will appear at the top of the homepage only.":"No homepage banner is set yet.")};window.saveHomepageBranding=async function(e){e.preventDefault();const t={homepage_banner_image:document.getElementById("url-homepage_banner_image")?.value||"",homepage_banner_alt:document.getElementById("homepage_banner_alt")?.value||"Homepage header banner"},a=e.target.querySelector("[type=submit]");a&&(a.disabled=!0,a.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i>Publishingâ€¦',window.lucide&&lucide.createIcons());const{data:i}=await c.from("site_settings").select("id").limit(1).maybeSingle();let o;i?.id?{error:o}=await c.from("site_settings").update(t).eq("id",i.id):{error:o}=await c.from("site_settings").insert(t),o?(ot({...zt(),homepage_banner_image:t.homepage_banner_image,homepage_banner_alt:t.homepage_banner_alt}),p("Homepage banner saved locally because the live settings table rejected part of the update. The site now uses the override immediately.","success")):(ot({...zt(),homepage_banner_image:t.homepage_banner_image,homepage_banner_alt:t.homepage_banner_alt}),p("Homepage banner published.","success")),setTimeout(()=>$t(),500)};const st=[{key:"trust_promo",label:"Promotional Hero (Trust & Info Area)",icon:"sparkles",desc:"The family-receives-orders section above the app banner. Show it as-is for the built-in design, or upload the real photo/video."},{key:"app_banner",label:"Weverse Mobile App Banner",icon:"smartphone",desc:"The dark app banner at the very bottom of every page."},{key:"reviews",label:"Customer Reviews & Trust",icon:"star",desc:"The customer reviews strip just below the accordions."}];async function Ue(e){const t=document.getElementById("content");t&&(t.innerHTML=Ce());try{let a=e?{...e}:null;if(!a){const{data:i}=await c.from("site_settings").select("*").limit(1).maybeSingle(),o=i||{};a={};for(const s of st)a[s.key+"_bg_image"]=o[s.key+"_bg_image"]||"",a[s.key+"_bg_video"]=o[s.key+"_bg_video"]||""}t.innerHTML=`
      <div class="space-y-5 fade-in">
        <h2 class="text-xl font-black text-white flex items-center gap-2"><i data-lucide="image" class="w-5 h-5 text-blue-400"></i> Promo & Backgrounds</h2>
        <p class="text-xs text-gray-500 max-w-2xl leading-relaxed">Choose an <b class="text-gray-300">image</b> and/or a <b class="text-gray-300">video</b> for each promotional section. When a video is set it plays automatically and the image acts as its poster. Leave a slot empty to keep that section’s built-in design. Changes appear instantly on every page after publishing.</p>

        <div id="promo-bg-status" class="hidden p-3 bg-blue-500/8 border border-blue-500/20 rounded-xl text-xs text-blue-300 flex items-center gap-2">
          <i data-lucide="loader-2" class="w-4 h-4 animate-spin shrink-0"></i>
          <span id="promo-bg-msg">Uploadingâ€¦</span>
        </div>

        <form id="promo-bg-form" onsubmit="savePromoBackgrounds(event)" class="space-y-5">
          ${st.map(i=>zs(i,a)).join("")}

          <div class="glass-soft border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
            <i data-lucide="info" class="w-5 h-5 text-emerald-400 shrink-0"></i>
            <p class="text-[11px] text-gray-400 leading-relaxed">Published backgrounds are cached on visitor devices for up to a minute. Publishing clears the cache so everyone sees your new media immediately.</p>
          </div>

          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm transition">
            <i data-lucide="rocket" class="w-4 h-4 inline mr-2"></i>Publish Promo & Backgrounds
          </button>
        </form>
      </div>`,window.lucide&&lucide.createIcons()}catch(a){t&&(t.innerHTML=`<div class="p-6 text-red-400">${n(a.message)}</div>`)}}function zs(e,t){const a=e.key+"_bg_image",i=e.key+"_bg_video",o=t[a]||"",s=t[i]||"",r=!!(o&&o.trim()),l=!!(s&&s.trim());return`
    <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20"><i data-lucide="${e.icon}" class="w-4 h-4 text-blue-400"></i></div>
          <div>
            <p class="text-xs font-black text-white">${e.label}</p>
            <p class="text-[10px] text-gray-500 mt-0.5 max-w-xl">${e.desc}</p>
          </div>
        </div>
        <div class="flex gap-1.5">
          ${r?'<span class="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">âœ“ Image</span>':""}
          ${l?'<span class="text-[9px] font-bold text-violet-500 bg-violet-500/10 px-1.5 py-0.5 rounded-full">âœ“ Video</span>':""}
          ${r||l?"":'<span class="text-[9px] text-gray-600">Built-in design</span>'}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${Pa(e,a,o,r,"image")}
        ${Pa(e,i,s,l,"video")}
      </div>
    </div>`}function Pa(e,t,a,i,o){const s=o==="image",r=s?"blue":"violet",l=s?"image-plus":"video",d=s?"text-blue-400":"text-violet-400";return`
    <div>
      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5"><i data-lucide="${l}" class="w-3 h-3 ${d}"></i>${o}</p>
      ${i?`<div class="relative group w-full h-28 rounded-xl overflow-hidden bg-gray-900 border border-${r}-500/15 flex items-center justify-center">
             ${s?`<img src="${n(a)}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:`<video src="${n(a)}" class="w-full h-full object-cover" muted playsinline preload="metadata"></video>`}
             <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
               <button type="button" onclick="triggerPromoBgUpload('${t}')" class="text-xs font-bold text-white bg-${r}-600 px-3 py-1.5 rounded-lg">Replace</button>
               <button type="button" onclick="clearPromoBg('${t}')" class="text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-lg">Remove</button>
             </div>
           </div>`:`<button type="button" onclick="triggerPromoBgUpload('${t}')" class="w-full h-28 rounded-xl border-2 border-dashed border-${r}-500/25 hover:border-${r}-500/50 flex flex-col items-center justify-center gap-1.5 transition">
             <i data-lucide="${l}" class="w-6 h-6 ${d}"></i>
             <p class="text-[10px] text-gray-500">Upload ${o}</p>
           </button>`}
      <input type="file" id="file-${t}" class="hidden" accept="${s?"image/*":"video/*"}" onchange="handlePromoBgUpload(event,'${t}')">
      <input type="hidden" name="${t}" id="val-${t}" value="${n(a)}">
      <div class="flex gap-2 mt-1.5">
        <input class="input-field text-xs flex-1" id="url-${t}" value="${n(a)}" placeholder="Or paste ${o} URL" oninput="document.getElementById('val-${t}').value=this.value">
        <button type="button" onclick="document.getElementById('url-${t}').classList.toggle('hidden')" class="text-[10px] text-${r}-400 hover:text-${r}-300 transition shrink-0">Edit URL</button>
      </div>
    </div>`}window.triggerPromoBgUpload=function(e){document.getElementById("file-"+e)?.click()};function $i(){const e={};for(const t of st)e[t.key+"_bg_image"]=document.getElementById("val-"+t.key+"_bg_image")?.value||"",e[t.key+"_bg_video"]=document.getElementById("val-"+t.key+"_bg_video")?.value||"";return e}window.clearPromoBg=function(e){const t=$i();t[e]="";const a=document.getElementById("val-"+e),i=document.getElementById("url-"+e);a&&(a.value=""),i&&(i.value=""),Ue(t),p("Cleared. Publish to apply.","info")};window.handlePromoBgUpload=async function(e,t){const a=e.target.files?.[0];if(!a)return;const i=document.getElementById("promo-bg-status"),o=document.getElementById("promo-bg-msg");i&&i.classList.remove("hidden"),o&&(o.textContent=`Uploading ${a.name}â€¦`);try{const s=(a.name.split(".").pop()||"bin").toLowerCase(),r=`promo/${t}-${Date.now()}.${s}`,{error:l}=await c.storage.from("product-images").upload(r,a,{contentType:a.type,upsert:!0});let d;if(l)d=URL.createObjectURL(a),o&&(o.textContent=`Preview only (storage: ${l.message})`);else{const{data:x}=c.storage.from("product-images").getPublicUrl(r);d=x.publicUrl,o&&(o.textContent=`âœ“ ${a.name} uploaded`)}const u=document.getElementById("val-"+t),b=document.getElementById("url-"+t);u&&(u.value=d),b&&(b.value=d,b.classList.remove("hidden"));const g=$i();Ue(g)}catch(s){o&&(o.textContent=`Upload failed: ${s.message}`)}setTimeout(()=>i?.classList.add("hidden"),4e3)};window.savePromoBackgrounds=async function(e){e.preventDefault();const t={};for(const s of st)t[s.key+"_bg_image"]=document.getElementById("val-"+s.key+"_bg_image")?.value||"",t[s.key+"_bg_video"]=document.getElementById("val-"+s.key+"_bg_video")?.value||"";const a=e.target.querySelector("[type=submit]");a&&(a.disabled=!0,a.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i>Publishingâ€¦',window.lucide&&lucide.createIcons());const{data:i}=await c.from("site_settings").select("id").limit(1).maybeSingle();let o;i?.id?{error:o}=await c.from("site_settings").update(t).eq("id",i.id):{error:o}=await c.from("site_settings").insert(t),qi(),o?(p("Publish failed â€” the settings table rejected the update. Make sure the new promo-background columns are migrated, then try again.","error"),Ue(t)):(p("Promo & backgrounds published across all pages.","success"),setTimeout(()=>Ue(),500))};window._manualPaymentAccounts=[];function ba(e="USD"){return{id:`bank-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,currency:e,currencyName:e,flag:Qt("US"),country:"United States",country_code:"US",bankName:"",transferType:"Local & International",beneficiary:"",accountNumber:"",accountType:"",iban:"",swift:"",routing:"",sortCode:"",bankCode:"",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"",address:""}}function ma(){const e=document.getElementById("manual-payment-accounts-json");e&&(e.value=JSON.stringify(window._manualPaymentAccounts||[]))}function Ys(e,t){const a=e.country_code||"US";return`
    <div class="p-4 glass-soft border border-blue-500/10 rounded-xl space-y-3">
      <div class="flex items-center justify-between gap-3">
        <h4 class="text-xs font-black text-white flex items-center gap-2"><i data-lucide="building-2" class="w-3.5 h-3.5 text-blue-400"></i> Bank Account ${t+1}</h4>
        <button type="button" onclick="removeManualPaymentAccount(${t})" class="text-[11px] font-bold text-red-400 hover:text-red-300 transition">Remove</button>
      </div>
      <div class="form-grid form-grid-2">
        <div><label class="lbl">Currency *</label><select class="input-field" onchange="updateManualPaymentAccount(${t}, 'currency', this.value)">${oa.map(i=>`<option value="${i}" ${e.currency===i?"selected":""}>${i}</option>`).join("")}</select></div>
        <div><label class="lbl">Country *</label><select class="input-field" onchange="updateManualPaymentCountry(${t}, this.value)">${la(a)}</select></div>
        <div><label class="lbl">Beneficiary / Account Name *</label><input class="input-field" value="${n(e.beneficiary||"")}" placeholder="Full name on account" oninput="updateManualPaymentAccount(${t}, 'beneficiary', this.value)"></div>
        <div><label class="lbl">Bank Name *</label><input class="input-field" value="${n(e.bankName||"")}" placeholder="e.g. Citibank" oninput="updateManualPaymentAccount(${t}, 'bankName', this.value)"></div>
        <div><label class="lbl">Account Number</label><input class="input-field font-mono" value="${n(e.accountNumber||"")}" placeholder="Account number" oninput="updateManualPaymentAccount(${t}, 'accountNumber', this.value)"></div>
        <div><label class="lbl">Transfer Type</label><input class="input-field" value="${n(e.transferType||"")}" placeholder="Local & International" oninput="updateManualPaymentAccount(${t}, 'transferType', this.value)"></div>
        <div><label class="lbl">Account Type</label><input class="input-field" value="${n(e.accountType||"")}" placeholder="Checking, Savings..." oninput="updateManualPaymentAccount(${t}, 'accountType', this.value)"></div>
        <div><label class="lbl">IBAN</label><input class="input-field font-mono" value="${n(e.iban||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'iban', this.value)"></div>
        <div><label class="lbl">SWIFT / BIC</label><input class="input-field font-mono" value="${n(e.swift||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'swift', this.value)"></div>
        <div><label class="lbl">Routing / ABA</label><input class="input-field font-mono" value="${n(e.routing||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'routing', this.value)"></div>
        <div><label class="lbl">Sort Code</label><input class="input-field font-mono" value="${n(e.sortCode||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'sortCode', this.value)"></div>
        <div><label class="lbl">Bank Code</label><input class="input-field font-mono" value="${n(e.bankCode||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'bankCode', this.value)"></div>
        <div><label class="lbl">Branch Code</label><input class="input-field font-mono" value="${n(e.branchCode||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'branchCode', this.value)"></div>
        <div><label class="lbl">Institution Number</label><input class="input-field font-mono" value="${n(e.institutionNumber||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'institutionNumber', this.value)"></div>
        <div><label class="lbl">Transit Number</label><input class="input-field font-mono" value="${n(e.transitNumber||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'transitNumber', this.value)"></div>
        <div><label class="lbl">BSB Code</label><input class="input-field font-mono" value="${n(e.bsbCode||"")}" placeholder="Optional" oninput="updateManualPaymentAccount(${t}, 'bsbCode', this.value)"></div>
        <div class="sm:col-span-2"><label class="lbl">Bank Address</label><input class="input-field" value="${n(e.address||"")}" placeholder="Branch or bank address" oninput="updateManualPaymentAccount(${t}, 'address', this.value)"></div>
      </div>
    </div>`}window.renderManualPaymentAccountsEditor=function(){const e=document.getElementById("manual-accounts-editor");e&&(window._manualPaymentAccounts?.length||(window._manualPaymentAccounts=[ba()]),e.innerHTML=`
    <div class="space-y-4">
      ${window._manualPaymentAccounts.map((t,a)=>Ys(t,a)).join("")}
      <button type="button" onclick="addManualPaymentAccount()" class="btn-press w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wide transition flex items-center justify-center gap-2">
        <i data-lucide="plus-circle" class="w-4 h-4"></i> Add Another Bank Account
      </button>
    </div>`,ma(),window.lucide&&lucide.createIcons())};window.addManualPaymentAccount=function(){window._manualPaymentAccounts.push(ba()),renderManualPaymentAccountsEditor()};window.removeManualPaymentAccount=function(e){window._manualPaymentAccounts.splice(e,1),window._manualPaymentAccounts.length||(window._manualPaymentAccounts=[ba()]),renderManualPaymentAccountsEditor()};window.updateManualPaymentAccount=function(e,t,a){const i=window._manualPaymentAccounts[e];i&&(i[t]=a,t==="currency"&&(i.currencyName=a),ma())};window.updateManualPaymentCountry=function(e,t){const a=window._manualPaymentAccounts[e];if(!a)return;const i=Ne.find(o=>o.code===t);a.country_code=t,a.country=i?.name||"",a.flag=i?.flag||Qt(t),ma(),renderManualPaymentAccountsEditor()};window._bankAccounts=[];async function Ks(){try{const{data:e,error:t}=await c.from("bank_accounts").select("*").order("sort_order",{ascending:!0}).order("currency",{ascending:!0});if(t)return p(t.message,"error"),[];window._bankAccounts=e||[]}catch{window._bankAccounts=[]}return window._bankAccounts}async function Pt(){const e=document.getElementById("bank-accounts-manager");e&&(e.innerHTML='<div class="flex items-center justify-center py-6 text-blue-300 text-sm"><i data-lucide="loader-2" class="w-4 h-4 animate-spin mr-2"></i> Loading accounts…</div>',window.lucide&&lucide.createIcons(),await Ks(),e.innerHTML=`
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-black text-white uppercase tracking-wide">Receiving Accounts</h4>
        <span class="badge bg-blue-500/10 text-blue-400 border-blue-500/20">${window._bankAccounts.length} total</span>
      </div>
      <div class="space-y-2">
        ${window._bankAccounts.length===0?'<div class="p-4 glass-soft border border-blue-500/10 rounded-xl text-xs text-gray-400">No receiving accounts yet — add your first one.</div>':window._bankAccounts.map(t=>`
          <div class="flex items-center gap-3 p-3 glass-soft border ${t.is_active!==!1?"border-blue-500/20":"border-red-500/20 opacity-60"} rounded-xl">
            <span class="text-xl">${t.flag||Qt(t.country_code||(t.currency==="EUR"?"EU":"US"))}</span>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-black text-white flex items-center gap-2">${n(t.display_name||t.currency+" Receiving Account")} <span class="text-[10px] text-blue-400 font-bold">${n(t.currency||"")}</span></p>
              <p class="text-[10px] text-gray-500 truncate font-mono">${n(t.bank_name||"")} · ${n(t.beneficiary||"")}</p>
            </div>
            <button onclick="toggleBankAccount('${t.id}')" class="btn-press px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${t.is_active!==!1?"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":"bg-red-500/10 text-red-400 border border-red-500/20"} transition">${t.is_active!==!1?"Active":"Inactive"}</button>
            <button onclick="editBankAccount('${t.id}')" class="btn-press p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition" title="Edit"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>
            <button onclick="deleteBankAccount('${t.id}')" class="btn-press p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
          </div>
        `).join("")}
      </div>
      <button onclick="editBankAccount(null)" class="btn-press w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wide transition flex items-center justify-center gap-2 relative overflow-hidden">
        <i data-lucide="plus-circle" class="w-4 h-4"></i> Add Receiving Account
      </button>
    </div>`,window.lucide&&lucide.createIcons())}window.editBankAccount=function(e){const a={display_name:"",currency:"USD",currency_name:"United States Dollar",flag:"",country:"United States",country_code:"US",bank_name:"",transfer_type:"Local & International",beneficiary:"",account_number:"",account_type:"",iban:"",swift:"",routing:"",sort_code:"",bank_code:"",branch_code:"",institution_number:"",transit_number:"",bsb_code:"",address:"",is_active:!0,...(e?(window._bankAccounts||[]).find(o=>o.id===e):null)||{}},i=(o,s,r="",l="")=>`
    <div>
      <label class="lbl">${o}</label>
      <input class="input-field ${r.includes("mono")?"font-mono":""}" id="ba-${s}" value="${n(a[s]||"")}" placeholder="${r.replace(/"/g,"&quot;")}" ${l}>
    </div>`;j(`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-base font-black text-white">${e?"Edit Receiving Account":"Add Receiving Account"}</h3>
          <button onclick="closeModal()" class="text-gray-500 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-1.5 align-[-2px]"></i> Back</button>
        </div>
        <div class="form-grid form-grid-2 space-y-3">
          ${i("Display Name","display_name","e.g. USD Receiving Account")}
          <div><label class="lbl">Currency *</label><select class="input-field" id="ba-currency" onchange="document.getElementById('ba-currency_name').value=this.value">${oa.map(o=>`<option value="${o}" ${a.currency===o?"selected":""}>${o}</option>`).join("")}</select></div>
          ${i("Beneficiary / Account Name *","beneficiary","Full legal name on the account")}
          ${i("Bank Name *","bank_name","e.g. Citibank")}
          ${i("Country","country")}
          <div class="flex items-end"><div class="flex-1"><label class="lbl">Country Code</label><select class="input-field" id="ba-country_code">${la(n(a.country_code||"US"))}</select></div></div>
          <div class="flex items-end"><div class="flex-1"><label class="lbl">Active</label><div class="flex items-center gap-2 pt-2"><input type="checkbox" id="ba-is_active" class="accent-blue-500" ${a.is_active!==!1?"checked":""}><span class="text-xs text-gray-400">Visible at checkout</span></div></div></div>
          ${i("Account Number","account_number","mono")}
          ${i("Account Type","account_type","Checking, Savings…")}
          ${i("Transfer Type","transfer_type")}
          ${i("IBAN","iban","mono")}
          ${i("SWIFT / BIC","swift","mono")}
          ${i("Routing (ABA)","routing","mono")}
          ${i("Sort Code","sort_code","mono")}
          ${i("Bank Code","bank_code","mono")}
          ${i("Branch Code","branch_code","mono")}
          ${i("Institution Number","institution_number","mono")}
          ${i("Transit Number","transit_number","mono")}
          ${i("BSB Code","bsb_code","mono")}
          <div class="sm:col-span-2">${i("Bank Address","address")}</div>
        </div>
        <div class="flex gap-2 mt-5">
          <button onclick="saveBankAccount('${e||""}')" class="btn-press flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wide transition"><i data-lucide="save" class="w-4 h-4 inline mr-1 align-[-2px]"></i> Save Account</button>
          <button onclick="closeModal()" class="btn-press px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-xl text-xs transition flex items-center gap-1.5"><i data-lucide="x" class="w-4 h-4"></i> Cancel</button>
        </div>
      </div>
    </div>`),window.lucide&&lucide.createIcons()};window.saveBankAccount=async function(e){const t=o=>(document.getElementById("ba-"+o)||{}).value||"",a={display_name:t("display_name"),currency:(t("currency")||"USD").toUpperCase(),currency_name:t("currency_name")||t("currency"),flag:t("flag"),country:t("country"),country_code:t("country_code"),bank_name:t("bank_name"),transfer_type:t("transfer_type"),beneficiary:t("beneficiary"),account_number:t("account_number"),account_type:t("account_type"),iban:t("iban"),swift:t("swift"),routing:t("routing"),sort_code:t("sort_code"),bank_code:t("bank_code"),branch_code:t("branch_code"),institution_number:t("institution_number"),transit_number:t("transit_number"),bsb_code:t("bsb_code"),address:t("address"),is_active:!!(document.getElementById("ba-is_active")||{}).checked};if(!a.currency||!a.beneficiary||!a.bank_name){p("Currency, beneficiary and bank name are required.","error");return}const{error:i}=e?await c.from("bank_accounts").update(a).eq("id",e):await c.from("bank_accounts").insert(a);if(i){p(i.message,"error");return}z(),p("Receiving account saved"),Pt()};window.toggleBankAccount=async function(e){const t=(window._bankAccounts||[]).find(i=>i.id===e);if(!t)return;const{error:a}=await c.from("bank_accounts").update({is_active:t.is_active===!1}).eq("id",e);if(a){p(a.message,"error");return}p(t.is_active!==!1?"Account deactivated — hidden from checkout.":"Account activated — visible at checkout."),Pt()};window.deleteBankAccount=async function(e){if(!window.confirm("Delete this receiving account permanently?"))return;const{error:t}=await c.from("bank_accounts").delete().eq("id",e);if(t){p(t.message,"error");return}p("Receiving account deleted"),Pt()};async function Yt(){const e=document.getElementById("content");e&&(e.innerHTML=Ce());try{const{data:t}=await c.from("site_settings").select("*").limit(1).maybeSingle(),i={...ji()||{},...t||{}};window._bankAccounts=(window._bankAccounts||[]).map(o=>({...o})),e.innerHTML=`
      <div class="space-y-5 fade-in">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <h2 class="text-xl font-black text-white">Payment Settings</h2>
          <div class="flex items-center gap-2 flex-wrap">
            ${i.payment_gateway?`<span class="badge bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active: ${n(i.payment_gateway)}</span>`:'<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Not configured</span>'}
            ${i.payment_mode==="live"?'<span class="badge bg-red-500/10 text-red-400 border-red-500/20">ðŸ”´ LIVE MODE</span>':'<span class="badge bg-blue-500/10 text-blue-400 border-blue-500/20">ðŸ”§ Test Mode</span>'}
          </div>
        </div>

        <form id="payment-form" onsubmit="savePaymentSettings(event)" class="space-y-5">
          <div class="glass-soft border border-blue-500/15 rounded-2xl overflow-hidden">
            <div class="flex items-center justify-between p-4 border-b border-blue-500/10">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <i data-lucide="landmark" class="w-5 h-5 text-blue-400"></i>
                </div>
                <div>
                  <h3 class="text-sm font-black text-white">Manual Payment (Bank / ATM Transfer)</h3>
                  <p class="text-[11px] text-gray-500">Store the real receiving accounts below — these are hidden from the public site and shown to customers at checkout only from the database.</p>
                </div>
              </div>
              <label class="toggle-switch shrink-0">
                <input type="checkbox" name="manual_payment_enabled" id="manual-toggle" ${i.manual_payment_enabled!==!1?"checked":""}>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="p-5 space-y-4">
              <div id="bank-accounts-manager"></div>
              <div>
                <label class="lbl">Payment Instructions (shown to customer after checkout)</label>
                <textarea class="input-field" name="manual_payment_instructions" rows="4" placeholder="Explain how customers should pay and upload their receipt.">${n(Ri(i))}</textarea>
              </div>
              <div>
                <label class="lbl">ATM Transfer Instructions (optional, shown separately)</label>
                <textarea class="input-field" name="atm_transfer_instructions" rows="3" placeholder="Optional ATM-specific instructions.">${n(i.atm_transfer_instructions||"")}</textarea>
              </div>
              <div class="p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl text-[11px] text-blue-300">
                <i data-lucide="info" class="w-3.5 h-3.5 inline mr-1"></i>
                Only currencies with an <em>active</em> receiving account are offered at checkout. A transfer of 1,000 USD (or equivalent) or more must be paid by manual bank transfer — card/ATM is reserved for smaller orders.
              </div>
            </div>
          </div>

          <div class="glass-soft border border-amber-500/15 rounded-2xl overflow-hidden">
            <div class="flex items-center justify-between p-4 border-b border-amber-500/10">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <i data-lucide="zap" class="w-5 h-5 text-amber-400"></i>
                </div>
                <div>
                  <h3 class="text-sm font-black text-white">Flutterwave</h3>
                  <p class="text-[11px] text-gray-500">Accept cards, mobile money, bank transfers online</p>
                </div>
              </div>
              <label class="toggle-switch shrink-0">
                <input type="checkbox" name="flutterwave_enabled" ${i.flutterwave_enabled?"checked":""}>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="p-5 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex items-center gap-3 p-3 glass-soft border ${(i.payment_mode||"test")==="test"?"border-blue-500/40 bg-blue-500/5":"border-blue-500/10"} rounded-xl cursor-pointer">
                  <input type="radio" name="payment_mode" value="test" ${(i.payment_mode||"test")==="test"?"checked":""} class="accent-blue-500">
                  <div><p class="text-xs font-black text-white">ðŸ”§ Test Mode</p><p class="text-[11px] text-gray-500">Use sandbox keys â€” no real money</p></div>
                </label>
                <label class="flex items-center gap-3 p-3 glass-soft border ${i.payment_mode==="live"?"border-red-500/40 bg-red-500/5":"border-blue-500/10"} rounded-xl cursor-pointer">
                  <input type="radio" name="payment_mode" value="live" ${i.payment_mode==="live"?"checked":""} class="accent-red-500">
                  <div><p class="text-xs font-black text-white">ðŸ”´ Live Mode</p><p class="text-[11px] text-red-400 font-bold">Real money â€” use production keys</p></div>
                </label>
              </div>
              <div class="form-grid form-grid-2">
                <div><label class="lbl">Public Key *</label><div class="relative"><input type="password" class="input-field pr-16" name="flutterwave_public_key" placeholder="${i.flutterwave_public_key?"â€¢â€¢â€¢â€¢"+i.flutterwave_public_key.slice(-4):"FLWPUBK_TEST-â€¦ or FLWPUBK-â€¦"}">${i.flutterwave_public_key?'<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500">âœ“ Saved</span>':""}</div></div>
                <div><label class="lbl">Secret Key *</label><div class="relative"><input type="password" class="input-field pr-16" name="flutterwave_secret_key" placeholder="${i.flutterwave_secret_key?"â€¢â€¢â€¢â€¢"+i.flutterwave_secret_key.slice(-4):"FLWSECK_TEST-â€¦ or FLWSECK-â€¦"}">${i.flutterwave_secret_key?'<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500">âœ“ Saved</span>':""}</div></div>
                <div><label class="lbl">Encryption Key</label><div class="relative"><input type="password" class="input-field pr-16" name="flutterwave_encryption_key" placeholder="${i.flutterwave_encryption_key?"â€¢â€¢â€¢â€¢"+i.flutterwave_encryption_key.slice(-4):"Encryption key from dashboard"}">${i.flutterwave_encryption_key?'<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500">âœ“ Saved</span>':""}</div></div>
                <div><label class="lbl">Webhook Secret</label><div class="relative"><input type="password" class="input-field pr-16" name="flutterwave_webhook_secret" placeholder="${i.flutterwave_webhook_secret?"â€¢â€¢â€¢â€¢"+i.flutterwave_webhook_secret.slice(-4):"Secret hash for webhook verification"}">${i.flutterwave_webhook_secret?'<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500">âœ“ Saved</span>':""}</div></div>
                <div><label class="lbl">Accepted Currency</label><select class="input-field" name="flutterwave_currency">${["NGN","USD","GBP","EUR","GHS","KES","ZAR","ZMW","TZS","UGX","XAF","XOF"].map(o=>`<option value="${o}" ${(i.flutterwave_currency||"NGN")===o?"selected":""}>${o}</option>`).join("")}</select></div>
                <div><label class="lbl">Redirect URL (after payment)</label><input class="input-field" name="flutterwave_redirect_url" value="${n(i.flutterwave_redirect_url||"")}" placeholder="${window.location.origin}/payment.html"></div>
              </div>
              <div class="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-[11px] text-amber-300 space-y-1">
                <p><strong>Where to get keys:</strong> <a href="https://dashboard.flutterwave.com/dashboard/settings/apis" target="_blank" class="underline hover:text-amber-200">dashboard.flutterwave.com â†’ Settings â†’ API</a></p>
                <p><strong>Webhook URL to add in Flutterwave:</strong> <code class="bg-black/30 px-1 rounded">${window.location.origin}/api/flutterwave-webhook</code></p>
                <p>Test cards: Visa <code class="bg-black/30 px-1 rounded">4187 4274 1556 4246</code> Â· PIN: <code class="bg-black/30 px-1 rounded">3310</code> Â· OTP: <code class="bg-black/30 px-1 rounded">12345</code></p>
              </div>
              <button type="button" onclick="testFlutterwaveKeys()" class="btn-press flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 rounded-xl transition"><i data-lucide="plug" class="w-4 h-4"></i> Test Flutterwave Connection</button>
            </div>
          </div>

          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-3">
            <h3 class="text-sm font-black text-white mb-1">Which payment method is active on checkout?</h3>
            <p class="text-xs text-gray-400 mb-3">Select which method customers see when they go to pay.</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${[{id:"manual",label:"Manual / Bank Transfer",icon:"landmark",color:"blue"},{id:"flutterwave",label:"Flutterwave",icon:"zap",color:"amber"},{id:"both",label:"Both (customer chooses)",icon:"layers",color:"emerald"}].map(o=>`<label class="flex items-center gap-3 p-3 glass-soft border ${(i.payment_gateway||"manual")===o.id?"border-blue-500/40 bg-blue-500/5":"border-blue-500/10"} rounded-xl cursor-pointer hover:border-blue-500/30 transition"><input type="radio" name="payment_gateway" value="${o.id}" ${(i.payment_gateway||"manual")===o.id?"checked":""} class="accent-blue-500"><div><i data-lucide="${o.icon}" class="w-4 h-4 text-${o.color}-400 mb-0.5"></i><p class="text-xs font-bold text-white">${o.label}</p></div></label>`).join("")}
            </div>
          </div>

          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2"><i data-lucide="save" class="w-4 h-4"></i> Save Payment Settings</button>
        </form>
      </div>`,Pt(),window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.savePaymentSettings=async function(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t.entries()),i=["flutterwave_public_key","flutterwave_secret_key","flutterwave_encryption_key","flutterwave_webhook_secret"],o={};for(const[l,d]of Object.entries(a))i.includes(l)?d&&!d.startsWith("â€¢â€¢â€¢â€¢")&&d.trim()!==""&&(o[l]=d.trim()):o[l]=d;o.manual_payment_enabled=a.manual_payment_enabled==="on",o.flutterwave_enabled=a.flutterwave_enabled==="on",Di(o);const{data:s}=await c.from("site_settings").select("id").limit(1).maybeSingle();let r;if(s?.id?{error:r}=await c.from("site_settings").update(o).eq("id",s.id):{error:r}=await c.from("site_settings").insert(o),r){const l=String(r.message||"");if(/manual_payment_accounts|column|schema cache/i.test(l)){p("Payment settings saved locally. Run the latest migration to persist them to Supabase.","info"),console.warn(r),setTimeout(()=>Yt(),500);return}p("Save failed: "+r.message,"error"),console.error(r);return}p("âœ… Payment settings saved successfully!","success"),setTimeout(()=>Yt(),500)};window.testFlutterwaveKeys=async function(){const{data:e}=await c.from("site_settings").select("flutterwave_public_key").limit(1).maybeSingle();if(!e?.flutterwave_public_key){p("Save your Flutterwave public key first","info");return}p("Flutterwave key is saved. Use test mode + test card to verify a payment flow.","info")};async function At(){const e=document.getElementById("content");try{const{data:t}=await c.from("site_settings").select("*").limit(1).maybeSingle(),a=t||{};e.innerHTML=`
      <div class="space-y-5 fade-in">
        <h2 class="text-xl font-black text-white">Publish & Deploy</h2>

        <!-- Status Bar -->
        <div class="glass-soft border border-blue-500/15 rounded-2xl p-4 flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full ${a.github_repo?"bg-emerald-400":"bg-gray-600"} inline-block"></span>
            <span class="text-xs font-bold ${a.github_repo?"text-emerald-400":"text-gray-500"}">${a.github_repo?"GitHub Connected: "+n(a.github_repo):"GitHub Not Connected"}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full ${a.deploy_webhook?"bg-blue-400":"bg-gray-600"} inline-block"></span>
            <span class="text-xs font-bold ${a.deploy_webhook?"text-blue-400":"text-gray-500"}">${a.deploy_webhook?"Deploy Webhook Set":"No Webhook"}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full ${a.payment_gateway?"bg-amber-400":"bg-gray-600"} inline-block"></span>
            <span class="text-xs font-bold ${a.payment_gateway?"text-amber-400":"text-gray-500"}">${a.payment_gateway?"Payment: "+n(a.payment_gateway):"Payment Not Configured"}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button onclick="publishAndDeploy(event)" class="btn-press glass-soft border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl p-4 text-center transition" data-publish-easy-btn>
            <i data-lucide="wand-sparkles" class="w-6 h-6 text-emerald-400 mx-auto mb-2"></i>
            <p class="text-xs font-black text-white">One-Click Publish</p>
            <p class="text-[10px] text-gray-500 mt-0.5">Save + Deploy</p>
          </button>
          <button onclick="triggerDeploy(event)" class="btn-press glass-soft border border-blue-500/15 hover:border-blue-500/40 rounded-xl p-4 text-center transition" data-deploy-btn>
            <i data-lucide="rocket" class="w-6 h-6 text-blue-400 mx-auto mb-2"></i>
            <p class="text-xs font-black text-white">Deploy Now</p>
            <p class="text-[10px] text-gray-500 mt-0.5">Push to live</p>
          </button>
          <button onclick="triggerRebuild(event)" class="btn-press glass-soft border border-violet-500/15 hover:border-violet-500/40 rounded-xl p-4 text-center transition" data-rebuild-btn>
            <i data-lucide="refresh-cw" class="w-6 h-6 text-violet-400 mx-auto mb-2"></i>
            <p class="text-xs font-black text-white">Rebuild Site</p>
            <p class="text-[10px] text-gray-500 mt-0.5">Full rebuild</p>
          </button>
          <button onclick="reindexSearch()" class="btn-press glass-soft border border-emerald-500/15 hover:border-emerald-500/40 rounded-xl p-4 text-center transition">
            <i data-lucide="search" class="w-6 h-6 text-emerald-400 mx-auto mb-2"></i>
            <p class="text-xs font-black text-white">Reindex Search</p>
            <p class="text-[10px] text-gray-500 mt-0.5">Update index</p>
          </button>
          <button onclick="syncShowroomToDB()" class="btn-press glass-soft border border-amber-500/15 hover:border-amber-500/40 rounded-xl p-4 text-center transition">
            <i data-lucide="database" class="w-6 h-6 text-amber-400 mx-auto mb-2"></i>
            <p class="text-xs font-black text-white">Sync Products</p>
            <p class="text-[10px] text-gray-500 mt-0.5">DB sync</p>
          </button>
        </div>

        <!-- Settings Form -->
        <form id="deploy-form" onsubmit="saveDeploySettings(event)" class="space-y-5">

          <!-- â”€â”€ GitHub Integration â”€â”€ -->
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2">
              <i data-lucide="github" class="w-4 h-4 text-white"></i> GitHub Integration
            </h3>
            <div class="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-xs text-blue-300">
              Connect your GitHub account so every deployment pushes your code to GitHub automatically.
              When you click <strong>Deploy Now</strong>, the site builds and commits to your repository.
            </div>
            <div class="form-grid form-grid-2">
              <div>
                <label class="lbl">GitHub Username</label>
                <input class="input-field" name="github_username" value="${n(a.github_username||"")}" placeholder="your-github-username">
              </div>
              <div>
                <label class="lbl">Repository Name</label>
                <input class="input-field" name="github_repo" value="${n(a.github_repo||"")}" placeholder="my-website-repo">
              </div>
              <div>
                <label class="lbl">Branch</label>
                <input class="input-field" name="github_branch" value="${n(a.github_branch||"main")}" placeholder="main">
              </div>
              <div>
                <label class="lbl">GitHub Personal Access Token</label>
                <div class="relative">
                  <input type="password" class="input-field pr-16" name="github_token" placeholder="${a.github_token?"â€¢â€¢â€¢â€¢"+a.github_token.slice(-4):"ghp_â€¦paste your token"}">
                  ${a.github_token?'<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500">âœ“ Saved</span>':""}
                </div>
                <p class="text-[10px] text-gray-500 mt-1">Generate at: <a href="https://github.com/settings/tokens" target="_blank" class="text-blue-400 hover:underline">github.com/settings/tokens</a> (needs repo scope)</p>
              </div>
            </div>
            <button type="button" onclick="testGitHubConnection()" class="btn-press flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl transition">
              <i data-lucide="plug" class="w-4 h-4"></i> Test GitHub Connection
            </button>
          </div>

          <!-- â”€â”€ Hosting & Deploy Webhook â”€â”€ -->
          <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 space-y-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2">
              <i data-lucide="cloud-upload" class="w-4 h-4 text-blue-400"></i> Hosting & Auto-Deploy
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${[{id:"netlify",name:"Netlify",icon:"cloud",color:"teal"},{id:"vercel",name:"Vercel",icon:"triangle",color:"white"},{id:"github-pages",name:"GitHub Pages",icon:"github",color:"gray"},{id:"railway",name:"Railway",icon:"train",color:"violet"},{id:"render",name:"Render",icon:"server",color:"blue"}].map(i=>`
                <label class="flex items-center gap-2 p-3 glass-soft border ${(a.hosting_provider||"netlify")===i.id?"border-blue-500/40 bg-blue-500/5":"border-blue-500/10"} rounded-xl cursor-pointer hover:border-blue-500/30 transition">
                  <input type="radio" name="hosting_provider" value="${i.id}" ${(a.hosting_provider||"netlify")===i.id?"checked":""} class="accent-blue-500">
                  <i data-lucide="${i.icon}" class="w-4 h-4 text-gray-400"></i>
                  <span class="text-xs font-bold text-white">${i.name}</span>
                </label>`).join("")}
            </div>
            <div>
              <label class="lbl">Deploy Webhook URL</label>
              <input class="input-field" name="deploy_webhook" value="${n(a.deploy_webhook||"")}" placeholder="https://api.netlify.com/build_hooks/â€¦">
              <p class="text-[10px] text-gray-500 mt-1">Netlify: Site Settings â†’ Build hooks Â· Vercel: Project â†’ Settings â†’ Git â†’ Deploy Hooks</p>
            </div>
            <div>
              <label class="lbl">Production URL</label>
              <input class="input-field" name="production_url" value="${n(a.production_url||"")}" placeholder="https://yoursite.com">
            </div>
          </div>

          <!-- â”€â”€ Payment Settings â”€â”€ -->
          <div class="glass-soft border border-amber-500/15 rounded-2xl p-5 space-y-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2">
              <i data-lucide="credit-card" class="w-4 h-4 text-amber-400"></i> Payment Gateway Settings
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${[{id:"flutterwave",name:"Flutterwave",color:"amber"},{id:"stripe",name:"Stripe",color:"blue"},{id:"paypal",name:"PayPal",color:"blue"},{id:"paystack",name:"Paystack",color:"blue"},{id:"razorpay",name:"Razorpay",color:"blue"},{id:"manual",name:"Manual Bank Transfer",color:"gray"}].map(i=>`
                <label class="flex items-center gap-2 p-2.5 glass-soft border ${(a.payment_gateway||"flutterwave")===i.id?"border-amber-500/40 bg-amber-500/5":"border-blue-500/10"} rounded-xl cursor-pointer hover:border-amber-500/30 transition">
                  <input type="radio" name="payment_gateway" value="${i.id}" ${(a.payment_gateway||"flutterwave")===i.id?"checked":""} class="accent-amber-500">
                  <span class="text-xs font-bold text-white">${i.name}</span>
                </label>`).join("")}
            </div>
            <div id="payment-key-fields" class="form-grid form-grid-2">
              <div>
                <label class="lbl">Public / Publishable Key</label>
                <div class="relative">
                  <input type="password" class="input-field pr-16" name="payment_public_key" placeholder="${a.payment_public_key?"â€¢â€¢â€¢â€¢"+a.payment_public_key.slice(-4):"Paste public keyâ€¦"}">
                  ${a.payment_public_key?'<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500">âœ“ Saved</span>':""}
                </div>
              </div>
              <div>
                <label class="lbl">Secret / Private Key</label>
                <div class="relative">
                  <input type="password" class="input-field pr-16" name="payment_secret_key" placeholder="${a.payment_secret_key?"â€¢â€¢â€¢â€¢"+a.payment_secret_key.slice(-4):"Paste secret keyâ€¦"}">
                  ${a.payment_secret_key?'<span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500">âœ“ Saved</span>':""}
                </div>
              </div>
              <div>
                <label class="lbl">Currency</label>
                <select class="input-field" name="payment_currency">
                  ${["USD","EUR","GBP","NGN","KES","ZAR","GHS","ZMW","TZS","UGX"].map(i=>`<option value="${i}" ${(a.payment_currency||"USD")===i?"selected":""}>${i}</option>`).join("")}
                </select>
              </div>
              <div>
                <label class="lbl">Test / Live Mode</label>
                <select class="input-field" name="payment_mode">
                  <option value="test" ${(a.payment_mode||"test")==="test"?"selected":""}>ðŸ”§ Test Mode (sandbox)</option>
                  <option value="live" ${a.payment_mode==="live"?"selected":""}>ðŸš€ Live Mode (real money)</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="lbl">Webhook Secret (for payment verification)</label>
                <input type="password" class="input-field" name="payment_webhook_secret" placeholder="${a.payment_webhook_secret?"â€¢â€¢â€¢â€¢"+a.payment_webhook_secret.slice(-4):"Paste webhook secretâ€¦"}">
              </div>
            </div>
            <div class="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-[11px] text-amber-300">
              <strong>Flutterwave:</strong> flutterwave.com â†’ Dashboard â†’ API Settings<br>
              <strong>Stripe:</strong> dashboard.stripe.com â†’ Developers â†’ API Keys<br>
              <strong>PayPal:</strong> developer.paypal.com â†’ My Apps â†’ Create App<br>
              <strong>Paystack:</strong> dashboard.paystack.com â†’ Settings â†’ API Keys
            </div>
          </div>

          <!-- â”€â”€ Environment Variables Guide â”€â”€ -->
          <div class="glass-soft border border-gray-500/15 rounded-2xl p-5">
            <h3 class="text-sm font-black text-white mb-3 flex items-center gap-2">
              <i data-lucide="terminal" class="w-4 h-4 text-gray-400"></i> Environment Variables (.env)
            </h3>
            <p class="text-xs text-gray-400 mb-3">Add these to your <code class="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded">.env</code> file in your project root (never commit to GitHub):</p>
            <div class="bg-gray-950 border border-gray-800 rounded-xl p-4 font-mono text-[11px] text-gray-300 space-y-1 overflow-x-auto">
              <p class="text-gray-600"># Supabase (required)</p>
              <p>VITE_SUPABASE_URL=<span class="text-blue-400">https://your-project.supabase.co</span></p>
              <p>VITE_SUPABASE_ANON_KEY=<span class="text-blue-400">your-anon-key</span></p>
              <p class="text-gray-600 mt-2"># Payment</p>
              <p>VITE_FLUTTERWAVE_PUBLIC_KEY=<span class="text-amber-400">FLWPUBK_TEST-â€¦</span></p>
              <p>VITE_STRIPE_PUBLIC_KEY=<span class="text-amber-400">pk_test_â€¦</span></p>
              <p class="text-gray-600 mt-2"># AI (server-side only â€” Edge Functions)</p>
              <p>GEMINI_API_KEY=<span class="text-emerald-400">AIzaSyâ€¦</span></p>
            </div>
          </div>

          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm transition">
            ðŸ’¾ Save Deploy & Payment Settings
          </button>
        </form>
      </div>`,window.lucide&&lucide.createIcons()}catch(t){e&&(e.innerHTML=`<div class="p-6 text-red-400">${n(t.message)}</div>`)}}window.saveDeploySettings=async function(e){e.preventDefault();const t=e.target?.querySelector("[type=submit]");t&&(t.disabled=!0,t.innerHTML="Savingâ€¦");const a=new FormData(e.target),i=Object.fromEntries(a.entries()),o={},s=["github_token","payment_public_key","payment_secret_key","payment_webhook_secret"];for(const[l,d]of Object.entries(i))s.includes(l)?d&&!d.startsWith("â€¢")&&d.trim()!==""&&(o[l]=d.trim()):o[l]=d;const{error:r}=await c.from("site_settings").upsert({id:1,...o});if(t&&(t.disabled=!1,t.innerHTML="ðŸ’¾ Save Deploy & Payment Settings"),r){p(r.message,"error");return}p("Deploy & payment settings saved!"),At()};async function Si(e="deploy"){const{data:t}=await c.from("site_settings").select("deploy_webhook,production_url,github_repo").limit(1).maybeSingle();if(!t?.deploy_webhook)return p("No webhook URL set. Add your deploy webhook in the settings below.","info"),{ok:!1,reason:"missing_webhook"};let a=t.deploy_webhook;try{const i=new URL(a);e==="rebuild"&&i.searchParams.set("rebuild","1"),a=i.toString()}catch{e==="rebuild"&&(a+=(a.includes("?")?"&":"?")+"rebuild=1")}return{ok:!0,settings:t,hookUrl:a}}async function ce(e,t={}){const a=t.version||new Date().toISOString(),i={source:"admin-dashboard",mode:t.mode||"deploy",production_url:t.productionUrl||null,github_repo:t.githubRepo||null,webhook:t.webhook||null,message:t.message||null},{data:o,error:s}=await c.from("deployment_history").insert({version:a,status:e,triggered_by_email:A.user?.email||null,metadata:i,error_message:t.errorMessage||null}).select("id").limit(1).maybeSingle();return{data:o,error:s}}function Ee(e,t,a,i){if(!e)return;e.disabled=t;const o=e.querySelector("p.text-xs.font-black");o&&(o.textContent=t?a:i)}window.triggerDeploy=async function(e){const t=e?.currentTarget||document.querySelector("[data-deploy-btn]");Ee(t,!0,"Deployingâ€¦","Deploy Now");try{const a=await Si("deploy");if(!a.ok)return;const{settings:i,hookUrl:o}=a;await ce("preparing",{mode:"deploy",productionUrl:i.production_url,githubRepo:i.github_repo,webhook:o,message:"Deployment queued from admin UI"});const s=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({trigger:"deploy",source:"admin-dashboard",at:new Date().toISOString()})});if(s.ok)p("ðŸš€ Deployment triggered! Your site will be live in ~2 minutes."),await ce("deploying",{mode:"deploy",productionUrl:i.production_url,githubRepo:i.github_repo,webhook:o,message:"Webhook accepted deployment request"}),setTimeout(()=>At(),400);else{const r=`Webhook returned error: ${s.status}`;p(r,"error"),await ce("failed",{mode:"deploy",productionUrl:i.production_url,githubRepo:i.github_repo,webhook:o,errorMessage:r})}}catch(a){p("Deploy failed: "+a.message,"error"),await ce("failed",{mode:"deploy",errorMessage:a.message})}finally{Ee(t,!1,"Deployingâ€¦","Deploy Now")}};window.triggerRebuild=async function(e){const t=e?.currentTarget||document.querySelector("[data-rebuild-btn]");Ee(t,!0,"Rebuildingâ€¦","Rebuild Site");try{const a=await Si("rebuild");if(!a.ok)return;const{settings:i,hookUrl:o}=a;await ce("building",{mode:"rebuild",productionUrl:i.production_url,githubRepo:i.github_repo,webhook:o,message:"Rebuild requested from admin UI"});const s=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({trigger:"rebuild",source:"admin-dashboard",at:new Date().toISOString()})});if(s.ok)p("ðŸ”„ Rebuild triggered successfully."),await ce("deploying",{mode:"rebuild",productionUrl:i.production_url,githubRepo:i.github_repo,webhook:o,message:"Webhook accepted rebuild request"}),setTimeout(()=>At(),400);else{const r=`Rebuild webhook error: ${s.status}`;p(r,"error"),await ce("failed",{mode:"rebuild",productionUrl:i.production_url,githubRepo:i.github_repo,webhook:o,errorMessage:r})}}catch(a){p("Rebuild failed: "+a.message,"error"),await ce("failed",{mode:"rebuild",errorMessage:a.message})}finally{Ee(t,!1,"Rebuildingâ€¦","Rebuild Site")}};window.publishAndDeploy=async function(e){const t=e?.currentTarget||document.querySelector("[data-publish-easy-btn]");Ee(t,!0,"Publishingâ€¦","One-Click Publish");try{const a=document.getElementById("deploy-form");if(!a){p("Deploy form is not available. Reload and try again.","error");return}await window.saveDeploySettings({preventDefault(){},target:a}),await window.triggerDeploy()}catch(a){p("Publish failed: "+a.message,"error")}finally{Ee(t,!1,"Publishingâ€¦","One-Click Publish")}};window.reindexSearch=async function(){const t=(document.querySelector("[data-publish-easy-btn]")||document.querySelector("[data-rebuild-btn]"))?.querySelector("p.text-xs.font-black"),a=t?.textContent||"";t&&(t.textContent="Reindexingâ€¦");try{const{data:i,error:o}=await c.from("showroom_listings").select("id, updated_at").order("updated_at",{ascending:!1});if(o)return Y(o)?p("âš ï¸ Reindex blocked: database admin role rejected the read. Re-run the admin permission migration.","error"):p("Could not load listings to reindex: "+o.message,"error");const s=i||[];if(!s.length){p("No listings to reindex.");return}let r=0,l=0,d=!1;const u=40;for(let b=0;b<s.length;b+=u){const g=s.slice(b,b+u),{error:x}=await c.from("showroom_listings").update({updated_at:new Date().toISOString()}).in("id",g.map(f=>f.id));x?(Y(x)&&(d=!0),l+=g.length):r+=g.length,t&&(t.textContent=`Reindexingâ€¦ ${Math.min(b+u,s.length)}/${s.length}`)}if(d){p(`âš ï¸ Reindex partially blocked: database admin role rejected some writes. Re-run the admin permission migration. (${r}/${s.length} done)`,"error");return}p(`Search index rebuilt for ${r} listing${r!==1?"s":""}${l?` (${l} failed)`:""}.`,l?"error":"success")}catch(i){p("Reindex failed: "+i.message,"error")}finally{t&&(t.textContent=a)}};window.syncShowroomToDB=async function(){if(!Array.isArray(J)||!J.length){p("No static showroom listings found to sync.","info");return}const t=(document.querySelector("[data-publish-easy-btn]")||document.querySelector("[data-rebuild-btn]"))?.querySelector("p.text-xs.font-black"),a=t?.textContent||"";t&&(t.textContent="Syncingâ€¦");try{const{data:i,error:o}=await c.from("showroom_listings").select("property_id");if(o)return Y(o)?p("âš ï¸ Sync blocked: database admin role rejected the read. Re-run the admin permission migration.","error"):p("Could not load existing listings: "+o.message,"error");const s=new Set((i||[]).map(g=>g.property_id)),r=J.filter(g=>g&&g.property_id&&!s.has(g.property_id));if(!r.length){p("Showroom already in sync â€” no new listings to add.");return}let l=0,d=0,u=!1;const b=20;for(let g=0;g<r.length;g+=b){const x=r.slice(g,g+b).map(m=>({property_id:m.property_id,listing_type:m.listing_type||"product",category:m.category||null,subcategory:m.subcategory||null,title:m.title||"Untitled Listing",description:m.description||"",price:parseFloat(m.price)||0,currency:m.currency||"USD",country:m.country||"",country_code:m.country_code||"",state:m.state||"",city:m.city||"",town:m.town||"",product_location:m.product_location||"",latitude:m.latitude??null,longitude:m.longitude??null,property_type:m.property_type||null,listing_status:m.listing_status||"sale",bedrooms:m.bedrooms??null,bathrooms:m.bathrooms??null,building_size:m.building_size||"",land_size:m.land_size||"",parking_spaces:m.parking_spaces??null,furnished:m.furnished||"",features:Array.isArray(m.features)?m.features:[],tags:Array.isArray(m.tags)?m.tags:[],highlights:Array.isArray(m.highlights)?m.highlights:[],seo_keywords:Array.isArray(m.seo_keywords)?m.seo_keywords:[],images:Array.isArray(m.images)?m.images:[],brand:m.brand||null,color:m.color||null,size:m.size||null,condition:m.condition||null,warranty:m.warranty||null,availability_status:m.availability_status||"In Stock",stock_quantity:m.stock_quantity!=null?parseInt(m.stock_quantity,10):null,is_active:m.is_active!==!1,is_featured:!!m.is_featured,is_ai_generated:!!m.is_ai_generated,ai_generated_fields:Array.isArray(m.ai_generated_fields)?m.ai_generated_fields:[],specifications:m.specifications||{},created_at:m.created_at||new Date().toISOString()})),{error:f}=await c.from("showroom_listings").insert(x);f?(Y(f)&&(u=!0),d+=x.length):l+=x.length,t&&(t.textContent=`Syncingâ€¦ ${Math.min(g+b,r.length)}/${r.length}`)}if(u){p(`âš ï¸ Sync partially blocked: database admin role rejected some inserts. Re-run the admin permission migration. (${l}/${r.length} added)`,"error");return}p(`Showroom synced: ${l} new listing${l!==1?"s":""} added to the database${d?` (${d} failed)`:""}.`,d?"error":"success")}catch(i){p("Sync failed: "+i.message,"error")}finally{t&&(t.textContent=a)}};window.testGitHubConnection=async function(){const e=document.querySelector("[name=github_username]")?.value?.trim(),t=document.querySelector("[name=github_repo]")?.value?.trim();if(!e||!t){p("Enter your GitHub username and repo name first","info");return}try{const a=await fetch(`https://api.github.com/repos/${e}/${t}`);if(a.ok){const i=await a.json();p(`âœ“ Connected: ${i.full_name} (${i.visibility})`)}else a.status===404?p("Repository not found. Check username and repo name.","error"):p("GitHub API error: "+a.status,"error")}catch{p("Could not reach GitHub API","error")}};window.deployToProduction=window.triggerDeploy;window.rebuildSite=window.triggerRebuild;const Pi=30,O={category:null,page:0,query:""};async function Le(){const e=document.getElementById("content");if(!e)return;await Jt();const t=new Set(rt()),a=Fi();O.category||(O.category=a[0]?.slug||null);const i=0,o=O.query.trim().toLowerCase(),s=`
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-black text-white">Generated Catalog</h2>
        <p class="text-xs text-gray-500 mt-1">Deterministic storefront items. Hiding a listing removes it from the site everywhere â€” including direct links.</p>
      </div>
      <button onclick="catalogResetHidden()" class="btn-press px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition">Show All Hidden</button>
    </div>`,r=`
    <div class="flex flex-wrap gap-2">
      ${a.map(x=>`<button onclick="catalogSetCategory('${x.slug}')" class="btn-press px-3 py-1.5 rounded-xl text-xs font-bold border transition ${O.category===x.slug?"bg-blue-500/20 text-blue-200 border-blue-500/40":"bg-white/5 text-gray-400 border-white/10 hover:text-white"}">${n(x.name)}</button>`).join("")}
    </div>`,l=`
    <div class="flex flex-wrap items-center gap-2">
      <input id="catalog-search-input" class="input-field flex-1 min-w-[220px]" placeholder="Search title, id or subcategoryâ€¦" value="${n(O.query)}" onkeyup="if (event.key === 'Enter') catalogSearch()">
      <button onclick="catalogSearch()" class="btn-press px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition">Search</button>
    </div>`;let d=[];const u=d.length?d.map(x=>{const f=t.has(x.property_id),m=yt(x);return`
          <div class="flex items-center gap-3 p-3 rounded-xl border ${f?"border-red-500/25 bg-red-500/5":"border-white/10 bg-white/[0.02]"}">
            ${m?qe(m,"w-12 h-12 rounded-lg object-cover bg-gray-800 shrink-0"):xe("w-12 h-12 rounded-lg bg-gray-800 shrink-0")}
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-white truncate">${n(x.title)}</p>
              <p class="text-[11px] text-gray-500 truncate">${n(x.property_id)} Â· ${n(x.subcategory||x.category||"")} Â· ${Ka(x.price,"USD")}</p>
            </div>
            ${H(!f)}
            <button onclick="catalogToggle('${n(x.property_id)}')" class="btn-press px-3 py-1.5 rounded-xl text-xs font-bold border transition ${f?"bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25":"bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"}">
              ${f?"Show":"Hide"}
            </button>
          </div>`}).join(""):'<div class="text-center py-16 text-gray-500 text-sm">No catalog items match.</div>',b=o?1:Math.max(1,Math.ceil(i/Pi)),g=`
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-xs text-gray-500">${o?`${d.length} match`:`${i.toLocaleString()} items in ${n("")}`} Â· ${t.size} hidden</p>
      <div class="flex items-center gap-2">
        <button onclick="catalogPage(-1)" ${O.page<=0?"disabled":""} class="btn-press px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 text-gray-300 border border-white/10 hover:text-white disabled:opacity-40">Prev</button>
        <span class="text-xs text-gray-500">Page ${O.page+1} / ${b}</span>
        <button onclick="catalogPage(1)" ${O.page>=b-1?"disabled":""} class="btn-press px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 text-gray-300 border border-white/10 hover:text-white disabled:opacity-40">Next</button>
      </div>
    </div>`;e.innerHTML=`
    <div class="space-y-4 fade-in">
      ${s}
      ${r}
      ${l}
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-3 space-y-2">${u}</div>
      ${g}
    </div>`,window.lucide&&lucide.createIcons()}window.catalogSetCategory=function(e){O.category=e,O.page=0,O.query="",Le()};window.catalogSearch=function(){const e=document.getElementById("catalog-search-input");O.query=e?e.value:"",O.page=0,Le()};window.catalogPage=function(e){const a=O.query.trim()?1:Math.max(1,Math.ceil(0/Pi));O.page=Math.max(0,Math.min(a-1,O.page+e)),Le()};window.catalogToggle=async function(e){const t=!rt().includes(e),a=await La(e,t);p(t?"Listing hidden from storefront":"Listing restored",a.ok?"success":"info"),Le()};window.catalogResetHidden=async function(){await Ki(),p("All hidden catalog listings restored"),Le()};(function(){if(!(!window.history||!window.history.pushState)){try{window.history.replaceState({adminGuard:1},document.title,window.location.href),window.history.pushState({adminGuard:2},document.title,window.location.href)}catch{return}window.addEventListener("popstate",function(t){t.state&&t.state.adminGuard===1&&window.location.replace("/")})}})();async function Aa(){window.lucide&&lucide.createIcons(),Qa(),await Uo(),c.auth.onAuthStateChange((e,t)=>{if(e==="SIGNED_OUT"){A.user=null;const a=document.getElementById("login-screen");a&&(a.style.display="flex")}})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Aa):Aa();
