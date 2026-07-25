# Internationalization (I18N)

**EN** | [PT](README_I18N.md)

---


The method `jsc.i18n(...)` is available for code compatibility in different languages.<br>
To add a string in the code that can be translated:
```javascript
//returns the translation of 'Item name' or the value 'Item name' itself
var text = jsc.i18n('Item name');
```

The translation file is [src/i18n.json](src/i18n.json).<br>
The file is automatically translated using Chat GPT.<br>
The method `jsc.i18n` will return the value passed as a parameter translated according to the language set in the program's settings.<br>
If the item does not exist in the `i18n.json` file or the corresponding translation is not available, the value passed as a parameter will be returned.<br>

To format a message, use the syntax:
```javascript
jsc.i18n('Test {}, test 2 {}', ['abc', 'xyz']);
```
The result will be: __Test abc, test 2 xyz__

If the item `Test {}, test 2 {}` is translated into Portuguese and the language set in the program is Portuguese:
```javascript
[
    {
      ...
    }, {
        "key": "Test {}, test 2 {}",
        "pt": "Teste {}, teste 2 {}"
        "es": "..."
    }, {
      ...
    }
]
```
The result will be: __Teste abc, teste 2 xyz__

The translation of the name and description of a code model is done in the `*.json` file of the model itself.

The translation of the submenus is done in the file [i18n_tree.json](src/actions/i18n_tree.json), where `key` is the name of the folder, for example:
```javascript
[
    {
      ...
    }, {
        "key": "utils",
        "": "Utils",
        "pt": "Utilitários",
        "es": "..."
    }, {
      ...
    }
]
```
The parameter with an empty key is the default value.