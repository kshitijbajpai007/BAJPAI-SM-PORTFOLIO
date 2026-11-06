/**
 * KSHITIJ BAJPAI — PORTFOLIO INTERACTIVITY SCRIPT
 * Indian Maximalist Portfolio Interactions with Real Carousel Decks & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initMoodboardModal();
  initSmoothScroll();
});

/* -------------------------------------------------------------
 * 1. Mobile Navigation
 * ----------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // Close nav when clicking a link
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

/* -------------------------------------------------------------
 * 2. Published Works Category Filter
 * ----------------------------------------------------------- */
function switchPubCategory(category) {
  const buttons = document.querySelectorAll('.pub-tab-btn');
  const groups = document.querySelectorAll('.published-group');

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${category}'`));
  });

  groups.forEach(group => {
    if (category === 'all') {
      group.style.display = 'block';
    } else {
      const groupCat = group.getAttribute('data-category');
      group.style.display = groupCat === category ? 'block' : 'none';
    }
  });
}
window.switchPubCategory = switchPubCategory;

/* -------------------------------------------------------------
 * 3. Real Image Carousel Decks (Hinge Profile & Tarot Reading)
 * ----------------------------------------------------------- */
const deckIndices = {
  deckHinge: 0,
  deckTarot: 0
};

function navImageDeck(deckId, direction) {
  const container = document.getElementById(deckId);
  if (!container) return;

  const images = container.querySelectorAll('.deck-image');
  const dots = document.querySelectorAll(`#${deckId}-pag .pag-dot`);
  const total = images.length;

  if (total === 0) return;

  deckIndices[deckId] = (deckIndices[deckId] + direction + total) % total;
  updateDeckUI(deckId, deckIndices[deckId], images, dots);
}
window.navImageDeck = navImageDeck;

function jumpImageDeck(deckId, index) {
  const container = document.getElementById(deckId);
  if (!container) return;

  const images = container.querySelectorAll('.deck-image');
  const dots = document.querySelectorAll(`#${deckId}-pag .pag-dot`);

  deckIndices[deckId] = index;
  updateDeckUI(deckId, index, images, dots);
}
window.jumpImageDeck = jumpImageDeck;

function updateDeckUI(deckId, activeIndex, images, dots) {
  images.forEach((img, idx) => {
    img.classList.toggle('active', idx === activeIndex);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === activeIndex);
  });
}

/* -------------------------------------------------------------
 * 4. Universal Lightbox (For Full-Res Slide & LinkedIn Zoom)
 * ----------------------------------------------------------- */
function openLightbox(imageSrc, caption) {
  const lightbox = document.getElementById('universalLightbox');
  const imgElem = document.getElementById('lightboxImg');
  const captionElem = document.getElementById('lightboxCaption');

  if (lightbox && imgElem) {
    imgElem.src = imageSrc;
    if (captionElem) {
      captionElem.textContent = caption || 'Published Proof of Work';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
window.openLightbox = openLightbox;

function closeLightbox(e) {
  const lightbox = document.getElementById('universalLightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}
window.closeLightbox = closeLightbox;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

/* -------------------------------------------------------------
 * 5. Coffee Place (Filter & Phursat) Calendar Tabs
 * ----------------------------------------------------------- */
function switchCalWeek(weekNum) {
  const buttons = document.querySelectorAll('.cal-tab-btn');
  const panels = document.querySelectorAll('.week-panel');

  buttons.forEach((btn, idx) => {
    btn.classList.toggle('active', idx + 1 === weekNum);
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === `week${weekNum}`;
    panel.classList.toggle('active', isTarget);
  });
}
window.switchCalWeek = switchCalWeek;

/* -------------------------------------------------------------
 * 6. Copy Email to Clipboard & Toast Notification
 * ----------------------------------------------------------- */
function copyEmail(e) {
  e.preventDefault();
  e.stopPropagation();

  const email = 'rickrolledrum@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('Copied rickrolledrum@gmail.com to clipboard! 📋');
  }).catch(() => {
    showToast('Email: rickrolledrum@gmail.com');
  });
}
window.copyEmail = copyEmail;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const textElem = toast.querySelector('.toast-text');
  if (textElem && message) {
    textElem.textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* -------------------------------------------------------------
 * 7. Moodboard Modal Handlers
 * ----------------------------------------------------------- */
function initMoodboardModal() {
  const modal = document.getElementById('moodboardModal');
  const openBtn = document.getElementById('openMoodboardBtn');
  const closeBtn = document.getElementById('closeMoodboardBtn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* -------------------------------------------------------------
 * 8. Smooth Scroll Offset
 * ----------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}


/* -------------------------------------------------------------
 * 10. Gully Labs × Eluno Collab Deck Tab Switcher
 * ----------------------------------------------------------- */
function switchGullyTab(tabKey) {
  const tabButtons = document.querySelectorAll('.deck-tab-btn');
  const panels = document.querySelectorAll('.deck-tab-panel');

  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${tabKey}'`));
  });

  panels.forEach(panel => {
    panel.classList.toggle('active', panel.id === `gullyTab-${tabKey}`);
  });
}
window.switchGullyTab = switchGullyTab;

function toggleNativeReel() {
  const video = document.getElementById('reelNativeVideo');
  const overlay = document.getElementById('nativePlayOverlay');
  if (!video) return;

  if (video.paused) {
    video.play().then(() => {
      if (overlay) overlay.classList.add('playing');
    }).catch(err => {
      console.log('Video play error:', err);
    });
  } else {
    video.pause();
    if (overlay) overlay.classList.remove('playing');
  }
}
window.toggleNativeReel = toggleNativeReel;

// Sync overlay with video events
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('reelNativeVideo');
  const overlay = document.getElementById('nativePlayOverlay');
  if (video && overlay) {
    video.addEventListener('play', () => {
      overlay.classList.add('playing');
    });
    video.addEventListener('pause', () => {
      overlay.classList.remove('playing');
    });
    video.addEventListener('ended', () => {
      overlay.classList.remove('playing');
    });
  }
});
