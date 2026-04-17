document.querySelectorAll('.line-path').forEach(path => {
	const length = path.getTotalLength();
	path.style.strokeDasharray = length;
	path.style.strokeDashoffset = length;
});

document.querySelectorAll('.faq_item').forEach(item => {
	const showFaq = item.querySelector('.show_faq');
	const hideFaq = item.querySelector('.hide_faq');

	showFaq.innerHTML = `
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="29" r="28.5" fill="#F2F2F2" stroke="#0A0A0A"/>
      <path d="M25.6 41.08V31.36H16V25.72H25.6V16H31.48V25.72H41.08V31.36H31.48V41.08H25.6Z" fill="#191A23"/>
    </svg>
  `;

	hideFaq.innerHTML = `
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="29" r="28.5" fill="#F8F8F8" stroke="#0A0A0A"/>
      <path d="M20 31.64V26H37.76V31.64H20Z" fill="#0A0A0A"/>
    </svg>
  `;

	item.addEventListener('click', () => {
		document.querySelectorAll('.faq_item').forEach(otherItem => {
			if (otherItem !== item) {
				otherItem.classList.remove('active');

				const otherShowFaq = otherItem.querySelector('.show_faq');
				const otherHideFaq = otherItem.querySelector('.hide_faq');
				const otherHiddenContent = otherItem.querySelector('.faq_item-hidden');

				otherShowFaq.classList.remove('hidden');
				otherHideFaq.classList.add('hidden');
				otherHiddenContent.classList.add('opacity-0');
				otherHiddenContent.classList.remove('opacity-100');
			}
		});

		item.classList.toggle('active');

		const hiddenContent = item.querySelector('.faq_item-hidden');

		if (item.classList.contains('active')) {
			showFaq.classList.add('hidden');
			hideFaq.classList.remove('hidden');
			hiddenContent.classList.remove('opacity-0');
			hiddenContent.classList.add('opacity-100');
		} else {
			showFaq.classList.remove('hidden');
			hideFaq.classList.add('hidden');
			hiddenContent.classList.add('opacity-0');
			hiddenContent.classList.remove('opacity-100');
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const circles = [
		document.querySelector('.line-1 circle'),
		document.querySelector('.line-2 circle'),
		document.querySelector('.line-3 circle'),
	];

	circles.forEach((circle, index) => {
		const length = circle.getTotalLength();

		gsap.set(circle, {
			strokeDasharray: length,
			strokeDashoffset: length,
		});

		gsap.to(circle, {
			strokeDashoffset: -length,
			duration: 10,
			ease: 'linear',
			repeat: -1,
			delay: index * 3,
		});
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('form');
	const inputs = form.querySelectorAll('input, textarea');
	const submitBtn = form.querySelector('button');

	const validators = {
		name: value => {
			if (!value.trim()) return 'Name is required';
			if (value.length < 2) return 'Name must be at least 2 characters';
			return '';
		},
		email: value => {
			if (!value.trim()) return 'Email is required';
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
				return 'Invalid email format';
			return '';
		},
		messenger: value => {
			if (!value.trim()) return 'Messenger is required';
			return '';
		},
		message: value => {
			if (value.length > 0 && value.length < 10)
				return 'Message must be at least 10 characters';
			return '';
		},
	};

	const validateField = field => {
		const errorSpan = field.parentElement.querySelector('.error_message');
		const error = validators[field.name](field.value);

		if (error) {
			field.classList.add('error_input');
			errorSpan.textContent = error;
			errorSpan.classList.remove('hidden');
		} else {
			field.classList.remove('error_input');
			errorSpan.textContent = '';
			errorSpan.classList.add('hidden');
		}

		return !error;
	};

	const checkFormValidity = () => {
		const isValid = Array.from(inputs).every(input => {
			if (input.required) {
				return validators[input.name](input.value) === '';
			}
			return true;
		});
		submitBtn.disabled = !isValid;
	};

	inputs.forEach(input => {
		input.addEventListener('input', () => {
			validateField(input);
			checkFormValidity();
		});

		input.addEventListener('blur', () => {
			validateField(input);
		});
	});

	form.addEventListener('submit', e => {
		e.preventDefault();
		const allValid = Array.from(inputs).every(input => validateField(input));
	});
});

const burger = document.getElementById('burger');
const overlay = document.getElementById('overlay');
const showBurger = document.getElementById('show_burger');
const closeBurger = document.getElementById('close_burger');

burger.addEventListener('click', () => {
	if (showBurger.classList.contains('block')) {
		overlay.classList.add('top-[80px]');
		overlay.classList.remove('top-[-105%]');
		showBurger.classList.toggle('hidden');
		showBurger.classList.toggle('block');
		closeBurger.classList.toggle('hidden');
		closeBurger.classList.toggle('block');
		document.body.classList.add('overflow-hidden');
	} else {
		overlay.classList.remove('top-[80px]');
		overlay.classList.add('top-[-105%]');
		showBurger.classList.toggle('hidden');
		showBurger.classList.toggle('block');
		closeBurger.classList.toggle('hidden');
		closeBurger.classList.toggle('block');
		document.body.classList.remove('overflow-hidden');
	}
});

document.querySelectorAll('#overlay .header_link a').forEach(link => {
	link.addEventListener('click', () => {
		overlay.classList.remove('top-[80px]');
		overlay.classList.add('top-[-105%]');
		showBurger.classList.toggle('hidden');
		showBurger.classList.toggle('block');
		closeBurger.classList.toggle('hidden');
		closeBurger.classList.toggle('block');
		document.body.classList.remove('overflow-hidden');
	});
});

const setVh = () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVh();
window.addEventListener('resize', setVh);

// Hero background SVG animation
const initHeroSvgBackground = async () => {
	const hero = document.querySelector('.hero');
	if (!hero) return;
	// Add CSS styles for hover effect
	const hoverStyles = document.createElement('style');
	hoverStyles.textContent = `
    .hero-svg-item {
      pointer-events: auto;
      cursor: pointer;
      transition: opacity 0.3s ease;
      width: 58px;
      height: 58px;
    }
    .hero-svg-item:hover {
      opacity: 0.6 !important;
    }
    .hero-svg-item svg {
      pointer-events: none;
      width: 100%;
      height: 100%;
    }
  `;
	document.head.appendChild(hoverStyles);
	// Create container for SVG elements
	const svgContainer = document.createElement('div');
	svgContainer.className = 'hero-svg-container';
	svgContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 40;
    pointer-events: none;
  `;
	hero.insertBefore(svgContainer, hero.firstChild);

	// Load SVG content
	try {
		const svg1Response = await fetch('./assets/hero/hero_svg_1.svg');
		const svg2Response = await fetch('./assets/hero/hero_svg_2.svg');
		const svg1Content = await svg1Response.text();
		const svg2Content = await svg2Response.text();

		// Fixed positions for SVG elements (manually placed to avoid overlap)
		const allPositions = [
			// Top row
			{ x: 5, y: 10 },
			{ x: 13, y: 6 },
			{ x: 21, y: 12 },
			{ x: 29, y: 8 },
			{ x: 37, y: 14 },
			{ x: 45, y: 7 },
			{ x: 53, y: 11 },
			{ x: 61, y: 9 },
			{ x: 69, y: 13 },
			{ x: 77, y: 10 },
			{ x: 85, y: 15 },
			{ x: 93, y: 8 },
			// Second row
			{ x: 8, y: 20 },
			{ x: 16, y: 23 },
			{ x: 24, y: 19 },
			{ x: 32, y: 24 },
			{ x: 40, y: 21 },
			{ x: 48, y: 25 },
			{ x: 56, y: 22 },
			{ x: 64, y: 26 },
			{ x: 72, y: 20 },
			{ x: 80, y: 24 },
			{ x: 88, y: 23 },
			{ x: 95, y: 21 },
			// Third row
			{ x: 6, y: 33 },
			{ x: 14, y: 36 },
			{ x: 22, y: 32 },
			{ x: 30, y: 37 },
			{ x: 38, y: 34 },
			{ x: 46, y: 38 },
			{ x: 54, y: 35 },
			{ x: 62, y: 39 },
			{ x: 70, y: 33 },
			{ x: 78, y: 36 },
			{ x: 86, y: 34 },
			{ x: 94, y: 38 },
			// Middle row
			{ x: 9, y: 47 },
			{ x: 17, y: 44 },
			{ x: 25, y: 50 },
			{ x: 33, y: 46 },
			{ x: 41, y: 51 },
			{ x: 49, y: 48 },
			{ x: 57, y: 52 },
			{ x: 65, y: 45 },
			{ x: 73, y: 49 },
			{ x: 81, y: 47 },
			{ x: 89, y: 51 },
			{ x: 96, y: 46 },
			// Fifth row
			{ x: 7, y: 60 },
			{ x: 15, y: 63 },
			{ x: 23, y: 59 },
			{ x: 31, y: 64 },
			{ x: 39, y: 61 },
			{ x: 47, y: 65 },
			{ x: 55, y: 62 },
			{ x: 63, y: 66 },
			{ x: 71, y: 60 },
			{ x: 79, y: 63 },
			{ x: 87, y: 61 },
			{ x: 94, y: 65 },
			// Bottom row
			{ x: 10, y: 74 },
			{ x: 18, y: 77 },
			{ x: 26, y: 73 },
			{ x: 34, y: 78 },
			{ x: 42, y: 75 },
			{ x: 50, y: 80 },
			{ x: 58, y: 76 },
			{ x: 66, y: 81 },
			{ x: 74, y: 74 },
			{ x: 82, y: 78 },
			{ x: 90, y: 76 },
			{ x: 97, y: 79 },
			// Seventh row
			{ x: 8, y: 87 },
			{ x: 16, y: 90 },
			{ x: 24, y: 86 },
			{ x: 32, y: 91 },
			{ x: 40, y: 88 },
			{ x: 48, y: 93 },
			{ x: 56, y: 89 },
			{ x: 64, y: 94 },
			{ x: 72, y: 87 },
			{ x: 80, y: 91 },
			{ x: 88, y: 89 },
			{ x: 95, y: 92 },
		];

		// Calculate how many elements to show based on screen width
		const screenWidth = window.innerWidth;
		const baseWidth = 1000; // Base width where we show all elements
		const ratio = Math.min(screenWidth / baseWidth, 1); // Max 1 (100%)
		const elementsToShow = Math.max(
			Math.floor(allPositions.length * ratio),
			20,
		); // Minimum 20 elements

		// Distribute elements evenly across all rows (not just taking first N)
		const step = allPositions.length / elementsToShow;
		const positions = [];
		for (let i = 0; i < elementsToShow; i++) {
			const index = Math.floor(i * step);
			positions.push(allPositions[index]);
		}

		// Create SVG elements at fixed positions
		positions.forEach((pos, index) => {
			// Alternate between SVG types
			const isFirstSvg = index % 2 === 0;
			const svgElement = document.createElement('div');
			svgElement.className = 'hero-svg-item';
			svgElement.innerHTML = isFirstSvg ? svg1Content : svg2Content;

			// Fixed opacity for each element
			const minOpacity = 0.08;
			const maxOpacity = 0.25;
			const initialOpacity =
				minOpacity + Math.random() * (maxOpacity - minOpacity);

			svgElement.style.cssText = `
      position: absolute;
      left: ${pos.x}%;
      top: ${pos.y}%;
      opacity: ${initialOpacity};
      transform: translate(-50%, -50%);
    `;

			svgContainer.appendChild(svgElement);
		});
	} catch (error) {
		console.error('Error loading hero SVG files:', error);
	}
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initHeroSvgBackground);
} else {
	initHeroSvgBackground();
}
