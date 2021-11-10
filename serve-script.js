const { LiveReloadCompiler } = require('@nestjs/ng-universal');

const compiler = new LiveReloadCompiler({
  projectName: 'web-cms'
});
compiler.run();
