#!/bin/bash

set -euo pipefail

CONFIG_DIRS=(
  "kitty"
  "hypr"
  "nvim"
  "waybar"
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_CONFIG_DIR="${SCRIPT_DIR}/config"
HOME_CONFIG_DIR="${HOME}/.config"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' not found in PATH." >&2
    exit 1
  fi
}

print_menu() {
  cat <<EOF
What would you like to do?
  [1] Pull configs from repo to this machine
  [2] Back up this machine's configs to the repo
  [q] Quit without changes
EOF
}

print_usage() {
  local script_name
  script_name="$(basename "$0")"
  cat <<EOF
Usage: $script_name [pull|get|push|save|backup]
  pull|get      Pull configs from the repo to this machine
  push|save|backup  Back up this machine's configs to the repo
  -h|--help     Show this help message

Running without arguments launches an interactive prompt.
EOF
}

pull_configs() {
  echo "Pulling latest changes from git..."
  git -C "$SCRIPT_DIR" pull --ff-only

  for dir in "${CONFIG_DIRS[@]}"; do
    local src="${REPO_CONFIG_DIR}/${dir}"
    local dest="${HOME_CONFIG_DIR}/${dir}"

    if [ -d "$src" ]; then
      mkdir -p "$dest"
      echo "Syncing '${dir}' -> '${dest}'"
      rsync -a --delete "$src/" "$dest/"
    else
      echo "Skipping '${dir}': not present in repo backup."
    fi
  done

  local repo_bashrc="${SCRIPT_DIR}/.bashrc"
  if [ -f "$repo_bashrc" ]; then
    echo "Updating '${HOME}/.bashrc'"
    cp "$repo_bashrc" "${HOME}/.bashrc"
  else
    echo "Warning: .bashrc not found in repo; skipping restore." >&2
  fi

  echo "Pull complete."
  
  reload_services
}

reload_services() {
  echo "Reloading Hyprland and Waybar..."
  
  if command -v hyprctl >/dev/null 2>&1; then
    echo "Reloading Hyprland configuration..."
    hyprctl reload
  else
    echo "Warning: hyprctl not found; skipping Hyprland reload." >&2
  fi
  
  if pgrep -x waybar >/dev/null; then
    echo "Restarting Waybar..."
    killall waybar
    waybar >/dev/null 2>&1 &
    disown
  else
    echo "Warning: Waybar is not running; skipping restart." >&2
  fi
  
  echo "Services reloaded."
}

backup_configs() {
  mkdir -p "$REPO_CONFIG_DIR"

  for dir in "${CONFIG_DIRS[@]}"; do
    local src="${HOME_CONFIG_DIR}/${dir}"
    local dest="${REPO_CONFIG_DIR}/${dir}"

    if [ -d "$src" ]; then
      mkdir -p "$dest"
      echo "Backing up '${src}' -> '${dest}'"
      rsync -a --delete "$src/" "$dest/"
    else
      echo "Skipping '${dir}': not found in '${HOME_CONFIG_DIR}'."
    fi
  done

  if [ -f "${HOME}/.bashrc" ]; then
    echo "Backing up '${HOME}/.bashrc' -> '${SCRIPT_DIR}/.bashrc'"
    cp "${HOME}/.bashrc" "${SCRIPT_DIR}/.bashrc"
  else
    echo "Warning: '${HOME}/.bashrc' not found; skipping backup." >&2
  fi

  local paths_to_add=()
  if [ -f "${SCRIPT_DIR}/.bashrc" ]; then
    paths_to_add+=(".bashrc")
  fi
  for dir in "${CONFIG_DIRS[@]}"; do
    if [ -d "${REPO_CONFIG_DIR}/${dir}" ]; then
      paths_to_add+=("config/${dir}")
    fi
  done

  if [ "${#paths_to_add[@]}" -gt 0 ]; then
    echo "Adding updated files to git index..."
    git -C "$SCRIPT_DIR" add "${paths_to_add[@]}"
  fi

  if git -C "$SCRIPT_DIR" diff --cached --quiet; then
    echo "No changes detected; nothing to commit."
    return
  fi

  read -rp "Enter commit message (leave blank for default): " commit_message
  if [ -z "${commit_message}" ]; then
    commit_message="Update dotfiles $(date '+%Y-%m-%d %H:%M:%S')"
  fi

  git -C "$SCRIPT_DIR" commit -m "$commit_message"
  git -C "$SCRIPT_DIR" push
  echo "Backup committed and pushed."
}

main() {
  require_command git
  require_command rsync

  if [ $# -gt 0 ]; then
    case "$1" in
      pull|get)
        pull_configs
        return
        ;;
      push|save|backup)
        backup_configs
        return
        ;;
      -h|--help)
        print_usage
        return
        ;;
      *)
        echo "Unknown argument '$1'." >&2
        print_usage >&2
        exit 1
        ;;
    esac
  fi

  print_menu
  while true; do
    read -rp "Selection: " choice
    case "$choice" in
      1|g|G)
        pull_configs
        break
        ;;
      2|s|S)
        backup_configs
        break
        ;;
      q|Q)
        echo "Exiting without changes."
        exit 0
        ;;
      *)
        echo "Please choose 1, 2, or q."
        ;;
    esac
  done
}

main "$@"
