# ✨ GlintCode

> A lightweight browser scripting language powered by JavaScript.

GlintCode lets you write code inside a simple `<script type="glint">` tag. The Glint runtime executes your code directly in the browser while providing a clean standard library for output, math, strings, arrays, DOM manipulation, and more.

---

# Features

* 🚀 No build step
* 🌐 Runs directly in the browser
* 📦 Single runtime (`glint.js`)
* 🧩 Extendable with modules
* 🎨 Built-in DOM helpers
* ⚡ Powered by JavaScript

---

# Installation

Include the Glint runtime.

```html
<script src="https://fast4word.github.io/glintcode/glint.js"></script>
```

Then create a Glint script.

```html
<script type="glint">
print("Hello, Glint!")
</script>
```

---

# Hello World

```glint
print("Hello, World!")
```

---

# Modules

Glint supports optional modules loaded from a project-level `.glint` file.

Example `.glint`:

```text
math.js
ui.js
storage.js
```

Example module:

```javascript
Glint.module("math", {

    square(x) {
        return x * x;
    },

    cube(x) {
        return x * x * x;
    }

});
```

Use it in Glint:

```glint
print(math.square(5))
```

---

# Documentation

## Output

### `print(...args)`

Prints values to the browser console.

```glint
print("Hello")
```

### `println(...args)`

Prints values followed by a new line.

```glint
println("Hello")
```

### `warn(...args)`

Prints a warning.

```glint
warn("Warning!")
```

### `error(...args)`

Prints an error.

```glint
error("Something went wrong")
```

---

## Dialogs

### `alertBox(text)`

Displays an alert.

```glint
alertBox("Hello!")
```

### `promptBox(text, default)`

Displays a prompt.

```glint
let name = promptBox("Name?")
```

### `confirmBox(text)`

Displays a confirmation dialog.

```glint
if (confirmBox("Continue?")) {
    print("Confirmed")
}
```

---

## Math

### `random(min, max)`

Returns a random integer.

```glint
print(random(1, 100))
```

### `round(number)`

Rounds a number.

### `floor(number)`

Rounds down.

### `ceil(number)`

Rounds up.

### `abs(number)`

Returns the absolute value.

---

## Strings

### `upper(text)`

Converts text to uppercase.

```glint
print(upper("glint"))
```

### `lower(text)`

Converts text to lowercase.

### `length(value)`

Returns the length of a string or array.

```glint
print(length("Hello"))
```

### `reverse(text)`

Reverses text.

```glint
print(reverse("Glint"))
```

---

## Arrays

### `first(array)`

Returns the first item.

```glint
print(first([1,2,3]))
```

### `last(array)`

Returns the last item.

```glint
print(last([1,2,3]))
```

### `contains(array, value)`

Checks if an array contains a value.

```glint
contains([1,2,3], 2)
```

---

## Time

### `sleep(milliseconds)`

Waits asynchronously.

```glint
await sleep(1000)
```

### `now()`

Returns the current Unix timestamp.

```glint
print(now())
```

---

## Utilities

### `type(value)`

Returns the JavaScript type.

```glint
print(type(123))
```

### `parseIntG(text)`

Converts text to an integer.

### `parseFloatG(text)`

Converts text to a decimal.

### `str(value)`

Converts a value to a string.

### `num(value)`

Converts a value to a number.

### `bool(value)`

Converts a value to a boolean.

---

# DOM Helpers

## `create(element, id, class)`

Creates an HTML element.

```glint
create("h1", "title", "hero")
```

---

## `append(parent, child)`

Appends a child element.

```glint
append(document.body, title)
```

---

## `text(element, value)`

Sets text content.

```glint
text(title, "Hello!")
```

---

## `html(element, value)`

Sets HTML.

```glint
html(title, "<b>Hello</b>")
```

---

## `style(element, property, value)`

Changes CSS.

```glint
style(title, "color", "blue")
```

---

## `select(selector)`

Returns the first matching element.

```glint
let box = select("#box")
```

---

## `selectAll(selector)`

Returns all matching elements.

```glint
let buttons = selectAll("button")
```

---

## `on(element, event, callback)`

Adds an event listener.

```glint
on(button, "click", () => {
    print("Clicked!")
})
```

---

## `remove(element)`

Removes an element.

```glint
remove(title)
```

---

## `clear(element)`

Removes all children.

```glint
clear(document.body)
```

---

# UI Helpers

## `heading(text, level)`

Creates and appends a heading.

```glint
heading("Welcome", 1)
```

---

## `paragraph(text)`

Creates a paragraph.

```glint
paragraph("Hello!")
```

---

## `button(text, callback)`

Creates a button.

```glint
button("Click Me", () => {
    print("Clicked")
})
```

---

## `image(src, alt)`

Creates an image.

```glint
image("logo.png", "Logo")
```

---

## `input(placeholder)`

Creates a text input.

```glint
input("Enter your name")
```

---

## `line()`

Creates a horizontal rule.

```glint
line()
```

---

# Page Helpers

## `title(text)`

Changes the page title.

```glint
title("Glint Documentation")
```

---

## `page(text)`

Sets the page title and creates a main heading.

```glint
page("GlintCode")
```

---

# Loop Helpers

## `repeat(times, callback)`

Runs a callback a fixed number of times.

```glint
repeat(5, (i) => {
    print(i)
})
```

---

## `forever(callback)`

Runs a callback every animation frame until stopped.

```glint
let loop = forever(() => {
    print("Running")
})

// Later...
loop.stop()
```

---



GlintCode is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

---

