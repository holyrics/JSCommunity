// Documentation
// https://github.com/holyrics/JSCommunity/tree/main/src/modules

//#import utils

function info() {
    return {
        id: 'Module ID',
        name: 'Module name',
        description: '<b>Module</b> description',
        allowed_requests: [
            'https://www.holyrics.com.br/v1/api_example/'
        ],
        min_version: '2.23.0',
        //max_version: '2.24.0'
        i18n: {
            name: {
                pt: "Nome do módulo"
            },
            description: {
                pt: "Descrição do <b>módulo</b>"
            }
        },
        permissions: [
            {
                type: 'advanced',
                key: 'allowed_files'
            }
        ],
        os_required: 'windows',
        available_in_main_window: true,
        available_in_bible_window: false
    };
}

function settings(module) {
    var arr = [];

    arr.push({
        id: 'settings_1',
        name: jsc.i18n('Name') + ' 1',
        type: 'string'
    });

    arr.push({
        id: 'settings_2',
        name: jsc.i18n('Name') + ' 2',
        type: 'number',
        min: 1,
        max: 100,
        component: 'slider',
        unit: '%'
    });

    return arr;
}

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
                name: jsc.i18n('Duration'),
                type: 'number',
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
                name: jsc.i18n('Simple Action') + ' 1',
                action: function (evt) {
                    //implementation
                }
            }, {
                id: 'folder_simple_action_2',
                name: jsc.i18n('Simple Action') + ' 2',
                action: function (evt) {
                    //implementation
                }
            }
        ]
    });

    var longPressActionFlag = module.id + "#long_press_flag";
    arr.push({
        id: 'long_press_action',
        label: jsc.i18n('Press/Release Action'),
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

    return arr;
}

function loops(module) {
    var arr = [];
    arr.push({
        name: 'loop 5',
        delay: 5000,
        action: function (evt) {
            // loop action every 5 seconds
        }
    });
    arr.push({
        name: 'loop 5',
        delay: '12s',
        action: function (evt) {
            // loop action every 12 seconds
        }
    });
    return arr;
}

function startup(module) {
    //implementation
}

function shutdown(module) {
    //implementation
}

function triggers(module) {
    var arr = [];
    arr.push({
        name: 'displaying any song',
        when: 'displaying',
        item: 'any_song',
        action: function (obj) {
            // song displayed
            // obj.id
            // obj.title
        }
    });
    arr.push({
        name: 'change bpm',
        when: 'change',
        item: 'bpm',
        action: function (obj) {
            // BPM changed
            // obj.old_value
            // obj.new_value
        }
    });
    arr.push({
        name: 'displaying specific video',
        when: 'displaying',
        item: 'any_video',
        filter: {
            file_fullname: 'folder/video name.mp4'
        },
        action: function (obj) {
            // video displayed
        }
    });
    return arr;
}

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

function contextActions(module) {
    var arr = [];

    arr.push({
        name: jsc.i18n('Choir Start'),
        types: ['song'],
        action: function (evt) {
            var r = h.hly('GetSong', {id: evt.item.id});
            if (!r.data) {
                var error = jsc.i18n("Item not found: {}", ["Song by ID: " + evt.item.id]);
                h.notificationError(error, 7);
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
            var error = jsc.i18n("Item not found: {}", ["Chorus - Song: " + evt.item.title]);
            h.notificationError(error, 7);
        }
    });

    arr.push({
        name: jsc.i18n('Display for {} seconds', [10]),
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

function textTransform(module) {
    var obj = {};

    obj.extra_slides = function(evt) {
        if (evt.screen_id == 'public' && evt.slide_type == 'blank' && evt.source_type == 'music') {
            // This causes the 'public' screen to
            // when the F9 (no text) option is activated
            // and it is a presentation of song lyrics
            // the text '♪' is displayed
            return {
                add_end: '♪'
            };
        }
        return null;
    };
    return obj;
}

function customTheme(module) {
    var obj = {};

    obj.song = function (evt) {
        var textlc = evt.text.toLowerCase();
        if (textlc.contains('fogo') && textlc.contains('chuva')) {
            // if the slide text has the words 'fire' and 'rain'
            // set a video as background
            // that has the tags 'Fire' and 'Rain'
            // (both because of 'intersection: true')
            return {
                tags: ['Fire', 'Rain'],
                intersection: true,
                type: 'my_videos'
            };
        }
        if (textlc.equals("azul")) {
            // if slide text equals 'blue'
            // defines a theme created on the fly
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

function lineBreakRules(module) {
    return function(evt) {
        if (evt.screen.id == 'public'
                && evt.presentation.type == 'song'
                && evt.nextWords.length == 0) {
            // if it is the 'public' screen
            // and it is a presentation of song lyrics
            // and there are no remaining words besides the current word
            //
            // returns -1 so that the last word of the current line is moved to the next line
            //
            // this prevents a line break from being created with just one word alone
            //
            // if 1 were returned, the current word would remain on the current line, avoiding the line break
            // but in this case the font size of the slide is reduced
            return -1;
        }
        return 0;
    };
}

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
                label: jsc.i18n('Nome') + ' 3',
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
            h.notification(msg, 7);
        }
    });
    return arr;
}

function handleItemAction(module) {
    var obj = {};
    
    obj.file = function(evt) {
        if (evt.consumed) {
            return false;
        }
        if (evt.item.extension.equalsIgnoreCase("txt")) {
            var text = h.readFileAsText(evt.item.file_fullname);
            h.hly('ShowQuickPresentation', {
                text: text
            });
            return true;
        }
        return false;
    };

    return obj;
}

function style(module) {
    var obj = {};
  
    obj.example = {
      i: true,
      font: 'Arial',
      size: 70
    };
    
    return obj;
}