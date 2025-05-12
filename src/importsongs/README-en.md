# Import song lyrics via JavaScript

**EN** | [PT](README.md)

---


`music menu > import`

In `v2.23.0`, an option was made available to import song lyrics from files on the computer using a JavaScript implementation as a "parser" (input/output).

Here is the documentation on how to apply this conversion.<br>
And here are also listed ready-made models that are available in the program for use by other users.

# Documentation

## info()

It should return the model information, such as id, name, description, etc.

Example:
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

__Optional__<br>
Displays configuration components in the import window to be used in `function extract(files, settings)`<br>
For example, display a list of `charset` for the user to select which `charset` to use when reading text files.
It should return an array of [InputParam](https://github.com/holyrics/Scripts/blob/main/i18n/en/InputParam.md).<br>
The value of each item will be available in the `settings` parameter received in `function extract(...)`, for example, `settings.charset`.

Example:
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

Receives the list of files selected by the user and the value of the settings created for this module in `function settings()` (optional).<br>
It should return an object with the `songs` field that contains the list of songs obtained from all the read files.<br>
`files` typeof Array<[JSFile](#jsfile)>

Example:
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
| Name | Type  | Description |
| ---- | :---: | ------------|
| `name` | _String_ | File name (sem extensão) |
| `extension` | _String_ | File extension (sem ponto) |
### getTitleAndArtistFromName()
Identifies the possible title and artist from the filename.<br>Rules:<br>If the filename contains `' - '`, separate the filename, with the first part being the title and the second part the artist.<br>Example: `title - artist.txt`<br>`['title', 'artist']`<br><br>If the filename contains parentheses, extract the value inside the parentheses as the artist.<br>Example: `title (artist).txt`<br>`['title', 'artist']`<br><br>Returns the entire filename as the title if no rule is identified.



**Response:**

| Type  | Description |
| :---: | ------------|
| _Array&lt;String&gt;_ | Returns an array always with 2 elements |


**Example:**

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
Returns the bytes of the file



**Response:**

| Type  |
| :---: |
| _Array&lt;Byte&gt;_ | 


**Example:**

```javascript
files.forEach(function(f) {
  var bytes = f.readBytes();
});
```

---

### readString(charset = 'utf-8')
Returns the file in text format

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `charset` | _String (optional)_ |  `Default: utf-8` |


**Response:**

| Type  |
| :---: |
| _String_ | 


**Example:**

```javascript
files.forEach(function(f) {
  var str = f.readString();
});
```

---

### readJson()
### readJSON()
Reads the file in JSON format and returns it as a `JavaScript Object`



**Response:**

| Type  |
| :---: |
| _Object_ | 


**Example:**

```javascript
files.forEach(function(f) {
  var obj = f.readJson();
});
```

---

### readXml(charset = 'utf-8')
### readXML(charset = 'utf-8')
Reads the file in XML format but returns a relative `JavaScript Object` based on the read XML structure.<br>All nodes of the XML structure will be considered an array (except for the first root node).<br>Each node will have the `content` field with its respective content and the attribute fields.<br>For convenience, it is possible to directly call the content of the first item in the array using the syntax `r.song.title0` instead of `r.song.title[0].content`

**Parameters:**

| Name | Type  | Description |
| ---- | :---: | ------------|
| `charset` | _String (optional)_ |  `Default: utf-8` |


**Response:**

| Type  |
| :---: |
| _Object_ | 


**Example:**

```javascript
//considering that the XML file is
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
Reads the content of a document, for example: `.doc` `.docx`.<br>Returns the full text of the read document.



**Response:**

| Type  |
| :---: |
| _String_ | 


**Example:**

```javascript
files.forEach(function(f) {
  var text = f.readDoc();
});
```

---

### readPpt()
Reads the content of a presentation, for example: `.ppt` `.pptx`.<br>Returns an array with the text of each slide read.



**Response:**

| Type  |
| :---: |
| _Array&lt;String&gt;_ | 


**Example:**

```javascript
files.forEach(function(f) {
  var slides = f.readPpt();
});
```

---