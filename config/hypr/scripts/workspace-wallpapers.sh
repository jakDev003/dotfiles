#!/bin/bash

# Script to set different random wallpapers for each Hyprland workspace
# This script listens to workspace changes and sets wallpapers accordingly

WALLPAPER_DIR="$HOME/Pictures/wallpapers"
CACHE_FILE="$HOME/.config/hypr/workspace_wallpapers.cache"
NUM_WORKSPACES=10

# Function to get a random wallpaper
get_random_wallpaper() {
    find "$WALLPAPER_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" \) 2>/dev/null | shuf -n 1
}

# Function to get wallpaper for a workspace
get_workspace_wallpaper() {
    local workspace=$1
    
    # Check if we have a cached wallpaper for this workspace
    if [ -f "$CACHE_FILE" ]; then
        cached=$(grep "^$workspace:" "$CACHE_FILE" | cut -d':' -f2-)
        if [ -n "$cached" ] && [ -f "$cached" ]; then
            echo "$cached"
            return
        fi
    fi
    
    # If no cached wallpaper, get a random one
    wallpaper=$(get_random_wallpaper)
    
    # Cache it
    mkdir -p "$(dirname "$CACHE_FILE")"
    # Remove old entry for this workspace if exists
    if [ -f "$CACHE_FILE" ]; then
        grep -v "^$workspace:" "$CACHE_FILE" > "$CACHE_FILE.tmp" 2>/dev/null
        mv "$CACHE_FILE.tmp" "$CACHE_FILE"
    fi
    echo "$workspace:$wallpaper" >> "$CACHE_FILE"
    
    echo "$wallpaper"
}

# Function to set wallpaper
set_wallpaper() {
    local wallpaper=$1
    swww img "$wallpaper" --transition-type any --transition-duration 2 --transition-fps 60
}

# Initialize: set wallpaper for current workspace
current_workspace=$(hyprctl activeworkspace -j | jq -r '.id')
initial_wallpaper=$(get_workspace_wallpaper "$current_workspace")
if [ -n "$initial_wallpaper" ]; then
    set_wallpaper "$initial_wallpaper"
fi

# Background loop to change wallpaper every minute
(
    while true; do
        sleep 60
        current_ws=$(hyprctl activeworkspace -j | jq -r '.id')
        # Get a new random wallpaper and update cache
        new_wallpaper=$(get_random_wallpaper)
        if [ -n "$new_wallpaper" ]; then
            # Update cache with new wallpaper
            if [ -f "$CACHE_FILE" ]; then
                grep -v "^$current_ws:" "$CACHE_FILE" > "$CACHE_FILE.tmp" 2>/dev/null
                mv "$CACHE_FILE.tmp" "$CACHE_FILE"
            fi
            echo "$current_ws:$new_wallpaper" >> "$CACHE_FILE"
            set_wallpaper "$new_wallpaper"
        fi
    done
) &

# Listen to workspace change events
socat -U - UNIX-CONNECT:"$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" | while read -r line; do
    # Parse workspace change events
    if echo "$line" | grep -q "^workspace>>"; then
        workspace=$(echo "$line" | cut -d'>' -f3)
        
        # Get and set wallpaper for this workspace
        wallpaper=$(get_workspace_wallpaper "$workspace")
        if [ -n "$wallpaper" ]; then
            set_wallpaper "$wallpaper" &
        fi
    fi
done
