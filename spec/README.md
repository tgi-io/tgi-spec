#INTRO
<p>There be dragons!</p>
###Table of Contents

- [INTRO](#-intro) 
- [Spec Constructor Function](#-spec-constructor-function) it is what it is
- [Illiad Book 1](#-illiad-book-1) it is what it is
- [Illiad Book 2](#-illiad-book-2) it is what it is


## [&#9664;](#-spec-constructor-function)&nbsp;[&#8984;](#table-of-contents)&nbsp;[&#9654;](#-spec-constructor-function) &nbsp;Spec Constructor Function
#### TGI SPEC
<p>Javascript test and spec documentation framework.</p>
#### METHODS
#### example(text, results, testFunction)
<p>The example function provides a test description, expected outcome and funtion to invoke for test.</p>
&nbsp;<b><i>Code with no errors:</i></b>
```javascript
// Hello World
```
<blockquote></blockquote>
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
<blockquote></blockquote>
#### SPAM
<p>I got 99 problems and this is #1</p>
<p>I got 99 problems and this is #2</p>
<p>I got 99 problems and this is #3</p>
<p>I got 99 problems and this is #4</p>
<p>I got 99 problems and this is #5</p>
<p>I got 99 problems and this is #6</p>
<p>I got 99 problems and this is #7</p>
<p>I got 99 problems and this is #8</p>
<p>I got 99 problems and this is #9</p>
<p>I got 99 problems and this is #10</p>
<p>I got 99 problems and this is #11</p>
<p>I got 99 problems and this is #12</p>
<p>I got 99 problems and this is #13</p>
<p>I got 99 problems and this is #14</p>
<p>I got 99 problems and this is #15</p>
<p>I got 99 problems and this is #16</p>
<p>I got 99 problems and this is #17</p>
<p>I got 99 problems and this is #18</p>
<p>I got 99 problems and this is #19</p>
<p>I got 99 problems and this is #20</p>
<p>I got 99 problems and this is #21</p>
<p>I got 99 problems and this is #22</p>
<p>I got 99 problems and this is #23</p>
<p>I got 99 problems and this is #24</p>
<p>I got 99 problems and this is #25</p>
<p>I got 99 problems and this is #26</p>
<p>I got 99 problems and this is #27</p>
<p>I got 99 problems and this is #28</p>
<p>I got 99 problems and this is #29</p>
<p>I got 99 problems and this is #30</p>
<p>I got 99 problems and this is #31</p>
<p>I got 99 problems and this is #32</p>
<p>I got 99 problems and this is #33</p>
<p>I got 99 problems and this is #34</p>
<p>I got 99 problems and this is #35</p>
<p>I got 99 problems and this is #36</p>
<p>I got 99 problems and this is #37</p>
<p>I got 99 problems and this is #38</p>
<p>I got 99 problems and this is #39</p>
<p>I got 99 problems and this is #40</p>
<p>I got 99 problems and this is #41</p>
<p>I got 99 problems and this is #42</p>
<p>I got 99 problems and this is #43</p>
<p>I got 99 problems and this is #44</p>
<p>I got 99 problems and this is #45</p>
<p>I got 99 problems and this is #46</p>
<p>I got 99 problems and this is #47</p>
<p>I got 99 problems and this is #48</p>
<p>I got 99 problems and this is #49</p>
<p>I got 99 problems and this is #50</p>
<p>I got 99 problems and this is #51</p>
<p>I got 99 problems and this is #52</p>
<p>I got 99 problems and this is #53</p>
<p>I got 99 problems and this is #54</p>
<p>I got 99 problems and this is #55</p>
<p>I got 99 problems and this is #56</p>
<p>I got 99 problems and this is #57</p>
<p>I got 99 problems and this is #58</p>
<p>I got 99 problems and this is #59</p>
<p>I got 99 problems and this is #60</p>
<p>I got 99 problems and this is #61</p>
<p>I got 99 problems and this is #62</p>
<p>I got 99 problems and this is #63</p>
<p>I got 99 problems and this is #64</p>
<p>I got 99 problems and this is #65</p>
<p>I got 99 problems and this is #66</p>
<p>I got 99 problems and this is #67</p>
<p>I got 99 problems and this is #68</p>
<p>I got 99 problems and this is #69</p>
<p>I got 99 problems and this is #70</p>
<p>I got 99 problems and this is #71</p>
<p>I got 99 problems and this is #72</p>
<p>I got 99 problems and this is #73</p>
<p>I got 99 problems and this is #74</p>
<p>I got 99 problems and this is #75</p>
<p>I got 99 problems and this is #76</p>
<p>I got 99 problems and this is #77</p>
<p>I got 99 problems and this is #78</p>
<p>I got 99 problems and this is #79</p>
<p>I got 99 problems and this is #80</p>
<p>I got 99 problems and this is #81</p>
<p>I got 99 problems and this is #82</p>
<p>I got 99 problems and this is #83</p>
<p>I got 99 problems and this is #84</p>
<p>I got 99 problems and this is #85</p>
<p>I got 99 problems and this is #86</p>
<p>I got 99 problems and this is #87</p>
<p>I got 99 problems and this is #88</p>
<p>I got 99 problems and this is #89</p>
<p>I got 99 problems and this is #90</p>
<p>I got 99 problems and this is #91</p>
<p>I got 99 problems and this is #92</p>
<p>I got 99 problems and this is #93</p>
<p>I got 99 problems and this is #94</p>
<p>I got 99 problems and this is #95</p>
<p>I got 99 problems and this is #96</p>
<p>I got 99 problems and this is #97</p>
<p>I got 99 problems and this is #98</p>
<p>I got 99 problems and this is #99</p>
## [&#9664;](#-illiad-book-1)&nbsp;[&#8984;](#table-of-contents)&nbsp;[&#9654;](#-illiad-book-1) &nbsp;Illiad Book 1
<p>Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans.</p>
## [&#9664;](#-illiad-book-2)&nbsp;[&#8984;](#table-of-contents)&nbsp;[&#9654;](#-illiad-book-2) &nbsp;Illiad Book 2
<p>Now the other gods and the armed warriors on the plain slept soundly, but Jove was wakeful, for he was thinking how to do honour to Achilles, and destroyed much people at the ships of the Achaeans.</p>