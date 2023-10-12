let savedTheme = localStorage.getItem('theme');
let theme = null;

if(!savedTheme) {
	theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
else {
	theme = savedTheme;
}

$('body').setAttribute('data-theme', theme);

let $switch = $('.header__switch input[type=checkbox]');

if(theme === 'dark'){
	$switch.checked = true;

	switchPicturesTheme();
}

$switch.onchange = switchTheme;

$('.header__switch').addEventListener('keydown', function(e) {
	if(e.key === "Enter") {
		e.target.checked = !e.target.checked;
		switchTheme(e);
	}
});

function switchTheme(e) {
	theme = e.target.checked ? 'dark' : 'light';
	$('body').setAttribute('data-theme', theme);
	localStorage.setItem('theme', theme);

	switchPicturesTheme(theme);
}

function switchPicturesTheme(theme = 'dark') {
	if(document.documentElement.lang === "en") {
		$('.intro__demo picture source').setAttribute('srcset', `static/img/intro-usage-${theme}.webp`);
		$('.intro__demo img').setAttribute('src', `static/img/intro-usage-${theme}.png`);

		$$('.animation-send__message picture source').forEach((img, index) => {
			img.setAttribute('srcset', `static/img/animation/animation-send-message-${++index}-${theme}.webp`);
		});
		$$('.animation-send__message img').forEach((img, index) => {
			img.setAttribute('src', `static/img/animation/animation-send-message-${++index}-${theme}.png`);
		});
	}
	else {
		$('.intro__demo picture source').setAttribute('srcset', `../static/img/intro-usage-${theme}.webp`);
		$('.intro__demo img').setAttribute('src', `../static/img/intro-usage-${theme}.png`);

		$$('.animation-send__message picture source').forEach((img, index) => {
			img.setAttribute('srcset', `../static/img/animation/animation-send-message-${++index}-${theme}.webp`);
		});
		$$('.animation-send__message img').forEach((img, index) => {
			img.setAttribute('src', `../static/img/animation/animation-send-message-${++index}-${theme}.png`);
		});
	}
	

	$('.animation-send').classList.toggle('animation-send--dark');
}