# Script to kill process on port 4000
$port = 4000
$processId = netstat -ano | findstr ":$port" | findstr "LISTENING" | ForEach-Object { ($_ -split '\s+')[-1] }

if ($processId) {
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "Found process using port $port:" -ForegroundColor Yellow
        Write-Host "  PID: $($process.Id)" -ForegroundColor Cyan
        Write-Host "  Name: $($process.ProcessName)" -ForegroundColor Cyan
        Write-Host "  Path: $($process.Path)" -ForegroundColor Cyan
        Write-Host ""
        $confirm = Read-Host "Kill this process? (Y/N)"
        if ($confirm -eq 'Y' -or $confirm -eq 'y') {
            Stop-Process -Id $processId -Force
            Write-Host "✅ Process killed successfully!" -ForegroundColor Green
        } else {
            Write-Host "Cancelled." -ForegroundColor Yellow
        }
    } else {
        Write-Host "Process ID $processId not found." -ForegroundColor Red
    }
} else {
    Write-Host "No process found using port $port" -ForegroundColor Green
}

