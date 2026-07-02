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
                script.onerror = resolve;
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
    let shouldStop = false;
    
    function run() {
        if (shouldStop) return;
        callback();
        requestAnimationFrame(run);
    }

    requestAnimationFrame(run);
    
    return {
        stop() {
            shouldStop = true;
        }
    };
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
// Form Validation
// ======================

function validate(value, rules) {
    const errors = [];

    if (rules.required && (!value || value.trim() === "")) {
        errors.push("This field is required");
    }

    if (rules.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errors.push("Invalid email format");
        }
    }

    if (rules.minLength && value && value.length < rules.minLength) {
        errors.push(`Minimum length is ${rules.minLength} characters`);
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
        errors.push(`Maximum length is ${rules.maxLength} characters`);
    }

    if (rules.pattern && value && !new RegExp(rules.pattern).test(value)) {
        errors.push(rules.patternMessage || "Invalid format");
    }

    if (rules.min && value) {
        const num = parseFloat(value);
        if (num < rules.min) {
            errors.push(`Minimum value is ${rules.min}`);
        }
    }

    if (rules.max && value) {
        const num = parseFloat(value);
        if (num > rules.max) {
            errors.push(`Maximum value is ${rules.max}`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ======================
// Local Storage
// ======================

function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        error("Failed to save to storage:", err);
        return false;
    }
}

function load(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (err) {
        error("Failed to load from storage:", err);
        return null;
    }
}

function deleteStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (err) {
        error("Failed to delete from storage:", err);
        return false;
    }
}

function clearStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (err) {
        error("Failed to clear storage:", err);
        return false;
    }
}

// ======================
// HTTP Requests
// ======================

async function httpGet(url, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    } catch (err) {
        error("GET request failed:", err);
        return null;
    }
}

async function httpPost(url, data, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data),
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    } catch (err) {
        error("POST request failed:", err);
        return null;
    }
}

async function httpPut(url, data, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data),
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    } catch (err) {
        error("PUT request failed:", err);
        return null;
    }
}

async function httpDelete(url, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    } catch (err) {
        error("DELETE request failed:", err);
        return null;
    }
}

// ======================
// Form Builder
// ======================

function formBuilder(options = {}) {
    const form = {
        fields: [],
        validationRules: {},
        onSubmit: options.onSubmit || (() => {}),
        container: null,
        
        addField(fieldConfig) {
            this.fields.push(fieldConfig);
            
            if (fieldConfig.rules) {
                this.validationRules[fieldConfig.name] = fieldConfig.rules;
            }
            
            return this;
        },
        
        addText(name, label, options = {}) {
            return this.addField({
                type: 'text',
                name,
                label,
                placeholder: options.placeholder || '',
                required: options.required || false,
                rules: options.rules || {}
            });
        },
        
        addEmail(name, label, options = {}) {
            return this.addField({
                type: 'email',
                name,
                label,
                placeholder: options.placeholder || '',
                required: options.required !== false,
                rules: { email: true, ...(options.rules || {}) }
            });
        },
        
        addPassword(name, label, options = {}) {
            return this.addField({
                type: 'password',
                name,
                label,
                placeholder: options.placeholder || '',
                required: options.required || false,
                rules: options.rules || {}
            });
        },
        
        addNumber(name, label, options = {}) {
            return this.addField({
                type: 'number',
                name,
                label,
                placeholder: options.placeholder || '',
                required: options.required || false,
                min: options.min,
                max: options.max,
                rules: options.rules || {}
            });
        },
        
        addTextarea(name, label, options = {}) {
            return this.addField({
                type: 'textarea',
                name,
                label,
                placeholder: options.placeholder || '',
                required: options.required || false,
                rows: options.rows || 4,
                rules: options.rules || {}
            });
        },
        
        addSelect(name, label, options = {}) {
            return this.addField({
                type: 'select',
                name,
                label,
                choices: options.choices || [],
                required: options.required || false,
                rules: options.rules || {}
            });
        },
        
        addCheckbox(name, label, options = {}) {
            return this.addField({
                type: 'checkbox',
                name,
                label,
                required: options.required || false,
                rules: options.rules || {}
            });
        },
        
        addRadio(name, label, options = {}) {
            return this.addField({
                type: 'radio',
                name,
                label,
                choices: options.choices || [],
                required: options.required || false,
                rules: options.rules || {}
            });
        },
        
        render(parentSelector = null) {
            const formElement = document.createElement('form');
            formElement.style.maxWidth = '500px';
            formElement.style.margin = '20px auto';
            formElement.style.padding = '20px';
            formElement.style.border = '1px solid #ddd';
            formElement.style.borderRadius = '8px';
            
            const fieldElements = {};
            const errorElements = {};
            
            this.fields.forEach(field => {
                const fieldWrapper = document.createElement('div');
                fieldWrapper.style.marginBottom = '15px';
                
                if (field.type !== 'checkbox' && field.type !== 'radio') {
                    const label = document.createElement('label');
                    label.textContent = field.label;
                    label.style.display = 'block';
                    label.style.marginBottom = '5px';
                    label.style.fontWeight = 'bold';
                    fieldWrapper.appendChild(label);
                }
                
                if (field.type === 'textarea') {
                    const textarea = document.createElement('textarea');
                    textarea.name = field.name;
                    textarea.placeholder = field.placeholder;
                    textarea.rows = field.rows;
                    textarea.style.width = '100%';
                    textarea.style.padding = '8px';
                    textarea.style.border = '1px solid #ccc';
                    textarea.style.borderRadius = '4px';
                    textarea.style.fontFamily = 'inherit';
                    fieldElements[field.name] = textarea;
                    fieldWrapper.appendChild(textarea);
                } else if (field.type === 'select') {
                    const select = document.createElement('select');
                    select.name = field.name;
                    select.style.width = '100%';
                    select.style.padding = '8px';
                    select.style.border = '1px solid #ccc';
                    select.style.borderRadius = '4px';
                    
                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = `Select ${field.label}`;
                    select.appendChild(defaultOption);
                    
                    field.choices.forEach(choice => {
                        const option = document.createElement('option');
                        option.value = choice.value || choice;
                        option.textContent = choice.label || choice;
                        select.appendChild(option);
                    });
                    
                    fieldElements[field.name] = select;
                    fieldWrapper.appendChild(select);
                } else if (field.type === 'checkbox') {
                    const container = document.createElement('div');
                    container.style.display = 'flex';
                    container.style.alignItems = 'center';
                    
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = field.name;
                    checkbox.style.marginRight = '8px';
                    checkbox.style.cursor = 'pointer';
                    
                    const label = document.createElement('label');
                    label.textContent = field.label;
                    label.style.cursor = 'pointer';
                    
                    container.appendChild(checkbox);
                    container.appendChild(label);
                    fieldElements[field.name] = checkbox;
                    fieldWrapper.appendChild(container);
                } else if (field.type === 'radio') {
                    const label = document.createElement('label');
                    label.textContent = field.label;
                    label.style.display = 'block';
                    label.style.marginBottom = '8px';
                    label.style.fontWeight = 'bold';
                    fieldWrapper.appendChild(label);
                    
                    const radioContainer = document.createElement('div');
                    const radioElements = [];
                    
                    field.choices.forEach(choice => {
                        const radioWrapper = document.createElement('div');
                        radioWrapper.style.marginBottom = '8px';
                        
                        const radio = document.createElement('input');
                        radio.type = 'radio';
                        radio.name = field.name;
                        radio.value = choice.value || choice;
                        radio.style.marginRight = '8px';
                        radio.style.cursor = 'pointer';
                        
                        const radioLabel = document.createElement('label');
                        radioLabel.textContent = choice.label || choice;
                        radioLabel.style.cursor = 'pointer';
                        radioLabel.style.marginLeft = '4px';
                        
                        radioWrapper.appendChild(radio);
                        radioWrapper.appendChild(radioLabel);
                        radioContainer.appendChild(radioWrapper);
                        radioElements.push(radio);
                    });
                    
                    fieldElements[field.name] = radioElements;
                    fieldWrapper.appendChild(radioContainer);
                } else {
                    const input = document.createElement('input');
                    input.type = field.type;
                    input.name = field.name;
                    input.placeholder = field.placeholder;
                    
                    if (field.min !== undefined) input.min = field.min;
                    if (field.max !== undefined) input.max = field.max;
                    
                    input.style.width = '100%';
                    input.style.padding = '8px';
                    input.style.border = '1px solid #ccc';
                    input.style.borderRadius = '4px';
                    input.style.boxSizing = 'border-box';
                    
                    fieldElements[field.name] = input;
                    fieldWrapper.appendChild(input);
                }
                
                const errorDiv = document.createElement('div');
                errorDiv.style.color = '#d32f2f';
                errorDiv.style.fontSize = '12px';
                errorDiv.style.marginTop = '4px';
                errorDiv.style.minHeight = '18px';
                errorElements[field.name] = errorDiv;
                fieldWrapper.appendChild(errorDiv);
                
                formElement.appendChild(fieldWrapper);
            });
            
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = options.submitText || 'Submit';
            submitButton.style.width = '100%';
            submitButton.style.padding = '10px';
            submitButton.style.backgroundColor = '#2196F3';
            submitButton.style.color = 'white';
            submitButton.style.border = 'none';
            submitButton.style.borderRadius = '4px';
            submitButton.style.cursor = 'pointer';
            submitButton.style.fontSize = '16px';
            submitButton.style.fontWeight = 'bold';
            submitButton.style.transition = 'background-color 0.3s';
            
            submitButton.addEventListener('mouseover', () => {
                submitButton.style.backgroundColor = '#1976D2';
            });
            submitButton.addEventListener('mouseout', () => {
                submitButton.style.backgroundColor = '#2196F3';
            });
            
            formElement.appendChild(submitButton);
            
            formElement.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Clear all error messages
                Object.keys(errorElements).forEach(fieldName => {
                    errorElements[fieldName].textContent = '';
                });
                
                // Validate all fields
                let isFormValid = true;
                const formData = {};
                
                this.fields.forEach(field => {
                    let value;
                    
                    if (field.type === 'checkbox') {
                        value = fieldElements[field.name].checked;
                    } else if (field.type === 'radio') {
                        const selected = fieldElements[field.name].find(r => r.checked);
                        value = selected ? selected.value : '';
                    } else {
                        value = fieldElements[field.name].value;
                    }
                    
                    formData[field.name] = value;
                    
                    const rules = this.validationRules[field.name];
                    if (rules) {
                        const validation = validate(value, rules);
                        if (!validation.isValid) {
                            isFormValid = false;
                            errorElements[field.name].textContent = validation.errors[0];
                            fieldElements[field.name].style.borderColor = '#d32f2f';
                        } else if (fieldElements[field.name].style) {
                            fieldElements[field.name].style.borderColor = '#ccc';
                        }
                    }
                });
                
                if (isFormValid) {
                    this.onSubmit(formData);
                }
            });
            
            this.container = formElement;
            
            if (parentSelector) {
                const parent = document.querySelector(parentSelector);
                if (parent) {
                    parent.appendChild(formElement);
                }
            }
            
            return formElement;
        },
        
        getData() {
            const data = {};
            this.fields.forEach(field => {
                if (field.type === 'checkbox') {
                    data[field.name] = this.container.querySelector(`[name="${field.name}"]`).checked;
                } else if (field.type === 'radio') {
                    const selected = this.container.querySelector(`[name="${field.name}"]:checked`);
                    data[field.name] = selected ? selected.value : null;
                } else {
                    data[field.name] = this.container.querySelector(`[name="${field.name}"]`).value;
                }
            });
            return data;
        },
        
        reset() {
            if (this.container) {
                this.container.reset();
                const errorDivs = this.container.querySelectorAll('[style*="color: #d32f2f"]');
                errorDivs.forEach(div => div.textContent = '');
            }
            return this;
        },
        
        setValues(data) {
            this.fields.forEach(field => {
                const element = this.container.querySelector(`[name="${field.name}"]`);
                if (element) {
                    if (field.type === 'checkbox') {
                        element.checked = data[field.name] || false;
                    } else if (field.type === 'radio') {
                        const radio = this.container.querySelector(`[name="${field.name}"][value="${data[field.name]}"]`);
                        if (radio) radio.checked = true;
                    } else {
                        element.value = data[field.name] || '';
                    }
                }
            });
            return this;
        }
    };
    
    return form;
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

document.addEventListener("DOMContentLoaded", async () => {

    try {
        await loadModules();
    } catch (err) {
        console.warn("Skipping module loading.");
    }

    document.querySelectorAll('script[type="glint"]').forEach(script => {
        try {
            new Function(script.textContent)();
        } catch (err) {
            console.error("Glint Error:", err);
        }
    });

});
