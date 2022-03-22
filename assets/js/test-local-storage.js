const theme = localStorage.getItem('theme');
const theme_html = document.documentElement.getAttribute('data-theme');

function testLocalStorage() {
    const storageAvailable = false;
    //let's see if local storage is
    // really available to use
    // try to set and remove an item from local storage
    // if storageAvailable gets set to true then an exception was not thrown
    // and local storage is good to use.
    // https://gist.github.com/paulirish/5558557
	if ("localStorage" in window) {
		try {
			window.localStorage.setItem('_tmptest', 'temp');
			window.localStorage.removeItem('_tmptest');
            storageAvailable = true;
		} catch(e) {console.log("Either window.localStorage.setItem() or window.localStorage.removeItem() threw an Exception!");}
	}
    return storageAvailable;
}