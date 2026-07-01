const Glint = {
    modules: {},

    module(name, functions) {
        this.modules[name] = functions;
        window[name] = functions;
    }
};
async function loadModules() {
    try {
        const response = await fetch(".glint");

        if (!response.ok)
            return;

        const config = await response.text();

        const files = config
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);

        for (const file of files) {
            await new Promise(resolve => {
                const script = document.createElement("script");
                script.src = file;
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }
    } catch (err) {
        console.warn("No .glint file found.");
    }
}
// Output
function print(...args) {
    console.log(...args);
}

function repeat(times, callback) {
    let i = 0;

    function run() {
        if (i >= times) return;

        callback(i);
        i++;

        requestAnimationFrame(run);
    }

    requestAnimationFrame(run);
}

function forever(callback) {
    function run() {
        callback();
        requestAnimationFrame(run);
    }

    requestAnimationFrame(run);
}

function linkstyle(href, rel = 'stylesheet', type = 'text/css') {
  if (!href) {
    console.error('glint error: href is required to link stylesheet');
  }

  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) {
    console.warn('glint blocked: stylesheet ', href, ' already exists');
    return null; // Explicitly return null if stylesheet exists
  }

  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  link.type = type;

  document.head.appendChild(link);
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
function create(element, id = "", className = "") {
    const el = document.createElement(element);

    if (id) {
        el.id = id;
        window[id] = el; // THIS is what makes Glint global IDs work
    }

    if (className) {
        el.className = className;
    }

    return el;
}

window.addEventListener("load", () => {
    window.addEventListener("DOMContentLoaded", async () => {

        await loadModules();
    
        document.querySelectorAll('script[type="glint"]').forEach(script => {
            try {
                new Function(script.textContent)();
            } catch (err) {
                console.error(err);
            }
        });
    
    });
    });

