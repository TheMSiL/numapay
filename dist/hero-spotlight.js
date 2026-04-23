/**
 * Hero spotlight effect - creates a gradient spotlight around cursor
 * that highlights SVG logos in the hero section
 * @param {string} heroSelector - CSS selector for hero section (e.g., '.hero', '.guide_hero')
 */
const initHeroSpotlight = async heroSelector => {
	const hero = document.querySelector(heroSelector);
	if (!hero) return;

	// Add CSS styles for spotlight effect
	const hoverStyles = document.createElement('style');
	hoverStyles.textContent = `
    .hero-svg-item {
      pointer-events: none;
      cursor: default;
      transition: opacity 0.4s ease-out;
      width: 58px;
      height: 58px;
    }
    .hero-svg-item svg {
      pointer-events: none;
      width: 100%;
      height: 100%;
    }
    .hero-spotlight {
      position: absolute;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 40%, transparent 70%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease-out;
      transform: translate(-50%, -50%);
      z-index: 39;
    }
    .hero-spotlight.active {
      opacity: 1;
    }
  `;
	document.head.appendChild(hoverStyles);

	// Create spotlight element
	const spotlight = document.createElement('div');
	spotlight.className = 'hero-spotlight';
	hero.appendChild(spotlight);

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

			// Fixed opacity for each element (base opacity when away from cursor)
			const minOpacity = 0.08;
			const maxOpacity = 0.25;
			const baseOpacity =
				minOpacity + Math.random() * (maxOpacity - minOpacity);

			// Store base opacity as a data attribute
			svgElement.dataset.baseOpacity = baseOpacity;

			svgElement.style.cssText = `
      position: absolute;
      left: ${pos.x}%;
      top: ${pos.y}%;
      opacity: ${baseOpacity};
      transform: translate(-50%, -50%);
    `;

			svgContainer.appendChild(svgElement);
		});

		// Add spotlight effect on mouse move
		let mouseX = -1000;
		let mouseY = -1000;
		const spotlightRadius = 200; // Radius of the spotlight effect in pixels
		const maxOpacity = 0.95; // Maximum opacity for logo directly under cursor

		const updateSpotlight = () => {
			const svgItems = svgContainer.querySelectorAll('.hero-svg-item');

			svgItems.forEach(item => {
				const rect = item.getBoundingClientRect();
				const itemX = rect.left + rect.width / 2;
				const itemY = rect.top + rect.height / 2;

				// Calculate distance from cursor to element center
				const dx = mouseX - itemX;
				const dy = mouseY - itemY;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Get base opacity
				const baseOpacity = parseFloat(item.dataset.baseOpacity);

				if (distance < spotlightRadius) {
					// Inside spotlight radius - calculate gradient
					const influence = 1 - distance / spotlightRadius;
					// Use smooth easing function for smoother gradient
					const easedInfluence = influence * influence * (3 - 2 * influence);
					// Interpolate between base opacity and max opacity
					const newOpacity =
						baseOpacity + (maxOpacity - baseOpacity) * easedInfluence;
					item.style.opacity = newOpacity;
				} else {
					// Outside spotlight - use base opacity
					item.style.opacity = baseOpacity;
				}
			});
		};

		// Track mouse movement
		hero.addEventListener('mousemove', e => {
			const rect = hero.getBoundingClientRect();
			mouseX = e.clientX;
			mouseY = e.clientY;

			// Update spotlight position relative to hero section
			const relativeX = e.clientX - rect.left;
			const relativeY = e.clientY - rect.top;
			spotlight.style.left = relativeX + 'px';
			spotlight.style.top = relativeY + 'px';
			spotlight.classList.add('active');

			updateSpotlight();
		});

		// Reset when mouse leaves hero section
		hero.addEventListener('mouseleave', () => {
			mouseX = -1000;
			mouseY = -1000;
			spotlight.classList.remove('active');
			updateSpotlight();
		});
	} catch (error) {
		console.error('Error loading hero SVG files:', error);
	}
};
