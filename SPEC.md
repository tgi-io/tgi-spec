#### Spec
<p>We are spec!</p>
<strong>code with no errors</strong>
```javascript
// {"testThrown":false,"testAsync":false}
function () {
      // Hello World
    }
```
<strong>code with expected return value</strong>
```javascript
// {"expectedValue":true,"testThrown":false}
function () {
      return true;
    }
```
<strong>errors can be returned</strong>
```javascript
// {"expectedValue":{},"testThrown":false}
function () {
      return Error('wrong');
    }
```
<strong>errors can be thrown</strong>
```javascript
// {"expectedValue":{},"testThrown":true,"testAsync":false}
function () {
      throw Error('wrong');
    }
```
<strong>expectedValue can be asynchronous</strong>
```javascript
// {"expectedValue":{"async":true,"expectedValue":42},"testThrown":false,"testAsync":true}
function (callback) {
      //
      callback(42);
    }
```