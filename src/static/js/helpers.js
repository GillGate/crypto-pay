const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Request animation frame, async helper for animations instead of setTimeout
function raf(fn) {
	window.requestAnimationFrame(function() {
		window.requestAnimationFrame(function() {
			fn();
		})
	})
}

// For oprtimize scrolling event
function throttle(func, ms) {
	let isThrottled = false,
		savedArgs,
		savedThis;

	function wrapper() {
		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments);

		isThrottled = true;

		setTimeout(function() {
			isThrottled = false;
			
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}