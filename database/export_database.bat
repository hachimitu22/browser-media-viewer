@echo off

setlocal

mysqldump -u root -p media_viewer -d -n > database/media_viewer.sql

endlocal

