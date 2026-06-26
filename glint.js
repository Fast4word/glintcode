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

document.querySelectorAll('script[type="glint"]').forEach(script => {
    new Function(script.textContent)();
});
