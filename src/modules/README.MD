# Módulos

Disponível a partir da versão `2.23.0` do programa Holyrics.

A funcionalidade **Módulos** permite a criação de soluções utilizando JavaScript [(jslib)](https://github.com/holyrics/jslib) que interagem com vários recursos do programa, permitindo alterar e/ou adaptar o funcionamento do programa, criar botões que executam ações personalizadas, gatilhos em tempo real, dentre outras possibilidades, tudo em um só lugar.

Desde agosto de 2022 `v2.18.0`, diversas funcionalidades relacionadas com JavaScript foram adicionadas ao programa e a quantidade de recursos e possibilidades disponíveis na bibliteca [jslib](https://github.com/holyrics/jslib) aumentou.<br>
Com isso, algumas soluções criadas necessitavam interagir com diferentes recursos do programa, sendo necessário acessar e adicionar/editar códigos JavaScript em vários locais diferentes do programa.<br>
A funcionalidade **Módulos** resolve isso permitindo interagir com diversas funcionalidades e recursos diferentes do programa em um único código JavaScript.<br>
Podendo até criar botões de ação na janela do programa, sem que o usuário precise ficar criando e administrando diversos botões e códigos JavaScript diferentes.

Este repositório organiza os módulos criados pela comunidade que serão disponibilizados no programa para que qualquer usuário possa pesquisar e "instalar" esses módulos para uso na janela **Módulos** no programa.

# Recursos

Um módulo é baseado em várias `function` que retornam o conteúdo correspondente para uso e execução no programa.<br>
As ações serão realizadas apenas se o módulo estiver adicionado e ativado pelo usuário.<br>
Observação: Na janela de módulos cada item pode ter execuções condicionais, como por exemplo, apenas em determinados cultos, ou em um determinado ambiente de execução.<br>
O módulo será considerado "desativado" se a execução condicional atual for `false`, mesmo que ele esteja com o checkbox ativado.<br>

# Disponibilidade e Licença

Reservamo-nos o direito de negar a aprovação de qualquer módulo por qualquer motivo, a nosso exclusivo critério.

Mais detalhes sobre o licenciamento dos códigos disponibilizados na funcionalidade **Módulos**, acesse: [LICENSE](https://github.com/holyrics/JSCommunity/tree/main/src/modules/LICENSE.MD)

# Tutorial

## Criar um módulo
Os módulos deverão ser criados dentro de uma subpasta de [modules](https://github.com/holyrics/JSCommunity/tree/main/src/modules).<br>
Cada pessoa ou organização deve criar sua própria subpasta para seus módulos.<br>
Por exemplo: `modules/holyrics`

Todos os arquivos `*.js` na raiz dessa subpasta serão considerados módulos.<br>
Por exemplo: `modules/abc/example.js`<br>
O nome do arquivo é indiferente, o `name` e o `id` do módulo serão obtidos de `function info()` dentro de cada módulo.

Caso você crie mais de um módulo e tenha códigos iguais em diferentes módulos, é possível utilizar uma estrutura básica de dependência/importação.<br>
Adicione os códigos reutilizáveis em arquivos `*.js` dentro da subpasta `lib`.<br>
Por exemplo: `modules/abc/lib/utils.js`<br>
E em cada módulo, adicione (em qualquer lugar) a linha `//#import utils`.

Por exemplo, no arquivo `modules/abc/lib/utils.js`
```javascript
function getDefaultModuleInfoDescription() {
  return 'abc';
}
```

E no módulo `modules/abc/example.js`:
```javascript
//#import utils

function info() {
    id: 'id',
    name: 'name',
    description: getDefaultModuleInfoDescription()
    //...
}
```

É possível utilizar o botão `include` no programa Holyrics como forma de administrar esses códigos externos.<br>
Ao criar e testar seus módulos no programa Holyrics, na janela `include` crie uma nova aba para cada possível arquivo diferente e mantenha os códigos dentro dessas abas em `include`, em vez de deixar no código do próprio módulo.<br>
**Bug na `v2.23.0`** - foi identificado que ao editar o include, os módulos não utilizam o include atualizado, então é necessário editar qualquer coisa mínima no código do módulo (um simples espaço) pra forçar a reinicialização do módulo e utilizar o include atualizado.<br>
Será corrigido na `v2.24.0`

## Functions

### info()
Retorna as informações do módulo.



**Retorno:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do módulo. `unique` |
| `name` | _String_ | Nome do módulo |
| `description` | _String_ | Descrição do módulo.Compatível com formatação `html`. |
| `allowed_requests` | _Array&lt;String&gt; (opcional)_ | Lista de hosts e/ou IPs adicionados na lista de requisições permitidas.<br>Possibilita realizar requisições via `h.apiRequest` passando o host ou ip diretamente, sem precisar ter um receptor criado para a comunicação. |
| `min_version` | _String (opcional)_ | Versão mínima requerida do programa |


**Exemplo:**

```javascript
function info() {
  return {
    id: 'ID do módulo',
    name: 'Nome do módulo',
    description: 'Descrição do <b>módulo</b>',
    allowed_requests: [
      'https://www.holyrics.com.br/v1/api_example/'
    ],
    min_version: '2.23.0'
  };
}
```

---

### settings(module)
Retorna a lista de configurações do módulo.<br>Exibe na janela de configuração do módulo diversos componentes como caixa de texto, checkbox, combobox, etc.<br>O valor definido pelo usuário nas configurações do módulo estarão disponíveis em `settings` de cada objeto do tipo `module`.<br>Observação: O campo `settings` de `module.settings` não está disponível neste método, apenas as demais informações do objeto.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  |
| :---: |
| _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt;_ | 


**Exemplo:**

```javascript
function settings(module) {
  var arr = [];
  arr.push({
    id: 'settings_1',
    name: i18n('Name 1'),
    type: 'string'
  });
  arr.push({
    id: 'settings_2',
    name: i18n('Name 2'),
    type: 'number',
    min: 1,
    max: 100,
    component: 'slider',
    unit: '%'
  });
  return arr;
}
```

---

### actions(module)
Retorna a lista de ações que serão exibidas na janela do programa, no painel de módulo, abaixo da barra de favoritos.<br>Um item de ação pode executar ações ao clicar, mas também abrir um submenu com outros itens de ação, se comportando como uma pasta.<br>Pode ter `inputs` que serão exibidos ao clicar com o botão direito do mouse no item, opção "editar".<br>E pode ter itens de menu que serão exibidos ao clicar com o botão direito do mouse no item.<br><br>**bug na v2.23.0**<br>O valor do input alterado pelo usuário na janela de diálogo não está sendo atualizado ao clicar em OK.<br>Para corrigir o problema, adicione a linha:<br>`jsc.module.fixActions(module, arr);`<br>antes de `return`.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  |
| :---: |
| _Array&lt;[ModuleAction](#moduleaction)&gt;_ | 


**Exemplo:**

```javascript
function actions(module) {
  var arr = [];

  var simpleActionFlag = module.id + "#simple_action_enabled";
  arr.push({
    id: 'simple_action',
    name: i18n('Simple Action'),
    icon: 'play_arrow',
    action: function (evt) {
      h.setGlobalNext(simpleActionFlag, [true, false]);
    },
    status: function (evt) {
      if (h.getGlobal(simpleActionFlag)) {
        return {
          iconColor: 'green'
        };
      }
      return null;
    }
  });

  arr.push({
    id: 'show_quick_message',
    name: i18n('Show Quick Message'),
    icon: 'message',
    action: function (evt) {
      if (!evt.input.message) {
        h.notificationError('empty message', 7);
        return;
      }
      h.hly('ShowQuickPresentation', {
        text: evt.input.message,
        automatic: {
          seconds: evt.input.duration,
          repeat: false
        }
      });
    },
    input: [
      {
        id: 'message',
        type: 'string',
        name: i18n('Message')
      }, {
        id: 'duration',
        type: 'number',
        name: i18n('Duração'),
        min: 1,
        max: 120,
        default_value: 30
      }
    ]
  });

  arr.push({
    id: 'folder_example',
    name: i18n('Folder'),
    icon: 'folder_open',
    action: [
      {
        id: 'folder_simple_action_1',
        name: i18n('Simple Action 1'),
        action: function (evt) {
          //todo
        }
      }, {
        id: 'folder_simple_action_2',
        name: i18n('Simple Action 2'),
        action: function (evt) {
          //todo
        }
      }
    ]
  });

  var longPressActionFlag = module.id + "#long_press_flag";
  arr.push({
    id: 'long_press_action',
    label: 'Long Press Action',
    mouse_pressed: function (evt) {
      h.setGlobal(longPressActionFlag, true);
    },
    mouse_released: function (evt) {
      h.setGlobal(longPressActionFlag, false);
    },
    status: function (evt) {
      return {
        active: h.getGlobal(longPressActionFlag)
      };
    }
  });
  
  // bug fix v2.23.0
  jsc.utils.module.fixActions(module, arr);
  // arr pode ser um array ou um item action individual
  // jsc.utils.module.fixActions(module, arr[0]);

  return arr;
}
```

---

### loops(module)
Este é o método correspondente de `h.setInterval(function, timeout)`.<br>Cria loops para serem executados a cada x tempo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  |
| :---: |
| _Array&lt;[ModuleLoop](#moduleloop)&gt;_ | 


**Exemplo:**

```javascript
function loops(module) {
  var arr = [];
  arr.push({
    name: 'loop 5',
    delay: 5000,
    action: function(evt) {
      // loop action every 5 seconds
    }
  });
  arr.push({
    name: 'loop 5',
    delay: '12s',
    action: function(evt) {
      // loop action every 12 seconds
    }
  });
  return arr;
}
```

---

### startup(module)
Executado sempre na inicialização do módulo.<br>É executado mesmo se o módulo estiver desativado.<br>Não é executado ao ativar ou desativar o módulo, mas na sua inicialização.<br>Por exemplo, é executado ao editar o código JavaScript do módulo, ou ao chamar `module.restart()`.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


_Método sem retorno_

**Exemplo:**

```javascript
function startup(module) {
    //implementation
}
```

---

### shutdown(module)
Executado ao encerrar o programa.<br>Será executado somente se o módulo estiver ativado e com execução condicional `true`.<br><br>`timeout 3000ms`

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


_Método sem retorno_

**Exemplo:**

```javascript
function shutdown(module) {
    //implementation
}
```

---

### triggers(module)
Este é o método correspondente de `h.addTriggerListener(input)` e `menu ferramentas > diversos > gatilhos`.<br>Permite criar gatilhos que serão executados quando uma ação correspondente ocorrer no programa.<br>Por exemplo, criar um gatilho para ser executado sempre que uma letra de música for exibida, ou um gatilho pra ser executado sempre que mudar o slide de uma letra de música.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  |
| :---: |
| _Array&lt;[TriggerItem](#trigger-item)&gt;_ | 


**Exemplo:**

```javascript
function triggers(module) {
  var arr = [];
  arr.push({
    when: 'displaying',
    item: 'any_song',
    action: function (obj) {
      // song displayed
      // obj.id
      // obj.title
    }
  });
  arr.push({
    when: 'change',
    item: 'bpm',
    action: function (obj) {
      // BPM changed
      // obj.old_value
      // obj.new_value
    }
  });
  return arr;
}
```

---

### systemVariables(module)
Este é o método correspondente do `menu arquivo > configurações > avançado > javascript > variáveis do sistema`.<br>Permite criar métodos que poderão ser utilizados dentro de textos que serão exibidos na projeção, painel de controle, alerta, etc.<br>A variável definida no texto será substituída em tempo real pelo valor retornado na respectiva `function`.<br>Observação: há um cachê de 1 segundo para reutilizar o último valor retornado pela `function`.<br><br>Por exemplo:<br>`test: function() { return 'abc'; }`<br>O texto digitado `123 @js{test} xyz` será exibido como `123 abc xyz`.<br><br>Também é possível utilizar `function` com parâmetros:<br>`sum: function(a, b) { return a + b; }`<br>O texto digitado `3+4=@js{sum(3,4)}` será exibido como `3+4=7`.<br>

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Mapa chave/valor onde cada chave é o nome da variável do sistema criada e o valor é uma `function` que retorna o valor correspondente da variável do sistema |


**Exemplo:**

```javascript
function systemVariables(module) {
  var arr = {};
  
  //   text: 123 @js{test} xyz
  // result: 123 abc xyz
  arr.test = function() {
    return 'abc';
  };
  
  //   text: 3 + 4 = @js{sum(3, 4)}
  // result: 3 + 4 = 7
  arr.sum = function(a, b) {
    return a + b;
  };
  
  return arr;
}
```

---

### contextActions(module)
Este é o método correspondente do `menu ferramentas > diversos > ações de contexto`.<br>Cria itens no menu de contexto (botão direito do mouse) de um respectivo item, permitindo realizar ações específicas para um item.<br>Por exemplo, criar uma ação chamada `Sem Áudio` que executa um vídeo sem áudio.<br>Ao clicar com o botão direito em um item de vídeo no programa, no submenu `Ação de contexto`, selecionando o item `Sem Áudio`, as informações do vídeo serão redirecionadas para a respectiva `function`.<br>E então a `function` pode ter a implementação de definir o player do programa para `mute = true` e depois executar o respectivo vídeo.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  |
| :---: |
| _Array&lt;[ModuleContextAction](#modulecontextaction)&gt;_ | 


**Exemplo:**

```javascript
function contextActions(module) {
  var arr = [];

  arr.push({
    name: i18n('Iniciar do Coro'),
    types: ['song'],
    action: function (evt) {
      var r = h.hly('GetSong', {id: evt.item.id});
      if (!r.data) {
        var error = i18n("Item não encontrado: {}", ["Song by ID: " + evt.item.id]);
        h.notificationError(error, 3);
        return;
      }
      var song = r.data;
      var slides = song.slides;
      var orders = song.order.split(",");
      if (orders.length == 0 || (orders.length == 1 && orders[0] == '')) {
        orders = h.intStreamRangeClosed(1, slides.length).toArray();
      }
      for (var i = 0; i < orders.length; i++) {
        i = parseInt(i);
        if (i <= 0 || i > slides.length) {
          continue;
        }
        var slide = slides[orders[i] - 1];
        if (!jsc.utils.isChorus(slide.slide_description)) {
          continue;
        }
        h.hly('ShowSong', {
          id: song.id,
          initial_index: orders[i]
        });
        return;
      }
      var error = i18n("Item não encontrado: {}", ["Chorus - Song: " + evt.item.title]);
      h.notificationError(error, 3);
    }
  });

  arr.push({
    name: i18n('Exibir por {} segundos', [10]),
    types: ['image', 'image_folder'],
    action: function (evt) {
      h.hly('ShowImage', {
        file: evt.item.file_fullname,
        automatic: {
          seconds: 10,
          repeat: false
        }
      });
    }
  });

  return arr;
}
```

---

### textTransform(module)
Este é o método correspondente do `menu arquivo > configurações > diversos > inserir texto`.<br>Permite inserir um texto no início ou no final de um slide ou alterar o texto atual.<br>Esta ação é feita em tempo de execução no momento da projeção do respectivo slide e é aplicada de forma independente para cada tela, de acordo com o valor em `screen_id`.<br>Observação: há um cachê de 30 segundo para reutilizar o último valor retornado pela `function`, baseado no mesmo slide e mesma tela.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `song` | _Function (opcional)_ | `function(obj) { /* return ModuleTextTransform; */ }`<br>`obj` é do tipo: [ModuleTextTransformInfo](#moduletexttransforminfo).<br><br>Deve retornar um objeto: [ModuleTextTransform](#moduletexttransform).<br> |
| `text` | _Function (opcional)_ | `function(obj) { /* return ModuleTextTransform; */ }`<br>`obj` é do tipo: [ModuleTextTransformInfo](#moduletexttransforminfo).<br><br>Deve retornar um objeto: [ModuleTextTransform](#moduletexttransform).<br> |
| `extra_slides` | _Function (opcional)_ | `function(obj) { /* return ModuleTextTransform; */ }`<br>`obj` é do tipo: [ModuleTextTransformInfo](#moduletexttransforminfo).<br><br>Deve retornar um objeto: [ModuleTextTransform](#moduletexttransform).<br> |


**Exemplo:**

```javascript
function textTransform(module) {
  var obj = {};
  
  obj.extra_slides = function(evt) {
    if (evt.screen_id == 'public' && evt.slide_type == 'blank' && evt.source_type == 'music') {
      // Isso faz com que na tela 'public'
      // quando a opção F9 (sem texto) estiver ativada
      // e for uma apresentação de letra de música
      // o texto '♪' seja exibido
      return {
        add_end: '♪'
      };
    }
    return null;
  };
  return obj;
}
```

---

### customTheme(module)
Este é o método correspondente do `Menu Tema > Automatização`.<br>Permite definir os Temas que serão utilizados nos slides em tempo de execução.<br>Por exemplo, ao executar uma música, a `function` definida para o campo `song` será executada para todos os slides da música.<br>O Tema (ou plano de fundo) utilizado para o respectivo slide será conforme as configurações retornadas no método.<br>Caso os parâmetros definidos gerem múltiplos itens como resultado, será selecionado um item dos resultados de forma aleatória.<br>Se o retorno for `null`, o Tema atual do slide não será alterado.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `song` | _Function (opcional)_ | `function(obj) { /* return ModuleThemeFilter; */ }`<br>`obj` é do tipo: [ModuleCustomThemeSongInfo](#modulecustomthemesonginfo).<br><br>Deve retornar um objeto: [ModuleThemeFilter](#modulethemefilter) |
| `text` | _Function (opcional)_ | `function(obj) { /* return ModuleThemeFilter; */ }`<br>`obj` é do tipo: [ModuleCustomThemeTextInfo](#modulecustomthemetextinfo).<br><br>Deve retornar um objeto: [ModuleThemeFilter](#modulethemefilter) |
| `automatic_presentation` | _Function (opcional)_ | `function(obj) { /* return ModuleThemeFilter; */ }`<br>`obj` é do tipo: [ModuleCustomThemeSongInfo](#modulecustomthemesonginfo).<br><br>Deve retornar um objeto: [ModuleThemeFilter](#modulethemefilter) |


**Exemplo:**

```javascript
function customTheme(module) {
  var obj = {};

  obj.song = function (evt) {
    var textlc = evt.text.toLowerCase();
    if (textlc.contains('fogo') && textlc.contains('chuva')) {
      // se o texto do slide tiver as palavras 'fogo' e 'chuva'
      // define um vídeo como plano de fundo
      // que tenha as tags 'Fogo' e 'Chuva'
      // (as duas por conta de 'intersection: true')
      return {
        tags: ['Fogo', 'Chuva'],
        intersection: true,
        type: 'my_videos'
      };
    }
    if (textlc.equals("azul")) {
      // se o texto do slide for igual a 'azul'
      // define um tema criado em tempo real
      // com as configurações a seguir
      return {
        custom_theme: {
          background: {
            type: "color",
            id: "0000FF"
          },
          font: {
            name: "Arial",
            bold: true,
            italic: true,
            size: 10.0,
            color: "F5F5F5"
          }
        }
      };
    }
    return null;
  };

  return obj;
}
```

---

### lineBreakRules(module)


**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  | Descrição |
| :---: | ------------|
| _Function_ | Define uma regra personalizada para quebra de linha automática (quando ativado) para as apresentações no programa (exceto versículos).<br><br>`function(obj) { /* return int; */ }`<br><br>`obj` é do tipo: [ModuleLineBreakRulesInfo](#modulelinebreakrulesinfo)<br><br>Deve retornar um objeto: int<br>Se o número retornado for `zero`, mantém a quebra de linha no local indicado, ou seja, a palavra atual iniciará uma nova linha.<br>Se o número retornado for menor do que `zero`, as últimas palavras em `previousWords` serão movidas para a nova linha, na quantidade indicada no número (positivo) retornado.<br>Se o número retornado for `1`, a palavra atual será mantida na linha atual.<br>Se o número retornado for maior do que `1`, a palavra atual será mantida na linha atual e as primeiras palavras em `nextWords` serão mantidas na linha atual, na quantidade indicada no número-1 retornado. |


**Exemplo:**

```javascript
function lineBreakRules(module) {
  return function(evt) {
    if (evt.screen.id == 'public'
          && evt.presentation.type == 'song'
          && evt.nextWords.length == 0) {
      // se for a tela 'public'
      // e for uma apresentação de letra de música
      // e não houver palavras restantes além da palavra atual
      // 
      // retorna -1 para que a última palavra da linha atual
      // seja movida para a próxima linha
      // 
      // isso evita com que uma quebra de linha
      // seja criada com apenas uma palavra sozinha
      //
      // caso fosse retornado 1, a palavra atual ficaria na linha atual
      // evitando a quebra de linha
      // porém nesse caso o tamanho da fonte do slide é reduzido
      return -1;
    }
    return 0;
  };
}
```

---

### customMessageInApp(module)
Cria itens do tipo 'Mensagem Personalizada' para exibição no app celular.<br>Isso permite criar uma ação que dependa de entradas informadas pelo usuário.<br>Por exemplo, um item que solicita um `input` chamado `message`, e então receber no campo `input.message` o valor informado no app pelo usuário.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Retorno:**

| Tipo  |
| :---: |
| _Array&lt;[ModuleCustomMessageInApp](#modulecustommessageinapp)&gt;_ | 


**Exemplo:**

```javascript
function customMessageInApp(module) {
  var arr = [];
  arr.push({
    name: i18n('Mensagem Personalizada no App'),
    description: i18n('Descrição'),
    input: [
      {
        id: 'example_1',
        label: i18n('Nome') + ' 1'
      }, {
        id: 'example_2',
        label: i18n('Nome') + ' 2',
        suggestions: [
          'Item 1', 'Item 2', 'Item 3'
        ]
      }, {
        id: 'example_3',
        label: i18n('Nome') + ' 3',
        only_number: true
      }
    ],
    action: function(evt) {
     //evt.input.example_1
     //evt.input.example_2
     //evt.input.example_3
     //evt.note
     var msg = '<html>' + i18n('Mensagem recebida do app')
         + '<br><code>' + h.toPrettyJson(evt.input) + '</code>'
         + '<br>note: ' + evt.note;
     h.notification(msg, 3);
    }
  });
  return arr;
}
```

---

# Classes 
## Module
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do objeto módulo no programa.<br>Não é o id definido em `function info()`, mas o ID do objeto no programa. |
| `settings` | _Object_ | Objeto com as configurações do módulo.<br>Cada `InputParam` retornado em `function settings()` estará disponível no campo `settings`. |
### getName()
Retorna o nome do módulo.



**Resposta:**

| Tipo  |
| :---: |
| _String_ | 


---

### isEnabled()
Verifica se o módulo está ativado.<br>Retornará `false` caso a execução condicional do módulo seja `false`.



**Resposta:**

| Tipo  |
| :---: |
| _Boolean_ | 


---

### log(msg, ...args)
Adiciona uma mensagem no log interno do módulo.<br>Pode ser acessado pela janela de log, no botão "3 pontinhos" no respectivo módulo.<br>Também fica salvo em arquivo em `./logs/module/{module_id}.txt`.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `msg` | _String_ | Mensagem para ser adicionada no log interno do módulo |
| `args` | _Array&lt;Object&gt;_ | Parâmetros para formatação de uma mensagem de log |


_Método sem retorno_

**Exemplo:**

```javascript
module.log('item: {}, item 2: {}', ['value', 'value 2']);
```

---

### updatePanel()
Força a reinicialização do painel de ações do módulo atual no painel de módulos.<br>Útil para casos em que a quantidade de botões retornados em `function actions(module)` muda.<br>Por exemplo, se o módulo exibe botões de ação de forma dinâmica e a quantidade de botões pode variar em tempo de execução.



_Método sem retorno_

---

### repaintPanel()
Força a atualização dos botões do painel de módulos.<br>Útil para casos em que um botão de ação tem seu status alterado, como por exemplo, ativado/desativado.<br>Os botões são atualizados geralmente a cada 2 segundos, ou ao ser clicado.<br>Utilize este método apenas se precisar forçar a atualização do botão sem esperar os gatilhos de atualização padrão.



_Método sem retorno_

---

### restart()
Força a reinicialização do módulo.



_Método sem retorno_

---

### registerSettings(id, inputs)
### loadSettings(id, inputs)
Carrega no campo `settings` do módulo configurações extras que não estão declaradas em `function settings()`.<br>Útil para armazenar configurações extras diretamente no módulo, e também evita o acesso ao conteúdo armazenado por outros códigos.<br>Chame este método em `function startup(module)` para que o campo `settings` seja preenchido com os valores salvos no módulo, ou pelo menos com os valores definidos em `default_value` de cada `InputParam`.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da configuração, que é o nome do campo que será definido em `settings`. Atenção com o id definido aqui, pois pode criar conflito com o `id` definido em um `InputParam` retornado em `function settings()`. |
| `inputs` | _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt;_ |  |


_Método sem retorno_

**Exemplo:**

```javascript
var inputs = [
  {
    id: 'message',
    type: 'string'
  }, {
    id: 'duration',
    type: 'number',
    default_value: 10
  }
];

module.registerSettings('sets_name', inputs);
//module.settings.sets_name.message
//module.settings.sets_name.duration
```

---

### inputSettings(id, inputs)
Exibir uma janela com campos de entrada para receber informações de forma interativa.<br>Os valores serão salvos automaticamente no campo `settings.id`, onde `id` é o valor definido aqui no parâmetro `id`.<br>O valor será armazenado apenas ao clicar em OK na janela de configurações.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da configuração, que é o nome do campo que será definido em `settings`. Atenção com o id definido aqui, pois pode criar conflito com o `id` definido em um `InputParam` retornado em `function settings()`. |
| `inputs` | _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt;_ | Pode ser `null` se `registerSettings(id, inputs)` ou `loadSettings(id, inputs)` tiver sido chamado anteriormente em qualquer momento |


_Método sem retorno_

**Exemplo:**

```javascript
h.inputSettings('sets_name', null);
```

---


## ModuleAction
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `icon` | _String (opcional)_ | Ícone padrão do item.<br>Utiliza a sintaxe de [Icon](https://github.com/holyrics/Scripts/blob/main/Icon.md). |
| `icon_color` | _String (opcional)_ | Cor do ícone no formato hexadecimal. |
| `hint` | _String (opcional)_ | Texto de dica que será exibido ao deixar o mouse parado em cima do item |
| `input` | _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt; (opcional)_ | Lista de configurações do item.<br>Disponível para o usuário editar ao clicar com o botão direito do mouse no item.<br><br>**bug na v2.23.0**<br>O valor do input alterado pelo usuário na janela de diálogo não está sendo atualizado ao clicar em OK.<br>Para corrigir o problema, adicione a linha:<br>`jsc.module.fixActions(module, arr);`<br>antes de `return`. |
| `status` | _Object (opcional)_ | Retornar o estado atual de exibição do item.<br>Define as configurações de visualização do item em tempo de execução, como ícone, cor, etc.<br>Utiliza a sintaxe de [StatusView](https://github.com/holyrics/Scripts/blob/main/StatusView.md). |
| `action` | _Function (opcional)_ | `function(evt) { /*   */ }`<br>`evt.action_id` contém o id da respectiva `action`<br>`evt.input` contém os valores salvos obtidos do campo `input` da respectiva `action`.<br>Executado ao clicar e soltar o item. |
| `mouse_pressed` | _Function (opcional)_ | `function(evt) { /*   */ }`<br>`evt.action_id` contém o id da respectiva `action`<br>`evt.input` contém os valores salvos obtidos do campo `input` da respectiva `action`.<br>Executado ao clicar no item. |
| `mouse_released` | _Function (opcional)_ | `function(evt) { /*   */ }`<br>`evt.action_id` contém o id da respectiva `action`<br>`evt.input` contém os valores salvos obtidos do campo `input` da respectiva `action`.<br>Executado ao soltar o item.<br>**Atenção:** mouse_pressed na `v2.23.0` está sendo executado ao clicar com o botão direito do mouse no item.<br>Será corrigido na atualização `v2.24.0` |
| `available_in_app` | _Boolean (opcional)_ | Indica se o item de ação estará disponível e listado no app Holyrics para celular.<br>Itens definidos como `true` serão exibidos na aba `Favoritos` do app.<br>O celular também precisa estar com a permissão `Módulo` ativada nas configurações do Holyrics, no botão `gerenciar acesso remoto sem senha` `Padrão: false` |
| `popup_menu` | _Array&lt;[ModulePopupMenuItem](#modulepopupmenuitem)&gt; (opcional)_ | Itens exibidos no menu de contexto ao clicar com o botão direito do mouse no item.<br>Pode ser uma `function` que retorna Array&lt;[ModulePopupMenuItem](#modulepopupmenuitem)&gt;.<br>`function(evt) { return []; }`<br>`evt.source` contém o objeto `ModuleAction` atual. |

## ModuleLoop
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item |
| `delay` | _Number_ | Intervalo em milissegundos entre cada execução.<br>Máximo: `300000`. |
| `action` | _Function_ | Função que será executada |

## Trigger Item
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `when` | _String_ | `displaying` `closing` `change` `event` |
| `item` | _String_ | Tipo do item. Pode ser:<br>**when=displaying**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_song_slide` `any_text_slide` `any_ppt_slide` `any_theme` `any_background` `any_title_subitem` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `any_countdown` `any_automatic_presentation_slide` `f8` `f9` `f10`<br><br>**when=closing**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `f8` `f9` `f10`<br><br>**when=change**: `countdown_seconds_public` `countdown_seconds_communication_panel` `timer_seconds_communication_panel` `wallpaper` `wallpaper_service` `stage` `playlist` `bpm` `hue`<br><br>**when=event**: `new_message_chat` |
| `action` | _Function_ | Ação que será executada |
<details>
  <summary>Ver exemplo</summary>

```javascript
{
  "id": "",
  "when": "displaying",
  "item": "any_song",
  "action": function(obj) { /* TODO */ },
  "name": "name"
}
```
</details>

## ModuleContextAction
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item.<br>Valor que será exibido no menu de contexto do respectivo item. |
| `icon` | _String (opcional)_ | Utiliza a sintaxe de [Icon](https://github.com/holyrics/Scripts/blob/main/Icon.md). |
| `types` | _Array&lt;String&gt;_ | Lista com os tipos de item que receberão a ação de contexto.<br>Valores aceitos: `audio` `audio_folder` `video` `video_folder` `image` `image_folder` `file` `song` `text` `announcement` `automatic_presentation` `plain_text` `cp_text` `favorite` `paragraph_preview` `song_history` `theme` `presentation_theme_footer` `playlist_item` `chat_message` |
| `action` | _Function_ | Ação que será executada.<br>`function(evt) { /*   */ }`<br>`evt.type` contém o tipo do item que gerou a ação de contexto.<br>`evt.item` contém as informações do item que gerou a ação.<br>[Saiba mais](https://github.com/holyrics/Scripts/blob/main/ContextAction.md) |

## ModuleTextTransformInfo
Contém as informações da origem da requisição

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `screen_id` | _String_ | `public` `screen_2` `screen_3` `screen_?` `stream_image` `stream_html_1` `stream_html_2` `stream_html_3` |
| `source_type` | _String_ | `music` `text` `unknown` |
| `source_id` | _String_ |  |
| `slide_type` | _String_ | `default` `final_slide` `wallpaper` `blank` `black` |
| `text` | _String_ | Texto do slide |
| `slide_number` | _Number_ | Disponível se `source_type = music` ou `source_type = text`.<br>Número do slide. Começa em 1. |
| `total_slides` | _Number_ | Disponível se `source_type = music` ou `source_type = text`.<br>Total de slides. |
| `stage_view_enabled` | _Boolean_ | Verifica se a tela está com a opção **Visão do Palco** ativada |
| `stage_view_preview_mode` | _String_ | Disponível se `stage_view_enabled = true`<br>`CURRENT_SLIDE`<br>`FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR`<br>`FIRST_LINE_OF_THE_NEXT_SLIDE_WITHOUT_SEPARATOR`<br>`NEXT_SLIDE`<br>`CURRENT_AND_NEXT_SLIDE`<br>`ALL_SLIDES` |
| `stage_view_show_comment` | _Boolean_ | Disponível se `stage_view_enabled = true` |
| `stage_view_show_communication_panel` | _Boolean_ | Disponível se `stage_view_enabled = true` |
| <br>Disponível se **source_type=music** |  |  |
| `title` | _String_ | Título da música |
| `artist` | _String_ | Artista da música |
| `author` | _String_ | Autor da música |
| `note` | _String_ | Anotação da música |
| `copyright` | _String_ | Copyright da música |
| `key` | _String_ | Tom da música.<br>Pode ser: `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |
| `bpm` | _Number_ | BPM da música |
| `time_sig` | _String_ | Tempo da música.<br>Pode ser: `2/2` `2/4` `3/4` `4/4` `5/4` `6/4` `3/8` `6/8` `7/8` `9/8` `12/8` |
| `slide_description` | _String_ |  |
| <br>Disponível se **source_type=text** |  |  |
| `title` | _String_ | Título do texto |

## ModuleTextTransform
Define os valores que serão utilizados para adicionar ou substituir o texto do slide na projeção

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `add_start` | _String (opcional)_ | Valor que será adicionado no início do texto do slide atual |
| `add_end` | _String (opcional)_ | Valor que será adicionado no final do texto do slide atual |
| `line_break` | _Boolean (opcional)_ | Adiciona o texto com uma quebra de linha `Padrão: true` |
| `replace` | _String (opcional)_ | Valor para substituir o texto do slide atual |

## ModuleCustomThemeSongInfo
Dados da origem da requisição

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da música |
| `title` | _String_ | Título da música |
| `artist` | _String_ | Artista da música |
| `author` | _String_ | Autor da música |
| `note` | _String_ | Anotação da música |
| `copyright` | _String_ | Copyright da música |
| `text` | _String_ | Texto do slide atual |
| `comment` | _String_ | Comentário do slide atual |
| `slide_index` | _Number_ | Começa em 1. Se for um slide título, o valor é `-1` |
| `slide_total` | _Number_ | Se for um slide título, o valor é `-1` |
| `slide_description` | _String_ |  |
| `key` | _String_ | Tom da música.<br>Pode ser: `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |
| `bpm` | _Number_ | BPM da música |
| `time_sig` | _String_ | Tempo da música.<br>Pode ser: `2/2` `2/4` `3/4` `4/4` `5/4` `6/4` `3/8` `6/8` `7/8` `9/8` `12/8` |

## ModuleCustomThemeTextInfo
Dados da origem da requisição

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do texto |
| `title` | _String_ | Título do texto |
| `text` | _String_ |  |
| `comment` | _String_ |  |
| `folder` | _String_ | Caminho da pasta de localização |
| `slide_index` | _String_ | Começa em 1. |
| `slide_total` | _String_ |  |

## ModuleThemeFilter
Define parâmetros de filtro para seleção de tema e plano de fundo.

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String (opcional)_ | Nome do Tema ou plano de fundo |
| `tag` | _String (opcional)_ | Tag do Tema ou plano de fundo |
| `tags` | _Array&lt;String&gt; (opcional)_ | Tags do Tema ou plano de fundo |
| `intersection` | _Boolean (opcional)_ | Disponível se `tags` for declarada.<br>Se `true`, serão retornados apenas os itens que contêm todas as tags declaradas em `tags`.<br>Se `false`, serão retornados os itens que contêm qualquer uma das tags declaradas em `tags`. |
| `type` | _String (opcional)_ | Filtrar somente itens do tipo declarado.<br>`theme` `my_video` `my_image` |
| `cache_key` | _String (opcional)_ | Chave de cachê para reutilizar o Tema ou plano de fundo para os slides seguintes com o mesmo `cache_key`.<br>Por exemplo, se um slide retornar `cache_key: 'abc'`, os slides seguintes que retornarem `cache_key: 'abc'` utilizarão o mesmo Tema ou plano de fundo desse primeiro slide que retornou `cache_key: 'abc'`.<br>É útil para que mesmo retornando um filtro que resultará em múltiplos itens, o mesmo item será utilizado para o respectivo slide, em vez de selecionar um aleatoriamente |
| `base_theme` | _Object (opcional)_ | Define qual será o Tema base utilizado.<br>É útil para casos em que o item filtrado será um vídeo ou imagem, e deseja garantir qual será o Tema base utilizado, em vez de depender do Tema selecionado pelo usuário.<br>Pode ser o id do Tema, nome do Tema ou um objeto [Theme](https://github.com/holyrics/jslib#theme) |
| `base_theme_edit` | _[Theme](https://github.com/holyrics/jslib#theme) (opcional)_ | Configurações para modificar o Tema selecionado para exibição |
| `custom_theme` | _[Theme](https://github.com/holyrics/jslib#theme) (opcional)_ | Define um Tema específico como resultado.Todos os outros parâmetros serão ignorados, exceto `cache_key`. |

## ModuleLineBreakRulesInfo
Dados da origem da requisição

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `screen.id` | _String_ | `public` `screen_2` `screen_3` `...` |
| `presentation.type` | _String_ | `song` `text` `announcement`,  `automatic_presentation` `...` |
| `word` | _String_ | Palavra atual que está gerando uma nova quebra de linha.<br>Este é o valor candidato para iniciar a nova linha. |
| `previousWords` | _Array&lt;String&gt;_ | Lista de palavras da linha atual |
| `nextWords` | _Array&lt;String&gt;_ | Lista de palavras restantes. (Após a palavra atual). |

## ModuleCustomMessageInApp
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ |  |
| `description` | _String_ |  |
| `input` | _Array&lt;[ModuleCustomMessageInAppParam](#modulecustommessageinappparam)&gt;_ |  |
| `action` | _Function_ | Ação executada ao receber uma mensagem do app celular com os valores de cada input.<br>`function(evt) { /*   */ }`<br><br>`evt.input` contém os valores de cada `input` no seu respectivo `id`, exemplo: evt.input.example.<br>`evt.note` contém o campo 'observação' informado pelo usuário. |
| `require_module_permission` | _Boolean_ | Se `true`, o item será listado no app somente se o celular cadastrado estiver com a permissão `Módulos` liberada nas configurações do programa. |

## ModuleCustomMessageInAppParam
Representa um parâmetro (input) utilizado por `ModuleCustomMessageInApp`

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `label` | _String_ | Nome do item |
| `suggestions` | _Array&lt;String&gt; (opcional)_ | Lista de sugestões para o usuário preencher o item |
| `only_number` | _String (opcional)_ | Parâmetro aceita somente números |
| `uppercase` | _String (opcional)_ | Parâmetro exibido sempre em maiúsculo |

## ModulePopupMenuItem
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `label` | _String_ | Nome do item |
| `type` | _String (opcional)_ | Tipo do item.<br>Pode ser: `item` `menu` `separator` `title` `checkbox` `radio` `Padrão: item` |
| `action` | _Function_ | `function(evt) { /*   */ }`<br>`evt.action_id` contém o id da respectiva `action`<br>`evt.input` contém os valores salvos obtidos do campo `input` da respectiva `action`<br>`evt.popup_menu_id` contém o id do respectivo `PopupMenuItem`. |
| `items` | _Array&lt;[ModulePopupMenuItem](#modulepopupmenuitem)&gt; (opcional)_ | Disponível se `type = menu` |
| `checked` | _Boolean (opcional)_ | Disponível se `type = checkbox` ou `type = radio` `Padrão: false` |



# Exemplo

Um módulo de exemplo: [example.js](https://github.com/holyrics/JSCommunity/tree/main/src/modules/example/example.js)