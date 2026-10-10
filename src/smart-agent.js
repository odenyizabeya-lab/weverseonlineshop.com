/* ═══════════════════════════════════════════════════════════════════════
   Weverse Online Shop — Message System
   
   Provides a "Chat with Us" button for every product/property that opens a
   text chat with the sales team (company messaging). Phone calling has been
   removed from the product.
   
   Uses Pollinations AI (free, no key) for conversation intelligence.
   Zero server costs.
   ═══════════════════════════════════════════════════════════════════════ */

import { ANON_KEY, SUPABASE_URL, supabase } from './supabase-client.js';

const POLLINATIONS_URL = 'https://text.pollinations.ai/openai';

// ── Locale & Time Detection ───────────────────────────────────────
function detectLocale() {
  let country = '', countryName = '', language = '';
  try {
    const saved = JSON.parse(localStorage.getItem('kco_locale') || 'null');
    if (saved?.country) country = saved.country;
    if (saved?.countryName) countryName = saved.countryName;
    if (saved?.language) language = saved.language;
  } catch {}
  if (!language) {
    try { language = (navigator.language || 'en').split('-')[0]; } catch { language = 'en'; }
  }
  return { country, countryName, language };
}

function getLocalGreeting() {
  const now = new Date();
  const locale = detectLocale();
  let tz = 'UTC';
  try {
    const saved = JSON.parse(localStorage.getItem('kco_locale') || 'null');
    if (saved?.timezone) tz = saved.timezone;
  } catch {}
  try {
    const hour = parseInt(now.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', hour12: false }));
    const day = now.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long' });
    const isWeekend = day === 'Saturday' || day === 'Sunday';
    let timeGreeting = 'Hello';
    if (hour >= 5 && hour < 12) timeGreeting = 'Good morning';
    else if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
    else if (hour >= 17 && hour < 21) timeGreeting = 'Good evening';
    else timeGreeting = 'Good evening';
    const weekendGreeting = isWeekend ? ` Happy ${day}!` : '';
    return `${timeGreeting}${weekendGreeting}`;
  } catch {
    return 'Hello';
  }
}

// ── Representative Names by Language ───────────────────────────────
const AGENT_NAMES = {
  en: { male: ['Michael', 'James', 'Daniel', 'William', 'David', 'Alexander', 'Thomas', 'Oliver', 'Benjamin'], female: ['Emily', 'Sophia', 'Charlotte', 'Olivia', 'Emma', 'Amelia', 'Isabella', 'Victoria', 'Anna'] },
  zh: { male: ['Wei', 'Ming', 'Jun', 'Lei', 'Chen'], female: ['Xiao Mei', 'Li Na', 'Fang', 'Ying', 'Lin'] },
  es: { male: ['Carlos', 'Miguel', 'Diego', 'Pablo', 'Andrés'], female: ['María', 'Isabel', 'Carmen', 'Rosa', 'Elena'] },
  fr: { male: ['Pierre', 'Jean', 'François', 'Philippe', 'Nicolas'], female: ['Marie', 'Sophie', 'Claire', 'Anne', 'Julie'] },
  de: { male: ['Hans', 'Klaus', 'Stefan', 'Thomas', 'Andreas'], female: ['Anna', 'Greta', 'Heike', 'Sabine', 'Claudia'] },
  ar: { male: ['Mohammed', 'Ahmed', 'Omar', 'Ali', 'Hassan'], female: ['Fatima', 'Aisha', 'Layla', 'Nora', 'Salma'] },
};

function getAgentName(listing) {
  const locale = detectLocale();
  const lang = locale.language || 'en';
  const names = AGENT_NAMES[lang] || AGENT_NAMES.en;
  const pool = names.female;
  const idx = Math.abs(hashCode(listing?.property_id || 'default')) % pool.length;
  return pool[idx];
}

function getCompanyName() {
  return 'Weverse Online Shop';
}

function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// ── Product Context Builder ────────────────────────────────────────
function buildProductContext(listing) {
  if (!listing) return '';
  const parts = [];
  parts.push(`Product: ${listing.title || 'Untitled'}`);
  parts.push(`Category: ${listing.category || listing.listing_type || 'General'}`);
  if (listing.price) parts.push(`Price: ${listing.price}`);
  if (listing.description) parts.push(`Description: ${String(listing.description).slice(0, 500)}`);
  if (listing.listing_type === 'property') {
    if (listing.bedrooms != null) parts.push(`Bedrooms: ${listing.bedrooms}`);
    if (listing.bathrooms != null) parts.push(`Bathrooms: ${listing.bathrooms}`);
    if (listing.land_size) parts.push(`Size: ${listing.land_size}`);
    if (listing.city) parts.push(`City: ${listing.city}`);
    if (listing.state) parts.push(`State/Region: ${listing.state}`);
    if (listing.country) parts.push(`Country: ${listing.country}`);
    if (listing.condition) parts.push(`Condition: ${listing.condition}`);
    if (listing.year_built) parts.push(`Year Built: ${listing.year_built}`);
    if (listing.parking) parts.push(`Parking: ${listing.parking}`);
    if (listing.nearby_area && typeof listing.nearby_area === 'object') {
      const nearby = [];
      Object.entries(listing.nearby_area).forEach(([k, v]) => {
        if (Array.isArray(v) && v.length) nearby.push(`${k}: ${v.join(', ')}`);
      });
      if (nearby.length) parts.push(`Nearby: ${nearby.join('; ')}`);
    }
  }
  if (listing.listing_type === 'vehicle') {
    if (listing.brand) parts.push(`Brand: ${listing.brand}`);
    if (listing.model) parts.push(`Model: ${listing.model}`);
    if (listing.model_year) parts.push(`Year: ${listing.model_year}`);
    if (listing.mileage) parts.push(`Mileage: ${listing.mileage}`);
    if (listing.fuel_type) parts.push(`Fuel: ${listing.fuel_type}`);
    if (listing.transmission) parts.push(`Transmission: ${listing.transmission}`);
    if (listing.condition) parts.push(`Condition: ${listing.condition}`);
    if (listing.color) parts.push(`Color: ${listing.color}`);
    if (listing.engine) parts.push(`Engine: ${listing.engine}`);
  }
  if (Array.isArray(listing.features) && listing.features.length) {
    parts.push(`Features: ${listing.features.slice(0, 10).join(', ')}`);
  }
  if (Array.isArray(listing.images) && listing.images.length) {
    parts.push(`Images available: ${listing.images.length}`);
  }
  return parts.join('\n');
}

function buildCompanyContext() {
  return `Company: ${getCompanyName()}
We are a global online marketplace connecting buyers with quality products and properties worldwide.
We offer secure checkout, payment protection, free worldwide shipping on most items, and a 14-day return policy.
We support multiple payment methods including credit cards, bank transfers, and mobile money.
Our customer support team is available to help with orders, shipping, returns, and general inquiries.
We have products across categories: Real Estate, Cars, Trucks, Motorhomes, Electronics, Fashion, Jewelry, Beauty, Kitchen, Home Decor, and more.
Our website is weverseonlineshop.com.`;
}

// ── AI Conversation Engine (Edge Function → Pollinations fallback) ─
async function getAIReply(messages, systemPrompt, opts = {}) {
  // Prefer the server-side edge function (rich free-provider stack + grounded
  // product facts). Fall back to the customer-ai-chat edge function, then a
  // direct Pollinations call, so the agent almost always replies.
  const { listing = null, mode = 'agent' } = opts;
  const locale = detectLocale();
  let sessionId = '';
  try { sessionId = localStorage.getItem('kco_session_id') || ''; } catch {}

  const basePayload = () => ({
    message: messages.length ? String(messages[messages.length - 1].content || '') : '',
    history: messages.slice(0, -1),
    mode,
    listing: mode === 'agent' ? (listing || null) : null,
    country: locale.country,
    countryName: locale.countryName,
    language: locale.language,
    session_id: sessionId,
  });

  const callEdgeFn = async (fnName) => {
    const feUrl = `${SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/${fnName}`;
    const res = await fetch(feUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': ANON_KEY, 'Authorization': `Bearer ${ANON_KEY}` },
      body: JSON.stringify(basePayload()),
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) throw new Error(`${fnName}-${res.status}`);
    const data = await res.json();
    if (data && typeof data.response === 'string' && data.response.trim()) {
      const reply = data.response.trim();
      // A canned "unavailable/stepping away" reply means the AI was disabled
      // or quota-exhausted — treat as failure so we try the next provider.
      if (!/stepped away|stepping away|little connection trouble|not quite ready|unavailable/i.test(reply)) {
        return reply;
      }
    }
    throw new Error(`${fnName}-empty`);
  };

  // 1) Primary: smart-agent-chat (product/company aware).
  try {
    return await callEdgeFn('smart-agent-chat');
  } catch { /* try next */ }

  // 2) Fallback: customer-ai-chat — same payload, already deployed & live.
  try {
    return await callEdgeFn('customer-ai-chat');
  } catch { /* try next */ }

  // 3) Last resort: direct Pollinations (free, keyless).
  const body = {
    model: 'openai',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-12).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content || '').slice(0, 2000),
      })),
    ],
    max_tokens: 800,
  };
  const res = await fetch(POLLINATIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`AI-${res.status}`);
  const data = await res.json();
  const text = String(data?.choices?.[0]?.message?.content || '').trim();
  if (!text) throw new Error('AI-empty');
  return text;
}


// ═══════════════════════════════════════════════════════════════════
//  MESSAGE AGENT (Text Chat)
// ═══════════════════════════════════════════════════════════════════

let msgState = { active: false, panel: null, body: null, input: null, history: [], busy: false, isCompany: false, listing: null };

function injectMsgStyles() {
  if (document.getElementById('kco-msg-agent-style')) return;
  const style = document.createElement('style');
  style.id = 'kco-msg-agent-style';
  style.textContent = `
    .kco-msg-overlay{position:fixed;inset:0;z-index:985;background:rgba(0,0,0,.45);backdrop-filter:blur(6px);opacity:0;pointer-events:none;transition:opacity .25s ease}
    .kco-msg-overlay.kco-open{opacity:1;pointer-events:auto}
    .kco-msg-panel{position:fixed;right:0;bottom:0;top:0;width:420px;max-width:100vw;z-index:986;display:flex;flex-direction:column;background:#fff;box-shadow:-10px 0 60px rgba(0,0,0,.2);transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1)}
    .kco-msg-overlay.kco-open .kco-msg-panel{transform:translateX(0)}
    .kco-msg-head{display:flex;align-items:center;gap:.75rem;padding:.85rem 1rem;background:linear-gradient(135deg,#111827,#1f2937);color:#fff}
    .kco-msg-head-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:1.1rem;flex-shrink:0}
    .kco-msg-head-info{flex:1;min-width:0}
    .kco-msg-head-name{font-weight:800;font-size:.9rem;line-height:1.1}
    .kco-msg-head-status{font-size:.7rem;opacity:.7;display:flex;align-items:center;gap:.3rem;margin-top:2px}
    .kco-msg-head-dot{width:6px;height:6px;border-radius:50%;background:#34d399}
    .kco-msg-head-close{width:34px;height:34px;border-radius:10px;border:none;background:rgba(255,255,255,.12);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s}
    .kco-msg-head-close:hover{background:rgba(255,255,255,.25)}
    .kco-msg-product-strip{display:flex;align-items:center;gap:.6rem;padding:.5rem 1rem;background:#f8fafc;border-bottom:1px solid #e5e7eb}
    .kco-msg-product-strip img{width:36px;height:36px;border-radius:.4rem;object-fit:cover;border:1px solid #e5e7eb}
    .kco-msg-product-strip-title{font-size:.75rem;font-weight:700;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
    .kco-msg-product-strip-price{font-size:.7rem;font-weight:800;color:#2563eb}
    .kco-msg-body{flex:1;min-height:0;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.5rem;background:#fff}
    .kco-msg-bubble{max-width:85%;padding:.55rem .85rem;border-radius:1.1rem;font-size:.85rem;line-height:1.5;word-break:break-word;animation:kco-msg-fade-in .2s ease}
    @keyframes kco-msg-fade-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
    .kco-msg-bubble.user{align-self:flex-end;background:#111827;color:#fff;border-bottom-right-radius:.2rem}
    .kco-msg-bubble.agent{align-self:flex-start;background:#f3f4f6;color:#111827;border:1px solid #e5e7eb;border-bottom-left-radius:.2rem}
    .kco-msg-typing{align-self:flex-start;display:inline-flex;gap:4px;padding:.6rem .9rem;border-radius:1.1rem;border-bottom-left-radius:.2rem;background:#f3f4f6;border:1px solid #e5e7eb}
    .kco-msg-typing span{width:6px;height:6px;border-radius:50%;background:#9ca3af;animation:kco-msg-bounce 1.2s infinite}
    .kco-msg-typing span:nth-child(2){animation-delay:.15s}
    .kco-msg-typing span:nth-child(3){animation-delay:.3s}
    @keyframes kco-msg-bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
    .kco-msg-chips{display:flex;flex-wrap:wrap;gap:.4rem;padding:.5rem 1rem;background:#fff;border-top:1px solid #f1f5f9}
    .kco-msg-chip{border:1px solid #d1d5db;background:#fff;color:#374151;font-size:.72rem;font-weight:600;padding:.35rem .65rem;border-radius:999px;cursor:pointer;transition:all .15s;white-space:nowrap}
    .kco-msg-chip:hover{background:#111827;color:#fff;border-color:#111827}
    .kco-msg-inputrow{display:flex;gap:.5rem;padding:.65rem 1rem;border-top:1px solid #e5e7eb;background:#fff}
    .kco-msg-input{flex:1;border:1px solid #d1d5db;border-radius:1rem;padding:.55rem .85rem;font-size:.85rem;color:#000;background:#fff;outline:none;transition:border-color .15s}
    .kco-msg-input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
    .kco-msg-send{flex-shrink:0;width:42px;height:42px;border:none;border-radius:50%;background:#111827;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s}
    .kco-msg-send:hover{transform:scale(1.06);background:#000}
    .kco-msg-send:disabled{opacity:.4;cursor:not-allowed;transform:none}
    .kco-msg-footer{font-size:.6rem;color:#94a3b8;text-align:center;padding:.35rem 1rem;background:#fff;border-top:1px solid #f1f5f9}
    @media(max-width:480px){.kco-msg-panel{width:100vw}}
  `;
  document.head.appendChild(style);
}

function buildMsgPanelHtml(listing, isCompany) {
  const agentName = getAgentName(listing);
  const productTitle = isCompany ? 'General Support' : (listing?.title || 'Product');
  const productPrice = isCompany ? '' : (listing?.price || '');
  const productImage = (!isCompany && (listing?.video || listing?.video_url || (Array.isArray(listing?.images) ? listing.images[0] : ''))) ? (listing.video || listing.video_url || (Array.isArray(listing.images) ? listing.images[0] : '')) : '';
  const productStripMedia = productImage && /\.(mp4|webm|mov|m4v|avi|mkv|ogv)(\?|#|$)/i.test(productImage.split('?')[0])
    ? `<video src="${productImage}" muted playsinline preload="metadata" style="width:44px;height:44px;object-fit:cover;border-radius:8px"></video>`
    : '';
  const avatarLetter = agentName.charAt(0);
  const suggestions = isCompany
    ? ['What products do you have?', 'How does shipping work?', 'What is your return policy?', 'How do I track my order?']
    : ['Tell me about this product', 'What is the price?', 'Is it available?', 'How do I purchase?'];

  return `
    <div class="kco-msg-head">
      <div class="kco-msg-head-avatar">${avatarLetter}</div>
      <div class="kco-msg-head-info">
        <div class="kco-msg-head-name">${agentName}</div>
        <div class="kco-msg-head-status"><span class="kco-msg-head-dot"></span> Online — replies instantly</div>
      </div>
      <button class="kco-msg-head-close" id="kco-msg-close" aria-label="Close"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    ${productStripMedia ? `
    <div class="kco-msg-product-strip">
      ${productStripMedia}
      <span class="kco-msg-product-strip-title">${productTitle}</span>
      ${productPrice ? `<span class="kco-msg-product-strip-price">${productPrice}</span>` : ''}
    </div>` : ''}
    <div class="kco-msg-body" id="kco-msg-body"></div>
    <div class="kco-msg-chips" id="kco-msg-chips">
      ${suggestions.map(s => `<button class="kco-msg-chip" type="button">${s}</button>`).join('')}
    </div>
    <div class="kco-msg-inputrow">
      <input class="kco-msg-input" type="text" id="kco-msg-input" placeholder="Type your message..." maxlength="1500" aria-label="Message">
      <button class="kco-msg-send" id="kco-msg-send" aria-label="Send"><i data-lucide="send" class="w-4 h-4"></i></button>
    </div>
    <div class="kco-msg-footer">For urgent help, email support@weverseonlineshop.com</div>
  `;
}

function buildMsgSystemPrompt(listing, isCompany, agentName) {
  const locale = detectLocale();
  const lang = locale.language || 'en';
  const langName = { en: 'English', zh: 'Mandarin Chinese', es: 'Spanish', fr: 'French', de: 'German', ar: 'Arabic' }[lang] || 'English';

  const productCtx = isCompany ? '' : `\n\nPRODUCT LISTING INFORMATION:\n${buildProductContext(listing)}`;
  const companyCtx = isCompany ? `\n\nCOMPANY INFORMATION:\n${buildCompanyContext()}` : '';

  return `You are ${agentName}, a real human sales and customer care representative for ${getCompanyName()}. You are messaging a customer on the marketplace's live chat. You are NOT an AI or chatbot — you are a real person on the sales team.

RULES:
- NEVER say you are AI, a bot, an assistant, or automated
- If asked who you are, warmly say you're a real person on the sales team
- Be warm, friendly, confident, humble, respectful, and persuasive
- Use contractions, short sentences, natural language
- Never make up prices, dates, or facts
- If unsure, say you'll check with the team
- Guide toward purchase when appropriate, but never pressure
- Respond in ${langName}
- Keep messages concise and conversational
- Always protect the company's reputation
- Be emotionally intelligent — sense when customer is hesitant and address concerns
- Always make the customer feel valued and well cared for
- Gently encourage so they don't leave empty-handed${productCtx}${companyCtx}

${isCompany
  ? `Help with general marketplace questions, products, purchasing, shipping, returns, orders, and policies.`
  : `You are helping with a specific product. Answer questions about it using the listing info above. Guide toward purchase.`}`;
}

function openMsgAgent(listing, isCompany = false) {
  if (msgState.active) { closeMsgAgent(); return; }

  injectMsgStyles();

  const agentName = getAgentName(listing);
  const overlay = document.createElement('div');
  overlay.className = 'kco-msg-overlay';
  overlay.innerHTML = `<div class="kco-msg-panel">${buildMsgPanelHtml(listing, isCompany)}</div>`;
  document.body.appendChild(overlay);
  if (window.lucide) lucide.createIcons();

  const panel = overlay.querySelector('.kco-msg-panel');
  const body = overlay.querySelector('#kco-msg-body');
  const input = overlay.querySelector('#kco-msg-input');
  const sendBtn = overlay.querySelector('#kco-msg-send');
  const closeBtn = overlay.querySelector('#kco-msg-close');
  const chips = overlay.querySelector('#kco-msg-chips');

  msgState = { active: true, overlay, panel, body, input, history: [], busy: false, isCompany, listing, agentName };

  // Close
  closeBtn?.addEventListener('click', closeMsgAgent);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeMsgAgent(); });

  // Chips
  chips?.querySelectorAll('.kco-msg-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sendMsgMessage(chip.textContent);
      chips.remove();
    });
  });

  // Send
  const doSend = () => {
    const text = input?.value?.trim();
    if (!text || msgState.busy) return;
    input.value = '';
    sendMsgMessage(text);
    chips?.remove();
  };
  sendBtn?.addEventListener('click', doSend);
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSend(); });

  // Show
  requestAnimationFrame(() => overlay.classList.add('kco-open'));
  setTimeout(() => input?.focus(), 350);

  // Welcome
  const greeting = getLocalGreeting();
  const welcome = `${greeting}! I'm ${agentName} from ${getCompanyName()}. How can I help you with our marketplace today?`;
  addMsgBubble(welcome, 'agent');
  msgState.history.push({ role: 'assistant', content: welcome });
}

function addMsgBubble(text, role) {
  if (!msgState.body) return;
  const el = document.createElement('div');
  el.className = `kco-msg-bubble ${role}`;
  el.innerHTML = renderMsgText(text);
  msgState.body.appendChild(el);
  msgState.body.scrollTop = msgState.body.scrollHeight;
}

function addMsgTyping() {
  if (!msgState.body) return;
  const el = document.createElement('div');
  el.className = 'kco-msg-typing';
  el.id = 'kco-msg-typing';
  el.innerHTML = '<span></span><span></span><span></span>';
  msgState.body.appendChild(el);
  msgState.body.scrollTop = msgState.body.scrollHeight;
  return el;
}

function removeMsgTyping() {
  document.getElementById('kco-msg-typing')?.remove();
}

function renderMsgText(text) {
  return String(text || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

async function sendMsgMessage(text) {
  if (!msgState.active || msgState.busy || !text) return;

  addMsgBubble(text, 'user');
  msgState.history.push({ role: 'user', content: text });

  msgState.busy = true;
  addMsgTyping();

  const systemPrompt = buildMsgSystemPrompt(msgState.listing, msgState.isCompany, msgState.agentName);

  try {
    const reply = await getAIReply(msgState.history, systemPrompt, {
      listing: msgState.listing,
      mode: msgState.isCompany ? 'company' : 'agent',
    });
    removeMsgTyping();
    addMsgBubble(reply, 'agent');
    msgState.history.push({ role: 'assistant', content: reply });
  } catch {
    removeMsgTyping();
    const fallback = "I'm sorry, I'm having a little trouble right now. Could you try again in a moment? I want to make sure I give you the best help.";
    addMsgBubble(fallback, 'agent');
  }

  msgState.busy = false;
  msgState.input?.focus();
}

function closeMsgAgent() {
  msgState.active = false;
  msgState.overlay?.classList.remove('kco-open');
  setTimeout(() => msgState.overlay?.remove(), 300);
  msgState = { active: false, overlay: null, panel: null, body: null, input: null, history: [], busy: false, isCompany: false, listing: null, agentName: '' };
}

// ═══════════════════════════════════════════════════════════════════
//  PUBLIC API — Button HTML for Cards & Detail Pages
// ═══════════════════════════════════════════════════════════════════

/**
 * Returns the agent buttons. Only messaging is offered — "Chat with Us"
 * opens the company message chat for every listing. Phone calling has been
 * removed from the product.
 */
export function agentButtonsHtml(listing, opts = {}) {
  const id = listing?.property_id || listing?.id || '';
  const compact = opts.compact || false;

  if (compact) {
    return `
      <div class="kco-agent-row-compact" data-listing-id="${id}">
        <button class="kco-agent-action kco-agent-msg-company" data-action="msg-company" title="Chat with Us — Live support now">
          <i data-lucide="message-circle" class="kco-ico"></i><span>Chat with Us</span>
        </button>
      </div>`;
  }

  return `
    <div class="kco-support-section" data-listing-id="${id}">
      <div class="kco-support-trust">
        <span class="kco-support-trust-ico"><i data-lucide="shield-check"></i></span>
        <span class="kco-support-trust-txt">Buyer Protection &mdash; your purchase is secure</span>
      </div>
      <div class="kco-support-cta">
        <p class="kco-support-question">Questions about this product?</p>
        <div class="kco-support-actions">
          <button class="kco-support-btn kco-agent-msg-company" data-action="msg-company" title="Chat with Us — Live support now">
            <i data-lucide="message-circle" class="kco-ico"></i>
            <span>Chat with Us</span>
          </button>
        </div>
      </div>
    </div>`;
}

/**
 * Inject global agent styles once. Call at module init.
 */
export function injectAgentStyles() {
  if (document.getElementById('kco-agent-global-style')) return;
  const style = document.createElement('style');
  style.id = 'kco-agent-global-style';
  style.textContent = `
    /* Compact agent action buttons (product cards) */
    .kco-agent-row-compact{display:flex;gap:.35rem}
    .kco-agent-action{display:inline-flex;align-items:center;justify-content:center;gap:.3rem;padding:.42rem .6rem;border:none;border-radius:.55rem;font-size:.65rem;font-weight:700;cursor:pointer;transition:all .18s ease;color:#fff;flex:1;min-width:0;letter-spacing:.01em;white-space:nowrap}
    .kco-agent-action:active{transform:scale(.96)}
    .kco-agent-action .kco-ico{width:.7rem;height:.7rem;flex-shrink:0}
    .kco-agent-action span{line-height:1.1}

    /* Detail page support section — modeled on real marketplace patterns */
    .kco-support-section{border-top:1px solid #f1f5f9;padding-top:.85rem}

    /* Trust signal bar */
    .kco-support-trust{display:flex;align-items:center;gap:.4rem;margin-bottom:.55rem;padding:.35rem .55rem;background:#f0fdf4;border:1px solid #dcfce7;border-radius:.5rem}
    .kco-support-trust-ico{color:#16a34a;flex-shrink:0;display:flex;align-items:center}
    .kco-support-trust-ico svg,.kco-support-trust-ico i{width:.85rem;height:.85rem}
    .kco-support-trust-txt{font-size:.68rem;font-weight:600;color:#15803d;line-height:1.2}

    /* CTA section */
    .kco-support-cta{display:flex;align-items:center;justify-content:space-between;gap:.5rem;flex-wrap:wrap}
    .kco-support-question{font-size:.78rem;font-weight:600;color:#334155;margin:0;white-space:nowrap}
    .kco-support-actions{display:flex;gap:.35rem;flex-shrink:0}

    /* Support buttons — clean, medium, professional (not oversized) */
    .kco-support-btn{display:inline-flex;align-items:center;gap:.3rem;padding:.45rem .7rem;border:none;border-radius:.55rem;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .18s ease;color:#fff;white-space:nowrap}
    .kco-support-btn:active{transform:scale(.96)}
    .kco-support-btn .kco-ico{width:.75rem;height:.75rem;flex-shrink:0}

    .kco-agent-msg-company{background:#2563eb}
    .kco-agent-msg-company:hover{background:#1d4ed8;box-shadow:0 4px 12px rgba(37,99,235,.3)}

    @media (max-width:520px){
      .kco-support-cta{flex-direction:column;align-items:stretch}
      .kco-support-actions{width:100%}
      .kco-support-btn{flex:1;justify-content:center}
    }
  `;
  document.head.appendChild(style);
}

/**
 * Wire up agent button clicks on a container. Uses event delegation.
 * Call once per page/card and it handles all buttons within.
 */
export function wireAgentButtons(container, listingLookup) {
  if (!container || container._agentWired) return;
  container._agentWired = true;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    e.stopPropagation();
    e.preventDefault();

    const action = btn.dataset.action;
    const row = btn.closest('.kco-support-section') || btn.closest('.kco-agent-row-compact') || btn.closest('.kco-agent-panel') || btn.closest('.kco-agent-row');
    const listingId = row?.dataset.listingId || '';

    const listing = typeof listingLookup === 'function'
      ? listingLookup(listingId)
      : (window.__kcoAgentListingLookup?.(listingId) || null);

    switch (action) {
      case 'msg-agent': openMsgAgent(listing, false); break;
      case 'msg-company': openMsgAgent(null, true); break;
    }
  });
}

// Global listing lookup fallback
window.__kcoAgentListingLookup = window.__kcoAgentListingLookup || null;

// Auto-init styles
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectAgentStyles);
} else {
  injectAgentStyles();
}

// Expose for external access
window.__kcoMsgAgent = openMsgAgent;
window.__kcoMsgCompany = () => openMsgAgent(null, true);
