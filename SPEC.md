#### TGI SPEC
<p>Javascript test and spec documentation framework.</p>
#### METHODS
#### example(text, results, testFunction)
<p>The example function provides a test description, expected outcome and funtion to invoke for test.</p>
<strong>ex: code with no errors</strong>
```javascript
// Hello World
```
<blockquote>{"testThrown":false,"testAsync":false}</blockquote>
<strong>ex: code with expected return value</strong>
```javascript
return true;
```
<blockquote>{"expectedValue":true,"testThrown":false}</blockquote>
<strong>ex: errors can be returned</strong>
```javascript
return Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":false}</blockquote>
<strong>ex: errors can be thrown</strong>
```javascript
throw Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":true,"testAsync":false}</blockquote>
<strong>ex: expectedValue can be asynchronous</strong>
```javascript
setTimeout(function () {  callback(42);
  callback(42);}, 0);
}, 0);
```
<blockquote>{"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}</blockquote>