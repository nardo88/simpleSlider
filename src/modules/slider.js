const slider = () => {
    // получаем элементы

    // массив слайдов
    const slide = document.querySelectorAll('.portfolio-item'),
        // обертка для слайдов (в нашем случае - это список UL)
        slider = document.querySelector('.portfolio-content'),
        // wrapper для dots 
        portfolioDots = document.querySelector('.portfolio-dots');

    // добавление dot в слайдер
    for (let i = 0; i < slide.length; i++) {
        const dotItem = document.createElement('li');
        dotItem.classList.add('dot');
        portfolioDots.insertAdjacentElement('afterbegin', dotItem);
    };
    // только затем получаем все dot
    const dot = document.querySelectorAll('.dot');
    // и первому даем активный класс
    dot[0].classList.add('dot-active');
    // currentSlide - это индекс стекущего слайда или дота
    let currentSlide = 0,
        interval;
    // функция отключения предыдущего слайда
    const prevSlide = (elem, index, strClass) => {
        // т.е. у него убираем активный класс
        elem[index].classList.remove(strClass);
    };
    // функция отображения следующего слайда
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);

    };
    // функция переключения слайда слайдера
    const autoPlaySlide = () => {
        // убираем активный класс у предыдущего слайда и дота
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        // инкремент счетчика (индекса слайда)
        currentSlide++;
        // если cxxtnxbr достиг максимального значения приравниваем его к 0
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        };
        // добавляем активный класс следующему слайду и доту
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    };
    // автоматическое проигрывание слайдера
    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };
    // остановка автоматического проигрывания слайдера
    // нужно для наведения на доты или кнопки прокрутки
    const stopSlide = () => {
        clearInterval(interval);
    };

    // через делегирование управляем кликом по слайдеру
    slider.addEventListener('click', e => {
        e.preventDefault();
        // получаем таргер
        let target = e.target;
        // если таргер не дота или кнопка переключения слайдера то ничего не делаем
        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        };
        // отключаем класс у предыдущего слайда
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        // манипуляции с счетчиком в зависимости от того на что жмем и какое значение у счетчика
        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            // здесь обеспечиваем переключение сладов по нажатии на дты
            dot.forEach((item, i) => {
                if (item === target) {
                    currentSlide = i;
                };
            });
        };
        // если счетчик получил значение верхней граници слайдов
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        };
        // если счетчик ушел в минус
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;;
        };
        // активируем следующий слайд
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });
    // отключаем автоматическое проигрывание сладера при наведении доты или кнопки переключения слайдов
    slider.addEventListener('mouseover', e => {
        if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
            stopSlide();
        };
    });

    // включаем автоматическое проигрывание сладера при уводе курсора с доты или кнопки переключения слайдов
    slider.addEventListener('mouseout', e => {
        if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
            startSlide(1500);
        };
    });
    // запускаем автоматическое проигрывание
    startSlide(1500);
};

export default slider