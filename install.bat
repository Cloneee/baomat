@echo off

start "Auth Server" cmd /c "cd auth-server-security & npm i & exit"
start "Student Manager" cmd /c "cd student-manager-server-security & npm i & exit"
start "Client" cmd /c "cd client-server-security & npm i & exit"
