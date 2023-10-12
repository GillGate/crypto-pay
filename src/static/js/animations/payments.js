const $$paymentsMessages = $$('.animation-payments__message');
let paymentsMessageIndex = 0;

const ANIM_PAYMENTS_TIME = 2500;

setInterval(() => {
	$$paymentsMessages[paymentsMessageIndex].classList.add('animation-payments__message--previous');
	$$paymentsMessages[paymentsMessageIndex].classList.remove('animation-payments__message--current');

	paymentsMessageIndex = paymentsMessageIndex >= $$paymentsMessages.length - 1 ? 0 : ++paymentsMessageIndex;

	$$paymentsMessages[paymentsMessageIndex].classList.add('animation-payments__message--current');
	$$paymentsMessages[paymentsMessageIndex].classList.remove('animation-payments__message--previous');
}, ANIM_PAYMENTS_TIME);