// Documentação
// https://github.com/holyrics/JSCommunity/tree/main/src/modules

//#import i18n

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

function settings(module) {
    var arr = [];

    arr.push({
        id: 'settings_1',
        name: i18n('Nome') + ' 1',
        type: 'string'
    });

    arr.push({
        id: 'settings_2',
        name: i18n('Nome') + ' 2',
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
        name: i18n('Ação Simples'),
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
        name: i18n('Exibir Mensagem Rápida'),
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
                name: i18n('Duração'),
                type: 'number',
                min: 1,
                max: 120,
                default_value: 30
            }
        ]
    });

    arr.push({
        id: 'folder_example',
        name: i18n('Pasta'),
        icon: 'folder_open',
        action: [
            {
                id: 'folder_simple_action_1',
                name: i18n('Ação Simples') + ' 1',
                action: function (evt) {
                    //implementation
                }
            }, {
                id: 'folder_simple_action_2',
                name: i18n('Ação Simples') + ' 2',
                action: function (evt) {
                    //implementation
                }
            }
        ]
    });

    var longPressActionFlag = module.id + "#long_press_flag";
    arr.push({
        id: 'long_press_action',
        label: i18n('Ação Pressionar/Soltar'),
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
        name: i18n('Iniciar do Coro'),
        types: ['song'],
        action: function (evt) {
            var r = h.hly('GetSong', {id: evt.item.id});
            if (!r.data) {
                var error = i18n("Item não encontrado: {}", ["Song by ID: " + evt.item.id]);
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
            var error = i18n("Item não encontrado: {}", ["Chorus - Song: " + evt.item.title]);
            h.notificationError(error, 7);
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
            h.notification(msg, 7);
        }
    });
    return arr;
}