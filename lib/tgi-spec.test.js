/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.test.js
 */
spec.test('lib/tgi-spec', 'Spec Constructor Function', function (callback) {
  callback({log: 'TEST_SPEC.shit tgi-spec/lib/tgi-spec.test.js'});
  var test = spec;
  test.heading('TGI SPEC', function () {
    test.paragraph('Javascript test and spec documentation framework.');
    test.heading('METHODS', function () {
      test.heading('example(text, results, testFunction)', function () {
        test.paragraph('The example function provides a test description, expected outcome and funtion to invoke for test.');
        test.example('Code with no errors', undefined, function () {
          // Hello World
        });
        test.example('Code with expected return value', true, function () {
          return true;
        });
        test.example('Errors can be returned', Error('wrong'), function () {
          return Error('wrong');
        });
        test.example('Errors can be thrown', Error('wrong'), function () {
          throw Error('wrong');
        });
        test.example('Expected results can be asynchronous', spec.asyncResults(42), function (callback) {
          setTimeout(function () {
            callback(42);
          }, 0);
        });
        test.example('Can contain one or more assertions', undefined, function () {
          this.shouldBeTrue(2 === 2);
          this.shouldBeFalse(0.1 + 0.2 === 0.3);
          this.shouldThrowError('*', function () { // Any error
            throw Error();
          });
          this.shouldThrowError(Error('fubar'), function () {
            throw Error('fubar');
          });
        });
      });
    });
  });
});
