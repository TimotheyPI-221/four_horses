(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const totalSlides = slides.length;
    const visibleSlides = 3;
    let currentIndex = visibleSlides;

    slides.slice(0, visibleSlides).forEach(slide => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });
    slides.slice(-visibleSlides).forEach(slide => {
      const clone = slide.cloneNode(true);
      track.insertBefore(clone, track.firstChild);
    });

    const allSlides = Array.from(document.querySelectorAll('.slide'));
    const allSlidesCount = allSlides.length;

    function updateSlider() {
      const slideWidth = allSlides[0].offsetWidth;
      const gap = parseInt(getComputedStyle(allSlides[0]).marginRight) || 0;
      const offset = -currentIndex * (slideWidth + gap);
      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translateX(${offset}px)`;
    
      document.querySelector('.players-count-1').textContent = ((currentIndex - visibleSlides) % totalSlides) + 1;
      document.getElementById('prev').disabled = (currentIndex === visibleSlides);
    }
     

    function jumpToRealSlide() {
      const slideWidth = allSlides[0].offsetWidth;
      const gap = parseInt(getComputedStyle(allSlides[0]).marginRight) || 0;

      if (currentIndex === allSlidesCount - visibleSlides) {
        currentIndex = visibleSlides;
        track.style.transition = "none";
        track.style.transform = `translateX(${-currentIndex * (slideWidth + gap)}px)`;
      } else if (currentIndex === 0) {
        currentIndex = totalSlides;
        track.style.transition = "none";
        track.style.transform = `translateX(${-currentIndex * (slideWidth + gap)}px)`;
      }
    }

    let sliderInterval = setInterval(autoSlide, 4000);

    function autoSlide() {
      currentIndex += 1;
      updateSlider();
      setTimeout(jumpToRealSlide, 500);
    }

    document.getElementById('prev').addEventListener('click', () => {
      clearInterval(sliderInterval);
      currentIndex -= 1;
      updateSlider();
      setTimeout(jumpToRealSlide, 500);
      resetSliderInterval();
    });

    document.getElementById('next').addEventListener('click', () => {
      clearInterval(sliderInterval);
      currentIndex += 1;
      updateSlider();
      setTimeout(jumpToRealSlide, 500);
      resetSliderInterval();
    });

    function resetSliderInterval() {
      sliderInterval = setInterval(autoSlide, 4000);
    }

    window.addEventListener('resize', updateSlider);
    updateSlider();
  });
})();

