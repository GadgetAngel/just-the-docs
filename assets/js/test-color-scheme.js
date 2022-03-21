---
---

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
		} catch(e) {}
	}
    return storageAvailable;
}

function testColorScheme() {
    const inital_theme = localStorage.getItem('theme');
    const inital_theme_html = document.documentElement.getAttribute('data-theme');
    var last_Savedmode;
    if (inital_theme !== inital_theme_html) {
         // local storage and html data-theme attribute are out of sync.
        if (testLocalStorage()) {
            window.localStorage.setItem('theme', inital_theme_html);
		} else {
            console.log("window.localStorage for data-theme attribute is NOT AVAILABLE!");
            //set the data-theme in html header to match the last saved mode 
            // apparently windows.localStorage is not always available.
                if (last_Savedmode !== undefined) {
                    document.documentElement.setAttribute('data-theme', last_Savedmode);
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                }
        }
    } else {
        last_Savedmode = inital_theme;
    }
return;
}
