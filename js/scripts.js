(function() {
	const wordForm = document.querySelector('.word-form');
	const inputGroupText = document.querySelectorAll('.input-group-text');
	const textInputs = document.querySelectorAll('.form-control');
	const btnSearch = document.querySelector('.btn-primary');
	const btnReset = document.querySelector('.btn-secondary');
	const results = document.querySelector('.word-lookup-results');
	const tbContains = document.querySelector('input[name="contains"]');
	const tbLength = document.querySelector('input[name="length"]');

	// Init Poppers
	inputGroupText.forEach(text => {
		new bootstrap.Popover(text, {
			trigger: 'focus'
		});
	});

  // Search Button Event Listener
	btnSearch.addEventListener('click', (evt) => {
		formValuesCheck();
		wordForm.reset();
		enableFormFields();
	});

	// Reset Button Event Listener
	btnReset.addEventListener('click', (evt) => {
		wordForm.reset();
		enableFormFields();
		results.classList.add('d-none');
		results.innerHTML = '';
	});

	// Input Contains Change Listener 
	tbContains.addEventListener('keyup', (event) => {
		if (event.target.value.length === 1) {
			disabledNonContainsFields();
		}
		else if (event.target.value.length === 0) {
			enableFormFields();
		}
	});

	// Submit Form on Enter Key Press
	textInputs.forEach(input => {	
		input.addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();

				if (event.target.value) formValuesCheck();
			}
		});
	});

	// Starts With
	function startsWithHandler(val) {
		const regex = new RegExp('^' + val, 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		if (!val) return;

		displayResults(filtered);
	}

	// Ends With
	function endsWithHandler(val) {
		const regex = new RegExp(val + '$', 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		if (!val) return;

		displayResults(filtered);
	}

	// Contains
	function containsHandler(val) {
		const regUnderscore = new RegExp('_+', 'gi');
		const hasUnderscore = regUnderscore.test(val);
		const newVal = val.replaceAll('_', '.');
		const regex = new RegExp('^' + newVal + '$', 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		if (!hasUnderscore) return;
	
		displayResults(filtered);
	}	

	// Exclude
	function excludeHandler(val) {
		const strArr = val.split('').join(',');
		const regex = new RegExp('^(?!.*[' + strArr + ']).*$', 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		displayResults(filtered);
	}	

	// Include
	function includeHandler(val) {
		const valsArr = [];
		const strArr = val.split('');
		strArr.map(char => valsArr.push(`(?=\\w*${char})`));
		const regex = new RegExp(valsArr.join(''), 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		displayResults(filtered);
	}

	// Iterate Input Values to Begin Filtering
	function formValuesCheck() {
		textInputs.forEach(tb => {
			if (tb.value) {		
				initFilter(tb.getAttribute('name'), tb.value);
			}
		});
	}	

	// Run Filter Based on Input Name Value
	function initFilter(name, val) {
		switch(name) {
			case 'startsWith': 
				startsWithHandler(val);
				break;
			case 'endsWith': 
				endsWithHandler(val);
				break;
			case 'contains': 
				containsHandler(val);
				break;
			case 'exclude': 
				excludeHandler(val);
				break;
			case 'include': 
				includeHandler(val);
				break;
		}
	}

	function disabledNonContainsFields() {
		textInputs.forEach(input => {	
			input.disabled = true;
		});	

		tbContains.disabled = false;
		tbContains.focus();
	}

	function enableFormFields() {
		textInputs.forEach(input => {	
			input.disabled = false;
		});	

		length.disabled = true;
	}

	function displayResults(arr) {
		results.innerHTML = '';

		arr.map(item => {
			const div = document.createElement('div');
			div.classList.add('word-lookup-item');
			div.innerText = item.toLowerCase();
			results.append(div);
		});

		if (arr) results.classList.remove('d-none');
	}

	/* TODO 
	/* - cover more form scenarios (Starts With AND Ends With) */
})();