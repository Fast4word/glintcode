# 📘 GlintCode Documentation

Welcome to the official documentation for **GlintCode** ✨

GlintCode is a lightweight browser-based scripting language powered by JavaScript. It runs directly in the browser using:

```html
<script type="glint">
    print("Hello, Glint!")
</script>
```

---

# 🚀 Quick Start

## 1. Install Glint

```html
<script src="https://fast4word.github.io/glintcode/glint.js"></script>
```

## 2. Write your first program

```glint
print("Hello, World!")
```

---

# 🧠 Core Concepts

- No build tools  
- No compilation  
- Runs directly in the browser  
- Uses helper functions  

---

# ⚙️ Core Functions

## Output
- print(...)
- println(...)
- warn(...)
- error(...)

## Math
- random(min, max)
- round(n)
- floor(n)
- ceil(n)
- abs(n)

## Strings
- upper(text)
- lower(text)
- reverse(text)
- length(value)

## Arrays
- first(arr)
- last(arr)
- contains(arr, value)

## Time
- sleep(ms)
- now()

## Utilities
- type(value)
- str(value)
- num(value)
- bool(value)
- parseIntG(text)
- parseFloatG(text)

---

# 🌐 DOM API
- create(element, id, class)
- append(parent, child)
- text(element, value)
- html(element, value)
- style(element, prop, value)
- select(selector)
- selectAll(selector)
- on(element, event, fn)
- remove(element)
- clear(element)

---

# 🎨 UI Helpers
- page(title)
- title(text)
- heading(text, level)
- paragraph(text)
- button(text, callback)
- input(placeholder)
- image(src, alt)
- line()

---

# 🔁 Loops

## repeat()
Run a function a fixed number of times:

```glint
repeat(5, (i) => {
    print(i)
})
```

## forever()
Run continuously:

```glint
forever(() => {
    print("Running...")
})
```

---

# 📦 Modules

## Define a module
```javascript
Glint.module("math", {
    square(x) {
        return x * x;
    }
});
```

## Use a module
```glint
print(math.square(5))
```

---

# 🧪 Example Project: Calculator

```glint
page("Calculator")

let a = input("First number")
let b = input("Second number")

let result = paragraph("Result: 0")

button("Add", () => {
    text(result, "Result: " + (num(a.value) + num(b.value)))
})
```

---

# 📁 Project Structure

```
glintcode/
├── glint.js
├── README.md
├── docs.md
└── docs/
```

---

# 📜 License

GlintCode is open-source under GNU GPL v3.0.

---

Made with ❤️ for the browser.
