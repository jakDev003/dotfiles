#!/bin/bash

# Define the array of files to exclude from git operations
exclusions=(
  ".gitignore"
  "README.md"
  "sendToGit.sh"
  "pullFromGit.sh"
)

# Build the git exclude parameters
exclude_params=()
for file in "${exclusions[@]}"; do
  exclude_params+=(":!$file")
done

# Pull the latest changes from the git repository
echo "Pulling latest changes from git repository..."
git pull

# Copy all files/folders from 'config' directory to '$HOME/.config' directory
echo "Copying 'config' directory to '$HOME/.config'..."
cp -r config/* "$HOME/.config/"

echo "Operation complete!"
