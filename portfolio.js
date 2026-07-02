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
 * Initializes modal gallery functionality for a given gallery selector with navigation support.
 * Includes error handling for missing elements and images.
 * @param {string} gallerySelector - CSS selector for the gallery container
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.modalSelector='#imgModal'] - Selector for the modal container
 * @param {string} [options.imgSelector='.modal-content'] - Selector for the modal image
 * @param {string} [options.captionSelector='.modal-caption'] - Selector for the modal caption
 * @param {string} [options.closeSelector='.modal-close'] - Selector for the close button
 * @param {string} [options.prevSelector='#modalPrev'] - Selector for the previous button
 * @param {string} [options.nextSelector='#modalNext'] - Selector for the next button
 * @param {string} [options.counterSelector='#modalCounter'] - Selector for the image counter
 * @param {boolean} [options.enableNavigation=false] - Enable navigation buttons and keyboard controls
 */
function initModalGallery(
    gallerySelector,
    options = {}
) {
    const {
        modalSelector = '#imgModal',
        imgSelector = '.modal-content',
        captionSelector = '.modal-caption',
        closeSelector = '.modal-close',
        prevSelector = '#modalPrev',
        nextSelector = '#modalNext',
        counterSelector = '#modalCounter',
        enableNavigation = false
    } = options;

    const gallery = document.querySelector(gallerySelector);
    const modal = document.querySelector(modalSelector);
    const modalImg = modal ? modal.querySelector(imgSelector) : null;
    const modalCaption = modal ? modal.querySelector(captionSelector) : null;
    const closeBtn = modal ? modal.querySelector(closeSelector) : null;
    const prevBtn = modal ? modal.querySelector(prevSelector) : null;
    const nextBtn = modal ? modal.querySelector(nextSelector) : null;
    const counter = modal ? modal.querySelector(counterSelector) : null;

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

    // Gallery state
    let currentIndex = 0;
    const galleryImages = Array.from(gallery.querySelectorAll('img'));
    
    // Update modal content based on current index
    function updateModalContent() {
        const currentImg = galleryImages[currentIndex];
        if (!currentImg || !currentImg.src) {
            console.error('Image source is missing at index:', currentIndex);
            return;
        }
        
        modalImg.src = currentImg.src;
        modalImg.alt = currentImg.alt || '';
        
        const h3 = currentImg.parentElement.querySelector('h3');
        modalCaption.textContent = h3 ? h3.textContent : (currentImg.alt || '');
        
        // Update counter if it exists
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
        }
        
        // Update navigation button states
        if (enableNavigation && prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === galleryImages.length - 1;
        }
    }
    
    // Navigation functions
    function navigatePrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateModalContent();
        }
    }
    
    function navigateNext() {
        if (currentIndex < galleryImages.length - 1) {
            currentIndex++;
            updateModalContent();
        }
    }

    // Attach click listeners to gallery images
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function () {
            if (!this.src) {
                alert('Image source is missing.');
                return;
            }
            currentIndex = index;
            modal.style.display = "block";
            updateModalContent();
        });
    });

    // Navigation button event listeners
    if (enableNavigation) {
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigatePrev();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateNext();
            });
        }
        
        // Keyboard navigation
        window.addEventListener('keydown', function(event) {
            if (modal.style.display === "block") {
                if (event.key === 'ArrowLeft') {
                    navigatePrev();
                } else if (event.key === 'ArrowRight') {
                    navigateNext();
                }
            }
        });
    }

    // Close modal on close button click
    closeBtn.onclick = function () {
        modal.style.display = "none";
        modalImg.src = '';
        modalCaption.textContent = '';
        if (counter) {
            counter.textContent = '';
        }
    };

    // Close modal when clicking outside the image
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalImg.src = '';
            modalCaption.textContent = '';
            if (counter) {
                counter.textContent = '';
            }
        }
    });

    // Close modal on ESC key
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
            modalImg.src = '';
            modalCaption.textContent = '';
            if (counter) {
                counter.textContent = '';
            }
        }
    });
}