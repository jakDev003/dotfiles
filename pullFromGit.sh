#!/bin/bash

# Store the current directory
current_dir=$(pwd)

# Pull the latest changes from the git repository
echo "Pulling latest changes from git repository..."
if ! git pull; then
    echo "Failed to pull the latest changes. Exiting..."
    exit 1
fi

# Copy all files/folders from 'config' directory to '$HOME/.config' directory
echo "Copying 'config' directory to '$HOME/.config'..."
if ! cp -r "${current_dir}/config/"* "$HOME/.config/"; then
    echo "Failed to copy 'config' directory. Exiting..."
    exit 1
fi

echo "Copying 'config' directory to '/root/.config'..."
if ! sudo cp -r "${current_dir}/config/"* "/root/.config/"; then
    echo "Failed to copy 'config' directory. Exiting..."
    exit 1
fi


# Copy .bashrc
echo "Copying '.bashrc' to '$HOME/.bashrc'..."
if ! cp "${current_dir}/.bashrc" "$HOME/.bashrc"; then
    echo "Failed to copy .bashrc. Exiting..."
    exit 1
fi
echo "Copying '.bashrc' to '/root/.bashrc'..."
if ! sudo cp "${current_dir}/.bashrc" "/root/.bashrc"; then
    echo "Failed to copy .bashrc. Exiting..."
    exit 1
fi

echo "Operation complete!"
