/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.test.js
 */
spec.test('lib/tgi-spec', 'Spec Constructor Function', function (callback) {
  callback({log: 'TEST_SPEC.shit tgi-spec/lib/tgi-spec.test.js'});
  spec.heading('TGI SPEC', function () {
    spec.paragraph('Javascript test and spec documentation framework.');
    spec.heading('METHODS', function () {
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
  });
});
