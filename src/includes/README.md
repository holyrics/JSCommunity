# Includes (biblioteca)

**PT** | [EN](README-en.md)

---


É possível criar métodos para reutilização em qualquer código javascript executado pelo programa, como uma biblioteca, evitando códigos repetidos nos modelos de código, e também facilitando a criação de códigos personalizados no próprio programa, utilizando esta biblioteca integrada à biblioteca [jslib](https://github.com/holyrics/jslib) disponível no programa.<br>
Os arquivos da biblioteca ficam aqui nesta pasta (includes).

A biblioteca pode ser acessada pela variável `jsc` _(JavaScript Community)_.<br>

Cada arquivo aqui na pasta (ou subpastas) é uma nova variável em `jsc`, para melhor organização do código, exemplo:<br>
```javascript
// src/include/utils.js
jsc.utils.example();

// src/include/err.js
jsc.err.example();

// src/include/utils/array.js
jsc.utils.array.example();
```

Exemplo de um include `utils.js`:
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