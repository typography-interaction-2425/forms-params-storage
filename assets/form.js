// First, check for query/params in the URL
if (window.location.search) {
	// Parse them into a variable
	let urlParams = new URLSearchParams(window.location.search)

	// Loop through each key/value pair
	urlParams.forEach((value, key) => {
		// Find them by their ID
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



// Find your form
const formElement = document.querySelector('form')

// Function to update the URL from the form
const updateQueryString = () => {
	let formParams = new FormData(formElement) // Get the form data

	formParams = new URLSearchParams(formParams) // Make it into params
	formParams = formParams.toString() // And then into a string.

	// You could also write this as:
	// let formParams = new URLSearchParams(new FormData(formElement)).toString()

	// Update the URL with the params at the end
	window.history.replaceState(null, null, '?' + formParams)
}

// When the form is submitted
formElement.onsubmit = () => {
	event.preventDefault() // Don’t actually submit (which would refresh)

	updateQueryString() // But update the query string
}

// Or even any time it is modified!
formElement.oninput = () => updateQueryString()



// Clear any query/params from the URL
document.getElementById('reset-params').onclick = () => {
	window.history.replaceState(null, null, window.location.pathname)
}
