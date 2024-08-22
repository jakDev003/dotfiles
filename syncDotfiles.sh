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

# copy .config
sudo rsync -ah --progress $HOME/.config .

# copy other dot files 
sudo cp  $HOME/.vimrc .
sudo cp  $HOME/.wezterm.lua .
sudo cp  $HOME/.bashrc .

# Check git status
gs="$(git status | grep -i "modified")"
echo "${gs}"

# If there is a new change
if [[ $gs ]]; then
  echo "push";
fi

# Change file permissions
sudo chown josh:josh . -R

# push to Github
git add --all
git commit -m "Updated: `date +'%Y-%m-%d %H:%M:%S'`"
git push --force origin master