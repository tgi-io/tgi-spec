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
  this.callback = callback;
  // Load the scripts
  for (var i = 0; i < this.scripts.length; i++) {
    var script = this.scripts[i];
    this.callback({log: 'loading test script: ' + script.testName});
    script.testScript(callback);
  }
  this.completionCheck();
};
Spec.prototype.completionCheck = function (force) {
  var spec = this;
  if (!this.testsPending || force) {
    this.callback({
      done: true,
      testsCreated: this.testsCreated,
      testsPending: this.testsPending,
      testsFailed: this.testsFailed
    });
  } else {
    // Give time for async to finish
    this.watchdog = this.watchdog || setTimeout(function () {
      spec.completionCheck(true); // force completion
    }, 500);
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
Spec.Test = function (spec, expectedValue, callback) {
  var test = this;
  var testExpectedValue;
  var testReturnValue;
  spec.testsCreated++;
  spec.testsPending++;
  test.expectedValue = expectedValue;
  test.callback = callback;
  test.testThrown = false;
  test.testAsync = false;
  try {
    var returnValue = test.callback(function (callbackReturns) {
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
  this.callback({log: 'heading: ' + text});
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
  this.callback({log: 'paragraph: ' + text});
  var node = new Spec.Node({type: 'p'});
  node.text = text;
  this.nodes.push(node);
  return node;
};
/**
 * Create a example node
 **/
Spec.prototype.example = function (text, results, callback) {
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.example requires text argument');
  }
  this.callback({log: 'example: ' + text});
  if (typeof callback !== 'function') {
    throw new Error('Spec.example 3rd arg is function code or undefined');
  }
  var node = new Spec.Node({type: 'e'});
  node.text = text;
  node.test = new Spec.Test(this, results, callback);
  this.nodes.push(node);
  return node;
};
/**
 *
 **/
Spec.prototype.show = function () {
};
/**
 *
 **/
Spec.prototype.asyncResults = function (arg) {
  return {async: true, expectedValue: arg};
};
