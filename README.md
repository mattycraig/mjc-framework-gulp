# Getting Started

To get started, we need to install all dependencies for our new project:

```
npm install && bower install
```

Next, let's start our local webserver. Our watch task will compile all necessary files when changed (Jade, SCSS, JS, etc):

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

### Useful Taks

Lint our script file(s) for possible errors:

```
gulp lint:scripts
```

Lint our html file(s) for possible errors:

```
gulp lint:html
```

Lint our gulp file(s) for possible errors:

```
gulp lint:gulp
```

Inject our vendor dependencies from Bower to our _foot.jade file:

```
gulp wiredep
```

Clean our .tmp and dist folders to start fresh:

```
gulp clean
```
