@echo off

setlocal

mysql -u root -p -D media_viewer < database/media_viewer.sql

endlocal

