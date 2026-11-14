import { HERO_MEDIA, HOME_QUOTES, GALLERY_PHOTOS } from './data.js';
import { bindImageShimmer, initExistingShimmers, createFallbackTile } from './shimmer.js';
import { initLightbox, openLightbox } from './lightbox.js';
import { renderQuotesView } from './quotesView.js';
import { renderGalleryView } from './galleryView.js';
import { renderBlogView } from './blogView.js';

const ROUTE_META = {
  home: {
    path: './index.html',
    title: 'Jahidul Islam Jihad — Mariner & Photographer',
  },
  quotes: {
    path: './quotes.html',
    title: 'Quotes — Jahidul Islam Jihad',
  },
  gallery: {
    path: './gallery.html',
    title: 'Gallery — Jahidul Islam Jihad',
  },
  blog: {
    path: './blog.html',
    title: 'Sea Journal & Blog — Jahidul Islam Jihad',
  },
};

function resolveRouteFromLocation() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/quotes.html') || path.endsWith('/quotes')) return 'quotes';
  if (path.endsWith('/gallery.html') || path.endsWith('/gallery')) return 'gallery';
  if (path.endsWith('/blog.html') || path.endsWith('/blog')) return 'blog';
  if (path.endsWith('/index.html')) return 'home';
  return document.body.getAttribute('data-route') || 'home';
}

function renderHomeView(container) {
  container.innerHTML = `
    <div class="min-h-screen flex flex-col bg-[#080808] spa-view-active">
      <main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
        <!-- HERO SECTION (Full-bleed monochrome matching desktop & mobile reference views) -->
        <section
          id="home"
          aria-label="Introduction"
          class="relative overflow-hidden bg-[#080808] min-h-[86svh] md:min-h-[600px] lg:min-h-[660px] flex flex-col justify-end md:justify-between border-b border-white/8"
        >
          <!-- Background Vessel Layer -->
          <div
            aria-hidden="true"
            class="img-shimmer hero-vessel-shimmer absolute inset-0 md:left-[34%] pointer-events-none select-none overflow-hidden"
          >
            <img
              data-hero-vessel
              src="${HERO_MEDIA.vesselBackdrop}"
              alt=""
              referrerPolicy="no-referrer"
              class="w-full h-full object-cover object-right grayscale contrast-125 translate-y-12 md:translate-y-0"
            />
            <div class="absolute inset-0 z-10 bg-gradient-to-r from-[#080808] via-[#080808]/55 to-transparent"></div>
            <div class="absolute inset-0 z-10 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60"></div>
          </div>

          <!-- Centered Portrait + Subtle Circular Orbital Ring -->
          <div
            aria-hidden="true"
            class="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
          >
            <div
              class="absolute top-[7%] md:top-[6%] left-1/2 -translate-x-1/2 w-[78vw] h-[78vw] max-w-[340px] max-h-[340px] md:w-[440px] md:h-[440px] md:max-w-none md:max-h-none lg:w-[510px] lg:h-[510px] rounded-full border border-white/14"
            ></div>

            <div class="img-shimmer relative w-full max-w-[440px] md:max-w-[480px] lg:max-w-[540px] h-[94%] md:h-[96%] flex items-end justify-center">
              <img
                data-hero-portrait
                src="${HERO_MEDIA.portrait}"
                alt="Monochrome portrait of Jahidul Islam Jihad"
                referrerPolicy="no-referrer"
                class="w-full h-full object-cover object-top grayscale contrast-115 hero-mobile-mask md:hero-portrait-mask"
              />
            </div>
          </div>

          <!-- Mobile Dark Contrast Scrim -->
          <div
            aria-hidden="true"
            class="md:hidden absolute inset-0 z-10 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-transparent pointer-events-none"
          ></div>

          <!-- Foreground Typography & Scroll Cue -->
          <div
            class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-7 md:pt-20 md:pb-12 flex-1 flex flex-col justify-end md:justify-between"
          >
            <div class="mt-auto md:my-auto max-w-md lg:max-w-lg">
              <p class="hidden md:block text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-400 mb-5">
                Hello, I&apos;m
              </p>

              <h1 class="font-serif font-normal text-[36px] sm:text-[42px] md:text-[54px] lg:text-[64px] leading-[1.03] tracking-tight text-white">
                Jahidul Islam
                <span
                  class="block italic font-normal text-[28px] sm:text-[32px] md:text-[54px] lg:text-[64px] uppercase md:normal-case tracking-[0.28em] md:tracking-tight text-neutral-100 mt-1 md:mt-0.5"
                >
                  Jihad
                </span>
              </h1>

              <div class="relative mt-4 md:mt-6 flex items-start">
                <span
                  aria-hidden="true"
                  class="absolute -left-6 md:-left-8 top-[11px] w-14 md:w-16 h-px bg-gradient-to-r from-white/40 via-white/25 to-transparent pointer-events-none"
                ></span>
                <p class="pl-1 md:pl-0 text-sm sm:text-[15px] md:text-base leading-relaxed text-neutral-300">
                  A Mariner by Profession,
                  <br />
                  A Photographer by Passion.
                </p>
              </div>
            </div>

            <div class="mt-10 md:mt-12 flex items-end justify-center md:justify-between gap-6 relative">
              <span
                aria-hidden="true"
                class="md:hidden absolute left-0 bottom-3 w-20 h-px bg-white/25"
              ></span>

              <a
                href="#quotes"
                aria-label="Scroll down to quotes and biography"
                class="inline-flex items-center gap-2.5 min-h-[44px] px-2 text-xs tracking-wide text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md group"
              >
                <span
                  aria-hidden="true"
                  class="inline-flex items-start justify-center w-4 h-6 rounded-full border border-neutral-400 group-hover:border-white p-1 transition-colors"
                >
                  <span class="w-0.5 h-1.5 rounded-full bg-neutral-200 transition-transform duration-200 group-hover:translate-y-0.5"></span>
                </span>
                <span>Scroll Down</span>
              </a>

              <div class="hidden md:flex flex-col items-end text-right">
                <p class="font-serif italic text-sm leading-relaxed text-neutral-300">
                  Sailing through life,
                  <br />
                  capturing its beauty...
                </p>
                <span aria-hidden="true" class="w-12 h-px bg-white/25 mt-3"></span>
              </div>
            </div>
          </div>
        </section>

        <!-- QUOTES, BIO & MARITIME STATS SECTION -->
        <section
          id="quotes"
          aria-label="Philosophy, biography, and maritime milestones"
          class="bg-[#080808] border-b border-white/8"
        >
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
              <!-- Column 1: Auto-Scrolling Quote Carousel -->
              <div id="quote-carousel" class="lg:col-span-4 lg:pr-10 flex flex-col justify-between">
                <div class="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    class="font-serif text-5xl leading-none text-neutral-500 select-none -mt-2"
                  >
                    &ldquo;
                  </span>
                  <blockquote
                    id="quote-text"
                    aria-live="polite"
                    class="quote-stage font-serif text-xl sm:text-2xl leading-snug text-neutral-100 whitespace-pre-line min-h-[5.5rem]"
                  >Dream big,
Capture more,
Live deeper.</blockquote>
                </div>

                <div class="mt-5 pl-8 flex items-center justify-between gap-4">
                  <div class="flex items-center gap-2">
                    <button
                      id="quote-prev"
                      type="button"
                      aria-label="Previous quote"
                      class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <span
                      id="quote-index"
                      class="text-xs font-medium tracking-widest tabular-nums text-neutral-400 px-1"
                    >
                      01 / 04
                    </span>

                    <button
                      id="quote-next"
                      type="button"
                      aria-label="Next quote"
                      class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6" />
                      </svg>
                    </button>

                    <a
                      href="quotes.html"
                      data-spa-link="quotes"
                      class="ml-1 text-xs text-neutral-400 hover:text-white underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm whitespace-nowrap"
                    >
                      All Quotes
                    </a>
                  </div>

                  <svg
                    viewBox="0 0 110 42"
                    class="w-20 h-8 text-neutral-300 shrink-0"
                    fill="none"
                    aria-label="Signed Jihad"
                    role="img"
                  >
                    <path
                      d="M14 26C21 15 28 7 32 7C34 7 25 32 19 36C14 39 9 35 13 29C17 23 30 18 37 19C35 24 34 27 36 27C39 27 44 21 47 16C48 14 45 26 49 26C53 26 59 16 64 11C66 9 61 25 65 25C68 25 73 20 77 19C74 22 74 25 77 25C81 25 88 18 93 15C90 21 89 26 93 25C97 24 102 20 105 18"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path d="M42 13L43 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>

              <!-- Column 2: Short Bio + Sea Journal Link -->
              <div class="lg:col-span-5 lg:px-10 lg:border-l lg:border-white/10 space-y-4">
                <p class="text-sm sm:text-[15px] leading-[1.75] text-neutral-400 max-w-prose">
                  I&apos;m a <strong class="font-semibold text-white">sailor at heart</strong>, a
                  photographer by passion, and a lifelong learner. Through my lens and words, I try to
                  find beauty in the ordinary, peace in the chaos, and meaning in every moment.
                </p>

                <div>
                  <a
                    href="blog.html"
                    data-spa-link="blog"
                    class="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-neutral-300 hover:text-white underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                  >
                    <span>Read Sea Journal &amp; Essays</span>
                    <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Column 3: Maritime & Photography Metrics -->
              <div class="lg:col-span-3 lg:pl-10 lg:border-l lg:border-white/10">
                <dl class="grid grid-cols-3 gap-4 sm:gap-6 text-center lg:text-left">
                  <div class="flex flex-col items-center lg:items-start">
                    <dt class="order-2 mt-1.5 text-[11px] sm:text-xs leading-snug text-neutral-400">
                      Countries<br />Visited
                    </dt>
                    <dd class="order-1 font-serif text-2xl sm:text-3xl font-normal tracking-tight tabular-nums text-white">
                      08+
                    </dd>
                  </div>
                  <div class="flex flex-col items-center lg:items-start">
                    <dt class="order-2 mt-1.5 text-[11px] sm:text-xs leading-snug text-neutral-400">
                      Moments<br />Captured
                    </dt>
                    <dd class="order-1 font-serif text-2xl sm:text-3xl font-normal tracking-tight tabular-nums text-white">
                      1K+
                    </dd>
                  </div>
                  <div class="flex flex-col items-center lg:items-start">
                    <dt class="order-2 mt-1.5 text-[11px] sm:text-xs leading-snug text-neutral-400">
                      Stories<br />To Tell
                    </dt>
                    <dd class="order-1 font-serif text-2xl sm:text-3xl font-normal tracking-tight tabular-nums text-white">
                      &infin;
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <!-- MY GALLERY SECTION -->
        <section
          id="gallery"
          aria-labelledby="gallery-heading"
          class="bg-[#080808] border-b border-white/8"
        >
          <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
            <div class="flex items-center justify-between gap-4 mb-8">
              <div class="flex items-center gap-4">
                <span aria-hidden="true" class="hidden sm:block w-8 h-px bg-neutral-500"></span>
                <h2
                  id="gallery-heading"
                  class="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white"
                >
                  My Gallery
                </h2>
              </div>

              <a
                href="gallery.html"
                data-spa-link="gallery"
                class="inline-flex items-center gap-2 min-h-[44px] px-2 text-xs sm:text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md whitespace-nowrap shrink-0"
              >
                <span class="md:hidden">See My World</span>
                <span class="hidden md:inline">Explore More</span>
                <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div
              id="mobile-gallery-strip"
              class="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar"
            ></div>

            <div id="desktop-bento-grid" class="hidden md:grid md:grid-cols-12 gap-3"></div>
          </div>
        </section>
      </main>

      <!-- LET'S CONNECT & FOOTER -->
      <footer id="contact" aria-labelledby="connect-heading" class="bg-[#080808]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-8 md:pt-16 md:pb-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div class="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2
                id="connect-heading"
                class="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white"
              >
                Let&apos;s Connect
              </h2>
              <p class="mt-2 text-sm text-neutral-400">Have a thought? Let&apos;s talk.</p>

              <div class="mt-6 flex items-center gap-2.5">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jahidul Islam Jihad on YouTube"
                  class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/12 text-neutral-300 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jahidul Islam Jihad on Instagram"
                  class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/12 text-neutral-300 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jahidul Islam Jihad on LinkedIn"
                  class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/12 text-neutral-300 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jahidul Islam Jihad on GitHub"
                  class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/12 text-neutral-300 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jahidul Islam Jihad on X"
                  class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/12 text-neutral-300 hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            <div class="lg:col-span-8">
              <div
                id="contact-success"
                role="status"
                aria-live="polite"
                class="hidden rounded-xl border border-white/15 bg-[#111111] p-6 sm:p-8 flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <p class="font-serif text-lg text-white">
                    Message received, <span id="contact-success-name"></span>.
                  </p>
                  <p class="text-sm text-neutral-400 mt-1">
                    Thank you for reaching out. I will respond as soon as the vessel reaches port.
                  </p>
                </div>
                <button
                  id="contact-reset"
                  type="button"
                  class="min-h-[44px] px-5 py-2 rounded-full border border-white/25 text-xs font-medium text-white hover:bg-white hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  Send Another
                </button>
              </div>

              <form id="contact-form" novalidate class="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                <div class="md:col-span-4 flex flex-col">
                  <label for="contact-name" class="sr-only">Your Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    placeholder="Your Name"
                    aria-describedby="contact-name-error"
                    class="w-full min-h-[46px] px-4 py-3 rounded-lg bg-[#111111] border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white transition-colors"
                  />
                  <p id="contact-name-error" class="hidden mt-1.5 text-xs text-red-400"></p>
                </div>

                <div class="md:col-span-5 flex flex-col">
                  <label for="contact-email" class="sr-only">Your Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="Your Email"
                    aria-describedby="contact-email-error"
                    class="w-full min-h-[46px] px-4 py-3 rounded-lg bg-[#111111] border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white transition-colors"
                  />
                  <p id="contact-email-error" class="hidden mt-1.5 text-xs text-red-400"></p>
                </div>

                <div class="hidden md:block md:col-span-3" aria-hidden="true"></div>

                <div class="md:col-span-9 flex flex-col">
                  <label for="contact-message" class="sr-only">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="3"
                    placeholder="Your Message"
                    aria-describedby="contact-message-error"
                    class="w-full px-4 py-3 rounded-lg bg-[#111111] border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white transition-colors resize-none"
                  ></textarea>
                  <p id="contact-message-error" class="hidden mt-1.5 text-xs text-red-400"></p>
                </div>

                <div class="md:col-span-3 flex items-end justify-end">
                  <button
                    type="submit"
                    class="w-full md:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 py-2.5 rounded-full border border-white/30 bg-transparent text-xs sm:text-sm font-medium text-white hover:bg-white hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                  >
                    <span>Send Message</span>
                    <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>&copy; 2026 Jahidul Islam Jihad. All rights reserved.</p>
            <div class="flex flex-wrap items-center justify-center gap-4">
              <a
                href="blog.html"
                data-spa-link="blog"
                class="text-neutral-300 hover:text-white underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
              >
                Sea Journal
              </a>
              <span aria-hidden="true">&middot;</span>
              <p class="inline-flex items-center gap-2">
                <span>Designed with passion</span>
                <span aria-hidden="true">&middot;</span>
                <span>Inspired by the sea</span>
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 12c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 4.5-2 5-1.5M2 17c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 4.5-2 5-1.5" />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Initialize shimmer on Hero images
  initExistingShimmers(container);

  // Initialize Auto-Scrolling Quotes
  const quoteCarousel = container.querySelector('#quote-carousel');
  const quoteEl = container.querySelector('#quote-text');
  const indexEl = container.querySelector('#quote-index');
  const prevBtn = container.querySelector('#quote-prev');
  const nextBtn = container.querySelector('#quote-next');

  let currentIndex = 0;
  let timerId = null;
  let isPaused = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderQuote(nextIdx) {
    currentIndex = (nextIdx + HOME_QUOTES.length) % HOME_QUOTES.length;
    const item = HOME_QUOTES[currentIndex];
    if (!quoteEl || !indexEl) return;

    if (prefersReducedMotion) {
      quoteEl.textContent = item.text;
      indexEl.textContent = item.indexLabel;
      return;
    }

    quoteEl.classList.add('is-fading');
    window.setTimeout(() => {
      quoteEl.textContent = item.text;
      indexEl.textContent = item.indexLabel;
      quoteEl.classList.remove('is-fading');
    }, 240);
  }

  function startAutoScroll() {
    if (timerId !== null) window.clearInterval(timerId);
    if (prefersReducedMotion) return;
    timerId = window.setInterval(() => {
      if (!isPaused) renderQuote(currentIndex + 1);
    }, 4500);
  }

  prevBtn?.addEventListener('click', () => {
    renderQuote(currentIndex - 1);
    startAutoScroll();
  });
  nextBtn?.addEventListener('click', () => {
    renderQuote(currentIndex + 1);
    startAutoScroll();
  });
  quoteCarousel?.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  quoteCarousel?.addEventListener('mouseleave', () => {
    isPaused = false;
  });
  quoteCarousel?.addEventListener('focusin', () => {
    isPaused = true;
  });
  quoteCarousel?.addEventListener('focusout', () => {
    isPaused = false;
  });

  startAutoScroll();

  // Initialize Home Bento & Mobile Strip with Shimmer
  function createTile(photo, idx, extraClasses) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `img-shimmer group relative overflow-hidden rounded-xl border border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] cursor-pointer ${extraClasses}`;
    button.setAttribute('aria-label', `View photograph: ${photo.title} (${photo.category})`);

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.className = 'w-full h-full object-cover grayscale contrast-110 group-hover:scale-[1.04]';

    bindImageShimmer(img, button, () => {
      img.replaceWith(createFallbackTile(photo.title));
    });

    const scrim = document.createElement('div');
    scrim.setAttribute('aria-hidden', 'true');
    scrim.className =
      'absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3.5';

    const title = document.createElement('p');
    title.className = 'font-serif text-sm text-white leading-snug';
    title.textContent = photo.title;

    const meta = document.createElement('p');
    meta.className = 'text-[11px] text-neutral-300 mt-0.5';
    meta.textContent = `${photo.location} · ${photo.year}`;

    scrim.append(title, meta);
    button.append(img, scrim);
    button.addEventListener('click', () => openLightbox(GALLERY_PHOTOS, idx));
    return button;
  }

  const mobileTrack = container.querySelector('#mobile-gallery-strip');
  const desktopBento = container.querySelector('#desktop-bento-grid');

  if (mobileTrack) {
    GALLERY_PHOTOS.forEach((photo, idx) => {
      mobileTrack.appendChild(
        createTile(photo, idx, 'snap-start shrink-0 w-[42vw] min-w-[148px] max-w-[200px] aspect-[4/3]')
      );
    });
  }

  if (desktopBento) {
    const leadIdx = GALLERY_PHOTOS.findIndex((p) => p.bentoSlot === 'lead');
    if (leadIdx !== -1) {
      desktopBento.appendChild(
        createTile(GALLERY_PHOTOS[leadIdx], leadIdx, 'md:col-span-5 h-[320px] lg:h-[372px]')
      );
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.className = 'md:col-span-7 grid grid-rows-2 gap-3 h-[320px] lg:h-[372px]';

    const topRow = document.createElement('div');
    topRow.className = 'grid grid-cols-12 gap-3';
    const topSpans = ['col-span-3', 'col-span-4', 'col-span-2', 'col-span-3'];
    let topCount = 0;

    const bottomRow = document.createElement('div');
    bottomRow.className = 'grid grid-cols-12 gap-3';
    const bottomSpans = ['col-span-3', 'col-span-3', 'col-span-6'];
    let bottomCount = 0;

    GALLERY_PHOTOS.forEach((photo, idx) => {
      if (photo.bentoSlot.startsWith('top-')) {
        const span = topSpans[topCount] || 'col-span-3';
        topCount += 1;
        topRow.appendChild(createTile(photo, idx, `${span} h-full`));
      } else if (photo.bentoSlot.startsWith('bottom-')) {
        const span = bottomSpans[bottomCount] || 'col-span-4';
        bottomCount += 1;
        bottomRow.appendChild(createTile(photo, idx, `${span} h-full`));
      }
    });

    rightWrapper.append(topRow, bottomRow);
    desktopBento.appendChild(rightWrapper);
  }

  // Contact Form Validation
  const form = container.querySelector('#contact-form');
  const statusBanner = container.querySelector('#contact-success');
  const statusNameEl = container.querySelector('#contact-success-name');
  const resetBtn = container.querySelector('#contact-reset');
  const nameInput = container.querySelector('#contact-name');
  const emailInput = container.querySelector('#contact-email');
  const messageInput = container.querySelector('#contact-message');
  const nameError = container.querySelector('#contact-name-error');
  const emailError = container.querySelector('#contact-email-error');
  const messageError = container.querySelector('#contact-message-error');

  function setError(input, errorEl, msg) {
    if (!input || !errorEl) return;
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    } else {
      input.removeAttribute('aria-invalid');
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
  }

  [
    [nameInput, nameError],
    [emailInput, emailError],
    [messageInput, messageError],
  ].forEach(([input, errorEl]) => {
    input?.addEventListener('input', () => setError(input, errorEl, ''));
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = nameInput?.value.trim() || '';
    const emailVal = emailInput?.value.trim() || '';
    const messageVal = messageInput?.value.trim() || '';

    let hasError = false;
    if (!nameVal) {
      setError(nameInput, nameError, 'Please enter your name.');
      hasError = true;
    }
    if (!emailVal) {
      setError(emailInput, emailError, 'Please enter your email address.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      hasError = true;
    }
    if (messageVal.length < 5) {
      setError(messageInput, messageError, 'Please write a brief message (at least 5 characters).');
      hasError = true;
    }
    if (hasError) return;

    if (statusNameEl) statusNameEl.textContent = nameVal;
    form.classList.add('hidden');
    statusBanner?.classList.remove('hidden');
    statusBanner?.classList.add('flex');
    form.reset();
  });

  resetBtn?.addEventListener('click', () => {
    statusBanner?.classList.add('hidden');
    statusBanner?.classList.remove('flex');
    form?.classList.remove('hidden');
    nameInput?.focus();
  });

  return () => {
    if (timerId !== null) window.clearInterval(timerId);
  };
}

let currentCleanup = null;

function mountRoute(route, { pushHistory = false, scrollTop = true } = {}) {
  const root = document.getElementById('spa-root');
  if (!root) return;

  if (typeof currentCleanup === 'function') {
    currentCleanup();
    currentCleanup = null;
  }

  const meta = ROUTE_META[route] || ROUTE_META.home;
  document.title = meta.title;

  if (pushHistory) {
    window.history.pushState({ route }, '', meta.path);
  }

  if (route === 'quotes') {
    currentCleanup = renderQuotesView(root) || null;
  } else if (route === 'gallery') {
    currentCleanup = renderGalleryView(root) || null;
  } else if (route === 'blog') {
    currentCleanup = renderBlogView(root) || null;
  } else {
    currentCleanup = renderHomeView(root) || null;
  }

  if (scrollTop) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();

  const initialRoute = resolveRouteFromLocation();
  window.history.replaceState({ route: initialRoute }, '', window.location.pathname + window.location.hash);
  mountRoute(initialRoute, { pushHistory: false, scrollTop: false });

  // Intercept internal SPA navigation clicks with zero hard reload
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    const link = e.target.closest('a[data-spa-link]');
    if (!link) return;

    const targetRoute = link.getAttribute('data-spa-link');
    if (!targetRoute || !ROUTE_META[targetRoute]) return;

    e.preventDefault();
    mountRoute(targetRoute, { pushHistory: true, scrollTop: true });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  });

  window.addEventListener('popstate', (e) => {
    const nextRoute = e.state?.route || resolveRouteFromLocation();
    mountRoute(nextRoute, { pushHistory: false, scrollTop: true });
  });
});
