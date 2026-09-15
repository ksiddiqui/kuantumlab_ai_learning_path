@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Kuantum Lab - Local Server
cd /d "%~dp0"

rem --- pick a free port (8000..8009), fall back if occupied ---
set "PORT=8000"
:pickport
netstat -ano -p tcp 2>nul | findstr /r /c:":%PORT% [^0-9]" >nul 2>&1
if not errorlevel 1 (
    set /a PORT+=1
    if !PORT! GTR 8009 (
        echo [ERROR] No free port found in 8000-8009 range.
        pause
        exit /b 1
    )
    goto pickport
)

rem --- ANSI escape codes for pretty printing (Windows Terminal) ---
for /f %%a in ('echo prompt $E ^| cmd') do set "ESC=%%a"

echo.
echo !ESC![1;96m====================================================================!ESC![0m
echo !ESC![1;96m  KUANTUM LAB - AI LEARNING PATH!ESC![0m
echo !ESC![1;96m  Local Markdown Viewer Server!ESC![0m
echo !ESC![1;96m====================================================================!ESC![0m
echo.
echo   !ESC![1;37mRepository Root :!ESC![0m %CD%
echo   !ESC![1;37mPort            :!ESC![0m !PORT!
echo   !ESC![1;37mURL             :!ESC![0m !ESC![4;94mhttp://localhost:!PORT!/
echo.
echo   !ESC![1;37mStatus          :!ESC![0m !ESC![92mREADY - server starting...!ESC![0m
echo   !ESC![1;37mLogs            :!ESC![0m access log below. Press !ESC![1;37mCtrl+C!ESC![0m to stop.
echo.
echo !ESC![1;96m====================================================================!ESC![0m
echo.

python -m http.server !PORT!
endlocal
