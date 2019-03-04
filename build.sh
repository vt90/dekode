#!/usr/bin/env bash
#rm -rf ~/dekode_build
mkdir ~/dekode_build

yarn run build:api
mv api/dist ~/dekode_build/api
yarn run build:ui
mv ui/build ~/dekode_build/api/build-ui
yarn run build:parser
mv parser/dist ~/dekode_build/parser
cp package.json ~/dekode_build
cd ~/dekode_build/
yarn install --prod
