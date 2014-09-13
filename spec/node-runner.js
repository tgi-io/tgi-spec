/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/spec/node-runner.js
 */
var Spec = require('../dist/tgi.spec');
var testSpec =  require('../dist/tgi.spec-test');

testSpec(new Spec());

console.log('sup');