# Getting Started

To get started, we need to install all dependencies for our new project:

```
npm install && bower install
```

Next, let's start our local web server. Our watch task will compile all necessary files when changed (Jade, SCSS, JS, etc):

```
gulp serve
```

At build time, if this is a project that will be integrated into a CMS:

```
gulp build
```

At build time, if this is a project that will be a static flat site:

```
gulp build:flat
```

To view our dist files locally to ensure all tasks are working properly, simply:

```
gulp serve:prod
```

To run our test files, simply

```
gulp serve:test
```

### Output dev files

To output dev verions (unminified versions of css/jade components/js files), open up gulpfile.babel.js and set

```
global.devEnv = true;
```

### Individual Tasks

Rebuild only our styles + dev styles

```
gulp task:styles
```

Rebuild only our scripts + dev scripts

```
gulp task:scripts
```

### Useful Tasks

Lint our script file(s) for possible errors/warnings

```
gulp lint:scripts
```

<!-- Lint our html file(s) for possible html errors/warnings:

```
gulp lint:html
```

Lint our html file(s) for possible ARIA errors/warnings:

```
gulp lint:aria
``` -->

Lint our gulp file(s) for possible errors/warnings:

```
gulp lint:gulp
```

Inject our app's script files to our _foot.jade file:

```
gulp inject:scripts
```

Inject our vendor dependencies from Bower to our _foot.jade file:

```
gulp wiredep
```

Clean our .tmp and dist folders to start fresh:

```
gulp clean
```
