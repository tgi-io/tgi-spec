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
};
Spec.prototype.test = function (source, script) {
  console.log('source ' + source);
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