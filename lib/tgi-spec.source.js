/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.source.js
 **/
var Spec = function (options) {
  options = options || {};
  var spec = this;
  spec.scripts = []; // array of scripts
  spec.nodes = []; // array of Spec.Node's
  spec.testsCreated = 0;
  spec.testsPending = 0;
  spec.testsFailed = 0;
  spec.muted = false;
  spec.mutedTestsCreated = 0;
  spec.muteCount = 0;
  spec.timeOut = options.timeOut || 500;
};
Spec.prototype.test = function (testSource, testName, testDescription, testScript) {
  this.scripts.push({
    testSource: testSource,
    testName: testName,
    testDescription: testDescription,
    testScript: testScript
  });
};
Spec.prototype.testSection = function (sectionHeader, sectionText) {
  this.scripts.push({
    testSource: 'Section',
    testName: sectionHeader,
    testDescription: sectionText
  });
};
Spec.prototype.runTests = function (callback) {
  var spec = this;
  var node;
  spec.testCallback = callback;
  // Load the scripts
  for (var i = 0; i < spec.scripts.length; i++) {
    var script = spec.scripts[i];
    spec.testCallback({log: 'test script: ' + script.testName + (spec.muted ? ' (MUTED)' : '')});
    if (script.testSource == 'Section') {
      node = new Spec.Node({type: 's'});
      node.muted = spec.muted;
      node.text = script.testName;
      node.description = script.testDescription;
      spec.nodes.push(node);

    } else {
      node = new Spec.Node({type: 't'});
      node.muted = spec.muted;
      node.text = script.testName;
      node.description = script.testDescription;
      spec.nodes.push(node);
      script.testScript(callback);
    }
  }
  // Push Summary of all tests
  node = new Spec.Node({type: 't'});
  node.muted = spec.muted;
  node.text = 'Summary';
  node.description = 'for this spec.';
  spec.nodes.push(node);
  spec.completionCheck();
  spec.paragraph('This documentation generated with https://github.com/tgicloud/tgi-spec.<br>TODO put testin stats here.');
};
Spec.prototype.completionCheck = function (force) {
  var spec = this;
  console.log('completionCheck ' + spec.testsPending);
  if (!spec.testsPending || force) {
    clearTimeout(spec.watchdog);
    spec.testCallback({
      done: true,
      testsCreated: spec.testsCreated,
      testsPending: spec.testsPending,
      testsFailed: spec.testsFailed
    });
  } else {
    // Give time for async to finish
    spec.watchdog = spec.watchdog || setTimeout(function () {
      spec.completionCheck(true); // force completion
    }, spec.timeOut);
  }
};
Spec.prototype.githubMarkdown = function () {
  var spec = this;
  var text = '';
  var i;
  for (i = 0; i < spec.nodes.length; i++) {
    var node = spec.nodes[i];
    if (!node.muted) {
      if (i)
        text += '\n';
      switch (node.type) {
        case 't':
          if (i === 0) {
            text += '#' + node.text;
          } else if (isLastLink(i)) {
            text += '## [&#9664;](' + getPreviousLink(i) + ')&nbsp;[&#8984;](#table-of-contents) &nbsp;' + node.text;
          } else {
            text += '## [&#9664;](' + getPreviousLink(i) + ')&nbsp;[&#8984;](#table-of-contents)&nbsp;[&#9654;](' + getNextLink(i) + ') &nbsp;' + node.text;
          }
          break;
        case 'h':
          text += '#### ' + node.text;
          break;
        case 'i':
          text += generateTOC();
          break;
        case 'e':
          text += codeBlock();
          break;
        case 'p':
          text += node.text + '    \n';
          break;
        default:
      }
    }
  }
  return text;

  /**
   * Generate Table of Contents for each test
   * [What is the point?](#-point-is-this)
   * https://github.com/tgicloud/tgi-spec/blob/master/spec/README.md#-illiad-book-1
   */
  function generateTOC() {
    var i;
    var text = '###Table of Contents\n';
    // todo skips first test should be overridable
    for (i = 1; i < spec.nodes.length; i++) {
      var node = spec.nodes[i];
      if (node.type == 's') {
        text += '\n\n#### ' + node.text;
      }
      if (node.type == 't') {
        if (node.text != 'Summary')
          text += '\n- [' + node.text + '](' + '#-' + textToAnchor(node.text) + ') ' + node.description;
      }
    }
    return text + '\n\n';
  }

  /**
   * helpers
   */
  function textToAnchor(text) {
    return text.toLowerCase().replace(/ /g, '-');
  }

  function getPreviousLink(index) {
    var i;
    for (i = index - 1; i >= 0; i--) {
      var node = spec.nodes[i];
      if (node.type == 't') {
        if (index == 1)
          return '#' + textToAnchor(node.text);
        else
          return '#-' + textToAnchor(node.text);
      }
    }
    return '#';
  }

  function getNextLink(index) {
    var i;
    for (i = index + 1; i < spec.nodes.length; i++) {
      var node = spec.nodes[i];
      if (node.type == 't') {
        return '#-' + textToAnchor(node.text);
      }
    }
    return '#';
  }

  function isLastLink(index) {
    var i;
    var lastLink;
    for (i = 0; i < spec.nodes.length; i++) {
      var node = spec.nodes[i];
      if (node.type == 't') {
        lastLink = i;
      }
    }
    return lastLink == index;
  }

  /**
   * take test callback and format for code display
   */
  function codeBlock() {
    var i, j, k;
    var arrayOfLines;
    var prettyCode;
    var leadingSpaces = 0;
    var line, line2;
    var codeText = '';
    var resultsText = '';
    var expectedValue;
    arrayOfLines = node.test.testFunction.toString().match(/[^\r\n]+/g);
    prettyCode = '';
    for (j = 1; j < arrayOfLines.length - 1; j++) {
      line = arrayOfLines[j];
      if (j == 1) {
        leadingSpaces = 0;
        for (k = 0; k < line.length && line[k] == ' '; k++) {
          leadingSpaces++;
        }
      }
      for (k = 0; k < line.length && k < leadingSpaces && line[k] == ' '; k++) {
        // eat spaces
      }
      line2 = '';
      for (; k < line.length; k++) {
        line2 += line[k];
      }
      if (prettyCode.length)
        prettyCode += '\n' + line2;
      else
        prettyCode += line2;
    }
    codeText += '&nbsp;<b><i>' + node.text + ':</i></b>';
    codeText += '\n```javascript\n' + prettyCode + '\n```';
    expectedValue = node.test.expectedValue;
    if (typeof node.test.expectedValue === 'object' && node.test.expectedValue.async)
      expectedValue = node.test.expectedValue.expectedValue;
    if (node.test.testThrown) {
      if (node.test.testFailed) {
        resultsText = 'error thrown: ' + node.test.errorThrown + '\n';
      } else {
        if (expectedValue)
          resultsText = '<strong>' + expectedValue + '</strong> thrown as expected\n';
        else
          resultsText = 'error thrown as expected\n';
      }
    } else {
      if (node.test.testFailed) {
        if (node.test.returnValue !== expectedValue)
          resultsText = 'ERROR got  <strong>' + node.test.returnValue + '</strong> expected <strong>' + expectedValue + '</strong>\n';
      } else {
        if (expectedValue)
          resultsText = 'returns <strong>' + expectedValue + '</strong> as expected\n';
      }
    }
    if (node.test.assertionsFailed) {
      if (resultsText.length) resultsText += '<br>';
      resultsText += 'Assertion(s) failed\n';
    }

    // this.stuffLogged.push(stuff);
    //this.stuffLogged.push(stuff);
    if (node.test.stuffLogged) {
      for (i = 0; i < node.test.stuffLogged.length; i++) {
        var log = node.test.stuffLogged[i];
        resultsText = '<strong>log: </strong>' + log + '<br>' + resultsText;
      }
    }

    if (resultsText) {
      codeText += '\n<blockquote>' +
      resultsText +
      '</blockquote>';
    }
    return codeText;
  }

};
/**
 * Spec.Node object for each piece of spec types as follows:
 * s - section
 * t - test module
 * h - heading
 * i - index
 * p - paragraph
 * e - example (test)
 **/
Spec.Node = function (args) {
  args = args || {};
  this.type = args.type || null;
  if (!this.type || ((this.type != 's') && (this.type != 't') && (this.type != 'h') && (this.type != 'i') && (this.type != 'p') && (this.type != 'e'))) {
    throw new Error('Spec.Node type must be t, h, i, p or e');
  }
};
/**
 * Spec.Test for each example
 */
Spec.Test = function (spec, expectedValue, testFunction, example) {
  var test = this;
  var testExpectedValue;
  var testReturnValue;
  spec.testsCreated++;
  spec.testsPending++;
  test.expectedValue = expectedValue;
  test.testFunction = testFunction;
  test.testThrown = false;
  test.testAsync = false;
  test.assertionsMade = 0;
  test.assertionsFailed = 0;
  test.stuffLogged = [];
  try {
    var returnValue = test.testFunction(function (callbackReturns) {
      spec.testsPending--;
      if (test.assertionsFailed) {
        spec.testsFailed++;
        test.testFailed = true;
        spec.testCallback({error: 'ex. "' + example + '": ' + 'assertions failed: ' + testReturnValue});
      } else if (typeof expectedValue !== 'undefined' && expectedValue.async) {
        if (test.expectedValue.expectedValue != callbackReturns) {
          spec.testsFailed++;
          test.testFailed = true;
          spec.testCallback({error: 'ex. "' + example + '": ' + 'callback return value incorrect: "' + callbackReturns + '" expected "' + test.expectedValue.expectedValue + '"'});
        }
      }
    });
    testReturnValue = returnValue instanceof Error ? returnValue.toString() : returnValue;
    if (typeof expectedValue !== 'undefined') {
      test.testAsync = expectedValue.async;
      testExpectedValue = expectedValue instanceof Error ? expectedValue.toString() : expectedValue;
      if (!test.testAsync) {
        test.returnValue = testReturnValue;
        if (testExpectedValue != testReturnValue) {
          spec.testsFailed++;
          test.testFailed = true;
          spec.testCallback({error: 'ex. "' + example + '": ' + 'return value incorrect: "' + testReturnValue + '" expected "' + testExpectedValue + '"'});
        } else if (test.assertionsFailed) {
          spec.testsFailed++;
          test.testFailed = true;
          spec.testCallback({error: 'ex. "' + example + '": ' + 'assertions failed: ' + testReturnValue});
        }
      }
    } else if (test.assertionsFailed) {
      spec.testsFailed++;
      test.testFailed = true;
      spec.testCallback({error: 'ex. "' + example + '": ' + 'assertions failed: ' + testReturnValue});
    }
  } catch (e) {
    test.testThrown = true;
    test.errorThrown = e;
    if (typeof expectedValue === 'undefined' || !(expectedValue instanceof Error) || e.toString() !== expectedValue.toString()) {
      spec.testsFailed++;
      test.testFailed = true;
      spec.testCallback({error: 'ex. "' + example + '": ' + 'error thrown: ' + e});
    }
  }
  if (!test.testAsync)
    spec.testsPending--;
};
/**
 * Assertions
 */
Spec.Test.prototype.shouldBeTrue = function (expression) {
  this.assertionsMade++;
  if (expression !== true)
    this.assertionsFailed++;
};
Spec.Test.prototype.shouldBeFalse = function (expression) {
  this.assertionsMade++;
  if (expression !== false)
    this.assertionsFailed++;
};
Spec.Test.prototype.shouldBeTruthy = function (expression) {
  this.assertionsMade++;
  if (!expression)
    this.assertionsFailed++;
};
Spec.Test.prototype.shouldBeFalsy = function (expression) {
  this.assertionsMade++;
  if (expression != false) // jshint ignore:line
    this.assertionsFailed++;
};
Spec.Test.prototype.shouldThrowError = function (err, func) {
  var gotError = false;
  try {
    func();
  } catch (e) {
    gotError = true;
    if (err !== undefined)
      if (err.toString() != e.toString() && err.toString() != '*')
        throw('EXPECTED ERROR(' + err + ') GOT ERROR(' + e + ')');
  }
  if (!gotError) {
    throw('EXPECTED ERROR(' + err + ')');
  }
};
/**
 * Logging
 **/
Spec.Test.prototype.log = function (stuff) {
  this.stuffLogged.push(stuff);
};

/**
 * Create a heading node
 **/
Spec.prototype.heading = function (text, func) {
  var spec = this;
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.heading requires text argument');
  }
  spec.testCallback({log: 'heading: ' + text + (spec.muted ? ' (MUTED)' : '')});
  var node = new Spec.Node({type: 'h'});
  node.muted = spec.muted;
  node.text = text;
  this.nodes.push(node);
  if (func) func();
  return node;
};
/**
 * Create a paragraph node
 **/
Spec.prototype.paragraph = function (text) {
  var spec = this;
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.paragraph requires text argument');
  }
  spec.testCallback({log: 'paragraph: ' + text + (spec.muted ? ' (MUTED)' : '')});
  var node = new Spec.Node({type: 'p'});
  node.muted = spec.muted;
  node.text = text;
  this.nodes.push(node);
  return node;
};
/**
 * Create a example node
 **/
Spec.prototype.example = function (text, results, testFunction) {
  var spec = this;
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.example requires text argument');
  }
  spec.testCallback({log: 'example: ' + text + (spec.muted ? ' (MUTED)' : '')});
  if (typeof testFunction !== 'function') {
    throw new Error('Spec.example 3rd arg is function code or undefined');
  }
  var node = new Spec.Node({type: 'e'});
  node.muted = spec.muted;
  if (spec.muted) spec.mutedTestsCreated++;
  node.text = text;
  node.test = new Spec.Test(this, results, testFunction, text);
  this.nodes.push(node);
  return node;
};
Spec.prototype.xexample = function () { // for disabling
};
/**
 * Create index / TOC
 */
Spec.prototype.index = function () {
  var spec = this;
  var node = new Spec.Node({type: 'i'});
  node.muted = spec.muted;
  spec.nodes.push(node);
  return node;
};
/**
 * Encapsulate expected test results with async tag
 **/
Spec.prototype.asyncResults = function (arg) {
  return {async: true, expectedValue: arg};
};
/**
 * Mute / unmute tests
 **/
Spec.prototype.mute = function (arg) {

  var spec = this;
  if (arg) {
    if (!spec.muteCount)
      spec.mutedTestsCreated = 0;
    spec.muted = true;
    spec.muteCount++;
  } else {
    if (spec.muteCount > 0)
      spec.muteCount--;
    if (!spec.muteCount)
      spec.muted = false;
  }
  //if (spec.testCallback)
  //  spec.testCallback({log: 'MUTE ' + (arg ? 'ON' : 'OFF') + ' COUNT ' + spec.muteCount});
  //else
  //  console.log('*** MUTE ' + (arg ? 'ON' : 'OFF') + ' ***');

  return {testsCreated: spec.mutedTestsCreated};
};
