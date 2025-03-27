# Modules

**EN** | [PT](README.md)

---


Available from version `2.23.0` of the Holyrics program.

The **Modules** feature allows the creation of solutions using JavaScript [(jslib)](https://github.com/holyrics/jslib/tree/main/README-en.md) that interact with various resources of the program, enabling the modification and/or adaptation of the program's functionality, creating buttons that execute custom actions, real-time triggers, among other possibilities, all in one place.

Since August 2022 `v2.18.0`, several features related to JavaScript have been added to the program, and the number of resources and possibilities available in the library [jslib](https://github.com/holyrics/jslib/tree/main/README-en.md) has increased.<br>
As a result, some solutions created needed to interact with different resources of the program, requiring access to and adding/editing JavaScript code in various different locations of the program.<br>
The **Modules** feature solves this by allowing interaction with various functionalities and different resources of the program in a single JavaScript code.<br>
Even allowing the creation of action buttons in the program window, without the user needing to create and manage various different buttons and JavaScript codes.

This repository organizes the modules created by the community that will be made available in the program so that any user can search for and "install" these modules for use in the **Modules** window in the program.

# Resources

A module is based on several `functions` that return the corresponding content for use and execution in the program.<br>
The actions will only be performed if the module is added and activated by the user.<br>
Note: In the module window, each item can have conditional executions, such as only in certain services or in a specific execution environment.<br>
The module will be considered "disabled" if the current conditional execution is `false`, even if the checkbox is checked.<br>

# Availability and License

We reserve the right to deny the approval of any module for any reason, at our sole discretion.

More details about the licensing of the codes provided in the **Modules** feature, visit: [LICENSE](https://github.com/holyrics/JSCommunity/tree/main/src/modules/LICENSE-en.md)

# Tutorial

## Create a module
The modules should be created within a subfolder of [modules](https://github.com/holyrics/JSCommunity/tree/main/src/modules).<br>
Each person or organization should create their own subfolder for their modules.<br>
For example: `modules/holyrics`

All `*.js` files in the root of this subfolder will be considered modules.<br>
For example: `modules/abc/example.js`<br>
The name of the file is irrelevant; the `name` and `id` of the module will be obtained from `function info()` within each module.

If you create more than one module and have the same codes in different modules, it is possible to use a basic structure of dependency/import.<br>
Add reusable codes in `*.js` files inside the `lib` subfolder.<br>
For example: `modules/abc/lib/utils.js`<br>
And in each module, add the line `//#import utils` (anywhere).

For example, in the file `modules/abc/lib/utils.js`
```javascript
function getDefaultModuleInfoDescription() {
  return 'abc';
}
```

And in the module `modules/abc/example.js`:
```javascript
//#import utils

function info() {
    id: 'id',
    name: 'name',
    description: getDefaultModuleInfoDescription()
    //...
}
```

It is possible to use the `include` button in the Holyrics program as a way to manage these external codes.<br>
When creating and testing your modules in the Holyrics program, in the `include` window, create a new tab for each possible different file and keep the codes within those tabs in `include`, instead of leaving them in the module's own code.<br>
**Bug in `v2.23.0`** - It was identified that when editing the include, the modules do not use the updated include, so it is necessary to edit anything minimal in the module's code (a simple space) to force the module to restart and use the updated include.<br>
Fixed in `v2.24.0`

In version `2.24.0`, a global variable called `module` was added, which will be available by default in the JavaScript code context of a module.<br>
Avoiding the need to pass the `module` object received in the original function declaration, for example, `function actions(module) {`

### Internationalization (I18N)
Use `jsc.i18n(...)` to internationalize the module for different languages. [(Know more)](https://github.com/holyrics/JSCommunity/blob/main/README_I18N-en.md)<br>
Example:<br>
```javascript
function actions(module) {
  var arr = [];

  arr.push({
    id: 'simple_action',
    name: jsc.i18n('Simple Action'),
    ...
  });

  return arr;
}
```

## Functions

### info()
Returns the information of the module.



**Return:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Module ID. `unique` |
| `name` | _String_ | Module name |
| `description` | _String_ | Module description.Compatible with `html` formatting. |
| `allowed_requests` | _Array&lt;String&gt; (optional)_ | List of hosts and/or IPs added to the allowed requests list.<br>Allows making requests via `module.apiRequest, module.ws, ...` by passing the host or IP directly, without needing to have a receiver created for communication. |
| `min_version` | _String (optional)_ | Minimum required version of the program |
| `max_version` | _String (optional)_ | Maximum required version of the program `v2.24.0+` |
| `i18n` | _Object (optional)_ | Translation for module name and description `v2.24.0+` |
| `permissions` | _Array&lt;[Permission](#permission)&gt; (optional)_ | Advanced permissions required for the module `v2.24.0+` |
| `os_required` | _String (optional)_ | If declared, the module will be available only for the specified operating system. Separate multiple values with a comma.<br>Can be: `windows` `unix` `osx` `v2.24.0+` |
| `available_in_main_window` | _Boolean (optional)_ | Display the module in the module bar of the main window `Default: true` `v2.24.0+` |
| `available_in_bible_window` | _Boolean (optional)_ | Display the module in the module bar of the Bible window `Default: true` `v2.24.0+` |


**Example:**

```javascript
function info() {
  return {
    id: 'xyz',
    name: 'Module name',
    description: '<b>Module</b> description',
    allowed_requests: [
      'https://www.holyrics.com.br/v1/api_example/'
    ],
    min_version: '2.23.0',
    max_version: '2.24.0',
    i18n: {
      name: {
        pt: 'Nome do módulo',
        es: '...'
      },
      description: {
        pt: 'Descrição do <b>módulo</b>',
        es: '...'
      }
    },
    permissions: [
      {
         type: 'blacklist_request',
          key: 'obs_v5',
        value: 'SetInputSettings'
      }
    ]
  };
}
//Note: it is recommended to set the name and description of the module in English and create translations for other languages (pt, en, ...)
//In this way, the default language displayed to the user will be English, if the respective value is not translated into the language set in the user's program.
```

---

### settings(module)
Returns the list of module configurations.<br>Displays various components such as text box, checkbox, combobox, etc. in the module configuration window.<br>The value set by the user in the module settings will be available in `settings` of each object of type `module`.<br>Observation: The `settings` field of `module.settings` is not available in this method, only the other information of the object.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  |
| :---: |
| _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt;_ | 


**Example:**

```javascript
function settings(module) {
  var arr = [];
  arr.push({
    id: 'settings_1',
    name: jsc.i18n('Name 1'),
    type: 'string'
  });
  arr.push({
    id: 'settings_2',
    name: jsc.i18n('Name 2'),
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
Returns the list of actions that will be displayed in the program window, in the module panel, below the favorites bar.<br>An action item can perform actions when clicked, but it can also open a submenu with other action items, behaving like a folder.<br>There can be `inputs` that will be displayed when right-clicking on the item, option "edit".<br>And there may be menu items that will be displayed when right-clicking on the item.<br><br>**bug in v2.23.0**<br>The value of the input changed by the user in the dialog window is not being updated when clicking OK.<br>To fix the problem, add the line:<br>`jsc.utils.module.fixActions(module, arr);`<br>before `return`.<br>Fixed in `v2.24.0`

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  |
| :---: |
| _Array&lt;[ModuleAction](#moduleaction)&gt;_ | 


**Example:**

```javascript
function actions(module) {
  var arr = [];

  var simpleActionFlag = module.id + "#simple_action_enabled";
  arr.push({
    id: 'simple_action',
    name: jsc.i18n('Simple Action'),
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
    name: jsc.i18n('Show Quick Message'),
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
        name: jsc.i18n('Message')
      }, {
        id: 'duration',
        type: 'number',
        name: jsc.i18n('Duration'),
        min: 1,
        max: 120,
        default_value: 30
      }
    ]
  });

  arr.push({
    id: 'folder_example',
    name: jsc.i18n('Folder'),
    icon: 'folder_open',
    action: [
      {
        id: 'folder_simple_action_1',
        name: jsc.i18n('Simple Action 1'),
        action: function (evt) {
          //todo
        }
      }, {
        id: 'folder_simple_action_2',
        name: jsc.i18n('Simple Action 2'),
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
  // arr can be an array or an individual action item
  // jsc.utils.module.fixActions(module, arr[0]);

  return arr;
}
```

---

### loops(module)
This is the corresponding method of `h.setInterval(function, timeout)`.<br>Creates loops to be executed every x time

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  |
| :---: |
| _Array&lt;[ModuleLoop](#moduleloop)&gt;_ | 


**Example:**

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
Executed always at the module initialization.<br>It is executed even if the module is disabled.<br>It is not executed when enabling or disabling the module, but during its initialization.<br>For example, it is executed when editing the JavaScript code of the module, or when calling `module.restart()`.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


_Method does not return value_

**Example:**

```javascript
function startup(module) {
    //implementation
}
```

---

### shutdown(module)
Executed upon closing the program.<br>It will only be executed if the module is enabled and with conditional execution `true`.<br><br>`timeout 3000ms`

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


_Method does not return value_

**Example:**

```javascript
function shutdown(module) {
    //implementation
}
```

---

### triggers(module)
This is the corresponding method of `h.addTriggerListener(input)` and `tools menu > various > triggers`.<br>Allows creating triggers that will be executed when a corresponding action occurs in the program.<br>For example, create a trigger to be executed whenever a song lyric is displayed, or a trigger to be executed whenever the slide of a song lyric changes.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  |
| :---: |
| _Array&lt;[TriggerItem](#trigger-item)&gt;_ | 


**Example:**

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
This is the corresponding method from `file menu > settings > advanced > javascript > system variables`.<br>Allows the creation of methods that can be used within texts that will be displayed in the projection, control panel, alert, etc.<br>The variable defined in the text will be replaced in real time by the value returned in the respective `function`.<br><br>For example:<br>`test: function() { return 'abc'; }`<br>The typed text `123 @js{test} xyz` will be displayed as `123 abc xyz`.<br><br>It is also possible to use `function` with parameters:<br>`sum: function(a, b) { return a + b; }`<br>The typed text `3+4=@js{sum(3,4)}` will be displayed as `3+4=7`.<br>

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  | Description |
| :---: | ------------|
| _Object_ | Key/value map<br>Each key is the name of the variable created by the system<br> <br> Each value is a `function` that returns the corresponding value of the system variable, or an object of the type: [ModuleSystemVariableAction](#modulesystemvariableaction) |


**Example:**

```javascript
function systemVariables(module) {
  var obj = {};
  
  //   text: 123 @js{test} xyz
  // result: 123 abc xyz
  obj.test = function() {
    return 'abc';
  };
  
  //   text: 3 + 4 = @js{sum(3, 4)}
  // result: 3 + 4 = 7
  obj.sum = function(a, b) {
    return a + b;
  };
  
  return obj;
}
```

---

### contextActions(module)
This is the corresponding method of `tools menu > miscellaneous > context actions`.<br>Creates items in the context menu (right-click) of a respective item, allowing specific actions to be performed for an item.<br>For example, create an action called `Mute` that plays a video without sound.<br>By right-clicking on a video item in the program, in the `Context Action` submenu, selecting the `Mute` item, the video information will be redirected to the respective `function`.<br>And then the `function` can implement setting the program's player to `mute = true` and then execute the respective video.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  |
| :---: |
| _Array&lt;[ModuleContextAction](#modulecontextaction)&gt;_ | 


**Example:**

```javascript
function contextActions(module) {
  var arr = [];

  arr.push({
    name: jsc.i18n('Iniciar do Coro'),
    types: ['song'],
    action: function (evt) {
      var r = h.hly('GetSong', {id: evt.item.id});
      if (!r.data) {
        var error = jsc.i18n("Item não encontrado: {}", ["Song by ID: " + evt.item.id]);
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
      var error = jsc.i18n("Item não encontrado: {}", ["Chorus - Song: " + evt.item.title]);
      h.notificationError(error, 3);
    }
  });

  arr.push({
    name: jsc.i18n('Exibir por {} segundos', [10]),
    types: ['image', 'image_folder'],
    filter: {
      item: {
        extension: 'png'
        //regex
        //extension: '--rgx (jpg|png)'
      }
    },
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
This is the corresponding method of `file menu > settings > miscellaneous > insert text`.<br>Allows you to insert text at the beginning or end of a slide or change the current text.<br>This action is performed at runtime at the moment of projecting the respective slide and is applied independently for each screen, according to the value in `screen_id`.<br>Note: there is a 30-second cache to reuse the last value returned by the `function`, based on the same slide and the same screen.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `song` | _Function (optional)_ | `function(obj) { /* return ModuleTextTransform; */ }`<br>`obj` is of type: [ModuleTextTransformInfo](#moduletexttransforminfo).<br><br>It should return an object: [ModuleTextTransform](#moduletexttransform).<br> |
| `text` | _Function (optional)_ | `function(obj) { /* return ModuleTextTransform; */ }`<br>`obj` is of type: [ModuleTextTransformInfo](#moduletexttransforminfo).<br><br>It should return an object: [ModuleTextTransform](#moduletexttransform).<br> |
| `extra_slides` | _Function (optional)_ | `function(obj) { /* return ModuleTextTransform; */ }`<br>`obj` is of type: [ModuleTextTransformInfo](#moduletexttransforminfo).<br><br>It should return an object: [ModuleTextTransform](#moduletexttransform).<br> |


**Example:**

```javascript
function textTransform(module) {
  var obj = {};
  
  obj.extra_slides = function(evt) {
    if (evt.screen_id == 'public' && evt.slide_type == 'blank' && evt.source_type == 'music') {
      // This causes on the 'public' screen
      // when the F9 option (without text) is enabled
      // it's for a song lyrics presentation
      // the text '♪' should be displayed
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
This is the corresponding method of `Theme Menu > Automation`.<br>Allows defining the Themes that will be used in the slides at runtime.<br>For example, when playing a song, the `function` defined for the `song` field will be executed for all slides of the song.<br>The theme (or background) used for the respective slide will be according to the settings returned in the method.<br>If the defined parameters generate multiple items as a result, one item from the results will be randomly selected.<br>If the return is `null`, the current slide theme will not be changed.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `song` | _Function (optional)_ | `function(obj) { /* return ModuleThemeFilter; */ }`<br>`obj` is of type: [ModuleCustomThemeSongInfo](#modulecustomthemesonginfo).<br><br>It should return an object: [ModuleThemeFilter](#modulethemefilter) |
| `text` | _Function (optional)_ | `function(obj) { /* return ModuleThemeFilter; */ }`<br>`obj` is of type: [ModuleCustomThemeTextInfo](#modulecustomthemetextinfo).<br><br>It should return an object: [ModuleThemeFilter](#modulethemefilter) |
| `automatic_presentation` | _Function (optional)_ | `function(obj) { /* return ModuleThemeFilter; */ }`<br>`obj` is of type: [ModuleCustomThemeSongInfo](#modulecustomthemesonginfo).<br><br>It should return an object: [ModuleThemeFilter](#modulethemefilter) |


**Example:**

```javascript
function customTheme(module) {
  var obj = {};

  obj.song = function (evt) {
    var textlc = evt.text.toLowerCase();
    if (textlc.contains('fogo') && textlc.contains('chuva')) {
      // if the slide text contains the words 'fire' and 'rain'
      // set a video as a background
      // that has the tags 'Fire' and 'Rain'
      // (both due to 'intersection: true')
      return {
        tags: ['Fogo', 'Chuva'],
        intersection: true,
        type: 'my_videos'
      };
    }
    if (textlc.equals("azul")) {
      // if the text of the slide is equal to 'blue'
      // defines a theme created in real time
      // with the following settings
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


**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  | Description |
| :---: | ------------|
| _Function_ | Define a custom rule for automatic line breaks (when enabled) for presentations in the program (except verses).<br><br>`function(obj) { /* return int; */ }`<br><br>`obj` is of type: [ModuleLineBreakRulesInfo](#modulelinebreakrulesinfo)<br><br>It should return an object: int<br>If the returned number is `zero`, keep the line break in the indicated place, meaning the current word will start a new line.<br>If the returned number is less than `zero`, the last words in `previousWords` will be moved to the new line, in the amount indicated by the returned (positive) number.<br>If the returned number is `1`, the current word will be kept on the current line.<br>If the returned number is greater than `1`, the current word will be kept on the current line and the first words in `nextWords` will be kept on the current line, in the amount indicated by the returned number-1. |


**Example:**

```javascript
function lineBreakRules(module) {
  return function(evt) {
    if (evt.screen.id == 'public'
          && evt.presentation.type == 'song'
          && evt.nextWords.length == 0) {
      // if it is the 'public' screen
      // it's for a song lyrics presentation
      // and there are no remaining words beyond the current word
      // 
      // returns -1 so that the last word of the current line is moved to the next line
      // 
      // this prevents a line break from being created with just a single word alone
      //
      // if 1 were returned, the current word would stay on the current line, avoiding a line break
      // however, in this case, the font size of the slide is reduced
      return -1;
    }
    return 0;
  };
}
```

---

### customMessageInApp(module)
Creates items of the type 'Custom Message' for display in the mobile app.<br>This allows creating an action that depends on inputs provided by the user.<br>For example, an item that requests an `input` called `message`, and then receives in the field `input.message` the value provided in the app by the user.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  |
| :---: |
| _Array&lt;[ModuleCustomMessageInApp](#modulecustommessageinapp)&gt;_ | 


**Example:**

```javascript
function customMessageInApp(module) {
  var arr = [];
  arr.push({
    name: jsc.i18n('Custom Message in the App'),
    description: jsc.i18n('Description'),
    input: [
      {
        id: 'example_1',
        label: jsc.i18n('Name') + ' 1'
      }, {
        id: 'example_2',
        label: jsc.i18n('Name') + ' 2',
        suggestions: [
          'Item 1', 'Item 2', 'Item 3'
        ]
      }, {
        id: 'example_3',
        label: jsc.i18n('Name') + ' 3',
        only_number: true
      }
    ],
    action: function(evt) {
     //evt.input.example_1
     //evt.input.example_2
     //evt.input.example_3
     //evt.note
     var msg = '<html>' + jsc.i18n('Message received from the app')
         + '<br><code>' + h.toPrettyJson(evt.input) + '</code>'
         + '<br>note: ' + evt.note;
     h.notification(msg, 3);
    }
  });
  return arr;
}
```

---

### handleItemAction(module)
- v2.24.0

Captures the action of an executed item.<br>If declared, when executing the corresponding item type, the item information will be redirected to the `function` implemented here, before the item is actually executed in the standard flow of the program.<br> <br>Return `true` in the respective `functions` to block the default action of the program for the executed item.<br>If any value other than `true` is returned, the item will be executed by the program in the standard way.<br>The execution of the `function` has a `timeout` of 1 second, meaning it must return a value quickly.<br>To start a long process, use `h.popupWorker(...)` or `h.setTimeout(...)` to create a background task asynchronously.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `file` | _Function (optional)_ | Action originated from the **File** tab of the program's library.<br>`function(evt) { /* */ }`<br>`evt` is of type: [ModuleHandleItemActionInfo](#modulehandleitemactioninfo) |


**Example:**

```javascript
function handleItemAction() {
  return {
    file: function(evt) {
      if (evt.item.extension.equalsIgnoreCase("txt")) {
        //do action
        return true;
      }
      return false;
    }
  };
}
```

---

### style(module)
- v2.25.0

Returns a list of styles that can be used in formatting based on [Styled Text](https://github.com/holyrics/Scripts/blob/main/StyledText.md).<br> <br>If the return of this method is a dynamic (volatile) value, it is necessary to call `module.fireStyleChanged()` to force the data update.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `module` | _[Module](#module)_ |  |


**Return:**

| Type  | Description |
| :---: | ------------|
| _Object_ | Key/value map where each key is the name of the style and the value is a key/value map with the respective properties of the style |


**Example:**

```javascript
function style() {
  var obj = {};
  
  obj.example = {
    i: true,
    font: 'Arial',
    size: 70
  };
  
  return obj;
}
```

---

# Classes 
## Module
| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Module object ID in the program.<br>It is not the id defined in `function info()`, but the ID of the object in the program. |
| `settings` | _Object_ | Object with the module settings.<br>Each `InputParam` returned in `function settings()` will be available in the `settings` field. |
| `global` | _Object_ | Object for dynamic manipulation of the values stored in: module.setGlobal()<br>Example<br>`var n = module.global.abc;`<br>`var n = module.getGlobal('abc');`<br>...<br>`module.global.abc = 'xyz';`<br>`module.setGlobal('abc', 'xyz');` `v2.24.0+` |
| `store` | _Object_ | Object for dynamic manipulation of the values stored in: module.store()<br>Example<br>`var n = module.store.abc;`<br>`var n = module.restore('abc');`<br>...<br>`module.store.abc = 'xyz';`<br>`module.store('abc', 'xyz');` `v2.24.0+` |
| `device` | _Object_ | Saves and retrieves an object saved on disk, which can be retrieved even after restarting the program<br>Works like `h.store()` and `h.restore()`, but the saved value is not shared in cloud synchronization, meaning the data is saved only for the local device. `v2.24.0+` |
| `files` | _[FileUtils](https://github.com/holyrics/jslib/blob/main/doc/en/FileUtils.md)_ | Utility class for some file manipulation methods. `v2.24.0+` |
### getName()
Returns the name of the module.



**Response:**

| Type  |
| :---: |
| _String_ | 


---

### isEnabled()
Check if the module is enabled.<br>Will return `false` if the conditional execution of the module is `false`.



**Response:**

| Type  |
| :---: |
| _Boolean_ | 


---

### log(msg, ...args)
Adds a message to the internal log of the module.<br>It can be accessed through the log window, by clicking the "3 dots" button in the respective module.<br>It is also saved in a file at `./logs/module/{module_id}.txt`.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `msg` | _String_ | Message to be added to the internal log of the module |
| `args` | _Array&lt;Object&gt;_ | Parameters for formatting a log message |


_Method does not return value_

**Example:**

```javascript
module.log('item: {}, item 2: {}', ['value', 'value 2']);
```

---

### updatePanel()
Forces the restart of the action panel of the current module in the module panel.<br>Useful for cases where the number of buttons returned in `function actions(module)` changes.<br>For example, if the module displays action buttons dynamically and the number of buttons can vary at runtime.



_Method does not return value_

---

### repaintPanel()
Force the update of the module panel buttons.<br>Useful for cases where an action button has its status changed, such as activated/deactivated.<br>The buttons are usually updated every 2 seconds, or when clicked.<br>Use this method only if you need to force the button to update without waiting for the standard update triggers.



_Method does not return value_

---

### restart()
Forces the module to restart.



_Method does not return value_

---

### openSettings(id = 'settings')
- v2.24.0

Open the module configuration window.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String (optional)_ | Can be: `settings` `advanced_permissions` `allowed_files` `Default: settings` |


_Method does not return value_

---

### registerSettings(id, inputs)
### loadSettings(id, inputs)
Loads in the `settings` field of the extra configurations module that are not declared in `function settings()`.<br>Useful for storing extra configurations directly in the module, and also prevents access to the stored content by other codes.<br>Call this method in `function startup(module)` so that the `settings` field is populated with the values saved in the module, or at least with the values defined in `default_value` of each `InputParam`.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Configuration ID, which is the name of the field that will be defined in `settings`. Be careful with the id defined here, as it may create a conflict with the `id` defined in an `InputParam` returned in `function settings()`. |
| `inputs` | _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt;_ |  |


**Response:**

| Type  | Description |
| :---: | ------------|
| _Object_ | Object with previously stored values, where each key is the `id` of the respective `input`.<br>The value defined in `default_value` of each item will be returned if there is no previously stored value |


**Example:**

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
Display a window with input fields to receive information interactively.<br>The values will be automatically saved in the `settings.id` field, where `id` is the value defined here in the `id` parameter.<br>The value will only be stored when clicking OK in the settings window.

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Configuration ID, which is the name of the field that will be defined in `settings`. Be careful with the id defined here, as it may create a conflict with the `id` defined in an `InputParam` returned in `function settings()`. |
| `inputs` | _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt;_ | It can be `null` if `registerSettings(id, inputs)` or `loadSettings(id, inputs)` has been called at any time before |


**Response:**

| Type  | Description |
| :---: | ------------|
| _Object_ | Object with the provided inputs or `null` if the window was closed/canceled |


**Example:**

```javascript
module.inputSettings('sets_name', null);
```

---

### relativeMethods
- v2.24.0

All the following methods have the same documentation as the respective original method.
```
store(key, value)

restore(key, default = null)

setGlobal(key, value, ttl = 0)

getGlobal(key, default = null)

setGlobalNext(key, values, ttl = 0)

getGlobalAndSet(key, default = null, newValue)

getGlobalAndSet(key, newValue)

getGlobalAndSetNext(key, values)

setGlobalNextAndGet(key, values)
```




_Method does not return value_

**Example:**

```javascript
module.store('key', 'value');
var n = module.restore('key');

module.setGlobal('abc', 'xyz');
var n = module.getGlobal('abc');
```

---

### apiRequest(id, raw)
- v2.24.0

Same syntax as: [jslib.apiRequest(id, raw)](https://github.com/holyrics/jslib#apirequestid-raw)



**Response:**

| Type  | Description |
| :---: | ------------|
| _Object_ | Request return or NULL for error/timeout |


**Example:**

```javascript
module.apiRequest('receiver_id', {});
```

---

### getApiRequestLastError()
- v2.24.0

Same syntax as: [jslib.getApiRequestLastError()](https://github.com/holyrics/jslib#getapirequestlasterror)



**Response:**

| Type  | Description |
| :---: | ------------|
| _String_ | Last request error or NULL if no error |


**Example:**

```javascript
var err = module.getApiRequestLastError();
```

---

### apiRequestAsync(id, raw, callback = null)
- v2.24.0

Same syntax as: [jslib.apiRequestAsync(id, raw, callback = null)](https://github.com/holyrics/jslib#apirequestasyncid-raw-callback--null)



_Method does not return value_

**Example:**

```javascript
var callback = function(response, error) {
    //
};
module.apiRequestAsync('receiver_id', {}, callback);
```

---

### apiRequestEx(id, raw)
- v2.24.0

Same syntax as: [jslib.apiRequestEx(id, raw)](https://github.com/holyrics/jslib#apirequestexid-raw)



**Response:**

| Type  | Description |
| :---: | ------------|
| _Object_ | Request return |


**Example:**

```javascript
module.apiRequestEx('receiver_id', {});
```

---

### tcp(receiver, cacheID, modelToCreate)
### tcp(receiver, cacheIDOrModelToCreate)
### tcp(receiver)
- v2.24.0

Same syntax as: [jslib.tcp(receiver, cacheID, modelToCreate)](https://github.com/holyrics/jslib#tcpreceiver-cacheid-modeltocreate)



**Response:**

| Type  |
| :---: |
| _[TCPClient](https://github.com/holyrics/jslib/blob/main/doc/en/TCPClient.md)_ | 


**Example:**

```javascript
var tcp = module.tcp('receiver_id', modelToCreate);
```

---

### ws(receiver, cacheID, modelToCreate)
### ws(receiver, cacheIDOrModelToCreate)
### ws(receiver)
- v2.24.0

Same syntax as: [jslib.ws(receiver, cacheID, modelToCreate)](https://github.com/holyrics/jslib#wsreceiver-cacheid-modeltocreate)



**Response:**

| Type  |
| :---: |
| _[WebSocketClient](https://github.com/holyrics/jslib/blob/main/doc/en/WebSocketClient.md)_ | 


**Example:**

```javascript
var ws = module.ws('receiver_id', modelToCreate);
```

---

### process(file, input = null)
- v2.24.0

Same syntax as: [jslib.process(file, input = null)](https://github.com/holyrics/jslib#process(file-input--null))



**Response:**

| Type  |
| :---: |
| _[Process](https://github.com/holyrics/jslib/blob/main/doc/en/Process.md)_ | 


**Example:**

```javascript
var p = module.process('filename.exe', {
  cli: ['param 1', 'param 2'],
  on_message: function(msg) {
    h.log(msg.readString());
  },
  on_error: function(msg) {
    h.log("error: " + msg.readString());
  },
  on_finish: function(code) {
    //todo
  },
  timeout: 10000
});
p.send('example');
p.await();
```

---

### executeCmdAndWait(file, cli = null, timeout = 5000)
- v2.24.0

Same syntax as: [jslib.executeCmdAndWait(file, cli = null, timeout = 5000)](https://github.com/holyrics/jslib#executecmdandwaitfile-cli--null-timeout--5000)



**Response:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `data` | _Object_ |  |
| `data.status` | _Object_ | Can be: `ok` `error` |
| `data.data` | _Object_ | `data.code` Exit code or error message<br>`data.output` Full text received from the executed process `stdout`<br>`data.error` Full text received from the executed process `stderr` |
| `data.error` | _Object_ | Error message |


**Example:**

```javascript
var r = module.executeCmdAndWait('filename.exe', ['param 1', 'param 2'], 3000);
//r.status
//r.error //can be null
//r.data //can be null
//r.data.code
//r.data.output
//r.data.error
```

---

### updateAction(...id)
- v2.24.0

Force the update of an action's status

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Item ID |


_Method does not return value_

**Example:**

```javascript
module.updateAction('id');
module.updateAction('id1', 'id2');
```

---

### getRuntimeID()
- v2.24.0

Temporary ID that is valid only during the current execution of the program



**Response:**

| Type  |
| :---: |
| _String_ | 


---

### getAllowedFiles()
- v2.24.0

List of allowed files for execution



**Response:**

| Type  |
| :---: |
| _Array&lt;String&gt;_ | 


---

### isAllowedExtensionToExecute(extension)
- v2.24.0

Checks if the extension is on the permission list for execution

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `extension` | _String_ |  |


**Response:**

| Type  |
| :---: |
| _Boolean_ | 


---

### isAllowedFileToExecute(file)
- v2.24.0

Checks if a file from the files tab is on the permission list for execution

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `file` | _String_ | File name (including subfolder) |


**Response:**

| Type  |
| :---: |
| _Boolean_ | 


---

### hly(action, input)
### hly(action)
- v2.25.0

Same syntax as: `jslib.hly(...)`



**Response:**

| Type  |
| :---: |
| _Object_ | 


**Example:**

```javascript
var r = h.hly('GetSong', { id: '123' });
```

---

### hlyOrThrow(action, input)
### hlyOrThrow(action)
- v2.25.0

Same syntax as: `jslib.hlyOrThrow(...)`



**Response:**

| Type  |
| :---: |
| _Object_ | 


**Example:**

```javascript
var r = h.hlyOrThrow('GetSong', { id: '123' });
```

---

### fireStyleChanged()
- v2.25.0

Forces the cache cleaning of the `style` properties.<br>It is necessary to call when the content returned by `function style()` is changed.



_Method does not return value_

---

### isAllowedEditImportantData()
- v2.25.0

Check if the permission to edit important program data (song lyrics, theme, etc.) is granted.



**Response:**

| Type  |
| :---: |
| _Boolean_ | 


---


## ModuleAction
| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Item ID |
| `name` | _String_ | Item name |
| `icon` | _String (optional)_ | Default item icon.<br>Uses the syntax of [Icon](https://github.com/holyrics/Scripts/blob/main/i18n/en/Icon.md). |
| `icon_color` | _String (optional)_ | Icon color in hexadecimal format. |
| `hint` | _String (optional)_ | Tooltip text that will be displayed when the mouse hovers over the item |
| `input` | _Array&lt;[InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md)&gt; (optional)_ | Item configuration list.<br>Available for the user to edit by right-clicking on the item.<br><br>**bug in v2.23.0**<br>The value of the input changed by the user in the dialog window is not being updated when clicking OK.<br>To fix the problem, add the line:<br>`jsc.utils.module.fixActions(module, arr);`<br>before `return`.<br>Fixed in `v2.24.0` |
| `status` | _Object (optional)_ | Return the current display state of the item.<br>Defines the display settings of the item at runtime, such as icon, color, etc.<br>Uses the syntax of [StatusView](https://github.com/holyrics/Scripts/blob/main/StatusView.md). |
| `action` | _Function (optional)_ | `function(evt) { /*   */ }`<br>`evt.action_id` contains the id of the respective `action`<br>`evt.input` contains the saved values obtained from the `input` field of the respective `action`.<br>Executed when clicking and dragging the item. |
| `mouse_pressed` | _Function (optional)_ | `function(evt) { /*   */ }`<br>`evt.action_id` contains the id of the respective `action`<br>`evt.input` contains the saved values obtained from the `input` field of the respective `action`.<br>Executed when clicking on the item. |
| `mouse_released` | _Function (optional)_ | `function(evt) { /*   */ }`<br>`evt.action_id` contains the id of the respective `action`<br>`evt.input` contains the saved values obtained from the `input` field of the respective `action`.<br>Executed upon releasing the item.<br>**Attention:** mouse_pressed in `v2.23.0` is being executed when right-clicking on the item.<br>Fixed in `v2.24.0` |
| `available_in_app` | _Boolean (optional)_ | Indicates whether the action item will be available and listed in the Holyrics mobile app.<br>Items marked as `true` will be displayed in the `Favorites` tab of the app.<br>The mobile phone also needs to have the `Module` permission enabled in the Holyrics settings, under the `manage remote access without password` button `Default: false` |
| `popup_menu` | _Array&lt;[ModulePopupMenuItem](#modulepopupmenuitem)&gt; (optional)_ | Items displayed in the context menu when right-clicking on the item.<br>It can be a `function` that returns Array&lt;[ModulePopupMenuItem](#modulepopupmenuitem)&gt;.<br>`function(evt) { return []; }`<br>`evt.source` contains the current `ModuleAction` object. |

## ModuleLoop
| Name | Type  | Description |
| ---- | :---: | ------------|
| `name` | _String_ | Item name |
| `delay` | _Number_ | Interval in milliseconds between each run.<br>Maximum: `300000`. |
| `action` | _Function_ | Function that will be executed |

## Trigger Item
| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String (optional)_ | Item ID |
| `when` | _String_ | `displaying` `closing` `change` `event` |
| `item` | _String_ | Type of item. Can be:<br>**when=displaying**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_song_slide` `any_text_slide` `any_ppt_slide` `any_theme` `any_background` `any_title_subitem` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `any_countdown` `any_automatic_presentation_slide` `f8` `f9` `f10`<br><br>**when=closing**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `f8` `f9` `f10`<br><br>**when=change**: `countdown_seconds_public` `countdown_seconds_communication_panel` `timer_seconds_communication_panel` `wallpaper` `wallpaper_service` `stage` `playlist` `bpm` `hue` `player_volume` `player_mute` `player_pause` `player_repeat` `player_list_or_single` `player_shuffle`<br><br>**when=event**: `new_message_chat` `verse_presentation_changed` `playlist_changed` `file_modified` `player_progress` |
| `action` | _Function_ | Action to be executed.<br>`function(obj) { /*  */ }`<br>Content of `obj` according to the item type:<br>[`any_song`](https://github.com/holyrics/jslib/blob/main/README-en.md#songinfo)  [`any_text`](https://github.com/holyrics/jslib/blob/main/README-en.md#textinfo)  [`any_verse`](https://github.com/holyrics/jslib/blob/main/README-en.md#verseinfo)  [`any_announcement`](https://github.com/holyrics/jslib/blob/main/README-en.md#announcementinfo)  [`any_audio`](https://github.com/holyrics/jslib/blob/main/README-en.md#audioinfo)  [`any_video`](https://github.com/holyrics/jslib/blob/main/README-en.md#videoinfo)  [`any_image`](https://github.com/holyrics/jslib/blob/main/README-en.md#imageinfo)  [`any_automatic_presentation`](https://github.com/holyrics/jslib/blob/main/README-en.md#automaticpresentationinfo)  [`any_song_slide`](https://github.com/holyrics/jslib/blob/main/README-en.md#songslideinfo)  [`any_text_slide`](https://github.com/holyrics/jslib/blob/main/README-en.md#textslideinfo)  [`any_ppt_slide`](https://github.com/holyrics/jslib/blob/main/README-en.md#pptslideinfo)  [`any_theme`](https://github.com/holyrics/jslib/blob/main/README-en.md#themeinfo)  [`any_background`](https://github.com/holyrics/jslib/blob/main/README-en.md#backgroundinfo)  [`any_title_subitem`](https://github.com/holyrics/jslib/blob/main/README-en.md#titleinfo)  [`any_webcam`](https://github.com/holyrics/jslib/blob/main/README-en.md#webcaminfo)  [`any_audio_folder`](https://github.com/holyrics/jslib/blob/main/README-en.md#audioinfo)  [`any_video_folder`](https://github.com/holyrics/jslib/blob/main/README-en.md#videoinfo)  [`any_image_folder`](https://github.com/holyrics/jslib/blob/main/README-en.md#imageinfo)  [`any_ppt`](https://github.com/holyrics/jslib/blob/main/README-en.md#pptinfo)  [`any_countdown`](https://github.com/holyrics/jslib/blob/main/README-en.md#countdowninfo)  [`any_automatic_presentation_slide`](https://github.com/holyrics/jslib/blob/main/README-en.md#automaticpresentationslideinfo)  [`f8`](https://github.com/holyrics/jslib/blob/main/README-en.md#presentationmodifierinfoinfo)  [`f9`](https://github.com/holyrics/jslib/blob/main/README-en.md#presentationmodifierinfoinfo)  [`f10`](https://github.com/holyrics/jslib/blob/main/README-en.md#presentationmodifierinfoinfo)  [`new_message_chat`](https://github.com/holyrics/jslib/blob/main/README-en.md#newchatmessageinfo)  [`verse_presentation_changed`](https://github.com/holyrics/jslib/blob/main/README-en.md#versepresentationchangedinfo)  [`playlist_changed`](https://github.com/holyrics/jslib/blob/main/README-en.md#playlistchangedinfo)  [`file_modified`](https://github.com/holyrics/jslib/blob/main/README-en.md#filemodifiedinfo)  [`player_progress`](https://github.com/holyrics/jslib/blob/main/README-en.md#playerprogressinfo)<br><br>All items with **when=change** contain: `obj.id` `obj.name` `obj.old_value` `obj.new_value` |
| `name` | _String (optional)_ | Item name. Compatible value for display in **JavaScript Monitor** `v2.23.0+` |
| `filter` | _Object (optional)_ | Execute action only if the object that triggered the event matches the filter object `v2.24.0+` |
<details>
  <summary>See example</summary>

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

## ModuleSystemVariableAction
| Name | Type  | Description |
| ---- | :---: | ------------|
| `action` | _Function_ | Function that will be executed |
| `cache_delay` | _Number (optional)_ | The duration (in milliseconds) that the returned value will be cached for reuse without invoking the `function` again.<br>`500 ~ 60000` `Default: 1000` |

## ModuleContextAction
| Name | Type  | Description |
| ---- | :---: | ------------|
| `name` | _String_ | Item name.<br>Value that will be displayed in the context menu of the respective item. |
| `icon` | _String (optional)_ | Uses the syntax of [Icon](https://github.com/holyrics/Scripts/blob/main/i18n/en/Icon.md). |
| `types` | _Array&lt;String&gt;_ | List of item types that will receive the context action.<br>Accepted values: `audio` `audio_folder` `video` `video_folder` `image` `image_folder` `file` `song` `text` `announcement` `automatic_presentation` `plain_text` `cp_text` `favorite` `paragraph_preview` `song_history` `theme` `presentation_theme_footer` `playlist_item` `song_playlist_item` `chat_message` `service` `event` |
| `action` | _Function_ | Action to be executed.<br>`function(evt) { /*   */ }`<br>`evt.type` contains the type of the item that triggered the context action.<br>`evt.item` contains the information of the item that triggered the action.<br>[Learn more](https://github.com/holyrics/Scripts/blob/main/i18n/en/ContextAction.md) |
| `filter` | _Object (optional)_ | Displays the action only for the object that matches the filter object `v2.24.0+` |
| `checked` | _Object (optional)_ | If this parameter is different from `null`, the item in the context menu will be displayed as a `type=radio`<br>Can be: `boolean` `function` `Default: null` `v2.24.0+` |
| `allow_multiple_items` | _Boolean (optional)_ | Allow multiple item selection `Default: false` `v2.24.0+` |

## ModuleTextTransformInfo
Contains information about the origin of the request

| Name | Type  | Description |
| ---- | :---: | ------------|
| `screen_id` | _String_ | `public` `screen_2` `screen_3` `screen_?` `stream_image` `stream_html_1` `stream_html_2` `stream_html_3` |
| `source_type` | _String_ | `music` `text` `unknown` |
| `source_id` | _String_ |  |
| `slide_type` | _String_ | `default` `final_slide` `wallpaper` `blank` `black` |
| `text` | _String_ | Slide text |
| `slide_number` | _Number_ | Available if `source_type = music` or `source_type = text`.<br>Slide number. Starts at 1. |
| `total_slides` | _Number_ | Available if `source_type = music` or `source_type = text`.<br>Total slides. |
| `stage_view_enabled` | _Boolean_ | Check if the **Stage View** option is enabled on the screen |
| `stage_view_preview_mode` | _String_ | Available if `stage_view_enabled = true`<br>`CURRENT_SLIDE`<br>`FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR`<br>`FIRST_LINE_OF_THE_NEXT_SLIDE_WITHOUT_SEPARATOR`<br>`NEXT_SLIDE`<br>`CURRENT_AND_NEXT_SLIDE`<br>`ALL_SLIDES` |
| `stage_view_show_comment` | _Boolean_ | Available if `stage_view_enabled = true` |
| `stage_view_show_communication_panel` | _Boolean_ | Available if `stage_view_enabled = true` |
| <br>Available if **source_type=music** |  |  |
| `title` | _String_ | Song title |
| `artist` | _String_ | Music artist |
| `author` | _String_ | Music author |
| `note` | _String_ | Music annotation |
| `copyright` | _String_ | Music copyright |
| `key` | _String_ | Tone of music.<br>Can be: `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |
| `bpm` | _Number_ | BPM of the song |
| `time_sig` | _String_ | Music time.<br>Can be: `2/2` `2/4` `3/4` `4/4` `5/4` `6/4` `3/8` `6/8` `7/8` `9/8` `12/8` |
| `slide_description` | _String_ |  |
| <br>Available if **source_type=text** |  |  |
| `title` | _String_ | Text title |

## ModuleTextTransform
Defines the values that will be used to add or replace the text of the slide in the projection

| Name | Type  | Description |
| ---- | :---: | ------------|
| `add_start` | _String (optional)_ | Value that will be added at the beginning of the current slide text |
| `add_end` | _String (optional)_ | Value that will be added at the end of the current slide text |
| `line_break` | _Boolean (optional)_ | Adds the text with a line break `Default: true` |
| `replace` | _String (optional)_ | Value to replace the text of the current slide |

## ModuleCustomThemeSongInfo
Request origin data

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Song ID |
| `title` | _String_ | Song title |
| `artist` | _String_ | Music artist |
| `author` | _String_ | Music author |
| `note` | _String_ | Music annotation |
| `copyright` | _String_ | Music copyright |
| `text` | _String_ | Current slide text |
| `comment` | _String_ | Comment of the current slide |
| `slide_index` | _Number_ | Starts at 1. If it is a title slide, the value is `-1` |
| `slide_total` | _Number_ | If it is a title slide, the value is `-1` |
| `slide_description` | _String_ |  |
| `key` | _String_ | Tone of music.<br>Can be: `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |
| `bpm` | _Number_ | BPM of the song |
| `time_sig` | _String_ | Music time.<br>Can be: `2/2` `2/4` `3/4` `4/4` `5/4` `6/4` `3/8` `6/8` `7/8` `9/8` `12/8` |

## ModuleCustomThemeTextInfo
Request origin data

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Text ID |
| `title` | _String_ | Text title |
| `text` | _String_ |  |
| `comment` | _String_ |  |
| `folder` | _String_ | Path of the location folder |
| `slide_index` | _String_ | Starts at 1. |
| `slide_total` | _String_ |  |

## ModuleThemeFilter
Define filter parameters for theme and background selection.

| Name | Type  | Description |
| ---- | :---: | ------------|
| `name` | _String (optional)_ | Theme or background name |
| `tag` | _String (optional)_ | Theme or background tag |
| `tags` | _Array&lt;String&gt; (optional)_ | Theme or background tags |
| `intersection` | _Boolean (optional)_ | Available if `tags` is declared.<br>If `true`, only items that contain all the tags declared in `tags` will be returned.<br>If `false`, items that contain any of the tags declared in `tags` will be returned. |
| `type` | _String (optional)_ | Filter only items of the declared type.<br>`theme` `my_video` `my_image` |
| `cache_key` | _String (optional)_ | Cache key to reuse the Theme or background for the following slides with the same `cache_key`.<br>For example, if a slide returns `cache_key: 'abc'`, the following slides that return `cache_key: 'abc'` will use the same Theme or background as the first slide that returned `cache_key: 'abc'`.<br>It is useful so that even when returning a filter that results in multiple items, the same item will be used for the respective slide, instead of selecting one randomly |
| `base_theme` | _Object (optional)_ | Define what the base theme will be used.<br>It is useful for cases where the filtered item will be a video or image, and you want to ensure which base Theme will be used, instead of relying on the Theme selected by the user.<br>It can be the Theme id, Theme name, or a [Theme](https://github.com/holyrics/jslib/blob/main/README-en.md#theme) object |
| `base_theme_edit` | _[Theme](https://github.com/holyrics/jslib/blob/main/README-en.md#theme) (optional)_ | Settings to modify the selected Theme for display |
| `custom_theme` | _[Theme](https://github.com/holyrics/jslib/blob/main/README-en.md#theme) (optional)_ | Define a specific theme as a result.All other parameters will be ignored, except `cache_key`. |

## ModuleLineBreakRulesInfo
Request origin data

| Name | Type  | Description |
| ---- | :---: | ------------|
| `screen.id` | _String_ | `public` `screen_2` `screen_3` `...` |
| `presentation.type` | _String_ | `song` `text` `announcement`,  `automatic_presentation` `...` |
| `word` | _String_ | Current word that is causing a new line break.<br>This is the candidate value to start the new line. |
| `previousWords` | _Array&lt;String&gt;_ | List of words from the current line |
| `nextWords` | _Array&lt;String&gt;_ | List of remaining words. (After the current word). |

## ModuleCustomMessageInApp
| Name | Type  | Description |
| ---- | :---: | ------------|
| `name` | _String_ |  |
| `description` | _String_ |  |
| `input` | _Array&lt;[ModuleCustomMessageInAppParam](#modulecustommessageinappparam)&gt;_ |  |
| `action` | _Function_ | Action executed upon receiving a message from the mobile app with the values of each input.<br>`function(evt) { /*   */ }`<br><br>`evt.input` contains the values of each `input` in its respective `id`, for example: evt.input.example.<br>`evt.note` contains the 'observation' field provided by the user. |
| `require_module_permission` | _Boolean_ | If `true`, the item will be listed in the app only if the registered phone has the `Modules` permission enabled in the program settings. |

## ModuleCustomMessageInAppParam
Represents a parameter (input) used by `ModuleCustomMessageInApp`

| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Item ID |
| `label` | _String_ | Item name |
| `suggestions` | _Array&lt;String&gt; (optional)_ | List of suggestions for the user to fill in the item |
| `only_number` | _String (optional)_ | Parameter accepts only numbers |
| `uppercase` | _String (optional)_ | Parameter always displayed in uppercase |

## ModulePopupMenuItem
| Name | Type  | Description |
| ---- | :---: | ------------|
| `id` | _String_ | Item ID |
| `label` | _String_ | Item name |
| `icon` | _String (optional)_ | Uses the syntax of [Icon](https://github.com/holyrics/Scripts/blob/main/i18n/en/Icon.md). `v2.24.0+` |
| `type` | _String (optional)_ | Type of item.<br>It can be: `item` `menu` `separator` `title` `checkbox` `radio` `Default: item` |
| `action` | _Function_ | `function(evt) { /*   */ }`<br>`evt.action_id` contains the id of the respective `action`<br>`evt.input` contains the saved values obtained from the `input` field of the respective `action`<br>`evt.popup_menu_id` contains the id of the respective `PopupMenuItem`. |
| `items` | _Array&lt;[ModulePopupMenuItem](#modulepopupmenuitem)&gt; (optional)_ | Available if `type = menu` |
| `checked` | _Boolean (optional)_ | Available if `type = checkbox` or `type = radio` `Default: false` |

## ModuleHandleItemActionInfo
| Name | Type  | Description |
| ---- | :---: | ------------|
| `item` | _String_ | **file:** [FileInfo](https://github.com/holyrics/jslib/blob/main/README-en.md#fileinfo) |
| `consumed` | _Boolean_ | It will be `true` if the action has been captured by any other module |



## Permission

```javascript
{
   type: 'blacklist_request',
    key: 'obs_v5',
  value: 'SetInputSettings' //OBS WebSocket V5 - Request Type
}
```

```javascript
{
  type: 'advanced',
   key: 'allowed_files'
}
```

Values available for `key`:
`allowed_files`  `files_mkdir`  `files_rename`  `files_copy`  `files_delete`  `edit_important_data`

# Example

An example module: [example.js](https://github.com/holyrics/JSCommunity/tree/main/src/modules/example/example.js)