#!/bin/bash

# Ensure nvm is loaded
if [ -z "$NVM_DIR" ]; then
  echo "NVM is not loaded. Please ensure nvm is installed and available in your environment."
  exit 1
fi

if [ ! -f .nvmrc ]; then
  echo ".nvmrc file not found in the current directory."
  exit 1
fi

# Read the Node.js version from .nvmrc
NODE_VERSION=$(cat .nvmrc)

if [ -z "$NODE_VERSION" ]; then
  echo ".nvmrc is empty. Please specify a Node.js version in the file."
  exit 1
fi

# Attempt to use the specified Node.js version
if ! nvm use "$NODE_VERSION" >/dev/null 2>&1; then
  echo "Node.js version $NODE_VERSION not found. Installing..."
  if nvm install "$NODE_VERSION"; then
    echo "Successfully installed Node.js version $NODE_VERSION."
    nvm use "$NODE_VERSION"
  else
    echo "Failed to install Node.js version $NODE_VERSION."
    exit 1
  fi
else
  echo "Successfully switched to Node.js version $NODE_VERSION."
fi
