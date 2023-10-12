let $$cryptoList = $$('.feature__crypto-item');
let cryptoActiveIndex = 0;

const ANIM_CRYPTO_TIME = 600;

setInterval(() => {
	$('.feature__crypto-item--active').classList.remove('feature__crypto-item--active');

	cryptoActiveIndex === $$cryptoList.length - 1 ? cryptoActiveIndex = 0 : ++cryptoActiveIndex;

	$$cryptoList[cryptoActiveIndex].classList.add('feature__crypto-item--active');
}, ANIM_CRYPTO_TIME);