const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.style.opacity = 1;
            }, delay * 1000);
        }
    });
});

document.querySelectorAll('[data-effect]').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const headerOffset = 80; // Your navbar height
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
/**
 * Initializes modal gallery functionality for a given gallery selector.
 * error handling for missing elements and images.
 * @param {string} gallerySelector - CSS selector for the gallery container
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.modalSelector='#imgModal'] - Selector for the modal container
 * @param {string} [options.imgSelector='.modal-content'] - Selector for the modal image
 * @param {string} [options.captionSelector='.modal-caption'] - Selector for the modal caption
 * @param {string} [options.closeSelector='.modal-close'] - Selector for the close button
 */
function initModalGallery(
    gallerySelector,
    options = {}
) {
    const {
        modalSelector = '#imgModal',
        imgSelector = '.modal-content',
        captionSelector = '.modal-caption',
        closeSelector = '.modal-close'
    } = options;

    const gallery = document.querySelector(gallerySelector);
    const modal = document.querySelector(modalSelector);
    const modalImg = modal ? modal.querySelector(imgSelector) : null;
    const modalCaption = modal ? modal.querySelector(captionSelector) : null;
    const closeBtn = modal ? modal.querySelector(closeSelector) : null;

    if (!gallery) {
        console.error(`Gallery element not found for selector: ${gallerySelector}`);
        return;
    }
    if (!modal) {
        console.error(`Modal element not found for selector: ${modalSelector}`);
        return;
    }
    if (!modalImg) {
        console.error(`Modal image element not found for selector: ${imgSelector}`);
        return;
    }
    if (!modalCaption) {
        console.error(`Modal caption element not found for selector: ${captionSelector}`);
        return;
    }
    if (!closeBtn) {
        console.error(`Modal close button not found for selector: ${closeSelector}`);
        return;
    }

    // Attach click listeners to gallery images
    gallery.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', function () {
            if (!this.src) {
                alert('Image source is missing.');
                return;
            }
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt || '';
            const h3 = this.parentElement.querySelector('h3');
            modalCaption.textContent = h3 ? h3.textContent : (this.alt || '');
        });
    });

    // Close modal on close button click
    closeBtn.onclick = function () {
        modal.style.display = "none";
        modalImg.src = '';
        modalCaption.textContent = '';
    };

    // Close modal when clicking outside the image
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalImg.src = '';
            modalCaption.textContent = '';
        }
    });

    // Optional: Close modal on ESC key
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
            modalImg.src = '';
            modalCaption.textContent = '';
        }
    });
}