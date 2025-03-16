//
function request(receiverID, body) {
    jsc.err.safeNullOrEmpty(receiverID, 'receiverID');
    jsc.err.safeNullOrEmpty(body, 'body');
    var json = h.apiRequestEx(receiverID, {
        url_suffix: 'chat/completions',
        data: JSON.stringify(body)
    });
    if (json == null) {
        throw 'unknown';
    }
    return JSON.parse(json);
}

// 
function requestAndGetContent(receiverID, body) {
    var r = jsc.openai.chat.request(receiverID, body);
    return r.choices[0].message.content;
}

// 
function builder(model, userMessage) {
    var obj = {
        model: (model !== undefined) ? model : "gpt-3.5-turbo",
        messages: [],
        max_tokens: h.getGlobal('chatgpt_default_max_tokens', 1024),
        temperature: h.getGlobal('chatgpt_default_temperature', 0)
    };
    obj.addMessage = function (role, content) {
        obj.messages.push({role: role, content: content});
        return obj;
    };
    obj.addUserMessage = function (content) {
        return obj.addMessage("user", content);
    };
    obj.addSystemMessage = function (content) {
        return obj.addMessage("system", content);
    };
    obj.setMaxTokens = function (max_tokens) {
        obj.max_tokens = max_tokens;
        return obj;
    };
    obj.setTemperature = function (temperature) {
        obj.temperature = temperature;
        return obj;
    };
    obj.request = function (receiverID) {
        return jsc.openai.chat.request(receiverID, obj);
    };
    obj.requestAndGetContent = function (receiverID) {
        return jsc.openai.chat.requestAndGetContent(receiverID, obj);
    };
    if (userMessage !== undefined) {
        obj.addUserMessage(userMessage);
    }
    return obj;
}

// 
function gpt(userMessage) {
    var model = h.getGlobal('chatgpt_default_model', "gpt-3.5-turbo");
    return jsc.openai.chat.builder(model, userMessage);
}

// 
function gpt3_5(userMessage) {
    return jsc.openai.chat.builder("gpt-3.5-turbo", userMessage);
}

// 
function gpt3_5_32k(userMessage) {
    return jsc.openai.chat.builder("gpt-3.5-turbo-16k", userMessage);
}

// 
function gpt4(userMessage) {
    return jsc.openai.chat.builder("gpt-4", userMessage);
}

// 
function gpt4_32k(userMessage) {
    return jsc.openai.chat.builder("gpt-4-32k", userMessage);
}