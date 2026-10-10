const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/catalog-qysuyAKK-CoyDMFKy.js","assets/catalog-hidden-store-BAMgfUuU-D15H80aw.js","assets/supabase-client-DvCmNkpI-BBtcpOs0.js"])))=>i.map(i=>d[i]);
import{U as Z,b as F,z as R,_ as q,w as L,$ as ee}from"./supabase-client-DvCmNkpI-BBtcpOs0.js";import{v as z,K as te}from"./localization-B_HxL1KQ-Do35V_4n.js";import{P as le,a as ae,g as re,b as ie}from"./motorhome-data-CupbOvk0--c7gbSNU.js";import{o as se,a as oe}from"./phone-data-Of7KtnOV-OoM3wJJD.js";import{getCurrentUser as de}from"./auth-iMacRl0l-DlcadYa5.js";import{h as ne,I as ce,S as ue,D as O,g as pe,U as be}from"./payment-settings-DAIw4D2k-BaImmvy0.js";import{S as me,p as I,D as J}from"./fx-B0aevBpC-BMCdfPhb.js";import"./native-bridge-z1PkSgfH-CV6U1YtG.js";import"./localization-bootstrap-BhglmvwT-CYE5uVRZ.js";import"./app-promo-banner-VTpzwpvR-CiDTzVNv.js";import"./ai-chat-U-IZQEoO-DrOtSYGJ.js";const T=(e,t=T,l=t.f||(t.f=["assets/catalog-qysuyAKK.js","assets/catalog-hidden-store-BAMgfUuU.js","assets/supabase-client-DvCmNkpI.js"]))=>e.map(a=>l[a]),G="/fallback.svg",ge=[...le,...ae];function xe(e){return ge.find(t=>t.property_id===e)||null}let _=null,w=[],E="",S="";const fe=[{name:"PayPal",icon:"wallet",color:"text-blue-600"},{name:"Stripe",icon:"credit-card",color:"text-violet-600"},{name:"Flutterwave",icon:"zap",color:"text-blue-600"},{name:"Paystack",icon:"layers",color:"text-cyan-600"},{name:"Apple Pay",icon:"smartphone",color:"text-gray-700"},{name:"Google Pay",icon:"smartphone",color:"text-green-600"},{name:"Visa",icon:"credit-card",color:"text-blue-500"},{name:"Mastercard",icon:"credit-card",color:"text-red-500"},{name:"American Express",icon:"credit-card",color:"text-blue-700"},{name:"Discover",icon:"credit-card",color:"text-blue-500"},{name:"Verve",icon:"credit-card",color:"text-green-500"},{name:"Bitcoin (BTC)",icon:"bitcoin",color:"text-yellow-500"},{name:"Ethereum (ETH)",icon:"bitcoin",color:"text-indigo-600"},{name:"USDT",icon:"bitcoin",color:"text-green-600"}],P=[{id:"placed",label:"Order Placed",icon:"shopping-bag",color:"text-blue-600",bg:"bg-blue-50"},{id:"submitted",label:"Payment Submitted",icon:"upload",color:"text-cyan-600",bg:"bg-cyan-50"},{id:"verification",label:"Pending Verification",icon:"loader",color:"text-amber-600",bg:"bg-amber-50"},{id:"approved",label:"Approved",icon:"check-circle",color:"text-emerald-600",bg:"bg-emerald-50"},{id:"processing",label:"Processing",icon:"package",color:"text-blue-600",bg:"bg-blue-50"},{id:"shipped",label:"Shipped",icon:"truck",color:"text-indigo-600",bg:"bg-indigo-50"},{id:"delivered",label:"Delivered",icon:"package-check",color:"text-emerald-600",bg:"bg-emerald-50"}];function ye(){return new URLSearchParams(window.location.search).get("id")}function ve(){return localStorage.getItem("kco_country")||"US"}function he(){const e=Date.now().toString(36).toUpperCase().slice(-6),t=Math.random().toString(36).toUpperCase().slice(2,6);return`W-${e}${t}`}function H(e,t){const l=()=>{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select();try{document.execCommand("copy")}catch{}document.body.removeChild(a)};if(navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(e).catch(()=>l()):l(),t){const a=t.innerHTML;t.innerHTML='<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i>',window.lucide&&lucide.createIcons(),setTimeout(()=>{t.innerHTML=a,window.lucide&&lucide.createIcons()},1500)}V("Copied Successfully.")}function V(e){let t=document.getElementById("payment-toast");t||(t=document.createElement("div"),t.id="payment-toast",t.className="fixed bottom-5 right-5 z-[100] transform translate-y-20 opacity-0 bg-gray-900 border border-blue-500/30 text-white px-5 py-3 rounded-xl shadow-xl text-xs flex items-center gap-2 font-medium transition-all duration-300",t.innerHTML='<i data-lucide="info" class="w-4 h-4 text-blue-600"></i><span id="payment-toast-msg">Action</span>',document.body.appendChild(t)),t.querySelector("#payment-toast-msg").textContent=e,t.classList.remove("translate-y-20","opacity-0"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.add("translate-y-20","opacity-0"),3e3),window.lucide&&lucide.createIcons()}function W(e,t){const l=pe(w,e,t);return{...l,fallbackNotice:l.isFallback?be(l.account,e,t,E):null}}function we(){const e=document.getElementById("particles");if(e)for(let t=0;t<14;t++){const l=document.createElement("div"),a=Math.random()*3+1;l.className="particle",l.style.width=a+"px",l.style.height=a+"px",l.style.left=Math.random()*100+"%",l.style.bottom="-10px",l.style.background=Math.random()>.5?"rgba(59,130,246,.4)":"rgba(251,191,36,.3)",l.style.animationDuration=Math.random()*20+15+"s",l.style.animationDelay=Math.random()*20+"s",e.appendChild(l)}}we();function ke(e,t,l,a){const i=J(I(e.price,a),a);return`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-4">
        <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="shopping-bag" class="w-4 h-4 text-blue-600"></i></div>
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Order Summary</h3>
      </div>
      <div class="flex gap-4">
        <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 ring-1 ring-blue-500/10">
          <img src="${t}" alt="${e.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${G}'">
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-gray-900 truncate">${e.title}</h4>
          <p class="text-gray-500 text-xs mt-0.5">ID: <span class="text-blue-600 font-mono">${e.property_id}</span></p>
          ${l&&e.city?`<p class="text-gray-600 text-xs mt-0.5">${ee(e.country_code)} ${e.city}, ${e.country}</p>`:""}
          <p class="text-2xl font-black text-blue-600 mt-2">${i}</p>
        </div>
      </div>
    </div>
  `}function A(e,t,l){const a=[{label:"Country",value:e.country},{label:"Bank Name",value:e.bankName},{label:"Transfer Type",value:e.transferType},{label:"Beneficiary Name",value:e.beneficiary},{label:"Account Number",value:e.accountNumber},{label:"Account Type",value:e.accountType},{label:"IBAN",value:e.iban},{label:"SWIFT / BIC Code",value:e.swift},{label:"Routing (ABA)",value:e.routing},{label:"Sort Code",value:e.sortCode},{label:"Bank Code",value:e.bankCode},{label:"Branch Code",value:e.branchCode},{label:"Institution Number",value:e.institutionNumber},{label:"Transit Number",value:e.transitNumber},{label:"BSB Code",value:e.bsbCode},{label:"Bank Address",value:e.address}].filter(s=>s.value&&s.value.trim()!==""),i=a.map(s=>({label:s.label,value:s.value}));return`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Receiving Bank Account</h3>
          <p class="text-gray-500 text-xs">${e.flag} ${e.currencyName} (${e.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
          <i data-lucide="shield-check" class="w-3 h-3"></i> Verified
        </span>
      </div>
      <div class="space-y-2">
        ${a.map(s=>`
          <div class="flex items-center justify-between gap-3 bg-gray-50 border border-blue-100 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1">
              <div class="text-gray-500 text-[11px] uppercase tracking-wide">${s.label}</div>
              <div class="text-gray-900 text-sm font-medium font-mono break-all">${s.value}</div>
            </div>
            <button onclick="copyToClipboard('${s.value.replace(/'/g,"\\'")}', this)" class="shrink-0 p-2 bg-gray-100 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition group" title="Copy ${s.label}">
              <i data-lucide="copy" class="w-4 h-4 text-gray-600 group-hover:text-blue-600"></i>
            </button>
          </div>
        `).join("")}
      </div>
      <button onclick='copyAllDetails(${JSON.stringify(i).replace(/'/g,"&#39;")})' class="btn-press w-full mt-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 font-bold py-2.5 rounded-xl uppercase text-xs tracking-wider transition flex items-center justify-center gap-2 relative overflow-hidden">
        <i data-lucide="copy-check" class="w-4 h-4"></i> Copy All Account Details
      </button>
      <div class="mt-4 p-3 bg-gray-50 border border-blue-100 rounded-xl text-xs text-gray-700 leading-relaxed">${l||"After payment, upload your receipt for verification so your goods can be shipped immediately."}</div>
    </div>
  `}function Y(e){return`
    <div class="glass border border-amber-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-2.5 bg-amber-50 rounded-lg shrink-0"><i data-lucide="info" class="w-5 h-5 text-amber-600"></i></div>
        <div class="text-sm text-gray-700 leading-relaxed">
          <p class="font-bold text-amber-600 mb-2">Hello Customer,</p>
          <p class="mb-2">${e?.message||"Your local currency is not currently supported by our Manual Bank Transfer system."}</p>
          <p class="font-bold text-amber-600">Thank you for choosing Weverse Online Shop.</p>
        </div>
      </div>
    </div>
    ${A(e.account,null,e.instructions)}
  `}function $e(e,t,l){const a=O(w),i=l?z(l):null;return`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="globe" class="w-5 h-5 text-blue-600"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Payment Currency</h3>
          <p class="text-gray-500 text-xs">${i?i.flag+" "+t:t||"Select currency"} ${e?"→ "+e:"→ USD (default)"}</p>
        </div>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        ${a.map(s=>{const d=w.find(p=>p.currency===s);return`
            <button onclick="selectCurrency('${s}')" class="btn-press flex flex-col items-center gap-1 p-3 rounded-xl border transition relative overflow-hidden ${s===e?"bg-blue-50 border-blue-300 text-blue-600 pulse-glow":"bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200 hover:text-gray-900"}">
              <span class="text-2xl">${d.flag}</span>
              <span class="text-xs font-bold">${s}</span>
              <span class="text-[10px] text-gray-500">${d.currencyName}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function Ee(){return`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="landmark" class="w-6 h-6 text-blue-600"></i></div>
          <div>
            <h3 class="text-sm font-bold text-gray-900">Manual Bank Transfer</h3>
            <p class="text-gray-500 text-xs">Pay directly to our bank account</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Available
        </span>
      </div>
    </div>
  `}function Ie(){return`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-gray-100 rounded-lg"><i data-lucide="lock" class="w-5 h-5 text-gray-500"></i></div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">More Payment Methods</h3>
          <p class="text-gray-500 text-xs">Coming soon to Weverse Online Shop</p>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        ${fe.map(e=>`
          <div class="relative bg-gray-50 border border-blue-100 rounded-xl p-3 opacity-50 cursor-not-allowed select-none">
            <span class="absolute top-1.5 right-1.5 bg-gray-200 text-gray-600 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full">Soon</span>
            <div class="flex items-center gap-2 mb-0.5">
              <i data-lucide="${e.icon}" class="w-4 h-4 ${e.color}"></i>
              <span class="text-xs font-bold text-gray-600">${e.name}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function K(e){const t=P.findIndex(l=>l.id===e);return`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-5">
        <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="git-branch" class="w-4 h-4 text-blue-600"></i></div>
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Order Progress</h3>
      </div>
      <div class="relative">
        <!-- Progress line -->
        <div class="absolute left-4 top-4 bottom-4 w-0.5 bg-blue-50"></div>
        <div class="absolute left-4 top-4 w-0.5 bg-blue-500 transition-all duration-500" style="height: ${t>=0?t/(P.length-1)*100:0}%; min-height: 0; max-height: calc(100% - 2rem)"></div>
        <div class="space-y-4">
          ${P.map((l,a)=>{const i=a<=t,s=a===t;return`
              <div class="flex items-center gap-3 relative">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${i?l.bg+" border border-blue-200":"bg-gray-50 border border-blue-100"} ${s?"pulse-glow":""}">
                  <i data-lucide="${l.icon}" class="w-4 h-4 ${i?l.color:"text-gray-600"} ${s?"animate-pulse":""}"></i>
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium ${i?"text-gray-900":"text-gray-600"}">${l.label}</div>
                </div>
                ${i&&!s?'<i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0"></i>':""}
                ${s?'<span class="text-[10px] text-blue-600 font-bold uppercase shrink-0">Current</span>':""}
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `}function Be(e,t,l,a,i){const s=i?`
        <div class="glass-soft border border-blue-100 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-4">
            <div class="p-2 bg-blue-50 rounded-lg"><i data-lucide="truck" class="w-4 h-4 text-blue-600"></i></div>
            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wide">Shipping Information</h4>
            <span class="ml-auto bg-amber-50 text-amber-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">Guest Checkout</span>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Full Name *</label>
              <input type="text" id="form-full-name" required placeholder="John Doe" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email Address *</label>
                <input type="email" id="form-email" required placeholder="you@example.com" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone Number *</label>
                <input type="tel" id="form-phone" required placeholder="+1 234 567 890" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Shipping Address *</label>
              <input type="text" id="form-shipping-address" required placeholder="123 Main Street, Apt 4B" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Country *</label>
                <input type="text" id="form-guest-country" required placeholder="United States" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">State / Province *</label>
                <input type="text" id="form-guest-state" required placeholder="New York" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">City *</label>
                <input type="text" id="form-guest-city" required placeholder="New York City" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Postal Code *</label>
                <input type="text" id="form-guest-postal" required placeholder="10001" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          </div>
        </div>
  `:"",d=i?"":`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Full Name *</label>
            <input type="text" id="form-full-name" required placeholder="John Doe" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone Number *</label>
            <input type="tel" id="form-phone" required placeholder="+1 234 567 890" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email Address *</label>
          <input type="email" id="form-email" required placeholder="you@example.com" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>
  `;return`
    <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 slide-up" id="upload-section">
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="upload-cloud" class="w-5 h-5 text-blue-600"></i></div>
        <div>
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Upload Payment Receipt</h3>
          <p class="text-gray-500 text-xs">After making your payment, upload your receipt for verification.</p>
        </div>
      </div>

      <form id="receipt-form" class="space-y-4">
        <input type="hidden" id="form-order-number" value="${e}">
        <input type="hidden" id="form-listing-id" value="${t.property_id}">
        <input type="hidden" id="form-listing-title" value="${t.title}">
        <input type="hidden" id="form-amount" value="${l}">
        <input type="hidden" id="form-currency" value="${a}">
        <input type="hidden" id="form-is-guest" value="${i?"1":"0"}">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Order Number</label>
            <input type="text" value="${e}" disabled class="w-full bg-white/80 border border-blue-100 rounded-xl px-4 py-2.5 text-sm text-blue-600 font-mono font-bold">
          </div>
          <div class="flex items-end">
            <div class="text-xs text-gray-500 pb-2">Save your order number to track your payment status.</div>
          </div>
        </div>

        ${s}
        ${d}

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Selected Currency</label>
            <input type="text" id="form-currency-display" value="${a}" disabled class="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-mono">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Amount Paid *</label>
            <input type="number" id="form-amount-paid" required step="0.01" value="${l}" placeholder="0.00" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Payment Date *</label>
            <input type="date" id="form-payment-date" required value="${new Date().toISOString().slice(0,10)}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Transaction Reference *</label>
          <input type="text" id="form-tx-ref" required placeholder="Bank transfer reference / confirmation number" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Additional Notes</label>
          <textarea id="form-notes" rows="2" placeholder="Any additional information about your payment (optional)" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"></textarea>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Upload Receipt *</label>
          <div id="file-drop-zone" class="border-2 border-dashed border-blue-200 hover:border-blue-300 rounded-2xl p-8 text-center cursor-pointer transition group">
            <input type="file" id="form-receipt-file" accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" capture="environment" class="hidden">
            <div id="file-prompt">
              <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-2xl mb-3 group-hover:bg-blue-100 transition">
                <i data-lucide="upload-cloud" class="w-7 h-7 text-blue-600 group-hover:scale-110 transition"></i>
              </div>
              <p class="text-sm text-gray-700 font-medium">Click to upload, take a photo, or drag and drop</p>
              <p class="text-xs text-gray-600 mt-1">JPG, JPEG, PNG, WEBP, or PDF — Max 20 MB</p>
              <div class="flex items-center justify-center gap-2 mt-3">
                <button type="button" id="btn-take-photo" class="btn-press text-xs font-bold px-4 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1.5">
                  <i data-lucide="camera" class="w-4 h-4"></i> Take Photo
                </button>
                <button type="button" id="btn-choose-file" class="btn-press text-xs font-bold px-4 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1.5">
                  <i data-lucide="folder-open" class="w-4 h-4"></i> Choose File
                </button>
              </div>
            </div>
            <div id="file-info" class="hidden">
              <div class="flex flex-col items-center gap-3">
                <div id="file-preview-container" class="hidden">
                  <img id="file-preview-img" class="max-h-40 rounded-xl border border-blue-200 object-contain" alt="Receipt preview">
                </div>
                <div class="flex items-center justify-center gap-3">
                  <div class="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-xl check-pop">
                    <i data-lucide="file-text" class="w-6 h-6 text-emerald-600"></i>
                  </div>
                  <div class="text-left">
                    <p id="file-name-display" class="text-sm text-gray-900 font-medium truncate max-w-[200px]"></p>
                    <p id="file-size-display" class="text-xs text-gray-500"></p>
                  </div>
                  <button type="button" onclick="removeReceiptFile()" class="p-2 bg-gray-100 hover:bg-red-100 rounded-lg transition">
                    <i data-lucide="trash-2" class="w-4 h-4 text-gray-600 hover:text-red-600"></i>
                  </button>
                </div>
                <button type="button" onclick="removeReceiptFile();document.getElementById('form-receipt-file').click()" class="text-[11px] text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wide flex items-center gap-1.5 transition">
                  <i data-lucide="refresh-cw" class="w-3 h-3"></i> Replace Receipt
                </button>
              </div>
            </div>
          </div>
          <div id="file-error" class="hidden text-xs text-red-600 mt-1.5"></div>
        </div>

        <div id="upload-progress" class="hidden">
          <div class="flex items-center gap-3 mb-2">
            <i data-lucide="loader-2" class="w-4 h-4 text-blue-600 animate-spin"></i>
            <span class="text-xs text-gray-600" id="upload-progress-text">Uploading receipt...</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div id="upload-progress-bar" class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300" style="width:0%"></div>
          </div>
        </div>

        <button type="submit" id="submit-receipt-btn" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden">
          <i data-lucide="send" class="w-5 h-5"></i> Submit Payment
        </button>
      </form>
    </div>
  `}function Ce(e,t,l,a){const i=J(I(t.price,a),a);return`
    <div class="fade-in text-center py-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-600"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Receipt Submitted</h1>
      <p class="text-gray-600 text-sm mb-6">Your payment receipt has been received successfully.</p>

      <div class="glass border border-blue-200 rounded-2xl p-5 max-w-md mx-auto mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-600 font-mono font-bold">${e}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Item</span><span class="text-gray-900 font-bold truncate ml-2">${t.title}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Amount</span><span class="text-gray-900 font-bold">${i}</span></div>
        <div class="flex justify-between text-sm mb-4"><span class="text-gray-500">Currency</span><span class="text-gray-900 font-bold">${a}</span></div>
        <div class="border-t border-blue-100 pt-3">
          <div class="flex items-center gap-2 text-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-amber-600 font-bold">Pending Verification</span>
          </div>
        </div>
      </div>

      ${K("verification")}

      <div class="glass border border-blue-200 rounded-2xl p-5 max-w-md mx-auto mb-6 text-left">
        <div class="flex items-start gap-2.5">
          <i data-lucide="info" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
          <div class="text-sm text-gray-600 leading-relaxed">
            <p class="mb-2">Our finance team will verify your payment.</p>
            <p class="mb-2">Verification usually takes between a few minutes and 24 hours.</p>
            <p>You will receive a notification once your payment has been approved.</p>
          </div>
        </div>
      </div>

      <a href="/" class="btn-press inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30">Back to Marketplace</a>
    </div>
  `}async function _e(){const e=document.getElementById("payment-content"),t=new URLSearchParams(window.location.search).get("guest")==="1",l=t?null:await de();if(!l&&!t){window.location.href="/";return}const a=ye();await Z();let i=F(a)||re(a)||ie(a)||se(a)||oe(a)||xe(a);if(!i){const[{generateListingById:f},{loadHiddenCatalogIds:r}]=await Promise.all([R(()=>q(()=>import("./catalog-qysuyAKK-CoyDMFKy.js"),__vite__mapDeps([0,1,2])),T([0,1,2])),R(()=>q(()=>import("./catalog-hidden-store-BAMgfUuU-D15H80aw.js"),__vite__mapDeps([1,2])),T([1,2]))]);await r(),i=f(a)}if(i||(i=F(a)),!i){e.innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>';return}const s=i.listing_type==="property",d=i.images?.[0]||G;let p=ve();if(l&&!t){const{data:f}=await L.from("profiles").select("country_code").eq("user_id",l.id).maybeSingle();f?.country_code&&(p=f.country_code,localStorage.setItem("kco_country",p))}const h=z(p),B=h?h.name:p,C=te(p),u=new URLSearchParams(window.location.search).get("order")||he(),k=i.price;_=await ne(),w=ce(_),E=ue(_),await me(),S=C||"";let m=S||"USD";O(w).includes(m)||(m="USD");const v=W(p,S||""),$=I(k,m);e.innerHTML=`
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-600 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Checkout</span>
      </div>

      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Secure Checkout</h1>
      <p class="text-gray-500 text-sm mb-6">Complete your purchase using manual bank transfer. Upload your receipt after payment for verification.</p>

      ${ke(i,d,s,m)}

      ${Ee()}

      <div id="currency-selector-container">${$e(m,B,p)}</div>

      <div id="bank-account-container">${v.isFallback?Y(v.fallbackNotice):A(v.account,null,E)}</div>

      <div id="upload-form-container">${Be(u,i,$,m,t)}</div>

      ${Ie()}

      ${K("submitted")}

      <p class="text-center text-xs text-gray-500 mb-6 flex items-center justify-center gap-1.5">
        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> Your payment is secured with SSL encryption. Manual verification by our finance team.
      </p>
    </div>
  `,window.lucide&&lucide.createIcons(),Se(i,k,u,l,t)}function Se(e,t,l,a,i){document.querySelectorAll(".btn-press").forEach(r=>{r.addEventListener("click",function(n){if(this.disabled)return;const o=this.getBoundingClientRect(),c=document.createElement("span");c.className="ripple";const b=Math.max(o.width,o.height);c.style.width=c.style.height=b+"px",c.style.left=n.clientX-o.left-b/2+"px",c.style.top=n.clientY-o.top-b/2+"px",this.appendChild(c),setTimeout(()=>c.remove(),600)})}),window.selectCurrency=r=>{const n=document.getElementById("bank-account-container"),o=W(countryCode,r);n.innerHTML=o.isFallback?Y(o.fallbackNotice):A(o.account,null,E),document.querySelectorAll("#currency-selector-container button").forEach(g=>{g.getAttribute("onclick")?.includes(`'${r}'`)?g.className=g.className.replace("bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200 hover:text-gray-900","bg-blue-50 border-blue-300 text-blue-600 pulse-glow"):g.className=g.className.replace("bg-blue-50 border-blue-300 text-blue-600 pulse-glow","bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200 hover:text-gray-900")});const c=document.getElementById("form-currency-display");c&&(c.value=r);const b=document.getElementById("form-currency");b&&(b.value=r);const y=document.getElementById("form-amount-paid");y&&(y.value=I(e.price,r)),window.lucide&&lucide.createIcons()},window.copyAllDetails=r=>{const n=r.map(o=>`${o.label}: ${o.value}`).join(`
`);H(n)},window.copyToClipboard=H;const s=document.getElementById("file-drop-zone"),d=document.getElementById("form-receipt-file"),p=document.getElementById("file-prompt"),h=document.getElementById("file-info"),B=document.getElementById("file-name-display"),C=document.getElementById("file-size-display"),u=document.getElementById("file-error");window.removeReceiptFile=()=>{d.value="",p.classList.remove("hidden"),h.classList.add("hidden"),u.classList.add("hidden"),m.classList.add("hidden")};const k=document.getElementById("file-preview-img"),m=document.getElementById("file-preview-container"),v=r=>{if(u.classList.add("hidden"),!r)return;const n=["image/jpeg","image/jpg","image/png","image/webp","application/pdf"],o=r.name.split(".").pop()?.toLowerCase(),c=["jpg","jpeg","png","webp","pdf"].includes(o);if(!n.includes(r.type)||!c){u.textContent="Please upload a JPG, JPEG, PNG, WEBP, or PDF file.",u.classList.remove("hidden");return}if(r.size>20*1024*1024){u.textContent="File size must be 20 MB or less.",u.classList.remove("hidden");return}if(B.textContent=r.name,C.textContent=(r.size/1024/1024).toFixed(2)+" MB",p.classList.add("hidden"),h.classList.remove("hidden"),r.type.startsWith("image/")){const b=new FileReader;b.onload=y=>{k.src=y.target.result,m.classList.remove("hidden")},b.readAsDataURL(r)}else m.classList.add("hidden");window.lucide&&lucide.createIcons()},$=document.getElementById("btn-take-photo"),f=document.getElementById("btn-choose-file");s.addEventListener("click",r=>{r.target.closest("#btn-take-photo")||r.target.closest("#btn-choose-file")||r.target.closest("#file-info")||d.click()}),$&&$.addEventListener("click",r=>{r.stopPropagation(),d.setAttribute("capture","environment"),d.click()}),f&&f.addEventListener("click",r=>{r.stopPropagation(),d.removeAttribute("capture"),d.click()}),d.addEventListener("change",r=>v(r.target.files[0])),s.addEventListener("dragover",r=>{r.preventDefault(),s.classList.add("border-blue-300","bg-blue-50")}),s.addEventListener("dragleave",()=>{s.classList.remove("border-blue-300","bg-blue-50")}),s.addEventListener("drop",r=>{if(r.preventDefault(),s.classList.remove("border-blue-300","bg-blue-50"),r.dataTransfer.files.length){const n=new DataTransfer;n.items.add(r.dataTransfer.files[0]),d.files=n.files,v(r.dataTransfer.files[0])}}),document.getElementById("receipt-form").addEventListener("submit",async r=>{r.preventDefault();const n=document.getElementById("submit-receipt-btn"),o=d.files[0];if(!o){u.textContent="Please upload your payment receipt.",u.classList.remove("hidden");return}n.disabled=!0,n.innerHTML='<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Submitting...',window.lucide&&lucide.createIcons();const c=document.getElementById("upload-progress"),b=document.getElementById("upload-progress-bar"),y=document.getElementById("upload-progress-text");c.classList.remove("hidden");try{const g=o.name.split(".").pop(),N=`${i?"guest":a.id}/${l}-${Date.now()}.${g}`,{error:j}=await L.storage.from("payment-receipts").upload(N,o,{onUploadProgress:M=>{const U=Math.round(M.loaded/M.total*100);b.style.width=U+"%",y.textContent=`Uploading receipt... ${U}%`}});if(j)throw new Error("Failed to upload receipt: "+j.message);b.style.width="100%",y.textContent="Saving payment record...";const x={order_number:l,listing_id:document.getElementById("form-listing-id").value,listing_title:document.getElementById("form-listing-title").value,amount:parseFloat(document.getElementById("form-amount-paid").value),currency:document.getElementById("form-currency").value,full_name:document.getElementById("form-full-name").value,email:document.getElementById("form-email").value,phone:document.getElementById("form-phone").value,payment_date:document.getElementById("form-payment-date").value,transaction_reference:document.getElementById("form-tx-ref").value,receipt_file_path:N,receipt_file_name:o.name,additional_notes:document.getElementById("form-notes").value||null,status:"pending_verification"};i?(x.is_guest=!0,x.user_id=null,x.guest_shipping_address=document.getElementById("form-shipping-address")?.value||null,x.guest_country=document.getElementById("form-guest-country")?.value||null,x.guest_state=document.getElementById("form-guest-state")?.value||null,x.guest_city=document.getElementById("form-guest-city")?.value||null,x.guest_postal_code=document.getElementById("form-guest-postal")?.value||null):x.user_id=a.id;const{error:D}=await L.from("payment_receipts").insert(x);if(D)throw new Error("Failed to save payment: "+D.message);try{fetch("https://mzgrjwvwzgqgivwmlkno.supabase.co/functions/v1/send-order-notification",{method:"POST",headers:{Authorization:"Bearer sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX","Content-Type":"application/json"},body:JSON.stringify({order_number:l})}).catch(()=>{})}catch{}const X=document.getElementById("payment-content"),Q=e;X.innerHTML=Ce(l,Q,parseFloat(document.getElementById("form-amount-paid").value),document.getElementById("form-currency").value),window.lucide&&lucide.createIcons(),V("Payment receipt submitted successfully.")}catch(g){c.classList.add("hidden"),n.disabled=!1,n.innerHTML='<i data-lucide="send" class="w-5 h-5"></i> Submit Payment',window.lucide&&lucide.createIcons(),u.textContent=g.message||"Something went wrong. Please try again.",u.classList.remove("hidden")}})}_e();
