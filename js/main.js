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

     const nimEl = card.querySelector('.nim');
modal.querySelector('#modalAvatar').src = card.querySelector('.mahasiswa-avatar')?.src || '';
modal.querySelector('#modalName').textContent = card.querySelector('h4')?.textContent || '';
modal.querySelector('#modalNIM').textContent = nimEl?.textContent || '';
modal.querySelector('#modalPesan').textContent = card.dataset.pesan || 'Terima kasih atas kenangan indah bersama teman-teman PTIK A 2023. Semoga sukses selalu!';
const modalAsal = modal.querySelector('#modalAsal');
if (modalAsal) modalAsal.textContent = nimEl?.dataset.asal || 'Sumatera Barat';

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

  /* ─── FITUR 1: DARK / LIGHT MODE TOGGLE ─── */
  const themeBtn = document.getElementById('themeBtn');
  const savedTheme = localStorage.getItem('rk-theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
      if (themeBtn) themeBtn.title = 'Mode Gelap';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
      if (themeBtn) themeBtn.title = 'Mode Terang';
    }
    localStorage.setItem('rk-theme', theme);
  }

  applyTheme(savedTheme);

  themeBtn?.addEventListener('click', () => {
    const current = localStorage.getItem('rk-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ─── FITUR 2: DOWNLOAD FOTO GALERI ─── */
  document.querySelectorAll('.gallery-download-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const src = btn.dataset.src;
      if (!src) return;
      try {
        const res = await fetch(src);
        const blob = await res.blob();
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = src.split('/').pop() || 'foto-kenangan.jpg';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Foto berhasil diunduh!');
      } catch {
        // Fallback: open in new tab
        window.open(src, '_blank');
        showToast('Foto dibuka di tab baru');
      }
    });
  });

  /* ─── FITUR 4: CETAK PROFIL MAHASISWA ─── */
  document.querySelectorAll('.btn-print-profile').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.mahasiswa-card');
      if (!card) return;

      const name   = card.querySelector('h4')?.textContent || '';
      const nim    = card.querySelector('.nim')?.textContent || '';
      const pesan  = card.dataset.pesan || '';
      const imgSrc = card.querySelector('.mahasiswa-avatar')?.src || '';

      // Build print window
      const win = window.open('', '_blank', 'width=480,height=640');
      win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Profil — ${name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      padding: 2rem;
    }
    .card {
      width: 320px;
      border: 2px solid #1a8a4a;
      border-radius: 18px;
      padding: 2.2rem 2rem 1.8rem;
      text-align: center;
      page-break-inside: avoid;
    }
    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
      border: 3px solid #1a8a4a;
      margin: 0 auto 1.2rem;
      display: block;
    }
    h2 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #0d1f10;
      margin-bottom: 0.3rem;
    }
    .nim {
      font-size: 0.82rem;
      color: #1a8a4a;
      font-weight: 600;
      margin-bottom: 1.2rem;
    }
    .divider {
      border: none;
      border-top: 1px solid #ddd;
      margin: 1rem 0;
    }
    .pesan {
      font-size: 0.88rem;
      color: #444;
      font-style: italic;
      line-height: 1.75;
    }
    .watermark {
      margin-top: 1.5rem;
      font-size: 0.68rem;
      color: #aaa;
      letter-spacing: 0.04em;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="card">
    <img src="${imgSrc}" class="avatar" alt="${name}" />
    <h2>${name}</h2>
    <p class="nim">${nim}</p>
    <hr class="divider" />
    <p class="pesan">"${pesan}"</p>
    <p class="watermark">Ruang Kenangan PTIK A 2023 &middot; UIN Bukittinggi</p>
  </div>
  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() { window.close(); }, 500);
    };
  </script>
</body>
</html>`);
      win.document.close();
    });
  });

  /* ─── TOAST HELPER ─── */
  function showToast(msg) {
    let toast = document.getElementById('rkToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'rkToast';
      toast.className = 'toast-notification';
      toast.innerHTML = '<i class="fas fa-check-circle"></i><span></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ─── FITUR 4: KOMENTAR BUKU KENANGAN ─── */
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    const STORAGE_KEY = 'rk-comments-v1';
    const commentList = document.getElementById('userCommentList');
    const commentCountBadge = document.getElementById('commentCountBadge');
    const commentText = document.getElementById('commentText');
    const charCount = document.getElementById('commentCharCount');

    function loadComments() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
      catch { return []; }
    }

    function saveComments(arr) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    }

    function renderComments() {
      const comments = loadComments();
      if (!commentList) return;
      commentList.innerHTML = '';
      if (commentCountBadge) commentCountBadge.textContent = comments.length;

      comments.forEach((c, idx) => {
        const initials = c.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
        const card = document.createElement('div');
        card.className = 'user-comment-card';
        card.innerHTML = `
          <button class="user-comment-delete" data-idx="${idx}" title="Hapus"><i class="fas fa-times"></i></button>
          <div class="user-comment-header">
            <div class="user-comment-meta">
              <div class="user-comment-avatar">${initials}</div>
              <div>
                <div class="user-comment-name">${c.name}</div>
                <div class="user-comment-nim">${c.nim || ''}</div>
              </div>
            </div>
            <div class="user-comment-time">${c.time}</div>
          </div>
          <p class="user-comment-text">"${c.text}"</p>
        `;
        commentList.appendChild(card);
      });

      // Delete handler
      commentList.querySelectorAll('.user-comment-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.idx);
          const arr = loadComments();
          arr.splice(i, 1);
          saveComments(arr);
          renderComments();
          showToast('Komentar dihapus');
        });
      });
    }

    // Char counter
    commentText?.addEventListener('input', () => {
      const len = commentText.value.length;
      if (charCount) charCount.textContent = `${len}/300`;
      if (len > 300) commentText.value = commentText.value.slice(0, 300);
    });

    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('commentName')?.value.trim();
      const nim  = document.getElementById('commentNIM')?.value.trim();
      const text = commentText?.value.trim();

      if (!name || !text) {
        showToast('Isi nama dan pesan dulu ya!');
        return;
      }

      const now  = new Date();
      const time = now.toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' });
      const arr  = loadComments();
      arr.unshift({ name, nim, text, time });
      saveComments(arr);
      renderComments();
      commentForm.reset();
      if (charCount) charCount.textContent = '0/300';
      showToast('Pesan kamu berhasil ditambahkan!');
      document.getElementById('userCommentList')?.scrollIntoView({ behavior:'smooth', block:'nearest' });
    });

    renderComments();
  }

});