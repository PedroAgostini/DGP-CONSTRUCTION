/* DGP Construction | site behavior */
(function () {
  "use strict";
  window.__dgp = true;
  var root = document.documentElement;

  /* ---------- drafting reveal ---------- */
  var drawTargets = document.querySelectorAll(".drawing, .hero-proof");
  drawTargets.forEach(function (svg) {
    var lines = svg.querySelectorAll(".draw");
    lines.forEach(function (p, i) { p.style.setProperty("--i", i); });
    svg.style.setProperty("--t", Math.min(lines.length * 70 + 400, 2200));
  });

  if (root.classList.contains("js-draft") && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-drawn"); io.unobserve(e.target); }
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -5% 0px" });
    drawTargets.forEach(function (el) {
      // the first viewport drafts on load; everything below waits for scroll
      if (el.closest(".hero")) {
        requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("is-drawn"); }); });
      } else {
        io.observe(el);
      }
    });
  } else {
    root.classList.remove("js-draft");
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
    });
  }

  /* ---------- nav: mark the section in view ---------- */
  var spyLinks = document.querySelectorAll('.nav a[href^="#"]');
  if ("IntersectionObserver" in window && spyLinks.length) {
    var byId = {};
    spyLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = byId[e.target.id];
        if (!link) return;
        if (e.isIntersecting) {
          spyLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        } else if (link.getAttribute("aria-current")) {
          link.removeAttribute("aria-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- quote form: three steps ---------- */
  var form = document.getElementById("quote-form");
  function validField(input) {
    var v = input.value.trim();
    if (input.required && !v) return false;
    if (input.type === "email" && v) return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    if (input.type === "tel" && v) return v.replace(/\D/g, "").length >= 10;
    return true;
  }
  function check(input) {
    var ok = validField(input);
    input.closest(".field").classList.toggle("is-invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    return ok;
  }

  if (form) {
    var steps = form.querySelectorAll(".step");
    var marks = form.querySelectorAll(".form-steps li");
    var count = document.getElementById("step-count");
    var back = form.querySelector(".form-back");
    var next = form.querySelector(".form-next");
    var submit = form.querySelector(".form-submit");
    var current = 0;

    // anti-spam: a filled honeypot or a form finished faster than a person can read it is treated as a bot
    var startedAt = Date.now();
    var startedField = document.getElementById("f-started");
    if (startedField) startedField.value = String(startedAt);
    function isSpam() {
      var trap = form.querySelector("input[name=company]");
      return (trap && trap.value.trim() !== "") || Date.now() - startedAt < 4000;
    }

    // ---------- lead delivery ----------
    // Each lead goes to Web3Forms (email to the client) and to the Eu Sou TS lead webhook, in parallel.
    // The visitor sees the confirmation if at least one of them accepts the lead.
    // credentials live in assets/js/config.js (see config.example.js)
    var CFG = window.DGP_FORM || {};
    var FORM_ID = form.getAttribute("data-form-id") || CFG.formId || "form01";
    var WEB3FORMS_URL = "https://api.web3forms.com/submit";
    var WEB3FORMS_KEY = CFG.web3formsKey || "";
    var WEBHOOK_URL = CFG.webhookUrl || "";
    var SEND_TIMEOUT = 15000;

    // ad attribution carried over from the landing URL (Google Ads, Meta Ads)
    var tracking = {};
    try {
      var query = new URLSearchParams(window.location.search);
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"].forEach(function (k) {
        var v = query.get(k);
        if (v) tracking[k] = v.slice(0, 200);
      });
    } catch (err) { /* old browser: send without attribution */ }

    function leadData() {
      var fd = new FormData(form);
      var val = function (k) { return String(fd.get(k) || "").trim(); };
      var lead = {
        form_id: FORM_ID,
        service: val("service"),
        name: val("name"),
        phone: val("phone"),
        email: val("email"),
        town: val("town"),
        message: val("message"),
        page: window.location.href.split("#")[0],
        referrer: document.referrer || "",
        submitted_at: new Date().toISOString(),
        form_started: val("form_started"),
        elapsed_ms: String(Date.now() - startedAt)
      };
      Object.keys(tracking).forEach(function (k) { lead[k] = tracking[k]; });
      return lead;
    }

    function timed(url, options) {
      var ctrl = "AbortController" in window ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, SEND_TIMEOUT) : null;
      if (ctrl) options.signal = ctrl.signal;
      return fetch(url, options).then(function (res) { clearTimeout(timer); return res; }, function (err) { clearTimeout(timer); throw err; });
    }

    function sendWebhook(lead) {
      if (!WEBHOOK_URL) return Promise.reject(new Error("webhook not configured"));
      return timed(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      }).then(function (res) { if (!res.ok) throw new Error("webhook " + res.status); });
    }

    function sendWeb3Forms(lead) {
      if (!WEB3FORMS_KEY) return Promise.reject(new Error("web3forms not configured"));
      // FormData keeps this a simple request (no CORS preflight)
      var fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append("subject", "New quote request: " + (lead.service || "Website") + " | " + lead.name);
      fd.append("from_name", "DGP Construction website");
      fd.append("replyto", lead.email);
      Object.keys(lead).forEach(function (k) { fd.append(k, lead[k]); });
      return timed(WEB3FORMS_URL, { method: "POST", headers: { Accept: "application/json" }, body: fd })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            if (!res.ok || data.success === false) throw new Error("web3forms " + res.status);
          });
        });
    }

    function trackConversion() {
      // fires only if the Google tag or the Meta Pixel are installed later
      try {
        if (window.dataLayer && window.dataLayer.push) window.dataLayer.push({ event: "generate_lead", form_id: FORM_ID });
        if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { form_id: FORM_ID });
        if (typeof window.fbq === "function") window.fbq("track", "Lead");
      } catch (err) { /* tracking must never break the form */ }
    }

    function show(i) {
      current = i;
      steps.forEach(function (s, k) {
        var on = k === i;
        s.hidden = !on;
        s.classList.toggle("is-active", on);
      });
      marks.forEach(function (m, k) {
        m.classList.toggle("is-done", k < i);
        m.classList.toggle("is-current", k === i);
      });
      count.textContent = "Step " + (i + 1) + " of " + steps.length;
      back.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      steps[i].querySelector(".step-title").focus({ preventScroll: true });
    }

    function stepValid(i) {
      var step = steps[i];
      if (i === 0) {
        var ok = !!step.querySelector("input[name=service]:checked");
        step.classList.toggle("is-invalid", !ok);
        if (!ok) step.querySelector("input[name=service]").focus();
        return ok;
      }
      var firstBad = null;
      step.querySelectorAll("input[required]").forEach(function (input) {
        if (!check(input) && !firstBad) firstBad = input;
      });
      if (firstBad) firstBad.focus();
      return !firstBad;
    }

    function goNext() { if (stepValid(current) && current < steps.length - 1) show(current + 1); }

    next.addEventListener("click", goNext);
    back.addEventListener("click", function () { if (current > 0) show(current - 1); });

    // a mouse click on a service tile moves straight on; keyboard users keep control with Next
    form.querySelectorAll(".choice").forEach(function (c) {
      c.addEventListener("click", function (e) {
        steps[0].classList.remove("is-invalid");
        if (e.detail > 0 && current === 0) setTimeout(goNext, 220);
      });
    });

    // ---------- phone mask: (203) 555-0123 ----------
    var phoneInput = document.getElementById("f-phone");
    function phoneDigits(value) {
      var d = value.replace(/\D/g, "");
      if (d.length > 10 && d.charAt(0) === "1") d = d.slice(1); // drop the +1 country code
      return d.slice(0, 10);
    }
    function formatPhone(d) {
      if (!d) return "";
      if (d.length < 4) return "(" + d;
      if (d.length < 7) return "(" + d.slice(0, 3) + ") " + d.slice(3);
      return "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6);
    }
    if (phoneInput) {
      var lastDigits = phoneDigits(phoneInput.value);
      form.addEventListener("reset", function () { lastDigits = ""; });
      phoneInput.addEventListener("input", function (e) {
        var caret = phoneInput.selectionStart || 0;
        var digitsBeforeCaret = phoneInput.value.slice(0, caret).replace(/\D/g, "").length;
        var d = phoneDigits(phoneInput.value);
        // backspace over "(", ")", " " or "-" removes the digit before it instead of getting stuck
        if (e.inputType === "deleteContentBackward" && d === lastDigits && digitsBeforeCaret > 0) {
          d = d.slice(0, digitsBeforeCaret - 1) + d.slice(digitsBeforeCaret);
          digitsBeforeCaret -= 1;
        }
        phoneInput.value = formatPhone(d);
        lastDigits = d;
        // put the caret back after the same number of digits
        var pos = 0, seen = 0;
        while (pos < phoneInput.value.length && seen < digitsBeforeCaret) {
          if (/\d/.test(phoneInput.value.charAt(pos))) seen += 1;
          pos += 1;
        }
        if (document.activeElement === phoneInput) phoneInput.setSelectionRange(pos, pos);
      });
    }

    form.querySelectorAll("input[required]:not([type=radio])").forEach(function (input) {
      input.addEventListener("blur", function () { if (input.value) check(input); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("is-invalid")) check(input);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Enter on an earlier step moves forward instead of sending
      if (current < steps.length - 1) { goNext(); return; }
      if (!stepValid(current)) return;

      // bots get the success screen and nothing is sent.
      // The lead endpoint must repeat both checks server side: company empty, now - form_started >= 4000 ms.
      if (isSpam()) {
        var fake = document.getElementById("form-done");
        fake.hidden = false;
        fake.focus();
        return;
      }

      var label = submit.querySelector(".btn-label");
      submit.disabled = true;
      submit.classList.add("is-loading");
      label.textContent = "Sending your request";

      var errorBox = document.getElementById("form-error");
      if (errorBox) errorBox.hidden = true;
      var lead = leadData();
      var ok = function () { return true; };
      var failed = function () { return false; };

      Promise.all([sendWeb3Forms(lead).then(ok, failed), sendWebhook(lead).then(ok, failed)]).then(function (results) {
        submit.disabled = false;
        submit.classList.remove("is-loading");
        label.textContent = "Send for my 24-hour quote";
        if (results[0] || results[1]) {
          trackConversion();
          var done = document.getElementById("form-done");
          done.hidden = false;
          done.focus();
          form.reset();
          if (startedField) startedField.value = String(startedAt);
        } else if (errorBox) {
          errorBox.hidden = false;
          errorBox.focus();
        }
      });
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
