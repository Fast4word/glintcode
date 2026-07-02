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
* 📋 Form builder with validation
* 💾 Local storage helpers
* 🌐 HTTP request helpers
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

## Form Validation

### `validate(value, rules)`

Validates a value against a set of rules. Returns an object with `isValid` and `errors` array.

Available rules:
- `required` - Field cannot be empty
- `email` - Must be valid email format
- `minLength` - Minimum character length
- `maxLength` - Maximum character length
- `pattern` - Regular expression pattern
- `patternMessage` - Custom error message for pattern
- `min` - Minimum numeric value
- `max` - Maximum numeric value

```glint
let result = validate("user@example.com", {
    email: true,
    required: true
})

if (result.isValid) {
    print("Valid email!")
} else {
    print(result.errors[0])
}
```

---

## Local Storage

### `save(key, value)`

Saves a value to local storage. Automatically serializes to JSON.

```glint
save("username", "Alice")
save("userSettings", { theme: "dark", fontSize: 14 })
```

### `load(key)`

Loads a value from local storage. Automatically deserializes from JSON.

```glint
let username = load("username")
print(username)
```

### `deleteStorage(key)`

Deletes a specific key from local storage.

```glint
deleteStorage("username")
```

### `clearStorage()`

Clears all local storage.

```glint
clearStorage()
```

---

## HTTP Requests

### `httpGet(url, options)`

Makes a GET request.

```glint
let data = await httpGet("https://api.example.com/users")
print(data)
```

### `httpPost(url, data, options)`

Makes a POST request.

```glint
let result = await httpPost("https://api.example.com/users", {
    name: "John",
    email: "john@example.com"
})
print(result)
```

### `httpPut(url, data, options)`

Makes a PUT request.

```glint
let result = await httpPut("https://api.example.com/users/1", {
    name: "Jane"
})
```

### `httpDelete(url, options)`

Makes a DELETE request.

```glint
let result = await httpDelete("https://api.example.com/users/1")
```

---

## Form Builder

The `formBuilder` function creates interactive forms with built-in validation and styling.

### Basic Usage

```glint
let form = formBuilder({
    submitText: "Register",
    onSubmit: (data) => {
        print("Form submitted:", data)
        save("userForm", data)
    }
})

form
    .addText("username", "Username", { required: true })
    .addEmail("email", "Email", { required: true })
    .addPassword("password", "Password", { required: true, minLength: 8 })
    .addNumber("age", "Age", { min: 18, max: 120 })
    .render(document.body)
```

### Form Builder Methods

#### `addText(name, label, options)`

Adds a text input field.

```glint
form.addText("name", "Full Name", {
    placeholder: "Enter your name",
    required: true,
    rules: { minLength: 2, maxLength: 100 }
})
```

#### `addEmail(name, label, options)`

Adds an email input field with email validation.

```glint
form.addEmail("email", "Email Address", { required: true })
```

#### `addPassword(name, label, options)`

Adds a password input field.

```glint
form.addPassword("password", "Password", {
    required: true,
    rules: { minLength: 8 }
})
```

#### `addNumber(name, label, options)`

Adds a number input field.

```glint
form.addNumber("age", "Age", {
    min: 18,
    max: 100
})
```

#### `addTextarea(name, label, options)`

Adds a textarea field.

```glint
form.addTextarea("bio", "Biography", {
    rows: 5,
    placeholder: "Tell us about yourself"
})
```

#### `addSelect(name, label, options)`

Adds a select dropdown field.

```glint
form.addSelect("country", "Country", {
    choices: [
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" }
    ]
})
```

#### `addCheckbox(name, label, options)`

Adds a checkbox field.

```glint
form.addCheckbox("terms", "I agree to the terms", {
    required: true
})
```

#### `addRadio(name, label, options)`

Adds radio button fields.

```glint
form.addRadio("subscription", "Subscription Type", {
    choices: [
        { value: "free", label: "Free" },
        { value: "pro", label: "Pro" },
        { value: "enterprise", label: "Enterprise" }
    ]
})
```

#### `render(parentSelector)`

Renders the form to the DOM.

```glint
let formElement = form.render()
append(document.body, formElement)

// Or pass a selector
form.render(document.body)
```

#### `getData()`

Gets the current form data as an object.

```glint
let data = form.getData()
print(data)
```

#### `reset()`

Resets all form fields to empty values.

```glint
form.reset()
```

#### `setValues(data)`

Populates form fields with values.

```glint
form.setValues({
    username: "alice",
    email: "alice@example.com"
})
```

### Complete Form Example

```glint
page("Registration Form")

let form = formBuilder({
    submitText: "Create Account",
    onSubmit: (data) => {
        print("Account created:", data)
        save("user", data)
        alertBox("Welcome, " + data.username + "!")
    }
})

form
    .addText("username", "Username", { 
        required: true, 
        rules: { minLength: 3, maxLength: 20 } 
    })
    .addEmail("email", "Email", { required: true })
    .addPassword("password", "Password", { 
        required: true, 
        rules: { minLength: 8 } 
    })
    .addPassword("confirm", "Confirm Password", { required: true })
    .addNumber("age", "Age", { min: 13, max: 120 })
    .addSelect("country", "Country", {
        choices: ["USA", "Canada", "UK", "Other"]
    })
    .addCheckbox("terms", "I agree to the Terms & Conditions", { required: true })
    .addRadio("newsletter", "Newsletter", {
        choices: [
            { value: "yes", label: "Yes, subscribe me" },
            { value: "no", label: "No thanks" }
        ]
    })
    .render(document.body)
```

---

## DOM Helpers

### `create(element, id, class)`

Creates an HTML element.

```glint
create("h1", "title", "hero")
```

### `append(parent, child)`

Appends a child element.

```glint
append(document.body, title)
```

### `text(element, value)`

Sets text content.

```glint
text(title, "Hello!")
```

### `html(element, value)`

Sets HTML.

```glint
html(title, "<b>Hello</b>")
```

### `style(element, property, value)`

Changes CSS.

```glint
style(title, "color", "blue")
```

### `select(selector)`

Returns the first matching element.

```glint
let box = select("#box")
```

### `selectAll(selector)`

Returns all matching elements.

```glint
let buttons = selectAll("button")
```

### `on(element, event, callback)`

Adds an event listener.

```glint
on(button, "click", () => {
    print("Clicked!")
})
```

### `remove(element)`

Removes an element.

```glint
remove(title)
```

### `clear(element)`

Removes all children.

```glint
clear(document.body)
```

---

## UI Helpers

### `heading(text, level)`

Creates and appends a heading.

```glint
heading("Welcome", 1)
```

### `paragraph(text)`

Creates a paragraph.

```glint
paragraph("Hello!")
```

### `button(text, callback)`

Creates a button.

```glint
button("Click Me", () => {
    print("Clicked")
})
```

### `image(src, alt)`

Creates an image.

```glint
image("logo.png", "Logo")
```

### `input(placeholder)`

Creates a text input.

```glint
input("Enter your name")
```

### `line()`

Creates a horizontal rule.

```glint
line()
```

---

## Page Helpers

### `title(text)`

Changes the page title.

```glint
title("Glint Documentation")
```

### `page(text)`

Sets the page title and creates a main heading.

```glint
page("GlintCode")
```

---

## Loop Helpers

### `repeat(times, callback)`

Runs a callback a fixed number of times.

```glint
repeat(5, (i) => {
    print(i)
})
```

### `forever(callback)`

Runs a callback every animation frame. Returns a control object with a `stop()` method.

```glint
let loop = forever(() => {
    print("Running")
})

// Later...
await sleep(5000)
loop.stop()
```

---

GlintCode is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

---
