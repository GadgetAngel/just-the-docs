---
title: Dark Code
parent: Color
---

# Dark Code

The following button toggles between the `light` and `dark` color schemes on this page:

{% unless site.toggle_color_scheme and site.toggle_color_scheme != "nil" %}

  {% if site.color_scheme == "light" %}

    {% capture button_html %}<button class="btn js-toggle-dark-mode">Preview dark color scheme</button>{% endcapture %}

  {% elsif site.color_scheme == "dark" %}

    {% capture button_html %}<button class="btn js-toggle-dark-mode">Preview light color scheme</button>{% endcapture %}

  {% else %}

    {% capture button_html %}<button class="btn js-toggle-dark-mode">Preview dark color scheme</button>{% endcapture %}

  {% endif %}

  {{ button_html }}

  <script>
  const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

  jtd.addEvent(toggleDarkMode, 'click', function() {
    if (jtd.getTheme() === 'dark') {
      {% if site.color_scheme != "light" or site.color_scheme != "dark" %}
        jtd.setTheme(document.documentElement.getAttribute('data-theme'));
        toggleDarkMode.textContent = 'Preview dark color scheme';
      {% else %}
        jtd.setTheme('light');
        toggleDarkMode.textContent = 'Preview dark color scheme';
      {% endif %}
    } else if (jtd.getTheme() === 'light') {
      {% if site.color_scheme != "light" or site.color_scheme != "dark" %}
        jtd.setTheme(document.documentElement.getAttribute('data-theme'));
        toggleDarkMode.textContent = 'Preview dark color scheme';
      {% else %}
        jtd.setTheme('dark');
        toggleDarkMode.textContent = 'Return to the light side';
      {% endif %}
    } else if (jtd.getTheme() === 'default') {
        {% if site.color_scheme == "light" %}
          td.setTheme('dark');
          toggleDarkMode.textContent = 'Return to the light side';
        {% elsif site.color_scheme == "dark" %}
          jtd.setTheme('light');
          toggleDarkMode.textContent = 'Preview dark color scheme';
        {% elsif site.color_scheme != "light" or site.color_scheme != "dark" %}
          jtd.setTheme('dark');
          toggleDarkMode.textContent = 'Return to custom color scheme';
        {% endif %}
    } else {
        jtd.setTheme('dark');
        toggleDarkMode.textContent = 'Return to custom color scheme';
    }
  });
  </script>
{% endunless %}

## Dark color scheme

When previewing this page with the `dark` color scheme:, code highlighting uses the [Pygments](https://stylishthemes.github.io/Syntax-Themes/pygments/) theme *Tomorrow Night*.

An example of Ruby code:

```ruby
def power(x,n)
  result = 1
  while n.nonzero?
    if n[0].nonzero?
      result *= x
      n -= 1
    end
    x *= x
    n /= 2
  end
  return result
end

def f(x)
  Math.sqrt(x.abs) + 5*x ** 3
end

(0...11).collect{ gets.to_i }.reverse.each do |x|
  y = f(x)
  puts "#{x} #{y.infinite? ? 'TOO LARGE' : y}"
end
# Map color names to short hex
COLORS = { :black   => "000",
           :red     => "f00",
           :green   => "0f0",
           :yellow  => "ff0",
           :blue    => "00f",
           :magenta => "f0f",
           :cyan    => "0ff",
           :white   => "fff" }

class String
  COLORS.each do |color,code|
    define_method "in_#{color}" do
      "<span style=\"color: ##{code}\">#{self}</span>"
    end
  end
end
```
