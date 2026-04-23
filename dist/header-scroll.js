window.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	const headerBtn = header?.querySelector('button');

	if (!header) return;

	const scrollPosition = window.scrollY;

	if (scrollPosition > 100) {
		header.classList.remove('bg-transparent', 'border-mineShaft');
		header.classList.add('bg-codGray', 'header-scrolled', 'border-codGray');

		if (headerBtn) {
			headerBtn.classList.remove(
				'text-concrete',
				'bg-codGray',
				'header_btn-shadow',
			);
			headerBtn.classList.add(
				'text-primary',
				'bg-mainYellow',
				'header_btn-active',
			);
		}
	} else {
		header.classList.add('bg-transparent', 'border-mineShaft');
		header.classList.remove('bg-codGray', 'header-scrolled', 'border-codGray');

		if (headerBtn) {
			headerBtn.classList.add(
				'text-concrete',
				'bg-codGray',
				'header_btn-shadow',
			);
			headerBtn.classList.remove(
				'text-primary',
				'bg-mainYellow',
				'header_btn-active',
			);
		}
	}
});
