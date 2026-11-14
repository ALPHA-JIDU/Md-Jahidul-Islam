import { INITIAL_BLOG_POSTS } from './data.js';
import { bindImageShimmer, createFallbackTile } from './shimmer.js';

export function renderBlogView(container) {
  container.innerHTML = `
    <div class="min-h-screen flex flex-col bg-[#080808] spa-view-active">
      <header class="border-b border-white/8 bg-[#080808]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
          <a
            href="./index.html"
            data-spa-link="home"
            class="inline-flex items-center gap-2 min-h-[44px] text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md whitespace-nowrap shrink-0"
          >
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
            </svg>
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      <main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
        <!-- Intro -->
        <section class="border-b border-white/8">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
            <p class="text-[11px] font-medium uppercase tracking-[0.26em] text-neutral-400">
              Sea Journal &amp; Essays
            </p>
            <h1 class="mt-3 font-serif text-4xl sm:text-5xl font-normal tracking-tight text-white text-balance">
              Dispatches from Sea &amp; Shore
            </h1>
            <p class="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Stories from maritime passages, darkroom notes, and quiet observations written along the horizon.
            </p>
          </div>
        </section>

        <!-- Blog Feed -->
        <section aria-labelledby="blog-feed-heading">
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div role="tablist" aria-label="Filter journal entries" class="flex flex-wrap items-center gap-2">
                ${['All', 'Voyage Logs', 'Photography', 'Reflections']
                  .map(
                    (cat, idx) => `
                  <button
                    type="button"
                    role="tab"
                    aria-selected="${idx === 0 ? 'true' : 'false'}"
                    data-blog-filter="${cat}"
                    class="min-h-[40px] px-4 py-2 text-xs font-medium rounded-full ${
                      idx === 0 ? 'bg-white text-neutral-950' : 'bg-white/8 text-neutral-300 hover:bg-white/14'
                    } transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                  >
                    ${cat}
                  </button>`
                  )
                  .join('')}
              </div>

              <p id="blog-count" class="text-xs tabular-nums text-neutral-400">03 Essays</p>
            </div>

            <h2 id="blog-feed-heading" class="sr-only">Journal Posts</h2>
            <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          </div>
        </section>
      </main>

      <footer class="border-t border-white/8 bg-[#080808]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>&copy; 2026 Jahidul Islam Jihad. All rights reserved.</p>
          <p>Designed with passion &middot; Inspired by the sea</p>
        </div>
      </footer>

      <!-- Accessible Blog Post Reader Modal -->
      <div
        id="blog-reader-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-title"
        class="hidden fixed inset-0 z-50 items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      >
        <article class="relative w-full max-w-3xl my-auto bg-[#0e0e0e] border border-white/12 rounded-2xl overflow-hidden shadow-2xl">
          <button
            id="reader-close"
            type="button"
            aria-label="Close article reader"
            class="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/75 text-white border border-white/15 hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div id="reader-cover-wrap" class="img-shimmer w-full aspect-[16/9] max-h-[340px]">
            <img
              id="reader-cover"
              src=""
              alt=""
              referrerPolicy="no-referrer"
              class="w-full h-full object-cover grayscale contrast-110"
            />
          </div>

          <div class="p-6 sm:p-10 space-y-6">
            <div class="space-y-3">
              <p id="reader-meta" class="text-xs text-neutral-400"></p>
              <h2 id="reader-title" class="font-serif text-2xl sm:text-3xl text-white leading-snug"></h2>
            </div>

            <div id="reader-body" class="space-y-4 text-sm sm:text-base leading-[1.8] text-neutral-300"></div>

            <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <p class="font-serif italic text-sm text-neutral-400">Written by Jahidul Islam Jihad</p>
              <button
                id="reader-share"
                type="button"
                class="min-h-[40px] px-4 py-1.5 rounded-full border border-white/25 text-xs font-medium text-white hover:bg-white hover:text-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                Copy Link
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;

  const posts = [...INITIAL_BLOG_POSTS];
  let activeCategory = 'All';
  let lastFocusedEl = null;

  const grid = container.querySelector('#blog-grid');
  const countEl = container.querySelector('#blog-count');
  const tabs = container.querySelectorAll('[data-blog-filter]');

  const readerModal = container.querySelector('#blog-reader-modal');
  const readerClose = container.querySelector('#reader-close');
  const readerCoverWrap = container.querySelector('#reader-cover-wrap');
  const readerCover = container.querySelector('#reader-cover');
  const readerMeta = container.querySelector('#reader-meta');
  const readerTitle = container.querySelector('#reader-title');
  const readerBody = container.querySelector('#reader-body');
  const readerShare = container.querySelector('#reader-share');

  let activePost = null;

  function openReader(post) {
    activePost = post;
    lastFocusedEl = document.activeElement;

    if (readerCover && readerCoverWrap) {
      readerCover.alt = post.coverAlt;
      bindImageShimmer(readerCover, readerCoverWrap, null, post.coverSrc);
    }

    if (readerMeta) {
      readerMeta.textContent = `${post.category} · ${post.date} · ${post.readTime} · ${post.location}`;
    }
    if (readerTitle) readerTitle.textContent = post.title;
    if (readerBody) {
      readerBody.innerHTML = '';
      post.paragraphs.forEach((para) => {
        const p = document.createElement('p');
        p.textContent = para;
        readerBody.appendChild(p);
      });
    }
    if (readerShare) readerShare.textContent = 'Copy Link';

    readerModal?.classList.remove('hidden');
    readerModal?.classList.add('flex');
    document.body.style.overflow = 'hidden';
    readerClose?.focus();
  }

  function closeReader() {
    readerModal?.classList.add('hidden');
    readerModal?.classList.remove('flex');
    document.body.style.overflow = '';
    activePost = null;
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  readerClose?.addEventListener('click', closeReader);
  readerModal?.addEventListener('click', (e) => {
    if (e.target === readerModal) closeReader();
  });

  const handleEscape = (e) => {
    if (e.key === 'Escape' && activePost) closeReader();
  };
  document.addEventListener('keydown', handleEscape);

  readerShare?.addEventListener('click', async () => {
    if (!activePost) return;
    const shareUrl = new URL(`./blog.html#${activePost.id}`, window.location.href).href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      readerShare.textContent = 'Link Copied';
      window.setTimeout(() => {
        if (readerShare) readerShare.textContent = 'Copy Link';
      }, 1800);
    } catch {
      readerShare.textContent = 'Ready';
    }
  });

  function renderFeed() {
    if (!grid) return;
    const filtered =
      activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

    if (countEl) {
      countEl.textContent = `${String(filtered.length).padStart(2, '0')} ${filtered.length === 1 ? 'Essay' : 'Essays'}`;
    }

    grid.innerHTML = '';

    filtered.forEach((post) => {
      const card = document.createElement('article');
      card.className =
        'flex flex-col justify-between rounded-2xl bg-[#111111] border border-white/10 overflow-hidden transition-colors hover:border-white/20';

      const mediaBtn = document.createElement('button');
      mediaBtn.type = 'button';
      mediaBtn.className =
        'img-shimmer w-full aspect-[16/10] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer';
      mediaBtn.setAttribute('aria-label', `Read blog post: ${post.title}`);

      const img = document.createElement('img');
      img.alt = post.coverAlt;
      img.loading = 'eager';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.className = 'w-full h-full object-cover grayscale contrast-110 hover:scale-[1.03]';
      bindImageShimmer(
        img,
        mediaBtn,
        () => {
          img.replaceWith(createFallbackTile(post.title));
        },
        post.coverSrc
      );
      mediaBtn.appendChild(img);
      mediaBtn.addEventListener('click', () => openReader(post));

      const body = document.createElement('div');
      body.className = 'p-6 flex-1 flex flex-col justify-between gap-5';

      const top = document.createElement('div');
      top.className = 'space-y-3';

      const meta = document.createElement('p');
      meta.className = 'text-xs text-neutral-400';
      meta.textContent = `${post.category} · ${post.date} · ${post.readTime}`;

      const heading = document.createElement('h3');
      heading.className = 'font-serif text-xl text-white leading-snug';
      heading.textContent = post.title;

      const excerpt = document.createElement('p');
      excerpt.className = 'text-sm leading-relaxed text-neutral-400 line-clamp-3';
      excerpt.textContent = post.excerpt;

      top.append(meta, heading, excerpt);

      const footer = document.createElement('div');
      footer.className = 'pt-4 border-t border-white/10 flex items-center justify-between gap-4';

      const loc = document.createElement('span');
      loc.className = 'text-xs text-neutral-500';
      loc.textContent = post.location;

      const readBtn = document.createElement('button');
      readBtn.type = 'button';
      readBtn.className =
        'inline-flex items-center gap-1.5 min-h-[40px] text-xs font-medium text-neutral-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md cursor-pointer whitespace-nowrap';
      readBtn.innerHTML = `<span>Read Essay</span><svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>`;
      readBtn.addEventListener('click', () => openReader(post));

      footer.append(loc, readBtn);
      body.append(top, footer);
      card.append(mediaBtn, body);
      grid.appendChild(card);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeCategory = tab.getAttribute('data-blog-filter') || 'All';
      tabs.forEach((btn) => {
        const isSelected = btn === tab;
        btn.setAttribute('aria-selected', String(isSelected));
        btn.className = isSelected
          ? 'min-h-[40px] px-4 py-2 text-xs font-medium rounded-full bg-white text-neutral-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer'
          : 'min-h-[40px] px-4 py-2 text-xs font-medium rounded-full bg-white/8 text-neutral-300 hover:bg-white/14 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer';
      });
      renderFeed();
    });
  });

  renderFeed();

  return () => {
    document.removeEventListener('keydown', handleEscape);
  };
}
