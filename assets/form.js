// Check for query/params in the URL
if (window.location.search) {
	let params = new URLSearchParams(window.location.search) // Parse them into a variable

	// Loop through each key/value pair
	params.forEach((value, key) => {
		let inputOrSelect = document.getElementById(key)

		if (inputOrSelect) {
			// Set the input to the param
			inputOrSelect.value = value
		} else {
			// Radios are a bit different, find them by `name` attribute
			document.querySelectorAll(`[name=${key}]`).forEach((element) => {
				// Check the one matching the param
				if (value == element.value) element.checked = true
			}
		)
		}
	})
}

// Clear any query/params from the URL
document.getElementById('reset-params').onclick = () => {
	window.history.replaceState(null, null, window.location.pathname)
}
