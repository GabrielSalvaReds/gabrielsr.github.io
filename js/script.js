(function () {
  'use strict';



  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));



  const gamehubToggle = document.querySelector(".gamehub-toggle");
  const gamehubMenu = document.querySelector(".gamehub-menu");

  if (gamehubToggle) {
    gamehubToggle.addEventListener("click", () => {
      const isVisible = gamehubMenu.style.display === "block";
      gamehubMenu.style.display = isVisible ? "none" : "block";
    });


    document.addEventListener("click", (e) => {
      if (!e.target.closest(".gamehub")) {
        gamehubMenu.style.display = "none";
      }
    });
  }


const themeToggle = document.getElementById("themeToggle");

let darkMode = true; 

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.documentElement.style.setProperty('--bg', '#111');
    document.documentElement.style.setProperty('--text', '#fff');
    themeToggle.innerHTML = "◐";
  } else {
    document.documentElement.style.setProperty('--bg', '#f5f5f5');
    document.documentElement.style.setProperty('--text', '#111');
    themeToggle.innerHTML = "◑";
  }
});


  (() => {
    
    function qs(sel) { return document.querySelector(sel); }
    function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

    const sidebar = qs('#siteSidebar');
    const backdrop = qs('#sidebarBackdrop') || qs('.sidebar-backdrop') || null;
    const openBtn = qs('.mobile-nav-toggle');
    const closeBtn = qs('.mobile-nav-close');

    
    function safeAddListener(el, ev, fn) { if (el) el.addEventListener(ev, fn); }

    function openSidebar() {
      if (sidebar) {
        sidebar.classList.add('open');
        sidebar.setAttribute('aria-hidden', 'false');
      }
      if (backdrop) backdrop.classList.add('open');
      document.documentElement.classList.add('no-scroll'); 
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.setAttribute('aria-hidden', 'true');
      }
      if (backdrop) backdrop.classList.remove('open');
      document.documentElement.classList.remove('no-scroll');
      document.body.style.overflow = '';
    }

    
    safeAddListener(openBtn, 'click', (e) => { e.preventDefault(); openSidebar(); });
    safeAddListener(closeBtn, 'click', (e) => { e.preventDefault(); closeSidebar(); });
    safeAddListener(backdrop, 'click', (e) => { e.preventDefault(); closeSidebar(); });

    
    if (sidebar) {
      sidebar.addEventListener('click', (ev) => {
        
        const a = ev.target.closest('a');
        if (a && a.getAttribute('href') && a.getAttribute('href').startsWith('#')) {
          closeSidebar();
        }
      });
    }

    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) closeSidebar();
    });

    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });
  })();


  const sidebar = document.getElementById('siteSidebar');
  const backdrop = document.getElementById('sidebarBackdrop') || document.querySelector('.sidebar-backdrop');
  const openBtn = document.querySelector('.mobile-nav-toggle');
  const closeBtn = document.querySelector('.mobile-nav-close');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (sidebar) sidebar.setAttribute('aria-hidden', 'false');
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (sidebar) sidebar.setAttribute('aria-hidden', 'true');
  }

  openBtn?.addEventListener('click', (e) => { e.preventDefault(); openSidebar(); });
  closeBtn?.addEventListener('click', (e) => { e.preventDefault(); closeSidebar(); });
  backdrop?.addEventListener('click', () => closeSidebar());

  
  $$('.site-sidebar a').forEach(a => a.addEventListener('click', () => closeSidebar()));


  
  function typeWriter(el, words, typeSpeed = 70, deleteSpeed = 35, delayBetween = 1400) {
    if (!el) return;
    let wIdx = 0, chIdx = 0, deleting = false;
    const tick = () => {
      const word = words[wIdx];
      el.textContent = word.slice(0, chIdx);
      if (!deleting) {
        if (chIdx < word.length) {
          chIdx++;
          setTimeout(tick, typeSpeed);
        } else {
          deleting = true;
          setTimeout(tick, delayBetween);
        }
      } else {
        if (chIdx > 0) {
          chIdx--;
          setTimeout(tick, deleteSpeed);
        } else {
          deleting = false;
          wIdx = (wIdx + 1) % words.length;
          setTimeout(tick, 400);
        }
      }
    };
    tick();
  }

  const roleEl = document.querySelector('.typed-target') || document.querySelector('.role');
  if (roleEl) {
    typeWriter(roleEl,
      ['Developer • Designer', 'IT Student • Creative Developer', 'Problem Solver • Maker'],
      70, 35, 1400);
  }


  
  const navLinks = $$('a[href^="#"]').filter(a => !a.classList.contains('no-scroll'));
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      closeSidebar();
    });
  });

  
  const sections = Array.from(document.querySelectorAll('section, header'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id || 'home';
      $$('a[href^="#"]').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === ('#' + id));
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));


  
  const header = document.getElementById('header') || document.querySelector('.site-header');
  function toggleHeaderScrolled() {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('header-scrolled'); else header.classList.remove('header-scrolled');
  }
  window.addEventListener('scroll', toggleHeaderScrolled);
  toggleHeaderScrolled();


  
  if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, mirror: false });
  }


  
  const revealEls = $$('.reveal, .project-card, .about-card');
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealIO.observe(el));


  
  const contactForm = document.getElementById('contactForm') || document.querySelector('form.contact-form');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const action = contactForm.getAttribute('action') || '';
      const data = new FormData(contactForm);
      if (action.includes('yourFormID') || action.trim() === '') {
        
        const name = data.get('name') || 'Anonymous';
        const email = data.get('email') || '';
        const message = data.get('message') || '';
        const mailto = `mailto:paolo.redillas@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
        window.location.href = mailto;
        if (formStatus) { formStatus.textContent = 'Opened mail client as fallback. Replace Formspree ID to enable direct sending.'; setTimeout(() => formStatus.textContent = '', 4500); }
        return;
      }
      
      fetch(action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(res => {
          if (res.ok) {
            if (formStatus) formStatus.textContent = 'Thanks — message sent.';
            contactForm.reset();
            setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 4000);
          } else {
            res.json().then(d => { if (formStatus) formStatus.textContent = d.error || 'Error sending message'; });
          }
        }).catch(() => { if (formStatus) formStatus.textContent = 'Network error — try mail fallback.'; });
    });
  }



  const openGameModal = (slug) => {
    
    const iframeSrc = slug;
    
    let modal = document.getElementById('gameModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gameModal';
      modal.className = 'game-modal';
      modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-card" role="dialog" aria-modal="true" aria-label="Game modal">
          <div class="modal-header">
            <strong>Grow Ga-as</strong>
            <button class="modal-close" aria-label="Close"><i class="bi bi-x"></i></button>
          </div>
          <div class="modal-body">
            <iframe id="growGameFrame" src="" frameborder="0" style="width:100%;height:72vh;border:0;border-radius:8px;display:block;"></iframe>
          </div>
        </div>`;
      document.body.appendChild(modal);


      modal.querySelector('.modal-close').addEventListener('click', closeGameModal);
      modal.querySelector('.modal-backdrop').addEventListener('click', closeGameModal);
      document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeGameModal(); });
    }

    
    const iframe = modal.querySelector('#growGameFrame');
    iframe.src = iframeSrc;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeGameModal = () => {
    const modal = document.getElementById('gameModal');
    if (!modal) return;
    const iframe = modal.querySelector('#growGameFrame');
    if (iframe) iframe.src = ''; 
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  
  $$('[data-game]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-game') || '';
      
      
      const src = val.includes('/') ? val : `projects/${val}.html`;
      openGameModal(src);
    });
  });

  
  
  if ($$('.project-card').length && !$$('[data-game]').length) {
    const first = $$('.project-card')[0];
    first.setAttribute('data-game', 'projects/grow-gaas.html');
    first.addEventListener('click', (e) => { e.preventDefault(); openGameModal('projects/grow-gaas.html'); });
  }


  
  window.addEventListener('resize', () => { if (window.innerWidth > 880) closeSidebar(); });

})();
