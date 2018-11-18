'use strict';

const SLIDE_INTERVAL_MS = 5000;

function sliderLoader() {
    // work with DOM
    // wrappers
    const sliderWrapper = document.querySelector('.js-slider-wrapper');
    const sliderDotContainer = document.querySelector('.js-slider-dots');
    // buttons
    const buttonPrev = document.querySelector('.js-btn-prev');
    const buttonNext = document.querySelector('.js-btn-next');

    // work with index
    let currentIndex = 0;
    const setPrevIndex = () => {
        if (currentIndex - 1 < 0) {
            currentIndex = sliderDotContainer.children.length - 1;
        }
        currentIndex -= 1;
    };
    const setNextIndex = () => {
        if (currentIndex + 1 > sliderDotContainer.children.length - 1) {
            currentIndex = 0;
        }
        currentIndex += 1;
    };

    const updateSlider = () => {
        // stop slide show
        clearInterval(slideInterval);

        // clear current active slide and dot
        const slideActive = document.querySelector('.slider__item--active');
        const sliderDotActive = document.querySelector('.slider__dot--active');
        slideActive.classList.remove('slider__item--active');
        sliderDotActive.classList.remove('slider__dot--active');

        // set current active slide and dot
        sliderWrapper.children[currentIndex].classList.add('slider__item--active');
        sliderDotContainer.children[currentIndex].classList.add('slider__dot--active');

        // continue slide show
        slideInterval = setInterval(setNextSlide, SLIDE_INTERVAL_MS);
    };

    const setNextSlide = () => {
        setNextIndex();
        updateSlider();
    };

    // set event handlers
    buttonPrev.onclick  = () => {
        setPrevIndex();
        updateSlider();
    };

    buttonNext.onclick = setNextSlide;

    for (let i = 0; i < sliderDotContainer.children.length; i++) {
        sliderDotContainer.children[i].onclick = () => {
            currentIndex = i;
            updateSlider();
        }
    }

    // entry point, start slide show
    let slideInterval = setInterval(setNextSlide, SLIDE_INTERVAL_MS);
}

document.addEventListener('DOMContentLoaded', sliderLoader);