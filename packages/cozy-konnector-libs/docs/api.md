## API

## Modules

<dl>
<dt><a href="#module_addData">addData</a></dt>
<dd><p>This function saves the data into the cozy blindly without check
You need at least the <code>POST</code> permission for the given doctype in your manifest, to be able to
use this function.</p>
<p>Parameters:</p>
<ul>
<li><code>documents</code>: an array of objects corresponding to the data you want to save in the cozy</li>
<li><code>doctype</code> (string): the doctype where you want to save data (ex: &#39;io.cozy.bills&#39;)</li>
</ul>
<pre><code class="lang-javascript">const documents = [
  {
    name: &#39;toto&#39;,
    height: 1.8
  },
  {
    name: &#39;titi&#39;,
    height: 1.7
  }
]

return addData(documents, &#39;io.cozy.height&#39;)
</code></pre>
</dd>
<dt><a href="#module_cozyClient">cozyClient</a></dt>
<dd><p>This is a <a href="https://cozy.github.io/cozy-client-js/">cozy-client-js</a> instance already initialized and ready to use</p>
<p>If you want to access cozy-client-js directly, this method gives you directly an instance of it,
initialized according to <code>COZY_URL</code> and <code>COZY_CREDENTIALS</code> environment variable given by cozy-stack
You can refer to the <a href="https://cozy.github.io/cozy-client-js/">cozy-client-js documentation</a> for more information.</p>
<p>Example :</p>
<pre><code class="lang-javascript">const {cozyClient} = require(&#39;cozy-konnector-libs&#39;)

cozyClient.data.defineIndex(&#39;my.doctype&#39;, [&#39;_id&#39;])
</code></pre>
</dd>
<dt><a href="#module_filterData">filterData</a></dt>
<dd><p>This function filters the passed array from data already present in the cozy so that there is
not duplicated data in the cozy.
You need at least the <code>GET</code> permission for the given doctype in your manifest, to be able to
use this function.</p>
<p>Parameters:</p>
<ul>
<li><code>documents</code>: an array of objects corresponding to the data you want to save in the cozy</li>
<li><code>doctype</code> (string): the doctype where you want to save data (ex: &#39;io.cozy.bills&#39;)</li>
<li><code>options</code> :<ul>
<li><code>keys</code> (array) : List of keys used to check that two items are the same. By default it is set to `[&#39;id&#39;]&#39;.</li>
<li><code>index</code> (optionnal) : Return value returned by <code>cozy.data.defineIndex</code>, the default will correspond to all documents of the selected doctype.</li>
<li><code>selector</code> (optionnal object) : Mango request to get records. Default is built from the keys <code>{selector: {_id: {&quot;$gt&quot;: null}}}</code> to get all the records.</li>
</ul>
</li>
</ul>
<pre><code class="lang-javascript">const documents = [
  {
    name: &#39;toto&#39;,
    height: 1.8
  },
  {
    name: &#39;titi&#39;,
    height: 1.7
  }
]

return filterData(documents, &#39;io.cozy.height&#39;, {
  keys: [&#39;name&#39;]
}).then(filteredDocuments =&gt; addData(filteredDocuments, &#39;io.cozy.height&#39;))

</code></pre>
</dd>
<dt><a href="#module_linkBankOperations">linkBankOperations</a></dt>
<dd><h3 id="linkbankoperations-entries-doctype-fields-options-">linkBankOperations ( entries, doctype, fields, options = {} )</h3>
<p>This function will soon move to a dedicated service. You should not use it.
The goal of this function is to find links between bills and bank operations.</p>
</dd>
<dt><a href="#module_mkdirp">mkdirp</a></dt>
<dd><p>Creates a directory and its missing ancestors as needed.</p>
<p>Options :</p>
<ul>
<li><code>...pathComponents</code>:  one or many path components to be joined</li>
</ul>
<pre><code class="lang-javascript">await mkdirp(&#39;/foo&#39;) // Creates /foo
await mkdirp(&#39;/foo&#39;) // Does nothing as /foo already exists
await mkdirp(&#39;/bar/baz&#39;) // Creates /bar, then /bar/baz
await mkdirp(&#39;/foo/bar/baz&#39;) // Creates /foo/bar, then /foo/bar/baz, not /foo
await mkdirp(&#39;/&#39;) // Does nothing
await mkdirp(&#39;/qux&#39;, &#39;qux2/qux3&#39;, &#39;qux4&#39;) // Creates /qux, then /qux/qux2,
                                          // then /qux/qux2/qux3 and
                                          // finally /qux/qux2/qux3/qux4
</code></pre>
<p>The function will automatically add a leading slash when missing:</p>
<pre><code class="lang-javascript">await mkdirp(&#39;foo&#39;, &#39;bar&#39;) // Creates /foo, then /foo/bar
</code></pre>
</dd>
<dt><a href="#module_normalizeFilename">normalizeFilename</a></dt>
<dd><p>Returns the given name, replacing characters that could be an issue when
used in a filename with spaces.</p>
<p>Replaced characters include:</p>
<ul>
<li>Those forbidden on one or many popular OS or filesystem: <code>&lt;&gt;:&quot;/\|?*</code></li>
<li>Those forbidden by the cozy-stack <code>\0</code>, <code>\r</code> and <code>\n</code></li>
<li>Multiple spaces and/or tabs are replaced with a single space</li>
<li>Leading &amp; trailing spaces and/or tabs are removed</li>
</ul>
<p>An exception will be thrown in case there is not any filename-compatible
character in the given name.</p>
<p>Parameters:</p>
<ul>
<li><code>basename</code> is whatever string you want to generate the filename from</li>
<li><code>ext</code> is an optional file extension, with or without leading dot</li>
</ul>
<pre><code class="lang-javascript">const { normalizeFilename } = require(&#39;cozy-konnector-libs&#39;)

const filename = normalizeFilename(&#39;*foo/bar: &lt;baz&gt; \\&quot;qux&quot;\t???&#39;, &#39;.txt&#39;)
// `filename` === `foo bar baz qux.txt`
</code></pre>
</dd>
<dt><a href="#module_requestFactory">requestFactory</a></dt>
<dd><p>This is a function which returns an instance of
<a href="https://www.npmjs.com/package/request-promise">request-promise</a> initialized with
defaults often used in connector development.</p>
<pre><code class="language-javascript">// Showing defaults
req = requestFactory({
  cheerio: false,
  jar: true,
  json: true
})
</code></pre>
<p>Options :</p>
<ul>
<li><code>cheerio</code>:  will parse automatically the <code>response.body</code> in a cheerio instance</li>
</ul>
<pre><code class="lang-javascript">req = requestFactory({ cheerio: true })
req(&#39;http://github.com&#39;, $ =&gt; {
  const repos = $(&#39;#repo_listing .repo&#39;)
})
</code></pre>
<ul>
<li><code>jar</code>: is passed to <code>request</code> options. Remembers cookies for future use.</li>
<li><code>json</code>: will parse the <code>response.body</code> as JSON</li>
<li><code>json</code>: will parse the <code>response.body</code> as JSON</li>
<li><code>resolveWithFullResponse</code>: The full response will be return in the promise. It is compatible
with cheerio and json options.</li>
</ul>
<pre><code class="lang-javascript">req = requestFactory({
   resolveWithFullResponse: true,
   cheerio: true
})
req(&#39;http://github.com&#39;, response =&gt; {
  console.log(response.statusCode)
  const $ = response.body
  const repos = $(&#39;#repo_listing .repo&#39;)
})
</code></pre>
<p>You can find the full list of available options in <a href="https://github.com/request/request-promise">request-promise</a> and <a href="https://github.com/request/request">request</a> documentations.</p>
</dd>
<dt><a href="#module_saveBills">saveBills</a></dt>
<dd><p>Combines the features of <code>saveFiles</code>, <code>filterData</code>, <code>addData</code> and <code>linkBankOperations</code> for a
common case: bills.
Will create <code>io.cozy.bills</code> objects. The default deduplication keys are <code>[&#39;date&#39;, &#39;amount&#39;, &#39;vendor&#39;]</code>.
You need the full permission on <code>io.cozy.bills</code>, full permission on <code>io.cozy.files</code> and also
full permission on <code>io.cozy.bank.operations</code> in your manifest, to be able to * use this function.</p>
<p>Parameters:</p>
<ul>
<li><code>documents</code> is an array of objects with any attributes with some mandatory attributes :<ul>
<li><code>amount</code> (Number): the amount of the bill used to match bank operations</li>
<li><code>date</code> (Date): the date of the bill also used to match bank operations</li>
<li><code>vendor</code> (String): the name of the vendor associated to the bill. Ex: &#39;trainline&#39;
You can also pass attributes expected by <code>saveFiles</code>
Please take a look at <a href="https://github.com/cozy/cozy-doctypes/blob/master/docs/io.cozy.bills.md">io.cozy.bills doctype documentation</a></li>
</ul>
</li>
<li><code>fields</code> (object) this is the first parameter given to BaseKonnector&#39;s constructor</li>
<li><code>options</code> is passed directly to <code>saveFiles</code>, <code>hydrateAndFilter</code>, <code>addData</code> and <code>linkBankOperations</code>.</li>
</ul>
<pre><code class="lang-javascript">const { BaseKonnector, saveBills } = require(&#39;cozy-konnector-libs&#39;)

module.exports = new BaseKonnector(function fetch (fields) {
  const documents = []
  // some code which fills documents
  return saveBills(documents, fields, {
    identifiers: [&#39;vendorj&#39;]
  })
})
</code></pre>
</dd>
<dt><a href="#module_saveFiles">saveFiles</a></dt>
<dd><p>The goal of this function is to save the given files in the given folder via the Cozy API.
You need the full permission on <code>io.cozy.files</code> in your manifest to use this function.</p>
<ul>
<li><p><code>files</code> is an array of <code>{ fileurl, filename }</code> :</p>
<ul>
<li>fileurl: The url of the file. This attribute is mandatory or
this item will be ignored</li>
<li>filename : The file name of the item written on disk. This attribute is optional and as default value, the
file name will be &quot;smartly&quot; guessed by the function. Use this attribute if the guess is not smart
enough for you.</li>
</ul>
</li>
<li><p><code>fields</code> (object) is the fields passed by BaseKonnector to the start function.</p>
</li>
<li><p><code>options</code> (object) is optional. Possible options :</p>
<ul>
<li><code>timeout</code> (timestamp) can be used if your connector needs to fetch a lot of files and if the
stack does not give enough time to your connector to fetch it all. It could happen that the
connector is stopped right in the middle of the download of the file and the file will be
broken. With the <code>timeout</code> option, the <code>saveFiles</code> function will check if the timeout has
passed right after downloading each file and then will be sure to be stopped cleanly if the
timeout is not too long. And since it is really fast to check that a file has already been
downloaded, on the next run of the connector, it will be able to download some more
files, and so on. If you want the timeout to be in 10s, do <code>Date.now() + 10*1000</code>.
You can try it in the previous code.</li>
</ul>
</li>
</ul>
</dd>
<dt><a href="#module_signin">signin</a></dt>
<dd><p>The goal of this function is to provide an handy method to log the user in,
on html form pages. On success, it resolves a promise with a parsed body.</p>
<p>Errors:</p>
<ul>
<li>LOGIN_FAILED if the validate predicate is false</li>
<li>INVALID_FORM if the element matched by <code>formSelector</code> is not a form or has
no <code>action</code> attribute</li>
<li>UNKNOWN_PARSING_STRATEGY if <code>parse</code> is not one of the accepted values:
<code>raw</code>, <code>cheerio</code>, <code>json</code>.</li>
<li>VENDOR_DOWN if a request throws a RequestError, or StatusCodeError</li>
</ul>
<p>It does not submit values provided through <code>select</code> tags, except if populated
by user with <code>formData</code>.</p>
<ul>
<li><p><code>url</code> is the url to access the html form</p>
</li>
<li><p><code>formSelector</code> is used by cheerio to uniquely identify the form in which to
log in</p>
</li>
<li><p><code>formData</code> is an object <code>{ name: value, … }</code>. It is used to populate the
form, in the proper inputs with the same name as the properties of this
object, before submitting it. It can also be a function that returns this
object. The page at <code>url</code> would be given as argument, right after having
been parsed through <code>cheerio</code>.</p>
</li>
<li><p><code>parse</code> allow the user to resolve <code>signin</code> with a preparsed body. The
choice of the strategy for the parsing is one of : <code>raw</code>, <code>json</code> or
<code>cheerio</code>. <code>cheerio</code> being the default.</p>
</li>
<li><p><code>validate</code> is a predicate taking two arguments <code>statusCode</code> and
<code>parsedBody</code>. If it is false, <code>LOGIN_FAILED</code> is thrown, otherwise the
signin resolves with <code>parsedBody</code> value.</p>
</li>
<li><p><code>requestOpts</code> allows to pass eventual options to the <code>signin</code>&#39;s
<code>requestFactory</code>. It could be useful for pages using <code>latin1</code> <code>encoding</code>
for instance.</p>
</li>
</ul>
</dd>
<dt><a href="#module_updateOrCreate">updateOrCreate</a></dt>
<dd><p>The goal of this function is create or update the given entries according to if they already
exist in the cozy or not
You need the full permission for the given doctype in your manifest, to be able to
use this function.</p>
<p>Parameters:</p>
<ul>
<li><code>entries</code> is an array of objects with any attributes :</li>
<li><code>doctype</code> (string) is the cozy doctype where the entries should be saved</li>
<li><code>matchingAttributes</code> (array of strings) is the list of attributes in each entry should be used to check if an entry
is already saved in the cozy</li>
</ul>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#BaseKonnector">BaseKonnector</a></dt>
<dd><p>The class from which all the connectors must inherit.
It takes a fetch function in parameter that must return a <code>Promise</code>.
You need at least the <code>GET</code> permission on <code>io.cozy.accounts</code> in your manifest to allow it to
fetch account information for your connector.</p>
</dd>
<dt><a href="#Document">Document</a></dt>
<dd><p>Simple Model for Documents. Allows to specify
<code>shouldSave</code>, <code>shouldUpdate</code> as methods.</p>
<p>Has useful <code>isEqual</code> method</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#LOGIN_FAILED">LOGIN_FAILED</a> : <code>String</code></dt>
<dd><p>The konnector could not login</p>
</dd>
<dt><a href="#NOT_EXISTING_DIRECTORY">NOT_EXISTING_DIRECTORY</a> : <code>String</code></dt>
<dd><p>The folder specified as folder_to_save does not exist (checked by BaseKonnector)</p>
</dd>
<dt><a href="#VENDOR_DOWN">VENDOR_DOWN</a> : <code>String</code></dt>
<dd><p>The vendor&#39;s website is down</p>
</dd>
<dt><a href="#USER_ACTION_NEEDED">USER_ACTION_NEEDED</a> : <code>String</code></dt>
<dd><p>There was an unexpected error, please take a look at the logs to know what happened</p>
</dd>
<dt><a href="#FILE_DOWNLOAD_FAILED">FILE_DOWNLOAD_FAILED</a> : <code>String</code></dt>
<dd><p>There was a problem while downloading a file</p>
</dd>
<dt><a href="#SAVE_FILE_FAILED">SAVE_FILE_FAILED</a> : <code>String</code></dt>
<dd><p>There was a problem while saving a file</p>
</dd>
<dt><a href="#DISK_QUOTA_EXCEEDED">DISK_QUOTA_EXCEEDED</a> : <code>String</code></dt>
<dd><p>Could not save a file to the cozy because of disk quota exceeded</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#mkSpec">mkSpec()</a></dt>
<dd><p>Declarative scraping.</p>
<p>Describe your items attributes and where to find/parse them
instead of imperatively building them.</p>
<p>Heavily inspired by <a href="https://medialab.github.io/artoo/">artoo</a> scraping method.</p>
</dd>
<dt><a href="#scrape">scrape($, spec(s), [childSelector])</a> ⇒ <code>object</code> | <code>array</code></dt>
<dd><p>Scrape a cheerio object for properties</p>
</dd>
</dl>

<a name="module_addData"></a>

## addData
This function saves the data into the cozy blindly without check
You need at least the `POST` permission for the given doctype in your manifest, to be able to
use this function.

Parameters:

* `documents`: an array of objects corresponding to the data you want to save in the cozy
* `doctype` (string): the doctype where you want to save data (ex: 'io.cozy.bills')

```javascript
const documents = [
  {
    name: 'toto',
    height: 1.8
  },
  {
    name: 'titi',
    height: 1.7
  }
]

return addData(documents, 'io.cozy.height')
```

<a name="module_cozyClient"></a>

## cozyClient
This is a [cozy-client-js](https://cozy.github.io/cozy-client-js/) instance already initialized and ready to use

If you want to access cozy-client-js directly, this method gives you directly an instance of it,
initialized according to `COZY_URL` and `COZY_CREDENTIALS` environment variable given by cozy-stack
You can refer to the [cozy-client-js documentation](https://cozy.github.io/cozy-client-js/) for more information.

Example :

```javascript
const {cozyClient} = require('cozy-konnector-libs')

cozyClient.data.defineIndex('my.doctype', ['_id'])
```

<a name="module_filterData"></a>

## filterData
This function filters the passed array from data already present in the cozy so that there is
not duplicated data in the cozy.
You need at least the `GET` permission for the given doctype in your manifest, to be able to
use this function.

Parameters:

* `documents`: an array of objects corresponding to the data you want to save in the cozy
* `doctype` (string): the doctype where you want to save data (ex: 'io.cozy.bills')
* `options` :
   - `keys` (array) : List of keys used to check that two items are the same. By default it is set to `['id']'.
   - `index` (optionnal) : Return value returned by `cozy.data.defineIndex`, the default will correspond to all documents of the selected doctype.
   - `selector` (optionnal object) : Mango request to get records. Default is built from the keys `{selector: {_id: {"$gt": null}}}` to get all the records.

```javascript
const documents = [
  {
    name: 'toto',
    height: 1.8
  },
  {
    name: 'titi',
    height: 1.7
  }
]

return filterData(documents, 'io.cozy.height', {
  keys: ['name']
}).then(filteredDocuments => addData(filteredDocuments, 'io.cozy.height'))

```

<a name="module_filterData..suitableCall"></a>

### filterData~suitableCall()
Since we can use methods or basic functions for
`shouldSave` and `shouldUpdate` we pass the
appropriate `this` and `arguments`.

If `funcOrMethod` is a method, it will be called
with args[0] as `this` and the rest as `arguments`
Otherwise, `this` will be null and `args` will be passed
as `arguments`.

**Kind**: inner method of [<code>filterData</code>](#module_filterData)  
<a name="module_linkBankOperations"></a>

## linkBankOperations
### linkBankOperations ( entries, doctype, fields, options = {} )

This function will soon move to a dedicated service. You should not use it.
The goal of this function is to find links between bills and bank operations.

<a name="module_mkdirp"></a>

## mkdirp
Creates a directory and its missing ancestors as needed.

Options :

- `...pathComponents`:  one or many path components to be joined

```javascript
await mkdirp('/foo') // Creates /foo
await mkdirp('/foo') // Does nothing as /foo already exists
await mkdirp('/bar/baz') // Creates /bar, then /bar/baz
await mkdirp('/foo/bar/baz') // Creates /foo/bar, then /foo/bar/baz, not /foo
await mkdirp('/') // Does nothing
await mkdirp('/qux', 'qux2/qux3', 'qux4') // Creates /qux, then /qux/qux2,
                                          // then /qux/qux2/qux3 and
                                          // finally /qux/qux2/qux3/qux4
```

The function will automatically add a leading slash when missing:

```javascript
await mkdirp('foo', 'bar') // Creates /foo, then /foo/bar
```

<a name="module_normalizeFilename"></a>

## normalizeFilename
Returns the given name, replacing characters that could be an issue when
used in a filename with spaces.

Replaced characters include:

- Those forbidden on one or many popular OS or filesystem: `<>:"/\|?*`
- Those forbidden by the cozy-stack `\0`, `\r` and `\n`
- Multiple spaces and/or tabs are replaced with a single space
- Leading & trailing spaces and/or tabs are removed

An exception will be thrown in case there is not any filename-compatible
character in the given name.

Parameters:

- `basename` is whatever string you want to generate the filename from
- `ext` is an optional file extension, with or without leading dot

```javascript
const { normalizeFilename } = require('cozy-konnector-libs')

const filename = normalizeFilename('*foo/bar: <baz> \\"qux"\t???', '.txt')
// `filename` === `foo bar baz qux.txt`
```

<a name="module_requestFactory"></a>

## requestFactory
This is a function which returns an instance of
[request-promise](https://www.npmjs.com/package/request-promise) initialized with
defaults often used in connector development.

```js
// Showing defaults
req = requestFactory({
  cheerio: false,
  jar: true,
  json: true
})
```

Options :

- `cheerio`:  will parse automatically the `response.body` in a cheerio instance

```javascript
req = requestFactory({ cheerio: true })
req('http://github.com', $ => {
  const repos = $('#repo_listing .repo')
})
```

- `jar`: is passed to `request` options. Remembers cookies for future use.
- `json`: will parse the `response.body` as JSON
- `json`: will parse the `response.body` as JSON
- `resolveWithFullResponse`: The full response will be return in the promise. It is compatible
  with cheerio and json options.

```javascript
req = requestFactory({
   resolveWithFullResponse: true,
   cheerio: true
})
req('http://github.com', response => {
  console.log(response.statusCode)
  const $ = response.body
  const repos = $('#repo_listing .repo')
})
```

You can find the full list of available options in [request-promise](https://github.com/request/request-promise) and [request](https://github.com/request/request) documentations.

<a name="module_saveBills"></a>

## saveBills
Combines the features of `saveFiles`, `filterData`, `addData` and `linkBankOperations` for a
common case: bills.
Will create `io.cozy.bills` objects. The default deduplication keys are `['date', 'amount', 'vendor']`.
You need the full permission on `io.cozy.bills`, full permission on `io.cozy.files` and also
full permission on `io.cozy.bank.operations` in your manifest, to be able to * use this function.

Parameters:

- `documents` is an array of objects with any attributes with some mandatory attributes :
  + `amount` (Number): the amount of the bill used to match bank operations
  + `date` (Date): the date of the bill also used to match bank operations
  + `vendor` (String): the name of the vendor associated to the bill. Ex: 'trainline'
  You can also pass attributes expected by `saveFiles`
  Please take a look at [io.cozy.bills doctype documentation](https://github.com/cozy/cozy-doctypes/blob/master/docs/io.cozy.bills.md)
- `fields` (object) this is the first parameter given to BaseKonnector's constructor
- `options` is passed directly to `saveFiles`, `hydrateAndFilter`, `addData` and `linkBankOperations`.

```javascript
const { BaseKonnector, saveBills } = require('cozy-konnector-libs')

module.exports = new BaseKonnector(function fetch (fields) {
  const documents = []
  // some code which fills documents
  return saveBills(documents, fields, {
    identifiers: ['vendorj']
  })
})
```

<a name="module_saveFiles"></a>

## saveFiles
The goal of this function is to save the given files in the given folder via the Cozy API.
You need the full permission on `io.cozy.files` in your manifest to use this function.

- `files` is an array of `{ fileurl, filename }` :

  + fileurl: The url of the file. This attribute is mandatory or
    this item will be ignored
  + filename : The file name of the item written on disk. This attribute is optional and as default value, the
    file name will be "smartly" guessed by the function. Use this attribute if the guess is not smart
  enough for you.

- `fields` (object) is the fields passed by BaseKonnector to the start function.

- `options` (object) is optional. Possible options :

  + `timeout` (timestamp) can be used if your connector needs to fetch a lot of files and if the
  stack does not give enough time to your connector to fetch it all. It could happen that the
  connector is stopped right in the middle of the download of the file and the file will be
  broken. With the `timeout` option, the `saveFiles` function will check if the timeout has
  passed right after downloading each file and then will be sure to be stopped cleanly if the
  timeout is not too long. And since it is really fast to check that a file has already been
  downloaded, on the next run of the connector, it will be able to download some more
  files, and so on. If you want the timeout to be in 10s, do `Date.now() + 10*1000`.
  You can try it in the previous code.

<a name="module_signin"></a>

## signin
The goal of this function is to provide an handy method to log the user in,
on html form pages. On success, it resolves a promise with a parsed body.

Errors:

- LOGIN_FAILED if the validate predicate is false
- INVALID_FORM if the element matched by `formSelector` is not a form or has
  no `action` attribute
- UNKNOWN_PARSING_STRATEGY if `parse` is not one of the accepted values:
  `raw`, `cheerio`, `json`.
- VENDOR_DOWN if a request throws a RequestError, or StatusCodeError

It does not submit values provided through `select` tags, except if populated
by user with `formData`.

- `url` is the url to access the html form

- `formSelector` is used by cheerio to uniquely identify the form in which to
  log in

- `formData` is an object `{ name: value, … }`. It is used to populate the
  form, in the proper inputs with the same name as the properties of this
  object, before submitting it. It can also be a function that returns this
  object. The page at `url` would be given as argument, right after having
  been parsed through `cheerio`.

- `parse` allow the user to resolve `signin` with a preparsed body. The
  choice of the strategy for the parsing is one of : `raw`, `json` or
  `cheerio`. `cheerio` being the default.

- `validate` is a predicate taking two arguments `statusCode` and
  `parsedBody`. If it is false, `LOGIN_FAILED` is thrown, otherwise the
  signin resolves with `parsedBody` value.

- `requestOpts` allows to pass eventual options to the `signin`'s
  `requestFactory`. It could be useful for pages using `latin1` `encoding`
  for instance.

<a name="module_updateOrCreate"></a>

## updateOrCreate
The goal of this function is create or update the given entries according to if they already
exist in the cozy or not
You need the full permission for the given doctype in your manifest, to be able to
use this function.

Parameters:

- `entries` is an array of objects with any attributes :
- `doctype` (string) is the cozy doctype where the entries should be saved
- `matchingAttributes` (array of strings) is the list of attributes in each entry should be used to check if an entry
  is already saved in the cozy

<a name="BaseKonnector"></a>

## BaseKonnector
The class from which all the connectors must inherit.
It takes a fetch function in parameter that must return a `Promise`.
You need at least the `GET` permission on `io.cozy.accounts` in your manifest to allow it to
fetch account information for your connector.

**Kind**: global class  

* [BaseKonnector](#BaseKonnector)
    * [new BaseKonnector(fetch)](#new_BaseKonnector_new)
    * [.end()](#BaseKonnector+end)
    * [.fail()](#BaseKonnector+fail)
    * [.init()](#BaseKonnector+init) ⇒ <code>Promise</code>
    * [.saveAccountData(data, options)](#BaseKonnector+saveAccountData) ⇒ <code>Promise</code>
    * [.getAccountData()](#BaseKonnector+getAccountData) ⇒ <code>object</code>
    * [.terminate(message)](#BaseKonnector+terminate)

<a name="new_BaseKonnector_new"></a>

### new BaseKonnector(fetch)
Its role is twofold :

- Make the link between account data and konnector
- Handle errors

⚠️  A promise should be returned from the `fetch` function otherwise
the konnector cannot know that asynchronous code has been called.

```
this.terminate('LOGIN_FAILED')
```


| Param | Type | Description |
| --- | --- | --- |
| fetch | <code>function</code> | Function to be run automatically after account data is fetched. This function will be binded to the current connector. If not fetch function is given. The connector will have to handle itself it's own exection and error handling |

**Example**  
```javascript
const { BaseKonnector } = require('cozy-konnector-libs')

module.exports = new BaseKonnector(function fetch () {
 // use this to access the instance of the konnector to
 // store any information that needs to be passed to
 // different stages of the konnector
 return request('http://ameli.fr')
   .then(computeReimbursements)
   .then(saveBills)
})
```
<a name="BaseKonnector+end"></a>

### baseKonnector.end()
Hook called when the connector is ended

**Kind**: instance method of [<code>BaseKonnector</code>](#BaseKonnector)  
<a name="BaseKonnector+fail"></a>

### baseKonnector.fail()
Hook called when the connector fails

**Kind**: instance method of [<code>BaseKonnector</code>](#BaseKonnector)  
<a name="BaseKonnector+init"></a>

### baseKonnector.init() ⇒ <code>Promise</code>
Initializes the current connector with data comming from the associated account

**Kind**: instance method of [<code>BaseKonnector</code>](#BaseKonnector)  
**Returns**: <code>Promise</code> - with the fields as an object  
<a name="BaseKonnector+saveAccountData"></a>

### baseKonnector.saveAccountData(data, options) ⇒ <code>Promise</code>
Saves data to the account that is passed to the konnector.
Use it to persist data that needs to be passed to each
konnector run.

By default, the data is merged to the remote data, use
`options.merge = false` to overwrite the data.

The data is saved under the `.data` attribute of the cozy
account.

**Kind**: instance method of [<code>BaseKonnector</code>](#BaseKonnector)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Attributes to be merged |
| options | <code>object</code> | { merge: true|false } |

<a name="BaseKonnector+getAccountData"></a>

### baseKonnector.getAccountData() ⇒ <code>object</code>
Get the data saved by saveAccountData

**Kind**: instance method of [<code>BaseKonnector</code>](#BaseKonnector)  
<a name="BaseKonnector+terminate"></a>

### baseKonnector.terminate(message)
Send a special error code which is interpreted by the cozy stack to terminate the execution of the
connector now

**Kind**: instance method of [<code>BaseKonnector</code>](#BaseKonnector)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The error code to be saved as connector result see [docs/ERROR_CODES.md] |

<a name="Document"></a>

## Document
Simple Model for Documents. Allows to specify
`shouldSave`, `shouldUpdate` as methods.

Has useful `isEqual` method

**Kind**: global class  
<a name="Document+isEqual"></a>

### document.isEqual()
Compares to another document deeply.

`_id` and `_rev` are by default ignored in the comparison.

By default, will compare dates loosely since you often
compare existing documents (dates in ISO string) with documents
that just have been scraped where dates are `Date`s.

**Kind**: instance method of [<code>Document</code>](#Document)  
<a name="LOGIN_FAILED"></a>

## LOGIN_FAILED : <code>String</code>
The konnector could not login

**Kind**: global constant  
<a name="NOT_EXISTING_DIRECTORY"></a>

## NOT_EXISTING_DIRECTORY : <code>String</code>
The folder specified as folder_to_save does not exist (checked by BaseKonnector)

**Kind**: global constant  
<a name="VENDOR_DOWN"></a>

## VENDOR_DOWN : <code>String</code>
The vendor's website is down

**Kind**: global constant  
<a name="USER_ACTION_NEEDED"></a>

## USER_ACTION_NEEDED : <code>String</code>
There was an unexpected error, please take a look at the logs to know what happened

**Kind**: global constant  
<a name="FILE_DOWNLOAD_FAILED"></a>

## FILE_DOWNLOAD_FAILED : <code>String</code>
There was a problem while downloading a file

**Kind**: global constant  
<a name="SAVE_FILE_FAILED"></a>

## SAVE_FILE_FAILED : <code>String</code>
There was a problem while saving a file

**Kind**: global constant  
<a name="DISK_QUOTA_EXCEEDED"></a>

## DISK_QUOTA_EXCEEDED : <code>String</code>
Could not save a file to the cozy because of disk quota exceeded

**Kind**: global constant  
<a name="mkSpec"></a>

## mkSpec()
Declarative scraping.

Describe your items attributes and where to find/parse them
instead of imperatively building them.

Heavily inspired by [artoo] scraping method.

[artoo]: https://medialab.github.io/artoo/

**Kind**: global function  
<a name="scrape"></a>

## scrape($, spec(s), [childSelector]) ⇒ <code>object</code> \| <code>array</code>
Scrape a cheerio object for properties

**Kind**: global function  
**Returns**: <code>object</code> \| <code>array</code> - - Item(s) scraped  

| Param | Type | Description |
| --- | --- | --- |
| $ | <code>cheerio</code> | Cheerio node which will be scraped |
| spec(s) | <code>object</code> \| <code>string</code> | Options object describing what you want to scrape |
| [childSelector] | <code>string</code> | If passed, scrape will return an array of items |

**Example**  
`scrape` can be used to declaratively extract data :

- For one object :

```
const item = scrape($('#item'), {
  title: '.title',
  content: '.content'
})
```

- For a list of objects :

```
const items = scrape($('#content'), {
  title: '.title',
  content: '.content'
}, '.item')
```

For more power, you can use `object`s for each retriever :

```
const items = scrape($('#content'), {
  title: '.title',
  content: '.content',
  link: {
    sel: 'a',
    attr: 'href'
  },
}, '.item')
```

Here the `href` attribute of the `a` inside `.item`s would have been
put into the `link` attribute of the items returned by `scrape`.

Available options :

- `sel`: the CSS selector used to target the HTML node from which data will be scraped
- `attr`: the HTML attribute from which to extract data
- `parse`: function applied to the value extracted (`{ sel: '.price', parse: parseAmount }`)
- `fn`: if you need something more complicated than `attr`, you can use this function, it receives
the complete DOM node. `{ sel: '.person', fn: $node => $node.attr('data-name') + $node.attr('data-firstname') }`


### ⚠ Permissions

Please note that some classes require some permissions:

- `io.cozy.accounts` for the `BaseKonnector` class (`GET` only)
- `io.cozy.files` to save files
- `io.cozy.bills` to save bills
- `io.cozy.bank.operations` for `linkBankOperations`
