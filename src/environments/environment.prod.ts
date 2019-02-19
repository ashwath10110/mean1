const packageJson = require('../../package.json');

export const environment = {
  appName: 'Project Name',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  api_url: 'https://conduit.productionready.io/api',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  }
};