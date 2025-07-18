# Regra

**PT** | [EN](README-en.md)

---


`menu ferramentas > diversos > regras`

Na `v2.26.0` foi disponibilizada uma opção para criar regras para execução condicional de alguns itens no programa, como gatilhos, por exemplo.<br>
É possível criar um modelo de regra reutilizável utilizando JavaScript.

Aqui está a documentação de como criar este modelo.<br>
E aqui também estão listados modelos prontos que são disponibilizados no programa para uso por outros usuários.<br>
Para criar novos modelos de regra disponíveis nativamente no programa para utilização por outros usuários, adicione os arquivos `.js` aqui nesta pasta (rules).<br>

# Documentação

## info()

Deve retornar as informações do modelo, como id, nome, descrição, etc.<br>

Exemplo:
```javascript
function info() {
  return {
    id: 'example',
    name: 'Example', //default name
    description: 'Example', //default description
    "i18n": { //translation
        "name": {
            "pt": "Nome traduzido para o idioma correspondente",
            "??": "..."
        },
        "description": {
            "pt": "Descrição traduzida para o idioma correspondente",
            "??": "..."
        }
    },
    //settings_type: 'custom', //default 'custom'
    //timeout_test: 100, //default 100
    //timeout_get_value_to_test: 500, //default 500
    //result_when_timeout: false //default false
  };
}
```

**settings_type:** pode ser `custom` `string` `number` `date` `time` `datetime`<br>
O tipo de configuração que será exibido na interface.<br>
O programa lida com modelos padrões genéricos de interface para casos em que o valor testado será, por exemplo, um número.<br>
O modelo só precisará retornar o número para teste pela `function ruleGetValueToTest()` que o programa vai testar baseado nas configurações definidas pelo usuário, por exemplo "contém", "é igual", "é maior que", etc.
Se `settings_type=custom` (padrão), o modelo deve implementar as configurações na `function ruleSettings()`

**timeout_test:** `50 ~ 500` Tempo limite em milissegundos para execução da function: `ruleTest(evt)`<br>

**timeout_get_value_to_test:** `50 ~ 2000` Tempo limite em milissegundos para execução da function: `ruleGetValueToTest()`<br>

**result_when_timeout:** Valor padrão que será considerado como resultado do teste caso a execução da function receba `timeout`<br>

---

## ruleSettings()

Deve ser declarado se `settings_type` for igual a 'custom'.<br>
Exibe na interface componentes de configuração onde o usário poderá definir valores para ser utilizado como parâmetros no teste da regra.<br>
Deve retornar um array de [InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md).<br>
O valor de cada item estará disponível em `evt.settings` recebido em `function ruleTest(evt)`, por exemplo, `evt.settings.example`.

Exemplo:
```javascript
function ruleSettings() {
  return [
    {
      id: 'example',
      label: 'Example',
      allowed_values: ['Item 1', 'Item 2', 'Item 3']
    }
  ];
}
```

---

## ruleTest(evt)

Deve ser declarado se `settings_type` for igual a 'custom'.<br>
Método que deve retornar `true` ou `false`, que é o resultado do teste da regra.

Exemplo:
```javascript
function ruleTest(evt) {
  //evt.settings
  switch (evt.settings.example) {
    case 'Item 1':
      return /* TODO */;

    case 'Item 2':
      return /* TODO */;

    case 'Item 3':
      return /* TODO */;
  }
  return false;
}
```

---

## ruleGetValueToTest()

Deve ser declarado se `settings_type` for diferente de 'custom'.<br>
Deve retornar o valor base que será utilizado para teste baseado nas configurações definidas na interface pelo usuário.<br>

Exemplo:
```javascript
function ruleGetValueToTest() {
  var r = h.hly('GetMediaPlaylist');
  //quantidade de itens na lista de reprodução de mídia
  return r.data.length;
}
```