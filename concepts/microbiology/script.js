const device = (screen, cls = '') => `<div class="device ${cls}"><img class="screen" src="assets/${screen}.png" alt="Flashcard Microbiology ${screen === 'home' ? 'home screen with Quizzes and Directory' : screen === 'topics' ? 'quiz topics and study completion indicators' : screen === 'quiz' ? 'multiple-answer composition quiz' : screen === 'directory' ? 'searchable organism directory' : 'cell wall reference details'}" width="1206" height="2622"><img class="bezel" src="assets/silver-device.png" alt="" width="1350" height="2760"></div>`;
const heroes = {
 gallery: `<section class="hero gallery-hero"><p class="eyebrow">FLASHCARD MICROBIOLOGY</p><h1>Small organisms.<br><span>Big understanding.</span></h1><p class="hero-sub">Your microbiology study companion.<br>Explore. Practice. Remember.</p><a class="primary" href="#download">Discover the app <span>↗</span></a><div class="gallery-stage">${device('topics','side left')}${device('home','center')}${device('directory','side right')}</div><p class="hero-caption">Made for iPhone, iPad, and Mac.</p></section>`,
 field: `<section class="hero field-hero"><div class="field-copy"><p class="eyebrow">YOUR POCKET FIELD GUIDE</p><h1>A world of<br>small things.<br><span>Made clearer.</span></h1><p class="hero-sub">Explore microbiology.<br>Build knowledge, one quiz at a time.</p><a class="primary" href="#download">Discover the app <span>↗</span></a><p class="hero-caption">iOS · iPadOS · macOS</p></div><div class="field-stage"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><span class="field-label">EXPLORE / PRACTICE / REMEMBER</span>${device('home','main-phone')}${device('quiz','secondary-phone')}</div></section>`,
 night: `<section class="hero night-hero"><div class="night-copy"><p class="eyebrow">FLASHCARD MICROBIOLOGY</p><h1>Bring your<br>knowledge<br><span>into focus.</span></h1><p class="hero-sub">A quieter space to explore organisms<br>and put your learning to the test.</p><a class="primary" href="#download">Discover the app <span>↗</span></a><p class="hero-caption">For iPhone, iPad, and Mac.</p></div><div class="night-stage"><div class="spotlight"></div>${device('directory','night-back')}${device('quiz','night-front')}<span class="night-label">BUILT FOR YOUR NEXT STUDY SESSION.</span></div></section>`
};
function selectStyle(style, updateUrl = true) {
 if (!heroes[style]) style = 'field';
 document.body.dataset.theme = style;
 document.getElementById('hero').innerHTML = heroes[style];
 document.querySelectorAll('[data-style]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.style === style)));
 if (updateUrl) history.replaceState(null, '', `?style=${style}`);
}
document.querySelectorAll('[data-screen]').forEach(el => el.innerHTML = device(el.dataset.screen));
document.querySelectorAll('[data-style]').forEach(button => button.addEventListener('click', () => { selectStyle(button.dataset.style); window.scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); }));
selectStyle(new URLSearchParams(location.search).get('style') || 'field', false);
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: .08});
 document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
}
