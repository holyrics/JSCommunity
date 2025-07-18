# Rule

**EN** | [PT](README.md)

---


`tools menu > several > rules`

In `v2.26.0`, an option was made available to create rules for the conditional execution of certain items in the program, such as triggers, for example.<br>
It is possible to create a reusable rule model using JavaScript.

Here is the documentation on how to create this model.<br>
And here are also listed ready-made models that are available in the program for use by other users.<br>
To create new rule models available natively in the program for use by other users, add the `.js` files here in this folder (rules).<br>

# Documentation

## info()

It should return the model information, such as id, name, description, etc.<br>

Example:
```javascript
function info() {
  return {
    id: 'example',
    name: 'Example', //default name
    description: 'Example', //default description
    "i18n": { //translation
        "name": {
            "en": "Name translated to the corresponding language",
            "??": "..."
        },
        "description": {
            "en": "Description translated to the corresponding language",
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

**settings_type:** can be `custom` `string` `number` `date` `time` `datetime`<br>
The type of configuration that will be displayed in the interface.<br>
The program deals with generic standard interface models for cases where the tested value will be, for example, a number.<br>
The model will only need to return the number for testing by the `function ruleGetValueToTest()` that the program will test based on the configurations defined by the user, for example "contains", "is equal to", "is greater than", etc.
If `settings_type=custom` (default), the model must implement the settings in the `function ruleSettings()`

**timeout_test:** `50 ~ 500` Timeout in milliseconds for function execution: `ruleTest(evt)`<br>

**timeout_get_value_to_test:** `50 ~ 2000` Timeout in milliseconds for function execution: `ruleGetValueToTest()`<br>

**result_when_timeout:** Default value that will be considered as the test result if the function execution receives a `timeout`<br>

---

## ruleSettings()

It must be declared if `settings_type` is equal to 'custom'.<br>
Displays configuration components in the interface where the user can define values to be used as parameters in the rule testing.<br>
It should return an array of [InputParam](https://github.com/holyrics/Scripts/blob/main/i18n/en/InputParam.md).<br>
The value of each item will be available in `evt.settings` received in `function ruleTest(evt)`, for example, `evt.settings.example`.

Example:
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

It must be declared if `settings_type` is equal to 'custom'.<br>
Method that should return `true` or `false`, which is the result of the rule test.

Example:
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

It must be declared if `settings_type` is different from 'custom'.<br>
It should return the base value that will be used for testing based on the settings defined in the interface by the user.<br>

Example:
```javascript
function ruleGetValueToTest() {
  var r = h.hly('GetMediaPlaylist');
  //number of items in the media playlist
  return r.data.length;
}
```