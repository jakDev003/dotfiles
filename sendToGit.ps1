# Get the current directory
$currentDir = Get-Location

# Remove the current data
Remove-Item -Recurse -Force "$HOME\.config\nvim"

# Backup .config directory with exclusions
$configBackup = "$currentDir\config\nvim"
New-Item -ItemType Directory -Force -Path $configBackup

# Define an array of directories to exclude
$exclusions = @(
    # Add more directories to exclude here
)

# Initialize robocopy exclude parameters
$excludeParams = @()

# Build the robocopy exclude parameters
foreach ($dir in $exclusions) {
    $excludeParams += "/XD $dir"
}

# Use robocopy to copy the .config directory with exclusions
$excludeParamsString = $excludeParams -join " "
robocopy "$HOME\AppData\Local\nvim\" $configBackup /E $excludeParamsString
Write-Output "Backed up .config\nvim directory to $configBackup, excluding $($exclusions -join ', ')"

# Add all dot files excluding specified files
Write-Output "Adding dot files to git repository..."
git add .

# Commit and push the changes
Write-Output "Committing changes..."
$timestamp = Get-Date -Format "yyyy-MM-dd_HH:mm:ss"
$commitMessage = "Update dot files - $timestamp"
git commit -m "$commitMessage"
Write-Output "Pushing changes to git repository..."
git push

Write-Output "Backup complete!"
