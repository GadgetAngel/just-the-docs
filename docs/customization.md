---
layout: default
title: Customization
nav_order: 6
---

# Customization
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Color schemes
{: .d-inline-block }

Just the Docs supports two color schemes: light (default), and dark.

To enable a color scheme, set the `color_scheme` parameter in your site's `_config.yml` file:

#### Example
{: .no_toc }

```yaml
# Color scheme supports "light" (default) and "dark"
color_scheme: dark
```

{% unless site.toggle_color_scheme and site.toggle_color_scheme != "nil"  %}
  {% if site.color_scheme == "light" %}

    {% capture button_html %}<button class="btn js-toggle-dark-mode">-> Dark Side</button>{% endcapture %}

  {% elsif site.color_scheme == "dark" %}

    {% capture button_html %}<button class="btn js-toggle-dark-mode">-> Light Side</button>{% endcapture %}

  {% else %}

    {% capture button_html %}<button class="btn js-toggle-dark-mode">-> Dark Side</button>{% endcapture %}

  {% endif %}

  {{ button_html }}

  <script>
  const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

  jtd.addEvent(toggleDarkMode, 'click', function() {
    if (jtd.getTheme() === 'dark') {
      {% if site.color_scheme != "light" or site.color_scheme != "dark" %}
        jtd.setTheme(document.documentElement.getAttribute('data-theme'));
        toggleDarkMode.textContent = '-> Dark Side';
      {% else %}
        jtd.setTheme('light');
        toggleDarkMode.textContent = '-> Dark Side';
      {% endif %}
    } else if (jtd.getTheme() === 'light') {
      {% if site.color_scheme != "light" or site.color_scheme != "dark" %}
        jtd.setTheme(document.documentElement.getAttribute('data-theme'));
        toggleDarkMode.textContent = '-> Dark Side';
      {% else %}
        jtd.setTheme('dark');
        toggleDarkMode.textContent = '-> Light Side';
      {% endif %}
    } else if (jtd.getTheme() === 'default') {
        {% if site.color_scheme == "light" %}
          td.setTheme('dark');
          toggleDarkMode.textContent = '-> Light Side';
        {% elsif site.color_scheme == "dark" %}
          jtd.setTheme('light');
          toggleDarkMode.textContent = '-> Dark Side';
        {% elsif site.color_scheme != "light" or site.color_scheme != "dark" %}
          jtd.setTheme('dark');
          toggleDarkMode.textContent = '-> Custom Color Side';
        {% endif %}
    } else {
        jtd.setTheme('dark');
        toggleDarkMode.textContent = '-> Custom Color Side';
    }
  });
  </script>
{% endunless %}

## Toggle between two schemes

New
{: .label .label-green }

```yaml
# Color scheme supports "dark", "light", and your custom schemes:
# color_scheme will be the color_scheme that will be the initial color scheme if toggle_auto_mode is nil
# If toggle_auto_mode is true, then the initial color scheme will be set by a window.matchMedia() and the
# users OS prference will be the initial color scheme.

# Color scheme supports "dark", "light", and your custom schemes:
# color_scheme: nil                # default: light
color_scheme: light                # default: light
# To add a button to switch all pages to switch color modes between color_scheme and toggle_color_scheme modes:
toggle_color_scheme: dark          # default: nil (no toggle button)
# To display the toggle button only on one page:
toggle_page_url: nil               # default: nil (display on all pages)

# To toggle automatically when the system mode preference changes - set toggle_auto_mode: true,
#    this will allow the user to force the default color mode for the site (i.e. the inital mode will be automatically
#    switched to which ever mode the user has set in OS preferences).  For toggle_auto_mode to work
#    as it should (meaning that the OS preference of light and dark mode has prescendance over the manual mode), so if you have
#    a manual mode switch button present you can temporaially change the mode to the opposite but once you
#    go to another page on the site or refresh you browser window the mode will switch to the OS preference you
#    set for your OS. If you want to switch modes you need to do it on you OS preferences or your system.
#    So the manual button is a temporary switch of mode. Once you are taken to a link off the site the mode will
#    depend on that exteranl web site's setup.
# To toggle the pages manually - set toggle_auto_mode: nil
#     With toggle_auto_mode set to nil then the OS preference is IGNORED and only the manual selection will
#     change the mode from dark to light.  This web site will always be initially displayed in the mode set by color_scheme.
#     The User will have to manully switch to the toggle_color_scheme mode.  Once the mode is switched it
#     will persist across web site pages and browser refreshs of the page until you change the mode back.
#     So the manual button is a persistanct switch of mode. Again, Once you are taken to a link off site the
#     mode will depend on that external web site's setup.
toggle_auto_mode: nil            # default: nil (manual toggle)

# To set the button text for toggling and reverting:
# toggle_text_1 is for light color scheme
toggle_text_1: "-> Dark Side" # default: "-> Dark Mode"
# toggle_text_2 is for dark color scheme
toggle_text_2: "-> Light Mode" # default: "-> Light Mode"
```

## Custom schemes

### Define a custom scheme

You can add custom schemes.
If you want to add a scheme named `foo` (can be any name) just add a file `_sass/color_schemes/foo.scss` (replace `foo` by your scheme name)
where you override theme variables to change colors, fonts, spacing, etc.

Available variables are listed in the [_variables.scss](https://github.com/pmarsceill/just-the-docs/tree/master/_sass/support/_variables.scss) file.

For example, to change the link color from the purple default to blue, include the following inside your scheme file:

#### Example
{: .no_toc }

```scss
$link-color: $blue-000;
```

_Note:_ Editing the variables directly in `_sass/support/variables.scss` is not recommended and can cause other dependencies to fail.
Please use scheme files.

### Use a custom scheme

To use the custom color scheme, only set the `color_scheme` parameter in your site's `_config.yml` file:
```yaml
color_scheme: foo
```

### Switchable custom scheme

If you want to be able to change the scheme dynamically, for example via javascript, just add a file `assets/css/just-the-docs-foo.scss` (replace `foo` by your scheme name)
with the following content:`

{% raw %}
    ---
    ---
    {% include css/just-the-docs.scss.liquid color_scheme="foo" %}
{% endraw %}

This allows you to switch the scheme via the following javascript.

```js
jtd.setTheme('foo');
```

## Override and completely custom styles

For styles that aren't defined as variables, you may want to modify specific CSS classes.
Additionally, you may want to add completely custom CSS specific to your content.
To do this, put your styles in the file `_sass/custom/custom.scss`.
This will allow for all overrides to be kept in a single file, and for any upstream changes to still be applied.

For example, if you'd like to add your own styles for printing a page, you could add the following styles.

#### Example
{: .no_toc }

```scss
// Print-only styles.
@media print {
  .side-bar, .page-header { display: none; }
  .main-content { max-width: auto; margin: 1em;}
}
```
