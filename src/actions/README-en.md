# Code models

**EN** | [PT](README.md)

---


To create new code models, add the files in a subfolder from here (actions).<br>
Select an existing subfolder that best fits the model's objective or, if necessary, create new subfolders.

Each model needs 3 files containing the same prefix, for example:<br>
- abc.json<br>
- abc_functions.js<br>
- abc_script.js<br>

Note: It is not necessary to create a subfolder for each item. Each subfolder/topic can contain several items, which are organized by the prefix.<br>

The `*.json` file contains the model information:<br>
```json
{
    "id": "unique_item_id",
    "name": "Item name",
    "description": "Description of what the item does. It may contain HTML tags for better formatting. <b>bold</b>, <i>italic</i>, ...",
    "i18n": {
        "name": {
            "en": "Name translated to the corresponding language",
            "??": "..."
        },
        "description": {
            "en": "Description translated to the corresponding language",
            "??": "..."
        }
    },
    "script_filter": " obj.type == 'trigger' && obj.when == 'displaying' && obj.item == 'image' "
}
```

`script_filter` condition to display the item in the list of models.<br>
`obj.type` can be `action` or `trigger`<br>
if `obj.type == 'action'`, there will be no other variables.

if `obj.type == 'trigger'`:<br>
<br>
`obj.when` can be `displaying` `closing` `change`<br>
<br>
`obj.item` can be `title` `song` `verse` `text` `audio` `video` `image` `announcement` `automatic_presentation` `countdown` `countdown_cp` `cp_text` `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_song_slide` `any_text_slide` `any_ppt_slide` `any_theme` `any_background` `any_title_subitem` `any_webcam` `countdown_seconds_public` `countdown_seconds_communication_panel` `timer_seconds_communication_panel` `wallpaper` `wallpaper_service` `stage` `playlist` `bpm` `hue`<br>
<br>

The file `*_functions.js` contains the script that is on the right side of the script editing window (optional methods).<br>
To create/organize the more complex methods needed for the execution of the main script.<br>
It is possible to implement the features of [Function Input](https://github.com/holyrics/Scripts/blob/main/i18n/en/FunctionInput.md) and [Item Status](https://github.com/holyrics/Scripts/blob/main/i18n/en/StatusView.md) in this file.<br>
Example:
```javascript
function hGetItemInputParams() {
  return [{
      id: 'duration',
      name: 'Duration (minutes)',
      type: 'number'
  }];
}
```

The file `*_script.js` contains the script that will be executed.<br>
The script of this file is not inside a `function`, as it will be wrapped in a `function` at runtime during the execution of the code in the program.<br>
The default variable for any `function` in the program is `obj`, so use this variable to obtain the input information.<br>
Example:
```javascript
//starts a countdown on the return screen with the number of minutes specified in the interface by the 'duration' input
h.hly('StartCountdownCP', {
    minutes: obj.input.duration
    stop_at_zero: true
});
```