(function () {
  document.addEventListener("DOMContentLoaded", function () {
 
    //слайдер этапов
    let currentSlideItem = 0;
    let slidesItem = Array.from(document.querySelectorAll('.item'));
    const pagination = document.querySelector('.pagination');
    const maxDots = 5;
    let isMerged = false;
    
    // Сохраняем исходное содержимое слайдов item1 и item4
    const originalContentItem1 = document.querySelector('.item1').innerHTML;
    const originalContentItem4 = document.querySelector('.item4').innerHTML;
    
    // Функция отображения слайда и активной точки пагинации
    function showSlide(index) {
      slidesItem.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    
      pagination.classList.add('slideItem');
    
      updatePagination();
      updateButtons();
    
      setTimeout(() => {
        pagination.classList.remove('slideItem');
      }, 300);
    }
    
    // Создаем точки пагинации
    function createPagination() {
      pagination.innerHTML = '';
    
      slidesItem.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
          currentSlideItem = index;
          showSlide(currentSlideItem);
        });
        pagination.appendChild(dot);
      });
    }
    
    // Обновляем активное состояние точки пагинации
    function updatePagination() {
      const dots = document.querySelectorAll('.dot');
      const visibleDots = Math.min(maxDots, slidesItem.length);
    
      dots.forEach((dot, index) => {
        dot.style.display = index < visibleDots ? 'block' : 'none';
        dot.classList.toggle('active', index === currentSlideItem);
      });
    }
    
    // Обновляем состояние кнопок "назад" и "вперед"
    function updateButtons() {
      const prevButton = document.querySelector('.prev-button');
      const nextButton = document.querySelector('.next-button');
    
      prevButton.disabled = currentSlideItem === 0;
      nextButton.disabled = currentSlideItem === slidesItem.length - 1;
    }
    
    function nextSlide() {
      currentSlideItem = (currentSlideItem + 1) % slidesItem.length;
      showSlide(currentSlideItem);
    }
    
    function prevSlide() {
      currentSlideItem = (currentSlideItem - 1 + slidesItem.length) % slidesItem.length;
      showSlide(currentSlideItem);
    }
    
    // Функция объединения элементов при ширине 400px
// Функция объединения элементов при ширине 400px
function mergeItems() {
  const item1 = document.querySelector('.item1');
  const item2 = document.querySelector('.item2');
  const item4 = document.querySelector('.item4');
  const item5 = document.querySelector('.item5');

  if (window.innerWidth <= 400 && !isMerged) {
    const content1 = item1.innerHTML;
    const content4 = item4.innerHTML;

    item1.innerHTML = content1 + item2.innerHTML; 
    item1.classList.add('merged')
    item2.style.display = 'none'; 

    item4.innerHTML = content4 + item5.innerHTML;
    item4.classList.add('merged')
    item5.style.display = 'none'; 

    isMerged = true;
  } else if (window.innerWidth > 400 && isMerged) {
    item1.innerHTML = originalContentItem1; 
    item2.style.display = ''; 
    item1.classList.remove('merged')

    
    item4.innerHTML = originalContentItem4; 
    item4.classList.remove('merged')
    item5.style.display = ''; 

    isMerged = false;
  }

  // Обновляем массив слайдов и создаем пагинацию заново
  slidesItem = Array.from(document.querySelectorAll('.item')).filter(item => item.style.display !== 'none');
  createPagination();
}

    
    // Добавляем обработчики событий для кнопок
    document.querySelector('.next-button').addEventListener('click', nextSlide);
    document.querySelector('.prev-button').addEventListener('click', prevSlide);
    
    createPagination();
    showSlide(currentSlideItem);
    mergeItems();
    
    window.addEventListener('resize', mergeItems);
    
  });
})();

