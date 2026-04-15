@echo off
title Sarthi - The Helping Hand (Local Server)
color 0A

echo.
echo  ============================================
echo     Sarthi - The Helping Hand
echo     Local Development Server Launcher
echo  ============================================
echo.

:: ── Check Python ──
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH.
    echo         Download from https://python.org
    pause
    exit /b 1
)

:: ── Check Node/npm ──
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js / npm is not installed or not in PATH.
    echo         Download from https://nodejs.org
    pause
    exit /b 1
)

:: ── Setup Python venv + install deps ──
echo [1/4] Setting up Python backend...
if not exist "backend\venv" (
    echo       Creating virtual environment...
    python -m venv backend\venv
)

echo       Installing backend dependencies...
call backend\venv\Scripts\activate.bat
pip install -q -r backend\requirements.txt
call deactivate

:: ── Frontend deps ──
echo [2/4] Checking frontend dependencies...
if not exist "node_modules" (
    echo       Running npm install...
    call npm install
) else (
    echo       node_modules found, skipping install.
)

:: ── Start Backend ──
echo [3/4] Starting FastAPI backend on http://localhost:8000 ...
start "Sarthi Backend" cmd /k "cd /d %~dp0backend && ..\backend\venv\Scripts\activate.bat && python main.py"

:: Wait a moment for the backend to boot
timeout /t 3 /nobreak >nul

:: ── Start Frontend ──
echo [4/4] Starting Vite frontend on http://localhost:5173 ...
start "Sarthi Frontend" cmd /k "cd /d %~dp0 && npm run dev"

:: Wait a moment then open browser
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo  ============================================
echo   Both servers are running!
echo.
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:8000
echo   API Docs : http://localhost:8000/docs
echo.
echo   --- Volunteer ---
echo   Login  : http://localhost:5173/signin
echo   Email  : rahul@example.com
echo   Pass   : password123
echo.
echo   --- NGO ---
echo   Login  : http://localhost:5173/ngo-signin
echo   Email  : delhi.foodbank@example.com
echo   Pass   : password123
echo.
echo   --- Admin ---
echo   Login  : http://localhost:5173/admin-signin
echo   Email  : admin@sarthi.com
echo   Pass   : admin123
echo  ============================================
echo.
echo  Close this window or press Ctrl+C to stop.
pause
