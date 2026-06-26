# GlintCode

> A lightweight scripting language for the web powered by JavaScript.

GlintCode is a scripting language that runs directly in the browser. Simply include `glint.js` and write your code inside `<script type="glint">` tags.

## Features

* 🚀 No build step
* 🌐 Runs directly in the browser
* 📦 Single JavaScript file
* 🛠️ Easily extendable with custom built-in functions
* ⚡ Powered by JavaScript

## Installation

Download or clone the repository and include `glint.js` in your HTML.

```html
<script src="glint.js"></script>
```

Or link to the latest version automatically.

```html
<script src="https://fast4word.github.io/glintcode/glint.js"></script>
```

## Hello World

```html
<script type="glint">
print("Hello, Glint!")
</script>
```

## Example

```html
<script src="glint.js"></script>

<script type="glint">
let number = random(1, 100)

print("Random number:")
print(number)

if (number > 50) {
    print("Large number!")
}
</script>
```

## Built-in Functions

Some built-in functions include:

* `print(...)`
* `println(...)`
* `random(min, max)`
* `upper(text)`
* `lower(text)`
* `length(value)`
* `first(array)`
* `last(array)`
* `contains(array, value)`
* `alertBox(text)`
* `promptBox(text)`
* `confirmBox(text)`

More functions will be added over time.

## Creating Your Own Functions

Glint is fully extensible. Add new functions in `glint.js`:

```javascript
function square(x) {
    return x * x;
}
```

Then use them in your Glint code:

```glint
print(square(5))
```

## Philosophy

GlintCode aims to be:

* Simple
* Lightweight
* Easy to learn
* Easy to extend
* Browser-first

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).
