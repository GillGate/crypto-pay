let $$statsSpan = $$('.animation-stats__info span');

const ANIM_STATS_TIME = 2000;

const statsTimeLang = {
	en: ['all time:', 'today:', 'yesterday:'],
	ru: ['всё время:', 'сегодня:', 'вчера:']
}

const statsLang = document.body.dataset.lang ?? 'en';

const stats = {
	time: [
		statsTimeLang[statsLang][0], 
		statsTimeLang[statsLang][1], 
		statsTimeLang[statsLang][2],
	],
	volume: ['$204,920', '$6,530', '$8,216'],
	invoices: ['16,256', '2,569', '4,980'],
	payments: ['9,353', '1,253', '3,012'],
	users: ['5,606', '1,606', '3,606'],
	conversion: ['57%', '48%', '60%'],
}

let statTimeIndex = 1;

setInterval(() => {
	if(statTimeIndex >= stats.time.length) {
		statTimeIndex = 0;
	}

	$$statsSpan.forEach(span => span.classList.remove('toggle-stats'));

	setTimeout(switchStats, 400); // working with css transition duration

	let lastStatTimeIndex = statTimeIndex === 0 ? stats.time.length - 1 : statTimeIndex - 1;

	$(`.animation-stats__control[data-stats-btn-order="${lastStatTimeIndex}"`).classList
		.remove('animation-stats__control--current');

	$(`.animation-stats__control[data-stats-btn-order="${statTimeIndex}"`).classList
		.add('animation-stats__control--current');
}, ANIM_STATS_TIME);

function switchStats() {
	for(let stat in stats) {
		$(`span[data-stats-${stat}]`).innerHTML = stats[stat][statTimeIndex]
	}

	$$statsSpan.forEach(span => span.classList.add('toggle-stats'));

	++statTimeIndex;
}