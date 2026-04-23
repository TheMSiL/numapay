document.addEventListener('DOMContentLoaded', () => {
	const faqItems = document.querySelectorAll('.guide_faq_item');

	faqItems.forEach(item => {
		item.addEventListener('click', () => {
			const wrapper = item.closest('.guide_faq_wrapper');

			document
				.querySelectorAll('.guide_faq_wrapper.active')
				.forEach(activeWrapper => {
					if (activeWrapper !== wrapper) {
						activeWrapper.classList.remove('active');
					}
				});

			wrapper.classList.toggle('active');
		});
	});
});
