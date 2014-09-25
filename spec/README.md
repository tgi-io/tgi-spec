#### TGI SPEC
<p>Javascript test and spec documentation framework.</p>
#### METHODS
#### example(text, results, testFunction)
<p>The example function provides a test description, expected outcome and funtion to invoke for test.</p>
&nbsp;<b><i>EXAMPLE code with no errors:</i></b>
```javascript
// Hello World
```
<blockquote></blockquote>
&nbsp;<b><i>EXAMPLE code with expected return value:</i></b>
```javascript
return true;
```
<blockquote>returns <strong>true</strong> as expected
</blockquote>
&nbsp;<b><i>EXAMPLE errors can be returned:</i></b>
```javascript
return Error('wrong');
```
<blockquote>returns <strong>Error: wrong</strong> as expected
</blockquote>
&nbsp;<b><i>EXAMPLE errors can be thrown:</i></b>
```javascript
throw Error('wrong');
```
<blockquote><strong>Error: wrong</strong> thrown as expected
</blockquote>
&nbsp;<b><i>EXAMPLE expected results can be asynchronous:</i></b>
```javascript
setTimeout(function () {
  callback(42);
}, 0);
```
<blockquote>returns <strong>42</strong> as expected
</blockquote>
&nbsp;<b><i>EXAMPLE can contain one or more assertions:</i></b>
```javascript
this.shouldBeTrue(1 === 2);
```
<blockquote>ERROR got  <strong>undefined</strong> expected <strong>undefined</strong>
Assertion(s) failed
</blockquote>