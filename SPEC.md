#### Spec
<p>We are spec!</p>
<strong>code with no errors</strong>```javascript
// {"testThrown":false,"testAsync":false}
```
<strong>code with expected return value</strong>```javascript
// {"expectedValue":true,"testThrown":false}
```
<strong>errors can be returned</strong>```javascript
// {"expectedValue":{},"testThrown":false}
```
<strong>errors can be thrown</strong>```javascript
// {"expectedValue":{},"testThrown":true,"testAsync":false}
```
<strong>expectedValue can be asynchronous</strong>```javascript
// {"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}
```