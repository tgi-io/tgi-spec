#### Spec
<p>We are spec!</p>
<strong>code with no errors</strong>
```javascript
// Hello World
```
<blockquote><strong>{"testThrown":false,"testAsync":false}</strong></blockquote>
<strong>code with expected return value</strong>
```javascript
return true;
```
<blockquote><strong>{"expectedValue":true,"testThrown":false}</strong></blockquote>
<strong>errors can be returned</strong>
```javascript
return Error('wrong');
```
<blockquote><strong>{"expectedValue":{},"testThrown":false}</strong></blockquote>
<strong>errors can be thrown</strong>
```javascript
throw Error('wrong');
```
<blockquote><strong>{"expectedValue":{},"testThrown":true,"testAsync":false}</strong></blockquote>
<strong>expectedValue can be asynchronous</strong>
```javascript
setTimeout(function () {  callback(42);
  callback(42);}, 0);
}, 0);
```
<blockquote><strong>{"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}</strong></blockquote>