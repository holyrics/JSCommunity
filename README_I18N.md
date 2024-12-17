# Internationalization (I18N)

O método `jsc.i18n(...)` está disponível para compatibilidade do código em diferentes idiomas.<br>
Para adicionar uma string no código que pode ser traduzida:
```javascript
//retorna a tradução de 'Item name' ou o próprio valor 'Item name'
var text = jsc.i18n('Item name');
```

O arquivo de tradução é [src/i18n.json](src/i18n.json).<br>
O arquivo é traduzido automaticamente utilizando Chat GPT.<br>
O método `jsc.i18n` vai retornar o valor passado por parâmetro traduzido de acordo com o idioma definido nas configurações do programa.<br>
Caso o item não exista no arquivo `i18n.json` ou a tradução correspondente não esteja disponível, o próprio valor passado por parâmetro será retornado.<br>

Para formatar uma mensagem, utilize a sintaxe:
```javascript
jsc.i18n('Test {}, test 2 {}', ['abc', 'xyz']);
```
O resultado será: __Test abc, test 2 xyz__

Se o item `Test {}, test 2 {}` estiver traduzido para português e o idioma definido no programa for português:
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
O resultado será: __Teste abc, teste 2 xyz__

A tradução do nome e da descrição de um modelo de código é feita no arquivo `*.json` do próprio modelo.

A tradução dos submenus é feita no arquivo [i18n_tree.json](src/actions/i18n_tree.json), onde `key` é o nome da pasta, exemplo:
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
O parâmetro com chave vazia é o valor padrão.