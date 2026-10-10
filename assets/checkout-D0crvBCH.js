const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/catalog-qysuyAKK-CoyDMFKy.js","assets/catalog-hidden-store-BAMgfUuU-D15H80aw.js","assets/supabase-client-DvCmNkpI-BBtcpOs0.js"])))=>i.map(i=>d[i]);
import{w as v,U as P,b as B,z as f,_ as x,B as V}from"./supabase-client-DvCmNkpI-BBtcpOs0.js";import{K as q,v as X,E as Y}from"./localization-B_HxL1KQ-Do35V_4n.js";import{getCurrentUser as Q}from"./auth-iMacRl0l-DlcadYa5.js";import{P as W,a as K,g as E,b as M}from"./motorhome-data-CupbOvk0--c7gbSNU.js";import{o as j,a as N}from"./phone-data-Of7KtnOV-OoM3wJJD.js";import{D as I,h as Z,I as ee,S as te,g as ae,U as re}from"./payment-settings-DAIw4D2k-BaImmvy0.js";import{U as se,p as g,S as ie,D as k}from"./fx-B0aevBpC-BMCdfPhb.js";import"./native-bridge-z1PkSgfH-CV6U1YtG.js";import"./localization-bootstrap-BhglmvwT-CYE5uVRZ.js";import"./app-promo-banner-VTpzwpvR-CiDTzVNv.js";import"./ai-chat-U-IZQEoO-DrOtSYGJ.js";const m=(t,a=m,r=a.f||(a.f=["assets/catalog-qysuyAKK.js","assets/catalog-hidden-store-BAMgfUuU.js","assets/supabase-client-DvCmNkpI.js"]))=>t.map(i=>r[i]),ne=[...W,...K];function T(t){return ne.find(a=>a.property_id===t)||null}const w="/fallback.svg";let e={user:null,isGuest:!1,listing:null,quantity:1,selectedCurrency:"USD",countryCode:"US",cartItems:[],step:1,paymentMethod:"flutterwave",addresses:[],selectedAddressId:null,billingSame:!0,billingAddress:"",fullName:"",email:"",phone:"",shippingAddr1:"",shippingAddr2:"",shippingCity:"",shippingState:"",shippingPostal:"",shippingCountry:"US",orderNumber:"",processing:!1,paymentSettings:null,manualPaymentAccounts:[],manualPaymentInstructions:"",paymentGateway:"both",autoDetectedCurrency:"",currencyManuallySelected:!1};function le(){const t=Date.now().toString(36).toUpperCase().slice(-6),a=Math.random().toString(36).toUpperCase().slice(2,6);return`W-${t}${a}`}function y(t){const a=document.getElementById("toast");document.getElementById("toast-msg").textContent=t,a.classList.remove("translate-y-20","opacity-0"),clearTimeout(a._t),a._t=setTimeout(()=>a.classList.add("translate-y-20","opacity-0"),3e3),window.lucide&&lucide.createIcons()}function L(t){t.addEventListener("click",function(a){if(this.disabled)return;const r=this.getBoundingClientRect(),i=document.createElement("span");i.className="ripple";const s=Math.max(r.width,r.height);i.style.width=i.style.height=s+"px",i.style.left=a.clientX-r.left-s/2+"px",i.style.top=a.clientY-r.top-s/2+"px",this.appendChild(i),setTimeout(()=>i.remove(),600)})}function C(t,a){return`${(parseFloat(t)||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} ${a}`}function de(t){const a=C(t.price,t.currency||"USD"),r=parseFloat(t.real_price);return Number.isFinite(r)&&r>0&&r>parseFloat(t.price)?`<span class="price-strike line-through text-gray-400 mr-1 text-xs">${C(r,t.currency||"USD")}</span><span class="text-amber-600 font-bold">${a}</span>`:a}function oe(t){const a=()=>{const r=document.createElement("textarea");r.value=t,document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}document.body.removeChild(r)};navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t).catch(()=>a()):a(),y("Copied to clipboard.")}function ce(){const t=e.selectedCurrency==="USD"&&!e.autoDetectedCurrency?"":e.selectedCurrency,a=ae(e.manualPaymentAccounts,e.countryCode,t);return{...a,fallbackNotice:a.isFallback?re(a.account,e.countryCode,e.selectedCurrency,e.manualPaymentInstructions):null}}function ue(){const t=document.getElementById("particles");if(t)for(let a=0;a<12;a++){const r=document.createElement("div"),i=Math.random()*3+1;r.className="particle",r.style.width=r.style.height=i+"px",r.style.left=Math.random()*100+"%",r.style.bottom="-10px",r.style.background=Math.random()>.5?"rgba(59,130,246,.4)":"rgba(251,191,36,.3)",r.style.animationDuration=Math.random()*20+15+"s",r.style.animationDelay=Math.random()*20+"s",t.appendChild(r)}}ue();async function pe(){const t=document.getElementById("checkout-root"),a=new URLSearchParams(window.location.search),r=a.get("status"),i=a.get("transaction_id"),s=a.get("tx_ref"),l=a.get("order_number");if(r==="verify"&&i){await _e(i,s,l||localStorage.getItem("kco_pending_order"));return}if(e.isGuest=a.get("guest")==="1",!e.isGuest&&(e.user=await Q(),!e.user)){window.location.href="/auth.html?redirect=/checkout.html";return}const n=a.get("id");if(n){if(await P(),e.listing=B(n)||E(n)||M(n)||j(n)||N(n)||T(n),!e.listing){const[{generateListingById:d},{loadHiddenCatalogIds:b}]=await Promise.all([f(()=>x(()=>import("./catalog-qysuyAKK-CoyDMFKy.js"),__vite__mapDeps([0,1,2])),m([0,1,2])),f(()=>x(()=>import("./catalog-hidden-store-BAMgfUuU-D15H80aw.js"),__vite__mapDeps([1,2])),m([1,2]))]);await b(),e.listing=d(n)}if(e.listing||(e.listing=B(n)),!e.listing){t.innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>';return}e.cartItems=[{listing:e.listing,quantity:1}]}else{const d=JSON.parse(localStorage.getItem("kco_cart")||"[]");await P();const b=V(),[{generateListingById:o},{loadHiddenCatalogIds:$}]=await Promise.all([f(()=>x(()=>import("./catalog-qysuyAKK-CoyDMFKy.js"),__vite__mapDeps([0,1,2])),m([0,1,2])),f(()=>x(()=>import("./catalog-hidden-store-BAMgfUuU-D15H80aw.js"),__vite__mapDeps([1,2])),m([1,2]))]);if(await $(),e.cartItems=d.map(c=>{const u=typeof c=="string"?c:c&&c.id;if(!u)return null;const z=c&&typeof c=="object"&&c.qty?Math.max(1,parseInt(c.qty,10)||1):1,A=b.find(J=>J.property_id===u)||E(u)||M(u)||j(u)||N(u)||T(u)||o(u);return A?{listing:A,quantity:z}:null}).filter(Boolean),e.cartItems.length===0){t.innerHTML=F(),window.lucide&&lucide.createIcons();return}e.listing=e.cartItems[0].listing}if(e.countryCode=localStorage.getItem("kco_country")||"US",e.user&&!e.isGuest){const{data:d}=await v.from("profiles").select("country_code").eq("user_id",e.user.id).maybeSingle();d?.country_code&&(e.countryCode=d.country_code)}if(e.autoDetectedCurrency=q(e.countryCode)||"",e.selectedCurrency=e.autoDetectedCurrency||"USD",e.shippingCountry=e.countryCode,e.paymentSettings=await Z(),e.manualPaymentAccounts=ee(e.paymentSettings),e.manualPaymentInstructions=te(e.paymentSettings),e.paymentGateway=e.paymentSettings.payment_gateway||"both",e.paymentGateway==="manual"&&(e.paymentMethod="manual_bank_transfer"),e.paymentGateway==="flutterwave"&&(e.paymentMethod="flutterwave"),I(e.manualPaymentAccounts).includes(e.selectedCurrency)||(e.selectedCurrency="USD"),await ie(),e.user&&!e.isGuest){const{data:d}=await v.from("shipping_addresses").select("*").eq("user_id",e.user.id).order("created_at",{ascending:!1});e.addresses=d||[];const b=e.addresses.find($=>$.is_default);b&&(e.selectedAddressId=b.id);const{data:o}=await v.from("profiles").select("*").eq("user_id",e.user.id).maybeSingle();o&&(e.fullName=o.display_name||`${o.first_name||""} ${o.last_name||""}`.trim(),e.email=e.user.email,e.phone=o.phone_code&&o.phone_number?`+${o.phone_code} ${o.phone_number}`:"",e.shippingCountry=o.country_code||e.countryCode)}e.orderNumber=le(),p()}function h(){return e.cartItems.reduce((t,a)=>t+a.listing.price*a.quantity,0)}function be(){return 0}function me(){return 0}function S(){return Math.round(h()*me()*100)/100}function _(){return h()+be()+S()}function U(){return g(_(),e.selectedCurrency)}function O(){return k(U(),e.selectedCurrency)}function G(){const t=(e.shippingCountry||"").toUpperCase();if(t&&(e.countryCode=t,localStorage.setItem("kco_country",t),!e.currencyManuallySelected)){e.autoDetectedCurrency=q(t)||"";const a=I(e.manualPaymentAccounts);e.selectedCurrency=e.autoDetectedCurrency&&a.includes(e.autoDetectedCurrency)?e.autoDetectedCurrency:"USD"}}function p(){const t=document.getElementById("checkout-root");t.innerHTML=`
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-600 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-blue-600">Checkout</span>
      </div>

      <!-- Step indicator -->
      ${ge()}

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div class="lg:col-span-2 space-y-5">
          ${e.step===1?ye():""}
          ${e.step===2?he():""}
          ${e.step===3?fe():""}
        </div>
        <div class="lg:col-span-1">
          ${ve()}
        </div>
      </div>
    </div>
  `,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(L)}function ge(){const t=[{num:1,label:"Review Cart",icon:"shopping-cart"},{num:2,label:"Shipping & Billing",icon:"map-pin"},{num:3,label:"Payment",icon:"credit-card"}];return`
    <div class="flex items-center justify-center gap-2 sm:gap-4 mb-6">
      ${t.map((a,r)=>`
        <div class="flex items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2">
            <div class="step-bar w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${e.step>=a.num?"bg-blue-100 border border-blue-300 text-blue-600":"bg-gray-50 border border-blue-100 text-gray-600"} ${e.step===a.num?"pulse-glow":""}">
              ${e.step>a.num?'<i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>':`<i data-lucide="${a.icon}" class="w-4 h-4"></i>`}
            </div>
            <span class="text-xs font-bold ${e.step>=a.num?"text-gray-900":"text-gray-600"} hidden sm:inline">${a.label}</span>
          </div>
          ${r<t.length-1?`<div class="step-bar w-8 sm:w-16 h-0.5 ${e.step>a.num?"bg-blue-500":"bg-blue-50"}"></div>`:""}
        </div>
      `).join("")}
    </div>
  `}function ye(){return`
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="shopping-cart" class="w-4 h-4 text-blue-600"></i> Shopping Cart (${e.cartItems.length})
      </h3>
      <div class="space-y-3">
        ${e.cartItems.map((t,a)=>`
            <div class="flex items-center gap-3 p-3 bg-gray-50 border border-blue-100 rounded-xl">
              <div class="w-16 h-16 rounded-lg bg-gray-50 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                <img src="${t.listing.images?.[0]||w}" class="w-full h-full object-cover" onerror="this.src='${w}'">
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-gray-900 truncate">${t.listing.title}</h4>
                <p class="text-xs text-gray-500">${t.listing.property_id}</p>
                <p class="text-sm font-bold text-amber-600 mt-1">${de(t.listing)}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button onclick="changeQty(${a}, -1)" class="w-9 h-9 bg-gray-100 hover:bg-blue-100 border border-blue-200 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center"><i data-lucide="minus" class="w-4 h-4"></i></button>
                <span class="text-sm font-bold text-gray-900 w-8 text-center">${t.quantity}</span>
                <button onclick="changeQty(${a}, 1)" class="w-9 h-9 bg-gray-100 hover:bg-blue-100 border border-blue-200 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center"><i data-lucide="plus" class="w-4 h-4"></i></button>
              </div>
              <button onclick="removeCartItem(${a})" class="p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition shrink-0"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          `).join("")}
      </div>
    </div>

    <div class="flex justify-end">
      <button onclick="goToStep(2)" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
        Continue to Shipping <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `}function he(){const t=e.addresses.length>0&&!e.isGuest?`
    <div class="mb-5">
      <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">Saved Addresses</h4>
      <div class="space-y-2">
        ${e.addresses.map(r=>{const i=X(r.country_code);return`
            <div onclick="selectAddress('${r.id}')" class="cursor-pointer p-3 border rounded-xl transition ${e.selectedAddressId===r.id?"bg-blue-50 border-blue-300":"bg-gray-50 border-blue-100 hover:border-blue-200"}">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-bold text-gray-900">${r.label}</span>
                ${r.is_default?'<span class="text-[10px] text-emerald-600 font-bold uppercase">Default</span>':""}
              </div>
              <p class="text-xs text-gray-600">${r.full_name} · ${r.address_line1}, ${r.city}, ${r.state} ${r.postal_code} · ${i?i.flag+" "+i.name:r.country_code}</p>
              <p class="text-xs text-gray-500 mt-0.5">${r.phone}</p>
            </div>
          `}).join("")}
        <button onclick="selectAddress('')" class="w-full text-left p-3 border border-dashed border-blue-200 hover:border-blue-300 rounded-xl text-sm text-blue-600 font-bold transition flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i> Enter a new address
        </button>
      </div>
    </div>
  `:"",a=!e.selectedAddressId||e.isGuest;return`
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="map-pin" class="w-4 h-4 text-blue-600"></i> Shipping Address
      </h3>
      ${t}
      ${a?`
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Full Name *</label>
              <input type="text" id="ship-name" value="${e.fullName}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone *</label>
              <input type="tel" id="ship-phone" value="${e.phone}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
          </div>
          ${e.isGuest?`
            <div>
              <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email *</label>
              <input type="email" id="ship-email" value="${e.email}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
            </div>
          `:""}
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Address Line 1 *</label>
            <input type="text" id="ship-addr1" value="${e.shippingAddr1}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Address Line 2 (Optional)</label>
            <input type="text" id="ship-addr2" value="${e.shippingAddr2}" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">City *</label><input type="text" id="ship-city" value="${e.shippingCity}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">State *</label><input type="text" id="ship-state" value="${e.shippingState}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Postal *</label><input type="text" id="ship-postal" value="${e.shippingPostal}" required class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"></div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Country *</label>
            <select id="ship-country" class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
              ${Y.map(r=>`<option value="${r.code}" ${e.shippingCountry===r.code?"selected":""}>${r.flag} ${r.name}</option>`).join("")}
            </select>
          </div>
        </div>
      `:""}
    </div>

    <!-- Billing -->
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="file-text" class="w-4 h-4 text-blue-600"></i> Billing Information
      </h3>
      <label class="flex items-center gap-2 cursor-pointer mb-4">
        <input type="checkbox" id="billing-same" ${e.billingSame?"checked":""} onchange="toggleBilling()" class="w-4 h-4 rounded border-gray-300 bg-white text-blue-500 focus:ring-blue-500">
        <span class="text-sm text-gray-700">Billing address is the same as shipping address</span>
      </label>
      <div id="billing-fields" class="${e.billingSame?"hidden":""}">
        <textarea id="billing-address" rows="3" placeholder="Enter full billing address..." class="input-field w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none">${e.billingAddress}</textarea>
      </div>
    </div>

    <div class="flex justify-between">
      <button onclick="goToStep(1)" class="btn-press inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back
      </button>
      <button onclick="goToStep(3)" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
        Continue to Payment <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `}function fe(){const t=I(e.manualPaymentAccounts),a=ce(),r=e.paymentGateway==="both"||e.paymentGateway==="flutterwave",i=e.paymentGateway==="both"||e.paymentGateway==="manual";return`
    <!-- Payment method selection -->
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="credit-card" class="w-4 h-4 text-blue-600"></i> Payment Method
      </h3>
      <div class="space-y-3">
        <!-- Flutterwave -->
        ${r?`<div onclick="selectPaymentMethod('flutterwave')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${e.paymentMethod==="flutterwave"?"selected":"bg-gray-50 border-blue-100 hover:border-blue-200"}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><i data-lucide="zap" class="w-5 h-5 text-blue-600"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-gray-900">Flutterwave</h4>
              <p class="text-xs text-gray-500">Pay with card, bank transfer, USSD, or mobile money</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${e.paymentMethod==="flutterwave"?"border-blue-500 bg-blue-500":"border-gray-300"} flex items-center justify-center">
              ${e.paymentMethod==="flutterwave"?'<div class="w-2 h-2 bg-white rounded-full"></div>':""}
            </div>
          </div>
        </div>`:""}

        <!-- Manual Bank Transfer -->
        ${i?`<div onclick="selectPaymentMethod('manual_bank_transfer')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${e.paymentMethod==="manual_bank_transfer"?"selected":"bg-gray-50 border-blue-100 hover:border-blue-200"}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-gray-900">Manual Bank Transfer</h4>
              <p class="text-xs text-gray-500">Pay to the matched country account and upload your receipt</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${e.paymentMethod==="manual_bank_transfer"?"border-blue-500 bg-blue-500":"border-gray-300"} flex items-center justify-center">
              ${e.paymentMethod==="manual_bank_transfer"?'<div class="w-2 h-2 bg-white rounded-full"></div>':""}
            </div>
          </div>
        </div>`:""}
      </div>
    </div>

    <!-- Currency selector -->
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-3">
        <i data-lucide="globe" class="w-4 h-4 text-blue-600"></i> Payment Currency
      </h3>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        ${t.map(s=>{const l=e.manualPaymentAccounts.find(n=>n.currency===s);return l?`<button onclick="selectCurrency('${s}')" class="btn-press flex flex-col items-center gap-1 p-2.5 rounded-xl border transition relative overflow-hidden ${s===e.selectedCurrency?"bg-blue-50 border-blue-300 text-blue-600":"bg-gray-50 border-blue-100 text-gray-600 hover:border-blue-200"}">
            <span class="text-xl">${l.flag}</span><span class="text-xs font-bold">${s}</span>
          </button>`:""}).join("")}
      </div>
    </div>

    <!-- Bank account details (if manual) -->
    ${e.paymentMethod==="manual_bank_transfer"?xe(a.account,a.fallbackNotice,e.manualPaymentInstructions):""}

    <!-- Place order button -->
    <div class="space-y-3">
      ${e.paymentMethod==="flutterwave"?`
        <button onclick="payWithFlutterwave()" id="flw-pay-btn" class="btn-press w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="zap" class="w-5 h-5"></i> Pay ${O()} with Flutterwave
        </button>
      `:`
        <button onclick="placeOrderManual()" id="manual-pay-btn" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="check-circle" class="w-5 h-5"></i> Place Order & Upload Receipt
        </button>
      `}
      <button onclick="goToStep(2)" class="btn-press w-full bg-gray-100 hover:bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
        <i data-lucide="arrow-left" class="w-4 h-4 inline mr-2"></i> Back to Shipping
      </button>
    </div>

    <p class="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mt-3">
      <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> Your payment is secured with SSL encryption.
    </p>
  `}function xe(t,a,r){const i=[{label:"Beneficiary Name",value:t.beneficiary},{label:"Bank Name",value:t.bankName},{label:"Account Number",value:t.accountNumber},{label:"IBAN",value:t.iban},{label:"SWIFT / BIC",value:t.swift},{label:"Routing (ABA)",value:t.routing},{label:"Sort Code",value:t.sortCode},{label:"Bank Code",value:t.bankCode},{label:"Branch Code",value:t.branchCode},{label:"Institution Number",value:t.institutionNumber},{label:"Transit Number",value:t.transitNumber},{label:"BSB Code",value:t.bsbCode},{label:"Bank Address",value:t.address}].filter(s=>s.value&&s.value.trim()!=="");return`
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up">
      ${a?`<div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">${a.message}</div>`:""}
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-blue-50 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Receiving Bank Account</h3>
          <p class="text-gray-500 text-xs">${t.flag} ${t.currencyName} (${t.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200"><i data-lucide="shield-check" class="w-3 h-3"></i> Verified</span>
      </div>
      <div class="space-y-2">
        ${i.map(s=>`
          <div class="flex items-center justify-between gap-3 bg-gray-50 border border-blue-100 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1"><div class="text-gray-500 text-[11px] uppercase tracking-wide">${s.label}</div><div class="text-gray-900 text-sm font-medium font-mono break-all">${s.value}</div></div>
            <button onclick="copyToClipboard('${s.value.replace(/'/g,"\\'")}')" class="shrink-0 p-2 bg-gray-100 hover:bg-blue-100 border border-blue-200 rounded-lg transition"><i data-lucide="copy" class="w-4 h-4 text-gray-600"></i></button>
          </div>
        `).join("")}
      </div>
      <div class="mt-4 p-3 bg-gray-50 border border-blue-100 rounded-xl text-xs text-gray-700 leading-relaxed">${r||"After payment, upload your receipt for verification so your goods can be shipped immediately."}</div>
    </div>
  `}function ve(){const t=h();return _(),`
    <div class="glass border border-blue-200 rounded-2xl p-5 slide-up lg:sticky lg:top-20">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="receipt" class="w-4 h-4 text-blue-600"></i> Order Summary
      </h3>
      <div class="space-y-3 mb-4">
        ${e.cartItems.map(a=>`
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                <img src="${a.listing.images?.[0]||w}" class="w-full h-full object-cover" onerror="this.src='${w}'">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-gray-900 truncate">${a.listing.title}</p>
                <p class="text-xs text-gray-500">Qty: ${a.quantity}</p>
              </div>
              <p class="text-xs font-bold text-amber-600 shrink-0">${C(a.listing.price*a.quantity,a.listing.currency||"USD")}</p>
            </div>
          `).join("")}
      </div>
      <div class="space-y-2 pt-4 border-t border-blue-100">
        <div class="flex justify-between text-sm"><span class="text-gray-500">Subtotal</span><span class="text-gray-900 font-bold">${k(g(t,e.selectedCurrency),e.selectedCurrency)}</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-500">Shipping</span><span class="text-emerald-600 font-bold">Free</span></div>
        ${S()>0?`<div class="flex justify-between text-sm"><span class="text-gray-500">Tax</span><span class="text-gray-900 font-bold">${k(g(S(),e.selectedCurrency),e.selectedCurrency)}</span></div>`:""}
        <div class="flex justify-between text-lg pt-2 border-t border-blue-100"><span class="text-gray-900 font-bold">Total</span><span class="text-amber-600 font-black">${O()}</span></div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 border border-blue-100 rounded-xl">
        <div class="flex items-center gap-2 text-xs text-gray-600">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          <span>Secured with SSL encryption</span>
        </div>
      </div>
      <div class="mt-3 p-3 bg-gray-50 border border-blue-100 rounded-xl">
        <div class="flex items-center gap-2 text-xs text-gray-600">
          <i data-lucide="package" class="w-4 h-4 text-blue-600"></i>
          <span>Order #: <span class="text-blue-600 font-mono font-bold">${e.orderNumber}</span></span>
        </div>
      </div>
      ${e.step<3?`
        <button onclick="goToStep(${e.step+1})" class="btn-press w-full mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          ${e.step===1?"Proceed to Checkout":"Continue to Payment"} <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      `:""}
    </div>
  `}function F(){return`
    <div class="glass border border-blue-200 rounded-2xl p-10 text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4"><i data-lucide="shopping-cart" class="w-8 h-8 text-blue-600"></i></div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
      <p class="text-sm text-gray-500 mb-6">Add items to your cart before checking out.</p>
      <a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="shopping-bag" class="w-4 h-4"></i> Browse Marketplace</a>
    </div>
  `}window.changeQty=(t,a)=>{e.cartItems[t].quantity=Math.max(1,e.cartItems[t].quantity+a);try{const r=JSON.parse(localStorage.getItem("kco_cart")||"[]");if(!Array.isArray(r))return p();const i=e.cartItems[t].listing.property_id,s=r.find(l=>(typeof l=="string"?l:l&&l.id)===i);s&&typeof s=="object"&&s.id&&(s.qty=e.cartItems[t].quantity),localStorage.setItem("kco_cart",JSON.stringify(r)),window.dispatchEvent(new CustomEvent("kco-cart-changed"))}catch{}p()};window.removeCartItem=t=>{const a=e.cartItems[t].listing.property_id;e.cartItems.splice(t,1);try{const r=JSON.parse(localStorage.getItem("kco_cart")||"[]");if(Array.isArray(r)){const i=r.filter(s=>(typeof s=="string"?s:s&&s.id)!==a);localStorage.setItem("kco_cart",JSON.stringify(i)),window.dispatchEvent(new CustomEvent("kco-cart-changed"))}}catch{}if(e.cartItems.length===0){document.getElementById("checkout-root").innerHTML=F(),window.lucide&&lucide.createIcons();return}p()};window.goToStep=t=>{t===3&&!we()||(t===2&&H(),e.step=t,p(),window.scrollTo({top:0,behavior:"smooth"}))};function H(){(e.isGuest||!e.selectedAddressId)&&(e.fullName=document.getElementById("ship-name")?.value||e.fullName,e.phone=document.getElementById("ship-phone")?.value||e.phone,e.email=document.getElementById("ship-email")?.value||e.email||e.user?.email||"",e.shippingAddr1=document.getElementById("ship-addr1")?.value||"",e.shippingAddr2=document.getElementById("ship-addr2")?.value||"",e.shippingCity=document.getElementById("ship-city")?.value||"",e.shippingState=document.getElementById("ship-state")?.value||"",e.shippingPostal=document.getElementById("ship-postal")?.value||"",e.shippingCountry=document.getElementById("ship-country")?.value||e.shippingCountry,G()),e.billingSame=document.getElementById("billing-same")?.checked??!0,e.billingSame||(e.billingAddress=document.getElementById("billing-address")?.value||"")}function we(){return H(),e.selectedAddressId&&!e.isGuest?!0:!e.fullName||!e.phone||!e.shippingAddr1||!e.shippingCity||!e.shippingState||!e.shippingPostal?(y("Please fill in all required shipping fields."),!1):e.isGuest&&!e.email?(y("Please enter your email address."),!1):!0}window.selectAddress=t=>{if(e.selectedAddressId=t||null,t){const a=e.addresses.find(r=>r.id===t);a&&(e.fullName=a.full_name,e.phone=a.phone,e.shippingAddr1=a.address_line1,e.shippingAddr2=a.address_line2||"",e.shippingCity=a.city,e.shippingState=a.state,e.shippingPostal=a.postal_code,e.shippingCountry=a.country_code,G())}p()};window.toggleBilling=()=>{e.billingSame=document.getElementById("billing-same").checked,document.getElementById("billing-fields").classList.toggle("hidden",e.billingSame)};window.selectPaymentMethod=t=>{e.paymentMethod=t,p()};window.selectCurrency=t=>{e.currencyManuallySelected=!0,e.selectedCurrency=t,p()};window.copyToClipboard=oe;async function R(t,a={}){h(),_();const r=e.selectedAddressId&&e.addresses.length?(()=>{const n=e.addresses.find(d=>d.id===e.selectedAddressId);return n?`${n.address_line1}, ${n.city}, ${n.state} ${n.postal_code}, ${n.country_code}`:""})():`${e.shippingAddr1}${e.shippingAddr2?", "+e.shippingAddr2:""}, ${e.shippingCity}, ${e.shippingState} ${e.shippingPostal}, ${e.shippingCountry}`,i=e.billingSame?r:e.billingAddress||r,s={order_number:e.orderNumber,listing_id:e.listing.property_id,listing_title:e.listing.title,amount:U(),currency:e.selectedCurrency,full_name:e.fullName,email:e.email||e.user?.email||"",phone:e.phone,status:"order_placed",payment_method:t,subtotal:g(h(),e.selectedCurrency),quantity:e.cartItems.reduce((n,d)=>n+d.quantity,0),billing_address:i,...a};e.isGuest?(s.is_guest=!0,s.user_id=null,s.guest_shipping_address=r,s.guest_country=e.shippingCountry,s.guest_state=e.shippingState,s.guest_city=e.shippingCity,s.guest_postal_code=e.shippingPostal):(s.user_id=e.user.id,e.selectedAddressId&&(s.shipping_address_id=e.selectedAddressId));const{error:l}=await v.from("payment_receipts").insert(s);if(l)throw new Error("Failed to create order: "+l.message);return s}window.payWithFlutterwave=async()=>{const t=document.getElementById("flw-pay-btn");t.disabled=!0,t.innerHTML='<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Initializing payment...',window.lucide&&lucide.createIcons();try{await R("flutterwave"),localStorage.setItem("kco_pending_order",e.orderNumber);const a=se(e.selectedCurrency),r=g(_(),a),i=await fetch("https://mzgrjwvwzgqgivwmlkno.supabase.co/functions/v1/flutterwave-payment?action=initialize",{method:"POST",headers:{Authorization:"Bearer sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX","Content-Type":"application/json"},body:JSON.stringify({amount:r,currency:a,customer_name:e.fullName,customer_email:e.email||e.user?.email,customer_phone:e.phone,order_number:e.orderNumber,redirect_url:`${window.location.origin}/checkout.html?status=verify&order_number=${e.orderNumber}`})}),s=await i.json();if(!i.ok||s.error)throw new Error(s.error||"Failed to initialize payment");window.location.href=s.payment_link}catch(a){t.disabled=!1,t.innerHTML='<i data-lucide="zap" class="w-5 h-5"></i> Pay with Flutterwave',window.lucide&&lucide.createIcons(),y(a.message||"Payment initialization failed.")}};async function _e(t,a,r){const i=document.getElementById("checkout-root");i.innerHTML=`
    <div class="flex flex-col items-center justify-center py-20 fade-in">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 pulse-glow">
        <i data-lucide="loader-2" class="w-10 h-10 text-blue-600 animate-spin"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Verifying Payment...</h1>
      <p class="text-gray-600 text-sm">Please wait while we confirm your payment.</p>
    </div>
  `,window.lucide&&lucide.createIcons();try{const s=await fetch("https://mzgrjwvwzgqgivwmlkno.supabase.co/functions/v1/flutterwave-payment?action=verify",{method:"POST",headers:{Authorization:"Bearer sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX","Content-Type":"application/json"},body:JSON.stringify({transaction_id:t,tx_ref:a,order_number:r})}),l=await s.json();if(!s.ok||l.error||l.status==="failed"){i.innerHTML=D(l.message||l.error||"Payment verification failed."),window.lucide&&lucide.createIcons();return}i.innerHTML=$e(r),window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(L),localStorage.removeItem("kco_pending_order"),localStorage.removeItem("kco_cart")}catch(s){i.innerHTML=D(s.message),window.lucide&&lucide.createIcons()}}function $e(t){return`
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-600"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h1>
      <p class="text-gray-600 text-sm mb-6">Your order has been confirmed and an email receipt has been sent.</p>
      <div class="glass border border-blue-200 rounded-2xl p-5 mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-600 font-mono font-bold">${t}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Status</span><span class="text-emerald-600 font-bold">Payment Received</span></div>
        <div class="border-t border-blue-100 pt-3 mt-3">
          <p class="text-xs text-gray-600">You will receive email notifications at each stage: processing, shipping, and delivery.</p>
        </div>
      </div>
      <div class="flex gap-3 justify-center">
        <a href="/account.html" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          <i data-lucide="package" class="w-4 h-4"></i> Track Order
        </a>
        <a href="/" class="btn-press inline-flex items-center gap-2 bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          Continue Shopping
        </a>
      </div>
    </div>
  `}function D(t){return`
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6 check-pop">
        <i data-lucide="x-circle" class="w-12 h-12 text-red-600"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">Payment Failed</h1>
      <p class="text-gray-600 text-sm mb-2">${t}</p>
      <p class="text-gray-500 text-xs mb-6">Your order has been saved. You can retry payment from your account dashboard.</p>
      <div class="flex gap-3 justify-center">
        <a href="/checkout.html" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          <i data-lucide="refresh-cw" class="w-4 h-4"></i> Try Again
        </a>
        <a href="/account.html" class="btn-press inline-flex items-center gap-2 bg-gray-100 border border-blue-200 text-gray-600 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          View Orders
        </a>
      </div>
    </div>
  `}window.placeOrderManual=async()=>{const t=document.getElementById("manual-pay-btn");t.disabled=!0,t.innerHTML='<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Creating order...',window.lucide&&lucide.createIcons();try{await R("manual_bank_transfer");try{await fetch("https://mzgrjwvwzgqgivwmlkno.supabase.co/functions/v1/send-order-notification",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer sb_publishable_SqmJ1R-a-_0CYzuVbS1c7w_FSSIfEsX"},body:JSON.stringify({order_number:e.orderNumber})})}catch{}const a=new URLSearchParams({id:e.listing.property_id,order:e.orderNumber});e.isGuest&&a.set("guest","1"),window.location.href=`/payment.html?${a.toString()}`}catch(a){t.disabled=!1,t.innerHTML='<i data-lucide="check-circle" class="w-5 h-5"></i> Place Order & Upload Receipt',window.lucide&&lucide.createIcons(),y(a.message||"Failed to create order.")}};pe();
