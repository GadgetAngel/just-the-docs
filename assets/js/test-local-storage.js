function testLocalStorage() {
    const storageAvailable = false;
    // let's see if local storage is
    // really available to use
    // try to set and remove an item from local storage
    // if storageAvailable gets set to true then an exception was not thrown
    // https://gist.github.com/paulirish/5558557
	if ("localStorage" in window) {
		try {
			window.localStorage.setItem('_tmptest', 'temp');
            storageAvailable = true;
			window.localStorage.removeItem('_tmptest');
		} catch(e) {
            if (storageAvailable === true) {
                console.log("Exception, BUT setItem() WORKED!");
            } else {
                console.log("Exception!");
                if e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    (storage && storage.length !== 0);
            }
        } finally {
            debugger;
            console.log("Exception! emessage=["+e.message+"]");
            return storageAvailable;
        }
	}
    return storageAvailable;
}