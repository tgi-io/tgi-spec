/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.source.js
 **/
var Spec = function () {
  this.scripts = []; // array of scripts
  this.nodes = []; // array of Spec.Node's
  this.testsCreated = 0;
  this.testsPending = 0;
  this.testsFailed = 0;
};
Spec.prototype.test = function (testSource, testName, testScript) {
  this.scripts.push({testSource: testSource, testName: testName, testScript: testScript});
};
Spec.prototype.runTests = function (callback) {
  this.testFunction = callback;
  // Load the scripts
  for (var i = 0; i < this.scripts.length; i++) {
    var script = this.scripts[i];
    this.testFunction({log: 'loading test script: ' + script.testName});
    script.testScript(callback);
  }
  this.completionCheck();
};
Spec.prototype.completionCheck = function (force) {
  var spec = this;
  if (!spec.testsPending || force) {
    clearTimeout(spec.watchdog);
    spec.testFunction({
      done: true,
      testsCreated: spec.testsCreated,
      testsPending: spec.testsPending,
      testsFailed: spec.testsFailed
    });
  } else {
    // Give time for async to finish
    spec.watchdog = spec.watchdog || setTimeout(function () {
      spec.completionCheck(true); // force completion
    }, 500);
  }
};
Spec.prototype.githubMarkdown = function () {
  var spec = this;
  var text = '';
  var i;
  for (i = 0; i < spec.nodes.length; i++) {
    var node = spec.nodes[i];
    if (i)
      text += '\n';
    switch (node.type) {
      case 'h':
        text += '#### ' + node.text;
        break;
      case 'e':
        text += codeBlock();
        break;
      default:
      case 'p':
        text += '<p>' + node.text + '</p>';
        break;
    }
  }
  return text;

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
    codeText += '\n<blockquote>' +
    resultsText +
    '</blockquote>';
    return codeText;
  }

};
/**
 * Spec.Node object for each piece of spec types as follows:
 * h - heading
 * p - paragraph
 * e - example (test)
 **/
Spec.Node = function (args) {
  args = args || {};
  this.type = args.type || null;
  if (!this.type || ((this.type != 'h') && (this.type != 'p') && (this.type != 'e'))) {
    throw new Error('Spec.Node type must be h, p or e');
  }
};
/**
 * Spec.Test for each example
 */
Spec.Test = function (spec, expectedValue, testFunction) {
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
  try {
    var returnValue = test.testFunction(function (callbackReturns) {
      spec.testsPending--;
      if (typeof expectedValue !== 'undefined' && expectedValue.async) {
        if (test.expectedValue.expectedValue !== callbackReturns || test.assertionsFailed) {
          spec.testsFailed++;
        }
      } else if (test.assertionsFailed) {
        spec.testsFailed++;
        test.testFailed = true;
      }
    });
    if (typeof expectedValue !== 'undefined') {
      test.testAsync = expectedValue.async;
      testExpectedValue = expectedValue instanceof Error ? expectedValue.toString() : expectedValue;
      testReturnValue = returnValue instanceof Error ? returnValue.toString() : returnValue;
      if (!test.testAsync) {
        test.returnValue = testReturnValue;
        if (testExpectedValue !== testReturnValue) {
          spec.testsFailed++;
          test.testFailed = true;
          this.testFunction({error: 'return value incorrect: ' + testReturnValue});
        } else if (test.assertionsFailed) {
          spec.testsFailed++;
          test.testFailed = true;
          this.testFunction({error: 'assertions failed: ' + testReturnValue});
        }
      }
    } else if (test.assertionsFailed) {
      spec.testsFailed++;
      test.testFailed = true;
    }
  } catch (e) {
    test.testThrown = true;
    test.errorThrown = e;
    if (typeof expectedValue === 'undefined' || !(expectedValue instanceof Error) || e.toString() !== expectedValue.toString()) {
      spec.testsFailed++;
      test.testFailed = true;
      this.testFunction({error: 'error thrown: ' + e});
    }
  }
  if (!test.testAsync)
    spec.testsPending--;
};
/**
 *
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

/**
 * Create a heading node
 **/
Spec.prototype.heading = function (text, func) {
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.heading requires text argument');
  }
  this.testFunction({log: 'heading: ' + text});
  var node = new Spec.Node({type: 'h'});
  node.text = text;
  this.nodes.push(node);
  if (func) func();
  return node;
};
/**
 * Create a paragraph node
 **/
Spec.prototype.paragraph = function (text) {
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.paragraph requires text argument');
  }
  this.testFunction({log: 'paragraph: ' + text});
  var node = new Spec.Node({type: 'p'});
  node.text = text;
  this.nodes.push(node);
  return node;
};
/**
 * Create a example node
 **/
Spec.prototype.example = function (text, results, testFunction) {
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.example requires text argument');
  }
  this.testFunction({log: 'example: ' + text});
  if (typeof testFunction !== 'function') {
    throw new Error('Spec.example 3rd arg is function code or undefined');
  }
  var node = new Spec.Node({type: 'e'});
  node.text = text;
  node.test = new Spec.Test(this, results, testFunction);
  this.nodes.push(node);
  return node;
};
/**
 *
 **/
//Spec.prototype.show = function () {
//};
/**
 *
 **/
Spec.prototype.asyncResults = function (arg) {
  return {async: true, expectedValue: arg};
};
