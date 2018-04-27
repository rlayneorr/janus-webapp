#!/bin/bash

npm uninstall -g @angular/cli

npm uninstall --save-dev @angular/cli

npm install -g @angular/cli@1.6.0

rm -rf node_modules

npm install --save-dev @angular/cli@1.6.0

npm install

npm install @angular-devkit/core