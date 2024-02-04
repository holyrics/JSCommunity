# JSCommunity
Modelos de código javascript para uso no programa Holyrics.

---

## Modelos de código

Para criar novos modelos de código, adicione os arquivos em uma subpasta correspondente na pasta [src/actions](src/actions).<br>
Selecione uma subpasta existente que se encaixe melhor no objetivo do modelo ou, se necessário, crie novas subpastas.

Cada modelo precisa de 3 arquivos contendo o mesmo prefixo, exemplo:<br>
- abc.json<br>
- abc_functions.js<br>
- abc_script.js<br>

Obs.: Não é necessário criar uma subpasta para cada item. Cada subpasta/tópico pode conter diversos itens, que são organizados pelo prefixo.<br>

O arquivo `*.json` contém as informações do modelo:<br>
```json
{
    "id": "id_único_do_item",
    "name": "Nome do item",
    "description": "Descrição do que o item faz. Pode conter tags HTML para melhor formatação. <b>bold</b>, <i>italic</i>, etc...",
    "i18n": {
        "name": {
            "pt": "Nome traduzido para o idioma correspondente",
            "es": "..."
        },
        "description": {
            "pt": "Descrição traduzida para o idioma correspondente",
            "es": "..."
        }
    },
    "script_filter": " obj.type == 'trigger' && obj.action == 'displaying' && obj.item == 'image' "
}
```

`script_filter` condição para exibir o item na lista de modelos.<br>
`obj.type` pode ser `action` ou `trigger`<br>
se `obj.type == 'action'`, não haverá outras variáveis.

se `obj.type == 'trigger'`:<br>
<br>
`obj.when` pode ser `displaying` `closing` `change`<br>
<br>
`obj.item` pode ser `title` `song` `verse` `text` `audio` `video` `image` `announcement` `automatic_presentation` `countdown` `countdown_cp` `cp_text` `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_song_slide` `any_text_slide` `any_ppt_slide` `any_theme` `any_background` `any_title_subitem` `any_webcam` `countdown_seconds_public` `countdown_seconds_communication_panel` `timer_seconds_communication_panel` `wallpaper` `wallpaper_service` `stage` `playlist` `bpm` `hue`<br>
<br>

O arquivo `*_functions.js` contém o script que fica na parte direita da janela de edição de script (métodos opcionais).<br>
Para criar/organizar os métodos mais complexos necessários para execução do script principal.<br>
É possível implementar os recursos de [Function Input](https://github.com/holyrics/Scripts/blob/main/FunctionInput.md) e [Item Status](https://github.com/holyrics/Scripts/blob/main/ItemStatus.md) neste arquivo.<br>
Exemplo:
```javascript
function hGetItemInputParams() {
  return [{
      id: 'duration',
      name: 'Duração (minutos)',
      type: 'number'
  }];
}
```

O arquivo `*_script.js` contém o script que será executado.<br>
O script desse arquivo não fica dentro de uma `function`, pois ele será envolvido em uma `function` em tempo real na execução do código no programa.<br>
A variável padrão para qualquer `function` no programa é `obj`, então utilize esta variável para obter as informações de input.<br>
Exemplo:
```javascript
//inicia uma contagem na tela de retorno com a quantidade de minutos informada na interface pelo input 'duration'
h.hly('StartCountdownCP', {
    minutes: obj.input.duration
    stop_at_zero: true
});
```

---

## Includes (biblioteca)

É possível criar métodos para reutilização em qualquer código javascript executado pelo programa, como uma biblioteca, evitando códigos repetidos nos modelos de código, e também facilitando a criação de códigos personalizados no próprio programa, utilizando esta biblioteca integrada à biblioteca [jslib](https://github.com/holyrics/jslib) disponível no programa.<br>
Os arquivos da biblioteca ficam na pasta (includes)[includes].

A biblioteca pode ser acessada pela variável `jsc` _(JavaScript Community)_.<br>

Cada arquivo na pasta [src/includes](src/includes) é uma nova variável em `jsc`, para melhor organização do código, exemplo:<br>
```javascript
jsc.utils.example();
jsc.err.example();
```

Os métodos dentro de um include devem ser criados com a seguinte sintaxe:
```javascript
utils = {
    example: function() {
      h.log('jsc.utils.example OK');
    },
    //
    example2: function(a, b) {
      return a + b;
    },
    //
    example3: function(a, b, c) {
      return (a + b) * c;
    }
    //
};
```

---

## Internationalization (I18N)

O método `jsc.i18n(...)` está disponível para compatibilidade do código em diferentes idiomas.<br>
Para adicionar uma string no código que pode ser traduzida:
```javascript
//retorna a tradução de 'Item name' ou o próprio valor 'Item name'
var text = jsc.i18n('Item name');
```

O arquivo de tradução é [src/i18n.json](src/i18n.json).<br>
O método `jsc.i18n` vai retornar o valor passado por parâmetro traduzido de acordo com o idioma definido nas configurações do programa.<br>
Caso o item não exista no arquivo `i18n.json` ou a tradução correspondente não esteja disponível, o próprio valor passado por parâmetro será retornado.<br>

Para formatar uma mensagem, utilize a sintaxe:
```javascript
jsc.i18n('Test {}, test 2 {}', ['abc', 'xyz']);
```
O resultado será: __Test abc, test 2 xyz__<br>
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

