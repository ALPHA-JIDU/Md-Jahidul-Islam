export function bindImageShimmer(img, wrapper, onFallback) {
  if (!img || !wrapper) return;

  wrapper.classList.add('img-shimmer');
  wrapper.classList.remove('is-loaded');

  const markLoaded = () => {
    wrapper.classList.add('is-loaded');
  };

  const handleError = () => {
    wrapper.classList.add('is-loaded');
    if (typeof onFallback === 'function') {
      onFallback();
    }
  };

  if (img.complete) {
    if (img.naturalWidth > 0) {
      requestAnimationFrame(markLoaded);
    } else {
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', handleError, { once: true });
    }
  } else {
    img.addEventListener('load', markLoaded, { once: true });
    img.addEventListener('error', handleError, { once: true });
  }
}

export function initExistingShimmers(root = document) {
  const wrappers = root.querySelectorAll('.img-shimmer');
  wrappers.forEach((wrapper) => {
    const img = wrapper.querySelector('img');
    if (img) {
      bindImageShimmer(img, wrapper);
    }
  });
}

export function createFallbackTile(titleText) {
  const box = document.createElement('div');
  box.className =
    'w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-800 to-neutral-950 text-neutral-400 text-center';
  box.innerHTML = `<svg viewBox="0 0 24 24" class="w-6 h-6 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
  const label = document.createElement('span');
  label.className = 'text-xs font-medium';
  label.textContent = titleText;
  box.appendChild(label);
  return box;
}
