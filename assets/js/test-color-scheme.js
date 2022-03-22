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
		} catch(e) {console.log("Either window.localStorage.setItem() or window.localStorage.removeItem() threw an Exception!");}
	}
    return storageAvailable;
}

function testColorScheme() {
    const theme = localStorage.getItem('theme');
    const theme_html = document.documentElement.getAttribute('data-theme');
    //debugger;
    var last_Savedmode;
    if (theme !== theme_html) {
         // local storage and html data-theme attribute are out of sync.
        if (testLocalStorage()) {
            window.localStorage.setItem('theme', theme_html);
            if (theme === "dark") {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
              else
              {
                document.documentElement.setAttribute('data-theme', 'light');
              }
		} else {
            console.log("window.localStorage for data-theme attribute is NOT AVAILABLE!");
            //set the data-theme in html header to match the last saved mode 
            // apparently windows.localStorage is not always available.
            if (last_Savedmode !== undefined) {
                document.documentElement.setAttribute('data-theme', last_Savedmode);
            } else {
                document.documentElement.setAttribute('data-theme', '{{ site.color_scheme}}');
            }
            // try to save anyways because the window.localStorage.removeItem 
            // could have thrown exeception even tho window.localStorage.setItem
            // works
            try {
                window.localStorage.setItem('theme', theme_html);
            } catch(e) {console.log("window.localStorage.setItem() threw an Exception!");}
        }
    } else {
        last_Savedmode = theme;
        if (theme === "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === "light") {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            {% if site.color_scheme != nil and site.color_scheme != 'nil' %} //site color as a value
                {% if site.toggle_color_scheme != nil and site.toggle_color_scheme != 'nil' %}
                // site color has a value and toggle color has a value
                // check to see which on is not dark or light
                    {% if site.color_scheme == 'black' or site.color_scheme == 'white' %}
                        {% if site.toggle_color_scheme != 'black' and site.toggle_color_scheme != 'white' %}
                            document.documentElement.setAttribute('data-theme', '{{ site.toggle_color_scheme }}');
                        {% else %}
                            document.documentElement.setAttribute('data-theme', '{{ site.color_scheme }}');
                        {% endif %}
                    {% else %}
                        {% if site.toggle_color_scheme == 'black' or site.toggle_color_scheme == 'white' %}
                            document.documentElement.setAttribute('data-theme', '{{ site.color_scheme }}');
                        {% else %}
                            document.documentElement.setAttribute('data-theme', '{{ site.color_scheme }}');
                        {% endif %}
                    {% endif %}
                {% else %}
                    document.documentElement.setAttribute('data-theme', '{{ site.color_scheme }}');
                {% endif %}
            {% elsif site.toggle_color_scheme != nil and site.toggle_color_scheme != 'nil' %}
                    document.documentElement.setAttribute('data-theme', '{{ site.toggle_color_scheme }}');
            {% endif %}
        }
    }
return;
}
