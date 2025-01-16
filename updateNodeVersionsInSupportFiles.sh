#!/usr/bin/env bash

versionNumber=`node -v`
echo "$versionNumber" > .node-version
echo "$versionNumber" > .nvmrc
