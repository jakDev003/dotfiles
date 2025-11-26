#!/usr/bin/env bash
set -euo pipefail

WALL_DIR="/home/josh/Pictures/wallpapers/Dynamic-Wallpapers/Dark"
INTERVAL_SECONDS=${1:-60}
CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}"
LOG_FILE="$CACHE_DIR/hyprpaper-dynamic.log"

mkdir -p "$CACHE_DIR"

log() {
  printf '%s %s\n' "$(date +'%F %T')" "$*" >>"$LOG_FILE"
}

select_backend() {
  if command -v hyprpaper >/dev/null 2>&1; then
    BACKEND="hyprpaper"
  elif command -v swww >/dev/null 2>&1 && command -v swww-daemon >/dev/null 2>&1; then
    BACKEND="swww"
  else
    log "No supported wallpaper backend found (install hyprpaper or swww)."
    exit 1
  fi
}


wait_for_hyprctl() {
  local tries=${1:-60}
  while (( tries-- > 0 )); do
    if hyprctl monitors >/dev/null 2>&1; then
      return 0
    fi
    sleep 0.5
  done
  return 1
}

require_images() {
  if [ ! -d "$WALL_DIR" ]; then
    log "Wallpaper directory $WALL_DIR does not exist"
    exit 1
  fi

  local -a found=()
  while IFS= read -r -d '' file; do
    found+=("$file")
  done < <(find "$WALL_DIR" -maxdepth 1 -type f \
    \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0 | sort -z)

  if [ ${#found[@]} -eq 0 ]; then
    log "No images found in $WALL_DIR"
    exit 1
  fi

  IMAGES=("${found[@]}")
}

require_monitors() {
  local tries=${1:-60}
  while (( tries-- > 0 )); do
    local output
    output=$(hyprctl monitors 2>/dev/null || true)

    local -a names=()
    while IFS= read -r line; do
      case "$line" in
        Monitor*)
          read -r _ monitor_name _ <<<"$line"
          if [ -n "$monitor_name" ]; then
            names+=("$monitor_name")
          fi
          ;;
      esac
    done <<<"$output"

    if [ ${#names[@]} -gt 0 ]; then
      MONITORS=("${names[@]}")
      return 0
    fi

    sleep 0.5
  done

  if [ ${#MONITORS[@]} -eq 0 ]; then
    log "No active monitors detected"
    exit 1
  fi
}

ensure_backend() {
  case "$BACKEND" in
    hyprpaper)
      if ! pgrep -x hyprpaper >/dev/null 2>&1; then
        hyprpaper &
        sleep 0.5
      fi

      if wait_for_hyprctl 40; then
        for _ in $(seq 1 40); do
          if hyprctl hyprpaper listloaded >/dev/null 2>&1; then
            return 0
          fi
          sleep 0.25
        done
      fi

      log "hyprpaper IPC not available"
      exit 1
      ;;
    swww)
      if ! pgrep -x swww-daemon >/dev/null 2>&1; then
        swww-daemon --quiet >/dev/null 2>&1 &
        sleep 0.5
      fi

      for _ in $(seq 1 40); do
        if swww query >/dev/null 2>&1; then
          return 0
        fi
        sleep 0.25
      done

      log "Failed to initialise swww"
      exit 1
      ;;
  esac
}

apply_wallpaper() {
  local monitor="$1"
  local image="$2"

  case "$BACKEND" in
    hyprpaper)
      hyprctl hyprpaper preload "$image" >/dev/null 2>&1 || true
      hyprctl hyprpaper wallpaper "$monitor,$image" >/dev/null 2>&1 || true
      ;;
    swww)
      swww img "$image" --outputs "$monitor" --transition-type none --resize crop >/dev/null 2>&1 || true
      ;;
  esac

  log "$monitor -> $image"
}

cycle_wallpapers() {
  log "Starting dynamic wallpaper loop (backend=$BACKEND, interval=${INTERVAL_SECONDS}s)"
  while true; do
    mapfile -t cycle < <(shuf -e "${IMAGES[@]}")

    for image in "${cycle[@]}"; do
      require_monitors 1
      for monitor in "${MONITORS[@]}"; do
        apply_wallpaper "$monitor" "$image"
      done
      sleep "$INTERVAL_SECONDS"
    done
  done
}

main() {
  select_backend
  require_images
  wait_for_hyprctl 60 || {
    log "Failed to reach hyprctl; is Hyprland running?"
    exit 1
  }
  require_monitors
  ensure_backend
  cycle_wallpapers
}

main "$@"
