# Startup Script for Personal Portfolio
Write-Host "Starting Personal Portfolio..." -ForegroundColor Green

# Ensure Node.js is in PATH
$env:Path = "C:\Program Files\nodejs;" + $env:Path

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies... (Only needed once)" -ForegroundColor Yellow
    npm install
}

# Start Development Server
Write-Host "Launching Development Server..." -ForegroundColor Cyan
npm run dev
