/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/spec/node-runner.js
 */
var Spec = require('../dist/tgi.spec');
var testSpec = require('../dist/tgi.spec-test');
var spec = new Spec();
var fs = require('fs');

testSpec(spec);
spec.runTests(function (msg) {
  if (msg.error) {
    console.error(msg.error);
    process.exit(1);
  } else if (msg.done) {
    console.log('Testing completed with  ...');
    console.log('testsCreated = ' + msg.testsCreated);
    console.log('testsPending = ' + msg.testsPending);
    console.log('testsFailed = ' + msg.testsFailed);
    if (msg.testsFailed || msg.testsPending) {
      fs.writeFileSync('spec/README.md', spec.githubMarkdown(), 'utf8');
      process.exit(1);
    } else {
      fs.writeFileSync('spec/README.md', spec.githubMarkdown(), 'utf8');
    }
  } else if (msg.log) {
    //console.log(msg.log);
  }
});
