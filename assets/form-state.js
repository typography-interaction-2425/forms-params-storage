// Find your form
const formElement = document.querySelector('#some-form')

// Function to match the form to URL/stored params
const updateForm = (params) => {
	// Parse into params
	// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	params = new URLSearchParams(params)

	// Our friend, the loop
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	params.forEach((value, key) => {
		// Find them by their ID
		let inputOrSelect = document.getElementById(key)

		if (inputOrSelect) {
			// Set the actual input to the param value
			inputOrSelect.value = value
		} else {
			// Radios are a bit different, find them by `name` attribute
			document.querySelectorAll(`[name=${key}]`).forEach((element) => {
				// Check the one matching the param value
				if (value == element.value) element.checked = true
			}
		)
		}
	})

	// And a callback!
	window.stateCallback?.()
}

// Function to save them to localStorage
const storeParams = () => {
	// Get the form data
	// https://developer.mozilla.org/en-US/docs/Web/API/FormData
	let formParams = new FormData(formElement)

	// Loop through each key/value pair
	formParams.forEach((value, key) => {
		// And save them out
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
		localStorage.setItem(key, value)
	})
}

// Function to update the URL from the form
const updateUrlParams = () => {
	let formParams = new FormData(formElement) // Get the form data
	formParams = new URLSearchParams(formParams) // Make it into params
	formParams = formParams.toString() // And then into a string

	// You could also write this as:
	// let formParams = new URLSearchParams(new FormData(formElement)).toString()

	// Update the URL with the params at the end
	window.history.replaceState(null, null, '?' + formParams)

	// And also store them!
	storeParams()

	// And a callback!
	window.stateCallback?.()
}



// First, check for query/params in the URL
// https://developer.mozilla.org/en-US/docs/Web/API/Location/search
if (window.location.search) {
	let urlParams = window.location.search // Get the query string

	updateForm(urlParams) // Update the form from these
}
// Otherwise check for saved params in storage
else if (localStorage.length > 0) {
	let storedParams = Object.entries(localStorage) // Get the saved params

	updateForm(storedParams) // Update the form from these
}



// Don’t actually submit (which would refresh)
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
formElement.onsubmit = (event) => event.preventDefault()

// Run any time the form is modified
formElement.oninput = () => updateUrlParams()
