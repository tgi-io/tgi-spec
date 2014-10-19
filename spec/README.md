#Spec Constructor Function
#### TGI SPEC
<p>Javascript test and spec documentation framework.</p>
#### METHODS
#### heading(text,function(){})
<p>heading test followed by optional function used for indenting structure.  The presentation may reflect this as heading levels (todo for github markdown).</p>
#### paragraph(text)
<p>here is the best example: https://github.com/tgicloud/tgi-spec/blob/master/lib/tgi-spec.test.js#L24</p>
#### example(text, results, testFunction)
<p>The example function provides a test description, expected outcome and funtion to invoke for test.</p>
&nbsp;<b><i>Code with no errors:</i></b>
```javascript
// Hello World
```
&nbsp;<b><i>Code with expected return value:</i></b>
```javascript
return true;
```
<blockquote>returns <strong>true</strong> as expected
</blockquote>
&nbsp;<b><i>Errors can be returned:</i></b>
```javascript
return Error('wrong');
```
<blockquote>returns <strong>Error: wrong</strong> as expected
</blockquote>
&nbsp;<b><i>Errors can be thrown:</i></b>
```javascript
throw Error('wrong');
```
<blockquote><strong>Error: wrong</strong> thrown as expected
</blockquote>
&nbsp;<b><i>Expected results can be asynchronous:</i></b>
```javascript
setTimeout(function () {
  callback(42);
}, 0);
```
<blockquote>returns <strong>42</strong> as expected
</blockquote>
&nbsp;<b><i>Can contain one or more assertions:</i></b>
```javascript
this.shouldBeTrue(2 === 2);
this.shouldBeFalse(0.1 + 0.2 === 0.3);
this.shouldThrowError('*', function () { // Any error
  throw Error();
});
this.shouldThrowError(Error('fubar'), function () {
  throw Error('fubar');
});
```
&nbsp;<b><i>can log expression output:</i></b>
```javascript
this.log('ponder the meaning of life: ' + 42 * 10);
```
<blockquote><strong>log: </strong>ponder the meaning of life: 420<br></blockquote>