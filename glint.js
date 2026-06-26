// Output
function print(...args) {
    console.log(...args);
}

function println(...args) {
    console.log(...args);
}

function error(...args) {
    console.error(...args);
}

function warn(...args) {
    console.warn(...args);
}

// Dialogs
function alertBox(text) {
    alert(text);
}

function promptBox(text, def = "") {
    return prompt(text, def);
}

function confirmBox(text) {
    return confirm(text);
}

// Math
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function round(n) {
    return Math.round(n);
}

function floor(n) {
    return Math.floor(n);
}

function ceil(n) {
    return Math.ceil(n);
}

function abs(n) {
    return Math.abs(n);
}

// Strings
function upper(text) {
    return String(text).toUpperCase();
}

function lower(text) {
    return String(text).toLowerCase();
}

function length(value) {
    return value.length;
}

function reverse(text) {
    return String(text).split("").reverse().join("");
}

// Arrays
function first(arr) {
    return arr[0];
}

function last(arr) {
    return arr[arr.length - 1];
}

function contains(arr, value) {
    return arr.includes(value);
}

// Time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function now() {
    return Date.now();
}

// Utilities
function type(value) {
    return typeof value;
}

function parseIntG(text) {
    return parseInt(text);
}

function parseFloatG(text) {
    return parseFloat(text);
}

function str(value) {
    return String(value);
}

function num(value) {
    return Number(value);
}

function bool(value) {
    return Boolean(value);
}
// ======================
// DOM Helpers
// ======================

function append(parent, child) {
    parent.appendChild(child);
}

function text(element, value) {
    element.textContent = value;
}

function html(element, value) {
    element.innerHTML = value;
}

function style(element, property, value) {
    element.style[property] = value;
}

function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return [...document.querySelectorAll(selector)];
}

function on(element, event, callback) {
    element.addEventListener(event, callback);
}

function remove(element) {
    element.remove();
}

function clear(element) {
    element.innerHTML = "";
}

// ======================
// UI Helpers
// ======================

function heading(textValue, level = 1) {
    const h = document.createElement("h" + level);
    h.textContent = textValue;
    document.body.appendChild(h);
    return h;
}

function paragraph(textValue) {
    const p = document.createElement("p");
    p.textContent = textValue;
    document.body.appendChild(p);
    return p;
}

function button(textValue, onclick) {
    const btn = document.createElement("button");
    btn.textContent = textValue;

    if (onclick)
        btn.onclick = onclick;

    document.body.appendChild(btn);

    return btn;
}

function image(src, alt = "") {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    document.body.appendChild(img);
    return img;
}

function input(placeholder = "") {
    const inp = document.createElement("input");
    inp.placeholder = placeholder;
    document.body.appendChild(inp);
    return inp;
}

function line() {
    const hr = document.createElement("hr");
    document.body.appendChild(hr);
    return hr;
}

// ======================
// Page Helpers
// ======================

function title(textValue) {
    document.title = textValue;
}

function page(textValue) {
    title(textValue);
    heading(textValue, 1);
}

document.querySelectorAll('script[type="glint"]').forEach(script => {
    new Function(script.textContent)();
});
