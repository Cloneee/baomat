@echo off

start "Auth Server" cmd /c "cd auth-server-security & npm start"
start "Student Manager" cmd /c "cd student-manager-server-security & npm start"
start "Client" cmd /c "cd client-server-security & npm start"
