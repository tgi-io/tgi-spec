/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/lib/tgi-spec.test.js
 */
spec.test('lib/tgi-spec', 'Spec Constructor Function', function (callback) {
  callback({log: 'TEST_SPEC.shit tgi-spec/lib/tgi-spec.test.js'});

  var test = spec;

  test.heading('Spec', function () {
    test.heading('Intro', function () {
      test.paragraph('We are spec!');
      spec.paragraph('10:33 PM');
    });
    test.heading('Extro', function () {
      test.paragraph('shizzle');
      test.paragraph('my nizzle');
      test.example('what', undefined, function () {
        console.log('the fuck!');
      });

    });

  });


});
