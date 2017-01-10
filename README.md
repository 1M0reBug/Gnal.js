# Gnal.js

This library is a low-impact, no dependency i18n helper.
It provides tools to easily translate sites, with a simple JSON object.
It also provides elements to display a hash indicating the translation and
helping people to share a translation-aware URL.

This means that it is shipped with only basic utilities (i.e. no pluralization),
but that's exacly the purpose !

<a name="Gnal"></a>

## Gnal
This library is a low-impact, no dependency i18n helper.
It provides tools to easily translate sites, with a simple JSON
object.
It also provides elements to display a hash indicating the translation
and helping people to share a translation-aware URL.

**Kind**: global class  

* [Gnal](#Gnal)
    * [new Gnal([mainContainer], options)](#new_Gnal_new)
    * [.translations(idx, object)](#Gnal+translations) ⇒
    * [.choose(idx)](#Gnal+choose) ⇒
    * [.translate()](#Gnal+translate)
    * [.changeTo(idx)](#Gnal+changeTo)
    * [.updateHash()](#Gnal+updateHash)

<a name="new_Gnal_new"></a>

### new Gnal([mainContainer], options)
Example

```js
const gnal = new Gnal({ useHash: true });
gnal
 .translations('en', { GREETINGS: 'hello' })
 .translations('fr', { GREETINGS: 'bonjour' })
 .translations('es', { GREETINGS: 'holà' })
 .translations('it', { GREETINGS: 'ciao' })
 .translations('hu', { GREETINGS: 'szia' })
 .choose('en')
 .translate();

document.querySelector('#btn-es').onclick =
     e => gnal.changeTo('es');
```


| Param | Type | Description |
| --- | --- | --- |
| [mainContainer] | <code>string</code> | optional container element where the translation takes place |
| options | <code>Object</code> | some configuration options |
| options.useHash | <code>boolean</code> | if it must use the hash or not. |

<a name="Gnal+translations"></a>

### gnal.translations(idx, object) ⇒
Register new key values for `idx` language.
Each key in the `object` must exist in all
the registered objects (which is not checked)
if you want to include HTML in your text start
it with `#!>`

**Kind**: instance method of <code>[Gnal](#Gnal)</code>  
**Returns**: this to chain methods  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>string</code> | the index/language ISO code used as language selector |
| object | <code>Object</code> | The unique key by phrase |

<a name="Gnal+choose"></a>

### gnal.choose(idx) ⇒
specify a key from the registered objects as displayed language
is used as fallback language is useHash and hash is not valid

**Kind**: instance method of <code>[Gnal](#Gnal)</code>  
**Returns**: this to chain methods  
**Throws**:

- <code>Error</code> if the key does not exists


| Param | Type | Description |
| --- | --- | --- |
| idx | <code>string</code> | the key to choose as language |

<a name="Gnal+translate"></a>

### gnal.translate()
starts the translation process -> looking for every `[i18n]`
elements inside the container Element

**Kind**: instance method of <code>[Gnal](#Gnal)</code>  
**Throws**:

- <code>Error</code> if translations or choose haven't been called

<a name="Gnal+changeTo"></a>

### gnal.changeTo(idx)
change the displayed language for a new one. the behaviour is to change
the language and call translate

**Kind**: instance method of <code>[Gnal](#Gnal)</code>  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>string</code> | the new language to display |

<a name="Gnal+updateHash"></a>

### gnal.updateHash()
Change the hash by appending the current lang code to the URL

**Kind**: instance method of <code>[Gnal](#Gnal)</code>  

## Note on webpack and babel

Babel 6, when `export default` is used, export and object with a `default` property
which is the constructor. To avoid this problem (especially in the browser), it's
best to use `babel-plugin-add-module-exports`, giving this `.babelrc`

```json
{
    "presets": ["es2015"],
    "plugins": ["babel-plugin-add-module-exports"]
}
```

# The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
