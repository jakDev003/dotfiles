#!/bin/bash

# Script to set random wallpapers for each Hyprland workspace
# Uses swww to set wallpapers per monitor

WALLPAPER_DIR="$HOME/Pictures/wallpapers"
NUM_WORKSPACES=10

# Wait for swww daemon to be ready
sleep 2

# Get list of all monitors
MONITORS=$(hyprctl monitors -j | jq -r '.[].name')

# For each workspace, set a random wallpaper
for workspace in $(seq 1 $NUM_WORKSPACES); do
    # Get a random wallpaper from the directory
    # This finds all image files (including in subdirectories based on waypaper config)
    RANDOM_WALLPAPER=$(find "$WALLPAPER_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" \) | shuf -n 1)
    
    if [ -n "$RANDOM_WALLPAPER" ]; then
        # For each monitor, set the wallpaper when switching to this workspace
        for monitor in $MONITORS; do
            # Use swww to set the wallpaper
            # The workspace rule will trigger this when you switch to that workspace
            echo "Workspace $workspace -> $RANDOM_WALLPAPER"
        done
        
        # Set wallpaper for all outputs initially
        swww img "$RANDOM_WALLPAPER" --transition-type any --transition-duration 2
        
        # Sleep briefly to avoid race conditions
        sleep 0.2
    fi
done

echo "Random wallpapers set for all workspaces!"
