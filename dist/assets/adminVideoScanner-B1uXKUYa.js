import"./modulepreload-polyfill-B5Qt9EMX.js";import{supabase as y,SUPABASE_URL as k}from"./supabase-client-DSkAnHxH.js";import{getCurrentUser as R}from"./auth-CtTDfG3h.js";import{l as V,b as h,n as z,a as w,c as N,s as H,p as Y,d as G,g as W,i as S,v as _,e as J,u as X,f as K,h as Q,C as T,F as Z}from"./showroom-write-Domq7NWE.js";/* empty css                                       */const ee=180*1024*1024,te=8,ie=["video/mp4","video/quicktime","video/webm","video/m4v","video/x-m4v","video/x-msvideo","video/x-matroska","application/octet-stream"];let i={user:null,file:null,objectUrl:null,phase:"idle",progress:0,stageText:"",result:null,items:[],activeItemIndex:0,itemIds:[],error:null,notice:null,question:"",frames:[],framesFor:null,existingImages:[],includeVideo:!1,sourceVideoUrl:null,draftId:null,drafts:[],publishedLinks:[],busy:!1};function b(e){return document.getElementById(e)}function f(e){const t=b("toast");if(!t)return;const a=b("toast-msg");a&&(a.textContent=e),t.classList.remove("translate-y-20","opacity-0"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.add("translate-y-20","opacity-0"),3800),window.lucide&&lucide.createIcons()}function o(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function j(e){if(!e)return"0 MB";const t=e/(1024*1024);return t>=1024?`${(e/(1024*1024*1024)).toFixed(2)} GB`:`${t.toFixed(1)} MB`}function F(e,t="USD"){const a=Number(e);if(!Number.isFinite(a)||a<=0)return"—";try{return a.toLocaleString("en-US",{style:"currency",currency:t||"USD",maximumFractionDigits:2})}catch{return`$${a.toLocaleString("en-US")}`}}function U(){window.lucide&&lucide.createIcons()}function ae(e){const t=String(e?.name||"").toLowerCase(),a=t.includes(".")?t.split(".").pop():"";return ie.includes(e?.type)?!0:["mp4","mov","webm","m4v","avi","mkv"].includes(a)}function I(){return i.busy||i.phase==="uploading"||i.phase==="scanning"||i.phase==="extracting"}function x(e,t){return(e?.fields||[]).find(a=>a.key===t&&!a.removed)}function se(e){return i.items[e]||i.items[0]}function m(){const e=b("admin-root");e&&(e.innerHTML=`
    <div class="max-w-6xl mx-auto space-y-6 pb-24" id="scanner-app">
      ${re()}
      ${ne()}
      ${i.phase==="review"||i.phase==="saving"||i.phase==="publishing"?oe():""}
      ${pe()}
    </div>`,U())}function re(){return`
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in" id="hero">
      <a href="/admin.html" class="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition text-xs font-semibold mb-3">
        <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to Admin Dashboard
      </a>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 text-violet-300">
            <i data-lucide="clapperboard" class="w-4 h-4"></i>
            <span class="text-[11px] font-bold uppercase tracking-widest">AI listing builder</span>
          </div>
          <h2 class="text-white font-black text-2xl mt-1">AI Video Scanner</h2>
          <p class="text-gray-400 text-sm mt-1">Upload a real video. The AI watches it, builds the right listing form for what it sees, and fills in the fields for you. You review, edit, save or publish.</p>
        </div>
        <div class="flex flex-col items-center gap-1 bg-violet-500/10 border border-violet-500/20 rounded-xl px-5 py-3">
          <i data-lucide="film" class="w-5 h-5 text-violet-300"></i>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider">Max size</span>
          <span class="text-white font-bold text-sm">180 MB</span>
        </div>
      </div>
    </div>`}function ne(){const e=I(),t=i.file?`
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
        <video src="${i.objectUrl}" class="w-full h-full object-cover" muted playsinline></video>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-white font-bold text-sm truncate">${o(i.file.name)}</p>
        <p class="text-gray-400 text-xs mt-0.5">${j(i.file.size)} • ${o(i.file.type||"video")}</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button data-role="scan" class="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold py-2.5 px-5 rounded-xl text-sm btn-press" ${e?"disabled":""}>
            <i data-lucide="${i.phase==="scanning"?"loader-2":"scan-line"}" class="${i.phase==="scanning"?"animate-spin ":""}w-4 h-4"></i>
            ${i.phase==="scanning"?"Analyzing…":i.result?"Re-scan Video":"Upload & Scan Video"}
          </button>
          <button data-role="clear" class="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition text-xs font-semibold py-2.5 px-3 rounded-lg" ${e?"disabled":""}>
            <i data-lucide="x" class="w-4 h-4"></i> Remove
          </button>
        </div>
      </div>
    </div>`:"";return`
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-white font-bold text-sm flex items-center gap-2"><i data-lucide="upload-cloud" class="w-4 h-4 text-violet-400"></i> Upload Video</h3>
        <span class="text-[10px] text-gray-500 uppercase tracking-wider">Step 1 · Choose file</span>
      </div>

      ${i.error?`
        <div class="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-300 flex items-start gap-2">
          <i data-lucide="circle-alert" class="w-4 h-4 text-red-400 mt-0.5 shrink-0"></i>
          <span>${o(i.error)}</span>
        </div>`:""}

      <input type="file" id="file-input" accept="video/mp4,video/quicktime,video/webm,video/x-m4v,video/x-msvideo,video/x-matroska,.mp4,.mov,.webm,.m4v" class="hidden" ${e?"disabled":""}>

      ${i.file?t:`
      <label for="file-input" id="drop-zone" class="block cursor-pointer rounded-xl border-2 border-dashed border-violet-500/30 hover:border-violet-500/60 transition bg-violet-500/5 hover:bg-violet-500/10 p-10 text-center ${e?"pointer-events-none opacity-40":""}">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mb-4">
          <i data-lucide="video" class="w-7 h-7 text-violet-400"></i>
        </div>
        <p class="text-white font-bold text-sm">Drag a video here, or <span class="text-violet-400 underline">browse</span></p>
        <p class="text-gray-500 text-xs mt-2">MP4, MOV or WebM up to 180&nbsp;MB — video only.</p>
      </label>`}

      <div class="mt-4">
        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Anything specific to look for? (optional)</label>
        <input id="scan-question" type="text" value="${o(i.question)}" placeholder="e.g. focus on the condition and colour" class="input-field mt-1.5 w-full bg-gray-900/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500" ${e?"disabled":""}>
      </div>

      ${i.phase==="uploading"||i.phase==="scanning"?M():""}
    </div>`}function M(){i.phase==="uploading"&&i.progress;const e=i.phase==="scanning"||i.progress>=100;return`
    <div id="prog-holder" class="mt-4">
      <div class="flex items-center justify-between text-xs mb-1.5">
        <span id="stage-text" class="text-gray-300 flex items-center gap-1.5">
          <i data-lucide="${e?"sparkles":"loader-2"}" class="${e?"":"animate-spin"} w-3.5 h-3.5 text-violet-400"></i>
          ${o(i.stageText||(e?"Analyzing video…":`Uploading… ${Math.round(i.progress)}%`))}
        </span>
        <span class="text-gray-500 font-mono">${e?"—":Math.round(i.progress)+"%"}</span>
      </div>
      <div class="h-2 rounded-full bg-white/5 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full progress-stripes transition-all duration-300" style="width:${e?100:Math.max(3,i.progress)}%"></div>
      </div>
    </div>`}function oe(){const e=i.items,t=Math.min(i.activeItemIndex,e.length-1),a=e[t],s=_(a,{requirePrice:!0}).errors,n=new Set(s.map(l=>l.key)),r=e.length>1?`
    <div class="flex flex-wrap gap-2 mb-4">
      ${e.map((l,c)=>`
        <button data-role="item-tab" data-index="${c}" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition ${c===t?"bg-violet-600 border-violet-500 text-white":"bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"}">
          ${o((l.title||`Item ${c+1}`).slice(0,28)||`Item ${c+1}`)}
        </button>`).join("")}
    </div>`:"";return`
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in" id="review-panel">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h3 class="text-white font-bold text-sm flex items-center gap-2"><i data-lucide="wand-sparkles" class="w-4 h-4 text-violet-400"></i> AI-Generated Listing Form</h3>
        <span class="text-[10px] text-gray-500 uppercase tracking-wider">${e.length>1?`${e.length} items found`:"Step 2 · Review & edit"}</span>
      </div>
      <p class="text-xs text-gray-400 mb-4">The AI chose these fields and pre-filled everything it could read from the video. Blank fields mean the information was not visible — <strong class="text-gray-200">nothing was invented.</strong> Edit any value, or add/remove/rename fields.</p>

      ${i.notice?`<div class="mb-4 rounded-xl border border-violet-500/25 bg-violet-500/10 p-3 text-xs text-violet-200 flex items-center gap-2"><i data-lucide="info" class="w-4 h-4"></i><span>${o(i.notice)}</span></div>`:""}
      ${i.publishedLinks.length?`<div class="mb-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs text-emerald-200 flex flex-wrap items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4"></i><span>Published &amp; live:</span>${i.publishedLinks.map((l,c)=>`<a href="${o(l.url)}" target="_blank" rel="noopener" class="underline font-semibold">Listing ${c+1} →</a>`).join(" · ")}</div>`:""}
      ${s.length?`<div class="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-start gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 mt-0.5 shrink-0"></i><span>Fill these before publishing: <strong>${s.map(l=>o(l.key)).join(", ")}</strong>. You can still save a draft.</span></div>`:""}

      ${r}

      <div class="rounded-xl border border-white/10 bg-white/[.02] p-4 mb-4">
        <div class="grid sm:grid-cols-3 gap-3">
          <div>
            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Type</label>
            <select data-role="item-listing-type" data-index="${t}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white outline-none focus:border-violet-500">
              ${["product","vehicle","property","service"].map(l=>`<option value="${l}" ${a.listing_type===l?"selected":""}>${Q(l)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</label>
            <select data-role="item-category" data-index="${t}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white outline-none focus:border-violet-500">
              <option value="">— choose —</option>
              ${!T.includes(a.category)&&a.category?`<option value="${o(a.category)}" selected>${o(a.category)}</option>`:""}
              ${T.map(l=>`<option value="${o(l)}" ${a.category===l?"selected":""}>${o(l)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-500">Subcategory</label>
            <input data-role="item-subcategory" data-index="${t}" value="${o(a.subcategory)}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white outline-none focus:border-violet-500" placeholder="e.g. SUV">
          </div>
        </div>
      </div>

      <div data-role="fields" class="grid md:grid-cols-2 gap-3">
        ${w(a).map(l=>le(t,l,n.has(l.key))).join("")}
      </div>

      <button data-role="add-field" data-index="${t}" class="mt-3 inline-flex items-center gap-2 text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-500/60 rounded-xl px-4 py-2 text-xs font-bold transition">
        <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add field
      </button>

      ${ce()}

      ${ue()}
    </div>`}function le(e,t,a){const s=o(t.key),n=t.type==="select"||t.type==="multiselect";return`
    <div class="rounded-xl border ${a?"border-amber-500/40 bg-amber-500/5":"border-white/10 bg-white/[.02]"} p-3" data-field-card data-item="${e}" data-key="${s}">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <input data-role="label" data-item="${e}" data-key="${s}" value="${o(t.label)}" class="flex-1 min-w-[7rem] bg-transparent border-b border-white/10 focus:border-violet-500 outline-none text-sm font-bold text-white py-0.5">
        <select data-role="type" data-item="${e}" data-key="${s}" class="bg-gray-900 border border-white/10 rounded-lg text-[11px] text-gray-300 px-2 py-1 outline-none">
          ${Z.map(r=>`<option value="${r.type}" ${r.type===t.type?"selected":""}>${r.label}</option>`).join("")}
        </select>
        <label class="flex items-center gap-1 text-[11px] text-gray-400 select-none"><input type="checkbox" data-role="required" data-item="${e}" data-key="${s}" ${t.required?"checked":""}> req</label>
        <button data-role="remove" data-item="${e}" data-key="${s}" class="text-gray-500 hover:text-red-400 p-1" title="Remove field"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
      </div>
      ${de(e,t)}
      ${n?`
        <div class="mt-2">
          <label class="text-[10px] uppercase tracking-wider text-gray-500">Options (comma separated)</label>
          <input data-role="options" data-item="${e}" data-key="${s}" value="${o(t.options.join(", "))}" class="mt-1 w-full bg-gray-900/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-violet-500">
        </div>`:""}
      ${t.help?`<p class="text-[10px] text-gray-500 mt-1.5">${o(t.help)}</p>`:""}
    </div>`}function de(e,t){const a=o(t.key),s='data-role="value" data-item="'+e+'" data-key="'+a+'" data-kind="'+o(t.type)+'"',n="input-field w-full bg-gray-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500",r=t.value;if(t.type==="textarea")return`<textarea ${s} rows="4" class="${n}" placeholder="Describe the item…">${o(r)}</textarea>`;if(t.type==="select")return`<select ${s} class="${n}">
      <option value="">— choose —</option>
      ${t.options.map(u=>`<option value="${o(u)}" ${String(r)===u?"selected":""}>${o(u)}</option>`).join("")}
    </select>`;if(t.type==="multiselect"){const u=Array.isArray(r)?r.join(", "):String(r||"");return`<input ${s} data-csv="1" class="${n}" value="${o(u)}" placeholder="${o(t.options.join(", "))}">`}if(t.type==="boolean")return`<label class="flex items-center gap-2 text-sm text-gray-200"><input type="checkbox" ${s} ${r?"checked":""} class="w-4 h-4 accent-violet-500"> Yes</label>`;if(t.type==="price")return`<div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span><input ${s} type="number" step="any" inputmode="decimal" class="${n} !pl-7" value="${o(r)}" placeholder="0.00"></div>`;const l={number:"number",date:"date",url:"url",email:"email",phone:"tel"}[t.type]||"text",c=t.type==="number"?'step="any" inputmode="decimal"':"";return`<input ${s} type="${l}" ${c} class="${n}" value="${o(r)}" placeholder="${o(t.placeholder||"")}">`}function ce(e){const t=i.frames,a=t.filter(s=>s.selected).length;return`
    <div class="mt-5 rounded-xl border border-white/10 bg-white/[.02] p-4">
      <div class="flex items-center justify-between mb-2">
        <h4 class="text-white font-bold text-sm flex items-center gap-2"><i data-lucide="images" class="w-4 h-4 text-fuchsia-400"></i> Product photos &amp; video</h4>
        <span class="text-[10px] text-gray-500 uppercase tracking-wider">${a} frame${a===1?"":"s"} selected</span>
      </div>
      ${i.phase==="extracting"?'<p class="text-xs text-gray-400 flex items-center gap-2"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Extracting frames from the video…</p>':""}

      ${i.existingImages.length?`
        <p class="text-[10px] uppercase tracking-wider text-gray-500 mt-1 mb-2">Saved photos</p>
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
          ${i.existingImages.map((s,n)=>`
            <div class="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
              <img src="${o(s)}" class="w-full h-full object-cover" loading="lazy" alt="">
              <button data-role="remove-image" data-index="${n}" class="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-1" title="Remove"><i data-lucide="x" class="w-3 h-3"></i></button>
            </div>`).join("")}
        </div>`:""}

      ${t.length?`
        <p class="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Frames from this video — tap to include/exclude</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          ${t.map((s,n)=>`
            <button data-role="frame-toggle" data-index="${n}" class="relative aspect-square rounded-lg overflow-hidden border-2 transition ${s.selected?"border-violet-500 ring-2 ring-violet-500/30":"border-white/10 opacity-70 hover:opacity-100"}">
              <img src="${s.url}" class="w-full h-full object-cover" loading="lazy" alt="">
              <span class="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] font-mono px-1 py-0.5 text-center">${ve(s.atMs)}</span>
              ${s.selected?'<span class="absolute top-1 right-1 bg-violet-600 text-white rounded-full p-0.5"><i data-lucide="check" class="w-3 h-3"></i></span>':""}
            </button>`).join("")}
        </div>`:!i.existingImages.length&&i.phase!=="extracting"?'<p class="text-xs text-gray-500">No product photos yet. Frames are captured automatically from the uploaded video.</p>':""}

      ${i.file?`
        <label class="mt-3 flex items-center gap-2 text-xs text-gray-300 select-none">
          <input type="checkbox" data-role="include-video" ${i.includeVideo?"checked":""} class="w-4 h-4 accent-violet-500">
          Also publish the source video (${j(i.file.size)})${i.file.size>60*1024*1024?" — large, may take a while":""}
        </label>`:""}
    </div>`}function ue(){const e=i.busy;return`
    <div class="mt-5 flex flex-col sm:flex-row gap-2 sm:items-center">
      <button data-role="save-draft" class="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold py-3 px-5 rounded-xl text-sm btn-press ${e?"opacity-50 pointer-events-none":""}">
        <i data-lucide="${e&&i.phase==="saving"?"loader-2":"save"}" class="${e&&i.phase==="saving"?"animate-spin ":""}w-4 h-4"></i> ${e&&i.phase==="saving"?"Saving…":"Save Draft"}
      </button>
      <button data-role="preview" class="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold py-3 px-5 rounded-xl text-sm btn-press ${e?"opacity-50 pointer-events-none":""}">
        <i data-lucide="eye" class="w-4 h-4"></i> Preview
      </button>
      <button data-role="publish" class="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-3 px-5 rounded-xl text-sm btn-press ${e?"opacity-50 pointer-events-none":""}">
        <i data-lucide="${e&&i.phase==="publishing"?"loader-2":"rocket"}" class="${e&&i.phase==="publishing"?"animate-spin ":""}w-4 h-4"></i> ${e&&i.phase==="publishing"?"Publishing…":"Publish"}
      </button>
    </div>`}function pe(){return i.drafts.length?`
    <div class="glass rounded-2xl border border-violet-500/15 p-5 fade-in" id="drafts-panel">
      <h3 class="text-white font-bold text-sm flex items-center gap-2 mb-4"><i data-lucide="archive" class="w-4 h-4 text-violet-400"></i> Saved Drafts <span class="text-gray-500 font-normal">(${i.drafts.length})</span></h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${i.drafts.map(e=>{const t=Array.isArray(e.images)&&e.images[0]?e.images[0]:"";return`
          <button data-role="open-draft" data-pid="${o(e.property_id)}" class="text-left rounded-xl border border-white/10 bg-white/[.02] hover:bg-white/[.06] transition overflow-hidden">
            <div class="h-28 bg-black/40 flex items-center justify-center overflow-hidden">
              ${t?`<img src="${o(t)}" class="w-full h-full object-cover" loading="lazy" alt="">`:'<i data-lucide="image" class="w-6 h-6 text-gray-600"></i>'}
            </div>
            <div class="p-3">
              <p class="text-sm font-bold text-white truncate">${o(e.title||"Untitled draft")}</p>
              <p class="text-[11px] text-gray-400 mt-0.5">${o(e.category||"Uncategorised")} • ${F(e.price,e.currency)}</p>
              <span class="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-violet-300 uppercase tracking-wider"><i data-lucide="pencil" class="w-3 h-3"></i> Open &amp; edit</span>
            </div>
          </button>`}).join("")}
      </div>
    </div>`:""}async function me(e){const a=String(e.name||"clip.mp4").slice(0,120).replace(/[^\w.\-]+/g,"_"),s=`scans/${Date.now()}-${Math.random().toString(36).slice(2,8)}-${a}`,n=`${k.replace(/\/+$/,"")}/functions/v1/video-scanner`,{data:{session:r}}=await y.auth.getSession(),l=r?.access_token||"",c=await D(n,{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({action:"upload_token",path:s,content_type:e.type||"video/mp4"})});return await new Promise((u,d)=>{const p=new XMLHttpRequest;p.open("PUT",c.url,!0),p.setRequestHeader("Content-Type",e.type||"video/mp4"),p.upload.onprogress=g=>{g.lengthComputable&&g.total&&(i.progress=15+Math.round(g.loaded/g.total*75),A())},p.onload=()=>{p.status>=200&&p.status<300?(i.progress=90,i.stageText="Video uploaded. Asking the AI…",A(),u()):d(new Error(`Upload failed (HTTP ${p.status}).`))},p.onerror=()=>d(new Error("Upload failed — check your connection.")),p.onabort=()=>d(new Error("Upload aborted.")),p.send(e)}),s}function A(){const e=b("prog-holder");e&&(e.innerHTML=M());const t=b("stage-text");t&&(t.textContent=i.stageText)}async function D(e,t){let a;try{a=await fetch(e,t)}catch{throw new Error("Could not reach the scanner service. Check your connection.")}let s={};try{s=await a.json()}catch{}if(!a.ok||s.error)throw new Error(s.error||`Request failed (${a.status}).`);return s}async function fe(){if(!i.file||I())return;i.error=null,i.notice=null,i.busy=!0,i.result=null,i.items=[],i.itemIds=[],i.draftId=null,i.existingImages=[],i.sourceVideoUrl=null,i.publishedLinks=[],v("uploading",{progress:5,stageText:"Preparing upload…"});let e=null;try{e=await me(i.file),v("scanning",{progress:92,stageText:"AI is watching the video…"});const t=`${k.replace(/\/+$/,"")}/functions/v1/video-scanner`,{data:{session:a}}=await y.auth.getSession(),s=a?.access_token||"",r=(await D(t,{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({action:"scan",path:e,model:"gemini-flash-latest",question:i.question.trim()||void 0})})).result||{status:"cannot_determine",items:[]};i.result=r;let l=z(r,{fallbackLabel:r.label});if((!r.items||r.items.length===0)&&(l=[ge(r.label)],i.notice="The AI could not identify specific details, so a blank starter form was created. Fill it in manually."),i.items=l,i.itemIds=l.map(()=>null),i.activeItemIndex=0,i.objectUrl&&!i.frames.length&&i.framesFor!==i.objectUrl){v("extracting",{stageText:"Extracting video frames…"});try{i.frames=await E(i.objectUrl)}catch{i.frames=[]}}i.busy=!1,v("review",{progress:100,stageText:"Done"}),f(r.status==="ok"?"Form generated and pre-filled from the video.":"Analysis complete — please review the form.")}catch(t){if(i.busy=!1,i.error=t.message,v(i.file?"ready":"idle",{error:t.message}),f(t.message),e)try{const{data:{session:a}}=await y.auth.getSession();await fetch(`${k.replace(/\/+$/,"")}/functions/v1/video-scanner`,{method:"POST",headers:{Authorization:`Bearer ${a?.access_token||""}`,"Content-Type":"application/json"},body:JSON.stringify({action:"cleanup",path:e})})}catch{}}}function ge(e){const t=[Object.assign(h("title"),{label:"Title",type:"text",required:!0,value:e||""}),Object.assign(h("brand"),{label:"Brand",type:"text"}),Object.assign(h("color"),{label:"Colour",type:"text"}),Object.assign(h("condition"),{label:"Condition",type:"select",required:!0,options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"]}),Object.assign(h("price"),{label:"Price",type:"price",required:!0}),Object.assign(h("description"),{label:"Description",type:"textarea"})];return{id:"item-1",title:e||"",listing_type:"product",category:"",subcategory:"",description:"",features:[],highlights:[],seo_keywords:[],image_hints:[],fields:t}}function v(e,t={}){Object.assign(i,{phase:e,...t}),m()}function ve(e){const t=Math.max(0,Math.round(e/1e3)),a=Math.floor(t/60);return`${String(a).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}function be(e,t){return new Promise(a=>{const s=()=>{e.removeEventListener("seeked",s),a()};e.addEventListener("seeked",s),e.currentTime=Math.min(t,Math.max(0,(e.duration||t)-.05)),setTimeout(s,2500)})}async function E(e,t=te){const a=document.createElement("video");a.src=e,a.muted=!0,a.playsInline=!0,a.preload="auto",await new Promise((c,u)=>{a.onloadedmetadata=()=>c(),a.onerror=()=>u(new Error("Could not read the video for frames.")),setTimeout(()=>c(),5e3)});const s=Number.isFinite(a.duration)&&a.duration>0?a.duration:0,n=document.createElement("canvas"),r=[],l=t;for(let c=0;c<l;c++){const u=s>0?s*((c+.5)/l):0;s>0&&await be(a,u);const d=a.videoWidth||640,p=a.videoHeight||360;n.width=d,n.height=p,n.getContext("2d").drawImage(a,0,0,d,p);const g=await new Promise(B=>n.toBlob(B,"image/jpeg",.82));g&&r.push({atMs:Math.round(u*1e3),blob:g,url:URL.createObjectURL(g),selected:c<4,uploadedUrl:null})}a.removeAttribute("src");try{a.load()}catch{}return r}async function he(e){const t=[];for(const s of i.existingImages)s&&t.push(s);for(const s of i.frames)s.selected&&(s.uploadedUrl||(s.uploadedUrl=await X(s.blob),s.uploadedUrl||f("A frame could not be uploaded and was skipped.")),s.uploadedUrl&&t.push(s.uploadedUrl));let a=i.sourceVideoUrl||null;return i.includeVideo&&i.file&&!a&&(a=await K(i.file),a?i.sourceVideoUrl=a:f("The source video could not be uploaded; continuing without it.")),{images:[...new Set(t)],videoUrl:a}}function xe(e){for(let t=0;t<e;t++)i.itemIds[t]||(t===0&&i.draftId?i.itemIds[t]=i.draftId:i.itemIds[t]=J())}function ye({requirePrice:e}){const t=[];return i.items.forEach((a,s)=>{const{errors:n}=_(a,{requirePrice:e});n.forEach(r=>t.push({item:s,...r}))}),t}async function L({publish:e}){if(i.busy||!i.items.length)return;const t=ye({requirePrice:e});if(e&&t.length){m(),f(`Please fill: ${[...new Set(t.map(a=>a.key))].join(", ")}`);return}i.busy=!0,i.error=null,i.notice=null,v(e?"publishing":"saving",{stageText:e?"Publishing…":"Saving draft…"});try{xe(i.items.length);const a=await he(),s=[];let n=[];for(let r=0;r<i.items.length;r++){const l=i.items[r],c={};for(const g of w(l))c[g.key]=g.value;const u=N(l,c,{propertyId:i.itemIds[r],images:a.images,videoUrl:a.videoUrl,isActive:e,isFeatured:!1,approvalStatus:e?"published":"draft",report:i.result,currency:"USD",extra:e?{published_at:new Date().toISOString()}:{}}),{error:d,dropped:p}=await H(u);if(d)throw d;n=n.concat(p||[]),s.push(u.property_id)}i.draftId=s[0]||i.draftId,i.itemIds=s.slice(),i.busy=!1,n.length&&(i.notice=`Saved, but the database is missing the column(s): ${[...new Set(n)].join(", ")}. Apply the latest migration so the generated form structure is stored.`),await O(),v("review",{stageText:"Saved",notice:i.notice}),e?(i.publishedLinks=s.map(r=>({pid:r,url:Y(r)})),f(`Published ${s.length} listing${s.length>1?"s":""} — live now.`),m()):(i.publishedLinks=[],f(`Draft saved${s.length>1?` (${s.length})`:""}. You can reopen it from Saved Drafts.`),m())}catch(a){i.busy=!1;const s=G(a,e?"Publish":"Draft save");i.error=s,v("review",{error:s}),f(s)}}function $(){const e=b("scanner-preview-overlay");e&&e.remove()}function we(){const e=se(i.activeItemIndex);if(!e)return;const t={};for(const d of w(e))t[d.key]=d.value;const a=t.title||e.title||"Untitled listing",s=x(e,"price"),n=s?s.value:"",r=t.description||e.description||"",l=[...i.existingImages,...i.frames.filter(d=>d.selected).map(d=>d.url)],c=w(e).filter(d=>d.key!=="title"&&d.key!=="price"&&d.key!=="description"&&String(d.value||"").trim()!=="");$();const u=document.createElement("div");u.id="scanner-preview-overlay",u.className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm overflow-y-auto p-4 sm:p-8",u.innerHTML=`
    <div class="max-w-4xl mx-auto bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden">
      <div class="sticky top-0 z-10 flex items-center justify-between gap-3 bg-[#0b1120]/95 border-b border-white/10 px-5 py-3">
        <span class="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider"><i data-lucide="eye" class="w-4 h-4"></i> Buyer preview</span>
        <button data-role="close-preview" class="text-gray-300 hover:text-white text-sm font-semibold"><i data-lucide="x" class="inline w-4 h-4"></i> Close</button>
      </div>
      <div class="p-5 sm:p-8">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="rounded-2xl overflow-hidden bg-black/40 min-h-[14rem] flex items-center justify-center">
            ${l[0]?`<img src="${o(l[0])}" class="w-full h-full object-cover" alt="">`:'<span class="text-gray-600 text-sm">No photos yet</span>'}
          </div>
          <div>
            <p class="text-[11px] font-bold uppercase tracking-widest text-violet-400">${o(e.category||"Uncategorised")}${e.subcategory?` · ${o(e.subcategory)}`:""}</p>
            <h1 class="text-2xl font-black text-white mt-1">${o(a)}</h1>
            <p class="text-3xl font-black text-emerald-400 mt-2">${n===""||n==null?'<span class="text-gray-500 text-base">Price on request</span>':F(n)}</p>
            <p class="text-sm text-gray-300 mt-4 whitespace-pre-line">${o(r)}</p>
            ${e.features?.length?`<div class="mt-4"><p class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Features</p><ul class="list-disc list-inside text-sm text-gray-300 space-y-0.5">${e.features.map(d=>`<li>${o(d)}</li>`).join("")}</ul></div>`:""}
          </div>
        </div>
        ${l.length>1?`<div class="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-5">${l.slice(1).map(d=>`<div class="aspect-square rounded-lg overflow-hidden border border-white/10"><img src="${o(d)}" class="w-full h-full object-cover" alt=""></div>`).join("")}</div>`:""}
        ${c.length?`
          <div class="mt-6">
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Specifications</p>
            <div class="grid sm:grid-cols-2 gap-2">
              ${c.map(d=>`<div class="flex justify-between gap-2 text-sm border-b border-white/5 py-1.5"><span class="text-gray-400">${o(d.label)}</span><span class="text-white font-semibold text-right">${o(d.value)}</span></div>`).join("")}
            </div>
          </div>`:""}
        ${e.highlights?.length?`<div class="mt-5 flex flex-wrap gap-2">${e.highlights.map(d=>`<span class="text-xs bg-violet-500/15 border border-violet-500/25 text-violet-200 rounded-full px-3 py-1">${o(d)}</span>`).join("")}</div>`:""}
        <p class="text-[11px] text-gray-600 mt-6">This is a live preview of the exact content that will be published.</p>
      </div>
    </div>`,document.body.appendChild(u),U()}async function O(){try{i.drafts=await V()}catch{i.drafts=[]}}async function $e(e){if(!e)return;v("extracting",{stageText:"Opening draft…"});const t=await W(e);if(!t){f("Could not load that draft."),v("review");return}const a=t.ai_form_schema?S(t.ai_form_schema,t):S(null,{title:t.title,description:t.description,listing_type:t.listing_type,category:t.category,subcategory:t.subcategory,fields:ke(t)});for(const s of a.fields)t[s.key]!=null&&t[s.key]!==""&&!["images","video_url"].includes(s.key)&&(s.value=Array.isArray(t[s.key])?t[s.key].join(", "):t[s.key]),t.specifications&&typeof t.specifications=="object"&&t.specifications[s.key]!=null&&(s.value=Array.isArray(t.specifications[s.key])?t.specifications[s.key].join(", "):t.specifications[s.key]);i.items=[a],i.itemIds=[e],i.draftId=e,i.result=t.ai_video_scan||null,i.existingImages=Array.isArray(t.images)?t.images.filter(s=>typeof s=="string"&&!/^data:video|\.mp4|\.mov|\.webm/i.test(s)):[],i.sourceVideoUrl=t.video_url||null,i.frames=[],i.framesFor=null,i.error=null,i.publishedLinks=[],i.notice="Draft loaded — make your changes, then Save Draft or Publish.",i.busy=!1,v("review"),window.scrollTo({top:0,behavior:"smooth"})}function ke(e){return[{key:"title",label:"Title",type:"text",required:!0,value:e.title||""},{key:"price",label:"Price",type:"price",required:!0,value:e.price||""},{key:"brand",label:"Brand",type:"text",value:e.brand||""},{key:"color",label:"Colour",type:"text",value:e.color||""},{key:"condition",label:"Condition",type:"select",options:["New","Refurbished","Used - Like New","Used - Good","Used - Fair"],value:e.condition||""},{key:"description",label:"Description",type:"textarea",value:e.description||""}]}function q(e,t){const a=Number(e.dataset.item),s=i.items[a];if(!s)return;const n=e.dataset.key;if(t==="label"){const r=x(s,n);r&&(r.label=e.value);return}if(t==="required"){const r=x(s,n);r&&(r.required=e.checked);return}if(t==="options"){const r=x(s,n);r&&(r.options=e.value.split(",").map(l=>l.trim()).filter(Boolean));return}if(t==="type"){const r=x(s,n);r&&(r.type=e.value,(r.type==="select"||r.type==="multiselect")&&(!r.options||r.options.length===0)&&(r.options=["Option 1","Option 2"]),r.type!=="multiselect"&&Array.isArray(r.value)&&(r.value=r.value.join(", ")),r.type==="multiselect"&&(r.value=Array.isArray(r.value)?r.value:String(r.value||"").split(",").map(l=>l.trim()).filter(Boolean))),m();return}if(t==="value"){const r=x(s,n);if(!r)return;r.type==="multiselect"||e.dataset.csv==="1"?r.value=e.value.split(",").map(l=>l.trim()).filter(Boolean):r.type==="boolean"?r.value=e.checked:r.value=e.value,r.key==="title"&&(s.title=e.value),r.key==="description"&&(s.description=e.value);return}}function je(e){const t=e.target.closest("[data-role]");if(!t)return;const a=t.dataset.role,s=Number(t.dataset.index);if(a==="scan"){e.preventDefault(),fe();return}if(a==="clear"){e.preventDefault(),Ae();return}if(a==="add-field"){const n=i.items[s];if(!n)return;n.fields.push(h("")),m();return}if(a==="remove"){const n=i.items[s],r=x(n,t.dataset.key);if(r&&r.key==="title"){f("The title field cannot be removed.");return}r&&(r.removed=!0,m());return}if(a==="item-tab"){i.activeItemIndex=s,m();return}if(a==="frame-toggle"){const n=i.frames[s];n&&(n.selected=!n.selected,m());return}if(a==="remove-image"){i.existingImages.splice(s,1),m();return}if(a!=="include-video"){if(a==="save-draft"){e.preventDefault(),L({publish:!1});return}if(a==="publish"){e.preventDefault(),L({publish:!0});return}if(a==="preview"){e.preventDefault(),we();return}if(a==="close-preview"){e.preventDefault(),$();return}if(a==="open-draft"){e.preventDefault(),$e(t.dataset.pid);return}}}function Ue(e){const t=e.target.closest("[data-role]");if(!t)return;const a=t.dataset.role;if(["item-listing-type","item-category","item-subcategory"].includes(a)){const s=i.items[Number(t.dataset.index)];if(!s)return;a==="item-listing-type"&&(s.listing_type=t.value),a==="item-category"&&(s.category=t.value),a==="item-subcategory"&&(s.subcategory=t.value);return}if(a==="include-video"){i.includeVideo=t.checked;return}["label","value","required","options","type"].includes(a)&&q(t,a)}function Ie(e){const t=e.target.closest("[data-role]");if(!t)return;const a=t.dataset.role;if(a==="scan-question"){i.question=t.value;return}["label","value","options"].includes(a)&&q(t,a)}function Se(e){const t=e.target.files?.[0];t&&C(t)}function Te(){const e=b("admin-root");!e||e._scannerBound||(e._scannerBound=!0,e.addEventListener("click",je),e.addEventListener("change",Ue),e.addEventListener("input",Ie),e.addEventListener("change",t=>{t.target&&t.target.id==="file-input"&&Se(t)}),["dragenter","dragover"].forEach(t=>e.addEventListener(t,a=>{a.target.closest&&a.target.closest("#drop-zone")&&a.preventDefault()})),e.addEventListener("drop",t=>{if(!t.target.closest||!t.target.closest("#drop-zone"))return;t.preventDefault();const a=t.dataTransfer?.files?.[0];a&&C(a)}),document.addEventListener("click",t=>{t.target.closest&&t.target.closest('[data-role="close-preview"]')&&(t.preventDefault(),$());const a=b("scanner-preview-overlay");a&&t.target===a&&$()}))}function C(e){if(!e||I())return;if(!ae(e)){f("Please choose a video file (MP4, MOV or WebM).");return}if(e.size>ee){f(`Video is too large (${j(e.size)}). Max is 180 MB.`);return}i.objectUrl&&URL.revokeObjectURL(i.objectUrl);for(const a of i.frames)try{URL.revokeObjectURL(a.url)}catch{}i.file=e,i.objectUrl=URL.createObjectURL(e),i.frames=[],i.framesFor=null,i.phase="ready",i.error=null,i.result=null,i.items=[],i.draftId=null,i.existingImages=[],i.sourceVideoUrl=null,i.includeVideo=e.size<40*1024*1024,m();const t=i.objectUrl;E(t).then(a=>{i.objectUrl===t&&(i.frames=a,i.framesFor=t,i.phase==="review"&&m())}).catch(()=>{})}function Ae(){i.objectUrl&&URL.revokeObjectURL(i.objectUrl);for(const e of i.frames)try{URL.revokeObjectURL(e.url)}catch{}Object.assign(i,{file:null,objectUrl:null,phase:"idle",progress:0,stageText:"",result:null,items:[],activeItemIndex:0,itemIds:[],error:null,notice:null,frames:[],framesFor:null,existingImages:[],includeVideo:!1,sourceVideoUrl:null,draftId:null}),m()}function P(e,t){const a=b("admin-root");a&&(a.innerHTML=`
    <div class="flex items-center justify-center py-20">
      <div class="text-center max-w-md">
        <div class="w-14 h-14 mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-4">
          <i data-lucide="shield-alert" class="w-7 h-7 text-red-400"></i>
        </div>
        <h2 class="text-white font-black text-xl mb-2">${o(e)}</h2>
        <p class="text-gray-400 text-sm mb-6">${o(t)}</p>
        <a href="/auth.html?redirect=/admin-video-scanner.html" class="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold py-2.5 px-5 rounded-xl text-sm btn-press">Sign In</a>
      </div>
    </div>`,U())}async function Le(){if(i.user=await R(),!i.user){P("Access denied","Please sign in to use the video scanner.");return}const{data:e}=await y.rpc("is_current_user_admin");if(!e){P("Admins only","This account does not have administrator privileges.");return}Te();try{await O()}catch{}m()}Le();
