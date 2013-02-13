#!/bin/bash

# Copies all project files into a build directory so non-extension files are not included in the package

BUILD="./build"

if [ -e ${BUILD} ]
then
	rm -r ${BUILD}
fi

mkdir ${BUILD}

cp ./manifest.json ${BUILD}
cp -a ./_locales ${BUILD}
cp -a ./actions ${BUILD}
cp -a ./libs ${BUILD}
cp -a ./resources ${BUILD}
cp -a ./views ${BUILD}

# This file is a stub and only used for auto-completion by IntelliJ
rm ${BUILD}/libs/chrome_extensions.js
