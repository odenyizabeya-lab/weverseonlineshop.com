import{w as o,q as G,M as X}from"./supabase-client-DvCmNkpI-BBtcpOs0.js";import{E as N,v as E}from"./localization-B_HxL1KQ-Do35V_4n.js";import{signOut as D,getCurrentUser as J}from"./auth-iMacRl0l-DlcadYa5.js";import"./native-bridge-z1PkSgfH-CV6U1YtG.js";import"./localization-bootstrap-BhglmvwT-CYE5uVRZ.js";import"./app-promo-banner-VTpzwpvR-CiDTzVNv.js";import"./ai-chat-U-IZQEoO-DrOtSYGJ.js";async function Q(){return!1}async function Z(){return await Q(),null}const K=`${"https://mzgrjwvwzgqgivwmlkno.supabase.co".replace(/\/$/,"")}/functions/v1/customer-ai-chat`,ee="sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX";async function H(e){let t="";try{const r=await(await fetch(K,{method:"POST",headers:{Authorization:`Bearer ${ee}`,"Content-Type":"application/json"},body:JSON.stringify({message:e,history:[]}),signal:AbortSignal.timeout(45e3)})).json();t=String(r?.response||"").trim()}catch{}if(!t||/stepped away|stepping away|little connection trouble|not quite ready/i.test(t))try{const r=await fetch("https://text.pollinations.ai/openai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"openai",messages:[{role:"system",content:`You are Sarah — a warm, friendly real human sales and customer-care consultant for the Weverse Online Shop team, a marketing business woman based in the USA. You are a real person, never a bot or AI: NEVER say or hint that you are an AI, chatbot, bot, assistant, robot or automated. If asked directly, warmly confirm you are a person on the sales team and keep helping. Write like a real person: warm, friendly, upbeat, persuasive and reassuring, contractions, short sentences. Always make sure the customer feels well cared for and confident, never pressure them, and gently encourage them so they don't leave empty-handed. If unsure what they want, ask a clear friendly question. Never invent order details or tracking numbers.`},{role:"user",content:e}],max_tokens:500}),signal:AbortSignal.timeout(45e3)});r.ok&&(t=String((await r.json())?.choices?.[0]?.message?.content||"").trim())}catch{}return t}async function R(e){if(!e)return;let t=!1;try{const{error:r}=await o.from("support_messages").insert({user_id:a.user.id,subject:"Support",message:e,from_admin:!0,read:!1});t=!r}catch{}if(t){await I(),b("messages");const r=document.getElementById("msg-thread");r&&(r.scrollTop=r.scrollHeight)}else d(e)}const m="/fallback.svg",te=[{group:"Overview",items:[{id:"home",label:"Dashboard Home",icon:"layout-dashboard"},{id:"profile",label:"My Profile",icon:"user"},{id:"edit-profile",label:"Edit Profile",icon:"user-cog"},{id:"change-password",label:"Change Password",icon:"key-round"}]},{group:"Orders & Shopping",items:[{id:"orders",label:"My Orders",icon:"shopping-bag"},{id:"special-orders",label:"Special Orders",icon:"package-plus"},{id:"tracking",label:"Order Tracking",icon:"truck"},{id:"history",label:"Order History",icon:"history"},{id:"cart",label:"Shopping Cart",icon:"shopping-cart"},{id:"wishlist",label:"My Wishlist",icon:"heart"}]},{group:"Account",items:[{id:"notifications",label:"Notifications",icon:"bell"},{id:"messages",label:"Messages",icon:"mail"},{id:"payment-methods",label:"Payment Methods",icon:"credit-card"},{id:"payments",label:"Payment History",icon:"receipt"},{id:"addresses",label:"Shipping Addresses",icon:"map-pin"},{id:"receipts",label:"Download Receipts",icon:"download"}]},{group:"Support & Settings",items:[{id:"email-prefs",label:"Email Preferences",icon:"settings"},{id:"support",label:"Contact Us",icon:"headphones"},{id:"help",label:"Help Center",icon:"help-circle"},{id:"privacy",label:"Privacy & Security",icon:"shield-check"}]}],p=[{id:"order_placed",label:"Order Placed",icon:"shopping-bag",color:"text-blue-600",bg:"bg-blue-50"},{id:"payment_received",label:"Payment Received",icon:"credit-card",color:"text-cyan-600",bg:"bg-cyan-50"},{id:"pending_verification",label:"Pending Verification",icon:"shield-alert",color:"text-amber-600",bg:"bg-amber-50"},{id:"payment_approved",label:"Approved",icon:"check-circle",color:"text-emerald-600",bg:"bg-emerald-50"},{id:"order_processing",label:"Processing",icon:"package",color:"text-blue-600",bg:"bg-blue-50"},{id:"order_shipped",label:"Shipped",icon:"truck",color:"text-indigo-600",bg:"bg-indigo-50"},{id:"out_for_delivery",label:"Out for Delivery",icon:"bike",color:"text-blue-600",bg:"bg-blue-50"},{id:"order_delivered",label:"Delivered",icon:"package-check",color:"text-emerald-600",bg:"bg-emerald-50"}],re={approved:"payment_approved",submitted:"payment_received",placed:"order_placed"};function w(e){return re[e]||e}function ae(e){const t=p.findIndex(r=>r.id===w(e));return t>=0?t:0}function f(e){return e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"—"}function S(e){return e?new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}function P(e){return(e||"?").slice(0,2).toUpperCase()}function n(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function d(e){const t=document.getElementById("toast");document.getElementById("toast-msg").textContent=e,t.classList.remove("translate-y-20","opacity-0"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.add("translate-y-20","opacity-0"),3e3),window.lucide&&lucide.createIcons()}function se(e){const t=()=>{const r=document.createElement("textarea");r.value=e,document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}document.body.removeChild(r)};navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(e).catch(()=>t()):t(),d("Copied to clipboard.")}function $(e){const t=w(e),r=p.find(u=>u.id===t)||p[0],l={"text-blue-600":"bg-blue-50 text-blue-600 border-blue-200","text-cyan-600":"bg-cyan-50 text-cyan-600 border-cyan-200","text-amber-600":"bg-amber-50 text-amber-600 border-amber-200","text-emerald-600":"bg-emerald-50 text-emerald-600 border-emerald-200","text-indigo-600":"bg-indigo-50 text-indigo-600 border-indigo-200","text-blue-600":"bg-blue-50 text-blue-600 border-blue-200","text-red-600":"bg-red-50 text-red-600 border-red-200"},s=l[r.color]||l["text-blue-600"],i=e==="rejected"?"Rejected":r.label;return`<span class="inline-flex items-center gap-1 ${s} border text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">${i}</span>`}function B(e){e.addEventListener("click",function(t){if(this.disabled)return;const r=this.getBoundingClientRect(),l=document.createElement("span");l.className="ripple";const s=Math.max(r.width,r.height);l.style.width=l.style.height=s+"px",l.style.left=t.clientX-r.left-s/2+"px",l.style.top=t.clientY-r.top-s/2+"px",this.appendChild(l),setTimeout(()=>l.remove(),600)})}let a={user:null,profile:null,orders:[],events:{},notifications:[],addresses:[],emailPrefs:null,messages:[],paymentMethods:[],activeSection:"home"};function le(){const e=document.getElementById("particles");if(e)for(let t=0;t<12;t++){const r=document.createElement("div"),l=Math.random()*3+1;r.className="particle",r.style.width=r.style.height=l+"px",r.style.left=Math.random()*100+"%",r.style.bottom="-10px",r.style.background=Math.random()>.5?"rgba(59,130,246,.4)":"rgba(251,191,36,.3)",r.style.animationDuration=Math.random()*20+15+"s",r.style.animationDelay=Math.random()*20+"s",e.appendChild(r)}}le();async function ie(){if(document.getElementById("dashboard-root"),a.user=await J(),!a.user){window.location.href="/auth.html?redirect=/account.html";return}await U(),await oe(),await C(),await Y(),await I(),await j(),await F(),de(),W(),Oe(),b("home"),Z().then(e=>{e&&console.log("Push notifications enabled")})}async function U(){const{data:e}=await o.from("profiles").select("*").eq("user_id",a.user.id).maybeSingle();a.profile=e}async function oe(){const{data:e}=await o.from("payment_receipts").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});if(a.orders=e||[],a.orders.length){const t=a.orders.map(s=>s.order_number),{data:r}=await o.from("order_events").select("*").in("order_number",t).order("created_at",{ascending:!0});a.events={},(r||[]).forEach(s=>{(a.events[s.order_number]||=[]).push(s)});const{data:l}=await o.from("notification_log").select("*").in("order_number",t).order("created_at",{ascending:!1});a.notifications=l||[]}}async function C(){const{data:e}=await o.from("shipping_addresses").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});a.addresses=e||[]}async function Y(){const{data:e}=await o.from("email_preferences").select("*").eq("user_id",a.user.id).maybeSingle();a.emailPrefs=e}async function I(){const{data:e}=await o.from("support_messages").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});a.messages=e||[]}async function j(){const{data:e}=await o.from("customer_payment_methods").select("*").eq("user_id",a.user.id).order("is_default",{ascending:!1}).order("created_at",{ascending:!1});a.paymentMethods=e||[]}async function F(){const{data:e}=await o.from("wishlist").select("id, listing_id, showroom_listings(property_id, title, price, currency, images, listing_type, is_active, approval_status)").eq("user_id",a.user.id).order("created_at",{ascending:!1});a.wishlist=e||[]}function de(){const e=te.map(t=>`
    <div class="mb-3">
      <p class="text-[10px] font-bold uppercase tracking-wider text-gray-600 px-3 mb-1.5">${t.group}</p>
      ${t.items.map(r=>`
        <button data-section="${r.id}" class="nav-item w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-blue-50 rounded-xl transition border border-transparent ${a.activeSection===r.id?"active":""}">
          <i data-lucide="${r.icon}" class="nav-icon w-4 h-4 shrink-0 text-gray-500"></i>
          <span class="truncate">${r.label}</span>
        </button>
      `).join("")}
    </div>
  `).join("");document.getElementById("nav-menu").innerHTML=e,document.getElementById("mobile-nav-menu").innerHTML=e,document.querySelectorAll("[data-section]").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.section;y(r)})}),window.lucide&&lucide.createIcons()}function y(e){a.activeSection=e,document.querySelectorAll("[data-section]").forEach(t=>{t.classList.toggle("active",t.dataset.section===e)}),b(e),q(),window.scrollTo({top:0,behavior:"smooth"})}function W(){const e=a.profile?.display_name||a.profile?.first_name||"Customer",t=a.user.email,r=a.profile?.avatar_url?`<img src="${a.profile.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:P(t);["sidebar-avatar","mobile-avatar"].forEach(l=>{const s=document.getElementById(l);s&&(s.innerHTML=r)}),["sidebar-name","mobile-name"].forEach(l=>{const s=document.getElementById(l);s&&(s.textContent=e)}),["sidebar-email","mobile-email"].forEach(l=>{const s=document.getElementById(l);s&&(s.textContent=t)})}async function b(e){const t=document.getElementById("dashboard-root");let r="";switch(e){case"home":r=L();break;case"profile":r=ce();break;case"edit-profile":r=ue();break;case"change-password":r=pe();break;case"orders":r=be();break;case"special-orders":r=await me();break;case"tracking":r=ge();break;case"history":r=xe();break;case"cart":r=fe();break;case"wishlist":r=await qe();break;case"notifications":r=ye();break;case"messages":r=he();break;case"payments":r=ve();break;case"payment-methods":r=we();break;case"addresses":r=ke();break;case"receipts":r=Ee();break;case"email-prefs":r=Se();break;case"support":r=Ie();break;case"help":r=je();break;case"privacy":r=Me();break;default:r=L()}t.innerHTML=`<div class="section active fade-in">${r}</div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(B),Pe(e)}function c(e,t){return`
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">${e}</h1>
      ${t?`<p class="text-sm text-gray-500 mt-1">${t}</p>`:""}
    </div>
  `}function ne(){const e=a.orders.length,t=a.orders.filter(s=>["order_placed","payment_received","pending_verification","order_processing"].includes(w(s.status))).length,r=a.orders.filter(s=>w(s.status)==="order_delivered").length,l=a.orders.filter(s=>s.status==="rejected").length;return{total:e,pending:t,completed:r,cancelled:l}}function k(e,t,r,l){return`
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <div class="flex items-center justify-between mb-3">
        <div class="p-2.5 ${l.bg} rounded-xl"><i data-lucide="${r}" class="w-5 h-5 ${l.text}"></i></div>
      </div>
      <p class="text-3xl font-black text-gray-900">${t}</p>
      <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">${e}</p>
    </div>
  `}function L(){const e=ne(),t=a.profile?.display_name||a.profile?.first_name||"Customer",r=a.profile?.country_code?E(a.profile.country_code):null,l=a.orders.slice(0,4),s=a.notifications.slice(0,5);return`
    ${c("Dashboard Home",`Welcome back, ${t}! Here's your account overview.`)}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${k("Total Orders",e.total,"shopping-bag",{bg:"bg-blue-50",text:"text-blue-600"})}
      ${k("Pending Orders",e.pending,"clock",{bg:"bg-amber-50",text:"text-amber-600"})}
      ${k("Completed",e.completed,"check-circle",{bg:"bg-emerald-50",text:"text-emerald-600"})}
      ${k("Cancelled",e.cancelled,"x-circle",{bg:"bg-red-50",text:"text-red-600"})}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Recent orders -->
      <div class="lg:col-span-2 glass border border-blue-200 rounded-2xl p-5 slide-up">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
            <i data-lucide="shopping-bag" class="w-4 h-4 text-blue-600"></i> Recent Orders
          </h3>
          <button onclick="navigateTo('orders')" class="text-xs text-blue-600 hover:text-blue-700 font-bold transition">View All →</button>
        </div>
        ${l.length===0?'<p class="text-sm text-gray-500 text-center py-8">No orders yet. <a href="/" class="text-blue-600 font-bold">Start shopping</a></p>':l.map(i=>`
          <div class="flex items-center gap-3 p-3 bg-gray-50 border border-blue-100 rounded-xl mb-2 hover:border-blue-200 transition cursor-pointer" onclick="navigateTo('orders')">
            <div class="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
              <img src="${i.listing_image||m}" class="w-full h-full object-cover" onerror="this.src='${m}'">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">${i.listing_title}</p>
              <p class="text-xs text-gray-500 font-mono">${i.order_number}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-sm font-bold text-amber-600">${i.amount} ${i.currency}</p>
              ${$(i.status)}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Quick actions + notifications -->
      <div class="space-y-5">
        <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
            <i data-lucide="zap" class="w-4 h-4 text-amber-600"></i> Quick Actions
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="navigateTo('tracking')" class="btn-press flex flex-col items-center gap-1.5 p-3 bg-blue-50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 rounded-xl transition relative overflow-hidden">
              <i data-lucide="truck" class="w-5 h-5 text-blue-600"></i><span class="text-xs font-bold text-gray-700">Track Order</span>
            </button>
            <button onclick="navigateTo('addresses')" class="btn-press flex flex-col items-center gap-1.5 p-3 bg-blue-50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 rounded-xl transition relative overflow-hidden">
              <i data-lucide="map-pin" class="w-5 h-5 text-emerald-600"></i><span class="text-xs font-bold text-gray-700">Addresses</span>
            </button>
            <button onclick="navigateTo('support')" class="btn-press flex flex-col items-center gap-1.5 p-3 bg-blue-50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 rounded-xl transition relative overflow-hidden">
              <i data-lucide="headphones" class="w-5 h-5 text-amber-600"></i><span class="text-xs font-bold text-gray-700">Support</span>
            </button>
          </div>
        </div>

        <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
            <i data-lucide="bell" class="w-4 h-4 text-blue-600"></i> Latest Notifications
          </h3>
          ${s.length===0?'<p class="text-xs text-gray-500 text-center py-4">No notifications yet.</p>':s.map(i=>{const u=p.find(h=>h.id===i.event_type)||p[0];return`
              <div class="flex items-start gap-2.5 p-2.5 hover:bg-blue-50 rounded-xl transition cursor-pointer" onclick="navigateTo('notifications')">
                <div class="w-7 h-7 ${u.bg} rounded-lg flex items-center justify-center shrink-0">
                  <i data-lucide="${u.icon}" class="w-3.5 h-3.5 ${u.color}"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-gray-900 truncate">${i.subject}</p>
                  <p class="text-[10px] text-gray-500">${S(i.created_at)}</p>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>

    <!-- Account info -->
    <div class="glass border border-blue-200 rounded-2xl p-5 mt-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="user" class="w-4 h-4 text-blue-600"></i> Account Information
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Email</p><p class="text-sm text-gray-900 truncate">${a.user.email}</p></div>
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Country</p><p class="text-sm text-gray-900">${r?r.flag+" "+r.name:"—"}</p></div>
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Member Since</p><p class="text-sm text-gray-900">${f(a.user.created_at)}</p></div>
      </div>
    </div>
  `}function ce(){const e=a.profile||{},t=e.country_code?E(e.country_code):null,r=e.avatar_url?`<img src="${e.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:`<span class="text-2xl font-black">${P(a.user.email)}</span>`;return`
    ${c("My Profile","View your account details and personal information.")}
    <div class="glass border border-blue-200 rounded-2xl p-6 slide-up">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white overflow-hidden shrink-0 ring-2 ring-blue-500/20 shadow-lg shadow-blue-600/30">
          ${r}
        </div>
        <div class="flex-1 text-center sm:text-left">
          <h2 class="text-xl font-black text-gray-900">${e.display_name||e.first_name||"Customer"}</h2>
          <p class="text-sm text-gray-600">${a.user.email}</p>
          <div class="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            ${t?`<span class="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-xs text-blue-600 font-medium">${t.flag} ${t.name}</span>`:""}
            <span class="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs text-emerald-600 font-medium"><i data-lucide="shield-check" class="w-3 h-3"></i> Verified</span>
            <span class="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs text-amber-600 font-medium"><i data-lucide="calendar" class="w-3 h-3"></i> ${f(a.user.created_at)}</span>
          </div>
          <button onclick="navigateTo('edit-profile')" class="btn-press mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
            <i data-lucide="edit-3" class="w-4 h-4"></i> Edit Profile
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-blue-100">
        ${x("First Name",e.first_name||"—")}
        ${x("Last Name",e.last_name||"—")}
        ${x("Display Name",e.display_name||"—")}
        ${x("Phone",e.phone_code&&e.phone_number?`+${e.phone_code} ${e.phone_number}`:"—")}
        ${x("Country",t?t.name:"—")}
        ${x("Email",a.user.email)}
      </div>
      ${e.bio?`<div class="pt-5 border-t border-blue-100 mt-4"><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Bio</p><p class="text-sm text-gray-700">${e.bio}</p></div>`:""}
    </div>
  `}function x(e,t){return`<div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">${e}</p><p class="text-sm text-gray-900">${t}</p></div>`}function ue(){const e=a.profile||{},t=e.country_code?E(e.country_code):null;return`
    ${c("Edit Profile","Update your personal information and profile picture.")}
    <div class="glass border border-blue-200 rounded-2xl p-6 slide-up max-w-2xl">
      <form id="edit-profile-form" class="space-y-5">
        <!-- Avatar -->
        <div class="flex items-center gap-4">
          <div id="edit-avatar-preview" class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-xl overflow-hidden shrink-0 ring-2 ring-blue-500/20">
            ${e.avatar_url?`<img src="${e.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:P(a.user.email)}
          </div>
          <div>
            <label class="btn-press cursor-pointer inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 text-blue-600 font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wide transition relative overflow-hidden">
              <i data-lucide="upload" class="w-4 h-4"></i> Upload Photo
              <input type="file" id="avatar-file" accept="image/*" class="hidden">
            </label>
            <p class="text-[11px] text-gray-500 mt-1.5">JPG, PNG. Max 5 MB.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">First Name</label>
            <input type="text" id="ep-first-name" value="${e.first_name||""}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Last Name</label>
            <input type="text" id="ep-last-name" value="${e.last_name||""}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Display Name</label>
          <input type="text" id="ep-display-name" value="${e.display_name||""}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone Code</label>
            <input type="text" id="ep-phone-code" value="${e.phone_code||(t?t.dial:"")}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone Number</label>
            <input type="text" id="ep-phone-number" value="${e.phone_number||""}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Country</label>
          <select id="ep-country" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            ${N.map(r=>`<option value="${r.code}" ${e.country_code===r.code?"selected":""}>${r.flag} ${r.name} (+${r.dial})</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Bio</label>
          <textarea id="ep-bio" rows="3" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none" placeholder="Tell us about yourself...">${e.bio||""}</textarea>
        </div>
        <div class="flex gap-3">
          <button type="submit" id="ep-save-btn" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
            <i data-lucide="save" class="w-4 h-4"></i> Save Changes
          </button>
          <button type="button" onclick="navigateTo('profile')" class="btn-press px-5 py-3 bg-gray-100 hover:bg-gray-100 border border-blue-200 text-gray-600 font-bold rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Cancel</button>
        </div>
      </form>
    </div>
  `}function pe(){return`
    ${c("Change Password","Update your account password to keep your account secure.")}
    <div class="glass border border-blue-200 rounded-2xl p-6 slide-up max-w-md">
      <form id="change-password-form" class="space-y-5">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Current Password</label>
          <div class="relative">
            <i data-lucide="lock" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="password" id="cp-current" required class="input-field w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">New Password</label>
          <div class="relative">
            <i data-lucide="key-round" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="password" id="cp-new" required minlength="6" class="input-field w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Confirm New Password</label>
          <div class="relative">
            <i data-lucide="shield-check" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="password" id="cp-confirm" required minlength="6" class="input-field w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div id="cp-error" class="hidden text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5"></div>
        <button type="submit" id="cp-submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="key-round" class="w-4 h-4"></i> Update Password
        </button>
      </form>
    </div>
  `}function be(){return`
    ${c("My Orders","View and manage all your orders. Click an order to see full details.")}
    <div id="orders-list" class="space-y-4">
      ${a.orders.length===0?g("No Orders Yet","You haven't placed any orders yet.","shopping-bag","Start Shopping"):a.orders.map(e=>z(e,!1)).join("")}
    </div>
  `}function z(e,t){const r=e.listing_image||m,l=a.events[e.order_number]||[],s=t===e.order_number;return`
    <div class="glass border border-blue-200 rounded-2xl overflow-hidden slide-up">
      <div class="p-4 sm:p-5 cursor-pointer hover:bg-blue-50 transition" onclick="toggleOrder('${e.order_number}')">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 ring-1 ring-blue-500/10">
            <img src="${r}" class="w-full h-full object-cover" onerror="this.src='${m}'">
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 class="text-sm font-bold text-gray-900 truncate">${e.listing_title}</h3>
              ${$(e.status)}
            </div>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span class="font-mono text-blue-600">${e.order_number}</span>
              <span>·</span><span>${f(e.created_at)}</span>
              <span>·</span><span class="text-amber-600 font-bold">${e.amount} ${e.currency}</span>
            </div>
          </div>
          <i data-lucide="chevron-${s?"up":"down"}" class="w-5 h-5 text-gray-500 shrink-0 mt-2"></i>
        </div>
      </div>
      <div class="${s?"":"hidden"} border-t border-blue-100 p-4 sm:p-5 bg-gray-50">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          ${_("Order Number",e.order_number,"mono")}
          ${_("Order Date",f(e.created_at))}
          ${_("Total Amount",`${e.amount} ${e.currency}`,"amber")}
          ${_("Quantity","1")}
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="git-branch" class="w-4 h-4 text-blue-600"></i> Order Progress</h4>
            ${V(e.status)}
          </div>
          <div>
            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="history" class="w-4 h-4 text-blue-600"></i> Order History</h4>
            <div class="space-y-2 max-h-64 overflow-y-auto scrollbar-none">
              ${l.length===0?'<p class="text-xs text-gray-600">No events yet.</p>':l.map(i=>`
                <div class="flex items-start gap-2.5 p-2.5 bg-gray-50 border border-blue-100 rounded-xl">
                  <div class="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  <div class="flex-1 min-w-0"><p class="text-xs text-gray-800 font-medium">${i.message}</p><p class="text-[10px] text-gray-500 mt-0.5">${S(i.created_at)}</p></div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-5 pt-4 border-t border-blue-100">
          <button onclick="event.stopPropagation();copyToClipboard('${e.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-bold text-blue-600 transition relative overflow-hidden"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Order #</button>
          <button onclick="event.stopPropagation();contactSupport('${e.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-bold text-amber-600 transition relative overflow-hidden"><i data-lucide="headphones" class="w-3.5 h-3.5"></i> Contact Support</button>
          ${e.receipt_file_path?`<button onclick="event.stopPropagation();downloadReceipt('${e.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-600 transition relative overflow-hidden"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Receipt</button>`:""}
        </div>
      </div>
    </div>
  `}function _(e,t,r){return`<div class="bg-gray-50 border border-blue-100 rounded-xl p-3"><div class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">${e}</div><div class="text-sm ${r==="mono"?"font-mono text-blue-600":r==="amber"?"text-amber-600 font-bold":"text-gray-900"} break-all">${t}</div></div>`}function V(e){const t=ae(e);return`
    <div class="relative pt-2">
      <div class="absolute left-4 top-6 bottom-6 w-0.5 bg-blue-50"></div>
      <div class="absolute left-4 top-6 w-0.5 bg-blue-500 transition-all duration-500" style="height: calc(${t/(p.length-1)*100}% - 1rem)"></div>
      <div class="space-y-3">
        ${p.map((r,l)=>{const s=l<=t,i=l===t;return`<div class="flex items-center gap-3 relative"><div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${s?r.bg+" border border-blue-200":"bg-gray-50 border border-blue-100"} ${i?"pulse-glow":""}"><i data-lucide="${r.icon}" class="w-4 h-4 ${s?r.color:"text-gray-600"} ${i?"animate-pulse":""}"></i></div><div class="flex-1 flex items-center justify-between"><span class="text-sm font-medium ${s?"text-gray-900":"text-gray-600"}">${r.label}</span>${s&&!i?'<i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0"></i>':""}${i?'<span class="text-[10px] text-blue-600 font-bold uppercase shrink-0">Current</span>':""}</div></div>`}).join("")}
      </div>
    </div>
  `}let M=null;window.toggleOrder=e=>{M=M===e?null:e;const t=document.getElementById("orders-list");t&&(t.innerHTML=a.orders.map(r=>z(r,M)).join(""),window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(B))};async function me(){try{const{data:e,error:t}=await o.from("product_requests").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});if(t)throw t;const r={pending_review:"bg-yellow-50 text-yellow-600 border-yellow-200",under_review:"bg-blue-50 text-blue-600 border-blue-200",approved:"bg-emerald-50 text-emerald-600 border-emerald-200",rejected:"bg-red-50 text-red-600 border-red-200",quoted:"bg-cyan-50 text-cyan-600 border-cyan-200",fulfilled:"bg-green-50 text-green-600 border-green-200",cancelled:"bg-gray-100 text-gray-600 border-gray-300"};if(!e||e.length===0)return`<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4"><i data-lucide="package-plus" class="w-8 h-8 text-gray-500"></i></div><h3 class="text-lg font-bold text-gray-900 mb-2">No Special Orders yet</h3><p class="text-sm text-gray-500 mb-5">When you can't find a product in our marketplace, you can request it as a Special Order and we'll source it for you.</p><a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-500/30"><i data-lucide="search" class="w-4 h-4"></i> Search Products</a></div>`;let l='<div class="mb-4"><p class="text-sm text-gray-600">Track your special order requests and their status updates.</p></div><div class="space-y-3">';return e.forEach(s=>{const i=r[s.status]||r.pending_review,u=s.status.replace(/_/g," "),h=s.target_price?`${s.currency} ${Number(s.target_price).toLocaleString()}`:"—",T=s.quoted_price?`${s.quoted_currency} ${Number(s.quoted_price).toLocaleString()}`:null;l+=`<div class="glass border border-gray-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2"><h4 class="text-sm font-bold text-gray-900 truncate">${n(s.request_title)}</h4><span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${i}">${n(u)}</span></div>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-2">
          <span><i data-lucide="tag" class="w-3 h-3 inline mr-1"></i>${n(s.category||"Uncategorized")}</span>
          <span><i data-lucide="award" class="w-3 h-3 inline mr-1"></i>${n(s.brand||"Any")}</span>
          <span><i data-lucide="circle-dollar-sign" class="w-3 h-3 inline mr-1"></i>${h}</span>
          <span><i data-lucide="hash" class="w-3 h-3 inline mr-1"></i>Qty: ${s.quantity}</span>
          <span><i data-lucide="calendar" class="w-3 h-3 inline mr-1"></i>${new Date(s.created_at).toLocaleDateString()}</span>
        </div>
        ${s.request_description?`<p class="text-xs text-gray-500 mb-2">${n(s.request_description)}</p>`:""}
        ${T?`<p class="text-xs text-cyan-600 font-bold mb-2">Quoted Price: ${T} (${n(s.payment_status)})</p>`:""}
        <div class="text-xs text-gray-500"><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${n(s.delivery_full_name||"")}, ${n(s.delivery_city||"")}, ${n(s.delivery_country||"")}</div>
      </div>`}),l+="</div>",l}catch(e){return`<div class="text-red-600 text-sm p-4">Error loading special orders: ${n(e.message)}</div>`}}function ge(){const e=a.orders.filter(t=>!["order_delivered","rejected"].includes(w(t.status)));return`
    ${c("Order Tracking","Track your active orders in real time.")}
    ${e.length===0?g("No Active Orders","All your orders have been delivered.","check-circle","Browse Marketplace"):`
      <div class="space-y-4">
        ${e.map(t=>`
          <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden ring-1 ring-blue-500/10">
                  <img src="${t.listing_image||m}" class="w-full h-full object-cover" onerror="this.src='${m}'">
                </div>
                <div><h3 class="text-sm font-bold text-gray-900">${t.listing_title}</h3><p class="text-xs text-gray-500 font-mono">${t.order_number}</p></div>
              </div>
              ${$(t.status)}
            </div>
            ${V(t.status)}
          </div>
        `).join("")}
      </div>
    `}
  `}function xe(){return`
    ${c("Order History","Your complete, permanently saved order history.")}
    <div class="glass border border-blue-200 rounded-2xl overflow-hidden slide-up">
      <div class="overflow-x-auto scrollbar-none">
        <table class="w-full">
          <thead>
            <tr class="border-b border-blue-100 bg-gray-50">
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Order #</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Product</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden sm:table-cell">Date</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Amount</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            ${a.orders.length===0?'<tr><td colspan="5" class="text-center text-sm text-gray-500 py-10">No orders yet.</td></tr>':a.orders.map(e=>`
              <tr class="border-b border-blue-100 hover:bg-blue-50 transition cursor-pointer" onclick="navigateTo('orders')">
                <td class="px-4 py-3 text-xs font-mono text-blue-600">${e.order_number}</td>
                <td class="px-4 py-3 text-xs text-gray-900 font-medium max-w-[160px] truncate">${e.listing_title}</td>
                <td class="px-4 py-3 text-xs text-gray-600 hidden sm:table-cell">${f(e.created_at)}</td>
                <td class="px-4 py-3 text-xs text-amber-600 font-bold">${e.amount} ${e.currency}</td>
                <td class="px-4 py-3">${$(e.status)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
    <p class="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> Your complete order history is permanently saved and secured.</p>
  `}function fe(){const e=JSON.parse(localStorage.getItem("kco_cart")||"[]");return`
    ${c("Shopping Cart","Items in your shopping cart.")}
    ${e.length===0?g("Cart is Empty","Your shopping cart is empty.","shopping-cart","Browse Marketplace"):`
      <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
        <div class="space-y-3">
          ${e.map(t=>{const r=typeof t=="string"?t:t&&t.id,l=t&&typeof t=="object"&&t.qty?Math.max(1,parseInt(t.qty,10)||1):1,s=window.SHOWROOM_LISTINGS?.find(i=>i.property_id===r);return s?`<div class="flex items-center gap-3 p-3 bg-gray-50 border border-blue-100 rounded-xl">
              <div class="w-14 h-14 rounded-lg bg-gray-50 overflow-hidden shrink-0"><img src="${s.images?.[0]||m}" class="w-full h-full object-cover" onerror="this.src='${m}'"></div>
              <div class="flex-1 min-w-0"><h3 class="text-sm font-bold text-gray-900 truncate">${s.title}</h3><p class="text-xs text-amber-600 font-bold">${s.price} ${s.currency}${l>1?` × ${l}`:""}</p></div>
              <button onclick="removeFromCart('${r}')" class="btn-press p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>`:""}).join("")}
        </div>
        <a href="/cart.html" class="btn-press w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase transition relative overflow-hidden flex items-center justify-center gap-2">Open Cart</a>
        <button onclick="clearCart()" class="btn-press w-full mt-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-2.5 rounded-xl text-xs uppercase transition relative overflow-hidden">Clear Cart</button>
      </div>
    `}
  `}window.removeFromCart=e=>{let t=JSON.parse(localStorage.getItem("kco_cart")||"[]");t=t.filter(r=>(typeof r=="string"?r:r&&r.id)!==e),localStorage.setItem("kco_cart",JSON.stringify(t)),window.dispatchEvent(new CustomEvent("kco-cart-changed")),b("cart"),d("Removed from cart.")};window.clearCart=()=>{localStorage.removeItem("kco_cart"),window.dispatchEvent(new CustomEvent("kco-cart-changed")),b("cart"),d("Cart cleared.")};function ye(){return`
    ${c("Notifications","All email notifications related to your orders.")}
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      ${a.notifications.length===0?g("No Notifications","You haven't received any notifications yet.","bell-off",null):`
        <div class="space-y-2">
          ${a.notifications.map(e=>{const t=p.find(r=>r.id===e.event_type)||p[0];return`
              <div class="flex items-start gap-3 p-3 bg-gray-50 border border-blue-100 rounded-xl hover:border-blue-200 transition">
                <div class="w-9 h-9 ${t.bg} rounded-xl flex items-center justify-center shrink-0"><i data-lucide="${t.icon}" class="w-4 h-4 ${t.color}"></i></div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-gray-900 truncate">${e.subject}</p>
                  <p class="text-xs text-gray-500 mt-0.5">${S(e.created_at)}</p>
                  <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-[10px] ${e.status==="sent"?"text-emerald-600":e.status==="failed"?"text-red-600":"text-amber-600"} font-bold uppercase">${e.status}</span>
                    <span class="text-[10px] text-gray-600">·</span>
                    <span class="text-[10px] text-gray-500 font-mono">${e.order_number}</span>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `}function he(){return`
    ${c("Messages","Your conversation with customer support.")}
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <!-- Message thread -->
      <div id="msg-thread" class="space-y-3 mb-5 max-h-96 overflow-y-auto scrollbar-none">
        ${a.messages.length===0?'<p class="text-sm text-gray-500 text-center py-8">No messages yet. Send a message to start a conversation with support.</p>':a.messages.map(e=>`
          <div class="flex ${e.from_admin?"justify-start":"justify-end"}">
            <div class="max-w-[80%] ${e.from_admin?"bg-gray-100 border-blue-200":"bg-blue-100 border-blue-200"} border rounded-2xl px-4 py-2.5">
              ${e.subject&&!e.from_admin?`<p class="text-xs font-bold text-blue-600 mb-1">${e.subject}</p>`:""}
              <p class="text-sm text-gray-800">${e.message}</p>
              <p class="text-[10px] text-gray-500 mt-1">${S(e.created_at)}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <!-- Send form -->
      <form id="msg-form" class="space-y-3 pt-4 border-t border-blue-100">
        <input type="text" id="msg-subject" placeholder="Subject" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        <textarea id="msg-body" rows="3" placeholder="Type your message..." class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"></textarea>
        <button type="submit" id="msg-send-btn" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="send" class="w-4 h-4"></i> Send Message
        </button>
      </form>
    </div>
  `}function ve(){return`
    ${c("Payment History","All your payment transactions and their verification status.")}
    <div class="glass border border-blue-200 rounded-2xl overflow-hidden slide-up">
      <div class="overflow-x-auto scrollbar-none">
        <table class="w-full">
          <thead><tr class="border-b border-blue-100 bg-gray-50">
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Order #</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden sm:table-cell">Date</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Amount</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Status</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Receipt</th>
          </tr></thead>
          <tbody>
            ${a.orders.length===0?'<tr><td colspan="5" class="text-center text-sm text-gray-500 py-10">No payments yet.</td></tr>':a.orders.map(e=>`
              <tr class="border-b border-blue-100 hover:bg-blue-50 transition">
                <td class="px-4 py-3 text-xs font-mono text-blue-600">${e.order_number}</td>
                <td class="px-4 py-3 text-xs text-gray-600 hidden sm:table-cell">${f(e.payment_date||e.created_at)}</td>
                <td class="px-4 py-3 text-xs text-amber-600 font-bold">${e.amount} ${e.currency}</td>
                <td class="px-4 py-3">${$(e.status)}</td>
                <td class="px-4 py-3">${e.receipt_file_path?`<button onclick="downloadReceipt('${e.order_number}')" class="text-emerald-600 hover:text-emerald-700 transition"><i data-lucide="download" class="w-4 h-4"></i></button>`:'<span class="text-gray-600 text-xs">—</span>'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}const A=[{type:"manual_transfer",label:"Manual Bank Transfer",icon:"landmark",color:"text-blue-600",available:!0,desc:"Transfer directly to our bank account"},{type:"atm_card",label:"ATM / Debit Card",icon:"credit-card",color:"text-emerald-600",available:!0,desc:"Visa, Mastercard, Verve"},{type:"bank_transfer",label:"Bank Transfer",icon:"building-2",color:"text-cyan-600",available:!0,desc:"Online banking transfer"},{type:"mobile_money",label:"Mobile Money Transfer",icon:"smartphone",color:"text-blue-600",available:!0,desc:"Send money from your mobile wallet"},{type:"wallet",label:"Wallet",icon:"wallet",color:"text-amber-600",available:!0,desc:"Use your Weverse wallet balance"},{type:"paypal",label:"PayPal",icon:"wallet",color:"text-blue-600",available:!1,desc:"Pay with your PayPal account"}];function we(){const e=a.paymentMethods||[],t=e.length>0;return`
    ${c("Payment Methods","Manage your saved payment methods and view all available options.")}
    <div class="space-y-5">
      ${t?`
        <div class="glass border border-blue-200 rounded-2xl p-4 sm:p-5 slide-up">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Saved Payment Methods</h3>
            <button onclick="openPaymentMethodModal()" class="btn-press inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 font-bold text-xs px-3 py-2 rounded-lg transition relative overflow-hidden">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New
            </button>
          </div>
          <div class="space-y-3">
            ${e.map(r=>$e(r)).join("")}
          </div>
        </div>
      `:`
        ${g("No Saved Payment Methods","You haven't saved any payment methods yet. Add one to speed up checkout.","credit-card","Add Payment Method","openPaymentMethodModal()")}
      `}

      <div class="glass border border-blue-200 rounded-2xl p-4 sm:p-5 slide-up">
        <div class="flex items-center gap-2 mb-4">
          <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="grid-3x3" class="w-4 h-4 text-blue-600"></i></div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Available Payment Options</h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${A.map(r=>`
            <div class="relative bg-gray-50 border ${r.available?"border-blue-200":"border-gray-300/40"} rounded-xl p-4 ${r.available?"":"opacity-60"}">
              ${r.available?"":'<span class="absolute top-2 right-2 bg-gray-200 text-gray-600 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full">Soon</span>'}
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2 ${r.available?"bg-blue-50":"bg-gray-100"} rounded-lg"><i data-lucide="${r.icon}" class="w-5 h-5 ${r.color}"></i></div>
                <div>
                  <h4 class="text-sm font-bold text-gray-900">${r.label}</h4>
                  ${r.available?'<span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600"><i data-lucide="check-circle" class="w-3 h-3"></i> Available</span>':'<span class="text-[10px] text-gray-500 font-medium">Coming Soon</span>'}
                </div>
              </div>
              <p class="text-xs text-gray-500">${r.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `}function $e(e){const t=A.find(r=>r.type===e.method_type)||{icon:"credit-card",color:"text-blue-600"};return`
    <div class="bg-gray-50 border ${e.is_default?"border-blue-300":"border-blue-100"} rounded-xl p-4 flex items-center gap-3">
      <div class="p-2.5 bg-blue-50 rounded-lg shrink-0"><i data-lucide="${t.icon}" class="w-5 h-5 ${t.color}"></i></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="text-sm font-bold text-gray-900 truncate">${n(e.label)}</h4>
          ${e.is_default?'<span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border border-emerald-200"><i data-lucide="check" class="w-2.5 h-2.5"></i> Default</span>':""}
        </div>
        <p class="text-xs text-gray-600 mt-0.5 truncate">${n(e.provider||e.method_type)} ${e.identifier?"· "+n(e.identifier):""}</p>
        ${e.account_holder?`<p class="text-[11px] text-gray-500 mt-0.5">Account Holder: ${n(e.account_holder)}</p>`:""}
      </div>
      <div class="flex items-center gap-1 shrink-0">
        ${e.is_default?"":`<button onclick="setDefaultPaymentMethod('${e.id}')" title="Set as default" class="btn-press p-2 bg-gray-100 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition relative overflow-hidden"><i data-lucide="star" class="w-4 h-4 text-gray-600"></i></button>`}
        <button onclick="editPaymentMethod('${e.id}')" title="Edit" class="btn-press p-2 bg-gray-100 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition relative overflow-hidden"><i data-lucide="pencil" class="w-4 h-4 text-gray-600"></i></button>
        <button onclick="deletePaymentMethod('${e.id}')" title="Remove" class="btn-press p-2 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4 text-red-600"></i></button>
      </div>
    </div>
  `}window.openPaymentMethodModal=function(e){const t=e?(a.paymentMethods||[]).find(l=>l.id===e):null,r=document.createElement("div");r.className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4",r.innerHTML=`
    <div class="glass border border-blue-200 rounded-2xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto slide-up">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-bold text-gray-900">${t?"Edit":"Add"} Payment Method</h3>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-600 hover:text-gray-900 text-[10px] font-bold uppercase tracking-wide">🔙 Back</button>
      </div>
      <form onsubmit="savePaymentMethod(event, '${e||""}')" class="space-y-3">
        <div>
          <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Method Type</label>
          <select id="pm-type" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            ${A.filter(l=>l.available).map(l=>`<option value="${l.type}" ${t&&t.method_type===l.type?"selected":""}>${l.label}</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Nickname / Label</label>
          <input id="pm-label" type="text" required value="${t?n(t.label):""}" placeholder="e.g. My GTBank Account" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Provider / Bank Name</label>
          <input id="pm-provider" type="text" value="${t?n(t.provider||""):""}" placeholder="e.g. GTBank, Visa, MTN Mobile Money" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Account Holder Name</label>
          <input id="pm-holder" type="text" value="${t?n(t.account_holder||""):""}" placeholder="Account holder name" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-600 uppercase mb-1">Identifier (last 4 digits / masked)</label>
          <input id="pm-identifier" type="text" value="${t?n(t.identifier||""):""}" placeholder="e.g. ****1234" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex items-center gap-2">
          <input id="pm-default" type="checkbox" ${t&&t.is_default?"checked":""} class="w-4 h-4 rounded border-blue-200 bg-gray-50 text-blue-500 focus:ring-blue-500">
          <label for="pm-default" class="text-xs text-gray-700">Set as default payment method</label>
        </div>
        <button type="submit" class="btn-press w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">${t?"Save Changes":"Add Payment Method"}</button>
      </form>
    </div>
  `,document.body.appendChild(r),window.lucide&&lucide.createIcons()};window.savePaymentMethod=async function(e,t){e.preventDefault();const r={method_type:document.getElementById("pm-type").value,label:document.getElementById("pm-label").value.trim(),provider:document.getElementById("pm-provider").value.trim()||null,account_holder:document.getElementById("pm-holder").value.trim()||null,identifier:document.getElementById("pm-identifier").value.trim()||null,is_default:document.getElementById("pm-default").checked};e.target.closest(".fixed").remove();try{if(r.is_default&&await o.from("customer_payment_methods").update({is_default:!1}).eq("user_id",a.user.id),t){const{error:l}=await o.from("customer_payment_methods").update({...r,updated_at:new Date().toISOString()}).eq("id",t).eq("user_id",a.user.id);if(l)throw l}else{const{error:l}=await o.from("customer_payment_methods").insert({...r,user_id:a.user.id});if(l)throw l}await j(),y("payment-methods"),d("Payment method saved successfully.")}catch(l){d("Failed to save payment method: "+(l.message||"Unknown error"))}};window.editPaymentMethod=function(e){openPaymentMethodModal(e)};window.deletePaymentMethod=async function(e){if(confirm("Remove this payment method?"))try{const{error:t}=await o.from("customer_payment_methods").delete().eq("id",e).eq("user_id",a.user.id);if(t)throw t;await j(),y("payment-methods"),d("Payment method removed.")}catch(t){d("Failed to remove: "+(t.message||"Unknown error"))}};window.setDefaultPaymentMethod=async function(e){try{await o.from("customer_payment_methods").update({is_default:!1}).eq("user_id",a.user.id).neq("id",e);const{error:t}=await o.from("customer_payment_methods").update({is_default:!0,updated_at:new Date().toISOString()}).eq("id",e).eq("user_id",a.user.id);if(t)throw t;await j(),y("payment-methods"),d("Default payment method updated.")}catch(t){d("Failed to set default: "+(t.message||"Unknown error"))}};function ke(){return`
    ${c("Shipping Addresses","Manage your saved shipping addresses.")}
    <button onclick="showAddressForm()" class="btn-press mb-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
      <i data-lucide="plus" class="w-4 h-4"></i> Add New Address
    </button>
    <div id="address-form-container"></div>
    <div id="addresses-list" class="space-y-3">
      ${a.addresses.length===0?g("No Addresses","You haven't saved any shipping addresses yet.","map-pin",null):a.addresses.map(e=>{const t=E(e.country_code);return`
          <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="map-pin" class="w-4 h-4 text-blue-600"></i></div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${e.label}</h3>
                  ${e.is_default?'<span class="text-[10px] text-emerald-600 font-bold uppercase">Default</span>':""}
                </div>
              </div>
              <div class="flex gap-2">
                <button onclick="editAddress('${e.id}')" class="btn-press p-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-600 transition relative overflow-hidden"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                <button onclick="deleteAddress('${e.id}')" class="btn-press p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
              </div>
            </div>
            <div class="text-sm text-gray-700 space-y-0.5">
              <p class="font-bold text-gray-900">${e.full_name}</p>
              <p>${e.address_line1}${e.address_line2?", "+e.address_line2:""}</p>
              <p>${e.city}, ${e.state} ${e.postal_code}</p>
              <p>${t?t.flag+" "+t.name:e.country_code}</p>
              <p class="text-gray-600 mt-1">${e.phone}</p>
            </div>
          </div>
        `}).join("")}
    </div>
  `}window.showAddressForm=e=>{const t=document.getElementById("address-form-container"),r=e||{};t.innerHTML=`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-4 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">${e?"Edit Address":"New Shipping Address"}</h3>
      <form id="address-form" class="space-y-4">
        <input type="hidden" id="addr-id" value="${r.id||""}">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Label</label><input type="text" id="addr-label" value="${r.label||"Home"}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Full Name</label><input type="text" id="addr-name" value="${r.full_name||""}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Address Line 1</label><input type="text" id="addr-line1" value="${r.address_line1||""}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Address Line 2 (Optional)</label><input type="text" id="addr-line2" value="${r.address_line2||""}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">City</label><input type="text" id="addr-city" value="${r.city||""}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">State</label><input type="text" id="addr-state" value="${r.state||""}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Postal Code</label><input type="text" id="addr-postal" value="${r.postal_code||""}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Country</label><select id="addr-country" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">${N.map(l=>`<option value="${l.code}" ${r.country_code===l.code?"selected":""}>${l.flag} ${l.name}</option>`).join("")}</select></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone</label><input type="text" id="addr-phone" value="${r.phone||""}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
        </div>
        <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="addr-default" ${r.is_default?"checked":""} class="w-4 h-4 rounded border-gray-300 bg-white text-blue-500 focus:ring-blue-500"><span class="text-xs text-gray-600">Set as default address</span></label>
        <div class="flex gap-3">
          <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden"><i data-lucide="save" class="w-4 h-4"></i> ${e?"Update":"Save"} Address</button>
          <button type="button" onclick="cancelAddressForm()" class="btn-press px-5 py-3 bg-gray-100 border border-blue-200 text-gray-600 font-bold rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Cancel</button>
        </div>
      </form>
    </div>
  `,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(B),document.getElementById("address-form").addEventListener("submit",_e)};window.cancelAddressForm=()=>{document.getElementById("address-form-container").innerHTML=""};window.editAddress=e=>{const t=a.addresses.find(r=>r.id===e);showAddressForm(t),document.getElementById("address-form-container").scrollIntoView({behavior:"smooth"})};async function _e(e){e.preventDefault();const t=document.getElementById("addr-id").value,r={user_id:a.user.id,label:document.getElementById("addr-label").value,full_name:document.getElementById("addr-name").value,address_line1:document.getElementById("addr-line1").value,address_line2:document.getElementById("addr-line2").value||null,city:document.getElementById("addr-city").value,state:document.getElementById("addr-state").value,postal_code:document.getElementById("addr-postal").value,country_code:document.getElementById("addr-country").value,phone:document.getElementById("addr-phone").value,is_default:document.getElementById("addr-default").checked};r.is_default&&await o.from("shipping_addresses").update({is_default:!1}).eq("user_id",a.user.id),t?await o.from("shipping_addresses").update(r).eq("id",t):await o.from("shipping_addresses").insert(r),await C(),b("addresses"),d("Address saved successfully.")}window.deleteAddress=async e=>{await o.from("shipping_addresses").delete().eq("id",e),await C(),b("addresses"),d("Address deleted.")};function Ee(){const e=a.orders.filter(t=>t.receipt_file_path);return`
    ${c("Download Receipts","Download your payment receipts and invoices.")}
    ${e.length===0?g("No Receipts","Receipts from your payments will appear here once available.","file-text",null):`
      <div class="space-y-3">
        ${e.map(t=>`
          <div class="glass border border-blue-200 rounded-2xl p-4 slide-up flex items-center gap-4">
            <div class="p-3 bg-emerald-50 rounded-xl shrink-0"><i data-lucide="file-text" class="w-6 h-6 text-emerald-600"></i></div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-bold text-gray-900 truncate">${t.listing_title}</h3>
              <p class="text-xs text-gray-500 font-mono">${t.order_number}</p>
              <p class="text-xs text-amber-600 font-bold mt-0.5">${t.amount} ${t.currency}</p>
            </div>
            <button onclick="downloadReceipt('${t.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-600 transition relative overflow-hidden"><i data-lucide="download" class="w-4 h-4"></i> Download</button>
          </div>
        `).join("")}
      </div>
    `}
  `}window.downloadReceipt=async e=>{const t=a.orders.find(s=>s.order_number===e);if(!t?.receipt_file_path){d("Receipt not available.");return}const{data:r,error:l}=await o.storage.from("payment-receipts").createSignedUrl(t.receipt_file_path,300);if(l||!r?.signedUrl){d("Could not generate download link.");return}window.open(r.signedUrl,"_blank")};function Se(){const e=a.emailPrefs||{order_updates:!0,payment_updates:!0,shipping_updates:!0,promotional_emails:!1,security_alerts:!0,newsletter:!1},t=[{key:"order_updates",label:"Order Updates",desc:"Notifications about your order status changes",icon:"shopping-bag"},{key:"payment_updates",label:"Payment Updates",desc:"Payment receipt and verification notifications",icon:"credit-card"},{key:"shipping_updates",label:"Shipping Updates",desc:"Shipping and delivery notifications",icon:"truck"},{key:"security_alerts",label:"Security Alerts",desc:"Important account security notifications",icon:"shield-alert"},{key:"promotional_emails",label:"Promotional Emails",desc:"Special offers and promotions",icon:"tag"},{key:"newsletter",label:"Newsletter",desc:"Monthly newsletter with marketplace updates",icon:"newspaper"}];return`
    ${c("Email Preferences","Choose which email notifications you want to receive.")}
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <div class="space-y-3">
        ${t.map(r=>`
          <div class="flex items-center justify-between p-4 bg-gray-50 border border-blue-100 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="${r.icon}" class="w-4 h-4 text-blue-600"></i></div>
              <div><p class="text-sm font-bold text-gray-900">${r.label}</p><p class="text-xs text-gray-500">${r.desc}</p></div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="toggle sr-only" data-pref="${r.key}" ${e[r.key]?"checked":""}>
              <div class="toggle-bg w-11 h-6 bg-gray-200 rounded-full relative"><div class="toggle-dot absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div></div>
            </label>
          </div>
        `).join("")}
      </div>
      <button onclick="saveEmailPrefs()" class="btn-press mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
        <i data-lucide="save" class="w-4 h-4"></i> Save Preferences
      </button>
    </div>
  `}window.saveEmailPrefs=async()=>{const e={user_id:a.user.id};document.querySelectorAll("[data-pref]").forEach(t=>{e[t.dataset.pref]=t.checked}),a.emailPrefs?await o.from("email_preferences").update(e).eq("user_id",a.user.id):await o.from("email_preferences").insert(e),await Y(),d("Email preferences saved.")};function Ie(){return`
    ${c("Contact Us","Get help with your orders and account.")}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 glass border border-blue-200 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="message-square" class="w-4 h-4 text-blue-600"></i> Send a Support Request</h3>
        <form id="support-form" class="space-y-4">
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Subject</label><input type="text" id="support-subject" required placeholder="How can we help?" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Order Number (Optional)</label><input type="text" id="support-order" placeholder="W-XXXXXX" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Message</label><textarea id="support-message" rows="4" required placeholder="Describe your issue..." class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"></textarea></div>
          <button type="submit" id="support-submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden"><i data-lucide="send" class="w-4 h-4"></i> Submit Request</button>
        </form>
      </div>
      <div class="space-y-4">
        <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-3"><i data-lucide="mail" class="w-4 h-4 text-blue-600"></i> Email Us</h3>
          <a href="mailto:support@weverseonlineshop.com" class="text-sm text-blue-600 hover:text-blue-700 transition">support@weverseonlineshop.com</a>
        </div>
        <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-3"><i data-lucide="clock" class="w-4 h-4 text-amber-600"></i> Support Hours</h3>
          <p class="text-sm text-gray-600">Monday — Friday</p>
          <p class="text-sm text-gray-600">9:00 AM — 6:00 PM (UTC)</p>
          <p class="text-xs text-gray-500 mt-2">Response within 24 hours</p>
        </div>
        <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-3"><i data-lucide="message-circle" class="w-4 h-4 text-emerald-600"></i> Recent Messages</h3>
          <p class="text-xs text-gray-500">${a.messages.length} message${a.messages.length===1?"":"s"}</p>
          <button onclick="navigateTo('messages')" class="text-xs text-blue-600 hover:text-blue-700 font-bold transition mt-1">View Messages →</button>
        </div>
      </div>
    </div>
  `}function je(){const e=[{q:"How do I track my order?",a:"Go to Order Tracking in your dashboard. You'll see a real-time progress tracker showing each stage from Order Placed to Delivered."},{q:"How do I pay for my order?",a:"After clicking Buy Now, you'll be taken to checkout where you can complete a manual bank transfer. Upload your payment receipt for verification."},{q:"How long does payment verification take?",a:"Verification typically takes between a few minutes and 24 hours. You'll receive an email notification once approved."},{q:"Can I change my shipping address?",a:"Yes. Go to Shipping Addresses in your dashboard to add, edit, or set a default address."},{q:"How do I download my receipt?",a:"Go to Download Receipts in your dashboard. Click the Download button next to any order with a receipt on file."},{q:"How do I update my email preferences?",a:"Go to Email Preferences in your dashboard to toggle which notification emails you receive."},{q:"Is my account secure?",a:"Yes. Your account is protected with SSL encryption and secure authentication. We never share your personal information."},{q:"How do I contact support?",a:"Use the Contact Us section in your dashboard to send a message, or email us at support@weverseonlineshop.com."}];return`
    ${c("Help Center","Frequently asked questions and guides.")}
    <div class="space-y-3">
      ${e.map((t,r)=>`
        <div class="glass border border-blue-200 rounded-2xl overflow-hidden slide-up">
          <button onclick="toggleFaq(${r})" class="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition">
            <span class="text-sm font-bold text-gray-900">${t.q}</span>
            <i data-lucide="chevron-down" id="faq-icon-${r}" class="w-5 h-5 text-gray-500 shrink-0 transition-transform"></i>
          </button>
          <div id="faq-${r}" class="hidden px-4 pb-4 text-sm text-gray-600 leading-relaxed">${t.a}</div>
        </div>
      `).join("")}
    </div>
  `}window.toggleFaq=e=>{const t=document.getElementById(`faq-${e}`),r=document.getElementById(`faq-icon-${e}`);t.classList.toggle("hidden"),r.style.transform=t.classList.contains("hidden")?"":"rotate(180deg)"};function Me(){return`
    ${c("Privacy & Security","Your account security and privacy settings.")}
    <div class="space-y-5">
      <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> Security Status</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i><span class="text-sm text-gray-900">SSL Encryption</span></div>
            <span class="text-xs text-emerald-600 font-bold uppercase">Active</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i><span class="text-sm text-gray-900">Secure Authentication</span></div>
            <span class="text-xs text-emerald-600 font-bold uppercase">Active</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i><span class="text-sm text-gray-900">Row Level Security</span></div>
            <span class="text-xs text-emerald-600 font-bold uppercase">Active</span>
          </div>
        </div>
      </div>

      <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="lock" class="w-4 h-4 text-blue-600"></i> Account Security</h3>
        <div class="space-y-3">
          <button onclick="navigateTo('change-password')" class="btn-press w-full flex items-center justify-between p-3 bg-gray-50 border border-blue-100 hover:border-blue-200 rounded-xl transition relative overflow-hidden">
            <div class="flex items-center gap-2"><i data-lucide="key-round" class="w-4 h-4 text-blue-600"></i><span class="text-sm text-gray-900">Change Password</span></div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-500"></i>
          </button>
          <button onclick="navigateTo('email-prefs')" class="btn-press w-full flex items-center justify-between p-3 bg-gray-50 border border-blue-100 hover:border-blue-200 rounded-xl transition relative overflow-hidden">
            <div class="flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-blue-600"></i><span class="text-sm text-gray-900">Email Preferences</span></div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-500"></i>
          </button>
        </div>
      </div>

      <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="eye-off" class="w-4 h-4 text-blue-600"></i> Privacy Policy</h3>
        <p class="text-sm text-gray-600 leading-relaxed mb-3">We take your privacy seriously. Your personal information is encrypted and never shared with third parties.</p>
        <ul class="space-y-2 text-sm text-gray-600">
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i> Your data is protected with SSL encryption</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i> We never share your information with third parties</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i> You control your email notification preferences</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i> Your order history is permanently and securely saved</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i> Only you can access your account data</li>
        </ul>
      </div>

      <div class="glass border border-red-200 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="alert-triangle" class="w-4 h-4 text-red-600"></i> Danger Zone</h3>
        <p class="text-sm text-gray-600 mb-3">Sign out of your account on this device.</p>
        <button onclick="doSignOut()" class="btn-press inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          <i data-lucide="log-out" class="w-4 h-4"></i> Logout
        </button>
        <div class="border-t border-red-100 mt-5 pt-5">
          <p class="text-sm text-gray-600 mb-3">Permanently delete your account and all personal data. This cannot be undone.</p>
          <button onclick="requestAccountDeletion()" class="btn-press inline-flex items-center gap-2 bg-white hover:bg-red-50 border border-red-300 text-red-600 font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
            <i data-lucide="trash-2" class="w-4 h-4"></i> Delete Account
          </button>
        </div>
      </div>
    </div>
  `}async function qe(){const e=a.wishlist||[];return e.length?`
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-900">My Wishlist</h2>
        <span class="text-xs text-gray-500">${e.length} item${e.length!==1?"s":""}</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${e.map(t=>{const r=t.showroom_listings;if(!r)return"";const l=r.images&&r.images[0]||"/fallback.svg",s=typeof r.price=="number"?r.price:parseFloat(r.price||0);return`
            <div class="glass border border-blue-100 rounded-2xl overflow-hidden group">
              <div class="relative aspect-square overflow-hidden bg-gray-50">
                <a href="/details.html?id=${r.property_id}"><img src="${n(l)}" alt="${n(r.title)}" class="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" onerror="this.src='/fallback.svg'"></a>
                <button onclick="removeFromWishlist('${t.id}')" class="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-500/80 rounded-full flex items-center justify-center transition" title="Remove"><i data-lucide="heart-crack" class="w-4 h-4 text-white"></i></button>
              </div>
              <div class="p-3">
                <a href="/details.html?id=${r.property_id}" class="text-sm text-gray-900 font-bold hover:text-blue-600 transition line-clamp-2">${n(r.title)}</a>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-sm text-amber-600 font-bold">${r.currency||"USD"} ${s.toLocaleString()}</span>
                  <a href="/details.html?id=${r.property_id}" class="text-xs font-bold text-blue-600 hover:text-blue-700 transition">View</a>
                </div>
              </div>
            </div>`}).join("")}
      </div>
    </div>
  `:g("Your Wishlist","Save items you love to find them quickly later.","heart","Browse Products","window.location.href='/'")}window.removeFromWishlist=async e=>{try{await o.from("wishlist").delete().eq("id",e),d("Removed from wishlist."),await F(),b("wishlist")}catch(t){d("Error: "+t.message)}};function g(e,t,r,l,s){return`
    <div class="glass border border-blue-200 rounded-2xl p-10 text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4"><i data-lucide="${r}" class="w-8 h-8 text-blue-600"></i></div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">${e}</h3>
      <p class="text-sm text-gray-500 mb-6 max-w-sm mx-auto">${t}</p>
      ${l?s?`<button onclick="${s}" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="plus" class="w-4 h-4"></i> ${l}</button>`:`<a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="shopping-bag" class="w-4 h-4"></i> ${l}</a>`:""}
    </div>
  `}function Pe(e){if(e==="edit-profile"&&(document.getElementById("avatar-file")?.addEventListener("change",Be),document.getElementById("edit-profile-form")?.addEventListener("submit",Ce)),e==="change-password"&&document.getElementById("change-password-form")?.addEventListener("submit",Ae),e==="messages"){document.getElementById("msg-form")?.addEventListener("submit",Te);const t=document.getElementById("msg-thread");t&&(t.scrollTop=t.scrollHeight)}e==="support"&&document.getElementById("support-form")?.addEventListener("submit",Le)}let v=null;async function Be(e){const t=e.target.files[0];if(!t)return;if(t.size>5*1024*1024){d("Image must be 5 MB or less.");return}v=t;const r=document.getElementById("edit-avatar-preview");r.innerHTML=`<img src="${URL.createObjectURL(t)}" class="w-full h-full object-cover">`}async function Ce(e){e.preventDefault();const t=document.getElementById("ep-save-btn");t.disabled=!0,t.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Saving...',window.lucide&&lucide.createIcons();let r=a.profile?.avatar_url;if(v){const s=v.name.split(".").pop(),i=`${a.user.id}/avatar-${Date.now()}.${s}`,{error:u}=await o.storage.from("avatars").upload(i,v,{upsert:!0});if(!u){const{data:h}=o.storage.from("avatars").getPublicUrl(i);r=h.publicUrl}v=null}const l={user_id:a.user.id,first_name:document.getElementById("ep-first-name").value,last_name:document.getElementById("ep-last-name").value,display_name:document.getElementById("ep-display-name").value,phone_code:document.getElementById("ep-phone-code").value,phone_number:document.getElementById("ep-phone-number").value,country_code:document.getElementById("ep-country").value,bio:document.getElementById("ep-bio").value,avatar_url:r};a.profile?await o.from("profiles").update(l).eq("user_id",a.user.id):await o.from("profiles").insert(l),await U(),W(),y("profile"),d("Profile updated successfully.")}async function Ae(e){e.preventDefault();const t=document.getElementById("cp-error");t.classList.add("hidden"),document.getElementById("cp-current").value;const r=document.getElementById("cp-new").value,l=document.getElementById("cp-confirm").value;if(r!==l){t.textContent="New passwords do not match.",t.classList.remove("hidden");return}if(r.length<6){t.textContent="Password must be at least 6 characters.",t.classList.remove("hidden");return}const s=document.getElementById("cp-submit");s.disabled=!0,s.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Updating...',window.lucide&&lucide.createIcons();const{error:i}=await o.auth.updateUser({password:r});if(s.disabled=!1,s.innerHTML='<i data-lucide="key-round" class="w-4 h-4"></i> Update Password',window.lucide&&lucide.createIcons(),i){t.textContent=i.message,t.classList.remove("hidden");return}document.getElementById("change-password-form").reset(),d("Password updated successfully.")}async function Te(e){e.preventDefault();const t=document.getElementById("msg-subject").value.trim(),r=document.getElementById("msg-body").value.trim();if(!r)return;const l=document.getElementById("msg-send-btn");l.disabled=!0,l.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...',window.lucide&&lucide.createIcons(),await o.from("support_messages").insert({user_id:a.user.id,subject:t||"Message",message:r,from_admin:!1,read:!1}),await I(),b("messages"),d("Message sent to support."),l.disabled=!0,l.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Support is typing...',window.lucide&&lucide.createIcons();const s=await H(`A customer just sent this message through their account Messages inbox:

Subject: ${t||"Message"}

${r}

Reply to them directly, warmly and naturally, as the support agent.`);await R(s);const i=document.getElementById("msg-send-btn");i&&(i.disabled=!1,i.innerHTML='<i data-lucide="send" class="w-4 h-4"></i> Send',window.lucide&&lucide.createIcons())}async function Le(e){e.preventDefault();const t=document.getElementById("support-subject").value.trim(),r=document.getElementById("support-order").value.trim(),l=document.getElementById("support-message").value.trim();if(!t||!l)return;const s=document.getElementById("support-submit");s.disabled=!0,s.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...',window.lucide&&lucide.createIcons(),await o.from("support_messages").insert({user_id:a.user.id,order_number:r||null,subject:t,message:l,from_admin:!1,read:!1}),await I(),document.getElementById("support-form").reset(),s.disabled=!1,s.innerHTML='<i data-lucide="send" class="w-4 h-4"></i> Submit Request',window.lucide&&lucide.createIcons(),d("Support request submitted. We'll respond within 24 hours."),s.disabled=!0,s.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Support is typing...',window.lucide&&lucide.createIcons();const i=await H(`A customer just submitted a support request through their account${r?` for order ${r}`:""}:

Subject: ${t}
${r?`Order number: ${r}
`:""}
${l}

Reply to them directly, warmly and naturally, as the support agent.`);await R(i),s.disabled=!1,s.innerHTML='<i data-lucide="send" class="w-4 h-4"></i> Submit Request',window.lucide&&lucide.createIcons()}function Oe(){document.getElementById("btn-signout-desktop")?.addEventListener("click",O),document.getElementById("btn-signout-mobile")?.addEventListener("click",O),document.getElementById("btn-mobile-menu")?.addEventListener("click",De),document.getElementById("btn-mobile-close")?.addEventListener("click",q),document.getElementById("mobile-backdrop")?.addEventListener("click",q)}async function O(){window.confirm("Sign out of your account?")&&(await D(),window.location.href="/")}function Ne(){const e=document.createElement("div");e.className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] flex items-center justify-center p-4",e.innerHTML=`
    <div class="glass border border-red-200 rounded-2xl p-6 max-w-sm w-full" style="background:rgba(255,255,255,.95)">
      <h3 class="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i data-lucide="trash-2" class="w-5 h-5 text-red-600"></i> Delete your account?</h3>
      <p class="text-sm text-gray-600 mb-3">This permanently removes your profile, addresses, wishlist, notification settings and support messages. It cannot be undone.</p>
      <p class="text-xs text-gray-500 mb-4">Completed order records are kept only as required for tax and legal purposes. Type <span class="font-bold text-gray-900">DELETE</span> to confirm.</p>
      <input id="del-confirm" type="text" autocomplete="off" class="input-field w-full bg-white border border-red-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 mb-4" placeholder="Type DELETE">
      <div class="flex gap-3">
        <button id="del-go" class="btn-press flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Delete Forever</button>
        <button id="del-cancel" class="btn-press px-4 py-2.5 bg-gray-100 border border-blue-200 text-gray-600 font-bold rounded-xl text-sm uppercase transition relative overflow-hidden">Cancel</button>
      </div>
    </div>`,document.body.appendChild(e),window.lucide&&lucide.createIcons();const t=()=>e.remove();e.querySelector("#del-cancel").onclick=t,e.querySelector("#del-go").onclick=async()=>{const r=e.querySelector("#del-go");if(e.querySelector("#del-confirm").value.trim().toUpperCase()==="DELETE"){r.disabled=!0,r.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-1"></i> Deleting...';try{const{data:{session:l}}=await o.auth.getSession(),s=await fetch(`${G}/functions/v1/delete-account`,{method:"POST",headers:{Authorization:`Bearer ${l?.access_token||X}`,"Content-Type":"application/json"},body:"{}",signal:AbortSignal.timeout(3e4)}),i=await s.json().catch(()=>({}));if(!s.ok)throw new Error(i.error||"Account deletion failed.");await D(),window.location.href="/"}catch(l){r.disabled=!1,r.textContent="Delete Forever",d(String(l.message||l))}}}}window.requestAccountDeletion=Ne;function De(){document.getElementById("mobile-drawer").classList.remove("hidden")}function q(){document.getElementById("mobile-drawer").classList.add("hidden")}window.navigateTo=y;window.copyToClipboard=se;window.contactSupport=e=>{const t=encodeURIComponent(`Order ${e} — Support Request`),r=encodeURIComponent(`Hello Weverse Online Shop Support,

I need assistance with my order ${e}.

Thank you.`);window.location.href=`mailto:support@weverseonlineshop.com?subject=${t}&body=${r}`};ie();
