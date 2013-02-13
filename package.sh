#!/bin/bash

# Copies all project files into a build directory so non-extension files are not included in the package

BUILD="./build"
DISTRIBUTION="Header-Editor"
ZIP="${DISTRIBUTION}.zip"

if [ -e ${BUILD} ]
then
	rm -r ${BUILD}
fi

if [ -e /tmp/${DISTRIBUTION} ]
then
	rm -r /tmp/${DISTRIBUTION}
fi

if [ -e /tmp/${ZIP} ]
then
	rm /tmp/${ZIP}
fi

mkdir ${BUILD}
mkdir /tmp/${DISTRIBUTION}

cp ./manifest.json ${BUILD}
cp -a ./_locales ${BUILD}
cp -a ./actions ${BUILD}
cp -a ./libs ${BUILD}
cp -a ./resources ${BUILD}
cp -a ./views ${BUILD}

# This file is a stub and only used for auto-completion by IntelliJ
rm ${BUILD}/libs/chrome_extensions.js

# Copy the ready-to-package files to `/tmp` & ZIP them
cp -a ${BUILD}/* /tmp/${DISTRIBUTION}
cd /tmp
zip -r ${ZIP} ${DISTRIBUTION}/*
