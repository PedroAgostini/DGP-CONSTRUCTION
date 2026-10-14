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

      var label = submit.querySelector(".btn-label");
      submit.disabled = true;
      submit.classList.add("is-loading");
      label.textContent = "Sending your request";

      /*
        TODO (integration): send FormData(form) to the lead endpoint here,
        e.g. fetch(form.action, { method: "POST", body: new FormData(form) }).
        The timeout below only simulates the success state.
      */
      setTimeout(function () {
        var done = document.getElementById("form-done");
        done.hidden = false;
        done.focus();
        submit.disabled = false;
        submit.classList.remove("is-loading");
        label.textContent = "Send for my 24-hour quote";
      }, 900);
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
