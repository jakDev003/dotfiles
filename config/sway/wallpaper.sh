#!/usr/bin/env bash
set -euo pipefail

DIR="/home/josh/Pictures/Wallpapers"
LOG="$HOME/.cache/wallpaper.log"
mkdir -p "$(dirname "$LOG")"

log(){ printf '%s %s\n' "$(date +'%F %T')" "$*" >> "$LOG"; }

pick() {
  find "$DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | shuf -n 1
}

# Sanity: at least one image
if ! find "$DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | grep -q .; then
  log "No images found in $DIR"
  exit 1
fi

# Kill old instances; ignore "no process" errors
pkill -x swaybg 2>/dev/null || true

# Small delay helps on reloads
sleep 0.2

# Start one per output
IMG_MAIN="$(pick)";  log "DP-3 -> $IMG_MAIN"
IMG_SIDE="$(pick)";  log "HDMI-A-1 -> $IMG_SIDE"

swaybg -o DP-3     -i "$IMG_MAIN" -m fill &
swaybg -o HDMI-A-1 -i "$IMG_SIDE" -m fill &
disown

