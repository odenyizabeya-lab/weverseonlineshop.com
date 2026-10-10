import{H as f,O as d,E as k,R as h,D as w,V as v,J as L,z as E,w as I,Z as C,F as B,Y as z}from"./localization-B_HxL1KQ-Do35V_4n.js";let u=!1;function $(){if(document.getElementById("kco-loc-styles"))return;const e=document.createElement("style");e.id="kco-loc-styles",e.textContent=`
    @keyframes kcoLocPulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    @keyframes kcoLocSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes kcoLocFadeIn { from { opacity:0; } to { opacity:1; } }
    .kco-loc-fab { animation: kcoLocFadeIn 0.4s ease; }
    .kco-loc-modal { animation: kcoLocSlideUp 0.3s ease; }
    .kco-loc-overlay { animation: kcoLocFadeIn 0.2s ease; }
    .kco-loc-dot { animation: kcoLocPulse 2s ease-in-out infinite; }
    .kco-loc-search:focus { border-color: rgba(59,130,246,0.5); box-shadow: 0 0 0 2px rgba(59,130,246,0.15); }
    .kco-loc-list::-webkit-scrollbar { width: 6px; }
    .kco-loc-list::-webkit-scrollbar-track { background: transparent; }
    .kco-loc-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
    .kco-loc-list::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
    .kco-loc-item:hover { background: rgba(59,130,246,0.1); }
    .kco-loc-tab { transition: all 0.2s ease; }
    .kco-loc-tab.active { background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.4); color: #60a5fa; }
  `,document.head.appendChild(e)}function j(){if(document.getElementById("kco-loc-fab"))return;const e=document.createElement("button");e.id="kco-loc-fab",e.className="kco-loc-fab fixed bottom-5 left-5 z-[55] flex items-center gap-2 px-3 py-2.5 rounded-xl text-white text-xs font-semibold shadow-lg transition-all hover:scale-105",e.style.background="#1e293b",e.style.border="1px solid rgba(255,255,255,0.12)",e.setAttribute("aria-label","Change location, language, or currency"),e.innerHTML='<span id="kco-loc-flag" class="text-base leading-none">🇺🇸</span><span id="kco-loc-lang" class="text-[11px] uppercase tracking-wide text-gray-300">EN</span><i data-lucide="chevron-up" class="w-3.5 h-3.5 text-gray-500"></i>',e.onclick=H,document.body.appendChild(e),window.lucide&&lucide.createIcons()}function g(){const e=d(),o=document.getElementById("kco-loc-flag"),c=document.getElementById("kco-loc-lang");o&&(o.textContent=e.flag),c&&(c.textContent=e.language.toUpperCase())}function N(){if(document.getElementById("kco-loc-modal"))return;const e=document.createElement("div");e.id="kco-loc-modal",e.className="kco-loc-overlay fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4",e.style.display="none",e.innerHTML=`
    <div class="kco-loc-modal w-full sm:max-w-md bg-slate-900 border border-blue-500/20 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-white/10" style="background:linear-gradient(135deg,#1e1e2e 0%,#1a1a2e 50%,#16213e 100%)">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:rgba(59,130,246,0.15)">
            <i data-lucide="globe" class="w-4 h-4 text-blue-400"></i>
          </div>
          <h3 class="text-sm font-bold text-white">Your Location</h3>
        </div>
        <button id="kco-loc-close" class="h-8 px-2 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition text-[10px] font-bold uppercase tracking-wide" aria-label="Close">
          🔙 Back
        </button>
      </div>

      <!-- VPN notice -->
      <div id="kco-loc-vpn" class="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 hidden">
        <div class="flex items-start gap-2">
          <i data-lucide="shield-alert" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"></i>
          <p class="text-[11px] text-amber-200 leading-relaxed">We detected you may be using a VPN or proxy. Your detected location may differ from your actual location. Please confirm or manually select your preferred country, language, timezone, and currency.</p>
        </div>
      </div>

      <!-- Detected location info -->
      <div id="kco-loc-detected" class="px-4 py-3 border-b border-white/10">
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 text-blue-400"></i>
          <span id="kco-loc-detected-text">Detecting your location…</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1.5 px-4 py-3 border-b border-white/10">
        <button class="kco-loc-tab active flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-blue-500/20 text-gray-300 flex items-center justify-center gap-1.5" data-tab="country"><i data-lucide="flag" class="w-3.5 h-3.5"></i>Country</button>
        <button class="kco-loc-tab flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-white/10 text-gray-300 flex items-center justify-center gap-1.5" data-tab="language"><i data-lucide="languages" class="w-3.5 h-3.5"></i>Language</button>
        <button class="kco-loc-tab flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-white/10 text-gray-300 flex items-center justify-center gap-1.5" data-tab="currency"><i data-lucide="dollar-sign" class="w-3.5 h-3.5"></i>Currency</button>
        <button class="kco-loc-tab flex-1 text-[11px] font-semibold py-2 px-2 rounded-lg border border-white/10 text-gray-300 flex items-center justify-center gap-1.5" data-tab="timezone"><i data-lucide="clock" class="w-3.5 h-3.5"></i>Timezone</button>
      </div>

      <!-- Search -->
      <div class="px-4 py-2.5 border-b border-white/10">
        <div class="relative">
          <i data-lucide="search" class="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input id="kco-loc-search" type="text" placeholder="Search…" class="kco-loc-search w-full bg-slate-800/80 text-sm text-gray-200 placeholder-gray-500 rounded-lg pl-9 pr-3 py-2 border border-white/10 focus:outline-none transition">
        </div>
      </div>

      <!-- List -->
      <div id="kco-loc-list" class="kco-loc-list flex-1 overflow-y-auto px-2 py-2">
      </div>

      <!-- Live clock footer (hidden — kept in the code, not shown) -->
      <div class="hidden px-4 py-2.5 border-t border-white/10 bg-slate-900/80">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="kco-loc-dot w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span id="kco-loc-clock" class="text-[11px] text-gray-400 font-mono"></span>
          </div>
          <span id="kco-loc-tz" class="text-[10px] text-gray-600"></span>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e),window.lucide&&lucide.createIcons(),document.getElementById("kco-loc-close").onclick=p,e.addEventListener("click",c=>{c.target===e&&p()}),document.querySelectorAll(".kco-loc-tab").forEach(c=>{c.onclick=()=>x(c.dataset.tab)});const o=document.getElementById("kco-loc-search");o.addEventListener("input",()=>s(b,o.value))}let b="country";function x(e){b=e,document.querySelectorAll(".kco-loc-tab").forEach(c=>{c.classList.toggle("active",c.dataset.tab===e)});const o=document.getElementById("kco-loc-search");o&&(o.value=""),s(e,""),window.lucide&&lucide.createIcons()}function s(e,o){const c=document.getElementById("kco-loc-list");if(!c)return;const n=d(),a=o.toLowerCase().trim();c.innerHTML="";let l=[];e==="country"?(l=k.map(t=>({id:t.code,label:`${t.flag} ${t.name}`,sub:t.code,active:t.code===n.country})),a&&(l=l.filter(t=>t.label.toLowerCase().includes(a)||t.sub.toLowerCase().includes(a)))):e==="language"?(l=h.map(t=>({id:t.code,label:t.native,sub:t.name,active:t.code===n.language})),a&&(l=l.filter(t=>t.label.toLowerCase().includes(a)||t.sub.toLowerCase().includes(a)))):e==="currency"?(l=w.map(t=>{const i=L(t);return{id:t,label:`${i.symbol||t} ${t}`,sub:i.locale||"",active:t===n.currency}}),a&&(l=l.filter(t=>t.id.toLowerCase().includes(a)||t.label.toLowerCase().includes(a)))):e==="timezone"&&(l=v().map(t=>({id:t,label:t.replace(/_/g," "),sub:"",active:t===n.timezone})),a&&(l=l.filter(t=>t.label.toLowerCase().includes(a)))),l.forEach(t=>{const i=document.createElement("button");i.className=`kco-loc-item w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition ${t.active?"bg-blue-500/15 border border-blue-500/30":"border border-transparent"}`,i.innerHTML=`
      <div class="min-w-0">
        <p class="text-sm text-gray-200 truncate">${t.label}</p>
        ${t.sub?`<p class="text-[10px] text-gray-500 truncate">${t.sub}</p>`:""}
      </div>
      ${t.active?'<i data-lucide="check" class="w-4 h-4 text-blue-400 shrink-0"></i>':""}
    `,i.onclick=()=>T(e,t.id),c.appendChild(i)}),l.length||(c.innerHTML='<p class="text-center text-xs text-gray-500 py-8">No results found</p>'),window.lucide&&lucide.createIcons()}function T(e,o){e==="country"?E(o):e==="language"?I(o):e==="currency"?C(o):e==="timezone"&&B(o),s(e,document.getElementById("kco-loc-search")?.value||""),m()}function m(){const e=d(),o=document.getElementById("kco-loc-detected-text"),c=document.getElementById("kco-loc-vpn"),n=document.getElementById("kco-loc-tz");let a=(e.detectionSource&&e.detectionSource!=="default"?"Approximate location (detected from your connection): ":"")+e.flag+" "+e.countryName;o.textContent=ac&&c.classList.toggle("hidden",!e.isVPN),n&&(n.textContent=e.timezone?.replace(/_/g," ")||"")}let r=null;function D(){const e=document.getElementById("kco-loc-clock");if(!e)return;function o(){const c=d();try{e.textContent=new Intl.DateTimeFormat(c.language,{timeZone:c.timezone,weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}).format(new Date)}catch{e.textContent=new Date().toLocaleString()}}o(),r&&clearInterval(r),r=setInterval(o,1e3)}function S(){r&&(clearInterval(r),r=null)}function H(){N();const e=document.getElementById("kco-loc-modal");e.style.display="flex",u=!0,x("country"),m(),D(),setTimeout(()=>document.getElementById("kco-loc-search")?.focus(),200)}function p(){const e=document.getElementById("kco-loc-modal");e&&(e.style.display="none"),u=!1,S()}function M(){$(),j(),g(),z(()=>{g(),u&&(m(),s(b,document.getElementById("kco-loc-search")?.value||""))})}async function y(){try{await f(),M()}catch(e){console.warn("Localization init failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",y):y();
