import{U as m,I as u,b as x}from"./supabase-client-DvCmNkpI-BBtcpOs0.js";import"./localization-B_HxL1KQ-Do35V_4n.js";import{g as y,b,P as h,a as f}from"./motorhome-data-CupbOvk0--c7gbSNU.js";import{o as w,a as v}from"./phone-data-Of7KtnOV-OoM3wJJD.js";import{getCurrentUser as k,setRedirectAfterAuth as $}from"./auth-iMacRl0l-DlcadYa5.js";import{a as d,d as C,c,y as _,m as S}from"./cart-DNy8CJA3-Oz5JpZDi.js";import"./native-bridge-z1PkSgfH-CV6U1YtG.js";import"./localization-bootstrap-BhglmvwT-CYE5uVRZ.js";import"./app-promo-banner-VTpzwpvR-CiDTzVNv.js";import"./ai-chat-U-IZQEoO-DrOtSYGJ.js";const l="/fallback.svg";function P(t){return h.find(e=>e.id===t||e.property_id===t)||f.find(e=>e.id===t||e.property_id===t)}function T(t){return x(t)||y(t)||b(t)||w(t)||v(t)||P(t)}function i(t,e){return`${(parseFloat(t)||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} ${e}`}function j(t){const e=i(t.price,t.currency||"USD"),r=parseFloat(t.real_price);return Number.isFinite(r)&&r>0&&r>parseFloat(t.price)?`<span class="price-strike line-through text-gray-400 mr-1 text-xs">${i(r,t.currency||"USD")}</span><span class="text-amber-600 font-bold">${e}</span>`:`<span class="text-amber-600 font-bold">${e}</span>`}function p(t){const e=document.getElementById("toast-msg"),r=document.getElementById("toast");!e||!r||(e.textContent=t,r.classList.remove("translate-y-20","opacity-0"),r.classList.add("translate-y-0","opacity-100"),clearTimeout(window.__cartToastT),window.__cartToastT=setTimeout(()=>{r.classList.add("translate-y-20","opacity-0"),r.classList.remove("translate-y-0","opacity-100")},2e3))}function o(){return`
    <div class="max-w-md mx-auto text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-5">
        <i data-lucide="shopping-cart" class="w-7 h-7 text-gray-400"></i>
      </div>
      <h1 class="text-2xl font-black text-gray-900 tracking-tight">Your cart is empty</h1>
      <p class="text-sm text-gray-500 mt-2 mb-6">Browse the marketplace and tap "Add to Cart" on items you love.</p>
      <a href="/" class="btn-press inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-3 px-6 rounded-xl transition"><i data-lucide="shopping-bag" class="w-4 h-4"></i> Browse Marketplace</a>
    </div>
  `}function I(t){const e=t.reduce((s,a)=>s+(parseFloat(a.listing.price)||0)*a.qty,0),r=t.map(s=>{const a=s.listing,g=a.images?.[0]||l;return`
      <div class="flex flex-wrap items-center gap-x-4 gap-y-3 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl" data-cart-row="${a.property_id}">
        <a href="/details.html?id=${a.property_id}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 ring-1 ring-gray-200">
          <img src="${g}" alt="${a.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='${l}'">
        </a>
        <div class="flex-1 min-w-[160px] flex flex-col gap-1.5">
          <a href="/details.html?id=${a.property_id}" class="text-sm font-bold text-gray-900 break-words hover:text-blue-600 transition">${a.title}</a>
          <p class="text-[10px] text-gray-400">${a.property_id}</p>
          <div class="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm leading-snug">${j(a)}</div>
        </div>
        <div class="flex items-center gap-3 sm:gap-2 shrink-0 ml-auto sm:ml-0">
          <div class="flex items-center gap-2">
            <button onclick="cartPageChangeQty('${a.property_id}', -1)" class="w-9 h-9 bg-white hover:bg-blue-100 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center shrink-0" aria-label="Decrease quantity"><i data-lucide="minus" class="w-4 h-4"></i></button>
            <span class="text-sm font-bold text-gray-900 w-8 text-center" data-qty="${a.property_id}">${s.qty}</span>
            <button onclick="cartPageChangeQty('${a.property_id}', 1)" class="w-9 h-9 bg-white hover:bg-blue-100 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 transition flex items-center justify-center shrink-0" aria-label="Increase quantity"><i data-lucide="plus" class="w-4 h-4"></i></button>
          </div>
          <div class="text-right shrink-0 w-20 sm:w-24">
            <p class="text-sm font-black text-amber-600 whitespace-nowrap">${i((parseFloat(a.price)||0)*s.qty,a.currency||"USD")}</p>
          </div>
          <button onclick="cartPageRemove('${a.property_id}')" class="p-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-600 transition shrink-0" aria-label="Remove item"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
    `}).join("");return`
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
      <span class="text-xs text-gray-500">${t.length} item${t.length===1?"":"s"}</span>
    </div>
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-3">
        ${r}
        <button onclick="cartPageClear()" class="text-xs text-red-500 hover:text-red-700 font-semibold transition flex items-center gap-1.5 mt-2"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear Cart</button>
      </div>
      <div class="lg:col-span-1">
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-5 sticky top-20">
          <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Order Summary</h3>
          <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Subtotal</span><span class="text-gray-900 font-bold">${i(e,t[0].listing.currency||"USD")}</span></div>
          <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Shipping</span><span class="text-emerald-600 font-bold">Calculated at checkout</span></div>
          <div class="flex justify-between text-sm mb-4"><span class="text-gray-500">Total</span><span class="text-amber-600 text-lg font-black">${i(e,t[0].listing.currency||"USD")}</span></div>
          <button onclick="cartPageCheckout()" class="btn-press w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"><i data-lucide="lock" class="w-4 h-4"></i> Proceed to Checkout</button>
          <a href="/" class="block text-center text-xs text-gray-500 hover:text-gray-900 transition mt-3">Continue Shopping</a>
        </div>
      </div>
    </div>
  `}async function n(){const t=document.getElementById("cart-content");await m();const e=d();if(e.length===0){t.innerHTML=o(),window.lucide&&lucide.createIcons();return}const r=e.map(s=>{const a=T(s.id);return a?(u(a),{listing:a,qty:s.qty}):null}).filter(Boolean);if(r.length===0){t.innerHTML=o(),window.lucide&&lucide.createIcons();return}t.innerHTML=I(r),window.lucide&&lucide.createIcons()}window.cartPageChangeQty=(t,e)=>{const r=d().find(s=>s.id===t);r&&(C(t,r.qty+e),c(),n())};window.cartPageRemove=t=>{_(t),c(),n(),p("Removed from cart.")};window.cartPageClear=()=>{S(),c(),n(),p("Cart cleared.")};window.cartPageCheckout=async()=>{await k()?window.location.href="/checkout.html":($("/checkout.html"),window.location.href="/auth.html?redirect=/checkout.html")};n();
