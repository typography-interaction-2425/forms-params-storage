// Clear any query/params from the URL.
document.getElementById('reset-params').onclick = () => {
	window.history.replaceState(null, null, window.location.pathname)
}
