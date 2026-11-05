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

  /* ---- hobbies: tap to play, autoplay once on touch screens, 3D Rubik's Cube ---- */
  var hobbies = document.querySelector(".hobbies");
  if (hobbies) {
    var playCard = function (card) {
      card.classList.add("play");
      clearTimeout(card._hobbyTimer);
      card._hobbyTimer = setTimeout(function () { card.classList.remove("play"); }, 3600);
    };
    hobbies.querySelectorAll(".hobby").forEach(function (card) {
      card.addEventListener("click", function () { playCard(card); });
    });

    /* touch screens have no hover, so each card plays once when it scrolls into view */
    if ("IntersectionObserver" in window && !reduce && window.matchMedia("(hover: none)").matches) {
      var seen = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { playCard(entry.target); seen.unobserve(entry.target); }
        });
      }, { threshold: 0.7 });
      hobbies.querySelectorAll(".hobby").forEach(function (card) { seen.observe(card); });
    }

    /* Rubik's Cube: 26 small pieces; one layer at a time turns while the whole cube rotates */
    var rcBody = hobbies.querySelector(".rc-body");
    var rcSize = 14;
    var rcFaces = [
      { axis: "x", side: 1, color: "#ef4444", turn: "rotateY(90deg)" },
      { axis: "x", side: -1, color: "#f97316", turn: "rotateY(-90deg)" },
      { axis: "y", side: -1, color: "#f8fafc", turn: "rotateX(90deg)" },
      { axis: "y", side: 1, color: "#facc15", turn: "rotateX(-90deg)" },
      { axis: "z", side: 1, color: "#22c55e", turn: "rotateY(0deg)" },
      { axis: "z", side: -1, color: "#3b82f6", turn: "rotateY(180deg)" }
    ];
    var rcPieces = [];
    [-1, 0, 1].forEach(function (x) { [-1, 0, 1].forEach(function (y) { [-1, 0, 1].forEach(function (z) {
      if (!x && !y && !z) return;
      var el = document.createElement("div");
      el.className = "rc-piece";
      var at = { x: x, y: y, z: z };
      rcFaces.forEach(function (f) {
        var face = document.createElement("div");
        face.className = "rc-face";
        face.style.background = at[f.axis] === f.side ? f.color : "#0b0f14";
        face.style.transform = f.turn + " translateZ(" + rcSize / 2 + "px)";
        el.appendChild(face);
      });
      var matrix = new DOMMatrix().translate(x * rcSize, y * rcSize, z * rcSize);
      el.style.transform = matrix.toString();
      rcBody.appendChild(el);
      rcPieces.push({ el: el, matrix: matrix });
    }); }); });

    var rcAxes = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] };
    var rcTurn = null, rcQueue = 0, rcSpin = 30, rcWait = 300, rcLast = 0, rcVisible = true;
    var rcCard = hobbies.querySelector(".h-cube");
    var rcHover = false;
    rcCard.addEventListener("mouseenter", function () { rcHover = true; });
    rcCard.addEventListener("mouseleave", function () { rcHover = false; });
    rcCard.addEventListener("click", function () { rcQueue = 8; });

    var rcStartTurn = function () {
      var names = ["x", "y", "z"];
      var name = names[Math.floor(Math.random() * 3)];
      var key = { x: "m41", y: "m42", z: "m43" }[name];
      var layer = [-1, 0, 1][Math.floor(Math.random() * 3)];
      rcTurn = {
        axis: rcAxes[name], dir: Math.random() < 0.5 ? 90 : -90, angle: 0,
        pieces: rcPieces.filter(function (p) { return Math.round(p.matrix[key] / rcSize) === layer; })
      };
    };
    var rcRotation = function (t, deg) { return new DOMMatrix().rotateAxisAngle(t.axis[0], t.axis[1], t.axis[2], deg); };
    var rcTick = function (now) {
      var dt = Math.min(now - rcLast, 50);
      rcLast = now;
      if (rcVisible) {
        var fast = rcHover || rcQueue > 0 || rcCard.classList.contains("play");
        rcSpin += dt * (fast ? 0.09 : 0.03);
        rcBody.style.transform = "rotateX(-28deg) rotateY(" + rcSpin + "deg)";
        if (rcTurn) {
          var step = dt * (rcQueue > 0 ? 0.55 : fast ? 0.32 : 0.16);
          rcTurn.angle = Math.min(rcTurn.angle + step, 90);
          var deg = rcTurn.angle * (rcTurn.dir > 0 ? 1 : -1);
          var t = rcTurn;
          if (rcTurn.angle >= 90) {
            t.pieces.forEach(function (p) {
              var m = rcRotation(t, deg).multiply(p.matrix);
              ["m11", "m12", "m13", "m21", "m22", "m23", "m31", "m32", "m33"].forEach(function (k) { m[k] = Math.round(m[k]); });
              ["m41", "m42", "m43"].forEach(function (k) { m[k] = Math.round(m[k] / rcSize) * rcSize; });
              p.matrix = m;
              p.el.style.transform = m.toString();
            });
            rcTurn = null;
            rcWait = rcQueue > 0 ? 0 : fast ? 120 : 500;
            if (rcQueue > 0) rcQueue--;
          } else {
            t.pieces.forEach(function (p) { p.el.style.transform = rcRotation(t, deg).multiply(p.matrix).toString(); });
          }
        } else {
          rcWait -= dt;
          if (rcWait <= 0) rcStartTurn();
        }
      }
      requestAnimationFrame(rcTick);
    };
    rcBody.style.transform = "rotateX(-28deg) rotateY(30deg)";
    if (!reduce) requestAnimationFrame(function (now) { rcLast = now; rcTick(now); });

    /* stop everything while the section is off screen */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        rcVisible = entries[0].isIntersecting;
        hobbies.classList.toggle("paused", !rcVisible);
      }).observe(hobbies);
    }
  }

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
