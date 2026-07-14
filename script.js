/* ============================================================
   Wandfor 寶佳美 — 純原生 JavaScript，無任何外部依賴
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 手機導覽選單 ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    });

    // 點選單內連結後自動收合
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // 點選單外區域收合
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 捲動進場動畫（尊重減少動態偏好） ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 回到頂端按鈕 ---------- */
  var backTop = document.getElementById('backTop');
  if (backTop) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        backTop.hidden = window.scrollY < 600;
        ticking = false;
      });
    }, { passive: true });

    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 頁尾年份自動更新 ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
