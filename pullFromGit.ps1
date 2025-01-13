# Pull the latest changes from the git repository
Write-Host "Pulling latest changes from git repository..."
git pull

if ($?) {
    # Ensure the destination directory exists
    $destinationPath = "$env:USERPROFILE\AppData\Local\nvim"
    if (-Not (Test-Path -Path $destinationPath)) {
        Write-Host "Creating destination directory: $destinationPath"
        New-Item -ItemType Directory -Path $destinationPath
    }

    # Copy all files/folders from 'config\nvim' directory to the destination directory
    Write-Host "Copying 'config\nvim' directory to '$destinationPath'..."
    Copy-Item -Recurse -Path "config\nvim" -Destination $destinationPath

    if ($?) {
        Write-Host "Operation complete!"
    } else {
        Write-Host "Error: Failed to copy files."
    }
} else {
    Write-Host "Error: Failed to pull latest changes from git repository."
}
