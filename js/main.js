(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || { images: {} };

  /* ---- Google Drive link -> direct image URL ----
     Accepts: drive.google.com/file/d/ID/view, open?id=ID, uc?id=ID, or a bare ID. */
  function driveId(link) {
    if (!link) return "";
    link = String(link).trim();
    var m = link.match(/\/d\/([\w-]{20,})/) || link.match(/[?&]id=([\w-]{20,})/);
    if (m) return m[1];
    if (/^[\w-]{20,}$/.test(link)) return link;
    return "";
  }
  function imageUrl(link) {
    var id = driveId(link);
    if (id) return "https://lh3.googleusercontent.com/d/" + id + "=w1400";
    return link || ""; // allow a normal image URL or local path too
  }
  function driveFileUrl(link) {
    var id = driveId(link);
    return id ? "https://drive.google.com/file/d/" + id + "/view" : link;
  }

  /* ---- images ---- */
  document.querySelectorAll("[data-img]").forEach(function (box) {
    var key = box.getAttribute("data-img");
    var fallback = box.getAttribute("data-fallback") || "";
    if (box.classList.contains("thumb")) {
      box.innerHTML = '<div class="ph"><div class="bar"><i></i><i></i><i></i></div><b></b><span>image coming soon</span></div>';
      box.querySelector("b").textContent = fallback;
    }
    var src = imageUrl(cfg.images && cfg.images[key]);
    if (!src) return;
    var img = new Image();
    img.alt = key === "profile" ? "Himanshu Singh" : fallback;
    img.loading = key === "profile" ? "eager" : "lazy";
    img.referrerPolicy = "no-referrer";
    // Try in order: main URL -> Drive thumbnail URL (Drive links only) -> local backup image.
    var id = driveId(cfg.images[key]);
    var queue = [];
    if (id) queue.push("https://drive.google.com/thumbnail?id=" + id + "&sz=w1400");
    if (key !== "profile") queue.push("assets/img/" + key + ".jpg");
    img.style.opacity = "0";
    img.onload = function () { img.style.opacity = ""; box.classList.add("has-img"); };
    img.onerror = function () {
      if (queue.length) { img.src = queue.shift(); }
      else { img.remove(); }
    };
    img.src = src;
    box.appendChild(img);
  });

  /* ---- resume link ---- */
  var cv = document.getElementById("cv-link");
  if (cv && cfg.resume) cv.href = driveFileUrl(cfg.resume);

  /* ---- typed role ---- */
  var roles = ["Web Developer", "WordPress Developer", "PHP Developer", "Elementor Expert", "Automation Builder"];
  var typed = document.getElementById("typed");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typed && !reduce) {
    var r = 0, i = roles[0].length, deleting = true;
    (function tick() {
      var word = roles[r];
      if (deleting) {
        i--;
        if (i <= 0) { deleting = false; r = (r + 1) % roles.length; }
      } else {
        i++;
        if (i >= roles[r].length) { deleting = true; typed.textContent = roles[r]; return setTimeout(tick, 1800); }
      }
      typed.textContent = roles[r].slice(0, Math.max(i, 0)) || "​";
      setTimeout(tick, deleting ? 45 : 85);
    })();
  }

  /* ---- active tab on scroll ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".tabs a"));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function setActive() {
    var y = window.scrollY + 140, current = 0;
    sections.forEach(function (s, n) { if (s && s.offsetTop <= y) current = n; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections.length - 1;
    links.forEach(function (a, n) { a.classList.toggle("active", n === current); });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---- theme toggle ---- */
  var root = document.documentElement;
  try { var saved = localStorage.getItem("hs-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  var toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.addEventListener("click", function () {
    var attr = root.getAttribute("data-theme");
    var isDark = attr ? attr === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("hs-theme", next); } catch (e) {}
  });

  /* ---- project filters ---- */
  var buttons = document.querySelectorAll(".filters button");
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-filter");
      buttons.forEach(function (x) { x.classList.toggle("on", x === b); });
      document.querySelectorAll(".work").forEach(function (w) {
        w.hidden = f !== "all" && w.getAttribute("data-cat").split(" ").indexOf(f) === -1;
      });
      // Sticky filters on phones: if the visitor had scrolled down the list, return to its first card.
      var bar = document.querySelector(".work-bar");
      var list = document.querySelector(".works");
      if (bar && list && getComputedStyle(bar).position === "sticky") {
        var y = list.getBoundingClientRect().top + window.scrollY - bar.offsetHeight - parseInt(getComputedStyle(bar).top, 10) - 18;
        if (window.scrollY > y) window.scrollTo(0, y);
      }
    });
  });

  /* ---- copy buttons ---- */
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      var text = el.textContent.trim();
      function done() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); }
      function selectIt() { var rg = document.createRange(); rg.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(rg); btn.textContent = "Selected"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, selectIt);
      else selectIt();
    });
  });

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
