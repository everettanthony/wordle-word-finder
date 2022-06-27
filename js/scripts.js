(function() {
	const wordForm = document.querySelector('.word-form');
	const inputGroupText = document.querySelectorAll('.input-group-text');
	const textInputs = document.querySelectorAll('.form-control:not([disabled])');
	const btnSearch = document.querySelector('.btn-primary');
	const btnReset = document.querySelector('.btn-secondary');
	const wordCount = document.querySelector('.word-lookup-count span');
	const results = document.querySelector('.word-lookup-results');
	const tbContains = document.querySelector('input[name="contains"]');
	const tbLength = document.querySelector('input[name="length"]');

	let filtersObj = {
		startsWith: '',
		endsWith: '',
		containsVal: '',
		excludeVal: '',
		includeVal: ''
	};

	// Init Poppers
	inputGroupText.forEach(text => {
		new bootstrap.Popover(text, {
			trigger: 'focus'
		});
	});

  // Search Button Event Listener
	btnSearch.addEventListener('click', (evt) => {
		formValuesCheck();
		validateFilters();
		resetFiltersObj();
	});

	// Reset Button Event Listener
	btnReset.addEventListener('click', (evt) => {
		wordForm.reset();
		resetFiltersObj();
		results.classList.add('d-none');
		results.innerHTML = '';
		wordCount.textContent = '0';
		wordCount.parentElement.classList.add('d-none');
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

	/************
	The Filters
	************/
	
	// Starts With
	function startsWithHandler(val) {
		const regex = val ? `^${val}` : '';
		filtersObj.startsWith = regex;
	}

	// Ends With
	function endsWithHandler(val) {
		const regex = val ? `${val}$` : '';
		filtersObj.endsWith = regex;
	}

	// Contains
	function containsHandler(val) {
		const regUnderscore = new RegExp('_+', 'gi');
		const hasUnderscore = regUnderscore.test(val);
		const regex = val ? `^${val.replaceAll('_', '.')}$` : '';

		if (!hasUnderscore) {
			includeHandler(val);
			return;
		};

		filtersObj.containsVal = regex;
	}	

	// Exclude
	function excludeHandler(val) {
		const strArr = val.split('').join(',');
		const regex = strArr ? `^(?!.*[${strArr}]).*$` : '';
		filtersObj.excludeVal = regex;
	}	

	// Include
	function includeHandler(val) {
		const valsArr = [];
		const strArr = val.split('');
		strArr.map(char => valsArr.push(`(?=\\w*${char})`));
		const regex = strArr ? valsArr.join('') : '';
		filtersObj.includeVal = regex;
	}

	// Iterate Input Values to Begin Filtering
	function formValuesCheck() {
		let formIsDirty = false;

		textInputs.forEach(tb => {
			if (tb.value) {		
				initFilter(tb.getAttribute('name'), tb.value);
				formIsDirty = true;
			}
		});

		if (!formIsDirty) displayFormError();
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

	// Display the filtered results below the form
	function displayResults(arr) {
		results.innerHTML = '';

		if (!arr.length) results.innerHTML = '<div class="error">No words found. Try again.</div>';

		arr.map(item => {
			const div = document.createElement('div');
			div.classList.add('word-lookup-item');
			
			div.innerText = item.toLowerCase();
			results.append(div);
		});

		if (arr) results.classList.remove('d-none');
	}

	// Error handling message
	function displayFormError() {
		results.innerHTML = '<div class="error">No words found. Try again.</div>';
		results.classList.remove('d-none');
	}

	// Cycle through the filters to find matches based on user input
	function validateFilters() {
		const filtered = fiveLetterWords
			.filter(word => word.toLowerCase().match(filtersObj.startsWith))
			.filter(word => word.toLowerCase().match(filtersObj.endsWith))
			.filter(word => word.toLowerCase().match(filtersObj.containsVal))
			.filter(word => word.toLowerCase().match(filtersObj.excludeVal))
			.filter(word => word.toLowerCase().match(filtersObj.includeVal));

		wordCount.textContent = filtered.length;
		wordCount.parentElement.classList.remove('d-none');

		displayResults(filtered);
	}
	
	// Rest the filters object
	function resetFiltersObj() {
		filtersObj = {
			startsWith: '',
			endsWith: '',
			containsVal: '',
			excludeVal: '',
			includeVal: ''
		};
	}
})();