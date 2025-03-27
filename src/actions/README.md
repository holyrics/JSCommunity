# Modelos de código

**PT** | [EN](README-en.md)

---


Para criar novos modelos de código, adicione os arquivos em uma subpasta daqui (actions).<br>
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
    "description": "Descrição do que o item faz. Pode conter tags HTML para melhor formatação. <b>bold</b>, <i>italic</i>, ...",
    "i18n": {
        "name": {
            "pt": "Nome traduzido para o idioma correspondente",
            "??": "..."
        },
        "description": {
            "pt": "Descrição traduzida para o idioma correspondente",
            "??": "..."
        }
    },
    "script_filter": " obj.type == 'trigger' && obj.when == 'displaying' && obj.item == 'image' "
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
É possível implementar os recursos de [Function Input](https://github.com/holyrics/Scripts/blob/main/FunctionInput.md) e [Item Status](https://github.com/holyrics/Scripts/blob/main/StatusView.md) neste arquivo.<br>
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