/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/spec-header
 **/
(function () {
"use strict";
var root = this;
var testSpec = function(spec) {

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.test.js
 */
/**
 * Doc Intro
 */
//spec.mute(true);
spec.test('lib/tgi-spec-intro', 'tgi-spec', '', function (callback) {
  spec.paragraph('Javascript test and spec documentation framework.');
  spec.index('##Custom TOC Anchor Description');
});

/**
 * The Spec
 */
spec.testSection('Spec', 'This is extraneous but needed to show than you can put text here with the testSection function.');
spec.test('lib/tgi-spec', 'Spec Constructor Function', '', function (callback) {
  spec.paragraph('This test suite shows every feature and looking at source is the best full example: ' +
  'https://github.com/tgicloud/tgi-spec/blob/master/lib/tgi-spec.test.js');
  spec.heading('METHODS', function () {
    spec.heading('heading(text,function(){})', function () {
      spec.paragraph('heading test followed by optional function used for indenting structure.  The presentation may' +
      ' reflect this as heading levels (todo for github markdown).');
    });
    spec.heading('paragraph(text)', function () {
      spec.paragraph('here is the best example: https://github.com/tgicloud/tgi-spec/blob/master/lib/tgi-spec.test.js');
    });
    spec.heading('example(text, results, testFunction)', function () {
      spec.paragraph('The example function provides a test description, expected outcome and function to invoke for test.' +
      '  to disable a test spec.xexample is provided also.');
      spec.example('Code with no errors', undefined, function () {
        // Hello World
      });
      spec.example('Code with expected return value', true, function () {
        return true;
      });
      spec.example('Errors can be returned', Error('wrong'), function () {
        return Error('wrong');
      });
      spec.example('Errors can be thrown', Error('wrong'), function () {
        throw Error('wrong');
      });
      spec.example('Can contain one or more assertions', undefined, function () {
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
      });
      spec.example('Expected results can be asynchronous', spec.asyncResults(42), function (callback) {
        this.shouldBeTrue(true); // false breaks test
        setTimeout(function () {
          callback(42); // comment out to test timeouts
        }, 0);
      });
      spec.example('can log expression output', undefined, function () {
        this.log('ponder the meaning of life: ' + 42 * 10);
      });

      /**
       * Uncomment to test fail
       */
      //spec.example('FAIL', true, function () {
      //  return false;
      //});
    });
    spec.heading('mute(true/false)', function () {
      spec.paragraph('Tests can be muted.  All documentation will be muted but tests will be run.  Return value is object with stats of run tests.');
      spec.example('check function and return value', 0, function () {
        var mutedTests = spec.mute(false);
        this.log(JSON.stringify(mutedTests));
        return mutedTests.testsCreated;
      });

      spec.example('mute enabled', undefined, function () {
        spec.mute(true);
      });
      spec.heading('yo', function () {
        spec.mute(true); // nested mute test
        spec.paragraph('was');
        spec.example('sup', undefined, function () {
          // 1 passed test .... nested mute
        });
        spec.mute(false); // nested mute test
        spec.example('foo', undefined, function () {
          // another test to count in outter mute
        });
      });

      var wasMuted = spec.mute(false).testsCreated;
      spec.example('should have 2 muted test now', 2, function () {
        // See source for skipped parts
        return wasMuted;
      });
    });
  });
  spec.heading('SPAM', function () {
    for (var problems = 0; problems < 99; problems++) {
      spec.paragraph('I got 99 problems and this is #' + (problems+1));
    }
  });
});
/**
 * Fake tests to show spec.TOC() in action
 */
spec.testSection('Homer');
spec.test('lib/tgi-spec-illiad-2', 'Illiad Book 1', 'it is what it is', function (callback) {
  var text = 'Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans. ';
  for (var i = 0; i < 8; i++) {
    text += text;
  }
  spec.paragraph(text);
});
spec.test('lib/tgi-spec-illiad-2', 'Illiad Book 2', 'it is what it is', function (callback) {
  var text = 'Now the other gods and the armed warriors on the plain slept soundly, but Jove was wakeful, for he was thinking how to do honour to Achilles, and destroyed much people at the ships of the Achaeans. ';  for (var i = 0; i < 8; i++) {
    text += text;
  }
  spec.paragraph(text);
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/spec-footer
 **/
};
  /* istanbul ignore next */
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = testSpec;
    }
    exports.testSpec = testSpec;
  } else {
    root.testSpec = testSpec;
  }
}).call(this);
