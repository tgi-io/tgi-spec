#### Spec
<p>We are spec!</p>
<strong>code with no errors</strong>
```javascript
// Hello World
```
<blockquote>{"testThrown":false,"testAsync":false}</blockquote>
<strong>code with expected return value</strong>
```javascript
return true;
```
<blockquote>{"expectedValue":true,"testThrown":false}</blockquote>
<strong>errors can be returned</strong>
```javascript
return Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":false}</blockquote>
<strong>errors can be thrown</strong>
```javascript
throw Error('wrong');
```
<blockquote>{"expectedValue":{},"testThrown":true,"testAsync":false}</blockquote>
<strong>expectedValue can be asynchronous</strong>
```javascript
setTimeout(function () {  callback(42);
  callback(42);}, 0);
}, 0);
```
<blockquote>{"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}</blockquote>