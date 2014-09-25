#### TGI SPEC
<p>Javascript test and spec documentation framework.</p>
#### METHODS
#### example(text, results, testFunction)
<p>The example function provides a test description, expected outcome and funtion to invoke for test.</p>
&nbsp;<b><i>EXAMPLE code with no errors:</i></b>
```javascript
// Hello World
```
<blockquote>{"testThrown":false,"testAsync":false}</blockquote>
&nbsp;<b><i>EXAMPLE code with expected return value:</i></b>
```javascript
return true;
```
<blockquote>{"expectedValue":true,"testThrown":false}<br>returns <strong>true</strong> as expected
</blockquote>
&nbsp;<b><i>EXAMPLE errors can be returned:</i></b>
```javascript
return Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":false}<br>returns <strong>Error: wrong</strong> as expected
</blockquote>
&nbsp;<b><i>EXAMPLE errors can be thrown:</i></b>
```javascript
throw Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":true,"testAsync":false}<br><strong>Error: wrong</strong> thrown as expected
</blockquote>
&nbsp;<b><i>EXAMPLE expectedValue can be asynchronous:</i></b>
```javascript
setTimeout(function () {  callback(42);
  callback(42);}, 0);
}, 0);
```
<blockquote>{"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}<br>returns <strong>42</strong> as expected
</blockquote>