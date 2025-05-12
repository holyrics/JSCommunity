# Includes (biblioteca)

**EN** | [PT](README.md)

---


It is possible to create methods for reuse in any JavaScript code executed by the program, like a library, avoiding repeated code in code templates, and also facilitating the creation of custom code within the program itself, using this library integrated with the [jslib](https://github.com/holyrics/jslib/tree/main/README-en.md) library available in the program.<br>
The library files are located here in this folder (includes).

The library can be accessed through the variable `jsc` _(JavaScript Community)_.<br>

Each file here in the folder (or subfolders) is a new variable in `jsc`, for better organization of the code, for example:<br>
```javascript
// src/include/utils.js
jsc.utils.example();

// src/include/err.js
jsc.err.example();

// src/include/utils/array.js
jsc.utils.array.example();
```

Example of an include `utils.js`:
```javascript
function example() {
    h.log('jsc.utils.example OK');
}

function example2(a, b) {
    return a + b;
}

function example3(a, b, c) {
    return (a + b) * c;
}

```