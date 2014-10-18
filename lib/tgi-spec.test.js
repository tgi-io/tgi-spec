/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.test.js
 */
/**
 * Doc Intro
 */
//spec.test('lib/tgi-spec-intro', 'INTRO', '', function (callback) {
//  spec.paragraph('There be dragons!');
//  spec.index();
//});

/**
 * The Spec
 */
spec.test('lib/tgi-spec', 'Spec Constructor Function', 'it is what it is', function (callback) {
  spec.heading('TGI SPEC', function () {
    spec.paragraph('Javascript test and spec documentation framework.');
    spec.heading('METHODS', function () {
      spec.heading('heading(text,function(){}', function () {
        spec.paragraph('heading test followed by optional function used for indenting structure.  The presentation may' +
        ' reflect this as heading levels (todo for github markdown).');
      });
      spec.heading('paragraph(text)', function () {
        spec.paragraph('here is the best example: https://github.com/tgicloud/tgi-spec/blob/master/lib/tgi-spec.test.js#L36');
      });

      spec.heading('example(text, results, testFunction)', function () {
        spec.paragraph('The example function provides a test description, expected outcome and funtion to invoke for test.');
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
        spec.example('Expected results can be asynchronous', spec.asyncResults(42), function (callback) {
          setTimeout(function () {
            callback(42);
          }, 0);
        });
        spec.example('Can contain one or more assertions', undefined, function () {
          this.shouldBeTrue(2 === 2);
          this.shouldBeFalse(0.1 + 0.2 === 0.3);
          this.shouldThrowError('*', function () { // Any error
            throw Error();
          });
          this.shouldThrowError(Error('fubar'), function () {
            throw Error('fubar');
          });
        });
        /**
         * Uncomment to test fail
         */
        //spec.example('FAIL', true, function () {
        //  return false;
        //});
      });
    });
    //spec.heading('SPAM', function () {
    //  for (var problems = 0; problems < 99; problems++) {
    //    spec.paragraph('I got 99 problems and this is #' + (problems+1));
    //  }
    //});
  });
});
/**
 * Fake tests to show spec.TOC() in action
 */
//spec.test('lib/tgi-spec-illiad-2', 'Illiad Book 1', 'it is what it is', function (callback) {
//  var text = 'Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans. ';
//  //for (var i = 0; i < 8; i++) {
//  //  text += text;
//  //}
//  spec.paragraph(text);
//});
//spec.test('lib/tgi-spec-illiad-2', 'Illiad Book 2', 'it is what it is', function (callback) {
//  spec.paragraph('Now the other gods and the armed warriors on the plain slept soundly, but Jove was wakeful, for he was thinking how to do honour to Achilles, and destroyed much people at the ships of the Achaeans.');
//});
