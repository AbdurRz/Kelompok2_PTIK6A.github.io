/* ═══════════════════════════════════════
   RUANG KENANGAN — Main Script
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  /* ─── HAMBURGER ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });

  // Close menu when link clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  /* ─── ACTIVE NAV LINK (same page only) ─── */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 120;
      if (window.scrollY >= sTop) {
        current = section.getAttribute('id');
      }
    });
    allNavLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  /* ─── SEARCH OVERLAY ─── */
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  searchBtn?.addEventListener('click', () => {
    searchOverlay?.classList.add('open');
    setTimeout(() => searchInput?.focus(), 200);
  });

  searchClose?.addEventListener('click', closeSearch);
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  function closeSearch() {
    searchOverlay?.classList.remove('open');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });

  /* ─── MUSIC TOGGLE ─── */
  const musicBtn = document.getElementById('musicBtn');
  let musicPlaying = false;
  let audio = null;

  musicBtn?.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    if (musicPlaying) {
      musicBtn.classList.add('playing');
      musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
      musicBtn.title = 'Matikan Musik';
      // Audio would be loaded here if a real file exists
      // audio = new Audio('assets/music.mp3'); audio.loop = true; audio.play();
    } else {
      musicBtn.classList.remove('playing');
      musicBtn.innerHTML = '<i class="fas fa-music"></i>';
      musicBtn.title = 'Putar Musik';
      // audio?.pause();
    }
  });

  /* ─── SCROLL ANIMATIONS ─── */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  /* ─── COUNTER ANIMATION ─── */
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const dur = 2000;
    const step = 16;
    const inc = target / (dur / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseInt(el.dataset.target);
        const suf = el.dataset.suffix || '';
        animateCounter(el, val, suf);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ─── RANDOM MEMORY BUTTON ─── */
  const randomBtn = document.getElementById('randomBtn');
  const randomBtnBig = document.getElementById('randomBtnBig');
  const randomFrame = document.getElementById('randomFrame');
  const randomImg = document.getElementById('randomImg');

  const memories = [
    '/assets/1.3.jpeg',
    '/assets/2.jpeg',
    '/assets/3.jpeg',
    '/assets/4.jpeg',
    '/assets/5.jpeg',
  ];

  function showRandom() {
    const idx = Math.floor(Math.random() * memories.length);
    if (randomImg) randomImg.src = memories[idx];
    if (randomFrame) {
      randomFrame.classList.add('show');
      randomFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Small wiggle animation on button
    const btn = randomBtn || randomBtnBig;
    if (btn) {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => { btn.style.transform = ''; }, 200);
    }
  }

  randomBtn?.addEventListener('click', showRandom);
  randomBtnBig?.addEventListener('click', showRandom);

  /* ─── MAHASISWA SEARCH (for mahasiswa page) ─── */
  const studentSearch = document.getElementById('studentSearch');
  const studentCards = document.querySelectorAll('.mahasiswa-card');

  studentSearch?.addEventListener('input', () => {
    const q = studentSearch.value.toLowerCase();
    studentCards.forEach(card => {
      const name = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const nim  = card.querySelector('.nim')?.textContent.toLowerCase() || '';
      card.style.display = (name.includes(q) || nim.includes(q)) ? '' : 'none';
    });
  });

  /* ─── MODAL PROFIL ─── */
  const modal = document.getElementById('profileModal');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.btn-profile').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.mahasiswa-card');
      if (!card || !modal) return;

      modal.querySelector('#modalAvatar').src = card.querySelector('.mahasiswa-avatar')?.src || '';
      modal.querySelector('#modalName').textContent = card.querySelector('h4')?.textContent || '';
      modal.querySelector('#modalNIM').textContent = card.querySelector('.nim')?.textContent || '';
      modal.querySelector('#modalPesan').textContent = card.dataset.pesan || 'Terima kasih atas kenangan indah bersama teman-teman PTIK A 2023. Semoga sukses selalu!';

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ─── MARQUEE DUPLICATE ─── */
  const marqueeContent = document.querySelector('.marquee-content');
  if (marqueeContent) {
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
  }

  /* ─── HERO TEXT REVEAL ─── */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroTitle.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  /* ─── VIDEO PLAY BUTTONS ─── */
  document.querySelectorAll('.video-play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Simulate play — would open modal or iframe in real version
      btn.innerHTML = '<i class="fas fa-pause"></i>';
      setTimeout(() => { btn.innerHTML = '<i class="fas fa-play"></i>'; }, 2000);
    });
  });

});
