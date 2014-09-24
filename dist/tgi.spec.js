/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/header
 **/
(function () {
"use strict";
var root = this;
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
  var i, j, k;
  var arrayOfLines;
  var prettyCode;
  var leadingSpaces = 0;
  var line,line2;
  for (i = 0; i < spec.nodes.length; i++) {
    var node = spec.nodes[i];
    if (i)
      text += '\n';
    switch (node.type) {
      case 'h':
        text += '#### ' + node.text;
        break;
      case 'e':
        arrayOfLines = node.test.testFunction.toString().match(/[^\r\n]+/g);
        prettyCode = '';
        for (j = 1; j < arrayOfLines.length - 1; j++) {
          line = arrayOfLines[j];
          if (j == 1) {
            leadingSpaces=0;
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
            // eat spaces
          }
          if (prettyCode.length)
            prettyCode += line2 + '\n';
          prettyCode += line2;
        }
        text += '<strong>ex: ' + node.text + '</strong>';
        text += '\n```javascript' +
        '\n' + prettyCode +
        '\n```';
        //if (true) {
          text += '\n<blockquote>' +
          JSON.stringify(node.test) +
          '</blockquote>';
        //}
        break;
      default:
      case 'p':
        text += '<p>' + node.text + '</p>';
        break;
    }
  }
  return text;
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
  try {
    var returnValue = test.testFunction(function (callbackReturns) {
      spec.testsPending--;
      if (typeof expectedValue !== 'undefined' && expectedValue.async) {
        console.log('shizzle = ' + JSON.stringify(callbackReturns));
        console.log('test.expectedValue.expectedValue = ' + JSON.stringify(test.expectedValue.expectedValue));
        if (test.expectedValue.expectedValue !== callbackReturns) {
          spec.testsFailed++;
        }
      }
    });
    if (typeof expectedValue !== 'undefined') {
      test.testAsync = expectedValue.async;
      testExpectedValue = expectedValue instanceof Error ? expectedValue.toString() : expectedValue;
      testReturnValue = returnValue instanceof Error ? returnValue.toString() : returnValue;
      if (!test.testAsync && testExpectedValue !== testReturnValue) {
        spec.testsFailed++;
      }
    }
  } catch (e) {
    test.testThrown = true;
    if (typeof expectedValue === 'undefined' || !(expectedValue instanceof Error) || e.toString() !== expectedValue.toString()) {
      spec.testsFailed++;
    }
  }
  if (!test.testAsync)
    spec.testsPending--;
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

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/footer
 **/
  /* istanbul ignore next */
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Spec;
    }
    exports.Spec = Spec;
  } else {
    root.Spec = Spec;
  }
}).call(this);