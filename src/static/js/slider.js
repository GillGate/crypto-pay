let $slider = $('.slider');
let sliderDisabled = false;
let sliderScrollIntervalActivated = false;

const SLIDER_AUTOPLAY_TIME = 4000;
const SLIDER_TIMEOUT_AUTOPLAY_TIME = 3000;
const SLIDER_THROTTLE_TIME = 250;

const sliderTimeout = () => {
	sliderDisabled = false;
	clearTimeout(sliderTimeout);
};

let sliderAutoplayInterval = null;

function changeSlide(index) {
	sliderDisabled = true;

	let $currentDot = $('.slider__nav-dot--current');
	$currentDot.classList.remove('slider__nav-dot--current');
	$currentDot.disabled = false;

	let $nextDot = $(`.slider__nav-dot[data-slider-dot="${index}"]`);
	$nextDot.classList.add('slider__nav-dot--current');
	$nextDot.disabled = true;

	$('.slider__nav-order--current').innerHTML = index < 10 ? `0${index}` : index;

	let $currentSlide = $('.slider__item--current');
	let $nextSlide = $(`.slider__item[data-slider-order="${index}"]`);

	$currentSlide.classList.remove('slider__item--current-enter');

	const handler = function() {
		$currentSlide.classList.remove('slider__item--current');
		$nextSlide.classList.add('slider__item--current');

		raf(() => {
			$nextSlide.classList.add('slider__item--current-enter');
			setTimeout(sliderTimeout, 500); // working with css transition property
		});

		$currentSlide.removeEventListener('transitionend', handler);
	}

	$currentSlide.addEventListener('transitionend', handler);
}

function sliderAutoplay() {
	let currentIndex = $('.slider__item--current').dataset.sliderOrder;

	if(currentIndex >= $$('.slider__item').length) {
		currentIndex = 0;
	}

	changeSlide(++currentIndex);
}

$('.slider__nav-dots').addEventListener('click', function(e) {
	if(e.target.classList.contains('slider__nav-dot') && !sliderDisabled) {
		let goToSlide = e.target.dataset.sliderDot ?? 1;
		changeSlide(goToSlide);

		clearInterval(sliderAutoplayInterval);
		setTimeout(() => {
			sliderAutoplayInterval = setInterval(sliderAutoplay, SLIDER_AUTOPLAY_TIME);
		}, SLIDER_TIMEOUT_AUTOPLAY_TIME);
	}
});

let toggleActiveSlider = (e) => {
	let sliderPosition = $slider.getBoundingClientRect();

	if(sliderPosition.top < 260 && !sliderScrollIntervalActivated) {
		sliderScrollIntervalActivated = true;
		sliderAutoplayInterval = setInterval(sliderAutoplay, SLIDER_AUTOPLAY_TIME);
	}

	if(sliderPosition.height * -1 > sliderPosition.top) {
		sliderScrollIntervalActivated = false;
		clearInterval(sliderAutoplayInterval);
	}
}  

toggleActiveSlider = throttle(toggleActiveSlider, SLIDER_THROTTLE_TIME);

window.addEventListener('scroll', toggleActiveSlider);