#!/bin/bash
PROJ_ROOT='/Users/taochen/Project/Apollo/sanlin'
cd $PROJ_ROOT
rm -rf ~/.rncache
rm package-lock.json
sudo rm $TMPDIR/*
sudo rm -rf $TMPDIR/*
watchman watch-del-all
watchman watch-del-all
rm yarn.lock
rm -rf node_modules/
rm -rf ios/build
#install node_modules
npm install
cd ios
rm -Rf Pods
rm Podfile.lock
rm -Rf sanlin.xcworkspace
pod install
#run simulator
cd ..