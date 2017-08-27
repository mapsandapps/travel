# Quasar App

> A Quasar project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```

To add photos to S3:
* https://s3.console.aws.amazon.com/s3/buckets/mapsandapps-travel/
* Upload them
* Select the folder -> More -> Make public

To deploy:

```
$ quasar build mat
$ git subtree push --prefix dist origin gh-pages
```

