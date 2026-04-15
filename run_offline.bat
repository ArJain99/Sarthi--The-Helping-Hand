@echo off
title Sarthi - Offline Mode
color 0B

echo.
echo  ============================================
echo     Sarthi - The Helping Hand (Offline)
echo  ============================================
echo.

:: 1. Start the Backend (FastAPI + Admin endpoint)
echo [1/3] Starting Python Backend on http://localhost:8000 ...
start "Sarthi Backend" cmd /k "cd /d %~dp0backend && py -3.12 main.py"

:: Wait 3 seconds for backend to initialise (admin seed runs here)
timeout /t 3 /nobreak >nul

:: 2. Start the Frontend (Vite/React — includes Admin routes)
echo [2/3] Starting React Frontend ...
start "Sarthi Frontend" cmd /k "cd /d %~dp0 && npm run dev"

:: Wait 3 seconds for Vite to compile
timeout /t 3 /nobreak >nul

:: 3. Open the browser on the home page
echo [3/3] Opening browser ...
start http://localhost:5174

echo.
echo  ============================================
echo   All servers started!
echo.
echo   Home page  : http://localhost:5174
echo   Backend    : http://localhost:8000
echo   API docs   : http://localhost:8000/docs
echo.
echo   --- Volunteer ---
echo   Login  : http://localhost:5174/signin
echo   Email  : rahul@example.com
echo   Pass   : password123
echo.
echo   --- NGO ---
echo   Login  : http://localhost:5174/ngo-signin
echo   Email  : delhi.foodbank@example.com
echo   Pass   : password123
echo.
echo   --- Admin ---
echo   Login  : http://localhost:5173/admin-signin
echo   Email  : admin@sarthi.com
echo   Pass   : admin123
echo.
echo   NOTE: If port 5173 is busy, Vite uses 5174.
echo         Replace 5173 with 5174 in the URLs above.
echo.
echo   Keep both black windows open while using the app.
echo   Close them (or press Ctrl+C inside) to stop.
echo  ============================================
echo.
pause
