// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация всех функций
  initNavigation();
  initScrollAnimations();
  initReviewsSlider();
  initCurrentYear();
  initSmoothScrolling();
  initFormHandler();
});

// Функция для инициализации навигации
function initNavigation() {
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  
  // Обработчик скролла для изменения стиля хедера
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Обработчик клика по бургер-меню
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

// Функция для анимаций при скролле
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Создаем наблюдатель для анимаций при скролле
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Наблюдаем за каждым элементом
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Функция для слайдера отзывов
function initReviewsSlider() {
  const reviewsSlider = document.querySelector('.reviews-slider');
  const reviewItems = document.querySelectorAll('.review-item');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!reviewsSlider || reviewItems.length === 0) return;
  
  let currentSlide = 0;
  
  // Создаем точки для навигации
  reviewItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');
  
  // Функция для перехода к конкретному слайду
  function goToSlide(slideIndex) {
    reviewItems[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = slideIndex;
    
    reviewItems[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  // Функция для следующего слайда
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= reviewItems.length) nextIndex = 0;
    goToSlide(nextIndex);
  }
  
  // Функция для предыдущего слайда
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) prevIndex = reviewItems.length - 1;
    goToSlide(prevIndex);
  }
  
  // Обработчики для кнопок
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  // Автоматическая смена слайдов
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Останавливаем автосмену при наведении
  reviewsSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // Возобновляем автосмену при уходе курсора
  reviewsSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Инициализация первого слайда
  reviewItems[0].classList.add('active');
}

// Функция для установки текущего года в футере
function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Функция для плавной прокрутки
function initSmoothScrolling() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Функция для обработки формы
function initFormHandler() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Получаем данные формы
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      
      // В реальном приложении здесь был бы AJAX-запрос
      // Для демонстрации просто покажем сообщение
      
      // Создаем сообщение об успехе
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.innerHTML = `
        <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #c3e6cb;">
          <strong>Спасибо, ${name}!</strong> Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </div>
      `;
      
      // Очищаем форму
      this.reset();
      
      // Добавляем сообщение после формы
      this.parentNode.appendChild(successMessage);
      
      // Удаляем сообщение через 5 секунд
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
}

// Функция для прокрутки к разделу контактов (вызывается из кнопки в герое)
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = contactSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Дополнительная функция для ленивой загрузки изображений
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  }
}

// Инициализация ленивой загрузки при полной загрузке страницы
window.addEventListener('load', initLazyLoading);

// Обработчик для видео в герое (на случай ошибки)
document.addEventListener('DOMContentLoaded', function() {
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', function() {
      // Если видео не загрузилось, можно показать фоновое изображение
      const heroSection = document.querySelector('.hero');
      heroSection.style.backgroundImage = 'url("img/hero-backup.jpg")';
      heroSection.style.backgroundSize = 'cover';
      heroSection.style.backgroundPosition = 'center';
    });
  }
});
