const ANIM_SWAP_TIME = 1500;

setInterval(() => {
	let $firstToken = $('.animation-swap__item--first');
	let $secondToken = $('.animation-swap__item--second');
	let $thirdToken = $('.animation-swap__item--third');

	$firstToken.classList.remove('animation-swap__item--first');
	$firstToken.classList.add('animation-swap__item--third');

	$secondToken.classList.remove('animation-swap__item--second');
	$secondToken.classList.add('animation-swap__item--first');

	$thirdToken.classList.remove('animation-swap__item--third');
	$thirdToken.classList.add('animation-swap__item--second');
}, ANIM_SWAP_TIME);