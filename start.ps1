Write-Host "🚀 Starting RepoNote Stack (Backend + Frontend)..." -ForegroundColor Cyan

# Check if Docker is running
if (-not (Get-Process "Docker Desktop" -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Docker Desktop is not running. Please start Docker Desktop first." -ForegroundColor Yellow
    exit
}

# Start browser in background after 15 seconds (giving time for containers to boot)
Start-Job -ScriptBlock { 
    Start-Sleep -Seconds 15
    Start-Process "http://localhost:3000"
} | Out-Null

# Build and Start Containers
docker-compose up --build

# Pause to keep window open if it crashes immediately
Read-Host "Press Enter to exit..."
