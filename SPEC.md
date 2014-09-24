#### Spec
<p>We are spec!</p>
<strong>code with no errors</strong>
```javascript
// {"testThrown":false,"testAsync":false}
      // Hello World
```
<strong>code with expected return value</strong>
```javascript
// {"expectedValue":true,"testThrown":false}
      return true;
```
<strong>errors can be returned</strong>
```javascript
// {"expectedValue":{},"testThrown":false}
      return Error('wrong');
```
<strong>errors can be thrown</strong>
```javascript
// {"expectedValue":{},"testThrown":true,"testAsync":false}
      throw Error('wrong');
```
<strong>expectedValue can be asynchronous</strong>
```javascript
// {"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}
      //      callback(42);
```