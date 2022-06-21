(function() {
	const inputGroupText = document.querySelectorAll('.input-group-text');
	const textInputs = document.querySelectorAll('.form-control');
	const btnSearch = document.querySelector('.btn-primary');

	// Init Poppers
	inputGroupText.forEach(text => {
		new bootstrap.Popover(text, {
			trigger: 'focus'
		});
	});

  // Search Button Event Listener
	btnSearch.addEventListener('click', (evt) => {
		formValuesCheck();
	});

	// Starts With
	function startsWithHandler(val) {
		const regex = new RegExp('^' + val, 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		if (!val) return;

		console.log('Starts With', filtered);
	}

	// Ends With
	function endsWithHandler(val) {
		const regex = new RegExp(val + '$', 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		if (!val) return;

		console.log('Ends With', filtered);
	}

	// Contains
	function containsHandler(val) {
		const regUnderscore = new RegExp('_+', 'gi');
		const hasUnderscore = regUnderscore.test(val);
		const newVal = val.replaceAll('_', '.');
		const regex = new RegExp('^' + newVal + '$', 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));

		if (!hasUnderscore) return;
	
		console.log('Contains', filtered);
	}	

	// Exclude
	function excludeHandler(val) {
		const strArr = val.split('').join(',');
		const regex = new RegExp('^(?!.*[' + strArr + ']).*$', 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));
		console.log('Excluded', filtered);
	}	

	// Include
	function includeHandler(val) {
		const valsArr = [];
		const strArr = val.split('');
		strArr.map(char => valsArr.push(`(?=\\w*${char})`));
		const regex = new RegExp(valsArr.join(''), 'i');
		const filtered = fiveLetterWords.filter(word => regex.test(word));
		console.log('Include', filtered);
	}

	// Iterate Input Values to Begin Filtering
	function formValuesCheck() {
		textInputs.forEach(tb => {
			if (tb.value) initFilter(tb.getAttribute('name'), tb.value);
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

	/* TODO 
	/* - cover more form scenarios (Starts With AND Ends With)
	/* - consider disabling other input fields while entering values and underscores in 'Contains' field
	/* - finish up the copy in the helper pop ups
	/* - restore the reset button
	/* - display the matched words below the form container after running a search
})();