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
