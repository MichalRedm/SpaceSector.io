@echo off
:loop
cd /D "%~dp0"
node server/Server.js
pause
goto loop