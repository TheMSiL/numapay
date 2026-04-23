// Handle select placeholder styling
document.addEventListener('DOMContentLoaded', function () {
	const selectElements = document.querySelectorAll('select.form_input');

	selectElements.forEach(select => {
		// Check on change
		select.addEventListener('change', function () {
			if (this.value !== '') {
				this.classList.add('has-value');
			} else {
				this.classList.remove('has-value');
			}
		});

		// Check initial state
		if (select.value !== '') {
			select.classList.add('has-value');
		}
	});

	// Custom Select Functionality
	const customSelects = document.querySelectorAll('.custom-select');

	customSelects.forEach(select => {
		const trigger = select.querySelector('.custom-select-trigger');
		const options = select.querySelectorAll('.custom-option');
		const hiddenInput = select.parentElement.querySelector(
			'input[type="hidden"]',
		);
		const selectedValueSpan = select.querySelector('.selected-value');

		// Toggle dropdown
		trigger.addEventListener('click', function (e) {
			e.stopPropagation();

			// Close all other selects
			customSelects.forEach(s => {
				if (s !== select) {
					s.classList.remove('open');
				}
			});

			select.classList.toggle('open');
		});

		// Select option
		options.forEach(option => {
			option.addEventListener('click', function (e) {
				e.stopPropagation();

				const value = this.getAttribute('data-value');
				const text = this.textContent;

				// Update visual state
				selectedValueSpan.textContent = text;
				selectedValueSpan.classList.add('has-value');

				// Update hidden input
				if (hiddenInput) {
					hiddenInput.value = value;
				}

				// Remove active state from all options
				options.forEach(opt => opt.classList.remove('selected'));

				// Add active state to selected option
				this.classList.add('selected');

				// Close dropdown
				select.classList.remove('open');
			});
		});
	});

	// Close dropdown when clicking outside
	document.addEventListener('click', function () {
		customSelects.forEach(select => {
			select.classList.remove('open');
		});
	});

	// Form Validation
	const form = document.querySelector('form');
	const submitBtn = form.querySelector('button[type="submit"], .primary_btn');
	const inputs = form.querySelectorAll(
		'input[type="text"], input[type="email"]',
	);
	const turnoverInput = document.getElementById('turnover-input');

	// Validation rules
	const validateEmail = email => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validateField = field => {
		const value = field.value.trim();
		const errorSpan = field.parentElement.querySelector('.error_message');
		let isValid = true;
		let errorMessage = '';

		// Check if field is empty
		if (value === '') {
			isValid = false;
			errorMessage = 'This field is required';
		} else if (field.type === 'email' && !validateEmail(value)) {
			isValid = false;
			errorMessage = 'Please enter a valid email address';
		}

		// Update UI
		if (!isValid) {
			field.classList.add('error_input');
			if (errorSpan) {
				errorSpan.textContent = errorMessage;
				errorSpan.classList.remove('hidden');
			}
		} else {
			field.classList.remove('error_input');
			if (errorSpan) {
				errorSpan.textContent = '';
				errorSpan.classList.add('hidden');
			}
		}

		return isValid;
	};

	const validateCustomSelect = () => {
		const value = turnoverInput.value;
		const selectWrapper = document.querySelector('.custom-select-wrapper');
		const customSelect = selectWrapper.querySelector('.custom-select');
		const errorSpan =
			selectWrapper.parentElement.querySelector('.error_message');
		let isValid = value !== '';

		// Update UI
		if (!isValid) {
			customSelect.classList.add('error_input');
			if (errorSpan) {
				errorSpan.textContent = 'Please select an option';
				errorSpan.classList.remove('hidden');
			}
		} else {
			customSelect.classList.remove('error_input');
			if (errorSpan) {
				errorSpan.textContent = '';
				errorSpan.classList.add('hidden');
			}
		}

		return isValid;
	};

	const checkFormValidity = () => {
		let isFormValid = true;

		// Validate all text/email inputs
		inputs.forEach(input => {
			if (input.value.trim() !== '') {
				// Only validate if field has value
				if (!validateField(input)) {
					isFormValid = false;
				}
			} else {
				isFormValid = false;
			}
		});

		// Validate custom select
		if (turnoverInput.value === '') {
			isFormValid = false;
		}

		// Enable/disable submit button
		if (submitBtn) {
			submitBtn.disabled = !isFormValid;
		}

		return isFormValid;
	};

	// Add event listeners to inputs
	inputs.forEach(input => {
		// Validate on blur
		input.addEventListener('blur', function () {
			if (this.value.trim() !== '') {
				validateField(this);
			}
			checkFormValidity();
		});

		// Check form validity on input
		input.addEventListener('input', function () {
			// Remove error state while typing
			this.classList.remove('error_input');
			const errorSpan = this.parentElement.querySelector('.error_message');
			if (errorSpan) {
				errorSpan.classList.add('hidden');
			}
			checkFormValidity();
		});
	});

	// Update custom select validation
	customSelects.forEach(select => {
		const options = select.querySelectorAll('.custom-option');
		options.forEach(option => {
			option.addEventListener('click', function () {
				// Remove error state when option is selected
				select.classList.remove('error_input');
				const selectWrapper = select.closest('.custom-select-wrapper');
				const errorSpan =
					selectWrapper.parentElement.querySelector('.error_message');
				if (errorSpan) {
					errorSpan.classList.add('hidden');
				}
				checkFormValidity();
			});
		});
	});

	// Form submission
	if (form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();

			let isValid = true;

			// Validate all inputs
			inputs.forEach(input => {
				if (!validateField(input)) {
					isValid = false;
				}
			});

			// Validate custom select
			if (!validateCustomSelect()) {
				isValid = false;
			}

			if (isValid) {
				console.log('Form is valid, submitting...');
				// Here you can add actual form submission logic
				// form.submit();
			} else {
				console.log('Form has errors');
			}
		});
	}

	// Initial check
	checkFormValidity();
});
