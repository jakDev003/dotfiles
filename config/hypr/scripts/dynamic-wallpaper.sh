#!/usr/bin/env bash
# Dynamic wallpaper script for Hyprland
# Changes wallpaper when switching workspaces
# Supports: PNG, JPG, JPEG, GIF (for swww) or MP4 (for mpvpaper)

# Configuration
WALL_DIR="/home/josh/Pictures/wallpapers/Dynamic-Wallpapers"
TRANSITION_TYPE="fade"
TRANSITION_DURATION="1"
LOG_FILE="${XDG_CACHE_HOME:-$HOME/.cache}/dynamic-wallpaper.log"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

# Detect which backend to use
detect_backend() {
    # Check for video files
    if find "$WALL_DIR" -maxdepth 1 -type f -iname '*.mp4' | grep -q .; then
        if command -v mpvpaper >/dev/null 2>&1; then
            echo "mpvpaper"
        else
            log "WARNING: Found MP4 files but mpvpaper is not installed"
            log "Install mpvpaper for video wallpaper support: sudo dnf install mpvpaper"
            log "OR download static image wallpapers to $WALL_DIR"
            echo "none"
        fi
    elif command -v swww >/dev/null 2>&1; then
        echo "swww"
    else
        log "ERROR: No supported wallpaper backend found"
        echo "none"
    fi
}

BACKEND=$(detect_backend)

if [ "$BACKEND" = "none" ]; then
    log "ERROR: Cannot proceed without a working wallpaper backend"
    exit 1
fi

log "Using backend: $BACKEND"

# Get wallpapers based on backend
if [ "$BACKEND" = "mpvpaper" ]; then
    mapfile -t WALLPAPERS < <(find "$WALL_DIR" -maxdepth 1 -type f -iname '*.mp4' | sort)
elif [ "$BACKEND" = "swww" ]; then
    mapfile -t WALLPAPERS < <(find "$WALL_DIR" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.gif' \) | sort)
fi

# Check if we have wallpapers
if [ ${#WALLPAPERS[@]} -eq 0 ]; then
    log "ERROR: No compatible wallpapers found in $WALL_DIR"
    exit 1
fi

log "Found ${#WALLPAPERS[@]} wallpapers"

# Function to set wallpaper with swww
set_wallpaper_swww() {
    local wallpaper="$1"
    swww img -t "$TRANSITION_TYPE" --transition-duration "$TRANSITION_DURATION" "$wallpaper" 2>&1 | tee -a "$LOG_FILE"
}

# Function to set wallpaper with mpvpaper
set_wallpaper_mpvpaper() {
    local wallpaper="$1"
    local monitor="${2:-*}"  # Default to all monitors
    
    # Kill existing mpvpaper instances
    pkill mpvpaper 2>/dev/null
    
    # Start mpvpaper
    mpvpaper -o "no-audio loop" "$monitor" "$wallpaper" &
}

# Function to set wallpaper
set_wallpaper() {
    local wallpaper="$1"
    log "Setting wallpaper: ${wallpaper##*/}"
    
    if [ "$BACKEND" = "swww" ]; then
        set_wallpaper_swww "$wallpaper"
    elif [ "$BACKEND" = "mpvpaper" ]; then
        set_wallpaper_mpvpaper "$wallpaper"
    fi
}

# Function to handle workspace changes
handle_workspace_change() {
    local workspace_id="$1"
    
    # Skip special workspaces
    if [[ "$workspace_id" == special:* ]] || [[ "$workspace_id" == "" ]]; then
        return
    fi
    
    # Map workspace to wallpaper index (cycling through available wallpapers)
    wallpaper_index=$(( (workspace_id - 1) % ${#WALLPAPERS[@]} ))
    selected_wallpaper="${WALLPAPERS[$wallpaper_index]}"
    
    set_wallpaper "$selected_wallpaper"
}

# Set initial wallpaper
set_wallpaper "${WALLPAPERS[0]}"

# Monitor workspace changes using hyprctl in a loop
log "Monitoring workspace changes..."
previous_workspace=""

while true; do
    # Get current workspace ID
    current_workspace=$(hyprctl -j activeworkspace 2>/dev/null | grep -oP '"id":\s*\K[0-9]+')
    
    # If workspace changed, update wallpaper
    if [ -n "$current_workspace" ] && [ "$current_workspace" != "$previous_workspace" ]; then
        handle_workspace_change "$current_workspace"
        previous_workspace="$current_workspace"
    fi
    
    # Check every 0.3 seconds (responsive but not too CPU intensive)
    sleep 0.3
done
