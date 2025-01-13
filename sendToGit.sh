#!/bin/bash

# Get the current directory
current_dir="$(pwd)"

# Ensure .bashrc exists before removing and backing up
if [ -f "$HOME/.bashrc" ]; then
  # Remove the current data
  rm -f "$current_dir/.bashrc"

  # Backup .bashrc
  cp "$HOME/.bashrc" "$current_dir/.bashrc"
  echo "Backed up .bashrc to $current_dir/.bashrc"
else
  echo ".bashrc does not exist in the home directory."
fi

# Setup backup directory
config_backup="$current_dir/config"
mkdir -p "$config_backup"

# Define an array of directories to exclude
exclusions=(
  "BraveSoftware"
  # Add more directories to exclude here
)

# Build the rsync exclude parameters
exclude_params=()
for dir in "${exclusions[@]}"; do
  exclude_params+=("--exclude" "$dir")
done

# Use rsync to copy the .config directory with exclusions
rsync -av --delete "${exclude_params[@]}" "$HOME/.config/" "$config_backup/"
echo "Backed up .config directory to $config_backup, excluding ${exclusions[*]}"

# Add all dot files excluding specified files
echo "Adding dot files to git repository..."
git add .

# Commit and push the changes
echo "Committing changes..."
timestamp=$(date +"%Y-%m-%d_%H:%M:%S")
commit_message="Update dot files - $timestamp"

if git commit -m "$commit_message"; then
  echo "Commit successful. Pushing changes to git repository..."
  if git push; then
    echo "Backup complete and changes pushed!"
  else
    echo "Failed to push changes to the repository."
  fi
else
  echo "Nothing to commit or commit failed."
fi
