# Getting Started

To get started, we need to install all dependencies for our new project:

```bash
npm install && bower install
```

Next, let's start our local webserver. Our watch task will compile all neseccary files when changed (Jade, SCSS, JS, etc):

```bash
gulp serve
```

If this is a project that will be integrated into a CMS:

```bash
gulp build
```

If this is a project that will be a static flat site:

```bash
gulp build-glat
```
