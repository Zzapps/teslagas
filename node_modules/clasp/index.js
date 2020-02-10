// Installs clasp
var exec = require('child_process').exec;
console.log('Installing @google/clasp...');
exec('npm i -g @google/clasp', (err, stdout, stderr) => {
  if (err) {
    return console.log('Install failed. Must run with sudo.');
  }
  exec('clasp -v', (err, stdout, stderr) => {
    if (err) return console.error(err);
    console.log(`Installed @google/clasp@${stdout.trim()}`);
  });
});
