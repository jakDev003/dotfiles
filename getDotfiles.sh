#!/bin/bash

# Try to install git and rsync if not installed
packagesNeeded=(git rsync)
if [ -x "$(command -v apk)" ];
then
    sudo apk add --no-cache "${packagesNeeded[@]}"
elif [ -x "$(command -v apt-get)" ];
then
    sudo apt-get install "${packagesNeeded[@]}"
elif [ -x "$(command -v dnf)" ];
then
    sudo dnf install "${packagesNeeded[@]}"
elif [ -x "$(command -v zypper)" ];
then
    sudo zypper install "${packagesNeeded[@]}"
else
    echo "FAILED TO INSTALL PACKAGE: Package manager not found. You must manually install: "${packagesNeeded[@]}"">&2;
fi

# check to see is git command line installed in this machine
IS_GIT_AVAILABLE="$(git --version | grep version)"
if [[ $IS_GIT_AVAILABLE ]]; then
  echo "Git is Available"
else
  echo "Git is not installed"
  exit 1
fi

# make sure git is latest
git pull

# Change file permissions
sudo chown $USER . -R

# copy .config
sudo rsync -ah --progress .config/* $HOME/.config

# copy other dot files 
cp .vimrc $HOME/
cp .wezterm.lua $HOME/
sudo cp .bashrc $HOME/
