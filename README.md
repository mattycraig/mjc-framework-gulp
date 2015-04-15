# Getting Started

To get started, we need to install all dependencies for our new project:

```
npm install && bower install
```

Next, let's start our local webserver. Our watch task will compile all neseccary files when changed (Jade, SCSS, JS, etc):

```
gulp serve
```

If this is a project that will be integrated into a CMS:

```
gulp build
```

If this is a project that will be a static flat site:

```
gulp build:flat
```

To view our dist files locally to ensure all tasks are working properly, simply:

```
gulp serve:dist
```
