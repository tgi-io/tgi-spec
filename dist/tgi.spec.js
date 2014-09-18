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
  // Load the scripts
  for (var i = 0; i < this.scripts.length; i++) {
    var script = this.scripts[i];
    callback({log: 'loading test script: ' + script.testName});
    script.testScript(callback);
  }
  callback({
    done: true,
    testsCreated: this.testsCreated,
    testsPending: this.testsPending,
    testsFailed: this.testsFailed
  });
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
Spec.Test = function (spec, results, callback) {
  var test = this;
  var testResults;
  var testReturnValue;
  spec.testsCreated++;
  spec.testsPending++;
  test.results = results;
  test.callback = callback;
  test.testThrown = false;
  try {
    var returnValue = test.callback(test, function () {
      console.log('this be stubbed');
    });
    if (typeof results !== 'undefined') {
      testResults = results instanceof Error ? results.toString() : results;
      testReturnValue = returnValue instanceof Error ? returnValue.toString() : returnValue;
      if (testResults !== testReturnValue) {
        spec.testsFailed++;
      }
    }
  } catch (e) {
    test.testThrown = true;
    if (typeof results === 'undefined' || !(results instanceof Error) || e.toString() !== results.toString()) {
      spec.testsFailed++;
    }
  }
  spec.testsPending--;
};
/**
 * Create a heading node
 **/
Spec.prototype.heading = function (text, func) {
  if (typeof text !== 'string' || text === '') {
    throw new Error('Spec.heading requires text argument');
  }
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
Spec.prototype.asyncResponse = function () {
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