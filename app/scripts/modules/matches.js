function matches(m) {
	const windowHeight = window.outerHeight;
	const collect = document.getElementById('collect-footer');
	if (m.matches && windowHeight > 600) {
		collect.classList.remove('limit-height');
	}
	else {
		collect.classList.add('limit-height');
	}
}

export { matches };