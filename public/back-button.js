(function () {
  "use strict";

  var path = window.location.pathname;
  var isHome = path === "/" || path === "/index.html";
  var isNative = !!(
    window.Capacitor &&
    window.Capacitor.isNativePlatform &&
    window.Capacitor.isNativePlatform()
  );

  function exitApp() {
    try {
      var App = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
      if (App && App.exitApp) { App.exitApp(); return; }
    } catch (err) {}
    window.location.replace("/");
  }

  function showExitHint() {
    var existing = document.getElementById("kco-exit-hint");
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    var el = document.createElement("div");
    el.id = "kco-exit-hint";
    el.setAttribute("role", "status");
    el.textContent = "Press Back again to exit";
    el.style.cssText = [
      "position:fixed", "bottom:2.25rem", "left:50%", "transform:translateX(-50%)",
      "z-index:9999", "background:rgba(15,23,42,.92)", "color:#fff",
      "padding:.6rem 1.1rem", "border-radius:9999px", "font-size:.8rem",
      "font-weight:600", "font-family:Inter,system-ui,-apple-system,sans-serif",
      "box-shadow:0 8px 24px rgba(0,0,0,.35)", "pointer-events:none",
      "transition:opacity .3s ease", "border:1px solid rgba(96,165,250,.35)",
      "white-space:nowrap", "max-width:90vw"
    ].join(";");
    document.body.appendChild(el);
    setTimeout(function () { el.style.opacity = "0"; }, 1800);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2200);
  }

  // Robust "go back" used by every on-page back control. When the page was
  // reached from within the site, step through real history. When it was
  // reached from outside (deep link / search engine / fresh open), go Home so
  // the customer stays inside the store instead of bouncing back outside.
  function goBack() {
    var internalReferrer =
      document.referrer && document.referrer.indexOf(window.location.origin) === 0;
    if (!internalReferrer) {
      window.location.replace("/");
      return;
    }
    if (window.history.length > 1) {
      var navigated = false;
      var onHide = function () { navigated = true; };
      window.addEventListener("pagehide", onHide);
      window.addEventListener("unload", onHide);
      window.history.back();
      setTimeout(function () {
        if (!navigated) window.location.replace("/");
      }, 350);
    } else {
      window.location.replace("/");
    }
  }
  window.kcoGoBack = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    goBack();
  };

  // ── Home / Showroom: keep the system Back inside the store ──────────────
  // Two same-document entries (base + guard) mean the first Back press on
  // Home always lands back on Home. From there we close an open search
  // overlay, clear a category filter, or show a "Press Back again to exit"
  // hint before letting the next press actually leave.
  function initHomeBackGuard() {
    if (!window.history || !window.history.pushState || !window.history.replaceState) return;
    try {
      window.history.replaceState({ kcoHome: 1 }, document.title, window.location.href);
      window.history.pushState({ kcoHome: 2 }, document.title, window.location.href);
    } catch (err) { return; }

    var pendingExit = false;
    var hintShownAt = 0;

    function overlayOpen() {
      var ov = document.getElementById("search-results-overlay");
      return !!(ov && ov.style.display !== "none");
    }
    function closeOverlay() {
      if (window.closeSearchResults) { window.closeSearchResults(); return; }
      var ov = document.getElementById("search-results-overlay");
      if (ov) {
        ov.style.display = "none";
        document.body.style.overflow = "";
      }
    }
    function filterActive() {
      var grid = document.querySelector('[data-showroom-grid="real-estate"]');
      return !!(grid && grid.querySelector('.showroom-row[style*="display: none"]'));
    }
    function clearFilter() {
      if (window._clearShowroomFilter) { window._clearShowroomFilter(); return; }
      var grid = document.querySelector('[data-showroom-grid="real-estate"]');
      if (grid) {
        grid.querySelectorAll(".showroom-row, .showroom-section").forEach(function (el) {
          el.style.display = "";
        });
      }
    }
    function rearm() {
      try { window.history.pushState({ kcoHome: 2 }, document.title, window.location.href); } catch (err) {}
    }

    window.addEventListener("popstate", function (e) {
      var st = e.state;
      if (st && st.kcoHome === 2) {
        // Returned to Home from an internal page — this Back press was normal
        // in-site navigation, so do not hint or exit.
        pendingExit = false;
        hintShownAt = 0;
        if (overlayOpen()) { closeOverlay(); rearm(); return; }
        if (filterActive()) { clearFilter(); rearm(); return; }
        return;
      }
      if (st && st.kcoHome === 1) {
        // Reached the base Home entry.
        if (overlayOpen()) { closeOverlay(); rearm(); return; }
        if (filterActive()) { clearFilter(); rearm(); return; }
        if (pendingExit && Date.now() - hintShownAt < 3000) {
          pendingExit = false;
          if (isNative) { exitApp(); }
          else { try { window.history.back(); } catch (err) {} }
          return;
        }
        pendingExit = true;
        hintShownAt = Date.now();
        showExitHint();
        rearm();
      }
    });
  }

  // ── Internal pages: Back from a deep link goes Home, never out of the store ──
  // When a customer lands on a product/cart/etc. without any in-site history
  // (fresh tab, installed PWA launch, native app cold start / push link), a
  // single same-document entry makes the first Back press ours to intercept:
  // we route it to Home instead of letting the app/browser exit.
  function initPageBackGuard() {
    if (!window.history || !window.history.pushState || !window.history.replaceState) return;
    var internalReferrer =
      document.referrer && document.referrer.indexOf(window.location.origin) === 0;
    if (internalReferrer) return;
    // In a normal browser with prior history (e.g. arrived from a search
    // engine), keep the browser's own Back behavior intact. The guard applies
    // to fresh opens and the native app, where there is nothing to go back to.
    var hasUsableHistory = window.history.length > 1;
    if (!isNative && hasUsableHistory) return;
    try {
      window.history.replaceState({ kcoPage: 1 }, document.title, window.location.href);
      window.history.pushState({ kcoPage: 2 }, document.title, window.location.href);
    } catch (err) { return; }
    window.addEventListener("popstate", function () {
      window.location.replace("/");
    });
  }

  // ── Native app (Capacitor Android): intercept the system Back button ────
  // Route Back through the in-app history first; only at Home (with nothing
  // left to go back to) does it exit the app. The Home guard above provides
  // the "press Back again" acknowledgement.
  function initNativeBackButton() {
    if (!isNative) return;
    var App = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (!App || !App.addListener) return;
    App.addListener("backButton", function () {
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
      if (!isHome) {
        window.location.replace("/");
        return;
      }
      exitApp();
    });
  }

  if (isHome) {
    initHomeBackGuard();
  } else {
    initPageBackGuard();
  }
  initNativeBackButton();

  // ── Floating Back button for pages without an in-header control ─────────
  function hasHeaderBackControl() {
    var header = document.querySelector("header");
    if (!header) return false;
    if (header.querySelector('[data-lucide="arrow-left"]')) return true;
    var text = (header.textContent || "").toLowerCase();
    return /back to (home|marketplace)/i.test(text);
  }

  function createBackButton() {
    var existing = document.getElementById("back-to-home");
    if (existing) {
      existing.addEventListener("click", goBack);
      return;
    }
    if (document.getElementById("kco-back-btn")) return;
    if (hasHeaderBackControl()) return;

    var btn = document.createElement("button");
    btn.id = "kco-back-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Go back");
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform .25s ease">' +
      '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg><span>Back</span>';

    btn.style.cssText = [
      "position:fixed",
      "top:4.75rem",
      "left:1rem",
      "z-index:45",
      "display:inline-flex",
      "align-items:center",
      "gap:.5rem",
      "padding:.5rem .85rem",
      "border-radius:9999px",
      "border:1px solid rgba(59,130,246,.25)",
      "background:rgba(10,17,36,.8)",
      "backdrop-filter:blur(12px)",
      "-webkit-backdrop-filter:blur(12px)",
      "color:#93c5fd",
      "font-family:Inter,system-ui,-apple-system,sans-serif",
      "font-size:.8rem",
      "font-weight:600",
      "cursor:pointer",
      "box-shadow:0 4px 16px rgba(0,0,0,.35)",
      "transition:background .25s ease,color .25s ease,border-color .25s ease,transform .2s ease,box-shadow .25s ease",
      "-webkit-tap-highlight-color:transparent",
      "outline:none",
      "white-space:nowrap"
    ].join(";");

    btn.addEventListener("mouseenter", function () {
      btn.style.background = "rgba(59,130,246,.15)";
      btn.style.borderColor = "rgba(96,165,250,.5)";
      btn.style.color = "#fff";
      btn.style.boxShadow = "0 6px 22px rgba(59,130,246,.25)";
      btn.style.transform = "translateX(-2px)";
      var svg = btn.querySelector("svg");
      if (svg) svg.style.transform = "translateX(-3px)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "rgba(10,17,36,.8)";
      btn.style.borderColor = "rgba(59,130,246,.25)";
      btn.style.color = "#93c5fd";
      btn.style.boxShadow = "0 4px 16px rgba(0,0,0,.35)";
      btn.style.transform = "translateX(0)";
      var svg = btn.querySelector("svg");
      if (svg) svg.style.transform = "translateX(0)";
    });
    btn.addEventListener("mousedown", function () { btn.style.transform = "scale(.96)"; });
    btn.addEventListener("mouseup", function () { btn.style.transform = "translateX(-2px)"; });
    btn.addEventListener("click", goBack);

    function adjustPosition() {
      var sidebar = document.querySelector("aside#sidebar");
      var isDesktop = window.innerWidth >= 1024;
      var isMobile = window.innerWidth <= 640;

      if (isMobile) {
        btn.style.top = "4.25rem";
        btn.style.left = ".85rem";
        btn.style.padding = ".45rem .7rem";
        btn.style.fontSize = ".75rem";
        var s1 = btn.querySelector("svg");
        if (s1) { s1.setAttribute("width", "16"); s1.setAttribute("height", "16"); }
      } else {
        btn.style.top = "4.75rem";
        btn.style.padding = ".5rem .85rem";
        btn.style.fontSize = ".8rem";
        var s2 = btn.querySelector("svg");
        if (s2) { s2.setAttribute("width", "18"); s2.setAttribute("height", "18"); }
        if (sidebar && isDesktop) {
          btn.style.left = "17rem";
        } else {
          btn.style.left = "1rem";
        }
      }
    }

    adjustPosition();
    window.addEventListener("resize", adjustPosition);
    document.body.appendChild(btn);
  }

  if (!isHome) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createBackButton);
    } else {
      createBackButton();
    }
  }
})();