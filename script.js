const storageKey = 'daymark-tasks';
let tasks = [];
let currentFilter = 'all';

const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const taskPriority = document.querySelector('#taskPriority');
const taskList = document.querySelector('#taskList');
const emptyState = document.querySelector('#emptyState');
const emptyTitle = document.querySelector('#emptyTitle');
const emptyDescription = document.querySelector('#emptyDescription');
const clearCompleted = document.querySelector('#clearCompleted');
const toast = document.querySelector('#toast');
const countPopup = document.querySelector('#countPopup');
const searchInput = document.querySelector('#searchInput');
const clearSearch = document.querySelector('#clearSearch');
const priorityFilter = document.querySelector('#priorityFilter');
const themeToggle = document.querySelector('#themeToggle');
const themeIcon = document.querySelector('#themeIcon');
const menuToggle = document.querySelector('#menuToggle');
const closeMenu = document.querySelector('#closeMenu');
const sideMenu = document.querySelector('#sideMenu');
const menuBackdrop = document.querySelector('#menuBackdrop');
const profileButton = document.querySelector('#profileButton');
const profileInitial = document.querySelector('#profileInitial');
const accountSummary = document.querySelector('#accountSummary');
const menuAuthButton = document.querySelector('#menuAuthButton');
const authBackdrop = document.querySelector('#authBackdrop');
const closeAuth = document.querySelector('#closeAuth');
const authForm = document.querySelector('#authForm');
const authName = document.querySelector('#authName');
const authNameLabel = document.querySelector('#authNameLabel');
const authEmail = document.querySelector('#authEmail');
const authPassword = document.querySelector('#authPassword');
const authError = document.querySelector('#authError');
const authTitle = document.querySelector('#authTitle');
const authSubtitle = document.querySelector('#authSubtitle');
const authSubmit = document.querySelector('#authSubmit');
const googleButton = document.querySelector('#googleButton');
const signInTab = document.querySelector('#signInTab');
const signUpTab = document.querySelector('#signUpTab');
const themeChoices = document.querySelectorAll('.theme-choice');
const wallpaperChoices = document.querySelectorAll('.wallpaper-choice');
const menuLinks = document.querySelectorAll('.menu-link');
const avatarChoices = document.querySelectorAll('.avatar-choice');
const languageSelect = document.querySelector('#languageSelect');
const nightReadingToggle = document.querySelector('#nightReadingToggle');
const celebrationBackdrop = document.querySelector('#celebrationBackdrop');
const closeCelebration = document.querySelector('#closeCelebration');
let deletedTask = null;
let toastTimer;
let countPopupTimer;
let authMode = 'signin';
let weekOffset = 0;
let monthOffset = 0;
let hasRendered = false;
const wallpapers = {
	sage: ['#f7faf6', '#d6eee2', '#182b27', '#31584b'], sky: ['#f4f9fb', '#dcecf4', '#182832', '#315666'], lavender: ['#faf8fc', '#e8e1f2', '#272333', '#51446c'],
	peach: ['#fff8f4', '#f7dfd2', '#30221f', '#67463d'], lemon: ['#fffdf2', '#f5edc8', '#302e1d', '#625d35'], rose: ['#fff8fa', '#f2dce3', '#30212a', '#654454'],
	aqua: ['#f3fbfa', '#d4eee9', '#172d2d', '#30615c'], sand: ['#fcfaf5', '#eee4d1', '#2d2920', '#635541'], lilac: ['#f8f8fd', '#e4e5f4', '#222638', '#465177'],
	coral: ['#fff8f5', '#f3d8d0', '#31231f', '#6b493f'], mint: ['#f6fbf4', '#dcebd6', '#1f2d20', '#466247'], slate: ['#f6f9fa', '#dce3e5', '#20282d', '#455a62']
};

const translations = {
		en: {
		workspaceEyebrow: 'YOUR PERSONAL WORKSPACE', introCopy: "A calm place to collect today's priorities and keep momentum visible.", overview: 'OVERVIEW', remaining: 'Remaining', totalTasks: 'Total tasks', progress: 'Progress', currentStreak: 'Current streak', activity: 'ACTIVITY', yourWeek: 'Your week', completed: 'completed', yourList: 'YOUR LIST', tasks: 'Tasks', taskPlaceholder: 'What needs doing?', highPriority: 'High priority', mediumPriority: 'Medium priority', lowPriority: 'Low priority', addTask: 'Add task', inputHint: 'Press Enter to add a task', searchPlaceholder: 'Search tasks', all: 'All', active: 'Active', priority: 'Priority', clearCompleted: 'Clear completed', appearance: 'APPEARANCE', language: 'LANGUAGE', nightReading: 'NIGHT READING', nightReadingDescription: 'Warm, low-glare colors', account: 'ACCOUNT', profileIcon: 'PROFILE ICON', welcome: 'WELCOME TO DAYMARK', signIn: 'Sign in', signUp: 'Sign up', continueGoogle: 'Continue with Google', dayComplete: 'DAY COMPLETE', continue: 'Continue', myTasks: 'My tasks', calendar: 'Calendar', backToTop: 'Back to top', light: 'Light', dark: 'Dark', system: 'System', task: 'task', tasksPlural: 'tasks', noCompleted: 'No completed tasks yet.', finishTask: 'Finish a task and it will appear here.', caughtUp: 'You are all caught up.', noOpen: 'There are no open tasks right now.', listClear: 'Your list is clear.', addTaskStart: 'Add a task above to get started.', noMatching: 'No matching tasks.', tryDifferent: 'Try a different search or clear the filter', inYourList: 'in your list', tasksToDo: 'to do', daysInRow: 'days in a row'
	},
		hi: {
		workspaceEyebrow: 'आपका व्यक्तिगत कार्यक्षेत्र', introCopy: 'आज की प्राथमिकताएँ एकत्र करने और प्रगति बनाए रखने की शांत जगह।', overview: 'अवलोकन', remaining: 'बाकी', totalTasks: 'कुल कार्य', progress: 'प्रगति', currentStreak: 'वर्तमान निरंतरता', activity: 'गतिविधि', yourWeek: 'आपका सप्ताह', completed: 'पूर्ण', yourList: 'आपकी सूची', tasks: 'कार्य', taskPlaceholder: 'क्या करना है?', highPriority: 'उच्च प्राथमिकता', mediumPriority: 'मध्यम प्राथमिकता', lowPriority: 'कम प्राथमिकता', addTask: 'कार्य जोड़ें', inputHint: 'कार्य जोड़ने के लिए Enter दबाएँ', searchPlaceholder: 'कार्य खोजें', all: 'सभी', active: 'सक्रिय', priority: 'प्राथमिकता', clearCompleted: 'पूर्ण कार्य हटाएँ', appearance: 'दिखावट', language: 'भाषा', nightReading: 'रात में पढ़ना', nightReadingDescription: 'गर्म, कम चमक वाले रंग', account: 'खाता', profileIcon: 'प्रोफ़ाइल आइकन', welcome: 'DAYMARK में आपका स्वागत है', signIn: 'साइन इन', signUp: 'साइन अप', continueGoogle: 'Google के साथ जारी रखें', dayComplete: 'दिन पूरा', continue: 'जारी रखें', myTasks: 'मेरे कार्य', calendar: 'कैलेंडर', backToTop: 'ऊपर जाएँ', light: 'लाइट', dark: 'डार्क', system: 'सिस्टम', task: 'कार्य', tasksPlural: 'कार्य', noCompleted: 'अभी कोई पूर्ण कार्य नहीं है।', finishTask: 'कार्य पूरा करने पर वह यहाँ दिखाई देगा।', caughtUp: 'आप सभी कार्यों में आगे हैं।', noOpen: 'अभी कोई खुला कार्य नहीं है।', listClear: 'आपकी सूची खाली है।', addTaskStart: 'शुरू करने के लिए ऊपर कोई कार्य जोड़ें।', noMatching: 'कोई मिलान कार्य नहीं मिला।', tryDifferent: 'दूसरी खोज करें या फ़िल्टर हटाएँ', inYourList: 'आपकी सूची में', tasksToDo: 'करने के लिए', daysInRow: 'लगातार दिन'
	}
};

let selectedLanguage = localStorage.getItem('daymark-language') || 'en';
if (!translations[selectedLanguage]) selectedLanguage = 'en';

function t(key) {
	return translations[selectedLanguage][key] || translations.en[key] || key;
}

function getLocale() {
	return selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
}

function applyLanguage() {
	document.documentElement.lang = selectedLanguage === 'hi' ? 'hi' : 'en';
	document.querySelectorAll('[data-i18n]').forEach(element => {
		element.textContent = t(element.dataset.i18n);
	});
	document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
		element.placeholder = t(element.dataset.i18nPlaceholder);
	});
	languageSelect.value = selectedLanguage;
	if (hasRendered) render();
}

function setNightReading(enabled) {
	document.body.classList.toggle('night-reading', enabled);
	nightReadingToggle.checked = enabled;
	nightReadingToggle.setAttribute('aria-checked', String(enabled));
}

let nightReadingEnabled = localStorage.getItem('daymark-night-reading') === 'true';
setNightReading(nightReadingEnabled);

function setWallpaper(name) {
	const colors = wallpapers[name] || wallpapers.sage;
	const darkMode = localStorage.getItem('daymark-theme') === 'dark'
		|| (localStorage.getItem('daymark-theme') === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
	document.body.style.setProperty('--wallpaper', colors[darkMode ? 2 : 0]);
	document.body.style.setProperty('--wallpaper-accent', colors[darkMode ? 3 : 1]);
	document.body.style.setProperty('--card', colors[darkMode ? 2 : 0]);
	document.body.style.setProperty('--remaining-bg', colors[darkMode ? 3 : 1]);
	document.body.style.setProperty('--remaining-border', colors[darkMode ? 3 : 1]);
	wallpaperChoices.forEach(choice => {
		const selected = choice.dataset.wallpaper === name;
		choice.classList.toggle('selected', selected);
		choice.setAttribute('aria-pressed', String(selected));
	});
}

let selectedWallpaper = localStorage.getItem('daymark-wallpaper') || 'sage';
if (!wallpapers[selectedWallpaper]) selectedWallpaper = 'sage';
setWallpaper(selectedWallpaper);

function getSession() {
	try {
		return JSON.parse(localStorage.getItem('daymark-session') || 'null');
	} catch {
		return null;
	}
}

function getTaskStorageKey(email = getSession()?.email) {
	return `${storageKey}-${email ? encodeURIComponent(email) : 'guest'}`;
}

function getActivityStorageKey(email = getSession()?.email) {
	return `daymark-activity-${email ? encodeURIComponent(email) : 'guest'}`;
}

function loadTasks(email = getSession()?.email) {
	try {
		const storedTasks = JSON.parse(localStorage.getItem(getTaskStorageKey(email)) || '[]');
		return Array.isArray(storedTasks) ? storedTasks : [];
	} catch {
		return [];
	}
}

function loadActivityDates(email = getSession()?.email) {
	try {
		const storedDates = JSON.parse(localStorage.getItem(getActivityStorageKey(email)) || '[]');
		return Array.isArray(storedDates) ? storedDates : [];
	} catch {
		return [];
	}
}

function saveActivityDates(dates) {
	localStorage.setItem(getActivityStorageKey(), JSON.stringify([...dates]));
}

wallpaperChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		selectedWallpaper = choice.dataset.wallpaper;
		localStorage.setItem('daymark-wallpaper', selectedWallpaper);
		setWallpaper(selectedWallpaper);
	});
});
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupPageMotion() {
	document.body.classList.add('motion-ready');
	const revealElements = document.querySelectorAll('.reveal-on-scroll');
	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
		revealElements.forEach(element => element.classList.add('is-visible'));
		return;
	}

	const revealObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			revealObserver.unobserve(entry.target);
		});
	}, { threshold: 0.12 });
	revealElements.forEach(element => revealObserver.observe(element));

	let scrollFrame;
	window.addEventListener('scroll', () => {
		if (scrollFrame) return;
		scrollFrame = requestAnimationFrame(() => {
			document.body.classList.toggle('is-scrolled', window.scrollY > 12);
			document.body.style.setProperty('--scroll-shift', `${Math.min(window.scrollY, 500) * 0.08}px`);
			scrollFrame = null;
		});
	}, { passive: true });
}

setupPageMotion();

function openMenu() {
	sideMenu.classList.add('open');
	sideMenu.setAttribute('aria-hidden', 'false');
	menuBackdrop.hidden = false;
	menuToggle.setAttribute('aria-expanded', 'true');
}

function hideMenu() {
	sideMenu.classList.remove('open');
	sideMenu.setAttribute('aria-hidden', 'true');
	menuBackdrop.hidden = true;
	menuToggle.setAttribute('aria-expanded', 'false');
}

function openAuth(mode = 'signin') {
	authMode = mode;
	setAuthMode(mode);
	authBackdrop.hidden = false;
	document.body.classList.add('modal-open');
	setTimeout(() => (mode === 'signup' ? authName : authEmail).focus(), 0);
}

function hideAuth() {
	authBackdrop.hidden = true;
	document.body.classList.remove('modal-open');
	authForm.reset();
	authError.hidden = true;
}

function setAuthMode(mode) {
	authMode = mode;
	const signUp = mode === 'signup';
	authTitle.textContent = signUp ? (selectedLanguage === 'hi' ? 'अपना खाता बनाएँ' : 'Create your account') : t('signIn');
	authSubtitle.textContent = signUp ? (selectedLanguage === 'hi' ? 'अपनी प्राथमिकताओं को आसान बनाएँ।' : 'Make your priorities feel lighter.') : (selectedLanguage === 'hi' ? 'अपना ध्यान आगे बढ़ाते रहें।' : 'Keep your focus moving forward.');
	authSubmit.textContent = signUp ? (selectedLanguage === 'hi' ? 'खाता बनाएँ' : 'Create account') : t('signIn');
	authName.hidden = !signUp;
	authNameLabel.hidden = !signUp;
	authName.required = signUp;
	authPassword.autocomplete = signUp ? 'new-password' : 'current-password';
	signInTab.classList.toggle('active', !signUp);
	signUpTab.classList.toggle('active', signUp);
	signInTab.setAttribute('aria-selected', String(!signUp));
	signUpTab.setAttribute('aria-selected', String(signUp));
	authError.hidden = true;
}

function getUsers() {
	try {
		const users = JSON.parse(localStorage.getItem('daymark-users') || '[]');
		return Array.isArray(users) ? users : [];
	} catch {
		return [];
	}
}

function updateAccountUI() {
	const user = getSession();
	if (user) {
		const avatarKey = `daymark-avatar-${encodeURIComponent(user.email)}`;
		const savedAvatar = localStorage.getItem(avatarKey);
		profileInitial.textContent = savedAvatar || user.name.charAt(0).toUpperCase();
		profileButton.setAttribute('aria-label', `Account for ${user.name}`);
		accountSummary.textContent = selectedLanguage === 'hi' ? `${user.name} (${user.email}) के रूप में साइन इन` : `Signed in as ${user.name} (${user.email})`;
		menuAuthButton.textContent = selectedLanguage === 'hi' ? 'साइन आउट' : 'Sign out';
		avatarChoices.forEach(choice => {
			const selected = choice.dataset.avatar === savedAvatar;
			choice.classList.toggle('selected', selected);
			choice.setAttribute('aria-pressed', String(selected));
		});
	} else {
		profileInitial.textContent = 'G';
		profileButton.setAttribute('aria-label', 'Open account menu');
		accountSummary.textContent = selectedLanguage === 'hi' ? 'आप अतिथि के रूप में ब्राउज़ कर रहे हैं।' : 'You are browsing as a guest.';
		menuAuthButton.textContent = t('signIn');
		avatarChoices.forEach(choice => {
			choice.classList.remove('selected');
			choice.setAttribute('aria-pressed', 'false');
		});
	}
}

menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', hideMenu);
menuBackdrop.addEventListener('click', hideMenu);
profileButton.addEventListener('click', openMenu);
menuLinks.forEach(link => {
	link.addEventListener('click', () => {
		hideMenu();
	});
});
closeAuth.addEventListener('click', hideAuth);
authBackdrop.addEventListener('click', event => {
	if (event.target === authBackdrop) hideAuth();
});
signInTab.addEventListener('click', () => setAuthMode('signin'));
signUpTab.addEventListener('click', () => setAuthMode('signup'));
menuAuthButton.addEventListener('click', () => {
	if (getSession()) {
		localStorage.removeItem('daymark-session');
		tasks = loadTasks();
		updateAccountUI();
		render();
		showToast('Signed out');
		hideMenu();
	} else {
		hideMenu();
		openAuth();
	}
});

avatarChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		const user = getSession();
		if (!user) {
			openAuth();
			return;
		}
		localStorage.setItem(`daymark-avatar-${encodeURIComponent(user.email)}`, choice.dataset.avatar);
		updateAccountUI();
		showToast('Profile icon updated');
	});
});

authForm.addEventListener('submit', event => {
	event.preventDefault();
	const email = authEmail.value.trim().toLowerCase();
	const password = authPassword.value;
	const users = getUsers();
	let user;
	if (authMode === 'signup') {
		if (users.some(entry => entry.email === email)) {
			authError.textContent = 'An account with this email already exists.';
			authError.hidden = false;
			return;
		}
		user = { name: authName.value.trim(), email, password };
		localStorage.setItem('daymark-users', JSON.stringify([...users, user]));
	} else {
		user = users.find(entry => entry.email === email && entry.password === password);
		if (!user) {
			authError.textContent = 'Email or password is incorrect.';
			authError.hidden = false;
			return;
		}
	}
	localStorage.setItem('daymark-session', JSON.stringify({ name: user.name, email: user.email }));
	tasks = loadTasks(user.email);
	updateAccountUI();
	render();
	hideAuth();
	showToast(authMode === 'signup' ? 'Account created' : 'Welcome back');
});

googleButton.addEventListener('click', () => {
	const googleUser = { name: 'Google User', email: 'google.user@demo.local' };
	localStorage.setItem('daymark-session', JSON.stringify(googleUser));
	tasks = loadTasks(googleUser.email);
	updateAccountUI();
	render();
	hideAuth();
	showToast('Signed in with Google demo');
});

updateAccountUI();

function setTheme(theme) {
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const darkMode = theme === 'dark' || (theme === 'system' && systemDark);
	document.body.classList.toggle('dark-mode', darkMode);
	setWallpaper(selectedWallpaper);
	themeIcon.textContent = darkMode ? '☀' : '☾';
	themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
	themeToggle.title = darkMode ? 'Switch to light mode' : 'Switch to dark mode';
	themeChoices.forEach(choice => {
		const selected = choice.dataset.theme === theme;
		choice.classList.toggle('selected', selected);
		choice.setAttribute('aria-pressed', String(selected));
	});
}

let selectedTheme = localStorage.getItem('daymark-theme') || 'light';
if (!['light', 'dark', 'system'].includes(selectedTheme)) selectedTheme = 'light';
setTheme(selectedTheme);

themeToggle.addEventListener('click', () => {
	const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
	localStorage.setItem('daymark-theme', nextTheme);
	selectedTheme = nextTheme;
	setTheme(nextTheme);
});

themeChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		selectedTheme = choice.dataset.theme;
		localStorage.setItem('daymark-theme', selectedTheme);
		setTheme(selectedTheme);
	});
});

languageSelect.addEventListener('change', () => {
	selectedLanguage = languageSelect.value;
	localStorage.setItem('daymark-language', selectedLanguage);
	applyLanguage();
	updateAccountUI();
	setAuthMode(authMode);
});

nightReadingToggle.addEventListener('change', () => {
	nightReadingEnabled = nightReadingToggle.checked;
	localStorage.setItem('daymark-night-reading', String(nightReadingEnabled));
	setNightReading(nightReadingEnabled);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
	if (selectedTheme === 'system') setTheme('system');
});

if (localStorage.getItem(`${storageKey}-guest`) === null && localStorage.getItem(storageKey) !== null) {
	localStorage.setItem(`${storageKey}-guest`, localStorage.getItem(storageKey));
	localStorage.removeItem(storageKey);
}
tasks = loadTasks();

	document.querySelector('#todayLabel').textContent = new Intl.DateTimeFormat(getLocale(), {
	weekday: 'long', month: 'short', day: 'numeric'
}).format(new Date());

function saveTasks() {
	localStorage.setItem(getTaskStorageKey(), JSON.stringify(tasks));
}

function render() {
	const completed = tasks.filter(task => task.completed).length;
	const searchTerm = searchInput.value.trim().toLowerCase();
	const selectedPriority = priorityFilter.value;
	const visibleTasks = tasks.filter(task => currentFilter === 'all'
		|| (currentFilter === 'active' && !task.completed)
		|| (currentFilter === 'completed' && task.completed))
		.filter(task => task.text.toLowerCase().includes(searchTerm))
		.filter(task => selectedPriority === 'all' || (task.priority || 'medium') === selectedPriority);
	const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
	const dayComplete = tasks.length > 0 && completed === tasks.length;

	document.querySelector('#remainingCount').textContent = tasks.length - completed;
	document.querySelector('#totalSummaryCount').textContent = tasks.length;
	document.querySelector('.summary-card-main .summary-detail').textContent = `${tasks.length - completed} ${tasks.length - completed === 1 ? t('task') : t('tasksPlural')} ${t('tasksToDo')}`;
	document.querySelector('#totalCount').textContent = `${tasks.length} ${tasks.length === 1 ? t('task') : t('tasksPlural')}`;
	document.querySelector('#progressPercent').textContent = `${progress}%`;
	document.querySelector('#progressBar').style.width = `${progress}%`;
	document.querySelector('#streakCount').textContent = getStreak();
	renderCalendar();
	clearCompleted.disabled = completed === 0;
	clearSearch.hidden = searchTerm.length === 0;
	taskList.innerHTML = visibleTasks.map(task => `
		<li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
			<button class="check-button" type="button" aria-label="${task.completed ? 'Mark task open' : 'Complete task'}">${task.completed ? '✓' : ''}</button>
			<span class="task-text">${escapeHtml(task.text)}<span class="priority-badge priority-${task.priority || 'medium'}">${t(`${task.priority || 'medium'}Priority`)}</span></span>
			<button class="delete-button" type="button" aria-label="${selectedLanguage === 'hi' ? 'कार्य हटाएँ' : 'Delete task'}">×</button>
		</li>
	`).join('');
	if (hasRendered && dayComplete && !render.wasComplete) showCelebration();
	render.wasComplete = dayComplete;
	hasRendered = true;

	emptyState.hidden = visibleTasks.length > 0;
	if (currentFilter === 'completed') {
		emptyTitle.textContent = t('noCompleted');
		emptyDescription.textContent = t('finishTask');
	} else if (currentFilter === 'active') {
		emptyTitle.textContent = t('caughtUp');
		emptyDescription.textContent = t('noOpen');
	} else {
		emptyTitle.textContent = t('listClear');
		emptyDescription.textContent = t('addTaskStart');
	}
	if (searchTerm && visibleTasks.length === 0) {
		emptyTitle.textContent = t('noMatching');
		emptyDescription.textContent = `${t('tryDifferent')}.`;
	}
}

function showCelebration() {
	celebrationBackdrop.hidden = false;
	document.body.classList.add('modal-open');
	closeCelebration.focus();
}

function hideCelebration() {
	celebrationBackdrop.hidden = true;
	document.body.classList.remove('modal-open');
}

closeCelebration.addEventListener('click', hideCelebration);
celebrationBackdrop.addEventListener('click', event => {
	if (event.target === celebrationBackdrop) hideCelebration();
});
document.addEventListener('keydown', event => {
	if (event.key === 'Escape' && !celebrationBackdrop.hidden) hideCelebration();
});

function showCountPopup(message) {
	clearTimeout(countPopupTimer);
	countPopup.textContent = message;
	countPopup.hidden = false;
	countPopup.classList.remove('show');
	requestAnimationFrame(() => countPopup.classList.add('show'));
	countPopupTimer = setTimeout(() => {
		countPopup.classList.remove('show');
		setTimeout(() => { countPopup.hidden = true; }, 220);
	}, 2200);
}

function dateKey(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

function getActivityDates() {
	const activityDates = new Set(loadActivityDates());
	tasks.filter(task => task.completedAt).forEach(task => activityDates.add(task.completedAt));
	return activityDates;
}

function getStreak() {
	const activityDates = getActivityDates();
	const today = new Date();
	let cursor = new Date(today);
	if (!activityDates.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
	let streak = 0;
	while (activityDates.has(dateKey(cursor))) {
		streak++;
		cursor.setDate(cursor.getDate() - 1);
	}
	return streak;
}

function renderCalendar() {
	const activityDates = getActivityDates();
	const today = new Date();
	const weekEnd = new Date(today);
	weekEnd.setDate(today.getDate() - (weekOffset * 7));
	const weekStart = new Date(weekEnd);
	weekStart.setDate(weekEnd.getDate() - 6);
	document.querySelector('#calendarHeading').textContent = weekOffset === 0 ? t('yourWeek') : `${weekStart.toLocaleDateString(getLocale(), { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString(getLocale(), { month: 'short', day: 'numeric' })}`;
	document.querySelector('#nextWeek').disabled = weekOffset === 0;
	const days = Array.from({ length: 7 }, (_, index) => {
		const date = new Date(weekStart);
		date.setDate(weekStart.getDate() + index);
		return date;
	});
	document.querySelector('#weekCalendar').innerHTML = days.map(date => {
		const isToday = dateKey(date) === dateKey(today);
		const hasActivity = activityDates.has(dateKey(date));
		return `<div class="calendar-day ${isToday ? 'today' : ''} ${hasActivity ? 'has-activity' : ''}" role="listitem" aria-label="${date.toLocaleDateString(getLocale(), { weekday: 'long', month: 'short', day: 'numeric' })}${hasActivity ? `, ${t('completed')}` : ''}">
			<span class="day-name">${date.toLocaleDateString(getLocale(), { weekday: 'short' })}</span>
			<strong>${date.getDate()}</strong>
			<span class="activity-dot" aria-hidden="true"></span>
		</div>`;
	}).join('');
	renderMonthCalendar();
}

function renderMonthCalendar() {
	const activityDates = getActivityDates();
	const today = new Date();
	const viewedMonth = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
	const firstDay = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth(), 1);
	const daysInMonth = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 0).getDate();
	const monthLabel = viewedMonth.toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' });
	document.querySelector('#monthLabel').textContent = monthLabel;
	document.querySelector('#nextMonth').disabled = monthOffset === 0;
	const leadingDays = firstDay.getDay();
	const cells = [];
	for (let index = 0; index < leadingDays; index++) cells.push('<span class="month-empty" aria-hidden="true"></span>');
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(viewedMonth.getFullYear(), viewedMonth.getMonth(), day);
		const key = dateKey(date);
		const isToday = key === dateKey(today);
		const hasActivity = activityDates.has(key);
		cells.push(`<span class="month-day ${isToday ? 'today' : ''} ${hasActivity ? 'has-activity' : ''}" role="gridcell" aria-label="${date.toLocaleDateString(getLocale(), { month: 'short', day: 'numeric' })}${hasActivity ? `, ${t('completed')}` : ''}">${day}</span>`);
	}
	document.querySelector('#monthCalendar').innerHTML = cells.join('');
}

function escapeHtml(text) {
	const element = document.createElement('div');
	element.textContent = text;
	return element.innerHTML;
}

function capitalize(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

taskForm.addEventListener('submit', event => {
	event.preventDefault();
	const text = taskInput.value.trim();
	if (!text) return;
	tasks.unshift({ id: crypto.randomUUID(), text, priority: taskPriority.value, completed: false });
	saveTasks();
	taskInput.value = '';
	currentFilter = 'all';
	document.querySelectorAll('.filter-button').forEach(button => button.classList.toggle('active', button.dataset.filter === 'all'));
	render();
	showCountPopup(selectedLanguage === 'hi' ? `कार्य जोड़ा गया  +1 कुल  |  ${tasks.length - tasks.filter(task => task.completed).length} बाकी` : `Task added  +1 total  |  ${tasks.length - tasks.filter(task => task.completed).length} remaining`);
	requestAnimationFrame(() => taskList.querySelector('.task-item')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' }));
	taskInput.focus();
});

taskList.addEventListener('click', event => {
	const item = event.target.closest('.task-item');
	if (!item) return;
	const task = tasks.find(entry => entry.id === item.dataset.id);
	if (event.target.closest('.check-button')) {
		task.completed = !task.completed;
		task.completedAt = task.completed ? dateKey(new Date()) : null;
		if (task.completed) {
			const activityDates = getActivityDates();
			activityDates.add(task.completedAt);
			saveActivityDates(activityDates);
		}
	}
	if (event.target.closest('.check-button')) {
		showToast(task.completed ? (selectedLanguage === 'hi' ? 'कार्य पूरा हुआ' : 'Task completed') : (selectedLanguage === 'hi' ? 'कार्य फिर से खुला' : 'Task moved back to open'));
		showCountPopup(task.completed ? (selectedLanguage === 'hi' ? `कार्य पूरा हुआ  |  ${tasks.filter(entry => !entry.completed).length} बाकी` : `Task completed  |  ${tasks.filter(entry => !entry.completed).length} remaining`) : (selectedLanguage === 'hi' ? `कार्य फिर से खुला  |  ${tasks.filter(entry => !entry.completed).length} बाकी` : `Task reopened  |  ${tasks.filter(entry => !entry.completed).length} remaining`));
	}
	if (event.target.closest('.delete-button')) {
		deletedTask = { ...task };
		tasks = tasks.filter(entry => entry.id !== item.dataset.id);
		showToast(selectedLanguage === 'hi' ? 'कार्य हटाया गया' : 'Task deleted', true);
		showCountPopup(selectedLanguage === 'hi' ? `कार्य हटाया गया  -1 कुल  |  ${tasks.length - tasks.filter(entry => entry.completed).length} बाकी` : `Task removed  -1 total  |  ${tasks.length - tasks.filter(entry => entry.completed).length} remaining`);
	}
	saveTasks();
	render();
});

document.querySelectorAll('.filter-button').forEach(button => {
	button.addEventListener('click', () => {
		currentFilter = button.dataset.filter;
		document.querySelectorAll('.filter-button').forEach(filter => filter.classList.toggle('active', filter === button));
		render();
	});
});

document.querySelector('#previousWeek').addEventListener('click', () => {
	weekOffset++;
	renderCalendar();
});

document.querySelector('#nextWeek').addEventListener('click', () => {
	if (weekOffset === 0) return;
	weekOffset--;
	renderCalendar();
});

document.querySelector('#previousMonth').addEventListener('click', () => {
	monthOffset++;
	renderMonthCalendar();
});

document.querySelector('#nextMonth').addEventListener('click', () => {
	if (monthOffset === 0) return;
	monthOffset--;
	renderMonthCalendar();
});

searchInput.addEventListener('input', render);
priorityFilter.addEventListener('change', render);

clearSearch.addEventListener('click', () => {
	searchInput.value = '';
	render();
	searchInput.focus();
});

clearCompleted.addEventListener('click', () => {
	if (!tasks.some(task => task.completed)) return;
	tasks = tasks.filter(task => !task.completed);
	saveTasks();
	showToast('Completed tasks cleared');
	render();
});

function showToast(message, canUndo = false) {
	clearTimeout(toastTimer);
	toast.innerHTML = canUndo ? `${message}<button type="button" id="undoDelete">Undo</button>` : message;
	toast.hidden = false;
	if (canUndo) {
		document.querySelector('#undoDelete').addEventListener('click', () => {
			if (deletedTask) tasks.push(deletedTask);
			deletedTask = null;
			saveTasks();
			render();
			showToast('Task restored');
		});
	}
	toastTimer = setTimeout(() => { toast.hidden = true; }, canUndo ? 5000 : 2200);
}

applyLanguage();
updateAccountUI();
render();
