#!/bin/bash

# Get the current directory
current_dir="$(pwd)"

# Remove the current data
sudo rm -rf .bashrc
sudo rm -rf .config

# Backup .bashrc
cp "$HOME/.bashrc" "$current_dir/.bashrc"
echo "Backed up .bashrc to $current_dir/.bashrc"

# Backup .config directory with exclusions
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
rsync -av "${exclude_params[@]}" "$HOME/.config/" "$config_backup/"
echo "Backed up .config directory to $config_backup, excluding ${exclusions[*]}"

# Add all dot files excluding specified files
echo "Adding dot files to git repository..."
git add .

# Commit and push the changes
echo "Committing changes..."
timestamp=$(date +"%Y-%m-%d_%H:%M:%S")
commit_message="Update dot files - $timestamp"
git commit -m "$commit_message"
echo "Pushing changes to git repository..."
git push

echo "Backup complete!"
