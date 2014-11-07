#INTRO
There be dragons!    

###Table of Contents


#### Spec
- [Spec Constructor Function](#-spec-constructor-function) it is what it is

#### Homer
- [Illiad Book 1](#-illiad-book-1) it is what it is
- [Illiad Book 2](#-illiad-book-2) it is what it is



## [&#9664;](#-intro)&nbsp;[&#8984;](#table-of-contents)&nbsp;[&#9654;](#-illiad-book-1) &nbsp;Spec Constructor Function
#### TGI SPEC
Javascript test and spec documentation framework.    

#### METHODS
#### heading(text,function(){})
heading test followed by optional function used for indenting structure.  The presentation may reflect this as heading levels (todo for github markdown).    

#### paragraph(text)
here is the best example: https://github.com/tgicloud/tgi-spec/blob/master/lib/tgi-spec.test.js#L24    

#### example(text, results, testFunction)
The example function provides a test description, expected outcome and function to invoke for test.  to disable a test spec.xexample is provided also.    

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
this.shouldBeTruthy('To thine own self be true');
this.shouldBeFalsy('');
this.shouldBeTruthy(42);
this.shouldBeFalsy(0);
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
#### mute(true/false)
Tests can be muted.  All documentation will be muted but tests will be run.  Return value is object with stats of run tests.    

&nbsp;<b><i>check function and return value:</i></b>
```javascript
var mutedTests = spec.mute(false);
this.log(JSON.stringify(mutedTests));
return mutedTests.testsCreated;
```
<blockquote><strong>log: </strong>{"testsCreated":0}<br></blockquote>
&nbsp;<b><i>mute enabled:</i></b>
```javascript
spec.mute(true);
```
&nbsp;<b><i>should have 2 muted test now:</i></b>
```javascript
// See source for skipped parts
return wasMuted;
```
<blockquote>returns <strong>2</strong> as expected
</blockquote>

## [&#9664;](#-spec-constructor-function)&nbsp;[&#8984;](#table-of-contents)&nbsp;[&#9654;](#-illiad-book-2) &nbsp;Illiad Book 1
Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans.     

## [&#9664;](#-illiad-book-1)&nbsp;[&#8984;](#table-of-contents)&nbsp;[&#9654;](#-summary) &nbsp;Illiad Book 2
Now the other gods and the armed warriors on the plain slept soundly, but Jove was wakeful, for he was thinking how to do honour to Achilles, and destroyed much people at the ships of the Achaeans.    

## [&#9664;](#-illiad-book-2)&nbsp;[&#8984;](#table-of-contents) &nbsp;Summary
This documentation generated with https://github.com/tgicloud/tgi-spec.<br>TODO put testin stats here.    
