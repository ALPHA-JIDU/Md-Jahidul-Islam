import { INITIAL_BLOG_POSTS, GALLERY_PHOTOS } from './data.js';
import { bindImageShimmer, createFallbackTile } from './shimmer.js';

const STORAGE_KEY = 'jihad_sea_journal_posts_v1';

function loadPosts() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...INITIAL_BLOG_POSTS];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // Fallback to initial posts
  }
  return [...INITIAL_BLOG_POSTS];
}

function savePosts(posts) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Ignore storage quota errors
  }
}

export function renderBlogView(container) {
  container.innerHTML = `
    <div class="min-h-screen flex flex-col bg-[#080808] spa-view-active">
      <header class="border-b border-white/8 bg-[#080808]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
          <a
            href="index.html"
            data-spa-link="home"
            class="inline-flex items-center gap-2 min-h-[44px] text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md whitespace-nowrap shrink-0"
          >
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6l-6 6 6 6" />
            </svg>
            <span>Back to Home</span>
          </a>

          <button
            id="blog-compose-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="blog-composer-panel"
            class="inline-flex items-center gap-2 min-h-[40px] px-4 py-1.5 rounded-full border border-white/25 text-xs font-medium text-white hover:bg-white hover:text-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Share New Post</span>
          </button>
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

        <!-- Publish / Share New Post Composer Drawer -->
        <section
          id="blog-composer-panel"
          aria-label="Share a new blog post"
          class="hidden border-b border-white/8 bg-[#0b0b0b]"
        >
          <div class="max-w-3xl mx-auto px-6 sm:px-8 py-10">
            <div class="flex items-center justify-between gap-4 mb-6">
              <h2 class="font-serif text-2xl text-white">Publish a Journal Entry</h2>
              <button
                id="blog-composer-cancel"
                type="button"
                class="min-h-[40px] px-3 text-xs text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <form id="blog-composer-form" novalidate class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="post-title" class="block text-xs text-neutral-400 mb-1.5">Post Title</label>
                  <input
                    id="post-title"
                    name="title"
                    type="text"
                    placeholder="e.g. Anchoring Off Singapore at Dawn"
                    class="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#111111] border border-white/12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white"
                  />
                </div>

                <div>
                  <label for="post-category" class="block text-xs text-neutral-400 mb-1.5">Category</label>
                  <select
                    id="post-category"
                    name="category"
                    class="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#111111] border border-white/12 text-sm text-white focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <option value="Voyage Logs">Voyage Logs</option>
                    <option value="Photography">Photography</option>
                    <option value="Reflections">Reflections</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="post-location" class="block text-xs text-neutral-400 mb-1.5">Location or Coordinates</label>
                  <input
                    id="post-location"
                    name="location"
                    type="text"
                    placeholder="e.g. Bay of Bengal"
                    class="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#111111] border border-white/12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white"
                  />
                </div>

                <div>
                  <label for="post-cover" class="block text-xs text-neutral-400 mb-1.5">Cover Photograph</label>
                  <select
                    id="post-cover"
                    name="cover"
                    class="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#111111] border border-white/12 text-sm text-white focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white"
                  >
                    ${GALLERY_PHOTOS.map(
                      (photo, index) => `<option value="${index}">${photo.title}</option>`
                    ).join('')}
                  </select>
                </div>
              </div>

              <div>
                <label for="post-body" class="block text-xs text-neutral-400 mb-1.5">Story Content</label>
                <textarea
                  id="post-body"
                  name="body"
                  rows="5"
                  placeholder="Write your reflection or voyage story..."
                  class="w-full px-4 py-3 rounded-lg bg-[#111111] border border-white/12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white resize-y"
                ></textarea>
              </div>

              <p id="post-form-error" class="hidden text-xs text-red-400"></p>

              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  class="min-h-[44px] px-6 py-2.5 rounded-full bg-white text-neutral-950 text-xs sm:text-sm font-medium hover:bg-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>
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
                Copy Share Link
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;

  let posts = loadPosts();
  let activeCategory = 'All';
  let lastFocusedEl = null;

  const grid = container.querySelector('#blog-grid');
  const countEl = container.querySelector('#blog-count');
  const tabs = container.querySelectorAll('[data-blog-filter]');
  const composeToggle = container.querySelector('#blog-compose-toggle');
  const composePanel = container.querySelector('#blog-composer-panel');
  const composeCancel = container.querySelector('#blog-composer-cancel');
  const composeForm = container.querySelector('#blog-composer-form');
  const formError = container.querySelector('#post-form-error');

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
      readerCoverWrap.classList.remove('is-loaded');
      readerCover.src = post.coverSrc;
      readerCover.alt = post.coverAlt;
      bindImageShimmer(readerCover, readerCoverWrap);
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
    if (readerShare) readerShare.textContent = 'Copy Share Link';

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
        if (readerShare) readerShare.textContent = 'Copy Share Link';
      }, 1800);
    } catch {
      readerShare.textContent = 'Ready to Share';
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
      img.src = post.coverSrc;
      img.alt = post.coverAlt;
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.className = 'w-full h-full object-cover grayscale contrast-110 hover:scale-[1.03]';
      bindImageShimmer(img, mediaBtn, () => {
        img.replaceWith(createFallbackTile(post.title));
      });
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

  const setComposerOpen = (isOpen) => {
    composeToggle?.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      composePanel?.classList.remove('hidden');
      container.querySelector('#post-title')?.focus();
    } else {
      composePanel?.classList.add('hidden');
    }
  };

  composeToggle?.addEventListener('click', () => {
    const isCurrentlyOpen = composeToggle.getAttribute('aria-expanded') === 'true';
    setComposerOpen(!isCurrentlyOpen);
  });

  composeCancel?.addEventListener('click', () => setComposerOpen(false));

  composeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleVal = container.querySelector('#post-title')?.value.trim() || '';
    const catVal = container.querySelector('#post-category')?.value || 'Voyage Logs';
    const locVal = container.querySelector('#post-location')?.value.trim() || 'At Sea';
    const coverIdx = Number(container.querySelector('#post-cover')?.value || 0);
    const bodyVal = container.querySelector('#post-body')?.value.trim() || '';

    if (titleVal.length < 3 || bodyVal.length < 15) {
      if (formError) {
        formError.textContent = 'Please enter a title and at least a short paragraph for your post.';
        formError.classList.remove('hidden');
      }
      return;
    }

    formError?.classList.add('hidden');
    const coverPhoto = GALLERY_PHOTOS[coverIdx] || GALLERY_PHOTOS[0];
    const paragraphs = bodyVal
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const words = bodyVal.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(words / 180))} min read`;
    const nowLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const newPost = {
      id: `post-${Date.now()}`,
      title: titleVal,
      category: catVal,
      date: nowLabel,
      readTime,
      location: locVal,
      coverSrc: coverPhoto.src,
      coverAlt: coverPhoto.alt,
      excerpt: paragraphs[0].slice(0, 150) + (paragraphs[0].length > 150 ? '…' : ''),
      paragraphs,
    };

    posts = [newPost, ...posts];
    savePosts(posts);
    composeForm.reset();
    setComposerOpen(false);
    renderFeed();
  });

  renderFeed();

  return () => {
    document.removeEventListener('keydown', handleEscape);
  };
}
