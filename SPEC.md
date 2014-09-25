#### TGI SPEC
<p>Javascript test and spec documentation framework.</p>
#### METHODS
#### example(text, results, testFunction)
<p>The example function provides a test description, expected outcome and funtion to invoke for test.</p>
<em>EXAMPLE code with no errors:</em>
```javascript
// Hello World
```
<blockquote>{"testThrown":false,"testAsync":false}</blockquote>
<em>EXAMPLE code with expected return value:</em>
```javascript
return true;
```
<blockquote>{"expectedValue":true,"testThrown":false}</blockquote>
<em>EXAMPLE errors can be returned:</em>
```javascript
return Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":false}</blockquote>
<em>EXAMPLE errors can be thrown:</em>
```javascript
throw Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":true,"testAsync":false}</blockquote>
<em>EXAMPLE expectedValue can be asynchronous:</em>
```javascript
setTimeout(function () {  callback(42);
  callback(42);}, 0);
}, 0);
```
<blockquote>{"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}</blockquote>