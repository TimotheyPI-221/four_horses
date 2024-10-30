(function () {
  document.addEventListener("DOMContentLoaded", function () {
    function onEntry(entry) {
      entry.forEach(change => {
        change.target.classList.add('element-show');
        if (change.isIntersecting) {
          if (window.innerWidth <= 800) {
            observer.unobserve(change.target);
          }
        } else {
          change.target.classList.remove('element-show');  
        }
      });
    }

    let options = {
      threshold: [0.2] // 20% элемента должно быть видно для срабатывания
    };

    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.element-animation');

    for (let elm of elements) {
      observer.observe(elm);
    }
  });
})();
