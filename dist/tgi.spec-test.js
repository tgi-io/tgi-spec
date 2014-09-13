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
spec.test('lib/tgi-spec', 'Spec Constructor Function', function () {
  console.log('TEST_SPEC.shit tgi-spec/lib/tgi-spec.test.js');
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
