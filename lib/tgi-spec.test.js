/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.test.js
 */
spec.test('lib/tgi-spec', 'Spec Constructor Function', function (callback) {
  callback({log: 'TEST_SPEC.shit tgi-spec/lib/tgi-spec.test.js'});
  var test = spec;
  test.heading('Spec', function () {
    test.paragraph('We are spec!');
    test.example('code with no errors', undefined, function () {
      // Hello World
    });
    test.example('code with expected return value', true, function () {
      return true;
    });
    test.example('errors can be returned', Error('wrong'), function () {
      return Error('wrong');
    });
    test.example('errors can be thrown', Error('wrong'), function () {
      throw Error('wrong');
    });
    test.example('expectedValue can be asynchronous', spec.asyncResults(42), function (callback) {
      setTimeout(function () {
        callback(42);
      }, 0);
    });
  });
});
