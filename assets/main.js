// You can put your individual, DOM-specific logic here.
window.stateCallback = () => {
	// Get the selected radio button
	let option = localStorage.getItem('other-option');

	// Toggle classes based on this
	if (option == 'first') {
		document.body.classList.add('first')
		document.body.classList.remove('second')
		document.body.classList.remove('third')
	}
	else if (option == 'second') {
		document.body.classList.remove('first')
		document.body.classList.add('second')
		document.body.classList.remove('third')
	}
	else {
		document.body.classList.remove('first')
		document.body.classList.remove('second')
		document.body.classList.add('third')
	}
}
