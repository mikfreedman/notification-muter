# Notification Muter

This chrome extension mutes notifications in Google Chrome. 

You use it by clicking the bell icon!

The shell for this application was generated using

[Extensionizr](http://extensionizr.com)

## Installing the Extension

https://chrome.google.com/webstore/detail/nadnegkhgmdkedmcmobengbmacbngpma

## Local Development

Install npm and the packages pertinent for this app:

__OSX__

```bash
brew update
brew install nodejs npm
npm install
```

__Linux__

``` bash
sudo apt update
sudo apt install npm

# https://github.com/joyent/node/issues/3911
if [[ ! -e /usr/bin/node ]] ; then
  sudo ln -s /usr/bin/nodejs /usr/bin/node
fi
```


__Then:__

1. `npm install`
1. `npm test`
1. Go to [chrome://extensions/](chrome://extensions/)
1. Ensure that the Developer mode checkbox in the top right-hand corner is checked.
1. Click Load unpacked extension… to pop up a file-selection dialog.
1. Navigate to the directory in which your extension files live, and select it.

Currently, there is no local asset build requirement, so you should be able to load this directory directly.

Each time you add a new feature, you will need to reload the extension from the [chrome://extensions/](chrome://extensions/) page.

## Tests

First, install npm and the pertinent packages, as described in the [Local Development](#local-development). Then, run the tests with:

```bash
npm test
```

## Deployment

This application is automatically deployed to the Chrome Web Store via CircleCI ([pivotal/allocations-power-up](https://circleci.com/gh/mikfreedman/notification-muter)).

The Circle CI build must be configured with the following environment variables:

* APP_ID
* CLIENT_SECRET
* CLIENT_ID
* REFRESH_TOKEN

This page: https://developer.chrome.com/webstore/using_webstore_api explains how to go about getting these keys. It should go without saying, but **do not** store these variables in your `circle.yml` but rather as encrypted variables on circleci itself.

In order to manually deploy this application, you must package it with:

```bash
npm run package
```
Then upload it via the [Chrome Web Store developer dashboard](https://chrome.google.com/webstore/developer/dashboard)
