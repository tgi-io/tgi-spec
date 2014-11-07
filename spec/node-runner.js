/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/spec/node-runner.js
 */
var Spec = require('../dist/tgi.spec');
var testSpec = require('../dist/tgi.spec-test');
var spec = new Spec();

testSpec(spec);
spec.runTests(function (msg) {
  if (msg.error) {
    console.error(msg.error);
    process.exit(1);
  } else if (msg.done) {
    console.log('*** ' + msg.testsCreated + ' Tests ' + msg.testsFailed + ' Failed ' + msg.testsPending + ' Pending ***');
    if (msg.testsFailed || msg.testsPending) process.exit(1);
  } else if (msg.log) {
    console.log(msg.log);
  }
});
