🚀 Quick Start
1. Install Glint
<script src="https://fast4word.github.io/glintcode/glint.js"></script>
Give feedback
2. Write your first program
print("Hello, World!")
🧠 Core Concepts

Glint is built on JavaScript but provides a simpler API.

No build tools
No compilation
Runs directly in the browser
Uses helper functions
⚙️ Core Functions
Output
print(...) → log output
println(...) → log with line
warn(...) → warning
error(...) → error log
Math
random(min, max)
round(n)
floor(n)
ceil(n)
abs(n)
Strings
upper(text)
lower(text)
reverse(text)
length(value)
Arrays
first(arr)
last(arr)
contains(arr, value)
Time
sleep(ms)
now()
Utilities
type(value)
str(value)
num(value)
bool(value)
parseIntG(text)
parseFloatG(text)
🌐 DOM API
create(element, id, class)
append(parent, child)
text(element, value)
html(element, value)
style(element, prop, value)
select(selector)
selectAll(selector)
on(element, event, fn)
remove(element)
clear(element)
🎨 UI Helpers
page(title)
title(text)
heading(text, level)
paragraph(text)
button(text, callback)
input(placeholder)
image(src, alt)
line()
🔁 Loops
repeat()

Run a function a fixed number of times:

repeat(5, (i) => {
    print(i)
})
forever()

Run continuously (animation frame loop):

forever(() => {
    print("Running...")
})
📦 Modules

Glint supports optional JavaScript modules.

Define a module
Glint.module("math", {
    square(x) {
        return x * x;
    }
});
Use a module
print(math.square(5))
🧪 Example Project: Calculator
page("Calculator")

let a = input("First number")
let b = input("Second number")

let result = paragraph("Result: 0")

button("Add", () => {
    text(result, "Result: " + (num(a.value) + num(b.value)))
})
📁 Project Structure
glintcode/
├── glint.js
├── README.md
├── docs.md
└── docs/
    (optional expanded documentation site)
📜 License

GlintCode is open-source under the GNU GPL v3.0 license.
