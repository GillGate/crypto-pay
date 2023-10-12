const $$sendMessages = $$('.animation-send__message');
let sendMessageIndex = 0;

const ANIM_SEND_TIME = 2500;

setInterval(() => {
	$$sendMessages[sendMessageIndex].classList.add('animation-send__message--previous');
	$$sendMessages[sendMessageIndex].classList.remove('animation-send__message--current');

	sendMessageIndex = sendMessageIndex >= $$sendMessages.length - 1 ? 0 : ++sendMessageIndex;

	$$sendMessages[sendMessageIndex].classList.add('animation-send__message--current');
	$$sendMessages[sendMessageIndex].classList.remove('animation-send__message--previous');
}, ANIM_SEND_TIME);