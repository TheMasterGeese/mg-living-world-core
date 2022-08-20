<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[version-shield]: https://img.shields.io/github/v/release/TheMasterGeese/mg-living-world-core
[version-url]: https://github.com/TheMasterGeese/mg-living-world-core/releases/latest
[forks-shield]: https://img.shields.io/github/forks/TheMasterGeese/mg-living-world-core
[forks-url]: https://github.com/TheMasterGeese/mg-living-world-core/network/members
[stars-shield]: https://img.shields.io/github/stars/TheMasterGeese/mg-living-world-core
[stars-url]: https://github.com/TheMasterGeese/mg-living-world-core/stargazers
[issues-shield]: https://img.shields.io/github/issues/TheMasterGeese/mg-living-world-core
[issues-url]: https://github.com/TheMasterGeese/mg-living-world-core/issues
[license-shield]: https://img.shields.io/github/license/TheMasterGeese/mg-living-world-core
[license-url]: https://github.com/TheMasterGeese/mg-living-world-core/blob/master/LICENSE.md
[last-updated-shield]: https://img.shields.io/github/last-commit/TheMasterGeese/mg-living-world-core

# MG Living World - Core

This module contains any functionality required by multiple Living World modules that cannot be reasonably separated into its own module.

[![Version][version-shield]][version-url]
![Last Updated][last-updated-shield]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
### Table of Contents

- [Current Features](#Current-Features)

- [Changelog](#Changelog)
- [Contributing](#Contributing)
- [License](#License)

## How to Use

First, perform the necessary steps to set up your development environment under [CONTRIBUTING](CONTRIBUTING.md). If you are setting up
the development environment for a specific MG Living World module, that module's repository may have additional setup steps under its
own CONTRIBUTING.md file.

## Folder Structure

| Folder Name             | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `.github/workflows/`    | Contains .yml files used for streamlining build and release workflows on Github. |
| `bundle/` (generated)   | Contains the final module.json and .zip files that are produced by your build.|
| `css/` (optional)       | The directory containing any CSS you might have. This is an optional directory as not everyone is going to be editing HTML. If you exclude this, make sure to remove the `"styles": "{{css}}"` field from the `module.json` file. |
| `dist/` (generated)     | This will contain the compiled source code, templates, project files, styles, and manifest generated during the build process. These will be exported to the bundle/ directory during the build process, and this folder will be cleared out as
a result. |
| `lang/`                 | The directory containing your localization strings files.    |
| `node_modules/` (generated) | Contains all of your installed npm packages required for development or for the module itself. Is excluded from the Github repository. |
| `src/`                  | The directory containing all of your `.js` and `.ts` code files. |
| `templates/` (optional) | The directory containing your Handlebars HTML template files. This is an optional directory. |
| `tests/`                  | The directory containing all of your test files. |
| `types/`                  | Contains types that cannot be downloaded via npm, such as the PF2E system's types. |
| `worlds/`                  | The directory containing all of your worlds. Includes at least one world for testing purposes.|

[top](#table-of-contents)

## Project Files

| File            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `.github\workflows\*`| TODO |
| `.env` (created)   | Contains all your environment variables, specific to your current dev environment. |
| `.eslintrc `    | Configuration file for ESLint. |
| `.gitignore`    | This is used to ignore files and folders you don't want to be included in the git repository. |
| `CHANGELOG.md`  | A MarkDown file for describing the module's history of changes. |
| `CONTRIBUTING.md` | A MarkDown file for describing how to contribute to this repository, as well as any guidance that applies to all
MG Living World modules. |
| `css/samplecss.css` | Template for a css file to be included in a new module. |
| `docker-compose.yml`  | Configuration for docker to download the appropriate docker image and build the container. |
| `env-sample`  | Template for .env file to be renamed into .env when creating a new module or checking out this repository locally. |
| `gulpfile.js`   | Gulp File that contains the various build scripts used automating the module linting, testing, development, building, and packaging. |
| `lang/samplelang.json` | Template for an initial lang file in a new module. |
| `LICENSE`       | The Copyright License for your module. MG Living World modules use the MIT license.|
| `module.json`   | The FoundryVTT Module Manifest file that describes everything about your module. |
| `package-lock.json`  | Tracks the exact version of each package installed. Is included in the repo, to ensure 100% reproduction of the environment across machines. |
| `package.json`  | The NPM Package configuration. May contain additional build scripts. |
| `playwright.config.ts`  | Configuration for Playwright to test your module. |
| `README.md`     | MarkDown file you can use to describe what your module is and how to use it. |
| `src/index.ts`  | Template for an initial typescript file in a new module. | 
| `tests/example.spec.ts` | Template for Integration tests in a new module. |
| `tests/TestEnvironmentSample.ts` | Template for TestEnvironment.ts file to be renamed into TestEnvironment.ts when creating a new module or checking out this repository locally. |
| `tsconfig.json` | TypeScript configuration. This defines the various settings used by the TypeScript transpiler. |

[top](#table-of-contents)


| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npx gulp`             | This is the basic Build command, it will execute all the steps below (except watch) in the order given. |
| `npx gulp lint`     | Lints your code, looking for code format/style/best practice improvements that can be made and applying any fixes that can be done automatically. If there are any errors, the build process stops after this step finishes executing. Continues execution if there are no findings or all findings are only warnings. |
| `npx gulp dev`     | Clears out the development directory, then build your module and copy it to your dev environment's modules/ folder. |
| `npx gulp outputTesWorld` | Copies the contents of worlds/testWorld into your foundrydata/Data/worlds/ folder. |
| `npx gulp test` | Spins up an instance of FoundryVTT in a docker container, then runs all tests against this container. When tests are complete, the container is removed. |
| `npx gulp build` | Compiles and copies all your code and relevant config files into the dist/ directory, then packages the results into module.json and a .zip file with the modules name, copying the final product into bundle/ before clearing out the dist/ folder.|
| `npx gulp watch` | Builds your module as the dev command does, but also keeps the process running, so that if any of the files that would be published via the dev command are changed, they will automatically be pushed to the corresponding dev directory.|
| `npx playwright test` | Runs integration tests without setting up/tearing down the docker container first. Also shows test-by-test output in the terminal where the npx gulp test command does not.|
| `docker-compose up -d` | Starts a docker container containing a running FoundryVTT server. If the image is not present on the local
machine, or is out of date, the latest version will be downloaded before building it. |
| `docker-compose down` | Stops and removes the currently-running FoundryVTT container. |
| `npx eslint --fix ./src/**/*` | Runs eslint manually, without using gulp.

[top](#table-of-contents)


## Module Manifest File

The module manifest does not contain too much that needs to be updated. There are certain variables that will be available when building. The manifest runs through a compilation and is injected with data from the build process and output to the `dist/` directory along with everything else.

| Build Variables | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `{{name}}`      | The Module's package name. This will not be visible to users, but must be a unique name in the FoundryVTT module system.<br />*This value is defined in the `package.json`* |
| `{{title}}`     | The User facing name for the module.<br />*This value is defined in the `package.json`* |
| `{{version}}`   | The version of the module. This should follow the standardized [Semantic Versioning](https://semver.org).<br />*This value is defined in the `package.json`* |
| `{{sources}}`   | The `"{{sources}}"` portions(including the quotes) will be replaced with a JSON array of all source files found in the `src/` directory.<br />*This is assembled at build time.* |
| `{{css}}`       | The `"{{css}}"` portion (including the quotes) will be replaced with a JSON array of all styling files found in the `css/` directory.<br />*This is assembled at build time.* |

The `module.json` file contains sections that will need to be updated. These include:
| Property Name   | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `author`        | Your name should go here. |
| `url`           | As url. |
| `license`       | As url. |
| `manifest`      | As url. |
| `download`      | As url. |
| `readme`        | As url. |
| `changelog`     | As url. |

[top](#table-of-contents)

## NPM Package File

The NPM Package file is used by NPM to handle the project dependencies and to run the Gulp builder. There are a couple of things that need to be updated in this file for your new module.

| Property Name   | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `name`          | Update this to your unique package name (no spaces!) |
| `title`         | Update this with the displayed name. |
| `version`       | This is the [Semantic Version](https://semver.org/) of your module |
| `main`          | Main entry point into your module. Will be injected into manifest. You can also make it an array if you have more
than one entry point that needs to run. |
| `description`   | The short description FoundryVTT shows in the Module Managers |
| `scripts`(optional) | This is where npm scripts are defined. Does not include npx or docker scripts. Not all modules will have this 
property. |
| `dependencies` (optional)  | These are the NPM dependencies used to compile the project. |
| `devDependencies`  | These are the NPM dependencies used to build the project. |


[top](#table-of-contents)

## Changelog
See [CHANGELOG](CHANGELOG.md)
## Contributing
See [CONTRIBUTING](CONTRIBUTING.md)
## License
- This work is licensed under the [Foundry Virtual Tabletop EULA - Limited License Agreement for Module Development](https://foundryvtt.com/article/license/) and [MIT License](LICENSE).
## Contact
Contact MasterGeese via Discord (Khankar#2236) or email (themastergeese@gmail.com).
