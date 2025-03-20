//плавная прокрутка
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80, 
            behavior: 'smooth'
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    let currentIndex = 0;
    const totalSlides = slides.length / 2; // Учитываем дублирование слайдов
    let isTransitioning = false; // Флаг для предотвращения множественных переходов

    // Создаем индикаторы
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.indicator');

    // Функция для перехода к конкретному слайду
    function goToSlide(index) {
        if (isTransitioning) return; // Если уже происходит переход, выходим
        isTransitioning = true;

        currentIndex = index;
        updateSlider();

        // Сбрасываем флаг после завершения анимации
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Время должно совпадать с длительностью анимации в CSS
    }

    // Функция для обновления слайдера
    function updateSlider() {
        const offset = -currentIndex * (100 / 3); // 3 слайда видно одновременно
        slidesContainer.style.transform = `translateX(${offset}%)`;

        // Обновляем индикаторы
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    // Функция для перехода к следующему слайду
    function nextSlide() {
        if (isTransitioning) return; // Если уже происходит переход, выходим
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    // Автоматическая прокрутка
    setInterval(nextSlide, 3000);

    // Инициализация слайдера
    updateSlider();
});

