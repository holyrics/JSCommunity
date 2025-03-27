# Importar letra de música via JavaScript

**PT** | [EN](README-en.md)

---


`menu música > importar`

Na `v2.23.0` foi disponibilizada uma opção para importar letras de música de arquivos do computador utilizando implementação JavaScript como "parser" (input/output).

Aqui está a documentação de como aplicar essa conversão.<br>
E aqui também estão listados modelos prontos que são disponibilizados no programa para uso por outros usuários.

# Documentação

## info()

Deve retornar as informações do modelo, como id, nome, descrição, etc.

Exemplo:
```javascript
function info() {
  return {
    id: 'txt',
    name: 'TXT File',
    description: 'TXT File',
    file_filter: {
      description: 'TXT File',
      extensions: ['txt']
    },
    minVersion: '2.23.0'
  };
}
```

## settings()

__Opcional__<br>
Exibe na janela de importação componentes de configuração para ser utilizado em `function extract(files, settings)`<br>
Por exemplo, exibir uma lista de `charset` para o usuário poder selecionar qual `charset` utilizar na leitura dos arquivos de texto.
Deve retornar um array de [InputParam](https://github.com/holyrics/Scripts/blob/main/InputParam.md).<br>
O valor de cada item estará disponível no parâmetro `settings` recebido em `function extract(...)`, por exemplo, `settings.charset`.

Exemplo:
```javascript
function settings() {
  return [
    {
      id: 'charset',
      label: 'Charset',
      allowed_values: ['UTF-8', 'ISO-8859-1', 'ASCII', 'Windows-1252']
    }
  ];
}
```

## extract(files, settings)

Recebe a lista de arquivos selecionados pelo usuário e o valor das configurações criadas para este módulo em `function settings()` (opcional).<br>
Deve retornar um objeto com o campo `songs` que contém a lista de músicas obtidas de todos os arquivos lidos.<br>
`files` typeof Array<[JSFile](#jsfile)>

Exemplo:
```javascript
function extract(files, settings) {
    var songs = [];
    files.forEach(function(f) {
        var arr = f.getTitleAndArtistFromName();
        var text = f.readString(settings.charset);
        var s = {};
        s.title = arr[0];
        s.artist = arr[1];
        s.lyrics = text;
        songs.push(s);
    });
    return {
        songs: songs
    };
}
```

## JSFile
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do arquivo (sem extensão) |
| `extension` | _String_ | Extensão do arquivo (sem ponto) |
### getTitleAndArtistFromName()
Identifica o possível título e artista a partir do nome do arquivo.<br>Regras:<br>Se o nome do arquivo tiver `' - '`, separa o nome do arquivo, sendo a primeira parte o título e a segunda parte o artista.<br>Exemplo: `title - artist.txt`<br>`['title', 'artist']`<br><br>Se o nome do arquivo tiver parênteses, extrai o valor de dentro do parênteses como artista.<br>Exemplo: `title (artist).txt`<br>`['title', 'artist']`<br><br>Retorna o nome do arquivo inteiro como título caso não seja identificada uma regra.



**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Array&lt;String&gt;_ | Retorna um array sempre com 2 elementos |


**Exemplo:**

```javascript
files.forEach(function(f) {
  var arr = f.getTitleAndArtistFromName();
  var s = {};
  s.title = arr[0];
  s.artist = arr[1];
});
```

---

### readBytes()
Retorna os bytes do arquivo



**Resposta:**

| Tipo  |
| :---: |
| _Array&lt;Byte&gt;_ | 


**Exemplo:**

```javascript
files.forEach(function(f) {
  var bytes = f.readBytes();
});
```

---

### readString(charset = 'utf-8')
Retorna o arquivo em formato de texto

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `charset` | _String (opcional)_ |  `Padrão: utf-8` |


**Resposta:**

| Tipo  |
| :---: |
| _String_ | 


**Exemplo:**

```javascript
files.forEach(function(f) {
  var str = f.readString();
});
```

---

### readJson()
### readJSON()
Lê o arquivo em formato JSON e retorna como `JavaScript Object`



**Resposta:**

| Tipo  |
| :---: |
| _Object_ | 


**Exemplo:**

```javascript
files.forEach(function(f) {
  var obj = f.readJson();
});
```

---

### readXml(charset = 'utf-8')
### readXML(charset = 'utf-8')
Lê o arquivo em formato XML, mas retorna um `JavaScript Object` relativo, baseado na estrutura XML lida.<br>Todos os nós da estrutura XML serão considerados um array (exceto o primeiro nó raiz).<br>Cada nó terá o campo `content` com seu respectivo conteúdo e os campos de atributo.<br>Por praticidade, é possível chamar o content do primeiro item do array de forma direta com a sintaxe `r.song.title0` em vez de `r.song.title[0].content`

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `charset` | _String (opcional)_ |  `Padrão: utf-8` |


**Resposta:**

| Tipo  |
| :---: |
| _Object_ | 


**Exemplo:**

```javascript
//considerando que o arquivo XML seja
//
//<?xml version="1.0" encoding="utf-8"?>
//<song>
//  <title>Example 1</title>
//  <author>Example 2</author>
//  <verses>
//    <verse desc="Verse 1">Slide 1 Line 1<br/>Slide 1 Line 2</verse>
//    <verse desc="Chorus">Slide 2 Line 1<br/>Slide 2 Line 2</verse>
//    <verse desc="Verse 2">Slide 3 Line 1<br/>Slide 3 Line 2</verse>
//  </verses>
//</song>
files.forEach(function(f) {
  var obj = f.readXml();
  h.log(obj);
  /*
  {
    "song": {
      "title": [{ "content": "Example 1" }],
      "author": [{ "content": "Example 2" }],
      "verses": [{
          "content": "    Slide 1 Line 1Slide 1 Line 2    Slide 2 Line 1Slide 2 Line 2    Slide 3 Line 1Slide 3 Line 2  ",
          "verse": [{
              "content": "Slide 1 Line 1\nSlide 1 Line 2",
              "desc": "Verse 1"
            }, {
              "content": "Slide 2 Line 1\nSlide 2 Line 2",
              "desc": "Chorus"
            }, {
              "content": "Slide 3 Line 1\nSlide 3 Line 2",
              "desc": "Verse 2"
            }]
        }]
    }
  }
  */

  r.song.title[0].content; //Example 1
  r.song.title0; //Example 1

  r.song.author[0].content; //Example 2
  r.song.author0; //Example 2

  r.song.verses[0].verse;
  /*
  [{
    "content":"Slide 1 Line 1\nSlide 1 Line 2","desc":"Verse 1"},
    {"content":"Slide 2 Line 1\nSlide 2 Line 2","desc":"Chorus"},
    {"content":"Slide 3 Line 1\nSlide 3 Line 2","desc":"Verse 2"
  }]
  */
});
```

---

### readDoc()
Lê o conteúdo de um documento, por exemplo: `.doc` `.docx`.<br>Retorna o texto completo do documento lido.



**Resposta:**

| Tipo  |
| :---: |
| _String_ | 


**Exemplo:**

```javascript
files.forEach(function(f) {
  var text = f.readDoc();
});
```

---

### readPpt()
Lê o conteúdo de uma apresentação, por exemplo: `.ppt` `.pptx`.<br>Retorna um array com o texto de cada slide lido.



**Resposta:**

| Tipo  |
| :---: |
| _Array&lt;String&gt;_ | 


**Exemplo:**

```javascript
files.forEach(function(f) {
  var slides = f.readPpt();
});
```

---
